# KKR計算による磁気ダンピング定数

本稿は、KKR（Korringa–Kohn–Rostoker）グリーン関数法に基づき、ギルバート磁気ダンピング定数 $\alpha$ を第一原理的に評価する理論式を導出し、数値計算へ展開するための枠組みをまとめたものである。特に、相対論効果（SOC）と散乱を含む線形応答（トルク相関）形式が、KKRの多重散乱・CPA・頂点補正と自然に接続される点に焦点を当てる。

## 参考ドキュメント
1. Akimasa Sakuma, Microscopic Theory of Gilbert Damping for Transition Metal Systems, Journal of the Magnetics Society of Japan 37(6) (2013).
https://www.jstage.jst.go.jp/article/msjmag/37/6/37_1310R001/_pdf

2. H. Ebert, S. Mankovsky, D. Ködderitzsch, P. J. Kelly, Ab Initio Calculation of the Gilbert Damping Parameter via the Linear Response Formalism, Phys. Rev. Lett. 107, 066603 (2011).
https://epub.uni-regensburg.de/24331/1/H_EbertPRL107.pdf

3. S. Mankovsky, D. Ködderitzsch, G. Woltersdorf, H. Ebert, First-principles calculation of the Gilbert damping parameter via the linear response formalism with application to magnetic transition-metals and alloys (arXiv版は全文参照が容易).
https://arxiv.org/pdf/1301.2114

## 1. ギルバート磁気ダンピングの定義

単位磁化 $\mathbf{m}=\mathbf{M}/M_s$ を用いると、Landau–Lifshitz–Gilbert（LLG）方程式は

$$
\frac{d\mathbf{m}}{dt}
=
-\gamma\,\mathbf{m}\times\mathbf{H}_\mathrm{eff}
+
\mathbf{m}\times\left(\boldsymbol{\alpha}\,\frac{d\mathbf{m}}{dt}\right)
$$

で与えられる。$\gamma$ はジャイロ磁気比、$M_s$ は飽和磁化（体積密度）、$\boldsymbol{\alpha}$ は一般に2階テンソルである。立方晶バルクなどで等方面近似が有効な場合、$\boldsymbol{\alpha}\to\alpha\mathbf{I}$ としてスカラーの $\alpha$ を用いる。

ダンピングは「磁化ダイナミクスが電子系へエネルギーと角運動量を移し、散乱によって不可逆に散逸する強さ」を表す量であり、SOCが主要な起源である。



## 2. KKRグリーン関数法：相対論・多重散乱

### 2.1 1電子グリーン関数
KKR法は、1電子グリーン関数 $\hat{G}(E)$ を中心に電子状態を記述する。相対論（Dirac）形式を用いる場合、スピノルを扱い、SOCは基礎方程式に内包される。

エネルギー $E$ に対して、（概念的に）

$$
\hat{G}(E)=\left(E-\hat{H}+i0^+\right)^{-1}
$$

である。表面・界面、希薄不純物、無秩序合金など、周期性が部分的または統計的にしか成り立たない系でも、グリーン関数と散乱理論で扱える点がKKR法の特徴である。

### 2.2 多重散乱（t行列と散乱路演算子）
KKRでは単一サイト散乱を表す $t$ 行列と、サイト間散乱の総和を表す散乱路演算子（scattering path operator）$\boldsymbol{\tau}$ を用いて、

- 単一サイト：$t_i(E)$
- サイト間の多重散乱：$\tau_{ij}(E)$

として電子状態を構成する。計算上は角運動量展開（$l_\mathrm{max}$ まで）とエネルギー積分（複素エネルギー積分を含む）で表現される。

### 2.3 無秩序合金とCPA
無秩序合金では、配置平均（configurational average）$\langle\cdots\rangle_c$ を導入し、CPA（coherent potential approximation）により有効媒質を構成して平均グリーン関数を得る。輸送・応答量では、二粒子相関に由来する頂点補正（vertex corrections）が重要になる場合がある。



