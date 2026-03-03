# 量子力学の初歩

量子力学は、原子・分子・固体の性質を、状態ベクトルと演算子、そして確率規則によって一貫して記述する基礎理論である。古典力学では説明できない干渉・離散準位・トンネルなどを、最小限の公理と数理構造で整理する理論である。  

### 参考ドキュメント
1. 名古屋大学 OCW：量子力学I 講義ノート（PDF）  
   https://ocw.nagoya-u.jp/files/487/qm1-17v3.pdf
2. 東京大学（諸井健夫）：量子力学1 講義ノート（PDF, 2025）  
   https://www-hep.phys.s.u-tokyo.ac.jp/~moroi/tmweb/lecture/TMnote_qm1.pdf  
3. MIT OpenCourseWare：8.04 Quantum Physics I（講義ノート一覧）  
   https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/pages/lecture-notes/

## 1. 量子力学が必要になる背景と、古典力学との違い
量子力学が導入された直接の動機は、ミクロ系で観測される事実が「粒子」や「波」のどちらか一方の像だけでは記述できない点にある。たとえば、干渉縞（波動性）と光電効果（粒子性）が同時に現れること、原子スペクトルが離散であること、電子が回折することなどが挙げられる。  

量子力学の骨格は、次の三点に集約できる。  

- 状態は位相空間の点ではなく、ヒルベルト空間のベクトル $|\psi\rangle$ で与えられる。  
- 観測可能量は数ではなく、エルミート演算子 $\hat{A}$ で表され、測定結果はその固有値として現れる。  
- 測定結果は一般に確率的であり、確率は状態の成分（振幅）の絶対値二乗で与えられる（ボルン則）。  

比較を表にまとめる。  

| 観点 | 古典力学 | 量子力学 |
|---|---|---|
| 状態 | 位相空間 $(\mathbf{x},\mathbf{p})$ の点 | ヒルベルト空間のベクトル $|\psi\rangle$ |
| 物理量 | 関数 $A(\mathbf{x},\mathbf{p})$ | 演算子 $\hat{A}$（基本としてエルミート） |
| 予測 | 初期条件が分かれば将来が一意 | 確率分布としての予測 |
| 測定 | 状態の読み取り | 状態の更新を伴う（射影など） |
| 不確定性 | 原理的には任意に小さくできる | 交換関係に由来する限界がある |

## 2. 数学の準備

### 2.1 複素数と位相の役割

量子状態は複素振幅で表される。複素数 $z$ は  
$$
z = re^{i\theta}
$$
と書け、$r$ が大きさ、$\theta$ が位相である。  

確率が $|z|^{2}=r^{2}$ で与えられる一方、位相 $\theta$ は干渉として観測に影響する点が重要である。  

- 全体位相：$|\psi\rangle \to e^{i\alpha}|\psi\rangle$ は観測確率を変えない。  
- 相対位相：重ね合わせ $c_{1}|1\rangle + c_{2}|2\rangle$ の位相差は干渉を変える。  

この区別は、二重スリット、スピン干渉、量子ビット操作の理解に直結する。  


### 2.2 内積と規格化

状態空間は内積 $\langle\phi|\psi\rangle$ をもつ複素線形空間である。規格化条件は  
$$
\langle\psi|\psi\rangle=1
$$
であり、これは全確率が $1$ であることに対応する。  

規格化は形式的な約束ではなく、時間発展がユニタリである限り保存される量である（後述）。  


### 2.3 基底展開と完全性

離散基底 $\{|n\rangle\}$ について  
$$
\langle m|n\rangle=\delta_{mn},\qquad \sum_{n}|n\rangle\langle n|=\hat{I}
$$
が成り立つ。  

連続基底（位置 $|x\rangle$ など）では  
$$
\langle x|x'\rangle=\delta(x-x'),\qquad \int |x\rangle\langle x|\,dx=\hat{I}
$$
となる。  

この「完全性」が、波動関数を座標表示に落とし込む入口である。  


### 2.4 位置表示と運動量表示

