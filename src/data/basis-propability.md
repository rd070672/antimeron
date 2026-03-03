# 機械学習のための確率・統計入門

確率・統計は、不確実な観測から規則性を抽出し、将来や未観測を定量的に予測するための言語である。機械学習における損失関数、最適化、汎化、評価指標の多くは、確率モデルと統計的推測の上に構成されている。

## 参考ドキュメント
- Stanford CS229 Probability Theory Review（英語PDF）
https://cs229.stanford.edu/section/cs229-prob.pdf
- NIST/SEMATECH e-Handbook of Statistical Methods（英語）
https://www.itl.nist.gov/div898/handbook/
- 数理統計学（講義ページ，日本語）
https://sites.google.com/site/ryoichisuzukifinance/home/%E8%AC%9B%E7%BE%A9%E9%96%A2%E9%80%A3/%E6%95%B0%E7%90%86%E7%B5%B1%E8%A8%88%E5%AD%A6

## 1. 確率の基礎：確率空間と事象

確率を厳密に定義するには、確率空間 $(\Omega,\mathcal{F},P)$ を導入する。

- 標本空間 $\Omega$：起こり得る結果（アウトカム）の全集合
- 事象 $\mathcal{F}$：$\Omega$ の部分集合のうち「確率を割り当てる対象」として許す集合族（$\sigma$-加法族）
- 確率測度 $P:\mathcal{F}\to[0,1]$：次を満たす写像
  1) $P(A)\ge 0$  
  2) $P(\Omega)=1$  
  3) 互いに素な事象列 $\{A_{i}\}$ に対して $P(\cup_{i}A_{i})=\sum_{i}P(A_{i})$

この 3) が「可算加法性」であり、確率が長い事象列にも整合的に拡張される根拠である。

### 条件付き確率とベイズの定理

条件付き確率は「$B$ が起きたという情報の下で $A$ が起きる確率」である。

$P(A\mid B)=\frac{P(A\cap B)}{P(B)}\quad (P(B)>0)$

これからベイズの定理が得られる。

$P(A\mid B)=\frac{P(B\mid A)P(A)}{P(B)}$

さらに、$A$ の候補が分割 $\{A_{k}\}$ をなすとき全確率の公式

$P(B)=\sum_{k}P(B\mid A_{k})P(A_{k})$

が成り立つ。ベイズの定理と全確率の公式は、生成モデル・分類・推定の形を導く中心道具である。


## 2. 確率変数と分布：離散と連続

確率変数 $X$ は $\Omega$ 上の実数値関数 $X:\Omega\to\mathbb{R}$ である。分布は $X$ の取り得る値の確率構造を表す。

### 分布関数（CDF）

$F_{X}(x)=P(X\le x)$

CDF は単調非減少で、$\lim_{x\to-\infty}F_{X}(x)=0$、$\lim_{x\to\infty}F_{X}(x)=1$ を満たす。

### 離散分布：確率質量関数（PMF）

$P(X=x)=p_{X}(x),\quad \sum_{x}p_{X}(x)=1$

### 連続分布：確率密度関数（PDF）

$pdf\; f_{X}(x)\ge 0,\quad \int_{-\infty}^{\infty}f_{X}(x)\,dx=1$

確率は密度の積分で与えられる：

$P(a\le X\le b)=\int_{a}^{b}f_{X}(x)\,dx$

連続型では $P(X=x)=0$ となり得るが、これは「一点の確率が 0」であって「起きない」を意味しない点に注意する。


## 3. 期待値・分散・共分散：平均とゆらぎの数式

### 期待値（平均）

離散型：
$E[X]=\sum_{x}x\,p_{X}(x)$

連続型：
$E[X]=\int_{-\infty}^{\infty}x\,f_{X}(x)\,dx$

一般に、関数 $g$ に対して

$E[g(X)] = \sum_{x} g(x)p_{X}(x)\quad \text{または}\quad E[g(X)]=\int g(x)f_{X}(x)\,dx$

である。これは「変数を $g$ で変換した量の平均」を表す。

### 分散（ばらつき）

$\mathrm{Var}(X)=E[(X-E[X])^{2}]=E[X^{2}]-(E[X])^{2}$

分散は「平均との差の二乗平均」であり、平均との差を取ってから二乗することで正負が打ち消されない。

### 共分散・相関

$\mathrm{Cov}(X,Y)=E[(X-E[X])(Y-E[Y])]$

相関係数は無次元化した量：

$\rho_{XY}=\frac{\mathrm{Cov}(X,Y)}{\sqrt{\mathrm{Var}(X)}\sqrt{\mathrm{Var}(Y)}}\in[-1,1]$


## 4. 複数変数：同時分布と条件付き期待値

