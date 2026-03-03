# 線形代数の初歩

線形代数は、ベクトルと線形写像（行列）を共通言語として、方程式・幾何・最適化・物理を統一的に扱う基礎理論である。計算規則の背後にある構造（空間・写像・分解）を押さえることで、式変形の意味が見通せるようになるのである。

### 参考ドキュメント
1. 東京大学 数理科学研究科：線形代数学第一（講義資料ページ）
   https://www.ms.u-tokyo.ac.jp/~kelly/Course2021LinAlg/2021LinAlg.html
2. 島根大学：数学基礎IV（線形代数学）講義ノート（PDF）
   https://www.math.shimane-u.ac.jp/~tosihiro/skks4main.pdf
3. MIT OpenCourseWare：18.06 Linear Algebra（Strang 講義ノート等）
   https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/

## 0. 記法と前提

スカラー体は実数体 $\mathbb{R}$ または複素数体 $\mathbb{C}$ とする。
ベクトルは太字 $\mathbf{x}$ または列ベクトルで表し、行列は $A,B$ などで表す。
転置は $A^{\mathsf{T}}$、複素共役転置は $A^{\dagger}$ で表す。
単位行列を $I$、零行列を $0$ と書く。
内積は実数空間では $\langle \mathbf{x},\mathbf{y}\rangle=\mathbf{x}^{\mathsf{T}}\mathbf{y}$、複素空間では $\langle \mathbf{x},\mathbf{y}\rangle=\mathbf{x}^{\dagger}\mathbf{y}$ を基本とする。


## 1. ベクトル空間：何が「ベクトル」なのか

### 1.1 ベクトル空間の定義

集合 $V$ がスカラー体 $\mathbb{K}(\mathbb{R}\ \text{または}\ \mathbb{C})$ 上のベクトル空間であるとは、次を満たすことである。

- 任意の $\mathbf{u},\mathbf{v}\in V$ に対し和 $\mathbf{u}+\mathbf{v}\in V$ が定義される。
- 任意の $c\in\mathbb{K}$ と $\mathbf{v}\in V$ に対しスカラー倍 $c\mathbf{v}\in V$ が定義される。
- それらが交換法則・結合法則・分配法則・零ベクトルの存在・逆ベクトルの存在などの公理を満たす。

この定義は抽象的であるが、「加法」と「スカラー倍」が自然に定義でき、線形結合が意味をもつ対象は多くがベクトル空間になるのである。


### 1.2 基本例（$\mathbb{R}^{n}$ 以外も含む）

線形代数では $\mathbb{R}^{n}$ の計算が出発点であるが、同じ構造は他にも現れる。

- $\mathbb{R}^{n}$：$n$ 次元列ベクトル全体。
- 多項式空間：次数 $\le d$ の多項式全体は次元 $d+1$ のベクトル空間である。
- 関数空間：区間上の連続関数全体は無限次元のベクトル空間である。
- 行列空間：$m\times n$ 行列全体は次元 $mn$ のベクトル空間である。

「成分を足す」「定数倍する」が自然であれば、対象は数列でも関数でも行列でもよいのである。


## 2. 部分空間と張る（span）：直線・平面・より高次元

### 2.1 部分空間

$W\subset V$ が $V$ の部分空間であるとは、$\mathbf{0}\in W$ かつ

- $\mathbf{u},\mathbf{v}\in W \Rightarrow \mathbf{u}+\mathbf{v}\in W$
- $c\in\mathbb{K},\mathbf{v}\in W \Rightarrow c\mathbf{v}\in W$

を満たすことである。
これにより、原点を通る直線や平面が「部分空間」として統一されるのである。


### 2.2 線形結合と張る集合（span）

ベクトル $\mathbf{v}_{1},\dots,\mathbf{v}_{k}$ の線形結合は

$$
c_{1}\mathbf{v}_{1}+\cdots+c_{k}\mathbf{v}_{k}
$$

である。これら全体の集合を

$$
\mathrm{span}\{\mathbf{v}_{1},\dots,\mathbf{v}_{k}\}
$$

と書き、「$\mathbf{v}_{1},\dots,\mathbf{v}_{k}$ が張る部分空間」である。
座標幾何の直線・平面の方程式は、実は span の言い換えであることが多いのである。


