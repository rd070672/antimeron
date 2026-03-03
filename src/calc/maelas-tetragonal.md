# 正方晶 (Tetragonal I) 磁性体における弾性・磁気弾性定数

正方晶（tetragonal I）磁性体では、結晶の四回回転対称性により弾性定数と磁気弾性（magnetoelastic）結合項の独立成分数が系統的に制約される。ここでは微小ひずみ理論の枠組みで、弾性エネルギーと磁気弾性エネルギーの不変量（invariant）展開から、定数の数・形・相互関係を導出する。

### 参考ドキュメント
1. Mouhat, F., Coudert, F.-X., Necessary and sufficient elastic stability conditions in various crystal systems, Physical Review B (2014).
  https://arxiv.org/pdf/1410.0065
2. M. Blanco-Rey ほか, MAELAS 2.0: A new version of a computer program for the calculation of magneto-elastic properties, arXiv:2106.03624 (2021).
  https://arxiv.org/pdf/2106.03624
3. 日本磁気学会（magnetics.jp）講習会資料：磁歪と磁気異方性（現象論と電子論）(2016)（PDF）。
  https://www.magnetics.jp/kouenkai/2016/doc/program/36ALL.pdf

## 1. 前提と記法

### 1.1 正方晶の座標系
正方晶では格子定数が $a=b\neq c$ であり、結晶主軸を
- $x \parallel a$，
- $y \parallel b$，
- $z \parallel c$

と置く。点群としては $4/mmm$（$D_{4h}$）を想定する（以下、この対称性のもとで議論する）。

### 1.2 ひずみ・応力・Voigt 記法
変位場 $\mathbf{u}(\mathbf{r})$ に対し、微小ひずみテンソルは
$$
\varepsilon_{ij}=\frac{1}{2}\left(\frac{\partial u_i}{\partial r_j}+\frac{\partial u_j}{\partial r_i}\right)
\quad (i,j=x,y,z)
$$
である。Voigt 記法では
$$
\boldsymbol{\eta}=
\begin{pmatrix}
\eta_1\\ \eta_2\\ \eta_3\\ \eta_4\\ \eta_5\\ \eta_6
\end{pmatrix}
=
\begin{pmatrix}
\varepsilon_{xx}\\
\varepsilon_{yy}\\
\varepsilon_{zz}\\
2\varepsilon_{yz}\\
2\varepsilon_{xz}\\
2\varepsilon_{xy}
\end{pmatrix},
\quad
\boldsymbol{\sigma}=
\begin{pmatrix}
\sigma_{xx}\\
\sigma_{yy}\\
\sigma_{zz}\\
\sigma_{yz}\\
\sigma_{xz}\\
\sigma_{xy}
\end{pmatrix}
$$
と置く。


## 2. 正方晶における弾性定数：独立成分の導出と展開

### 2.1 一般論：弾性テンソルの対称性
線形弾性では
$$
\sigma_{ij}=C_{ijkl}\varepsilon_{kl}
$$
であり、エネルギー密度は
$$
u_{\mathrm{el}}=\frac{1}{2}C_{ijkl}\varepsilon_{ij}\varepsilon_{kl}
$$
である。$C_{ijkl}$ は
- $\sigma_{ij}=\sigma_{ji}$，
- $\varepsilon_{kl}=\varepsilon_{lk}$，
- $u_{\mathrm{el}}$ がスカラー
であることから対称性
$$
C_{ijkl}=C_{jikl}=C_{ijlk}=C_{klij}
$$
を満たす。これにより一般の異方性媒質の独立成分は 21 個に減る。

正方晶ではさらに結晶の回転対称性（$C_4$）・鏡映対称性が加わり、独立成分が系統的に減少する。

### 2.2 正方晶（tetragonal I）の剛性行列
正方晶（$4/mmm$）では独立な弾性定数は 6 個である：
$$
C_{11},\ C_{12},\ C_{13},\ C_{33},\ C_{44},\ C_{66}.
$$

