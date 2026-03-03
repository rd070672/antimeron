# マクスウェル方程式の導出と物質応答

マクスウェル方程式は、電荷保存と電磁誘導を矛盾なく両立させる枠組みとして、電場と磁場の時間発展と境界での連続条件を与える基本式である。物質中では分極と磁化を介して「媒質の応答」が方程式に入り、誘電率・透磁率・伝導率・分散が材料機能として現れる。

## 参考ドキュメント
- 「物質中の Maxwell 方程式」の再構築（日本語, PDF, 日本物理学会誌）
  https://www.jstage.jst.go.jp/article/butsuri/66/6/66_KJ00007226993/_pdf/-char/ja
- Maxwell's equations（英語）
  https://en.wikipedia.org/wiki/Maxwell%27s_equations
- 物質中のマックスウェル方程式（日本語, PDF, 講義資料）
  https://atom.c.u-tokyo.ac.jp/torii/lectures/OE/OE060421.pdf


## 1. 電磁場の変数と単位系（SI）
電磁場は複数の場変数で記述され、それぞれが「源（電荷・電流）」と「物質応答（分極・磁化）」を分担する。

| 量 | 記号 | SI単位 | 物理的意味 |
|---|---|---|---|
| 電場 | $\mathbf{E}$ | V/m | 電荷に働く力の原因となる場 |
| 磁束密度 | $\mathbf{B}$ | T | ローレンツ力に現れる磁場（磁束の密度） |
| 電束密度 | $\mathbf{D}$ | C/m$^{2}$ | 自由電荷を源にしたガウス則に現れる補助場 |
| 磁場（磁界） | $\mathbf{H}$ | A/m | 自由電流を源にしたアンペール則に現れる補助場 |
| 電荷密度 | $\rho$ | C/m$^{3}$ | 電荷の体積密度 |
| 電流密度 | $\mathbf{J}$ | A/m$^{2}$ | 電荷流（自由電流） |
| 分極 | $\mathbf{P}$ | C/m$^{2}$ | 電気双極子密度（束縛電荷の原因） |
| 磁化 | $\mathbf{M}$ | A/m | 磁気双極子密度（束縛電流の原因） |

真空の定数として真空誘電率 $\varepsilon_{0}$、真空透磁率 $\mu_{0}$ を用いる。光速は $c=1/\sqrt{\varepsilon_{0}\mu_{0}}$ である。


## 2. 電荷保存とベクトル解析
### 2.1 連続の式（電荷保存）
任意の領域 $V$ における電荷の時間変化は、境界面 $S=\partial V$ を貫く電流で決まる。積分形は
$$
\frac{d}{dt}\int_{V}\rho\,dV=-\int_{S}\mathbf{J}\cdot d\mathbf{S}
$$
である。発散定理により微分形は
$$
\frac{\partial \rho}{\partial t}+\nabla\cdot \mathbf{J}=0
$$
である。これは以後の導出で「矛盾を起こさない」ための必須条件となる。

### 2.2 ガウス・ストークスの定理（積分形と微分形の橋渡し）
マクスウェル方程式は境界条件の導出や数値解法でも積分形が重要である。代表的な関係は次である。
- 発散定理：
$$
\int_{V}\nabla\cdot \mathbf{A}\,dV=\int_{S}\mathbf{A}\cdot d\mathbf{S}
$$
- ストークスの定理：
$$
\int_{S}(\nabla\times \mathbf{A})\cdot d\mathbf{S}=\oint_{\partial S}\mathbf{A}\cdot d\mathbf{l}
$$


## 3. 真空中のマクスウェル方程式の導出
経験法則（静電気学のガウス則、電磁誘導のファラデー則、定常電流のアンペール則）を、時間依存に拡張するときの整合性がマクスウェル方程式である。

### 3.1 ガウスの法則（電場）
自由空間でも電荷が源である点は変わらない。電場の発散は電荷密度で与えられる。
- 微分形：
$$
\nabla\cdot \mathbf{E}=\frac{\rho}{\varepsilon_{0}}
$$
- 積分形：
$$
\oint_{S}\mathbf{E}\cdot d\mathbf{S}=\frac{1}{\varepsilon_{0}}\int_{V}\rho\,dV
$$

