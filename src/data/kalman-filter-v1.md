# カルマンフィルター：線形最適推定から非線形拡張・機械学習融合まで

カルマンフィルターは、ノイズを含む観測データから隠れた状態変数を逐次的かつ最適に推定する再帰的アルゴリズムであり、1960年にR. E. Kalmanが提案して以来、制御工学・信号処理・ナビゲーション・機械学習と広範な分野の基盤技術として機能し続けている。線形ガウス系においては最小分散不偏推定量として理論的最適性が保証されており、計算コストも低く実装が容易なため、宇宙開発から自動運転に至るまで不可欠な推定器として用いられている。

## 参考文献（主要3件）

1. 足立修一「線形カルマンフィルタの基礎」計測と制御, Vol. 56, No. 9, pp. 632–637 (2017)  
   https://www.jstage.jst.go.jp/article/sicejl/56/9/56_632/_pdf

2. 片山徹「非線形カルマンフィルタの基礎」計測と制御, Vol. 56, No. 9, pp. 638–643 (2017)  
   https://www.jstage.jst.go.jp/article/sicejl/56/9/56_638/_pdf

3. Kalman, R. E. "A New Approach to Linear Filtering and Prediction Problems," ASME Journal of Basic Engineering, Vol. 82, No. 1, pp. 35–45 (1960)

---

## 目次

1. 歴史的背景
2. 状態空間表現
3. 線形カルマンフィルターの導出
4. アルゴリズムの逐次更新式
5. 最適性の証明
6. 定常カルマンフィルターとリカッチ方程式
7. 収束条件と可観測性・可制御性
8. 拡張カルマンフィルター（EKF）
9. アンセンテッドカルマンフィルター（UKF）
10. アンサンブルカルマンフィルター（EnKF）
11. 粒子フィルターとの比較
12. 平滑化アルゴリズム
13. ノイズパラメータの推定と適応型手法
14. 機械学習との融合
15. 主要応用分野
16. まとめと展望

---

## 1. 歴史的背景

Rudolf Emil Kalman（1930–2016）は1960年，ASME Journal of Basic Engineeringに論文 "A New Approach to Linear Filtering and Prediction Problems" を発表した。同論文でKalmanは，Norbert Wienerが1940年代に周波数領域で定式化していたウィーナーフィルタリング問題を，有限次元の状態空間表現と時間領域の逐次アルゴリズムとして再定式化した。これによって，定常性・無限過去データという制約から解放され，非定常系・有限観測時間に対しても最適推定が可能となった。

翌1961年には，KalmanとBucyが連続時間版であるKalman-Bucyフィルターを提案し，確率微分方程式に基づく連続時間システムへの適用を実現した（"New Results in Linear Filtering and Prediction Theory," ASME J. Basic Eng., 83, 95–108, 1961）。

アポロ計画（1960年代）では，月宇宙船の軌道推定にカルマンフィルターが採用されたことで，その実用性が広く知られるようになった。その後，GPS航法，航空機飛行制御，気象データ同化，金融時系列，自動運転車の自己位置推定，バッテリー残量推定（SOC推定）など，現代の基幹技術に深く組み込まれている。

Kalmanは2009年にKyle Prize，2008年にNational Medal of Science，2012年にMillennium Technology Prize（フィンランド）を受賞し，制御・信号処理分野最大の業績の一つとして広く認められている。

---

## 2. 状態空間表現

カルマンフィルターの基礎となるのは，離散時間線形確率システムの状態空間表現である。

### 状態方程式（システムモデル）

$$\mathbf{x}_{k} = \mathbf{F}_{k}\,\mathbf{x}_{k-1} + \mathbf{B}_{k}\,\mathbf{u}_{k} + \mathbf{w}_{k}$$

ここで，$\mathbf{x}_{k} \in \mathbb{R}^{n}$ は時刻 $k$ の状態ベクトル，$\mathbf{F}_{k} \in \mathbb{R}^{n \times n}$ は状態遷移行列，$\mathbf{B}_{k} \in \mathbb{R}^{n \times l}$ は制御入力行列，$\mathbf{u}_{k} \in \mathbb{R}^{l}$ は既知の制御入力ベクトル，$\mathbf{w}_{k} \in \mathbb{R}^{n}$ はシステムノイズ（過程ノイズ）であり，

$$\mathbf{w}_{k} \sim \mathcal{N}(\mathbf{0},\,\mathbf{Q}_{k})$$

と仮定する。$\mathbf{Q}_{k} \in \mathbb{R}^{n \times n}$ は過程ノイズの共分散行列（正半定値）である。

### 観測方程式（観測モデル）

$$\mathbf{z}_{k} = \mathbf{H}_{k}\,\mathbf{x}_{k} + \mathbf{v}_{k}$$

ここで，$\mathbf{z}_{k} \in \mathbb{R}^{m}$ は観測ベクトル，$\mathbf{H}_{k} \in \mathbb{R}^{m \times n}$ は観測行列，$\mathbf{v}_{k} \in \mathbb{R}^{m}$ は観測ノイズであり，

$$\mathbf{v}_{k} \sim \mathcal{N}(\mathbf{0},\,\mathbf{R}_{k})$$

と仮定する。$\mathbf{R}_{k} \in \mathbb{R}^{m \times m}$ は観測ノイズの共分散行列（正定値）である。

さらに，$\mathbf{w}_{k}$ と $\mathbf{v}_{k}$ は相互に独立で，かつ時刻をまたいでも無相関と仮定する：

