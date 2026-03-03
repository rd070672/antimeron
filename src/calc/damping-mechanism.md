# 磁気ダンピングの発生メカニズム

磁気ダンピングは、磁化歳差運動のエネルギーが格子・電子・スピン流などの自由度へ散逸することで生じる緩和である。観測される線幅や緩和定数は、材料固有の内因性寄与と、欠陥・界面・不均一性などに由来する外因性（見かけの）寄与の重なりとして理解されるべきである。

### 参考ドキュメント
1. 講義ノート（日本語）：スピン流・熱流相互変換とスピントロニクスの展望（LLG とギルバート緩和の説明を含む）
https://mercury.yukawa.kyoto-u.ac.jp/~bussei.kenkyu/wp/wp-content/uploads/6200-064223.pdf

2. レビュー（英語）：Azzawi, Hindmarch, Atkinson, Magnetic damping phenomena in ferromagnetic thin-films and multilayers, J. Phys. D: Appl. Phys. 50, 473001 (2017)（オープンな PDF）
https://durham-repository.worktribe.com/output/824152

3. 基本文献（英語）：Kamberský, On the Landau–Lifshitz relaxation in ferromagnetic metals, Czech. J. Phys. B 26, 1366–1383 (1976)（ジャーナル情報）
https://doi.org/10.1007/BF01690134

## 1. 基本方程式：LLG とギルバート減衰

### 1.1 LLG 方程式
飽和磁化方向の単位ベクトルを $\mathbf{m}=\mathbf{M}/M_s$、有効磁場を $\mathbf{H}_{\mathrm{eff}}$、ジャイロ磁気比を $\gamma$ とすると、Landau–Lifshitz–Gilbert (LLG) 方程式は

$$
\frac{d\mathbf{m}}{dt}
=
-\gamma\,\mathbf{m}\times \mathbf{H}_{\mathrm{eff}}
+\alpha\,\mathbf{m}\times \frac{d\mathbf{m}}{dt}
$$

である。ここで $\alpha$ はギルバート磁気ダンピング定数であり、無次元である。

異方的な結晶では、より一般にダンピングはテンソルで表されることがある。

$$
\frac{d\mathbf{m}}{dt}
=
-\gamma\,\mathbf{m}\times \mathbf{H}_{\mathrm{eff}}
+\mathbf{m}\times \boldsymbol{\alpha}\,\frac{d\mathbf{m}}{dt}
$$

### 1.2 散逸の表式
LLG に基づけば、磁気自由エネルギー $E$ の時間変化として散逸パワー密度が定義できる。たとえば等方 $\alpha$ では

$$
-\frac{dE}{dt}
=
\frac{\alpha M_s}{\gamma}\left|\frac{d\mathbf{m}}{dt}\right|^2
$$

となり、$\alpha>0$ が散逸（安定化）に対応する。

## 2. 測定量との対応：FMR 線幅と $\alpha$

### 2.1 周波数依存線幅の基本形
強磁性共鳴（FMR）では、共鳴線幅（磁場掃引の半値幅など）$\Delta H$ が緩和の指標となる。最も基本的な整理は

$$
\Delta H(\omega)=\Delta H_0+\frac{2\alpha}{\gamma}\,\omega
$$

である。$\Delta H_0$ は周波数に依らない広がり（不均一広がり、結晶方位分布、内部磁場の空間ゆらぎ等）を表し、傾きがギルバート型緩和（周波数に比例する成分）を与える。

文献・解析手法によって係数（2 の有無）は、線幅定義（吸収の半値幅、微分信号のピーク間、$\Delta H_{1/2}$ か $\Delta H_{\mathrm{pp}}$ か等）に依存する。従って、式を用いる際は採用した線幅定義と換算式を同じ資料内で統一する必要がある。

### 2.2 表面・界面効果を含む有効ダンピング
薄膜強磁性体 $F$ を非磁性金属 $N$ に接合すると、スピンポンピングにより線幅が増大し、周波数比例成分として観測されることが多い。しばしば

