# 磁気弾性効果（magnetoelasticity）の定式化

磁気弾性効果とは、磁化状態と弾性ひずみ（応力）が相互に影響し合う結合現象である。磁歪（磁化による形状変化）と逆磁歪（応力による磁気異方性の誘起）を、同一の自由エネルギー枠組みで扱うことが要点である。

## 参考ドキュメント
- Fritsch, Ederer, First-principles calculations of magnetoelastic constants and magnetostriction (arXiv:1203.1051)  
  https://arxiv.org/abs/1203.1051
- Magnon-induced elastic and magnetoelastic field in ferromagnetic materials (Sci Rep 13, 2023)  
  https://www.nature.com/articles/s41598-023-28100-x
- 磁歪と磁気異方性：現象論と電子論（日本磁気学会 学術講演概要, 日本語）  
  https://www.magnetics.jp/kouenkai/2016/doc/program/7pE-1.pdf


## 1. 数式記号と前提
### 1.1 磁化
- 磁化ベクトル $\mathbf{M}$、飽和磁化 $M_s$
- 単位磁化 $\mathbf{m}=\mathbf{M}/M_s$（$|\mathbf{m}|=1$）
- 立方晶での方向余弦 $\boldsymbol{\alpha}=(\alpha_1,\alpha_2,\alpha_3)$（結晶軸 $[100],[010],[001]$ に対する $\mathbf{m}$ の成分）

### 1.2 ひずみ・応力
- 変位 $\mathbf{u}(\mathbf{x})$ に対して微小ひずみ
$$
\boldsymbol{\varepsilon}=\frac{\nabla\mathbf{u}+(\nabla\mathbf{u})^{\mathsf T}}{2}
$$
- 応力テンソル $\boldsymbol{\sigma}$
- 弾性率（フック則）
$$
\boldsymbol{\sigma}=\mathbb{C}:(\boldsymbol{\varepsilon}-\boldsymbol{\varepsilon}_0)
$$
ここで $\mathbb{C}$ は弾性定数テンソル、$\boldsymbol{\varepsilon}_0$ は固有ひずみ（磁歪ひずみを含めて表現することが多い）

## 2. 自由エネルギーの最小化としての磁気弾性
磁気弾性は、磁気エネルギーと弾性エネルギーを足し合わせた自由エネルギーを最小化することで定まる。

### 2.1 全自由エネルギー（連続体）
領域 $\Omega$ に対して、全エネルギー汎関数を
$$
F[\mathbf{m},\mathbf{u}]
=\int_{\Omega}
\left\{
f_{\mathrm{mag}}(\mathbf{m},\nabla\mathbf{m})
+f_{\mathrm{el}}(\boldsymbol{\varepsilon})
+f_{\mathrm{me}}(\mathbf{m},\boldsymbol{\varepsilon})
-\mu_0 M_s \mathbf{H}_{\mathrm{ext}}\cdot\mathbf{m}
\right\}\,dV
$$
とする。

- $f_{\mathrm{mag}}$: 交換、結晶磁気異方性、反磁界（静磁）など
- $f_{\mathrm{el}}$: 弾性エネルギー
- $f_{\mathrm{me}}$: 磁気弾性（磁歪）エネルギー
- 最小化の二変数は、磁化 $\mathbf{m}$ と変位 $\mathbf{u}$（すなわち $\boldsymbol{\varepsilon}$）である

### 2.2 弾性エネルギー（線形弾性）
$$
f_{\mathrm{el}}(\boldsymbol{\varepsilon})=\frac{1}{2}\boldsymbol{\varepsilon}:\mathbb{C}:\boldsymbol{\varepsilon}
$$
（固有ひずみを導入する場合は $f_{\mathrm{el}}=\frac{1}{2}(\boldsymbol{\varepsilon}-\boldsymbol{\varepsilon}_0):\mathbb{C}:(\boldsymbol{\varepsilon}-\boldsymbol{\varepsilon}_0)$ とする）

## 3. 逆磁歪（応力誘起磁気異方性）の最も単純な式
一軸応力 $\sigma$ を受ける等方近似（多結晶平均）で、応力軸を単位ベクトル $\mathbf{n}$ とすると
$$
f_{\sigma}(\mathbf{m})=-K_{\sigma}(\mathbf{m}\cdot\mathbf{n})^2
\quad(\text{定数項は省略})
$$
$$
K_{\sigma}=\frac{3}{2}\lambda\sigma
$$
ここで $\lambda$ は（等方近似の）磁歪定数である。符号により、引張で容易軸になる（$\lambda>0$）か困難軸になる（$\lambda<0$）かが決まる。