## 3. 座標の意味を決める

### 3.1 一次独立

$\mathbf{v}_{1},\dots,\mathbf{v}_{k}$ が一次独立であるとは、

$$
c_{1}\mathbf{v}_{1}+\cdots+c_{k}\mathbf{v}_{k}=\mathbf{0}
\Rightarrow c_{1}=\cdots=c_{k}=0
$$

が成り立つことである。
一次独立とは「余計な重なりがない」状態であり、座標表示が一意になる条件である。


### 3.2 基底と次元

$V$ の基底とは、(i) 一次独立であり、(ii) $V$ を張る（span が $V$ になる）ベクトル族である。

基底 $\{\mathbf{b}_{1},\dots,\mathbf{b}_{n}\}$ が与えられると、任意の $\mathbf{x}\in V$ は一意に

$$
\mathbf{x}=x_{1}\mathbf{b}_{1}+\cdots+x_{n}\mathbf{b}_{n}
$$

と表せる。この係数 $(x_{1},\dots,x_{n})$ が「座標」である。
基底の本数 $n$ が次元 $\dim V$ である。

重要なのは、基底は一つではないが、次元は不変量である点である。
別の基底を選ぶことは「同じ対象を別の座標系で見る」ことに相当するのである。


### 3.3 基底変換と行列

2つの基底 $B=\{\mathbf{b}_{i}\}$ と $C=\{\mathbf{c}_{i}\}$ の間の座標変換は行列で表される。
基底の並べ方に注意しつつ、

- $[\mathbf{x}]_{B}$：$B$ 基底での座標
- $[\mathbf{x}]_{C}$：$C$ 基底での座標

と書くと、ある正則行列 $P$ により

$$
[\mathbf{x}]_{C}=P[\mathbf{x}]_{B}
$$

の形で結ばれる。
この $P$ は「同じベクトルを別の物差しで測る変換」である。


## 4. 線形写像：行列の本体は「写像」である

### 4.1 線形写像の定義

写像 $T:V\to W$ が線形であるとは、

$$
T(\mathbf{u}+\mathbf{v})=T(\mathbf{u})+T(\mathbf{v}),\qquad
T(c\mathbf{v})=cT(\mathbf{v})
$$

を満たすことである。
線形性は「足し算と定数倍を保つ」性質であり、この性質が計算を大幅に単純化するのである。


### 4.2 核（kernel）と像（image）

核（零化空間）と像は次である。

$$
\ker T=\{\mathbf{v}\in V\mid T(\mathbf{v})=\mathbf{0}\},\qquad
\mathrm{Im}\,T=\{T(\mathbf{v})\mid \mathbf{v}\in V\}
$$

核は「つぶれる方向」、像は「到達できる範囲」である。
この2つは線形写像の性格を最も端的に表す対象である。


### 4.3 次元定理（階数・退化度）

有限次元であれば

$$
\dim V=\dim(\ker T)+\dim(\mathrm{Im}\,T)
$$

が成り立つ。
行列 $A$ による写像 $T(\mathbf{x})=A\mathbf{x}$ では

- $\mathrm{rank}(A)=\dim(\mathrm{Im}\,T)$（階数）
- $\mathrm{nullity}(A)=\dim(\ker T)$（退化度）

であり、

$$
n=\mathrm{rank}(A)+\mathrm{nullity}(A)
$$

となる。
連立一次方程式 $A\mathbf{x}=\mathbf{b}$ の「解があるか」「一意か」「自由度はいくつか」は、この等式と階数で読み解けるのである。


## 5. 行列：計算規則と意味を一致させる

### 5.1 行列の積の意味

行列積 $AB$ は「写像の合成」に対応する。

$$
(AB)\mathbf{x}=A(B\mathbf{x})
$$

である。
したがって一般に $AB\ne BA$ であることは自然である。
順序が違えば「先に行う変換」が違うのである。


### 5.2 逆行列と正則性

正方行列 $A$ が正則（可逆）であるとは、ある $A^{-1}$ が存在して

$$
A^{-1}A=AA^{-1}=I
$$

