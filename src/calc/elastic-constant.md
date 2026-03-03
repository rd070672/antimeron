# 電子論に基づく弾性定数の導出
本稿は、結晶の弾性定数を電子状態理論から導き、第一原理計算で評価するための数式と考え方を体系的に整理するものである。密度汎関数理論における全エネルギー、応力、線形応答の関係を起点に、原子緩和や有限温度効果まで一貫した式でつなぐ。

### 参考ドキュメント
- S. Baroni, S. de Gironcoli, A. Dal Corso, P. Giannozzi, Phonons and related crystal properties from density-functional perturbation theory, Rev. Mod. Phys. 73, 515 (2001).   
  https://doi.org/10.1103/RevModPhys.73.515

- ABINIT Tutorial, Elastic properties (elastic and internal strain, rigid-atom, relaxation corrections).   
  https://docs.abinit.org/tutorial/elastic/

- アドバンスソフト, 第一原理計算による弾性定数の予測と材料特性の探求（PHASE 解説）   
  https://case.advancesoft.jp/PHASE/elastic/index.html


## 1. 弾性定数の位置づけ
弾性定数は、結晶に加えた微小な変形に対するエネルギーと応力の二次応答を与える量である。結合の硬さ、方向性、内部自由度の結合、有限温度の自由エネルギー曲率が反映される。

弾性定数は、電子論的には自由エネルギーの二階微分である。したがって、電子状態が変形にどう追随するかが本質となる。第一原理計算では、電子の基底・占有・交換相関近似、原子緩和、磁気状態、有限温度自由エネルギーの取り方が結果を左右する。



## 2. ひずみと応力のテンソル
### 2.1 微小ひずみ
微小変位場を $u_i(\mathbf{r})$ とすると、線形化したひずみテンソルは
$$
\varepsilon_{ij}=\frac{1}{2}\left(\frac{\partial u_i}{\partial x_j}+\frac{\partial u_j}{\partial x_i}\right)
$$
である。対称テンソルであるため独立成分は6個である。

### 2.2 Voigt 表記
弾性テンソル $C_{ijkl}$ を6×6に写像するために Voigt 表記を用いる。写像の一例は
- $11\to 1,\ 22\to 2,\ 33\to 3$
- $23\to 4,\ 13\to 5,\ 12\to 6$

せん断成分の取り方には慣習がある。工学ひずみ $\gamma_{ij}=2\varepsilon_{ij}$ を用いる規約では、行列 $C_{IJ}$ の要素が規約依存となるため、論文・ソフトの定義に合わせて一貫させる必要がある。

### 2.3 応力と弾性定数
線形弾性では
$$
\sigma_{ij}=\sum_{kl} C_{ijkl}\,\varepsilon_{kl}
$$
である。Voigt 表記では
$$
\sigma_I=\sum_J C_{IJ}\,\varepsilon_J
$$
である。


## 3. 自由エネルギー展開としての弾性定数
### 3.1 ひずみによる自由エネルギーの展開
平衡体積 $V_0$ の結晶に一様ひずみ $\varepsilon$ を与えたとき、自由エネルギー $F$ を
$$
F(\varepsilon)=F_0+V_0\sum_I \sigma_I\,\varepsilon_I+\frac{V_0}{2}\sum_{IJ} C_{IJ}\,\varepsilon_I\varepsilon_J+O(\varepsilon^3)
$$
と展開する。基底状態で外部応力がゼロなら一次項は消え
$$
C_{IJ}=\frac{1}{V_0}\left.\frac{\partial^2 F}{\partial\varepsilon_I\partial\varepsilon_J}\right|_{\varepsilon=0}
$$
となる。

### 3.2 0 K と有限温度の違い
0 K の静的弾性定数は、通常、ボルン・オッペンハイマー近似のもとでの基底状態全エネルギー $E_{\mathrm{BO}}$ を用いて
$$
C_{IJ}(0)=\frac{1}{V_0}\left.\frac{\partial^2 E_{\mathrm{BO}}}{\partial\varepsilon_I\partial\varepsilon_J}\right|_{\varepsilon=0}
$$
と書く。

有限温度では、弾性定数は自由エネルギーに対して定義する。代表的には
$$
F(T,\varepsilon)=E_{\mathrm{BO}}(\varepsilon)+F_{\mathrm{vib}}(T,\varepsilon)+F_{\mathrm{el}}(T,\varepsilon)+\cdots
$$
であり、等温弾性定数は
$$
C^T_{IJ}(T)=\frac{1}{V}\left.\frac{\partial^2 F(T,\varepsilon)}{\partial\varepsilon_I\partial\varepsilon_J}\right|_{\varepsilon=0}
$$
である。



