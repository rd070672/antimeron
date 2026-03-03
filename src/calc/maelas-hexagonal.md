# 六方晶 (Hexagonal I) 磁性体における弾性・磁気弾性定数

六方晶（Hexagonal I）磁性体の弾性定数は、5個の独立な $C_{ij}$ により完全に表現される。磁気弾性定数は、ひずみと磁化方向余弦の結合として自由エネルギーを一次のひずみで展開し、弾性エネルギーとの同時最小化により磁歪係数やエネルギー差と結び付けて導出できる。

### 参考ドキュメント
1. P. Nieves et al., MAELAS: MAgneto-ELAStic properties calculation via computational high-throughput approach（Hexagonal(I) の式展開を含む）
https://arxiv.org/pdf/2009.01638

2. F. Mouhat and F.-X. Coudert, Necessary and sufficient elastic stability conditions in various crystal systems（Hexagonal(I) の Born 安定条件を含む）
https://arxiv.org/abs/1407.5148

3. J-STAGE（日本語ページ）: E. Tatsumoto, Temperature Dependence of the Magnetostriction Coefficients of Nickel
https://www.jstage.jst.go.jp/article/jpsj1946/20/8/20_8_1534/_article/-char/ja/

## 1. 対象と座標系（Hexagonal (I) の意味）
Hexagonal (I) は、点群 6mm, 622, $\bar{6}2m$, 6/mmm を含む六方晶（等方的な回転対称が $c$ 軸周りにある）を指す整理である。結晶座標は
- $z \parallel c$（六方軸）
- $x,y$ は基底面（$ab$ 面）内、$x \parallel a$ 

と採るのが基本である。

以降、磁化の方向余弦を
$$
\boldsymbol{\alpha} = (\alpha_x,\alpha_y,\alpha_z),\qquad \alpha_x^2+\alpha_y^2+\alpha_z^2=1
$$
とし、長さ変化を測る方向の余弦を
$$
\boldsymbol{\beta} = (\beta_x,\beta_y,\beta_z),\qquad \beta_x^2+\beta_y^2+\beta_z^2=1
$$
とする。

## 2. ひずみ・応力の表記（Voigt 記法と工学せん断ひずみ）
ひずみテンソルを $\varepsilon_{ij}$ とすると、Voigt 記法は次の 6 成分で表すことが多い。ここでは「工学せん断ひずみ」を用いる定義を明示する。

| Voigt 成分 | 記号 | テンソル成分との対応 |
|---:|---|---|
| 1 | $\tilde{\varepsilon}_{1}$ | $\varepsilon_{xx}$ |
| 2 | $\tilde{\varepsilon}_{2}$ | $\varepsilon_{yy}$ |
| 3 | $\tilde{\varepsilon}_{3}$ | $\varepsilon_{zz}$ |
| 4 | $\tilde{\varepsilon}_{4}$ | $2\varepsilon_{yz}$ |
| 5 | $\tilde{\varepsilon}_{5}$ | $2\varepsilon_{xz}$ |
| 6 | $\tilde{\varepsilon}_{6}$ | $2\varepsilon_{xy}$ |

応力も同様に
$$
\tilde{\boldsymbol{\sigma}}=(\sigma_{xx},\sigma_{yy},\sigma_{zz},\sigma_{yz},\sigma_{xz},\sigma_{xy})^{\mathsf{T}}
$$
と置くと、線形弾性は
$$
\tilde{\boldsymbol{\sigma}}=\mathbf{C}\,\tilde{\boldsymbol{\varepsilon}},\qquad 
u_{\rm el}=\frac{1}{2}\tilde{\boldsymbol{\varepsilon}}^{\mathsf{T}}\mathbf{C}\tilde{\boldsymbol{\varepsilon}}
$$
で与えられる。ここで $u_{\rm el}$ は弾性エネルギー密度である。

