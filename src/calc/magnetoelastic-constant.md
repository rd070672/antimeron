# 電子論に基づく磁気弾性定数の導出
磁気弾性定数は、結晶のひずみと磁化方向が結合する強さを表す定数であり、磁歪・磁気異方性・弾性波応答をつなぐ中心量である。電子論では、主としてスピン軌道相互作用に起因する磁気結晶異方性エネルギーのひずみ依存性として定式化され、第一原理計算により定量導出できるものである。

本稿では、磁気弾性定数を自由エネルギー展開から定義し、磁歪定数・弾性定数との関係式を数式として導出する。さらに、電子状態の観点から磁気弾性結合が生じる機構を、スピン軌道相互作用・軌道角運動量・四重極子を軸に整理し、第一原理計算での導出手順と数値誤差の源を具体的に記す。

### 参考ドキュメント
1. P. Nieves ほか, MAELAS: MAgneto-ELAStic properties calculation via computational high-throughput approach, Comput. Phys. Commun. 264, 107964 (2021/2022).
2. E. Callen, H. B. Callen, Magnetostriction, Forced Magnetostriction, and Anomalous Thermal Expansion in Ferromagnets, Phys. Rev. 139, A455 (1965).
3. 朝原拓眞, 対称性の破れに誘起される新奇物性探索, 大阪大学 博士論文 (2020).


## 1. 記号と前提
ひずみテンソルを $\varepsilon_{ij}$、応力テンソルを $\sigma_{ij}$ とする。磁化の向きは単位ベクトル $\hat{m}$ で表し、結晶座標の方向余弦を $\alpha_x,\alpha_y,\alpha_z$ とする（$\alpha_x^2+\alpha_y^2+\alpha_z^2=1$）。体積を $V$、単位胞体積を $V_{\mathrm{cell}}$ とする。

弾性定数（2次）を $C_{ijkl}$、立方晶では Voigt 表記で $C_{11},C_{12},C_{44}$ を用いる。磁歪定数は、立方晶で飽和磁歪 $\lambda_{001}$（しばしば $\lambda_{100}$ と同一視される）および $\lambda_{111}$ を用いる。

## 2. 自由エネルギー展開による磁気弾性定数の定義

### 2.1 自由エネルギー密度の分解
温度一定での自由エネルギー密度 $f$ を、ひずみと磁化方向の関数として
$$
f(\varepsilon_{ij},\hat{m})
=
f_0
+
f_{\mathrm{el}}(\varepsilon_{ij})
+
f_{\mathrm{me}}(\varepsilon_{ij},\hat{m})
+
f_{\mathrm{mag}}(\hat{m})
+\cdots
$$
と展開する。ここで $f_{\mathrm{el}}$ は純弾性項、$f_{\mathrm{me}}$ は磁気弾性項、$f_{\mathrm{mag}}$ は磁気結晶異方性・ゼーマン項などを含む。

### 2.2 弾性エネルギー
一般には
$$
f_{\mathrm{el}}=\frac{1}{2} C_{ijkl}\varepsilon_{ij}\varepsilon_{kl}
$$
であり、立方晶の Voigt 表記では
$$
f_{\mathrm{el}}
=
\frac{1}{2}C_{11}(\varepsilon_{xx}^2+\varepsilon_{yy}^2+\varepsilon_{zz}^2)
+
C_{12}(\varepsilon_{xx}\varepsilon_{yy}+\varepsilon_{yy}\varepsilon_{zz}+\varepsilon_{zz}\varepsilon_{xx})
+
2C_{44}(\varepsilon_{xy}^2+\varepsilon_{yz}^2+\varepsilon_{zx}^2)
$$
となる。

### 2.3 立方晶の磁気弾性エネルギーと $b$ 定数
立方晶で、ひずみ一次の磁気弾性エネルギー密度は
$$
f_{\mathrm{me}}
=
b_0(\varepsilon_{xx}+\varepsilon_{yy}+\varepsilon_{zz})
+
b_1(\varepsilon_{xx}\alpha_x^2+\varepsilon_{yy}\alpha_y^2+\varepsilon_{zz}\alpha_z^2)
+
2b_2(\varepsilon_{xy}\alpha_x\alpha_y+\varepsilon_{yz}\alpha_y\alpha_z+\varepsilon_{zx}\alpha_z\alpha_x)
$$
で表される。$b_0$ は体積変化に対応する等方項、$b_1,b_2$ は磁化方向に依存する異方項である。

