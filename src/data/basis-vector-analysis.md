# 機械学習のためのベクトル解析入門

機械学習で頻出する勾配法・自動微分・物理拘束（保存則など）は、ベクトル解析の演算子（勾配・発散・回転）と積分定理で共通の言語に整理できるのである。3次元空間の直観と一般次元の記法を往復すると、式変形と意味理解が同時に進むのである。

## 参考ドキュメント
- MIT OpenCourseWare, Vector Calculus（講義資料PDF）
  https://ocw.mit.edu/courses/res-18-001-calculus-fall-2023/mitres_18_001_f17_ch15.pdf
- 信州大学, 物理数学I（勾配・発散・回転・ラプラシアンの意味と公式を含むPDF）
  https://azusa.shinshu-u.ac.jp/~odake/jugyou/bsI_ver2.1.7_all.pdf
- 九州大学, ベクトル解析の基礎（ガウスの定理やグリーンの定理を含むPDF）
  https://www2.math.kyushu-u.ac.jp/~hara/lectures/06/zoku15-060629.pdf

## 1. 位置ベクトル・スカラー場・ベクトル場

ベクトル解析では、空間上の「量」を次の二つで扱う。

- スカラー場：各点に実数が割り当てられる。例として温度 $T(x,y,z)$ がある。
- ベクトル場：各点にベクトルが割り当てられる。例として速度場 $\mathbf{v}(x,y,z)$ がある。

3次元の位置ベクトルを $\mathbf{r}=(x,y,z)^{\top}$ とし、スカラー場を $f(\mathbf{r})$、ベクトル場を $\mathbf{F}(\mathbf{r})=(F_{x},F_{y},F_{z})^{\top}$ と書く。

機械学習では、空間座標 $(x,y,z)$ の代わりに、パラメータ $\theta\in\mathbb{R}^{d}$ を「座標」と見なすことが多い。損失関数 $L(\theta)$ はスカラー場、勾配 $\nabla L(\theta)$ はベクトル場と同型である。

## 2. 微分演算子 $\nabla$（ナブラ）と三つの基本演算

ナブラ演算子を

$$
\nabla=\left(\frac{\partial}{\partial x},\frac{\partial}{\partial y},\frac{\partial}{\partial z}\right)^{\top}
$$

と書く。この $\nabla$ をスカラー場・ベクトル場に作用させることで、ベクトル解析の主要演算が定義される。

### 2.1 勾配（gradient）

スカラー場 $f(x,y,z)$ の勾配は

$$
\nabla f=\left(\frac{\partial f}{\partial x},\frac{\partial f}{\partial y},\frac{\partial f}{\partial z}\right)^{\top}
$$

である。勾配の意味は「最も増加する方向」であり、方向微分で厳密に表せる。

単位ベクトル $\mathbf{u}$ に沿った方向微分は

$$
D_{\mathbf{u}} f(\mathbf{r})=\lim_{\epsilon\to 0}\frac{f(\mathbf{r}+\epsilon\mathbf{u})-f(\mathbf{r})}{\epsilon}
=\nabla f(\mathbf{r})\cdot \mathbf{u}
$$

である。内積が最大になるのは $\mathbf{u}\parallel \nabla f$ のときであるから、勾配は「上り坂の最急方向」を与える。

機械学習の更新式

$$
\theta_{t+1}=\theta_{t}-\eta \nabla L(\theta_{t})
$$

は、損失を下げる方向 $-\nabla L$ に進む操作であり、ベクトル解析の幾何そのものである。

### 2.2 発散（divergence）

ベクトル場 $\mathbf{F}=(F_{x},F_{y},F_{z})$ の発散は

$$
\nabla\cdot \mathbf{F}=\frac{\partial F_{x}}{\partial x}+\frac{\partial F_{y}}{\partial y}+\frac{\partial F_{z}}{\partial z}
$$

である。発散の意味は「点を中心とする湧き出し・吸い込みの強さ」である。

局所的な意味は、微小体積 $V$ とその境界面 $\partial V$ に対して、単位法線 $\mathbf{n}$ を用い