## 3. Hexagonal (I) の弾性定数：剛性行列と独立成分
六方晶（Hexagonal (I)）の弾性剛性行列は
$$
\mathbf{C}_{\rm hex}=
\begin{pmatrix}
C_{11} & C_{12} & C_{13} & 0 & 0 & 0\\
C_{12} & C_{11} & C_{13} & 0 & 0 & 0\\
C_{13} & C_{13} & C_{33} & 0 & 0 & 0\\
0 & 0 & 0 & C_{44} & 0 & 0\\
0 & 0 & 0 & 0 & C_{44} & 0\\
0 & 0 & 0 & 0 & 0 & \dfrac{C_{11}-C_{12}}{2}
\end{pmatrix}.
$$

独立な弾性定数は
$$
C_{11},\ C_{12},\ C_{13},\ C_{33},\ C_{44}
$$
の 5 個であり、残りは
$$
C_{66}=\frac{C_{11}-C_{12}}{2}
$$
で従属的に決まる。

### 3.1 弾性エネルギーの展開（Voigt 形式）
上の $\mathbf{C}_{\rm hex}$ を用いれば
$$
\frac{E_{\rm el}-E_0}{V_0}
=
\frac{1}{2}C_{11}(\tilde{\varepsilon}_1^2+\tilde{\varepsilon}_2^2)
+
C_{12}\tilde{\varepsilon}_1\tilde{\varepsilon}_2
+
C_{13}(\tilde{\varepsilon}_1+\tilde{\varepsilon}_2)\tilde{\varepsilon}_3
+
\frac{1}{2}C_{33}\tilde{\varepsilon}_3^2
+
\frac{1}{2}C_{44}(\tilde{\varepsilon}_4^2+\tilde{\varepsilon}_5^2)
+
\frac{1}{4}(C_{11}-C_{12})\tilde{\varepsilon}_6^2
$$
である。ここで $E_0$ は無ひずみ基準の全エネルギー、$V_0$ は基準体積である。

### 3.2 弾性エネルギーの展開
工学せん断ひずみの対応を使うと
$$
u_{\rm el}
=
\frac{1}{2}C_{11}(\varepsilon_{xx}^2+\varepsilon_{yy}^2)
+
C_{12}\varepsilon_{xx}\varepsilon_{yy}
+
C_{13}(\varepsilon_{xx}+\varepsilon_{yy})\varepsilon_{zz}
+
\frac{1}{2}C_{33}\varepsilon_{zz}^2
+
2C_{44}(\varepsilon_{xz}^2+\varepsilon_{yz}^2)
+
(C_{11}-C_{12})\varepsilon_{xy}^2
$$
となり、基底面内（$xy$）と $c$ 軸方向（$z$）の異方性、ならびに $xz/yz$ せん断が $C_{44}$ で支配されることが見通せる。

## 4. 弾性安定条件（Born 条件の一例）
弾性エネルギーが任意の非零ひずみに対して正となるために、$\mathbf{C}$ は正定値でなければならない。Hexagonal (I) の条件は次で表せる。

$$
C_{44}>0,\qquad C_{11}>\lvert C_{12}\rvert,\qquad C_{66}=\frac{C_{11}-C_{12}}{2}>0,
$$
$$
2C_{13}^2 < C_{33}(C_{11}+C_{12}).
$$

最後の条件は、基底面内の等方ひずみと $c$ 軸ひずみが $C_{13}$ で混成することに対応しており、後で現れる分母
$$
D = C_{33}(C_{11}+C_{12})-2C_{13}^2
$$
が正であることと同値である。