$$E[\mathbf{w}_{k}\,\mathbf{v}_{j}^{\top}] = \mathbf{0},\quad \forall k,j$$

初期条件として，

$$\mathbf{x}_{0} \sim \mathcal{N}(\hat{\mathbf{x}}_{0|0},\,\mathbf{P}_{0|0})$$

が与えられているものとする。$\hat{\mathbf{x}}_{0|0}$ は初期状態の推定値，$\mathbf{P}_{0|0}$ は初期推定誤差共分散行列である。

---

## 3. 線形カルマンフィルターの導出

カルマンフィルターの導出には複数の方法が存在する。ここでは，最小平均二乗誤差（MMSE）推定の観点から導出する。

### MMSE推定の枠組み

時刻 $k$ までの全観測 $\mathbf{Z}_{k} = \{\mathbf{z}_{1}, \mathbf{z}_{2}, \ldots, \mathbf{z}_{k}\}$ を与えたとき，状態 $\mathbf{x}_{k}$ の最小平均二乗誤差推定量は事後期待値：

$$\hat{\mathbf{x}}_{k|k} = E[\mathbf{x}_{k} \mid \mathbf{Z}_{k}]$$

である。線形ガウス系ではこの条件付き分布が正規分布に従うため，平均と共分散行列の更新のみで分布が完全に記述できる。

### 予測ステップの導出

前時刻の事後分布 $p(\mathbf{x}_{k-1} \mid \mathbf{Z}_{k-1}) = \mathcal{N}(\hat{\mathbf{x}}_{k-1|k-1},\, \mathbf{P}_{k-1|k-1})$ から，Chapman-Kolmogorov方程式による1ステップ先の予測分布は：

$$p(\mathbf{x}_{k} \mid \mathbf{Z}_{k-1}) = \int p(\mathbf{x}_{k} \mid \mathbf{x}_{k-1})\, p(\mathbf{x}_{k-1} \mid \mathbf{Z}_{k-1})\, d\mathbf{x}_{k-1}$$

状態方程式の線形性とガウス性から，これは：

$$\hat{\mathbf{x}}_{k|k-1} = \mathbf{F}_{k}\,\hat{\mathbf{x}}_{k-1|k-1} + \mathbf{B}_{k}\,\mathbf{u}_{k}$$

$$\mathbf{P}_{k|k-1} = \mathbf{F}_{k}\,\mathbf{P}_{k-1|k-1}\,\mathbf{F}_{k}^{\top} + \mathbf{Q}_{k}$$

と解析的に計算できる。

### 更新ステップの導出

ベイズの定理より，

$$p(\mathbf{x}_{k} \mid \mathbf{Z}_{k}) \propto p(\mathbf{z}_{k} \mid \mathbf{x}_{k})\, p(\mathbf{x}_{k} \mid \mathbf{Z}_{k-1})$$

この積は，観測方程式と予測分布の線形・ガウス性から再びガウス分布となる。事前予測分布 $\mathcal{N}(\hat{\mathbf{x}}_{k|k-1},\, \mathbf{P}_{k|k-1})$ と尤度 $\mathcal{N}(\mathbf{H}_{k}\mathbf{x}_{k},\, \mathbf{R}_{k})$ のガウス積分を実行すると：

$$\hat{\mathbf{x}}_{k|k} = \hat{\mathbf{x}}_{k|k-1} + \mathbf{K}_{k}\,(\mathbf{z}_{k} - \mathbf{H}_{k}\,\hat{\mathbf{x}}_{k|k-1})$$

$$\mathbf{P}_{k|k} = (\mathbf{I} - \mathbf{K}_{k}\,\mathbf{H}_{k})\,\mathbf{P}_{k|k-1}$$

ただし，カルマンゲイン $\mathbf{K}_{k}$ は：

$$\mathbf{K}_{k} = \mathbf{P}_{k|k-1}\,\mathbf{H}_{k}^{\top}\,(\mathbf{H}_{k}\,\mathbf{P}_{k|k-1}\,\mathbf{H}_{k}^{\top} + \mathbf{R}_{k})^{-1}$$

$\mathbf{z}_{k} - \mathbf{H}_{k}\,\hat{\mathbf{x}}_{k|k-1}$ はイノベーション（新情報）と呼ばれ，観測値と予測観測値との残差を表す。$\mathbf{S}_{k} = \mathbf{H}_{k}\,\mathbf{P}_{k|k-1}\,\mathbf{H}_{k}^{\top} + \mathbf{R}_{k}$ はイノベーション共分散行列である。

---

## 4. アルゴリズムの逐次更新式

カルマンフィルターのアルゴリズムは，予測（Predict）と更新（Update）の2段階を繰り返す再帰的な手続きとして実装される。

### 予測ステップ

状態の予測：
$$\hat{\mathbf{x}}_{k|k-1} = \mathbf{F}_{k}\,\hat{\mathbf{x}}_{k-1|k-1} + \mathbf{B}_{k}\,\mathbf{u}_{k}$$

誤差共分散の予測：
$$\mathbf{P}_{k|k-1} = \mathbf{F}_{k}\,\mathbf{P}_{k-1|k-1}\,\mathbf{F}_{k}^{\top} + \mathbf{Q}_{k}$$

### 更新ステップ

