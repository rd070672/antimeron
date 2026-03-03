# ブラケット記法の体系

ブラケット記法は、量子状態や結晶方位を簡潔に表すための「括弧の使い分け」の総称として現場で広く使われる。角括弧・丸括弧・角括弧（山括弧）・波括弧・角括弧（bracket）の役割を整理すると、式の意味を誤らずに物理量へ接続できるようになる。

## 参考ドキュメント
- ブラ-ケット記法（日本語）
  https://ja.wikipedia.org/wiki/%E3%83%96%E3%83%A9-%E3%82%B1%E3%83%83%E3%83%88%E8%A8%98%E6%B3%95
- 結晶の面と方向の記述方法（日本語）
  https://ceram.material.tohoku.ac.jp/~takamura/class/crystal/node11.html
- Lattice Planes and Miller Indices（英語）
  https://www.doitpoms.ac.uk/tlplib/miller_indices/printall.php


## 0. 用語の整理：同じ「ブラケット」でも文脈が2つある
「ブラケット記法」という語は、分野の文脈により主に次の2系統を指す。

- 量子論・線形代数：Dirac のブラ・ケット（bra-ket）記法
  - 例：状態 $|\psi\rangle$、双対ベクトル $\langle\phi|$、内積 $\langle\phi|\psi\rangle$
- 結晶学・材料組織：面と方向の括弧表記（Miller 指数を含む）
  - 例：面 $(hkl)$、方向 $[uvw]$、等価族 $\{hkl\}$、$\langle uvw\rangle$、集合組織 $\{hkl\}\langle uvw\rangle$

本稿では、まず Dirac 記法を線形代数として定式化し、その後に結晶学の括弧表記を整理し、最後に混同しやすい点をまとめる。


## 1. Dirac（ブラ・ケット）記法

### 1.1 状態は「ベクトル」であり、表示は「基底の取り方」で変わる
量子状態はヒルベルト空間 $\mathcal{H}$ のベクトルとして表される。状態の本体は $|\psi\rangle$ であり、座標表示（波動関数）$\psi(x)$ は基底 $|x\rangle$ を選んだときの成分にすぎない。

$$
\psi(x)=\langle x|\psi\rangle
$$

固体物理では、座標基底だけでなく、Bloch 基底、原子軌道基底、Wannier 基底など複数の基底が日常的に現れるため、「状態そのもの」と「表示」を区別できる Dirac 記法は特に相性がよい。

### 1.2 ket と bra：双対空間と随伴
ket は $\mathcal{H}$ のベクトル、bra は双対空間 $\mathcal{H}^*$(厳密には共役双対) の線形汎関数である。ket $|\psi\rangle$ に対応する bra は随伴（共役転置）で

$$
|\psi\rangle \ \mapsto\ \langle\psi|,\qquad
\langle\psi| = (|\psi\rangle)^\dagger
$$

と書かれる。有限次元で基底を固定すれば、ket は列ベクトル、bra は行ベクトルとして具体化される。

### 1.3 内積と正規化：$\langle\phi|\psi\rangle$ の意味
内積は bra が ket に作用した複素数である。

$$
\langle\phi|\psi\rangle \in \mathbb{C}
$$

量子力学の慣習として、内積は一般に ket 側に線形、bra 側に共役線形で扱われる（数学の流儀と逆になる場合がある）。この選択により

$$
\langle\phi|\psi\rangle = \langle\psi|\phi\rangle^*,\qquad
\langle\psi|\psi\rangle \ge 0
$$

が自然に実装される。正規化は

$$
\langle\psi|\psi\rangle = 1
$$

である。固体計算では、規格化は波動関数の比較や投影、DOS・PDOS の定義、Wannier 化の安定性などに直結する。

### 1.4 直交基底と完全性：恒等演算子
固有状態や基底 $\{|n\rangle\}$ が直交規格化されているとき、

$$
\langle m|n\rangle = \delta_{mn}
$$

である。さらに完全性（完備性）は恒等演算子 $\hat{I}$ の分解として

$$
\sum_n |n\rangle\langle n| = \hat{I}
$$

と書ける。連続基底 $|x\rangle$ の場合は

$$
\int |x\rangle\langle x|\,dx=\hat{I},\qquad
\langle x|x'\rangle=\delta(x-x')
$$

となり、デルタ関数が「連続基底の直交性」を支える。

### 1.5 演算子：測定量・ハミルトニアン・期待値
物理量は演算子 $\hat{A}$ として表される。期待値は

$$
\langle \hat{A}\rangle_\psi = \langle\psi|\hat{A}|\psi\rangle
$$

である。固体物理で頻出する具体例を挙げる。

