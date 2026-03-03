# 選択則とClebsch–Gordan係数

XMCD（X線磁気円二色性）は、円偏光X線が持つ角運動量が電子系の角運動量自由度へどのように結合するかを、吸収強度差として観測する分光である。Clebsch–Gordan（CG）係数は、その結合の許容条件と重み付けを与えるため、XMCDの背骨をなす量である。

## 参考ドキュメント
1. B. T. Thole et al., X-ray circular dichroism as a probe of orbital magnetization, Physical Review Letters 68, 1943 (1992)
   https://link.aps.org/doi/10.1103/PhysRevLett.68.1943
2. P. Carra et al., X-ray circular dichroism and local magnetic fields, Physical Review Letters 70, 694 (1993)
   https://link.aps.org/doi/10.1103/PhysRevLett.70.694
3. SPring-8 夏の学校 実習資料：軟X線磁気円二色性分光（MCD） ビームライン BL23SU（日本語, PDF）
   https://www.spring8.or.jp/ext/ja/sp8summer_school/sp8ss2004/sp8ss2004doc/jisshu23su.pdf

## 1. Clebsch–Gordan係数がXMCDの中心になる理由

XMCDの観測量は、右円偏光と左円偏光での吸収係数の差
$$
\Delta\mu(\omega)=\mu_{+}(\omega)-\mu_{-}(\omega)
$$
である。差が生まれる根源は、円偏光が光子の角運動量射影 $q=\pm1$ を持ち、電気双極子遷移が階数1の球面テンソル $T^{(1)}_{q}$ として作用する点にある。つまり、偏光の切り替えは $q$ の切り替えであり、どの $q$ がどの初期状態からどの終状態へ結合するかがそのまま強度差に現れる。

この「結合の振幅」を角運動量量子数で体系的に与えるのがCG係数（あるいは等価なWignerの $3j$ 記号）である。XMCDの総和則（sum rules）がスペクトル積分から軌道角運動量 $\langle L_{z}\rangle$ やスピン角運動量 $\langle S_{z}\rangle$ を取り出せるのも、$L_{2,3}$ 端（$2p_{1/2},2p_{3/2}$）に現れる角運動量チャネルの重みがCG係数で完全に整理できるからである。

## 2. CG係数の定義と意味

### 2.1 結合基底と直積基底

2つの角運動量 $\mathbf{J}_{1},\mathbf{J}_{2}$ の合成 $\mathbf{J}=\mathbf{J}_{1}+\mathbf{J}_{2}$ を考える。直積基底
$$
|j_{1}m_{1}\rangle\otimes|j_{2}m_{2}\rangle
$$
と、結合基底
$$
|JM\rangle
$$
は同一空間の基底であり、変換係数がCG係数である：
$$
|JM\rangle=\sum_{m_{1},m_{2}}|j_{1}m_{1}\rangle|j_{2}m_{2}\rangle\langle j_{1}m_{1}\,j_{2}m_{2}|JM\rangle .
$$

XMCDでは、コア準位でのスピン–軌道結合（$l$ と $s$ の合成）や、光子の $q$ が電子の $m$ 変化に対応する点が本質であり、CG係数は「基底変換」ではなく「遷移確率の係数」として観測量に直結する。

### 2.2 非ゼロ条件（選択則）

CG係数が非ゼロとなるための条件は、少なくとも次を満たす：

- 射影の保存：$m_{1}+m_{2}=M$
- 三角条件：$|j_{1}-j_{2}|\le J\le j_{1}+j_{2}$
- 範囲：$-j\le m\le j$

これらが、XMCDで用いる許容遷移の「最小の地図」を与える。

### 2.3 $3j$ 記号との関係

CG係数は $3j$ 記号と等価であり、
$$
\langle j_{1}m_{1}\,j_{2}m_{2}|JM\rangle
=
(-1)^{j_{1}-j_{2}+M}\sqrt{2J+1}
\begin{pmatrix}
j_{1} & j_{2} & J\\
m_{1} & m_{2} & -M
\end{pmatrix}
$$
で結ばれる。XMCDの導出では $3j$ 記号の形で現れることが多いが、意味はCG係数と同一である。

## 3. 具体例：$l=1$ と $s=1/2$ の合成（$2p$ コア準位）

$L_{2,3}$ 端は、$2p$ コアホールのスピン–軌道分裂により $j=3/2$ と $j=1/2$ に分かれる。これは量子数の合成
$$
\mathbf{j}=\mathbf{l}+\mathbf{s},\quad l=1,\ s=\frac{1}{2}
$$
であり、結合基底 $|j m_{j}\rangle$ を直積基底 $|l m\rangle|s m_{s}\rangle$ へ展開する係数がCG係数である。

