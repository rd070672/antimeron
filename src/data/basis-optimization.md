# 機械学習のための最適化入門

機械学習における最適化は、損失関数を最小化することでモデルの予測性能を得るための中核である。微分・凸性・確率性という3つの視点を押さえると、多様な手法が一つの枠組みで理解できるのである。

### 参考ドキュメント
- 東京大学（講義資料）, 情報数理科学 VII 最適化の手法（PDF）
  https://ml.c.u-tokyo.ac.jp/wp-content/uploads/2020/05/optimization.pdf
- Boyd, S. and Vandenberghe, L., Convex Optimization（書籍ページ）
  https://stanford.edu/~boyd/cvxbook/
- Bottou, L., Curtis, F. E., and Nocedal, J., Optimization Methods for Large-Scale Machine Learning（SIAM Review）
  https://epubs.siam.org/doi/10.1137/16M1080173


## 1. 最適化が機械学習で果たす役割

機械学習の学習は、多くの場合「ある目的関数を小さくする」問題として表現される。目的関数は、データに対する誤差（損失）と、複雑さを抑える項（正則化）から構成されるのが基本である。

データ $(x_i, y_i)_{i=1}^n$ とモデル $f_{\theta}$（パラメータ $\theta$）を用いると、経験損失最小化は次で与えられる。

$$
\min_{\theta} \; \frac{1}{n}\sum_{i=1}^{n}\ell(f_{\theta}(x_i), y_i) + \lambda \Omega(\theta)
$$

- $\ell$：損失関数（例：二乗誤差、ロジスティック損失、交差エントロピー）
- $\Omega$：正則化（例：$L_2$、$L_1$、群正則化）
- $\lambda$：正則化の強さ

深層学習では目的関数が非凸になることが多い一方、線形回帰やリッジ回帰、SVM の一部などは凸最適化として扱えることが多い。凸か非凸かにより、理論保証やアルゴリズム設計の発想が変わるのである。

## 2. 最適化問題の分類（制約なし・制約付き・確率的）

最適化の基本形は以下である。

- 制約なし最小化
  $$
  \min_{x\in \mathbb{R}^d} f(x)
  $$

- 制約付き最小化
  $$
  \min_{x} f(x) \quad \text{s.t.}\quad g_j(x)\le 0,\; h_k(x)=0
  $$

機械学習では、データが巨大であるため目的関数の勾配 $\nabla f(x)$ を全データで厳密に計算しない戦略が重要になる。そこで、確率的（stochastic）な形式が現れる。

期待損失の最小化として

$$
\min_{\theta}\; \mathbb{E}_{(x,y)\sim \mathcal{D}}[\ell(f_{\theta}(x),y)] + \lambda \Omega(\theta)
$$

を考え、ミニバッチで近似して更新するのが基本となる。

## 3. 勾配・ヘッセ行列の意味

### 3.1 勾配（gradient）の意味
関数 $f:\mathbb{R}^d\to\mathbb{R}$ の点 $x$ における勾配 $\nabla f(x)$ は、局所的に「最も増加する方向」を与えるベクトルである。方向ベクトル $u$（$\|u\|_2=1$）に沿った方向微分は

$$
D_u f(x) = \lim_{\epsilon\to 0}\frac{f(x+\epsilon u)-f(x)}{\epsilon} = \nabla f(x)^{\top}u
$$

であり、$u$ を変えると内積 $\nabla f(x)^{\top}u$ が最大になるのは $u\propto \nabla f(x)$ のときである。したがって「減らしたい」場合は $-\nabla f(x)$ 方向に進むのが自然である。

### 3.2 ヘッセ行列（Hessian）の意味
2階微分をまとめたヘッセ行列 $\nabla^2 f(x)$ は曲率を表す。2次近似は

$$
f(x+\Delta) \approx f(x) + \nabla f(x)^{\top}\Delta + \frac{1}{2}\Delta^{\top}\nabla^2 f(x)\Delta
$$

