# マテリアルズ・インフォマティクス：データ駆動型材料科学の基礎と最前線

マテリアルズ・インフォマティクス（Materials Informatics, MI）は，材料科学・物質科学の知見とデータ科学・機械学習を融合させることで，従来の試行錯誤的な材料開発を系統的・効率的なデータ駆動型プロセスへと転換する研究領域である。膨大な計算・実験データの蓄積と機械学習アルゴリズムの発展を背景に，新材料の探索・設計・合成のサイクルを劇的に加速する手法として，電池材料・触媒・半導体・超伝導体など広汎な応用分野で活発な研究が展開されている。

## 参考ドキュメント

1. 統計数理研究所「特集：マテリアルズインフォマティクスの最前線」統計数理, Vol. 69, No. 1, pp. 5–33 (2021)  
   https://www.ism.ac.jp/editsec/toukei/pdf/69-1-005.pdf

2. Ramprasad, R. et al., "Machine learning in materials informatics: recent applications and prospects," npj Computational Materials, 3, 54 (2017)  
   https://www.nature.com/articles/s41524-017-0056-5

3. 近代科学社「実践 マテリアルズインフォマティクス」（橋本康弘 著, 2021）  
   https://www.kindaikagaku.co.jp/book_list/detail/9784764906150/

---

## 1. 歴史的背景

材料科学における情報科学的アプローチの萌芽は，1970〜80年代の合金・セラミックス設計を支援する知識ベースシステムにまで遡ることができる。しかし，現代的な意味でのマテリアルズ・インフォマティクスの起点として広く認識されているのは，2011年6月にオバマ政権が打ち出したマテリアルズ・ゲノム・イニシアチブ（Materials Genome Initiative, MGI）である。MGIは「新機能性材料の探索から実用化までのリードタイムを情報技術によって半減する」ことを目標に掲げ，5億ドル規模の連邦予算のもとで計算材料科学データベースの整備，標準的な計算ワークフロー，実験データの共有インフラの構築が加速した。

MGIと並行して，デンマーク工科大学のNoruzsadeh・Hanssonらが推進したCMR（Computational Materials Repository），デューク大学のCurtarolo グループによるAFLOW，Northwestern大学のWolvertonグループによるOQMD（Open Quantum Materials Database）など，世界各地で大規模な第一原理計算データベースが誕生した。Materials Projectは2013年にLBNLが正式公開し，2026年時点で15万件を超える無機材料の構造・電子・熱力学データを無償提供している。

日本においては，物質・材料研究機構（NIMS）が2015年にMI2Iプロジェクト（Materials research by Information Integration Initiative）を発足させ，国内の産学連携による材料データ統合基盤の構築を主導した。新エネルギー産業技術総合開発機構（NEDO）もマテリアルズインフォマティクス推進事業を通じて企業・大学への支援を展開し，現在に至るまで国内でのMI普及の核となっている。

この時期，深層学習の急速な発展（2012年のAlexNetを嚆矢とするGPUを用いた大規模学習）が材料科学にも波及し，結晶グラフを入力とするグラフニューラルネットワーク（2018年 CGCNN）やトランスフォーマーベースの特性予測モデル，さらには大規模言語モデル（2024〜2025年の LLaMat, MatterChat等）へと，方法論の発展が加速している。

---

## 2. 材料データベースと高スループット計算

マテリアルズ・インフォマティクスの実践には，学習データの基盤となる大規模な材料データベースが不可欠である。現在の主要なデータベースは，第一原理計算（主に密度汎関数理論, DFT）に基づく計算データベースと，実験データに基づくデータベースに大別される。

### 主要な計算データベース

Materials Projectは，Lawrence Berkeley National Laboratory（LBNL）がPython Materials Genomics（pymatgen）ライブラリと連携して構築した開放型データベースであり，2026年時点で15万件以上の無機結晶，5万件以上の分子，8000件以上のスラブ構造の計算データを公開している。各材料の結晶構造，生成エネルギー，バンドギャップ，状態密度，弾性定数，誘電率，磁気特性など多岐にわたる物性が格納されており，Python API（mp-api）を通じて一括取得できる。

AFLOWは Duke Universityが主導する高スループット計算フレームワークであり，300万件を超える計算結果を誇る世界最大規模のデータベースの一つである。自動化された構造生成ルール（AFLOWプロトタイプライブラリ）と標準化された計算パラメータの組み合わせによって，系統的かつ再現性の高いデータ生成が可能である。

