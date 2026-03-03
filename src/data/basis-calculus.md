# 機械学習のための微積分入門

機械学習は、損失関数を最小化する問題として書けることが多く、その中心計算は微分（特に勾配）である。微積分を「式変形の暗記」ではなく「何を意味し、何を教えてくれるか」として理解すると、学習則・モデル設計・実装（自動微分）の見通しがよくなる。

## 参考ドキュメント
- Stanford CS231n, Derivatives, Backpropagation, and Vectorization (PDF)
  https://cs231n.stanford.edu/handouts/derivatives.pdf
- Baydin et al., Automatic Differentiation in Machine Learning: a Survey (JMLR, PDF)
  https://www.jmlr.org/papers/volume18/17-468/17-468.pdf
- 京都大学RIMS, 講義ノート「微分積分学」(PDF)
  https://www.kurims.kyoto-u.ac.jp/~ishimoto/files/note_calculus.pdf

## 1. 微分とは何か：変化率と局所線形近似

### 1.1 1変数の微分（導関数）

1変数関数 $f:\mathbb{R}\to\mathbb{R}$ の導関数は

$$
f'(x)=\lim_{h\to 0}\frac{f(x+h)-f(x)}{h}
$$

で定義される。

式の意味は次の通りである。

- $f(x+h)-f(x)$：入力を $h$ だけ動かしたときの出力変化量である
- それを $h$ で割る：1単位あたりの変化量（平均変化率）にする
- $h\to 0$：無限に小さい近傍での変化率（瞬間の変化率）をとる

この定義が重要なのは、微分が「接線の傾き」だけでなく「局所での最良な一次近似」を与えるからである。すなわち、

$$
f(x+\Delta x)\approx f(x)+f'(x)\Delta x
$$

という形で、$\Delta x$ が小さい範囲では $f$ を直線で近似できる。

### 1.2 微分（differential）という見方

微分 $df$ は、微小な入力変化 $dx$ に対し

$$
df = f'(x)\,dx
$$

と書ける。

ここで重要なのは、$df$ は「出力の変化の一次成分」を表す量として扱える点である。多変数でも同様に、微分は「局所での線形写像」として統一的に理解できる。


## 2. 多変数微分

機械学習の損失は多くの場合 $L(\theta)$ の形で、パラメータ $\theta\in\mathbb{R}^d$ を動かすと損失が変わる。したがって多変数微分が必須になる。

### 2.1 偏微分（partial derivative）

$f:\mathbb{R}^d\to\mathbb{R}$ に対し、$i$ 番目の変数だけを動かし、他は固定して変化率を見るのが偏微分である。

$$
\frac{\partial f}{\partial x_i}(x)
= \lim_{h\to 0}\frac{f(x_1,\dots,x_i+h,\dots,x_d)-f(x)}{h}
$$

式の意味は「$x_i$ 方向にだけ小さく動かしたときの変化率」である。

### 2.2 勾配（gradient）

勾配は偏微分を並べたベクトルである。

$$
\nabla f(x)=
\begin{bmatrix}
\frac{\partial f}{\partial x_1}\\
\vdots\\
\frac{\partial f}{\partial x_d}
\end{bmatrix}
\in\mathbb{R}^d
$$

勾配の意味は「その点で最も増加する方向と、その増加率」である。特に、方向ベクトル $u$（$\|u\|_2=1$）に沿った方向微分は

$$
D_u f(x) = \lim_{h\to 0}\frac{f(x+hu)-f(x)}{h} = \nabla f(x)^T u
$$

であり、内積として書ける。

ここから次が従う。

- $D_u f(x)$ は $\nabla f(x)$ と $u$ のなす角度に依存する
- 最大値は $u=\nabla f/\|\nabla f\|_2$ で達成され、最大の変化率は $\|\nabla f\|_2$ である


## 3. ヤコビアンとヘッセ行列：ベクトル値関数と2階微分