- 固有値問題（バンド計算の骨格）
$$
\hat{H}|n\mathbf{k}\rangle = \varepsilon_{n\mathbf{k}}|n\mathbf{k}\rangle
$$

- 射影（局在軌道や原子成分への分解、PDOS の考え方）
$$
\hat{P}_\alpha = |\alpha\rangle\langle\alpha|,\qquad
w_\alpha = \langle\psi|\hat{P}_\alpha|\psi\rangle = |\langle\alpha|\psi\rangle|^2
$$

- 交換・反交換（スピン、量子輸送、第二量子化で頻出）
$$
[\hat{A},\hat{B}] = \hat{A}\hat{B}-\hat{B}\hat{A},\qquad
\{\hat{A},\hat{B}\} = \hat{A}\hat{B}+\hat{B}\hat{A}
$$

ここで角括弧 $\langle\cdot\rangle$ は期待値の意味にも使われるため、「$\langle\phi|\psi\rangle$（内積）」と「$\langle\hat{A}\rangle$（期待値）」を式の形で見分ける必要がある。

### 1.6 行列要素：$\langle i|\hat{A}|j\rangle$ は「基底で見た成分」
基底 $\{|i\rangle\}$ における演算子の成分は

$$
A_{ij}=\langle i|\hat{A}|j\rangle
$$

である。したがって、固体電子論でしばしば現れる

- 軌道間 SOC 行列要素（例：$\langle d_{xy}|\hat{L}_z|d_{yz}\rangle$）
- タイトバインディングのホッピング（例：$t_{ij}=\langle i|\hat{H}|j\rangle$）
- Green 関数成分（例：$G_{ij}(E)=\langle i|(E+i\eta-\hat{H})^{-1}|j\rangle$）

はいずれも「基底で見た成分」という同じ意味を共有する。記号が変わっても、Dirac 記法は線形代数として統一される。

### 1.7 状態記法の基本
固体での代表例をまとめる。

- Bloch 状態
$$
|n\mathbf{k}\rangle,\qquad
\langle n\mathbf{k}|m\mathbf{k}'\rangle=\delta_{nm}\,\delta_{\mathbf{k}\mathbf{k}'}
$$

- 位置基底と局在基底（原子軌道・Wannier）
$$
| \mathbf{r}\rangle,\quad | \mathbf{R}\alpha\rangle,\quad
\langle \mathbf{r}|\mathbf{R}\alpha\rangle = w_\alpha(\mathbf{r}-\mathbf{R})
$$

- 期待値・射影は同じ形で書ける
$$
\langle\psi|\hat{A}|\psi\rangle,\qquad
\langle\psi|\hat{P}_\alpha|\psi\rangle
$$

この統一性により、第一原理計算の出力（波動関数、射影、行列要素）と、モデル（TB、スピン模型、応答理論）を同じ言語で接続できる。

### 1.8 誤りやすい点
1. $\langle\phi|\psi\rangle$ の複素共役を落とす  
   $\langle\psi|\phi\rangle$ は一般に $\langle\phi|\psi\rangle$ と等しくなく、$\langle\psi|\phi\rangle=\langle\phi|\psi\rangle^*$ である。

2. 内積の「線形側」の流儀を混同する  
   文献により、どちらの引数が線形かの約束が異なる。記号の変換だけでなく、共役の位置で齟齬が出る。

3. $\langle x|\psi\rangle$ を「ただの記号」とみなして演算の意味を失う  
   $\langle x|$ は汎関数であり、$\langle x|\psi\rangle$ は成分である。$\int |x\rangle\langle x|dx=\hat{I}$ と合わせて理解すると破綻しにくい。

---

## 2. 結晶学の括弧表記

### 2.1 なぜ括弧が必要か
結晶では、同じ数字列でも「面」と「方向」で意味が変わる。そこで括弧の種類で区別する。

| 記法 | 意味 | 例 | 説明 |
|---|---|---|---|
| $(hkl)$ | 特定の結晶面（格子面） | $(111)$ | 1枚の面（厳密にはその面に平行な面の集合として扱うことが多い） |
| $\{hkl\}$ | 等価な面の族 | $\{111\}$ | 対称操作で移り合う面の集合 |
| $[uvw]$ | 特定の結晶方向 | $[110]$ | 格子ベクトル $\mathbf{R}=u\mathbf{a}+v\mathbf{b}+w\mathbf{c}$ の方向 |
| $\langle uvw\rangle$ | 等価な方向の族 | $\langle 110\rangle$ | 対称性で等価な方向の集合 |

この括弧表記は、回折指数、すべり系、集合組織、界面方位関係など多くの議論の土台である。

### 2.2 方向 $[uvw]$ と面 $(hkl)$ の幾何学
面指数 $(hkl)$ は、逆格子ベクトル

