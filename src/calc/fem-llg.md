# 有限要素法によるマイクロマグ計算の自作コード

## 0) 構想の全体像
### A. 格子・要素は固定
- 3D直方体領域、構造格子、6面体（Hex8, trilinear, Q1）で固定する。
- これにより「メッシュ生成」「要素隣接」「自由度番号付け」が簡単になり、FEM自作の難所が半減する。

### B. 物理は「エネルギー密度 → 有効磁場」へ統一
考慮する磁気エネルギー密度（ユーザー指定）を統一的に扱う。

- 交換：$w_\mathrm{ex}=A|\nabla \mathbf{m}|^2$
- 一軸異方性：$w_\mathrm{ani}=-K_u(\mathbf{m}\cdot \mathbf{u})^2$
- ゼーマン：$w_\mathrm{Z}=-\mu_0 M_s\, \mathbf{H}_\mathrm{ext}\cdot \mathbf{m}$
- 反磁界：$w_\mathrm{d}=-\frac{1}{2}\mu_0 M_s\, \mathbf{H}_\mathrm{d}\cdot \mathbf{m}$
- 磁気弾性：弾性場を解いてから磁気側に戻す。

実装は各項で必ず以下を揃える方針とする。
- energy(state) → スカラー（診断用）
- effective_field(state) → $\mathbf{H}_\mathrm{eff}$（LLG更新用）

### C. 状態量を一箇所に集約
全ての場を State に集約する。
- $\mathbf{m}(x)$ ：(Nx,Ny,Nz,3) 配列（常に正規化）
- 追加で必要になったら以下を State にぶら下げる：
  - 変位 $\mathbf{u}(x)$ ：(Nx,Ny,Nz,3)
  - ひずみ $\varepsilon$、応力 $\sigma$
  - 反磁界ポテンシャル $\phi$


## 1) フォルダ構造
まずは「動く最小核」を作るため、src 配下を 3層（core / fem / micromag + coupling）に分けると扱いやすい。

```text
micromag_fem/
  main.py
  README.md
  pyproject.toml  (任意)

  src/
    core/
      config.py          # 物性・格子数・時間刻み・出力間隔など設定
      constants.py       # μ0, γ, 単位系の取り決め
      mesh.py            # 構造Hexメッシュ生成・DOF番号・隣接
      fields.py          # フィールド配列のラッパ（m, u, Hなど）
      io.py              # VTK等への出力（最初はnpzでも可）
      diagnostics.py     # エネルギー、|m|誤差、収束モニタ
      utils.py           # 共通の小物（タイマ、チェック、型）

    fem/
      hex8_shape.py      # Hex8形状関数 N_a, その勾配 ∇N_a, Jacobian
      quadrature.py      # ガウス求積点・重み（Hex用）
      dofmap.py          # 要素-節点-自由度マップ（構造格子なら簡単）
      assembly.py        # 要素行列→大域疎行列へのアセンブリ
      bc.py              # Dirichlet/Neumann/周期境界の適用
      linsys.py          # 疎行列形式、行列フリーの切替口
      solver.py          # (自作)CG/GMRES + (任意)簡易前処理
      elasticity.py      # ∇·σ=0 を解く（磁歪固有ひずみを入力）
      poisson.py         # 反磁界用のポテンシャル方程式（空気箱含む）

    micromag/
      llg.py             # LLG右辺、正規化、拘束の扱い
      integrators.py     # Euler/RK2/RK4、後にsemi-implicit
      effective_field.py # 全項を足して H_eff を作る束ね役
      terms/
        exchange.py      # H_ex, E_ex
        anisotropy.py    # H_ani, E_ani
        zeeman.py        # H_Z, E_Z
        demag.py         # H_d（poisson/fft呼ぶ）
        magnetoelastic.py# H_me, E_me（elasticityと連携）
      init.py            # 初期磁区の生成（単一磁区, 渦, Bloch壁など）

    coupling/
      magnetoelastic.py  # m→固有ひずみ→弾性solve→H_me までの配線
      schedule.py        # 「何ステップ毎に弾性/反磁界を更新するか」等

  tests/
    test_mesh.py
    test_hex8.py
    test_llg.py
    test_poisson.py
    test_elasticity.py

  examples/
    cube_relax/
    domain_wall/
    magnetostriction/
```

## 2) 段階的な開発ロードマップ
最初から全部（反磁界＋FEM弾性＋磁気弾性＋高精度LLG）を同時に作ると破綻しやすい。そこで「必ず動く最小核」を作り、検証しながら段階的に機能を積み上げる流れにする。


### 2-1: マイクロ磁気の最小核（反磁界なし、弾性なし）
目的は「LLGが3D格子上で安定に回り、外場で歳差運動し、減衰で整列する」ことを確認する段階である。

