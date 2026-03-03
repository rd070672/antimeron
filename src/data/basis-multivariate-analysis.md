# 機械学習のための多変量解析入門

多変量解析は、複数の変数が同時に変動する観測を、行列の言語で要約・可視化・推定・判別するための枠組みである。機械学習では、次元削減・特徴抽出・分類・クラスタリング・多視点（マルチモーダル）学習などの多くが、多変量解析の拡張として理解できるものである。

### 参考ドキュメント
- 村田昇, 「多変量解析の基本」講義ノート（日本語PDF）
  https://www.stat.titech.ac.jp/~mura/Lecture/mva/mva.pdf
- scikit-learn User Guide（英語）
 https://scikit-learn.org/stable/user_guide.html
- Ledoit, O. and Wolf, M., “A Well-Conditioned Estimator for Large-Dimensional Covariance Matrices” 関連PDF（英語）
  https://www.ledoit.net/ole1a.pdf

## データ表現と記法

観測が $n$ サンプル、各サンプルが $p$ 次元の特徴量をもつとする。データ行列を

$$
X \in \mathbb{R}^{n \times p},\quad
X=
\begin{pmatrix}
x_{1}^{\top}\\
x_{2}^{\top}\\
\vdots\\
x_{n}^{\top}
\end{pmatrix},\quad x_{i}\in\mathbb{R}^{p}
$$

と書く。教師ありではラベル（または目的変数）を $y$ とし、回帰なら $y\in\mathbb{R}^{n}$、分類なら $y\in\{1,\dots,K\}^{n}$ とする。

### 中心化と標準化

多変量解析の多くは「平均との差」や「共分散」に基づくため、中心化（平均を 0 にする）をまず考える。

各列の平均ベクトルを $\mu=\frac{1}{n}\sum_{i=1}^{n} x_{i}$ とすると、中心化データは

$$
X_{c} = X - \mathbf{1}\mu^{\top}
$$


である（$\mathbf{1}\in\mathbb{R}^{n}$ は全要素 1 のベクトル）。

さらに列ごとの尺度が大きく異なると、分散の大きい変数が支配的になりやすいので、標準偏差で割る標準化（分散を 1 にそろえる）もよく用いられる。標準化は「相関行列ベースの解析」に対応しやすい。

## 共分散・相関・二次形式

中心化データ $X_{c}$ の標本共分散行列 $S$ を

$$
S = \frac{1}{n-1}X_{c}^{\top}X_{c}\in\mathbb{R}^{p\times p}
$$


と定義する。$S$ は「各変数の分散（対角）」と「変数間の共分散（非対角）」を同時に持つ。

共分散はスケール依存なので、標準化後の共分散は相関行列 $R$ になる。

### マハラノビス距離

ユークリッド距離が等方的（円形）な尺度であるのに対し、共分散を考慮する距離がマハラノビス距離である。点 $x$ と平均 $\mu$ に対し

$$
d_{M}(x,\mu)=\sqrt{(x-\mu)^{\top}\Sigma^{-1}(x-\mu)}
$$

である（$\Sigma$ は母共分散、標本では $S$ を用いる）。これは「二次形式」であり、$\Sigma$（または $S$）が作る楕円形の等距離面をもつ。分類、異常度、クラスタリング、統計検定などで重要な役割を果たす。

## 多変量正規分布

多変量解析の多くは正規性を仮定するか、正規性が導く線形・二次の形を利用する。
$$
x\in\mathbb{R}^{p}
$$ が

$$
x\sim\mathcal{N}(\mu,\Sigma)
$$

に従うとき、密度は

$$
p(x)=\frac{1}{(2\pi)^{p/2}\det(\Sigma)^{1/2}}
\exp\left(-\frac{1}{2}(x-\mu)^{\top}\Sigma^{-1}(x-\mu)\right)
$$

である。指数部の二次形式がマハラノビス距離と同じ構造になっている点が重要である。判別分析（LDA/QDA）や Hotelling の $T^{2}$、MANOVA などがここに接続する。

## 次元削減：主成分分析（PCA）

PCA は「分散が最大になる方向」を順に見つけ、データを低次元の直交基底へ射影する方法である。直感としては、点群が最も伸びている方向へ座標軸を回転させる操作である。

### 最適化としての PCA

中心化データに対して、1 次元への射影 $z = X_{c}w$ を考える（$w\in\mathbb{R}^{p}$）。射影後の分散は

$$
\mathrm{Var}(z)=w^{\top}Sw
$$