ニューラルネットの中間層や特徴変換は、スカラーではなくベクトル（あるいはテンソル）を出力する。そこで「微分の結果も行列になる」という見方が必要になる。

### 3.1 ヤコビアン（Jacobian）

$f:\mathbb{R}^d\to\mathbb{R}^m$（ベクトル値関数）に対し、ヤコビアンは

$$
J_f(x)=\frac{\partial f}{\partial x}(x)
=
\begin{bmatrix}
\frac{\partial f_1}{\partial x_1} & \cdots & \frac{\partial f_1}{\partial x_d}\\
\vdots & \ddots & \vdots\\
\frac{\partial f_m}{\partial x_1} & \cdots & \frac{\partial f_m}{\partial x_d}
\end{bmatrix}
\in\mathbb{R}^{m\times d}
$$

である。

意味は「入力の微小変化 $dx$ に対し、出力がどう線形に変わるか」を

$$
df \approx J_f(x)\,dx
$$

で表す線形写像である。

### 3.2 ヘッセ行列（Hessian）

$f:\mathbb{R}^d\to\mathbb{R}$（スカラー値）に対する2階微分はヘッセ行列である。

$$
H_f(x)=\nabla^2 f(x)=
\begin{bmatrix}
\frac{\partial^2 f}{\partial x_1\partial x_1} & \cdots & \frac{\partial^2 f}{\partial x_1\partial x_d}\\
\vdots & \ddots & \vdots\\
\frac{\partial^2 f}{\partial x_d\partial x_1} & \cdots & \frac{\partial^2 f}{\partial x_d\partial x_d}
\end{bmatrix}
\in\mathbb{R}^{d\times d}
$$

意味は「曲率（局所の曲がり具合）」である。1変数では $f''(x)$ が曲率に対応するが、多変数では方向 $u$ に沿った2次の変化は

$$
u^T H_f(x)\,u
$$

で与えられ、方向ごとに曲率が違うことがわかる。

### 3.3 何が何の形になるか（比較表）

| 対象 | 入力→出力 | 微分の結果 | 何を表すか |
|---|---|---|---|
| 導関数 | $\mathbb{R}\to\mathbb{R}$ | スカラー | 傾き、局所一次近似 |
| 勾配 | $\mathbb{R}^d\to\mathbb{R}$ | ベクトル（$d$） | 最急上昇方向と大きさ |
| ヤコビアン | $\mathbb{R}^d\to\mathbb{R}^m$ | 行列（$m\times d$） | 局所線形写像 |
| ヘッセ行列 | $\mathbb{R}^d\to\mathbb{R}$ | 行列（$d\times d$） | 曲率、2次近似 |


## 4. 連鎖律：バックプロパゲーションの数学

ニューラルネットは合成関数の塊である。

### 4.1 1変数の連鎖律

$y=g(x)$、$z=f(y)$ のとき

$$
\frac{dz}{dx}=\frac{dz}{dy}\frac{dy}{dx}
$$

である。意味は「出力の変化率は、中間変数を経由して掛け算で伝播する」である。

### 4.2 多変数の連鎖律（ヤコビアンの積）

$x\in\mathbb{R}^d \xrightarrow{g} y\in\mathbb{R}^m \xrightarrow{f} z\in\mathbb{R}^k$ のとき、

$$
J_{f\circ g}(x) = J_f(y)\,J_g(x)
$$

である。すなわち、合成関数の微分はヤコビアンの積になる。

バックプロパゲーション（誤差逆伝播）は本質的に「連鎖律を、ネットワークの計算グラフに沿って効率よく適用する」操作である。損失 $L$ がスカラーである点が重要で、出力側から入力側に向かって勾配を伝播させると計算量が抑えられる。


## 5. テイラー展開：最適化に現れる一次・二次近似

### 5.1 1変数のテイラー展開（2次まで）