$$
\alpha_{\mathrm{eff}}
=
\alpha_{\mathrm{int}}+\alpha_{\mathrm{sp}}
$$

と分解され、スピンポンピング由来の寄与は

$$
\alpha_{\mathrm{sp}}
=
\frac{\gamma\hbar}{4\pi M_s t_F}\,g_{\mathrm{eff}}^{\uparrow\downarrow}
$$

と書かれる。$t_F$ は強磁性層厚、$g_{\mathrm{eff}}^{\uparrow\downarrow}$ は有効スピンミキシングコンダクタンスである。これは界面起源であるため、分類としては外因性に置かれることが多いが、周波数依存はギルバート型と同じ形をとる点が重要である。

## 3. 内因性ダンピングのミクロ起源

内因性ダンピングは、理想的に均一な単結晶においても残る、材料の電子状態とスピン軌道相互作用（SOC）に根差した散逸である。多くの金属強磁性体では、磁化ダイナミクスが SOC を介して電子励起（電子・正孔対）へ結合し、緩和が生じる。

### 3.1 Kamberský 方式の概念
金属強磁性体の内因性ギルバート減衰は、Kamberský により散逸の線形応答として定式化され、後に torque-correlation model（トルク相関モデル）として広く用いられている。代表的な要点は次である。

- SOC がなければスピン角運動量は保存に近く、ダンピングは弱い
- SOC により磁化歳差運動は電子の軌道自由度と混成し、散乱により不可逆過程へ流れる
- ダンピングはバンド構造とフェルミ準位近傍状態密度、散乱幅（緩和時間）に強く依存する

### 3.2 トルク相関（線形応答）の一般式
ダンピングは、磁化方向に関するトルク演算子 $\hat{T}_i=\partial \hat{H}/\partial \theta_i$ を用いて、広いクラスの理論で共通に

$$
\alpha_{ij}
=
\frac{\gamma}{M_s V}\lim_{\omega\to 0}\frac{1}{\omega}\,\mathrm{Im}\,\chi_{T_iT_j}(\omega)
$$

と表される。$\chi_{T_iT_j}$ はトルク同士の応答関数（相関関数）である。

バンド表示（$|n\mathbf{k}\rangle$）と散乱幅 $\eta$ を導入した実用形の一つは

$$
\alpha
=
\frac{\gamma}{\pi M_s}
\sum_{n,m}\int_{\mathrm{BZ}}\frac{d\mathbf{k}}{(2\pi)^3}
\,
\left|\langle n\mathbf{k}|\hat{T}|m\mathbf{k}\rangle\right|^2
\,
\frac{\eta\,[f(\epsilon_{n\mathbf{k}})-f(\epsilon_{m\mathbf{k}})]}
{(\epsilon_{n\mathbf{k}}-\epsilon_{m\mathbf{k}})^2+\eta^2}
$$

であり、ここで $f$ はフェルミ分布である。$\eta$ は寿命幅（散乱率）に対応し、不純物・フォノン・電子相関など多様な散乱を現象論的に含む。

この式は、次のような性質を含む。

- バンド間（$n\neq m$）遷移は $\eta$ によって共鳴幅が決まり、温度や抵抗率に対してしばしば増加傾向を示す
- バンド内（$n=m$）に対応する成分は近似の取り方によって $\alpha\propto 1/\eta$ のような振る舞いを与え得ると議論され、清浄極限での扱いは理論上の関心点である
- 結晶異方性により $\alpha(\mathbf{m})$ は磁化方向依存（テンソル化）しうる

### 3.3 温度・合金 disorder・抵抗率との関係
内因性ダンピングは、散乱幅 $\eta(T)$ を通じて温度に依存する。合金や欠陥が増えると $\eta$ が増大し、バンド間寄与が増す傾向が現れることが多い。一方で、清浄な系では別の成分が支配的となり得るため、材料ごとに支配機構が変わり得る点が重要である。