## 5. Hexagonal (I) の磁気弾性エネルギー（一次磁気弾性）
磁気弾性は、ひずみ一次・方向余弦二次までで展開すると、Hexagonal (I) では次の形に整理できる。
$$
u_{\rm me}
=
b_{11}(\varepsilon_{xx}+\varepsilon_{yy})
+
b_{12}\varepsilon_{zz}
+
b_{21}\left(\alpha_z^2-\frac{1}{3}\right)(\varepsilon_{xx}+\varepsilon_{yy})
+
b_{22}\left(\alpha_z^2-\frac{1}{3}\right)\varepsilon_{zz}
$$
$$
\quad
+
b_{3}\left[
\frac{1}{2}(\alpha_x^2-\alpha_y^2)(\varepsilon_{xx}-\varepsilon_{yy})
+
2\alpha_x\alpha_y\varepsilon_{xy}
\right]
+
2b_{4}(\alpha_x\alpha_z\varepsilon_{xz}+\alpha_y\alpha_z\varepsilon_{yz}).
$$

ここで $u_{\rm me}$ は磁気弾性エネルギー密度、$b_{ij}$ は一次磁気弾性定数である。

### 5.1 各定数の役割の整理
| 定数 | 主に結合するひずみ | 主に結合する磁化因子 | 意味づけ（言い換え） |
|---|---|---|---|
| $b_{11}, b_{12}$ | $(\varepsilon_{xx}+\varepsilon_{yy}),\ \varepsilon_{zz}$ | 磁化方向に依らない（定数項） | 体積的な寄与の整理に現れうる項である |
| $b_{21}, b_{22}$ | 基底面の等方ひずみと $c$ 軸ひずみ | $\alpha_z^2-1/3$ | $c$ 軸と基底面の「二次対称（$l=2$）」結合である |
| $b_{3}$ | 基底面内の直交ひずみ・せん断ひずみ | $(\alpha_x^2-\alpha_y^2,\ 2\alpha_x\alpha_y)$ | 基底面内の $E_2$ 型結合である |
| $b_{4}$ | $xz, yz$ せん断 | $(\alpha_x\alpha_z,\ \alpha_y\alpha_z)$ | $c$ 軸と基底面を混ぜる $E_1$ 型結合である |

$u_{\rm me}$ が「ひずみ一次」であるため、弾性エネルギーと合わせて最小化すると、平衡ひずみ（磁歪）が磁化方向に応答して線形に決まる。

## 6. 導出の核：全エネルギー最小化による平衡ひずみ
全エネルギー密度を
$$
u(\varepsilon_{ij},\boldsymbol{\alpha})
=
u_{\rm el}(\varepsilon_{ij})
+
u_{\rm me}(\varepsilon_{ij},\boldsymbol{\alpha})
$$
とし、外力（外部応力）が無い場合の平衡は
$$
\frac{\partial u}{\partial \tilde{\varepsilon}_k}=0\qquad(k=1,\dots,6)
$$
で与えられる。

$u_{\rm me}$ はひずみ一次であるので
$$
\frac{\partial u_{\rm me}}{\partial \tilde{\varepsilon}_k}=g_k(\boldsymbol{\alpha})
$$
と書け、弾性側は
$$
\frac{\partial u_{\rm el}}{\partial \tilde{\varepsilon}_k}=\sum_{j}C_{kj}\tilde{\varepsilon}_j
$$
であるから、
$$
\sum_j C_{kj}\tilde{\varepsilon}_j + g_k(\boldsymbol{\alpha})=0
\quad\Rightarrow\quad
\tilde{\boldsymbol{\varepsilon}}^*(\boldsymbol{\alpha})
=
-\mathbf{S}\,\mathbf{g}(\boldsymbol{\alpha})
$$
となる。ここで $\mathbf{S}=\mathbf{C}^{-1}$ はコンプライアンス行列である。

