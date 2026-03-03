# Ginzburg–Landau理論（GL理論）による相転移と空間秩序の記述

Ginzburg–Landau（GL）理論は、秩序変数と自由エネルギー汎関数にもとづいて、相転移と空間的な秩序形成を連続体として記述する枠組みである。特に超伝導では、磁場との結合を含む最小の数式体系として、臨界磁場、侵入長、コヒーレンス長、渦糸格子などを統一的に与える理論である。

## 参考ドキュメント
1. V. L. Ginzburg and L. D. Landau, On the Theory of Superconductivity (1950)（PDF）
   https://www.physics.umd.edu/courses/Phys798C/AnlageSpring22/Landau%20and%20Ginzburg%20On%20the%20Theory%20of%20Superconductivity%20J%20Exptl%20Theoret%20Phys%2020%201064%20%281950%29.pdf
2. A. A. Abrikosov, Nobel Lecture: Type-II superconductors and the vortex lattice (2004)（RMP）
   https://link.aps.org/doi/10.1103/RevModPhys.76.975
3. 大塚泰一郎, 超伝導入門 第6章: ギンスブルグ-ランダウ理論 (1)（低温工学, J-STAGE, 日本語PDF）
   https://www.jstage.jst.go.jp/article/jcsj1966/35/6/35_6_279/_pdf

## 1. GL理論の位置づけ：Landau理論から空間自由度へ

### 1.1 Landauの相転移理論（局所自由エネルギー展開）
連続相転移を記述する最小の道具は秩序変数 $\eta$ と自由エネルギー密度の展開である。対称性により許される最低次まで残すと
$$
f(\eta)=f_0 + a(T)\eta^2 + \frac{b}{2}\eta^4 + \cdots
$$
であり、安定性から $b>0$ を仮定する。$a(T)=a_0(T-T_c)$ とおけば、

- $T>T_c$：$a>0$ で $\eta=0$ が安定
- $T<T_c$：$a<0$ で $|\eta|=\sqrt{-a/b}$ が安定

となり、秩序変数が自発的に生じる構図が得られる。

### 1.2 Ginzburg–Landau理論：勾配項（空間変化）の導入
Landau理論は本質的に“空間一様”（あるいは空間変化を無視）である。GL理論はここに「空間的な不均一」を許すための勾配項を加える：
$$
F[\eta]=\int d^3r\left(f(\eta) + \frac{K}{2}|\nabla \eta|^2\right).
$$
このとき、秩序変数は“どこでどれだけ秩序が強いか”を示す場になり、界面・欠陥・ドメイン・渦糸などの空間構造を扱えるようになる。

## 2. 超伝導GL理論：秩序変数とゲージ不変性

### 2.1 秩序変数 $\psi(\mathbf{r})$
超伝導では秩序変数は複素数場である：
$$
\psi(\mathbf{r})=|\psi(\mathbf{r})|e^{i\theta(\mathbf{r})}.
$$
$|\psi|^2$ は凝縮成分の密度に対応づけられ、位相 $\theta$ は超電流や磁束量子化と直結する。

### 2.2 磁場との結合：最小結合とゲージ変換
電磁場のベクトルポテンシャル $\mathbf{A}$ を導入し、勾配を共変微分に置き換える：
$$
\nabla \rightarrow \mathbf{D}=\nabla - i\frac{q^\*}{\hbar}\mathbf{A}.
$$
ここで $q^\*=2e$ はクーパー対の電荷である。ゲージ変換
$$
\psi\rightarrow \psi e^{i\chi},\quad \mathbf{A}\rightarrow \mathbf{A}+\frac{\hbar}{q^\*}\nabla\chi
$$
に対して物理量が不変となるように自由エネルギーを作るのが次節である。


## 3. 自由エネルギー汎関数とGL方程式

### 3.1 超伝導GL自由エネルギー
最も基本的なGL自由エネルギーは
$$
F[\psi,\mathbf{A}]
=\int d^3r\left[
f_n
+\alpha|\psi|^2+\frac{\beta}{2}|\psi|^4
+\frac{1}{2m^\*}\left|\left(-i\hbar\nabla-q^\*\mathbf{A}\right)\psi\right|^2
+\frac{|\mathbf{B}|^2}{2\mu_0}
\right],
$$
である。ここで $\mathbf{B}=\nabla\times\mathbf{A}$、$m^\*$ は有効質量（対の有効質量）である。温度依存は通常
$$
\alpha=\alpha_0(T-T_c)
$$
の形で与える。

