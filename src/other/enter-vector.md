# ベクトル解析入門

ベクトル解析は、スカラー場とベクトル場を微分・積分する道具立てを整え、場の「変化・湧き出し・渦」を統一的に扱う数学である。電磁気学、流体力学、弾性体、拡散、量子力学の確率流など、多くの物理法則がベクトル解析の言葉で簡潔に表現される。

### 参考ドキュメント
1. 東北大学（電磁気学向け）「電磁気学で最低限必要なベクトル解析の知識」（PDF）  
   https://www.ecei.tohoku.ac.jp/yamada/Lecture/yamada/Vector.pdf
2. 京都大学 講義ノート「物理学基礎論B（電磁気学）」内 ベクトル解析の節（PDF）  
   https://www-cr.scphys.kyoto-u.ac.jp/member/tsuru/data/lecture/KisoronB_v2018_0.pdf
3. David Tong, Vector Calculus（講義ノート）  
   https://www.damtp.cam.ac.uk/user/tong/vc.html

## 1. ベクトルと場：スカラー場・ベクトル場の区別

ベクトルは大きさと向きをもつ量であり、3次元では
$$
\mathbf{a}=(a_{x},a_{y},a_{z})
$$
のように表す。

スカラー場は、空間の各点に実数を割り当てる関数である。
$$
f:\mathbb{R}^{3}\to\mathbb{R},\quad f(\mathbf{r})
$$
温度、電位、濃度などが例である。

ベクトル場は、空間の各点にベクトルを割り当てる関数である。
$$
\mathbf{F}:\mathbb{R}^{3}\to\mathbb{R}^{3},\quad \mathbf{F}(\mathbf{r})
$$
速度場、電場、磁束密度などが例である。

場を扱うとき、座標系（デカルト、円柱、球）と基底ベクトル（単位ベクトル）の依存性が重要である。特に曲線座標では基底自体が位置に依存するため、微分演算子の形が変化する。


## 2. 内積・外積と幾何学的意味

### 2.1 内積（dot product）

$
\mathbf{a}\cdot\mathbf{b}=|\mathbf{a}||\mathbf{b}|\cos\theta
$
であり、射影や仕事
$$
W=\int \mathbf{F}\cdot d\boldsymbol{\ell}
$$
に現れる。

### 2.2 外積（cross product）

$
\mathbf{a}\times\mathbf{b}
$
は両者に垂直なベクトルで、大きさは平行四辺形の面積
$$
|\mathbf{a}\times\mathbf{b}|=|\mathbf{a}||\mathbf{b}|\sin\theta
$$
である。向きは右手系で決まる。面の向き（法線）と境界の向き（周回方向）を対応させるときに本質的である。


## 3. 微分演算子 ∇ と三つの操作：grad・div・rot

ベクトル解析の中心は、演算子
$
\nabla
$
である。デカルト座標では
$$
\nabla=\left(\frac{\partial}{\partial x},\frac{\partial}{\partial y},\frac{\partial}{\partial z}\right)
$$
と表される。

### 3.1 勾配（gradient）

スカラー場 $f(\mathbf{r})$ に対し
$
\mathrm{grad}\,f=\nabla f
$
である。デカルト座標では
$$
\nabla f=\left(\frac{\partial f}{\partial x},\frac{\partial f}{\partial y},\frac{\partial f}{\partial z}\right)
$$
となる。

勾配の意味は次である。

- 向き：$f$ が最も増加する方向
- 大きさ：その方向の増加率（単位長さあたりの変化）

方向微分（単位ベクトル $\mathbf{n}$ 方向の微分）は
$$
\frac{\partial f}{\partial n}=\mathbf{n}\cdot\nabla f
$$
である。

### 3.2 発散（divergence）

ベクトル場 $\mathbf{F}$ に対し
$
\mathrm{div}\,\mathbf{F}=\nabla\cdot\mathbf{F}
$
である。デカルト座標では
$$
\nabla\cdot\mathbf{F}=\frac{\partial F_{x}}{\partial x}+\frac{\partial F_{y}}{\partial y}+\frac{\partial F_{z}}{\partial z}
$$
となる。