### 3.2 ファラデーの法則（電磁誘導）
磁束の時間変化が渦電場を生む。
- 微分形：
$$
\nabla\times \mathbf{E}=-\frac{\partial \mathbf{B}}{\partial t}
$$
- 積分形：
$$
\oint_{\partial S}\mathbf{E}\cdot d\mathbf{l}=-\frac{d}{dt}\int_{S}\mathbf{B}\cdot d\mathbf{S}
$$

### 3.3 ガウスの法則（磁場）
単独の磁荷は存在しないという経験事実が、
$$
\nabla\cdot \mathbf{B}=0
$$
を与える。積分形は
$$
\oint_{S}\mathbf{B}\cdot d\mathbf{S}=0
$$
である。

### 3.4 アンペール則からアンペール・マクスウェル則へ
定常の場合のアンペール則をそのまま時間依存に拡張すると、連続の式と矛盾する。そこで、電荷保存を保つために「変位電流」を導入する。

求める形を
$$
\nabla\times \mathbf{B}=\mu_{0}\mathbf{J}+\mu_{0}\varepsilon_{0}\frac{\partial \mathbf{E}}{\partial t}
$$
とする。両辺の発散を取ると左辺は恒等的に 0 であり、
$$
0=\mu_{0}\nabla\cdot \mathbf{J}+\mu_{0}\varepsilon_{0}\frac{\partial}{\partial t}(\nabla\cdot \mathbf{E})
=\mu_{0}\left(\nabla\cdot \mathbf{J}+\frac{\partial \rho}{\partial t}\right)
$$
が得られる。ここでガウス則 $\nabla\cdot \mathbf{E}=\rho/\varepsilon_{0}$ を用いた。よって連続の式が自動的に満たされる。以上により、時間依存系での自己矛盾を避ける最小修正がアンペール・マクスウェル則である。


## 4. 物質中のマクロなマクスウェル方程式：分極・磁化の導入
固体や複合材料では、原子スケールの電荷分布・電流分布を細かく追う代わりに、空間平均した場で物性を記述する。そのとき分極 $\mathbf{P}$ と磁化 $\mathbf{M}$ が「束縛源」として現れる。

### 4.1 自由源と束縛源：$\rho=\rho_{f}+\rho_{b}$、$\mathbf{J}=\mathbf{J}_{f}+\mathbf{J}_{b}$
分極は束縛電荷を生み、磁化は束縛電流として現れる。基本式は
$$
\rho_{b}=-\nabla\cdot \mathbf{P}
$$
$$
\mathbf{J}_{b}=\frac{\partial \mathbf{P}}{\partial t}+\nabla\times \mathbf{M}
$$
である。第一項は分極の時間変化による分極電流であり、第二項は環状電流としての磁化電流である。

### 4.2 補助場 $\mathbf{D},\mathbf{H}$ の定義
束縛源を明示的に分離するため、次を定義する。
$$
\mathbf{D}=\varepsilon_{0}\mathbf{E}+\mathbf{P}
$$
$$
\mathbf{H}=\frac{1}{\mu_{0}}\mathbf{B}-\mathbf{M}
$$
これにより、自由電荷・自由電流を右辺に持つ「物質中のマクスウェル方程式」が得られる。

### 4.3 物質中のマクスウェル方程式（微分形）
$$
\nabla\cdot \mathbf{D}=\rho_{f}
$$
$$
\nabla\times \mathbf{H}=\mathbf{J}_{f}+\frac{\partial \mathbf{D}}{\partial t}
$$
$$
\nabla\cdot \mathbf{B}=0
$$
$$
\nabla\times \mathbf{E}=-\frac{\partial \mathbf{B}}{\partial t}
$$
ここで、物質の効果は $\mathbf{P}$ と $\mathbf{M}$、すなわち構成式に集約される。


## 5. 構成式（物質方程式）と線形応答
マクスウェル方程式は普遍的である一方、材料差は構成式で表す。等方・線形・局所の近似では
$$
\mathbf{D}=\varepsilon \mathbf{E},\qquad
\mathbf{B}=\mu \mathbf{H},\qquad
\mathbf{J}_{f}=\sigma \mathbf{E}
$$
である。ここで $\varepsilon=\varepsilon_{0}\varepsilon_{r}$、$\mu=\mu_{0}\mu_{r}$ である。

