# VASP計算による磁気ダンピング定数

本稿は、ギルバート磁気ダンピング定数（Gilbert damping）を第一原理電子状態から導く理論式（線形応答・2次摂動に基づく枠組み）を整理し、VASPで得たSOC（スピン軌道相互作用）込み電子状態を用いて数値評価へ接続する方法をまとめるものである。VASPは基底状態DFTとして波動関数とバンド構造を与え、ダンピング定数は主としてトルク相関（torque–torque correlation）式を用いた後処理で評価する構成となる。

### 参考ドキュメント
1. Akimasa Sakuma, Microscopic Theory of Gilbert Damping for Transition Metal Systems, Journal of the Magnetics Society of Japan 37(6) (2013).
https://www.jstage.jst.go.jp/article/msjmag/37/6/37_6_343/_article/-char/en
2. H. Ebert et al., Ab Initio Calculation of the Gilbert Damping Parameter via the Linear Response Formalism, Phys. Rev. Lett. 107, 066603 (2011).
https://epub.uni-regensburg.de/24331/1/H_EbertPRL107.pdf
3. VASP Wiki: LWANNIER90（VASP→Wannier90インターフェース）
https://vasp.at/wiki/LWANNIER90

## 1. 磁気ダンピングの定義（LLG方程式）

単位磁化ベクトルを $\mathbf{m}=\mathbf{M}/M_s$、有効磁場を $\mathbf{H}_\mathrm{eff}$、ジャイロ磁気比を $\gamma$ とすると、Landau–Lifshitz–Gilbert（LLG）方程式は

$$
\frac{d\mathbf{m}}{dt}
=
-\gamma\,\mathbf{m}\times\mathbf{H}_\mathrm{eff}
+
\alpha\,\mathbf{m}\times\frac{d\mathbf{m}}{dt}
$$

である。$\alpha$ が無次元のギルバート磁気ダンピング定数であり、エネルギー散逸の強さを表す。

低対称（薄膜、界面、異方性の大きい結晶）では $\alpha$ は一般にテンソルとなり、

$$
\frac{d\mathbf{m}}{dt}
=
-\gamma\,\mathbf{m}\times\mathbf{H}_\mathrm{eff}
+
\mathbf{m}\times\left(\boldsymbol{\alpha}\,\frac{d\mathbf{m}}{dt}\right)
$$

の形で書かれる。立方晶バルクで等方的近似が成り立つ場合はスカラー $\alpha$ に還元できる。

## 2. 電子論的起源：SOCと散乱により生じる散逸

ギルバートダンピングは、磁化のゆっくりした歳差運動（$\omega\to 0$）が電子系へ角運動量とエネルギーを移し、散乱により不可逆に散逸する現象として理解できる。SOCが無い極限ではスピン角運動量は保存しやすく、均一モード（Kittel mode）の散逸は起こりにくい。SOCがあると、スピンは軌道自由度を介して格子（不純物・格子振動）へ結合し、散逸チャネルが開く。

この考え方は、磁歪・磁気異方性・ダンピングがいずれもSOCの行列要素とエネルギー分母に支配される、という統一的な見方につながる。磁歪や磁気異方性が「エネルギーのSOC起源の異方性」を見るのに対し、ダンピングは「緩和（散乱）を含む線形応答としての散逸」を見る量である。

## 3. トルク相関モデル（Kamberský形式）の基本式

### 3.1 線形応答としての表現
ダンピングは、横スピン帯磁率（あるいはトルク相関関数）の低周波極限として表される。概念的には

$$
\alpha_{\mu\nu}
\propto
\lim_{\omega\to 0}\frac{1}{\omega}\,\mathrm{Im}\,\chi_{\mu\nu}(\omega)
$$

の形であり、$\chi_{\mu\nu}$ は適切な演算子（トルク、スピン）の応答関数である。

### 3.2 SOC由来トルク演算子
SOCハミルトニアンを

$$
\hat{H}_\mathrm{SO}=\xi(\mathbf{r})\,\hat{\mathbf{L}}\cdot\hat{\mathbf{S}}
$$

と表す（$\xi$ は位置依存のSOC強度、PAWでも実効的に同様の演算子が定義される）とき、電子スピンに働くトルクは

$$
\hat{\mathbf{T}}
=
\frac{1}{i\hbar}\,[\hat{\mathbf{S}},\hat{H}_\mathrm{SO}]
$$

で定義できる。磁化方向の微小回転に対するエネルギー変化を与える演算子として
$\hat{T}_\mu=\partial \hat{H}/\partial u_\mu$（$u_\mu$ は回転の一般化座標）と書く流儀もあり、両者は同等の物理内容を表す。

