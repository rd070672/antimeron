# 磁壁運動を起点とする電磁誘導と散逸の理論


導電性をもつ強磁性体では、磁壁や磁化テクスチャの運動が局所的な渦電流を誘起し、ジュール散逸と自己誘起磁場によって運動が減衰する。ここでは Maxwell 方程式（準静近似）と LLG/磁壁集団座標を接続し、渦電流起源の「粘性・遅れ応答」を磁気ダンピングとしてどのように定式化できるかを整理する。

### 参考ドキュメント
1. Colaiori, Durin, Zapperi, Eddy current damping of a moving domain wall: beyond the quasistatic approximation, Phys. Rev. B 76, 224416 (2007)（PDF）  
https://air.unimi.it/retrieve/dfa8b99e-c7fd-748b-e053-3a05fe0a3a96/PhysRevB.76.224416.pdf

2. Flovik, Pettersen, Eddy-current effects on ferromagnetic resonance: (2016)（entry/PDF）  
https://www.semanticscholar.org/paper/Eddy-current-effects-on-ferromagnetic-resonance%3A-Flovik-Pettersen/67d930838412a8d57f2c340fc0b312754175abbc

3. [日本語] JMAG-International, [W-MA-88] 異常渦電流損失計算の高精度化 (1)  
https://www.jmag-international.com/jp/whitepapers/w-ma-88/

## 1. 位置づけ：渦電流起源の「ダンピング」とは何であるか

### 1.1 渦電流は「エネルギー散逸」と「反作用場」の二面性をもつ

導体中では誘導電場 $\mathbf{E}$ が電流 $\mathbf{J}=\sigma \mathbf{E}$ を駆動し、局所のジュール散逸密度は

$$
p(\mathbf{r},t)=\mathbf{J}\cdot\mathbf{E}=\frac{|\mathbf{J}|^2}{\sigma}=\sigma |\mathbf{E}|^2
$$

である。一方、その $\mathbf{J}$ はアンペール則を通じて磁場を生成し、レンツの法則に従う反作用磁場 $\mathbf{H}_{\mathrm{ec}}$ が磁化運動を抑制する。この抑制は、微視的には磁壁速度や磁化歳差運動の減衰として観測されうる。

### 1.2 「Gilbert ダンピング」との関係：局所渦電流は一般に非局所・遅れを含む

LLG 方程式は

$$
\frac{\partial \mathbf{m}}{\partial t}
=-\gamma\,\mathbf{m}\times \mathbf{H}_{\mathrm{eff}}
+\alpha\,\mathbf{m}\times \frac{\partial \mathbf{m}}{\partial t},
\qquad \mathbf{m}=\mathbf{M}/M_s
$$

であり、右辺第2項は時間局所な散逸を表す。渦電流反作用は Maxwell 方程式により決まり、一般には「試料形状と導電率が定める拡散遅れ」を含むため、$\alpha$ の単純な増加として表せない場合がある。Colaiori らは磁壁運動に対して履歴依存（メモリカーネル）を伴う抵抗力が出ることを示している。

## 2. 磁気準静近似における Maxwell–Ohm 系と磁気拡散

### 2.1 磁気準静近似（変位電流無視）の基本式

多くの金属磁性体の低〜中周波域では、変位電流を無視して

$$
\nabla\times\mathbf{E}=-\frac{\partial\mathbf{B}}{\partial t},\quad
\nabla\times\mathbf{H}=\mathbf{J},\quad
\nabla\cdot \mathbf{B}=0,\quad
\mathbf{J}=\sigma\mathbf{E}
$$

を用いる。構成則は

$$
\mathbf{B}=\mu_0(\mathbf{H}+\mathbf{M})
$$

である。

### 2.2 磁気拡散方程式の導出（概略）

$\mathbf{J}=\sigma\mathbf{E}$ を用い、

$$
\nabla\times \mathbf{E}=\nabla\times\left(\frac{\mathbf{J}}{\sigma}\right)
=\frac{1}{\sigma}\nabla\times(\nabla\times \mathbf{H})
$$

を Faraday 則に代入すると、$\mathbf{H}$ について 2 階の空間微分と 1 階の時間微分が結び付いた形が得られる。単純化として $\mu$ が一様で、$\nabla\cdot \mathbf{H}$ の寄与を抑えた状況では、代表的に

