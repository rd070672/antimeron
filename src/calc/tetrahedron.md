# ブリルアンゾーン積分のテトラヘドロン法

テトラヘドロン法は、離散化された $k$ 点上のバンドエネルギーから、ブリルアンゾーン（BZ）積分を高精度に評価するための数値積分法である。特に状態密度（DOS）やフェルミ準位近傍の積分で、スミアリング法では鈍りやすい鋭い特徴を比較的忠実に再現できる点が重要である。

##  参考ドキュメント
- P. E. Blöchl, O. Jepsen, O. K. Andersen, Improved tetrahedron method for Brillouin-zone integrations, Phys. Rev. B 49, 16223 (1994)  
  https://doi.org/10.1103/PhysRevB.49.16223
- 高効率なブリルアン領域積分法の開発（テトラヘドロン法の考え方と図解）  
  https://white.phys.s.u-tokyo.ac.jp/research/opt_tetra.html
- tetrahedron法について（Quantum ESPRESSO チュートリアル・日本語）  
  https://www.cmpt.phys.tohoku.ac.jp/~koretsune/SATL_qe_tutorial/tetrahedron.html

## 1. なぜ BZ 積分が本質になるのか

周期系の電子状態では、観測量はしばしばバンド添字 $n$ と波数 $\mathbf{k}$ の和・積分として表される。代表例は以下である。

(1) 電子数（$T=0$ の占有）
$$
N = \sum_{n}\int_{\mathrm{BZ}}\frac{d^3k}{(2\pi)^3}\,\theta(\mu-\varepsilon_{n\mathbf{k}})
$$

(2) フェルミ分布 $f$ を用いた一般形（有限温度やスミアリングの形式に相当）
$$
N = \sum_{n}\int_{\mathrm{BZ}}\frac{d^3k}{(2\pi)^3}\,f(\varepsilon_{n\mathbf{k}}-\mu)
$$

(3) 一般の観測量（行列要素や期待値）
$$
I[A] = \sum_{n}\int_{\mathrm{BZ}}\frac{d^3k}{(2\pi)^3}\,A_{n}(\mathbf{k})\,\theta(\mu-\varepsilon_{n\mathbf{k}})
$$

(4) 状態密度（DOS）
$$
D(E) = \sum_{n}\int_{\mathrm{BZ}}\frac{d^3k}{(2\pi)^3}\,\delta\!\left(E-\varepsilon_{n\mathbf{k}}\right)
$$

ここで $\theta$ はヘヴィサイド関数、$\delta$ はデルタ関数、$\mu$ は化学ポテンシャル（$T=0$ ならフェルミエネルギー）である。数値計算では $k$ 点が有限個なので、$\int d^3k$ をどう近似するかが計算精度を支配する。

## 2. 基本発想：BZ を四面体に分割し、内部を線形補間して解析的に積分する

テトラヘドロン法の核は次の 2 点である。

- BZ（または既約 BZ）を多数の四面体（tetrahedra）に分割する
- 各四面体で $\varepsilon_{n\mathbf{k}}$ と必要なら $A_n(\mathbf{k})$ を頂点値から線形補間し、占有領域や $\delta$ 積分を四面体ごとに解析的に評価する

四面体 $T$ の 4 頂点を $\mathbf{k}_{1..4}$、対応するバンドエネルギーを $e_{1..4}=\varepsilon_{n\mathbf{k}_i}$ とする。四面体内部の点は重心座標 $\lambda_i$（$\sum_i\lambda_i=1,\ \lambda_i\ge 0$）で表せるため、

$$
\varepsilon_{n}(\mathbf{k}) \approx \sum_{i=1}^4 e_i\,\lambda_i(\mathbf{k})
$$

が自然な一次近似になる。同様に観測量（行列要素）も

$$
A_{n}(\mathbf{k}) \approx \sum_{i=1}^4 A_{i}\,\lambda_i(\mathbf{k}), \quad A_i = A_n(\mathbf{k}_i)
$$

と近似できる（改良法ではここをさらに補正する）。

このとき、四面体 $T$ の寄与は「頂点値の重み付き和」に落とせる：

$$
I[A] \approx \sum_{n}\sum_{T}\sum_{i=1}^4 w_{i}^{(n,T)}(\mu)\,A_n(\mathbf{k}_i)
$$