1次元で  
$$
\psi(x)=\langle x|\psi\rangle,\qquad \phi(p)=\langle p|\psi\rangle
$$
と定義すると、両者はフーリエ変換で結ばれる：  
$$
\phi(p)=\frac{1}{\sqrt{2\pi\hbar}}\int e^{-ipx/\hbar}\psi(x)\,dx,\qquad
\psi(x)=\frac{1}{\sqrt{2\pi\hbar}}\int e^{ipx/\hbar}\phi(p)\,dp
$$

この関係は、不確定性関係の定量的な基盤である。  


## 3. 状態の表現

### 3.1 波動関数と確率解釈

位置表示の波動関数 $\psi(x,t)$ に対して、時刻 $t$ に位置 $x$ 近傍で粒子を見出す確率密度は  
$$
\rho(x,t)=|\psi(x,t)|^{2}
$$
である。規格化は  
$$
\int_{-\infty}^{\infty}|\psi(x,t)|^{2}\,dx=1
$$
である。  

ここで重要なのは、$\psi$ 自体が確率ではなく「確率振幅」である点である。確率は二乗であり、干渉項が現れる。  


### 3.2 重ね合わせ原理

状態は線形結合できる。  
$$
|\psi\rangle = c_{1}|1\rangle + c_{2}|2\rangle
$$
が状態であるとき、測定確率は $|c_{1}|^{2}, |c_{2}|^{2}$ によって与えられるが、時間発展や別の基底での測定では相対位相が結果に反映される。  


### 3.3 確率流と連続の式

ハミルトニアンが  
$$
\hat{H}=\frac{\hat{p}^{2}}{2m}+V(x,t)
$$
の形のとき、確率流 $j(x,t)$ は  
$$
j(x,t)=\frac{\hbar}{2mi}\left(\psi^{*}\frac{\partial\psi}{\partial x}-\psi\frac{\partial\psi^{*}}{\partial x}\right)
$$
で与えられ、連続の式  
$$
\frac{\partial \rho}{\partial t}+\frac{\partial j}{\partial x}=0
$$
が成り立つ。  

これは「確率の保存」を局所的に表す関係であり、時間発展の整合性を確認する上で重要である。  


## 4. 観測量と演算子

### 4.1 演算子と測定値

観測量 $A$ は演算子 $\hat{A}$ で表され、固有方程式  
$$
\hat{A}|a\rangle=a|a\rangle
$$
の固有値 $a$ が測定結果となる。  

$\hat{A}$ は基本としてエルミート（自己共役）であり、固有値が実数になる。無限次元では「定義域」まで含めて自己共役性が重要になるが、初学段階では「期待値が実数になる条件」として捉えるのがよい。  


### 4.2 期待値と分散

期待値は  
$$
\langle \hat{A}\rangle=\langle\psi|\hat{A}|\psi\rangle
$$
である。分散（ゆらぎの大きさ）は  
$$
(\Delta A)^{2}=\langle(\hat{A}-\langle\hat{A}\rangle)^{2}\rangle
$$
である。  

期待値は「多数回測定した平均」に対応し、分散は「測定値の散らばり」に対応する。  


### 4.3 位置・運動量の基本表現

位置表示での基本演算子は次である。  

| 量 | 記号 | 位置表示での作用 |
|---|---|---|
| 位置 | $\hat{x}$ | $(\hat{x}\psi)(x)=x\psi(x)$ |
| 運動量 | $\hat{p}$ | $(\hat{p}\psi)(x)=-i\hbar\frac{d}{dx}\psi(x)$ |
| エネルギー（標準形） | $\hat{H}$ | $\left[-\frac{\hbar^{2}}{2m}\frac{d^{2}}{dx^{2}}+V(x)\right]\psi(x)$ |

交換関係  
$$
[\hat{x},\hat{p}]=i\hbar
$$
が量子論の骨格となる。  


## 5. 測定

### 5.1 ボルン則（射影測定）

