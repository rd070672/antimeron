# 弾塑性構成モデルの基本方程式

弾塑性モデルは、弾性変形と不可逆な塑性変形を分離し、荷重履歴に依存する応力–ひずみ応答を内部変数を通じて表現する枠組みである。降伏条件・流れ則・硬化則・応力更新アルゴリズムが基本骨格となる。

## 参考ドキュメント
- J.C. Simo, T.J.R. Hughes, Computational Inelasticity, Springer (1998)
  https://link.springer.com/book/10.1007/978-1-4757-3553-3
- R. de Borst, M.A. Crisfield, J.J.C. Remmers, C.V. Verhoosel, Nonlinear Finite Element Analysis of Solids and Structures, Wiley (2012)
  https://onlinelibrary.wiley.com/doi/book/10.1002/9781118375938
- [日本語] 東京大学（材料力学/塑性力学系）講義資料：塑性の基礎（降伏条件・流れ則・硬化）
  https://www.cem.t.u-tokyo.ac.jp/

## 1. 記号と前提
- 応力：$\boldsymbol{\sigma}$
- 全ひずみ：$\boldsymbol{\varepsilon}$
- 弾性ひずみ：$\boldsymbol{\varepsilon}^e$
- 塑性ひずみ：$\boldsymbol{\varepsilon}^p$
- 弾性テンソル：$\mathbb{C}$
- 偏差応力：$\mathbf{s}=\boldsymbol{\sigma}-\frac{1}{3}\mathrm{tr}(\boldsymbol{\sigma})\mathbf{I}$
- 不変量：$I_1=\mathrm{tr}(\boldsymbol{\sigma})$,  $J_2=\frac{1}{2}\mathbf{s}:\mathbf{s}$

小ひずみ弾塑性では、ひずみの加算分解
$$
\boldsymbol{\varepsilon}=\boldsymbol{\varepsilon}^e+\boldsymbol{\varepsilon}^p
$$
を採用する。

## 2. 自由エネルギーと散逸
内部変数 $\mathbf{a}$（等方硬化変数、背応力、損傷変数など）を導入し、自由エネルギー密度を
$$
\psi=\psi(\boldsymbol{\varepsilon}^e,\mathbf{a})
$$
とする。応力は
$$
\boldsymbol{\sigma}=\frac{\partial\psi}{\partial\boldsymbol{\varepsilon}^e}
$$
で与えられる。

等温過程の散逸不等式（Clausius–Duhem）に基づき、散逸率 $D$ が
$$
D=\boldsymbol{\sigma}:\dot{\boldsymbol{\varepsilon}}-\dot{\psi}\ge 0
$$
を満たすように塑性発展則を設計する。この条件は、流れ則と硬化則が非物理（負散逸）を生じないための出発点である。

## 3. 弾性則
等方線形弾性では
$$
\boldsymbol{\sigma}=\mathbb{C}:\boldsymbol{\varepsilon}^e
=\mathbb{C}:(\boldsymbol{\varepsilon}-\boldsymbol{\varepsilon}^p)
$$
であり、Lamé 定数 $\lambda_L, G$ を用いると
$$
\boldsymbol{\sigma}=2G\,\boldsymbol{\varepsilon}_{\mathrm{dev}}^e+\lambda_L\,\mathrm{tr}(\boldsymbol{\varepsilon}^e)\mathbf{I}
$$
である。$G$ はせん断弾性率である。

## 4. 降伏条件と塑性
降伏関数 $f$ を用いて
$$
f(\boldsymbol{\sigma},\mathbf{a})\le 0
$$
を弾性域、$f=0$ を降伏面とする。代表例を挙げる。

### 4.1 von Mises（$J_2$）降伏
等方性金属で標準的な降伏条件は
$$
f(\boldsymbol{\sigma},\kappa)=\sqrt{\frac{3}{2}}\|\mathbf{s}\|-\sigma_y(\kappa)
$$
である。$\kappa$ は等方硬化変数、$\sigma_y(\kappa)$ は硬化により変化する降伏応力である。

### 4.2 圧力依存：Drucker–Prager 型
圧力依存性を表す一例として
$$
f=\sqrt{J_2}+\alpha I_1-k
$$
がある。粉体、地盤、脆性材料などで用いられる。

## 5. 流れ則：塑性ひずみ
塑性ひずみ速度を塑性ポテンシャル $g$ を用いて
$$
\dot{\boldsymbol{\varepsilon}}^p=\dot{\lambda}\,\frac{\partial g}{\partial\boldsymbol{\sigma}}
$$
とする。$\dot{\lambda}\ge 0$ は塑性乗数である。

