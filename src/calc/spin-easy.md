# スピンをわかりやすく理解する
スピンは、粒子が持つ「回転に似た性質」であり、回転させたときに量子状態がどう変わるかを表す指標である。さらにスピンは、情報としては「上か下か」の二択を持つ最小単位（量子ビット）としても振る舞い、物理と情報の両方に同じ言葉で登場する。


## 1. 回転とスピン
### 1.1 回転と角運動量の関係
日常の回転（コマや地球の自転）を思い浮かべると、回転には「向き」と「大きさ」がある。物理では回転の性質を角運動量という量で表す。量子の世界でも回転は重要で、回転させる操作は「角運動量」という演算子で表される。

量子力学では、角運動量の成分は独立ではなく、次の関係を満たす：
$$
[J_i, J_j] = i\hbar\,\epsilon_{ijk} J_k
$$
ここで $J_i$ は角運動量の $x,y,z$ 成分である。この式は「回転は順番を入れ替えると結果が変わる」という特徴を表している。

### 1.2 スピンは回転に対する“内部の”角運動量
角運動量には二種類あると考えると理解しやすい。

- 軌道角運動量 $\mathbf{L}$：粒子が空間の中を回る運動（原子の電子が核の周りを回る、など）に由来する
- スピン角運動量 $\mathbf{S}$：粒子そのものが持つ“内部の回転の性質”

この二つは別の自由度なので
$$
[L_i,S_j]=0
$$
となり、独立に扱える。全体としての角運動量は
$$
\mathbf{J}=\mathbf{L}+\mathbf{S}
$$
である。

### 1.3 スピン1/2とSU(2)：2π回転で符号が変わる不思議
スピンには大きさを表す量 $s$ があり、$s=0,\frac12,1,\frac32,\dots$ のように「半整数」も許される。これが量子特有の点である。

特に重要なのが $s=\frac12$（スピン1/2）で、電子はこれを持つ。スピン1/2の状態は「2成分」のベクトル（スピノル）で表される。回転させると
$$
U(R) = \exp\!\left(-\frac{i}{\hbar}\,\boldsymbol{\theta}\cdot\mathbf{S}\right),
\qquad
\mathbf{S}=\frac{\hbar}{2}\boldsymbol{\sigma}
$$
のように変化する（$\boldsymbol{\sigma}$ はパウリ行列）。

ここで直観に反する重要な事実がある。スピン1/2は $2\pi$ 回転（360度回転）で
$$
U(2\pi)= -\mathbb{I}
$$
となり、状態がマイナス符号を受ける。日常の回転なら360度回して元に戻るが、量子状態は「符号が反転」する。これは観測確率にはすぐ現れないが、干渉実験では影響が出る。



## 2. 空間自由度と内部自由度
### 2.1 状態は「位置」と「スピン」の両方を持つ
粒子の状態は「どこにいるか（位置）」だけでは決まらない。スピンも状態の一部である。スピン1/2なら波動関数は
$$
\psi(\mathbf{r})=
\begin{pmatrix}
\psi_\uparrow(\mathbf{r})\\
\psi_\downarrow(\mathbf{r})
\end{pmatrix}
$$
のような2成分で表される。

これは「位置の自由度」と「スピンの自由度」が直積で合わさっていることを意味し、
$$
\mathcal{H}=\mathcal{H}_{\mathrm{space}}\otimes \mathcal{H}_{\mathrm{spin}}
$$
という形で表される。

### 2.2 磁場でスピンが向きを変える
スピンが「回転に似た性質」だとすると、次に気になるのは「何がそれを回すのか」である。代表は磁場である。

電子のスピンは磁気モーメントを持ち、磁場 $\mathbf{B}$ と
$$
-\boldsymbol{\mu}\cdot\mathbf{B}
$$
の形でエネルギーが変わる。このため磁場中ではスピンがある向きを好む。電子の磁気モーメントは
$$
\boldsymbol{\mu} = g\frac{q}{2m}\mathbf{S}
$$
で表され（$g\simeq 2$）、スピンが実験で観測できる直接の理由の一つになる。