### 3.2 変分原理からのGL方程式
$F$ を $\psi^\*$ と $\mathbf{A}$ で変分し、停留条件を課すとGL方程式が得られる。

(1) 第1GL方程式（秩序変数の方程式）
$$
\alpha\psi + \beta|\psi|^2\psi
+\frac{1}{2m^\*}\left(-i\hbar\nabla-q^\*\mathbf{A}\right)^2\psi=0.
$$

(2) 超電流密度
$$
\mathbf{j}_s
=\frac{q^\*}{m^\*}\mathrm{Re}\left\{\psi^\*\left(-i\hbar\nabla-q^\*\mathbf{A}\right)\psi\right\}.
$$

(3) マクスウェル方程式（静磁場）
$$
\nabla\times\mathbf{B}=\mu_0\mathbf{j}_s.
$$

これにより、秩序変数の空間構造と磁場分布が自己無撞着に決まる。


## 4. 特性長：コヒーレンス長 $\xi$ と侵入長 $\lambda$

### 4.1 一様系の凝縮と凝縮エネルギー
磁場なし・一様で $\nabla\psi=0$ とすると
$$
\alpha\psi+\beta|\psi|^2\psi=0
$$
より、$T<T_c$（$\alpha<0$）で
$$
|\psi|^2=-\frac{\alpha}{\beta}
$$
である。自由エネルギー差（凝縮エネルギー密度）は
$$
f_s-f_n=-\frac{\alpha^2}{2\beta}
$$
となる。

### 4.2 コヒーレンス長 $\xi$
$\psi$ の空間変化がどの距離で回復するかを与えるスケールが $\xi$ である。線形化 $\psi=\psi_0+\delta\psi$ により
$$
\xi=\sqrt{\frac{\hbar^2}{2m^\*|\alpha|}}
$$
が得られる。界面幅や渦糸コアの大きさを支配する長さである。

### 4.3 磁場侵入長 $\lambda$
超伝導体内で磁場がどれだけ侵入するかはロンドン方程式により指数関数的に減衰し、その減衰長が $\lambda$ である。GLからは
$$
\lambda=\sqrt{\frac{m^\*}{\mu_0 q^{\*2}|\psi|^2}}
=\sqrt{\frac{m^\*\beta}{\mu_0 q^{\*2}|\alpha|}}
$$
が得られる。

### 4.4 GLパラメータと第I種・第II種
二つの長さの比
$$
\kappa=\frac{\lambda}{\xi}
$$
が、超伝導体の分類を決める。界面（常伝導／超伝導境界）の表面エネルギーの符号が反転する境界が
$$
\kappa=\frac{1}{\sqrt{2}}
$$
であり、

- $\kappa<1/\sqrt{2}$：第I種（中間状態を経て巨視的に相分離しやすい）
- $\kappa>1/\sqrt{2}$：第II種（渦糸が安定化し磁場と共存しやすい）

となる。


## 5. 臨界磁場と渦糸（Abrikosov渦糸格子）

### 5.1 磁束量子化
位相 $\theta$ の単価性（$2\pi$ 周期）から、閉曲線に沿う位相勾配とベクトルポテンシャルの関係により磁束が量子化される：
$$
\Phi_0=\frac{h}{2e}.
$$

### 5.2 上部臨界磁場 $H_{c2}$
第II種では $H_{c1}<H<H_{c2}$ で渦糸状態が現れる。GL方程式を $H_{c2}$ 近傍で線形化すると
$$
H_{c2}=\frac{\Phi_0}{2\pi\xi^2}
$$
が得られる。ここで $\xi$ が短いほど $H_{c2}$ が高くなるという関係が明瞭である。

### 5.3 下部臨界磁場 $H_{c1}$（概念）
$H_{c1}$ は最初の渦糸が侵入する磁場であり、渦糸1本の自己エネルギーと外部磁場による仕事の釣り合いで決まる。近似的に
$$
H_{c1}\sim \frac{\Phi_0}{4\pi\lambda^2}\ln\kappa
$$
の形（対数補正を伴う）が現れ、$\lambda$ が小さく $\kappa$ が大きいほど渦糸は侵入しやすい。