$$
f(x+\Delta x)
\approx
f(x) + f'(x)\Delta x + \frac{1}{2}f''(x)(\Delta x)^2
$$

意味は「局所での曲線を、傾き（一次）と曲率（二次）で近似する」である。

### 5.2 多変数の2次近似

$$
f(x+\Delta x)\approx f(x)+\nabla f(x)^T\Delta x+\frac{1}{2}\Delta x^T H_f(x)\Delta x
$$

ここで

- $\nabla f(x)^T\Delta x$ は一次の変化（線形項）
- $\frac{1}{2}\Delta x^T H\Delta x$ は二次の変化（曲率項）

である。

この式は、勾配降下法（一次情報）とニュートン法（二次情報）の違いを数学的に示す。


## 6. 最適化と微分：なぜ勾配で学習できるのか

### 6.1 勾配降下法

損失 $L(\theta)$ を小さくする更新は

$$
\theta_{t+1} = \theta_t - \eta \nabla L(\theta_t)
$$

で書ける。

式の意味は「損失が最も増える方向（勾配）の逆向きに、学習率 $\eta$ だけ動かす」である。$\eta$ は一歩の大きさであり、過大だと発散し、過小だと進みが遅い。

### 6.2 2次情報の利用

2次近似が成り立つ範囲で、$\Delta\theta$ を最小化すると

$$
\nabla L(\theta) + H_L(\theta)\Delta\theta \approx 0
\quad\Rightarrow\quad
\Delta\theta \approx -H_L(\theta)^{-1}\nabla L(\theta)
$$

となる。これがニュートン法の基本形である。

ただし高次元では $H^{-1}$ を明示的に作るのは重く、実際にはヘッセ行列そのものより「ヘッセ行列ベクトル積」の形で扱う発想が重要になることが多い。


## 7. 機械学習で頻出する微分公式

### 7.1 1変数の基本公式

| 関数 $f(x)$ | 導関数 $f'(x)$ | 意味の要点 |
|---|---|---|
| $x^n$ | $nx^{n-1}$ | 多項式の傾き |
| $e^x$ | $e^x$ | 変化率が自分自身 |
| $\log x$ | $\frac{1}{x}$ | 相対変化の尺度 |
| $\sigma(x)=\frac{1}{1+e^{-x}}$ | $\sigma(x)(1-\sigma(x))$ | シグモイドの勾配（飽和で小さくなる） |
| $\tanh x$ | $1-\tanh^2 x$ | 双曲線正接の飽和 |

### 7.2 ベクトル微分で頻出する形

$\theta\in\mathbb{R}^d$ とする。

| 関数 | 勾配 | 意味 |
|---|---|---|
| $f(\theta)=a^T\theta$ | $\nabla f=a$ | 線形関数の勾配は係数 |
| $f(\theta)=\frac{1}{2}\|\theta\|_2^2=\frac{1}{2}\theta^T\theta$ | $\nabla f=\theta$ | $\ell_2$ 正則化の基本 |
| $f(\theta)=\frac{1}{2}\|A\theta-b\|_2^2$ | $\nabla f=A^T(A\theta-b)$ | 最小二乗の勾配 |
| $f(\theta)=\log\sum_i e^{\theta_i}$ | $\nabla f = \mathrm{softmax}(\theta)$ | log-sum-exp の勾配はsoftmax |
| $f(\theta)=-\sum_i y_i\log p_i$ | $p-y$（条件次第） | 交差エントロピーの基本形 |

最後の行は、$p=\mathrm{softmax}(z)$ として $L(z)=-\sum_i y_i\log p_i$ のとき、$z$ に関する勾配が $p-y$ になるという有名な結果を指す。意味は「予測確率 $p$ が教師 $y$ に近づく向きに更新される」である。


## 8. 自動微分

深層学習の実装では、微分を手計算するのではなく、自動微分エンジンが計算する。自動微分は「数式を記号的に微分する」のでもなく「差分で近似する」のでもなく、「プログラムが行った演算列に連鎖律を適用して厳密に微分値を計算する」方法である。