二変数 $(X,Y)$ の同時分布（離散なら $p_{XY}(x,y)$、連続なら $f_{XY}(x,y)$）を考える。

周辺化（marginalization）：
$p_{X}(x)=\sum_{y}p_{XY}(x,y)$  
$f_{X}(x)=\int f_{XY}(x,y)\,dy$

条件付き分布：
$p_{X\mid Y}(x\mid y)=\frac{p_{XY}(x,y)}{p_{Y}(y)}$  
$f_{X\mid Y}(x\mid y)=\frac{f_{XY}(x,y)}{f_{Y}(y)}$

### 条件付き期待値

$E[X\mid Y]=\text{「与えられた }Y\text{ に依存する確率変数」}$

重要な性質（全期待値の法則）：

$E[X]=E[E[X\mid Y]]$

これは「情報を一度条件付けして平均し、さらにそれを平均しても同じ」という整合性を述べる。


## 5. 基本分布：機械学習で頻出する形

| 分布 | 記法 | パラメータ | 平均 $E[X]$ | 分散 $\mathrm{Var}(X)$ | 主な役割 |
|---|---|---|---|---|---|
| ベルヌーイ | $X\sim\mathrm{Bern}(p)$ | $p$ | $p$ | $p(1-p)$ | 0/1 事象 |
| 二項 | $X\sim\mathrm{Bin}(n,p)$ | $n,p$ | $np$ | $np(1-p)$ | 成功回数 |
| ポアソン | $X\sim\mathrm{Pois}(\lambda)$ | $\lambda$ | $\lambda$ | $\lambda$ | 事象到来数 |
| 正規 | $X\sim\mathcal{N}(\mu,\sigma^{2})$ | $\mu,\sigma^{2}$ | $\mu$ | $\sigma^{2}$ | 誤差・中心極限定理 |
| ガンマ | $X\sim\mathrm{Gamma}(k,\theta)$ | $k,\theta$ | $k\theta$ | $k\theta^{2}$ | 待ち時間・共役事前 |
| ベータ | $X\sim\mathrm{Beta}(\alpha,\beta)$ | $\alpha,\beta$ | $\frac{\alpha}{\alpha+\beta}$ | $\frac{\alpha\beta}{(\alpha+\beta)^{2}(\alpha+\beta+1)}$ | 確率の事前分布 |
| 多項 | $\mathrm{Mult}(n,\pi)$ | $n,\pi$ | $n\pi$ | — | カテゴリ回数 |

正規分布は、加法ノイズ・回帰・線形モデルの自然な基礎を与える。ベータ分布やディリクレ分布は「確率ベクトル」に対する事前分布として現れやすい。


## 6. 大数の法則と中心極限定理

### 大数の法則（LLN）

独立同分布 $X_{1},\dots,X_{n}$ が $E[X_{i}]=\mu$ を持つとき、標本平均

$\bar{X}_{n}=\frac{1}{n}\sum_{i=1}^{n}X_{i}$

は $n\to\infty$ で $\mu$ に近づく（確率収束などの意味で）：

$\bar{X}_{n}\to \mu$

これは「平均をとると安定する」理由を与える。

### 中心極限定理（CLT）

さらに $\mathrm{Var}(X_{i})=\sigma^{2}<\infty$ があるとき

$\sqrt{n}\frac{\bar{X}_{n}-\mu}{\sigma}\Rightarrow \mathcal{N}(0,1)$

が成り立つ（$\Rightarrow$ は分布収束）。標本平均の誤差が「大きさ $1/\sqrt{n}$」で縮むこと、そして正規近似が統計推測に広く使えることを意味する。


## 7. 統計モデルと推定

観測データ $D=\{x_{1},\dots,x_{n}\}$ が、分布 $p(x\mid\theta)$（$\theta$ はパラメータ）から生成されると仮定する。推定とは $\theta$ をデータから定めることである。

### 尤度と対数尤度

尤度：
$L(\theta)=p(D\mid\theta)=\prod_{i=1}^{n}p(x_{i}\mid\theta)$

対数尤度：
$\ell(\theta)=\log L(\theta)=\sum_{i=1}^{n}\log p(x_{i}\mid\theta)$

積を和へ変換することで微分・最適化が扱いやすくなる。

### 最尤推定（MLE）

$\hat{\theta}_{\mathrm{MLE}}=\arg\max_{\theta}\; \ell(\theta)$

「データが最も起きやすくなるパラメータ」を選ぶ基準である。

例：正規分布 $x_{i}\sim\mathcal{N}(\mu,\sigma^{2})$、$\sigma^{2}$ 既知のとき

$\ell(\mu)= -\frac{1}{2\sigma^{2}}\sum_{i}(x_{i}-\mu)^{2} + \text{const}$

よって $\sum_{i}(x_{i}-\mu)^{2}$ を最小化する点が MLE であり、

