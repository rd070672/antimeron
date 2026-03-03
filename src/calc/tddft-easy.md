# 時間依存密度汎関数法の基礎
時間依存密度汎関数法（TDDFT）は、時間依存外場下での電子密度の時間発展を、原理的には厳密に記述するための理論である。計算としては、時間依存Kohn–Sham方程式の時間発展を追う方法と、線形応答として励起エネルギーを固有値問題で求める方法が中核である。

## 目次
- 何をしたい理論か
- 時間依存シュレディンガー方程式
- Runge–Grossの定理
- Kohn–Sham系への写像
- 時間依存Kohn–Sham方程式
- 交換相関ポテンシャルと履歴依存
- 線形応答TDDFT
- Casida方程式と固有値問題
- 実時間伝搬TDDFT
- Sternheimer形式
- 周期固体の光学応答
- 近似が効くところと効きにくいところ
- 数値設定の考え方
- 手法の比較
- まとめと展望
- 参考文献

### 参考ドキュメント
1. 常田貴夫, 5章 時間依存密度汎関数法（講義資料PDF）
   https://www2.riken.jp/qcl/members/tsuneda/web/dft05-sec5.pdf
2. 矢花一浩, 時間依存密度汎関数理論による光応答計算（講義スライドPDF）
   https://www2.ccs.tsukuba.ac.jp/workshop/sympo-080424/file/yabana.pdf
3. Octopus documentation, Time-dependent propagation（実時間伝搬の入門）
   https://octopus-code.org/documentation/12/tutorial/basics/time-dependent_propagation/

## 何をしたい理論か
基底状態DFTは、時間に依らない外部ポテンシャルの下での基底状態（最小エネルギー状態）を扱う理論である。これに対しTDDFTは、レーザー照射や電場パルスのような時間依存外場、あるいは励起状態に関わる応答（吸収スペクトル、励起エネルギー、分極応答など）を扱うために導入される。

TDDFTが扱う中心量は電子密度$\rho(\mathbf{r},t)$であり、波動関数$\Psi(t)$そのものではない。密度は3次元空間と時間の関数であるため、多電子波動関数の高次元性を避けつつ、時間依存現象に踏み込む入口を与える。

## 時間依存シュレディンガー方程式
多電子系の時間発展は、時間依存シュレディンガー方程式
$$
i\frac{\partial}{\partial t}\Psi(t)=\hat{H}(t)\Psi(t)
$$
で与えられる。ここで$\hat{H}(t)=\hat{T}+\hat{V}_{ee}+\hat{V}_{\mathrm{ext}}(t)$であり、$\hat{V}_{\mathrm{ext}}(t)=\sum_i v_{\mathrm{ext}}(\mathbf{r}_i,t)$が時間依存外場を表す。

観測量は$\Psi(t)$から期待値として得られるが、TDDFTでは$\rho(\mathbf{r},t)$から同等の情報を引き出すことを狙う。したがって、密度と外部ポテンシャルの対応関係が成立するかが理論の要になる。

## Runge–Grossの定理
Runge–Grossの定理は、ある初期状態$\Psi(t_0)$を固定したとき、十分に滑らかな外部ポテンシャル$v_{\mathrm{ext}}(\mathbf{r},t)$が生成する密度$\rho(\mathbf{r},t)$が、ある意味で一対一対応することを主張する。具体的には、同じ初期状態から出発して同じ密度を与える二つの外部ポテンシャルは、時間だけの関数$C(t)$の差（全系に一様なエネルギーシフト）を除いて同一である。

この主張は、基底状態DFTのHohenberg–Kohn定理に対応する時間依存版の柱である。ただし、時間依存の$v$表現可能性（ある密度が何らかの外部ポテンシャルで実現できるか）や、数学的な前提（時間のテイラー展開可能性など）には注意が必要である。

## Kohn–Sham系への写像
TDDFTを計算に落とすには、相互作用する電子系の密度を、非相互作用系（Kohn–Sham系）の密度で再現する写像が必要である。van Leeuwenによる写像定理は、適切な条件の下で、与えられた密度時間発展を再現する非相互作用ポテンシャルが存在することを示し、時間依存Kohn–Sham方程式の正当化を与える。

この写像により、未知の多体波動関数の時間発展を直接追うのではなく、1電子軌道の集合を時間発展させる問題へ置き換えられる。置き換えの代償として、交換相関ポテンシャルが時間の履歴（過去の密度）に依存し得るという難しさが現れる。

