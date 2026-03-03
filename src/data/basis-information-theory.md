# 機械学習のための情報理論入門

情報理論は、確率分布に基づいて「不確実性」や「情報の伝達量」を定量化する理論である。機械学習では、対数尤度、クロスエントロピー損失、KLダイバージェンス、相互情報量、変分推論の下限などが情報理論の量として統一的に理解できる。

## 参考ドキュメント
- C. E. Shannon, A Mathematical Theory of Communication, 1948（原論文PDF）
https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf
- T. M. Cover and J. A. Thomas, Elements of Information Theory, 2nd ed.（教科書PDF）
https://staff.ustc.edu.cn/~cgong821/Wiley.Interscience.Elements.of.Information.Theory.Jul.2006.eBook-DDU.pdf
- 電子情報通信学会 情報理論とその応用サブソサイエティ（SITAサブソ，日本語）
https://www.ieice.org/ess/sita/

## 1. 情報量：自己情報量と符号長

ある事象 $x$ が起きたときの「驚き」の大きさを、確率 $p(x)$ だけで表す量として自己情報量（self-information）を導入する。

$$ 
I(x) = -\log p(x) 
$$

- $p(x)$ が小さいほど $I(x)$ は大きくなる（起きにくいほど驚きが大きい）。
- 対数の底が 2 なら単位は bit、自然対数なら nat である。
- $I(x)$ は「最適な符号化における符号長」に対応するという直観を持つ（$p(x)$ が大きいものほど短い符号で表すのが合理的である）。

この対応は、以降の「平均符号長」「最短平均符号長」とエントロピーの関係へつながる。


## 2. エントロピー：平均としての不確実性

離散確率変数 $X$ のエントロピーは、自己情報量の期待値である。

$$ 
H(X) = \mathbb{E}[I(X)] = -\sum_{x} p(x)\log p(x) 
$$

意味づけ：
- $H(X)$ は「平均的な驚き」または「平均的な不確実性」を表す。
- 符号化の観点では、最良の可逆圧縮における平均符号長の下限と結びつく（情報源符号化の定理）。

### 2.1 エントロピーの基本性質

離散型での代表的な性質である。

- 非負性：$H(X)\ge 0$
- 一様分布で最大：$X$ が $|\mathcal{X}|$ 通り一様なら
  $ H(X)=\log|\mathcal{X}| $
- 連鎖律（チェインルール）：
  $ H(X,Y)=H(X)+H(Y\mid X) = H(Y)+H(X\mid Y) $

ここで条件付きエントロピーは

$$ 
H(Y\mid X)= -\sum_{x,y} p(x,y)\log p(y\mid x) 
$$

であり、「$X$ を知った後に残る $Y$ の不確実性」である。

## 3. 交差エントロピーとKLダイバージェンス：学習の損失関数の中心

機械学習では「真の分布 $p$」を「モデル分布 $q_{\theta}$」で近似する構図が多い。ここで重要になるのが交差エントロピーとKLダイバージェンスである。

### 3.1 交差エントロピー

同じ事象集合上の2つの分布 $p(x)$ と $q(x)$ に対して

$$ 
H(p,q) = -\sum_{x} p(x)\log q(x) 
$$

である。意味は「$p$ に従ってデータが出るとき、$q$ を用いて符号化した場合の平均符号長」である。

### 3.2 KLダイバージェンス（相対エントロピー）

$$ 
D_{\mathrm{KL}}(p\parallel q) = \sum_{x} p(x)\log\frac{p(x)}{q(x)} 
$$

性質：
- $D_{\mathrm{KL}}(p\parallel q)\ge 0$（Gibbs の不等式）
- $D_{\mathrm{KL}}(p\parallel q)=0$ は $p=q$ のときに限る
- 対称ではない：一般に $D_{\mathrm{KL}}(p\parallel q)\ne D_{\mathrm{KL}}(q\parallel p)$

### 3.3 三者の関係

$$ 
H(p,q) = H(p) + D_{\mathrm{KL}}(p\parallel q) 
$$

よって、$p$ が固定なら交差エントロピー最小化はKL最小化と同値である。