Voigt 記法での剛性行列は
$$
\begin{pmatrix}
\sigma_{xx}\\ \sigma_{yy}\\ \sigma_{zz}\\ \sigma_{yz}\\ \sigma_{xz}\\ \sigma_{xy}
\end{pmatrix}
=
\begin{pmatrix}
C_{11} & C_{12} & C_{13} & 0 & 0 & 0\\
C_{12} & C_{11} & C_{13} & 0 & 0 & 0\\
C_{13} & C_{13} & C_{33} & 0 & 0 & 0\\
0 & 0 & 0 & C_{44} & 0 & 0\\
0 & 0 & 0 & 0 & C_{44} & 0\\
0 & 0 & 0 & 0 & 0 & C_{66}
\end{pmatrix}
\begin{pmatrix}
\varepsilon_{xx}\\ \varepsilon_{yy}\\ \varepsilon_{zz}\\ 2\varepsilon_{yz}\\ 2\varepsilon_{xz}\\ 2\varepsilon_{xy}
\end{pmatrix}.
$$

表 1 に等価関係をまとめる。

| 成分 | 正方晶での等価関係 |
|---|---|
| 面内法線方向 | $C_{11}=C_{22}$ |
| 面内相互 | $C_{12}=C_{21}$ |
| 面内–軸方向結合 | $C_{13}=C_{23}$ |
| 軸方向 | $C_{33}$ |
| せん断（$xz,yz$） | $C_{44}=C_{55}$ |
| せん断（$xy$） | $C_{66}$ |

表 1：正方晶における弾性定数の独立性と等価関係

### 2.3 弾性エネルギー密度の成分表示（展開形）
上の定義（$\eta_4=2\varepsilon_{yz}$ 等）に整合する形でテンソル成分に戻すと、
$$
\begin{aligned}
u_{\mathrm{el}}
&=\frac{1}{2}C_{11}\bigl(\varepsilon_{xx}^2+\varepsilon_{yy}^2\bigr)
+ C_{12}\varepsilon_{xx}\varepsilon_{yy}
+ C_{13}(\varepsilon_{xx}+\varepsilon_{yy})\varepsilon_{zz}
+ \frac{1}{2}C_{33}\varepsilon_{zz}^2\\
&\quad +2C_{44}\bigl(\varepsilon_{xz}^2+\varepsilon_{yz}^2\bigr)
+2C_{66}\varepsilon_{xy}^2.
\end{aligned}
$$
ここで面内（$x,y$）が等価であること、ただし面内せん断 $C_{66}$ は一般に $C_{44}$ と独立であることが正方晶の特徴である。

### 2.4 力学的安定条件（Born 安定性）
弾性エネルギーが任意の非零ひずみに対して正であるためには、剛性行列が正定値である必要がある。正方晶（tetragonal I）では、代表的に次が条件となる：
$$
\begin{aligned}
& C_{11}>\lvert C_{12}\rvert,\\
& C_{33}\left(C_{11}+C_{12}\right) > 2C_{13}^2,\\
& C_{44}>0,\quad C_{66}>0.
\end{aligned}
$$
これらは音速やフォノン分散の実数性にも対応する量であり、第一原理計算や超音波測定で得た $C_{ij}$ の整合性確認に用いられる。


## 3. 正方晶における磁気弾性エネルギー：不変量展開による導出

### 3.1 磁気弾性の基本枠組み
飽和磁化の方向を単位ベクトル $\boldsymbol{\alpha}=(\alpha_x,\alpha_y,\alpha_z)$ とし、$\alpha_x^2+\alpha_y^2+\alpha_z^2=1$ を満たすとする。

磁気弾性（一次のひずみ、二次の方向余弦まで）では、自由エネルギー密度のうち
$$
u(\varepsilon,\alpha)=u_{\mathrm{el}}(\varepsilon)+u_{\mathrm{me}}(\varepsilon,\alpha)+\cdots
$$
の $u_{\mathrm{me}}$ を対称性に合う不変量の線形結合で書く。

### 3.2 対称性（$D_{4h}$）と不変量の組み立て
正方晶の対称性により、ひずみ成分は既約表現ごとに次のように整理できる（概念整理として示す）：

- $A_{1g}$：$\varepsilon_{xx}+\varepsilon_{yy}$ と $\varepsilon_{zz}$（体積・軸伸縮の組）
- $B_{1g}$：$\varepsilon_{xx}-\varepsilon_{yy}$（面内の直交歪）
- $B_{2g}$：$2\varepsilon_{xy}$（面内せん断）
- $E_g$：$(2\varepsilon_{xz},2\varepsilon_{yz})$（軸を含むせん断）

