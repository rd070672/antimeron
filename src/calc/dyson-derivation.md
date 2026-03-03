# ダイソン方程式と多体電子状態の記述

ダイソン方程式は、相互作用を含む量子多体系のグリーン関数を、自由系の伝播と自己エネルギーへ分解して記述する枠組みである。電子構造・分光・輸送・応答の多くは、一次（1粒子）グリーン関数と、その拡張としての2粒子グリーン関数から統一的に議論できる。

## 参考ドキュメント
- F. J. Dyson, The S Matrix in Quantum Electrodynamics, Physical Review 75, 1736 (1949)
  https://doi.org/10.1103/PhysRev.75.1736
- L. Hedin, New Method for Calculating the One-Particle Green's Function with Application to the Electron-Gas Problem, Physical Review 139, A796 (1965)
  https://doi.org/10.1103/PhysRev.139.A796
- 東京大学 物性研究所, Korringa–Kohn–Rostoker Method（KKRグリーン関数法のノート, PDF）
  https://kkr.issp.u-tokyo.ac.jp/document/kkrnote.pdf

## 1. グリーン関数とは
グリーン関数は「ある自由度が、時空間的にどのように伝わるか」を定量化する道具である。固体中の電子を例にすると、結晶周期性や複数軌道、スピン、さらに電子相関・無秩序・界面・欠陥などにより、単純な一電子像からのずれが生じる。このずれを、エネルギー依存の複素量として集約したものが自己エネルギーであり、ダイソン方程式はその集約を数式として確立する。

グリーン関数の利点は、(i) スペクトル（準粒子と寿命）を与える、(ii) 応答関数（線形応答）を与える、(iii) 摂動論・近似理論を体系化する、の3点に要約できる。これらは、角度分解光電子分光、光学応答、電気伝導・熱伝導、スピン・電荷の揺らぎ、電子相関系の相転移などの議論に直結する。

## 2. 1粒子グリーン関数の基本定義
### 2.1 場の演算子と時間順序
電子の場の演算子を $\hat{\psi}(\mathbf{r},t)$、その随伴を $\hat{\psi}^{\dagger}(\mathbf{r},t)$ とする。ハイゼンベルク描像でのフェルミオン（1粒子）時間順序グリーン関数は
$$
G(1,2)=-i\langle T\,\hat{\psi}(1)\hat{\psi}^{\dagger}(2)\rangle
$$
で定義される。ここで $1\equiv(\mathbf{r}_1,t_1)$、$2\equiv(\mathbf{r}_2,t_2)$、$T$ は時間順序演算子であり、期待値は（一般には）熱平衡密度行列に対する平均である。

実時間形式では、因果性を明示する遅延（retarded）グリーン関数
$$
G^{R}(1,2)=-i\theta(t_1-t_2)\langle \{\hat{\psi}(1),\hat{\psi}^{\dagger}(2)\}\rangle
$$
が重要である。分光や散乱率と直接結びつくのは基本的に $G^{R}$ である。

### 2.2 松原（虚時間）グリーン関数
有限温度では虚時間 $\tau\in[0,\beta)$（$\beta=1/k_{B}T$）を用い、
$$
G(\mathbf{r}_1,\mathbf{r}_2;\tau)=-\langle T_{\tau}\,\hat{\psi}(\mathbf{r}_1,\tau)\hat{\psi}^{\dagger}(\mathbf{r}_2,0)\rangle
$$
を定義する。フェルミオンの周波数は松原周波数
$$
\omega_n=(2n+1)\pi/\beta
$$
で離散化される。多体摂動論や数値計算（特に有限温度）では、まず松原形式で計算し、その後に解析接続で実周波数へ移す流れが多い。

### 2.3 よく用いるグリーン関数の比較
| 種類 | 記号 | 定義の中心 | 周波数変数 | 主な用途 |
|---|---|---|---|---|
| 時間順序 | $G$ | $-i\langle T\,\psi\psi^{\dagger}\rangle$ | 実周波数（時間） | 摂動展開・ダイアグラム |
| 遅延 | $G^{R}$ | $-i\theta(t)\langle\{\cdot,\cdot\}\rangle$ | $\omega+i0^{+}$ | スペクトル・寿命・分光 |
| 先進 | $G^{A}$ | $+i\theta(-t)\langle\{\cdot,\cdot\}\rangle$ | $\omega-i0^{+}$ | 数学的整合・応答 |
| 松原 | $G(i\omega_n)$ | $-\langle T_{\tau}\,\cdot\rangle$ | 離散 $i\omega_n$ | 有限温度・数値計算 |
| lesser/greater | $G^{</>}$ | 非平衡の占有を含む | 実周波数 | 非平衡輸送・緩和 |

