# RKKY相互作用と磁気秩序

RKKY相互作用は、伝導電子が媒介して局在スピン同士を結び付ける長距離の間接交換相互作用である。相互作用が距離とともに振動し符号が変わるため、強磁性・反強磁性だけでなく螺旋秩序やスピングラスなど多様な磁気秩序の起源になり得る。

## 参考ドキュメント
1. M. A. Ruderman and C. Kittel, Indirect Exchange Coupling of Nuclear Magnetic Moments by Conduction Electrons, Phys. Rev. 96, 99 (1954)
   https://link.aps.org/doi/10.1103/PhysRev.96.99
2. S. Doniach, The Kondo lattice and weak antiferromagnetism, Physica B+C 91, 231–234 (1977)
   https://www.sciencedirect.com/science/article/pii/0378436377901905
3. 大貫惇睦, 重い電子系の物理（近藤効果をめぐる）, 日本物理学会誌 60巻2号 (2005)（J-STAGE）
   https://www.jstage.jst.go.jp/article/butsuri1946/60/2/60_2_102/_article/-char/ja/

## 1. RKKY相互作用とは何か
RKKY相互作用（Ruderman–Kittel–Kasuya–Yosida interaction）とは、金属や半金属に埋め込まれた局在磁気モーメント（不純物スピン、希土類の4fスピンなど）が、母材の伝導電子を介して間接的に相互作用する現象である。直観的には、局在スピンが周囲の伝導電子スピン密度を偏極させ、その偏極が空間的に広がって別の局在スピンに作用する、という二段階の結合である。

この相互作用の重要性は次の2点にある。

- 長距離である（格子間隔より十分大きい距離まで影響が及ぶ）
- 相互作用の符号が距離で振動する（同じ材料でも配置により強磁性結合にも反強磁性結合にもなり得る）

この「振動」はフェルミ波数 $k_F$ によって決まり、しばしば $2k_F$ の周期（フリーデル振動と同根）として現れる。従って、キャリア密度、フェルミ面形状、次元性、スピン軌道相互作用などが磁気秩序を通じて現象に反映される。

## 2. 出発点：局在スピンと伝導電子の交換結合
RKKY相互作用は、局在スピン $S_i$ と伝導電子スピン密度 $s(r)$ の交換結合（s–d結合、あるいはKondo結合）から導かれる。

基本となるハミルトニアンの一例は
$$
H = \sum_{k\sigma}\epsilon_k c_{k\sigma}^\dagger c_{k\sigma}
- J_K \sum_i S_i \cdot s(r_i)
$$
である。ここで
$$
s(r)=\frac{1}{2}\sum_{\alpha\beta} c_\alpha^\dagger(r)\,\sigma_{\alpha\beta}\,c_\beta(r)
$$
であり、$J_K$ は局在スピンと伝導電子の結合の強さである。

$J_K$ を摂動として2次まで考えると、局在スピン同士の有効相互作用が生じる。その形は等方的な場合
$$
H_{\mathrm{RKKY}} = -\sum_{i<j} J_{ij}\, S_i \cdot S_j
$$
となり、
$$
J_{ij} \propto J_K^2\,\chi(r_{ij})
$$
で与えられる。ここで $\chi(r)$ は母材伝導電子系のスピン感受率（より正確には静的スピン感受率の実空間表示）である。

## 3. 感受率表現：$J(q)$ と磁気秩序波数の直接関係
RKKY相互作用の見通しを良くする表現が運動量空間である。実空間の相互作用 $J(r)$ のフーリエ変換
$$
J(q)=\sum_r J(r)e^{iq\cdot r}
$$
を用いると、線形応答の範囲で
$$
J(q) \propto J_K^2\,\chi(q)
$$
が成り立つ。ここで $\chi(q)$ はLindhard型の静的感受率であり、基本形として
$$
\chi(q)=\sum_k \frac{f(\epsilon_{k+q})-f(\epsilon_k)}{\epsilon_{k+q}-\epsilon_k}
$$
の形を持つ（定数因子や係数は規約に依存する）。

この式は磁気秩序の理解に直結する。すなわち、弱い相互作用の範囲では、秩序の波数 $q^\ast$ は概ね $J(q)$（同値に $\chi(q)$）が最大となる $q$ によって選ばれる。フェルミ面のネスティングが強いと $\chi(q)$ に鋭いピークが現れ、反強磁性やスピン密度波（SDW）的秩序が選好されやすい。

## 4. 自由電子モデルにおける基本式（3次元）
3次元等方的自由電子気体を想定すると、遠距離でのRKKY相互作用は
$$
J(r) = J_0 \frac{\sin(2k_F r)-2k_F r\cos(2k_F r)}{(2k_F r)^4}
$$
の形で書ける（$J_0$ は $J_K^2$ や状態密度などからなる係数であり、規約で異なる）。

この式から、十分大きい $r$ では
$$
J(r)\sim -J_0\frac{\cos(2k_F r)}{(2k_F r)^3}
$$
となり、(i) $2k_F$ の振動、(ii) $1/r^3$ での減衰、が同時に現れることが分かる。

