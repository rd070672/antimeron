# スピンを理解する
スピンは、粒子や励起が空間回転・ローレンツ変換に対してどう変換されるかを表す表現論的ラベルであり、同時に量子情報でいう最小の二準位自由度（量子ビット）としても機能する。場の量子論では、スピンは場の種類（スカラー場・スピノル場・ベクトル場など）を決め、相互作用頂点の許され方、統計性、散乱振幅のテンソル構造を支配する。


## 1. 回転とスピン
### 1.1 回転群 SO(3) と被覆群 SU(2)
三次元空間の回転は群 SO(3) で記述されるが、量子状態は位相を含むため「射影表現」が自然に現れる。SO(3) の射影表現は、その二重被覆である SU(2) の通常表現として実現される。

SU(2) のリー代数は
$$
[J_i, J_j] = i\hbar\,\epsilon_{ijk} J_k
$$
で与えられ、これは角運動量代数である。不可約表現は量子数 $j=0,\frac12,1,\frac32,\dots$ で分類され、$2j+1$ 次元の表現空間を持つ。

スピン $1/2$ は最小の非自明表現であり、回転演算子は
$$
U(R) = \exp\!\left(-\frac{i}{\hbar}\,\boldsymbol{\theta}\cdot\mathbf{S}\right),
\qquad
\mathbf{S}=\frac{\hbar}{2}\boldsymbol{\sigma}
$$
で表される。ここで $\boldsymbol{\sigma}$ はパウリ行列である。

SU(2) が二重被覆であることの物理的帰結として、$2\pi$ 回転で
$$
U(2\pi)= -\mathbb{I}
$$
となり、スピノルは符号反転する。ただし観測確率は位相に依らないため単独の粒子では直接見えにくく、干渉（例えばスピノルの幾何学位相）で現れる。

### 1.2 角運動量としてのスピン
スピンは「空間回転に対する内部自由度の角運動量」である。量子力学では、回転の生成子が角運動量であり、軌道角運動量 $\mathbf{L}$ とスピン角運動量 $\mathbf{S}$ はそれぞれ
$$
[L_i,L_j]=i\hbar\epsilon_{ijk}L_k,\quad
[S_i,S_j]=i\hbar\epsilon_{ijk}S_k,\quad
[L_i,S_j]=0
$$
を満たし、全角運動量
$$
\mathbf{J}=\mathbf{L}+\mathbf{S}
$$
が回転の生成子となる。

はしご演算子 $J_\pm=J_x\pm iJ_y$ を用いると
$$
J_\pm |j,m\rangle = \hbar\sqrt{j(j+1)-m(m\pm 1)}\,|j,m\pm 1\rangle
$$
であり、$m=-j,-j+1,\dots,j$ が許される。



## 2. 空間自由度と内部自由度
### 2.1 スピン自由度を持つ波動関数
スピンを含む単粒子状態は、位置 $\mathbf{r}$ とスピン添字 $a$ を持つスピノル波動関数
$$
\psi_a(\mathbf{r}) \in \mathbb{C}^{2s+1}
$$
で表される。スピン $1/2$ では
$$
\psi(\mathbf{r})=
\begin{pmatrix}
\psi_\uparrow(\mathbf{r})\\
\psi_\downarrow(\mathbf{r})
\end{pmatrix}
$$
である。ヒルベルト空間は直積
$$
\mathcal{H}=\mathcal{H}_{\mathrm{space}}\otimes \mathcal{H}_{\mathrm{spin}}
$$
として整理され、空間部分と内部部分の分離が明確になる。

### 2.2 磁場との結合とパウリ方程式
非相対論的極限でスピンを導入すると、ハミルトニアンに
$$
H = \frac{1}{2m}\left(\mathbf{p}-q\mathbf{A}\right)^2 + q\phi - \boldsymbol{\mu}\cdot\mathbf{B}
$$
が現れる。電子の磁気モーメントは
$$
\boldsymbol{\mu} = g\frac{q}{2m}\mathbf{S}
$$
で与えられ、$g\simeq 2$ が基本である。ここにスピンは、空間運動とは独立な内部角運動量として登場する。