発散の意味は「局所的な湧き出し（源）や吸い込み（吸い込み口）」である。流体速度場なら、密度一定の非圧縮流れで
$
\nabla\cdot\mathbf{v}=0
$
が成り立つ。

### 3.3 回転（curl, rot）

ベクトル場 $\mathbf{F}$ に対し
$
\mathrm{rot}\,\mathbf{F}=\nabla\times\mathbf{F}
$
である。デカルト座標では
$$
\nabla\times\mathbf{F}=
\left(
\frac{\partial F_{z}}{\partial y}-\frac{\partial F_{y}}{\partial z},
\frac{\partial F_{x}}{\partial z}-\frac{\partial F_{z}}{\partial x},
\frac{\partial F_{y}}{\partial x}-\frac{\partial F_{x}}{\partial y}
\right)
$$

回転の意味は「局所的な渦の強さと軸方向」である。流体なら渦度、電磁気なら渦の法則（ファラデーの法則など）に現れる。


## 4. 線積分・面積分・体積分：微小要素と向き

### 4.1 線積分

曲線 $C$ に沿う線素を $d\boldsymbol{\ell}$ とすると、ベクトル場の線積分は
$$
\int_{C}\mathbf{F}\cdot d\boldsymbol{\ell}
$$
である。これは「曲線に沿った成分の積み重ね」であり、循環（circulation）としても解釈される。

### 4.2 面積分（フラックス）

向きを持つ面 $S$ の法線単位ベクトルを $\mathbf{n}$、面素を $dS$ とすると、フラックスは
$$
\int_{S}\mathbf{F}\cdot \mathbf{n}\,dS
$$
である。これは「面を貫く流れの総量」を表す。

### 4.3 体積分

領域 $V$ 上での体積分は
$$
\int_{V} g(\mathbf{r})\,dV
$$
である。発散定理により、体積分と面積分が結びつく。


## 5. 三つの積分定理

ベクトル解析の理解の核は、微分の情報と積分の情報が等価であることにある。

### 5.1 勾配定理（線積分の基本定理）

スカラー場 $f$ が十分滑らかで、曲線 $C$ が点 $A$ から点 $B$ を結ぶとき、
$$
\int_{C}\nabla f\cdot d\boldsymbol{\ell}=f(B)-f(A)
$$
が成り立つ。

この関係から、渦なし（回転がゼロ）の場がポテンシャルで書けるという議論につながる。

### 5.2 ストークスの定理

向き付けられた面 $S$ と、その境界曲線 $\partial S$ の向きが右手則で整合するように選ばれているとき、
$$
\int_{S}(\nabla\times\mathbf{F})\cdot\mathbf{n}\,dS=\oint_{\partial S}\mathbf{F}\cdot d\boldsymbol{\ell}
$$
が成り立つ。

左辺は面内にある渦の総量、右辺は境界に沿った循環である。

### 5.3 発散定理（ガウスの定理）

閉曲面 $S=\partial V$ が体積 $V$ を囲むとき、
$$
\int_{V}(\nabla\cdot\mathbf{F})\,dV=\oint_{S}\mathbf{F}\cdot\mathbf{n}\,dS
$$
が成り立つ。

左辺は体積内の湧き出しの総量、右辺は境界から外へ出るフラックスの総量である。


## 6. ポテンシャル場と保存場：rot=0 と div=0 の意味

### 6.1 保存場（回転がゼロ）

単連結領域で
$$
\nabla\times\mathbf{F}=\mathbf{0}
$$
ならば、あるスカラー場 $\phi$ が存在して
$
\mathbf{F}=\nabla\phi
$
と書ける。物理では符号を変えて
$
\mathbf{E}=-\nabla V
$
の形が頻出する（電場と電位など）。

このとき、閉曲線積分はゼロである：
$$
\oint \mathbf{F}\cdot d\boldsymbol{\ell}=0
$$