重要なのは、重み $w_i^{(n,T)}(\mu)$ が「その四面体の頂点エネルギー $e_i$ と $\mu$ の相対関係」だけで決まる点である。したがって、DOS も同様に「エネルギーごとの重み」で表現できる。

## 3. 線形テトラヘドロン法（Linear tetrahedron method）の数式構造

### 3.1 四面体内の占有体積（$\theta$ の積分）

四面体頂点のエネルギーを昇順に並べ替え、

$$
e_1 \le e_2 \le e_3 \le e_4
$$

とする。エネルギー $E$ に対して、四面体内で $\varepsilon(\mathbf{k}) \le E$ となる領域の体積（の四面体体積に対する割合）を $F(E)\in[0,1]$ とすると、線形補間のもとで $F(E)$ は区分的に解析式で書ける。

最も単純な区間の一つ（$e_1 \le E \le e_2$）では、占有体積比は

$$
F(E) = \frac{(E-e_1)^3}{(e_2-e_1)(e_3-e_1)(e_4-e_1)}
$$

となる。直感的には、$E$ が $e_1$ から上がると、四面体の一角から占有領域（切断体積）が $3$ 次で増えることを意味する。

他の区間 $e_2 \le E \le e_3$ および $e_3 \le E \le e_4$ でも同様に区分的な多項式で与えられ、$E$ が $e_4$ を超えると $F(E)=1$、$e_1$ 未満なら $F(E)=0$ となる。実装では「区間ごとに式を切り替える」形になる。

### 3.2 DOS（$\delta$ の積分）との関係

四面体 $T$ の寄与を $N_T(E)$（$E$ 以下の状態数）とすれば、DOS はその微分である：

$$
D_T(E) = \frac{dN_T(E)}{dE}
$$

線形テトラヘドロン法では $N_T(E)$ が区分的 3 次式になるため、$D_T(E)$ は区分的 2 次式として得られる。これはスミアリングで $\delta$ を幅広関数に置き換えるのとは異なり、離散 $k$ 点にもかかわらず「四面体内の幾何学」を使って $\delta$ 積分を解析的に処理している点に本質がある。

### 3.3 行列要素を含む積分

光学伝導度、電子フォノン結合、応答関数などでは一般に $A_n(\mathbf{k})$ が入る。線形法の最も基本の形は

- $\varepsilon(\mathbf{k})$ を線形補間
- $A(\mathbf{k})$ も線形補間

である。しかし金属ではフェルミ面近傍の寄与が支配的になり、$A(\mathbf{k})$ の変化や曲率が誤差に反映されやすい。この点を改善するのが Blöchl 補正や最適化テトラヘドロン法である。

## 4. 改良：Blöchl 補正（改良テトラヘドロン法）と最適化テトラヘドロン法

### 4.1 Blöchl 補正（Improved tetrahedron method）

改良テトラヘドロン法の代表は、Blöchl–Jepsen–Andersen による提案として広く引用される。要点は次である。

- $k$ 点メッシュと四面体分割を「平行移動対称な格子」として扱い、絶縁体では特殊点法と整合する性質を持たせる
- フェルミ面近傍での誤差低減のため、行列要素の線形近似を越える補正項を導入する
- 既約 $k$ 点と四面体の自動生成と、重み計算の再利用（同一バンド構造に対する効率化）を明確化する

この補正は、金属の全エネルギーや DOS、フェルミ面近傍の積分で改善として現れやすい。

### 4.2 最適化テトラヘドロン法（Optimized tetrahedron method）

線形テトラヘドロン法には、被積分関数が凸・凹であるときに系統的な過大評価・過小評価が出ることがある。最適化テトラヘドロン法は、この種の系統誤差を抑える方向で設計された改良であり、コードによっては “tetrahedra_opt” のような名称で提供される。

DFPT（格子振動）や電子フォノン計算においても、テトラヘドロン法の利用を前提とした入力が準備されている場合がある。

## 5. スミアリング法との違い

### 5.1 スミアリングの基本

スミアリング法は $\theta$ や $\delta$ を幅を持つ関数で近似し、

- SCF 収束を滑らかにする
- 金属での部分占有を扱いやすくする

という意図を持つ。一方で DOS の鋭い特徴（van Hove 特異点など）は、幅によって平滑化され見えにくくなる。

### 5.2 テトラヘドロン法の基本的な利点