多くの文献では $(b_1,b_2)$ を $(B_1,B_2)$ と記す場合があり、定義は上式に対応する。符号規約は分野・文献により混在するため、必ず上式の形を起点にして式変形することが重要である。

### 2.4 応力と磁気弾性応力
応力は
$$
\sigma_{ij}=\frac{\partial f}{\partial \varepsilon_{ij}}
$$
で与えられる。磁気弾性項に由来する寄与は
$$
\sigma_{ij}^{\mathrm{me}}=\frac{\partial f_{\mathrm{me}}}{\partial \varepsilon_{ij}}
$$
である。例えば立方晶では
$$
\sigma_{xx}^{\mathrm{me}}=b_0+b_1\alpha_x^2,\quad
\sigma_{xy}^{\mathrm{me}}=2b_2\alpha_x\alpha_y
$$
などが得られる。

## 3. 磁歪定数と磁気弾性定数の関係式

### 3.1 ひずみの平衡条件
外力がない飽和状態での磁歪は、平衡ひずみ $\varepsilon_{ij}^{\ast}$ を
$$
\left.\frac{\partial (f_{\mathrm{el}}+f_{\mathrm{me}})}{\partial \varepsilon_{ij}}\right|_{\varepsilon=\varepsilon^{\ast}}=0
$$
で決めることに相当する。すなわち、純弾性応力と磁気弾性応力が釣り合う。

### 3.2 立方晶の $\lambda_{001}$ と $b_1$
磁化が $\hat{m}\parallel[001]$ のとき、$\alpha_z=1,\alpha_x=\alpha_y=0$ である。上の釣り合い条件を立方晶弾性式に適用すると、飽和磁歪（測定長さが [001] の場合）$\lambda_{001}$ と $b_1$ は
$$
\lambda_{001}=-\frac{2b_1}{3(C_{11}-C_{12})}
$$
で関係づけられる。したがって
$$
b_1=-\frac{3}{2}(C_{11}-C_{12})\lambda_{001}
$$
である。

$\lambda_{001}$ を $\lambda_{100}$ と同一視する流儀も多いが、測定方向と結晶対称性に依存するため、記号の定義は実験・理論双方で揃える必要がある。

### 3.3 立方晶の $\lambda_{111}$ と $b_2$
磁化が $\hat{m}\parallel[111]$ のとき、$\alpha_x=\alpha_y=\alpha_z=1/\sqrt{3}$ である。同様の手続きにより
$$
\lambda_{111}=-\frac{b_2}{3C_{44}}
$$
すなわち
$$
b_2=-3C_{44}\lambda_{111}
$$
が得られる。

### 3.4 単位と換算
$\lambda$ は無次元であり、しばしば $10^{-6}$ のオーダーで報告される。$C_{ij}$ は Pa（実用的には GPa）である。$b_i$ はエネルギー密度であり単位は J/m$^3$ で、Pa と同次元であるため MPa 表記も用いられる。

第一原理計算で全エネルギー $E$（eV/セル）を扱うとき、エネルギー密度への換算は
$$
f = \frac{E}{V_{\mathrm{cell}}}
$$
で行う。ここで $V_{\mathrm{cell}}$ は m$^3$ 単位に直す必要がある。

### 3.5 主要量の対応表
| 量 | 記号 | 次元 | 代表単位 | 第一原理での得方 |
|---|---|---|---|---|
| 弾性定数 | $C_{ij}$ | 応力 | GPa | $E(\varepsilon)$ の二階微分 |
| 磁気弾性定数 | $b_1,b_2$ | エネルギー密度 | MPa, J/m$^3$ | $E(\varepsilon,\hat{m})$ の一次係数（磁化方向差分） |
| 磁歪定数 | $\lambda_{001},\lambda_{111}$ | 無次元 | $10^{-6}$ | $b_i$ と $C_{ij}$ から換算、または格子定数最適化法 |
| 磁気異方性エネルギー | MAE | エネルギー密度 | J/m$^3$ | SOC を含む全エネルギー差 |

## 4. 電子論から見た磁気弾性結合の起源

### 4.1 二つの源
磁歪・磁気弾性応答は大別して二つの源を持つ。
- 交換相互作用に由来する等方的な体積変化
- 磁気結晶異方性エネルギーのひずみ依存性に由来する磁化方向依存の成分

ここで $b_1,b_2$ に直接対応するのは後者であり、スピン軌道相互作用を介して電子状態がひずみに感受することが本質である。