## 3. 線形応答としてのダンピング：トルク相関の導出

### 3.1 基本方針
磁化方向 $\mathbf{m}$ がゆっくり時間変化するとき、電子系のハミルトニアン $\hat{H}(\mathbf{m})$ も時間依存となる。この摂動に対する電子系の散逸（吸収）を線形応答で評価し、$\omega\to 0$ 極限でLLGの散逸項に同定する。

応答の一般形は、ある演算子 $\hat{A}_\mu$ に対し

$$
\chi_{\mu\nu}(\omega)
=
\frac{1}{i\hbar}\int_0^\infty dt\,e^{i\omega t}
\langle[\hat{A}_\mu(t),\hat{A}_\nu(0)]\rangle
$$

であり、散逸は $\mathrm{Im}\,\chi_{\mu\nu}(\omega)$ と関係する。ダンピングは典型的に

$$
\alpha_{\mu\nu}\propto \lim_{\omega\to 0}\frac{\mathrm{Im}\,\chi_{\mu\nu}(\omega)}{\omega}
$$

の形で与えられる。

### 3.2 トルク演算子の定義（SOC起源）
SOC項を $\hat{H}_\mathrm{SO}$ とすると、スピンに働くトルク演算子の一例は

$$
\hat{\mathbf{T}}
=
\frac{1}{i\hbar}[\hat{\mathbf{S}},\hat{H}_\mathrm{SO}]
$$

である。別の等価な定義として、磁化方向の回転パラメータ $\mathbf{u}$ に対し

$$
\hat{T}_\mu=\frac{\partial \hat{H}}{\partial u_\mu}
$$

を用いる流儀もある。いずれも「磁化の微小回転が電子状態へ与える摂動」を表す。

### 3.3 Kubo–Greenwood型（グリーン関数表示）
温度ゼロ近傍の金属で広く用いられる形として、先進グリーン関数を $G^+(E)$ とし、スペクトル演算子を

$$
\hat{A}(E)= -\frac{1}{\pi}\,\mathrm{Im}\,\hat{G}^+(E)
$$

とおくと、ダンピングテンソルは（規約定数をまとめて）

$$
\alpha_{\mu\nu}
=
\frac{g}{\pi M_s}
\left\langle
\mathrm{Tr}\left[
\hat{T}_\mu\,\mathrm{Im}\,\hat{G}^+(E_F)\,
\hat{T}_\nu\,\mathrm{Im}\,\hat{G}^+(E_F)
\right]
\right\rangle_c
$$

の形で表される。ここで $g$ はランデ因子、$E_F$ はフェルミ準位、$\langle\cdots\rangle_c$ は（必要に応じて）配置平均である。

この式は導電率のKubo–Greenwood式に似た構造を持ち、KKRグリーン関数法では $\hat{G}$ を多重散乱で直接扱えるため、無秩序合金や不純物、表面・界面へ自然に拡張できる。

### 3.4 散乱（寿命）とスペクトル幅 $\eta$
実計算では、$\mathrm{Im}\,G^+(E)$ を数値的に安定に扱うため、エネルギーに微小な虚部 $\eta$ を導入し、

$$
\hat{G}^+(E)\to \hat{G}(E+i\eta)
$$

とすることが多い。$\eta$ は準粒子寿命 $\tau$ と

$$
\eta \sim \frac{\hbar}{2\tau}
$$

の対応で理解される。KKR-CPAでは化学的無秩序が散乱源として内在し、さらに有限温度の格子振動散乱を「合金類推模型（alloy-analogy model）」で取り込む展開が用いられる。



## 4. CPA・頂点補正と二粒子相関

### 4.1 配置平均の位置づけ
無秩序合金では $\alpha$ は二つの演算子（トルク）と二つのグリーン関数からなる二粒子量であり、単純な平均 $\langle G\rangle$ のみでは不十分となる場合がある。そこで

