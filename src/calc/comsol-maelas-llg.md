# COMSOL を用いた 弾性場–LLG 連成計算

### 参考ドキュメント
- Micromagnetic Simulation with COMSOL Multiphysics
  https://www.comsol.com/blogs/micromagnetic-simulation-with-comsol-multiphysics

COMSOL Multiphysics ではSolid Mechanics（弾性場） と LLG 方程式（磁化ダイナミクス）を連成することで、
  - 磁歪（magnetostriction）による 磁化 → ひずみ・応力
  - 磁気弾性結合による ひずみ・応力 → 有効磁場 → 磁化
  を同時に扱うことができる。
- 構成イメージ：
  - 弾性場：Solid Mechanics で変位 $\mathbf{u}$、ひずみ $\varepsilon_{ij}$、応力 $\sigma_{ij}$ を FEM で計算
  - LLG：General Form PDE で磁化 $\mathbf{m}$ の時間発展を計算
  - 磁歪（磁気弾性エネルギー）を介して 双方向連成 を実現する。


## 弾性場–LLG 連成の物理モデル

### 弾性場側の基本式
- 弾性平衡方程式（準静的な場合の一例）：
  $$
    \nabla\cdot\boldsymbol{\sigma} + \mathbf{f} = \mathbf{0}
  $$
  - $\boldsymbol{\sigma}$：応力テンソル
  - $\mathbf{f}$：体積力
- 構成式（フックの法則＋磁歪）：
  $$
    \sigma_{ij} = C_{ijkl}\left(\varepsilon_{kl} - \varepsilon^{\text{mag}}_{kl}(\mathbf{m})\right)
  $$
  - $C_{ijkl}$：弾性定数テンソル（立方晶なら $C_{11},C_{12},C_{44}$ など）
  - $\varepsilon_{kl}$：通常の機械的ひずみ
  - $\varepsilon^{\text{mag}}_{kl}(\mathbf{m})$：磁歪による「固有ひずみ」

- 磁歪ひずみの典型例（立方晶など）：
  $$
    \varepsilon_{ij}^{\text{mag}}
      \sim \text{関数}(\lambda_{100},\lambda_{111}, m_x,m_y,m_z)
  $$
  （具体的な形は結晶対称性に依存）

### LLG 方程式側
- 単位磁化 $\mathbf{m}$ と有効磁場 $\mathbf{H}_\text{eff}$ に対する LLG：
  $$
    (1+\alpha^2)\frac{d\mathbf{m}}{dt}
      = -\gamma\,\mathbf{m}\times\mathbf{H}_\text{eff}
        - \alpha\gamma\,\mathbf{m}\times(\mathbf{m}\times\mathbf{H}_\text{eff})
  $$
- 有効磁場 $\mathbf{H}_\text{eff}$：
  $$
    \mathbf{H}_\text{eff} = \mathbf{H}_\text{ext}
      + \mathbf{H}_\text{ex}
      + \mathbf{H}_\text{ani}
      + \mathbf{H}_\text{me}
      + \dots
  $$
  - $\mathbf{H}_\text{me}$：磁気弾性（magnetoelastic）による有効場
- 磁気弾性エネルギーからの有効場：
  $$
    F_\text{me}(\mathbf{m},\varepsilon_{ij}) \;\Rightarrow\;
    \mathbf{H}_\text{me}
      = -\frac{1}{\mu_0 M_s}\frac{\partial F_\text{me}}{\partial \mathbf{m}}
  $$
  - 例：$\;F_\text{me} \propto -\tfrac{3}{2}\lambda_s \sigma_{ij} m_i m_j\;$ など。


## COMSOL での実装

### 1. 物理インターフェース
- **Solid Mechanics**（構造力学・弾性場）
  - 変位ベクトル $\mathbf{u} = (u_x,u_y,u_z)$ を依存変数とする。
  - 弾性定数・密度・境界条件（固定端・自由端・荷重など）を設定。
- **General Form PDE（LLG 用）**
  - 依存変数：`mx, my, mz`（単位磁化成分）。
  - 時間依存（Time Dependent）で LLG を解く。

### 2. 磁歪（固有ひずみ）の導入
- Solid Mechanics では、ひずみを
  $$
    \varepsilon_{ij} = \varepsilon_{ij}^{\text{mech}} + \varepsilon_{ij}^{\text{mag}}
  $$
  のように分けて扱うイメージになる。