### 4.2 磁気弾性定数は MAE のひずみ微分である
異方的磁歪に対応する磁気弾性定数は、自由エネルギーの混合微分として捉えられる。実務的な計算では、特定のひずみモード $\varepsilon$ と磁化方向 $\hat{m}$ を選び、SOC を含む全エネルギーから
$$
b \sim \frac{\partial}{\partial \varepsilon}\left(\frac{E(\varepsilon,\hat{m}_1)-E(\varepsilon,\hat{m}_2)}{V_{\mathrm{cell}}}\right)\Bigg|_{\varepsilon\to 0}
$$
として求める。右辺の括弧はひずみ下の MAE に相当し、$b$ は MAE の一次のひずみ応答である。

### 4.3 摂動論で見た SOC 起源の構造
SOC を $H_{\mathrm{SOC}}=\xi\,\mathbf{L}\cdot\mathbf{S}$ とする。多くの遍歴電子系では、MAE は SOC の二次摂動で近似され、
$$
E_{\mathrm{MAE}}(\hat{m})
\approx
\sum_{o,u}
\frac{
\left|
\langle u | H_{\mathrm{SOC}}(\hat{m}) | o \rangle
\right|^2
}{
\epsilon_o-\epsilon_u
}
$$
の形で理解できる。ここで $|o\rangle$ は占有状態、$|u\rangle$ は非占有状態である。ひずみは
- 結晶場分裂（軌道のエネルギー配置）
- バンド幅と混成
- フェルミ準位近傍の状態密度
- 軌道混合の選択則と SOC 行列要素
を変化させるため、上式の分子・分母の双方が $\varepsilon$ に依存し、結果として $b_i$ が有限となる。

### 4.4 軌道モーメント異方性と Bruno 関係
一部の条件下で、MAE は軌道磁気モーメントの異方性に比例する近似式（Bruno 関係）で理解される。この近似を用いると
$$
\mathrm{MAE}\propto \Delta m_L
$$
となり、磁気弾性定数は
$$
b \propto \frac{\partial}{\partial\varepsilon}\Delta m_L
$$
として、ひずみによる軌道モーメント異方性の変化で解釈できる。特に遷移金属合金では、フェルミ準位近傍の $d$ 状態（$t_{2g},e_g$）の占有・混成が $\Delta m_L$ とそのひずみ応答を支配しやすい。

### 4.5 四重極子と van der Laan 型の寄与
近年の議論では、Bruno 型（スピン保存）に加え、スピン反転を伴う仮想励起が磁気異方性に寄与し、その量がスピン密度の四重極子的な性質と結びつく枠組み（van der Laan 型）が用いられる。磁気弾性定数は MAE のひずみ微分であるため、四重極子的自由度がひずみに強く応答する系では、$b_i$ の増大や符号反転が起こり得る。

### 4.6 希土類系における結晶場四重極子と格子の結合
局在 $4f$ 電子が支配的な系では、結晶場準位間の四重極子行列要素がフォノンと結合して磁気弾性効果を増強する。遍歴系の議論とは異なり、結晶場励起と格子振動が強く混成することが主要因となる場合がある。遷移金属系の $b_i$ を議論する際にも、軌道占有の非球対称成分を四重極子として追跡する視点は、微視的指標の設計に有用である。

## 5. 第一原理計算による $b_1,b_2$ の導出

### 5.1 計算で得るべきエネルギー
求めるのは、微小ひずみ $\varepsilon$ を与えた格子に対して、複数の磁化方向 $\hat{m}$ を固定した SOC 計算の全エネルギー $E(\varepsilon,\hat{m})$ である。$b_i$ は $\varepsilon\to 0$ の一次係数として抽出されるため、エネルギー差の収束が支配的となる。

### 5.2 ひずみモードの設計
立方晶の $b_1$ と $b_2$ を分離するため、以下のようなひずみモードを用いる。
- $b_1$ 用の正規ひずみ
$$
\varepsilon_{xx}=\delta,\quad \varepsilon_{yy}=-\delta,\quad \varepsilon_{zz}=0,\quad \varepsilon_{ij}=0\ (i\neq j)
$$
あるいは一軸歪みを用い、磁化方向差分で $b_1$ を抽出する。
- $b_2$ 用のせん断ひずみ
$$
\varepsilon_{xy}=\delta,\quad \varepsilon_{yx}=\delta,\quad \text{他は }0
$$

ひずみの表現は座標系に依存するため、結晶軸と計算セルの対応を明確にする必要がある。