$\hat{A}$ の固有基底 $\{|a\rangle\}$ に展開して  
$$
|\psi\rangle=\sum_{a}c_{a}|a\rangle,\qquad c_{a}=\langle a|\psi\rangle
$$
とすると、結果が $a$ となる確率は  
$$
P(a)=|c_{a}|^{2}
$$
である。  


### 5.2 測定後の状態（射影）

結果 $a$ を得た直後、理想化された射影測定では  
$$
|\psi\rangle \to \frac{\hat{P}_{a}|\psi\rangle}{\sqrt{\langle\psi|\hat{P}_{a}|\psi\rangle}},\qquad \hat{P}_{a}=|a\rangle\langle a|
$$
となる。  

この「状態更新」が、古典的測定と本質的に異なる点である。  


### 5.3 一般測定（POVM）の入口

現実の検出器は損失・有限分解能・暗計数などを含むため、一般には POVM（正作用素値測度）で測定を表す。POVM $\{F_{b}\}$ に対して確率は  
$$
p_{b}=\mathrm{Tr}(F_{b}\rho)
$$
で与えられる。  

射影測定はPOVMの特別な場合であり、初学ではまず射影測定を確実に扱うことが重要である。  


## 6. 交換関係と不確定性関係

ロバートソンの不確定性関係は  
$$
\Delta A\,\Delta B \ge \frac{1}{2}\left|\langle[\hat{A},\hat{B}]\rangle\right|
$$
である。  

特に $[\hat{x},\hat{p}]=i\hbar$ より  
$$
\Delta x\,\Delta p\ge \frac{\hbar}{2}
$$
が得られる。  

これは装置の性能不足ではなく、状態ベクトルと交換関係の構造に由来する制約である。  


## 7. 時間発展：シュレーディンガー方程式とユニタリ性

### 7.1 時間依存シュレーディンガー方程式

時間発展は  
$$
i\hbar\frac{d}{dt}|\psi(t)\rangle=\hat{H}(t)|\psi(t)\rangle
$$
で与えられる。位置表示では  
$$
i\hbar\frac{\partial}{\partial t}\psi(x,t)=\left[-\frac{\hbar^{2}}{2m}\frac{\partial^{2}}{\partial x^{2}}+V(x,t)\right]\psi(x,t)
$$
である。  


### 7.2 ユニタリ発展と規格化保存

$\hat{H}$ がエルミートであれば時間発展演算子 $\hat{U}(t)$ はユニタリであり  
$$
|\psi(t)\rangle=\hat{U}(t)|\psi(0)\rangle,\qquad \hat{U}^{\dagger}\hat{U}=\hat{I}
$$
が成り立つ。結果として $\langle\psi(t)|\psi(t)\rangle$ が保存され、確率解釈が破綻しない。  


### 7.3 定常状態と時間に依らないシュレーディンガー方程式

$\hat{H}$ が時間に依らないとき  
$$
\hat{H}|n\rangle=E_{n}|n\rangle
$$
の固有状態が重要である。位置表示では  
$$
\left[-\frac{\hbar^{2}}{2m}\frac{d^{2}}{dx^{2}}+V(x)\right]\psi_{n}(x)=E_{n}\psi_{n}(x)
$$
である。  

時間発展は  
$$
|n(t)\rangle=e^{-iE_{n}t/\hbar}|n\rangle
$$
となる。単一固有状態では確率密度 $|\psi|^{2}$ が時間に依らないが、重ね合わせでは干渉により時間変化が現れる。  


## 8. 1次元量子力学の基本

### 8.1 境界条件の物理的意味

ポテンシャルが有限で滑らかである領域では、一般に $\psi$ と $d\psi/dx$ の連続性が要請される。逆に、デルタ関数ポテンシャルのように $V(x)$ が特異であれば導関数に飛びが許され、その飛びがポテンシャル強度と関係する。  


### 8.2 束縛状態と散乱状態

- 束縛状態：正規化可能（$\int |\psi|^{2}dx < \infty$）で、エネルギーが離散となりやすい。  
- 散乱状態：平面波に類似し正規化はデルタ関数的で、エネルギーは連続。  

この区別は、スペクトルが離散か連続かを理解する上で根幹となる。  


