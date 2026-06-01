# カルマンフィルター：線形最適推定から非線形拡張・機械学習融合まで

カルマンフィルターは，ノイズを含む観測データから隠れた状態変数を逐次的・最適に推定する再帰的アルゴリズムであり，1960年にR. E. Kalmanが提案して以来，制御工学・信号処理・ナビゲーション・気象学・機械学習と広範な分野の基盤技術として機能し続けている。線形ガウス系においては最小分散不偏推定量として理論的最適性が保証されており，計算コストが低く実装が容易なため，宇宙開発から自動運転・バッテリー管理に至るまで不可欠な推定器として用いられている。

## 参考ドキュメント

1. 足立修一「線形カルマンフィルタの基礎」計測と制御, Vol. 56, No. 9, pp. 632–637 (2017)  
   https://www.jstage.jst.go.jp/article/sicejl/56/9/56_632/_pdf

2. 片山徹「非線形カルマンフィルタの基礎」計測と制御, Vol. 56, No. 9, pp. 638–643 (2017)  
   https://www.jstage.jst.go.jp/article/sicejl/56/9/56_638/_pdf

3. Kalman, R. E. "A New Approach to Linear Filtering and Prediction Problems," ASME Journal of Basic Engineering, Vol. 82, No. 1, pp. 35–45 (1960)

---

## 1. 歴史的背景

Rudolf Emil Kalman（1930–2016）は1960年，ASME Journal of Basic Engineeringに論文 "A New Approach to Linear Filtering and Prediction Problems" を発表した。この論文でKalmanは，Norbert Wienerが1940年代に周波数領域で定式化していたウィーナーフィルタリング問題を，有限次元の状態空間表現と時間領域の逐次アルゴリズムとして再定式化した。ウィーナーフィルターは定常信号・無限過去データを前提とする周波数域の手法であったが，カルマンフィルターは非定常系・有限観測時間においても厳密な最適推定を実現した。

翌1961年には，KalmanとBucyが連続時間版であるKalman-Bucyフィルターを提案し（"New Results in Linear Filtering and Prediction Theory," ASME J. Basic Eng., 83, 95–108, 1961），確率微分方程式に基づく連続時間システムへの適用を可能にした。連続時間系では，誤差共分散 $P(t)$ の時間発展が行列リカッチ微分方程式

$$\dot{P}(t) = F P(t) + P(t) F^{\top} - P(t) H^{\top} R^{-1} H P(t) + Q$$

で記述される。

1960年代初頭，NASAはアポロ月面探査計画においてカルマンフィルターを宇宙船の軌道推定に採用した。宇宙機の軌道状態（位置・速度）を地上からのレーダー観測と推力モデルによって逐次更新するこの手法は，月面着陸の成功を支える重要な技術的基盤の一つとなった。その後，カルマンフィルターはGPS航法，航空機飛行制御，気象データ同化，金融時系列，自動運転車の自己位置推定，リチウムイオン電池のSOC（State of Charge）推定など，現代の基幹技術に深く組み込まれている。

Kalmanは2008年にNational Medal of Science（米国），2009年にKyle Prize，2012年にMillennium Technology Prize（フィンランド）を受賞した。2016年の逝去後も，その理論的遺産はKalmanNet（2022年）やRecursive KalmanNet（2025年）など機械学習との融合研究として発展を続けている。

---

## 2. 状態空間表現

カルマンフィルターの数学的基礎となるのは，離散時間線形確率システムの状態空間表現である。システムの内部状態を陽に定義し，状態の時間発展と観測の関係をそれぞれ独立した方程式で記述する点が特徴である。

### 状態方程式（システムモデル）

$$\mathbf{x}_{k} = \mathbf{F}_{k}\,\mathbf{x}_{k-1} + \mathbf{B}_{k}\,\mathbf{u}_{k} + \mathbf{w}_{k}$$

各記号の意味は次の通りである。$\mathbf{x}_{k} \in \mathbb{R}^{n}$ は時刻 $k$ の状態ベクトル（例えば位置・速度・温度など直接観測できない内部変数），$\mathbf{F}_{k} \in \mathbb{R}^{n \times n}$ は状態遷移行列（1ステップ先の状態への線形写像），$\mathbf{B}_{k} \in \mathbb{R}^{n \times l}$ は制御入力行列，$\mathbf{u}_{k} \in \mathbb{R}^{l}$ は既知の外部制御入力，$\mathbf{w}_{k} \in \mathbb{R}^{n}$ は過程ノイズである。過程ノイズはモデル化されていない外乱や系の不確かさを表し，

$$\mathbf{w}_{k} \sim \mathcal{N}(\mathbf{0},\,\mathbf{Q}_{k})$$

のガウス分布に従うと仮定する。$\mathbf{Q}_{k} \in \mathbb{R}^{n \times n}$ は過程ノイズ共分散行列（正半定値）である。

### 観測方程式（観測モデル）

$$\mathbf{z}_{k} = \mathbf{H}_{k}\,\mathbf{x}_{k} + \mathbf{v}_{k}$$

$\mathbf{z}_{k} \in \mathbb{R}^{m}$ は時刻 $k$ の観測ベクトル，$\mathbf{H}_{k} \in \mathbb{R}^{m \times n}$ は観測行列（状態を観測空間へ射影する線形写像），$\mathbf{v}_{k} \in \mathbb{R}^{m}$ は観測ノイズ（センサーの測定誤差）であり，

$$\mathbf{v}_{k} \sim \mathcal{N}(\mathbf{0},\,\mathbf{R}_{k})$$

と仮定する。$\mathbf{R}_{k} \in \mathbb{R}^{m \times m}$ は観測ノイズ共分散行列（正定値）である。