### 5.3 エネルギーフィットによる抽出
ひずみ系列 $\delta_k$（正負を含む）について、例えば二つの磁化方向 $\hat{m}_a,\hat{m}_b$ を取り、
$$
\Delta E(\delta_k)=E(\delta_k,\hat{m}_a)-E(\delta_k,\hat{m}_b)
$$
を作る。微小ひずみでは
$$
\Delta E(\delta)=\Delta E(0)+A\,\delta + B\,\delta^2+\cdots
$$
と展開でき、$A$ が磁気弾性定数に比例する。体積で割ればエネルギー密度となる。

例えば、$b_1$ を抽出する設計では
$$
A \simeq V_{\mathrm{cell}}\,b_1\times(\text{方向余弦の組合せ})
$$
となり、方向余弦の因子は選んだ $\hat{m}_a,\hat{m}_b$ とひずみモードから解析的に決まる。$b_2$ も同様である。

### 5.4 格子定数最適化法（Wu–Freeman 型）による $\lambda$ の直接導出
別法として、ある磁化方向 $\hat{m}$ を固定したまま、測定長さ方向の格子定数を最適化し、磁化方向を変えたときの最適格子定数差から磁歪定数 $\lambda$ を直接得る方法がある。この方法は立方晶の異方磁歪の導出に用いられ、第一原理計算の高精度化とともに広く参照されてきた。得られた $\lambda$ と弾性定数 $C_{ij}$ を用いれば、前節の関係式から $b_i$ に換算できる。

### 5.5 弾性定数 $C_{ij}$ の電子論的導出
$C_{ij}$ は $E(\varepsilon)$ の二階微分として得られる。例えば立方晶では、ひずみモードを選び
$$
E(\delta)=E_0+\frac{1}{2}V_{\mathrm{cell}}\,M\,\delta^2+\cdots
$$
とフィットすることで $M$ を得て、$C_{11},C_{12},C_{44}$ に分解する。内部座標の緩和を許すか否かで、固定イオン（clamped-ion）と緩和イオン（relaxed-ion）の弾性定数が区別される。同じ区別は $b_i$ にも現れる。

### 5.6 応力からの導出
エネルギー差分法の代わりに、ひずみを与えた SOC 計算で応力 $\sigma_{ij}$ を直接得て、磁化方向差分
$$
\Delta\sigma_{ij}(\delta)=\sigma_{ij}(\delta,\hat{m}_a)-\sigma_{ij}(\delta,\hat{m}_b)
$$
の $\delta\to 0$ 極限から $b_i$ を抽出する考え方もある。実装可能性はコード・擬ポテンシャル・非共線 SOC 応力の扱いに依存するため、採用時は検証が要る。

## 6. 温度条件と弾性境界条件

### 6.1 一様ひずみと一様応力
磁気弾性現象では、実験条件が一様応力に近いのか一様ひずみに近いのかで観測される有効定数が変わり得る。理論的には、自由エネルギーの微分は境界条件に依存するため、定数の定義を
- 一様ひずみ一定（格子が固定される）
- 一様応力一定（格子が緩和できる）
のどちらに対応させるかを明示する必要がある。

### 6.2 有限温度での扱い
有限温度では、格子振動・スピンゆらぎが自由エネルギーに寄与し、$b_i(T)$ や $C_{ij}(T)$ が温度依存する。第一原理計算で $T$ を導入する方法としては、擬調和近似、スピン格子モデル、あるいは無秩序局所モーメント近似などが用いられる。室温近傍の定数を高精度に再現したい場合、$0$ K DFT の結果に熱膨張とスピンゆらぎの補正を積み上げる設計が必要となる。

## 7. 薄膜・界面における磁気弾性定数

### 7.1 エピタキシャルひずみと磁気弾性
薄膜では基板拘束により面内ひずみが固定され、面外が緩和する状況が生じる。このとき、バルク $b_i$ だけでなく、界面起源の磁気異方性や対称性低下により、実効磁気弾性応答が変質する。

### 7.2 ひずみ誘起磁気異方性の軌道分解解析
磁気弾性は MAE のひずみ微分であるため、MAE を軌道成分やサイト成分に分解し、どの電子状態が $\partial\mathrm{MAE}/\partial\varepsilon$ を担うかを特定することが、材料設計に直結する。遷移金属 $d$ 軌道では、フェルミ準位近傍の占有・非占有の接近が二次摂動の分母を小さくし、応答を増幅し得る。

## 8. 数値誤差の源と注意事項

### 8.1 ひずみ幅の選定
$\delta$ が大きすぎると高次項が混入し、$\delta$ が小さすぎると数値ノイズで一次係数が不安定になる。正負対称の系列（例：$\pm 0.5\%$ 程度までの複数点）を用い、一次・二次の両方を同時にフィットして線形係数の頑健性を確認することが重要である。