イノベーション：
$$\tilde{\mathbf{y}}_{k} = \mathbf{z}_{k} - \mathbf{H}_{k}\,\hat{\mathbf{x}}_{k|k-1}$$

イノベーション共分散：
$$\mathbf{S}_{k} = \mathbf{H}_{k}\,\mathbf{P}_{k|k-1}\,\mathbf{H}_{k}^{\top} + \mathbf{R}_{k}$$

カルマンゲイン：
$$\mathbf{K}_{k} = \mathbf{P}_{k|k-1}\,\mathbf{H}_{k}^{\top}\,\mathbf{S}_{k}^{-1}$$

状態の更新：
$$\hat{\mathbf{x}}_{k|k} = \hat{\mathbf{x}}_{k|k-1} + \mathbf{K}_{k}\,\tilde{\mathbf{y}}_{k}$$

誤差共分散の更新（Joseph形式，数値安定性が高い）：
$$\mathbf{P}_{k|k} = (\mathbf{I} - \mathbf{K}_{k}\,\mathbf{H}_{k})\,\mathbf{P}_{k|k-1}\,(\mathbf{I} - \mathbf{K}_{k}\,\mathbf{H}_{k})^{\top} + \mathbf{K}_{k}\,\mathbf{R}_{k}\,\mathbf{K}_{k}^{\top}$$

標準形の更新式 $\mathbf{P}_{k|k} = (\mathbf{I} - \mathbf{K}_{k}\,\mathbf{H}_{k})\,\mathbf{P}_{k|k-1}$ は計算が簡潔だが，数値誤差が蓄積すると $\mathbf{P}_{k|k}$ の正定値性が失われる恐れがある。上記のJoseph形式を用いると対称正定値性が保証され，数値的に安定した実装が得られる。

カルマンゲインの物理的意味は以下の通りである。$\mathbf{K}_{k}$ が大きい（観測ノイズが小さい，あるいは予測誤差が大きい）とき，イノベーションに大きな重みを付けて状態を更新する。逆に $\mathbf{K}_{k}$ が小さいとき，予測値をほぼそのまま採用する。これは，センサーの信頼度と事前知識の信頼度を自動的に重み付けするベイズ的合理性の現れである。

---

## 5. 最適性の証明

カルマンフィルターの最適性は，以下の2つの観点から証明できる。

### MMSE最適性（ガウス系）

線形ガウス状態空間モデルにおいて，カルマンフィルターの推定量 $\hat{\mathbf{x}}_{k|k}$ は，与えられた全観測 $\mathbf{Z}_{k}$ に対する最小平均二乗誤差推定量（事後期待値）と一致する。これは，線形ガウス系では事後分布が常にガウス分布であり，その平均がMMSE推定量となることによる。

### BLUE（最良線形不偏推定量）

ガウス性を仮定しない場合でも，カルマンフィルターは全線形不偏推定量の中でトレース $\text{tr}(\mathbf{P}_{k|k})$（推定誤差共分散のトレース，すなわち全成分の平均二乗誤差の和）を最小化する最良線形不偏推定量（Best Linear Unbiased Estimator, BLUE）である。

これは，カルマンゲインが

$$\frac{\partial}{\partial \mathbf{K}_{k}} \text{tr}(\mathbf{P}_{k|k}) = \mathbf{0}$$

を満たすように選ばれていることを行列微分で示すことによって証明される。具体的には，更新後の誤差共分散のトレースを $\mathbf{K}_{k}$ で偏微分してゼロとおくと，まさに上述のカルマンゲイン式が導かれる。

---

## 6. 定常カルマンフィルターとリカッチ方程式

時不変系（$\mathbf{F}_{k} = \mathbf{F}$，$\mathbf{H}_{k} = \mathbf{H}$，$\mathbf{Q}_{k} = \mathbf{Q}$，$\mathbf{R}_{k} = \mathbf{R}$ がすべて定数行列）において，誤差共分散行列 $\mathbf{P}_{k|k-1}$ は十分時間が経過すると定常値 $\mathbf{P}_{\infty}$ に収束する。この定常値は離散時間代数リカッチ方程式（DARE: Discrete Algebraic Riccati Equation）：

$$\mathbf{P}_{\infty} = \mathbf{F}\,\mathbf{P}_{\infty}\,\mathbf{F}^{\top} + \mathbf{Q} - \mathbf{F}\,\mathbf{P}_{\infty}\,\mathbf{H}^{\top}\,(\mathbf{H}\,\mathbf{P}_{\infty}\,\mathbf{H}^{\top} + \mathbf{R})^{-1}\,\mathbf{H}\,\mathbf{P}_{\infty}\,\mathbf{F}^{\top}$$

の正半定値解として求められる。

定常カルマンゲインは：

$$\mathbf{K}_{\infty} = \mathbf{P}_{\infty}\,\mathbf{H}^{\top}\,(\mathbf{H}\,\mathbf{P}_{\infty}\,\mathbf{H}^{\top} + \mathbf{R})^{-1}$$

であり，これを固定ゲインとして用いることで，オンライン計算における共分散伝播を省略でき，リアルタイム実装のコストを大幅に削減できる。

連続時間系では，対応する定常問題として連続時間代数リカッチ方程式（CARE）：

$$\mathbf{F}\,\mathbf{P}_{\infty} + \mathbf{P}_{\infty}\,\mathbf{F}^{\top} - \mathbf{P}_{\infty}\,\mathbf{H}^{\top}\,\mathbf{R}^{-1}\,\mathbf{H}\,\mathbf{P}_{\infty} + \mathbf{Q} = \mathbf{0}$$