用意するファイル（最低限）：
- core/mesh.py  
  構造格子（Nx,Ny,Nz）と座標、格子間隔（dx,dy,dz）、近傍参照（±x, ±y, ±z）を提供する。
- micromag/terms/exchange.py  
  $\nabla^2\mathbf{m}$ を用いて交換項の有効磁場 $\mathbf{H}_\mathrm{ex}$ を作る（この段階では差分ベースでよい）。
- micromag/terms/zeeman.py  
  $\mathbf{H}_\mathrm{Z}=\mathbf{H}_\mathrm{ext}$ としてゼーマン項を追加する。
- micromag/llg.py  
  LLG の右辺を実装し、$\mathbf{m}$ の更新に必要なトルク項を返す。
- micromag/integrators.py  
  まずは陽的（Euler, RK2）でよい。更新後に $|\mathbf{m}|=1$ の正規化を必ず行う。
- micromag/effective_field.py  
  $\mathbf{H}_\mathrm{eff}=\mathbf{H}_\mathrm{ex}+\mathbf{H}_\mathrm{Z}$ を構成する束ね役。
- core/diagnostics.py  
  エネルギー分解（交換＋ゼーマン）と、最大トルク $|\mathbf{m}\times \mathbf{H}_\mathrm{eff}|$、正規化誤差 $\max(|\mathbf{m}|-1)$ を出す。

main.py のこの段階での流れ：
1. config を読み込む（格子数、物性、dt、出力間隔など）
2. mesh と state（m配列）を作る
3. 初期磁区を与える（単一磁区でよい）
4. 時間ループ
   - $\mathbf{H}_\mathrm{eff}$ を計算
   - LLG + integrator で $\mathbf{m}$ を更新
   - 正規化と診断量の記録
   - 必要なら出力

この段階の合格基準：
- 外場印加で歳差運動し、減衰があれば最終的に外場方向へ整列する。
- dt を半分にしても定性的挙動が変わらない（時間収束の簡易確認）。
- エネルギーやトルクが発散せず、|m|が崩れない。


### 2-2: 異方性の追加（局所項）
目的は「局所エネルギー項の追加が、LLGの安定性や単位系を壊さない」ことを確認する段階である。

追加するファイル：
- micromag/terms/anisotropy.py  
  一軸異方性のエネルギー密度  
  $w_\mathrm{ani}=-K_u(\mathbf{m}\cdot \mathbf{u})^2$  
  から有効磁場 $\mathbf{H}_\mathrm{ani}$ を導き、field(state) と energy(state) を実装する。

この段階の合格基準：
- easy-axis 方向へ整列しやすくなる、ドメイン壁が安定化する等、直観と一致する振る舞いが出る。
- $K_u\to 0$ で Phase 1 の挙動に戻る（退化テスト）。


### 2-3: 反磁界（長距離相互作用）の追加
ここが最難関である。自作でバグを潰すため、異なる計算法を2系統用意し、同じ初期条件で比較できるようにするのが強い。

反磁界の構成：
- ポテンシャル $\phi$ から  
  $\mathbf{H}_\mathrm{d}=-\nabla\phi$  
  を得る系を用意する。

2つのルート：

A) 構造格子FFTルート（検証・高速）
- demag_fft.py のような実装で畳み込み（Green関数）ベースの計算を行う。
- 周期境界や開境界近似の扱いは簡略化しやすく、まず「動く」ことと比較検証に向く。

B) FEMポテンシャルルート（最終目標に整合）
- fem/poisson.py  
  空気箱を含む領域でポアソン型問題を解き、$\phi$ を求める。
- 空気領域（$\mu=\mu_0$）と磁性体領域を含む形で場を解く設計にすると、後に磁気弾性と同じFEM基盤に載せられる。

統合のために、micromag/terms/demag.py は
- demag.method = "fft" / "fem"
のように切り替え可能にし、同じインタフェースで $\mathbf{H}_\mathrm{d}$ を返す。

この段階の合格基準：
- demag をON/OFFしてエネルギー・磁区の安定性が合理的に変わる。
- FFT版とFEM版で定性的に同等の $\mathbf{H}_\mathrm{d}$ が得られる（差は境界条件・空気箱で説明できる範囲）。


### 2-4: FEMコア（Hex8）の完成
磁気弾性の前に、弾性FEMが単独で正しく動くことを保証する段階である。
ここで FEM の要素積分・アセンブリ・境界条件・線形ソルバを“独立に”固める。

必要モジュール（fem）：
- hex8_shape.py + quadrature.py  
  Hex8形状関数 $N_a$、勾配 $\nabla N_a$、Jacobian、ガウス求積点の提供。
- dofmap.py + assembly.py  
  要素行列（局所）から大域疎行列へアセンブリする。