## 3. 自由系グリーン関数 $G_{0}$
### 3.1 自由ハミルトニアンと基底
自由（非相互作用）系を
$$
\hat{H}_0=\sum_{\alpha\beta} \hat{c}^{\dagger}_{\alpha} h_{\alpha\beta}\hat{c}_{\beta}
$$
と書く（$\alpha,\beta$ は運動量・軌道・スピン等をまとめた添字である）。このとき、自由グリーン関数 $G_0$ は演算子の運動方程式（EOM）から求まる。

### 3.2 周波数表示の形
並進対称な単一バンド（化学ポテンシャル $\mu$ を含める）では
$$
G_0(\mathbf{k},\omega)=\frac{1}{\omega+\mu-\varepsilon_{\mathbf{k}}+i0^{+}\,\mathrm{sgn}(\omega-\mu)}
$$
の形を持つ（厳密には $G^{R}_0$ と $G^{A}_0$ を区別する）。松原形式では
$$
G_0(\mathbf{k},i\omega_n)=\frac{1}{i\omega_n+\mu-\varepsilon_{\mathbf{k}}}
$$
と簡潔である。

この段階ではスペクトルは $\omega=\varepsilon_{\mathbf{k}}-\mu$ の鋭いデルタ構造であり、寿命は無限大である。実材料の広がりやサテライト、擬ギャップ、強い質量増大などは、以後に導入する自己エネルギーが担う。

## 4. 相互作用の導入と摂動展開
### 4.1 相互作用描像と展開
全ハミルトニアンを
$$
\hat{H}=\hat{H}_0+\hat{V}
$$
と分ける。相互作用描像では、時間発展は
$$
\hat{S}=T\exp\left(-i\int dt\,\hat{V}_I(t)\right)
$$
で与えられ、期待値は $\hat{S}$ を用いて整理される。ウィックの定理を用いると、相互作用の摂動展開は自由系の収縮（すなわち $G_0$）の組み合わせに還元され、各次数がダイアグラムとして体系化される。

### 4.2 等比級数の再和と「既約」概念
1粒子グリーン関数の摂動展開をダイアグラムで眺めると、同じ部分構造が繰り返し現れる。繰り返しを最小単位（1粒子既約：1粒子線を1本切って分離できない）にまとめたものが自己エネルギー $\Sigma$ である。

その結果、完全グリーン関数 $G$ は
$$
G = G_0 + G_0 \Sigma G_0 + G_0 \Sigma G_0 \Sigma G_0 + \cdots
$$
という構造を持つ。これは $G_0\Sigma$ を公比とする等比級数であり、形式的に再和するとダイソン方程式へ至る。

## 5. ダイソン方程式の導出
### 5.1 積分方程式（時空間表示）
等比級数の再和を積分表示で書くと
$$
G(1,2)=G_0(1,2)+\int d3\,d4\; G_0(1,3)\Sigma(3,4)G(4,2)
$$
となる。ここで $d3$ は空間・時間（あるいは虚時間）積分を表す。$\Sigma(3,4)$ は一般に非局在かつ時間非局所（周波数依存）であり、材料の多体効果が詰まった核である。

### 5.2 逆演算子形式
畳み込み積分を演算子積とみなすと
$$
G = G_0 + G_0 \Sigma G
$$
であり、両辺に $G_0^{-1}$ を作用させて
$$
G^{-1}=G_0^{-1}-\Sigma
$$
を得る。これはダイソン方程式の最もコンパクトな形である。多軌道・スピンを含む場合、$G$ と $\Sigma$ は行列であり、逆行列として理解する。

