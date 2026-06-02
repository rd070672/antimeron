# 解析学：実数・極限・積分から偏微分方程式・関数解析まで

解析学は，極限・連続性・微分・積分という概念を厳密に定式化し，関数や空間の構造を精密に解明する数学の一大分野であり，ニュートンとライプニッツによる微分積分法の発明（17世紀）に起源をもつ。19世紀にコーシー・ワイエルシュトラスによって実数論と $\varepsilon$-$\delta$ 論法が整備され，20世紀にはルベーグ積分・測度論・関数解析・偏微分方程式論へと発展し，現代の数理科学・物理学・工学のあらゆる基盤を構成している。

## 参考ドキュメント

1. 杉浦光夫「解析入門 I・II」東京大学出版会 (1980/1985)  
   https://www.utp.or.jp/book/b302062.html

2. Rudin, W. "Principles of Mathematical Analysis" (3rd ed.), McGraw-Hill (1976)

3. 伊藤清三「ルベーグ積分入門」裳華房 (1963 / 新版 2017)

---

## 1. 歴史的背景

解析学の直接の起源は17世紀の微積分法の発明にある。Isaac Newton（1643–1727）は流率法（method of fluxions）として接線・面積・弧長の問題を統一的に扱い，1666年頃に基本的なアイデアを構築した。Gottfried Wilhelm Leibniz（1646–1716）は独立に微分の記法 $dy/dx$ および積分記号 $\int$ を導入し，1684年に最初の論文を公刊した。両者の先後をめぐる論争は数学史上最大の優先権論争として知られるが，現在では独立な発明として評価されている。Leibnizの記法は直感的で操作しやすく，以後の解析学の発展はほぼこの記法を基盤として進んだ。

18世紀には Leonhard Euler（1707–1783）が解析学を体系的に整備し，指数関数・対数関数・三角関数を統一するオイラーの公式 $e^{i\theta} = \cos\theta + i\sin\theta$，$\sum$記法，関数概念の明確化，無限級数の広範な研究を行った。しかしこの時代の解析学は「無限小」の概念を直感的に扱っており，論理的な厳密性に欠けていた。例えば，$\sum_{n=0}^{\infty} (-1)^n = 1/2$ といった形式的操作が無批判に行われていた。

19世紀の「解析学の厳密化」運動の中心は Augustin-Louis Cauchy（1789–1857）である。Cauchyは「無限小」を避け，極限を用いて連続性・微分可能性・積分を定義し，1821年の「解析教程（Cours d'analyse）」でその基礎を築いた。さらにKarl Weierstrass（1815–1897）は，極限・連続・微分を $\varepsilon$-$\delta$ 論法によって純粋に量的な言語で厳密に定式化し，「直感に反する」病理的な関数（例：至る所で連続だが至る所で微分不可能なWeierstrass関数 $f(x) = \sum_{n=0}^{\infty} a^n \cos(b^n \pi x)$，$0 < a < 1$，$ab > 1 + 3\pi/2$）を構築して，直感への過信を戒めた。

実数の厳密な構成は，Georg Cantor（1845–1918）によるコーシー列の同値類としての構成と，Richard Dedekind（1831–1916）によるデデキント切断（Dedekind cut）によって独立に確立された。20世紀には Henri Lebesgue（1875–1941）が測度論に基づく積分（ルベーグ積分，1902年学位論文）を構築し，リーマン積分では扱えなかった広い関数クラスへの積分拡張・極限と積分の交換定理を整備した。これがその後の確率論・フーリエ解析・関数解析の共通基盤となった。

---

## 2. 実数の理論と位相的基礎

### 実数の完備性

有理数体 $\mathbb{Q}$ は稠密（任意の2点の間に有理数が存在する）だが，完備でない（$\sqrt{2}$ はコーシー列の極限が $\mathbb{Q}$ に属さない例）。実数体 $\mathbb{R}$ は有理数を「完備化」することで構成され，解析学のあらゆる定理の土台となる以下の同値な完備性条件を満たす。

上限原理（最小上界の公理）：$\mathbb{R}$ の空でない上に有界な部分集合 $S$ は上限（supremum）$\sup S \in \mathbb{R}$ をもつ。これは他の完備性条件と同値であり，実数論の公理として採用されることが多い。

コーシー列の収束：数列 $\{a_n\}$ が任意の $\varepsilon > 0$ に対してある番号 $N$ 以降で $|a_m - a_n| < \varepsilon$（$m, n > N$）を満たすとき，この数列をコーシー列という。$\mathbb{R}$ ではすべてのコーシー列が収束する（完備性）。

区間縮小法（ネストされた区間の定理）：閉区間の列 $I_1 \supset I_2 \supset \cdots$ で $|I_n| \to 0$ なら $\bigcap_n I_n$ はただ一点からなる。

ボルツァーノ–ワイエルシュトラスの定理：$\mathbb{R}^n$ の有界な点列は収束する部分列をもつ。

### $\varepsilon$-$\delta$ 論法