## 3. スピン加法と多体系
### 3.1 二つのスピンの合成
二つのスピン $\mathbf{S}_1,\mathbf{S}_2$ の合成は
$$
\mathbf{S}=\mathbf{S}_1+\mathbf{S}_2
$$
で行い、表現の直積分解
$$
j_1\otimes j_2 = \bigoplus_{J=|j_1-j_2|}^{j_1+j_2} J
$$
に従う。例えば $1/2\otimes 1/2=0\oplus 1$ であり、基底として
- 一重項（シングレット） $|0,0\rangle$
- 三重項（トリプレット） $|1,1\rangle,|1,0\rangle,|1,-1\rangle$
が現れる。

シングレットは
$$
|\Psi^{-}\rangle=\frac{1}{\sqrt{2}}\left(|\uparrow\downarrow\rangle-|\downarrow\uparrow\rangle\right)
$$
であり、量子情報の最大エンタングル状態の代表である。

### 3.2 対称性と統計性
同種粒子の全波動関数は交換に対して
- フェルミオン：反対称
- ボソン：対称
でなければならない。スピンがあると、空間部分とスピン部分の対称性の組合せが問題になる。例えば二電子では、スピン一重項なら空間部は対称、スピン三重項なら空間部は反対称となり、これは結合状態や交換相互作用の起源として現れる。



## 4. 相対論とスピン
### 4.1 ローレンツ群とスピノル
相対論的対称性はローレンツ群 SO(1,3) で記述される。量子論では、その被覆群 SL(2,$\mathbb{C}$) の表現が本質である。スピノルは SL(2,$\mathbb{C}$) の基本表現として現れ、ディラック場は左右ワイルスピノルの直和として
$$
\psi =
\begin{pmatrix}
\psi_L\\
\psi_R
\end{pmatrix}
$$
と書ける。

### 4.2 ディラック方程式とスピン
自由ディラック方程式
$$
(i\gamma^\mu\partial_\mu - m)\psi = 0
$$
は、スピン $1/2$ を相対論と両立させた基本方程式である。電磁場との最小結合 $\partial_\mu\to D_\mu=\partial_\mu+iqA_\mu$ を施し、非相対論的極限をとると、パウリ項やスピン軌道相互作用が自然に導かれる。

スピン軌道相互作用は概念的に、粒子の静止系で見える電場がローレンツ変換により有効磁場に見え、そこにスピン磁気モーメントが結合することに由来する。さらにトーマス歳差が補正として入る。

### 4.3 ウィグナー分類とリトル群
場の量子論の深い理解では、スピンは「ポアンカレ群の既約表現のラベル」である。ポアンカレ群のカシミールは
$$
P^\mu P_\mu = m^2,\qquad
W^\mu W_\mu = -m^2 s(s+1)
$$
であり、$W^\mu$ はパウリ＝ルバンスキー擬ベクトル
$$
W^\mu = \frac{1}{2}\epsilon^{\mu\nu\rho\sigma}P_\nu M_{\rho\sigma}
$$
である。ここで $M_{\rho\sigma}$ はローレンツ変換の生成子である。

- 質量あり：リトル群は SU(2) で、$s$ が通常のスピンとなる。
- 質量なし：リトル群は ISO(2) となり、物理的自由度はヘリシティ $h$（運動量方向への角運動量射影）で分類される。



## 5. 場の量子論でのスピン
### 5.1 場の変換性としてのスピン
場 $\Phi(x)$ はローレンツ変換 $\Lambda$ に対し
$$
U(\Lambda)\,\Phi_a(x)\,U(\Lambda)^{-1}
= {D(\Lambda)_a}^{b}\,\Phi_b(\Lambda^{-1}x)
$$
と変換する。$D(\Lambda)$ の表現が場のスピンを決める。