が成立する（Kalman-Bucy フィルター）。

---

## 7. 収束条件と可観測性・可制御性

時不変系においてDAREが一意の正定値解をもち，定常カルマンフィルターが安定に収束するための十分条件は，システムの可検出性（detectability）と可安定性（stabilizability）に関係する。

### 可観測行列

システム $(\mathbf{F}, \mathbf{H})$ の可観測行列（Observability matrix）は：

$$\mathcal{O} = \begin{bmatrix} \mathbf{H} \\ \mathbf{H}\,\mathbf{F} \\ \mathbf{H}\,\mathbf{F}^{2} \\ \vdots \\ \mathbf{H}\,\mathbf{F}^{n-1} \end{bmatrix} \in \mathbb{R}^{mn \times n}$$

で定義される。$\text{rank}(\mathcal{O}) = n$ のとき，システムは完全に可観測（completely observable）であるという。可観測性は，有限個の観測データから初期状態を一意に決定できることと等価である。

### 可制御行列（可到達行列）

ノイズ系の可制御性（ここではノイズの可到達性）は，行列の対 $(\mathbf{F}, \mathbf{G})$（$\mathbf{Q} = \mathbf{G}\mathbf{G}^{\top}$ となる $\mathbf{G}$）に対して定義される可制御行列：

$$\mathcal{C} = \begin{bmatrix} \mathbf{G} & \mathbf{F}\,\mathbf{G} & \mathbf{F}^{2}\,\mathbf{G} & \cdots & \mathbf{F}^{n-1}\,\mathbf{G} \end{bmatrix} \in \mathbb{R}^{n \times pn}$$

が $\text{rank}(\mathcal{C}) = n$ を満たす場合，完全に可制御（可到達）という。

### 収束定理

- システム $(\mathbf{F}, \mathbf{H})$ が完全可観測かつ $(\mathbf{F}, \mathbf{G})$ が完全可制御であれば，$\mathbf{P}_{k|k-1}$ は初期値 $\mathbf{P}_{0|0}$ に依存せず一意の正定値行列 $\mathbf{P}_{\infty}$ に指数的に収束する。
- 収束後の更新則 $\mathbf{x}_{k|k} = (\mathbf{I} - \mathbf{K}_{\infty}\mathbf{H})\mathbf{F}\,\hat{\mathbf{x}}_{k-1|k-1} + \mathbf{K}_{\infty}\mathbf{z}_{k}$ で定まるフィルタ行列 $(\mathbf{I} - \mathbf{K}_{\infty}\mathbf{H})\mathbf{F}$ の全固有値は単位円内に収まり（漸近安定），推定誤差は確率的に有界である。

完全可観測性よりも弱い条件である可検出性（detectable: 不安定モードが観測可能であること）が成り立てば，DAREの正半定値解は一意に存在し，フィルターは安定に機能する。

---

## 8. 拡張カルマンフィルター（EKF）

実用的な多くのシステムは非線形を含むため，標準カルマンフィルターを直接適用できない。拡張カルマンフィルター（Extended Kalman Filter, EKF）は，非線形関数を現在の推定値周りで1次テイラー展開（線形化）して対処する手法である。

### 非線形状態空間モデル

$$\mathbf{x}_{k} = f(\mathbf{x}_{k-1},\, \mathbf{u}_{k}) + \mathbf{w}_{k}$$

$$\mathbf{z}_{k} = h(\mathbf{x}_{k}) + \mathbf{v}_{k}$$

ここで $f: \mathbb{R}^{n} \to \mathbb{R}^{n}$ および $h: \mathbb{R}^{n} \to \mathbb{R}^{m}$ は非線形関数である。

### ヤコビアン行列

EKFでは，$f$ と $h$ を推定値まわりで線形化するためにヤコビアン行列を用いる：

$$\mathbf{F}_{k} = \left.\frac{\partial f}{\partial \mathbf{x}}\right|_{\hat{\mathbf{x}}_{k-1|k-1},\,\mathbf{u}_{k}} \in \mathbb{R}^{n \times n}$$

$$\mathbf{H}_{k} = \left.\frac{\partial h}{\partial \mathbf{x}}\right|_{\hat{\mathbf{x}}_{k|k-1}} \in \mathbb{R}^{m \times n}$$

### EKFのアルゴリズム

予測：
$$\hat{\mathbf{x}}_{k|k-1} = f(\hat{\mathbf{x}}_{k-1|k-1},\, \mathbf{u}_{k})$$
$$\mathbf{P}_{k|k-1} = \mathbf{F}_{k}\,\mathbf{P}_{k-1|k-1}\,\mathbf{F}_{k}^{\top} + \mathbf{Q}_{k}$$

更新：
$$\tilde{\mathbf{y}}_{k} = \mathbf{z}_{k} - h(\hat{\mathbf{x}}_{k|k-1})$$
$$\mathbf{S}_{k} = \mathbf{H}_{k}\,\mathbf{P}_{k|k-1}\,\mathbf{H}_{k}^{\top} + \mathbf{R}_{k}$$
$$\mathbf{K}_{k} = \mathbf{P}_{k|k-1}\,\mathbf{H}_{k}^{\top}\,\mathbf{S}_{k}^{-1}$$
$$\hat{\mathbf{x}}_{k|k} = \hat{\mathbf{x}}_{k|k-1} + \mathbf{K}_{k}\,\tilde{\mathbf{y}}_{k}$$
$$\mathbf{P}_{k|k} = (\mathbf{I} - \mathbf{K}_{k}\,\mathbf{H}_{k})\,\mathbf{P}_{k|k-1}$$