となることである。
幾何的には、正則とは「空間をつぶさない」ことであり、解析的には「$A\mathbf{x}=\mathbf{b}$ が任意の $\mathbf{b}$ に対してただ一つ解をもつ」ことである。


### 5.3 階数と線形方程式

$A\mathbf{x}=\mathbf{b}$ が解をもつ条件は、拡大行列 $[A\mid \mathbf{b}]$ の階数と $A$ の階数が一致することである。

$$
\mathrm{rank}(A)=\mathrm{rank}([A\mid \mathbf{b}])
$$

一意性はさらに $\mathrm{rank}(A)=n$（未知数の数）で決まる。
掃き出し法（行基本変形）は、この階数判定と解の記述を具体的に実行する方法である。


## 6. 行列式：体積倍率として理解する

行列式 $\det(A)$ は、正方行列 $A$ が与える線形変換が、体積をどれだけ拡大・縮小するかを表す量である。

- $|\det(A)|$ は体積倍率である。
- $\det(A)=0$ は、体積が 0 になる、すなわちつぶれが起きることを意味する。
- $\det(A)\ne 0$ は正則性と同値である。

また固有値 $\lambda_{1},\dots,\lambda_{n}$ により

$$
\det(A)=\prod_{i=1}^{n}\lambda_{i}
$$

が成り立つ（代数的重複を含む）。
この関係は固有値が「変換の本質的伸縮率」であることを示しているのである。


## 7. 内積空間と直交：角度・長さ・射影が導入される

### 7.1 内積とノルム

内積 $\langle\mathbf{x},\mathbf{y}\rangle$ からノルム（長さ）

$$
\|\mathbf{x}\|=\sqrt{\langle\mathbf{x},\mathbf{x}\rangle}
$$

が定まる。
直交は $\langle\mathbf{x},\mathbf{y}\rangle=0$ で定義される。
直交性は、成分が互いに影響しない方向分解を与えるのである。


### 7.2 グラム・シュミット正規直交化

一次独立な $\mathbf{v}_{1},\dots,\mathbf{v}_{k}$ から正規直交基底 $\mathbf{q}_{1},\dots,\mathbf{q}_{k}$ を作る手続きがグラム・シュミットである。

$$
\mathbf{u}_{1}=\mathbf{v}_{1},\quad \mathbf{q}_{1}=\frac{\mathbf{u}_{1}}{\|\mathbf{u}_{1}\|}
$$

$$
\mathbf{u}_{2}=\mathbf{v}_{2}-\langle\mathbf{q}_{1},\mathbf{v}_{2}\rangle\mathbf{q}_{1},\quad
\mathbf{q}_{2}=\frac{\mathbf{u}_{2}}{\|\mathbf{u}_{2}\|}
$$

一般に

$$
\mathbf{u}_{j}=\mathbf{v}_{j}-\sum_{i=1}^{j-1}\langle\mathbf{q}_{i},\mathbf{v}_{j}\rangle\mathbf{q}_{i},\quad
\mathbf{q}_{j}=\frac{\mathbf{u}_{j}}{\|\mathbf{u}_{j}\|}
$$

である。
直交基底が得られると、射影や最小二乗が簡潔に書けるようになる。


### 7.3 直交射影

部分空間 $W$ の正規直交基底を列に並べた行列を $Q$（列が $\mathbf{q}_{i}$）とすると、$W$ への直交射影は

$$
\mathrm{proj}_{W}(\mathbf{x})=QQ^{\mathsf{T}}\mathbf{x}\quad (\mathbb{R}),\qquad
\mathrm{proj}_{W}(\mathbf{x})=QQ^{\dagger}\mathbf{x}\quad (\mathbb{C})
$$

で与えられる。
射影は「最も近い点」を返す操作であり、誤差 $\mathbf{x}-\mathrm{proj}_{W}(\mathbf{x})$ は $W$ に直交する。


## 8. 基本分解：LU・QR・SVD という三本柱

線形代数では、行列を意味のある因子に分けることで理解と計算が進むことが多い。
ここでは三つの重要分解をまとめる。