関数 $f: \mathbb{R} \to \mathbb{R}$ が点 $a$ で極限値 $L$ をもつとは：

$$\lim_{x \to a} f(x) = L \iff \forall \varepsilon > 0,\; \exists \delta > 0 \text{ s.t. } 0 < |x - a| < \delta \Rightarrow |f(x) - L| < \varepsilon$$

「$\varepsilon$ を先に任意に小さく与え，そのあとで $\delta$ を $\varepsilon$ に依存して選ぶ」という論法の構造が本質的であり，$\varepsilon$ と $\delta$ の順序が逆になると別の概念（一様連続性，一様収束など）になる。

関数 $f$ が点 $a$ で連続であるとは $\lim_{x \to a} f(x) = f(a)$ が成り立つことであり，任意の $\varepsilon > 0$ に対して $|x - a| < \delta \Rightarrow |f(x) - f(a)| < \varepsilon$ となる $\delta > 0$ が存在することと等価である。

### 位相的概念

解析学で繰り返し現れる概念を距離空間・一般位相空間の言語で整理する。距離空間 $(X, d)$ において，点 $a$ の $\varepsilon$-開球を $B(a, \varepsilon) = \{x \in X : d(x, a) < \varepsilon\}$ と定義する。開集合・閉集合・コンパクト集合（任意の開被覆が有限部分被覆をもつ）・連結集合の概念はすべてこの基礎の上に構築される。

$\mathbb{R}^n$ における有界閉集合とコンパクト集合の同値性（ハイネ–ボレルの定理）：$\mathbb{R}^n$ の部分集合 $K$ がコンパクトであることと，$K$ が有界かつ閉集合であることは同値である。これにより，有界閉区間上の連続関数が最大値・最小値をもつ（最大値定理），一様連続性をもつ（ハイネの定理）などの重要な定理が従う。

---

## 3. 数列・級数と収束

### 数列の収束

数列 $\{a_n\}_{n=1}^{\infty}$ が $L \in \mathbb{R}$ に収束するとは：

$$\lim_{n\to\infty} a_n = L \iff \forall \varepsilon > 0,\; \exists N \in \mathbb{N} \text{ s.t. } n > N \Rightarrow |a_n - L| < \varepsilon$$

数列の収束に関する基本的な性質として，収束する数列は有界であること，部分列収束定理（ボルツァーノ–ワイエルシュトラス），単調増加かつ上に有界な数列は収束すること（単調収束定理）が挙げられる。

### 無限級数

無限級数 $\sum_{n=1}^{\infty} a_n$ の収束は，部分和の数列 $S_N = \sum_{n=1}^{N} a_n$ の収束として定義される。収束判定のための主要な定理を以下に示す。

比率判定法（ダランベールの判定法）：$\lim_{n\to\infty} |a_{n+1}/a_n| = r$ とおくとき，$r < 1$ なら絶対収束，$r > 1$ なら発散する。

根号判定法（コーシーの判定法）：$\limsup_{n\to\infty} |a_n|^{1/n} = r$ とおくとき，$r < 1$ なら絶対収束，$r > 1$ なら発散する。

ライプニッツの交代級数判定法：単調減少数列 $\{a_n\}$，$a_n > 0$，$a_n \to 0$ のとき，交代級数 $\sum_{n=1}^{\infty} (-1)^{n+1} a_n$ は収束する。

### 関数項級数と一様収束

関数列 $\{f_n\}$ が $f$ に一様収束するとは：

$$\sup_{x \in D} |f_n(x) - f(x)| \to 0 \quad (n \to \infty)$$

一様収束は「$\varepsilon$ の選び方が $x$ によらない」という強い条件であり，各点収束（pointwise convergence）とは区別される。一様収束の重要な帰結として，(1) 各 $f_n$ が連続なら極限関数 $f$ も連続，(2) 積分と極限の交換 $\int_a^b f_n \to \int_a^b f$，(3) 微分と極限の交換（導関数の一様収束が条件）が成り立つ。

べき級数 $\sum_{n=0}^{\infty} c_n (x-a)^n$ は収束半径 $R = 1/\limsup_{n\to\infty} |c_n|^{1/n}$ 以内の任意の閉区間上で一様収束し，項別微分・項別積分が正当化される。

---

## 4. 微分法

### 微分の定義と解釈

関数 $f: \mathbb{R} \to \mathbb{R}$ の点 $x = a$ における微分係数は：

$$f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}$$

この極限が存在するとき，$f$ は $a$ で微分可能という。微分係数は関数のグラフの接線の傾きを与え，$f(a + h) \approx f(a) + f'(a) h$ という線形近似（1次近似）を表す。これをより正確に表現すると，$f$ が $a$ で微分可能であることは，次の線形性条件と等価である：

$$f(a + h) = f(a) + f'(a) h + o(h) \quad (h \to 0)$$

ここで $o(h)$ はLandauの小 $o$ 記号で $o(h)/h \to 0$ ($h \to 0$) を意味する。$\mathbb{R}^n$ から $\mathbb{R}^m$ への写像 $f$ の（フレシェ）微分は，線形写像 $Df(a): \mathbb{R}^n \to \mathbb{R}^m$ として定義され，