EKFの精度は1次近似の精度に依存し，非線形性が強い系や推定誤差が大きい場合には近似誤差が蓄積して発散することがある。また，ヤコビアン行列の解析的計算が困難な場合，数値微分を用いることで対応できるが，計算コストが増大する。

---

## 9. アンセンテッドカルマンフィルター（UKF）

アンセンテッドカルマンフィルター（Unscented Kalman Filter, UKF）は，Julier & Uhlmann（1997）によって提案された手法であり，確率分布のパラメータ伝播に「アンセンテッド変換」を利用し，EKFよりも高精度な近似を実現する。

### アンセンテッド変換

$n$ 次元のガウス分布 $\mathcal{N}(\hat{\mathbf{x}},\, \mathbf{P})$ を表現する $2n+1$ 個のシグマ点を以下のように選ぶ：

$$\boldsymbol{\sigma}^{(0)} = \hat{\mathbf{x}}$$

$$\boldsymbol{\sigma}^{(i)} = \hat{\mathbf{x}} + \left(\sqrt{(n+\lambda)\mathbf{P}}\right)_{i}, \quad i = 1, \ldots, n$$

$$\boldsymbol{\sigma}^{(i+n)} = \hat{\mathbf{x}} - \left(\sqrt{(n+\lambda)\mathbf{P}}\right)_{i}, \quad i = 1, \ldots, n$$

ここで $\lambda = \alpha^{2}(n + \kappa) - n$ はスケーリングパラメータ，$\left(\sqrt{\cdot}\right)_{i}$ は行列の平方根の第 $i$ 列を示す。各シグマ点に対応する重みは：

$$W_{m}^{(0)} = \frac{\lambda}{n+\lambda},\quad W_{c}^{(0)} = \frac{\lambda}{n+\lambda} + (1-\alpha^{2}+\beta)$$

$$W_{m}^{(i)} = W_{c}^{(i)} = \frac{1}{2(n+\lambda)}, \quad i = 1, \ldots, 2n$$

ここで，$\alpha$（通常 $10^{-3}$）はシグマ点の分散の広がりを，$\beta$（ガウス分布では $\beta = 2$ が最適）は分布の高次モーメントの情報を取り込むパラメータである。

### UKFのアルゴリズム

シグマ点を非線形写像 $f$ に通して予測シグマ点 $\boldsymbol{\sigma}_{k|k-1}^{(i)} = f(\boldsymbol{\sigma}^{(i)})$ を計算し，

$$\hat{\mathbf{x}}_{k|k-1} = \sum_{i=0}^{2n} W_{m}^{(i)}\,\boldsymbol{\sigma}_{k|k-1}^{(i)}$$

$$\mathbf{P}_{k|k-1} = \sum_{i=0}^{2n} W_{c}^{(i)}\,(\boldsymbol{\sigma}_{k|k-1}^{(i)} - \hat{\mathbf{x}}_{k|k-1})(\boldsymbol{\sigma}_{k|k-1}^{(i)} - \hat{\mathbf{x}}_{k|k-1})^{\top} + \mathbf{Q}_{k}$$

同様に，観測方程式 $h$ を適用した予測観測シグマ点から：

$$\hat{\mathbf{z}}_{k|k-1} = \sum_{i=0}^{2n} W_{m}^{(i)}\, h(\boldsymbol{\sigma}_{k|k-1}^{(i)})$$

$$\mathbf{S}_{k} = \sum_{i=0}^{2n} W_{c}^{(i)}\,(h(\boldsymbol{\sigma}^{(i)}) - \hat{\mathbf{z}}_{k|k-1})(h(\boldsymbol{\sigma}^{(i)}) - \hat{\mathbf{z}}_{k|k-1})^{\top} + \mathbf{R}_{k}$$

$$\mathbf{P}_{xz,k} = \sum_{i=0}^{2n} W_{c}^{(i)}\,(\boldsymbol{\sigma}_{k|k-1}^{(i)} - \hat{\mathbf{x}}_{k|k-1})(h(\boldsymbol{\sigma}^{(i)}) - \hat{\mathbf{z}}_{k|k-1})^{\top}$$

カルマンゲインおよび状態・共分散更新は標準形と同様に：

$$\mathbf{K}_{k} = \mathbf{P}_{xz,k}\,\mathbf{S}_{k}^{-1}$$
$$\hat{\mathbf{x}}_{k|k} = \hat{\mathbf{x}}_{k|k-1} + \mathbf{K}_{k}\,(\mathbf{z}_{k} - \hat{\mathbf{z}}_{k|k-1})$$
$$\mathbf{P}_{k|k} = \mathbf{P}_{k|k-1} - \mathbf{K}_{k}\,\mathbf{S}_{k}\,\mathbf{K}_{k}^{\top}$$

UKFはヤコビアン行列の計算を必要とせず，非微分可能な非線形関数にも適用できる。また，テイラー展開の3次項まで正確に伝播するため，EKFの1次近似と比べて推定精度が高い。

---

## 10. アンサンブルカルマンフィルター（EnKF）