## 9. 基本模型：無限井戸、有限井戸、障壁とトンネル、ステップと散乱

### 9.1 無限深井戸（粒子 in a box）

区間 $0<x<L$ で $V=0$、外で $V=\infty$ とする。境界条件 $\psi(0)=\psi(L)=0$ から  
$$
\psi_{n}(x)=\sqrt{\frac{2}{L}}\sin\left(\frac{n\pi x}{L}\right)
$$
$$
E_{n}=\frac{\hbar^{2}\pi^{2}}{2mL^{2}}n^{2}\qquad (n=1,2,\dots)
$$
となる。  

ここで $n=1$ でも $E_{1}>0$ であり、閉じ込めと不確定性が結びついていることを示す。  


### 9.2 有限井戸と束縛準位

有限井戸では、井戸内は正弦波、外部は指数減衰となる。境界条件から量子化条件が現れ、束縛準位の本数は井戸の深さ・幅で変わる。  

無限井戸と比べると、波動関数が井戸外へしみ出す点が本質であり、これがトンネル現象の直観を与える。  


### 9.3 障壁透過（トンネル）と指数減衰

障壁領域で $E<V_{0}$ のとき、波動関数は  
$$
\psi(x)\sim e^{-\kappa x},\qquad \kappa=\frac{\sqrt{2m(V_{0}-E)}}{\hbar}
$$
のように指数減衰する。厚さ $a$ の障壁では透過が概ね  
$$
T \propto e^{-2\kappa a}
$$
で抑制される。  

重要なのは、トンネルは「粒子がエネルギー不足のまま越える」という描像ではなく、境界条件と波動関数の連続性がもたらす現象である点である。  


### 9.4 ステップポテンシャルと反射・透過（散乱の入口）

ステップ $V(x)=0\ (x<0),\ V_{0}\ (x>0)$ を考えると、$E>V_{0}$ でも反射が生じ得る。これは古典と量子の差を最初に実感する題材である。  

散乱の記述では、入射波・反射波・透過波を重ね合わせ、確率流 $j$ を用いて反射率 $R$ と透過率 $T$ を  
$$
R=\frac{j_{\mathrm{ref}}}{j_{\mathrm{in}}},\qquad T=\frac{j_{\mathrm{tra}}}{j_{\mathrm{in}}}
$$
として定義する。すると保存則として  
$$
R+T=1
$$
が得られる（定常散乱、損失なしの場合）。  


### 9.5 主要な1次元模型の整理

| 模型 | ポテンシャルの形 | スペクトル | 重要点 |
|---|---|---|---|
| 無限井戸 | 外部 $V=\infty$ | 離散 | 境界条件で量子化 |
| 有限井戸 | 外部有限 | 離散（束縛）＋連続（散乱） | しみ出し、準位数が変化 |
| 障壁 | 山型 | 連続 | トンネル、共鳴透過 |
| ステップ | 片側だけ上がる | 連続 | $E>V_{0}$ でも反射 |


## 10. 調和振動子

調和振動子は多くの物理（格子振動、電磁場モード、分子振動）に現れる基本模型である。  

### 10.1 ハミルトニアンと演算子

$$
\hat{H}=\frac{\hat{p}^{2}}{2m}+\frac{1}{2}m\omega^{2}\hat{x}^{2}
$$

生成消滅演算子を  
$$
\hat{a}=\sqrt{\frac{m\omega}{2\hbar}}\left(\hat{x}+\frac{i}{m\omega}\hat{p}\right),\quad
\hat{a}^{\dagger}=\sqrt{\frac{m\omega}{2\hbar}}\left(\hat{x}-\frac{i}{m\omega}\hat{p}\right)
$$
と定義すると  
$$
[\hat{a},\hat{a}^{\dagger}]=1,\qquad
\hat{H}=\hbar\omega\left(\hat{a}^{\dagger}\hat{a}+\frac{1}{2}\right)
$$
となる。  

### 10.2 エネルギー固有値と零点エネルギー

