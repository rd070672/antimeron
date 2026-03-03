# モンテカルロ法の基礎

モンテカルロ法は、乱数サンプリングによって期待値や分布を推定し、解析的に扱いにくい多自由度系でも統計量を評価する方法である。相互作用エネルギー（ハミルトニアン）さえ定義できれば、平衡物性・相転移・自由エネルギー差・希少事象・反応/拡散過程まで同一の枠組みで扱えるのが特徴である。

## 参考ドキュメント
- W. K. Hastings, Monte Carlo Sampling Methods Using Markov Chains and Their Applications, Biometrika 57, 97 (1970). 
　https://academic.oup.com/biomet/article-abstract/57/1/97/284580
- 伊庭 幸人, モンテカルロ法入門（講義資料） 
　https://www.ism.ac.jp/~iba/kougi_2006_ism/c20061.pdf
- KEK 計算科学センター, IsingモデルのMonte Carloシミュレーション（資料） 
　https://research.kek.jp/group/practice/SummerSchool08/TEXT/text2.pdf

## 1. 基本原理：期待値を標本平均で近似する
計算したい量を確率変数 $X$ の関数 $f(X)$ の期待値として書く。

$$
\mathbb{E}[f(X)] = \int f(x)\,p(x)\,dx
$$

$N$ 個の標本 $\{x_i\}_{i=1}^N \sim p(x)$ を得られれば、標本平均

$$
\hat{\mu}=\frac{1}{N}\sum_{i=1}^N f(x_i)
$$

は大数の法則により $\mathbb{E}[f(X)]$ に収束する。推定誤差の代表スケールは中心極限定理より概ね $O(N^{-1/2})$ であり、分散が大きいほど収束は遅くなる。

## 2. 重要度サンプリング：分布を「都合のよい形」に変える
積分の主要寄与が狭い領域に集中しているとき、一様サンプリングは効率が悪い。そこで、別分布 $q(x)$ で標本を生成し重み付けする。

$$
\int f(x)p(x)\,dx=\int f(x)\frac{p(x)}{q(x)}q(x)\,dx
\approx \frac{1}{N}\sum_{i=1}^N f(x_i)\,w(x_i),\quad w=\frac{p}{q}
$$

熱平衡では $p(x)$ がボルツマン重み $p(x)\propto e^{-\beta E(x)}$ になるため、低エネルギー領域を重点的に探索する仕掛け（提案分布、バイアス、交換法など）が効く。

## 3. MCMC（マルコフ連鎖モンテカルロ）：直接サンプルできない分布を「連鎖」で作る
多自由度系の $p(x)$ から独立標本を直接生成できない場合が多い。そこで、状態 $x_t$ を逐次更新して、定常分布が $p(x)$ になるマルコフ連鎖を構成する。