OQMDはNorthwestern Universityが開発した100万件以上のDFT計算データを収録するデータベースであり，特に安定性・混合エンタルピーの計算データが充実している。これら3大データベース（MP, AFLOW, OQMD）の計算結果を比較した研究（Phys. Rev. Materials, 2023）では，同一組成に対して最大 0.2 eV/atom 程度の生成エネルギーのばらつきが報告されており，計算設定（擬ポテンシャル，k点，カットオフエネルギー）の統一が重要な課題として認識されている。

ICSD（Inorganic Crystal Structure Database）はFIZ Karlsruheが管理する実験結晶構造の商用データベースであり，30万件を超える無機化合物の構造データを収録している。ICSDは実測データが中心であるため，理論計算データベースとは相補的な位置付けにある。

### 高スループット計算ワークフロー

単一の材料に対して高精度なDFT計算を行うのではなく，自動化されたワークフローを用いて大量の材料を系統的に計算するアプローチが高スループット第一原理計算（HT-DFT）である。代表的なワークフロー管理フレームワークとして，AiiDA（ネーデルランド・スイス），Atomate（LBNL），FireWorksが広く用いられている。これらはジョブのスケジューリング・エラーハンドリング・結果の自動解析をパイプライン化することで，数千〜数万件規模の計算を効率的に実行する。

高スループット計算の代表的な応用として，リチウムイオン電池正極材料の電圧・容量の系統的スクリーニング，触媒表面の吸着エネルギー（Sabatier原理に基づく活性火山プロット），熱電材料のパワーファクター，位相絶縁体候補の予測などが挙げられる。

---

## 3. 特徴量（記述子）エンジニアリング

機械学習モデルへの入力として，化学組成や結晶構造を「モデルが学習可能な固定長の数値ベクトル（特徴量，記述子）」に変換することが，MIの根幹をなす工程である。適切な記述子の設計は，モデルの予測精度と外挿能力を大きく左右する。

### 組成ベース記述子

最も単純な記述子は元素の種類と割合だけを用いた組成記述子である。しかし組成そのものは機械学習モデルが直接扱えるカテゴリ変数であるため，構成元素の物理・化学的特性値（原子半径，電気陰性度，イオン化エネルギー，電子親和力，融点，酸化数など）を組み合わせた統計量（加重平均，加重平均偏差，最大値，最小値，範囲など）に変換するのが標準的である。

この考え方を実装したのがMagpie（Materials Agnostic Platform for Informatics and Exploration, Ward et al. 2016）であり，1組成につき132次元の特徴量ベクトルを生成する。Magpieは Matminer（マテリアルズインフォマティクス向けの特徴量エンジニアリングライブラリ）に実装されており，`ElementProperty.from_preset("magpie")` の一行で利用可能である。

組成記述子は計算コストが極めて低く，数万件のデータセット構築も容易だが，構造情報（結晶対称性・サイト占有率・格子定数）を一切含まないため，同じ組成でも異なる結晶構造をもつ多形（polymorphs）の区別ができないという本質的な限界がある。

### 構造ベース記述子

結晶構造の情報を取り込む記述子として，以下のようなものが広く用いられている。

原子局所環境記述子（AEV: Atomic Environment Vector）は，中心原子のまわりの近傍原子との距離・角度情報をガウス基底関数で展開したものであり，BehlerとParrinelloが提案した高次元ニューラルネットワークポテンシャル（2007年）の入力特徴量として開発された：

$$G_{i}^{(2)} = \sum_{j \neq i} e^{-\eta (R_{ij} - R_s)^2} f_c(R_{ij})$$

$$G_{i}^{(3)} = 2^{1-\zeta}\sum_{j,k \neq i}(1 + \lambda \cos\theta_{ijk})^{\zeta} e^{-\eta(R_{ij}^{2}+R_{ik}^{2}+R_{jk}^{2})} f_c(R_{ij}) f_c(R_{ik}) f_c(R_{jk})$$

ここで，$G^{(2)}$ は2体（距離）項，$G^{(3)}$ は3体（角度）項であり，$\eta, R_s, \zeta, \lambda$ はハイパーパラメータ，$f_c(R)$ は滑らかなカットオフ関数，$R_{ij}$ は原子 $i$，$j$ 間の距離，$\theta_{ijk}$ は $i$ を頂点とする $j$-$i$-$k$ の結合角である。