## 4. 密度汎関数理論における応力
### 4.1 Kohn–Sham 全エネルギーと応力
密度汎関数理論では、電子密度 $n(\mathbf{r})$ により全エネルギーを
$$
E[n]=T_s[n]+\int v_{\mathrm{ext}}(\mathbf{r})\,n(\mathbf{r})\,d\mathbf{r}+E_{\mathrm{H}}[n]+E_{\mathrm{xc}}[n]+E_{\mathrm{ion-ion}}
$$
のように表す。ひずみは、格子ベクトル・イオン配置・外部ポテンシャルの幾何学を通じて $E$ を変化させる。

応力は（平衡解における変分条件を用いて）
$$
\sigma_{ij}=\frac{1}{V}\frac{\partial E}{\partial \varepsilon_{ij}}
$$
で与えられる。第一原理計算コードが出力する応力は、この微分を効率よく評価したものである。

### 4.2 応力定理と計算上の含意
自己無撞着解では、波動関数の一次変分を明示的に求めずとも応力が評価できるという形式が知られている。応力の評価式は、運動エネルギー項、局所・非局所擬ポテンシャル項、Hartree 項、交換相関項などの寄与に分かれる。

### 4.3 Pulay 応力
基底がセル形状に依存する場合、有限基底近似に起因する補正が生じる。局在基底ではセル変形で基底関数が変わるため顕在化しやすい。平面波基底でもエネルギーカットオフ固定のもとで基底集合がセルに依存するため、十分なカットオフや補正により抑える設計が要る。

### 4.4 金属の占有と自由エネルギー
金属では占有数 $f_{n\mathbf{k}}$ の取り扱いが弾性定数に影響する。有限温度の電子自由エネルギーは
$$
F_{\mathrm{el}}=E_{\mathrm{KS}}-T S_{\mathrm{el}}
$$
であり、電子エントロピーは
$$
S_{\mathrm{el}}=-k_B\sum_{n\mathbf{k}}\left[f_{n\mathbf{k}}\ln f_{n\mathbf{k}}+(1-f_{n\mathbf{k}})\ln(1-f_{n\mathbf{k}})\right]
$$
である。実装上はスメアリング幅が電子温度として働く場合があり、弾性定数の評価が「0 K のエネルギー二階微分」ではなく「有限 $T$ の自由エネルギー二階微分」になっているかを区別する必要がある。


## 5. 全エネルギー二階微分としての弾性定数
### 5.1 基本式
外部応力がゼロの平衡状態では、弾性定数は
$$
C_{ijkl}=\frac{1}{V_0}\left.\frac{\partial^2 E_{\mathrm{BO}}}{\partial\varepsilon_{ij}\partial\varepsilon_{kl}}\right|_{\varepsilon=0}
$$
である。

### 5.2 ひずみの与え方
格子ベクトルを列ベクトルとして並べた行列を $ \mathbf{A}$ とし、微小変形を
$$
\mathbf{A}'=(\mathbf{I}+\boldsymbol{\varepsilon})\,\mathbf{A}
$$
で与える（線形近似）。体積変化を含む一般のひずみを扱える。

### 5.3 単位
$C$ の単位は Pa であり、第一原理計算では eV と Å を用いることが多い。換算は
$$
1\ \mathrm{eV/Å^3} \approx 160.217662\ \mathrm{GPa}
$$
である。エネルギーフィットから弾性定数を得る場合は、体積の一貫した定義が重要である。



## 6. 原子緩和を含む弾性定数
### 6.1 固定イオンと緩和イオン
結晶には内部自由度があり、ひずみにより原子が内部的に緩和する。これをどう扱うかで弾性定数が変わる。

固定イオン弾性定数は、イオン座標 $\{ \mathbf{R}_\kappa\}$ を固定して
$$
C^{(\mathrm{clamped})}_{IJ}=\frac{1}{V}\left.\frac{\partial^2 E}{\partial\varepsilon_I\partial\varepsilon_J}\right|_{\mathbf{R}}
$$
と定義する。

緩和イオン弾性定数は、各ひずみでイオンを力ゼロまで緩和し
$$
C^{(\mathrm{relaxed})}_{IJ}=\frac{1}{V}\left.\frac{\partial^2 E(\varepsilon,\mathbf{R}^\*(\varepsilon))}{\partial\varepsilon_I\partial\varepsilon_J}\right|
$$
と定義する。実験の静的測定に近いのは通常こちらである。