$$
\nabla^2 \mathbf{H}=\sigma \mu\,\frac{\partial \mathbf{H}}{\partial t}
$$

の拡散型方程式が現れる。Colaiori らはこの形を用いて渦電流応答の時間スケールと磁壁への反作用を解析している。

### 2.3 時定数と表皮深さ

拡散型方程式から、幾何学的代表長さ $L$ に対し

$$
\tau_{\mathrm{ec}}\sim \mu\,\sigma\,L^2
$$

が基本スケールとして現れる。周波数領域では表皮深さ

$$
\delta(\omega)=\sqrt{\frac{2}{\omega\,\mu\,\sigma}}
$$

が重要であり、$\delta$ と板厚・線幅などの関係が電流分布と散逸を決める。

## 3. 磁壁運動が誘起する局所渦電流：ソース項としての $\partial\mathbf{M}/\partial t$

### 3.1 「磁壁は移動する磁束変化源」である

磁壁が速度 $v$ で移動すると、概念的に

$$
\mathbf{M}(\mathbf{r},t)\simeq \mathbf{M}(\mathbf{r}-\mathbf{v}t)
$$

であり、局所的に大きな $\partial\mathbf{M}/\partial t$ を生む。磁壁幅を $\Delta$ とすると 1 次元近似では

$$
\left|\frac{\partial \mathbf{M}}{\partial t}\right|\sim v\,\frac{\Delta M}{\Delta}
$$

となり、時間変化が壁近傍に局在しやすい。この局在性が「局所渦電流」を生む直接の理由である。

### 3.2 電流ループのスケールは $\Delta$ ではなく幾何で決まる

誘導電場の見積りとして Faraday 則から

$$
E\sim \ell\,\left|\frac{\partial B}{\partial t}\right|
$$

を置くと、$\ell$ は磁壁幅ではなく「電流が回り込める経路の大きさ」（板厚、幅、積層ピッチ、スリット間隔など）に支配される。ゆえに渦電流散逸の強さは、磁壁幅よりも試料形状・電気抵抗率・絶縁の有無に敏感である。

## 4. 磁壁に働く渦電流反作用：メモリカーネルとしての「速度履歴依存」

### 4.1 準静近似を超えた基本構造

Colaiori らは、磁壁運動が誘起する渦電流によって磁壁に有効な抵抗圧力（retarding pressure）が生じ、一般には速度履歴に依存することを示している。時間領域の表現は概念的に

$$
P_{\mathrm{ec}}(t)=-\int_0^{\infty}K(s)\,v(t-s)\,ds
$$

の畳み込みで与えられ、$K(s)$ は磁気拡散モードの和として表される。

### 4.2 低速展開：粘性項と「見かけの慣性項」

$v(t)$ が十分ゆっくり変化する場合、畳み込みを時間微分で展開し

$$
P_{\mathrm{ec}}(t)\approx -\eta\,v(t)-m_{\mathrm{eff}}\frac{dv}{dt}+\cdots
$$

と整理できる。ここで $\eta$ は粘性係数に対応し、$m_{\mathrm{eff}}$ は渦電流の遅れ応答を等価的に表す「慣性様」係数である。Colaiori らは幾何により $m_{\mathrm{eff}}<0$ が現れうることを議論しており、パルス状磁壁運動（Barkhausen パルス）の時間波形や統計に影響しうる。

### 4.3 周波数領域：複素的な「摩擦係数」

周波数領域で

$$
P_{\mathrm{ec}}(\omega)=-\hat{\eta}(\omega)\,v(\omega)
$$

と書くと、$\Re[\hat{\eta}(\omega)]$ が散逸、$\Im[\hat{\eta}(\omega)]$ が遅れ（慣性様効果）を担う。渦電流起源のダンピングは一般に周波数分散をもつため、「一定の Gilbert $\alpha$」へ落とし込むときには適用域が生じる。

## 5. 「有効 Gilbert ダンピング」への写像：どのように $\alpha_{\mathrm{ec}}$ を定義するか

### 5.1 散逸の同一視による定義

Gilbert 散逸はエネルギー散逸率として

$$
\left.\frac{dE}{dt}\right|_{\mathrm{G}}
= -\frac{\alpha M_s}{\gamma}\int_V \left|\frac{\partial \mathbf{m}}{\partial t}\right|^2 dV
$$