## 時間依存Kohn–Sham方程式
時間依存Kohn–Sham（TDKS）方程式は
$$
i\frac{\partial}{\partial t}\phi_i(\mathbf{r},t)
=
\left[
-\frac{1}{2}\nabla^2
+v_s(\mathbf{r},t)
\right]\phi_i(\mathbf{r},t)
$$
である。ここで
$$
v_s(\mathbf{r},t)=v_{\mathrm{ext}}(\mathbf{r},t)+v_H[\rho](\mathbf{r},t)+v_{xc}[\rho](\mathbf{r},t)
$$
であり、Hartreeポテンシャルは
$$
v_H(\mathbf{r},t)=\int\frac{\rho(\mathbf{r}',t)}{|\mathbf{r}-\mathbf{r}'|}\,d\mathbf{r}'
$$
で定義される。

密度は占有数$f_i$を用いて
$$
\rho(\mathbf{r},t)=\sum_i f_i|\phi_i(\mathbf{r},t)|^2
$$
で構成される。$v_s$が$\rho$に依存するため、TDKS方程式は見かけ上一体方程式でありつつ、全体としては非線形である。

## 交換相関ポテンシャルと履歴依存
時間依存の交換相関ポテンシャル$v_{xc}(\mathbf{r},t)$は、一般に密度の履歴$\{\rho(\mathbf{r},t')\,|\,t'\le t\}$に依存し得る。これは、同じ瞬間の密度でも、そこに至る過程が異なれば応答が異なる可能性があることを反映する。

計算ではしばしば断熱近似が用いられ、基底状態DFTの交換相関汎関数を瞬時密度に適用して
$$
v_{xc}^{\mathrm{adia}}(\mathbf{r},t)\approx v_{xc}^{\mathrm{gs}}(\rho(\mathbf{r},t))
$$
と置く。断熱近似は多くの価電子励起で有用である一方、二重励起や長距離電荷移動励起などで原理的な困難が現れることがある。

## 線形応答TDDFT
外場が十分に弱いとき、密度の変化$\delta\rho$は外部ポテンシャル変化$\delta v_{\mathrm{ext}}$に線形に応答する。周波数領域では
$$
\delta\rho(\mathbf{r},\omega)=\int \chi(\mathbf{r},\mathbf{r}',\omega)\,\delta v_{\mathrm{ext}}(\mathbf{r}',\omega)\,d\mathbf{r}'
$$
と書け、$\chi$が（遅延）応答関数である。

TDDFTでは、相互作用系の$\chi$とKohn–Sham系の$\chi_s$は、核となる関係式（Dyson型方程式）
$$
\chi(\omega)=\chi_s(\omega)+\chi_s(\omega)\left[v+f_{xc}(\omega)\right]\chi(\omega)
$$
で結ばれる。ここで$ v(\mathbf{r},\mathbf{r}')=1/|\mathbf{r}-\mathbf{r}'|$、交換相関カーネルは
$$
f_{xc}(\mathbf{r},\mathbf{r}',t,t')=\frac{\delta v_{xc}(\mathbf{r},t)}{\delta \rho(\mathbf{r}',t')}
$$
で定義される。

この式が示すのは、励起・スペクトルが、Kohn–Sham遷移（$\chi_s$）に、クーロン相互作用と交換相関カーネルによる結合を足し合わせた集団運動として現れるという見方である。したがって、$f_{xc}$の近似がスペクトルの質を左右する。

## Casida方程式と固有値問題
分子や有限系で広く用いられる線形応答TDDFTは、Casida方程式として固有値問題に還元される。Kohn–Shamの占有軌道$i$と空軌道$a$の遷移$q=(i\to a)$を並べ、遷移エネルギー$\omega_q=\varepsilon_a-\varepsilon_i$を定義する。

代表的な表現の一つは
$$
\sum_{q'}\Omega_{qq'}F_{I,q'}=\omega_I^2 F_{I,q}
$$
という実対称行列の固有値問題であり、固有値$\omega_I$が励起エネルギーに対応する。行列要素は
$$
\Omega_{qq'}=\delta_{qq'}\omega_q^2+4\sqrt{\omega_q\omega_{q'}}K_{qq'}
$$
で、結合行列$K_{qq'}$は
$$
K_{qq'}=\iint
\phi_i^*(\mathbf{r})\phi_a(\mathbf{r})
\left[
\frac{1}{|\mathbf{r}-\mathbf{r}'|}+f_{xc}(\mathbf{r},\mathbf{r}',\omega)
\right]
\phi_{i'}(\mathbf{r}')\phi_{a'}^*(\mathbf{r}')
\,d\mathbf{r}\,d\mathbf{r}'
$$
の形をとる（スピンや対称性、近似により具体形は整理される）。

この形式は、TDDFTが本質的に固有値問題として励起を与えることを明確にする。基底状態DFTがKohn–Sham固有値問題を自己無撞着に解くのに対し、線形応答TDDFTは、基底状態の解の上でさらに別の固有値問題を解いて励起を得るという二段構造になる。

### 振動子強度
励起強度は遷移双極子モーメントから計算され、振動子強度$f_I$は概念的に
$$
f_I=\frac{2}{3}\omega_I\sum_{\alpha=x,y,z}\left|\langle 0|\hat{r}_\alpha|I\rangle\right|^2
$$
の形で表される。Casidaの固有ベクトル$F_I$から$\langle 0|\hat{r}_\alpha|I\rangle$を再構成できるため、吸収スペクトルのピーク位置（$\omega_I$）と強度（$f_I$）が同時に得られる。

## 実時間伝搬TDDFT
実時間伝搬（real-time）TDDFTは、TDKS方程式を時間刻みで直接時間発展させ、時間領域の応答からスペクトルを得る方法である。時間発展演算子は時間順序積を含むため、
$$
\phi_i(t+\Delta t)=\hat{\mathcal{T}}\exp\left[-i\int_t^{t+\Delta t}\hat{H}_s(t')\,dt'\right]\phi_i(t)
$$
の近似が必要になる。

線形スペクトルを得る基本的な手段として、微小なデルタキック電場を用いる方法がある。例えば$x$方向に
$$
E_x(t)=\kappa\,\delta(t)
$$
を与えると、系は微小な初期運動量を受け、その後の双極子モーメント
$$
d_x(t)=\int x\,\rho(\mathbf{r},t)\,d\mathbf{r}
$$
が時間発展する。減衰因子$e^{-\eta t}$を掛けてフーリエ変換すれば、分極率の虚部から吸収スペクトルを構成できる。

実時間伝搬は、広いエネルギー範囲を一回の計算で得やすく、非線形応答（強レーザー下の高調波など）にも拡張しやすい。一方で、時間刻み$\Delta t$と伝搬時間$T$が分解能と安定性を決めるため、目的スペクトルに応じた設計が必要になる。

## Sternheimer形式
固体の線形応答では、空状態（多数の非占有軌道）を明示的に足し上げずに応答を求めるSternheimer形式が用いられることがある。周波数$\omega$での軌道変分$\delta\phi_i(\omega)$は、概念的に
$$
\left(\hat{H}_{KS}-\varepsilon_i\pm\omega\right)\delta\phi_i^{(\pm)}(\omega)
=
-\hat{P}_c\,\delta \hat{V}(\omega)\phi_i
$$
のような線形方程式として求められる（$\hat{P}_c$は占有部分空間への射影を除く射影子である）。

この立場では、固有値問題ではなく線形方程式の反復解が中心になるが、応答関数の構造はTDDFTのDyson型方程式と整合している。大規模周期系での計算効率の点から、この形式が選ばれることがある。

## 周期固体の光学応答
周期固体では、外場に対する密度応答から誘電関数や光吸収を評価する。ミクロな応答$\chi_{\mathbf{G}\mathbf{G}'}(\mathbf{q},\omega)$を介して、巨視的誘電関数$\varepsilon_M(\omega)$が構成されるが、局所場効果（$\mathbf{G}\neq 0$成分）の寄与が本質的になることがある。

励起子のような電子・正孔相関が重要な場合、単純な断熱LDA/GGAカーネルでは束縛状態の再現が難しいことがある。これに対し、長距離成分を持つカーネルや、Bethe–Salpeter方程式（BSE）に基づく多体摂動論的手法との対応関係が研究されてきた。

## 近似が効くところと効きにくいところ
断熱近似に基づく線形応答TDDFTは、多くの価電子励起や局在励起のエネルギーと強度を、計算コストに対して良好に与える場合がある。特に分子分光や光化学の入口として広く用いられ、実装も成熟している。

一方で、二重励起（1電子励起の線形結合では表せない成分が強い励起）では、断熱カーネルが周波数依存を欠くために原理的な不足が生じ得る。長距離電荷移動励起では、半局所汎関数のポテンシャルの漸近形やカーネルの長距離構造が不十分であると、励起エネルギーが過小評価されやすい。

Rydberg励起は、正しい$-1/r$漸近を持つポテンシャルが必要になり、標準LDA/GGAでは不利になることがある。これらの問題に対して、範囲分離ハイブリッド汎関数、漸近補正ポテンシャル、周波数依存カーネルなどの改良が用いられる。

## 数値設定の考え方
線形応答Casida形式では、基底状態DFTの収束（密度、軌道、エネルギー）が励起計算の品質を支配する。特に非占有軌道の表現が必要であるため、基底（平面波カットオフ、局在基底の拡張、実空間格子間隔）が不足すると励起エネルギーが不安定になりやすい。

実時間伝搬では、時間刻み$\Delta t$が安定性と位相誤差に直結し、伝搬時間$T$が周波数分解能$\Delta\omega\sim 2\pi/T$を決める。スペクトルの平滑化は減衰係数$\eta$（時間領域での指数減衰、または周波数領域での広がり）で制御されるため、ピーク幅とノイズの兼ね合いを意識する必要がある。

外場の与え方には長さゲージ（$- \mathbf{E}(t)\cdot\mathbf{r}$）と速度ゲージなどの表現があり、周期境界では取り扱いが変わる。固体では$\mathbf{q}\to 0$極限、局所場効果、k点密度が光学スペクトルに強く影響するため、基底状態計算以上に積分精度が重要になり得る。

## 手法の比較
| 手法 | 中心となる数値問題 | 得やすい量 | 強み | 難しくなりやすい点 |
|---|---|---|---|---|
| 線形応答（Casida） | 固有値問題 $\Omega F=\omega^2 F$ | 励起エネルギー、振動子強度 | ピークが直接得られる | 空状態表現、二重励起、電荷移動励起 |
| 実時間伝搬 | 時間発展（時間順序指数の近似） | 広帯域スペクトル、非線形応答 | 一回で広帯域、強場へ拡張しやすい | $\Delta t$と$T$の設計、ノイズと平滑化 |
| Sternheimer | 周波数ごとの線形方程式 | 周波数応答、固体の誘電応答 | 空状態の明示和を避けやすい | 前処理と反復収束、実装依存が大きい |

この比較は、TDDFTが一つの形式だけでなく、同じ理論骨格から複数の計算様式が派生していることを示す。目的量が励起準位の離散ピークか、広帯域のスペクトルか、周期系の誘電応答かにより選択が変わる。

## まとめと展望
TDDFTは、時間依存外場の下での密度の時間発展を基礎に据え、時間依存Kohn–Sham方程式により実用計算へ接続する理論である。線形応答ではCasida方程式として固有値問題になり、実時間伝搬では時間発展からスペクトルや非線形応答が得られる。

今後の発展の中心は、履歴依存や周波数依存を適切に取り込む交換相関カーネルの改良、電荷移動・二重励起・励起子などの難題への体系的対処、そして大規模系での安定な時間発展アルゴリズムの整備である。基底状態DFTと同様に、近似の意味を数式と物理の両面から点検しつつ、目的量に適した形式（固有値、時間発展、Sternheimer）を選ぶ姿勢が重要である。


### 参考文献
- E. Runge and E. K. U. Gross, Density-Functional Theory for Time-Dependent Systems, Phys. Rev. Lett. 52, 997 (1984).
  https://link.aps.org/doi/10.1103/PhysRevLett.52.997
- R. van Leeuwen, Mapping from Densities to Potentials in Time-Dependent Density-Functional Theory, Phys. Rev. Lett. 82, 3863 (1999).
  https://link.aps.org/doi/10.1103/PhysRevLett.82.3863
- M. E. Casida, Time-Dependent Density Functional Response Theory of Molecular Systems, in Recent Advances in Density Functional Methods (1996)（章として流通）.
  https://www.sciencedirect.com/science/article/abs/pii/S1380732396800938
- C. A. Ullrich, Time-Dependent Density-Functional Theory: Concepts and Applications, Oxford University Press (2012).
  https://global.oup.com/academic/product/time-dependent-density-functional-theory-9780199563029
- N. T. Maitra, Double and Charge-Transfer Excitations in Time-Dependent Density Functional Theory, Annu. Rev. Phys. Chem. 73 (2022)（プレプリント）
  https://arxiv.org/pdf/2107.05600
- M. van Faassen and K. Burke, A new challenge for time-dependent density functional theory, Chem. Phys. Lett. 431, 40 (2006).
  https://www.sciencedirect.com/science/article/abs/pii/S0009261406014564
- 神谷宗明, スタック構造のDNA塩基の励起状態に関する研究, Journal of Computer Aided Chemistry 11, 25 (2010)（TDDFTと他手法比較を含む）
  https://www.jstage.jst.go.jp/article/jcac/11/0/11_0_25/_pdf
- HPCシステムズ, 量子化学の基礎知識（励起状態計算とTDDFTの位置づけ、CT励起への注意）
  https://www.hpc.co.jp/chem/library/c_qc_basic/