アンサンブルカルマンフィルター（Ensemble Kalman Filter, EnKF）は，Evensen（1994）によって気象・海洋データ同化の分野で提案された手法であり，モンテカルロ的なアンサンブル（多数のサンプル）によって確率分布を近似する。

### 基本的な枠組み

$N$ 個のアンサンブルメンバー $\{\mathbf{x}_{k-1}^{(j)}\}_{j=1}^{N}$ を状態空間内のサンプルとして保持し，状態遷移と観測更新をアンサンブル全体に適用する。

予測ステップ：
$$\mathbf{x}_{k|k-1}^{(j)} = f(\mathbf{x}_{k-1|k-1}^{(j)},\, \mathbf{u}_{k}) + \boldsymbol{\epsilon}_{k}^{(j)}, \quad \boldsymbol{\epsilon}_{k}^{(j)} \sim \mathcal{N}(\mathbf{0},\, \mathbf{Q}_{k})$$

アンサンブル平均と共分散：
$$\hat{\mathbf{x}}_{k|k-1} = \frac{1}{N}\sum_{j=1}^{N}\mathbf{x}_{k|k-1}^{(j)}$$

$$\mathbf{P}_{k|k-1} \approx \frac{1}{N-1}\sum_{j=1}^{N}(\mathbf{x}_{k|k-1}^{(j)} - \hat{\mathbf{x}}_{k|k-1})(\mathbf{x}_{k|k-1}^{(j)} - \hat{\mathbf{x}}_{k|k-1})^{\top}$$

更新ステップでは，観測にも摂動を加えた確率的観測 $\mathbf{z}_{k}^{(j)} = \mathbf{z}_{k} + \boldsymbol{\eta}_{k}^{(j)}$（$\boldsymbol{\eta}_{k}^{(j)} \sim \mathcal{N}(\mathbf{0},\mathbf{R}_{k})$）を用いて：

$$\mathbf{x}_{k|k}^{(j)} = \mathbf{x}_{k|k-1}^{(j)} + \mathbf{K}_{k}\,(\mathbf{z}_{k}^{(j)} - h(\mathbf{x}_{k|k-1}^{(j)}))$$

EnKFは高次元（$n \sim 10^{6}$〜$10^{9}$）の気象・気候モデルへの適用が主要な動機であり，陽にヤコビアン行列や $n \times n$ 行列を扱わずに済むことが最大の利点である。アンサンブルサイズ $N$ は通常 $O(10^{2})$〜$O(10^{3})$ のオーダーであり，$n$ に比べて極めて小さいため，ランク落ちした共分散近似となる。この問題に対処するため，局所化（localization）や膨張（inflation）と呼ばれる後処理的な修正が実用上不可欠である。

---

## 11. 粒子フィルターとの比較

粒子フィルター（Particle Filter, PF）は，シーケンシャル・モンテカルロ（SMC）法とも呼ばれ，非ガウス・非線形系の一般的なベイズ推定手法である。

重み付きサンプル（粒子） $\{(\mathbf{x}_{k}^{(i)},\, w_{k}^{(i)})\}_{i=1}^{N}$ によって事後分布を近似する：

$$p(\mathbf{x}_{k} \mid \mathbf{Z}_{k}) \approx \sum_{i=1}^{N} w_{k}^{(i)}\, \delta(\mathbf{x}_{k} - \mathbf{x}_{k}^{(i)})$$

重みの更新は尤度に比例：$w_{k}^{(i)} \propto p(\mathbf{z}_{k} \mid \mathbf{x}_{k}^{(i)})$

| 特性 | 線形KF | EKF | UKF | EnKF | 粒子フィルター |
|------|--------|-----|-----|------|--------------|
| 対応モデル | 線形ガウス | 弱非線形ガウス | 非線形ガウス | 非線形，高次元 | 非線形，非ガウス |
| 近似精度 | 最適（厳密） | 1次近似 | 3次近似 | アンサンブル近似 | サンプル数に依存 |
| 計算量 | $O(n^{3})$ | $O(n^{3})$ | $O(n^{3})$ | $O(Nn^{2})$ | $O(Nm)$ |
| パラメータ数 | — | — | $\alpha, \beta, \kappa$ | $N$，局所化 | $N$ |
| 高次元への適用 | 可 | 条件付き | 困難（$O(n^{3})$） | 可（$n \sim 10^{6}$） | 困難（次元の呪い） |
| ガウス性仮定 | 必要 | 必要 | 必要 | 必要 | 不要 |

粒子フィルターはガウス性を仮定しないため理論的な適用範囲が最も広いが，高次元空間では粒子の縮退（weight degeneracy）と呼ばれる現象（ほとんどの粒子の重みがゼロに近くなる問題）が顕著となり，粒子数を指数的に増やさなければならない（次元の呪い）。このためEnKFは気象・海洋の高次元問題での標準的な手法として広く採用されており，PFとEnKFのハイブリッド手法も活発に研究されている。

---

## 12. 平滑化アルゴリズム

カルマンフィルターは因果的（causal）な推定器であり，時刻 $k$ における推定に時刻 $k$ までの観測しか使用しない。これに対し，バッチ処理が許される場合は，時刻 $k$ 以降の観測も含む全観測 $\mathbf{Z}_{N}$ を用いた平滑化推定（smoothing）によって精度を向上できる。

### Rauch-Tung-Striebel（RTS）平滑化