同時に、局在スピンが誘起する伝導電子のスピン偏極も、遠距離で概ね
$$
\delta s(r)\propto \frac{\cos(2k_F r)}{r^3}
$$
のように振動しながら減衰する。これが「間にある電子が情報を運ぶ」という直観に対応する。

## 5. 次元性とバンド構造による変形
RKKY相互作用の距離依存は次元によって大きく変わる。単純な等方フェルミ液体を想定した場合の目安は以下である。

| 系の次元 | 遠距離での減衰（目安） | 振動 |
|---|---|---|
| 1次元金属 | $J(r)\propto \cos(2k_F r)/r$ | あり |
| 2次元金属 | $J(r)\propto \cos(2k_F r)/r^2$ | あり |
| 3次元金属 | $J(r)\propto \cos(2k_F r)/r^3$ | あり |

ただし、実材料では以下の要因で形が変わる。

- フェルミ面の異方性：$k_F$ が方向で異なり、振動周期や減衰の見かけが方向依存になる
- バンドの多谷性：複数の波数成分が重なり、ビート（多周期）を生む
- ギャップやディラック分散：状態密度や相関関数が通常のフェルミ液体と異なり、減衰則が変形する
- スピン軌道相互作用：有効相互作用が等方Heisenberg型に加えて、異方交換やDzyaloshinskii–Moriya型成分を持ち得る

例えば表面上の磁性原子対では、RKKY相互作用が強い方向性を持つことが実験的に可視化され、単純な等方モデルだけでは不十分であることが示されている。

## 6. 磁気秩序の多様性：強磁性から螺旋秩序、スピングラスへ
### 6.1 符号振動がもたらす秩序の分岐
RKKYの符号は距離で変わるため、格子上に規則正しく局在スピンが並ぶ場合でも、最近接だけでなく多数の結合が競合し得る。その結果、

- 強磁性：$J(q)$ が $q=0$ で最大
- 反強磁性：$J(q)$ が反強磁性ベクトル付近で最大
- 螺旋（ヘリカル）秩序：$J(q)$ が有限波数 $q^\ast\neq 0$ で最大

のように、秩序波数が多様になる。希土類金属で見られるヘリカル秩序は、局在4fモーメントが伝導電子を介して結合するという像と親和的である。

### 6.2 不規則配置とスピングラス
磁性不純物がランダムに配置された合金では、距離のランダム性がそのまま結合の符号ランダム性につながる。さらに長距離相互作用であるため多数のスピンが同時に結合し、強磁性・反強磁性の競合が空間的に入り交じる。

この状況はフラストレーションを生み、低温でスピングラス的凍結が起こり得る。いわゆるカノニカル・スピングラス（金属ホストに希薄な磁性不純物）が成立する条件として、RKKYの符号振動と合金化由来の乱れが協奏する、という見取り図が与えられる。

## 7. Kondo効果との競合とDoniach像（磁気秩序と非磁性基底状態）
局在スピンが伝導電子と強く結合すると、局在スピンがKondo遮蔽され、低温で有効モーメントが消失する方向に働く。一方、RKKYは局在モーメント同士を秩序化する方向に働く。

エネルギースケールの目安として

- RKKYスケール：
  $$
  T_{\mathrm{RKKY}}\sim J_K^2 N(E_F)
  $$
- Kondo温度（目安）：
  $$
  T_K \sim D \exp\left(-\frac{1}{J_K N(E_F)}\right)
  $$
  ただし $D$ は帯域幅、$N(E_F)$ はフェルミ準位状態密度である。

小さい $J_K$ では $T_{\mathrm{RKKY}}$ が相対的に優勢となり、磁気秩序が現れやすい。大きい $J_K$ では $T_K$ が上昇し、Kondo遮蔽が優勢となって非磁性（重いフェルミ液体や価数揺動状態）へ向かう。この競合を概念図にまとめたものがDoniach図式であり、希土類・アクチノイドを含む多くの強相関金属で、磁気秩序と非磁性重い電子状態の境界（量子臨界）理解の出発点として用いられてきた。

## 8. 多層膜・人工周期構造におけるRKKY様相互作用（層間交換結合）
RKKYに近い機構として、非磁性スペーサ層を挟んだ強磁性層同士が、スペーサの電子状態を介して層間で結合する現象がある。層間交換結合は、スペーサ厚さに対して結合の符号・大きさが振動し、その周期がスペーサのフェルミ面のスパニングベクトルと関係することが理論・実験の双方で強調されている。

この系では「距離」がスペーサ厚さに対応し、RKKYの核心である「フェルミ面が周期を決める」「振動する」という特徴がそのまま観測量になるため、RKKY的理解が特に有効である。

## 9. 計算・モデル化の基本：$J_{ij}$ をどう得るか
RKKY相互作用は、(i) 有効Heisenberg模型の $J_{ij}$、あるいは (ii) 感受率 $\chi(q)$、という2つの側面で扱える。実材料での見積もりには以下が用いられる。