### 3.3 代表的な数値評価式（一定幅 $\eta$ の導入）
準粒子の有限寿命（散乱）を、1粒子スペクトルのローレンツ幅 $\eta$ として表すと、トルク相関モデルに基づくギルバートダンピング（テンソル）は次の形で書かれる：

$$
\alpha_{\mu\nu}
=
\frac{g}{\pi M_s}
\sum_{\mathbf{k}} w_{\mathbf{k}}
\sum_{n,m}
\langle n\mathbf{k}|\hat{T}_\mu|m\mathbf{k}\rangle
\langle m\mathbf{k}|\hat{T}_\nu|n\mathbf{k}\rangle
\,
\frac{\eta^2}{
\left[(\varepsilon_{n\mathbf{k}}-E_F)^2+\eta^2\right]
\left[(\varepsilon_{m\mathbf{k}}-E_F)^2+\eta^2\right]
}
$$

ここで、
- $|n\mathbf{k}\rangle$ はSOC込みKohn–Sham固有状態（スピノル）である。
- $\varepsilon_{n\mathbf{k}}$ は固有値、$E_F$ はフェルミ準位である。
- $w_{\mathbf{k}}$ はブリルアンゾーン積分の重みである。
- $M_s$ は単位体積当たりの飽和磁化である（VASPの磁気モーメントを体積で割り、SI単位に換算する）。
- $g$ はランデ$g$因子であり、しばしば $g\approx 2$ として扱われる。

幅 $\eta$ と緩和時間 $\tau$ の対応は、簡約化したローレンツ模型では

$$
\eta \sim \frac{\hbar}{2\tau}
$$

として用いられることが多い。抵抗率や温度依存を厳密に取り込むには、散乱の微視的模型（不純物、格子振動、スピン揺らぎ）を別途組み込む必要がある。

### 3.4 表式の分解（バンド内・バンド間）
上式の $n=m$ 成分は「バンド内（intraband）」、$n\neq m$ は「バンド間（interband）」として整理される。金属では両方が寄与し、$\eta$ の大きさにより支配的な項が変化する。温度や不純物濃度で $\alpha$ が増減する傾向は、この $\eta$ 依存性とSOC行列要素の分布（フェルミ面近傍の状態密度・混成）から理解される。

表1：トルク相関モデルで現れる量と意味
| 記号 | 次元 | 意味 |
|---|---|---|
| $\alpha$ | 1 | 無次元ダンピング定数 |
| $\hat{T}_\mu$ | エネルギー | SOCに由来するトルク演算子（回転に対する微分、または交換子） |
| $M_s$ | A/m | 飽和磁化（体積密度） |
| $\eta$ | eV（またはJ） | スペクトル幅（散乱の効果を表す） |
| $E_F$ | eV | フェルミ準位 |
| $w_{\mathbf{k}}$ | 1 | $\mathbf{k}$点重み（BZ積分） |

## 4. VASPで用意するべき電子状態（SOC、磁化方向、密な$\mathbf{k}$点）

### 4.1 SOC込み非共線DFTの基本
VASPでSOCを扱うには、非共線（noncollinear）形式のスピノル波動関数を用いる設定が基本である。代表的には以下を用いる。

- SOCを有効化：`LSORBIT = .TRUE.`
- 磁化方向（スピン量子化軸）の指定：`SAXIS = (s_x, s_y, s_z)`
- 非共線の利用：`LNONCOLLINEAR = .TRUE.`（VASPの設定により自動的に必要になる場合もある）
- 対称操作の扱い：磁化方向を固定した比較（異方性や応答）では対称性が結果を混同させ得るため、対称の扱いを慎重に揃える。

磁気異方性（MAE）の計算でも同様に、磁化方向を変えたSOC計算を高精度に比較する手順が広く用いられる。ダンピング評価でも、基礎となる固有状態は同種のSOC計算で得る。

### 4.2 自己無撞着（NSCF）で密な$\mathbf{k}$点を用いる理由
トルク相関式はフェルミ準位近傍の状態に極めて敏感であり、ブリルアンゾーン積分の精度が支配的になる。そこで、(i) まず適度な$\mathbf{k}$点でSCF計算により電荷密度を収束させ、(ii) 収束した電荷密度を固定して非常に密な$\mathbf{k}$点でNSCF計算を行い、固有値・固有ベクトルを高密度に得る、という流れが有効である。

VASPでは固定電荷密度でのNSCFに `ICHARG = 11` を用いることが多い。これにより密な$\mathbf{k}$点での電子状態を、SCF反復の不安定さを避けて生成できる。

