# 深層学習の基礎と概念 (Bishop, 2024)
**Deep Learning: Foundations and Concepts（Bishop & Bishop, データサイエンス技術文書, 2024）**

本Wikiは、Bishop & Bishop による Deep Learning: Foundations and Concepts の章立てに沿って、深層学習を「確率・最適化・表現・分布」の観点から一貫した体系として整理するものである。予測と生成、推定とサンプリング、アーキテクチャと学習則の接続を、数式骨格を中心にまとめる。

## 参考ドキュメント
- BishopBook（公式サイト）  
  https://www.bishopbook.com/
- SpringerLink（目次・書誌情報）  
  https://link.springer.com/book/10.1007/978-3-031-45468-4
- 機械学習・Deep Learningの無料本など（国内記事）  
  https://okumuralab.org/~okumura/misc/231215.html


## 本書の目次と構造
本書は全20章であり、前半は確率と単層モデルから深層モデルへ、次に最適化と逆伝播、続いて主要アーキテクチャ（CNN/Transformer/GNN）へ進む。後半は構造をもつ分布、サンプリング、潜在変数、GAN、正規化フロー、オートエンコーダへ展開し、「分布を学ぶ」という視点を完成させる。

- 第1部：導入と確率
  - (1) The Deep Learning Revolution
  - (2) Probabilities
  - (3) Standard Distributions
- 第2部：予測モデル（回帰・分類・深層）
  - (4) Single-layer Networks: Regression
  - (5) Single-layer Networks: Classification
  - (6) Deep Neural Networks
- 第3部：学習（最適化・逆伝播・正則化）
  - (7) Gradient Descent
  - (8) Backpropagation
  - (9) Regularization
- 第4部：アーキテクチャ
  - (10) Convolutional Networks
  - (11) Structured Distributions
  - (12) Transformers
  - (13) Graph Neural Networks
- 第5部：推論と生成（分布・サンプリング・潜在変数・生成モデル）
  - (14) Sampling
  - (15) Discrete Latent Variables
  - (16) Continuous Latent Variables
  - (17) Generative Adversarial Networks
  - (18) Normalizing Flows
  - (19) Autoencoders

以降では、各章を「狙い／主題／基本原理／解釈／次章への接続」の形で詳述する。


## 1. データサイエンスから見た深層学習の統一像

### 1.1 3つの視点：関数・確率・計算

深層学習は、次の3要素が一体化した枠組みである。

- 関数近似：入力 $x$ から出力 $y$ を作る写像 $f_{\theta}(x)$ の学習である。
- 確率モデル：不確実性を含む分布 $p(y\mid x,\theta)$ や $p(x)$ を学習する枠組みである。
- 計算手法：大規模なパラメータ $\theta$ を勾配により更新する計算法である。

この3点が、回帰・分類・表現学習・生成モデルまで同じ骨格で結びつく。

### 1.2 学習問題の基本形（経験損失最小化）

データ $\{(x_n,y_n)\}_{n=1}^N$ に対し、損失関数 $\ell$ を用いて

$$
\hat{\theta}=\arg\min_{\theta}\frac{1}{N}\sum_{n=1}^{N}\ell\!\left(f_{\theta}(x_n),y_n\right)
$$

を解く。データサイエンスとして重要なのは、損失が「当てはまり」と「不確実性（分布）」の両方を表現し得る点である。

確率的には、尤度 $p(y\mid x,\theta)$ を導入して

$$
\hat{\theta}=\arg\min_{\theta}\left[-\sum_{n=1}^N \log p(y_n\mid x_n,\theta)\right]
$$

と同等の形で書ける。回帰の二乗誤差、分類の交差エントロピーは、いずれも適切な分布仮定の下で負の対数尤度になる。


## 2. 各論

### 第1章 The Deep Learning Revolution

狙い  
深層学習が何を変え、何を可能にしたかを概観し、本書全体の到達点を示す章である。性能向上の歴史だけでなく、データ量・計算量・表現の観点で「なぜ深層化が効くか」を言語化する。