### 6.2 内部ひずみ結合と補正項
ひずみ $\varepsilon$ と内部変位 $u$ の二次までのエネルギーを
$$
E=E_0+\frac{V}{2}\sum_{IJ}C^{(\mathrm{clamped})}_{IJ}\varepsilon_I\varepsilon_J+\sum_{I,\kappa\alpha}\Lambda_{I,\kappa\alpha}\varepsilon_I u_{\kappa\alpha}
+\frac{1}{2}\sum_{\kappa\alpha,\kappa'\beta}K_{\kappa\alpha,\kappa'\beta}u_{\kappa\alpha}u_{\kappa'\beta}
$$
と書く。ここで
- $K$ は力定数行列
- $\Lambda$ はひずみと内部変位の結合
である。

$u$ について最小化すると
$$
u = -K^{-1}\Lambda^T \varepsilon
$$
となり、緩和イオン弾性定数は
$$
C^{(\mathrm{relaxed})}=C^{(\mathrm{clamped})}-\frac{1}{V}\Lambda K^{-1}\Lambda^T
$$
となる。内部自由度が大きい系、極性結晶、低次元物質、空孔・ドーピングで局所緩和が強い系では、この補正が弾性定数の大小関係を反転させることがある。

### 6.3 絶縁体での電場との結合
絶縁体では、ひずみは分極や電場と結合するため、境界条件（電場固定か電束固定か）により弾性定数が変わり得る。圧電体では特に重要であり、弾性・圧電・誘電応答を一体で扱う線形応答の枠組みが用いられる。


## 7. 線形応答としての弾性定数
### 7.1 DFPT による扱い
密度汎関数摂動理論では、ひずみを摂動として扱い、自由エネルギーの二階微分を直接評価する。ひずみ摂動は格子の幾何学を変えるため、擬ポテンシャルや平面波基底の扱いでは計量テンソルを用いた定式化が有効である。

線形応答の枠組みでは
- 電子波動関数の一次応答
- ポテンシャルの自己無撞着な一次応答
- そこから構成される二階微分量
を系統的に得る。

### 7.2 固定イオン量と内部緩和量の分解
DFPT では、固定イオン弾性定数、内部ひずみテンソル、力定数行列を個別に計算し、前節の
$$
C^{(\mathrm{relaxed})}=C^{(\mathrm{clamped})}-\frac{1}{V}\Lambda K^{-1}\Lambda^T
$$
で緩和イオン弾性定数に合成できる。これにより、どの内部モードが弾性を軟化させているかをモード分解で追える利点がある。



## 8. 数値評価の設計
### 8.1 応力ひずみ法とエネルギーひずみ法
弾性定数の評価は大別して二つである。

| 方法 | 入力として用いる量 | 目的量 | 長所 | 短所 |
|---|---|---|---|---|
| 応力ひずみ法 | $\sigma(\varepsilon)$ | $C=\partial\sigma/\partial\varepsilon$ | 少ないひずみ点で線形フィット可能 | 応力精度が要求される。Pulay 応力に敏感 |
| エネルギーひずみ法 | $E(\varepsilon)$ | $C=\partial^2E/\partial\varepsilon^2$ | 応力が不安定な実装でも使える | 二階微分のため点数とフィット設計が要る |
| DFPT | 二階微分を直接 | $C$ と分解量 | 分解が可能。高効率な場合がある | 金属・SOC・特殊擬ポテンシャルで制約が出る場合がある |

### 8.2 ひずみの大きさと高次項
数値微分では、ひずみが小さすぎると数値ノイズが支配し、大きすぎると三次以上の弾性項が混入する。したがって
$$
E(\varepsilon)\approx E_0+\frac{V}{2}C\varepsilon^2+\frac{V}{6}C^{(3)}\varepsilon^3+\cdots
$$
の高次項を意識し、対称性を用いて奇数次項が消える変形を選ぶ、あるいは偶関数としてフィットする設計が有効である。

### 8.3 対称性と独立弾性定数の数
結晶系により独立な $C_{IJ}$ の数が変わる。

| 結晶系 | 独立成分数 | 代表例 |
|---|---:|---|
| 立方 | 3 | $C_{11},C_{12},C_{44}$ |
| 六方 | 5 | $C_{11},C_{12},C_{13},C_{33},C_{44}$ |
| 正方 | 6 または 7 | $C_{11},C_{12},C_{13},C_{33},C_{44},C_{66}$ |
| 斜方 | 9 | $C_{11},C_{22},C_{33},C_{12},C_{13},C_{23},C_{44},C_{55},C_{66}$ |
| 単斜 | 13 |  |
| 三斜 | 21 |  |

独立成分数に合わせて、ひずみの種類を最小化して計算負荷を抑える設計が可能である。

### 8.4 安定性条件
弾性テンソルは正定値性を満たす必要がある。例えば立方晶では
$$
C_{44}>0,\quad C_{11}-C_{12}>0,\quad C_{11}+2C_{12}>0
$$
が力学安定性の必要条件である。低対称では主小行列式条件として一般化される。



## 9. 有限温度の弾性定数
### 9.1 等温と断熱
実験で得られる弾性定数が等温か断熱かは測定法に依存する。理論的には、等温弾性定数は Helmholtz 自由エネルギーから、断熱弾性定数はエントロピー固定条件から定義される。

等温弾性定数
$$
C^T_{ijkl}=\frac{1}{V}\left.\frac{\partial^2 F}{\partial\varepsilon_{ij}\partial\varepsilon_{kl}}\right|_{T}
$$

断熱弾性定数
$$
C^S_{ijkl}=\frac{1}{V}\left.\frac{\partial^2 U}{\partial\varepsilon_{ij}\partial\varepsilon_{kl}}\right|_{S}
$$
ここで $U$ は内部エネルギーである。両者の関係式は熱膨張や熱容量を介して与えられる。

### 9.2 準調和近似による $F_{\mathrm{vib}}$
準調和近似では、格子振動自由エネルギーをフォノン周波数 $\omega_{\mathbf{q}\nu}$ から
$$
F_{\mathrm{vib}}(T)=k_B T\sum_{\mathbf{q}\nu}\ln\left[2\sinh\left(\frac{\hbar\omega_{\mathbf{q}\nu}}{2k_B T}\right)\right]
$$
で与え、$\omega_{\mathbf{q}\nu}$ の体積・ひずみ依存性を通じて弾性定数の温度依存を得る。実装としては
- ひずみを与えた複数状態でフォノン計算
- 自由エネルギーをひずみで二階微分
が基本となる。

### 9.3 電子励起の寄与
金属では $F_{\mathrm{el}}(T,\varepsilon)$ が温度依存弾性定数に寄与する。低温での寄与は電子状態密度 $N(E_F)$ と関係し、変形により $N(E_F)$ が変化する系では無視できないことがある。第一原理計算では、占有の温度依存を含む自由エネルギーとして弾性定数を評価する設計が必要である。

### 9.4 磁気ゆらぎの寄与
磁性体では、スピンゆらぎや磁気秩序の変化が自由エネルギーを変え、弾性定数の温度依存を与えることがある。特にキュリー温度近傍の軟化、磁気弾性結合の寄与は、静的 DFT だけでは再現されない場合があるため、スピンゆらぎを取り入れた自由エネルギー（例として DLM 的近似など）を併用する研究がある。



## 10. 弾性テンソルから派生する物性
弾性テンソル $C_{IJ}$ から、等方近似の弾性率や異方性指標を導出できる。

### 10.1 Voigt–Reuss–Hill 平均
多結晶の等方近似として、剛性（Voigt）と柔性（Reuss）の上下界を取り、Hill 平均を用いる。

Voigt 体積弾性率（一般式は結晶系で異なるが、立方晶では）
$$
B_V=\frac{1}{3}(C_{11}+2C_{12})
$$
Reuss はコンプライアンス $S=C^{-1}$ を用いる。Hill 平均は
$$
B_H=\frac{B_V+B_R}{2}
$$
である。せん断弾性率 $G$、ヤング率 $E$、ポアソン比 $\nu$ は $B$ と $G$ から導く。

### 10.2 異方性
異方性の指標として Zener 異方性（立方晶）
$$
A=\frac{2C_{44}}{C_{11}-C_{12}}
$$
がよく用いられる。一般の結晶では、方向依存ヤング率 $E(\hat{\mathbf{n}})$ を $C$ または $S$ から計算する。



## 11. 合金・磁性・相関が強い系での論点
### 11.1 合金
組成不規則性は弾性定数に直接影響する。近似として
- 仮想結晶近似
- 特殊準ランダム構造
- CPA に基づく有効媒質
などが用いられる。どの近似を採用したかにより、局所緩和や散乱の扱いが変わる。

### 11.2 SOC と磁気異方性
スピン軌道相互作用は、磁気異方性だけでなく応力・弾性にも寄与し得る。磁気秩序や磁化方向を固定した弾性定数は、磁気弾性結合の議論と整合させる必要がある。

### 11.3 DFT+U、ハイブリッド汎関数、DMFT
局在相関が強い材料では、基底状態そのものが LDA/GGA で誤ると弾性定数も系統誤差を持つ。相転移に近い材料、スピン状態が変化する材料では、自由エネルギー曲率の取り方が結果を左右する。



## 12. 公開データ・解析ツールと研究動向
### 12.1 高スループット計算とデータセット
弾性テンソルを大量に計算し、材料探索や相安定性・機械特性予測に用いる研究が進んでいる。弾性テンソルは結合性と相関し、機械特性の学習にも利用される。

### 12.2 弾性テンソルの解析ツール
弾性テンソルの可視化・異方性評価・多結晶平均の計算を行う公開ツールが整備されている。
- ELATE
- AELAS
- pymatgen の elasticity モジュール
- MyElas

計算コード本体と解析ツールを分けることで、弾性テンソルの検証や図示が容易になる。



## 13. まとめと展望
弾性定数は、自由エネルギーの二階微分として電子論から一意に導出でき、固定イオンと緩和イオン、等温と断熱、0 K と有限温度の区別を式で明確にしたうえで第一原理計算に落とし込める量である。内部自由度の結合項 $\Lambda K^{-1}\Lambda^T$ や有限温度自由エネルギー $F_{\mathrm{vib}},F_{\mathrm{el}}$ の寄与を分解して扱うことで、弾性の起源をモードや電子状態の言葉で追跡できる。

今後は、電子励起温度・スピンゆらぎ・強相関を含む自由エネルギー評価の精密化と、合金不規則性や欠陥を含む大規模モデルでの弾性評価が接続されていくと考えられる。弾性テンソルの高品質データと、電子状態量（状態密度、フェルミ面近傍の応答、軌道占有、磁気異方性エネルギーなど）を結び付けることで、材料設計に資する電子論的指標の抽出が加速すると見込まれる。


### 参考文献
[R1] O. H. Nielsen and R. M. Martin, Quantum-mechanical theory of stress and force, Phys. Rev. B 32, 3780 (1985). https://doi.org/10.1103/PhysRevB.32.3780  
[R2] X. Wu, D. Vanderbilt, D. R. Hamann, Systematic treatment of displacements, strains, and electric fields in density-functional perturbation theory, Phys. Rev. B 72, 035105 (2005). https://doi.org/10.1103/PhysRevB.72.035105  
[R3] D. R. Hamann, Metric tensor formulation of strain in density-functional perturbation theory, Phys. Rev. B 71, 035117 (2005). https://doi.org/10.1103/PhysRevB.71.035117  
[R4] N. D. Mermin, Thermal Properties of the Inhomogeneous Electron Gas, Phys. Rev. 137, A1441 (1965). https://doi.org/10.1103/PhysRev.137.A1441  
[R5] R. M. Wentzcovitch et al., First Principles Quasiharmonic Thermoelasticity of Mantle Minerals, Rev. Miner. Geochem. 71, 59 (2010). https://staff.ustc.edu.cn/~wuzq10/papers/99.full.pdf  
[R6] M. J. Waters et al., Isothermal and Adiabatic Elastic Tensors (関係式の整理), arXiv:1605.06548 (2016). https://arxiv.org/abs/1605.06548  
[R7] M. de Jong et al., Charting the complete elastic properties of inorganic crystalline compounds, Sci. Data 2, 150009 (2015). https://www.nature.com/articles/sdata20159  
[R8] S. H. Zhang et al., AELAS: Automatic ELAStic property derivations via high-throughput first-principles computation, Comput. Phys. Commun. 220, 403 (2017). https://www.sciencedirect.com/science/article/abs/pii/S0010465517302400  
[R9] R. Gaillac, P. Pullumbi, F.-X. Coudert, ELATE: An open-source online application for analysis and visualization of elastic tensors, J. Phys.: Condens. Matter 28, 275201 (2016). https://arxiv.org/abs/1602.06175  
[R10] pymatgen documentation, pymatgen.analysis.elasticity (弾性テンソルのフィットと派生量) https://pymatgen.org/pymatgen.analysis.elasticity.html  
[R11] 田中功, 第一原理計算による格子振動と熱的性質の評価, 熱測定 49(3) (2022) https://www.netsu.org/JSCTANetsuSokutei/pdfs/49/49-3-122.pdf  
[R12] 佐藤和則, 第一原理計算法 I, 応用物理 75(10) (2006) https://www.jstage.jst.go.jp/article/oubutsu/75/10/75_1258/_pdf/-char/ja  
[R13] 兵藤申一, 材料の力学的性質（弾性定数の導出の考え方を含む総説）, 応用物理 53(4) (1984) https://www.jstage.jst.go.jp/article/oubutsu1932/53/4/53_4_302/_pdf/-char/ja