である。曲率が大きい方向では大きく動くと増加しやすく、曲率が小さい方向では大きく動ける。2階法はこの曲率情報を使うが、計算量・メモリが大きくなるため、準2階法や近似が多用されるのである。

## 4. 凸性・滑らかさ・強凸性

最適化の収束議論では、次の性質が基礎になる。

- 凸性（convexity）
  $$
  f(\alpha x + (1-\alpha)y) \le \alpha f(x) + (1-\alpha)f(y)\quad (\alpha\in[0,1])
  $$

- $L$-滑らか（勾配リプシッツ）
  $$
  \|\nabla f(x)-\nabla f(y)\|_2 \le L\|x-y\|_2
  $$

- $\mu$-強凸
  $$
  f(y) \ge f(x)+\nabla f(x)^{\top}(y-x) + \frac{\mu}{2}\|y-x\|_2^2
  $$

直観として、凸性は「谷が一つ」であることを意味し、強凸性は「谷底が十分に丸い」ことを意味する。滑らかさは「勾配が急に変わりすぎない」ことを意味する。これらが揃うと、単純な一階法でも収束速度が議論できるのである。

## 5. 一階法：勾配だけで進む

### 5.1 勾配降下法
最も基本の更新は

$$
x_{t+1} = x_t - \eta \nabla f(x_t)
$$

である。$\eta$ は学習率であり、進む距離（ステップ幅）を決める。$L$-滑らかな凸関数では、$\eta \le 1/L$ などの条件下で関数値が単調に減る性質が導かれることが多い。

### 5.2 確率的勾配法（SGD）
全データの損失平均 $f(x)=\frac{1}{n}\sum_{i=1}^n f_i(x)$ の勾配は

$$
\nabla f(x)=\frac{1}{n}\sum_{i=1}^n \nabla f_i(x)
$$

である。SGD は $i_t$ をサンプルして

$$
x_{t+1} = x_t - \eta \nabla f_{i_t}(x_t)
$$

と近似更新する。ミニバッチ $B_t$ を用いるなら

$$
x_{t+1}=x_t-\eta \frac{1}{|B_t|}\sum_{i\in B_t}\nabla f_i(x_t)
$$

である。勾配推定にばらつきがあるため、学習率を一定にすると「最適解の近傍に漂う」振る舞いになりやすい。学習率減衰（例：$\eta_t=\eta_0/\sqrt{t}$）はこのばらつきを抑える方向に働くのである。

### 5.3 モメンタム（heavy-ball）と Nesterov 加速
モメンタムは速度 $v_t$ を導入して

$$
v_{t+1}=\beta v_t + \nabla f(x_t),\qquad
x_{t+1}=x_t-\eta v_{t+1}
$$

とする。$\beta\in[0,1)$ は慣性を表す。勾配の向きが一貫している方向では加速し、ジグザグを抑える効果がある。

Nesterov 加速（NAG）は先読み点で勾配を評価する形式として表されることが多い。

$$
v_{t+1}=\beta v_t + \nabla f(x_t-\eta\beta v_t),\qquad
x_{t+1}=x_t-\eta v_{t+1}
$$

凸最適化では $O(1/t^2)$ の収束率を与える議論が知られているが、深層学習では理論よりも経験的調整が重要になりやすい。

## 6. 適応学習率法：AdaGrad・RMSProp・Adam・AdamW

勾配のスケールが座標ごとに異なる場合、単一の学習率では進み方が不均一になりやすい。適応学習率法は、各座標に異なるスケーリングを入れて更新する発想である。

### 6.1 AdaGrad
勾配 $g_t=\nabla f(x_t)$ とすると、座標ごとの二乗勾配和

$$
s_t = \sum_{\tau=1}^{t} g_{\tau}\odot g_{\tau}
$$

を用いて

$$
x_{t+1}=x_t-\eta \frac{g_t}{\sqrt{s_t}+\epsilon}
$$

