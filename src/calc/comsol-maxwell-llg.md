# COMSOL を用いた 電磁場–LLG 連成計算

#### 参考ドキュメント
- [Micromagnetic Simulation with COMSOL Multiphysics](https://www.comsol.com/blogs/micromagnetic-simulation-with-comsol-multiphysics)

## 概要
- COMSOL Multiphysics では電磁界（Maxwell 方程式）と磁化ダイナミクス（LLG 方程式）を同時に解く連成計算 を構築できる。
- 典型的な構成は
  - 電磁界：AC/DC モジュールの Magnetic Fields（mf）などのインターフェース
  - 磁化：General Form PDE などで実装した LLG 方程式
  を Time Dependent スタディで連成する形になる。
- 物理的には、
  - Maxwell 方程式から **H, B, E** を解き
  - その H を LLG の有効磁場 $ \mathbf{H}_\text{eff} $ に含める  
  一方で、
  - LLG から得られる磁化 $\mathbf{M} = M_s\mathbf{m}$ が Maxwell 方程式側の B–H 関係や磁化電流としてフィードバックする  
  という双方向連成となる。


## 方程式レベルの整理（Maxwell + LLG）

### Maxwell 方程式
- 磁場に注目した準静的な形の一例：
  $$
    \nabla\times\mathbf{H} = \mathbf{J}_\text{e} + \frac{\partial \mathbf{D}}{\partial t},\quad
    \nabla\cdot\mathbf{B} = 0
  $$
- 構成式：
  $$
    \mathbf{B} = \mu_0 (\mathbf{H} + \mathbf{M}),\quad
    \mathbf{D} = \varepsilon_0 \mathbf{E} + \dots
  $$
- ここで、磁化 $\mathbf{M}$ は LLG から与えられる：
  $$
    \mathbf{M} = M_s \mathbf{m}(x,y,z,t)
  $$

### LLG 方程式
- Gilbert 形式：
  $$
    \frac{d\mathbf{m}}{dt}
      = -\gamma\,\mathbf{m}\times\mathbf{H}_\text{eff}
        + \alpha\,\mathbf{m}\times\frac{d\mathbf{m}}{dt}
  $$
- 数値実装向けの形：
  $$
    (1+\alpha^2)\frac{d\mathbf{m}}{dt}
      = -\gamma\,\mathbf{m}\times\mathbf{H}_\text{eff}
        - \alpha\gamma\,\mathbf{m}\times(\mathbf{m}\times\mathbf{H}_\text{eff})
  $$
- 有効磁場 $\mathbf{H}_\text{eff}$ は
  - Maxwell から解かれる $\mathbf{H}$
  - 交換場 $\mathbf{H}_\text{ex}\propto \nabla^2\mathbf{m}$
  - 異方性場 $\mathbf{H}_\text{ani}$
  - （必要に応じて）静磁場・DMI など  
  の和で構成される：
  $$
    \mathbf{H}_\text{eff} = \mathbf{H} + \mathbf{H}_\text{ex} + \mathbf{H}_\text{ani} + \dots
  $$

## COMSOL での連成の考え方

### 1. Maxwell 側（Magnetic Fields インターフェース）
- AC/DC モジュールの「Magnetic Fields（mf）」などを使用し、
  - ベクトルポテンシャル $\mathbf{A}$ あるいは磁場 $\mathbf{H}$ を解く。
- 材料の磁気特性として
  - 相対透磁率 $\mu_r$ を指定する代わりに、
  - 磁化 $\mathbf{M}$ を明示的に導入する（サブドメインの磁化として与える機能など）。
- COMSOL 内では、
  $$
    \mathbf{B} = \mu_0 (\mathbf{H} + \mathbf{M})
  $$
  のような形が内部で使われるので、  
  `Mx, My, Mz` を LLG 側からの変数として定義し、磁化ベクトルとして参照させる。

### 2. LLG 側（General Form PDE）
- 依存変数：
  $$
    m_x(x,y,z,t),\ m_y(x,y,z,t),\ m_z(x,y,z,t)
  $$
- 有効磁場：
  - Maxwell インターフェースが解く $\mathbf{H}$ を `Hx, Hy, Hz` とし、
  - 交換場・異方性場を式で構成して `Hx_eff, Hy_eff, Hz_eff` を定義。
- General Form PDE で
  $$
    \frac{\partial m_x}{\partial t} = f_x(m_x,m_y,m_z,H_x^\text{eff},H_y^\text{eff},H_z^\text{eff})
  $$
  などを `f` として書き込む。

### 3. 連成の仕組み
- Maxwell → LLG：
  - Magnetic Fields で求めた $\mathbf{H}$ を LLG の有効磁場として使用。
- LLG → Maxwell：
  - LLG から得た $\mathbf{m}$ から磁化 $\mathbf{M}=M_s\mathbf{m}$ を計算し、  
    Magnetic Fields の「磁化」あるいは「B–H 関係」に組み込む。
- これにより、
  - 電流・コイル → Maxwell → H → LLG → M → Maxwell → …  
    という双方向連成がタイムステップごとに繰り返される。

## セットアップ手順

1. **モデルとパラメータの準備**
   - 3D / 2D モデルを作成。
   - `Ms`, `gamma`, `alpha`, `A_ex`, `K_u`, `mu0`, `sigma`（導電率）などの定数を定義。

2. **ジオメトリ・メッシュの構成**
   - 磁性体・コイル・ギャップ・周囲空間などの領域を作る。
   - メッシュは、磁区幅やスキン深さ、波長などを考慮して適切に細かく。

3. **物理インターフェースの追加**
   - AC/DC → Magnetic Fields（mf）を追加し、電流・コイル・導体の設定を行う。
   - Mathematics → General Form PDE（または Coefficient Form PDE）を追加し、LLG 用の 3 成分 PDE を設定。

4. **Maxwell 側の設定**
   - Magnetic Fields で電流源・境界条件（電流駆動・磁場励起）を定義。
   - 材料特性として、磁性領域に「磁化」を与える部分で `Mx, My, Mz` を参照（LLG 側変数から計算）。
   - 必要に応じて導電率を設定し、渦電流を考慮。

5. **LLG 側の設定**
   - 依存変数を `mx, my, mz` に設定。
   - 交換項・異方性項を含む有効磁場成分 `Hx_eff`, `Hy_eff`, `Hz_eff` を Variables などで定義。
   - General Form PDE の右辺 `f` に LLG の式（$(1+\alpha^2)^{-1}[-\gamma m×H_\text{eff} -\alpha\gamma m×(m×H_\text{eff})]$）を反映。
   - 初期条件として、磁化の初期分布（単一ドメイン、磁壁など）を与える。

6. **スタディと連成**
   - スタディは「Time Dependent」。
   - 物理インターフェースとして `mf` と PDE（LLG）両方を選択。
   - 時間範囲（例：0〜数 ns）とステップ制御を設定し、連成で解かせる。

7. **ポストプロセス**
   - 磁束密度 B、磁場 H、電流密度 J の分布を可視化。
   - 磁化ベクトルの分布・時間発展を矢印プロットやスライスで表示。
   - 平均磁化・コイル電圧・損失などを 1D プロットで解析。

## 備考

- 計算負荷
  - Maxwell＋LLG の同時 FEM 計算は非常に重くなりやすい。
  - 対称性・2D 簡略モデル・メッシュ粗密化などで負荷を調整する。
- 時間スケールの違い
  - 電磁界と磁化の典型時間スケールに差がある場合、  
    ステップ幅・ソルバ設定を慎重に調整しないと、収束性が悪化する。
- 正規化制約 $|\mathbf{m}|=1$
  - LLG の実装では $|\mathbf{m}|=1$ を厳密に保つのが難しいので、  
    事後正規化やペナルティ項での補正などを検討する。
- 物性パラメータの整合性
  - $M_s, A, K_u, \sigma, \mu_r$ などの値を、実験・第一原理計算から取得し SI 単位に変換して用いる。
  - 電磁界解析用の B–H カーブ近似との整合も重要。