であり、$w^{\top}w=1$ の制約でこれを最大化する：

$$
\max_{w}\; w^{\top}Sw\quad \text{s.t.}\quad w^{\top}w=1
$$

ラグランジュ未定乗数法で解くと

$$
Sw=\lambda w
$$

となり、$w$ は共分散行列 $S$ の固有ベクトル、$\lambda$ は対応する固有値になる。固有値が大きいほど、その方向に沿った分散が大きい。第 1 主成分は最大固有値の固有ベクトルである。

k 次元の PCA は、直交制約 $W^{\top}W=I_{k}$ の下で

$$
\max_{W\in\mathbb{R}^{p\times k}} \mathrm{tr}(W^{\top}SW)
$$

を解くことに対応し、上位 k 個の固有ベクトルを並べた $W$ が解となる。

### SVD と再構成誤差

$X_{c}$ の特異値分解（SVD）を

$$
X_{c}=U\Sigma V^{\top}
$$

とすると、$V$ の列（右特異ベクトル）が主成分方向に一致し、特異値から分散説明率が計算できる。低ランク近似は

$$
X_{c}\approx U_{k}\Sigma_{k}V_{k}^{\top}
$$

であり、PCA は「二乗誤差（フロベニウスノルム）で最良のランク k 近似」を与えることでも特徴付けられる。

### 分散説明率

固有値を $\lambda_{1}\ge\lambda_{2}\ge\cdots\ge\lambda_{p}\ge 0$ とすると、第 j 主成分の分散は $\lambda_{j}$ であり、寄与率は

$$
r_{j}=\frac{\lambda_{j}}{\sum_{\ell=1}^{p}\lambda_{\ell}}
$$

である。累積寄与率 $\sum_{j=1}^{k}r_{j}$ を用い、低次元化の情報損失を見積もる。

## 因子分析（FA）と確率的 PCA（PPCA）

PCA が「回転して射影する幾何的手法」だとすれば、因子分析は「潜在変数が観測を生成する確率モデル」である。

### 因子分析の生成モデル

$x\in\mathbb{R}^{p}$ が q 次元の潜在因子 $f\in\mathbb{R}^{q}$ から生成されるとして

$$
x = \mu + \Lambda f + \varepsilon
$$

$$
f\sim\mathcal{N}(0,I_{q}),\quad \varepsilon\sim\mathcal{N}(0,\Psi)
$$
とおく。ここで、$\Psi$ は対角行列である。すると共分散は

$$
\mathrm{Cov}(x)=\Lambda\Lambda^{\top}+\Psi
$$

となる。$\Lambda$ は因子負荷量（loadings）であり、「潜在因子が各観測変数にどう効くか」を表す。回転（バリマックスなど）を導入すると解釈しやすい構造が得られることもある。

PPCA は $\Psi=\sigma^{2}I$ のような等方ノイズを仮定することで PCA と密接につながり、EM による推定で扱える。

## 独立成分分析（ICA）：非ガウス性と分離

ICA は、観測が独立な源信号の混合であるとみなし、それを分離する。モデルは

$$
X = AS
$$

である（行列は適切な次元、$S$ の各成分が統計的に独立、非ガウス）。目的は「復元行列」$W$ により

$$
S \approx WX
$$

を得ることである。PCA が二次統計量（共分散）中心であるのに対し、ICA は高次統計量（尖度や negentropy）を利用して独立性を引き出す。

## 判別分析（LDA/QDA）：確率モデルで分類を導く

K クラスの分類を考える。クラス条件付きに

$$
x\mid y=k \sim \mathcal{N}(\mu_{k},\Sigma_{k})
$$

を仮定すると、事後確率最大化は判別関数の比較に帰着する。

### LDA（共分散が共通）

$\Sigma_{k}=\Sigma$（全クラス同一）とすると、判別関数は線形となり、境界は超平面である。クラス k のスコアは（定数を除いて）

$$
\delta_{k}(x)=x^{\top}\Sigma^{-1}\mu_{k}-\frac{1}{2}\mu_{k}^{\top}\Sigma^{-1}\mu_{k}+\log\pi_{k}
$$

であり、$\pi_{k}$ は事前確率である。

### QDA（共分散がクラス依存）

$\Sigma_{k}$ がクラスごとに異なると判別関数は二次になり、境界は二次曲面になる。データが十分にあると柔軟だが、推定パラメータが増える。

### Fisher の基準（射影としての LDA）

