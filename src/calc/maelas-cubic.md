# 立方晶 (cubic I) 磁性体の弾性・磁気弾性定数

立方晶 (cubic I) の磁性体では、弾性は 3 つの独立弾性定数 $C_{11},C_{12},C_{44}$ で表され、一次（ひずみに一次）の磁気弾性は体積項を含めて $b_0,b_1,b_2$ の 3 定数に整理される。これらを同一の自由エネルギー展開に置き、ひずみ消去（最小化）により平衡ひずみと磁歪定数 $\lambda_{001}(\equiv\lambda_{100}),\lambda_{111}$ の厳密な関係式へ展開する。

## 参考ドキュメント
1. Nieves et al., MAELAS: MAgneto-ELAStic properties calculation via computational high-throughput approach, arXiv:2009.01638
https://arxiv.org/pdf/2009.01638

2. Mouhat & Coudert, Necessary and Sufficient Elastic Stability Conditions in Various Crystal Systems, arXiv:1410.0065
https://arxiv.org/pdf/1410.0065

3. 田結荘 健, スピネルフェライト薄膜のスピントロニクスへの応用（学位論文, 磁気弾性定数 $B_1$ の説明を含む）, 筑波大学リポジトリ
https://tsukuba.repo.nii.ac.jp/record/51175/files/DA08966.pdf

## 1. 前提と記号

### 1.1 座標と方向余弦
結晶座標は立方晶の主軸
$(x,y,z)=([100],[010],[001])$
に取る。

磁化方向（飽和磁化の向き）の単位ベクトルを
$\boldsymbol{\alpha}=(\alpha_1,\alpha_2,\alpha_3)$
とし、
$\alpha_1^2+\alpha_2^2+\alpha_3^2=1$
である。

長さ変化（磁歪）を評価する測定方向の単位ベクトルを
$\boldsymbol{\beta}=(\beta_1,\beta_2,\beta_3)$
とし、
$\beta_1^2+\beta_2^2+\beta_3^2=1$
である。

### 1.2 微小ひずみテンソル
微小ひずみ（infinitesimal strain）として対称テンソル $\varepsilon_{ij}$ を用いる。
体積ひずみは
$\varepsilon_v=\mathrm{tr}(\varepsilon)=\varepsilon_{xx}+\varepsilon_{yy}+\varepsilon_{zz}$
である。

### 1.3 Voigt 記法
以下では、せん断成分に 2 倍因子を含める工学ひずみベクトルを採用する。

応力：
$\boldsymbol{\sigma}=(\sigma_{xx},\sigma_{yy},\sigma_{zz},\sigma_{yz},\sigma_{xz},\sigma_{xy})$

ひずみ（工学ひずみ）：
$\tilde{\boldsymbol{\varepsilon}}=(\tilde{\varepsilon}_1,\ldots,\tilde{\varepsilon}_6)$ を
$$
\tilde{\varepsilon}_1=\varepsilon_{xx},\quad
\tilde{\varepsilon}_2=\varepsilon_{yy},\quad
\tilde{\varepsilon}_3=\varepsilon_{zz},\quad
\tilde{\varepsilon}_4=2\varepsilon_{yz},\quad
\tilde{\varepsilon}_5=2\varepsilon_{xz},\quad
\tilde{\varepsilon}_6=2\varepsilon_{xy}
$$
と定義する。

このときフック則は
$$
\sigma_i=\sum_{j=1}^6 C_{ij}\tilde{\varepsilon}_j
$$
である。

対応表：

