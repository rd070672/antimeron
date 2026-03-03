# 電磁気学の初歩

電磁気学は、電荷と電流がつくる電場・磁場のふるまいを、保存則と対称性に立脚して一貫した方程式系としてまとめる学問である。最終的にマクスウェル方程式へ到達し、静電気・磁気・回路・電磁波が同じ枠組みで理解できるようになる。

### 参考ドキュメント
1. 京都大学 鶴剛：学部授業「物理学基礎論 B（電磁気学）」講義ノート（PDF）
   https://www-cr.scphys.kyoto-u.ac.jp/member/tsuru/data/lecture/KisoronB_v2018_0.pdf
2. MIT OpenCourseWare：8.02 Physics II: Electricity and Magnetism（講義ページ）
   https://ocw.mit.edu/courses/8-02-physics-ii-electricity-and-magnetism-spring-2019/
3. BIPM：SI Brochure（9th edition, version 3.02）(PDF)
   https://www.bipm.org/documents/20126/41483022/SI-Brochure-9-EN.pdf


## 1. 電荷と力：クーロン力から場の概念へ

### 1.1 電荷、電場、クーロンの法則

点電荷 $q$ が空間に作る電場 $\mathbf{E}(\mathbf{r})$ は、静電気学では次の形で与えられる：

$$
\mathbf{E}(\mathbf{r})=\frac{1}{4\pi\varepsilon_{0}}\frac{q}{|\mathbf{r}-\mathbf{r}_{0}|^{2}}\hat{\mathbf{R}},
\qquad
\hat{\mathbf{R}}=\frac{\mathbf{r}-\mathbf{r}_{0}}{|\mathbf{r}-\mathbf{r}_{0}|}.
$$

ここで $\varepsilon_{0}$ は真空の誘電率である。電場は「電荷が受ける力」を空間の各点に割り当てた量として定義でき、試験電荷 $q_{\mathrm{t}}$ が受ける力は

$$
\mathbf{F}=q_{\mathrm{t}}\mathbf{E}
$$

である。場の概念の利点は、複数電荷が存在する場合でも重ね合わせが成立する点にある：

$$
\mathbf{E}_{\mathrm{tot}}=\sum_{i}\mathbf{E}_{i}.
$$

連続的な電荷分布 $\rho(\mathbf{r})$ に対しては、