2 クラスで、クラス平均との差が大きく、クラス内分散が小さい方向 $w$ を求める最適化は

$$
J(w)=\frac{w^{\top}S_{B}w}{w^{\top}S_{W}w}
$$

である。ここで $S_{B}$ はクラス間散布、$S_{W}$ はクラス内散布である。最適解は一般化固有値問題に帰着し、次元削減と判別を同時に行う解釈が得られる。

## 2 つの変数集合の関係 

機械学習では「同じ対象を別の表現で観測した」状況が多い（例：画像とテキスト、複数センサ、異なる特徴量設計）。このとき、2 つのデータブロックの関係を線形に要約するのが CCA と PLS である。

2 つの中心化データ行列 $X\in\mathbb{R}^{n\times p}$ と $Y\in\mathbb{R}^{n\times q}$ を考え、共分散ブロックを

$$
\Sigma_{xx}=\frac{1}{n-1}X^{\top}X,\quad
\Sigma_{yy}=\frac{1}{n-1}Y^{\top}Y,\quad
\Sigma_{xy}=\frac{1}{n-1}X^{\top}Y
$$

とする。

### CCA（相関を最大化）

線形結合 $u=Xa$ と $v=Yb$ に対し

$$
\rho=\mathrm{corr}(u,v)=
\frac{a^{\top}\Sigma_{xy}b}{\sqrt{a^{\top}\Sigma_{xx}a}\sqrt{b^{\top}\Sigma_{yy}b}}
$$

を最大化する。これは一般化固有値問題に帰着し、得られる $\rho$ をカノニカル相関という。多視点の共通成分抽出として理解できる。

### PLS（共分散を最大化し回帰へ接続）

PLS は $X$ と $y$（または $Y$）の共分散を大きくする潜在成分を構成し、回帰予測と結びつける。PCR（PCA Regression）が「まず PCA で X を要約して回帰」なのに対し、PLS は「予測に効く方向を優先して要約する」という意味をもつ。

## クラスタリングと混合モデル：構造を仮定して群を得る

### k-means（歪み最小化）

クラスタ中心 $\{\mu_{1},\dots,\mu_{K}\}$ と割当 $\{c_{i}\}$ に対し

$\min_{\{c_{i}\},\{\mu_{k}\}} \sum_{i=1}^{n}\|x_{i}-\mu_{c_{i}}\|_{2}^{2}$

を最小化する。これは距離にもとづく幾何の問題であり、PCA と組み合わせて視覚化・前処理に使われることが多い。

### ガウス混合モデル（GMM）

確率的には

$$
p(x)=\sum_{k=1}^{K}\pi_{k}\mathcal{N}(x\mid\mu_{k},\Sigma_{k})
$$

の形を仮定し、対数尤度を最大化して推定する。EM アルゴリズムで「所属確率」と「パラメータ」を交互更新する。k-means が「球状（等方）に近い」仮定を暗に持つのに対し、GMM は楕円形のクラスタを表現しうる。

## 距離からの埋め込み：多次元尺度構成法（MDS）

対象間の非類似度（距離）行列 $\Delta=(\delta_{ij})$ が与えられたとき、低次元点 $y_{i}\in\mathbb{R}^{d}$ を探して

$$
\sum_{i<j}\left(\|y_{i}-y_{j}\|_{2}-\delta_{ij}\right)^{2}
$$

を小さくする（メトリック MDS の一例）。ノンメトリック MDS は距離の順位（単調変換）を重視し、ストレス関数を最小化する。これは「距離情報を保つ可視化」の基本的な考え方である。

## 多変量の検定：Hotelling の $T^{2}$ と MANOVA

多変量解析は「推定・要約」だけでなく「差があるか」を統計的に問う枠組みも含む。

### Hotelling の $T^{2}$（多変量 t 検定）

1 標本で平均が $\mu_{0}$ かを調べるとき

$$
T^{2}=n(\bar{x}-\mu_{0})^{\top}S^{-1}(\bar{x}-\mu_{0})
$$

である。これは平均差をマハラノビス距離で測った量であり、多変量正規性の下で F 分布に変換できる。2 標本の場合も同様に平均差の二次形式として表される。

### MANOVA（多変量分散分析）

複数の従属変数を同時に扱い、群間で平均ベクトルが等しいかを問う。検定統計量として Wilks の $\Lambda$、Pillai の trace などがあり、群内・群間の平方和積和行列から構成される。直観的には「多変量の平均差を、共分散を見ながら評価する」ものである。