- 関連流れ則：$g=f$
- 非関連流れ則：$g\ne f$

塑性の開始・停止は Kuhn–Tucker 条件で表す。
$$
f\le 0,\quad \dot{\lambda}\ge 0,\quad \dot{\lambda}f=0
$$
塑性域では整合条件（consistency condition）
$$
\dot{f}=0
$$
が成立し、$\dot{\lambda}$ が決定される。

### 5.1 等価塑性ひずみ
等方硬化の駆動量として等価塑性ひずみ速度
$$
\dot{\bar{\varepsilon}}^p=\sqrt{\frac{2}{3}}\|\dot{\boldsymbol{\varepsilon}}^p\|
$$
を定義することが多い。

## 6. 硬化則と降伏面
硬化は、塑性変形に伴い降伏条件が変化する効果である。

### 6.1 等方硬化（isotropic hardening）
降伏面が同心的に膨張（または収縮）する。線形硬化の例：
$$
\sigma_y(\kappa)=\sigma_{y0}+H\kappa,\quad \dot{\kappa}=\dot{\bar{\varepsilon}}^p
$$
より現実的な Voce 型の例：
$$
\sigma_y(\kappa)=\sigma_{y0}+Q\left(1-e^{-b\kappa}\right)
$$

### 6.2 移動硬化（kinematic hardening）
降伏面が応力空間内で並進し、Bauschinger 効果などを表現する。背応力 $\boldsymbol{\alpha}$ を導入し
$$
f=\sqrt{\frac{3}{2}}\|\mathbf{s}-\boldsymbol{\alpha}\|-\sigma_y(\kappa)
$$
とする。

Prager 型（線形移動硬化）の一例：
$$
\dot{\boldsymbol{\alpha}}=c\,\dot{\boldsymbol{\varepsilon}}^p_{\mathrm{dev}}
$$

Chaboche 型（非線形移動硬化）の代表形：
$$
\boldsymbol{\alpha}=\sum_{i=1}^{n}\boldsymbol{\alpha}_i,\quad
\dot{\boldsymbol{\alpha}}_i=
\frac{2}{3}c_i\,\dot{\boldsymbol{\varepsilon}}^p
-\gamma_i\,\boldsymbol{\alpha}_i\,\dot{\bar{\varepsilon}}^p
$$

### 6.3 混合硬化
等方硬化と移動硬化を同時に用い、単調変形と繰り返し変形の双方を記述する。繰り返し硬化/軟化やラチェッティングを扱う際は、背応力成分を複数用いることが多い。

## 7. 応力更新の数値解法：後退オイラー
有限要素法では増分（時刻 $t_n\to t_{n+1}$）で応力と内部変数を更新する。最も広く用いられるのが後退オイラーに基づく return mapping である。

### 7.1 弾性予測
塑性ひずみを前時刻のまま固定して試行応力を計算する。
$$
\boldsymbol{\sigma}^{\mathrm{tr}}
=\mathbb{C}:\left(\boldsymbol{\varepsilon}_{n+1}-\boldsymbol{\varepsilon}^p_n\right)
$$
試行降伏判定：
$$
f^{\mathrm{tr}}=f(\boldsymbol{\sigma}^{\mathrm{tr}},\mathbf{a}_n)
$$

- $f^{\mathrm{tr}}\le 0$ なら弾性：
$$
\boldsymbol{\sigma}_{n+1}=\boldsymbol{\sigma}^{\mathrm{tr}},\quad \mathbf{a}_{n+1}=\mathbf{a}_n
$$
- $f^{\mathrm{tr}}>0$ なら塑性補正を行う。

### 7.2 塑性補正（塑性ステップ）
増分塑性乗数 $\Delta\lambda$ を用いて
$$
\boldsymbol{\varepsilon}^p_{n+1}=\boldsymbol{\varepsilon}^p_n+\Delta\lambda\,\mathbf{n}_{n+1},
\quad \mathbf{n}_{n+1}=\frac{\partial g}{\partial\boldsymbol{\sigma}}\Big|_{n+1}
$$
応力は
$$
\boldsymbol{\sigma}_{n+1}
=\mathbb{C}:\left(\boldsymbol{\varepsilon}_{n+1}-\boldsymbol{\varepsilon}^p_{n+1}\right)
$$
$\Delta\lambda$ は整合条件
$$
f(\boldsymbol{\sigma}_{n+1},\mathbf{a}_{n+1})=0
$$
を満たすように Newton 法などで解く。

### 7.3 $J_2$ 関連流れ則での radial return
$J_2$・関連流れ則では、偏差応力空間で降伏面へ半径方向に戻す radial return が成立しやすく、計算が安定である。代表的には、$\Delta\lambda$ を未知数としてスカラー方程式に帰着できる場合が多い。

