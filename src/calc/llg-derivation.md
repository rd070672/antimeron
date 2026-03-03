# LLG方程式の導出とスピンダイナミクス

LLG（Landau–Lifshitz–Gilbert）方程式は、強磁性体における磁化ベクトルの歳差運動と緩和（減衰）を、連続体の場として記述する運動方程式である。磁区構造、磁壁運動、スピン波、強磁性共鳴（FMR）、電流誘起トルクなど多様な現象を、同一の数式骨格で扱える点に特徴がある。

## 参考ドキュメント
- L. Landau, E. Lifshitz, On the theory of the dispersion of magnetic permeability in ferromagnetic bodies (1935)
  https://verga.cpt.univ-mrs.fr/pdfs/Landau-1935fk.pdf
- T. L. Gilbert, A phenomenological theory of damping in ferromagnetic materials, IEEE Trans. Magn. 40, 3443–3449 (2004), DOI: 10.1109/TMAG.2004.836740
  https://www.semanticscholar.org/paper/A-phenomenological-theory-of-damping-in-materials-Gilbert/28ef7b88d387e97791a5d579e108bc8cf6c5ccb9
- 日本磁気学会スクール資料：マイクロマグネティックス（LLG方程式の概説を含む）
  https://www.magnetics.jp/archive/seminar/school/ss_034/ss_034_matsuyama.pdf


## 1. 記法と前提
空間点 $\mathbf{r}$ と時刻 $t$ における磁化を $\mathbf{M}(\mathbf{r},t)$ とし、飽和磁化を $M_s$ とする。単位磁化ベクトル
$
\mathbf{m}=\mathbf{M}/M_s,\qquad |\mathbf{m}|=1
$
を導入する。真空透磁率は $\mu_0$、有効磁場は $\mathbf{H}_{\mathrm{eff}}$ とする。

歳差運動の強さを決める係数としてジャイロ磁気比 $\gamma$ を用いる。符号規約は文献により異なるが、以下では歳差項が
$
\frac{\partial \mathbf{M}}{\partial t}=-\gamma\,\mathbf{M}\times \mathbf{H}_{\mathrm{eff}}
$
の形になる規約で議論する（$\gamma>0$ とする場合、電子磁気モーメントの符号をどこで吸収するかで表式が変わり得る）。

減衰の強さを表す無次元定数を $\alpha$（ギルバート減衰定数）とする。

## 2. 磁気モーメントのトルクから歳差運動へ
磁気双極子モーメント $\boldsymbol{\mu}$ が磁場 $\mathbf{B}$ 中にあるときのエネルギーは
$
U=-\boldsymbol{\mu}\cdot \mathbf{B}
$
であり、トルクは
$
\boldsymbol{\tau}=\boldsymbol{\mu}\times \mathbf{B}
$
である。角運動量 $\mathbf{S}$ に対して $\mathrm{d}\mathbf{S}/\mathrm{d}t=\boldsymbol{\tau}$ が成り立つ。

磁気モーメントと角運動量の比例関係
$
\boldsymbol{\mu}=\gamma\,\mathbf{S}
$
を用いると、
$
\frac{\mathrm{d}\boldsymbol{\mu}}{\mathrm{d}t}
=\gamma \frac{\mathrm{d}\mathbf{S}}{\mathrm{d}t}
=\gamma\,\boldsymbol{\mu}\times \mathbf{B}
$
となる。ここで $\mathbf{B}=\mu_0\mathbf{H}$（等方媒質・準静的）とみなせば、磁化 $\mathbf{M}$ に対しても本質的に同じ構造の歳差運動が得られる。重要なのは、右辺が外積であるため
$
\frac{\mathrm{d}}{\mathrm{d}t}|\mathbf{M}|^2
=2\mathbf{M}\cdot\frac{\partial\mathbf{M}}{\partial t}
=-2\gamma\,\mathbf{M}\cdot(\mathbf{M}\times\mathbf{H}_{\mathrm{eff}})=0
$
となり、歳差項だけでは $|\mathbf{M}|$ が保存される点である。すなわち、歳差運動は「向き」は変えるが「大きさ」は変えない回転運動である。