## 高次元（p が大きい）での共分散推定：縮小推定

機械学習では $p$ が大きく $n$ が相対的に小さい状況が多く、標本共分散 $S$ が不安定になりやすい。そこで、共分散推定に正則化を入れる。

### 縮小推定の基本形

目標行列 $T$（例：対角、単位行列、等分散）へ寄せる推定として

$$
\hat{\Sigma}=(1-\alpha)S+\alpha T,\quad 0\le\alpha\le 1
$$

を用いる。Ledoit–Wolf は $\alpha$ を平均二乗誤差の観点から解析的に選ぶ方法として知られる。$\hat{\Sigma}^{-1}$ が安定すると、マハラノビス距離、LDA、GMM、Hotelling の $T^{2}$ などが数値的に扱いやすくなる。

## 手法の比較

| 手法 | 目的 | 中心となる量 | 主な仮定（概要） | 出力の解釈 |
|---|---|---|---|---|
| PCA | 次元削減・要約 | 共分散（2次統計量） | 分散最大の直交方向 | 主成分＝分散が大きい方向 |
| 因子分析 | 潜在因子の推定 | 共分散の分解 | 線形生成＋ガウス潜在変数 | 因子負荷量＝潜在因子の寄与 |
| ICA | 信号分離 | 非ガウス性・独立性 | 独立成分＋線形混合 | 独立成分＝分離された源 |
| LDA | 分類（線形境界） | 平均差と共分散 | クラス正規＋共通共分散 | 判別軸＝分離が良い方向 |
| QDA | 分類（二次境界） | 平均差と共分散 | クラス正規＋共分散クラス別 | より柔軟な境界 |
| CCA | 2集合の関係要約 | 相関（正規化共分散） | 線形結合で相関最大 | 共通成分＝対応が強い方向 |
| PLS | 予測に有利な要約 | 共分散（予測志向） | 線形潜在成分 | 成分＝目的と連動する方向 |
| k-means | 群分け | ユークリッド距離 | 球状に近い群 | 中心＝代表点 |
| GMM | 群分け（確率） | 尤度（混合正規） | 混合分布 | 所属確率＝曖昧な群 |
| MDS | 可視化（距離保存） | 距離・ストレス | 距離が意味をもつ | 低次元配置＝距離の写像 |
| Hotelling $T^{2}$ | 平均差の検定 | マハラノビス距離 | 多変量正規（多くの場合） | 平均差の大きさ |
| MANOVA | 群差の検定 | 群内/群間行列 | 多変量正規（多くの場合） | 群の差の総合評価 |

## Python による例

### PCA：標準化→2次元へ→分散説明率を描く

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

rng = np.random.default_rng(0)

# 相関のある 5 次元データを作る
n = 800
z = rng.normal(size=(n, 2))
A = np.array([[2.0, 0.7],
              [1.2, 0.4],
              [0.1, 1.5],
              [0.5, -0.2],
              [1.0, 0.1]])
X = z @ A.T + 0.2 * rng.normal(size=(n, 5))

# 標準化
Xs = StandardScaler().fit_transform(X)

# PCA
pca = PCA(n_components=5)
Z = pca.fit_transform(Xs)
evr = pca.explained_variance_ratio_
cev = np.cumsum(evr)

plt.figure()
plt.plot(np.arange(1, 6), cev, marker="o")
plt.xlabel("number of components")
plt.ylabel("cumulative explained variance ratio")
plt.ylim(0, 1.05)
plt.grid(True)
plt.show()

plt.figure()
plt.scatter(Z[:, 0], Z[:, 1], s=8)
plt.xlabel("PC1")
plt.ylabel("PC2")
plt.grid(True)
plt.show()
```

この例では、標準化により各変数の尺度をそろえ、PCA が相関構造にもとづいて低次元へ要約している。累積寄与率は「情報がどれだけ残るか」を数値で与えるものである。

### LDA：2 クラスの線形判別を確認する
```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis

rng = np.random.default_rng(1)

n = 400
mu0 = np.array([-1.0,  0.0])
mu1 = np.array([ 1.0,  0.5])
Sigma = np.array([[1.0, 0.6],
                  [0.6, 1.2]])

X0 = rng.multivariate_normal(mu0, Sigma, size=n)
X1 = rng.multivariate_normal(mu1, Sigma, size=n)
X = np.vstack([X0, X1])
y = np.array([0]*n + [1]*n)

clf = LinearDiscriminantAnalysis()
clf.fit(X, y)