| Voigt index | テンソル成分 | 対応 |
|---:|---|---|
| 1 | $xx$ | $\tilde{\varepsilon}_1=\varepsilon_{xx},\ \sigma_1=\sigma_{xx}$ |
| 2 | $yy$ | $\tilde{\varepsilon}_2=\varepsilon_{yy},\ \sigma_2=\sigma_{yy}$ |
| 3 | $zz$ | $\tilde{\varepsilon}_3=\varepsilon_{zz},\ \sigma_3=\sigma_{zz}$ |
| 4 | $yz$ | $\tilde{\varepsilon}_4=2\varepsilon_{yz},\ \sigma_4=\sigma_{yz}$ |
| 5 | $xz$ | $\tilde{\varepsilon}_5=2\varepsilon_{xz},\ \sigma_5=\sigma_{xz}$ |
| 6 | $xy$ | $\tilde{\varepsilon}_6=2\varepsilon_{xy},\ \sigma_6=\sigma_{xy}$ |


## 2. 立方晶(cubic I)の弾性：$C_{11},C_{12},C_{44}$

### 2.1 自由エネルギーの二次展開と $E_0$
基準状態（無ひずみ）の全エネルギーを $E_0$、基準体積を $V_0$ とする。弾性エネルギーはひずみの二次までで
$$
E_{\mathrm{el}}(\varepsilon)
=
E_0
+
V_0\,u_{\mathrm{el}}(\varepsilon),
\qquad
u_{\mathrm{el}}=\frac{1}{2}c_{ijkl}\varepsilon_{ij}\varepsilon_{kl}
$$
と書ける。ここで $u_{\mathrm{el}}$ はエネルギー密度である。

立方晶の回転対称性により、独立弾性定数は 3 つに縮約され、剛性行列は
$$
\mathbf{C}_{\mathrm{cubic}}=
\begin{pmatrix}
C_{11}&C_{12}&C_{12}&0&0&0\\
C_{12}&C_{11}&C_{12}&0&0&0\\
C_{12}&C_{12}&C_{11}&0&0&0\\
0&0&0&C_{44}&0&0\\
0&0&0&0&C_{44}&0\\
0&0&0&0&0&C_{44}
\end{pmatrix}
$$
に固定される。

### 2.2 工学ひずみ（Voigt）での弾性エネルギー
工学ひずみ $\tilde{\varepsilon}_i$ を用いると、弾性エネルギー密度は
$$
\frac{E_{\mathrm{el}}-E_0}{V_0}
=
\frac{1}{2}C_{11}\left(\tilde{\varepsilon}_1^2+\tilde{\varepsilon}_2^2+\tilde{\varepsilon}_3^2\right)
+
C_{12}\left(\tilde{\varepsilon}_1\tilde{\varepsilon}_2+\tilde{\varepsilon}_2\tilde{\varepsilon}_3+\tilde{\varepsilon}_1\tilde{\varepsilon}_3\right)
+
\frac{1}{2}C_{44}\left(\tilde{\varepsilon}_4^2+\tilde{\varepsilon}_5^2+\tilde{\varepsilon}_6^2\right)
$$
である。

テンソル成分で書けば
$$
\frac{E_{\mathrm{el}}-E_0}{V_0}
=
\frac{1}{2}C_{11}\left(\varepsilon_{xx}^2+\varepsilon_{yy}^2+\varepsilon_{zz}^2\right)
+
C_{12}\left(\varepsilon_{xx}\varepsilon_{yy}+\varepsilon_{yy}\varepsilon_{zz}+\varepsilon_{zz}\varepsilon_{xx}\right)
+
2C_{44}\left(\varepsilon_{xy}^2+\varepsilon_{yz}^2+\varepsilon_{xz}^2\right)
$$
であり、せん断項の係数の見え方が Voigt の 2 倍因子により変わる点に注意する必要がある。

### 2.3 派生量：$K,C',A_Z$
立方晶で頻出する組合せとして

バルク弾性率（体積弾性率）：
$$
K=\frac{C_{11}+2C_{12}}{3}
$$

立方晶の対称せん断定数（$C'$）：
$$
C'=\frac{C_{11}-C_{12}}{2}
$$