### 5.3 運動量・周波数表示
並進対称系では
$$
G(\mathbf{k},\omega)=\frac{1}{\omega+\mu-\varepsilon_{\mathbf{k}}-\Sigma(\mathbf{k},\omega)}
$$
となる（$G^{R}$ なら $\omega\to\omega+i0^{+}$ を含む）。この式は、バンド分散が相互作用でずれる、寿命が有限になる、強相関で複数極が現れる、といった現象を一つの分母へ集約している。

## 6. 自己エネルギーの物理的意味
### 6.1 エネルギーシフトと散乱率
遅延自己エネルギーを
$$
\Sigma^{R}(\mathbf{k},\omega)=\mathrm{Re}\,\Sigma^{R}(\mathbf{k},\omega)+i\,\mathrm{Im}\,\Sigma^{R}(\mathbf{k},\omega)
$$
と分けると、実部は準粒子エネルギーのずれ（分散の再正規化）を与え、虚部は寿命（散乱率）を与える。因果性からフェルミオンでは通常
$$
\mathrm{Im}\,\Sigma^{R}(\mathbf{k},\omega)\le 0
$$
が要請される。

### 6.2 準粒子とスペクトルの幅
準粒子方程式を
$$
\omega+\mu-\varepsilon_{\mathbf{k}}-\mathrm{Re}\,\Sigma^{R}(\mathbf{k},\omega)=0
$$
で定義すると、その解 $\omega=\varepsilon_{\mathbf{k}}^{\ast}$ の近傍で
$$
G^{R}(\mathbf{k},\omega)\approx \frac{Z_{\mathbf{k}}}{\omega-\varepsilon_{\mathbf{k}}^{\ast}+i\Gamma_{\mathbf{k}}}
$$
の形が得られる（十分鋭い準粒子が成立する範囲）。ここで
$$
Z_{\mathbf{k}}=\left[1-\frac{\partial \mathrm{Re}\,\Sigma^{R}(\mathbf{k},\omega)}{\partial \omega}\bigg|_{\omega=\varepsilon_{\mathbf{k}}^{\ast}}\right]^{-1},
\qquad
\Gamma_{\mathbf{k}}=-Z_{\mathbf{k}}\,\mathrm{Im}\,\Sigma^{R}(\mathbf{k},\varepsilon_{\mathbf{k}}^{\ast})
$$
である。$Z_{\mathbf{k}}$ はコヒーレント成分の重みであり、強相関で小さくなり得る。

### 6.3 クラマース・クローニッヒ関係
$G^{R}$ や $\Sigma^{R}$ は解析関数としての制約を受け、実部と虚部はクラマース・クローニッヒ関係で結びつく。したがって「寿命が短い」ことは、同時に「分散の形が変形する」ことを必然的に伴う。分光データの解釈やモデル化では、この整合性が重要である。

## 7. スペクトル関数と観測量への接続
### 7.1 スペクトル関数
遅延グリーン関数からスペクトル関数
$$
A(\mathbf{k},\omega)=-\frac{1}{\pi}\mathrm{Im}\,G^{R}(\mathbf{k},\omega)
$$
を定義する。$A$ は状態のエネルギー分布を表し、準粒子が鋭ければローレンツ型のピークになる。一般にはサテライトや連続成分を含み、強相関・プラズモン・電子-フォノン結合などの情報が現れる。

和則として
$$
\int_{-\infty}^{\infty} d\omega\; A(\mathbf{k},\omega)=1
$$
が成立する（単純化した1粒子の規格化に相当する）。

### 7.2 DOS と局所量
状態密度は
$$
N(\omega)=\sum_{\mathbf{k}} A(\mathbf{k},\omega)
$$
で与えられる。複数軌道系では軌道射影DOSやサイト射影DOSは、グリーン関数の対角成分や射影演算子で表現できる。

### 7.3 観測量との対応の表
| 観測量 | 主要な理論量 | 関係の基本形 |
|---|---|---|
| 角度分解光電子分光 | $A(\mathbf{k},\omega)$ | 強度 $\propto A(\mathbf{k},\omega)f(\omega)$（行列要素を除く） |
| 逆光電子・電子付加 | $A(\mathbf{k},\omega)$ | 占有の補完として $1-f(\omega)$ が現れる |
| 光学応答・伝導 | 電流相関（2粒子） | 久保公式で $\langle JJ\rangle$ を評価 |
| 磁化率・電荷感受率 | 動的感受率 $\chi$ | 2粒子グリーン関数（頂点補正が重要） |
| 不純物・欠陥の局所状態 | 局所 $G(\mathbf{r},\mathbf{r};\omega)$ | $N(\mathbf{r},\omega)=-\pi^{-1}\mathrm{Im}\,G^{R}(\mathbf{r},\mathbf{r};\omega)$ |