### 5.4 Abrikosov渦糸格子
$H_{c2}$ に近い領域ではGL方程式の解として周期的な渦糸配列が現れ、渦糸が格子（しばしば三角格子）を形成する。これは第II種超伝導体が強磁場と共存できる決定的機構であり、渦糸の弾性・ピン止め・融解などの議論の出発点である。


## 6. GL理論の拡張：異方性・多成分・多バンド

### 6.1 異方性GL（質量テンソル）
結晶異方性を入れる基本的手法は、運動エネルギー項の $m^\*$ をテンソル $m_{ij}$ に置き換えることである：
$$
\frac{1}{2m^\*}\left|\left(-i\hbar\nabla-q^\*\mathbf{A}\right)\psi\right|^2
\rightarrow
\sum_{i,j}\frac{1}{2} \left(D_i\psi\right)^\*\left(m^{-1}\right)_{ij}\left(D_j\psi\right).
$$
これにより方向依存の $\xi_i$ や $\lambda_i$ が現れ、層状超伝導体や薄膜での臨界磁場異方性などを扱える。

### 6.2 多バンドGL
複数の凝縮チャネルを持つ系では、秩序変数を $\psi_1,\psi_2,\dots$ として
$$
F=\int d^3r\left(\sum_n \alpha_n|\psi_n|^2 + \sum_n\frac{\beta_n}{2}|\psi_n|^4
-\sum_{n\neq m}\eta_{nm}(\psi_n^\*\psi_m+\psi_m^\*\psi_n)+\cdots\right)
$$
のような結合項を導入する。ギャップ間位相差や複合渦糸など、多成分特有の現象が現れる。

### 6.3 d波・p波などの多成分秩序変数
秩序変数がスカラーでなくベクトル／テンソルになる場合、許される不変量（対称性）の組み方が理論の中核となる。これは超伝導に限らず、強誘電体・磁性秩序・液晶などにも共通する構造である。


## 7. 時間依存Ginzburg–Landau方程式（TDGL）

### 7.1 緩和型ダイナミクスの基本形
時間発展を現象論的に入れると、代表的には
$$
\Gamma^{-1}\left(\frac{\partial}{\partial t}+\frac{iq^\*}{\hbar}\phi\right)\psi
= -\frac{\delta F}{\delta \psi^\*} + \zeta
$$
の形になる（$\phi$ はスカラーポテンシャル、$\zeta$ は熱揺らぎ項）。この形式は、渦糸運動、電流印加下の不安定、パルス応答、ピン止めの動力学などの連続体シミュレーションに広く使われる。

### 7.2 TDGLが扱いやすい対象
- 薄膜・微細パターン構造での磁束侵入と渦糸の運動
- 欠陥やピン止め中心を含む渦糸配列の再構成
- 電流・磁場スイープ下の非平衡応答

ただし、TDGLの係数の物理的同定は系に依存し、微視的理論（BCS、Eilenberger、Usadel等）との照合が必要になることが多い。


## 8. 揺らぎとGL理論の適用範囲（Ginzburg基準）

GL理論は本質的に平均場的枠組みであり、臨界点近傍では揺らぎが強くなる。揺らぎが平均場を破る指標としてGinzburg数 $Gi$ を導入し、概念的には
$$
Gi \sim \left(\frac{k_BT_c}{H_c^2\xi^3}\right)^2
$$
のように、凝縮エネルギー（$H_c$ と関係）と相関体積（$\xi^3$）の比で評価する。$Gi$ が大きい系（強結合・低次元・短い $\xi$）では、GL平均場だけでは相境界の近傍を精密に記述しにくく、揺らぎ伝導や渦糸液体などの議論が必要になる。


## 9. 他の理論との比較

### 9.1 比較表（目的と情報量）
| 枠組み | 主変数 | 主な入力 | 強み | 限界 |
|---|---|---|---|---|
| Landau理論 | 一様な秩序変数 $\eta$ | 対称性、係数 $a,b$ | 相転移の普遍構造を最小式で示す | 空間構造や磁場分布を直接扱いにくい |
| GL理論 | 場としての $\eta(\mathbf{r})$、超伝導では $\psi(\mathbf{r}),\mathbf{A}$ | 対称性、$\alpha,\beta,m^\*$、電磁場 | 界面・渦糸・臨界磁場・長さスケールを統一 | 臨界近傍の揺らぎや低温の微視的詳細は弱い |
| 微視的理論（BCS, Gor'kov） | 電子の対形成、グリーン関数 | 相互作用、バンド構造等 | 係数の由来や温度依存の根拠を与える | 材料依存の入力が多く計算も重い |
| 準古典（Eilenberger/Usadel） | 準古典グリーン関数 | 散乱、異方性、界面条件 | 不純物・界面・非一様性をより詳細に扱う | 理論と数値の負担が増える |