- バブル項（平均グリーン関数のみ）
- 頂点補正（vertex corrections）

の和として配置平均を評価する。

### 4.2 頂点補正が重要になる状況
頂点補正は、散乱の相関を適切に数え上げる補正であり、濃度依存や不純物散乱が支配的な系で定量的に効くことがある。KKR-CPAは輸送理論と同様の枠組みで頂点補正を導入できるため、合金のダンピングに強い。



## 5. SPR-KKRにおける第一原理評価の流れ

### 5.1 基底状態（相対論KKR）計算
1. 結晶構造（格子定数、原子座標、占有）を与える  
2. 自己無撞着計算により有効ポテンシャルと交換分裂を収束させる（相対論形式）  
3. $E_F$、スピン磁気モーメント、全磁化などを得る

### 5.2 合金・無秩序の取り扱い
- 無秩序合金：CPAで占有を指定し、配置平均グリーン関数を得る  
- 希薄不純物：KKRのグリーン関数埋め込み（embedding）やCPA極限として扱える場合がある  
- 有限温度：格子振動を合金類推模型で散乱として導入する展開が使われる

### 5.3 ダンピング（線形応答）の評価
収束したポテンシャルとグリーン関数表現を入力として、トルク相関式を数値評価する。評価は概念的に

- $\hat{T}_\mu$ の行列要素
- $E_F$ 近傍の $\mathrm{Im}\,G(E_F)$
- 配置平均（CPA＋必要なら頂点補正）
- ブリルアンゾーン積分（$\mathbf{k}$点和、または等価な表現）

から構成され、結果として $\alpha_{\mu\nu}$ を得る。

表1：SPR-KKRでの主要な強み（ダンピング計算の観点）
| 対象 | KKRグリーン関数の利点 |
|---|---|
| 無秩序合金 | CPAで統計平均を直接扱える |
| 不純物・希薄ドープ | 埋め込みやCPA極限で散乱を自然に表現できる |
| 表面・界面 | 半無限系・層状系へ拡張しやすい |
| 応答・輸送量 | Kubo形式と整合し、頂点補正を組み込みやすい |



## 6. 収束性を支配する要因

ダンピング式はフェルミ準位近傍の状態へ強く重み付けされるため、以下の量が結果の安定性に直結する。

### 6.1 エネルギー分解能と幅 $\eta$
$E_F$ 近傍のスペクトル関数 $\mathrm{Im}\,G(E)$ をどの程度の分解能で扱うかが重要である。$\eta$ を小さくするとフェルミ面の微細構造に敏感となり、$\eta$ を大きくすると散乱が強い系に対応するが、微細構造の情報は平均化される。

### 6.2 角運動量カットオフ $l_\mathrm{max}$
KKRは角運動量展開の切断で精度が変わる。特にSOCと$d$軌道混成（あるいは$f$系）では、$l_\mathrm{max}$ の選択がトルク行列要素に影響し得る。

### 6.3 $\mathbf{k}$点積分（周期系の場合）
周期系で $\mathbf{k}$ 表現を用いる場合、$\mathbf{k}$点密度が $\alpha$ の精度を支配する。フェルミ面が複雑な遷移金属では、積分誤差が残りやすい。

表2：数値精度に関係する代表パラメータ
| パラメータ | 物理的意味 | 過小設定の影響 |
|---|---|---|
| $\eta$ | 散乱（寿命）の粗視化 | フェルミ面構造の過敏・数値不安定、または過度な平均化 |
| $l_\mathrm{max}$ | 角運動量展開の切断 | SOC混成とトルク行列要素の不足 |
| エネルギー点数 | 積分・スペクトル分解能 | $E_F$ 近傍の寄与の取りこぼし |
| $\mathbf{k}$点密度 | BZ積分精度 | フェルミ面寄与の誤差 |