### 5.1 周波数領域表示：複素誘電率と損失
時間調和 $\exp(i\omega t)$ を仮定すると、時間微分は $i\omega$ に置き換わる。損失を含む代表的な表現は
$$
\varepsilon(\omega)=\varepsilon'(\omega)-i\varepsilon''(\omega)
$$
であり、誘電損失正接は
$$
\tan\delta=\frac{\varepsilon''}{\varepsilon'}
$$
である。伝導を含めると
$$
\mathbf{J}_{f}=\sigma \mathbf{E}\quad \Rightarrow\quad
\nabla\times \mathbf{H}=(\sigma+i\omega\varepsilon)\mathbf{E}
$$
となり、伝導と分極が同じ次元の「電流源」として同列に現れる。

### 5.2 分散と因果律：畳み込み
現実の材料では、$\mathbf{P}$ が現在の $\mathbf{E}$ だけで決まらず、過去の履歴に依存する。線形因果系として
$$
\mathbf{P}(t)=\varepsilon_{0}\int_{-\infty}^{t}\chi(t-t')\,\mathbf{E}(t')\,dt'
$$
が基本形である。周波数領域では
$$
\mathbf{P}(\omega)=\varepsilon_{0}\chi(\omega)\mathbf{E}(\omega),\qquad
\varepsilon(\omega)=\varepsilon_{0}(1+\chi(\omega))
$$
となり、分散（$\omega$依存）が自然に現れる。光学定数との関係（非磁性近似 $\mu_{r}\approx 1$）は
$$
\varepsilon_{r}(\omega)=(n+i\kappa)^2
$$
であり、屈折率 $n$ と消衰係数 $\kappa$ が誘電関数に結び付く。


## 6. 境界条件
界面条件は積分形のマクスウェル方程式から導出される。媒質 1 と 2 の界面で単位法線を $\hat{\mathbf{n}}$ とすると、面電荷密度 $\rho_{s}$、面電流密度 $\mathbf{K}$ を含めて

- 法線方向の $\mathbf{D}$：
$$
\hat{\mathbf{n}}\cdot(\mathbf{D}_{2}-\mathbf{D}_{1})=\rho_{s}
$$
- 法線方向の $\mathbf{B}$：
$$
\hat{\mathbf{n}}\cdot(\mathbf{B}_{2}-\mathbf{B}_{1})=0
$$
- 接線方向の $\mathbf{E}$：
$$
\hat{\mathbf{n}}\times(\mathbf{E}_{2}-\mathbf{E}_{1})=\mathbf{0}
$$
- 接線方向の $\mathbf{H}$：
$$
\hat{\mathbf{n}}\times(\mathbf{H}_{2}-\mathbf{H}_{1})=\mathbf{K}
$$

誘電体・金属・磁性体の界面、薄膜多層、粒界、空孔やクラック周りの局所電磁場など、多くの問題がこの4条件に集約される。


## 7. 波動方程式と材料パラメータ
### 7.1 一様媒質中の波動方程式（時間領域）
等方で一様、$\varepsilon,\mu,\sigma$ が定数で、自由電荷がない場合（$\rho_{f}=0$）を考える。ファラデー則とアンペール・マクスウェル則から、電場の波動方程式が得られる。
$$
\nabla^{2}\mathbf{E}-\mu\varepsilon\frac{\partial^{2}\mathbf{E}}{\partial t^{2}}-\mu\sigma\frac{\partial \mathbf{E}}{\partial t}=0
$$
同様に磁場も
$$
\nabla^{2}\mathbf{H}-\mu\varepsilon\frac{\partial^{2}\mathbf{H}}{\partial t^{2}}-\mu\sigma\frac{\partial \mathbf{H}}{\partial t}=0
$$
を満たす。ここで $\mu\sigma$ の項が減衰を与える。

### 7.2 周波数領域の分散関係と伝搬定数
$\exp(i\omega t)$ を仮定し、平面波 $\exp(-i\mathbf{k}\cdot\mathbf{r})$ を代入すると
$$
k^{2}=\omega^{2}\mu\varepsilon-i\omega\mu\sigma
$$
となる。伝搬定数を $\gamma=\alpha+i\beta$ と書けば、$\alpha$ が減衰、$\beta$ が位相進みを与える。

### 7.3 良導体の表皮深さ
良導体では $\sigma\gg \omega\varepsilon$ が成り立つことが多く、
$$
\alpha\simeq \beta\simeq \sqrt{\frac{\omega\mu\sigma}{2}}
$$
となり、表皮深さ $\delta$ は
$$
\delta=\frac{1}{\alpha}\simeq \sqrt{\frac{2}{\omega\mu\sigma}}
$$
である。高周波ほど、また透磁率や伝導率が大きいほど表皮効果が強くなり、渦電流損失や遮蔽特性に直結する。


## 8. 近似の階層：静電・静磁から準静的、電磁波へ
材料のサイズ $L$、角周波数 $\omega$、光速 $c$ に対し、波長 $\lambda\sim 2\pi c/(\omega\sqrt{\varepsilon_{r}\mu_{r}})$ が十分大きいかどうかが振る舞いを分ける。

| 近似 | 支配項 | 重要な式 | 代表的な材料現象 |
|---|---|---|---|
| 静電 | $\partial/\partial t=0$、$\nabla\times\mathbf{E}=0$ | $\nabla\cdot\mathbf{D}=\rho_{f}$ | 誘電分極、内部電場、容量 |
| 静磁 | $\partial/\partial t=0$、$\nabla\times\mathbf{H}=\mathbf{J}_{f}$ | $\nabla\cdot\mathbf{B}=0$ | 磁化・反磁場、磁気回路、磁気エネルギー |
| 準静的（低周波） | 波動性より拡散・誘導が優位 | 渦電流の拡散方程式形 | 渦電流損、誘導加熱、磁気シールド |
| 電磁波 | 伝搬と境界反射が支配 | 波動方程式、境界条件 | 光学薄膜、導波路、フォトニクス |
| 分散・散逸 | $\varepsilon(\omega),\mu(\omega)$ が支配 | 複素誘電率・透磁率 | 共鳴、吸収、メタマテリアル |

---

## 9. エネルギーと力：ポインティングの定理と応力
### 9.1 ポインティングの定理（エネルギー保存）
電磁場のエネルギーの流れはポインティングベクトル
$$
\mathbf{S}=\mathbf{E}\times \mathbf{H}
$$
で与えられる。損失を含む一般形の一つとして
$$
\frac{\partial u}{\partial t}+\nabla\cdot \mathbf{S}=-\mathbf{J}_{f}\cdot \mathbf{E}
$$
が成り立つ。右辺はジュール損失（電磁エネルギーが熱へ変換）を表す。非分散・線形媒質での基本形として
$$
u=\frac{1}{2}\left(\mathbf{E}\cdot \mathbf{D}+\mathbf{B}\cdot \mathbf{H}\right)
$$
が用いられる。強い分散がある場合、エネルギー密度の扱いはより慎重な定式化が必要である。

### 9.2 マクスウェル応力（電磁力の起源）
電磁場は物体に力を及ぼし、電気力・磁気力・磁歪や誘電歪の起点となる。力密度の議論は応力テンソルや境界での圧力として整理でき、電磁アクチュエータ、電磁浮上、磁気デバイスの設計要素になる。


## 10. 材料機能への接続：誘電・磁性・伝導・人工媒質
### 10.1 誘電体・強誘電体
誘電体では $\mathbf{P}$ が最大の自由度であり、内部電場や界面電荷が応答を支配する。薄膜や多孔質、粒界を持つ材料では電荷蓄積や緩和が複雑化し、見かけの誘電率が周波数依存となる場合がある。インピーダンス分光で得られる $\varepsilon'(\omega),\varepsilon''(\omega)$ は、マクスウェル方程式と構成式の組として解釈される。

### 10.2 導体・半導体
金属では $\mathbf{J}_{f}=\sigma\mathbf{E}$ が大きく、低周波では変位電流より伝導電流が支配的である。周波数が上がると表皮効果が顕在化し、薄膜抵抗、配線損失、渦電流損、シールドの設計原理になる。半導体では $\sigma$ がキャリア密度や散乱に依存し、温度・ドーピング・光励起で応答が制御される。

### 10.3 磁性体：$\mathbf{M}$ と $\mu(\omega)$、磁気共鳴
磁性体では $\mathbf{M}$ が場の変数として重要であり、
$$
\mathbf{B}=\mu_{0}(\mathbf{H}+\mathbf{M})
$$
が基礎である。低周波では磁区構造や反磁場が主要因になり、高周波では $\mu(\omega)$ の分散や損失が支配的となる。フェライト、軟磁性金属、ナノ複合材料での高周波透磁率は、マクスウェル方程式に与える構成パラメータとして現れる。

### 10.4 メタマテリアル：有効媒質としての $\varepsilon_{\mathrm{eff}},\mu_{\mathrm{eff}}$
サブ波長構造を周期・準周期的に配置すると、平均場として有効誘電率・有効透磁率を設計できる。これにより、従来材料では困難であった $\mu(\omega)$ の制御や負の屈折率などが議論される。ここでも基本はマクスウェル方程式であり、違いは構成式（有効媒体近似）の側に現れる。


## 11. 計算・解析への展開：時間領域と周波数領域
電磁場解析では、時間領域（過渡応答）と周波数領域（定常正弦応答）のどちらで解くかが問題設定と結び付く。

| 領域 | 代表式 | 利点 | 材料問題での現れ方 |
|---|---|---|---|
| 時間領域 | $\partial/\partial t$ を保持 | 非線形・過渡現象に対応しやすい | パルス励起、スイッチング、過渡渦電流 |
| 周波数領域 | $\partial/\partial t\to i\omega$ | 分散・損失を複素定数で扱いやすい | 複素誘電率、複素透磁率、光学薄膜 |

境界での開放空間を表すために吸収境界（例：完全適合層）を導入する流儀があり、マクスウェル方程式の数値解で重要になる。


## まとめ
マクスウェル方程式は、電荷保存を満たすように電場と磁場の関係を閉じた形で与える基本式であり、変位電流の導入は時間依存系の自己矛盾を避ける必然である。物質中では分極 $\mathbf{P}$ と磁化 $\mathbf{M}$ により自由源と束縛源が分離され、$\mathbf{D},\mathbf{H}$ と構成式を通じて誘電率・透磁率・伝導率・分散が材料機能として組み込まれる。境界条件、波動方程式、表皮深さ、エネルギー保存は、誘電・磁性・導体・人工媒質の設計と解析を一貫して支える骨格である。


## 関連研究
1. 3.物質中の Maxwell 方程式 I 3-1. 分極と磁化（日本語, PDF, 講義資料）
   https://www.hikari.scphys.kyoto-u.ac.jp/jp/index.php?openfile=lecture1019ver2.pdf&plugin=attach&refer=%E9%9B%BB%E7%A3%81%E6%B0%97%E5%AD%A64+2010%E8%AC%9B%E7%BE%A9%E3%83%8E%E3%83%BC%E3%83%88
2. Boundary conditions for electromagnetic fields（英語, 境界条件の導出）
   https://phys.libretexts.org/Bookshelves/Electricity_and_Magnetism/Electromagnetics_and_Applications_%28Staelin%29/02%3A_Introduction_to_Electrodynamics/2.06%3A_Boundary_conditions_for_electromagnetic_fields
3. Laser Review：周波数領域のマクスウェルの式の導出（日本語, PDF）
   https://www.jstage.jst.go.jp/article/lsj/36/10/36_628/_pdf
4. メタマテリアルとは何か（日本語, PDF, 応用物理）
   https://www.jstage.jst.go.jp/article/oubutsu/78/6/78_503/_pdf/-char/ja
5. アンテナからの電磁波放射に対する完全適合層を伴なうFDTD法（日本語, PDF, 日本応用数理学会論文誌）
   https://www.jstage.jst.go.jp/article/jsiamt/20/4/20_KJ00006814131/_pdf
6. Lecture notes: Constitutive relations and macroscopic fields（英語, PDF）
   https://ethz.ch/content/dam/ethz/special-interest/itet/photonics-dam/documents/lectures/EandM/MaxwellEquation.pdf