## 4. 外因性ダンピングの起源
外因性は、磁化が完全に一様ではないこと、内部磁場が空間的に一定ではないこと、電磁的結合が試料外部へ開くことなどにより生じる、線幅の増大や見かけの緩和である。FMR の線幅解析では、周波数比例成分に混入して $\alpha$ を過大評価する要因になり得る。

### 4.1 不均一広がり（$\Delta H_0$）
局所的な異方性定数、飽和磁化、磁気的体積分率の空間ゆらぎにより、共鳴条件が位置ごとにずれて線幅が生じる。これは周波数に依らない成分として現れやすく、

$$
\Delta H(\omega)=\Delta H_0 + (\mathrm{周波数依存項})
$$

の $\Delta H_0$ に主として入る。

### 4.2 二マグノン散乱（two-magnon scattering）
表面粗さ、界面周期欠陥、転位、グレイン境界などがあると、均一モード（$\mathbf{k}=0$）が有限波数スピン波（$\mathbf{k}\neq 0$）へ散乱され、線幅が増大する。二マグノン散乱は、材料・膜質・方位によって強く変わり、周波数依存が単純な一次関数からずれることがあるため、内因性 $\alpha$ と区別する手掛かりとなる。

### 4.3 スピンポンピング（界面起源の追加ギルバート項）
前節 2.2 の $\alpha_{\mathrm{sp}}$ は界面起源であり外因性に分類されることが多い。実験的には膜厚依存（$1/t_F$）が強い識別子となる。

### 4.4 渦電流損・放射（radiative）損
導電性試料では、時間変化磁束により渦電流が誘起され、電磁エネルギーがジュール熱として散逸する。さらに、共鳴時に導波路・共振器へ電磁エネルギーが再放射される効果（放射損）も現れ得る。これらは試料形状、導電率、測定系の結合条件に依存し、薄膜・厚膜で顕著さが変わる。

## 5. 内因性・外因性の比較整理（表）

| 区分 | 主因 | 観測上の特徴 | 主な依存性 | 理論・計算での扱い |
|---|---|---|---|---|
| 内因性 | SOC を介した電子励起と散乱 | しばしば $\Delta H\propto \omega$ の成分として現れる | バンド構造、$N(E_F)$、散乱幅 $\eta(T)$、磁化方向 | トルク相関、線形応答、Kubo 形式、Green 関数 |
| 外因性（不均一） | 内部磁場の空間分布 | $\Delta H_0$ として周波数に依らず残る | 膜質、組成揺らぎ、応力・異方性分布 | 実空間モデル、分布関数、統計的平均 |
| 外因性（二マグノン） | 欠陥により $\mathbf{k}=0$ が $\mathbf{k}\neq 0$ へ散乱 | 方位依存、周波数依存が直線から外れることがある | 表面粗さ、欠陥スペクトル、膜厚 | スピン波分散と散乱理論 |
| 外因性（スピンポンピング） | 界面からの角運動量流出 | $1/t_F$ で増大しやすい、直線傾きとして現れる | 界面、隣接層、スピン拡散長 | スピン混合コンダクタンス、散乱理論 |
| 外因性（渦電流・放射） | 電磁誘導による散逸 | 厚み・導電率・測定系結合に強く依存 | $\sigma$、試料寸法、導波路条件 | マクスウェル方程式との連成 |

## 6. 切り分けの考え方：線幅解析の複数軸

### 6.1 周波数掃引と分解
最も基本的には、複数周波数で FMR を測定し、$\Delta H$ を $\omega$ に対して線形近似して

- 切片：$\Delta H_0$
- 傾き：$\alpha_{\mathrm{eff}}$

を得る。ただし、二マグノン散乱や測定系放射損がある場合、単純直線から外れるため、周波数範囲を変えて整合性を確認することが重要である。

### 6.2 膜厚依存
スピンポンピングが支配的なら

$$
\alpha_{\mathrm{eff}}(t_F)=\alpha_{\mathrm{int}}+\frac{C}{t_F}
$$