以下は代表的な展開（規約により位相は変わり得るが、振幅の二乗が与える重み構造は不変である）：

- $j=3/2$ の例
$$
\left|\frac{3}{2},\frac{3}{2}\right\rangle=\left|1,1\right\rangle\left|\frac{1}{2},\frac{1}{2}\right\rangle,
$$
$$
\left|\frac{3}{2},\frac{1}{2}\right\rangle=\sqrt{\frac{2}{3}}\left|1,0\right\rangle\left|\frac{1}{2},\frac{1}{2}\right\rangle+\sqrt{\frac{1}{3}}\left|1,1\right\rangle\left|\frac{1}{2},-\frac{1}{2}\right\rangle.
$$

- $j=1/2$ の例
$$
\left|\frac{1}{2},\frac{1}{2}\right\rangle=\sqrt{\frac{1}{3}}\left|1,0\right\rangle\left|\frac{1}{2},\frac{1}{2}\right\rangle-\sqrt{\frac{2}{3}}\left|1,1\right\rangle\left|\frac{1}{2},-\frac{1}{2}\right\rangle.
$$

この展開が示すのは、同じ $m_{j}$ を持っていても $j$ が異なると $(m,m_{s})$ 成分の混ざり方が異なり、したがって円偏光（$q$）で選ばれる遷移チャネルの重みが異なる、という事実である。XMCDの $L_3$ と $L_2$ が異なる符号・強度・線形結合を示すのは、この重みの差が出発点となる。

## 4. CG係数が強度を決める

### 4.1 吸収の基本式

XASの吸収係数は、双極子相互作用に対する遷移率として
$$
\mu(\omega)\propto \sum_{f}\left|\langle f|\mathbf{\epsilon}\cdot\mathbf{r}|i\rangle\right|^{2}\delta(E_{f}-E_{i}-\hbar\omega)
$$
と表される。XMCDは、偏光 $\mathbf{\epsilon}$ を円偏光として切り替え、差 $\Delta\mu(\omega)$ を観測する。

### 4.2 変換：双極子演算子を球面テンソルで書く

双極子演算子は球面テンソルとして
$$
\mathbf{\epsilon}\cdot\mathbf{r}\ \longrightarrow\ \sum_{q=0,\pm1}\epsilon_{q}\,T^{(1)}_{q}
$$
と書ける。円偏光は基本的に $q=\pm1$ 成分を選ぶ。

### 4.3 Wigner–Eckart定理と $3j$ 記号

角運動量固有状態 $|j m\rangle$ に対し、
$$
\langle j_{f}m_{f}|T^{(1)}_{q}|j_{i}m_{i}\rangle
=
(-1)^{j_{f}-m_{f}}
\begin{pmatrix}
j_{f} & 1 & j_{i}\\
-m_{f} & q & m_{i}
\end{pmatrix}
\langle j_{f}\|T^{(1)}\|j_{i}\rangle
$$
である。ここで

- 還元行列要素 $\langle j_{f}\|T^{(1)}\|j_{i}\rangle$ は動径積分などの大きさを担う
- $3j$ 記号（すなわちCG係数）が角度因子として $m$ と $q$ の結合強度を与える

したがって、右円偏光と左円偏光の差は、占有数やスピン分極・軌道分極と、CG係数が与える角度因子の組合せとして定量化される。

## 5. 光子のヘリシティが何を選ぶか

### 5.1 選択則

球面テンソル $T^{(1)}_{q}$ により、射影量子数は
$$
m_{f}=m_{i}+q
$$
で結ばれる（許容範囲内）。つまり $q=+1$ と $q=-1$ は異なる $m$ チャネルを駆動し、磁化による占有不均衡があると吸収が非対称になりXMCDが生じる。

### 5.2 $2p\rightarrow 3d$（$L_{2,3}$ 端）

遷移金属の軟X線XMCDでは $2p(l=1)\rightarrow 3d(l=2)$ が主であり、双極子選択則 $\Delta l=+1$ が効く。ここで重要なのは、初期状態がすでに $|l s; j m_{j}\rangle$ の結合状態であり、その内部構造（$(m,m_{s})$ の混ざり）がCG係数で与えられる点である。円偏光は $q$ を固定し、$m$ チャネルの重みを変え、結果として $L_3$（$j=3/2$）と $L_2$（$j=1/2$）のXMCDが異なる振る舞いとなる。

## 6. 総和則におけるCG係数の直交性

XMCDの強みは、スペクトルのエネルギー積分が基底状態の角運動量期待値へ結びつく点にある。総和則（sum rules）の成立は、各エッジに含まれる遷移チャネルをCG係数で分解し、終状態の和（あるいはエネルギー積分）を取ったときに、CG係数の直交性によって角度因子が整理されることに基づく。