- スカラー場 $\phi$：$D(\Lambda)=1$（スピン0）
- ディラック場 $\psi$：スピノル表現（スピン1/2）
- ベクトル場 $A^\mu$：4元ベクトル表現（スピン1の物理自由度はゲージ条件で抽出される）
- テンソル場：多重指数を持ち、高スピン成分を含む

### 5.2 生成消滅演算子とスピン
自由場はモード展開され、スピン添字が生成消滅演算子に付く。ディラック場の例では
$$
\psi(x)=\sum_s\int\frac{d^3p}{(2\pi)^3}\frac{1}{\sqrt{2E_{\mathbf{p}}}}
\left(
b_{\mathbf{p}s}\,u(\mathbf{p},s)e^{-ip\cdot x}
+
d^\dagger_{\mathbf{p}s}\,v(\mathbf{p},s)e^{ip\cdot x}
\right)
$$
であり、$s$ がスピン（あるいはヘリシティ）である。

スピンは単なる添字ではなく、相互作用頂点でのローレンツ共変な縮約構造を規定する。例えば量子電磁力学の相互作用
$$
\mathcal{L}_{\mathrm{int}} = -q\,\bar{\psi}\gamma^\mu\psi\,A_\mu
$$
はスピノルとベクトルのローレンツ指標の縮約を含み、許される相互作用の形は表現論でほぼ決まる。

### 5.3 スピン統計定理
相対論的局所量子場理論では、ローレンツ不変性と因果律（空間的に分離した演算子の可換性）などの条件の下で
- 半整数スピンはフェルミ統計
- 整数スピンはボース統計
が要請される。これは「スピンは統計性を決める」という強い制約であり、多体系物性の根幹（パウリ原理、フェルミ面、超流動など）につながる。



## 6. 多脚場、多脚相関関数、散乱振幅
### 6.1 多脚という言葉の二つの意味
多脚という語は文脈によって少なくとも二通りに解釈できる。

1つ目は、多脚相関関数（$n$点関数）としての意味である。場の期待値
$$
G^{(n)}(x_1,\dots,x_n)=\langle 0|T\{\Phi(x_1)\cdots \Phi(x_n)\}|0\rangle
$$
は、散乱過程や応答関数の母体であり、外部脚（external legs）に相当する点が $n$ 個あるという意味で多脚である。

2つ目は、多重指数を持つ場（多脚のテンソル場）としての意味である。例えば対称テンソル場 $h_{\mu\nu}$ は二本のローレンツ指数を持ち、スピン2成分を含む。スピン $s$ を共変に扱うには、一般に複数の指標や制約条件（トレースレス、横条件、ゲージ冗長性）を必要とする。

### 6.2 散乱振幅におけるスピン
散乱計算では外部脚に対応する波動関数（スピノル $u,v$、偏極ベクトル $\epsilon^\mu$ など）を付ける。スピン1の偏極ベクトルは運動量 $p^\mu$ に対して
$$
p_\mu \epsilon^\mu(p,\lambda)=0
$$
を満たし、ゲージ不変性により
$$
\epsilon^\mu \to \epsilon^\mu + \alpha\, p^\mu
$$
の自由度がある（ワード恒等式）。物理的自由度は質量ありなら $2s+1=3$、質量なしならヘリシティ $\lambda=\pm1$ の2自由度となる。

多脚振幅では、ローレンツ共変性とゲージ不変性が「許されるテンソル構造」を強く制限し、スピンは振幅の形そのものを規定する。近年のスピノル・ヘリシティ形式では、スピンの情報をヘリシティ振幅として整理し、計算を劇的に単純化できる場面が多い。


## 7. 自発的対称性の破れとスピン
### 7.1 回転対称性の自発的破れとマグノン
強磁性体では、交換相互作用によりスピンが整列し、連続回転対称性（近似的に SU(2)）が自発的に破れる。その結果、ゴールドストーン励起としてスピン波（マグノン）が現れる。