## 8. 2粒子グリーン関数とベーテ・サルペーター型方程式
1粒子のダイソン方程式に対応して、2粒子（応答）ではベーテ・サルペーター方程式（BSE）が現れる。たとえば動的感受率 $\chi$ は、裸のバブル $\chi_0$ と既約頂点 $\Gamma_{\mathrm{irr}}$ を用いて
$$
\chi=\chi_0+\chi_0\,\Gamma_{\mathrm{irr}}\,\chi
$$
の形を持つ。RPAは頂点を単純化して和を取る近似であり、集団励起（プラズモン、スピン波など）の基本像を与える。一方で強相関や局所相互作用が強い場合、頂点補正が定量性を支配する。

## 9. 電子構造法・多体近似における位置づけ
### 9.1 GW近似（自己エネルギーの近似として）
ダイソン方程式は恒等式であり、近似は自己エネルギー $\Sigma$ の評価に現れる。Hedin により、$\Sigma$、遮蔽相互作用 $W$、分極 $P$、頂点 $\Gamma$ を結ぶ自己無撞着方程式群（Hedin方程式）が導出され、GW近似はその第一段として
$$
\Sigma \approx iGW
$$
と置くものである。バンドギャップや準粒子エネルギーの改善に広く用いられる。

### 9.2 DMFT（局所自己エネルギー）
強相関系では、運動量依存を捨てて周波数依存を保持する局所自己エネルギー
$$
\Sigma(\mathbf{k},\omega)\approx \Sigma_{\mathrm{loc}}(\omega)
$$
が有効な場合がある。DMFTは格子模型を単一サイト（量子不純物）問題へ写像し、自己無撞着条件で浴（ハイブリダイゼーション）を決める。これによりモット転移や巨大質量増大など、バンド理論だけでは表しにくい現象を扱う。

### 9.3 KKRグリーン関数法と埋め込み（Dysonの幾何学的応用）
グリーン関数法の電子構造（多重散乱）では、参照系のグリーン関数 $G^{\mathrm{ref}}$ に対し、ポテンシャル差 $\Delta V$ を用いて
$$
G = G^{\mathrm{ref}} + G^{\mathrm{ref}}\,\Delta V\,G
$$
の形で「局所改変（欠陥、界面、クラスター）」を取り込む。これは自己エネルギーという多体起源とは別の意味での「Dyson型方程式」であり、同じ代数構造が埋め込み・散乱理論に現れる例である。無秩序・合金・欠陥の局所状態や散乱の扱いで重要である。

### 9.4 近似の比較
| 近似・枠組み | 自己エネルギー（または核） | 得意な物理 | 注意すべき点 |
|---|---|---|---|
| 摂動論（低次） | 特定次数の $\Sigma$ | 弱結合の補正 | 高次の寄与の取り込みが不足し得る |
| GW | $\Sigma\approx iGW$ | 準粒子エネルギー、遮蔽 | 頂点補正の扱いによって差が出る |
| DFT+DMFT | 局所 $\Sigma_{\mathrm{loc}}(\omega)$ | 強相関、モット、温度依存 | 二重計数や局在空間の定義が効く |
| T行列・CPA 等 | 散乱の再和 | 不純物・無秩序 | 多体相関の扱いは別途必要 |
| BSE（2粒子） | 頂点 $\Gamma_{\mathrm{irr}}$ | 励起子、光学応答 | 基底の取り方・近似の選択が重要 |

## 10. 計算・解析で意識すべき整合性
### 10.1 因果性と分光の整合
$G^{R}$ と $\Sigma^{R}$ は因果性を満たす必要がある。数値的に得た $G(i\omega_n)$ を実周波数へ移す際、解析接続の不安定性がスペクトルの偽ピークを生み得る。これは「データが有限である」ことに由来するため、和則（$\int A=1$）や $\mathrm{Im}\,\Sigma^{R}\le 0$ の確認が整合性の指標となる。