### 6.1 $\mathbf{g}(\boldsymbol{\alpha})$ の具体形（Hexagonal (I)）
上の $u_{\rm me}$ から、テンソルひずみで微分すると
$$
\frac{\partial u_{\rm me}}{\partial \varepsilon_{xx}}
=
b_{11}+b_{21}\left(\alpha_z^2-\frac{1}{3}\right)+\frac{b_3}{2}(\alpha_x^2-\alpha_y^2),
$$
$$
\frac{\partial u_{\rm me}}{\partial \varepsilon_{yy}}
=
b_{11}+b_{21}\left(\alpha_z^2-\frac{1}{3}\right)-\frac{b_3}{2}(\alpha_x^2-\alpha_y^2),
$$
$$
\frac{\partial u_{\rm me}}{\partial \varepsilon_{zz}}
=
b_{12}+b_{22}\left(\alpha_z^2-\frac{1}{3}\right),
$$
$$
\frac{\partial u_{\rm me}}{\partial \varepsilon_{xy}}
=
2b_3\alpha_x\alpha_y,\quad
\frac{\partial u_{\rm me}}{\partial \varepsilon_{xz}}
=
2b_4\alpha_x\alpha_z,\quad
\frac{\partial u_{\rm me}}{\partial \varepsilon_{yz}}
=
2b_4\alpha_y\alpha_z.
$$

Voigt（工学せん断）成分での駆動項は
$$
g_1=\frac{\partial u_{\rm me}}{\partial \tilde{\varepsilon}_1}=\frac{\partial u_{\rm me}}{\partial \varepsilon_{xx}},\ 
g_2=\frac{\partial u_{\rm me}}{\partial \tilde{\varepsilon}_2}=\frac{\partial u_{\rm me}}{\partial \varepsilon_{yy}},\ 
g_3=\frac{\partial u_{\rm me}}{\partial \tilde{\varepsilon}_3}=\frac{\partial u_{\rm me}}{\partial \varepsilon_{zz}},
$$
$$
g_4=\frac{\partial u_{\rm me}}{\partial \tilde{\varepsilon}_4}=\frac{1}{2}\frac{\partial u_{\rm me}}{\partial \varepsilon_{yz}}=b_4\alpha_y\alpha_z,\ 
g_5=\frac{\partial u_{\rm me}}{\partial \tilde{\varepsilon}_5}=\frac{1}{2}\frac{\partial u_{\rm me}}{\partial \varepsilon_{xz}}=b_4\alpha_x\alpha_z,
$$
$$
g_6=\frac{\partial u_{\rm me}}{\partial \tilde{\varepsilon}_6}=\frac{1}{2}\frac{\partial u_{\rm me}}{\partial \varepsilon_{xy}}=b_3\alpha_x\alpha_y
$$
である。

### 6.2 せん断モードの平衡ひずみ（閉形式）
Hexagonal (I) では、せん断は分離して解ける。

$$
0=\sigma_{xy}=C_{66}\tilde{\varepsilon}_6+g_6
\quad\Rightarrow\quad
\tilde{\varepsilon}_6^*=-\frac{b_3}{C_{66}}\alpha_x\alpha_y.
$$
同様に
$$
\tilde{\varepsilon}_4^*=-\frac{b_4}{C_{44}}\alpha_y\alpha_z,\qquad
\tilde{\varepsilon}_5^*=-\frac{b_4}{C_{44}}\alpha_x\alpha_z.
$$

テンソル成分に戻すと $\varepsilon_{xy}=\tilde{\varepsilon}_6/2$ などであるから
$$
\varepsilon_{xy}^*=-\frac{b_3}{2C_{66}}\alpha_x\alpha_y,\qquad
\varepsilon_{xz}^*=-\frac{b_4}{2C_{44}}\alpha_x\alpha_z,\qquad
\varepsilon_{yz}^*=-\frac{b_4}{2C_{44}}\alpha_y\alpha_z.
$$

これらは後に現れる磁歪係数 $\lambda_{\gamma,2}$ や $\lambda_{\varepsilon,2}$ と直結する。

### 6.3 正規ひずみモードの平衡（分母 $D$ の出現）
正規成分は $(\tilde{\varepsilon}_1,\tilde{\varepsilon}_2,\tilde{\varepsilon}_3)$ の連立であるが、六方対称により
- 和：$\varepsilon_{\perp}=\varepsilon_{xx}+\varepsilon_{yy}$（基底面の等方ひずみ）
- 差：$\varepsilon_{xx}-\varepsilon_{yy}$（基底面内の二次対称ひずみ）
に分けると見通しが良い。