Zener 弾性異方性因子：
$$
A_Z=\frac{2C_{44}}{C_{11}-C_{12}}=\frac{C_{44}}{C'}
$$
がある。

### 2.4 力学的安定条件（Born 条件）
微小ひずみに対して安定であるための必要十分条件は
$$
C_{11}-C_{12}>0,\qquad
C_{11}+2C_{12}>0,\qquad
C_{44}>0
$$
である。第 2 条件は $K>0$ と同値である。

### 2.5 コンプライアンス $S_{ij}$ と方向依存ヤング率
コンプライアンス行列 $\mathbf{S}=\mathbf{C}^{-1}$ の独立成分は $S_{11},S_{12},S_{44}$ であり
$$
S_{44}=\frac{1}{C_{44}},
\qquad
S_{11}=\frac{C_{11}+C_{12}}{(C_{11}-C_{12})(C_{11}+2C_{12})},
\qquad
S_{12}=-\frac{C_{12}}{(C_{11}-C_{12})(C_{11}+2C_{12})}
$$
となる。

方向 $\mathbf{n}$（方向余弦を $l_1,l_2,l_3$）に沿うヤング率 $E(\mathbf{n})$ は
$$
\frac{1}{E(\mathbf{n})}
=
S_{11}
-
2\left(S_{11}-S_{12}-\frac{S_{44}}{2}\right)\left(l_1^2l_2^2+l_2^2l_3^2+l_3^2l_1^2\right)
$$
で与えられる。


## 3. 立方晶(cubic I)の磁気弾性：一次磁気弾性定数 $b_0,b_1,b_2$

### 3.1 磁気弾性エネルギーの位置づけ
磁気弾性（magnetoelasticity）は、結晶ひずみと磁化方向が結合して全エネルギーが変化する現象である。
スピン軌道相互作用と結晶場（対称性）の下で磁気異方性がひずみに依存することが根にあり、磁化回転が格子変形を誘起する（ジュール磁歪）こと、また応力が磁化容易軸を変える（逆磁歪）ことの双方を同一の自由エネルギーで記述する。

### 3.2 最低次（ひずみに一次）の不変量と $E_0$
一次磁気弾性は「ひずみに一次、$\alpha_i$ に二次」の項で表される。
基準エネルギー $E_0$ と体積 $V_0$ を用い、磁気弾性エネルギーを
$$
E_{\mathrm{me}}(\varepsilon,\boldsymbol{\alpha})
=
E_0^{(\mathrm{me})}
+
V_0\,u_{\mathrm{me}}(\varepsilon,\boldsymbol{\alpha})
$$
と書く。多くの場合 $E_0^{(\mathrm{me})}$ は他の定数項とまとめて $E_0$ に吸収できるため、以下では密度 $u_{\mathrm{me}}$ を主として用いる。

立方晶(cubic I)で許される一次磁気弾性エネルギー密度は（体積項を含めて）3 定数で
$$
\frac{E_{\mathrm{me}}}{V_0}
=
b_0(\varepsilon_{xx}+\varepsilon_{yy}+\varepsilon_{zz})
+
b_1\left(\alpha_1^2\varepsilon_{xx}+\alpha_2^2\varepsilon_{yy}+\alpha_3^2\varepsilon_{zz}\right)
+
2b_2\left(\alpha_1\alpha_2\varepsilon_{xy}+\alpha_2\alpha_3\varepsilon_{yz}+\alpha_3\alpha_1\varepsilon_{xz}\right)
$$
と表される。

工学ひずみ（Voigt）を用いると
$$
\frac{E_{\mathrm{me}}}{V_0}
=
b_0(\tilde{\varepsilon}_1+\tilde{\varepsilon}_2+\tilde{\varepsilon}_3)
+
b_1(\alpha_1^2\tilde{\varepsilon}_1+\alpha_2^2\tilde{\varepsilon}_2+\alpha_3^2\tilde{\varepsilon}_3)
+
b_2(\alpha_2\alpha_3\tilde{\varepsilon}_4+\alpha_1\alpha_3\tilde{\varepsilon}_5+\alpha_1\alpha_2\tilde{\varepsilon}_6)
$$
となる。ここで、テンソル表記の $2b_2$ と Voigt 表記の $b_2$ が矛盾しないのは
$\tilde{\varepsilon}_4=2\varepsilon_{yz}$ 等の定義による。

### 3.3 文献で広く使われる $B_1,B_2$ との関係
磁性の教科書・講義ノートでは
$$
u_{\mathrm{me}}
=
B_1(\alpha_1^2\varepsilon_{xx}+\alpha_2^2\varepsilon_{yy}+\alpha_3^2\varepsilon_{zz})
+
2B_2(\alpha_1\alpha_2\varepsilon_{xy}+\alpha_2\alpha_3\varepsilon_{yz}+\alpha_3\alpha_1\varepsilon_{xz})
$$
の形が多い。このとき（体積項を分離していない定義であれば）
$$
B_1=b_1,\qquad B_2=b_2
$$
と同一視できる。

一方で、対角項から等方成分を明示的に除いた
$$
u_{\mathrm{me}}
=
b_1^\ast\sum_{i=1}^3\left(\alpha_i^2-\frac{1}{3}\right)\varepsilon_{ii}
+
2b_2(\alpha_1\alpha_2\varepsilon_{xy}+\alpha_2\alpha_3\varepsilon_{yz}+\alpha_3\alpha_1\varepsilon_{xz})
$$
という整理も広く用いられる。この場合、$b_1^\ast$ は $b_1$ と同じ係数であるが、$\mathrm{tr}(\varepsilon)$ に比例する等方項が $b_0$ 側に回るため、定数の分配が異なるだけである。実際に式を運用する際は、採用する $u_{\mathrm{me}}$ の形と符号規約を固定して整合を取る必要がある。

単位は
$[C_{ij}]=$ Pa、
$[b_0,b_1,b_2]=$ J/m^3（Pa と等価）、
$[\lambda]=$ 無次元
である。

---

## 4. 全自由エネルギーの最小化による平衡ひずみの導出

### 4.1 全エネルギー（弾性＋磁気弾性）と最小化条件
外部応力がない自由境界を考え、磁化方向 $\boldsymbol{\alpha}$ を固定してひずみ $\varepsilon$ を変数とする全エネルギーを
$$
E_{\mathrm{tot}}(\varepsilon;\boldsymbol{\alpha})
=
E_{\mathrm{el}}(\varepsilon)+E_{\mathrm{me}}(\varepsilon,\boldsymbol{\alpha})
$$
とする。平衡ひずみ $\varepsilon_{ij}^{\mathrm{eq}}$ は
$$
\frac{\partial E_{\mathrm{tot}}}{\partial \varepsilon_{ij}}=0
$$
で決まる。これは弾性復元力と磁気弾性駆動力の釣合いである。

### 4.2 平衡ひずみ（cubic I）の解析解
上の $u_{\mathrm{el}}$ と $u_{\mathrm{me}}$ を用いると、外部応力ゼロでの平衡ひずみは次で与えられる。

せん断成分：
$$
\varepsilon_{xy}^{\mathrm{eq}}
=
-\frac{b_2}{2C_{44}}\alpha_1\alpha_2,\qquad
\varepsilon_{yz}^{\mathrm{eq}}
=
-\frac{b_2}{2C_{44}}\alpha_2\alpha_3,\qquad
\varepsilon_{xz}^{\mathrm{eq}}
=
-\frac{b_2}{2C_{44}}\alpha_1\alpha_3
$$

対角成分：
$$
\varepsilon_{xx}^{\mathrm{eq}}
=
\frac{
-(b_0+\alpha_1^2 b_1)(C_{11}+C_{12})
+
(b_0+b_1)(\alpha_2^2+\alpha_3^2)C_{12}
}{
(C_{11}-C_{12})(C_{11}+2C_{12})
}
$$
$$
\varepsilon_{yy}^{\mathrm{eq}}
=
\frac{
-(b_0+\alpha_2^2 b_1)(C_{11}+C_{12})
+
(b_0+b_1)(\alpha_1^2+\alpha_3^2)C_{12}
}{
(C_{11}-C_{12})(C_{11}+2C_{12})
}
$$
$$
\varepsilon_{zz}^{\mathrm{eq}}
=
\frac{
-(b_0+\alpha_3^2 b_1)(C_{11}+C_{12})
+
(b_0+b_1)(\alpha_1^2+\alpha_2^2)C_{12}
}{
(C_{11}-C_{12})(C_{11}+2C_{12})
}
$$

これらは、$b_0$ が体積ひずみ方向の駆動を与え（等方磁歪に対応）、$b_1$ が対角の異方的な差を駆動し、$b_2$ がせん断を駆動することを明確に示している。

### 4.3 体積ひずみ（等方磁歪）と偏差ひずみ（異方磁歪）
対角成分を和でまとめると、
$$
\varepsilon_v^{\mathrm{eq}}
=
\varepsilon_{xx}^{\mathrm{eq}}+\varepsilon_{yy}^{\mathrm{eq}}+\varepsilon_{zz}^{\mathrm{eq}}
=
-\frac{3\left(b_0+\frac{b_1}{3}\right)}{C_{11}+2C_{12}}
$$
となり、体積方向の磁歪は $b_0$ と $b_1/3$ の組合せで決まる。

一方、異方的成分（例えば $\varepsilon_{xx}^{\mathrm{eq}}-\varepsilon_{yy}^{\mathrm{eq}}$）は $b_1$ と $C_{11}-C_{12}$ の比で決まるため、後述の $\lambda_{001}$ と直結する。

---

## 5. 磁歪の一般式と $\lambda_{001}(\equiv\lambda_{100}),\lambda_{111}$ への展開

### 5.1 長さ変化の一般式
方向 $\boldsymbol{\beta}$ に沿う相対長さ変化は
$$
\frac{\Delta l}{l_0}(\boldsymbol{\alpha},\boldsymbol{\beta})
=
\sum_{i,j}\varepsilon_{ij}^{\mathrm{eq}}(\boldsymbol{\alpha})\,\beta_i\beta_j
$$
で与えられる。

立方晶では、平衡解を用いて次の標準形に整理できる：
$$
\frac{\Delta l}{l_0}
=
\lambda^{\alpha}
+
\frac{3}{2}\lambda_{001}\left(
\alpha_1^2\beta_1^2+\alpha_2^2\beta_2^2+\alpha_3^2\beta_3^2-\frac{1}{3}
\right)
+
3\lambda_{111}\left(
\alpha_1\alpha_2\beta_1\beta_2+\alpha_2\alpha_3\beta_2\beta_3+\alpha_3\alpha_1\beta_3\beta_1
\right)
$$
ここで $\lambda^{\alpha}$ は等方（体積）成分、$\lambda_{001}$ と $\lambda_{111}$ は立方晶の異方的飽和磁歪定数である。
結晶方位の書き方の違いにより、$\lambda_{001}$ を $\lambda_{100}$ と書く流儀があるが、立方晶では同一量である。

確認：
$\boldsymbol{\alpha}=\boldsymbol{\beta}=[001]$ なら $\Delta l/l_0=\lambda^{\alpha}+\lambda_{001}$ となる。
等方項 $\lambda^{\alpha}$ を差し引いて異方成分のみを定義すれば、$\Delta l/l_0=\lambda_{001}$ と一致する。

$\boldsymbol{\alpha}=\boldsymbol{\beta}=[111]$ なら、等方項を差し引いた異方成分が $\lambda_{111}$ に一致する。

### 5.2 $\lambda^{\alpha},\lambda_{001},\lambda_{111}$ と $b_0,b_1,b_2$ の関係式
上の最小化の結果から、立方晶(cubic I)では
$$
\lambda^{\alpha}=
\frac{-b_0-\frac{b_1}{3}}{C_{11}+2C_{12}},
\qquad
\lambda_{001}=
\frac{-2b_1}{3(C_{11}-C_{12})},
\qquad
\lambda_{111}=
\frac{-b_2}{3C_{44}}
$$
が得られる。

従って、逆変換として
$$
b_1=
-\frac{3}{2}(C_{11}-C_{12})\lambda_{001}
=
-3C'\lambda_{001},
\qquad
b_2=
-3C_{44}\lambda_{111}
$$
である。

体積項についても
$$
b_0=-(C_{11}+2C_{12})\lambda^{\alpha}-\frac{b_1}{3}
$$
と戻せる。

### 5.3 代表的な整理表（記号・換算）
| 種類 | 記号 | 基本的関係式 |
|---|---|---|
| 弾性（cubic I） | $C_{11},C_{12},C_{44}$ | $K=(C_{11}+2C_{12})/3,\ C'=(C_{11}-C_{12})/2$ |
| 一次磁気弾性（cubic I） | $b_0,b_1,b_2$ | $u_{\mathrm{me}}=b_0\mathrm{tr}\varepsilon+b_1\sum_i\alpha_i^2\varepsilon_{ii}+2b_2\sum_{i<j}\alpha_i\alpha_j\varepsilon_{ij}$ |
| 磁歪（等方＋異方） | $\lambda^{\alpha},\lambda_{001}(\lambda_{100}),\lambda_{111}$ | $\lambda_{001}=-2b_1/[3(C_{11}-C_{12})],\ \lambda_{111}=-b_2/(3C_{44})$ |
| 教科書の記号 | $B_1,B_2$ | 定義が同じなら $B_1=b_1,\ B_2=b_2$（体積項は別扱いになりやすい） |

---

## 6. 対称性（既約表現）から見た「なぜ独立定数がこの数になるか」

### 6.1 ひずみの対称性分解（$A_{1g}\oplus E_g\oplus T_{2g}$）
対称ひずみテンソル（6 成分）は立方晶の既約表現に分解できる。
一例として、正規化された対称適応成分を
$$
\varepsilon^{(A_{1})}=\frac{1}{\sqrt{3}}(\varepsilon_{xx}+\varepsilon_{yy}+\varepsilon_{zz})
$$
$$
\varepsilon^{(E)}_1=\frac{1}{\sqrt{6}}(2\varepsilon_{zz}-\varepsilon_{xx}-\varepsilon_{yy}),
\qquad
\varepsilon^{(E)}_2=\frac{1}{\sqrt{2}}(\varepsilon_{xx}-\varepsilon_{yy})
$$
$$
\varepsilon^{(T_2)}_1=\varepsilon_{yz},\quad
\varepsilon^{(T_2)}_2=\varepsilon_{xz},\quad
\varepsilon^{(T_2)}_3=\varepsilon_{xy}
$$
と取ると、弾性エネルギーは
$$
u_{\mathrm{el}}
=
\frac{1}{2}K\,(3(\varepsilon^{(A_1)})^2)
+
\frac{1}{2}(2C')\left((\varepsilon^{(E)}_1)^2+(\varepsilon^{(E)}_2)^2\right)
+
2C_{44}\left((\varepsilon^{(T_2)}_1)^2+(\varepsilon^{(T_2)}_2)^2+(\varepsilon^{(T_2)}_3)^2\right)
$$
のように「表現ごとに分離」する。

ここで
$A_1$ 成分が体積（バルク）、
$E$ 成分が正方歪（tetragonal shear）、
$T_2$ 成分がせん断（shear）
に対応する。

### 6.2 磁化方向二次量の分解と結合
$\alpha_i$ の二次量も同じ既約表現で整理できる。
例えば
$$
f^{(A_1)}=1,\quad
f^{(E)}_1=\frac{1}{\sqrt{6}}(2\alpha_3^2-\alpha_1^2-\alpha_2^2),\quad
f^{(E)}_2=\frac{1}{\sqrt{2}}(\alpha_1^2-\alpha_2^2),
$$
$$
f^{(T_2)}_1=\alpha_2\alpha_3,\quad
f^{(T_2)}_2=\alpha_1\alpha_3,\quad
f^{(T_2)}_3=\alpha_1\alpha_2
$$
と置けば、一次磁気弾性は
$$
u_{\mathrm{me}}
=
\underbrace{b_0'\,\varepsilon^{(A_1)}f^{(A_1)}}_{\text{等方（体積）}}
+
\underbrace{b_1'\left(\varepsilon^{(E)}_1 f^{(E)}_1+\varepsilon^{(E)}_2 f^{(E)}_2\right)}_{\text{対角の異方}}
+
\underbrace{b_2'\sum_{k=1}^3 \varepsilon^{(T_2)}_k f^{(T_2)}_k}_{\text{せん断}}
$$
のように書ける。等方・対角異方・せん断の 3 種の結合しか許されないことが、一次磁気弾性が 3 定数（$b_0,b_1,b_2$）で十分であることの群論的理由である。

---

## 7. 定数の抽出に向けたエネルギー式の具体展開（解析式の形）

ここでは、自由エネルギー展開がどのような「ひずみ依存の曲率・傾き」として現れるかを、解析式として明示する。

### 7.1 弾性定数の抽出に対応する基本ひずみモード
基準体積 $V_0$ に対して小ひずみ $\delta$ を与える。

(1) 体積ひずみ（等方）：
$\varepsilon_{xx}=\varepsilon_{yy}=\varepsilon_{zz}=\delta$、
他 0。
このとき
$$
\frac{E_{\mathrm{el}}-E_0}{V_0}
=
\frac{3}{2}(C_{11}+2C_{12})\delta^2
=
\frac{9}{2}K\delta^2
$$
となり、エネルギー曲率から $K$ が決まる。

(2) 正方歪（$C_{11}-C_{12}$）：
$\varepsilon_{xx}=\delta,\ \varepsilon_{yy}=-\delta,\ \varepsilon_{zz}=0$、
他 0。
このとき
$$
\frac{E_{\mathrm{el}}-E_0}{V_0}
=
(C_{11}-C_{12})\delta^2
=
2C'\delta^2
$$
となり、$C'$ が決まる。

(3) 純せん断（$C_{44}$）：
$\varepsilon_{xy}=\delta$、
他 0。
このとき
$$
\frac{E_{\mathrm{el}}-E_0}{V_0}
=
2C_{44}\delta^2
$$
となり、$C_{44}$ が決まる。

### 7.2 磁気弾性定数の抽出に現れる一次項（傾き）
一次磁気弾性は「ひずみに一次」であるため、磁化方向を変えたエネルギー差の「ひずみに対する一次係数」として現れる。

(1) $b_1$ に敏感な設定：
正方歪 $\varepsilon_{xx}=\delta,\varepsilon_{yy}=-\delta$ を与え、磁化を $[100]$ と $[010]$ に置く。
このとき
$$
\left.\frac{E_{\mathrm{me}}}{V_0}\right|_{\alpha=[100]}
=b_1\delta,
\qquad
\left.\frac{E_{\mathrm{me}}}{V_0}\right|_{\alpha=[010]}
=-b_1\delta
$$
より
$$
\Delta E(\delta)\equiv E(\alpha=[100]) - E(\alpha=[010])
=
2V_0 b_1\,\delta
$$
となる。従って $\Delta E$ の $\delta$ に対する傾きから $b_1$ が決まる。

(2) $b_2$ に敏感な設定：
純せん断 $\varepsilon_{xy}=\delta$ を与え、磁化を $[110]$ と $[1\bar{1}0]$ に置く。
$\alpha_1\alpha_2=\pm 1/2$ であるから
$$
\left.\frac{E_{\mathrm{me}}}{V_0}\right|_{\alpha=[110]}
= b_2\delta,
\qquad
\left.\frac{E_{\mathrm{me}}}{V_0}\right|_{\alpha=[1\bar{1}0]}
= -b_2\delta
$$
となり
$$
\Delta E(\delta)\equiv E(\alpha=[110]) - E(\alpha=[1\bar{1}0])
=
2V_0 b_2\,\delta
$$
が得られる。

(3) $b_0$ の解釈：
$b_0$ は $\mathrm{tr}(\varepsilon)$ と結合する等方項であるため、異方的な磁歪（$\lambda_{001},\lambda_{111}$）のみを議論する場合は観測量から消去されやすい。
一方で体積磁歪（等方成分）$\lambda^\alpha$ を含めて議論する場合には $b_0$ が必要である。

---

## 8. 補遺：他晶系の記号 $b_{21},b_{22},b_3,b_4$ との関係の見取り

六方晶(hexagonal I)など、対称性が立方晶より低い系では、一次磁気弾性の独立定数が増え、例えば
$$
b_{21},\ b_{22},\ b_3,\ b_4,\ \ldots
$$
のような添字付の定数で整理されることがある。
この表記は、同じ「一次磁気弾性＝ひずみに一次、方向余弦に二次」という枠組みの中で、結晶の対称操作の下で独立に残る不変量の数が増えることを反映している。

立方晶(cubic I)は高対称であるため、一次の異方磁歪に本質的な結合は「対角の異方（$b_1$）」と「せん断（$b_2$）」の 2 種に縮約し、さらに等方（体積）成分として $b_0$ が付随する、という構造になる。


## まとめと展望

立方晶(cubic I)磁性体では、弾性エネルギーの対称性制約により独立弾性定数が $C_{11},C_{12},C_{44}$ の 3 つに限定され、一次磁気弾性も等方項を含めて $b_0,b_1,b_2$ の 3 定数に整理される。全自由エネルギー $E_{\mathrm{el}}+E_{\mathrm{me}}$ をひずみで最小化することで平衡ひずみが解析的に得られ、その結果として磁歪の一般式と、$\lambda^{\alpha},\lambda_{001}(\lambda_{100}),\lambda_{111}$ が弾性定数と磁気弾性定数により厳密に結び付く関係式が導かれる。

今後の展望としては、(i) 二次磁気弾性（ひずみ二次、方向余弦四次など）の導入により、高ひずみ・強磁気異方性条件での非線形項を整合的に取り込むこと、(ii) 立方晶から正方晶・六方晶などへ対称性が低下した場合の不変量増加を同一形式で追跡し、定数間の比較可能性（記号対応）を明確化すること、(iii) 第一原理計算により $C_{ij}$ と $b_i$ を同一理論枠組みで評価し、温度・組成・スピン秩序の変調まで含めた自由エネルギーへ拡張することが重要である。


## 参考文献
- Callen & Callen, Static Magnetoelastic Coupling in Cubic Crystals, J. Phys. Chem. Solids 27, 1271–1285 (1966)
https://doi.org/10.1016/0022-3697(66)90102-2

- 日本磁気学会誌（磁歪・磁気材料に関する解説を含む号の一例）
https://www.magnetics.jp/wp-content/uploads/TMSJ5_1_2021.pdf

- 弾性定数テンソルと対称性の講義ノート（弾性行列の形と Voigt 記法の整理）
https://courses.physics.illinois.edu/phys498ess/sp2019/Notes/12_Elastic_constants.pdf