のような依存が現れやすい。$C$ から $g_{\mathrm{eff}}^{\uparrow\downarrow}$ を推定する流れへ接続できる。

### 6.3 角度依存
二マグノン散乱は結晶方位や磁化角度に敏感であることが多い。角度依存線幅が特定の角度で増大する場合、均一なギルバート項だけでは説明できない可能性が高い。

## 7. 第一原理評価との接続

### 7.1 金属強磁性体における線形応答評価
内因性の第一原理評価は、SOC を含む電子構造に対する線形応答（Kubo 形式）として定式化されることが多い。Green 関数を用いる表式は、合金 disorder を CPA などで扱いやすく、KKR 法はこの流儀と相性がよい。

概念的には

- SOC を含むハミルトニアン $\hat{H}$ を構成する
- トルク演算子（磁化方向変化に対する $\partial \hat{H}/\partial \theta$）を定義する
- トルク相関（応答関数）から $\alpha$ を得る

という流れである。

### 7.2 散乱幅 $\eta$ と有限温度
実用計算では、散乱幅 $\eta$ を一定値として導入する近似が用いられることがある。$\eta$ は温度や不純物により本質的には変化するため、温度依存を議論する場合は、抵抗率やフォノン散乱との対応を意識した扱いが必要である。

## 8. まとめと展望

磁気ダンピングは、LLG の現象論的定数 $\alpha$ として表される一方で、その起源は SOC を介した電子励起に由来する内因性と、不均一広がり・二マグノン散乱・界面スピンポンピング・電磁的損失などの外因性が重なった量として理解されるべきである。線幅の周波数依存、膜厚依存、角度依存といった多軸の情報を併用することで、$\alpha_{\mathrm{int}}$ と主要な外因性寄与を分解しやすくなる。

今後の展望としては、(i) トルク相関の第一原理評価に disorder と有限温度（電子・フォノン・マグノン散乱）をより自洽に取り込むこと、(ii) 薄膜界面におけるスピンメモリロスやスピン軌道散乱を含めた界面起源ダンピングの定量と材料設計指針化、(iii) 低損失材料（小 $\alpha$）において支配的となりやすい外因性成分の抑制を、微細構造制御と計測・計算の統合で進めることが重要である。


### 参考文献
- Tserkovnyak, Brataas, Bauer, Enhanced Gilbert Damping in Thin Ferromagnetic Films, Phys. Rev. Lett. 88, 117601 (2002)
https://doi.org/10.1103/PhysRevLett.88.117601

- Tserkovnyak, Brataas, Bauer, Spin pumping and magnetization dynamics in metallic multilayers, Phys. Rev. B 66, 224403 (2002)
https://doi.org/10.1103/PhysRevB.66.224403

- Brataas, Tserkovnyak, Bauer, Halperin, Spin battery operated by ferromagnetic resonance, Phys. Rev. B 66, 060404(R) (2002)
https://doi.org/10.1103/PhysRevB.66.060404

- Gilmore, Idzerda, Stiles, Identification of the Dominant Precession-Damping Mechanism in Fe, Co, and Ni by First-Principles Calculations, Phys. Rev. Lett. 99, 027204 (2007)
https://doi.org/10.1103/PhysRevLett.99.027204

- Fähnle, Steiauf, Illg, Gilbert damping in itinerant ferromagnets, J. Phys.: Condens. Matter 23, 493201 (2011)
https://doi.org/10.1088/0953-8984/23/49/493201

- 日本語講義資料：東京シティ大学 講義ノート（LLG とギルバート減衰の導出を含む）
https://www.comm.tcu.ac.jp/quantum-device/semicon4/notes/note14.pdf

- 東北大学資料（日本語）：磁気緩和に関する理論研究（スピンポンピングと緩和の説明を含む）
https://www.csrn.tohoku.ac.jp/old/uploads/pdf/20210721062821_1762539142.pdf