## 3. 有効磁場の定義：自由エネルギー汎関数の変分
連続体近似のマイクロマグネティクスでは、磁化配置 $\mathbf{m}(\mathbf{r})$ に対する全自由エネルギー（または内部エネルギー）を汎関数として定義し、その勾配が運動を駆動すると考える。

エネルギー汎関数を
$
E[\mathbf{m}]=\int_{\Omega} w(\mathbf{m},\nabla\mathbf{m},\mathbf{r})\,\mathrm{d}V
$
と書く。ここで $\Omega$ は磁性体領域、$w$ はエネルギー密度である。単位磁化 $\mathbf{m}$ を用いると、有効磁場は（SI系の一つの標準的定義として）
$
\mathbf{H}_{\mathrm{eff}}
=-\frac{1}{\mu_0 M_s}\,\frac{\delta E}{\delta \mathbf{m}}
$
で与えられる（$\delta/\delta\mathbf{m}$ は汎関数微分である）。

この定義は、平衡状態が
$
\mathbf{m}\times \mathbf{H}_{\mathrm{eff}}=\mathbf{0}
$
すなわち $\mathbf{m}\parallel \mathbf{H}_{\mathrm{eff}}$ で特徴づけられること（トルクが消えること）と整合する。

### 3.1 代表的エネルギー項と有効磁場
以下に、よく用いられるエネルギー項と対応する有効磁場の形をまとめる。境界条件や材料系により細部は変わり得るが、基本形は共通である。

| エネルギー項 | エネルギー密度 $w$ | 有効磁場への寄与（代表形） |
|---|---|---|
| ゼーマン（外部磁場） | $w_Z=-\mu_0 M_s\,\mathbf{H}_{\mathrm{ext}}\cdot\mathbf{m}$ | $\mathbf{H}_Z=\mathbf{H}_{\mathrm{ext}}$ |
| 交換相互作用 | $w_{\mathrm{ex}}=A|\nabla\mathbf{m}|^2$ | $\mathbf{H}_{\mathrm{ex}}=\dfrac{2A}{\mu_0 M_s}\nabla^2\mathbf{m}$ |
| 一軸異方性 | $w_{\mathrm{an}}=K_u\left(1-(\mathbf{m}\cdot\mathbf{u})^2\right)$ | $\mathbf{H}_{\mathrm{an}}=\dfrac{2K_u}{\mu_0 M_s}(\mathbf{m}\cdot\mathbf{u})\,\mathbf{u}$ |
| 反磁場（静磁エネルギー） | $w_d=\dfrac{\mu_0}{2}\mathbf{H}_d\cdot\mathbf{M}$ | $\mathbf{H}_d$ は磁気静力学から決まる |
| DMI（例：界面型） | $w_{\mathrm{DMI}}=D\left[m_z(\nabla\cdot\mathbf{m})-(\mathbf{m}\cdot\nabla)m_z\right]$ | 系に応じた微分演算子で与えられる |
| 磁気弾性（応力/ひずみ） | 例：$w_{\mathrm{me}}=-\dfrac{3}{2}\lambda_s\,\sigma_{ij}\left(m_i m_j-\dfrac{1}{3}\delta_{ij}\right)$ | 応力テンソル $\sigma_{ij}$ と結合 |

反磁場 $\mathbf{H}_d$ は、磁気静力学（準静的近似）で
$
\nabla\times \mathbf{H}_d=\mathbf{0},\qquad
\nabla\cdot(\mathbf{H}_d+\mathbf{M})=0
$
より $\mathbf{H}_d=-\nabla\phi$ とおけば
$
\nabla^2\phi=\nabla\cdot\mathbf{M}
$
というポアソン方程式に帰着する。形状（薄膜・微粒子など）に強く依存し、磁区形成や磁壁構造を支配する主要因の一つとなる。

