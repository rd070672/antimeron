# 二次摂動理論にもとづく磁気ダンピングの導出

磁気ダンピング定数（Gilbert damping 定数）$\alpha$ は、磁化歳差運動のエネルギーが電子系へ散逸する強さを表す無次元量である。線形応答理論では、スピン軌道相互作用（SOI）と散乱（寿命）を含む電子系の相関関数として $\alpha$ を表し、第一原理計算へ直接接続できる。



## 参考ドキュメント
1. Akimasa Sakuma, Microscopic Theory of Gilbert Damping for Transition Metal Systems, Journal of the Magnetics Society of Japan 37(6) (2013), 日本語解説を含む（J-STAGE PDF）
   https://www.jstage.jst.go.jp/article/msjmag/37/6/37_1310R001/_pdf

2. H. Ebert et al., Ab initio calculation of the Gilbert damping parameter via linear response formalism, Phys. Rev. Lett. 107, 066603 (2011)（PDF）
   https://epub.uni-regensburg.de/24331/1/H_EbertPRL107.pdf

3. A. Brataas, Y. Tserkovnyak, G. E. W. Bauer, Scattering Theory of Gilbert Damping（arXiv PDF, 2008；散乱行列による定式化）
   https://arxiv.org/pdf/0807.5009



## 1. 記号と前提

### 1.1 LLG 方程式と Gilbert 項
単一磁区（空間一様）の磁化 $\mathbf{M}(t)$ は Landau–Lifshitz–Gilbert（LLG）方程式で記述される。

$$
\frac{d\mathbf{M}}{dt}
=
-\gamma\,\mathbf{M}\times \mathbf{H}_{\mathrm{eff}}
+
\frac{\alpha}{M_s}\,\mathbf{M}\times \frac{d\mathbf{M}}{dt},
$$

ここで $\gamma$ はジャイロ磁気比、$M_s=|\mathbf{M}|$ は飽和磁化、$\mathbf{H}_{\mathrm{eff}}$ は有効磁場である。$\alpha$ が磁気ダンピング定数であり、一般には結晶対称性に応じてテンソル $\alpha_{\mu\nu}$ として現れるが、立方対称などではスカラー近似が成立しやすい。

### 1.2 散逸（エネルギー散逸率）の形
磁化の歳差運動が減衰するという現象は、磁気エネルギーが電子・格子などの自由度へ流れ出すことに対応する。LLG の形から、散逸は概念的に

$$
\dot{E}
\propto
-\alpha\,|\dot{\mathbf{m}}|^2
\quad
(\mathbf{m}=\mathbf{M}/M_s)
$$

という二次形式で表される。したがって $\alpha$ は「微小な磁化運動がどれだけ電子系を励起し、不可逆的な散逸へ至るか」を集約した量である。

### 1.3 電子系の基本量
電子状態は Bloch 状態 $|n\mathbf{k}\rangle$、固有値 $E_{n\mathbf{k}}$、フェルミ準位 $E_F$ で表す。
- $n,n'$：バンド指標
- $\mathbf{k}$：波数
- $w_{\mathbf{k}}$：$\mathbf{k}$ 点重み
- $\delta$：スペクトル広がり（散乱率の有効パラメータ、単位はエネルギー）



## 2. なぜ SOI と散乱が必要か：物理像の整理

一様モード（$q=0$ の Kittel モード）では、結晶中のスピン回転対称性が厳密ならば、電子系は磁化の回転に追随して等エネルギー的に回転し、散逸は生じにくい。散逸が有限となる主要因は次である。

1. スピン軌道相互作用（SOI）
   スピン角運動量が軌道自由度と結合し、結晶格子（座標系）へ結び付くことで、磁化回転が実体的な電子励起（電子・正孔対生成）へ変換される。

2. 散乱（寿命）
   バンド間・バンド内の遷移が不可逆性を持つには、状態の寿命（線幅）が必要である。純粋な無散乱極限では、定式化によっては $\alpha$ が不自然に発散することがあるため、散乱の取り扱いが定式化の中核となる。

このため、$\alpha$ は「SOI による混成（しばしば SOI 強度の二次）× フェルミ面近傍の遷移位相空間 × 散乱（線幅）」の積として理解される。



## 3. 線形応答理論による導出

### 3.1 時間依存する交換場（分子場）としての磁化運動
スピン密度汎関数理論（SDFT）などの平均場描像では、磁性体の電子ハミルトニアンを