過程ノイズと観測ノイズは互いに独立かつ時刻をまたいで無相関と仮定する：

$$E[\mathbf{w}_{k}\,\mathbf{v}_{j}^{\top}] = \mathbf{0},\quad E[\mathbf{w}_{k}\,\mathbf{w}_{j}^{\top}] = \mathbf{Q}_{k}\delta_{kj},\quad E[\mathbf{v}_{k}\,\mathbf{v}_{j}^{\top}] = \mathbf{R}_{k}\delta_{kj}$$

ここで $\delta_{kj}$ はクロネッカーのデルタ（$k=j$ のとき1，それ以外は0）である。

初期条件として，

$$\mathbf{x}_{0} \sim \mathcal{N}(\hat{\mathbf{x}}_{0|0},\,\mathbf{P}_{0|0})$$

が与えられているものとする。$\hat{\mathbf{x}}_{0|0}$ は初期状態の事前推定値，$\mathbf{P}_{0|0}$ はその推定誤差共分散行列である。

なお，この状態空間表現は非常に汎用性が高く，位置追跡・信号追跡・経済時系列・温度場推定など，「観測できない内部状態があり，それがノイズを伴う観測を通じて間接的に知られる」構造をもつあらゆる問題に適用できる。

---

## 3. 線形カルマンフィルターの導出と逐次更新式

カルマンフィルターは，ベイズ推論の観点からは逐次的なベイズ更新の解析的実装として理解できる。線形ガウス系では，全ての事後分布がガウス分布に留まるため，平均ベクトルと共分散行列の更新だけで分布が完全に記述できる。

### 予測ステップの導出

時刻 $k-1$ の事後分布 $p(\mathbf{x}_{k-1} \mid \mathbf{Z}_{k-1}) = \mathcal{N}(\hat{\mathbf{x}}_{k-1|k-1},\, \mathbf{P}_{k-1|k-1})$ から，Chapman-Kolmogorov方程式を用いて時刻 $k$ の予測分布（事前分布）を求める：

$$p(\mathbf{x}_{k} \mid \mathbf{Z}_{k-1}) = \int p(\mathbf{x}_{k} \mid \mathbf{x}_{k-1})\, p(\mathbf{x}_{k-1} \mid \mathbf{Z}_{k-1})\, d\mathbf{x}_{k-1}$$

状態方程式の線形性とガウス性から，この積分は解析的に計算でき：

$$\hat{\mathbf{x}}_{k|k-1} = \mathbf{F}_{k}\,\hat{\mathbf{x}}_{k-1|k-1} + \mathbf{B}_{k}\,\mathbf{u}_{k}$$

$$\mathbf{P}_{k|k-1} = \mathbf{F}_{k}\,\mathbf{P}_{k-1|k-1}\,\mathbf{F}_{k}^{\top} + \mathbf{Q}_{k}$$

$\hat{\mathbf{x}}_{k|k-1}$ は時刻 $k-1$ までの情報を用いた時刻 $k$ の状態予測値，$\mathbf{P}_{k|k-1}$ はその予測誤差共分散行列である。$\mathbf{P}_{k|k-1}$ の式において，$\mathbf{F}_{k}\,\mathbf{P}_{k-1|k-1}\,\mathbf{F}_{k}^{\top}$ は前時刻の不確かさが状態遷移を通じて伝播した寄与であり，$\mathbf{Q}_{k}$ はシステム自身のランダム変動による不確かさの増加分を表す。

### 更新ステップの導出

新たな観測 $\mathbf{z}_{k}$ が得られたとき，ベイズの定理より事後分布は：

$$p(\mathbf{x}_{k} \mid \mathbf{Z}_{k}) \propto p(\mathbf{z}_{k} \mid \mathbf{x}_{k})\, p(\mathbf{x}_{k} \mid \mathbf{Z}_{k-1})$$

観測方程式の線形性とガウス性から，この積も再びガウス分布となる。2つのガウス分布の積を完全平方（completing the square）することで，以下の更新式が導出される：

イノベーション（観測残差）：
$$\tilde{\mathbf{y}}_{k} = \mathbf{z}_{k} - \mathbf{H}_{k}\,\hat{\mathbf{x}}_{k|k-1}$$

イノベーション共分散：
$$\mathbf{S}_{k} = \mathbf{H}_{k}\,\mathbf{P}_{k|k-1}\,\mathbf{H}_{k}^{\top} + \mathbf{R}_{k}$$

カルマンゲイン：
$$\mathbf{K}_{k} = \mathbf{P}_{k|k-1}\,\mathbf{H}_{k}^{\top}\,\mathbf{S}_{k}^{-1}$$

状態更新：
$$\hat{\mathbf{x}}_{k|k} = \hat{\mathbf{x}}_{k|k-1} + \mathbf{K}_{k}\,\tilde{\mathbf{y}}_{k}$$

共分散更新（Joseph形式・数値安定版）：
$$\mathbf{P}_{k|k} = (\mathbf{I} - \mathbf{K}_{k}\,\mathbf{H}_{k})\,\mathbf{P}_{k|k-1}\,(\mathbf{I} - \mathbf{K}_{k}\,\mathbf{H}_{k})^{\top} + \mathbf{K}_{k}\,\mathbf{R}_{k}\,\mathbf{K}_{k}^{\top}$$

### 各式の直感的意味

イノベーション $\tilde{\mathbf{y}}_{k}$ は「予測との差」であり，観測が予測通りであれば0に近く，外れていれば大きな値をとる。カルマンゲイン $\mathbf{K}_{k}$ はこのイノベーションをどの程度信用して状態を修正するかを決定する行列である。$\mathbf{R}_{k}$ が小さい（観測精度が高い）場合は $\mathbf{K}_{k}$ が大きくなって観測を重視し，逆に $\mathbf{P}_{k|k-1}$ が小さい（予測の信頼性が高い）場合は $\mathbf{K}_{k}$ が小さくなって予測を重視する。これは，より信頼できる情報源を自動的に重視するベイズ的合理性の体現である。