別表現として
$$
f_{\sigma}=-\frac{3}{2}\lambda\sigma\left[(\mathbf{m}\cdot\mathbf{n})^2-\frac{1}{3}\right]
$$
と書けば、体積一定（トレース零）に対応する定数項を含めた形になる。

## 4. 単結晶（立方晶）における磁気弾性エネルギー：$b_1$, $b_2$ 形式
立方晶での代表的な磁気弾性エネルギー密度は
$$
f_{\mathrm{me}}(\boldsymbol{\alpha},\boldsymbol{\varepsilon})=
b_1\left(\alpha_1^2\varepsilon_{xx}+\alpha_2^2\varepsilon_{yy}+\alpha_3^2\varepsilon_{zz}\right)
+2b_2\left(\alpha_1\alpha_2\varepsilon_{xy}+\alpha_2\alpha_3\varepsilon_{yz}+\alpha_3\alpha_1\varepsilon_{zx}\right)
$$

- $b_1,b_2$ は磁気弾性定数（エネルギー密度の係数）である
- 工学ひずみ（$\gamma_{xy}=2\varepsilon_{xy}$）を用いる流儀と混在しやすいので、せん断成分の $2$ の扱いを必ず確認する

### 4.1 磁歪定数 $λ_{100}$, $λ_{111}$ との関係（代表式）
立方晶では、磁歪定数 $\lambda_{100}$（$\langle 100\rangle$ 方向）と $\lambda_{111}$（$\langle 111\rangle$ 方向）を導入すると、弾性定数と結びついた関係が現れる。

代表的な整理の一例：
$$
b_1=-\frac{3}{2}\lambda_{100}(c_{11}-c_{12})
$$
$$
b_2=-3\lambda_{111}c_{44}
$$
ここで $c_{11},c_{12},c_{44}$ は立方晶の独立弾性定数である。
（符号規約は文献により変わるため、$\lambda$ の定義と合わせて整合を取ることが重要である。）

## 5. 磁歪ひずみ（固有ひずみ）としての表現
磁歪を「磁化により自発的に現れる固有ひずみ」$\boldsymbol{\varepsilon}_0(\mathbf{m})$ として入れると、弾性側は
$$
f_{\mathrm{el}}=
\frac{1}{2}\left(\boldsymbol{\varepsilon}-\boldsymbol{\varepsilon}_0(\mathbf{m})\right):\mathbb{C}:\left(\boldsymbol{\varepsilon}-\boldsymbol{\varepsilon}_0(\mathbf{m})\right)
$$
となり、磁気弾性結合が弾性エネルギー内に吸収される。

等方・体積一定の最小モデルでは
$$
\boldsymbol{\varepsilon}_0(\mathbf{m})=
\frac{3}{2}\lambda\left[\mathbf{m}\otimes\mathbf{m}-\frac{1}{3}\mathbf{I}\right]
$$
がよく用いられる（deviatoric ansatz）。

単結晶（立方晶）では、$\boldsymbol{\varepsilon}_0$ の成分を $\lambda_{100},\lambda_{111}$ と方向余弦 $\boldsymbol{\alpha}$ で展開し、$\langle 100\rangle$ の伸縮と $\langle 111\rangle$ に関係するせん断の両方を記述する。

## 6. 連成支配方程式：力学平衡と磁化ダイナミクス
### 6.1 力学（準静的）
慣性を無視する場合、力学平衡は
$$
\nabla\cdot\boldsymbol{\sigma}=0
$$
境界条件：変位拘束（$\mathbf{u}=\bar{\mathbf{u}}$）または表面力（$\boldsymbol{\sigma}\cdot\mathbf{n}=\bar{\mathbf{t}}$）など

応力は自由エネルギーから
$$
\boldsymbol{\sigma}=\frac{\partial f_{\mathrm{el}}}{\partial \boldsymbol{\varepsilon}}+\frac{\partial f_{\mathrm{me}}}{\partial \boldsymbol{\varepsilon}}
$$
で与えられる。
$b1,b2$ 形式を使うと、磁化方向に依存する「磁気弾性応力」が追加される。

### 6.2 磁化（LLG）
磁化ダイナミクスは Landau–Lifshitz–Gilbert 方程式で与えられる。
$$
\frac{d\mathbf{m}}{dt}
=-\gamma\,\mathbf{m}\times\mathbf{H}_{\mathrm{eff}}
+\alpha_G\,\mathbf{m}\times\frac{d\mathbf{m}}{dt}
$$

有効磁界はエネルギー汎関数から
$$
\mathbf{H}_{\mathrm{eff}}
=-\frac{1}{\mu_0 M_s}\frac{\delta F}{\delta \mathbf{m}}
$$
で定義される。