主題  
- 表現学習という考え方（特徴量設計から表現の自動獲得へ）
- 「層」を重ねることの意味（合成関数、階層表現、抽象化）
- 学習の成功要因（計算資源、データ、最適化、正則化、アーキテクチャ）

基本原理（最小限）  
層の合成としての深層モデル：
$$
f_{\theta}(x)=f^{(L)}_{\theta_L}\circ f^{(L-1)}_{\theta_{L-1}}\circ \cdots \circ f^{(1)}_{\theta_1}(x)
$$

解釈  
深層学習は「表現」と「予測」を同時に最適化できる枠組みであり、入力の構造（画像・系列・グラフ）に合わせた設計が性能の決定因になりやすいことを示す導入である。

---

### 第2章 Probabilities

狙い  
深層学習を確率的推論として理解するための土台を作る章である。分布、条件付き確率、期待値、独立性、変数変換など、本書の後半（潜在変数、サンプリング、生成モデル）まで通用する道具を整える。

主題  
- 同時分布・周辺化・条件付き分布
- ベイズ則、連鎖律
- 期待値・分散・共分散、エントロピー
- 独立性と条件付き独立性
- 連続変数での積分と変数変換

基本原理  
連鎖律：
$$
p(x_1,\dots,x_D)=\prod_{d=1}^{D}p(x_d\mid x_1,\dots,x_{d-1})
$$

周辺化：
$$
p(x)=\int p(x,z)\,dz
$$

ベイズ則：
$$
p(z\mid x)=\frac{p(x\mid z)p(z)}{p(x)}
$$

エントロピーとKL：
$$
H(p)=-\sum_x p(x)\log p(x),\quad
D_{\mathrm{KL}}(p\|q)=\sum_x p(x)\log\frac{p(x)}{q(x)}
$$

解釈  
評価指標（対数尤度、交差エントロピー）、不確実性推定、欠測や潜在構造を扱う枠組みが、すべて確率の言葉で統一される。

---

### 第3章 Standard Distributions

狙い  
よく用いられる分布とその性質を整理し、尤度、共役事前、指数型分布族の見方を導入する章である。モデル化と損失の対応関係の理解が深まる。

主題  
- 離散分布：Bernoulli、Categorical、Binomial、Multinomial
- 連続分布：Gaussian、Gamma、Beta、Dirichlet など
- 指数型分布族と十分統計量
- 共役性（頻繁に現れる場合の計算の簡潔化）

基本原理  
指数型分布族（一般形）：
$$
p(x\mid\eta)=h(x)\exp\left(\eta^{\top}T(x)-A(\eta)\right)
$$

ガウス分布：
$$
\mathcal{N}(x\mid \mu,\Sigma)=\frac{1}{(2\pi)^{D/2}|\Sigma|^{1/2}}
\exp\left(-\frac{1}{2}(x-\mu)^{\top}\Sigma^{-1}(x-\mu)\right)
$$

解釈  
回帰の二乗誤差はガウス雑音、分類の交差エントロピーはカテゴリ分布、カウントデータはポアソンや負の二項など、損失関数の選択が分布仮定と結びつく。

---

### 第4章 Single-layer Networks: Regression

狙い  
回帰を単層モデルとして整理し、線形回帰から単層ニューラルネット（非線形基底）までつなぐ章である。損失と分布仮定の対応を明確にする。

主題  
- 線形回帰と最小二乗
- 基底関数展開（特徴写像 $\phi(x)$）
- 正則化付き回帰（リッジ回帰）
- 出力に対する確率モデル（ガウス雑音）

基本原理  
線形モデル：
$$
y=\mathbf{w}^{\top}\phi(x)+b+\epsilon,\quad \epsilon\sim\mathcal{N}(0,\sigma^2)
$$

二乗誤差（負の対数尤度に対応）：
$$
\mathcal{L}(\mathbf{w})=\frac{1}{2N}\sum_{n=1}^{N}\left(y_n-\mathbf{w}^{\top}\phi(x_n)\right)^2
$$

解釈  
回帰では「平均を当てる」だけでなく、分散 $\sigma^2$ の推定や予測区間の扱いが重要になり得る。単層回帰は、その後の深層回帰における損失設計の基本になる。

---