と更新する。$\odot$ は要素積である。疎な特徴（出現頻度が低い特徴）に対して大きめに進む性質があり、線形モデルや NLP の一部で有効な場面がある。

### 6.2 RMSProp
AdaGrad は $s_t$ が単調増大して学習率が過度に小さくなりやすい。そこで指数移動平均に置き換える。

$$
s_t=\rho s_{t-1} + (1-\rho) g_t\odot g_t,\qquad
x_{t+1}=x_t-\eta \frac{g_t}{\sqrt{s_t}+\epsilon}
$$

### 6.3 Adam
Adam は一次モーメント $m_t$ と二次モーメント $v_t$（指数移動平均）を使う。

$$
m_t=\beta_1 m_{t-1}+(1-\beta_1)g_t,\quad
v_t=\beta_2 v_{t-1}+(1-\beta_2)(g_t\odot g_t)
$$

初期バイアス補正

$$
\hat{m}_t=\frac{m_t}{1-\beta_1^t},\qquad \hat{v}_t=\frac{v_t}{1-\beta_2^t}
$$

更新は

$$
x_{t+1}=x_t-\eta \frac{\hat{m}_t}{\sqrt{\hat{v}_t}+\epsilon}
$$

である。学習率調整が容易で、深層学習で広く使われるが、収束性や汎化の性質は問題設定で変わりうる。

### 6.4 AdamW（重み減衰の分離）
$L_2$ 正則化を「勾配に足す」形式は、Adam のような適応スケーリングと組み合わさると「本来の重み減衰」と一致しないことがある。AdamW は重み減衰を更新から分離して

$$
x_{t+1}=x_t-\eta \frac{\hat{m}_t}{\sqrt{\hat{v}_t}+\epsilon} - \eta\lambda x_t
$$

のように扱う（表現は流儀で異なる）。深層学習の標準設定として採用されることが増えている。

## 7. 二階法・準二階法

### 7.1 Newton 法
Newton 法は2次近似に基づき

$$
x_{t+1}=x_t - (\nabla^2 f(x_t))^{-1}\nabla f(x_t)
$$

とする。標準的には速いが、ヘッセ行列の構築や線形方程式の解法が高コストであり、大規模深層学習ではそのままでは使いにくい。

### 7.2 準二階法（BFGS, L-BFGS）
ヘッセ逆行列 $H_t\approx (\nabla^2 f(x_t))^{-1}$ を更新式で近似するのが準二階法である。L-BFGS は限られた履歴だけを保持してメモリを節約し、大規模でも扱いやすい形にした手法である。深層学習でも微調整や小規模問題で利用されることがある。

### 7.3 信頼領域法
2次モデルが当てになりやすい範囲（信頼領域）だけで最小化する考え方である。線形代数計算が中心となり、理論的整理が進んでいる。

## 8. 制約付き最適化

### 8.1 ラグランジュ関数
不等式制約 $g(x)\le 0$、等式制約 $h(x)=0$ に対し

$$
\mathcal{L}(x,\lambda,\nu)= f(x) + \sum_j \lambda_j g_j(x) + \sum_k \nu_k h_k(x)
$$

を導入する。凸問題では KKT 条件が最適性条件として重要である。

- 一次条件：$\nabla_x \mathcal{L}=0$
- 実行可能性：$g_j(x)\le 0,\; h_k(x)=0$
- 双対実行可能性：$\lambda_j\ge 0$
- 相補性：$\lambda_j g_j(x)=0$

### 8.2 射影勾配法
制約集合 $\mathcal{C}$ に対して

$$
x_{t+1}=\Pi_{\mathcal{C}}(x_t-\eta \nabla f(x_t))
$$

と更新する。$\Pi_{\mathcal{C}}$ はユークリッド射影である。単純形（確率ベクトル）や $L_2$ 球など、射影が明示的に書ける集合で扱いやすい。