### 10.2 実周波数と虚周波数の使い分け
虚周波数は収束性が良い一方、実周波数の微細構造（サテライト、狭いギャップ近傍など）を直接見ない。実周波数で直接解く方法と、虚周波数から移す方法はそれぞれ利点があり、対象（温度、散乱の強さ、必要な分解能）に応じて選ぶことになる。

### 10.3 行列構造（多軌道・スピン・超伝導）
現実の材料では $G$ は行列となる。多軌道系では
$$
\mathbf{G}^{-1}(\mathbf{k},\omega)=\mathbf{G}_0^{-1}(\mathbf{k},\omega)-\mathbf{\Sigma}(\mathbf{k},\omega)
$$
であり、固有値問題ではなく「逆行列のゼロ点」を探す形になる。スピン軌道相互作用や非共線磁性では、スピン空間の混合が入り、対角化と解釈の順序が重要になる。超伝導ではナンブ空間（粒子・穴）へ拡張し、異常グリーン関数を含む行列ダイソン方程式として扱う。

## 11. ダイソン方程式から物性へ至る基本の流れ（概念）
1. 有効一電子ハミルトニアン（または参照系）から $G_0$ を定める。結晶では $\mathbf{k}$ 表示、欠陥・界面では実空間表示が自然である。  
2. 相互作用や散乱に基づき $\Sigma$（あるいは埋め込み核）を近似して与える。  
3. ダイソン方程式 $G^{-1}=G_0^{-1}-\Sigma$ を解いて $G$ を得る。  
4. $A(\mathbf{k},\omega)$、DOS、局所DOS、準粒子分散、寿命などを $G$ から計算する。  
5. 応答は2粒子量（$\chi$ や電流相関）へ進み、必要なら頂点補正を含む方程式を解く。  

この見取り図により、電子相関・無秩序・界面・励起の多様な題材が、同じ数式構造の上に整理される。

## まとめ
ダイソン方程式は、完全グリーン関数を自由グリーン関数と自己エネルギーに分解し、相互作用の効果を一つの核へ集約する恒等式である。自己エネルギーの実部と虚部はスペクトルの位置と幅を支配し、スペクトル関数やDOS、さらに応答関数の議論へ直結する。GWやDMFT、グリーン関数法の電子構造、BSEなどの多様な理論は、どの核をどの近似で与えるかという差として整理でき、材料の電子状態・分光・輸送・揺らぎを統一的に扱う基盤となる。

## 関連研究
- F. J. Dyson, The Radiation Theories of Tomonaga, Schwinger, and Feynman, Physical Review 75, 486 (1949)
  https://doi.org/10.1103/PhysRev.75.486
- A. Georges, G. Kotliar, W. Krauth, M. J. Rozenberg, Dynamical mean-field theory of strongly correlated fermion systems and the limit of infinite dimensions, Rev. Mod. Phys. 68, 13 (1996)
  https://doi.org/10.1103/RevModPhys.68.13
- G. Kotliar et al., Electronic structure calculations with dynamical mean-field theory, Rev. Mod. Phys. 78, 865 (2006)
  https://doi.org/10.1103/RevModPhys.78.865
- F. Aryasetiawan and O. Gunnarsson, The GW method, Rep. Prog. Phys. 61, 237 (1998)（arXiv版）
  https://arxiv.org/abs/cond-mat/9712013
- D. Golze, M. Dvorak, P. Rinke, The GW Compendium: A Practical Guide to Theoretical Photoemission Spectroscopy, Frontiers in Chemistry 7, 377 (2019)
  https://doi.org/10.3389/fchem.2019.00377
- 京都大学リポジトリ: 多体効果の最前線（2粒子グリーン関数とBSEの講義ノート, PDF）
  https://repository.kulib.kyoto-u.ac.jp/bitstream/2433/225166/1/bussei_el_061205.pdf
- 北海道大学 木田研究室: 量子輸送方程式と非平衡エントロピー（Dyson方程式への言及を含む, PDF）
  https://phys.sci.hokudai.ac.jp/~kita/QTEver3.pdf