### 4.3 必要となる出力
後処理でトルク行列要素やバンド情報を扱うため、少なくとも以下が必要になる。
- SOC込みの固有値 $\varepsilon_{n\mathbf{k}}$（EIGENVAL、vasprun.xml等）
- SOC込みの波動関数（WAVECAR）
- フェルミ準位 $E_F$、全磁気モーメント（OUTCAR）
- セル体積 $V$（POSCAR/OUTCAR）

表2：VASP出力から得る量と後処理での用途
| VASP出力 | 含まれる主な情報 | 用途 |
|---|---|---|
| OUTCAR | $E_F$、磁気モーメント、体積、設定 | $M_s$換算、条件の整合 |
| WAVECAR | スピノル波動関数 | 演算子行列要素（トルク等）の評価 |
| vasprun.xml | 固有値、占有、DOS関連 | バンド・フェルミ準位の整合、補助解析 |
| EIGENVAL/PROCAR | 固有値、射影 | フェルミ面付近の状態の理解 |

## 5. ダンピング評価を現実的にするためのWannier補間（VASP→Wannier90）

### 5.1 なぜWannier補間が有用か
トルク相関式の $\mathbf{k}$点和は非常に密な格子を要求し、直接VASPでその全点の波動関数を扱うと計算資源が大きくなる。そこで、比較的粗い$\mathbf{k}$点で得た第一原理バンドを、最大局在ワニエ関数（MLWF）により実空間ハミルトニアンへ写像し、任意に密な$\mathbf{k}$点で高速に内挿する方法が用いられる。

### 5.2 VASPのWannier90インターフェース
VASPは `LWANNIER90 = .TRUE.` によりWannier90用の入力（`wannier90.win`）と重なり行列（`wannier90.mmn`）、射影（`wannier90.amn`）、固有値（`wannier90.eig`）等を作成する。`LWRITE_UNK = .TRUE.` を併用すると `UNK` 系ファイル（ブロッホ関数格子表現）も出力できる。

その後、Wannier90でMLWFを構築し、実空間ハミルトニアン $H_{ij}(\mathbf{R})$（`seedname_hr.dat`）を得る。SOC込み計算ではスピノル（spinor）としての取り扱いが本質となるため、Wannier化の範囲（バンド窓）と射影の設計が重要である。

### 5.3 トルク行列要素をWannier基底へ写像する考え方
トルク演算子 $\hat{T}_\mu$ のバンド表示行列要素 $T_{nm}^{(\mu)}(\mathbf{k})=\langle n\mathbf{k}|\hat{T}_\mu|m\mathbf{k}\rangle$ を得られる場合、Wannier基底への変換により

$$
T^{(\mu)}_{ij}(\mathbf{k})
=
\left[U^\dagger(\mathbf{k})\,T^{(\mu)}(\mathbf{k})\,U(\mathbf{k})\right]_{ij}
$$

と書ける（$U(\mathbf{k})$ はBloch→Wannierのユニタリ変換）。この $T^{(\mu)}_{ij}(\mathbf{k})$ を密な$\mathbf{k}$点に内挿できれば、トルク相関式の評価が可能となる。

実装としては、(i) VASP波動関数から直接 $T_{nm}^{(\mu)}(\mathbf{k})$ を計算してWannier化する方法、(ii) SOC演算子の形を用いてWannierハミルトニアンからトルクを構成する方法、などが研究で用いられている。いずれも「VASPでSOC込み電子状態を得る」ことが前提である。

## 6. $M_s$ の換算（VASP出力→SI単位）

VASPが与える全磁気モーメントを $\mu_\mathrm{cell}$（単位：$\mu_B$）、セル体積を $V_\mathrm{cell}$（単位：Å$^3$）とする。これをSIの磁化（A/m）に換算するには、

$$
M_s
=
\frac{\mu_\mathrm{cell}\,\mu_B}{V_\mathrm{cell}}
$$

である。ただし単位換算として
- $\mu_B = 9.2740100783\times 10^{-24}\ \mathrm{A\,m^2}$
- $1\ \mathrm{Å}^3 = 10^{-30}\ \mathrm{m^3}$

を用い、

$$
M_s[\mathrm{A/m}]
=
\frac{\mu_\mathrm{cell}[\mu_B]\times 9.2740\times 10^{-24}}{V_\mathrm{cell}[\mathrm{Å^3}]\times 10^{-30}}
=
9.2740\times 10^{6}\,
\frac{\mu_\mathrm{cell}[\mu_B]}{V_\mathrm{cell}[\mathrm{Å^3}]}
$$

と簡約できる。

表3：よく使う定数
| 量 | 値 |
|---|---|
| $\mu_B$ | $9.2740100783\times 10^{-24}\ \mathrm{A\,m^2}$ |
| $\hbar$ | $1.054571817\times 10^{-34}\ \mathrm{J\,s}$ |
| $1\ \mathrm{Å}^3$ | $10^{-30}\ \mathrm{m^3}$ |