## 3. スピン加法と多体系
### 3.1 二つのスピンを合わせると何が起きるか
二つの粒子があるとき、それぞれスピンを持っている。すると全体のスピンは足し算で決まる：
$$
\mathbf{S}=\mathbf{S}_1+\mathbf{S}_2
$$
ただし量子の足し算は、単なるベクトルの足し算ではなく「状態の組合せ」が増える。

スピンの大きさ（量子数）で書くと
$$
j_1\otimes j_2 = \bigoplus_{J=|j_1-j_2|}^{j_1+j_2} J
$$
となる。特に
$$
\frac12\otimes \frac12 = 0\oplus 1
$$
が重要である。これは「二つのスピン1/2を合わせると、全体のスピンは0か1になる」という意味である。

### 3.2 シングレットとトリプレット：量子情報にも直結する
全スピン0の状態（シングレット）は
$$
|\Psi^{-}\rangle=\frac{1}{\sqrt{2}}\left(|\uparrow\downarrow\rangle-|\downarrow\uparrow\rangle\right)
$$
である。これは二つの粒子のスピンが強く結びついた状態で、片方を測るともう片方も決まる。これが量子もつれ（エンタングルメント）の代表例になる。

### 3.3 同じ粒子を入れ替えたときのルール（統計性）
電子のような粒子はフェルミオンであり、粒子を入れ替えると全体の状態がマイナスになる（反対称）。これがパウリの排他原理の背景にある。

スピンがあると「空間の部分」と「スピンの部分」の対称性が組み合わさる。例えば二電子では
- スピンがシングレット（反対称）なら、空間部分は対称になりやすい
- スピンがトリプレット（対称）なら、空間部分は反対称になりやすい

この性質が、化学結合や磁性の理解に深く関わる。



## 4. 相対論とスピン
### 4.1 なぜ相対論を持ち出すのか
スピンは「量子力学の追加要素」と思われやすいが、実は相対論と非常に相性が良い。むしろ相対論を正しく取り込むと、スピンは自然に現れる。

### 4.2 ディラック方程式がスピン1/2を自然に含む
電子を相対論的に扱う基本方程式がディラック方程式である：
$$
(i\gamma^\mu\partial_\mu - m)\psi = 0
$$
この $\psi$ が4成分を持つのは、相対論と量子を両立させた結果であり、その中にスピン1/2の自由度が含まれる。

### 4.3 ヘリシティ：運動方向に沿ったスピン
相対論では「運動量の方向」が特別な役割を持つ。運動量方向への角運動量の成分をヘリシティという。質量が小さい粒子（光子など）では、このヘリシティが自由度の分類として本質になる。



## 5. 場の量子論でのスピン
### 5.1 粒子より先に場が主役になる
場の量子論では、粒子は場の励起として現れる。つまり「どんな種類の場を使うか」が「どんな粒子が出るか」を決める。

### 5.2 スピンは場の種類を決める
場は回転やローレンツ変換でどう変化するかで分類される：
$$
U(\Lambda)\,\Phi_a(x)\,U(\Lambda)^{-1}
= {D(\Lambda)_a}^{b}\,\Phi_b(\Lambda^{-1}x)
$$
$D(\Lambda)$ の表現がスピンに対応する。

- スカラー場：スピン0（温度場のような1成分の量）
- スピノル場：スピン1/2（電子など）
- ベクトル場：スピン1（光子のような場）

### 5.3 スピンと統計性が結びつく
場の量子論の重要な結果として、スピンと統計性が結びつく。
- 半整数スピンはフェルミオン（反対称）
- 整数スピンはボソン（対称）

これは単なる経験則ではなく、相対論的な理論の基本条件と両立させるとそうならざるを得ない、という強い制約である。



## 6. 多脚場、多脚相関関数、散乱振幅
### 6.1 多脚とは何か（相関関数としての意味）
多脚という言葉は、まず「何点関数か」を意味する。場を複数点で掛け合わせた
$$
G^{(n)}(x_1,\dots,x_n)=\langle 0|T\{\Phi(x_1)\cdots \Phi(x_n)\}|0\rangle
$$
が $n$ 点関数であり、$n$ が大きいほど「多脚」と言える。