### 3.1 バランス条件と詳細釣り合い
遷移確率を $T(x\to x')$ とすると、定常分布 $p$ は

$$
p(x')=\sum_x p(x)\,T(x\to x')
$$

を満たす。十分条件として詳細釣り合い

$$
p(x)\,T(x\to x')=p(x')\,T(x'\to x)
$$

がよく用いられる。さらに、連鎖が状態空間を広く動ける（エルゴード性）ことが重要である。

### 3.2 メトロポリス法（正準分布の基本形）
候補 $x'$ を提案し、受理判定で $p(x)\propto e^{-\beta E(x)}$ に従うサンプル列を作る。エネルギー差 $\Delta E = E(x')-E(x)$ に対し、

$$
A(x\to x')=\min\left(1, e^{-\beta \Delta E}\right)
$$

で受理する。低温や障壁の高い景観では、局所更新だけだと停滞しやすい（後述）。

### 3.3 メトロポリス–ヘイスティングス法（一般化）
提案分布 $q(x'\mid x)$ が非対称でも、受理率を

$$
A(x\to x') = \min\left(1,\frac{p(x')\,q(x\mid x')}{p(x)\,q(x'\mid x)}\right)
$$

とすれば、所望の定常分布を実現できる。

### 3.4 疑似コード
```
Initialize x
for t = 1..Nstep:
propose x' ~ q(x'|x)
compute r = [p(x') q(x|x')] / [p(x) q(x'|x)]
accept with prob min(1, r):
x <- x'
record observables after burn-in
```

## 4. サンプルの相関と誤差評価：有効サンプル数を意識する
MCMC の標本は相関を持つ。自己相関時間 $\tau_{\mathrm{int}}$ が大きいほど「独立に近い標本」は減る。

- 有効サンプル数（目安） $N_{\mathrm{eff}}\approx N/(2\tau_{\mathrm{int}})$
- 誤差棒はブロック平均、ジャックナイフ、ブートストラップなどで推定する
- 初期状態依存を避けるため、burn-in（捨てステップ）を設ける

## 5. アンサンブルと代表的ムーブ（状態更新の設計）
相互作用モデルが同じでも、アンサンブルにより受理率の形が変わる。

### 5.1 正準（$NVT$）
- 固定粒子数 $N$、体積 $V$、温度 $T$
- 典型ムーブ：スピン反転、原子交換、局所変位など
- 受理率：メトロポリスの $e^{-\beta \Delta E}$

### 5.2 等温等圧（$NPT$）
体積（または格子）も更新し、エンタルピー型の確率重みを用いる。体積ムーブではヤコビアン（$V^N$）が現れ、受理率は典型に

$$
A=\min\left(1,\exp[-\beta(\Delta E + P\Delta V)]\left(\frac{V'}{V}\right)^N\right)
$$

の形になる（座標のスケーリングを伴う場合）。

### 5.3 大正準（$\mu VT$）と半大正準（合金の組成揺らぎなど）
挿入・削除（あるいは元素種の入れ替え）を許し、化学ポテンシャルを固定する。例として粒子挿入は概ね

$$
A_{\mathrm{ins}}=\min\left(1,\frac{V}{N+1}\exp[\beta\mu-\beta\Delta E]\right)
$$

の形を取る（提案確率の取り方で前因子は変わる）。

## 6. モンテカルロ法の主要な種類（何をサンプルするかで分類する）
以下は代表ファミリーであり、目的に応じて組み合わせて用いられる。

| 分類 | 代表手法 | 何を得るか | 強み | 注意点 |
|---|---|---|---|---|
| 直接サンプリング型 | 逆関数法、棄却法 | 独立標本 | 相関がない | 高次元で難しいことが多い |
| MCMC（局所更新） | メトロポリス、MH、ギブス | 平衡分布の標本列 | 実装が簡単で汎用 | 自己相関、停滞 |
| クラスター | Swendsen–Wang、Wolff | 臨界近傍の効率化 | クリティカル・スローイングダウンを緩和 | 適用できるモデルが限定される場合がある |
| 一般化アンサンブル | Umbrella sampling、multicanonical、Wang–Landau | 自由エネルギー、密度状態、希少事象 | 障壁越えが得意 | バイアス設計・収束診断が要点 |
| レプリカ交換 | Parallel tempering / replica exchange | 多峰性景観の探索 | 低温での停滞を緩和 | 複数温度（またはパラメータ）設計が必要 |
| 動力学（レート駆動） | kinetic MC（BKL/n-fold way）、Gillespie SSA | 時間発展（事象列） | 長時間スケールに強い | 反応率・遷移率モデルが本質 |
| 低偏差列 | Quasi-Monte Carlo | 積分の高精度化 | 条件次第で収束が速い | 不連続・高次元で工夫が必要 |

## 7. 代表アルゴリズムの要点
### 7.1 クラスター法（臨界近傍の停滞対策）
局所反転では臨界点近傍で相関長が伸び、緩和が遅くなる。クラスター法は相関した自由度をまとめて更新し、緩和を加速する。

- Swendsen–Wang：結合を確率的に生成してクラスタを同時反転
- Wolff：単一クラスタを成長させて反転

### 7.2 Umbrella sampling（自由エネルギー差・希少事象）
秩序変数 $\xi(x)$ に対してバイアス $W(\xi)$ を導入し、観測が難しい領域を意図的に訪れる。得られた分布は再重み付けして元の分布に戻す。

### 7.3 Wang–Landau（密度状態 $g(E)$ を直接推定）
エネルギー空間でランダムウォークし、ヒストグラムが平坦になるよう $g(E)$ を更新して密度状態を推定する。$g(E)$ が得られると

$$
Z(\beta)=\sum_E g(E)e^{-\beta E},\quad F(\beta)=-k_BT\ln Z
$$

が計算でき、温度を跨いだ熱力学量が一括で評価できる。

### 7.4 kinetic Monte Carlo（拡散・反応・相変態の時間発展）
遷移率 $\{k_i\}$ を列挙できるとき、次に起こる事象を確率 $k_i/\sum_j k_j$ で選び、時間刻みを

$$
\Delta t = -\frac{\ln u}{\sum_j k_j}\quad (u\sim U(0,1))
$$

で進める（Gillespie/BKL系の考え方）。原子拡散、析出・成長、表面反応、欠陥反応などに用いられる。

## 8. よくある落とし穴とチェック項目
- エルゴード性不足：ムーブが限定的で状態空間を回れない
- 臨界近傍の停滞：クラスター法、レプリカ交換、一般化アンサンブルを検討する
- 多峰性・メタ安定：初期条件依存やヒステリシスの検証が必要である
- 有限サイズ：サイズ依存と有限サイズスケーリングで判断する
- 乱数と再現性：乱数生成器、seed、並列化時の独立性に注意する
- 誤差評価：自己相関を考慮し、ブロック化や再サンプリングで誤差を付ける

## まとめ
- モンテカルロ法は、確率分布に従う標本を生成して期待値を標本平均で推定する計算法である。重要度サンプリングと MCMC により、多自由度系の平衡統計量や自由エネルギー、希少事象、さらに遷移率に基づく時間発展まで統一的に扱える。  
- 手法選択の要点は、(i) どの分布をサンプルするか（アンサンブル、バイアス、交換）と (ii) 相関・停滞をどう抑えるか（クラスター、一般化アンサンブル、kMC）であり、収束診断と誤差評価が信頼性を支える。

## 参考文献
- N. Metropolis et al., Equation of State Calculations by Fast Computing Machines, J. Chem. Phys. 21, 1087 (1953). 
　https://pubs.aip.org/aip/jcp/article/21/6/1087/202680/Equation-of-State-Calculations-by-Fast-Computing
- W. K. Hastings, Monte Carlo Sampling Methods Using Markov Chains and Their Applications, Biometrika 57, 97 (1970). 
　https://academic.oup.com/biomet/article-abstract/57/1/97/284580
- 伊庭 幸人, モンテカルロ法入門（講義資料） 
　https://www.ism.ac.jp/~iba/kougi_2006_ism/c20061.pdf
- KEK 計算科学センター, IsingモデルのMonte Carloシミュレーション（資料） 
　https://research.kek.jp/group/practice/SummerSchool08/TEXT/text2.pdf
- F. Wang and D. P. Landau, Determining the density of states for classical statistical models, Phys. Rev. E 64, 056101 (2001). 
　https://link.aps.org/doi/10.1103/PhysRevE.64.056101
- A. F. Voter, Introduction to the Kinetic Monte Carlo Method（解説） 
　https://helper.ipam.ucla.edu/publications/matut/matut_5898_preprint.pdf