- DOS の鋭いピークやギャップ端の立ち上がりを、幅広化に頼らず再現しやすい
- 固定の $k$ メッシュに対して、四面体内の寄与を解析的に扱うため、単純な $k$ 点加算より精度が出やすい
- フェルミ面をポリゴン（四面体切断面）として近似する幾何学が、金属の積分評価に直結する

ただし、収束性は $k$ メッシュ密度に強く依存する。テトラヘドロン法は「滑らかにして収束させる」思想とは逆であり、$k$ 点の密度が不足するとギザギザした DOS や不安定な $\mu$ 推定として現れる。

## 6. 計算コードでの位置づけ

複数の第一原理コードがテトラヘドロン法（あるいはその改良）を実装している。名称と設定項目はコードごとに異なる。

| 対象 | 目的 | 代表的な選択肢（呼び名） | 備考 |
|---|---|---|---|
| 電子 DOS | $D(E)$ を高精度に得る | tetrahedron / improved tetrahedron / tetrahedra_opt | スミアリングより鋭い特徴が残りやすい |
| 金属の全エネルギー | $\mu$ 近傍の積分精度 | Blöchl 補正つき tetrahedron | $k$ 密度が小さいと振れやすい |
| 電子フォノン・応答 | フェルミ面 integrals | tetrahedron 系 | オフセット格子など、特異性回避の工夫が入ることがある |
| フォノン DOS | $q$ メッシュ上の DOS | linear tetrahedron（既定） | 固有値（周波数）の補間と積分として同型である |

フォノン DOS は、$q$ 空間の積分と周波数デルタの取り扱いという意味で、電子の DOS と数式構造が近い。したがってテトラヘドロン法が自然に適用される。

## 7. 2D・低次元系への拡張と注意点

- 2 次元では、BZ を三角形に分割する三角形法が対応物になる（四面体の 2D 版である）
- 1 次元では線分分割に帰着する
- 実装上は 3D の四面体分割の枠組みを保ったまま、薄い方向のメッシュを制限して扱うこともあるが、数値的には $k$ メッシュ配置が精度を左右しやすい

低次元系ではフェルミ面（線・点）近傍の特異性が強くなる場合があり、メッシュ設計と積分法の相互作用が顕著になる。

## 8. どの観測量に効きやすいか

1. 状態密度（DOS）
- van Hove 特異点、擬ギャップ、ギャップ端の形などの再現に利点が出やすい

2. フェルミ準位近傍の積分
- 伝導電子が支配する量（比熱係数、輸送の前処理としての DOS、フェルミ面平均量など）に影響する

3. 応答関数・結合定数
- 行列要素の $\mathbf{k}$ 依存が強い場合、線形近似のみでは誤差が残るため、改良法やメッシュの工夫が効く

## まとめ

テトラヘドロン法は、BZ を四面体に分割し、四面体内を線形補間して解析的に積分することで、離散 $k$ 点から高精度な BZ 積分を実現する方法である。特に DOS やフェルミ準位近傍の鋭い特徴の評価に強みがあり、Blöchl 補正や最適化版により金属系・応答関数計算に対する精度改善も体系化されている。最終的な精度は $k$ メッシュ密度と分割の設計に依存するため、積分法と $k$ 点設定を同じ重要度で扱うのが要諦である。

## 関連研究
- M. Kawamura, Improved tetrahedron method for the Brillouin-zone integration, Phys. Rev. B 89, 094515 (2014)  
  https://doi.org/10.1103/PhysRevB.89.094515
- H. Lehmann, M. Taut, On the Numerical Calculation of the Density of States and Related Properties, Phys. Stat. Sol. (b) 54, 469 (1972)（総説的に参照される基本論文）  
  https://www.semanticscholar.org/paper/On-the-Numerical-Calculation-of-the-Density-of-and-Lehmann-Taut/83d16e10ea32dd2b410d42dc550fe3e199b1145e
- Phonopy Setting tags（フォノン DOS における linear tetrahedron が既定である旨）  
  https://phonopy.github.io/phonopy/setting-tags.html
- WIEN2k Usersguide（DOS を modified tetrahedron method で計算する旨）  
  https://www.wien2k.at/reg_user/textbooks/usersguide.pdf
- M. Y. Toriyama et al., Comparison of the Tetrahedron Method to Smearing Methods for the Electronic Density of States (2021)  
  https://arxiv.org/abs/2103.03469
- J. J. Jorgensen, G. L. W. Hart, Effectiveness of smearing and tetrahedron methods: best practices in DFT codes (2021)  
  https://arxiv.org/abs/2109.01196