| 分解 | 形 | 何を表すか | よく現れる場面 |
|---|---|---|---|
| LU分解 | $A=LU$ | 下三角と上三角への分解 | 連立一次方程式の解法 |
| QR分解 | $A=QR$ | 直交（ユニタリ）と上三角 | 最小二乗、直交化 |
| SVD | $A=U\Sigma V^{\mathsf{T}}$（または $V^{\dagger}$） | 直交変換＋伸縮＋直交変換 | 次元圧縮、近似、擬似逆 |

これらは「計算の道具」であるだけでなく、行列の幾何学的意味を取り出す装置である。


### 8.1 LU分解

$A$ が適切な条件を満たすとき、下三角行列 $L$ と上三角行列 $U$ により $A=LU$ と書ける。
$A\mathbf{x}=\mathbf{b}$ は

$$
LU\mathbf{x}=\mathbf{b}
$$

であり、まず $L\mathbf{y}=\mathbf{b}$ を前進代入で解き、次に $U\mathbf{x}=\mathbf{y}$ を後退代入で解くことで $\mathbf{x}$ が得られる。
掃き出し法の本質を分解として捉えたものと見なせるのである。


### 8.2 QR分解と最小二乗

$A$ が $m\times n$（$m\ge n$）のとき、

$$
A=QR
$$

と分解できる（$Q$ は列直交、$R$ は上三角）。
最小二乗問題

$$
\min_{\mathbf{x}}\|A\mathbf{x}-\mathbf{b}\|^{2}
$$

は、$Q$ の直交性により

$$
\|A\mathbf{x}-\mathbf{b}\|=\|R\mathbf{x}-Q^{\mathsf{T}}\mathbf{b}\|
$$

へ簡約され、上三角 $R$ の方程式として解ける。
内積空間の射影が「最も近い近似」を与えるという事実が、最小二乗の背後にある幾何である。


### 8.3 特異値分解（SVD）

任意の $m\times n$ 行列 $A$ は

$$
A=U\Sigma V^{\mathsf{T}}\quad (\mathbb{R}),\qquad
A=U\Sigma V^{\dagger}\quad (\mathbb{C})
$$

と書ける。
$U$ と $V$ は直交（ユニタリ）行列、$\Sigma$ は非負の対角成分（特異値）をもつ行列である。

特異値 $\sigma_{1}\ge\sigma_{2}\ge\cdots\ge 0$ は $A$ が球を楕円体へ写すときの主半径である。
したがって SVD は「回転（直交変換）→伸縮（対角）→回転」という最も分かりやすい幾何分解を与えるのである。

また $A^{\mathsf{T}}A$（または $A^{\dagger}A$）の固有値は $\sigma_{i}^{2}$ になり、固有値問題と深く結びつく。


## 9. 固有値・固有ベクトル：変換の本質的な方向と倍率

### 9.1 定義と意味

固有値問題は

$$
A\mathbf{v}=\lambda \mathbf{v},\qquad \mathbf{v}\ne \mathbf{0}
$$

である。
$\mathbf{v}$ は変換で方向が変わらないベクトルであり、$\lambda$ は伸縮倍率である。
固有値は変換の繰り返し $A^{k}$ の挙動（長期挙動）を決める鍵になることが多い。


### 9.2 対角化とその条件

独立な固有ベクトルが $n$ 本そろうとき、行列は

$$
A=PDP^{-1}
$$

と対角化できる（$D$ は固有値を並べた対角行列）。
このとき

$$
A^{k}=PD^{k}P^{-1}
$$

となり、冪が容易に評価できる。
対角化できない場合は一般にはジョルダン標準形に進むが、初歩では「対称（エルミート）なら必ず対角化できる」という強い結果が特に重要である。


### 9.3 スペクトル定理（対称・エルミート）

実対称行列 $A=A^{\mathsf{T}}$、またはエルミート行列 $A=A^{\dagger}$ は、直交（ユニタリ）行列 $Q$ により

$$
A=Q\Lambda Q^{\mathsf{T}}\quad (\mathbb{R}),\qquad
A=Q\Lambda Q^{\dagger}\quad (\mathbb{C})
$$

と対角化できる。ここで固有値はすべて実数であり、固有ベクトルは直交に取れる。
この定理は二次形式、振動モード、量子力学の観測量（エルミート演算子）の数学的基盤である。


## 10. 二次形式と正定値：エネルギーの形を読む

二次形式は