一方、磁化方向余弦の二次形式も同様に

- $A_{1g}$：$\alpha_x^2+\alpha_y^2$ と $\alpha_z^2$
- $B_{1g}$：$\alpha_x^2-\alpha_y^2$
- $B_{2g}$：$2\alpha_x\alpha_y$
- $E_g$：$(2\alpha_x\alpha_z,2\alpha_y\alpha_z)$

に分解でき、同じ対称性同士の積がスカラー不変量となる。これにより、一次磁気弾性は 5 個の独立係数で閉じる。

### 3.3 正方晶の一次磁気弾性エネルギー（展開形）
以上より、正方晶の一次磁気弾性エネルギー密度は次の形に書ける：
$$
\begin{aligned}
u_{\mathrm{me}}
&= B_1(\varepsilon_{xx}+\varepsilon_{yy})(\alpha_x^2+\alpha_y^2)
+ B_3\,\varepsilon_{zz}\alpha_z^2\\
&\quad + B_5(\varepsilon_{xx}-\varepsilon_{yy})(\alpha_x^2-\alpha_y^2)
+ 2B_2\,\varepsilon_{xy}\alpha_x\alpha_y
+ 2B_4\left(\varepsilon_{xz}\alpha_x\alpha_z+\varepsilon_{yz}\alpha_y\alpha_z\right).
\end{aligned}
$$

表 2 に各項の対応をまとめる。

| 不変量 | ひずみ成分 | 磁化二次形式 | 係数 |
|---|---|---|---|
| $A_{1g}$（面内等方） | $\varepsilon_{xx}+\varepsilon_{yy}$ | $\alpha_x^2+\alpha_y^2$ | $B_1$ |
| $A_{1g}$（軸方向） | $\varepsilon_{zz}$ | $\alpha_z^2$ | $B_3$ |
| $B_{1g}$ | $\varepsilon_{xx}-\varepsilon_{yy}$ | $\alpha_x^2-\alpha_y^2$ | $B_5$ |
| $B_{2g}$ | $\varepsilon_{xy}$ | $\alpha_x\alpha_y$ | $B_2$ |
| $E_g$ | $\varepsilon_{xz},\varepsilon_{yz}$ | $\alpha_x\alpha_z,\alpha_y\alpha_z$ | $B_4$ |

表 2：正方晶の一次磁気弾性結合（ひずみ × 磁化二次形式）と独立係数

注：文献・分野により係数の符号や $2$ の扱い（工学ひずみの定義）の流儀が異なるため、数値比較では定義の一致を必ず取る必要がある。


## 4. 磁歪と磁気弾性定数の関係：最小化による導出

### 4.1 全エネルギー最小化と“磁気弾性応力”
外力がない（巨視的に $\sigma_{ij}=0$）条件で、ひずみは
$$
\frac{\partial}{\partial \varepsilon_{ij}}\left(u_{\mathrm{el}}+u_{\mathrm{me}}\right)=0
$$
を満たす。線形性より
$$
\sigma_{ij} = C_{ijkl}\varepsilon_{kl}+\frac{\partial u_{\mathrm{me}}}{\partial \varepsilon_{ij}} = 0
$$
である。したがって
$$
C_{ijkl}\varepsilon_{kl} = -\frac{\partial u_{\mathrm{me}}}{\partial \varepsilon_{ij}}
$$
となり、右辺
$$
\tau_{ij}\equiv -\frac{\partial u_{\mathrm{me}}}{\partial \varepsilon_{ij}}
$$
を磁化方向に依存する“磁気弾性応力”と見なせる。コンプライアンス $S=C^{-1}$ を用いれば
$$
\varepsilon_{ij} = S_{ijkl}\tau_{kl}
$$
で与えられる。

### 4.2 代表的な磁化方向での平衡ひずみ
ここでは計算が閉じる代表方向として、$[001]$（軸方向）、$[100]$（面内軸）、$[110]$（面内対角）を示す。目的は「手で追える」形で $B_i$ がどのひずみ成分を駆動するかを明示することである。