ハイゼンベルグ模型
$$
H = -\sum_{\langle ij\rangle} J_{ij}\,\mathbf{S}_i\cdot\mathbf{S}_j
$$
では、基底状態がある方向に整列することで対称性が破れ、低エネルギーでは長波長の回転が弱いエネルギーコストで励起される。反強磁性ではネール秩序が成立し、同様にスピン波が現れるが分散や対称性の扱いが異なる。

### 7.2 スピン軌道相互作用と対称性の低下
スピン軌道相互作用は「スピン空間の回転」と「実空間の回転」を結びつけ、純粋な SU(2) 対称性を一般に破る。これにより
- 磁気異方性
- Dzyaloshinskii–Moriya 相互作用
- スピンホール効果などの輸送現象
が現れ、スピンは内部自由度であると同時に空間と不可分の自由度となる。


## 8. 量子情報としてのスピン
### 8.1 スピン1/2とブロッホ球
スピン1/2 の純粋状態は
$$
|\psi\rangle = \cos\frac{\theta}{2}\,|\uparrow\rangle + e^{i\phi}\sin\frac{\theta}{2}\,|\downarrow\rangle
$$
と書け、ブロッホ球の点 $(\theta,\phi)$ に対応する。密度行列は
$$
\rho=\frac{1}{2}\left(\mathbb{I}+\mathbf{r}\cdot\boldsymbol{\sigma}\right)
$$
で表され、$\mathbf{r}$ がブロッホベクトルである。

スピン測定は射影測定として
$$
P(\pm)=\mathrm{Tr}\left(\rho\,\frac{1}{2}(\mathbb{I}\pm \hat{\mathbf{n}}\cdot\boldsymbol{\sigma})\right)
$$
で与えられ、測定軸 $\hat{\mathbf{n}}$ の選択が情報抽出を決める。

### 8.2 エンタングルメントと角運動量
二体スピンのシングレットは全スピンがゼロであり、回転不変である：
$$
(\mathbf{S}_1+\mathbf{S}_2)^2|\Psi^-\rangle=0.
$$
この回転不変性は、量子通信での参照フレームずれへの頑健性や、ベル不等式違反の基本例として重要である。

### 8.3 対称性と量子回路
スピンは SU(2) 対称性の表現空間であり、量子回路では SU(2) 操作が単一量子ビットゲートとして実装される。対称性を保存する回路設計は、ノイズの一部を抑制したり、保存量に基づく部分空間（対称性セクタ）で計算を行う際に有効である。



## 9. まとめと展望
スピンは、空間回転の表現としての角運動量であり、相対論ではポアンカレ群の既約表現ラベルとして確立され、場の量子論では場の種類と相互作用の形を決める構造原理となる。さらに多体系では自発的対称性の破れとゴールドストーン励起として現れ、量子情報では最小の二準位自由度として測定・制御・エンタングルメントの基盤になる。

今後の発展としては、(i) スピンと実空間を結ぶスピン軌道相互作用が作る新しい秩序（トポロジカル相、非相反応答、スピンテクスチャ）、(ii) 反強磁性やアルターマグネットのように巨視的磁化に依らない秩序パラメータの操作と読み出し、(iii) スピン系を量子シミュレータとして用いる量子情報的アプローチ、が相互に結びつくことで、スピンは内部自由度という枠を超えて、対称性と情報の共通言語としての役割を一段強めていくと考えられる。

### 参考文献
#### 量子力学（スピン・角運動量・回転）
- J. J. Sakurai and J. Napolitano, Modern Quantum Mechanics (2nd ed.), Addison-Wesley / Pearson（英語）
- J. J. Sakurai（著）, 井上健（監訳）ほか（訳）, 現代の量子力学（日本語版）
- C. Cohen-Tannoudji, B. Diu, F. Laloë, Quantum Mechanics, Wiley（英語） 
- D. J. Griffiths and D. F. Schroeter, Introduction to Quantum Mechanics (3rd ed.), Cambridge University Press（英語）
- J. J. Messiah, Quantum Mechanics, Dover（英語）
- L. D. Landau and E. M. Lifshitz, Quantum Mechanics: Non-Relativistic Theory (Course of Theoretical Physics, Vol. 3), Pergamon / Butterworth-Heinemann（英語）