$$
q(\mathbf{x})=\mathbf{x}^{\mathsf{T}}A\mathbf{x}\quad (\mathbb{R}),\qquad
q(\mathbf{x})=\mathbf{x}^{\dagger}A\mathbf{x}\quad (\mathbb{C})
$$

である。
$A$ が対称（エルミート）なら、スペクトル定理により回転（ユニタリ変換）で主軸方向へ分離できる。

正定値（positive definite）は

$$
\mathbf{x}\ne \mathbf{0}\Rightarrow \mathbf{x}^{\mathsf{T}}A\mathbf{x}>0
$$

で定義され、これは固有値がすべて正であることと同値である。
正定値は「曲率が正」「エネルギーが下に凸」といった性質を線形代数で表現したものと見なせる。


## 11. 条件数という指標

連立一次方程式や最小二乗では、係数行列がほとんどつぶれていると、入力のわずかな変化に解が大きく影響されることがある。
その程度を表す基本量が条件数である。

2ノルムに関して

$$
\kappa_{2}(A)=\|A\|_{2}\,\|A^{-1}\|_{2}
$$

であり、SVD により

$$
\kappa_{2}(A)=\frac{\sigma_{\max}}{\sigma_{\min}}
$$

と書ける（$A$ が正則のとき）。
特異値が 0 に近いほど $\kappa$ は大きくなり、解の安定性が悪くなる傾向がある。
この点は、行列の「幾何（つぶれ）」が「計算の振る舞い」に直結する例である。


## 12. 物理・量子力学への接続：線形代数が土台になる理由

量子力学では、状態はヒルベルト空間のベクトル $|\psi\rangle$、観測量はエルミート演算子 $\hat{A}$ として表される。
測定値が固有値として現れ、測定確率が内積（振幅）の二乗により与えられるという構造は、固有値問題と直交分解そのものである。

- 観測量：$\hat{A}=\hat{A}^{\dagger}$（固有値は実、固有状態は直交）
- 時間発展：ユニタリ $U^{\dagger}U=I$（内積保存）
- 状態の重ね合わせ：線形結合（ベクトル空間）
- 密度行列：$\rho$（半正定値、トレース1）

したがって、線形代数の基礎（内積、直交、固有分解、ユニタリ変換、正定値性）を押さえることは、量子理論の式の意味を見通す最短経路の一つである。


## まとめと展望

線形代数の初歩は、ベクトル空間・部分空間・基底・次元という「空間の言葉」を定義し、線形写像を核と像で特徴づけ、行列を写像の表現として扱う枠組みを確立する段階である。そこから内積と直交を導入すると、射影・最小二乗・直交分解が自然に現れ、さらに固有値分解や特異値分解が変換の本質（伸縮と向き）を抽出する道具として位置づくのである。

展望としては、(1) 無限次元の線形代数（関数空間、フーリエ解析、作用素論）へ進むことで、量子力学・偏微分方程式の基礎が一段深まる、(2) 正定値性と分解（Cholesky、スペクトル分解）を軸にすると最適化・統計の数学が見通せる、(3) SVD を軸にすると低ランク近似や情報抽出の理解が統一される、という方向に接続される。初歩の定義と分解の意味付けを丁寧に固めることが、以後の発展を滑らかにするのである。


### 参考文献
- Gilbert Strang：ZoomNotes for Linear Algebra（PDF）
  https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/4d876a9159e32543eb0d73b4d4382f4c_MIT18_06S10ZoomNotes.pdf

- MIT：18.06 Lecture notes（PDF例）
  https://web.mit.edu/18.06/www/Spring21/Lecture%20notes.pdf

- 埼玉大学：線形代数学 講義ノート（PDF）
  https://www.rimath.saitama-u.ac.jp/lab.jp/Fukui/lectures/Linear_algebra.pdf

- 東京女子大学（公開ページ経由）：線形代数学I 講義ノート（PDF）
  https://www2.yukawa.kyoto-u.ac.jp/~akio.tomiya/tonjo_pdf/linear_algebra2024_v3_note.pdf

- 神奈川大学：線形代数学 講義ノート（PDF）
  https://www.math.kanagawa-u.ac.jp/mine/linear_alg/linear_alg_2017_02_28.pdf