### 第5章 Single-layer Networks: Classification

狙い  
分類を単層モデルとして整理し、ロジスティック回帰と多クラス分類（ソフトマックス）を、確率と損失（交差エントロピー）として一貫して説明する章である。

主題  
- 二値分類：ロジスティック回帰
- 多クラス分類：ソフトマックス回帰
- 交差エントロピーと負の対数尤度
- 予測確率の解釈（キャリブレーションという観点）

基本原理  
二値分類（Bernoulli）：
$$
p(y=1\mid x)=\sigma(\mathbf{w}^{\top}\phi(x)),\quad
\sigma(a)=\frac{1}{1+\exp(-a)}
$$

多クラス（Categorical）：
$$
p(y=k\mid x)=\frac{\exp(a_k)}{\sum_{j}\exp(a_j)},\quad a=W^{\top}\phi(x)
$$

交差エントロピー：
$$
\mathcal{L}=-\frac{1}{N}\sum_{n=1}^{N}\sum_{k=1}^{K} y_{nk}\log p(y=k\mid x_n)
$$

解釈  
分類では正解率だけでなく、ROC-AUC、PR-AUC、対数損失、確率校正など、目的に応じた評価が必要になる。交差エントロピーは推定（尤度最大化）と評価（分布のずれ）の両方を結ぶ。

---

### 第6章 Deep Neural Networks

狙い  
深層ネットワークの基本要素（活性化、層、表現）を整理し、深層化がもたらす表現力と計算上の課題を導入する章である。

主題  
- 活性化関数（ReLU、tanh、sigmoid など）の役割
- 深層化による表現の階層
- 初期化、スケーリング、勾配消失・爆発の概念
- 残差接続などの設計思想（後の章への伏線）

基本原理  
多層パーセプトロン（例）：
$$
h^{(l)}=\phi\!\left(W^{(l)}h^{(l-1)}+b^{(l)}\right),\quad
\hat{y}=g(h^{(L)})
$$

解釈  
深層モデルは表現の自動獲得により特徴設計の負担を減らす一方、最適化と汎化（過学習）の設計が中核になる。以降の章（勾配法、逆伝播、正則化）が必要となる理由がここで明確になる。

---

### 第7章 Gradient Descent

狙い  
学習を「損失関数の最小化」として捉え、勾配降下法とその変種（確率的勾配、モメンタム、適応学習率など）を整理する章である。

主題  
- バッチ勾配降下と確率的勾配降下（SGD）
- 学習率、ステップサイズ、スケジューリング
- モメンタム、Nesterov、Adam系の直観
- 目的関数の地形（鞍点、曲率）の見方（概念として）

基本原理  
基本更新：
$$
\theta_{t+1}=\theta_t-\eta\nabla_{\theta}\mathcal{L}(\theta_t)
$$

ミニバッチ近似：
$$
\nabla\mathcal{L}(\theta)\approx \frac{1}{|B|}\sum_{n\in B}\nabla_{\theta}\ell_n(\theta)
$$

解釈  
大規模データでは「全データで厳密な勾配」を計算しない設計が一般的であり、ノイズを含む勾配推定の性質を理解することが学習の安定性と速度に直結する。

---

### 第8章 Backpropagation

狙い  
チェインルールによる勾配計算を、計算グラフと局所勾配の積み上げとして体系化する章である。深層学習の計算基盤を与える。

主題  
- 計算グラフ（関数合成の表現）
- 逆モード自動微分（Reverse-mode AD）の考え方
- 行列微分、ヤコビアンとベクトル-ヤコビアン積
- 実装上の観点（メモリと再計算などの概念）

基本原理  
合成関数の勾配（概念式）：
$$
\frac{\partial \mathcal{L}}{\partial x}
=\frac{\partial \mathcal{L}}{\partial y}\frac{\partial y}{\partial x}
$$

層ごとの誤差伝播：
$$
\delta^{(l)}=\left(W^{(l+1)}\right)^{\top}\delta^{(l+1)}\odot \phi'(a^{(l)})
$$