#### (A) 磁化 $\alpha=(0,0,1)$（$[001]$）
このとき $u_{\mathrm{me}}=B_3\varepsilon_{zz}$ であり、連立方程式は $x,y$ の等価性から $\varepsilon_{xx}=\varepsilon_{yy}\equiv \varepsilon_a$ と置ける。

解は
$$
\varepsilon_{zz}=
-\frac{B_3}{\,C_{33}-\frac{2C_{13}^2}{C_{11}+C_{12}}\,},
\qquad
\varepsilon_{xx}=\varepsilon_{yy}=
\frac{C_{13}}{C_{11}+C_{12}}
\frac{B_3}{\,C_{33}-\frac{2C_{13}^2}{C_{11}+C_{12}}\,}.
$$
すなわち $B_3$ は主として軸ひずみを駆動し、$C_{13}$ を介して面内ひずみを伴う。

#### (B) 磁化 $\alpha=(1,0,0)$（$[100]$）
このとき
$$
u_{\mathrm{me}}=B_1(\varepsilon_{xx}+\varepsilon_{yy})+B_5(\varepsilon_{xx}-\varepsilon_{yy})
=(B_1+B_5)\varepsilon_{xx}+(B_1-B_5)\varepsilon_{yy}.
$$
正方晶は面内で $x$ と $y$ を等価視する一方、磁化が $x$ を選ぶことで $\varepsilon_{xx}\neq\varepsilon_{yy}$ が許される。連立の和差を取ると
$$
\varepsilon_{xx}-\varepsilon_{yy}=-\frac{2B_5}{C_{11}-C_{12}},
$$
および
$$
\varepsilon_{xx}+\varepsilon_{yy}=
-\frac{2B_1}{(C_{11}+C_{12})-\frac{2C_{13}^2}{C_{33}}},
\qquad
\varepsilon_{zz}=-\frac{C_{13}}{C_{33}}(\varepsilon_{xx}+\varepsilon_{yy}).
$$
従って $B_5$ は面内の“直交歪”を、$B_1$ は面内等方歪と軸歪の組を駆動する。

#### (C) 磁化 $\alpha=(1/\sqrt{2},1/\sqrt{2},0)$（$[110]$）
このとき $\alpha_x^2-\alpha_y^2=0$，$\alpha_x\alpha_y=1/2$ であるから
$$
u_{\mathrm{me}}=B_1(\varepsilon_{xx}+\varepsilon_{yy}) + B_2\varepsilon_{xy}.
$$
せん断成分は
$$
\sigma_{xy}=2C_{66}\varepsilon_{xy}+\frac{\partial u_{\mathrm{me}}}{\partial \varepsilon_{xy}}
=2C_{66}\varepsilon_{xy}+B_2=0
$$
より
$$
\varepsilon_{xy}=-\frac{B_2}{2C_{66}}
$$
となる。ここで $C_{66}$ が正方晶の面内せん断に固有の弾性であり、同じ“せん断”でも $xz,yz$ の $C_{44}$ とは一般に異なることが式の上で明確になる。

同様に、$\alpha=(1/\sqrt{2},0,1/\sqrt{2})$（$[101]$）では $B_4$ が $\varepsilon_{xz}$ を
$$
\varepsilon_{xz}=-\frac{B_4}{2C_{44}}
$$
の形で駆動する（$yz$ も同型である）。

### 4.3 任意方向の磁歪（長さ変化）への写像
測定方向（もしくは評価したい方向）を単位ベクトル $\boldsymbol{\beta}=(\beta_x,\beta_y,\beta_z)$ とすると、平衡ひずみ $\varepsilon_{ij}^{\mathrm{eq}}(\alpha)$ により長さ変化は
$$
\frac{\Delta l}{l}(\alpha,\beta)=\beta_i\beta_j\,\varepsilon_{ij}^{\mathrm{eq}}(\alpha)
$$
で与えられる。従って、特定の“磁歪定数”を定義する場合でも、基礎式は上式で統一できる。


## 5. 文献で使われる別表記との対応
例：MAELAS 系の $b_{ij}$ と磁歪係数