$$
E_{n}=\hbar\omega\left(n+\frac{1}{2}\right)\qquad (n=0,1,2,\dots)
$$
である。$n=0$ でも $\hbar\omega/2$ が残ることが零点エネルギーである。  


## 11. 量子の自由度としての回転

### 11.1 角運動量代数

角運動量演算子は  
$$
[\hat{L}_{i},\hat{L}_{j}]=i\hbar\varepsilon_{ijk}\hat{L}_{k}
$$
を満たし、同時固有状態 $|l,m\rangle$ は  
$$
\hat{L}^{2}|l,m\rangle=\hbar^{2}l(l+1)|l,m\rangle,\qquad
\hat{L}_{z}|l,m\rangle=\hbar m|l,m\rangle
$$
を満たす。  


### 11.2 スピン1/2 とパウリ行列

スピン1/2では  
$$
\hat{\mathbf{S}}=\frac{\hbar}{2}\boldsymbol{\sigma}
$$
であり  
$$
\sigma_{x}=\begin{pmatrix}0&1\\1&0\end{pmatrix},\quad
\sigma_{y}=\begin{pmatrix}0&-i\\i&0\end{pmatrix},\quad
\sigma_{z}=\begin{pmatrix}1&0\\0&-1\end{pmatrix}
$$
である。  


### 11.3 ブロッホ球（量子ビットへの接続）

任意の純粋状態は  
$$
|\psi\rangle=\cos\frac{\theta}{2}|0\rangle + e^{i\phi}\sin\frac{\theta}{2}|1\rangle
$$
と書け、$(\theta,\phi)$ が球面上の点に対応する。これは量子情報の標準的な幾何表現である。  


## 12. 中心力問題と水素原子：量子数と縮退

中心力 $V(r)$ では球座標分離が可能で、角度部分は球面調和関数 $Y_{l}^{m}$、動径部分は有効ポテンシャルを含む方程式になる。  

水素原子（クーロンポテンシャル）では、非相対論近似で  
$$
E_{n}=-\frac{m e^{4}}{2(4\pi\varepsilon_{0})^{2}\hbar^{2}}\frac{1}{n^{2}}
$$
となり、主量子数 $n$ のみに依存する縮退が現れる。  


## 13. 摂動論：近似の基本構造と遷移確率

### 13.1 時間に依らない摂動（非縮退）

$\hat{H}=\hat{H}_{0}+\lambda\hat{V}$ として、一次のエネルギー補正は  
$$
E_{n}^{(1)}=\langle n^{(0)}|\hat{V}|n^{(0)}\rangle
$$
である。状態補正は  
$$
|n^{(1)}\rangle=\sum_{m\neq n}\frac{\langle m^{(0)}|\hat{V}|n^{(0)}\rangle}{E_{n}^{(0)}-E_{m}^{(0)}}|m^{(0)}\rangle
$$
である。  


### 13.2 時間に依る摂動とフェルミの黄金律

弱い時間依存摂動があると、長時間極限で遷移率は  
$$
\Gamma_{i\to f}=\frac{2\pi}{\hbar}\,|\langle f|\hat{V}|i\rangle|^{2}\rho(E_{f})
$$
となる（終状態密度 $\rho$）。  


## 14. 同一粒子と量子統計：ボース性とフェルミ性

同一粒子の交換は観測上区別できないため、波動関数は交換で対称（ボース粒子）または反対称（フェルミ粒子）でなければならない。  

フェルミ粒子では反対称性がパウリの排他原理を含意し、固体中の電子の充填、フェルミ面、磁性・比熱などを支配する。  


## 15. 密度行列：混合状態と開放系の入口

純粋状態 $|\psi\rangle$ の密度演算子は  
$$
\rho=|\psi\rangle\langle\psi|
$$
である。混合状態は  
$$
\rho=\sum_{k}p_{k}|\psi_{k}\rangle\langle\psi_{k}|
$$
で表され、期待値は  
$$
\langle \hat{A}\rangle=\mathrm{Tr}(\rho\hat{A})
$$
で統一される。  

密度行列は、測定の一般化（POVM）や、環境との相互作用によるデコヒーレンスを扱う入口になる。  