$$f(a + h) = f(a) + Df(a) h + o(\|h\|) \quad (\|h\| \to 0)$$

を満たす。$Df(a)$ は偏微分からなるヤコビアン行列 $[(\partial f_i/\partial x_j)]$ で表現される。

### 微分の基本定理

合成関数の微分（連鎖律）：$g \circ f$ が微分可能なら $(g \circ f)' = g'(f(x)) \cdot f'(x)$，またはベクトル値の場合 $D(g \circ f)(a) = Dg(f(a)) \circ Df(a)$（ヤコビアン行列の積）。

平均値の定理：$f$ が $[a,b]$ で連続，$(a,b)$ で微分可能なら，$f(b) - f(a) = f'(c)(b-a)$ を満たす $c \in (a,b)$ が存在する。これは関数の大域的変化を局所的な微分係数で制御する最も基本的な不等式の根拠である。$|\,f(b) - f(a)| \leq \sup_{x\in(a,b)} |f'(x)| \cdot |b-a|$ という形で利用されることが多い。

テイラーの定理：$f$ が $n$ 回微分可能なら，

$$f(x) = \sum_{k=0}^{n-1} \frac{f^{(k)}(a)}{k!}(x-a)^k + R_n(x)$$

剰余項 $R_n(x)$ にはいくつかの表現があり，Lagrange形 $R_n(x) = \frac{f^{(n)}(c)}{n!}(x-a)^n$（$c$ は $a$ と $x$ の間の点），積分形 $R_n(x) = \frac{1}{(n-1)!}\int_a^x (x-t)^{n-1} f^{(n)}(t)\,dt$ などが用いられる。

### 多変数関数の微分法

偏微分 $\partial f / \partial x_i$ は他の変数を固定したときの1変数の微分であるが，偏微分の存在は微分可能性（全微分の存在）を保証しない。全微分可能性（フレシェ微分の存在）は，すべての偏微分が連続であれば保証される（$C^1$ 級関数の全微分可能性）。

陰関数定理：$F(x, y) = 0$，$F_y(a, b) \neq 0$ のとき，$(a,b)$ 近傍で $y = g(x)$ として陽に解け，$g'(x) = -F_x/F_y$。逆関数定理：$f: \mathbb{R}^n \to \mathbb{R}^n$ のヤコビアンが $a$ で可逆（$\det Df(a) \neq 0$）なら，$a$ の近傍で逆写像 $f^{-1}$ が滑らかに存在する。これらは解析学と微分幾何・代数幾何の接点をなす重要な定理である。

---

## 5. 積分論：リーマン積分からルベーグ積分へ

### リーマン積分

区間 $[a,b]$ の分割 $\Delta: a = x_0 < x_1 < \cdots < x_n = b$ に対して，代表点 $\xi_i \in [x_{i-1}, x_i]$ を選んだリーマン和は：

$$S(f, \Delta, \xi) = \sum_{i=1}^{n} f(\xi_i)(x_i - x_{i-1})$$

$|\Delta| = \max_i (x_i - x_{i-1})$ を分割の幅とするとき，$|\Delta| \to 0$ での極限が存在して分割・代表点の選び方によらないとき，$f$ は $[a,b]$ でリーマン積分可能といい，その極限を $\int_a^b f(x)\,dx$ と書く。有界閉区間上の連続関数，単調関数，有限個の不連続点をもつ有界関数はリーマン積分可能である。

微積分学の基本定理（FTC）は解析学の中核定理の一つであり，以下の2つの主張からなる。

FTC第1部（積分による不定積分の定義）：$f$ が $[a,b]$ でリーマン積分可能なとき，$F(x) = \int_a^x f(t)\,dt$ は $[a,b]$ で連続であり，$f$ が連続な点 $x$ では $F'(x) = f(x)$。

FTC第2部（ニュートン–ライプニッツの公式）：$f$ が連続で $f = G'$ なら，$\int_a^b f(x)\,dx = G(b) - G(a)$。

### リーマン積分の限界

リーマン積分は直感的だが，次の点で限界がある。(1) 関数列の極限と積分の交換が一般には成立しない：$f_n \to f$（各点）であっても $\lim \int f_n = \int \lim f_n = \int f$ とは限らない。(2) 積分不可能な関数が多数存在する：例えばディリクレ関数 $f(x) = \mathbf{1}_{\mathbb{Q}}(x)$（有理数で1，無理数で0）はリーマン積分不可能だが，定数ゼロとして積分するのが自然である。

### ルベーグ積分の構成

Lebesgueは積分域を「値域で分割する」というリーマンとは逆転した発想に基づく積分を構築した。その基礎となる測度論については次節で述べる。

非負可測関数 $f \geq 0$ の積分は，単関数（有限個の値を取る可測関数）による近似から構成される：単関数 $\varphi = \sum_{k=1}^{n} c_k \mathbf{1}_{A_k}$（$c_k \geq 0$，$A_k$ は互いに素な可測集合）のルベーグ積分を $\int \varphi\,d\mu = \sum_{k=1}^{n} c_k \mu(A_k)$ と定義し，一般の非負可測関数に対しては単調増加な単関数列による近似の極限として：