# 可視化用の格子
x_min, x_max = X[:, 0].min() - 1, X[:, 0].max() + 1
y_min, y_max = X[:, 1].min() - 1, X[:, 1].max() + 1
xx, yy = np.meshgrid(np.linspace(x_min, x_max, 250),
                     np.linspace(y_min, y_max, 250))
Z = clf.predict(np.c_[xx.ravel(), yy.ravel()]).reshape(xx.shape)

plt.figure()
plt.contourf(xx, yy, Z, alpha=0.25)
plt.scatter(X0[:, 0], X0[:, 1], s=10, label="class 0")
plt.scatter(X1[:, 0], X1[:, 1], s=10, label="class 1")
plt.legend()
plt.xlabel("x1")
plt.ylabel("x2")
plt.grid(True)
plt.show()
```

クラス共分散が共通であるという仮定のもと、境界が直線になることが見える。これは多変量正規分布の二次形式が、共分散共通のとき線形の判別関数へ簡約されることに対応する。

### 縮小共分散（Ledoit–Wolf）でマハラノビス距離を安定化する
```python
import numpy as np
from sklearn.covariance import LedoitWolf

rng = np.random.default_rng(2)

n, p = 60, 40
X = rng.normal(size=(n, p))
X = X - X.mean(axis=0, keepdims=True)

lw = LedoitWolf().fit(X)
Sigma_hat = lw.covariance_
Precision_hat = lw.precision_

x = X[0]
d2 = x @ Precision_hat @ x
print("squared Mahalanobis distance from mean (approx.):", float(d2))
```

$p$ が大きい状況では標本共分散の逆行列が不安定になりやすいが、縮小推定により逆行列（精度行列）が計算しやすくなる。これにより距離や判別の数値計算が扱いやすくなる。

## まとめと展望
多変量解析は、(1) 共分散と二次形式、(2) 固有値分解・SVD、(3) 多変量正規分布と尤度、という 3 つの道具で多くが統一的に記述できる枠組みである。PCA・因子分析・ICA は要約と潜在構造、LDA/QDA は確率モデルによる分類、CCA/PLS は複数表現の対応、GMM や MDS は構造化の別表現、Hotelling $T^{2}$ と MANOVA は差の統計的評価として位置づくものである。

今後の展望としては、(i) 高次元での安定な共分散推定（縮小・疎・頑健）、(ii) 多視点データの統合（CCA の正則化や深層化）、(iii) 非線形構造の取り込み（カーネル化や表現学習との接続）が重要である。これらは、古典的多変量解析の目的（要約・関係・判別）を維持したまま、現代的データ規模と複雑性へ拡張する方向で発展している。


## 参考文献
- 京都大学 データ分析基礎「主成分分析＋演習の手順」（日本語PDF）
https://ds.k.kyoto-u.ac.jp/wp-content/uploads/2021/10/slide-05.pdf

- 東京大学 鈴木研究室 講義「主成分分析」（日本語PDF）
https://ibis.t.u-tokyo.ac.jp/suzuki/lecture/2015/dataanalysis/L7.pdf

- 日本マーケティング・リサーチ協会「マハラノビス研究会報告」（日本語PDF）
https://www.jmra-net.or.jp/Portals/0/committee/innovation/20230414_001.pdf

- Hotelling, H. (1936) “Relations Between Two Sets of Variates” (CCA の原典, JSTOR)
https://www.jstor.org/stable/2333955

- Kruskal, J. B. (1964) “Nonmetric multidimensional scaling: A numerical method” (MDS の古典, PDF)
https://cda.psych.uiuc.edu/psychometrika_highly_cited_articles/kruskal_1964b.pdf

- Pennsylvania State University, STAT 505: MANOVA 解説（英語）
https://online.stat.psu.edu/stat505/book/export/html/762

- scikit-learn: FastICA（ICA, 英語）
https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.FastICA.html

- scikit-learn: FactorAnalysis（因子分析, 英語）
https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.FactorAnalysis.html

- scikit-learn: MDS（多次元尺度構成法, 英語）
https://scikit-learn.org/stable/modules/generated/sklearn.manifold.MDS.html

- scikit-learn: LedoitWolf（縮小共分散, 英語）
https://scikit-learn.org/stable/modules/generated/sklearn.covariance.LedoitWolf.html

- Halko, N. et al., “Finding structure with randomness” (ランダム化低ランク分解, 英語PDF)
https://users.cms.caltech.edu/~jtropp/papers/HMT11-Finding-Structure-SIREV.pdf