### 8.1 自動微分と数値微分・記号微分の違い

- 数値微分：$\frac{f(x+h)-f(x)}{h}$ を小さい $h$ で近似する。丸め誤差と打ち切り誤差が絡む。
- 記号微分：式を変形して解析的な導関数を生成する。式が膨張しやすい。
- 自動微分：演算の連鎖に沿って微分を計算する。誤差は丸め誤差のみで、深層学習の勾配計算に適する。

### 8.2 forward-mode と reverse-mode

| モード | 何を効率よく計算するか | 直観 | 深層学習との関係 |
|---|---|---|---|
| forward-mode | ヤコビアン・ベクトル積 $Jv$ | 入力側から微分情報を運ぶ | 入力次元が小さいと有利 |
| reverse-mode | ベクトル・ヤコビアン積 $v^T J$ | 出力側から勾配を戻す | 損失がスカラーなので極めて有利（バックプロパゲーション） |

深層学習では損失 $L$ がほぼ常にスカラーであるため、reverse-mode が勾配計算に適合する。

### 8.3 計算グラフの意味

計算グラフとは、プログラムが行った演算をノード（演算）とエッジ（データ依存）で表した有向非巡回グラフである。reverse-mode では、このグラフを後ろ向きにたどり、各演算に局所的な微分（局所ヤコビアン）を割り当て、連鎖律で合成する。


## 9. 積分と機械学習

微積分の「積分」は、機械学習では確率・統計と結びつき、「期待値」「周辺化」「正規化定数」などとして現れる。

### 9.1 期待値は積分である

連続確率変数 $X$ の確率密度を $p(x)$ とすると、関数 $g(X)$ の期待値は

$$
\mathbb{E}[g(X)] = \int g(x)\,p(x)\,dx
$$

である。

式の意味は「値 $g(x)$ を確率 $p(x)$ で重みづけした平均」である。離散の場合の $\sum_x g(x)p(x)$ の連続版だと理解すればよい。

### 9.2 最尤推定と微分：対数尤度の勾配

データ $\{x_i\}_{i=1}^n$ が独立同分布で、モデル $p_\theta(x)$ を仮定すると、最尤推定は

$$
\max_\theta \prod_{i=1}^n p_\theta(x_i)
$$

である。数値的には積より和が扱いやすいので対数をとり

$$
\max_\theta \sum_{i=1}^n \log p_\theta(x_i)
$$

を最大化する。勾配法を使うなら

$$
\nabla_\theta \sum_{i=1}^n \log p_\theta(x_i)
= \sum_{i=1}^n \nabla_\theta \log p_\theta(x_i)
$$

を計算して更新する。

このとき、微分は「パラメータを少し動かしたら対数尤度がどれだけ増えるか」を与える。

### 9.3 変数変換とヤコビアン行列式

確率分布の変数変換は、生成モデルや正規化フローで中心になる。

$y=g(x)$ が微分可能で可逆、ヤコビアンを $J_g(x)$ とすると密度は

$$
p_Y(y) = p_X(x)\left|\det J_g(x)\right|^{-1}
\quad (x=g^{-1}(y))
$$

で変換される。

式の意味は「座標変換で体積要素が $\left|\det J_g\right|$ 倍に伸び縮みするので、その逆で密度が補正される」である。


## 10. 数値計算で微分を確かめる

自動微分の正しさを直観的に確認する方法として、数値微分との比較がある。以下は 1変数と多変数の最小例である。

```python
import numpy as np

def numerical_derivative_1d(f, x, h=1e-6):
    return (f(x + h) - f(x - h)) / (2*h)

# 例: f(x)=sin(x)*exp(x)
f = lambda x: np.sin(x) * np.exp(x)

x0 = 0.3
d_num = numerical_derivative_1d(f, x0)
# 解析的導関数: f'(x)=cos(x)*exp(x)+sin(x)*exp(x)
d_true = (np.cos(x0) + np.sin(x0)) * np.exp(x0)

print("numerical:", d_num)
print("analytic :", d_true)
print("abs error:", abs(d_num - d_true))
```