### 9.2 GL理論の“材料パラメータ化”という見方
GLの係数は、直接の微視的パラメータではなく、測定可能量（$T_c$、$\lambda$、$\xi$、$H_{c2}$ 等）と結びついて同定されることが多い。逆に言えば、材料ごとの差はこれら長さ・臨界磁場・異方性として集約され、微細組織や欠陥の効果は境界条件・局所係数・ピン止めポテンシャルとして表現される。


## 10. GL理論が多分野で再利用される理由

GLの骨格は「対称性で許される自由エネルギー＋勾配項＋（必要なら）外場との結合」であり、対象を変えると秩序変数が置き換わる。

| 対象 | 秩序変数 | 代表的自由エネルギー要素 |
|---|---|---|
| 超伝導 | 複素 $\psi$ | $|\psi|^2,|\psi|^4,|(\nabla-i(q^\*/\hbar)\mathbf{A})\psi|^2,|\mathbf{B}|^2$ |
| 強誘電 | 分極 $\mathbf{P}$ | $|\mathbf{P}|^2,|\mathbf{P}|^4,|\nabla\mathbf{P}|^2$、弾性・電場結合 |
| 磁性秩序 | 磁化 $\mathbf{M}$ | $|\mathbf{M}|^2,|\mathbf{M}|^4,|\nabla\mathbf{M}|^2$、異方性・磁場結合 |
| 濃度秩序・秩序化 | 濃度場 $c(\mathbf{r})$ 等 | 二重井戸型自由エネルギー＋勾配項（界面エネルギー） |

この意味でGL理論は、相図・界面・トポロジカル欠陥（渦、ドメイン壁、転位に類するもの）を連続体で扱うための共通言語である。


## まとめ
GL理論は、秩序変数と自由エネルギー汎関数を基礎に、相転移の平均場像を空間構造と電磁応答へ拡張する理論である。超伝導においては $\xi$ と $\lambda$、および $\kappa=\lambda/\xi$ が分類と現象を支配し、渦糸格子や臨界磁場を含む広範な現象を統一的に導く枠組みとして機能するのである。

## 関連研究
- 京都大学OCW（固体電子論・超伝導）：GLパラメータや $H_{c2}=\Phi_0/(2\pi\xi^2)$ の導出を含む講義資料（日本語PDF）
  https://ocw.kyoto-u.ac.jp/wp-content/uploads/2010/04/2010_kagakukotaidennshiron_4.pdf
- 東京大学 Physics Lab.（日本語PDF）：第I種／第II種の説明を含むGL解説
  https://event.phys.s.u-tokyo.ac.jp/physlab2022/pdf/cmph-article03.pdf
- 東京大学講義ノート（日本語PDF）：BCSとGLの接続、秩序変数の解釈
  https://park.itc.u-tokyo.ac.jp/YNagai/lectures/2024/SCandTM/Superconductivity2024.pdf
- Nobel Prize（一般向け解説）：秩序変数と第I・第II種の分岐の説明
  https://www.nobelprize.org/prizes/physics/2003/popular-information/
- 日本物理学会「超伝導研究の歩」：AbrikosovによるGLにもとづく第II種の解析史（日本語）
  https://www.jps.or.jp/books/50thkinen/50th_09/001.html
- Brandt, The Vortex Lattice in Ginzburg-Landau Superconductors（渦糸格子の理論展開）
  https://arxiv.org/pdf/0806.1058
- 日本の研究報告（JST PDF）：GL理論にもとづくシミュレーションの例（日本語PDF）
  https://www.jst.go.jp/kisoken/crest/research/s-houkoku/06_03.pdf
- 日本語講義資料（大阪大学系の公開資料）：GL方程式の扱い（日本語PDF）
  https://www.mukudalab.mp.es.osaka-u.ac.jp/kitaokalab/lecture/sc/sc_7.pdf
- GL方程式のより一般的な導出・背景（解説PDF）
  https://www.researchgate.net/profile/Tatyana-Baturina/publication/256185188_Ginzburg-Landau_Equations/links/0deec521e88e466269000000/Ginzburg-Landau-Equations.pdf