RTSスムーザーは，まずカルマンフィルターを前向きに実行して $\hat{\mathbf{x}}_{k|k}$ と $\mathbf{P}_{k|k}$ を保存し，その後時刻 $N$ から過去方向に向かって以下の後退スムージングパスを実行する：

後退ゲイン：
$$\mathbf{G}_{k} = \mathbf{P}_{k|k}\,\mathbf{F}_{k+1}^{\top}\,\mathbf{P}_{k+1|k}^{-1}$$

平滑化推定値：
$$\hat{\mathbf{x}}_{k|N} = \hat{\mathbf{x}}_{k|k} + \mathbf{G}_{k}\,(\hat{\mathbf{x}}_{k+1|N} - \hat{\mathbf{x}}_{k+1|k})$$

平滑化共分散：
$$\mathbf{P}_{k|N} = \mathbf{P}_{k|k} + \mathbf{G}_{k}\,(\mathbf{P}_{k+1|N} - \mathbf{P}_{k+1|k})\,\mathbf{G}_{k}^{\top}$$

RTS平滑化の計算量はフィルタリングと同程度（$O(n^{3})$ per time step）であり，固定区間平滑化として広く用いられている。その他，固定ラグ平滑化（fixed-lag smoothing）や固定点平滑化（fixed-point smoothing）も状況に応じて使用される。

---

## 13. ノイズパラメータの推定と適応型手法

カルマンフィルターの性能は，ノイズパラメータ $\mathbf{Q}$ と $\mathbf{R}$ の設定に強く依存する。これらが未知または時変である場合，適応型手法が必要となる。

### 最尤推定（EM アルゴリズム）

対数周辺尤度（イノベーション表現）：

$$\log p(\mathbf{Z}_{N};\, \theta) = -\frac{1}{2}\sum_{k=1}^{N}\left[\log |\mathbf{S}_{k}| + \tilde{\mathbf{y}}_{k}^{\top}\,\mathbf{S}_{k}^{-1}\,\tilde{\mathbf{y}}_{k} + m\log(2\pi)\right]$$

ここで $\theta = \{\mathbf{Q}, \mathbf{R}, \ldots\}$ はハイパーパラメータ全体を表す。EMアルゴリズム（Expectation-Maximization）の枠組みでは，Eステップでカルマン平滑化を用いて十分統計量を計算し，Mステップでパラメータを更新することを繰り返す。

### 適応型手法

イノベーション系列 $\{\tilde{\mathbf{y}}_{k}\}$ は，フィルターが正しく同調されているとき白色性（自己相関がゼロ）を持つ。これを検定することで，$\mathbf{Q}$ や $\mathbf{R}$ のミスマッチを検出し，逐次的に修正するオンライン適応型アルゴリズムも存在する（Mehra 1970, Sage-Husa法など）。また，ベイズ的な枠組みで $\mathbf{Q}$ と $\mathbf{R}$ にハイパープライアーを置き，変分ベイズ推定によって一体的に学習する手法も提案されている。

---

## 14. 機械学習との融合

2020年代に入り，カルマンフィルターとディープラーニングを融合した手法の研究が急速に発展している。

### KalmanNet

Shlezinger et al.（2020, 2022）が提案したKalmanNetは，カルマンゲインの計算部分をリカレントニューラルネットワーク（RNN）で置き換える手法である。モデルの不確かさや非ガウスノイズに対してロバストな推定が可能であり，モデルベースのカルマンフィルターとデータ駆動的なニューラルネットワークの双方の長所を活かす。

### Recursive KalmanNet（2025年）

2025年6月に提案されたRecursive KalmanNetは，ゲイン計算と誤差共分散（コレスキー因子）の両方をそれぞれ専用のRNNで推定し，誤差共分散をJoseph形式で再帰的に伝播させる。ガウス負対数尤度（NLL）を損失関数として訓練することで，推定値と不確かさの両方を高精度に出力する。非ガウス計測ノイズ下での性能が従来手法を凌駕することが報告されている（arxiv: 2506.11639, 2025）。

### GAN-UKF 融合（2025年）

GAN（Generative Adversarial Network）とUKFを融合した手法では，GANがフィルターの直近の性能を基にリアルタイムでパラメータを予測・更新することで，非定常ノイズ環境下における非線形動的システムの状態推定性能を改善する（Nature Scientific Reports, 2025）。

### KF-NN カップリングによる適応的推定（2025年）

カルマンフィルターをニューラルネットワークと結合することで，運動状態認識・目標追跡に対する適応的な推定フレームワークが構築でき，自動運転・ロボットナビゲーション・金融予測などに応用されている（Int. J. Adaptive Control Signal Process., 2025）。

---

## 15. 主要応用分野

### 航法・測位

カルマンフィルターはGPS・INS（慣性航法システム）の融合による自己位置推定の中核技術である。GPS信号が途絶する環境（トンネル・市街地）においてもINSの積分誤差とGPS観測を最適に融合することで高精度な位置推定が維持される。アポロ月面探査機以来，航空・宇宙機・船舶の航法システムに組み込まれている。

### 自動運転

LiDAR・カメラ・レーダーなど異種センサーの観測融合に拡張カルマンフィルターやUKFが広く用いられており，車両の位置・速度・姿勢推定を実現している。自動運転車のSLAM（Simultaneous Localization and Mapping）においても重要な役割を果たす。

### 気象・海洋データ同化