SOAP（Smooth Overlap of Atomic Positions）は，原子密度をスフェリカルハーモニクス展開し，回転不変な内積を記述子として用いる手法である。指標 $p^{(Z_1,Z_2)}_{n,n',l}$ は以下のように定義される：

$$p^{(Z_1,Z_2)}_{n n' l} = \pi \sqrt{\frac{8}{2l+1}} \sum_{m} (c^{Z_1}_{n l m})^* c^{Z_2}_{n' l m}$$

$c^{Z}_{nlm}$ は原子種 $Z$ の密度のスフェリカルハーモニクス展開係数，$n, n'$ は動径基底のインデックス，$l, m$ は角運動量量子数である。SOAPは並進・回転・反転の対称性を満たすことが保証されており，ガウス近似ポテンシャル（GAP）の入力として広く用いられている。

### 対称性・不変性の要請

物理的に意味のある記述子・モデルは，材料の物性が座標系の取り方（並進，回転，反転）に依らないという物理的対称性を尊重しなければならない。この要請をモデルに組み込む枠組みとして，近年は E(3) 等変ニューラルネットワーク（NequIP, MACE など）が急速に普及している（後述）。

---

## 4. 物性予測のための機械学習モデル

組成・構造記述子が設計されれば，あとは各種の機械学習回帰・分類手法を適用して材料物性の予測モデルを構築できる。ここでは材料科学で特に広く使われているモデルを概説する。

### ランダムフォレストとガウス過程回帰

ランダムフォレスト（Random Forest, RF）は，多数の決定木をブートストラップサンプルとランダム特徴量部分集合で学習し，平均を予測として出力するアンサンブル法である。ハイパーパラメータ感度が低く，高次元の材料記述子に対してもロバストであり，数千件規模のデータセットでの組成ベース物性予測（形成エネルギー，バンドギャップ，機械特性など）の標準的なベースラインとして位置付けられる。

ガウス過程回帰（GPR: Gaussian Process Regression）は，予測値とその不確かさ（信頼区間）を同時に出力する確率的回帰手法であり，データが少ない領域での信頼性評価に優れる。カーネル関数 $k(\mathbf{x}, \mathbf{x}')$ を通じて入力間の類似度を定義し，事後分布として：

$$f(\mathbf{x}_*) \mid \mathbf{X}, \mathbf{y} \sim \mathcal{N}(\mu_*, \sigma_*^2)$$

$$\mu_* = \mathbf{k}_*^{\top}(\mathbf{K} + \sigma_n^2 \mathbf{I})^{-1}\mathbf{y}$$

$$\sigma_*^2 = k(\mathbf{x}_*, \mathbf{x}_*) - \mathbf{k}_*^{\top}(\mathbf{K} + \sigma_n^2 \mathbf{I})^{-1}\mathbf{k}_*$$

を与える。ここで $\mathbf{K}$ はカーネル行列（$K_{ij} = k(\mathbf{x}_i, \mathbf{x}_j)$），$\mathbf{k}_* = [k(\mathbf{x}_*, \mathbf{x}_1), \ldots, k(\mathbf{x}_*, \mathbf{x}_n)]^{\top}$，$\sigma_n^2$ は観測ノイズ分散である。GPRはベイズ最適化の代理モデルとして特に重要であり，後述の能動学習との組み合わせで真価を発揮する。

### サポートベクター回帰・勾配ブースティング

サポートベクター回帰（SVR）は，$\varepsilon$-不感応損失関数を用いてマージン最大化を行う回帰手法であり，カーネルトリック（RBFカーネル等）によって非線形特性予測にも対応する。少数データ（数十〜数百件）での頑健な予測において，ランダムフォレストと並んで多用される。

勾配ブースティング（XGBoost, LightGBM）は，残差を逐次的に学習する決定木アンサンブルであり，テーブルデータでの高精度予測において現在最も広く使われている手法の一つである。Matbenchベンチマーク（材料科学向けの標準的なベンチマークスイート，Dunn et al. 2020）では，構造情報を与えない組成ベースタスクでXGBoost系の手法が依然として強い性能を示している。

### Matbenchによるモデル評価

Matbenchは，形成エネルギー予測・バンドギャップ分類・金属/絶縁体分類・フォノン特性予測・弾性率予測など13のタスクについて，統一的な評価指標と交差検証プロトコルを提供するベンチマークである。モデルの性能は平均絶対誤差（MAE）や二乗平均平方根誤差（RMSE）で比較され，定期的にリーダーボードが更新されている。

---

## 5. グラフニューラルネットワーク（GNN）による結晶物性予測

結晶構造は，原子をノード，近傍原子間の結合をエッジとするグラフとして自然に表現できる。グラフニューラルネットワーク（GNN）はこの構造を直接入力として受け取り，手作業の記述子設計を経ずにエンドツーエンドで物性を予測できる。

### グラフ表現

周期結晶の場合，単位胞内の各原子 $i$ をノード，カットオフ半径 $r_c$ 内に存在する近傍原子 $j$ との対をエッジとしてグラフ $\mathcal{G} = (\mathcal{V}, \mathcal{E})$ を構成する。エッジには原子間距離 $r_{ij}$ と方向ベクトル $\hat{\mathbf{r}}_{ij}$ に基づく特徴量が付与される。

### メッセージパッシング

GNNの中核はメッセージパッシング（Message Passing Neural Network, MPNN, Gilmer et al. 2017）の枠組みであり，各ノード $i$ の隠れ状態 $\mathbf{h}_i^{(l)}$ を以下のように繰り返し更新する：

$$\mathbf{m}_{ij}^{(l)} = \phi_e\!\left(\mathbf{h}_i^{(l)},\, \mathbf{h}_j^{(l)},\, \mathbf{e}_{ij}\right)$$

$$\mathbf{h}_i^{(l+1)} = \phi_v\!\left(\mathbf{h}_i^{(l)},\, \sum_{j \in \mathcal{N}(i)} \mathbf{m}_{ij}^{(l)}\right)$$

ここで，$\mathbf{m}_{ij}^{(l)}$ はエッジ $(i,j)$ のメッセージ，$\mathbf{e}_{ij}$ はエッジ特徴量，$\phi_e$ はエッジネットワーク，$\phi_v$ はノード更新ネットワーク，$\mathcal{N}(i)$ は原子 $i$ の近傍原子集合である。$L$ 層繰り返した後，全ノードの隠れ状態を集約（Readout）して材料全体の特性を予測する：

$$\hat{y} = \phi_{\text{readout}}\!\left(\left\{\mathbf{h}_i^{(L)}\right\}_{i \in \mathcal{V}}\right)$$

### 代表的なモデルの発展

CGCNN（Crystal Graph Convolutional Neural Network, Xie & Grossman, 2018）は，結晶グラフへのGNN適用を材料科学に本格的に導入した先駆的モデルである。原子特徴量（ノード：元素種，酸化数など）とボンド特徴量（エッジ：距離をガウス基底展開）を入力とし，形成エネルギー・バンドギャップ・弾性率などの予測でDFTベースのベンチマークにおいて高精度を達成した。

SchNet（Schütt et al., 2017, 2018）は，距離 $r_{ij}$ に基づく連続フィルタリング関数を用いてエッジ特徴量を生成するアーキテクチャであり，分子・結晶双方のエネルギー・力の学習に適用された：

$$\mathbf{W}^{(l)}(r_{ij}) = \sum_k w_k \exp\!\left(-\gamma \left\|r_{ij} - \mu_k\right\|^2\right)$$

$\mu_k$ はガウス基底の中心，$\gamma$ は幅パラメータ，$w_k$ は学習可能な重みである。

MEGNet（Materials Graph Network, Chen et al., 2019）は，ノード（原子），エッジ（結合），グローバル状態（圧力・温度など）の3種類を同時に更新するアーキテクチャであり，形成エネルギー・バンドギャップ・弾性エネルギーにおいてCGCNN・SchNetを上回る精度を示した。

### 等変ニューラルネットワーク

近年の重要な発展として，回転・反転に対して等変（equivariant）な GNNが登場している。NequIP（Neural Equivariant Interatomic Potentials, Batzner et al. 2022）と MACE（Multi-ACE, Batatia et al. 2022）は，SO(3) または O(3) に関して厳密に等変な表現を学習するアーキテクチャであり，従来モデルより少数のデータポイントで高精度な機械学習力場を学習できることが示されている。等変性の数学的基礎として，球面調和関数 $Y_l^m(\hat{\mathbf{r}})$ を用いた不可約表現（irreducible representation）に基づく特徴量変換が用いられる：

$$\mathbf{h}_i^{l,m} = \sum_{j \in \mathcal{N}(i)} R_{nl}(r_{ij})\, Y_l^m(\hat{\mathbf{r}}_{ij}) \otimes \mathbf{h}_j$$

$R_{nl}(r_{ij})$ は動径関数，$\otimes$ はテンソル積（Clebsch–Gordan結合）を表す。

---

## 6. 機械学習力場（MLFF）

機械学習力場（Machine Learning Force Field, MLFF；またはNeural Network Potential, NNP；Machine Learning Interatomic Potential, MLIP とも呼ぶ）は，DFTまたはより高精度な量子化学計算の精度でポテンシャルエネルギー面（PES）を再現しながら，古典分子動力学（MD）に匹敵する計算速度を実現する手法であり，MIにおける最重要応用の一つである。

### 基本的な枠組み

MLFFの目標は，原子配置 $\{\mathbf{R}_i\}$ から系の全エネルギー $E$ と各原子への力 $\mathbf{F}_i = -\nabla_{\mathbf{R}_i} E$，および応力テンソル $\sigma$ を予測する関数を学習することである。Behler-Parrinelloモデル（2007年）を嚆矢として，エネルギーを各原子の局所エネルギーの和として分解（原子分解近似）する：

$$E = \sum_i \varepsilon_i(\mathcal{N}_i)$$

$\varepsilon_i$ は原子 $i$ の局所環境 $\mathcal{N}_i$（カットオフ半径内の近傍原子の配置）にのみ依存するスカラー値である。学習時の損失関数は，エネルギー・力・応力の残差の加重和として定義される：

$$\mathcal{L} = w_E \sum_{\text{config}} |E_{\text{pred}} - E_{\text{DFT}}|^2 + \frac{w_F}{3N}\sum_i \|\mathbf{F}_{i,\text{pred}} - \mathbf{F}_{i,\text{DFT}}\|^2 + w_{\sigma} \sum_{\alpha\beta} |\sigma_{\alpha\beta,\text{pred}} - \sigma_{\alpha\beta,\text{DFT}}|^2$$

$w_E, w_F, w_\sigma$ はエネルギー・力・応力に対する重み係数（通常 $w_F \gg w_E$）であり，力の学習が収束精度に最も大きく寄与する。

### 主要なモデル

ガウス近似ポテンシャル（GAP, Bartók et al. 2010）は，SOAPカーネルを用いたガウス過程回帰によりPESを表現する手法であり，シリコン，炭素（ダイヤモンド・グラファイト・非晶質），酸化物などの精密モデルとして広く使用されている。

DeePMD（Deep Potential Molecular Dynamics）は，並進・回転不変な局所座標系を陽に構築してニューラルネットワークに入力し，力場を表現する。DeePMD-kitにはDP-GENと呼ばれる能動学習ベースの訓練データ生成フレームワークが統合されており，自動的に計算が必要な配置を選択してDFT計算を行いデータセットを拡充するループを形成する。

MACEは2022〜2023年にかけて精度と効率のバランスが優れたモデルとして急速に普及しており，MACE-MP-0（2023）は90種類の元素を含む汎用基盤力場として提供されている。2025年には MACE-MP-0bのアップデート版が発表され，さらに広汎な元素・化合物に対応した汎用MLFFの実用化が進んでいる。

### データ生成と能動学習

MLFFの精度はトレーニングデータの多様性と代表性に強く依存する。ランダムな初期配置からDFTを実行するのではなく，委員会不一致度（committee disagreement）などの不確かさ指標を用いて，既存モデルが予測誤差を大きく示すような「情報量の高い配置」を優先的にサンプリングして計算する能動学習アプローチが標準的となっている。

---

## 7. ベイズ最適化と能動学習による材料探索

実験・計算コストが高い材料探索において，限られた評価回数で性能の高い材料を効率的に発見するための統計的手法がベイズ最適化（Bayesian Optimization, BO）と能動学習（Active Learning）である。

### ガウス過程代理モデル

ベイズ最適化は，評価コストが高いブラックボックス関数 $f: \mathcal{X} \to \mathbb{R}$（例えば材料物性 $y = f(\mathbf{x})$，$\mathbf{x}$ は組成パラメータや合成条件）を最適化するための逐次的フレームワークである。代理モデルとして通常ガウス過程回帰（GPR）が用いられ，これまでに評価した点 $\{(\mathbf{x}_i, y_i)\}_{i=1}^{t}$ から次の評価候補 $\mathbf{x}_{t+1}$ を決定する際に，取得関数（acquisition function）を最大化する：

$$\mathbf{x}_{t+1} = \arg\max_{\mathbf{x} \in \mathcal{X}} \alpha(\mathbf{x}; \mathcal{D}_{1:t})$$

### 取得関数

代表的な取得関数を以下に示す。

期待改善量（Expected Improvement, EI）は最もよく用いられる取得関数の一つであり，現在の最良値 $f^* = \max_i y_i$ からの改善の期待値として定義される：

$$\text{EI}(\mathbf{x}) = E[\max(f(\mathbf{x}) - f^*, 0)] = (\mu(\mathbf{x}) - f^*)\Phi(Z) + \sigma(\mathbf{x})\phi(Z)$$

$$Z = \frac{\mu(\mathbf{x}) - f^*}{\sigma(\mathbf{x})}$$

ここで，$\mu(\mathbf{x})$ と $\sigma(\mathbf{x})$ はGPRによる予測平均と予測標準偏差，$\Phi$ は標準正規分布の累積分布関数，$\phi$ はその確率密度関数である。

Upper Confidence Bound（UCB）は探索と活用のトレードオフをパラメータ $\kappa$ で制御する：

$$\text{UCB}(\mathbf{x}) = \mu(\mathbf{x}) + \kappa\,\sigma(\mathbf{x})$$

$\kappa$ が大きいと探索（未探索領域の優先）が強まり，小さいと活用（高予測値領域の優先）が強まる。

### 多目的ベイズ最適化

実際の材料開発では，複数の物性（例えば，強度と延性，バンドギャップと移動度，電気伝導率と熱伝導率）を同時に最適化するトレードオフ問題が多い。多目的ベイズ最適化では，パレートフロント（どれか一つの目的関数を改善すると他が悪化するような非支配解の集合）の推定を目的として，超体積改善量（Hypervolume Improvement, HVI）の期待値 EHVI を取得関数として用いる：

$$\text{EHVI}(\mathbf{x}) = E\!\left[\text{HVI}(\mathbf{f}(\mathbf{x}); \mathcal{P})\right]$$

$\mathcal{P}$ は現在のパレートフロント，$\text{HVI}(\cdot; \mathcal{P})$ は新たな解がパレートフロントに寄与する超体積の増加量である。BoTorch（PyTorchベースのBOライブラリ，Meta）はEHVIを含む多数の取得関数を実装しており，材料探索への応用が進んでいる。

### 能動学習とデータ効率

能動学習は，ラベルなしデータのプールから「最も情報量の高い」サンプルを選択して実験・計算を行い，モデルを逐次更新するフレームワークである。選択基準としては，GPRの予測不確かさ（分散最大化），コアセット選択（最大多様性サンプリング），委員会不一致（複数モデル間の予測分散）などが用いられる。材料探索の文脈では，ベイズ最適化が「高性能材料を発見する」目的に特化しているのに対し，能動学習は「代理モデルの全領域での精度を向上させる」目的に特化している点が異なる。実際には両者を組み合わせたハイブリッドアプローチも多い。

---

## 8. 逆設計と生成モデル

従来のMIは「与えられた材料の物性を予測する（順問題）」に注力してきたが，近年は「所望の物性をもつ材料を設計・生成する（逆問題）」への取り組みが急速に進展している。

### 潜在空間探索

変分オートエンコーダー（VAE）を用いた逆設計の代表的なフレームワークでは，材料を符号化器 $q_\phi(\mathbf{z} \mid \mathbf{x})$ によって潜在変数 $\mathbf{z} \in \mathbb{R}^d$ に圧縮し，復号化器 $p_\theta(\mathbf{x} \mid \mathbf{z})$ によって材料に再構成する。VAEの目的関数はELBO（Evidence Lower Bound）：

$$\mathcal{L}_{\text{ELBO}} = E_{q_\phi(\mathbf{z}|\mathbf{x})}[\log p_\theta(\mathbf{x}|\mathbf{z})] - D_{\text{KL}}(q_\phi(\mathbf{z}|\mathbf{x}) \| p(\mathbf{z}))$$

$D_{\text{KL}}$ はKLダイバージェンス，$p(\mathbf{z}) = \mathcal{N}(\mathbf{0}, \mathbf{I})$ は事前分布である。学習済みモデルでは，潜在空間内でベイズ最適化を行い，目標物性に対応する $\mathbf{z}^*$ を探索して $p_\theta(\mathbf{x} \mid \mathbf{z}^*)$ で逆変換することにより，所望物性をもつ新材料候補を生成できる（Gómez-Bombarelli et al., 2018の分子設計への応用が先行事例）。

### 拡散モデルによる結晶生成

2023〜2025年にかけて，スコアベース拡散モデル（Denoising Diffusion Probabilistic Model, DDPM）を結晶構造生成に適用した手法が相次いで発表された。代表的なものとして DiffCSP（Crystal Structure Prediction with Diffusion, 2023），CDVAE（Crystal Diffusion VAE, Xie et al. 2022），さらに DeepMind と Google が共同開発した GNoME（Graph Networks for Materials Exploration, Merchant et al. 2023, Science 誌掲載）が挙げられる。GNoMEは活性学習ループとGNNを組み合わせることで，22万種以上の安定な新規無機結晶構造を予測し，Materials Projectに登録された既存材料の約1.7倍の安定材料を発見したと報告している。

拡散過程を用いた結晶生成では，結晶の格子定数 $\mathbf{L}$，原子の分率座標 $\{\mathbf{r}_i\}$，元素種 $\{Z_i\}$ をそれぞれ独立に拡散・逆拡散する。分率座標は周期境界条件のもとでトーラス $[0,1)^3$ 上に存在するため，リーマン多様体上の拡散プロセスが必要となり，ラップ分布（wrapped normal distribution）を使った正確な拡散核の設計が重要な技術的課題となる。

### 強化学習との組み合わせ

生成モデルを強化学習（Reinforcement Learning）エージェントと組み合わせる手法では，物性予測モデルを報酬関数として，より高い物性をもつ構造を生成するようにエージェントを訓練する（arxiv: 2511.03112, 2025）。この方向性は，少量のラベル付きデータでも目標指向の構造生成が可能になるという利点を持ち，合成が困難な希少元素を含む系や，実験コストが非常に高い系での新規材料探索への応用が期待されている。

---

## 9. 大規模言語モデルと基盤モデル

2023〜2025年にかけて，自然言語処理の基盤モデル（Foundation Model）を材料科学に適応させる研究が急増している。

### ドメイン特化型言語モデル

MatBERTは，材料科学分野の学術論文約500万件を事前学習コーパスとするBERTベースのモデルであり，名前付きエンティティ認識（NER: 材料名・物性名・合成条件の自動抽出），文献からの構造化データ抽出，材料物性の分類などのタスクで汎用BERTを上回る性能を示す。

LLaMat（Large Language Models for Materials，2024〜2025年）は，Llama-2/3系のモデルをベースとして，約400万件の材料科学論文と結晶構造データ（CIF形式）から30億トークン規模で継続事前学習（Continued Pretraining）を行ったモデル族である。結晶構造の情報をテキストとして入力し，材料物性の予測・結晶構造生成・材料科学のQAタスクに対応する。さらに175,000件の材料QAペアによる指示学習（Instruction Tuning）を経て，Nature Machine Intelligence誌（2026年）に掲載された。

マルチモーダルモデルMatterChat（2026年）は，原子構造データ（グラフ表現）とテキストを統合したマルチモーダル入力に対応し，高精度な物性予測と材料合成条件の提案を同時に実現する。

### LLMによる自律的な研究支援

LLMの生成能力を材料科学研究の各フェーズ（文献調査，仮説立案，実験設計，データ解析，論文執筆補助）に適用する研究が急速に発展している。LLaMP（LLM Made Powerful for High-fidelity Materials Knowledge Retrieval, 2024, arxiv: 2401.17244）は，Materials Projectとのリトリーバル拡張生成（RAG: Retrieval-Augmented Generation）を実現し，最新の計算材料データをLLMの文脈として参照しながら根拠のある回答生成を行う。

さらに，AIエージェント（Function Calling / Tool Use）と自動化ロボット実験装置を接続し，LLMが仮説を立案 → 実験条件をロボットに指示 → 結果を解析 → 次の仮説へ，というサイクルを自律的に駆動するシステム（self-driving laboratoryとの統合）が2025年以降の新しいフロンティアとして注目されている（OAE Publishing, 2025）。

---

## 10. 自律実験とロボティクスの統合

マテリアルズ・インフォマティクスの究極的な目指す方向として，AI主導の自律実験システム（Self-Driving Laboratory, SDL）がある。SDLは，計算予測・実験合成・キャラクタリゼーション・データ解析の全サイクルを人間の介入を最小限にして自動的に実行し，閉ループで材料探索を加速するシステムである。

### SDLの構成要素

SDLは以下の要素が有機的に結合することで成立する。自動合成ロボット（液体ハンドリングロボット，流体合成装置，薄膜成膜装置など）は，AIが提案した合成条件を物理的に実行する。自動キャラクタリゼーション装置（XRD，蛍光X線，UV-Vis，電気化学測定など）は合成した材料の物性を即座に計測する。データ管理システムは生成された実験データを自動的にデータベースへ格納し，機械学習モデルの再訓練・更新に利用する。意思決定エンジン（ベイズ最適化，能動学習，またはLLMエージェント）は次に試みるべき実験条件を提案する。

代表的な実装事例として，カーネギーメロン大学のA-Lab（Autonomous Laboratory，2023年 Nature誌掲載, Szymanski et al. 2023）は，セラミックス焼結材料の多成分組成探索においてSDLが17日間で41種の新規材料を合成・確認したことを報告した。NC State Universityのグループは2025年に，SDLが従来比10倍以上のデータ取得速度を達成する新手法を発表している（NC State News, 2025）。

### 閉ループ最適化の数理

SDLの閉ループ探索は，材料の設計変数空間 $\mathcal{X}$（組成，合成条件，構造パラメータなど）上の最適化問題：

$$\mathbf{x}^* = \arg\max_{\mathbf{x} \in \mathcal{X}} f(\mathbf{x})$$

として定式化できる。各サイクル $t$ で，現在のデータセット $\mathcal{D}_{1:t}$ に基づいてGPRまたはGNNで代理モデルを構築し，取得関数 $\alpha(\mathbf{x}; \mathcal{D}_{1:t})$ を最大化することで次の実験点 $\mathbf{x}_{t+1}$ を決定する。実験・計算コスト $c(\mathbf{x})$ が一様でない場合（例えば，高温高圧合成は低温溶液合成より大幅にコストが高い），コストを考慮した取得関数 $\alpha(\mathbf{x}) / c(\mathbf{x})$ を用いるコスト対効果ベイズ最適化が有効である。

---

## まとめと展望

マテリアルズ・インフォマティクスは，MGIの発足（2011年）を出発点として，材料データベースの整備・機械学習モデルの高度化・ベイズ最適化による効率的探索・生成モデルによる逆設計・LLMとの統合・自律実験システムへと，約15年の間に急速な発展を遂げた。現在は，単なる「データで物性を当てる予測ツール」を超え，材料研究そのものの方法論を根本から変革する研究インフラとしての地位を確立しつつある。

今後の展望として，(1) 汎用基盤力場（MACE-MP-0等）のさらなる精度向上と全元素への拡張，(2) マルチモーダル基盤モデル（テキスト・構造・スペクトル・プロセス条件の統合），(3) 実験合成のロボット化・自律化（SDL 2.0）と計算予測の深統合，(4) 量子化学計算を超える精度を機械学習で達成するための積極的データ収集戦略，(5) 説明可能AI（Explainable AI, XAI）による材料科学的理解の深化，が主要な研究フロンティアとして挙げられる。マテリアルズ・インフォマティクスは，実験・計算・データ科学の三位一体の融合研究領域として，次世代材料の発見・設計を加速する中核的プラットフォームであり続けるだろう。

---

## その他参考文献

- Ward, L. et al., "A general-purpose machine learning framework for predicting properties of inorganic materials," npj Comput. Mater. 2, 16028 (2016). [Magpie]
- Xie, T. & Grossman, J. C., "Crystal Graph Convolutional Neural Networks for an Accurate and Interpretable Prediction of Material Properties," Phys. Rev. Lett. 120, 145301 (2018). [CGCNN]
- Chen, C. et al., "Graph Networks as a Universal Machine Learning Framework for Molecules and Crystals," Chem. Mater. 31, 3564 (2019). [MEGNet]
- Batzner, S. et al., "E(3)-equivariant graph neural networks for data-efficient and accurate interatomic potentials," Nat. Commun. 13, 2453 (2022). [NequIP]
- Dunn, A. et al., "Benchmarking Materials Property Prediction Methods: The Matbench Test Set and Automatminer Reference Algorithm," npj Comput. Mater. 6, 138 (2020). [Matbench]
- Merchant, A. et al., "Scaling deep learning for materials discovery," Nature 624, 80–85 (2023). [GNoME]
- Szymanski, N. J. et al., "An autonomous laboratory for the accelerated synthesis of novel materials," Nature 624, 86–91 (2023). [A-Lab]
- Bartók, A. P. et al., "Gaussian Approximation Potentials: The Accuracy of Quantum Mechanics, without the Electrons," Phys. Rev. Lett. 104, 136403 (2010). [GAP]
- Batatia, I. et al., "MACE: Higher Order Equivariant Message Passing Neural Networks for Fast and Accurate Force Fields," NeurIPS 2022.
- Gilmer, J. et al., "Neural Message Passing for Quantum Chemistry," ICML 2017.
- Behler, J. & Parrinello, M., "Generalized Neural-Network Representation of High-Dimensional Potential-Energy Surfaces," Phys. Rev. Lett. 98, 146401 (2007).
- Materials Project公式サイト: https://materialsproject.org/
- AFLOW公式サイト: http://aflow.org/
- OQMD公式サイト: https://oqmd.org/
- Matminer公式ドキュメント: https://hackingmaterials.lbl.gov/matminer/
- LabCode「マテリアルズインフォマティクス（MI）入門」シリーズ: https://labo-code.com/materials-informatics/
- NIMS MI2I プロジェクト: https://www.nims.go.jp/MII-I/