$$\int f\,d\mu = \sup\left\{\int \varphi\,d\mu : 0 \leq \varphi \leq f,\; \varphi \text{ 単関数}\right\}$$

符号付き可測関数 $f = f^+ - f^-$（$f^+ = \max(f,0)$，$f^- = \max(-f,0)$）に対しては，$\int f\,d\mu = \int f^+\,d\mu - \int f^-\,d\mu$（少なくとも一方が有限のとき）と定義する。

ルベーグ積分の最大の強みは，極限と積分の交換を保証する以下の定理群にある。

単調収束定理（MCT）：非負可測関数列 $0 \leq f_1 \leq f_2 \leq \cdots \nearrow f$ （各点）なら，$\int f_n\,d\mu \nearrow \int f\,d\mu$。

優収束定理（DCT）：可測関数列 $f_n \to f$ （各点）で，可積分な優関数 $g \geq 0$（$|f_n| \leq g$）が存在するなら，$\int f_n\,d\mu \to \int f\,d\mu$。

Fatouの補題：非負可測関数列に対し，$\int \liminf_{n\to\infty} f_n\,d\mu \leq \liminf_{n\to\infty} \int f_n\,d\mu$。

---

## 6. 測度論

### 測度の定義

集合 $X$ 上の $\sigma$-加法族（シグマ代数）$\mathcal{F}$ は，$X \in \mathcal{F}$，補集合について閉じる，可算和について閉じる，という3条件を満たす集合族である。測度 $\mu: \mathcal{F} \to [0, +\infty]$ は $\mu(\emptyset) = 0$ と $\sigma$-加法性（互いに素な可算族 $\{A_n\}$ に対して $\mu(\bigcup_n A_n) = \sum_n \mu(A_n)$）を満たす関数である。三つ組 $(X, \mathcal{F}, \mu)$ を測度空間という。

$\mathbb{R}$ 上の標準的な測度はルベーグ測度 $\lambda$ であり，区間の測度をその長さ $\lambda([a,b]) = b - a$ と定めて $\sigma$-加法族（ボレル $\sigma$-代数の完備化）上に拡張したものである。カントール集合はルベーグ測度ゼロをもつ非可算集合の例として重要であり，測度論の「零集合を無視できる」という強みを示す典型例である。

### ルベーグ可測集合と積分

$\mathbb{R}$ の部分集合 $E$ がルベーグ可測であるとは，カラテオドリの条件：任意の集合 $A$ に対して $\lambda^*(A) = \lambda^*(A \cap E) + \lambda^*(A \cap E^c)$（$\lambda^*$ は外測度）が成立することをいう。ルベーグ可測集合の族はボレル集合族（開集合・閉集合から可算操作で得られる集合の族）を含む。

関数 $f: X \to \overline{\mathbb{R}}$ が可測関数であるとは，任意の $a \in \mathbb{R}$ に対して $\{x : f(x) > a\} \in \mathcal{F}$ が成立することをいう。連続関数・単調関数・可算個の可測関数の極限（各点）はすべて可測である。

### フビニ–トネリの定理

積測度空間 $(X \times Y, \mathcal{F} \otimes \mathcal{G}, \mu \otimes \nu)$ における多次元積分と逐次積分の交換を保証する定理である。

トネリの定理（非負関数）：$f \geq 0$ が可測なら，

$$\int_{X \times Y} f\,d(\mu \otimes \nu) = \int_X \left(\int_Y f(x,y)\,d\nu(y)\right)d\mu(x) = \int_Y \left(\int_X f(x,y)\,d\mu(x)\right)d\nu(y)$$

フビニの定理（可積分関数）：$\int |f|\,d(\mu \otimes \nu) < \infty$ ならば，上記の等式が成立し，かつほぼ至る所（a.e.）の $x$ に対して $y \mapsto f(x,y)$ が $\nu$-可積分，a.e. の $y$ に対して $x \mapsto f(x,y)$ が $\mu$-可積分となる。

これにより，$\mathbb{R}^n$ 上の多変数積分を逐次1変数積分として計算することが正当化される。

### $L^p$ 空間

可測関数のクラスを $p$ 乗可積分性によって分類した $L^p$ 空間は，関数解析の中心的な舞台である：

$$L^p(X, \mu) = \left\{f \text{ 可測} : \|f\|_p = \left(\int |f|^p\,d\mu\right)^{1/p} < \infty\right\} \quad (1 \leq p < \infty)$$

$$L^\infty(X, \mu) = \left\{f \text{ 可測} : \|f\|_\infty = \operatorname{ess}\sup |f| < \infty\right\}$$

ヘルダーの不等式：$1/p + 1/q = 1$（$p,q$ は共役指数）のとき，

$$\int |fg|\,d\mu \leq \|f\|_p \|g\|_q$$