$$
\mathbf{E}(\mathbf{r})=\frac{1}{4\pi\varepsilon_{0}}
\int \rho(\mathbf{r}')\,\frac{\mathbf{r}-\mathbf{r}'}{|\mathbf{r}-\mathbf{r}'|^{3}}\,d^{3}\mathbf{r}'
$$

で表される。


## 2. ガウスの法則：発散とフラックスの結びつき

### 2.1 積分形（フラックスで書く）

閉曲面 $S$ を貫く電場のフラックス（電束）を

$$
\Phi_{E}=\oint_{S}\mathbf{E}\cdot d\mathbf{S}
$$

と定義する。ガウスの法則は

$$
\oint_{S}\mathbf{E}\cdot d\mathbf{S}=\frac{Q_{\mathrm{in}}}{\varepsilon_{0}}
$$

である。右辺は曲面が包む総電荷 $Q_{\mathrm{in}}$ にのみ依存し、曲面の形状には依存しない。

この法則は「対称性が高い配置」で特に強力である。例えば球対称な電荷分布では、$\mathbf{E}$ は放射方向で大きさが球面上一定になり、積分が簡単になる。

### 2.2 微分形（発散で書く）

発散定理
$$
\oint_{S}\mathbf{E}\cdot d\mathbf{S}=\int_{V}(\nabla\cdot\mathbf{E})\,d^{3}\mathbf{r}
$$
を用いると、

$$
\nabla\cdot\mathbf{E}=\frac{\rho}{\varepsilon_{0}}
$$

が得られる。ここで $\rho$ は体積電荷密度である。すなわち「電場の湧き出し（発散）は電荷密度に比例する」という意味になる。


## 3. 電位と静電場：$\nabla\times \mathbf{E}=0$ からポアソン方程式へ

### 3.1 静電場の回転がゼロであること

静電場では、電場は保存力場であり、

$$
\nabla\times\mathbf{E}=\mathbf{0}
$$

が成り立つ。したがってスカラー電位 $\phi$ を導入でき、

$$
\mathbf{E}=-\nabla\phi
$$

である。これよりガウスの法則（微分形）と合わせると

$$
\nabla\cdot(-\nabla\phi)= -\nabla^{2}\phi=\frac{\rho}{\varepsilon_{0}}
$$

すなわちポアソン方程式

$$
\nabla^{2}\phi=-\frac{\rho}{\varepsilon_{0}}
$$

が得られる。電荷のない領域ではラプラス方程式 $\nabla^{2}\phi=0$ である。

### 3.2 境界条件と一意性の考え方

電位問題は、境界での条件を与えると解が一意に定まる、という重要な性質をもつ（より厳密には一意性定理として整理される）。代表的な境界条件は次の2つである。

| 境界条件 | 指定する量 | 物理的状況の例 |
|---|---|---|
| ディリクレ（Dirichlet） | $\phi$ | 導体を一定電位に固定 |
| ノイマン（Neumann） | $\partial\phi/\partial n$（法線方向微分） | ある面を通る電束密度を指定 |


## 4. 電流と保存則：連続の式

電荷保存は、局所的に次の式で表される：

$$
\frac{\partial\rho}{\partial t}+\nabla\cdot\mathbf{J}=0.
$$

ここで $\mathbf{J}$ は電流密度である。これは「ある体積から電荷が減るなら、その分だけ外へ流れ出している」という内容である。

連続の式はマクスウェル方程式と整合していなければならない。後にアンペール則へ変位電流を加える理由が、まさにこの整合性にある。


## 5. 磁場の基本：ローレンツ力、ビオ・サバール、アンペール

### 5.1 ローレンツ力

電荷 $q$ が速度 $\mathbf{v}$ で運動するとき、電場と磁場から受ける力は

$$
\mathbf{F}=q(\mathbf{E}+\mathbf{v}\times\mathbf{B})
$$

である。磁場による力は速度に垂直であり、仕事をしない（速度の大きさを直接変えない）という特徴がある。

### 5.2 ビオ・サバールの法則（定常電流）

定常電流密度 $\mathbf{J}(\mathbf{r}')$ が作る磁束密度 $\mathbf{B}$ は

$$
\mathbf{B}(\mathbf{r})=\frac{\mu_{0}}{4\pi}\int
\mathbf{J}(\mathbf{r}')\times\frac{\mathbf{r}-\mathbf{r}'}{|\mathbf{r}-\mathbf{r}'|^{3}}\,d^{3}\mathbf{r}'
$$

で与えられる。これは磁場の「作られ方」を具体的に示す。

### 5.3 アンペールの法則（定常）

閉曲線 $C$ に沿う磁場の循環は

$$
\oint_{C}\mathbf{B}\cdot d\mathbf{l}=\mu_{0}I_{\mathrm{in}}
$$

であり、微分形では

$$
\nabla\times\mathbf{B}=\mu_{0}\mathbf{J}
$$

となる（定常の場合）。これも対称性が高い配置で有効である（長直線電流、ソレノイドなど）。


## 6. マクスウェル方程式：電磁気学の中核

電磁気学は、最終的に次の4本（＋物質関係式）へ集約される。

### 6.1 真空中のマクスウェル方程式（微分形）

$$
\nabla\cdot\mathbf{E}=\frac{\rho}{\varepsilon_{0}}
$$

$$
\nabla\cdot\mathbf{B}=0
$$

$$
\nabla\times\mathbf{E}=-\frac{\partial\mathbf{B}}{\partial t}
$$

$$
\nabla\times\mathbf{B}=\mu_{0}\mathbf{J}+\mu_{0}\varepsilon_{0}\frac{\partial\mathbf{E}}{\partial t}
$$

第4式の第2項が変位電流であり、電荷保存（連続の式）と整合するために不可欠である。

### 6.2 積分形（面積分・線積分での表現）

| 法則 | 積分形 |
|---|---|
| 電場のガウスの法則 | $\displaystyle \oint_{S}\mathbf{E}\cdot d\mathbf{S}=\frac{Q_{\mathrm{in}}}{\varepsilon_{0}}$ |
| 磁場のガウスの法則 | $\displaystyle \oint_{S}\mathbf{B}\cdot d\mathbf{S}=0$ |
| ファラデーの法則 | $\displaystyle \oint_{C}\mathbf{E}\cdot d\mathbf{l}=-\frac{d}{dt}\int_{S}\mathbf{B}\cdot d\mathbf{S}$ |
| アンペール＝マクスウェルの法則 | $\displaystyle \oint_{C}\mathbf{B}\cdot d\mathbf{l}=\mu_{0}\int_{S}\mathbf{J}\cdot d\mathbf{S}+\mu_{0}\varepsilon_{0}\frac{d}{dt}\int_{S}\mathbf{E}\cdot d\mathbf{S}$ |

積分形は、面や線に沿った「量の出入り・循環」と結びついており、境界条件の導出にも直結する。


## 7. 物質中の電磁気：$\mathbf{D},\mathbf{H}$ と分極・磁化

物質中では、束縛電荷・束縛電流の効果を分けて扱うために、電束密度 $\mathbf{D}$ と磁場 $\mathbf{H}$ を導入する。

### 7.1 分極と $\mathbf{D}$

分極ベクトル $\mathbf{P}$ を用いると

$$
\mathbf{D}=\varepsilon_{0}\mathbf{E}+\mathbf{P}
$$

である。物質中のガウスの法則は

$$
\nabla\cdot\mathbf{D}=\rho_{\mathrm{free}}
$$

と書け、自由電荷密度 $\rho_{\mathrm{free}}$ のみが右辺に現れる。

### 7.2 磁化と $\mathbf{H}$

磁化ベクトル $\mathbf{M}$ を用いると

$$
\mathbf{B}=\mu_{0}(\mathbf{H}+\mathbf{M})
$$

である。物質中のアンペール＝マクスウェルの法則は

$$
\nabla\times\mathbf{H}=\mathbf{J}_{\mathrm{free}}+\frac{\partial\mathbf{D}}{\partial t}
$$

と書け、自由電流密度 $\mathbf{J}_{\mathrm{free}}$ が右辺に現れる。

### 7.3 線形等方媒質の基本関係

最も基本的な近似として、線形等方媒質では

$$
\mathbf{D}=\varepsilon \mathbf{E},\qquad \mathbf{B}=\mu \mathbf{H},\qquad \mathbf{J}=\sigma \mathbf{E}
$$

が用いられる。ここで $\varepsilon,\mu,\sigma$ はそれぞれ誘電率・透磁率・導電率である。周波数依存や異方性、非線形性を含めるとより一般化されるが、初歩ではこの形が出発点となる。


## 8. 境界条件：マクスウェル方程式から導く

積分形を微小なガウス面・微小なループへ適用すると、界面での条件が得られる。法線成分（$\perp$）と接線成分（$\parallel$）の連続性が要点である。

| 量 | 境界条件（一般形） | 備考 |
|---|---|---|
| $\mathbf{D}_{\perp}$ | $\mathbf{D}_{2\perp}-\mathbf{D}_{1\perp}=\sigma_{\mathrm{free}}$ | 自由表面電荷密度があると不連続 |
| $\mathbf{B}_{\perp}$ | $\mathbf{B}_{2\perp}-\mathbf{B}_{1\perp}=0$ | 磁荷が存在しないため |
| $\mathbf{E}_{\parallel}$ | $\mathbf{E}_{2\parallel}-\mathbf{E}_{1\parallel}=\mathbf{0}$（静的） | 時間変化磁束があると一般化される |
| $\mathbf{H}_{\parallel}$ | $\mathbf{H}_{2\parallel}-\mathbf{H}_{1\parallel}=\mathbf{K}_{\mathrm{free}}\times\hat{\mathbf{n}}$ | 自由表面電流密度 $\mathbf{K}_{\mathrm{free}}$ |

導体表面では、静電平衡で導体内部 $\mathbf{E}=\mathbf{0}$ となり、電場は表面に垂直になる、という結果もここから説明できる。


## 9. ポテンシャル表示とゲージ：$\mathbf{A}$ と $\phi$

### 9.1 ベクトルポテンシャル

磁場は常に発散ゼロである：

$$
\nabla\cdot\mathbf{B}=0.
$$

よってベクトルポテンシャル $\mathbf{A}$ を導入して

$$
\mathbf{B}=\nabla\times\mathbf{A}
$$

と書ける。

### 9.2 スカラーポテンシャルと時間変化

ファラデーの法則より

$$
\nabla\times\mathbf{E}=-\frac{\partial}{\partial t}(\nabla\times\mathbf{A})
$$

であるから、

$$
\mathbf{E}=-\nabla\phi-\frac{\partial\mathbf{A}}{\partial t}
$$

と表せる。ここで $\phi$ はスカラーポテンシャルである。

### 9.3 ゲージ変換

同じ $\mathbf{E},\mathbf{B}$ を与える $\phi,\mathbf{A}$ は一意ではない。任意のスカラー関数 $\Lambda$ に対し

$$
\mathbf{A}'=\mathbf{A}+\nabla\Lambda,\qquad \phi'=\phi-\frac{\partial\Lambda}{\partial t}
$$

としても $\mathbf{E},\mathbf{B}$ は不変である。これをゲージ自由度という。

代表的なゲージ条件は次である。

- クーロンゲージ：$\nabla\cdot\mathbf{A}=0$
- ローレンツゲージ：$\nabla\cdot\mathbf{A}+\mu_{0}\varepsilon_{0}\frac{\partial\phi}{\partial t}=0$

ローレンツゲージを用いると、ポテンシャルが波動方程式を満たす形に整理され、電磁波の記述と整合が取りやすい。


## 10. エネルギーと運動量：ポインティングベクトル

### 10.1 電磁エネルギー密度

真空中での電磁エネルギー密度 $u$ は

$$
u=\frac{1}{2}\left(\varepsilon_{0}|\mathbf{E}|^{2}+\frac{1}{\mu_{0}}|\mathbf{B}|^{2}\right)
$$

である。

### 10.2 エネルギー流：ポインティングベクトル

エネルギーの流れを表すベクトルがポインティングベクトル $\mathbf{S}$ であり、

$$
\mathbf{S}=\frac{1}{\mu_{0}}\mathbf{E}\times\mathbf{B}
$$

で与えられる。さらに、電荷・電流と場の間のエネルギー授受を含めた保存則（ポインティングの定理）が成り立つ。


## 11. 電磁波：マクスウェル方程式から波動方程式へ

### 11.1 真空中の波動方程式

真空で $\rho=0,\ \mathbf{J}=\mathbf{0}$ とすると、マクスウェル方程式から電場・磁場が波動方程式を満たすことが導かれる。例えば電場について

$$
\nabla^{2}\mathbf{E}-\mu_{0}\varepsilon_{0}\frac{\partial^{2}\mathbf{E}}{\partial t^{2}}=\mathbf{0}
$$

となる。波の位相速度 $c$ は

$$
c=\frac{1}{\sqrt{\mu_{0}\varepsilon_{0}}}
$$

であり、電磁波が真空中を伝播することが分かる。

### 11.2 平面波の基本構造

平面波解として

$$
\mathbf{E}(\mathbf{r},t)=\mathbf{E}_{0}\cos(\mathbf{k}\cdot\mathbf{r}-\omega t),\qquad
\mathbf{B}(\mathbf{r},t)=\mathbf{B}_{0}\cos(\mathbf{k}\cdot\mathbf{r}-\omega t)
$$

を考えると、

- $\mathbf{E}\perp \mathbf{B}$
- $\mathbf{E}\perp \mathbf{k}$、$\mathbf{B}\perp \mathbf{k}$
- $|\mathbf{B}_{0}|=|\mathbf{E}_{0}|/c$

が成り立つ。すなわち電磁波は横波である。

### 11.3 物質中の波：屈折率と減衰

損失のない線形媒質では位相速度 $v$ は

$$
v=\frac{1}{\sqrt{\mu\varepsilon}}
$$

であり、屈折率 $n$ は

$$
n=\frac{c}{v}=\sqrt{\frac{\mu\varepsilon}{\mu_{0}\varepsilon_{0}}}
$$

で定義される。導電率 $\sigma$ を含むと、波は減衰し、表皮効果（skin effect）として浸透深さが有限になる。良導体近似で角周波数 $\omega$ に対し表皮深さ $\delta$ は

$$
\delta\simeq \sqrt{\frac{2}{\omega\mu\sigma}}
$$

で評価される。


## 12. 回路との接続：集中定数近似と変位電流

電磁気学と回路理論は連続である。回路理論は、空間分布を捨象して電圧・電流という少数の自由度で記述する近似として理解できる。

- 静電容量 $C$：電荷と電位差の関係 $Q=C V$
- インダクタンス $L$：磁束と電流の関係 $\Phi=L I$
- オーム則：$V=IR$（媒質では $\mathbf{J}=\sigma\mathbf{E}$）

といった関係が現れるが、電磁気学から見れば、これらは境界値問題とエネルギー評価の結果として導出される。

特に、コンデンサの極板間では導電電流が流れない一方で、時間変化する電場が存在する。この整合性を担保するのが、アンペール＝マクスウェルの法則における変位電流項
$$
\varepsilon_{0}\frac{\partial\mathbf{E}}{\partial t}
$$
である。


## 13. 単位系と定数：SI と再定義 SI

電磁気学では単位系が議論の見通しに影響する。初歩では SI が標準であるが、歴史的にガウス単位系（CGS）なども用いられる。式の形や $4\pi$ の出現位置が異なるため、どの単位系で議論しているかを明示する姿勢が重要である。

### 13.1 SI における代表定数

- 真空の透磁率 $\mu_{0}$
- 真空の誘電率 $\varepsilon_{0}$
- 真空中の光速 $c$

が基本定数として現れ、$c=1/\sqrt{\mu_{0}\varepsilon_{0}}$ が成り立つ。

ただし 2019 年以降の SI では、アンペアの定義が電気素量 $e$ に基づく形に改められ、$\mu_{0}$ は厳密値ではなく実験で決まる量になった（したがって $\varepsilon_{0}$ も同様に扱われる）。一方で $c$ は定義により厳密値である。

| 量 | SI（再定義後）での扱い | コメント |
|---|---|---|
| $c$ | 厳密値 | メートルの定義に組み込まれる |
| $e$ | 厳密値 | アンペアの定義に組み込まれる |
| $\mu_{0}$ | 推奨値（不確かさあり） | 実験により決定される |
| $\varepsilon_{0}$ | 推奨値（不確かさあり） | $\varepsilon_{0}=1/(\mu_{0}c^{2})$ |


## 14. 混同しやすい概念の整理：$\mathbf{E}/\mathbf{D}$ と $\mathbf{B}/\mathbf{H}$、発散と回転

電磁気学の理解が進むほど、同じ文字でも状況で意味が変わり得る点が重要になる。初歩で特に意識しておくと良い整理を以下に示す。

### 14.1 $\mathbf{E}$ と $\mathbf{D}$

- $\mathbf{E}$：力学的に直接意味をもつ場（ローレンツ力に現れる）
- $\mathbf{D}$：自由電荷を右辺に持つ形へ整理した場（物質応答 $\mathbf{P}$ を吸収する）

### 14.2 $\mathbf{B}$ と $\mathbf{H}$

- $\mathbf{B}$：ローレンツ力に現れる磁束密度、また $\nabla\cdot\mathbf{B}=0$ を満たす
- $\mathbf{H}$：自由電流を右辺に持つ形へ整理した場（物質応答 $\mathbf{M}$ を吸収する）

### 14.3 発散と回転

- 発散 $\nabla\cdot\mathbf{F}$：場の湧き出し・吸い込みの度合い
- 回転 $\nabla\times\mathbf{F}$：場の循環（渦）の度合い

電磁気学ではこの2つが、保存則や誘導現象の言語として機能する。数式は短いが、背後にある幾何学的意味が理解の鍵である。


## まとめと展望

電磁気学の初歩は、(i) 電荷と電流が電場・磁場を作り、(ii) それらがローレンツ力として物体へ作用し、(iii) ガウスの法則・ファラデーの法則・アンペール＝マクスウェルの法則が保存則としての意味を持つ、という三層をつなぐ段階である。さらに、物質中では分極・磁化を通じて $\mathbf{D},\mathbf{H}$ を導入し、境界条件と波動方程式を含めて全体をマクスウェル方程式へ統合することで、静電気・磁気・回路・電磁波が一つの理論として結びつくのである。

展望としては、第一に、ベクトル解析（発散・回転・積分定理）を丁寧に往復できるようになると、境界条件や保存則の理解が一段と安定する。第二に、物質応答（誘電・磁性・導電）を複素応答や異方性へ拡張すると、電磁波の伝播、散乱、共振、損失といった現象が統一的に整理できる。第三に、相対論的表現（電磁場テンソル）や量子論的な光・物質相互作用へ進むと、電磁気学が現代物理の基盤としてどこまで接続しているかがより明確になるのである。


### 参考文献

- NIST：CODATA 2022 vacuum magnetic permeability $\mu_{0}$（推奨値）
  https://physics.nist.gov/cgi-bin/cuu/Value?mu0=

- NIST：CODATA Recommended Values of the Fundamental Physical Constants: 2022（PDF, NIST SP 961）
  https://physics.nist.gov/cuu/pdf/wall_2022.pdf

- 東北大学：電磁気学 I（Electromagnetics I）講義資料（PDF）
  https://cobalt.cneas.tohoku.ac.jp/users/sato/Print-20130930.pdf

- 北海道大学：Physics II「電磁気学の基礎概念」（PDF）
  https://phys.sci.hokudai.ac.jp/~kita/PhysicsII/PhysicsII-7.pdf

- J. C. Maxwell：A Dynamical Theory of the Electromagnetic Field（1865, PDF）
  https://upload.wikimedia.org/wikipedia/commons/1/19/A_Dynamical_Theory_of_the_Electromagnetic_Field.pdf

- The Royal Society：VIII. A dynamical theory of the electromagnetic field（原典ページ）
  https://royalsocietypublishing.org/rstl/article/doi/10.1098/rstl.1865.0008/118816/VIII-A-dynamical-theory-of-the-electromagnetic

- Institute of Physics：Maxwell's equations（解説）
  https://www.iop.org/explore-physics/big-ideas-physics/maxwells-equations

- Wiley Major Reference Works：Jackson, Electrodynamics（概説ページ）
  https://onlinelibrary.wiley.com/doi/abs/10.1002/9783527600441.oe014