- bc.py  
  Dirichlet境界（固定端）を確実に適用できるようにする（ここがまず重要）。
- solver.py  
  対称正定値を仮定したCGを実装し、残差・反復回数を監視できるようにする。
- elasticity.py  
  準静的弾性：$\nabla\cdot\sigma=0$ を解く。

elasticity.py の入出力（大枠）：
- 入力：弾性定数（等方、あるいは立方晶テンソル）、固有ひずみ $\varepsilon^0$（まずはゼロ）
- 出力：変位 $\mathbf{u}$、ひずみ $\varepsilon$、応力 $\sigma$

この段階の合格基準：
- 一様引張、単純せん断などで変位場が妥当になる。
- メッシュ分割（Nx,Ny,Nz）を変えても、収束傾向が得られる（格子収束の簡易確認）。
- エネルギーが非負になる（弾性エネルギーの基本チェック）。

### 2-5: 磁気弾性の結合
目的は「m → 固有ひずみ → 弾性場 → 応力/ひずみ → 有効磁場」という往復を成立させることである。
配線の責務を coupling に集約し、micromag/terms 側は薄く保つ。

coupling/magnetoelastic.py の責務：
1. $\mathbf{m}$ から磁歪固有ひずみ $\varepsilon^0(\mathbf{m})$ を生成する。
2. elasticity.solve(mesh, C, eps0, bc) を呼び、$\mathbf{u},\varepsilon,\sigma$ を得る。
3. 磁気弾性エネルギー（または応力からの等価磁場）を用いて $\mathbf{H}_\mathrm{me}$ を計算する。
4. $\mathbf{H}_\mathrm{me}$ を micromag 側へ返す。

micromag/terms/magnetoelastic.py は
- coupling を呼んで $\mathbf{H}_\mathrm{me}$ を取得するだけ
にして、物理配線（いつ弾性を更新するか、空気箱をどう扱うか等）を一元管理する。

計算負荷のための必須設計：
- schedule.py で
  - demag を何ステップ毎に更新するか
  - 弾性場を何ステップ毎に更新するか
を制御し、毎ステップ解かない運用を可能にする。

この段階の合格基準：
- 磁歪の強さを変えると、応力場と磁区が連成して変化する。
- 磁歪をゼロにすると、弾性場が磁気に影響しなくなる（退化テスト）。
- 更新頻度（毎step vs 数step毎）で結果が大きく崩れない（準静的近似の確認）。

## 3) main.py から見た役割分担
設計で最も重要なのは、どこに何を書かないか（責務の分離）を強制することである。main.py には「配線」だけを残し、物理式・要素積分・線形ソルバなどの詳細を各モジュールへ閉じ込める。


### 3.1 main.py ：接続と設定
main.py の責務：
- 設定（格子数、物性、境界条件、時間刻み、出力間隔）を読み込む
- Mesh / State を生成する
- どのエネルギー項（term）を使うかを登録する
- 時間発展ループを回す（integratorを呼ぶ）
- ログ・出力・チェックポイントを行う

main.py に書かないもの：
- 交換・異方性・反磁界などの式の詳細（micromag/terms 側）
- Hex8 の形状関数やガウス点、Jacobian（fem 側）
- 疎行列の組み立てや前処理、反復法の中身（fem/solver 側）
- 反磁界の境界条件選択の細部（micromag/terms/demag と fem/poisson）
- 磁気弾性の更新スケジュール（coupling/schedule）

この縛りを作ると、バグの原因を「物理ロジック」か「数値基盤」か「配線」かに切り分けられる。


### 3.2 micromag 側は「磁気に関する抽象」を守る
micromag は「磁化場 $\mathbf{m}$ の時間発展」を中心に、磁気側の抽象（term, effective_field, llg/integrator）を守る。

推奨する term の共通インタフェース：
- term.energy(state) -> float  
- term.field(state) -> H_term (Nx,Ny,Nz,3)

有効磁場の合成：
- effective_field.py は基本的に
  - for term in terms: H += term.field(state)
  を行うだけにする。

llg と integrator の責務：
- llg.py：LLG の右辺（トルク）を定義する
  - 例：$\partial_t \mathbf{m} = f(\mathbf{m},\mathbf{H}_\mathrm{eff})$
- integrators.py：時間積分で state.m を更新する
  - 更新後に $|\mathbf{m}|=1$ を保つ（正規化、あるいは拘束形式）

この分離により、term を追加しても「LLGや積分器」を触らずに拡張できる。


### 3.3 fem 側は「方程式を解く機械」
fem の責務は「弱形式で得られた線形（または非線形）方程式を離散化し、解を返す」ことに限定する。

弾性：
- elasticity.py：固有ひずみ $\varepsilon^0$ を受け取り、変位 $\mathbf{u}$、ひずみ $\varepsilon$、応力 $\sigma$ を返す