これは、散乱（粒子がぶつかる過程）を計算するための基本材料になる。外から入ってくる粒子と出ていく粒子の数が増えるほど、必要な点関数も増える。

### 6.2 多脚とは何か（指標を多く持つ場としての意味）
もう一つの意味は、場が複数の指標を持つこと（テンソル場）である。例えば $h_{\mu\nu}$ のように2つの指標を持つ場はスピン2成分を含む。

高いスピンを共変に扱うほど、指標や条件（ゲージの自由度など）が増え、扱いが難しくなる。

### 6.3 散乱の計算でスピンが効く
散乱の計算では、外部粒子に対応する“形”を付ける。電子ならスピノル、光子なら偏極ベクトルが必要になる。スピンは「どう縮約して振幅を作るか」を決めるため、計算の形そのものを支配する。



## 7. 自発的対称性の破れとスピン
### 7.1 磁性体ではスピンの向きが揃う
強磁性体では、たくさんの電子スピンが同じ方向に揃う。その結果「どの方向を向いても同じ」という回転対称性が、実際の状態では破れてしまう。これが自発的対称性の破れである。

ヒーゼンベルグ模型は
$$
H = -\sum_{\langle ij\rangle} J_{ij}\,\mathbf{S}_i\cdot\mathbf{S}_j
$$
で表され、$J_{ij}$ がスピンを揃えようとする強さを表す。

### 7.2 破れた対称性の揺らぎとしてマグノンが出る
対称性が破れると、その“揺らぎ”が低エネルギー励起として現れる。強磁性ではスピン波（マグノン）がその例である。反強磁性でも類似の励起があり、スピンの秩序を理解する鍵になる。

### 7.3 スピン軌道相互作用で「スピンだけ」の回転が成り立たなくなる
スピン軌道相互作用は、スピンの向きと空間の向きを結びつける。これにより磁気異方性（向きによってエネルギーが違う）が生まれ、さらにDzyaloshinskii–Moriya相互作用などの現象につながる。


## 8. 量子情報としてのスピン
### 8.1 スピン1/2は量子ビットの原型
スピン1/2は「上」「下」の二状態を持つため、量子ビットと同じ数学構造を持つ。一般の状態は
$$
|\psi\rangle = \cos\frac{\theta}{2}\,|\uparrow\rangle + e^{i\phi}\sin\frac{\theta}{2}\,|\downarrow\rangle
$$
と書け、ブロッホ球で表せる。

密度行列で書くと
$$
\rho=\frac{1}{2}\left(\mathbb{I}+\mathbf{r}\cdot\boldsymbol{\sigma}\right)
$$
であり、$\mathbf{r}$ が状態の情報を表す。

### 8.2 測定は「どの軸で見るか」で結果が変わる
スピンはベクトルのような性質を持つので、どの方向で測るか（測定軸 $\hat{\mathbf{n}}$）が重要である。測定確率は
$$
P(\pm)=\mathrm{Tr}\left(\rho\,\frac{1}{2}(\mathbb{I}\pm \hat{\mathbf{n}}\cdot\boldsymbol{\sigma})\right)
$$
で与えられる。

### 8.3 エンタングルメントは「二体のスピンの結びつき」
前に出たシングレット状態は全体の角運動量がゼロであり、回転に対して特別な性質を持つ。量子情報では、こうした状態が通信や暗号の基礎になる。


## 9. まとめと展望
スピンは「量子状態が回転でどう変わるか」を表す内部自由度であり、角運動量代数という共通のルールで整理できる。相対論ではスピンが自然に現れ、場の量子論では場の種類と相互作用の形を決め、多体系では磁性や対称性の破れとして現れ、量子情報では量子ビットとエンタングルメントの中心になる。

今後は、スピン軌道相互作用が作る新しい物質相や、巨視的磁化に依らない秩序（反強磁性やアルターマグネット）の制御、そしてスピン系を使った量子計算・量子シミュレーションが結びつくことで、スピンは「物理の自由度」であると同時に「情報の自由度」としての重要性をさらに高めていくと考えられる。

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
 