共分散更新の標準形 $\mathbf{P}_{k|k} = (\mathbf{I} - \mathbf{K}_{k}\,\mathbf{H}_{k})\,\mathbf{P}_{k|k-1}$ は計算がシンプルだが，数値誤差が蓄積すると $\mathbf{P}_{k|k}$ の正定値性が失われる恐れがある。Joseph形式は対称正定値性を保証するため，実装上はこちらを推奨する。

---

## 4. 最適性・定常解・収束条件

### 最適性の保証

カルマンフィルターの最適性は2つの観点から議論できる。

第1は，線形ガウス系における厳密な最小平均二乗誤差（MMSE）最適性である。線形ガウス状態空間モデルでは，事後分布 $p(\mathbf{x}_{k} \mid \mathbf{Z}_{k})$ が常にガウス分布であり，その平均がMMSE推定量（事後期待値）と一致する。カルマンフィルターはまさにこの平均と共分散を逐次更新するアルゴリズムであるから，MMSE最適であることが保証される。

第2は，ガウス性を仮定しない場合の最良線形不偏推定量（BLUE）としての最適性である。カルマンゲインは，更新後の誤差共分散のトレース（全成分の平均二乗誤差の和）

$$\text{tr}(\mathbf{P}_{k|k}) = \text{tr}\left[(\mathbf{I} - \mathbf{K}_{k}\mathbf{H}_{k})\mathbf{P}_{k|k-1}(\mathbf{I} - \mathbf{K}_{k}\mathbf{H}_{k})^{\top} + \mathbf{K}_{k}\mathbf{R}_{k}\mathbf{K}_{k}^{\top}\right]$$

を $\mathbf{K}_{k}$ に関して最小化することで導出される。偏微分をとってゼロとおくと，

$$\frac{\partial}{\partial \mathbf{K}_{k}} \text{tr}(\mathbf{P}_{k|k}) = -2\,\mathbf{P}_{k|k-1}\,\mathbf{H}_{k}^{\top} + 2\,\mathbf{K}_{k}\,\mathbf{S}_{k} = \mathbf{0}$$

これを解くとまさに $\mathbf{K}_{k} = \mathbf{P}_{k|k-1}\,\mathbf{H}_{k}^{\top}\,\mathbf{S}_{k}^{-1}$ が得られ，ガウス性を要求せずともカルマンゲインが全線形不偏推定量の中で最小分散を与えることがわかる。

### 定常カルマンフィルターと離散時間代数リカッチ方程式

時不変系（$\mathbf{F}_{k} = \mathbf{F}$，$\mathbf{H}_{k} = \mathbf{H}$，$\mathbf{Q}_{k} = \mathbf{Q}$，$\mathbf{R}_{k} = \mathbf{R}$）において，予測誤差共分散行列 $\mathbf{P}_{k|k-1}$ は初期値に依存せず，十分な時間が経過すると定常値 $\mathbf{P}_{\infty}$ に収束する。この定常値は離散時間代数リカッチ方程式（DARE）：

$$\mathbf{P}_{\infty} = \mathbf{F}\,\mathbf{P}_{\infty}\,\mathbf{F}^{\top} + \mathbf{Q} - \mathbf{F}\,\mathbf{P}_{\infty}\,\mathbf{H}^{\top}\,(\mathbf{H}\,\mathbf{P}_{\infty}\,\mathbf{H}^{\top} + \mathbf{R})^{-1}\,\mathbf{H}\,\mathbf{P}_{\infty}\,\mathbf{F}^{\top}$$

の正半定値解である。対応する定常カルマンゲインは：

$$\mathbf{K}_{\infty} = \mathbf{P}_{\infty}\,\mathbf{H}^{\top}\,(\mathbf{H}\,\mathbf{P}_{\infty}\,\mathbf{H}^{\top} + \mathbf{R})^{-1}$$

$\mathbf{K}_{\infty}$ を固定ゲインとして用いることで，毎時刻の共分散伝播計算を省略でき，計算コストを大幅に削減できる。連続時間系では対応する量として連続時間代数リカッチ方程式（CARE）$\mathbf{F}\,\mathbf{P}_{\infty} + \mathbf{P}_{\infty}\,\mathbf{F}^{\top} - \mathbf{P}_{\infty}\,\mathbf{H}^{\top}\,\mathbf{R}^{-1}\,\mathbf{H}\,\mathbf{P}_{\infty} + \mathbf{Q} = \mathbf{0}$ が成立する。

### 収束条件・可観測性・可制御性

定常カルマンフィルターが安定に収束するための重要な条件として，可観測性（observability）と可制御性（controllability）がある。

システム $(\mathbf{F}, \mathbf{H})$ の可観測行列は：

$$\mathcal{O} = \begin{bmatrix} \mathbf{H} \\ \mathbf{H}\,\mathbf{F} \\ \mathbf{H}\,\mathbf{F}^{2} \\ \vdots \\ \mathbf{H}\,\mathbf{F}^{n-1} \end{bmatrix} \in \mathbb{R}^{mn \times n}$$

で与えられ，$\text{rank}(\mathcal{O}) = n$ のとき完全可観測という。これは有限個の観測データから初期状態を一意に決定できることと等価であり，直感的には「すべての内部状態が観測データに何らかの形で影響を与えている」状態である。