## 4. 最尤推定とクロスエントロピー損失

データ $D=\{x_{i}\}_{i=1}^{n}$ が独立同分布で $p_{\theta}(x)$ から生成されると仮定すると、尤度は

$$ 
p_{\theta}(D)=\prod_{i=1}^{n} p_{\theta}(x_{i}) 
$$

対数尤度は

$$
\log p_{\theta}(D) = \sum_{i=1}^{n}\log p_{\theta}(x_{i}) 
$$

負の対数尤度（NLL）を最小化することは、対数尤度を最大化することと同じである。

$$
\min_{\theta} \left(-\sum_{i=1}^{n}\log p_{\theta}(x_{i})\right) \quad \Leftrightarrow \quad \max_{\theta} \sum_{i=1}^{n}\log p_{\theta}(x_{i}) 
$$

分類でのクロスエントロピー損失は、観測ラベルの経験分布 $\hat{p}$ とモデル $q_{\theta}$ の交差エントロピーとして書けるため、NLL 最小化の形を取る。

### 4.1 二値分類（ロジスティック回帰）

$y\in\{0,1\}$、モデル確率 $q_{\theta}(y=1\mid x)=\sigma(f_{\theta}(x))$ とすると

$$ 
\mathcal{L}(\theta)= -\sum_{i=1}^{n}\left[ y_{i}\log q_{\theta}(1\mid x_{i}) + (1-y_{i})\log q_{\theta}(0\mid x_{i}) \right] 
$$

はベルヌーイ尤度のNLLであり、二値クロスエントロピー損失そのものである。

### 4.2 多クラス分類（softmax）

$K$ クラス、one-hot ラベル $y_{i,k}$、モデル $q_{\theta}(k\mid x_{i})$ に対して

$$ 
\mathcal{L}(\theta)= -\sum_{i=1}^{n}\sum_{k=1}^{K} y_{i,k}\log q_{\theta}(k\mid x_{i}) 
$$

が多クラスのクロスエントロピー損失である。


## 5. 相互情報量：表現がどれだけ情報を保持しているか

2つの確率変数 $X,Y$ の相互情報量は

$$ 
I(X;Y)=\sum_{x,y} p(x,y)\log\frac{p(x,y)}{p(x)p(y)} 
$$

であり、次の等価な表現がある。

$$ 
I(X;Y) = D_{\mathrm{KL}}(p(x,y)\parallel p(x)p(y)) 
$$

$$ 
I(X;Y) = H(X)-H(X\mid Y) = H(Y)-H(Y\mid X) 
$$

意味づけ：
- $I(X;Y)$ は「$Y$ を知ることで $X$ の不確実性がどれだけ減るか」を表す。
- $p(x,y)$ が独立なら $p(x,y)=p(x)p(y)$ なので $I(X;Y)=0$ となる。

### 5.1 条件付き相互情報量

第三の変数 $Z$ があるとき

$$ 
I(X;Y\mid Z)=H(X\mid Z)-H(X\mid Y,Z) 
$$

である。因果推論やグラフィカルモデルでは、条件付き独立性と結びついて現れやすい。


## 6. 表現学習の「情報の減り方」

### 6.1 エントロピーと相互情報量の連鎖律

条件付きエントロピーの連鎖律：

$$ 
H(X_{1},\dots,X_{n}) = \sum_{i=1}^{n} H(X_{i}\mid X_{1},\dots,X_{i-1}) 
$$

相互情報量の連鎖律：

$$ 
I(X;Y,Z)=I(X;Y)+I(X;Z\mid Y) 
$$

### 6.2 データ処理不等式（DPI）

$X\to Z\to Y$ がマルコフ連鎖（$X$ と $Y$ が $Z$ を介してつながる）であるとき

$$ 
I(X;Y) \le I(X;Z) 
$$

が成り立つ。意味は「処理（写像・圧縮）を通すと情報は増えない」である。表現学習で $Z=f(X)$ を作るとき、$Z$ が保持できる情報は $X$ に含まれる情報を超えない。


## 7. 連続変数：微分エントロピーと不変性

連続確率変数 $X$ の密度 $f(x)$ に対して微分エントロピー（differential entropy）は