## 9. 正則化と近接勾配法：$L_1$・スパース性・ADMM

$L_1$ 正則化はスパース性を誘導し、特徴選択と結びつく。目的が

$$
\min_x \; f(x)+\lambda \|x\|_1
$$

のように「滑らかな項 + 非滑らかな項」に分かれる場合、近接勾配法が基本となる。

$$
x_{t+1}=\mathrm{prox}_{\eta \lambda \|\cdot\|_1}(x_t-\eta \nabla f(x_t))
$$

ここで近接作用素（prox）は

$$
\mathrm{prox}_{\alpha \|\cdot\|_1}(z)=\arg\min_x \left(\frac{1}{2}\|x-z\|_2^2+\alpha\|x\|_1\right)
$$

であり、ソフトしきい値

$$
(\mathrm{prox}_{\alpha \|\cdot\|_1}(z))_i = \mathrm{sign}(z_i)\max(|z_i|-\alpha,0)
$$

として計算できる。凸最適化の枠組みでは、ADMM（交互方向乗数法）などの分解法も広く使われる。

## 10. 収束の見方

最適化の進み具合は、目的関数値 $f(x_t)$ の減少だけでなく、停留性（stationarity）でも捉えるのが自然である。

- 勾配ノルム：$\|\nabla f(x_t)\|_2$
  - 制約なし問題で 
  $$
  \|\nabla f(x)\|_2=0
  $$ 
  は最適性の必要条件である。
- 近接勾配法では「近接勾配写像」のノルムが停留性の指標として使われる。
- 期待値で議論する場合：$\mathbb{E}\|\nabla f(x_t)\|_2^2$ などが扱われる。

深層学習では、訓練損失と評価損失（別データでの損失）の両方を記録し、最適化の進行と汎化の関係を観察するのが自然である。

## 11. 学習率設計

学習率 $\eta_t$ の形は挙動に強く影響する。基本形として

- 一定：$\eta_t=\eta$
- 逆平方根：$\eta_t=\eta_0/\sqrt{t+1}$
- ステップ減衰：一定期間ごとに $\eta$ を小さくする
- コサイン減衰：滑らかに減衰させる
- ウォームアップ：初期に小さく、徐々に大きくする

などがある。理論では凸・強凸・確率性の仮定の下で適切な減衰が導かれることが多く、経験則はそこに工学的調整を加えたものとみなせる。

## 12. 主要手法の比較

| 手法 | 使う情報 | 1ステップ計算 | 主な利点 | 主な留意点 |
|---|---|---:|---|---|
| GD | 全勾配 | 高い（全データ） | 解析が明快、安定 | 大規模データで重い |
| SGD | 近似勾配 | 低い | 大規模に強い | ばらつきがある |
| Momentum | 近似勾配＋速度 | 低い | ジグザグ抑制、加速 | ハイパラ調整が必要 |
| NAG | 先読み勾配 | 低い | 凸で加速理論 | 実装流儀が複数 |
| AdaGrad | 二乗勾配和 | 低い | 疎な特徴に強い | 学習率が早く縮みやすい |
| RMSProp | 二乗勾配EMA | 低い | 非定常に強い | 理論整理は課題が残る |
| Adam | 1次/2次EMA | 低い | 標準設定が広く普及 | 問題設定で性質が変わる |
| AdamW | Adam＋分離減衰 | 低い | 重み減衰の整合性 | 減衰係数の扱いに注意 |
| Newton | 勾配＋ヘッセ | 非常に高い | 収束が速い場合がある | 大規模で難しい |
| L-BFGS | 勾配＋低メモリ近似 | 中 | 大規模でも使える場合 | ミニバッチと相性に注意 |
| Prox（ISTA） | 勾配＋prox | 中 | $L_1$ など非滑らかOK | ステップ幅条件が重要 |
| ADMM | 分解＋双対 | 中〜高 | 構造を活かせる | 収束は設定に依存 |