$\hat{\mu}=\bar{x}$

が得られる。最小二乗と同じ形になっている点が、回帰の損失関数と直結している。

### MAP 推定

ベイズでは $\theta$ 自体を確率変数とみなし、事前分布 $p(\theta)$ を置く。事後分布は

$p(\theta\mid D)\propto p(D\mid\theta)p(\theta)$

である。MAP（最大事後確率）推定は

$\hat{\theta}_{\mathrm{MAP}}=\arg\max_{\theta}\; \log p(D\mid\theta)+\log p(\theta)$

となる。$\log p(\theta)$ が正則化項として働きやすく、L2 正則化や L1 正則化と同型になることが多い。


## 8. ベイズ推定

ベイズ推定の中心は「点を一つ出す」だけでなく「不確実性を分布で保持する」ことにある。

### 事後分布

$p(\theta\mid D)=\frac{p(D\mid\theta)p(\theta)}{p(D)}$

ここで分母

$p(D)=\int p(D\mid\theta)p(\theta)\,d\theta$

は周辺尤度（エビデンス）である。モデル比較では $p(D)$ が重要になる。

### 予測分布（事後予測）

新しいデータ $x_{\ast}$ の分布は

$p(x_{\ast}\mid D)=\int p(x_{\ast}\mid\theta)p(\theta\mid D)\,d\theta$

となる。パラメータの不確実性を積分で平均化するため、過度に確信的な予測を避けやすい。

### 共役事前分布（計算が閉じる形）

共役とは、事前分布と尤度の組が同じ分布族に閉じ、事後分布が解析的に得られる性質である。

例：ベルヌーイ $x_{i}\sim\mathrm{Bern}(p)$、事前 $p\sim\mathrm{Beta}(\alpha,\beta)$ のとき

$p\mid D \sim \mathrm{Beta}(\alpha + \sum x_{i},\; \beta + n-\sum x_{i})$

となる。観測が事前パラメータに加算される形で、解釈が明快である。


## 9. 区間推定

### 信頼区間（頻度論）

信頼区間 $I(D)$ は「繰り返し標本を取ったとき、真値を含む割合が $1-\alpha$」となるように構成する。

$P_{\theta}\big(\theta\in I(D)\big)=1-\alpha$

ここで確率はデータのランダム性に対して取っている点が重要である。

### 信用区間（ベイズ）

事後分布 $p(\theta\mid D)$ に対し

$P(\theta\in C\mid D)=1-\alpha$

を満たす区間 $C$ を取る。確率は「$\theta$ の不確実性」に対して解釈される。

両者は見た目が似ても、確率の意味（何がランダムか）が異なる。


## 10. 仮説検定：p値と尤度比の考え方

帰無仮説 $H_{0}$ と対立仮説 $H_{1}$ を立て、統計量 $T(D)$ を用いて判断する。

### p値の定義

p 値は「$H_{0}$ が真だと仮定したとき、観測されたもの以上に極端な統計量が得られる確率」である：

$p\text{-value}=P_{H_{0}}\big(T(D)\ge T(D_{\mathrm{obs}})\big)$

p 値は $H_{0}$ の真偽の確率ではなく、$H_{0}$ の下でのデータの稀さを表す量である。

### 尤度比検定（LRT）

$H_{0}$ の制約下での最大尤度と、制約なしの最大尤度を比べる：

$\Lambda=\frac{\sup_{\theta\in\Theta_{0}}L(\theta)}{\sup_{\theta\in\Theta}L(\theta)}$

$-2\log\Lambda$ が漸近的に $\chi^{2}$ 分布に従うという結果（Wilks の定理）があり、一般形で使いやすい。


## 11. 情報理論：損失関数の意味を与える

機械学習の多くの損失は「情報量」から導ける。

### エントロピー

離散変数 $X$ に対し

$H(X)=-\sum_{x}p(x)\log p(x)$

不確実性の平均量である。

### KL ダイバージェンス

$P$ と $Q$ のずれ：

$D_{\mathrm{KL}}(P\parallel Q)=\sum_{x}p(x)\log\frac{p(x)}{q(x)} \ge 0$

等号は $P=Q$ のときのみである。モデル $q$ が真の分布 $p$ をどれだけ近似できているかの尺度として現れる。

### 交差エントロピーと最尤

$H(P,Q)=-\sum_{x}p(x)\log q(x)$

経験分布 $\hat{p}$ を $p$ の代わりに置くと、交差エントロピー最小化は「対数尤度最大化」と同じ方向を向く。分類で使われるクロスエントロピー損失は、この意味づけを持つ。


## 12. モンテカルロと近似

ベイズ推定や予測分布では

$\int h(\theta)p(\theta\mid D)\,d\theta$