差モードは $b_3$ のみで駆動され、弾性は $C_{11}-C_{12}$ で支配される。一方、和モード $\varepsilon_{\perp}$ と $\varepsilon_{zz}$ は $C_{13}$ により混成し、解の分母として
$$
D=C_{33}(C_{11}+C_{12})-2C_{13}^2
$$
が現れる。

## 7. 磁歪係数と磁気弾性定数の関係（Hexagonal (I) の表式）
### 7.1 一般方向における相対長さ変化
磁化方向 $\boldsymbol{\alpha}$、測定方向 $\boldsymbol{\beta}$ に対して、相対長さ変化は次の形に展開できる。
$$
\frac{\Delta l}{l_0}
=
\lambda_{\alpha_1,0}(\beta_x^2+\beta_y^2)
+\lambda_{\alpha_2,0}\beta_z^2
+\lambda_{\alpha_1,2}\left(\alpha_z^2-\frac{1}{3}\right)(\beta_x^2+\beta_y^2)
+\lambda_{\alpha_2,2}\left(\alpha_z^2-\frac{1}{3}\right)\beta_z^2
$$
$$
\quad
+\lambda_{\gamma,2}
\left[
\frac{1}{2}(\alpha_x^2-\alpha_y^2)(\beta_x^2-\beta_y^2)
+2\alpha_x\alpha_y\beta_x\beta_y
\right]
+2\lambda_{\varepsilon,2}(\alpha_x\alpha_z\beta_x\beta_z+\alpha_y\alpha_z\beta_y\beta_z).
$$

$\lambda_{\alpha_1,0},\lambda_{\alpha_2,0}$ は磁化二次に依らない項（体積的な基準の取り方に関わる）であり、$\lambda_{\alpha_1,2},\lambda_{\alpha_2,2},\lambda_{\gamma,2},\lambda_{\varepsilon,2}$ が六方晶の異方磁歪を記述する。

### 7.2 $\lambda$ と $b$ の関係（前進式）
$D=C_{33}(C_{11}+C_{12})-2C_{13}^2$ とすると
$$
\lambda_{\alpha_1,0}=\frac{b_{11}C_{33}+b_{12}C_{13}}{D},\qquad
\lambda_{\alpha_2,0}=\frac{2b_{11}C_{13}-b_{12}(C_{11}+C_{12})}{D},
$$
$$
\lambda_{\alpha_1,2}=\frac{-b_{21}C_{33}+b_{22}C_{13}}{D},\qquad
\lambda_{\alpha_2,2}=\frac{2b_{21}C_{13}-b_{22}(C_{11}+C_{12})}{D},
$$
$$
\lambda_{\gamma,2}=-\frac{b_3}{C_{11}-C_{12}},\qquad
\lambda_{\varepsilon,2}=-\frac{b_4}{2C_{44}}.
$$

ここで $\lambda_{\gamma,2}$ は基底面内 $E_2$ 型（$x$ と $y$ の差）を、$\lambda_{\varepsilon,2}$ は $xz/yz$ の $E_1$ 型結合を表す。

### 7.3 $b$ を $\lambda$ から求める（逆変換）
上式は 2×2 の線形関係であり、$\lambda$ が与えられれば $b$ は次で戻せる。

体積項：
$$
b_{11}=-(C_{11}+C_{12})\lambda_{\alpha_1,0}-C_{13}\lambda_{\alpha_2,0},\qquad
b_{12}=-2C_{13}\lambda_{\alpha_1,0}-C_{33}\lambda_{\alpha_2,0}.
$$

異方磁気弾性項：
$$
b_{21}=-(C_{11}+C_{12})\lambda_{\alpha_1,2}-C_{13}\lambda_{\alpha_2,2},\qquad
b_{22}=-2C_{13}\lambda_{\alpha_1,2}-C_{33}\lambda_{\alpha_2,2},
$$
$$
b_3=-(C_{11}-C_{12})\lambda_{\gamma,2},\qquad
b_4=-2C_{44}\lambda_{\varepsilon,2}.
$$