### 6.2 無発散場（湧き出しがゼロ）

$$
\nabla\cdot\mathbf{F}=0
$$
ならば、閉曲面を通る総フラックスはゼロである：
$$
\oint_{S}\mathbf{F}\cdot\mathbf{n}\,dS=0
$$
磁束密度 $\mathbf{B}$ に対して
$
\nabla\cdot\mathbf{B}=0
$
が代表例である。

### 6.3 ヘルムホルツ分解

十分よい条件のもとで、ベクトル場は「勾配成分」と「回転成分」に分けられるという考え方がある。境界条件や減衰条件が必要であり、電磁気学や流体の解析の背後にある見通しを与える。


## 7. ラプラシアンと基本方程式

スカラー場に対し
$$
\nabla^{2}f=\nabla\cdot(\nabla f)
$$
をラプラシアンという。デカルト座標では
$$
\nabla^{2}f=\frac{\partial^{2}f}{\partial x^{2}}+\frac{\partial^{2}f}{\partial y^{2}}+\frac{\partial^{2}f}{\partial z^{2}}
$$

物理での基本形は次である。

- ラプラス方程式
$$
\nabla^{2}f=0
$$
（源がない領域のポテンシャル）

- ポアソン方程式
$$
\nabla^{2}f=-\rho
$$
（源密度 $\rho$ によるポテンシャル）

電磁気学では
$$
\nabla^{2}V=-\rho/\varepsilon_{0}
$$
などが現れ、拡散や熱伝導では
$$
\partial_{t}u=D\nabla^{2}u
$$
が現れる。


## 8. 曲線座標系：円柱座標・球座標での公式

物理では対称性に応じて座標系を選ぶことが多い。曲線座標では、微小要素と演算子の形を正しく持つことが重要である。

### 8.1 円柱座標 $(r,\phi,z)$

位置：
$$
x=r\cos\phi,\ y=r\sin\phi
$$

微小線素：
$$
d\boldsymbol{\ell}=\mathbf{e}_{r}\,dr+\mathbf{e}_{\phi}\,r\,d\phi+\mathbf{e}_{z}\,dz
$$

体積要素：
$$
dV=r\,dr\,d\phi\,dz
$$

勾配：
$$
\nabla f=\mathbf{e}_{r}\frac{\partial f}{\partial r}
+\mathbf{e}_{\phi}\frac{1}{r}\frac{\partial f}{\partial \phi}
+\mathbf{e}_{z}\frac{\partial f}{\partial z}
$$

発散（$\mathbf{F}=F_{r}\mathbf{e}_{r}+F_{\phi}\mathbf{e}_{\phi}+F_{z}\mathbf{e}_{z}$）：
$$
\nabla\cdot\mathbf{F}=
\frac{1}{r}\frac{\partial}{\partial r}(rF_{r})
+\frac{1}{r}\frac{\partial F_{\phi}}{\partial \phi}
+\frac{\partial F_{z}}{\partial z}
$$

回転：
$$
\nabla\times\mathbf{F}=
\mathbf{e}_{r}\left(\frac{1}{r}\frac{\partial F_{z}}{\partial \phi}-\frac{\partial F_{\phi}}{\partial z}\right)
+\mathbf{e}_{\phi}\left(\frac{\partial F_{r}}{\partial z}-\frac{\partial F_{z}}{\partial r}\right)
+\mathbf{e}_{z}\left(\frac{1}{r}\frac{\partial}{\partial r}(rF_{\phi})-\frac{1}{r}\frac{\partial F_{r}}{\partial \phi}\right)
$$

### 8.2 球座標 $(r,\theta,\phi)$

体積要素：
$$
dV=r^{2}\sin\theta\,dr\,d\theta\,d\phi
$$

勾配：
$$
\nabla f=
\mathbf{e}_{r}\frac{\partial f}{\partial r}
+\mathbf{e}_{\theta}\frac{1}{r}\frac{\partial f}{\partial \theta}
+\mathbf{e}_{\phi}\frac{1}{r\sin\theta}\frac{\partial f}{\partial \phi}
$$