数値気象予測モデル（格子点数 $\sim 10^{7}$〜$10^{9}$）とレーダー・衛星・地上観測データを融合する気象データ同化において，アンサンブルカルマンフィルターが世界中の主要気象機関で採用されている。ECMWFのEDA（Ensemble of Data Assimilations）やNOAAのGDASがその例である。

### バッテリー管理（SOC推定）

リチウムイオン電池の残量（State of Charge, SOC）推定において，電気化学モデルや等価回路モデルとEKF・UKFを組み合わせた推定手法が電気自動車のBMS（Battery Management System）で標準的に用いられている。最近では，ヒステリシスを考慮したEKFのチューニング手法が2025年に提案されている。

### ロボティクス

移動ロボットの状態推定，ロボットアームの関節角度推定，ドローンの飛行制御などにEKFやUKFが活用される。ROSなど主要なロボットミドルウェアでもカルマンフィルターの実装が標準的に組み込まれている。

### 信号処理・通信

経済・金融の時系列分析，音声処理（エコーキャンセラ），レーダー/ソナーの目標追跡（マルチターゲットトラッキング），脳波（EEG）・心電図（ECG）のノイズ除去など，信号処理全般においてカルマンフィルターは基盤的な手法として用いられる。

---

## まとめと展望

カルマンフィルターは，Rudolf Kalmanが1960年に提案した以来，線形ガウス状態推定の理論的最適解として広範な工学・科学分野に深く根付いてきた。その本質は，システムモデルと観測の両者に内在する不確かさを共分散行列で明示的に定量化し，それを最適な重みとして統合する逐次ベイズ推論の解析的実装にある。

EKF・UKF・EnKFといった非線形・大規模化への拡張によって，宇宙・気象・自動運転・エネルギー管理など現代の先端技術の中核を担うに至った。一方，2020年代に入ってからはKalmanNet・Recursive KalmanNet・GAN-UKF融合に代表されるように，データ駆動型のニューラルネットワークとモデルベースのカルマン構造を統合するハイブリッド手法が急速に発展しており，モデル不確かさや非ガウスノイズ環境下での性能限界を克服しようとする試みが続いている。

今後の展望として，(1) 高次元・リアルタイム処理における計算効率の改善（エッジコンピューティングへの実装），(2) ニューラルネットワークとカルマン構造の統合によるエンドツーエンドの不確かさ定量化，(3) マテリアルズ・インフォマティクスにおける実験データ同化への応用（材料プロセスの状態推定，物性パラメータの逐次推定），(4) プライバシー保護型連合学習（FedKalmanNet）との融合，といった方向が研究フロンティアとして注目される。カルマンフィルターは60年以上を経てなお，理論と応用の両面で革新を生み続けている手法である。

---

## 参考ドキュメント

1. 足立修一「線形カルマンフィルタの基礎」計測と制御, 56(9), 632–637 (2017)  
   https://www.jstage.jst.go.jp/article/sicejl/56/9/56_632/_pdf

2. 片山徹「非線形カルマンフィルタの基礎」計測と制御, 56(9), 638–643 (2017)  
   https://www.jstage.jst.go.jp/article/sicejl/56/9/56_638/_pdf

3. Kalman, R. E., "A New Approach to Linear Filtering and Prediction Problems," ASME J. Basic Eng., 82(1), 35–45 (1960)

## その他参考文献

- Julier, S. J. & Uhlmann, J. K., "New extension of the Kalman filter to nonlinear systems," Proc. SPIE 3068 (1997)
- Evensen, G., "Sequential data assimilation with a nonlinear quasi-geostrophic model using Monte Carlo methods to forecast error statistics," J. Geophys. Res. 99(C5), 10143–10162 (1994)
- Rauch, H. E., Tung, F. & Striebel, C. T., "Maximum likelihood estimates of linear dynamic systems," AIAA J. 3(8), 1445–1450 (1965)
- Shlezinger, N. et al., "KalmanNet: Neural Network Aided Kalman Filtering for Partially Known Dynamics," IEEE Trans. Signal Process. 70, 1532–1547 (2022)
- arxiv: 2506.11639, "Recursive KalmanNet: Deep Learning-Augmented Kalman Filtering for State Estimation with Consistent Uncertainty Quantification" (2025)
- Nature Scientific Reports, "Integrating GAN-based machine learning with nonlinear Kalman filtering for enhanced state estimation" (2025). https://www.nature.com/articles/s41598-025-26339-9
- Wiley, "A Novel Adaptive State Estimation Model: Kalman Filter Coupled With Neural Networks," Int. J. Adaptive Control Signal Process. (2025). https://onlinelibrary.wiley.com/doi/10.1002/acs.3982
- 足立修一「古くて新しいカルマンフィルタ（巻頭言）」計測と制御, 56(9), 630–631 (2017). https://www.jstage.jst.go.jp/article/sicejl/56/9/56_630/_pdf
- Wikipedia「カルマンフィルター」https://ja.wikipedia.org/wiki/%E3%82%AB%E3%83%AB%E3%83%9E%E3%83%B3%E3%83%95%E3%82%A3%E3%83%AB%E3%82%BF%E3%83%BC
- NTT「カルマンフィルタ — ごちきか」https://gochikika.ntt.com/Modeling/kalman_principle.html
- SIAM Review, "A Fresh Look at the Kalman Filter" https://epubs.siam.org/doi/10.1137/100799666
- arxiv:1910.03558, "A Step by Step Mathematical Derivation and Tutorial on Kalman Filters"