反磁界ポテンシャル：
- poisson.py：右辺（$\nabla\cdot\mathbf{M}$ 等のソース）を受け取り、$\phi$ を返し、さらに
  - $\mathbf{H}_\mathrm{d} = -\nabla\phi$
  を構成できるようにする

線形ソルバ：
- solver.py：CG/GMRES 等の反復法を一箇所に集約し、残差・収束判定・反復回数を外部に見せる
- 前処理（Jacobi, ILU など）を差し替えやすい構造にする

この構造を守ると、物理モデル側（micromag/coupling）からは fem は「黒箱ソルバ」として扱える。


### 3.4 coupling 側は「多物理の接続と更新頻度の管理」
反磁界や弾性場は計算コストが高い。coupling は以下を担当する。
- どの頻度で弾性方程式・ポテンシャル方程式を解くか（schedule）
- どの物性・境界条件を使い、どの場を入力にし、何を出力するか（配線）
- 同じ term.field を返す形に整形する（micromag との接続を単純化）

これにより、main.py では
- demag 更新頻度
- magnetoelastic 更新頻度
を「設定として」扱えるようになる。

## 4) 最低限の“サブルーチン一覧”（作るべき関数の粒度）
最初から詳細実装を完成させるのではなく、箱（API）を先に決めると実装の迷いが減る。

### 4.1 core（データと共通ロジック）
- Mesh(nx, ny, nz, dx, dy, dz).build()
- State(mesh, material).allocate_fields()
- save_npz(state, step) / write_vtk(state, step)
- diagnostics.energy_breakdown(state, terms)
- diagnostics.max_torque(state, H_eff)
- diagnostics.norm_error(state.m)

### 4.2 micromag（LLGと磁気項）
- llg_rhs(m, H_eff, alpha, gamma) -> dm_dt
- normalize_m(m) -> m
- integrator.step(state, compute_H_eff, dt)

term 側（共通）：
- terms.exchange.energy(state), terms.exchange.field(state)
- terms.anisotropy.energy(state), terms.anisotropy.field(state)
- terms.zeeman.energy(state), terms.zeeman.field(state)
- terms.demag.energy(state), terms.demag.field(state)            # 内部で fft/fem を呼ぶ
- terms.magnetoelastic.energy(state), terms.magnetoelastic.field(state)  # 内部で coupling を呼ぶ

束ね役：
- effective_field.compute(state, terms) -> H_eff

初期条件：
- init.uniform(m0)
- init.domain_wall(...)
- init.vortex(...)


### 4.3 fem（Hex8離散化・アセンブリ・解法）
形状関数と求積：
- hex8.shape(xi, eta, zeta) -> N[8]
- hex8.grad_shape(xi, eta, zeta, JinvT) -> gradN[8,3]
- quadrature.hex_gauss(order) -> (points, weights)

アセンブリと境界：
- dofmap.element_dofs(elem_id) -> dof_ids
- assembly.assemble_global(mesh, element_routine) -> A, b
- bc.apply_dirichlet(A, b, dofs, values) -> (A_mod, b_mod)
- bc.apply_neumann(b, faces, traction) -> b_mod

線形系：
- solver.cg(A, b, tol, maxit) -> x
- solver.gmres(A, b, tol, maxit) -> x

弾性：
- elasticity.solve(mesh, C, eps0, bc) -> u, eps, sigma

反磁界ポテンシャル：
- poisson.solve(mesh, rhs, bc) -> phi
- poisson.grad(mesh, phi) -> H_d


### 4.4 coupling（磁気弾性・更新スケジュール）
磁歪固有ひずみ生成：
- magnetostriction_eigenstrain(m, params) -> eps0

磁気弾性有効磁場：
- magnetoelastic_field(m, sigma or eps, params) -> H_me

更新頻度管理：
- schedule.update_demag(step) -> bool
- schedule.update_elastic(step) -> bool

coupling全体（配線）：
- coupling.magnetoelastic.solve_and_field(state) -> H_me
  - eps0(m) を作る
  - elasticity.solve を呼ぶ
  - H_me を返す
  - state に u/sigma を保持（出力や診断に使う）

## 5) この設計で得られるメリット
- まずLLGが動く → 局所項を足す → 反磁界を足す → 弾性FEMを完成 → 磁気弾性を結ぶ、という一本道になる。
- demag と magnetoelastic は重いので、coupling/schedule に隔離すると後の最適化（更新頻度、精度切り替え、前処理強化）が楽になる。
- Hex8固定・構造格子固定により、dofmap と assembly が単純になり、自作FEMとして破綻しにくい。
- term API を統一すると、新しいエネルギー項（例：DMI、表面異方性、スピントルク）を追加しても main/llg/solver を触らずに拡張できる。