- COMSOL では、Initial strain / Thermal strain / User-defined strain に  
  `eps_mag_xx(mx,my,mz), eps_mag_xy(mx,my,mz)` のような形で  
  「磁歪ひずみ $\varepsilon^{\text{mag}}_{ij}(\mathbf{m})$」をユーザー定義で入力することが多い。

### 3. 磁気弾性有効場の算出
- 磁気弾性エネルギー密度 $f_\text{me}(\mathbf{m},\varepsilon_{ij})$ を定義し、
  - Variables などで $f_\text{me}$ を計算。
- そこから、式として
  $$
    H_{\text{me},x} = -\frac{1}{\mu_0 M_s}\frac{\partial f_\text{me}}{\partial m_x}
  $$
  のような形を導き、COMSOL 上で `Hme_x, Hme_y, Hme_z` として定義する。
- 有効磁場：
  $$
    H_{\text{eff},x} = H_{\text{ext},x} + H_{\text{ex},x} + H_{\text{ani},x} + H_{\text{me},x} + \dots
  $$
  を Variables で定義し、LLG の右辺に使用する。


## セットアップ手順（概略フロー）

1. **モデルとパラメータの準備**
   - 3D / 2D モデルを作成。
   - Global Parameters に  
     `Ms, gamma, alpha, A_ex, Ku, lambda100, lambda111, C11, C12, C44` などを定義。

2. ジオメトリ・メッシュの作成
   - 薄膜・ナノバー・共振子などの形状を作る。
   - メッシュは、磁区幅と弾性波長を両方考慮して設定。

3. Solid Mechanics の設定
   - 材料プロパティ：弾性定数・密度を設定。
   - 境界条件：固定端 / 自由端 / 荷重 / 基板拘束など。
   - 磁歪ひずみ：
     - 「Initial strain」や「User-defined strain」として  
       `eps_mag_xx(mx,my,mz)`, `eps_mag_xy(mx,my,mz)` を式で入れる。

4. LLG PDE（General Form PDE）の設定
   - 依存変数 `mx, my, mz` を定義。
   - 有効磁場 `Hx_eff, Hy_eff, Hz_eff` を Variables で定義  
     （外部磁場 + 交換場 + 異方性場 + 磁気弾性場）。
   - General Form PDE の `f` 項として LLG の右辺
     $$
       f_x = \frac{1}{1+\alpha^2}
         \left[-\gamma (m\times H_\text{eff})_x
               -\alpha\gamma (m\times(m\times H_\text{eff}))_x\right]
     $$
     などを記述。
   - 初期条件として `mx0,my0,mz0` を設定（単一ドメインや磁壁など）。

5. スタディ（Time Dependent）の設定
   - Solid Mechanics と PDE（LLG）両方を同じ「Time Dependent」スタディに含める。
   - 時間範囲（例：0〜数 ns〜µs）と最大時間ステップを設定。
   - 連成ソルバを用いて時間発展を解かせる。

6. ポストプロセス
   - 磁化分布（`mx,my,mz`）と、ひずみ・応力分布（`eps_xx, sigma_xx` など）を可視化。
   - 全体の磁気エネルギー・弾性エネルギー・磁気弾性エネルギーの時間変化をプロット。
   - 特定位置の変位・磁化の時間応答を取り出し、フーリエ解析で共鳴周波数を抽出。


## 注意点

- 時間スケールの違い
  - 弾性波（音速）と磁化プリセッション（GHz 領域）の時間スケールの関係を考慮し、時間ステップと解析時間を設定する。
- 物性値の一貫性
  - $\lambda_{100}, \lambda_{111}, C_{ij}, M_s, A, K_u$ などを実験・第一原理計算から取り込み、SI 単位に変換して入力する。
- メッシュと安定性
  - 磁区幅・弾性波長を解像できるメッシュが必要だが、細かすぎると計算時間が増大する。  
  - モデルサイズ・解析目的に応じて 2D 化・対称性利用も検討する。
- $|\mathbf{m}|=1$ 制約の扱い
  - 数値的に $|\mathbf{m}|=1$ が崩れやすい
  - 事後正規化やペナルティ項、あるいは比較的短時間のダイナミクス解析から始めると扱いやすい。