可制御行列（ノイズ系に対しては $\mathbf{Q} = \mathbf{G}\mathbf{G}^{\top}$ とした $(\mathbf{F}, \mathbf{G})$ の対）は：

$$\mathcal{C} = \begin{bmatrix} \mathbf{G} & \mathbf{F}\,\mathbf{G} & \mathbf{F}^{2}\,\mathbf{G} & \cdots & \mathbf{F}^{n-1}\,\mathbf{G} \end{bmatrix} \in \mathbb{R}^{n \times pn}$$

$\text{rank}(\mathcal{C}) = n$ のとき完全可制御という。これは過程ノイズがすべての状態に十分に影響できることを意味する。

完全可観測かつ完全可制御であれば，DAREは一意の正定値解 $\mathbf{P}_{\infty} \succ 0$ をもち，$\mathbf{P}_{k|k-1}$ は任意の初期値から指数的に $\mathbf{P}_{\infty}$ に収束し，更新則で定まるフィルタ行列 $(\mathbf{I} - \mathbf{K}_{\infty}\mathbf{H})\mathbf{F}$ の全固有値は単位円内に入る（漸近安定）。実用上は，完全可観測性よりも弱い条件である可検出性（detectable：不安定モードが観測可能であること）が成り立てば，DAREの正半定値解の存在と安定性が保証される。

---

## 5. 拡張カルマンフィルター（EKF）

実用的なシステムの多くは非線形であるため，標準カルマンフィルターをそのまま適用できない。拡張カルマンフィルター（Extended Kalman Filter, EKF）は，非線形関数を現在の推定値周りで1次テイラー展開（局所線形化）することでカルマンフィルターの枠組みを非線形系へ拡張した手法であり，実装の容易さから現在も広く使用されている。

### 非線形状態空間モデル

$$\mathbf{x}_{k} = f(\mathbf{x}_{k-1},\, \mathbf{u}_{k}) + \mathbf{w}_{k}$$

$$\mathbf{z}_{k} = h(\mathbf{x}_{k}) + \mathbf{v}_{k}$$

$f: \mathbb{R}^{n} \to \mathbb{R}^{n}$ および $h: \mathbb{R}^{n} \to \mathbb{R}^{m}$ は任意の非線形可微分関数である。

### ヤコビアンによる線形化

EKFは，$f$ と $h$ を現在の推定値周りで1次テイラー展開し，ヤコビアン行列（偏微分行列）に置き換える：

$$\mathbf{F}_{k} = \left.\frac{\partial f}{\partial \mathbf{x}}\right|_{\hat{\mathbf{x}}_{k-1|k-1},\,\mathbf{u}_{k}} \in \mathbb{R}^{n \times n}, \quad \mathbf{H}_{k} = \left.\frac{\partial h}{\partial \mathbf{x}}\right|_{\hat{\mathbf{x}}_{k|k-1}} \in \mathbb{R}^{m \times n}$$

$(\mathbf{F}_{k})_{ij} = \partial f_{i}/\partial x_{j}$，$(\mathbf{H}_{k})_{ij} = \partial h_{i}/\partial x_{j}$ であり，これらは各推定点における接線方向の感度行列を表す。

### EKFのアルゴリズム

予測：
$$\hat{\mathbf{x}}_{k|k-1} = f(\hat{\mathbf{x}}_{k-1|k-1},\, \mathbf{u}_{k})$$
$$\mathbf{P}_{k|k-1} = \mathbf{F}_{k}\,\mathbf{P}_{k-1|k-1}\,\mathbf{F}_{k}^{\top} + \mathbf{Q}_{k}$$

更新（標準形と同一構造）：
$$\tilde{\mathbf{y}}_{k} = \mathbf{z}_{k} - h(\hat{\mathbf{x}}_{k|k-1}), \quad \mathbf{S}_{k} = \mathbf{H}_{k}\,\mathbf{P}_{k|k-1}\,\mathbf{H}_{k}^{\top} + \mathbf{R}_{k}$$
$$\mathbf{K}_{k} = \mathbf{P}_{k|k-1}\,\mathbf{H}_{k}^{\top}\,\mathbf{S}_{k}^{-1}$$
$$\hat{\mathbf{x}}_{k|k} = \hat{\mathbf{x}}_{k|k-1} + \mathbf{K}_{k}\,\tilde{\mathbf{y}}_{k}, \quad \mathbf{P}_{k|k} = (\mathbf{I} - \mathbf{K}_{k}\,\mathbf{H}_{k})\,\mathbf{P}_{k|k-1}$$

### EKFの特性と限界

EKFは1次近似精度しか保証しないため，非線形性が強い場合や推定誤差が大きい場合には線形化誤差が蓄積し，共分散が過小評価されてフィルターが発散するリスクがある。また，ヤコビアン行列を解析的に導出する必要があり，複雑なモデルでは実装の負担が大きい（数値微分で代用可能だが計算コストが増大する）。

それでもEKFが広く用いられる理由は，適度な非線形性のもとでは十分な精度を発揮すること，計算量が線形KFと同等（$O(n^{3})$）であること，そして数十年にわたる実績から豊富なチューニング経験が蓄積されていることにある。

---

## 6. アンセンテッドカルマンフィルター（UKF）

アンセンテッドカルマンフィルター（Unscented Kalman Filter, UKF）は，Julier & Uhlmann（1997）が提案した手法であり，ヤコビアン行列を使わずに確率分布の非線形伝播をより正確に近似する。「アンセンテッド変換（Unscented Transform, UT）」と呼ばれる決定論的サンプリングによって分布の平均・共分散を3次精度まで正確に伝播できる点がEKFとの根本的な違いである。

### シグマ点の選択