### 6.1 軌道角運動量の総和則

$L_{2,3}$ 端全体でのXMCD積分は、$d$ 空孔数 $n_{h}$ と軌道角運動量射影に比例する：
$$
\int_{L_{2}+L_{3}}\Delta\mu(\omega)\,d\omega\ \propto\ n_{h}\langle L_{z}\rangle .
$$
比例係数は規格化や定義に依存するが、なぜ $L_2+L_3$ の和で軌道成分が出るかは、角運動量チャネルの足し上げがCG係数の恒等関係で整理されるためである。

### 6.2 スピン角運動量の総和則と $T_{z}$

スピン成分は $L_3$ と $L_2$ の異なる重み付き結合で現れ、低対称場では磁気双極子項 $\langle T_{z}\rangle$ が加わる：
$$
\int_{L_{3}}\Delta\mu(\omega)\,d\omega
-
c\int_{L_{2}}\Delta\mu(\omega)\,d\omega
\ \propto\ 
n_{h}\left(\langle S_{z}\rangle+\alpha\langle T_{z}\rangle\right).
$$
係数 $c,\alpha$ の起源は、$2p_{3/2}$ と $2p_{1/2}$ の内部構造をCG係数で展開し、許容遷移の重みを集計する点にある。

### 6.3 直交性

CG係数には $m$ に関する直交性があり、概念的には
$$
\sum_{m_{1},m_{2}}
\langle j_{1}m_{1}\,j_{2}m_{2}|JM\rangle
\langle j_{1}m_{1}\,j_{2}m_{2}|J'M'\rangle
=
\delta_{JJ'}\delta_{MM'}
$$
のように表される。総和則では、この直交性が「積分で閉じる」理由として働き、観測量が角運動量期待値へ落ちる。

## 7. CG係数の対応表

| 要素 | 量子数・記号 | XMCDでの役割 | CG係数が現れる場所 |
|---|---|---|---|
| 光子（円偏光） | $q=\pm1$ | 角運動量射影の供給 | $T^{(1)}_{q}$ の成分選択 |
| コア準位 | $｜l s; j m_{j}\rangle$ | $L_{2,3}$ 分裂 | $l$ と $s$ の合成（CG） |
| 双極子遷移 | $\Delta l=\pm1,\ \Delta m=q$ | 許容遷移の選別 | $3j$（=CG）で角度因子 |
| 空孔（終状態の数） | $n_{h}$ | 総和則の比例因子 | 終状態和で直交性が効く |
| 観測量 | $\Delta\mu(\omega)$ | 円偏光差スペクトル | $q$ の非対称性が強度差へ |

この表の見通しは、XMCDの元素選択性や $L_{2,3}$ の役割を、角運動量結合の言葉だけで整理できることを示す。

## 8. 符号・係数の変化

XMCDの式は、文献や装置で符号や定数が変わって見えることがある。主な理由は次である：

- 右円偏光／左円偏光の位相規約の違い（$q$ の対応が入れ替わる場合がある）
- 差の定義 $\Delta\mu$ の取り方（$\mu_{+}-\mu_{-}$ か $\mu_{-}-\mu_{+}$ か）
- 磁化方向と入射方向の幾何（観測されるテンソル成分が変わる）
- 積分範囲や背景除去の流儀の違い（面積の定義差）

これらはCG係数の内容を変えるものではなく、「観測量の定義」と「幾何の翻訳」を変えるものである。翻訳が統一されれば、角運動量代数としての骨格は一貫する。

## まとめ

Clebsch–Gordan係数は、XMCDを「吸収差の現象」ではなく「角運動量結合の分光」として理解するための中心道具である。コア準位の $j$ 分裂、円偏光の $q=\pm1$、双極子遷移の角度因子、そして総和則による $\langle L_{z}\rangle$・$\langle S_{z}\rangle$ の抽出は、いずれもCG係数が与える角運動量代数により統一的に整理されるのである。

## 関連研究
- 山崎勝義, Clebsch-Gordan 係数と射影演算子（日本語, PDF）
  https://www.molsci.jp/wp-content/uploads/AC0002.pdf
- PubMed: Thole (1992) の書誌情報
  https://pubmed.ncbi.nlm.nih.gov/10045260/
- PubMed: Carra (1993) の書誌情報
  https://pubmed.ncbi.nlm.nih.gov/10054179/
- ADS: Thole (1992) のアブストラクト
  https://ui.adsabs.harvard.edu/abs/1992PhRvL..68.1943T/abstract
- ADS: Carra (1993) のアブストラクト
  https://ui.adsabs.harvard.edu/abs/1993PhRvL..70..694C/abstract