解釈  
逆伝播は「モデルの設計」を「微分可能な計算」として表現できる限り、同じ学習枠組みに乗せられることを意味する。ここが、画像・テキスト・グラフ・生成モデルへの拡張を可能にする根である。

---

### 第9章 Regularization

狙い  
汎化性能を高めるために、モデル容量・ノイズ・事前情報をどう取り入れるかを整理する章である。「損失最小化だけでは足りない」ことを数学的・概念的に押さえる。

主題  
- L2正則化（weight decay）とMAP推定の関係
- L1正則化と疎性
- ドロップアウト、ノイズ注入（確率的正則化の見方）
- データ拡張（入力分布の拡張としての意味）
- 学習停止規則（過学習抑制としての位置づけ）

基本原理  
正則化付き目的関数：
$$
\min_{\theta}\ \mathcal{L}(\theta)+\lambda\Omega(\theta)
$$

L2正則化：
$$
\Omega(\theta)=\|\theta\|_2^2
$$

ベイズ的対応（概念）  
L2はガウス事前 $p(\theta)\propto \exp(-\alpha\|\theta\|_2^2)$ に対応し、MAP推定の形になる。

解釈  
データ数が有限である限り、推定には偏りと分散のコントロールが必要である。正則化は、過程を「安定な推定」に寄せるための統一的な道具である。

---

### 第10章 Convolutional Networks

狙い  
畳み込みとプーリングの考え方を導入し、格子状データ（主に画像）に対する深層表現の基本をまとめる章である。

主題  
- 畳み込み（局所受容野、重み共有）
- ストライド、パディング、プーリング
- 特徴マップと階層的表現
- 代表的構成（概念としての残差、正規化）

基本原理  
離散畳み込み（概念）：
$$
y[i,j]=\sum_{u,v}k[u,v]\ x[i-u, j-v]
$$

解釈  
入力の対称性（平行移動）や局所相関を仮定として組み込むことで、学習すべき自由度が減り、データ効率が上がる。これは「構造を先に入れる」設計の典型例ではなく、基本例である。

---

### 第11章 Structured Distributions

狙い  
独立同分布（i.i.d.）だけでは表せない依存構造を、確率分布の構造として表現する章である。後半の潜在変数モデル、サンプリング、生成へ向けて「構造をもつ確率モデル」の見方を作る。

主題  
- 依存構造の表現（連鎖、木、グラフ）
- 因子分解、条件付き独立性の活用
- エネルギー関数や因子グラフ的な視点（一般論として）
- 系列・空間・関係データに対する分布設計の考え方

基本原理  
構造化分布の因子化（概念）：
$$
p(x)=\frac{1}{Z}\prod_{c}\psi_c(x_c)
$$
ここで $Z$ は正規化定数、$\psi_c$ は局所因子である。

解釈  
「データ点が互いに独立である」という仮定を緩め、系列、ネットワーク、階層構造などを扱う基盤になる。また、正規化定数や周辺化が難しくなる問題が、サンプリングや変分法へつながる。

---

### 第12章 Transformers

狙い  
注意機構により、系列・集合上の相互作用を学習するTransformerの基本を体系化する章である。CNNとは異なる「グローバルな依存」を効率よく表す設計を理解する。

主題  
- 自己注意（Self-attention）
- マルチヘッド注意
- 位置情報（位置埋め込み、相対位置の考え方）
- 残差接続、LayerNorm、FFNなどの基本構成

基本原理  
スケールド内積注意：
$$
\mathrm{Attention}(Q,K,V)=\mathrm{softmax}\left(\frac{QK^{\top}}{\sqrt{d_k}}\right)V
$$

解釈  
固定長の局所窓ではなく、入力全体の関係を重みとして取り込みやすい。系列予測だけでなく、一般のトークン集合処理として理解できる点が重要である。

---

### 第13章 Graph Neural Networks

狙い  
グラフ上の表現学習を、局所集約（メッセージパッシング）として整理する章である。ノード・エッジ・グラフ全体の予測を統一的に扱う。

主題  
- 近傍集約と置換不変性
- GCN系、注意型GNN（概念）
- ノード分類、リンク予測、グラフ分類
- グラフのスケーリング（サンプリング、ミニバッチの考え方）