$n$ 次元のガウス分布 $\mathcal{N}(\hat{\mathbf{x}},\, \mathbf{P})$ を代表する $2n+1$ 個のシグマ点を以下のように決定論的に選ぶ：

$$\boldsymbol{\sigma}^{(0)} = \hat{\mathbf{x}}$$

$$\boldsymbol{\sigma}^{(i)} = \hat{\mathbf{x}} + \left(\sqrt{(n+\lambda)\mathbf{P}}\right)_{i}, \quad i = 1, \ldots, n$$

$$\boldsymbol{\sigma}^{(i+n)} = \hat{\mathbf{x}} - \left(\sqrt{(n+\lambda)\mathbf{P}}\right)_{i}, \quad i = 1, \ldots, n$$

$\left(\sqrt{\cdot}\right)_{i}$ は行列の Cholesky 分解の第 $i$ 列，$\lambda = \alpha^{2}(n + \kappa) - n$ はスケーリングパラメータである。$\alpha$（通常 $10^{-3}$）はシグマ点が平均からどれだけ広がるかを制御し，$\kappa$ は通常0または $3-n$，$\beta$（ガウス分布では $\beta = 2$ が最適）は高次モーメントの情報を取り込む。

各シグマ点に対応する重みは：

$$W_{m}^{(0)} = \frac{\lambda}{n+\lambda},\quad W_{c}^{(0)} = \frac{\lambda}{n+\lambda} + (1-\alpha^{2}+\beta)$$

$$W_{m}^{(i)} = W_{c}^{(i)} = \frac{1}{2(n+\lambda)}, \quad i = 1, \ldots, 2n$$

$W_{m}^{(i)}$ は平均の計算に用いる重み，$W_{c}^{(i)}$ は共分散の計算に用いる重みである。

### アンセンテッド変換の実行

各シグマ点を非線形関数 $g$（$f$ または $h$）に通し，変換後のシグマ点 $\boldsymbol{\gamma}^{(i)} = g(\boldsymbol{\sigma}^{(i)})$ を得る。変換後の分布の平均と共分散は：

$$\hat{\mathbf{y}} = \sum_{i=0}^{2n} W_{m}^{(i)}\,\boldsymbol{\gamma}^{(i)}$$

$$\mathbf{P}_{y} = \sum_{i=0}^{2n} W_{c}^{(i)}\,(\boldsymbol{\gamma}^{(i)} - \hat{\mathbf{y}})(\boldsymbol{\gamma}^{(i)} - \hat{\mathbf{y}})^{\top}$$

この近似は，1変数の場合に任意の解析関数に対してテイラー展開の3次項まで正確に一致することが証明されており，EKFの1次近似を超える精度をもつ。

### UKFのアルゴリズム

予測では，前時刻の推定値からシグマ点を生成し，状態遷移 $f$ を適用して予測平均 $\hat{\mathbf{x}}_{k|k-1}$ と予測共分散 $\mathbf{P}_{k|k-1}$ を計算する。更新では，予測シグマ点を観測関数 $h$ に通して予測観測の平均・共分散・交差共分散を計算し，カルマンゲインを構成する：

$$\mathbf{K}_{k} = \mathbf{P}_{xz,k}\,\mathbf{S}_{k}^{-1}, \quad \mathbf{P}_{xz,k} = \sum_{i=0}^{2n} W_{c}^{(i)}\,(\boldsymbol{\sigma}_{k|k-1}^{(i)} - \hat{\mathbf{x}}_{k|k-1})(h(\boldsymbol{\sigma}_{k|k-1}^{(i)}) - \hat{\mathbf{z}}_{k|k-1})^{\top}$$

状態更新と共分散更新は EKF と同形式で行う。

UKFはヤコビアン行列を必要としないため，非微分可能な関数にも適用でき，ヤコビアンの導出が困難なシステムに対して特に有利である。計算量は $O(n^{3})$ で EKF と同程度だが，シグマ点の個数が $2n+1$ であるため次元が大きくなるとシグマ点数が増大し，高次元（$n > 100$ 程度）では実用的でない。

---

## 7. アンサンブルカルマンフィルターと粒子フィルター

線形・ガウス仮定の緩和と高次元化への対応を目的として，確率的サンプリングに基づく2つの重要な手法が発展している。

### アンサンブルカルマンフィルター（EnKF）

アンサンブルカルマンフィルター（Ensemble Kalman Filter, EnKF）はEvensen（1994）が気象データ同化向けに提案した手法で，$N$ 個のアンサンブルメンバー $\{\mathbf{x}_{k}^{(j)}\}_{j=1}^{N}$ によって確率分布を近似する。

予測：
$$\mathbf{x}_{k|k-1}^{(j)} = f(\mathbf{x}_{k-1|k-1}^{(j)},\, \mathbf{u}_{k}) + \boldsymbol{\epsilon}_{k}^{(j)}, \quad \boldsymbol{\epsilon}_{k}^{(j)} \sim \mathcal{N}(\mathbf{0},\, \mathbf{Q}_{k})$$

アンサンブルから共分散を経験的に推定：
$$\hat{\mathbf{x}}_{k|k-1} = \frac{1}{N}\sum_{j=1}^{N}\mathbf{x}_{k|k-1}^{(j)}, \quad \mathbf{P}_{k|k-1} \approx \frac{1}{N-1}\sum_{j=1}^{N}(\mathbf{x}_{k|k-1}^{(j)} - \hat{\mathbf{x}}_{k|k-1})(\mathbf{x}_{k|k-1}^{(j)} - \hat{\mathbf{x}}_{k|k-1})^{\top}$$

更新では，摂動を加えた確率的観測 $\mathbf{z}_{k}^{(j)} = \mathbf{z}_{k} + \boldsymbol{\eta}_{k}^{(j)}$（$\boldsymbol{\eta}_{k}^{(j)} \sim \mathcal{N}(\mathbf{0},\mathbf{R}_{k})$）を用いて各メンバーを個別に更新：