発散：
$$
\nabla\cdot\mathbf{F}=
\frac{1}{r^{2}}\frac{\partial}{\partial r}(r^{2}F_{r})
+\frac{1}{r\sin\theta}\frac{\partial}{\partial \theta}(\sin\theta\,F_{\theta})
+\frac{1}{r\sin\theta}\frac{\partial F_{\phi}}{\partial \phi}
$$

回転は式が長くなるため、必要に応じて参照するのがよいが、要点は「スケール因子（$r$、$r\sin\theta$）が微分の前後に入る」という構造にある。


## 9. 直交曲線座標の一般形：スケール因子の考え方

直交曲線座標 $(u_{1},u_{2},u_{3})$ で、線素が
$$
ds^{2}=h_{1}^{2}du_{1}^{2}+h_{2}^{2}du_{2}^{2}+h_{3}^{2}du_{3}^{2}
$$
と書けるとき、$h_{i}$ をスケール因子という。

このとき、勾配は
$$
\nabla f=\sum_{i=1}^{3}\mathbf{e}_{i}\frac{1}{h_{i}}\frac{\partial f}{\partial u_{i}}
$$
となり、発散と回転も $h_{1}h_{2}h_{3}$ を伴って整理できる。

円柱座標では $(h_{r},h_{\phi},h_{z})=(1,r,1)$、球座標では $(h_{r},h_{\theta},h_{\phi})=(1,r,r\sin\theta)$ である。公式を暗記するより、スケール因子の構造を理解すると再導出が可能になる。


## 10. ベクトル恒等式：計算を支える基本公式

微分演算子と積の法則から、多数の恒等式が得られる。物理で頻出するものをまとめる。

| 分類 | 恒等式 | 意味 |
|---|---|---|
| 回転と勾配 | $\nabla\times(\nabla f)=\mathbf{0}$ | 勾配場は渦を持たない |
| 発散と回転 | $\nabla\cdot(\nabla\times\mathbf{F})=0$ | 渦は源にならない |
| ラプラシアン | $\nabla^{2}f=\nabla\cdot(\nabla f)$ | 拡散・ポテンシャルの基本 |
| 積の発散 | $\nabla\cdot(f\mathbf{F})=\nabla f\cdot\mathbf{F}+f\,\nabla\cdot\mathbf{F}$ | 保存則の展開 |
| 積の回転 | $\nabla\times(f\mathbf{F})=\nabla f\times\mathbf{F}+f\,\nabla\times\mathbf{F}$ | 電磁気の変形 |
| 二重回転 | $\nabla\times(\nabla\times\mathbf{F})=\nabla(\nabla\cdot\mathbf{F})-\nabla^{2}\mathbf{F}$ | 波動方程式の導出に出る |

これらは座標に依らない恒等式である。ただし実際の計算では、曲線座標の成分表示で誤りが出やすいので、可能なら座標非依存の形を保って変形し、最後に成分へ落とすのが整然としている。


## 11. grad・div・rot と積分定理

ここでは式の意味が見えるよう、短い計算例を示す。

### 11.1 勾配の例

$
f(x,y,z)=x^{2}y+z
$
とすると、
$$
\nabla f=\left(2xy,\ x^{2},\ 1\right)
$$
である。ある点 $(x,y,z)$ において、$f$ が最も増える方向はこのベクトルの向きである。

### 11.2 発散の例（放射状の場）

$
\mathbf{F}=\alpha(x,y,z)=\alpha\mathbf{r}
$
（$\alpha$ は定数）とすると、
$$
\nabla\cdot\mathbf{F}=
\frac{\partial (\alpha x)}{\partial x}+\frac{\partial (\alpha y)}{\partial y}+\frac{\partial (\alpha z)}{\partial z}
=3\alpha
$$
である。どこでも一定の湧き出しを持つ場であるという解釈になる。

### 11.3 回転の例