基本原理  
メッセージパッシング（一般形）：
$$
m_v^{(t)}=\square_{u\in\mathcal{N}(v)}\psi\!\left(h_v^{(t)},h_u^{(t)},e_{uv}\right),\quad
h_v^{(t+1)}=\phi\!\left(h_v^{(t)},m_v^{(t)}\right)
$$

解釈  
関係データ（推薦、知識グラフ、通信、分子など）において、特徴だけでなく関係そのものを学習の対象にできる。構造化分布の考え方（第11章）とも接続する。

---

### 第14章 Sampling

狙い  
周辺化、期待値計算、生成などに必要なサンプリング法を整理する章である。後半の潜在変数モデル（離散・連続）の推論手法の基礎になる。

主題  
- モンテカルロ推定と分散
- 重点サンプリング
- MCMC（Metropolis-Hastings、Gibbs など）
- 連続空間のサンプリング（概念としてのHMCなど）

基本原理  
期待値のモンテカルロ推定：
$$
\mathbb{E}_{p(x)}[f(x)]\approx \frac{1}{S}\sum_{s=1}^{S}f(x^{(s)}),\quad x^{(s)}\sim p(x)
$$

重点サンプリング：
$$
\mathbb{E}_{p}[f(x)]=\int f(x)\frac{p(x)}{q(x)}q(x)\,dx
\approx \frac{1}{S}\sum_{s=1}^{S} f(x^{(s)})w^{(s)},\quad
w^{(s)}=\frac{p(x^{(s)})}{q(x^{(s)})}
$$

解釈  
生成・推論の多くは積分が主役であり、その近似をどう作るかが結果の質を左右する。サンプリングは「推定量の性質（偏り・分散）」と直結するため、基礎を押さえる価値が高い。

---

### 第15章 Discrete Latent Variables

狙い  
離散潜在変数を含むモデルを扱い、潜在クラス・混合・離散構造の推定と推論を整理する章である。

主題  
- 混合モデル（潜在クラス）
- 事後分布 $p(z\mid x)$ の計算と近似
- EMアルゴリズムの位置づけ（潜在変数の最尤推定）
- 離散潜在の周辺化と計算量

基本原理  
潜在変数つき尤度：
$$
p(x)=\sum_{z}p(x,z)=\sum_{z}p(x\mid z)p(z)
$$

EMの下界（概念）  
任意の $q(z)$ に対し
$$
\log p(x)\ge \mathbb{E}_{q(z)}[\log p(x,z)-\log q(z)]
$$
を最大化する視点が、変分法へもつながる。

解釈  
クラスタリングやセグメンテーションなど、観測の背後に「離散状態」があると仮定する場面は多い。離散潜在は直観的だが、周辺化が和になるため爆発しやすく、近似の考え方が重要になる。

---

### 第16章 Continuous Latent Variables

狙い  
連続潜在変数モデルを扱い、変分推論と生成モデル（VAEを含む）の基礎を整理する章である。

主題  
- 潜在変数モデル $p(x,z)=p(x\mid z)p(z)$
- 変分推論とELBO
- 再パラメータ化トリック
- 事後分布近似 $q_{\phi}(z\mid x)$（推論モデル）

基本原理  
ELBO（変分下界）：
$$
\log p(x)\ge \mathbb{E}_{q_{\phi}(z\mid x)}[\log p_{\theta}(x\mid z)]-D_{\mathrm{KL}}(q_{\phi}(z\mid x)\|p(z))
$$

再パラメータ化（例：ガウス）：
$$
z=\mu_{\phi}(x)+\sigma_{\phi}(x)\odot \epsilon,\quad \epsilon\sim\mathcal{N}(0,I)
$$

解釈  
表現学習と生成が統合される。潜在空間に意味を持たせることで、補間、異常検知、条件付き生成など多様な分析につながる。

---

### 第17章 Generative Adversarial Networks

狙い  
GANを、分布一致を目的とする対戦ゲームとして整理する章である。生成器と識別器の相互作用、目的関数、学習の性質を押さえる。