$$\mathbf{x}_{k|k}^{(j)} = \mathbf{x}_{k|k-1}^{(j)} + \mathbf{K}_{k}\,(\mathbf{z}_{k}^{(j)} - h(\mathbf{x}_{k|k-1}^{(j)}))$$

EnKFの最大の利点は，状態次元 $n \sim 10^{7}$〜$10^{9}$ の超高次元系（数値気象予測モデルなど）において，$n \times n$ 行列を陽に保持・演算する必要がなく，アンサンブルサイズ $N = O(10^{2}$〜$10^{3})$ で現実的な計算量を実現できる点にある。ただし，アンサンブルは低ランク近似であるため，局所化（localization：遠距離の格子点間の疑似相関を抑制する操作）と膨張（inflation：共分散の過小評価を補正する操作）が実用上不可欠である。

### 粒子フィルター（PF）

粒子フィルター（Particle Filter, PF）はシーケンシャル・モンテカルロ（SMC）法とも呼ばれ，ガウス性を一切仮定しない最も一般的なベイズ推定手法である。

重み付きサンプル（粒子） $\{(\mathbf{x}_{k}^{(i)},\, w_{k}^{(i)})\}_{i=1}^{N}$ によって事後分布を近似する：

$$p(\mathbf{x}_{k} \mid \mathbf{Z}_{k}) \approx \sum_{i=1}^{N} w_{k}^{(i)}\, \delta(\mathbf{x}_{k} - \mathbf{x}_{k}^{(i)})$$

各粒子を状態遷移モデルで伝播させ（予測），新しい観測に応じて重みを更新（$w_{k}^{(i)} \propto p(\mathbf{z}_{k} \mid \mathbf{x}_{k}^{(i)})$），重みの偏りが大きくなったらリサンプリングを行う。粒子数 $N \to \infty$ の極限で真の事後分布に弱収束することが保証されている。

しかし，高次元空間では粒子の縮退（ほぼ全粒子の重みがゼロに近くなる現象）が顕著となり，必要な粒子数が状態次元に対して指数的に増大する（次元の呪い）。低〜中次元（$n < 30$ 程度）かつ非ガウスノイズが重要な場面（例：マルチモーダル分布，突発的なジャンプを含む系）に適する。

### 手法比較

| 特性 | 線形KF | EKF | UKF | EnKF | 粒子フィルター |
|------|--------|-----|-----|------|--------------|
| 対応モデル | 線形ガウス | 弱非線形ガウス | 非線形ガウス | 非線形・超高次元 | 非線形・非ガウス |
| 近似精度 | 厳密最適 | 1次近似 | 3次近似 | モンテカルロ | サンプル数に依存 |
| 計算量 | $O(n^{3})$ | $O(n^{3})$ | $O(n^{3})$ | $O(Nn^{2})$ | $O(Nm)$ |
| 高次元適用 | 可 | 条件付き | 困難 | 可（$n\sim 10^{7}$） | 困難 |
| ガウス性仮定 | 必要 | 必要 | 必要 | 近似的に必要 | 不要 |
| 主な用途 | 制御・航法 | 自動運転・航法 | SOC推定・ロボット | 気象・海洋 | 追跡・SLAM |

---

## 8. 平滑化とノイズパラメータ推定

### Rauch-Tung-Striebel（RTS）平滑化

カルマンフィルターは因果的（causal）な推定器であり，時刻 $k$ の推定には時刻 $k$ までの観測しか用いない。バッチ処理が許される場合は，全観測 $\mathbf{Z}_{N} = \{\mathbf{z}_{1}, \ldots, \mathbf{z}_{N}\}$ を用いた事後平滑化（smoothing）によって，全時刻の推定精度を事後的に向上できる。

RTSスムーザーは，まず前向きにカルマンフィルターを実行して $\hat{\mathbf{x}}_{k|k}$ と $\mathbf{P}_{k|k}$ を全時刻分記憶しておき，その後 $k = N-1$ から $k = 0$ へ後退方向に以下を計算する：

後退ゲイン：
$$\mathbf{G}_{k} = \mathbf{P}_{k|k}\,\mathbf{F}_{k+1}^{\top}\,\mathbf{P}_{k+1|k}^{-1}$$

平滑化推定値：
$$\hat{\mathbf{x}}_{k|N} = \hat{\mathbf{x}}_{k|k} + \mathbf{G}_{k}\,(\hat{\mathbf{x}}_{k+1|N} - \hat{\mathbf{x}}_{k+1|k})$$

平滑化共分散：
$$\mathbf{P}_{k|N} = \mathbf{P}_{k|k} + \mathbf{G}_{k}\,(\mathbf{P}_{k+1|N} - \mathbf{P}_{k+1|k})\,\mathbf{G}_{k}^{\top}$$

$\hat{\mathbf{x}}_{k|N}$ は時刻 $k$ よりも後の観測情報も反映しているため，常に $\text{tr}(\mathbf{P}_{k|N}) \leq \text{tr}(\mathbf{P}_{k|k})$ が成り立ち，フィルタ推定よりも精度が高い。RTS平滑化は固定区間平滑化（fixed-interval smoothing）の代表的なアルゴリズムであり，計算量はフィルタリングと同等（$O(n^{3})$ per step）である。

### ノイズパラメータの推定

カルマンフィルターの性能は $\mathbf{Q}$ と $\mathbf{R}$ の設定に大きく依存する。$\mathbf{Q}$ が過小だとモデルを信じすぎて観測を無視し，過大だと観測ノイズも拾って推定が荒れる。$\mathbf{R}$ についても同様である。