$
\mathbf{F}=(-y,\ x,\ 0)
$
とすると、
$$
\nabla\times\mathbf{F}=
\left(0,\ 0,\ \frac{\partial x}{\partial x}-\frac{\partial (-y)}{\partial y}\right)
=(0,0,2)
$$
となり、$z$ 軸方向に一様な渦を持つ。

### 11.4 ストークスの定理の確認

上の $\mathbf{F}=(-y,x,0)$ を、$z=0$ 平面上の半径 $R$ の円周 $C$ で周回積分すると、
$$
\oint_{C}\mathbf{F}\cdot d\boldsymbol{\ell}
$$
は円周に沿った循環の総量を与える。

一方で、面 $S$ をその円板とすると、
$$
\int_{S}(\nabla\times\mathbf{F})\cdot\mathbf{n}\,dS
$$
は渦度の面積積分であり、$\nabla\times\mathbf{F}=(0,0,2)$ だから
$
2\times(\text{円板面積})
$
となる。両者が一致することがストークスの定理の主張である。


## 12. 物理への接続：式がどのように現れるか

### 12.1 電磁気学（マクスウェル方程式の形）

電磁気学では、発散と回転がそのまま基本方程式になる。

- ガウスの法則（電場）
$
\nabla\cdot\mathbf{E}=\rho/\varepsilon_{0}
$

- ガウスの法則（磁場）
$
\nabla\cdot\mathbf{B}=0
$

- ファラデーの法則
$
\nabla\times\mathbf{E}=-\frac{\partial \mathbf{B}}{\partial t}
$

- アンペール‐マクスウェルの法則
$
\nabla\times\mathbf{B}=\mu_{0}\mathbf{J}+\mu_{0}\varepsilon_{0}\frac{\partial \mathbf{E}}{\partial t}
$

これらを積分形へ変換すると、面積分や線積分の形になり、ストークスの定理と発散定理が背後で働いている。

### 12.2 流体力学

速度場 $\mathbf{v}$ に対し、

- 連続の式（質量保存）
$
\frac{\partial \rho}{\partial t}+\nabla\cdot(\rho\mathbf{v})=0
$

- 渦度
$
\boldsymbol{\omega}=\nabla\times\mathbf{v}
$

が基本量になる。非圧縮の条件は $\nabla\cdot\mathbf{v}=0$ である。

### 12.3 量子力学

波動関数 $\psi$ に対し、確率密度 $\rho=|\psi|^{2}$ と確率流 $\mathbf{j}$ は連続の式
$
\partial_{t}\rho+\nabla\cdot\mathbf{j}=0
$
を満たす。ここでも発散が保存則の形を決める。


## まとめと展望

ベクトル解析の初歩は、スカラー場とベクトル場を定義し、勾配 $\nabla f$、発散 $\nabla\cdot\mathbf{F}$、回転 $\nabla\times\mathbf{F}$ の意味を「局所的な変化・源・渦」として捉えることに尽きるのである。さらに、ストークスの定理と発散定理が、微分の情報と積分の情報を同一視し、場の方程式を局所形と大域形の双方で扱えるようにしている。

展望として、曲線座標とスケール因子の見通しが身につくと、対称性に応じた座標選択（球対称、円柱対称）で解析が大きく簡約される。加えて、ベリー曲率やゲージ場の議論、連続体の幾何学的表現、数値計算における離散微分形式などへ、ベクトル解析の考え方が自然に拡張されていくのである。


### 参考文献・資料
- MIT OpenCourseWare, 18.022 Calculus of Several Variables, Lecture: Div, grad, curl and all that（PDF）  
  https://ocw.mit.edu/courses/18-022-calculus-of-several-variables-fall-2010/2811ddbe75dcb771e8ff4b7d4e62dcac_MIT18_022F10_l_18.pdf

- MIT（解説ページ）, Gradient, divergence, and curl  
  https://www.mit.edu/~ashrstnv/grad-div-curl.html

- 東京大学 理学部 物理学科（関連）講義ノート例：物理数学III（PDF）  
  https://cat.phys.s.u-tokyo.ac.jp/lecture/MP3_16/maph3.pdf