## 7. 数値評価で支配的になる点（$\mathbf{k}$点、バンド数、$\eta$）

### 7.1 $\mathbf{k}$点密度
金属の $\alpha$ はフェルミ面近傍の微細構造に敏感であるため、$\mathbf{k}$点密度が不十分だと値が大きく変動し得る。Wannier補間による超高密度評価（同一のMLWFを用いた内挿）が、値の安定化に寄与する。

### 7.2 バンド窓（Wannier化の範囲）
トルク相関式は $n,m$ の二重和を持つため、フェルミ準位近傍のバンドだけでなく、SOCで強く混成する周辺バンドも窓に含める必要がある。窓が狭いとSOC混成の寄与を欠き、窓が広すぎるとWannier化が不安定になり得るため、材料ごとに整合の良い窓設計が要る。

### 7.3 幅 $\eta$ の物理的意味
一定幅 $\eta$ は「散乱の代表値」を粗視化したものであり、温度・不純物・格子振動・スピン揺らぎの影響を一つのパラメータで表す。第一原理から $\eta$ を直接決めることは一般には難しく、抵抗率や寿命推定（あるいは複数 $\eta$ の走査）により議論することが多い。

## 8. VASPでの位置づけ

VASPが直接与えるのは、SOC込みのKohn–Sham固有値・固有状態である。ギルバートダンピングは線形応答量であり、トルク相関式（または等価なGreen関数形式）を用いたブリルアンゾーン積分として後処理で評価する構成となる。

表4：計算構成の整理
| 区分 | 入力 | 出力 | 目的 |
|---|---|---|---|
| VASP（SOC計算） | 結晶構造、SOC設定、磁化方向、$\mathbf{k}$点 | $\varepsilon_{n\mathbf{k}}$、$｜n\mathbf{k}\rangle$、$E_F$、$\mu_\mathrm{cell}$ | 電子状態の生成 |
| Wannier90（内挿） | VASP→Wannier入出力 | $H_{ij}(\mathbf{R})$ | 密な$\mathbf{k}$点内挿 |
| 後処理（線形応答） | $H$、（可能なら）$T_\mu$、$\eta$、$M_s$ | $\alpha$（または $\boldsymbol{\alpha}$） | トルク相関式の評価 |

## 9. まとめと展望

本稿では、SOCと散乱により生じるギルバート磁気ダンピングを、トルク相関モデル（Kamberský形式）の線形応答として整理し、VASPで得たSOC込み電子状態から後処理計算で $\alpha$ を評価する道筋を示した。要点は、(i) SOC込みスピノル固有状態を高精度に得ること、(ii) フェルミ面近傍の積分を支配するため密な$\mathbf{k}$点を扱うこと、(iii) 散乱を表す幅 $\eta$ と磁化密度 $M_s$ を一貫した規約と単位で取り扱うことである。

展望としては、一定幅 $\eta$ を越えて、格子振動・不純物・スピン揺らぎを電子論的に取り込む枠組み、界面や多層系で重要となる非局所ダンピング（$\mathbf{r},\mathbf{r}'$依存）やスピンポンピング寄与との統合、ならびに磁歪やMAEと同じSOC行列要素構造を用いた相関解析（磁気異方性・磁歪・ダンピングの同時設計）へ拡張することが重要である。


## その他参考文献
- V. Kamberský, On the Landau–Lifshitz Relaxation in Ferromagnetic Metals, Czech. J. Phys. B 26, 1366–1383 (1976).
（出版社ページ等：入手経路により異なる）

- P. Bruno, Tight-binding approach to the orbital magnetic moment and magnetic anisotropy of transition-metal monolayers, Phys. Rev. B 39, 865 (1989).
https://journals.aps.org/prb/abstract/10.1103/PhysRevB.39.865

- Wannier90 Documentation（ユーザーガイド／ファイル仕様）
https://wannier90.readthedocs.io/
https://wannier.org/support/

- VASP Wiki: LWANNIER90_RUN（Wannier90をlibrary modeで実行）
https://www.vasp.at/wiki/index.php/LWANNIER90_RUN

- VASP Best Practices: ICHARG=11（固定電荷密度のNSCF）
https://enccs.github.io/vasp-best-practices/fcc_Si_DOS/

- D. Thonig et al., Magnetic moment of inertia within the torque-torque correlation model, Sci. Rep. 7, 15648 (2017).
https://www.nature.com/articles/s41598-017-01081-z

- VASP Wiki（SOC・非共線磁性の設定に関する各ページ）
https://vasp.at/wiki/