主題  
- 生成器 $G$ と識別器 $D$
- ミニマックス目的と分布の一致
- 指標（Jensen-Shannon、Wasserstein など）の関係（概念）
- モード崩壊のような現象の概念整理（用語の理解が中心）

基本原理  
基本目的（概念）：
$$
\min_G\max_D\ 
\mathbb{E}_{x\sim p_{\text{data}}}[\log D(x)]
+\mathbb{E}_{z\sim p(z)}[\log(1-D(G(z)))]
$$

解釈  
尤度を直接最大化しない生成が成立することは、評価指標・学習目標の設計の重要性を示す。生成品質の評価が難しい点も、分布学習として理解すると整理しやすい。

---

### 第18章 Normalizing Flows

狙い  
可逆変換の合成で複雑分布を表し、変数変換公式により尤度計算を可能にする生成モデルを扱う章である。

主題  
- 可逆写像 $x=f(z)$ の合成
- ヤコビアン行列式と対数尤度
- カップリング層などの基本構造（概念）
- サンプリングと密度評価の両立

基本原理  
変数変換公式：
$$
p_X(x)=p_Z(z)\left|\det\left(\frac{\partial z}{\partial x}\right)\right|,\quad z=f^{-1}(x)
$$

対数尤度（合成の場合）：
$$
\log p_X(x)=\log p_Z(z)+\sum_{l}\log\left|\det\left(\frac{\partial z^{(l)}}{\partial z^{(l-1)}}\right)\right|
$$

解釈  
「密度が計算できる」ことは、異常度（対数尤度）やベイズ推論などに接続しやすい。GANとは異なる軸で生成を理解できる。

---

### 第19章 Autoencoders

狙い  
入力の再構成を通じて潜在表現を学習する枠組みを整理し、確率的拡張（VAEとの関係）まで含めて位置づける章である。

主題  
- エンコーダ $z=f_{\phi}(x)$ とデコーダ $\hat{x}=g_{\theta}(z)$
- 再構成誤差と表現の制約
- デノイジング、スパースなどの拡張（概念）
- VAE・フロー・GANとの関係の整理

基本原理  
基本目的：
$$
\min_{\phi,\theta}\ \frac{1}{N}\sum_{n=1}^{N}\|x_n-g_{\theta}(f_{\phi}(x_n))\|^2
$$

解釈  
次元圧縮、特徴抽出、可視化、異常検知などに直結する。生成モデルとしては確率的定式化（第16章）と併せて理解すると、再構成と分布学習の差が明確になる。


## 3. 全体を通した解釈性

### 3.1 回帰・分類・生成をつなぐ「負の対数尤度」

- 回帰（ガウス雑音）：
  - $-\log p(y\mid x)\ \propto\ (y-\hat{y})^2$
- 分類（カテゴリ分布）：
  - $-\log p(y\mid x)\ =\ -\sum_k y_k\log \hat{p}_k$

この対応を押さえると、損失設計とモデル仮定の関係が見通せる。

### 3.2 潜在変数と下界（ELBO）

潜在変数を持つと周辺化が必要である：
$$
p(x)=\int p(x\mid z)p(z)\,dz
$$

そこで下界（ELBO）により学習する：
$$
\log p(x)\ge \mathbb{E}_{q(z\mid x)}[\log p(x\mid z)]-D_{\mathrm{KL}}(q(z\mid x)\|p(z))
$$

### 3.3 変換とヤコビアン（フロー）

密度を扱う生成では変数変換が中核である：
$$
p_X(x)=p_Z(f^{-1}(x))\left|\det\left(\frac{\partial f^{-1}}{\partial x}\right)\right|
$$


## 4. 章別要点一覧