$$
\hat{H}(t)=\hat{H}_0 + \hat{H}_{\mathrm{xc}}(\mathbf{m}(t)) + \hat{H}_{\mathrm{SO}}
$$

と書く。$\hat{H}_{\mathrm{xc}}$ は交換相互作用を表し、$\mathbf{m}(t)$ の微小回転が時間依存摂動となる。

このとき、磁化の運動が電子系へ注入するパワー（単位時間当たりのエネルギー）を線形応答で評価し、散逸成分（不可逆成分）を $\alpha$ と同定するのが基本である。

### 3.2 トルク演算子と相関関数
磁化の向き（例えば極角 $\theta,\phi$）に対するハミルトニアンの微分により、トルク演算子を

$$
\hat{T}_{\mu} = -\frac{\partial \hat{H}}{\partial u_{\mu}}
\quad
(u_{\mu}=\theta,\phi \ \text{など})
$$

と定義できる。SOI を $\hat{H}_{\mathrm{SO}}=\xi\,\hat{\mathbf{L}}\cdot\hat{\mathbf{S}}$ と近似できる場合、スピン演算子との交換関係から SOI に比例するトルクが現れる。

線形応答では、Gilbert ダンピングテンソルは一般に

$$
\alpha_{\mu\nu}
=
\frac{\gamma}{M_s}\,
\lim_{\omega\to 0}
\frac{
\Im\,\chi^{\mathrm{R}}_{T_{\mu}T_{\nu}}(\omega)
}{
\omega
}
$$

と書ける。$\chi^{\mathrm{R}}_{T_{\mu}T_{\nu}}(\omega)$ はトルク演算子の遅延相関関数（retarded correlation function）である。この形は「低周波極限の散逸（$\Im/\omega$）」が摩擦係数に対応するという一般論に沿う。



## 4. トルク相関モデル（Kamberský 型）と二次摂動的表式

### 4.1 二次摂動としての位置付け
SOI が小さい場合、電子状態の混成や遷移確率は SOI 行列要素の二乗に比例する。したがって $\alpha$ は（定義の詳細は別として）概ね $\xi^2$ の次数で支配され、二次摂動的な構造を持つ。

### 4.2 行列要素の定義（スピン lowering 成分の例）
提示スライドに相当する定義の一例として、スピン lowering 演算子 $\hat{S}^{-}=\hat{S}_x-i\hat{S}_y$ を用い、