これらのパラメータを観測データから推定する代表的な手法として，EMアルゴリズム（Expectation-Maximization）がある。観測の対数周辺尤度は，イノベーション系列を用いて：

$$\log p(\mathbf{Z}_{N};\, \theta) = -\frac{1}{2}\sum_{k=1}^{N}\left[\log |\mathbf{S}_{k}| + \tilde{\mathbf{y}}_{k}^{\top}\,\mathbf{S}_{k}^{-1}\,\tilde{\mathbf{y}}_{k} + m\log(2\pi)\right]$$

と表せる（$\theta = \{\mathbf{Q}, \mathbf{R}, \mathbf{F}, \mathbf{H}, \ldots\}$）。Eステップではカルマン平滑化によって十分統計量（各時刻の状態の条件付き期待値と共分散）を計算し，Mステップではこれを用いてパラメータを最大尤度推定する，という反復を収束まで繰り返す。

別の方法として，イノベーション $\tilde{\mathbf{y}}_{k}$ の白色性（フィルターが正しく同調されているとき，イノベーション系列は時間的に無相関かつ共分散が $\mathbf{S}_{k}$ に一致するはず）を統計的に検定し，ずれが検出されたときにオンラインで $\mathbf{Q}$ や $\mathbf{R}$ を修正するMehra（1970）の適応型手法や，Sage-Husa法も広く用いられる。

---

## 9. 機械学習との融合

2020年代以降，カルマンフィルターとディープラーニングを組み合わせたハイブリッド手法の研究が急速に進展している。背景には，カルマンフィルターは理論的に明確な不確かさの定量化能力をもつ一方，モデル誤差や非ガウスノイズに弱いという限界があり，ニューラルネットワークはデータから複雑なパターンを学習できるがブラックボックス性が高く不確かさ定量化が難しいという，両者の相補的な特性がある。

### KalmanNet

Shlezinger et al.（2022, IEEE Trans. Signal Process.）が提案したKalmanNetは，カルマンゲインの計算部分をリカレントニューラルネットワーク（RNN）で置き換えた手法である。状態遷移 $\mathbf{F}$ と観測行列 $\mathbf{H}$ は既知として用いるが，ノイズ共分散 $\mathbf{Q}$，$\mathbf{R}$ は未知のまま，RNNがイノベーションの系列から適切なゲインを直接学習する。これにより，モデル誤差や非ガウスノイズが存在する環境下でも，正確な $\mathbf{Q}$，$\mathbf{R}$ の設定なしに高精度な推定が可能となる。

### Recursive KalmanNet（2025年）

2025年6月に提案されたRecursive KalmanNet（arxiv: 2506.11639）は，ゲイン計算と誤差共分散（Cholesky因子）の両方をそれぞれ専用のRNNで推定し，誤差共分散をJoseph形式で再帰的に伝播させる構成をとる：

$$\hat{\mathbf{P}}_{k|k} = (\mathbf{I} - \hat{\mathbf{K}}_{k}\,\mathbf{H})\ \hat{\mathbf{P}}_{k|k-1}\ (\mathbf{I} - \hat{\mathbf{K}}_{k}\,\mathbf{H})^{\top} + \hat{\mathbf{K}}_{k}\,\mathbf{R}\,\hat{\mathbf{K}}_{k}^{\top}$$

ガウス負対数尤度（NLL）を損失関数として訓練することで，推定値と不確かさの両方を高精度に出力できる。非ガウス観測ノイズ下での性能が従来の手法を凌駕することが報告されている。

### GAN-UKF 融合（2025年）

GAN（Generative Adversarial Network）とUKFを組み合わせた手法（Nature Scientific Reports, 2025）では，GANがフィルターの直近の性能（イノベーションの統計量など）に基づいてリアルタイムでノイズパラメータを予測・更新する。これにより，非定常ノイズ環境における非線形動的システムの状態推定性能が大幅に改善される。

### 連合学習との融合（FedKalmanNet）

プライバシー保護を重視した連合学習（Federated Learning）の枠組みをKalmanNetに組み込んだFedKalmanNetでは，複数のクライアントが生データを共有せずに協調してフィルターを訓練できる。自動運転車や医療センサーネットワークなど，データの集約が困難な分散環境における実用化を見据えた研究として注目されている。

これらの研究潮流に共通するのは，カルマンフィルターの構造的な知識（状態空間モデル・不確かさ伝播の数式）を保ちながらその弱点（ノイズ分布の仮定・モデル誤差）をニューラルネットワークで補完するという「物理インフォームド機械学習」的なアプローチである。

---

## 10. 主要応用分野

### 航法・測位（GNSS/INS 融合）

カルマンフィルターが最初に大規模実用化された分野の一つが慣性航法である。GPS（またはGNSS）と慣性計測装置（IMU: Inertial Measurement Unit）を融合するGPS/INS複合航法では，IMUの積分誤差（加速度計・ジャイロのバイアス・ドリフト）をGPS観測で逐次補正するためにEKFが用いられる。状態ベクトルには位置・速度・姿勢（クォータニオン）のほか，センサーバイアスが含まれる。GPS信号が途絶するトンネル・市街地においても，INSのみで短時間の高精度測位が可能となる。

### 自動運転・ロボティクス

自動運転車では，LiDAR・カメラ・ミリ波レーダーなど異種センサーからの観測を時刻同期しながら融合するためにUKFや EKFが活用される。SLAM（Simultaneous Localization and Mapping）においては，ロボットの自己位置とランドマーク地図を同時推定する拡張問題が定式化され，EKF-SLAMやGraph-SLAMなどの手法が発展した。関節空間の角度推定（工業ロボット）や，ドローンの姿勢・位置制御にも広く使われている。