### 9.1 感受率からの構成
母材の電子構造を与え、静的スピン感受率 $\chi(q)$ を計算し、
$$
J(q)\propto J_K^2\chi(q)
$$
として秩序波数や相互作用の傾向を議論する。多バンド・異方フェルミ面の効果を含めやすい利点がある。

### 9.2 第一原理に基づく交換パラメータ
密度汎関数理論（局所スピン密度近似など）とGreen関数形式により、Heisenberg模型の交換定数 $J_{ij}$ を得る枠組みが確立されている。これはRKKYに限らず一般の交換を包含するが、金属磁性や合金で $J_{ij}$ の距離依存を調べる際に基盤となる。

## 10. 交換機構の比較
RKKYは交換の一類型であり、他の機構と併存する。整理のために要点を表にまとめる。

| 交換機構 | 媒介 | 距離スケール | 符号 | 反映されやすい材料パラメータ |
|---|---|---|---|---|
| 直接交換 | 軌道重なり | 近距離 | 固定されやすい | 波動関数の重なり、結合長 |
| 超交換 | 配位子を介した仮想遷移 | 近〜中距離 | 多くは反強磁性 | 結合角、価電子配置 |
| 二重交換 | キャリア移動とHund結合 | 中距離 | 強磁性的になりやすい | 伝導度、混合原子価 |
| RKKY（間接交換） | 伝導電子のスピン偏極 | 長距離 | 振動（符号反転） | $k_F$、フェルミ面、次元性、$N(E_F)$ |

## 11. 何が「RKKYらしさ」になるか
RKKYに由来する特徴は、電子状態の幾何（フェルミ面）と磁気秩序が結び付く点にある。観測的には次が手がかりになる。

- 結合の振動性：厚さや距離の制御で強磁性／反強磁性の切替が起きる（多層膜、表面アドアトム系など）
- 秩序波数の非自明性：$q^\ast\neq 0$ の螺旋秩序や複雑な磁気構造が現れ、しかもキャリア密度・圧力・置換で $q^\ast$ が変化する
- 希薄系の凍結：乱れと符号振動が合わさり、スピングラス的凍結が現れる
- 強相関との競合：Kondo遮蔽と秩序化の競合により、量子臨界近傍で磁気揺らぎが強くなる（Doniach像）

## まとめ
RKKY相互作用は、局在スピンが作る伝導電子のスピン偏極を介して生じる長距離・振動型の間接交換である。$J(q)\propto \chi(q)$ という関係により、フェルミ面の形状や次元性が磁気秩序（秩序波数・競合・凍結）に直結し、希土類金属の螺旋秩序、希薄合金のスピングラス、Kondo格子の競合図式、多層膜の層間交換結合など幅広い現象の共通言語として機能するのである。

## 参考文献
- T. Kasuya, A Theory of Metallic Ferro- and Antiferromagnetism on Zener's Model, Prog. Theor. Phys. 16, 45 (1956)（PDFホストの一例）
  https://scispace.com/pdf/a-theory-of-metallic-ferro-and-antiferromagnetism-on-zener-s-2jc4t0h5ch.pdf
- JPSJ（RKKYの原典文献列挙を含むページ）
  https://www.jstage.jst.go.jp/article/jpsj1946/38/1/38_1_65/_pdf/-char/ja
- L. Zhou et al., Strength and directionality of surface Ruderman–Kittel–Kasuya–Yosida interaction, Nature Physics 6, 187–191 (2010)
  https://www.nature.com/articles/nphys1514
- M. D. Stiles, Interlayer Exchange Coupling（review, NIST, PDF）
  https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=620544
- Mark van Schilfgaarde and Walter A. Harrison, Oscillatory exchange coupling: RKKY or quantum-well mechanism?, Phys. Rev. Lett. 71, 3870 (1993)
  https://link.aps.org/doi/10.1103/PhysRevLett.71.3870
- S. R. Power and M. S. Ferreira, Indirect Exchange and RKKY Interactions in Magnetically-Doped Graphene, Crystals 3, 49 (2013)
  https://www.mdpi.com/2073-4352/3/1/49
- M. Sherafati and S. Satpathy, RKKY interaction in graphene from the lattice Green's function, Phys. Rev. B 83, 165425 (2011)（accepted PDF）
  https://link.aps.org/accepted/10.1103/PhysRevB.83.165425
- A. I. Liechtenstein et al., Local spin density functional approach to the theory of exchange interactions in ferromagnetic metals and alloys, JMMM 67, 65 (1987)（PDFホストの一例）
  https://bdt.semi.ac.cn/download/0.4966214616422391.pdf
- 東京大学物性研究所ニュース（RKKY相互作用の一般向け説明を含む）
  https://www.issp.u-tokyo.ac.jp/maincontents/news2.html?pid=27110
- H. Kawamura, Spin Glasses（canonical spin glassにおけるRKKYと乱れの役割に言及）, Elsevier (2015)
  https://www.sciencedirect.com/science/article/abs/pii/S1567271915000025