の形をとる。一方、渦電流散逸は

$$
P_{\mathrm{J}}(t)=\int_V \frac{|\mathbf{J}(\mathbf{r},t)|^2}{\sigma}\,dV
$$

である。特定の運動モード（例えば一様歳差、あるいは集団座標で記述される磁壁モード）に制限すれば、$P_{\mathrm{J}}$ をそのモードの $\partial_t \mathbf{m}$（または $v$）の二乗に比例する形へ縮約でき、比例係数を $\alpha_{\mathrm{ec}}$ や追加摩擦として定義できる。

### 5.2 一様歳差（FMR）における eddy-current damping の特徴

薄膜・多層構造では誘導電流が共鳴線幅や有効減衰に寄与しうることが議論され、膜厚や導電率への系統的依存が知られている。近年の整理でも「渦電流が FMR 応答を変形させる」機構としてまとめられている。

ここで重要なのは、FMR の渦電流寄与は「磁壁運動の局在性」とは異なり、モードの空間分布（膜厚方向の磁場・電流分布）で決まる点である。すなわち、同じ導体でも「一様モードの減衰」と「局在磁壁モードの減衰」は、長さスケールの選び方が根本的に異なる。

### 5.3 磁壁モードでの写像：集団座標の散逸関数との対応

1 次元磁壁モデルで $q(t)$（壁位置）と $\phi(t)$（壁内部角）を用いる場合、Gilbert 散逸は Rayleigh 散逸関数

$$
\mathcal{R}_{\mathrm{G}}=\frac{1}{2}\Gamma_{\mathrm{G}}\,\dot{q}^2+\cdots
$$

の形に縮約され、$\Gamma_{\mathrm{G}}\propto \alpha$ が得られる。同様に渦電流散逸は

$$
\mathcal{R}_{\mathrm{ec}}=\frac{1}{2}\Gamma_{\mathrm{ec}}(\omega)\,\dot{q}^2+\cdots
$$

または時間領域では畳み込み抵抗に対応し、結果として $\alpha$ の増加として近似できる領域と、できない領域が分かれる。Colaiori らの理論は後者（履歴効果を含む）を明示した点に意義がある。

## 6. 局所渦電流ダンピングの依存性：材料・幾何・周波数

### 6.1 主要パラメータと増減の向き

| 量 | 記号 | 役割 | 増えるとどうなるか |
|---|---|---|---|
| 導電率 | $\sigma$ | 誘導電流の駆動 | 一般に $|\mathbf{J}|$ が増え、散逸と反作用が増す |
| 透磁率（有効） | $\mu$ | 磁気拡散を遅らせる | $\tau_{\mathrm{ec}}\sim \mu\sigma L^2$ が増える |
| 代表長さ | $L$ | 電流ループの幾何スケール | $L^2$ で遅れ・反作用が強まる |
| 表皮深さ | $\delta$ | 電流の侵入深さ | $\delta\ll$ 板厚で表層集中し、分布が変わる |
| 壁幅 | $\Delta$ | $\partial_t\mathbf{M}$ の局在 | 小さいほど局所 $\partial_t\mathbf{M}$ が増えやすいが、電流経路は別に支配される |
| 壁速度 | $v$ | 誘導の駆動 | 一般に散逸は $v^2$ の増大方向で増える |

$\sigma$ と $\mu$ は同時に表皮深さ $\delta$ を通じて電流分布を変えるため、単純な単調性が崩れる場合がある点が重要である。

### 6.2 「古典渦電流損失」と「局所渦電流（過剰損失）」の接続

電磁鋼板などの損失分解では、古典渦電流損失 $P_{\mathrm{cl}}$ と異常（過剰）損失 $P_{\mathrm{ex}}$ を分けて議論する流儀があり、局在磁壁運動に伴う渦電流は $P_{\mathrm{ex}}$ の重要な物理像の一つとして整理される。JMAG の解説はこの文脈の数値化・高精度化を扱っている。

## 7. 観測量への現れ方：ダンピングとして何が見えるか

### 7.1 Barkhausen ノイズ（MBN）とパルス波形