$D$ を明示的に用いずに書ける点が重要であり、弾性安定条件の $D>0$ は、そもそも $\lambda$ の定義式が非特異であることと整合する。

### 7.4 方向選択による簡約（計算・測定での利用）
式が一般形で書けているため、$\boldsymbol{\alpha},\boldsymbol{\beta}$ を選べば任意方位の磁歪を計算できる。基本例を挙げる。

1) $\boldsymbol{\beta}\parallel z$（$c$ 軸方向の長さ変化）
$$
\beta_z=1,\ \beta_x=\beta_y=0
\Rightarrow
\frac{\Delta l}{l_0}
=
\lambda_{\alpha_2,0}
+\lambda_{\alpha_2,2}\left(\alpha_z^2-\frac{1}{3}\right).
$$

2) $\boldsymbol{\beta}\perp z$（基底面内で、方向は平均化した形）
例えば $\boldsymbol{\beta}\parallel x$ とすれば $\beta_x=1$ で
$$
\frac{\Delta l}{l_0}
=
\lambda_{\alpha_1,0}
+\lambda_{\alpha_1,2}\left(\alpha_z^2-\frac{1}{3}\right)
+\frac{\lambda_{\gamma,2}}{2}(\alpha_x^2-\alpha_y^2).
$$
$\boldsymbol{\beta}\parallel y$ では最後の符号が反転する。

3) 斜め方向（$xz$ 平面）の項を強調したい場合
$\alpha_x\alpha_z$ と $\beta_x\beta_z$ が同時に非零となる測定配置を採れば、$\lambda_{\varepsilon,2}$（したがって $b_4$）に直接感度が出る。

## 8. 弾性定数・磁気弾性定数の同定の考え方（エネルギー・応力の線形係数として）
### 8.1 弾性定数 $C_{ij}$ の決め方（小ひずみ展開）
基準構造から小さなひずみを与え、全エネルギー変化
$$
\Delta E(\tilde{\boldsymbol{\varepsilon}})=E(\tilde{\boldsymbol{\varepsilon}})-E_0
$$
を二次まででフィットする。
$$
\frac{\Delta E}{V_0}=\frac{1}{2}\tilde{\boldsymbol{\varepsilon}}^{\mathsf{T}}\mathbf{C}\tilde{\boldsymbol{\varepsilon}}+O(\varepsilon^3).
$$
Hexagonal (I) では 5 定数であり、独立なひずみモード（例：基底面等方、$c$ 軸単独、$xz$ せん断、基底面内せん断など）を選べば過不足なく決まる。

### 8.2 磁気弾性定数 $b$ の決め方（磁化方向を切り替えた一次係数）
磁気弾性エネルギーはひずみ一次であるため、同一ひずみに対して磁化方向を変えたときのエネルギー差は一次で立ち上がる。
$$
\Delta E_{\rm me}(\varepsilon)=E(\varepsilon,\boldsymbol{\alpha}^{(1)})-E(\varepsilon,\boldsymbol{\alpha}^{(2)})
\approx V_0 \cdot \left[ u_{\rm me}(\varepsilon,\boldsymbol{\alpha}^{(1)})-u_{\rm me}(\varepsilon,\boldsymbol{\alpha}^{(2)})\right].
$$

各 $b$ に主に感度が出る配置例を整理する。