$$ 
h(X) = -\int f(x)\log f(x)\,dx 
$$

で定義される。ただし、微分エントロピーは座標変換に対して不変ではなく、値が負になることもある。

一方、KLダイバージェンスは（適切な条件の下で）座標変換に対して不変であり、連続の場合でも「分布のずれ」の尺度として解釈が安定する。

$$ 
D_{\mathrm{KL}}(p\parallel q)=\int p(x)\log\frac{p(x)}{q(x)}\,dx 
$$

相互情報量も KL として書けるため、連続でも解釈が安定しやすい。

$$ 
I(X;Y) = \int p(x,y)\log\frac{p(x,y)}{p(x)p(y)}\,dx\,dy 
$$


## 8. 圧縮と汎化：MDL

情報理論の見方では、負の対数尤度は「符号長」に対応する。

$$
-\log p_{\theta}(D) 
$$

これにモデルの複雑さ（パラメータの符号長、事前の対数項など）を足したものを最小化するという発想が MDL につながる。MAP 推定は

$$ 
\hat{\theta}_{\mathrm{MAP}}=\arg\max_{\theta}\left[\log p(D\mid\theta)+\log p(\theta)\right] 
$$

であり、$-\log p(\theta)$ は「複雑さの罰則」として働くため、正則化と同じ形になることが多い。


## 9. 変分推論とELBO：KL最小化としての学習

潜在変数 $z$ を持つモデル $p_{\theta}(x,z)$ を考える。事後分布 $p_{\theta}(z\mid x)$ が扱いづらいとき、近似分布 $q_{\phi}(z\mid x)$ を導入し、次を最大化する。

$$ 
\mathrm{ELBO}(x) = \mathbb{E}_{q_{\phi}(z\mid x)}[\log p_{\theta}(x,z)] - \mathbb{E}_{q_{\phi}(z\mid x)}[\log q_{\phi}(z\mid x)] 
$$

これは

$$ 
\log p_{\theta}(x) = \mathrm{ELBO}(x) + D_{\mathrm{KL}}(q_{\phi}(z\mid x)\parallel p_{\theta}(z\mid x)) 
$$

という分解を持ち、ELBO 最大化は「近似事後 $q$ を真の事後へ近づける（KLを小さくする）」方向を保証する。

VAE はこの枠組みの代表例であり、復元項（対数尤度）とKL項（正則化）の和として学習が書ける。


## 10. 表現学習・対比学習と情報量

相互情報量 $I(X;Z)$ を最大化したい場面があるが、$p(x,z)$ が未知で直接計算できない。そこで下界を最大化するという設計が現れる。

代表的には、対比学習（contrastive learning）で用いられる InfoNCE 目的関数は、相互情報量の下界と関係する形で導かれることがある（導出には仮定が要るが、「正例を高く、負例を低く」という形が情報量の増加と整合する）。


## 11. 主要な情報量の一覧表

| 量 | 定義 | 解釈（短い説明） |
|---|---|---|
| 自己情報量 | $I(x)=-\log p(x)$ | 事象 $x$ の驚き、符号長 |
| エントロピー | $H(X)=-\sum_{x}p(x)\log p(x)$ | 不確実性の平均 |
| 条件付きエントロピー | $H(X\mid Y)=-\sum_{x,y}p(x,y)\log p(x\mid y)$ | $Y$ を知った後の不確実性 |
| 交差エントロピー | $H(p,q)=-\sum_{x}p(x)\log q(x)$ | $p$ のデータを $q$ で符号化した平均 |
| KL | $D_{\mathrm{KL}}(p\parallel q)=\sum_{x}p(x)\log\frac{p(x)}{q(x)}$ | 分布のずれ（非対称） |
| 相互情報量 | $I(X;Y)=\sum_{x,y}p(x,y)\log\frac{p(x,y)}{p(x)p(y)}$ | 共有情報、独立なら0 |

対数の底を 2 にすると単位は bit であり、情報量を「符号長」として直観しやすい。


## 12. エントロピー、KL、相互情報量を計算する