渦電流反作用は磁壁速度の急峻さを抑え、パルス幅や立ち上がり時間、非対称性を変える。さらに $\tau_{\mathrm{ec}}$ が無視できない場合、速度履歴依存が統計の非マルコフ性として現れる可能性がある。Colaiori らの履歴カーネルはこの点を理論的に説明する枠組みを与える。

### 7.2 端子電圧・電気信号（スピンモーティブフォースとの共存）

磁壁運動に伴う電圧は、古典誘導（渦電流）と、磁化テクスチャの時空間変化に由来する有効電場（ベリー位相起源）の双方が関与しうる。Hayashi らはパーマロイナノワイヤで磁壁運動に伴う電圧（スピンモーティブフォース）を時間領域で観測している。

本テーマでは、同じ「動く磁壁」が電気信号を生むという意味で、スピンモーティブフォースの測定系は局所渦電流の寄与を判別する参照系にもなりうる。ただし両者の幾何依存性・抵抗依存性・対称性が異なるため、実験条件により寄与の比が変動する。

### 7.3 FMR 線幅・複素透磁率

渦電流は一様な高周波応答にも影響し、共鳴線幅（見かけの $\alpha$）や透磁率スペクトルを変形しうる。薄膜多層での渦電流制御が FMR 応答を調整し得るという観点の報告もある。

## 8. 数式の要約：磁壁ダンピングとしての「局所渦電流」の最小構造

### 8.1 Maxwell–Ohm

$$
\nabla\times\mathbf{E}=-\frac{\partial\mathbf{B}}{\partial t},\quad
\nabla\times\mathbf{H}=\mathbf{J},\quad
\mathbf{J}=\sigma\mathbf{E},\quad
\mathbf{B}=\mu_0(\mathbf{H}+\mathbf{M})
$$

### 8.2 磁気拡散（単純化形）

$$
\nabla^2 \mathbf{H}=\sigma\mu\,\frac{\partial \mathbf{H}}{\partial t},
\qquad
\tau_{\mathrm{ec}}\sim \mu\sigma L^2,
\qquad
\delta=\sqrt{\frac{2}{\omega\mu\sigma}}
$$

（境界条件や $\nabla\cdot\mathbf{H}$ の扱いにより厳密形は変わりうる。）

### 8.3 磁壁への反作用（履歴カーネル）

$$
P_{\mathrm{ec}}(t)=-\int_0^{\infty}K(s)\,v(t-s)\,ds
\approx -\eta v(t)-m_{\mathrm{eff}}\frac{dv}{dt}+\cdots
$$

（係数と $K(s)$ の具体形は形状と拡散モードで決まる。）

## まとめと展望

導電性強磁性体では、磁壁運動が局在した $\partial\mathbf{M}/\partial t$ を生み、Maxwell–Ohm 系を通じて局所渦電流とジュール散逸を誘起する。渦電流は散逸そのものに加え、自己誘起磁場として磁壁運動へ反作用し、その反作用は磁気拡散により履歴依存（メモリカーネル）を伴うため、単純な Gilbert ダンピングの増加として表せない領域が本質的に存在する。

今後の展望としては、(i) 磁壁・スピン波など空間的に不均一なモードに対して $\alpha(\omega,\mathbf{k})$ や時間カーネルとして渦電流寄与を定量化し、(ii) スピンモーティブフォースやスピンポンピングの電気信号と整合する形で古典誘導とテクスチャ起源起電力を分離し、(iii) 絶縁層・積層・スリットなどで電流経路を設計した系統比較により、局所渦電流が磁化ダイナミクス（MBN・複素透磁率・損失スペクトル）をどう変えるかを多観測量で同定することが重要である。

### 参考文献
- Hayashi et al., Time-Domain Observation of the Spinmotive Force in Permalloy Nanowires, Phys. Rev. Lett. 108, 147202 (2012)（PubMed record）  
https://pubmed.ncbi.nlm.nih.gov/22540820/

- Hayashi et al., Supplemental Material (2012)  
https://journals.aps.org/prl/supplemental/10.1103/PhysRevLett.108.147202/LK13276_SOM_032512.pdf

- Duine, Spin pumping by a field-driven domain wall, arXiv:0706.3160（PDF）  
https://arxiv.org/pdf/0706.3160

- Colaiori et al., APS DOI page（同論文）  
https://link.aps.org/doi/10.1103/PhysRevB.76.224416