## 4. LLG方程式の導出：LL形とGilbert形
LLG方程式は「歳差運動（保存的回転）」と「緩和（エネルギー散逸）」を同時に表す。

### 4.1 Landau–Lifshitz（LL）形
Landau–Lifshitz は歳差項に加えて二重外積の形の減衰項を導入した。代表的には
$
\frac{\partial \mathbf{M}}{\partial t}
=-\gamma\,\mathbf{M}\times \mathbf{H}_{\mathrm{eff}}
-\frac{\gamma\lambda}{M_s}\,\mathbf{M}\times(\mathbf{M}\times \mathbf{H}_{\mathrm{eff}})
$
である。第2項は $\mathbf{M}$ を $\mathbf{H}_{\mathrm{eff}}$ 方向へ向ける回転成分を与え、エネルギーを減少させるように働く。

### 4.2 Gilbert形（ギルバート減衰）
Gilbert は減衰を「角速度に比例する摩擦」に近い形で
$
\frac{\partial \mathbf{M}}{\partial t}
=-\gamma\,\mathbf{M}\times \mathbf{H}_{\mathrm{eff}}
+\frac{\alpha}{M_s}\,\mathbf{M}\times \frac{\partial \mathbf{M}}{\partial t}
$
と書く。右辺に $\partial\mathbf{M}/\partial t$ が含まれるため、これは暗黙形の方程式である。

この式を $\partial\mathbf{M}/\partial t$ について解くと、明示形として
$
\frac{\partial \mathbf{M}}{\partial t}
=-\frac{\gamma}{1+\alpha^2}
\left[
\mathbf{M}\times \mathbf{H}_{\mathrm{eff}}
+\frac{\alpha}{M_s}\,\mathbf{M}\times(\mathbf{M}\times \mathbf{H}_{\mathrm{eff}})
\right]
$
を得る。すなわち、Gilbert形は「歳差項＋LL形の二重外積項」の組合せに等価であり、$\alpha$ と LL の $\lambda$ は係数対応で結び付く。

### 4.3 LL形とGilbert形の比較
| 形式 | 方程式 | 物理的解釈 | 備考 |
|---|---|---|---|
| LL形 | $\partial_t\mathbf{M}=-\gamma\mathbf{M}\times\mathbf{H}_{\mathrm{eff}}-\dfrac{\gamma\lambda}{M_s}\mathbf{M}\times(\mathbf{M}\times\mathbf{H}_{\mathrm{eff}})$ | 歳差＋二重外積による緩和 | 直接的にエネルギー降下方向を作りやすい |
| Gilbert形 | $\partial_t\mathbf{M}=-\gamma\mathbf{M}\times\mathbf{H}_{\mathrm{eff}}+\dfrac{\alpha}{M_s}\mathbf{M}\times\partial_t\mathbf{M}$ | 歳差＋速度比例の粘性的減衰 | 明示形に直すと $(1+\alpha^2)^{-1}$ が現れる |

どちらの形を採用しても、通常の磁化ダイナミクスでは同等の予測を与えることが多い。ただし、外部から角運動量が注入される場合（電流誘起トルクなど）には、エネルギー収支の取り扱いと整合する形の選び方が議論の対象になり得る。

## 5. エネルギー散逸の構造
LLG方程式の重要点は、減衰項が「エネルギーを単調に減少させる」構造を持つことである。

Gilbert形の明示表式を用い、$\mathbf{H}_{\mathrm{eff}}=-(\mu_0 M_s)^{-1}\delta E/\delta\mathbf{m}$ の定義のもとでエネルギー時間変化を計算すると、一般に
$
\frac{\mathrm{d}E}{\mathrm{d}t}
=-\frac{\alpha\gamma\mu_0}{(1+\alpha^2)M_s}\int_{\Omega}
|\mathbf{M}\times \mathbf{H}_{\mathrm{eff}}|^2\,\mathrm{d}V
\le 0
$
となる。右辺は非正であり、減衰によって磁化はトルク $\mathbf{M}\times\mathbf{H}_{\mathrm{eff}}$ を消す方向、すなわち局所平衡 $\mathbf{M}\parallel\mathbf{H}_{\mathrm{eff}}$ に向かって緩和する。