のような積分が現れるが、解析的に得られないことが多い。そこでサンプル平均で近似する。

$\theta^{(s)}\sim p(\theta\mid D)\ \ (s=1,\dots,S)$ とすると

$E[h(\theta)\mid D]\approx \frac{1}{S}\sum_{s=1}^{S}h(\theta^{(s)})$

MCMC はこのサンプル生成を行う代表的手段である。重要度サンプリングは別の分布から引いて重みで補正する。


## 13. 機械学習モデルと確率統計の対応表

| 機械学習の要素 | 確率・統計での見方 | 代表式 |
|---|---|---|
| 回帰（最小二乗） | 正規ノイズの MLE | $\min_{\theta}\sum_{i}(y_{i}-f_{\theta}(x_{i}))^{2}$ |
| ロジスティック回帰 | ベルヌーイ尤度の最大化 | $\max_{\theta}\sum_{i}\big[y_{i}\log \sigma(z_{i})+(1-y_{i})\log(1-\sigma(z_{i}))\big]$ |
| 正則化 | 事前分布の導入（MAP） | $\log p(\theta)$ が正則化項 |
| クラスタリング（GMM） | 混合分布の推定 | $p(x)=\sum_{k}\pi_{k}\mathcal{N}(x\mid\mu_{k},\Sigma_{k})$ |
| 交差エントロピー損失 | 交差エントロピー／KL 最小化 | $H(\hat{p},q)$ |

ここで $\sigma(z)=1/(1+e^{-z})$、$z_{i}=f_{\theta}(x_{i})$ である。


## 14. 分布、推定、区間の例

### 14.1 二項データの MLE とベータ事前の事後

```python
import numpy as np
from scipy.stats import beta

# 観測：成功=1, 失敗=0
x = np.array([1,0,1,1,0,1,0,1,1,1])
n = len(x)
k = int(x.sum())

# MLE: p_hat = k/n
p_mle = k / n

# Beta(a,b) prior -> posterior Beta(a+k, b+n-k)
a, b = 2.0, 2.0
post_a, post_b = a + k, b + (n - k)

# posterior mean
p_post_mean = post_a / (post_a + post_b)

# 95% credible interval
ci = beta.ppf([0.025, 0.975], post_a, post_b)

print("n, k =", n, k)
print("p_mle =", p_mle)
print("posterior mean =", p_post_mean)
print("95% credible interval =", ci)
```
ここで、MLE は一点推定であり、ベイズは $p$ の不確実性を分布（ベータ分布）として保持している。信用区間は「事後分布の 95% を含む区間」である。

### 14.2 中心極限定理の雰囲気：標本平均の分布
```python
import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(0)

# 非対称な分布（指数分布）からの標本平均
S = 5000
n = 30
means = [rng.exponential(scale=1.0, size=n).mean() for _ in range(S)]

plt.figure()
plt.hist(means, bins=40, density=True)
plt.xlabel("sample mean")
plt.ylabel("density")
plt.grid(True)
plt.show()
```

指数分布は非対称であるが、標本平均は $n$ が増えると正規形状に近づく（CLT の直感）。

## まとめと展望
確率・統計は、(1) 分布と期待値、(2) 尤度に基づく推定、(3) 不確実性の扱い（区間・事後分布）、(4) 情報量に基づく損失の意味づけ、という柱で機械学習の多くを支える。回帰や分類の損失関数がどのような確率モデルに対応しているかを理解すると、モデル設計・正則化・評価の数式が一つの見取り図の上で整理できるようになる。

今後の展望としては、(i) 高次元での安定した推定（共分散推定やベイズ近似）、(ii) 近似推論（変分推論や MCMC の改良）、(iii) 不確実性推定を学習系に組み込む研究（予測分布・校正・意思決定との接続）が重要である。確率統計の基礎を軸に、最適化・線形代数・情報理論を往復できる形にすると、より広い機械学習手法の理解へ滑らかに接続できる。

## 参考文献
- Stanford CS229 Probability Review（別版，英語PDF）
https://cs229.stanford.edu/notes2022fall/cs229-probability_review.pdf
- 東京大学 講義資料：ベイズ統計の導入（日本語PDF）
https://bin.t.u-tokyo.ac.jp/model24/lecture/Nakanishi.pdf
- 愛媛大学 確率・統計 講義ノート（日本語PDF）
https://www.math.sci.ehime-u.ac.jp/~ishikawa/0418-ps.pdf
- 中心極限定理に関する概説資料（日本語PDF）
https://www.ms.u-tokyo.ac.jp/yoshida.pdf
- NIST：Probability Distributions（英語）
https://www.itl.nist.gov/div898/handbook/eda/section3/eda36.htm
- NIST：Gallery of Distributions（英語）
https://www.itl.nist.gov/div898/handbook/eda/section3/eda366.htm