磁気弾性寄与は
$$
\mathbf{H}_{\mathrm{me}}
=-\frac{1}{\mu_0 M_s}\frac{\partial f_{\mathrm{me}}}{\partial \mathbf{m}}
$$
として加わる。

立方晶 $b1,b2$ 形式では、例えば結晶座標で
$$
\mathbf{H}_{\mathrm{me}}
\propto
-\frac{1}{\mu_0 M_s}
\left[
2b_1(\varepsilon_{xx}\alpha_1,\ \varepsilon_{yy}\alpha_2,\ \varepsilon_{zz}\alpha_3)
+2b_2(\cdots \text{せん断の混合項}\cdots)
\right]
$$
となり、ひずみ場が「磁気異方性として機能することが見える。

## 7. 数値連成の流れ（連続体・メッシュ系）
磁気弾性連成は、次の反復または同時解法で扱われる。

1. $\mathbf{m}$ を仮定（または前時刻から更新）
2. $\boldsymbol{\varepsilon}_0(\mathbf{m})$ あるいは $f_{\mathrm{me}}(\mathbf{m},\boldsymbol{\varepsilon})$ を評価
3. 力学平衡 $\nabla\cdot\boldsymbol{\sigma}=0$ を解き、$\boldsymbol{\varepsilon}$（または $\boldsymbol{\sigma}$）を得る
4. その $\boldsymbol{\varepsilon}$ を用いて $\mathbf{H}_{\mathrm{me}}$ を構成し、LLG を時間積分して $\mathbf{m}$ を更新
5. 収束するまで反復（または時間発展で逐次）

- 反磁界、電磁誘導（渦電流）まで含めるとさらに多場連成になる
- ひずみ・応力の取り扱い（工学せん断 vs テンソルせん断）と、座標系（結晶座標 vs 試料座標）の取り違えが典型的なバグ源である

## 8. 第一原理計算（DFT）との接続：b1, b2 の求め方の骨格
磁気弾性定数は「磁化方向を固定した全エネルギーが、与えたひずみに対してどのように変化するか」から決定できる。

代表的には：
- 立方晶で小さな tetragonal ひずみ（$\varepsilon_{xx}=-\varepsilon_{yy}$ など）や shear ひずみ（$\varepsilon_{xy}$ など）を与える
- 磁化方向を結晶軸に沿って変えて全エネルギー差を計算する
- エネルギー差をひずみの一次係数としてフィットし $b_1,b_2$ を抽出する

同時に弾性定数 $c_{ij}$ を別計算で求めれば、$\lambda_{100},\lambda_{111}$ などの磁歪定数へ変換できる。
この変換は、磁気弾性のエネルギー係数と弾性率の組として現れるためである。

## 9. パラメータと単位の早見表
| 量 | 意味 | 典型単位 | 備考 |
|---|---|---|---|
| $M_s$ | 飽和磁化 | A/m | 温度・組成で変化 |
| $\lambda,\lambda_s$ | 等方（多結晶平均）磁歪定数 | 無次元 | $10^{-6}\sim10^{-3}$ 程度が多い |
| $\lambda_{100},\lambda_{111}$ | 立方晶の磁歪定数 | 無次元 | $\langle 100\rangle,\langle 111\rangle$ に対応 |
| $b_1,b_2$ | 磁気弾性定数（エネルギー係数） | J/m$^3$（=Pa） | 符号規約に注意 |
| $c_{11},c_{12},c_{44}$ | 立方晶弾性定数 | Pa | $b\to\lambda$ 変換に使う |
| $K_u$ | 一軸異方性定数 | J/m$^3$ | 応力誘起 $K_u=(3/2)\lambda\sigma$ |

## まとめ
- 磁気弾性効果は、自由エネルギーに磁気弾性項 $f_{\mathrm{me}}$ を加え、磁化 $\mathbf{m}$ とひずみ $\boldsymbol{\varepsilon}$（変位 $\mathbf{u}$）を同時に決める枠組みで定式化できる。
- 応力誘起の有効異方性は $K_u=\frac{3}{2}\lambda\sigma$ の形で表され、単結晶では $b_1,b_2$ と方向余弦 $\boldsymbol{\alpha}$、ひずみテンソル $\boldsymbol{\varepsilon}$ で記述される。
- 連成計算では、力学平衡（$\nabla\cdot\boldsymbol{\sigma}=0$）と LLG（$d\mathbf{m}/dt$）を、エネルギー微分で結び付けることで一貫したモデルになる。
- $b_1,b_2$（および $\lambda_{100},\lambda_{111}$）は、ひずみを与えた全エネルギーの磁化方向依存から決定でき、弾性定数と組にして磁歪へ変換できる。