この性質により、LLGは「磁区構造が時間発展の中で安定配置へ落ち着く」ことを自然に表現できる。磁壁のピン止めや熱揺らぎがある場合でも、エネルギー地形と駆動の競合として描像化できる。

## 6. 基本スケール：歳差周波数・緩和時間・長さ尺度
### 6.1 歳差周波数と緩和時間
単純に有効磁場が一様で大きさ $H_{\mathrm{eff}}$ のとき、歳差角速度は概ね
$
\omega \sim \gamma \mu_0 H_{\mathrm{eff}}
$
で与えられる。減衰が小さい場合、緩和の時間尺度は概ね
$
\tau \sim \frac{1}{\alpha\,\gamma\mu_0 H_{\mathrm{eff}}}
$
となる。したがって、$\alpha$ が小さいほど歳差は長く続き、共鳴線幅は狭くなる傾向を示す。

### 6.2 交換長と磁壁幅
交換と反磁場（あるいは異方性）の競合は、磁区パターンの長さ尺度を決める。代表的な交換長は
$
\ell_{\mathrm{ex}}=\sqrt{\frac{2A}{\mu_0 M_s^2}}
$
である。単純な一軸異方性 $K_{\mathrm{eff}}$ が支配的な場合、ブロッホ磁壁の幅は
$
\delta \sim \pi\sqrt{\frac{A}{K_{\mathrm{eff}}}}
$
程度で見積もられる。薄膜や界面DMIのある系では、ネール壁化やスキルミオン形成など、さらに形態が多様化する。

## 7. 線形化によるスピンダイナミクス：FMRとスピン波
LLGは非線形方程式であるが、平衡近傍の微小振動に線形化すると、実験と直結する分散関係や共鳴条件が得られる。

### 7.1 強磁性共鳴（FMR）
平衡磁化 $\mathbf{M}_0$ まわりの微小成分 $\delta\mathbf{M}$ を導入して線形化すると、外部磁場、異方性、反磁場の組合せにより共鳴条件が定まる。楕円体試料の反磁場係数 $N_x,N_y,N_z$ を用いた一つの基本形は（Kittel型の表現として）
$
\omega^2
=\gamma^2\mu_0^2
\left(H_{\mathrm{ext}}+H_k+(N_y-N_z)M_s\right)
\left(H_{\mathrm{ext}}+H_k+(N_x-N_z)M_s\right)
$
のように書ける（幾何と異方性の取り込み方で多様な形がある）。薄膜では $N_z\simeq 1, N_x\simeq N_y\simeq 0$ が近似的に成り立ち、面内・面外配置で共鳴周波数の磁場依存性が大きく変わる。

減衰 $\alpha$ は共鳴線幅や緩和と直結し、測定された線幅から有効な $\alpha$ を抽出する議論へつながる。

### 7.2 スピン波（マグノン）の分散
一様磁化を基準に、交換相互作用を含めて線形化すると、波数 $\mathbf{k}$ をもつ横揺らぎは概ね
$
\omega(\mathbf{k})
\approx \gamma\mu_0\left(
H_{\mathrm{eff,0}} + \frac{2A}{\mu_0 M_s}k^2
\right)
$
のような「交換に起因する $k^2$ 増大」を示す。反磁場は長波長で強く効き、表面モードやダモン–エシュバッハ型などの磁気静力学スピン波も現れる。微細構造（線幅、厚さ、境界条件）は許されるモードを量子化し、周波数スペクトルに直接反映される。

## 8. 非線形現象：磁壁運動・渦構造・歳差反転
線形化で扱えない代表例として、磁壁や渦（ボルテックス）の集団運動がある。LLGは局所スピンの回転であるが、しばしば少数の集団座標で近似できる。