ミンコフスキーの不等式（三角不等式）：$\|f + g\|_p \leq \|f\|_p + \|g\|_p$。これらにより，$L^p$ はノルム空間となり，さらに $1 \leq p \leq \infty$ に対して完備（バナッハ空間）である（Riesz–Fischerの定理）。特に $L^2$ は内積 $\langle f, g\rangle = \int f\bar{g}\,d\mu$ を備えたヒルベルト空間になる。

---

## 7. 複素解析

### 正則関数（holomorphic function）

複素数 $z = x + iy \in \mathbb{C}$ の関数 $f: \Omega \subset \mathbb{C} \to \mathbb{C}$（$\Omega$ は開集合）が点 $z_0$ で正則（holomorphic）であるとは，複素微分が存在すること，すなわち：

$$f'(z_0) = \lim_{h \to 0} \frac{f(z_0 + h) - f(z_0)}{h} \quad (h \in \mathbb{C},\; h \neq 0)$$

が成立することをいう。$h$ は複素数として任意の方向から $0$ に近づくことが要求されるため，実微分よりもはるかに強い条件である。$f = u + iv$（$u, v$ は実部・虚部）が $z_0 = (x_0, y_0)$ で正則であることは，コーシー–リーマン方程式（Cauchy–Riemann equations）：

$$\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y}, \quad \frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}$$

が $(x_0, y_0)$ で成立し，かつ $u, v$ が $(x_0, y_0)$ で実微分可能であることと同値である。正則関数の実部・虚部はともにラプラス方程式 $\Delta u = \partial^2 u/\partial x^2 + \partial^2 u/\partial y^2 = 0$ を満たす調和関数（harmonic function）になる。

### コーシーの積分定理と積分公式

正則関数の最も根本的な定理の一つは，コーシーの積分定理（Cauchy's integral theorem）である：$f$ が単連結領域 $\Omega$ で正則で，$\gamma$ が $\Omega$ 内の単純閉曲線であれば，

$$\oint_\gamma f(z)\,dz = 0$$

これはストークスの定理の複素版として理解でき，コーシー–リーマン方程式の成立が閉じた経路での積分をゼロにすることの証明である。

コーシーの積分公式（Cauchy's integral formula）は，正則性のもとで関数値を積分で表す：$f$ が閉円板 $\bar{D}(a,r)$ で正則で，$\gamma$ が反時計回りの円 $|z-a| = r$ であれば，

$$f^{(n)}(a) = \frac{n!}{2\pi i} \oint_\gamma \frac{f(z)}{(z-a)^{n+1}}\,dz$$

これは正則関数が境界値によって内部が完全に決まること，さらに（$n = 0,1,2,\ldots$に対して）すべての導関数が存在する（すなわち正則関数は無限回微分可能で解析的）ことを示す。

### ローラン展開と留数定理

$f$ が孤立特異点 $z_0$ をもつとき，$0 < |z - z_0| < R$ でのローラン展開：

$$f(z) = \sum_{n=-\infty}^{\infty} c_n (z - z_0)^n, \quad c_n = \frac{1}{2\pi i}\oint \frac{f(z)}{(z-z_0)^{n+1}}\,dz$$

$z_0$ を囲む閉曲線 $\gamma$ 上の積分の値を決定するのが留数（residue）$\operatorname{Res}(f, z_0) = c_{-1}$ である。

留数定理（Cauchy's residue theorem）：$f$ が $\Omega$ で有限個の孤立特異点 $z_1, \ldots, z_m$ を除いて正則で，$\gamma$ がこれらを囲む単純閉曲線であれば：

$$\oint_\gamma f(z)\,dz = 2\pi i \sum_{k=1}^{m} \operatorname{Res}(f, z_k)$$

留数定理の強力な応用として，実数積分 $\int_{-\infty}^{\infty} f(x)\,dx$ の計算（上半平面に閉じた経路を作って留数を計算），$\sum_{n=-\infty}^{\infty} f(n)$ のような無限和の計算，偏角の原理（$f$ のゼロ点・極の個数の積分による計算）などがある。例えば：

$$\int_0^{\infty} \frac{x^{\alpha-1}}{1+x}\,dx = \frac{\pi}{\sin(\pi\alpha)}, \quad 0 < \alpha < 1$$

---

## 8. フーリエ解析

### フーリエ級数

周期 $2\pi$ の関数 $f \in L^1([-\pi,\pi])$ のフーリエ係数は：

$$\hat{f}(n) = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(x) e^{-inx}\,dx, \quad n \in \mathbb{Z}$$

フーリエ級数はこれらの係数による正弦・余弦の無限和 $\sum_{n=-\infty}^{\infty} \hat{f}(n) e^{inx}$ である。各点収束の問題は18〜19世紀の数学者を悩ませたが，現代的な結果として以下が知られている。$f$ が Lipschitz 連続ならフーリエ級数は各点収束する（ディリクレの定理）。$f \in L^2$ ならフーリエ級数は $L^2$ 意味（平均二乗収束）で収束する（リース–フィッシャーの定理）。