### 気象・海洋データ同化

数値気象予測（NWP）では，大気状態を表す格子点数が $10^{7}$〜$10^{9}$ に達するため，アンサンブルカルマンフィルター（EnKF）が標準的な手法として採用されている。ECMWFのEDA（Ensemble of Data Assimilations），米国NOAAのGDAS（Global Data Assimilation System），日本気象庁のデータ同化システムなど，世界の主要気象センターが EnKF を核とした同化系を運用している。海洋モデルや地震波伝播モデルへの応用も進んでいる。

### バッテリー管理（SOC推定）

リチウムイオン電池の残量（State of Charge, SOC）推定は，電気自動車（EV）のバッテリー管理システム（BMS）において安全運用上の最重要課題である。電池の等価回路モデル（RC回路など）や電気化学モデルを状態空間モデルとして定式化し，端子電圧・電流の観測からSOCをEKFまたはUKFで逐次推定する。電池は充放電履歴・温度・経年劣化によって非線形かつ非定常な特性を示すため，適応型EKFや，ヒステリシス現象を考慮した拡張手法（2025年に系統的なEKFチューニング手法が提案）が研究されている。

### 経済・金融時系列

マクロ経済の状態変数（潜在GDP・自然利子率・インフレ期待など）を推定する状態空間モデルにカルマンフィルターが用いられる。時変パラメータの推定（例：時変β値の推定）や，構造変化を含む経済モデルへの適用では，EM法によるパラメータ学習と組み合わせた実装が標準的である。株価・為替レートの確率ボラティリティモデル（Stochastic Volatility Model）の推定にも粒子フィルターやEKFが用いられる。

### 信号処理・神経科学

脳波（EEG）・脳磁図（MEG）の解析では，神経電流源の空間分布を状態変数として定式化し，カルマンフィルターまたはRTSスムーザーによって時空間分布を逐次推定するDynamic Source Localizationが研究されている。音声通信のエコーキャンセラーや，レーダー・ソナーにおける多目標追跡（Multi-Target Tracking, MTT）でも，カルマンフィルターがデータアソシエーション（どの観測点がどの目標に対応するかの推定）と組み合わせて用いられる。

---

## まとめと展望

カルマンフィルターは，Rudolf Kalmanが1960年に提案して以来，線形ガウス状態推定の理論的最適解として広範な工学・科学分野に深く根付いてきた。その本質は，システムモデルと観測に内在する不確かさを共分散行列で明示的に定量化し，予測と更新を繰り返すベイズ推論の解析的実装にある。EKF・UKF・EnKFといった非線形・大規模化への拡張によって，自動運転・気象予測・エネルギー管理など現代の先端技術の中核を担うに至った。

2020年代以降は，KalmanNet・Recursive KalmanNet・GAN-UKF融合に代表される機械学習との統合手法が急速に発展しており，モデル誤差・非ガウスノイズ・非定常系という従来の限界を克服する試みが続いている。今後の発展方向として，(1) エッジコンピューティング向けの高速・省メモリ実装，(2) ニューラルネットワークと物理モデルの統合による端から端までの不確かさ定量化，(3) マテリアルズ・インフォマティクスにおける実験データ同化（材料プロセスの状態推定・物性パラメータの逐次推定）への応用，(4) 連合学習・プライバシー保護推定との融合，が活発な研究フロンティアとして注目される。カルマンフィルターは60年以上を経てなお，理論と応用の両面で革新を生み続けている手法である。

---

## その他参考文献

- Julier, S. J. & Uhlmann, J. K., "New extension of the Kalman filter to nonlinear systems," Proc. SPIE 3068 (1997)
- Evensen, G., "Sequential data assimilation with a nonlinear quasi-geostrophic model using Monte Carlo methods to forecast error statistics," J. Geophys. Res. 99(C5), 10143–10162 (1994)
- Rauch, H. E., Tung, F. & Striebel, C. T., "Maximum likelihood estimates of linear dynamic systems," AIAA J. 3(8), 1445–1450 (1965)
- Shlezinger, N. et al., "KalmanNet: Neural Network Aided Kalman Filtering for Partially Known Dynamics," IEEE Trans. Signal Process. 70, 1532–1547 (2022)
- arxiv: 2506.11639, "Recursive KalmanNet: Deep Learning-Augmented Kalman Filtering for State Estimation with Consistent Uncertainty Quantification" (2025)
- Nature Scientific Reports, "Integrating GAN-based machine learning with nonlinear Kalman filtering for enhanced state estimation" (2025). https://www.nature.com/articles/s41598-025-26339-9
- Wiley, "A Novel Adaptive State Estimation Model: Kalman Filter Coupled With Neural Networks," Int. J. Adaptive Control Signal Process. (2025). https://onlinelibrary.wiley.com/doi/10.1002/acs.3982
- 足立修一「古くて新しいカルマンフィルタ（巻頭言）」計測と制御, 56(9), 630–631 (2017). https://www.jstage.jst.go.jp/article/sicejl/56/9/56_630/_pdf
- SIAM Review, "A Fresh Look at the Kalman Filter" https://epubs.siam.org/doi/10.1137/100799666
- arxiv:1910.03558, "A Step by Step Mathematical Derivation and Tutorial on Kalman Filters"
- NTT「カルマンフィルタ — ごちきか」https://gochikika.ntt.com/Modeling/kalman_principle.html
- Wikipedia「カルマンフィルター」https://ja.wikipedia.org/wiki/%E3%82%AB%E3%83%AB%E3%83%9E%E3%83%B3%E3%83%95%E3%82%A3%E3%83%AB%E3%82%BF%E3%83%BC