#### 角運動量の数学（Wigner D、3j/6j/9j、CG係数）
- A. R. Edmonds, Angular Momentum in Quantum Mechanics, Princeton University Press（英語） 
- D. A. Varshalovich, A. N. Moskalev, V. K. Khersonskii, Quantum Theory of Angular Momentum, World Scientific（英語） 
School of Mathematics

#### 群論・表現論（SU(2)、SO(3)、ローレンツ群、内部自由度）
- A. Zee, Group Theory in a Nutshell for Physicists, Princeton University Press（英語） 
- W.-K. Tung, Group Theory in Physics, World Scientific（英語）
- H. Georgi, Lie Algebras in Particle Physics, Westview Press（英語）
- B. C. Hall, Lie Groups, Lie Algebras, and Representations, Springer（英語）

#### 相対論・場の量子論（スピノル、多脚場、角運動量、Poincaré表現）
- S. Weinberg, The Quantum Theory of Fields, Vol. 1: Foundations, Cambridge University Press（英語） 
- M. E. Peskin and D. V. Schroeder, An Introduction to Quantum Field Theory, Westview Press（英語） 
- M. D. Schwartz, Quantum Field Theory and the Standard Model, Cambridge University Press（英語） 
- M. Srednicki, Quantum Field Theory（英語） 
- R. F. Streater and A. S. Wightman, PCT, Spin and Statistics, and All That, Princeton University Press（英語）

#### Wigner分類・小群（little group）と「スピン」の定義域
- E. P. Wigner, “On Unitary Representations of the Inhomogeneous Lorentz Group,” Annals of Mathematics 40 (1939). 
- N. Straumann, “On the Wigner little group in quantum mechanics,” arXiv:0809.4942（英語） 

#### スピン統計定理（Spin–Statistics）
- W. Pauli, “The Connection Between Spin and Statistics,” Physical Review 58 (1940). 
- G. Lüders and B. Zumino, “Connection between Spin and Statistics,” Physical Review 110 (1958). 

#### 自発的対称性の破れ（SSB）とGoldstone、低エネルギー励起
- J. Goldstone, “Field Theories with ‘Superconductor’ Solutions,” Il Nuovo Cimento 19 (1961).
- J. Goldstone, A. Salam, S. Weinberg, “Broken Symmetries,” Physical Review 127 (1962).
- S. R. Coleman, “There are no Goldstone bosons in two dimensions,” Communications in Mathematical Physics 31 (1973).

#### 量子磁性・スピン系（多体・準粒子・内部自由度の実例）
- A. Auerbach, Interacting Electrons and Quantum Magnetism, Springer（英語）
- P. W. Anderson, “Plasmons, Gauge Invariance, and Mass,” Physical Review 130 (1963).
- T. Holstein and H. Primakoff, “Field Dependence of the Intrinsic Domain Magnetization of a Ferromagnet,” Physical Review 58 (1940).

#### 量子情報（量子ビット、測定、エンタングルメント）
- M. A. Nielsen and I. L. Chuang, Quantum Computation and Quantum Information (10th Anniversary ed.), Cambridge University Press（英語） 
- ニールセン／チュアン（著）, 木村達也（訳）, 量子コンピュータと量子通信 I（日本語版；オーム社） 
- J. Preskill, Lecture Notes for Physics 219/229/230（Quantum Information / Quantum Field Theory 講義ノート） 
- 日本語の講義ノート（スピン・角運動量の導入）
- 兵頭俊夫, 量子力学 講義ノート（スピン・角運動量を含む）
 