$$
\frac{1}{|V|}\iint_{\partial V}\mathbf{F}\cdot \mathbf{n}\,dS
$$

を $V\to 0$ とした極限として理解できる。外向きの流束が正なら湧き出し、負なら吸い込みである。

機械学習では、確率流 $\mathbf{j}$ と密度 $\rho$ の保存則（連続の式）

$$
\frac{\partial \rho}{\partial t}+\nabla\cdot \mathbf{j}=0
$$

が、連続時間の生成モデルや最適輸送の考え方と接続する場面がある。

### 2.3 回転（curl, rotation）

ベクトル場 $\mathbf{F}$ の回転は

$$
\nabla\times \mathbf{F}
=
\left(
\frac{\partial F_{z}}{\partial y}-\frac{\partial F_{y}}{\partial z},
\frac{\partial F_{x}}{\partial z}-\frac{\partial F_{z}}{\partial x},
\frac{\partial F_{y}}{\partial x}-\frac{\partial F_{x}}{\partial y}
\right)^{\top}
$$

である。回転の意味は「局所的な渦の強さと軸方向」である。ベクトル場を微小な閉曲線に沿って線積分すると、その値が回転と面積に比例する、という積分的意味が重要である（後述するストークスの定理）。

### 2.4 ラプラシアン（Laplacian）

スカラー場のラプラシアンは

$$
\nabla^{2}f=\nabla\cdot(\nabla f)
=\frac{\partial^{2} f}{\partial x^{2}}+\frac{\partial^{2} f}{\partial y^{2}}+\frac{\partial^{2} f}{\partial z^{2}}
$$

である。意味としては「周囲平均との差」に近く、拡散・平滑化・ポアソン方程式の中心にある。

機械学習では、グラフラプラシアンやラプラシアン正則化の直観につながり、滑らかさ制約や半教師あり学習の枠組みで現れることがある。

## 3. 線積分・面積分・体積分

### 3.1 線積分（line integral）

曲線 $C$ をパラメータ $t$ で $\mathbf{r}(t)$ と表す。ベクトル場の線積分は

$$
\int_{C}\mathbf{F}\cdot d\mathbf{r}
=\int_{t_{a}}^{t_{b}}\mathbf{F}(\mathbf{r}(t))\cdot \mathbf{r}'(t)\,dt
$$

である。意味は「曲線方向に沿った仕事量」あるいは「接線方向成分の蓄積」である。

スカラー場の線積分（弧長積分）は

$$
\int_{C} f\, ds
$$

であり、ベクトル場とは別物である点に注意する。

### 3.2 面積分（surface integral）と流束

曲面 $S$ の単位法線を $\mathbf{n}$ とすると、流束（flux）は

$$
\iint_{S}\mathbf{F}\cdot \mathbf{n}\,dS
$$

である。意味は「面を貫く流れの総量」である。符号は法線の向き（表裏）で変わる。

### 3.3 体積分（volume integral）

体積 $V$ 上の積分は

$$
\iiint_{V} f\, dV
$$

であり、保存則・生成消滅（ソース項）と結びつくことが多い。

## 4. 三大積分定理（微分形と積分形の往復）

ベクトル解析の強みは、局所（微分）と大域（積分）を結ぶ定理にある。離散化や数値計算では、どちらの形を基本にするかで設計思想が大きく変わる。

### 4.1 勾配定理（基本定理：線積分）

$f$ が十分滑らかで、$C$ が点 $A$ から $B$ へ向かう曲線のとき

$$
\int_{C}\nabla f\cdot d\mathbf{r}= f(B)-f(A)
$$

である。右辺が経路に依存しないことから、$\nabla f$ は保存場（conservative field）である。

この事実は、最適化で「ポテンシャル（損失）に従って降りる」ことの数学的基盤にもなっている。

### 4.2 ガウスの発散定理（divergence theorem）

体積 $V$ とその境界閉曲面 $\partial V$ に対して