```python
import numpy as np

def entropy(p, base=2.0):
    p = np.asarray(p, dtype=float)
    p = p[p > 0]
    return -np.sum(p * (np.log(p) / np.log(base)))

def kl_divergence(p, q, base=2.0):
    p = np.asarray(p, dtype=float)
    q = np.asarray(q, dtype=float)
    mask = (p > 0) & (q > 0)
    return np.sum(p[mask] * (np.log(p[mask] / q[mask]) / np.log(base)))

def mutual_information(pxy, base=2.0):
    pxy = np.asarray(pxy, dtype=float)
    px = pxy.sum(axis=1, keepdims=True)
    py = pxy.sum(axis=0, keepdims=True)
    mask = pxy > 0
    ratio = pxy[mask] / (px @ py)[mask]
    return np.sum(pxy[mask] * (np.log(ratio) / np.log(base)))

# 例：コイン（Bernoulli）2通り
p = np.array([0.5, 0.5])
q = np.array([0.9, 0.1])

print("H(p) [bit] =", entropy(p))
print("H(p,q) [bit] =", -np.sum(p * np.log2(q)))
print("KL(p||q) [bit] =", kl_divergence(p, q))

# 例：2x2 の同時分布（独立でない例）
pxy = np.array([[0.4, 0.1],
                [0.1, 0.4]])
print("I(X;Y) [bit] =", mutual_information(pxy))
```

この例では、$H(p,q)=H(p)+D_{\mathrm{KL}}(p\parallel q)$ の関係が数値としても確認できる。相互情報量は、独立（$p(x,y)=p(x)p(y)$）に近いほど 0 に近づく。

## 13. 学習で頻出する対応関係のまとめ
- 交差エントロピー最小化 $\Leftrightarrow$ NLL 最小化 $\Leftrightarrow$ 最尤推定
- ELBO 最大化 $\Leftrightarrow$ 近似事後と真の事後の KL を小さくする方向
- 相互情報量は「共有情報」であり、表現 $Z$ が入力 $X$ の何を保持しているかの尺度として現れる
- KL は対称でないため、設計意図に応じて $D_{\mathrm{KL}}(p\parallel q)$ と $D_{\mathrm{KL}}(q\parallel p)$ の意味が異なる（前者は $p$ の質量を外さない、後者は $q$ の質量を外さない、という違いとして現れる）

## まとめと展望
情報理論の量（エントロピー、交差エントロピー、KL、相互情報量）は、確率分布の近似・推定・圧縮・表現という機械学習の中心課題を同じ言葉で書き直すための基盤である。特に、クロスエントロピー損失が最尤推定のNLLであること、変分推論がKL最小化と下限最大化として整理できることを押さえると、手法の違いが式の違いとして見通せる。

今後の展望としては、(i) 高次元データにおける情報量推定（相互情報量推定、密度比推定）、(ii) 表現学習における情報保存と圧縮の制御（情報ボトルネックなど）、(iii) 不確実性推定や校正と情報量の接続（予測分布のエントロピー、尤度の解釈）を、学習目的と評価指標の両面から統合していく方向が重要である。

## 参考文献
- 北海道大学OCW 情報理論 配布資料 #11（日本語PDF）
  https://ocw.hokudai.ac.jp/wp-content/uploads/2016/01/InformationTheory-2005-Note-11.pdf
- 高知工科大学 講義資料：相互情報量（日本語PDF）
  https://www.info.kochi-tech.ac.jp/mfukumot/Lecture/IT/materials/lec09.pdf
- 千葉大学 講義資料：情報量（エントロピー、ダイバージェンス、相互情報量）（日本語PDF）
  https://www.cfme.chiba-u.jp/~haneishi/class/jyohoriron/InformationTheory3.pdf
- 若杉耕一郎, 情報理論とその応用サブソサイエティの活動について（J-STAGE，日本語PDF）
  https://www.jstage.jst.go.jp/article/essfr/5/1/5_1_5/_pdf
- The Mathematical Theory of Communication (Shannon & Weaver, 1949)（PDF）
  https://pure.mpg.de/pubman/item/item_2383164_3/component/file_2383163/Shannon_Weaver_1949_Mathematical.pdf