$$
\mathbf{G}_{hkl}=h\mathbf{b}_1+k\mathbf{b}_2+l\mathbf{b}_3
$$

に対応し、面の法線方向を表す（一般の結晶系で重要である）。回折条件は Bragg の式

$$
2d\sin\theta = n\lambda
$$

で与えられ、面間隔 $d$ は結晶系と $(hkl)$ に依存して決まる。立方晶では

$$
d_{hkl}=\frac{a}{\sqrt{h^2+k^2+l^2}}
$$

がよく用いられる。

一方、方向指数 $[uvw]$ は実格子ベクトル方向であり、長さや直交性は格子定数と結晶系に依存する。立方晶では扱いが単純になり、

- $(hkl)$ の法線は $[hkl]$ と平行
- 指数の入れ替え・符号反転が対称性で等価になりやすい

という性質が成立する。しかし、一般の結晶系では $(hkl)$ と $[hkl]$ を同一視すると誤りになる。

### 2.3 等価族の意味：$\{hkl\}$ と $\langle uvw\rangle$
等価族は「対称性で見分けられない対象の集合」である。たとえば立方晶で $\{100\}$ は $(100),(010),(001)$ などを含む。方向も同様に $\langle 111\rangle$ は $[111],[\bar{1}11],[1\bar{1}1],\dots$ をまとめた表記である。

この族表記は以下の場面で効く。

- すべり系：面の族 $\{hkl\}$ と方向の族 $\langle uvw\rangle$ の組で記す  
  例：FCC の基本として $\{111\}\langle 110\rangle$、BCC の基本として $\{110\}\langle 111\rangle$ など
- 集合組織（texture）：板面と圧延方向を同時に指定する  
  例：$\{hkl\}\langle uvw\rangle$ の形で「面が材料法線に、方向が圧延方向に揃う」ような表現が現れる

### 2.4 六方晶の4指数表記：$(hkil)$ と $[uvtw]$
六方晶系では、対称性を反映して4指数で表す流儀が広く使われる。面指数は

$$
(hkil),\qquad i=-(h+k)
$$

方向指数は

$$
[uvtw],\qquad t=-(u+v)
$$

の制約を満たす。3指数に無理に押し込めるよりも、対称性と等価性が見通しよくなる。

### 2.5 誤りやすい点
1. $(hkl)$ と $[hkl]$ の同一視  
   立方晶では見かけ上一致しやすいが、一般には別概念である。

2. $\{hkl\}$ と $(hkl)$ の混同  
   前者は族、後者は1つの面である。すべり系や集合組織では族が本体になることが多い。

3. 指数の「最小整数」の約束を忘れる  
   $[222]$ と $[111]$ は同一直線方向であるが、通常は最小整数比で表す。


## 3. 2種類の「ブラケット」を混同しないための対応表

| 文脈 | 代表記号 | 対象 | 基本の意味 |
|---|---|---|---|
| Dirac 記法 | $|\psi\rangle,\ \langle\phi|$ | 状態と双対 | ベクトルとその随伴 |
| Dirac 記法 | $\langle\phi|\psi\rangle$ | 内積 | 重なり（複素数） |
| Dirac 記法 | $\langle\psi|\hat{A}|\psi\rangle$ | 期待値 | 測定量の平均 |
| 結晶学 | $(hkl),\ \{hkl\}$ | 面（族） | 格子面・等価面 |
| 結晶学 | $[uvw],\ \langle uvw\rangle$ | 方向（族） | 格子方向・等価方向 |

重要なのは、角括弧 $\langle \ \rangle$ が「量子の内積・期待値」にも、「結晶方向の族」にも使われる点である。角括弧だけを見て意味を決めず、周囲の記号（$|\ \rangle$ があるか、指数が整数列だけか、演算子 $\hat{A}$ が挟まるか）で判断するのがよい。

## 関連研究
1. Bra–ket notation（英語）
   https://en.wikipedia.org/wiki/Bra%E2%80%93ket_notation
2. Miller index（英語）
   https://en.wikipedia.org/wiki/Miller_index
3. Slip (materials science)（英語）
   https://en.wikipedia.org/wiki/Slip_%28materials_science%29

## まとめ
ブラケット記法は、量子論では「状態・双対・内積・演算子」を線形代数として統一的に扱う言語であり、固体のバンド・射影・行列要素・応答理論まで同じ形で書ける強みをもつ。一方、結晶学では括弧の種類で「面・方向・等価族」を峻別し、回折や塑性、集合組織の議論を破綻なく進めるための表記体系である。両者は同じ括弧を用いても対象が異なるため、$|\ \rangle$ の有無、指数の形、演算子の挿入の有無で意味を見分けるのが要点である。