$$
\left|r^{-}_{nn'}(\mathbf{k})\right|^2
=
\xi^2
\left|
\left\langle n\mathbf{k}\left|
\left[\hat{S}^{-},\hat{H}_{\mathrm{SO}}\right]
\right|n'\mathbf{k}\right\rangle
\right|^2
$$

と置く。ここで $[\cdot,\cdot]$ は交換子である。$\hat{H}_{\mathrm{SO}}$ に $\xi$ を明示的に含める流儀では、上式のように $\xi^2$ が前に出る。

同値に、$x,y$ 成分のトルク演算子 $\hat{T}_x,\hat{T}_y$ を直接用いる定義も広く用いられる。結晶対称性が低い場合やテンソル評価では $\hat{T}_{\mu}$ を成分で扱う方が見通しがよい。

### 4.3 スペクトル関数と一定線幅（散乱率）近似
散乱により準粒子に有限線幅があることを、スペクトル関数 $A_{n\mathbf{k}}(E)$ で表す。最も単純な一定線幅（Lorentzian）近似は

$$
A_{n\mathbf{k}}(E)
=
\frac{\delta}{\left(E-E_{n\mathbf{k}}\right)^2+\delta^2}.
$$

このとき、トルク相関モデルの基本形は

$$
\alpha
=
\frac{g}{\pi M_s}
\sum_{\mathbf{k}} w_{\mathbf{k}}
\sum_{nn'}
\left|r^{-}_{nn'}(\mathbf{k})\right|^2
\,
A_{n\mathbf{k}}(E_F)\,
A_{n'\mathbf{k}}(E_F)
$$

となる。$A_{n\mathbf{k}}(E_F)$ に Lorentzian を代入すると、提示スライドに対応する形

$$
\alpha
=
\frac{g}{\pi M_s}
\sum_{\mathbf{k}} w_{\mathbf{k}}
\sum_{nn'}
\left|r^{-}_{nn'}(\mathbf{k})\right|^2
\,
\frac{\delta}{(E_F-E_{n\mathbf{k}})^2+\delta^2}
\,
\frac{\delta}{(E_F-E_{n'\mathbf{k}})^2+\delta^2}
$$

を得る。ここで $g$ は規格化に依存する係数（$g$ 因子を含む表記、あるいは $\gamma$ で書く表記など）が文献により異なるため、採用した LLG の規格化と整合させる必要がある。

### 4.4 バンド内（intraband）とバンド間（interband）
上式の和は $n=n'$ と $n\neq n'$ に分けられる。

- バンド内寄与（$n=n'$）
  フェルミ面上の同一バンド内での「散乱によって有限となる」寄与であり、寿命 $\tau$（概ね $\tau\sim\hbar/(2\delta)$）に対して増大側の依存を示し得る。

- バンド間寄与（$n\neq n'$）
  異なるバンド間の遷移であり、線幅が大きいほど遷移が許される相空間が増える側面がある。

このため、散乱の弱い領域と強い領域で $\alpha$ の $\tau$ 依存が反転し得るという整理（$\alpha\propto \tau$ と $\alpha\propto 1/\tau$ の両領域）が歴史的に議論されてきた。

表1：トルク相関モデルで頻出の量
| 記号 | 意味 | 次元 |
|---|---|---|
| $\alpha$ | Gilbert ダンピング定数 | 無次元 |
| $M_s$ | 飽和磁化 | A/m（または規格化に依存） |
| $E_{n\mathbf{k}}$ | バンドエネルギー | eV |
| $E_F$ | フェルミ準位 | eV |
| $\delta$ | 線幅（散乱率パラメータ） | eV |
| $A_{n\mathbf{k}}(E)$ | スペクトル関数 | 1/eV |
| $\hat{H}_{\mathrm{SO}}$ | スピン軌道相互作用 | eV |
| $\hat{T}_{\mu}$ | トルク演算子 | eV（角度微分に対応） |



## 5. 第一原理計算への接続：Kubo–Greenwood 型表式と Green 関数

### 5.1 Kubo–Greenwood 類似形（一般的な形）
トルク相関は Green 関数を用いて簡潔に書ける。代表的な表式は

$$
\alpha_{\mu\nu}
=
\frac{\gamma}{\pi M_s}
\operatorname{Tr}
\left\langle
\hat{T}_{\mu}\,
\Im \hat{G}(E_F)\,
\hat{T}_{\nu}\,
\Im \hat{G}(E_F)
\right\rangle
$$

の形を取る（$\langle\cdots\rangle$ は無秩序平均などを表し得る）。$\hat{G}(E)$ は一電子 Green 関数であり、$\Im\hat{G}$ が状態密度と線幅情報を含む。

この形の利点は、無秩序合金（置換無秩序）に対して CPA（coherent potential approximation）を組み合わせ、散乱を自己無撞着に取り込める点にある。さらに、頂点補正（vertex correction）を含めることで、散乱過程の相関をより忠実に反映できる。

### 5.2 KKR-CPA による実装
KKR（Korringa–Kohn–Rostoker）法の完全相対論的実装では、SOI をハミルトニアンに含めたまま Green 関数を構成できる。CPA は置換無秩序を平均媒質として扱い、フェルミ面近傍のスペクトルの広がりを自然に導入できるため、$\delta$ を外部から仮定する近似よりも物理的な入力が明確になりやすい。

一方、平面波 DFT では、Wannier 関数などを用いて $\mathbf{k}$ 空間での行列要素補間を行い、非常に密な $\mathbf{k}$ 点で上式を評価する流儀が取られることが多い。



## 6. 散乱の扱い：一定線幅 $\delta$ から温度・無秩序へ

### 6.1 一定線幅 $\delta$ の意味
$\delta$ は電子寿命の逆数に対応する有効エネルギー幅であり、格子振動、無秩序、欠陥、電子・電子散乱などの総合効果を粗視化する。一定線幅は解析的に扱いやすい反面、材料や温度に応じた散乱機構の違いを直接表現するものではない。

### 6.2 温度依存の概念的導入
温度上昇により格子振動が増えると、電子の散乱が強くなる（線幅が増える）ため、$\alpha(T)$ は単調ではなく、バンド内・バンド間の相対比で非自明な温度依存を示し得る。第一原理では、格子振動を「合金類推（alloy analogy）」として統計的に扱い、CPA 的平均で散乱を入れるアプローチも提案されている。



## 7. 別視点の定式化：散乱行列（spin pumping を含む）

散乱理論では、時間依存する磁化が界面から角運動量流（スピン流）を汲み出し、その反作用としてダンピングが増えるという描像が自然に現れる。この寄与は薄膜・多層膜でとくに重要であり、バルク固有の内部散逸と、界面起源の寄与を分けて議論できる利点がある。

表2：代表的な計算法の整理
| 立場 | 中心式の形 | 主な長所 | 主な注意点 |
|---|---|---|---|
| トルク相関（一定線幅） | $\alpha\propto \sum T_{nn'}^2 A A$ | 実装が比較的単純で見通しがよい | $\delta$ の物理的根拠を別途与える必要がある |
| 線形応答＋Green 関数（KKR-CPA） | $\alpha\propto \mathrm{Tr}\langle T\,\Im G\,T\,\Im G\rangle$ | 無秩序合金・散乱を自己無撞着に取り込める | 実装が重く、定式化（頂点補正など）の理解が必要である |
| 散乱行列（spin pumping） | $S$ 行列の時間微分で $\alpha$ | 界面寄与とバルク寄与を分けやすい | 幾何（層構造）依存が強く、バルク定数との対応付けに注意が要る |
| TD-SDFT | 応答関数から $\alpha$ | 交換・相関の動力学を原理的に扱える | 実用計算の難度が高い場合がある |



## 8. 実験量との対応
FMR（強磁性共鳴）では、周波数 $f$ と線幅 $\Delta H$ の関係から $\alpha$ が推定される。一般に

$$
\Delta H(f)
=
\Delta H_0 + \frac{2\pi}{\gamma}\,\alpha\, f
$$

のような線形関係が用いられる（$\Delta H_0$ は不均一広がりなど）。第一原理で得る $\alpha$ は「内部起源（intrinsic）」に対応付けられることが多いが、薄膜では spin pumping、二マグノン散乱などの追加寄与が線幅に混入し得るため、比較では測定系の条件整理が重要になる。



## 9. まとめと展望
磁気ダンピング定数 $\alpha$ は、SOI と散乱を含む電子系の線形応答として導出でき、トルク相関（Kamberský 型）では $\alpha$ をフェルミ準位近傍の行列要素二乗とスペクトル関数の積として表せる。一定線幅 $\delta$ を用いる近似は見通しがよい一方、無秩序合金や温度散乱をより直接に扱うには Green 関数と CPA を組み合わせた Kubo–Greenwood 型定式化が有効である。

今後の展望としては、(i) 合金・欠陥・熱振動を区別した散乱機構の第一原理的取り込み（頂点補正や統計モデルの高度化）、(ii) 非共線磁性やテクスチャ（$\alpha(\mathbf{q})$ の波数依存）を含む空間非一様ダンピングの定量化、(iii) 磁気弾性やスピン流（spin pumping）といった隣接現象を同一枠組みで結び、材料設計変数（組成、規則度、歪、界面）と $\alpha$ の因果関係を説明可能な形で提示する方向が重要である。



## 参考文献
- S. Mankovsky et al., First-principles calculation of the Gilbert damping parameter via the linear response formalism with application to magnetic transition metals and alloys, Phys. Rev. B 87, 014430 (2013)
  https://arxiv.org/abs/1301.2114
  https://link.aps.org/doi/10.1103/PhysRevB.87.014430

- K. Gilmore et al., Spin-orbit precession damping in transition metal ferromagnets, J. Appl. Phys. 103, 07D303 (2008)（PDF）
  https://pubs.aip.org/aip/jap/article-pdf/doi/10.1063/1.2832348/13356339/07d303_1_online.pdf

- I. Garate and A. H. MacDonald, Torque-correlation-formula derivation in conducting ferromagnets（arXiv PDF, 2008）
  https://arxiv.org/pdf/0808.1373

- A. Brataas et al., Magnetization dissipation in ferromagnets from scattering theory, Phys. Rev. B 84, 054416 (2011)
  https://link.aps.org/doi/10.1103/PhysRevB.84.054416

- V. Kamberský, On the Landau–Lifshitz relaxation in ferromagnetic metals, Czech. J. Phys. B 26, 1366 (1976)（入手経路は機関契約に依存する）
  https://ui.adsabs.harvard.edu/abs/1976CzJPh..26.1366K/abstract

- （国内・プレスリリース例）ギルバートダンピング定数の解説を含む（東北大学 AIMR）
  https://www.wpi-aimr.tohoku.ac.jp/jp/achievements/press/2020/20200820_001288.html