## 8. 一貫接線剛性（consistent tangent）
非線形有限要素法では Newton 法で平衡方程式を解くため、材料接線
$$
\mathbb{C}_{\mathrm{ep}}=\frac{\partial \boldsymbol{\sigma}_{n+1}}{\partial \boldsymbol{\varepsilon}_{n+1}}
$$
が収束性を支配する。塑性ステップでは return mapping と整合した $\mathbb{C}_{\mathrm{ep}}$（一貫接線）を用いることで反復が安定化する。

## 9. 有限ひずみ弾塑性
大変形では加算分解が不適切となり、変形勾配の乗法分解
$$
\mathbf{F}=\mathbf{F}^e\mathbf{F}^p
$$
を用いる。弾性応答は $\mathbf{F}^e$ から、塑性流れは $\mathbf{F}^p$ の発展として記述する。剛体回転に対する客観性（objective stress rate）や更新則の選択が重要となる。

## 10. 粘塑性（rate dependence）による正則化
時間依存（速度依存）を導入すると、数値的安定性や局所化の抑制に寄与する。Perzyna 型の代表例：
$$
\dot{\lambda}=\left\langle \frac{f}{\eta}\right\rangle^{m}
$$
ここで $\eta$ は粘性係数、$m$ は指数、$\langle x\rangle=\max(x,0)$ である。

## 11. 局所化とメッシュ依存
軟化を含むモデル（損傷結合など）では、ひずみ局所化により解がメッシュに依存しやすくなる。これに対して

- 非局所モデル（内部変数の空間平均）
- 勾配塑性（$\nabla\kappa$ などを導入）
- 位相場損傷や非線形破壊モデルとの結合

などにより内部長さスケールを与える方法が採られる。

## 12. 結晶塑性との関係
多結晶金属の $J_2$ 弾塑性は、転位すべりの統計平均として理解できる。結晶塑性では、すべり系 $\alpha$ ごとに
$$
\dot{\boldsymbol{\varepsilon}}^p=\sum_{\alpha}\dot{\gamma}^{\alpha}\mathbf{m}^{\alpha}
$$
（$\dot{\gamma}^{\alpha}$：すべり速度、$\mathbf{m}^{\alpha}$：シュミットテンソル）とし、分解せん断応力 $\tau^{\alpha}$ に対して降伏・硬化を定める。集合組織、異方性、寸法効果などの説明力が高い一方で、計算コストは増大する。

## 13. モデル選択
| 目的/現象 | 代表モデル | 主な未知パラメータ | 典型的な注意点 |
|---|---|---|---|
| 単調引張（延性金属） | $J_2$ + 等方硬化（線形/Voce） | $E,\nu,\sigma_{y0},H$ または $Q,b$ | 反転負荷の表現は限定的 |
| 繰り返し塑性 | $J_2$ + Chaboche（移動硬化） + 等方硬化 | $c_i,\gamma_i,Q,b$ | ループの同定が必要 |
| 圧力依存材料 | Drucker–Prager / Mohr–Coulomb | $\alpha,k$ など | 非関連流れ則の扱い |
| 大変形成形 | 有限ひずみ弾塑性 | 更新則パラメータ | 客観性と積分法が鍵 |
| 局所化や破壊 | 勾配塑性/非局所/損傷結合 | 内部長さ、損傷係数 | メッシュ依存対策が前提 |

## 14. キーワード
- 弾性定数：小ひずみ域より $E,\nu$
- 初期降伏：$\sigma_{y0}$（例えば 0.2% 耐力など）
- 等方硬化：単調試験から $\sigma_y(\kappa)$ をフィット（線形/Voce）
- 移動硬化：反転負荷（引張–圧縮、ループ）から $\{c_i,\gamma_i\}$ を同定
- 圧力依存：三軸試験などから $I_1$ 依存性を同定
- 異方性：複数方位の降伏・塑性流れデータを用いる

## まとめ
弾塑性モデルは、降伏条件 $f$、流れ則 $\dot{\boldsymbol{\varepsilon}}^p=\dot{\lambda}\,\partial g/\partial\boldsymbol{\sigma}$、硬化則（等方・移動・混合）を、熱力学に整合する形で組み合わせた構成理論である。数値計算では return mapping を核として応力と内部変数を更新し、一貫接線剛性により非線形収束を安定化する。対象現象に応じて圧力依存、有限ひずみ、粘塑性、非局所化、結晶塑性へ拡張することで、より広い変形・履歴応答を扱えるようになる。