| 求めたい定数 | 与える主ひずみ | 比較する磁化方向の例 | ねらい |
|---|---|---|---|
| $b_3$ | $(\varepsilon_{xx}-\varepsilon_{yy})$ または $\varepsilon_{xy}$ | $\boldsymbol{\alpha}\parallel x$ と $\boldsymbol{\alpha}\parallel y$ | 基底面内の二次対称（$E_2$）結合のみを抽出する |
| $b_4$ | $\varepsilon_{xz}$ または $\varepsilon_{yz}$ | $xz$（あるいは $yz$）平面内で $\alpha_x\alpha_z$ が変わる向き | $E_1$ 型結合を抽出する |
| $b_{21}, b_{22}$ | $\varepsilon_{xx}=\varepsilon_{yy}$ と $\varepsilon_{zz}$ の組合せ | $\boldsymbol{\alpha}\parallel z$ と $\boldsymbol{\alpha}\perp z$ | $c$ 軸成分 $\alpha_z^2$ に依存する結合を分離する |

この考え方は、エネルギー差だけでなく応力差
$$
\Delta \tilde{\boldsymbol{\sigma}}(\boldsymbol{\alpha}^{(1)},\boldsymbol{\alpha}^{(2)})
=
\tilde{\boldsymbol{\sigma}}(\boldsymbol{\alpha}^{(1)})-\tilde{\boldsymbol{\sigma}}(\boldsymbol{\alpha}^{(2)})
$$
に対しても同様に用いられ、線形係数として $b$ を決められる。

### 8.3 単位と規格化
$b$ はエネルギー密度の次元を持ち、SI では J/m^3 で整理されることが多い。一方、第一原理計算では eV/セルで得ることが多く、$V_0$ を用いて
$$
1\ {\rm eV/cell} \ \longrightarrow\ \frac{1.602\times 10^{-19}\ {\rm J}}{V_0\ [{\rm m^3}]}
$$
で換算できる。

## 9. まとめと展望
Hexagonal (I) の弾性は 5 個の独立定数 $C_{11},C_{12},C_{13},C_{33},C_{44}$ と関係式 $C_{66}=(C_{11}-C_{12})/2$ により記述でき、弾性エネルギーは明示的に展開できる。磁気弾性は、ひずみ一次・磁化方向余弦二次までで $b_{21},b_{22},b_3,b_4$（および体積項 $b_{11},b_{12}$）に整理でき、弾性エネルギーとの同時最小化から一般方位の磁歪式と $\lambda$–$b$ 変換式が導かれる。

今後は、六方晶磁性体（hcp Co、希土類六方相、六方対称の磁性窒化物・酸化物など）に対して、(i) 弾性定数の高精度化（温度・圧力・欠陥の影響を含む）、(ii) 磁気弾性定数の符号・大きさと電子構造の相関付け、(iii) 多結晶集合体への平均化とテクスチャ効果の理論化、を一体として進めることで、六方晶の異方磁歪・異方磁気弾性を材料設計の自由度として活用できる見通しが得られるであろう。


## 参考文献
- W. P. Mason, Derivation of Magnetostriction and Anisotropic Energies for Hexagonal, Tetragonal, and Orthorhombic Crystals, Physical Review 96, 302 (1954)
https://link.aps.org/doi/10.1103/PhysRev.96.302

- E. Callen and H. B. Callen, Magnetostriction, Forced Magnetostriction, and Anomalous Thermal Expansion in Ferromagnets, Physical Review 139, A455 (1965)
https://link.aps.org/doi/10.1103/PhysRev.139.A455

- R. M. Bozorth, Magnetostriction and Crystal Anisotropy of Single Crystals of Cobalt, Physical Review 96, 311 (1954)
https://link.aps.org/doi/10.1103/PhysRev.96.311

- R. R. Birss, Symmetry and Magnetism（磁気対称性と磁歪・磁気弾性の表現論に関する基礎）
https://ethz.ch/content/dam/ethz/special-interest/matl/multi-ferroic-materials-dam/documents/education/Nonlinear%20Optics%20on%20Ferroic%20Materials/Birss%20Symmetry%20%26%20Magnetism%20komplett.pdf

- P. Nieves et al., MAELAS 2.0（関連：磁気弾性計算手法の発展）
https://www.sciencedirect.com/science/article/abs/pii/S001046552100309X