$$
\iiint_{V}(\nabla\cdot \mathbf{F})\,dV
=
\iint_{\partial V}\mathbf{F}\cdot \mathbf{n}\,dS
$$

である。左辺は体積内部の湧き出しの総量、右辺は境界から出入りする流束の総量であり、保存則の大域形を与える。

### 4.3 ストークスの定理（Stokes' theorem）

曲面 $S$ の境界曲線を $\partial S$ とすると

$$
\iint_{S}(\nabla\times \mathbf{F})\cdot \mathbf{n}\,dS
=
\int_{\partial S}\mathbf{F}\cdot d\mathbf{r}
$$

である。左辺は曲面上の回転の貫通量、右辺は境界での循環である。

向き（orientation）が重要である。境界の進行方向は、法線の向きと右ねじの関係で固定される。

### 4.4 グリーンの定理（2次元の特別形）

$xy$ 平面上の領域 $D$ とその境界 $\partial D$ に対して、$\mathbf{F}=(P,Q)$ とすると

$$
\oint_{\partial D} P\,dx+Q\,dy
=
\iint_{D}\left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)dA
$$

である。これは2次元版のストークスの定理である。

## 5. 基本恒等式

ベクトル解析には頻繁に使う恒等式がある。丸暗記よりも「符号と演算の形」を押さえる方が、式変形が安定する。

### 5.1 いつもゼロになる合成

滑らかな $f$ と $\mathbf{F}$ について

$$
\nabla\times (\nabla f)=\mathbf{0}
$$

$$
\nabla\cdot (\nabla\times \mathbf{F})=0
$$

である。

意味として、勾配場は局所的に渦を持たず、回転は局所的な湧き出しを持たない、という構造である。数値離散でこの構造を保つかどうかが、安定性や再現性に影響することがある。

### 5.2 ラプラシアンとベクトルラプラシアン

スカラーでは $\nabla^{2}f=\nabla\cdot\nabla f$ である。

ベクトル場に対する恒等式として

$$
\nabla\times(\nabla\times \mathbf{F})
=
\nabla(\nabla\cdot \mathbf{F})-\nabla^{2}\mathbf{F}
$$

がある。ここで $\nabla^{2}\mathbf{F}$ は各成分にラプラシアンを作用させたものとして理解できる（成分ごとの2階微分の和である）。

## 6. ヤコビアン・ヘッセ行列とベクトル解析

機械学習では、関数が「入力がベクトル、出力もベクトル」という形になることが多い。ここで微分はテンソル（行列や高階配列）として現れる。

### 6.1 ヤコビアン（Jacobian）

$\mathbf{g}:\mathbb{R}^{d}\to\mathbb{R}^{m}$ のヤコビアンは

$$
J_{\mathbf{g}}(x)
=
\left[\frac{\partial g_{i}}{\partial x_{j}}\right]_{i=1,\dots,m;\,j=1,\dots,d}
\in \mathbb{R}^{m\times d}
$$

である。多層ニューラルネットの合成関数では、連鎖律によりヤコビアンが積として現れる。

### 6.2 勾配（gradient）はヤコビアンの特別形

スカラー関数 $f:\mathbb{R}^{d}\to\mathbb{R}$ の場合、ヤコビアンは $1\times d$ であり、その転置がベクトルとしての勾配である。

$$
\nabla f(x)=J_{f}(x)^{\top}
$$

### 6.3 ヘッセ行列（Hessian）

2階微分を集めたヘッセ行列は

$$
H_{f}(x)=\left[\frac{\partial^{2} f}{\partial x_{i}\partial x_{j}}\right]_{i,j=1,\dots,d}
$$

である。最適化では曲率情報として重要であり、ニュートン法や準ニュートン法の基礎になる。

## 7. 座標系と演算子の形

3Dの直観を持つために、座標変換（直交座標・円筒座標・球座標）を一度は眺める価値がある。直交座標では式が簡潔であるが、対称性がある問題では円筒座標や球座標が自然になる。