### 5.1 ひずみモードと磁気弾性定数の対応
正方晶では、対称性に適合する代表的ひずみモードが 5 種類あり、それぞれが一次磁気弾性定数と一対一対応する。以下は “ひずみを与えて磁化方向を変えたときの全エネルギー差の線形係数（傾き）” として磁気弾性定数を取り出す流儀で頻用される整理である。

表 3：正方晶の 5 つのひずみモードと一次磁気弾性定数の対応
| モード | 与えるひずみ | 対称性 | 駆動する結合項 | 対応する係数 |
|---|---|---|---|---|
| 面内等方伸縮 | $\varepsilon_{xx}=\varepsilon_{yy}$ | $A_{1g}$ | $(\varepsilon_{xx}+\varepsilon_{yy})(\alpha_x^2+\alpha_y^2)$ | $B_1$（または $b_{21}$） |
| 軸方向伸縮 | $\varepsilon_{zz}$ | $A_{1g}$ | $\varepsilon_{zz}\alpha_z^2$ | $B_3$（または $b_{22}$） |
| 面内直交歪 | $\varepsilon_{xx}=-\varepsilon_{yy}$ | $B_{1g}$ | $(\varepsilon_{xx}-\varepsilon_{yy})(\alpha_x^2-\alpha_y^2)$ | $B_5$（または $b_3$） |
| $xz$（または $yz$）せん断 | $\varepsilon_{xz}$（または $\varepsilon_{yz}$） | $E_g$ | $\varepsilon_{xz}\alpha_x\alpha_z+\varepsilon_{yz}\alpha_y\alpha_z$ | $B_4$（または $b_4$） |
| 面内せん断 | $\varepsilon_{xy}$ | $B_{2g}$ | $\varepsilon_{xy}\alpha_x\alpha_y$ | $B_2$（または $b_{3}^{'}$） |


### 5.2 磁歪係数の角度依存式
正方晶（および六方晶に近い“軸対称”構造）では、$\Delta l/l$ を $\alpha,\beta$ の多項式で表す枠組みが用いられる。代表形として、方向余弦の組み合わせに対し係数 $\lambda_{\alpha 1,2},\lambda_{\alpha 2,2},\lambda_{\gamma,1},\lambda_{\gamma,2},\ldots$ を割り当て、角度依存を系統的に書く流儀がある：
$$
\begin{aligned}
\left(\frac{\Delta l}{l}\right)_{\alpha}^{\beta}
&=
\lambda_{\alpha 1,0}(\beta_x^2+\beta_y^2)+\lambda_{\alpha 2,0}\beta_z^2\\
&\quad +\lambda_{\alpha 1,2}\left(\alpha_z^2-\frac{1}{3}\right)(\beta_x^2+\beta_y^2)
+\lambda_{\alpha 2,2}\left(\alpha_z^2-\frac{1}{3}\right)\beta_z^2\\
&\quad +\lambda_{\gamma,1}
\left[
\frac{1}{2}(\alpha_x^2-\alpha_y^2)(\beta_x^2-\beta_y^2)+2\alpha_x\alpha_y\beta_x\beta_y
\right]\\
&\quad +\lambda_{\gamma,2}(\alpha_x\alpha_z\beta_x\beta_z+\alpha_y\alpha_z\beta_y\beta_z)
+\cdots .
\end{aligned}
$$
この種の式は、(i) 対称性で許される角度依存を漏れなく列挙でき、(ii) 実験データのフィットや第一原理計算の結果整理に用いられる。

### 5.3 弾性定数との結びつき
磁気弾性定数と磁歪係数は、同じ最小化条件（$\sigma=0$）から線形に結び付く。例えば $A_{1g}$ の 2 成分（面内等方成分と軸成分）の結びつきは、弾性の部分行列と磁歪係数で与えられる形を取る。文献例として
$$
b_{21}=-(C_{11}+C_{12})\lambda_{\alpha 1,2}-C_{13}\lambda_{\alpha 2,2}
$$
のような関係式が示される。


## 6. 弾性定数・磁気弾性定数の決定

### 6.1 弾性定数 $C_{ij}$ の決定
正方晶では 6 個の独立定数があり、例えば次の情報で決まる：
- $C_{11},C_{12},C_{66}$：面内の縦波・横波、あるいは面内ひずみに対する応力応答
- $C_{33},C_{13}$：軸方向ひずみと面内–軸の結合
- $C_{44}$：$xz,yz$ のせん断に対する応答

第一原理計算では、結晶に対してひずみテンソルを与え、全エネルギーの二次係数から $C_{ij}$ を抽出する。超音波測定では音速 $v$ と密度 $\rho$ の関係 $v^2\sim C/\rho$ を用いて $C_{ij}$ を決める。

### 6.2 磁気弾性定数 $B_i$（または $b_{ij}$）の決定
一次磁気弾性は「ひずみ一次 × 磁化二次」であるため、一定ひずみを与えた状態で磁化方向を変えたときの全エネルギー差がひずみに対して一次となり、その傾きが磁気弾性定数に対応する。

正方晶では 5 つの独立結合があり、表 3 の 5 種ひずみモードを用意し、それぞれについて
- 磁化方向 $\alpha_1,\alpha_2$ を指定して全エネルギー差 $\Delta E(\varepsilon)$ を計算（または測定）
- $\Delta E$ のひずみ依存の一次係数を抽出
という形で $B_1,B_2,B_3,B_4,B_5$ を系統的に定める構成が自然である。


## 7. 二次以上の磁気弾性と正方晶特有の論点

### 7.1 二次磁気弾性
ひずみが大きい、もしくは一次磁気弾性だけでは角度依存を再現しきれない場合、ひずみ二次・磁化二次（あるいは磁化四次）まで含む高次項（higher-order magnetoelasticity）
$$
u_{\mathrm{me}}^{(2)} \sim \varepsilon^2 \alpha^2,\quad \varepsilon \alpha^4,\ \ldots
$$
が必要となる。正方晶では $A_{1g}$ の 2 成分（面内等方・軸）が独立であるため、体積・軸比変化（$c/a$）が磁気異方性と強く結び付く系（$L1_0$ 系など）では高次効果が顕在化しやすい。

### 7.2 構造相転移と自発ひずみ
正方晶相が立方晶相からの歪みで得られる場合、相転移近傍では弾性定数のソフト化（特定の $C_{ij}$ の低下）と磁気弾性の増大が連動し得る。式の上では、磁歪 $\varepsilon^{\mathrm{eq}}$ が $C^{-1}$ を介して $B_i$ に比例するため、対応する弾性が小さくなるほど磁歪が増幅されやすい構造になっている。


## まとめと展望
正方晶（$4/mmm$）では弾性定数は 6 個、一次磁気弾性定数は不変量展開により 5 個に整理でき、エネルギーはひずみ成分と磁化方向余弦の二次形式の同じ対称性同士の積として一意に構成できる。さらに $\sigma=0$ 条件での最小化により、磁気弾性定数が平衡ひずみ（磁歪）を駆動する仕組みが解析的に追跡でき、$C_{13}$ のような結合が面内と軸方向の磁歪を連動させることが式から明瞭になる。

今後は、（i）高次磁気弾性項を含む角度依存の高精度化、（ii）温度・相転移近傍での弾性ソフト化と磁歪増幅の統一的理解、（iii）第一原理計算・回折・超音波・磁歪測定を横断する定数同定の整合化が、正方晶磁性体の機能設計において重要になると考えられる。


### 参考文献
- Nye, J. F., Physical Properties of Crystals: Their Representation by Tensors and Matrices, Oxford University Press.
  https://onlinelibrary.wiley.com/doi/10.1107/S0108767385001477?msockid=3edea5f6b05d604537d0b186b12761c5

- Landau, L. D., Lifshitz, E. M., Theory of Elasticity, Pergamon Press.
  https://www.sciencedirect.com/book/monograph/9780080570693/theory-of-elasticity
  
- E. Callen and H. B. Callen, Magnetostriction, Forced Magnetostriction, and Anomalous Thermal Expansion in Ferromagnets, Physical Review 139, A455 (1965)
  https://link.aps.org/doi/10.1103/PhysRev.139.A455

- Cullity, B. D., Graham, C. D., Introduction to Magnetic Materials, Wiley（磁歪・磁気弾性の教科書的整理）。
  https://onlinelibrary.wiley.com/doi/book/10.1002/9780470386323