| 章 | 主題 | 対象 | 中心となる計算 | 代表式（核） |
|---|---|---|---|---|
| 1 | 革命の概観 | 全体像 | 設計原理 | 合成関数 $f^{(L)}\circ\cdots\circ f^{(1)}$ |
| 2 | 確率基礎 | 分布 | 周辺化・期待値 | ベイズ則、KL |
| 3 | 標準分布 | 離散・連続 | 尤度と事前 | 指数型分布族 |
| 4 | 回帰（単層） | $p(y\mid x)$ | 最小二乗 | 二乗誤差 |
| 5 | 分類（単層） | $p(y\mid x)$ | 交差エントロピー | softmax |
| 6 | 深層NN | 表現 | 連鎖の合成 | MLP |
| 7 | 勾配法 | 学習 | SGD系 | $\theta\leftarrow \theta-\eta\nabla\mathcal{L}$ |
| 8 | 逆伝播 | 勾配 | 自動微分 | チェインルール |
| 9 | 正則化 | 汎化 | 目的の修正 | $\mathcal{L}+\lambda\Omega$ |
| 10 | CNN | 画像 | 局所集約 | 畳み込み |
| 11 | 構造化分布 | 依存構造 | 因子化 | $p(x)\propto\prod\psi_c$ |
| 12 | Transformer | 系列・集合 | 注意 | softmax$(QK^\top)V$ |
| 13 | GNN | グラフ | 近傍集約 | message passing |
| 14 | サンプリング | 推論 | MC/MCMC | $\mathbb{E}[f]\approx \frac{1}{S}\sum f$ |
| 15 | 離散潜在 | $z$離散 | 和の周辺化 | $p(x)=\sum_z p(x,z)$ |
| 16 | 連続潜在 | $z$連続 | ELBO | VAEの下界 |
| 17 | GAN | 生成 | 対戦最適化 | min-max |
| 18 | フロー | 生成 | 変数変換 | ヤコビアン |
| 19 | AE | 表現 | 再構成 | $\|x-\hat{x}\|^2$ |


## 5. 混同しやすい概念

- 交差エントロピーと負の対数尤度は、設定により同じ意味を持つ場合が多いが、前者は分布間のずれ、後者はモデルの当てはまりとして説明されることがある。両者を「分布と損失の対応」で統一して理解するとよい。
- KLダイバージェンスは $D_{\mathrm{KL}}(p\|q)$ と $D_{\mathrm{KL}}(q\|p)$ で性質が異なり、変分推論では方向が意味を持つ。
- 生成モデルの評価は、尤度（フロー、潜在変数の一部）とサンプル品質（GANなど）で軸が異なる。目的関数が異なる以上、同じ尺度で単純比較できない場合がある。


## まとめ
本書は、確率と損失を起点に、勾配法と逆伝播で学習を可能にし、データの構造に合わせたアーキテクチャを導入し、最後に推論と生成を分布として統一する構成である。データサイエンスの観点では、予測と生成、推定とサンプリング、表現学習と確率モデルが同じ数式骨格でつながることを理解することで、個別手法を「地図の上」に配置できるようになるのである。

## 参考資料
- Solutions to Exercises（Chapter 2 to 10）  
  https://www.bishopbook.com/Concepts_in_Deep_Learning_Solutions_v1.0.pdf
- Vaswani et al., Attention Is All You Need (2017)  
  https://arxiv.org/abs/1706.03762
- Goodfellow et al., Generative Adversarial Nets (2014)  
  https://arxiv.org/abs/1406.2661
- Kingma & Welling, Auto-Encoding Variational Bayes (2013)  
  https://arxiv.org/abs/1312.6114
- Dinh et al., RealNVP (2016)  
  https://arxiv.org/abs/1605.08803
- Rezende & Mohamed, Variational Inference with Normalizing Flows (2015)  
  https://arxiv.org/abs/1505.05770
- Kipf & Welling, Semi-Supervised Classification with Graph Convolutional Networks (2016)  
  https://arxiv.org/abs/1609.02907
- Okumura Lab 以外の国内言及例（輪読会告知）  
  https://sites.google.com/a/g.ecc.u-tokyo.ac.jp/oizumi-lab/home/seminar
- 国内ブログでの紹介例  
  https://glycostationx.org/2023/12/13/%E6%9C%80%E6%96%B0%E3%81%AE%E6%B7%B1%E5%B1%A4%E5%AD%A6%E7%BF%92%E3%81%AE%E6%95%99%E7%A7%91%E6%9B%B8deep-learning-foundations-and-concepts%E3%81%8C%E3%81%A7%E3%81%BE%E3%81%97%E3%81%9F%E3%80%82/