```
import numpy as np

def numerical_gradient(f, x, h=1e-6):
    """
    f: R^d -> R
    x: (d,)
    """
    g = np.zeros_like(x, dtype=float)
    for i in range(len(x)):
        xp = x.copy(); xm = x.copy()
        xp[i] += h; xm[i] -= h
        g[i] = (f(xp) - f(xm)) / (2*h)
    return g

# 例: f(theta)=0.5*||A theta - b||^2
A = np.array([[1.0, 2.0],
              [-1.0, 3.0]])
b = np.array([0.5, -1.0])

def f_theta(theta):
    r = A @ theta - b
    return 0.5 * (r @ r)

def grad_true(theta):
    r = A @ theta - b
    return A.T @ r

theta0 = np.array([0.2, -0.1])
g_num = numerical_gradient(f_theta, theta0)
g_tru = grad_true(theta0)

print("numerical grad:", g_num)
print("true grad     :", g_tru)
print("abs error     :", np.abs(g_num - g_tru))
```

これらは「微分の定義（極限）を、有限差分として近似したもの」である。$h$ を小さくすれば良いとは限らず、丸め誤差も増えるため、誤差が最小になる $h$ がある。

## まとめと展望

微分は、関数を「局所で線形に近似する道具」であり、勾配は「多変数の最も増える方向」を与える。ヤコビアンとヘッセ行列は、ベクトル値変換と曲率を表し、連鎖律は合成関数（ニューラルネット）の勾配計算を支える。

今後の展望としては、(1) 自動微分を「連鎖律のプログラム化」として捉え、forward/reverse の計算対象（$Jv$ と $v^T J$）を意識して使い分けること、(2) 積分を期待値として理解し、対数尤度・変分推論・生成モデルの式変形に接続すること、(3) 勾配だけでなく曲率（2次近似）の見方を持ち、最適化の挙動を幾何として説明できるようにすること、が重要である。

## 参考文献
- MIT OCW, Matrix Calculus for Machine Learning and Beyond (Lecture notes)
  https://ocw.mit.edu/courses/18-s096-matrix-calculus-for-machine-learning-and-beyond-january-iap-2023/pages/lecture-notes/
- MIT OCW, Matrix Calculus Lecture PDF（Jacobian/Hessian等）
  https://ocw.mit.edu/courses/18-s096-matrix-calculus-for-machine-learning-and-beyond-january-iap-2023/mit18_s096iap23_lec12.pdf
- CS231n, Backpropagation（解説ページ）
  https://cs231n.github.io/optimization-2/
- PyTorch documentation, A Gentle Introduction to torch.autograd
  https://docs.pytorch.org/tutorials/beginner/blitz/autograd_tutorial.html
- PyTorch documentation, Autograd mechanics
  https://docs.pytorch.org/docs/stable/notes/autograd.html
- JAX documentation, Automatic differentiation / Autodiff cookbook
  https://docs.jax.dev/en/latest/automatic-differentiation.html
  https://docs.jax.dev/en/latest/notebooks/autodiff_cookbook.html
- 明治大学（桂田祐史）, 多変数の微分積分学1 講義ノート (PDF)
  https://m-katsurada.sakura.ne.jp/lecture/tahensuu1-2013/tahensuu1-2011.pdf
- 九州大学（原啓介）, 数理統計学 講義ノート（期待値を積分として扱う説明を含む）(PDF)
  https://www2.math.kyushu-u.ac.jp/~hara/lectures/11/statistics.pdf
- Reverse-Mode 自動微分を理解する（スライド, 日本語, PDF）
  https://konn-san.com/math/reverse-mode-ad-slides.pdf