## 16. 量子技術との接続：基礎概念が技術へ接続される

量子力学の初歩で学ぶ概念（重ね合わせ、位相、測定、エンタングルメント、開放系）は、そのまま量子計算・量子通信・量子計測の設計原理へ接続される。  

国内では政府が量子技術の方針・ロードマップを整理しており、研究開発・拠点形成・産業化を視野に入れた資料が公開されている。  

また、理研は量子とHPCの連携基盤（量子-HPC連携プラットフォーム）に関する発表を行っており、基礎理論と計算基盤が同時に進展している状況が分かる。  

量子ネットワーク側では、NICTが量子もつれ光子の伝送経路制御など、量子情報の転送・制御に直結する要素技術の実証を継続している。  

企業側でも、光量子コンピュータのスケール化・信頼性に関する連携発表があり、量子状態の制御・測定・誤り抑制が工学課題として前面に出ている。  


## まとめと展望

量子力学の初歩は、状態をベクトル（または波動関数）で表し、観測量を演算子として扱い、測定確率をボルン則で与え、時間発展をシュレーディンガー方程式で記述するという一貫した枠組みを確立する段階である。無限井戸・有限井戸・障壁・調和振動子・スピン・水素原子といった基本模型を通して、境界条件、固有値問題、交換関係、ユニタリ性が繰り返し現れることを確認することが理解の軸になる。  

展望としては、(1) 多体系（相互作用する多数粒子）での近似法と有効理論、(2) 開放量子系としての散逸とデコヒーレンス、(3) 一般測定（POVM）と量子チャネルの形式、(4) 材料・デバイスがもつ欠陥や雑音を含めた量子制御、へと自然に接続される。初歩の概念がそのまま量子技術の設計変数へ翻訳されるため、基礎の厳密さが応用の理解を直接支えるのである。  


### 参考文献
- 名古屋大学 OCW：量子力学I（コースページ）
  https://ocw.nagoya-u.jp/courses/0487-%E9%87%8F%E5%AD%90%E5%8A%9B%E5%AD%A6I-2017/

- 京都大学基礎物理学研究所（湯川記念財団系の公開PDF）：小川修三「量子力学講義ノート1」（PDF）
  https://www2.yukawa.kyoto-u.ac.jp/~soken.editorial/sokendenshi/vol24/3/%E5%B0%8F%E5%B7%9D%E4%BF%AE%E4%B8%89%EF%BC%9A%E9%87%8F%E5%AD%90%E5%8A%9B%E5%AD%A6%E8%AC%9B%E7%BE%A9%E3%83%8E%E3%83%BC%E3%83%881.pdf

- MIT OpenCourseWare：8.04（コーストップ）
  https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/

- NIST Publications：Joint quantum state and measurement tomography（量子状態・測定の同時推定に関する公開ページ）
  https://www.nist.gov/publications/joint-quantum-state-and-measurement-tomography-incomplete-measurements

- APS（Phys. Rev. A）：Joint quantum-state and measurement tomography（DOI）
  https://link.aps.org/doi/10.1103/PhysRevA.98.042318

- 内閣府（CSTI）：量子技術イノベーション戦略（最終報告, PDF）
  https://www8.cao.go.jp/cstp/tougosenryaku/ryoushisenryaku.pdf

- 内閣府（CSTI）：量子技術イノベーション戦略 ロードマップ改訂（PDF, 2022）
  https://www8.cao.go.jp/cstp/ryoshigijutsu/roadmap_220422.pdf

- 理化学研究所：量子HPC連携プラットフォーム向けのシステムが決定（2025/11/18）
  https://www.riken.jp/pr/news/2025/20251118_1/index.html

- NICT：量子もつれ光子ルーターを開発し伝送経路の切り替えを実証（2025/09/24）
  https://www.nict.go.jp/press/2025/09/24-1.html

- NTT：NTTとOptQC、実用的な光量子コンピュータに向けた連携（2025/11/18）
  https://group.ntt/jp/newsrelease/2025/11/18/251118a.html