ここでは詳細導出よりも、形が複雑になる理由を述べる。一般座標系では「距離（計量）」が変わり、微小長さ・面積・体積の表式が変わるため、$\nabla$ の成分にスケール因子が入る。機械学習でも、リーマン計量を導入する自然勾配法（natural gradient）の理解に接続する話題である。

## 8. ベクトル解析と確率・情報・学習との接点

### 8.1 自動微分と計算グラフ

深層学習では、勾配は人手で展開するよりも自動微分で得ることが多い。自動微分は連鎖律を計算グラフ上で系統的に適用する仕組みであり、ベクトル・ヤコビアンの観点が支柱になる。

- 逆モード（reverse mode）は、出力がスカラー（損失）で入力が高次元（パラメータ）の場合に効率がよい。
- 順モード（forward mode）は、入力次元が小さい場合に扱いやすい。

### 8.2 保存則と拘束学習（微分形と積分形）

連続の式や拡散方程式などは、微分形（発散やラプラシアンで書かれる）と、積分形（ガウスの発散定理で書かれる）を行き来できる。これは物理法則を利用する学習法（例：方程式残差を損失に入れる方法）でも重要である。

### 8.3 グラフ上の勾配・発散・回転

データ科学では、連続空間ではなくグラフ上でデータが与えられることがある。このとき、勾配・発散・回転に相当する離散作用素が定義され、最小二乗や正則化、拡散過程の設計に使われる。連続のベクトル解析と同型の構造が現れる点が要点である。

## 9. まとめ表

| 対象 | 演算 | 記号 | 入力 | 出力 | 直観的意味 |
|---|---|---|---|---|---|
| スカラー場 $f$ | 勾配 | $\nabla f$ | $\mathbb{R}$ | $\mathbb{R}^{3}$ | 最急上昇方向と大きさ |
| ベクトル場 $\mathbf{F}$ | 発散 | $\nabla\cdot \mathbf{F}$ | $\mathbb{R}^{3}$ | $\mathbb{R}$ | 湧き出し・吸い込み |
| ベクトル場 $\mathbf{F}$ | 回転 | $\nabla\times \mathbf{F}$ | $\mathbb{R}^{3}$ | $\mathbb{R}^{3}$ | 局所渦の軸と強さ |
| スカラー場 $f$ | ラプラシアン | $\nabla^{2}f$ | $\mathbb{R}$ | $\mathbb{R}$ | 周囲との差・拡散 |
| 合成 | 常にゼロ | $\nabla\times\nabla f$ | - | $\mathbf{0}$ | 勾配場は渦なし |
| 合成 | 常にゼロ | $\nabla\cdot(\nabla\times\mathbf{F})$ | - | $0$ | 回転は湧き出しなし |

## 10. 数値微分と場の可視化

以下は、スカラー場から勾配を数値近似し、その大きさと方向を確認する例である。連続の定義を離散格子で近似するだけでも、勾配の意味が視覚的に理解しやすい。

```python
import numpy as np
import matplotlib.pyplot as plt

# 2Dで可視化（3Dの勾配に対応する直観を作る目的）
nx, ny = 120, 120
x = np.linspace(-2.0, 2.0, nx)
y = np.linspace(-2.0, 2.0, ny)
X, Y = np.meshgrid(x, y, indexing="xy")

# スカラー場 f(x,y)（例：複数の谷を持つ形）
f = 0.5*(X**2 + 0.5*Y**2) + 0.2*np.sin(3*X)*np.cos(2*Y)

dx = x[1] - x[0]
dy = y[1] - y[0]

# 中心差分で勾配を近似
dfdx = (np.roll(f, -1, axis=1) - np.roll(f, 1, axis=1)) / (2.0*dx)
dfdy = (np.roll(f, -1, axis=0) - np.roll(f, 1, axis=0)) / (2.0*dy)

grad_norm = np.sqrt(dfdx**2 + dfdy**2)

plt.figure(figsize=(6, 5))
plt.contourf(X, Y, f, levels=40)
plt.colorbar(label="f(x,y)")
skip = 6
plt.quiver(X[::skip, ::skip], Y[::skip, ::skip],
           dfdx[::skip, ::skip], dfdy[::skip, ::skip],
           angles="xy", scale_units="xy", scale=12)
plt.title("Scalar field and its gradient (numerical)")
plt.xlabel("x")
plt.ylabel("y")
plt.tight_layout()
plt.show()
```