### 8.2 $k$ 点とスメアリング
$E(\hat{m}_a)-E(\hat{m}_b)$ は $\mu$eV/原子オーダーになり得るため、$k$ 点密度と占有の取り扱いが支配的となる。金属ではスメアリング幅を変えたときの $b_i$ の安定性確認が必要である。

### 8.3 SOC 設定と磁化方向拘束
非共線 SOC 計算では、磁化方向の取り扱い（初期磁化、拘束項、対称性の自動利用）が結果に影響する。磁化方向を変えたときに同一の電子状態分枝を追跡できているかを、総磁化・局所磁化・収束履歴で確認する必要がある。

### 8.4 内部座標緩和
ひずみを与えた構造で内部原子座標を緩和するか否かにより、得られる $b_i$ は異なる。測定が低周波で格子が追随できる状況に近いなら緩和イオン、超音波や高速過程で格子が追随しないなら固定イオンの定数が対応しやすい。

### 8.5 エネルギー密度換算
$E$（eV/セル）から $b$（J/m$^3$）に換算する際、$V_{\mathrm{cell}}$ の単位変換、ひずみ定義（工学ひずみかテンソルひずみか）、Voigt の因子（せん断成分の 2 の扱い）が混入しやすい。せん断ひずみでは $\varepsilon_{xy}$ の定義により係数が変わるため、式の出発点を明示して整合を取る必要がある。

## 9. 研究の組み立て例

### 9.1 電子状態指標と $b_2$ の接続
一例として、$t_{2g}$ の占有増大や、特定の SOC 行列要素 $\langle d_{xy}|\hat{L}_z|d_{yz}\rangle$ の増大が、MAE の符号・大きさを変え得る。これらがひずみに対して線形に変化するならば、$b_2\sim \partial\mathrm{MAE}/\partial\varepsilon_{xy}$ の強い応答として現れるため、DOS・軌道分解MAE・SOC行列要素の三点を同一の組成系列で整合的に示すことで、磁気弾性の電子論的起源を説得的に描ける。

### 9.2 多段階の検証
- $C_{ij}$ の再現性検証
- MAE の収束と符号の安定性検証
- $b_i$ の線形係数の頑健性検証
- $\lambda$ への換算と、実験値・既報値との比較
の順で積み上げると、議論の一貫性が保ちやすい。

## 10. まとめと展望
磁気弾性定数 $b_1,b_2$ は、ひずみ一次の磁気弾性自由エネルギー係数として定義され、立方晶では $\lambda_{001},\lambda_{111}$ および $C_{11},C_{12},C_{44}$ と解析的関係を持つ。電子論では、主として SOC に起因する MAE のひずみ微分として理解でき、第一原理計算により $E(\varepsilon,\hat{m})$ の高精度差分から定量導出できる。

今後は、軌道モーメント異方性や四重極子的自由度を媒介にした MAE の微視的分解を、ひずみ応答 $\partial/\partial\varepsilon$ と一体で行うことで、$b_i$ を電子状態指標に還元する設計指針が精密化される。さらに、有限温度のスピンゆらぎと格子自由度を同時に扱う枠組みが整備されれば、室温域での磁歪・磁気弾性応答を予測主導で最適化する道筋がより明確になるであろう。


## その他参考
- E. R. Callen, H. B. Callen, Static Magnetoelastic Coupling in Cubic Crystals, Phys. Rev. 129, 578 (1963).
- P. Nieves ほか, MAELAS 2.0, arXiv:2106.03624 (2021).
- R. Q. Wu, A. J. Freeman, 磁歪の第一原理計算法に関する一連の論文（J. Appl. Phys. 79, 6209 (1996) など）。
- Y. Miura, Understanding magnetocrystalline anisotropy based on orbital anisotropy and Bruno relation, J. Phys.: Condens. Matter 34, 473001 (2022).
- R. Watarai ほか, Strain-induced magnetocrystalline anisotropy in L2_1 Co2-based Heusler, npj Spintronics (2025).
- A. A. Turrini ほか, Magnetic-field control of magnetoelastic coupling in Tb2Ti2O7, Phys. Rev. B 104, 224403 (2021).
- J. Jensen, Magnetoelastic effects（講義ノート）, Section 5.4 (公開PDF)。
- 日本磁気学会誌 特集 磁歪材料最近の進展とその応用（J-STAGE 公開PDF）。
- Magnetoelasticity in MnPt L1_0 system, arXiv:2503.14693 (2025).
- Theory of giant magnetoelastic effect in soft systems, Sci. Adv. (2025).