## 13. ロジスティック回帰をSGDで学習

以下は、二値分類のロジスティック回帰を NumPy だけで SGD 学習し、損失推移を描く例である。

```python
import numpy as np
import matplotlib.pyplot as plt

# データ生成（合成）
rng = np.random.default_rng(0)
n, d = 2000, 20
X = rng.normal(size=(n, d))
w_true = rng.normal(size=d)
logits = X @ w_true
p = 1 / (1 + np.exp(-logits))
y = rng.binomial(1, p).astype(np.float64)

# ロジスティック損失（負の対数尤度）＋L2正則化
def loss_and_grad(w, Xb, yb, lam):
    z = Xb @ w
    s = 1 / (1 + np.exp(-z))
    # loss: 平均
    eps = 1e-12
    loss = -np.mean(yb * np.log(s + eps) + (1 - yb) * np.log(1 - s + eps)) + 0.5 * lam * np.sum(w**2)
    grad = (Xb.T @ (s - yb)) / len(yb) + lam * w
    return loss, grad

# SGD
w = np.zeros(d)
lam = 1e-3
lr0 = 0.2
batch = 64
T = 500

losses = []
for t in range(T):
    idx = rng.integers(0, n, size=batch)
    Xb, yb = X[idx], y[idx]
    lr = lr0 / np.sqrt(t + 1)  # 逆平方根減衰
    L, g = loss_and_grad(w, Xb, yb, lam)
    w = w - lr * g
    losses.append(L)

plt.plot(losses)
plt.xlabel("iteration")
plt.ylabel("mini-batch loss")
plt.tight_layout()
plt.show()
```

この例では、更新式 $w_{t+1}=w_t-\eta_t g_t$ の $g_t$ がミニバッチ勾配である点に注目するとよい。学習率減衰を外すと、損失が揺れながら下がる振る舞いがより強く現れやすい。

## まとめと展望

機械学習の最適化は、(i) 目的関数の定式化、(ii) 勾配・曲率の幾何、(iii) 凸性や確率性の仮定、という三層で整理すると見通しが立つのである。GD/SGD とその加速（モメンタム、Nesterov）、適応学習率（Adam/AdamW）、さらに凸最適化の近接法・双対性までを同じ言語で扱えるようになると、モデルやデータ規模が変わっても選択と設計が一貫して行える。

今後の展望として、(1) 非凸最適化での停留点回避や曲率利用、(2) 分散学習における通信と最適化の結合、(3) 目的関数そのものの設計（正則化、ロバスト化、制約化）を含む統合的最適化、が重要になる。これらはアルゴリズムだけでなく、数値線形代数・確率過程・情報理論との接続で理解が深まり、より大規模で安定な学習へつながるのである。

## 参考文献
- Kingma, D. P. and Ba, J., Adam: A Method for Stochastic Optimization（arXiv PDF）
  https://arxiv.org/pdf/1412.6980
- Loshchilov, I. and Hutter, F., Decoupled Weight Decay Regularization（OpenReview）
  https://openreview.net/forum?id=Bkg6RiCqY7
- Nocedal, J. and Wright, S. J., Numerical Optimization, 2nd ed.（PDFの公開版）
  https://www.math.uci.edu/~qnie/Publications/NumericalOptimization.pdf
- Nesterov, Y., A method of solving a convex programming problem with convergence rate o(1/k^2)（1983, 英訳PDF）
  https://hengshuaiyao.github.io/papers/nesterov83.pdf
- Tohoku University（土屋氏資料）, 凸最適化の情報幾何と多項式時間内点法（PDF）
  https://www.math.is.tohoku.ac.jp/~amf/workshops/pdf/tsuchiya.pdf
- 愛媛大学（二宮氏資料）, 深層学習の基礎と演習（PDF）
  https://aiweb.cs.ehime-u.ac.jp/~ninomiya/enpitpro/deeplearning.pdf