## 7. 分解解析：起源を電子状態へ結び付ける見方

### 7.1 バンド内・バンド間の寄与
トルク相関式は、同一状態内（intraband）と異なる状態間（interband）の遷移として整理できる。散乱が弱い極限と強い極限で支配項が入れ替わり得るため、$\eta$ 依存性を追うことで支配機構の理解につながる。

### 7.2 元素・サイト・軌道寄与
相対論KKRでは、サイトごとの散乱行列（部分波）に分解できるため、
- 重元素添加でSOCが増したときの $\alpha$ 変化
- $d$ 状態密度のフェルミ準位近傍増加と $\alpha$ の相関
などを、行列要素とエネルギー分母の両面から検討しやすい。

### 7.3 非共線・波数依存ダンピング
テクスチャ（スピンらせん、磁壁、スキルミオンなど）では、ダンピングは一様モード（$\mathbf{q}=0$）の $\alpha$ から拡張され、波数依存テンソル $\alpha(\mathbf{q})$ が現れる。KKR線形応答はこの拡張にも適用され、非共線磁性の散逸の増減を議論できる。


## 8. VASP系手法との対比
表3：VASP（平面波DFT）とKKR（グリーン関数）の基本的な違い
| 観点 | VASP系（平面波・スーパーセル） | KKR系（グリーン関数・多重散乱） |
|---|---|---|
| 無秩序合金 | スーパーセル平均が基本 | CPAで統計平均を直接扱う |
| 不純物 | 大型セルが必要になりやすい | 埋め込み・CPA極限で扱える |
| 表面・半無限系 | スラブで近似 | 半無限グリーン関数で表現しやすい |
| 応答計算 | 後処理・補間の工夫が必要 | Kubo形式と親和性が高い |

この対比から、組成無秩序・散乱が本質となるダンピング評価では、KKR-CPAの利点が際立ちやすい。

## まとめと展望
KKRグリーン関数法では、ギルバート磁気ダンピング定数 $\alpha$ をトルク相関の線形応答として定式化し、$\mathrm{Im}\,G(E_F)$ とトルク演算子の相関として評価できる。相対論KKRによりSOCを基礎方程式へ内包し、さらにCPAと頂点補正で無秩序合金の統計平均を扱えるため、濃度依存や温度（散乱）依存のダンピングを第一原理的に議論しやすい。

展望として、(i) 合金類推模型を越えた有限温度散乱（電子・格子・スピン揺らぎの統合）的取り込み、(ii) 界面や多層膜で重要となるスピンポンピングや非局所散逸の第一原理接続、(iii) 磁歪・磁気異方性と同じSOC行列要素構造を用いた相関解析（材料設計指針への翻訳）が、今後の発展方向として重要である。

### その他参考文献
- S. Mankovsky et al., First-principles calculation of the Gilbert damping parameter…, Phys. Rev. B 87, 014430 (2013).
https://link.aps.org/doi/10.1103/PhysRevB.87.014430

- The Munich SPR-KKR program package（機能概要：合金のGilbert damping等）
https://www.ebert.cup.uni-muenchen.de/old/index.php?Itemid=20&func=startdown&id=565&lang=en&option=com_remository

- S. Mankovsky, S. Wimmer, H. Ebert, Gilbert damping in noncollinear magnetic systems, Phys. Rev. B 98, 104406 (2018).
（PDF例）
https://epub.uni-regensburg.de/40384/1/SFB1277_A02_1_PhysRevB.98.104406-1.pdf

- S. Mankovsky et al., First-principles calculation of the parameters used by atomistic spin dynamics…, Electron. Struct. 4, 034004 (2022).
https://epub.ub.uni-muenchen.de/93786/1/Mankovsky_2022_Electron._Struct._4_034004.pdf

- （補助）CiNiiによる文献情報
https://cir.nii.ac.jp/crid/1363951793709388928