パーセバルの等式（Parseval's identity）は $L^2$ 理論の中心に位置する：

$$\|f\|_{L^2}^2 = \int_{-\pi}^{\pi} |f(x)|^2\,\frac{dx}{2\pi} = \sum_{n=-\infty}^{\infty} |\hat{f}(n)|^2$$

これは，$\{e^{inx}/\sqrt{2\pi}\}_{n \in \mathbb{Z}}$ が $L^2([-\pi,\pi])$ の完全正規直交系（CONS）をなすことと等価である。

### フーリエ変換

$\mathbb{R}$ 全体で定義された関数 $f \in L^1(\mathbb{R})$ のフーリエ変換は：

$$\hat{f}(\xi) = \mathcal{F}[f](\xi) = \int_{-\infty}^{\infty} f(x) e^{-2\pi i \xi x}\,dx$$

（物理学では $e^{-i\omega x}$ の規格化を用いることが多い）。逆フーリエ変換は $f(x) = \int_{-\infty}^{\infty} \hat{f}(\xi) e^{2\pi i \xi x}\,d\xi$。

フーリエ変換の重要な性質を以下に列挙する。

微分と掛け算の双対性：$\widehat{f'}(\xi) = 2\pi i \xi\, \hat{f}(\xi)$，すなわち微分は周波数領域での掛け算に対応する。

畳み込み定理：$(f * g)(x) = \int f(x-t)g(t)\,dt$ とすると，$\widehat{f*g} = \hat{f}\cdot\hat{g}$。空間領域での畳み込みが周波数領域での単純な積に対応することは，信号処理・偏微分方程式の解析における最重要道具の一つである。

プランシュレルの定理：$f \in L^1 \cap L^2$ のとき $\|\hat{f}\|_{L^2} = \|f\|_{L^2}$（エネルギー保存）であり，$L^2$ にフーリエ変換をユニタリ拡張できる。

不確定性原理（ハイゼンベルク–パウリの不確定性原理）：$\|x f(x)\|_{L^2} \cdot \|\xi \hat{f}(\xi)\|_{L^2} \geq \frac{1}{4\pi}\|f\|_{L^2}^2$，すなわち関数の空間的広がりと周波数的広がりは同時に小さくできない。

### 超関数とシュワルツ空間

古典的な意味での関数でない「点分布」δ関数 $\delta(x)$（$\delta(0) = \infty$，$\int \delta(x)\,dx = 1$）を厳密に扱うために，シュワルツ（L. Schwartz）は超関数（distribution）の理論を構築した（1945〜1951年）。急減少関数のなす空間 $\mathcal{S}(\mathbb{R}^n)$（シュワルツ空間，無限回微分可能で任意の多項式×任意階微分が有界）の連続線形汎関数の空間 $\mathcal{S}'(\mathbb{R}^n)$ が超関数（テンパード超関数）の空間であり，フーリエ変換が $\mathcal{S}'$ 上で自然に定義される。$\delta(x)$ の フーリエ変換は $\hat{\delta}(\xi) = 1$（定数関数）となる。

---

## 9. 関数解析

### ノルム空間とバナッハ空間

ベクトル空間 $X$（$\mathbb{R}$ または $\mathbb{C}$ 上）にノルム $\|\cdot\|: X \to [0,\infty)$（正定値性：$\|x\| = 0 \Leftrightarrow x = 0$，斉次性：$\|\alpha x\| = |\alpha|\|x\|$，三角不等式：$\|x + y\| \leq \|x\| + \|y\|$）が定義されたものをノルム空間という。ノルムから自然に距離 $d(x,y) = \|x - y\|$ が定まる。完備なノルム空間をバナッハ空間（Banach space）という。

代表的なバナッハ空間の例を以下に示す。

$\mathbb{R}^n$ や $\mathbb{C}^n$ はユークリッドノルムや $\ell^p$ ノルムに関してバナッハ空間。$C([a,b])$（$[a,b]$ 上の連続関数全体）は一様ノルム $\|f\|_\infty = \max_{x\in[a,b]} |f(x)|$ に関してバナッハ空間。$L^p(X,\mu)$（$1 \leq p \leq \infty$）はRiesz–Fischerの定理によりバナッハ空間。$\ell^p = \{(a_n)_{n=1}^\infty : \sum |a_n|^p < \infty\}$ は $\|(a_n)\|_p = (\sum |a_n|^p)^{1/p}$ に関してバナッハ空間。

### ヒルベルト空間

内積 $\langle \cdot, \cdot \rangle: H \times H \to \mathbb{C}$（線形性・共役対称性・正定値性）が定義された完備内積空間をヒルベルト空間（Hilbert space）という。内積からノルム $\|x\| = \sqrt{\langle x, x\rangle}$ が誘導されるため，ヒルベルト空間はバナッハ空間の特殊な場合である。

正規直交系 $\{e_\alpha\}$（$\langle e_\alpha, e_\beta\rangle = \delta_{\alpha\beta}$）が完全（closed）であるとは，$\langle f, e_\alpha\rangle = 0$ $(\forall \alpha)$ ならば $f = 0$ のことをいう。このとき，パーセバルの等式 $\|f\|^2 = \sum_\alpha |\langle f, e_\alpha\rangle|^2$ と，フーリエ展開 $f = \sum_\alpha \langle f, e_\alpha\rangle e_\alpha$（$L^2$ 収束）が成立する。

射影定理（最良近似定理）：$H$ の閉凸部分集合 $C$ に対し，任意の $f \in H$ に対して $C$ 内の最近点 $\hat{f} = \arg\min_{g \in C} \|f - g\|$ がただ一つ存在する。$C$ が閉部分空間のとき，$f - \hat{f} \perp C$（直交補空間への射影）となる。これは最小二乗近似・回帰分析・圧縮センシングの数学的基盤である。

### 線形作用素と双対性

バナッハ空間 $X$ から $Y$ への有界線形作用素 $T: X \to Y$ のノルムは $\|T\| = \sup_{\|x\| \leq 1} \|Tx\|$ で定義される。有界線形作用素全体 $B(X,Y)$ は $Y$ がバナッハ空間であればバナッハ空間をなす。$Y = \mathbb{R}$（または $\mathbb{C}$）の場合，$T$ を連続線形汎関数（continuous linear functional）といい，その全体 $X^* = B(X, \mathbb{R})$ を $X$ の双対空間（dual space）という。

リースの表現定理：ヒルベルト空間 $H$ 上の任意の連続線形汎関数 $T$ は，ある $g \in H$ によって $T(f) = \langle f, g\rangle$ と表現でき，$\|T\| = \|g\|$。

ハーン–バナッハの定理：部分空間上で定義された有界線形汎関数を，ノルムを保ったまま全体空間へ延長できる。これは双対空間が「十分豊か」であることを保証し，弱収束・弱*収束の理論，最適化の凸解析，偏微分方程式の弱解理論の基盤をなす。

### スペクトル理論

有界線形作用素 $T \in B(H)$（ヒルベルト空間）に対して，スペクトル（spectrum）$\sigma(T)$ は $(\lambda I - T)$ が可逆でない $\lambda \in \mathbb{C}$ の全体であり，レゾルベント集合は $\rho(T) = \mathbb{C} \setminus \sigma(T)$。固有値 $\lambda$（$Tx = \lambda x$ を満たす $x \neq 0$ が存在するもの）は点スペクトル $\sigma_p(T)$ に属するが，スペクトルは固有値だけからなるとは限らない（連続スペクトル・剰余スペクトルも存在する）。

自己共役作用素 $T = T^*$（$\langle Tx, y\rangle = \langle x, Ty\rangle$）に対するスペクトル定理は，有限次元の対称行列の固有値分解の無限次元版である：自己共役作用素はスペクトル測度 $E$ を用いて $T = \int_{\sigma(T)} \lambda\,dE(\lambda)$ と表現できる。コンパクト自己共役作用素（コンパクトな自己共役作用素）はヒルベルト–シュミット展開（$H$ の正規直交基底を固有関数でとれる）をもつ。これは量子力学の観測量の理論，フレドホルム積分方程式，固有値問題の数学的基礎である。

---

## 10. 偏微分方程式への応用

### 基本的な偏微分方程式

解析学の強力な応用先として，自然現象を記述する偏微分方程式（PDE）の研究がある。2階線形PDEの代表的な3類型と対応する現象を以下に示す。

熱方程式（放物型）：拡散現象を記述する：

$$\frac{\partial u}{\partial t} = \kappa\,\Delta u, \quad \Delta = \sum_{i=1}^{n}\frac{\partial^2}{\partial x_i^2}$$

$\kappa > 0$ は拡散係数，$\Delta$ はラプラシアンである。初期値 $u(x, 0) = f(x)$ に対する全空間 $\mathbb{R}^n$ 上の解は，ガウス核（熱核）との畳み込みで表される：

$$u(x,t) = \frac{1}{(4\pi\kappa t)^{n/2}}\int_{\mathbb{R}^n} e^{-|x-y|^2/(4\kappa t)} f(y)\,dy$$

波動方程式（双曲型）：弦の振動・電磁波・音波を記述する：

$$\frac{\partial^2 u}{\partial t^2} = c^2\,\Delta u$$

$c$ は波速。1次元では一般解は $u(x,t) = F(x+ct) + G(x-ct)$（ダランベールの解）で与えられる。

ラプラス方程式（楕円型）：静電ポテンシャル・定常熱分布・調和関数を記述する：

$$\Delta u = 0$$

調和関数は最大値原理（内部で最大値・最小値をとらない）を満たし，領域内部の値は境界値の平均と等しい（平均値の性質）。

### 変分法と弱解

現代的なPDE理論では，古典解（2回連続微分可能な解）が存在しない場合に備えて，弱解（weak solution）の概念が不可欠である。ポアソン方程式 $-\Delta u = f$（$f \in L^2(\Omega)$，$\Omega \subset \mathbb{R}^n$ は有界領域）を例にとると，試験関数（test function）$\varphi \in C_0^\infty(\Omega)$ との内積をとって：

$$\int_\Omega \nabla u \cdot \nabla \varphi\,dx = \int_\Omega f\varphi\,dx \quad \forall \varphi \in C_0^\infty(\Omega)$$

（部分積分とグリーンの公式 $\int_\Omega (-\Delta u)\varphi\,dx = \int_\Omega \nabla u \cdot \nabla\varphi\,dx$ を使用）。$u \in H^1_0(\Omega)$（後述のソボレフ空間）がこの等式を満たすとき，$u$ を弱解という。

### ソボレフ空間

$k$ 回弱微分（distribution意味での微分）まで可積分であるような関数のクラスをソボレフ空間 $H^k(\Omega) = W^{k,2}(\Omega)$ という：

$$H^k(\Omega) = \left\{u \in L^2(\Omega) : D^\alpha u \in L^2(\Omega),\; |\alpha| \leq k\right\}$$

内積 $\langle u, v\rangle_{H^k} = \sum_{|\alpha| \leq k} \int_\Omega D^\alpha u \cdot \overline{D^\alpha v}\,dx$ によりヒルベルト空間をなす。$H^1_0(\Omega)$ は $\Omega$ 上に台をもつ滑らかな関数の $H^1$ ノルムに関する完備化であり，境界条件 $u|_{\partial\Omega} = 0$ に対応する。

ラックス–ミルグラムの定理（Lax–Milgram theorem）：双線形形式 $a(u,v)$（有界かつ強圧的：$a(v,v) \geq \alpha\|v\|^2$，$\alpha > 0$）と連続線形汎関数 $F(v)$ に対して，$a(u,v) = F(v)$（$\forall v \in H$）を満たす $u \in H$ がただ一つ存在する。これはポアソン方程式・弾性方程式・ストークス方程式など楕円型PDEの弱解の存在・一意性を保証する基本定理である。

ソボレフの埋め込み定理（Sobolev embedding theorem）：$n$ 次元領域 $\Omega$ において，$k - n/2 > 0$ なら $H^k(\Omega) \hookrightarrow C(\bar\Omega)$（連続関数に埋め込まれる），$k < n/2$ なら $H^k(\Omega) \hookrightarrow L^{2n/(n-2k)}(\Omega)$ などの連続埋め込みが成立する。これにより弱解の正則性（regularity）を評価できる。

---

## まとめと展望

解析学は，17世紀の微分積分法の発明から始まり，19世紀のコーシー・ワイエルシュトラスによる $\varepsilon$-$\delta$ 論法の整備，デデキント・カントールによる実数論の確立，20世紀のルベーグ積分・測度論，バナッハ・ヒルベルト空間論，シュワルツの超関数・フーリエ解析，偏微分方程式のソボレフ空間論へと，連綿と発展を続けてきた数学の中核分野である。実数の完備性を出発点として構築される極限・連続・微分・積分の厳密な理論は，物理学（量子力学のヒルベルト空間・偏微分方程式），工学（信号処理のフーリエ解析・制御理論），データ科学（関数データ解析・再生核ヒルベルト空間），機械学習（最適化の解析学的基礎）まで，あらゆる科学技術の数理的基盤をなしている。

現代的な展望としては，(1) 非線形偏微分方程式（ナビエ–ストークス方程式のミレニアム問題，非線形シュレーディンガー方程式），(2) 非可換解析学（作用素代数・量子群），(3) 確率解析（伊藤積分・確率偏微分方程式），(4) 幾何学的測度論（最小曲面・カレント），(5) 機械学習への応用（関数空間上の最適化，深層学習の汎化理論，RKHS：再生核ヒルベルト空間）といった方向で研究が活発に進んでいる。解析学の言語と方法論なくして，現代数学・科学技術の深部には踏み込めない。

---

## その他参考文献

- 高木貞治「解析概論」岩波書店 (改訂第3版, 1961 / 軽装版 2010)
- 黒田成俊「関数解析」共立出版 (1980)
- 吉田耕作「関数解析」岩波書店 (初版1951, 第6版1997)
- Folland, G. B., "Real Analysis: Modern Techniques and Their Applications," (2nd ed.), Wiley (1999)
- Brezis, H., "Functional Analysis, Sobolev Spaces and Partial Differential Equations," Springer (2011)
- Evans, L. C., "Partial Differential Equations," (2nd ed.), AMS (2010)
- Stein, E. M. & Shakarchi, R., "Princeton Lectures in Analysis" (4 volumes), Princeton Univ. Press (2003–2011)
- Rudin, W., "Real and Complex Analysis," (3rd ed.), McGraw-Hill (1987)
- 猪狩惺「実解析入門」岩波書店 (1996)
- 藤田宏・黒田成俊・伊藤清三「関数解析」岩波書店 (岩波基礎数学選書, 1991)
- 宮寺功「関数解析」理工学社 (1979)
- Wikipedia「解析学」https://ja.wikipedia.org/wiki/%E8%A7%A3%E6%9E%90%E5%AD%A6