例えば一次元磁壁では、磁壁中心位置 $q(t)$ と内部角 $\phi(t)$ を導入し、外部磁場やスピン流で駆動される運動方程式（Walkerの枠組み）が得られる。ここでは
- 交換と異方性が壁幅を決める
- 反磁場や形状が内部角の安定性を決める
- 減衰 $\alpha$ が移動度と定常解の存在範囲を決める
という因果が明確になる。

高周波磁場下では、平衡へ単調に戻るだけでなく、歳差運動を伴う反転（プリセッショナル・スイッチング）や自励発振（スピントルク発振器に相当）も生じ得る。これらはLLGの非線形性と外部駆動の組合せとして理解できる。

## 9. 拡張LLG：有限温度・スピン流・スピン軌道トルク
現代のスピンダイナミクスでは、LLGに追加項を加えた拡張方程式が広く用いられる。

### 9.1 熱揺らぎ：確率的LLG（stochastic LLG）
有限温度では、熱雑音を有効磁場に加え
$
\mathbf{H}_{\mathrm{eff}}\to \mathbf{H}_{\mathrm{eff}}+\mathbf{h}_{\mathrm{th}}(\mathbf{r},t)
$
とする。ブラウン運動に対応する等方ガウス雑音として、相関が
$
\langle h_{\mathrm{th},i}(t)h_{\mathrm{th},j}(t')\rangle
=\frac{2\alpha k_B T}{\gamma \mu_0 M_s V}\,\delta_{ij}\delta(t-t')
$
の形で与えられる（離散セル体積 $V$、温度 $T$）。この構造は、熱平衡分布と整合するように決まる。

スーパーパラ磁性、熱活性化による磁化反転、ノイズスペクトル評価などで中心的となる。

### 9.2 スピン移行トルク（STT）
電流がスピン偏極していると、角運動量が磁化へ移り、磁化にトルクが加わる。代表的に（極性ベクトル $\mathbf{p}$ を用いて）
$
\left.\frac{\partial\mathbf{m}}{\partial t}\right|_{\mathrm{STT}}
=-\gamma a_J\,\mathbf{m}\times(\mathbf{m}\times\mathbf{p})
-\gamma b_J\,\mathbf{m}\times\mathbf{p}
$
のような形が用いられる。第1項は減衰に似た形（反減衰にもなり得る）で、臨界電流や自励発振条件に強く関係する。

### 9.3 スピン軌道トルク（SOT）
スピンホール効果やラシュバ効果により、電流から界面近傍へスピン蓄積が生じ、STTと同様の二重外積型・単外積型トルクが現れる。表式はSOT機構・対称性により変わるが、LLGへ付加するという基本構造は共通である。

### 9.4 縦緩和を含む形式：LLB方程式
温度がキュリー温度 $T_C$ に近づくと $|\mathbf{M}|$ が一定である近似が破れ、磁化の大きさ自体が緩和する。これを取り込むため、縦方向緩和を含むLandau–Lifshitz–Bloch（LLB）方程式が用いられる場合がある。超高速磁化ダイナミクスや高温域の解析で重要になる。

### 9.5 拡張項の比較
| 拡張 | 追加される要素 | ねらい |
|---|---|---|
| stochastic LLG | 熱雑音磁場 $\mathbf{h}_{\mathrm{th}}$ | 有限温度での確率過程、熱活性化反転 |
| STT | $\mathbf{m}\times(\mathbf{m}\times\mathbf{p})$ など | 電流で磁化を駆動、発振・反転・磁壁駆動 |
| SOT | 対称性に応じたトルク項 | 重金属/界面起源の電流駆動 |
| LLB | $|\mathbf{M}|$ の変化を許す | 高温域・超高速での縦緩和 |

## 10. 連続体LLGと原子論的スピンモデルの接続
LLGが連続体の式である一方、原子スピン $\mathbf{S}_i$ に対して
$
\hbar\frac{\mathrm{d}\mathbf{S}_i}{\mathrm{d}t}=\mathbf{S}_i\times \mathbf{B}^{\mathrm{eff}}_i
$
というハイゼンベルグ運動方程式（量子）を出発点に、古典スピン近似と粗視化を経てLLG的な歳差項が得られるという見通しがある。交換相互作用は原子論的には Heisenberg Hamiltonian
$
\mathcal{H}=-\sum_{ij}J_{ij}\,\mathbf{S}_i\cdot\mathbf{S}_j
$
として現れ、連続体極限で $A|\nabla\mathbf{m}|^2$ に対応づけられる。

原子論（atomistic spin dynamics）は結晶欠陥や局所交換の不均一を直接扱える利点があり、連続体（micromagnetics）は形状・反磁場・長距離相互作用を効率よく扱える利点がある。目的スケールに応じた使い分けと接続が重要である。

## 11. 数値解法を意識したLLGの性質（式の構造として）
ここではアルゴリズム名に深入りせず、方程式自体が要請する性質を整理する。

1. 長さ制約 $|\mathbf{m}|=1$ がある  
LLGの連続体モデルは単位ベクトル場の時間発展であり、離散化してもこの制約を保つ工夫が必要になる。

2. 強い非線形項がある  
外積および二重外積は非線形であり、特に反磁場やDMIを含む場合に固有時間尺度が短くなり得る。

3. 有効磁場の計算が多物理へ広がる  
$\mathbf{H}_{\mathrm{eff}}$ はエネルギー汎関数から決まるため、反磁場のポアソン方程式、磁気弾性（応力場）、導電体中の渦電流（準静的Maxwell）などと結び付く。したがって、LLGは単独の常微分方程式に見えても、場の連成系として理解するのが自然である。

この「エネルギー汎関数→有効磁場→LLG」という流れは、磁区・磁壁・マグノン・共鳴の議論を統一的に接続する核となる。

## まとめ
LLG方程式は、磁気モーメントのトルクから導かれる歳差運動に、エネルギー散逸としての減衰を付加した磁化ダイナミクスの基本方程式である。自由エネルギー汎関数の変分として有効磁場を定義することで、交換・異方性・反磁場・DMI・磁気弾性など材料固有の要素を体系的に組み込み、FMRやスピン波の線形応答から磁壁運動やスピントルク発振の非線形現象までを同一形式で記述できる枠組みとなる。

## 関連研究
1. W. F. Brown Jr., Thermal Fluctuations of a Single-Domain Particle, Phys. Rev. 130, 1677 (1963)
   https://link.aps.org/doi/10.1103/PhysRev.130.1677
2. C. Kittel, On the Theory of Ferromagnetic Resonance Absorption, Phys. Rev. 73, 155 (1948)
   https://link.aps.org/doi/10.1103/PhysRev.73.155
3. D. C. Ralph, M. D. Stiles, Spin Transfer Torques (tutorial, 2008)
   https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=620024
4. 鈴木義茂, スピントロニクス―スピンの使い方, 応用物理 81, 156 (2012)（PDF）
   https://www.jstage.jst.go.jp/article/oubutsu/81/2/81_156/_pdf
5. 講義ノート（日本語）：LLG方程式の導出とGilbert項の解説を含む（東京都市大学）
   https://www.comm.tcu.ac.jp/quantum-device/semicon4/notes/note14.pdf
6. 田中智大 ほか, 大規模マイクロマグネティックシミュレーションを用いた永久磁石の保磁力解析（LLG言及を含む）, 日本金属学会誌（J-STAGE, 2023）
   https://www.jstage.jst.go.jp/article/jinstmet/87/5/87_JA202203/_html/-char/ja
7. 富士通, 汎用マイクロ磁化解析シミュレータの開発（LLGと場方程式の結合に関する記述を含む, PDF）
   https://img.jp.fujitsu.com/downloads/jp/jmag/vol55-3/paper09.pdf