この図では、矢印が $\nabla f$ の方向を示す。最適化で用いる降下方向は $-\nabla f$ であり、矢印の反対向きに進むと $f$ が下がる局所挙動が理解できる。

次に、ベクトル場の発散を数値確認する例である。湧き出しがある点で発散が正になる。

```python
import numpy as np
import matplotlib.pyplot as plt

nx, ny = 160, 160
x = np.linspace(-2.0, 2.0, nx)
y = np.linspace(-2.0, 2.0, ny)
X, Y = np.meshgrid(x, y, indexing="xy")

# ベクトル場 F = (Fx, Fy)
# 中心から外へ湧き出す場（発散が正）
Fx = X
Fy = Y

dx = x[1] - x[0]
dy = y[1] - y[0]

dFxdx = (np.roll(Fx, -1, axis=1) - np.roll(Fx, 1, axis=1)) / (2.0*dx)
dFydy = (np.roll(Fy, -1, axis=0) - np.roll(Fy, 1, axis=0)) / (2.0*dy)
divF = dFxdx + dFydy

plt.figure(figsize=(6, 5))
plt.contourf(X, Y, divF, levels=40)
plt.colorbar(label="div F")
plt.title("Divergence of a source-like vector field")
plt.xlabel("x")
plt.ylabel("y")
plt.tight_layout()
plt.show()
```

2次元のこの例では $\nabla\cdot \mathbf{F}\approx 2$ に近い値が広く出る。これは $\partial X/\partial x=1$ と $\partial Y/\partial y=1$ の和が 2 になることと整合する。

## まとめと展望

ベクトル解析は、勾配・発散・回転という三つの微分演算と、ガウスの発散定理・ストークスの定理などの積分定理によって、局所記述と大域記述を往復する数学である。機械学習の損失最小化は勾配の幾何に直結し、ヤコビアンやヘッセ行列はベクトル解析の微分概念を高次元へ拡張した言語であるため、記法と意味を同時に押さえると理解が安定する。

今後の展望として、(1) 連続空間だけでなくグラフ・多様体上での勾配やラプラシアンの扱い、(2) 保存則や対称性を数式レベルで保持した学習設計、(3) 自動微分と数値離散（有限要素・有限体積など）の整合、が重要になる。これらは、ベクトル解析の演算子と積分定理を共通言語として整理することで、式変形の正確さとモデル設計の見通しを同時に得られる方向で発展していくのである。

## 参考文献
- MIT OpenCourseWare, Stokes' Theorem Notes（PDF）
https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/9b8d5f9febf584d850891f631393a87c_MIT18_02SC_MNotes_v13.1to2.pdf
- 徳島大学, ベクトル解析（ストークスの定理）（PDF）
https://math0.pm.tokushima-u.ac.jp/~ohyama/lecture/vector_analysis/Vec10_u.pdf
- 東京大学, 物理数学III 講義ノート（一般座標系での勾配・回転・発散など）（PDF）
https://cat.phys.s.u-tokyo.ac.jp/lecture/MP3_14/mp3_note.pdf
- 明治大学, 解析概論II 第2部（ベクトル解析）（PDF）
https://nalab.mind.meiji.ac.jp/~mk/lecture/kaisekigairon-2/kaisekigairon2-part2.pdf
- J-STAGE, 有向完全グラフ上の勾配・発散・回転作用素を用いた最小二乗問題（PDF）
https://www.jstage.jst.go.jp/article/bjsiam/27/2/27_27/_pdf
- PyTorch, Autograd documentation
https://pytorch.org/docs/stable/autograd.html
- JAX, Automatic differentiation（grad, jacfwd/jacrev）
https://jax.readthedocs.io/en/latest/automatic-differentiation.html

