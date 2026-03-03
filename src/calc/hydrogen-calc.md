# 水素原子の量子状態（エネルギー準位）を導く
水素原子は電子と陽子の2体クーロン相互作用からなる量子系であり、座標変換と変数分離によりシュレーディンガー方程式を厳密に解ける系である。解の構造から $E_n\propto -1/n^2$ とリュードベリ公式が得られ、相対論補正とQED補正を加えることで精密分光へ自然に拡張できる。 


## 0. 記号と量の意味

### 0.1 定数・物理量
- $\hbar$：換算プランク定数（$\hbar=h/2\pi$）である。$h$ はプランク定数である。
- $c$：真空中の光速である。
- $e$：電気素量（電子の電荷の大きさ）である。電子の電荷は $-e$、陽子の電荷は $+e$ である。
- $\varepsilon_0$：真空誘電率である。
- $m_e$：電子質量である。
- $m_p$：陽子質量である。
- $M=m_e+m_p$：全質量である。
- $\mu=\dfrac{m_em_p}{m_e+m_p}$：換算質量（reduced mass）である。2体問題を1体の有効問題へ落とし込む際に現れる質量である。
- $Z$：核電荷数である。水素では $Z=1$ である。
- $\alpha=\dfrac{e^2}{4\pi\varepsilon_0\hbar c}$：微細構造定数である。

### 0.2 座標・微分演算子
- $\mathbf{r}_e,\mathbf{r}_p$：電子と陽子の位置ベクトルである。
- $\mathbf{r}=\mathbf{r}_e-\mathbf{r}_p$：相対座標（電子から見た陽子の相対位置）である。$r=|\mathbf{r}|$ はその大きさである。
- $\mathbf{R}=\dfrac{m_e\mathbf{r}_e+m_p\mathbf{r}_p}{m_e+m_p}$：重心座標である。
- $\nabla^2$：ラプラシアン（空間2階微分演算子）である。$\nabla_e^2$ は $\mathbf{r}_e$ に関するラプラシアンであり、$\nabla_p^2$ は $\mathbf{r}_p$ に関するラプラシアンである。
- 球座標 $(r,\theta,\phi)$：$r$ は原点からの距離、$\theta$ は極角、$\phi$ は方位角である。

### 0.3 波動関数・確率解釈・規格化
- $\Psi(\mathbf{r}_e,\mathbf{r}_p,t)$：2体の同時座標と時間に依存する全波動関数である。
- $\psi(\mathbf{r})$：相対運動（内部自由度）の定常波動関数である。
- $|\psi|^2$：位置空間での確率密度である。体積要素 $d^3r$ に対して、$|\psi(\mathbf{r})|^2 d^3r$ が確率となる。
- 規格化条件：$\displaystyle \int |\psi(\mathbf{r})|^2\,d^3r=1$ が全確率1の条件である。

### 0.4 エネルギーと束縛状態
- $E$：相対運動のエネルギー固有値である。
- 束縛状態：$E<0$ であり、原点から十分遠くで波動関数が指数関数的に減衰して正規化可能である状態である。
- 連続状態：$E>0$ であり、散乱状態として振動的である。

### 0.5 量子数と角運動量
- $n$：主量子数であり、エネルギー準位を主に決める整数である。$n=1,2,3,\dots$ である。
- $\ell$：軌道角運動量量子数であり、$\ell=0,1,\dots,n-1$ である。
- $m$：磁気量子数であり、$m=-\ell,-\ell+1,\dots,\ell$ である。
- $\hat{\mathbf{L}}$：軌道角運動量演算子である。$\hat{L}^2$ と $\hat{L}_z$ はそれぞれ二乗と $z$ 成分である。



## 1. 出発点：水素原子のハミルトニアン（2体問題）

電子（質量 $m_{e}$、位置 $\mathbf{r}_e$）と陽子（質量 $m_{p}$、位置 $\mathbf{r}_p$）がクーロン引力で結ばれているとする。電荷の大きさは $e$ である。

時間依存シュレーディンガー方程式は
$$
i\hbar\frac{\partial}{\partial t}\Psi(\mathbf{r}_e,\mathbf{r}_p,t)=\hat{H}\Psi(\mathbf{r}_e,\mathbf{r}_p,t)
$$
であり、ハミルトニアンは
$$
\hat{H}
=-\frac{\hbar^2}{2m_e}\nabla_e^2
-\frac{\hbar^2}{2m_p}\nabla_p^2
-\frac{e^2}{4\pi\varepsilon_0\,|\mathbf{r}_e-\mathbf{r}_p|}
$$
である。

ここで
- 第1項は電子の運動エネルギー（運動量二乗に比例）である。
- 第2項は陽子の運動エネルギーである。
- 第3項はクーロンポテンシャルであり、電子と陽子の距離に反比例する引力である（符号が負である）。 



## 2. 重心座標と相対座標への変換（2体問題の分離）

重心座標 $\mathbf{R}$ と相対座標 $\mathbf{r}$ を
$$
\mathbf{R}=\frac{m_e\mathbf{r}_e+m_p\mathbf{r}_p}{m_e+m_p},\qquad
\mathbf{r}=\mathbf{r}_e-\mathbf{r}_p
$$
と定義し、全質量 $M$ と換算質量 $\mu$ を
$$
M=m_e+m_p,\qquad
\mu=\frac{m_em_p}{m_e+m_p}
$$
と定義する。

この変換の意味は、2体の自由度を
- 重心の運動（系全体が並進する自由度）
- 相対運動（電子と陽子の相対的な内部自由度）
に分解することである。ポテンシャルが $|\mathbf{r}_e-\mathbf{r}_p|=r$ のみで決まるため、内部自由度だけが束縛準位を持つ。

この結果、ハミルトニアンは
$$
\hat{H}=\hat{H}_{\mathrm{CM}}+\hat{H}_{\mathrm{rel}}
$$
の和に分かれ、
$$
\hat{H}_{\mathrm{CM}}=-\frac{\hbar^2}{2M}\nabla_R^2,\qquad
\hat{H}_{\mathrm{rel}}=-\frac{\hbar^2}{2\mu}\nabla_r^2-\frac{e^2}{4\pi\varepsilon_0 r}
$$
となる。$\nabla_R^2$ は重心座標 $\mathbf{R}$ に関するラプラシアン、$\nabla_r^2$ は相対座標 $\mathbf{r}$ に関するラプラシアンである。

波動関数は分離できて
$$
\Psi(\mathbf{R},\mathbf{r},t)=\Phi(\mathbf{R},t)\,\psi(\mathbf{r},t)
$$
となり、束縛準位は内部問題
$$
\hat{H}_{\mathrm{rel}}\psi(\mathbf{r})=E\,\psi(\mathbf{r})
$$
の固有値 $E$ と固有関数 $\psi$ で決まる。 



## 3. 相対運動の定常シュレーディンガー方程式（クーロン中心力）

相対運動の定常方程式は
$$
\left[
-\frac{\hbar^2}{2\mu}\nabla^2
-\frac{e^2}{4\pi\varepsilon_0 r}
\right]\psi(\mathbf{r})
=E\,\psi(\mathbf{r})
$$
である。ここで $\nabla^2$ は相対座標 $\mathbf{r}$ に関するラプラシアンである。

ポテンシャルが $r$ のみの関数であることは中心力問題であることを意味し、角運動量が保存する。この保存則が変数分離を可能にする。



## 4. 球座標でのラプラシアンと角運動量演算子

球座標 $(r,\theta,\phi)$ でのラプラシアンは
$$
\nabla^2=
\frac{1}{r^2}\frac{\partial}{\partial r}\left(r^2\frac{\partial}{\partial r}\right)
+\frac{1}{r^2\sin\theta}\frac{\partial}{\partial\theta}\left(\sin\theta\frac{\partial}{\partial\theta}\right)
+\frac{1}{r^2\sin^2\theta}\frac{\partial^2}{\partial\phi^2}
$$
である。

角度部分は軌道角運動量演算子 $\hat{L}^2$ を用いて
$$
\frac{1}{\sin\theta}\frac{\partial}{\partial\theta}\left(\sin\theta\frac{\partial}{\partial\theta}\right)
+\frac{1}{\sin^2\theta}\frac{\partial^2}{\partial\phi^2}
= -\frac{\hat{L}^2}{\hbar^2}
$$
とまとめられる。したがって
$$
\nabla^2=
\frac{1}{r^2}\frac{\partial}{\partial r}\left(r^2\frac{\partial}{\partial r}\right)
-\frac{\hat{L}^2}{\hbar^2 r^2}
$$
となる。ここで $\hat{L}^2$ は角度変数のみに作用する演算子であるため、$r$ と $(\theta,\phi)$ の分離が機械的に成立する。



## 5. 変数分離：$\psi(r,\theta,\phi)=R(r)\,Y(\theta,\phi)$

波動関数を
$$
\psi(r,\theta,\phi)=R(r)\,Y(\theta,\phi)
$$
と置く。$R(r)$ は動径方向（半径方向）の関数であり、$Y(\theta,\phi)$ は角度方向の関数である。

この形をシュレーディンガー方程式へ代入し、両辺を $RY$ で割って整理すると
$$
-\frac{\hbar^2}{2\mu}
\left[
\frac{1}{R}\frac{1}{r^2}\frac{d}{dr}\left(r^2\frac{dR}{dr}\right)
-\frac{1}{\hbar^2 r^2}\frac{1}{Y}\hat{L}^2Y
\right]
-\frac{e^2}{4\pi\varepsilon_0 r}
=E
$$
となる。

左辺は「$r$ だけに依存する部分」と「角度だけに依存する部分」の和として書ける必要があるため、角度固有値問題を
$$
\hat{L}^2Y=\hbar^2\ell(\ell+1)Y
$$
と置く。この $\ell(\ell+1)$ が分離定数であり、$\ell$ が軌道角運動量量子数である。



## 6. 角度方程式：球面調和関数と量子数 $\ell,m$

角度部分は同時に
$$
\hat{L}_zY_{\ell m}=\hbar m\,Y_{\ell m}
$$
も満たす固有関数であり、これが球面調和関数 $Y_{\ell m}(\theta,\phi)$ である。

量子数の取り得る値は
$$
\ell=0,1,2,\dots,\qquad m=-\ell,-\ell+1,\dots,\ell
$$
である。

規格化は
$$
\int_{0}^{2\pi}\!\!\int_{0}^{\pi}
|Y_{\ell m}(\theta,\phi)|^2\,\sin\theta\,d\theta\,d\phi
=1
$$
である。ここで $\sin\theta\,d\theta\,d\phi$ は球面上の面積要素である。



## 7. 動径方程式：$R(r)$ と $u(r)=rR(r)$ の意味

動径方程式は
$$
\frac{1}{r^2}\frac{d}{dr}\left(r^2\frac{dR}{dr}\right)
+\left[
\frac{2\mu}{\hbar^2}\left(E+\frac{e^2}{4\pi\varepsilon_0 r}\right)
-\frac{\ell(\ell+1)}{r^2}
\right]R=0
$$
である。

ここで
$$
u(r)=rR(r)
$$
と置くと式が単純になる。これは数学的変形であると同時に、確率解釈の上でも意味がある。というのは
$$
\int |\psi|^2\,d^3r
=\int_0^\infty\int |R(r)|^2|Y|^2\,r^2\sin\theta\,dr\,d\theta\,d\phi
$$
より、角度部分を規格化したとき
$$
\int_0^\infty |R(r)|^2 r^2\,dr=1
$$
であり、$u=rR$ を用いると
$$
\int_0^\infty |u(r)|^2\,dr=1
$$
となるからである。すなわち $|u(r)|^2$ は「半径 $r$ に関する1次元の確率密度」として扱える。

計算としては
$$
R=\frac{u}{r},\qquad
\frac{dR}{dr}=\frac{1}{r}\frac{du}{dr}-\frac{u}{r^2}
$$
より
$$
r^2\frac{dR}{dr}=r\frac{du}{dr}-u
$$
さらに
$$
\frac{d}{dr}\left(r^2\frac{dR}{dr}\right)
=\frac{d}{dr}\left(r\frac{du}{dr}-u\right)
=r\frac{d^2u}{dr^2}
$$
であるから
$$
\frac{1}{r^2}\frac{d}{dr}\left(r^2\frac{dR}{dr}\right)=\frac{1}{r}\frac{d^2u}{dr^2}.
$$
これを代入し、全体に $r$ を掛けると
$$
\frac{d^2u}{dr^2}
+\left[
\frac{2\mu}{\hbar^2}\left(E+\frac{e^2}{4\pi\varepsilon_0 r}\right)
-\frac{\ell(\ell+1)}{r^2}
\right]u=0
$$
が得られる。



## 8. 束縛状態（$E<0$）の導入量：$\kappa$ とボーア半径 $a_0$

束縛状態では $E<0$ なので
$$
\kappa=\frac{\sqrt{-2\mu E}}{\hbar}
$$
と置く。$\kappa$ は長さの逆数の次元を持ち、波動関数が遠方で $e^{-\kappa r}$ 型に減衰する度合いを表す量である。

さらにボーア半径を
$$
a_0=\frac{4\pi\varepsilon_0\hbar^2}{\mu e^2}
$$
と定義する。$a_0$ は長さの次元を持ち、水素原子の空間的広がりの代表スケールを与える。換算質量 $\mu$ を使う点は、核が有限質量であることを最初から取り込むためである。

これらを用いると動径方程式は
$$
\frac{d^2u}{dr^2}+\left[-\kappa^2+\frac{2}{a_0}\frac{1}{r}-\frac{\ell(\ell+1)}{r^2}\right]u=0
$$
と書ける。

各項の意味は次の通りである。
- $-\kappa^2$：束縛に伴う指数減衰のスケールを与える項である。
- $\dfrac{2}{a_0}\dfrac{1}{r}$：クーロン引力由来の項であり、$r$ が小さいほど強い。
- $-\dfrac{\ell(\ell+1)}{r^2}$：遠心力に対応する有効反発項であり、$\ell>0$ で原点付近を避ける傾向を生む。



## 9. 無次元化：$\rho=2\kappa r$ と $\eta=1/(\kappa a_0)$ の意味

無次元変数
$$
\rho=2\kappa r
$$
を導入する。$\rho$ は $r$ を「減衰長 $1/\kappa$」で測った無次元距離である。

微分は
$$
\frac{d}{dr}=2\kappa\frac{d}{d\rho},\qquad
\frac{d^2}{dr^2}=4\kappa^2\frac{d^2}{d\rho^2}
$$
である。また
$$
\frac{1}{r}=\frac{2\kappa}{\rho},\qquad \frac{1}{r^2}=\frac{4\kappa^2}{\rho^2}
$$
である。

代入して整理すると
$$
\frac{d^2u}{d\rho^2}
+\left[
-\frac{1}{4}+\frac{1}{\kappa a_0}\frac{1}{\rho}-\frac{\ell(\ell+1)}{\rho^2}
\right]u=0
$$
を得る。

ここで
$$
\eta=\frac{1}{\kappa a_0}
$$
と置く。$\eta$ は無次元量であり、束縛の強さ（$\kappa$）と原子サイズ（$a_0$）の比を表す。後に $\eta$ が整数 $n$ に一致することが量子化条件となる。



## 10. 漸近形と多項式条件：量子化が生じる理由

### 10.1 大きい $\rho$ の極限（遠方）
$\rho\to\infty$ では $-\dfrac{1}{4}$ が支配的なので
$$
\frac{d^2u}{d\rho^2}-\frac{1}{4}u\approx 0
$$
となり、解は $u\sim e^{\pm \rho/2}$ である。正規化可能であるためには発散する $e^{+\rho/2}$ を捨て、
$$
u(\rho)\sim e^{-\rho/2}
$$
を選ぶ必要がある。

### 10.2 小さい $\rho$ の極限（原点近傍）
$\rho\to 0$ では $-\dfrac{\ell(\ell+1)}{\rho^2}$ が支配的なので
$$
\frac{d^2u}{d\rho^2}-\frac{\ell(\ell+1)}{\rho^2}u\approx 0
$$
となり、解は $u\sim \rho^{\ell+1}$ または $u\sim \rho^{-\ell}$ の形を持つ。原点で有限であるためには発散する $\rho^{-\ell}$ を捨て、
$$
u(\rho)\sim \rho^{\ell+1}
$$
を選ぶ必要がある。

### 10.3 形の仮定と $v(\rho)$ の方程式
以上を同時に満たすために
$$
u(\rho)=\rho^{\ell+1}e^{-\rho/2}v(\rho)
$$
と置く。ここで $v(\rho)$ は遠方と原点の主要因子を除いた残りであり、適切な条件のもとで多項式になる。

この代入を行うと $v(\rho)$ は
$$
\rho \frac{d^2v}{d\rho^2}+(2\ell+2-\rho)\frac{dv}{d\rho}+(\eta-\ell-1)v=0
$$
を満たす。これは陪ラゲール多項式に対応する微分方程式である。

正規化可能な束縛状態を得るためには、$v(\rho)$ が無限級数でなく有限次数の多項式で終わる必要がある。有限次数で終わる条件は
$$
\eta-\ell-1=n_r,\qquad n_r=0,1,2,\dots
$$
である。ここで $n_r$ は動径量子数であり、動径方向の節（ノード）数と関係する整数である。

したがって
$$
\eta=n_r+\ell+1\equiv n
$$
と書け、$n$ が主量子数である。よって
$$
n=1,2,3,\dots,\qquad \ell=0,1,\dots,n-1
$$
が得られる。



## 11. エネルギー準位 $E_n$ の導出（量子化条件からの計算）

$\eta=1/(\kappa a_0)=n$ より
$$
\kappa=\frac{1}{na_0}.
$$
一方 $\kappa=\sqrt{-2\mu E}/\hbar$ なので
$$
\frac{\sqrt{-2\mu E_n}}{\hbar}=\frac{1}{na_0}.
$$
両辺を二乗して
$$
\frac{-2\mu E_n}{\hbar^2}=\frac{1}{n^2a_0^2}
$$
よって
$$
E_n=-\frac{\hbar^2}{2\mu}\frac{1}{n^2a_0^2}.
$$
さらに $a_0=4\pi\varepsilon_0\hbar^2/(\mu e^2)$ を代入すると
$$
E_n
=-\frac{\mu e^4}{2(4\pi\varepsilon_0)^2\hbar^2}\frac{1}{n^2}.
$$
これが水素原子（非相対論、点電荷核）のエネルギー準位である。 



## 12. 基底状態のエネルギーと数値：$E_1\approx -13.6\ \mathrm{eV}$

無限に重い核を仮定すると $\mu\to m_e$ となり
$$
E_n=-\frac{m_e e^4}{2(4\pi\varepsilon_0)^2\hbar^2}\frac{1}{n^2}\equiv -\frac{\mathrm{Ry}}{n^2}
$$
と書ける。$\mathrm{Ry}$ はリュードベリエネルギーであり、基底状態（$n=1$）の結合エネルギーの大きさである。

実水素では換算質量を用いるため
$$
E_n= -\left(\frac{\mu}{m_e}\right)\frac{\mathrm{Ry}}{n^2}
$$
となり、$m_p$ が有限であるぶんだけわずかに修正される。

表：主量子数とエネルギー（目安）

| $n$ | $E_n$（無限核近似, eV） | $E_n$（水素, eV 目安） |
|---:|---:|---:|
| 1 | $-13.6057$ | $\approx -13.598$ |
| 2 | $-3.4014$ | $\approx -3.3996$ |
| 3 | $-1.5117$ | $\approx -1.5109$ |
| 4 | $-0.8504$ | $\approx -0.8499$ |

（精密値は定数推奨値と補正の扱いに依存する。） 



## 13. 波動関数 $\psi_{n\ell m}$ の構造と各要素の意味

固有関数は
$$
\psi_{n\ell m}(r,\theta,\phi)=R_{n\ell}(r)\,Y_{\ell m}(\theta,\phi)
$$
である。

- $Y_{\ell m}$ は角度依存を担い、軌道角運動量の固有状態を表す。
- $R_{n\ell}$ は半径方向の広がりと節構造を担う。
- 物理的確率は $|\psi|^2$ であり、球座標の体積要素 $d^3r=r^2\sin\theta\,dr\,d\theta\,d\phi$ と組み合わされる点が重要である。

動径関数は陪ラゲール多項式 $L_{n-\ell-1}^{2\ell+1}$ を用いて
$$
R_{n\ell}(r)=
\left(\frac{2}{na_0}\right)^{3/2}
\sqrt{\frac{(n-\ell-1)!}{2n\,(n+\ell)!}}\,
e^{-r/(na_0)}
\left(\frac{2r}{na_0}\right)^{\ell}
L_{n-\ell-1}^{2\ell+1}\!\left(\frac{2r}{na_0}\right)
$$
と書ける。ここで
- 指数因子 $e^{-r/(na_0)}$ が遠方での減衰を与える。
- $(2r/(na_0))^{\ell}$ が原点近傍での $r^{\ell}$ 的な振る舞い（遠心項の影響）を与える。
- $L_{n-\ell-1}^{2\ell+1}$ が節構造を与え、$n-\ell-1=n_r$ が動径節数と対応する。

### 13.1 基底状態（$n=1,\ell=0,m=0$）
$$
Y_{00}=\frac{1}{\sqrt{4\pi}},\qquad
R_{10}(r)=2a_0^{-3/2}e^{-r/a_0}
$$
より
$$
\psi_{100}(r,\theta,\phi)=\frac{1}{\sqrt{\pi a_0^3}}e^{-r/a_0}.
$$

半径方向の確率分布は
$$
P(r)\,dr=|\psi_{100}|^2\,4\pi r^2\,dr
=\frac{4}{a_0^3}r^2e^{-2r/a_0}\,dr
$$
であり、$P(r)$ は「半径が $r$ から $r+dr$ にある確率密度」を表す。最大は
$$
\frac{d}{dr}\left(r^2e^{-2r/a_0}\right)=0\quad\Rightarrow\quad r=a_0
$$
で起こる。



## 14. リュードベリ公式の導出：準位差と波長の関係

遷移 $n_2\to n_1$（$n_2>n_1$）で放出される光子のエネルギーは
$$
h\nu=\Delta E=E_{n_2}-E_{n_1}
=
\frac{\mu e^4}{2(4\pi\varepsilon_0)^2\hbar^2}
\left(\frac{1}{n_1^2}-\frac{1}{n_2^2}\right)
$$
である。$\nu=c/\lambda$ を用いると
$$
\frac{hc}{\lambda}
=
\frac{\mu e^4}{2(4\pi\varepsilon_0)^2\hbar^2}
\left(\frac{1}{n_1^2}-\frac{1}{n_2^2}\right)
$$
よって
$$
\frac{1}{\lambda}
=
R_H\left(\frac{1}{n_1^2}-\frac{1}{n_2^2}\right),
\qquad
R_H=
\frac{\mu e^4}{8\varepsilon_0^2h^3c}
$$
となる。これがリュードベリ公式である。

無限核極限では $\mu\to m_e$ として
$$
R_\infty=\frac{m_e e^4}{8\varepsilon_0^2h^3c}
$$
がリュードベリ定数（無限質量核）である。微細構造定数を用いると
$$
E_n=-\frac{\mu c^2\alpha^2}{2}\frac{1}{n^2},\qquad
R_\infty=\frac{\alpha^2 m_e c}{2h}
$$
とも書ける。 



## 15. スペクトル系列と選択則（意味づけの補足）

### 15.1 系列の定義
$$
\frac{1}{\lambda}
=
R_H\left(\frac{1}{n_1^2}-\frac{1}{n_2^2}\right)
$$
で $n_1$ を固定し、$n_2=n_1+1,n_1+2,\dots$ を動かすと系列が得られる。

| 系列 | 下準位 $n_1$ | 主な領域 |
|---|---:|---|
| ライマン系列 | 1 | 紫外 |
| バルマー系列 | 2 | 可視〜近紫外 |
| パッシェン系列 | 3 | 赤外 |
| ブラケット系列 | 4 | 赤外 |
| プフント系列 | 5 | 赤外 |

### 15.2 電気双極子（E1）遷移の選択則
電気双極子近似のもとで遷移行列要素が非ゼロとなる条件として
$$
\Delta \ell=\pm 1,\qquad \Delta m=0,\pm 1
$$
が得られる。これは角度積分（球面調和関数の積と $\cos\theta$ 等）から生じる条件であり、角運動量保存と整合する。



## 16. 縮退と対称性：なぜ $E_n$ は $n$ のみに依存するか

非相対論でクーロン $1/r$ ポテンシャルのとき、エネルギーが $n$ のみに依存し、同じ $n$ 内で $(\ell,m)$ が異なる状態が縮退する。

- $\ell=0,1,\dots,n-1$
- 各 $\ell$ に対して $m=-\ell,\dots,\ell$ で $(2\ell+1)$ 個
- 空間部分の縮退度は
$$
\sum_{\ell=0}^{n-1}(2\ell+1)=n^2
$$
である。電子スピンを含めればさらに2倍となる。

この高い縮退はクーロン問題の隠れた対称性に由来し、相対論補正やQED補正を加えると縮退が破れて微細構造やラムシフトとして観測される。 



## 17. 発展：相対論補正・QED補正・核サイズ補正

水素準位を精密に扱うとき、基礎となる $-R_\infty hc/n^2$ に対して小さな補正を加える表現が用いられる。例えば
$$
E_i=-\frac{R_\infty hc}{n_i^2}\left(1+\delta_i\right)
$$
のように書き、$\delta_i$ に相対論・QED・核サイズ等の寄与を含める。$\delta_i$ は $|\delta_i|\ll 1$ の補正因子である。 

### 17.1 微細構造（fine structure）
- 相対論的運動エネルギー補正
- スピン軌道相互作用
- ダーウィン項
などが寄与し、同じ $n$ でも $j$（全角運動量）により準位がずれる。

### 17.2 ラムシフト（Lamb shift）
QED効果（自己エネルギー、真空偏極など）により、ディラック理論で縮退していた準位（例：$2S_{1/2}$ と $2P_{1/2}$）がずれる。これはQEDの中心的検証対象であり、反水素分光にも拡張されている。 

### 17.3 超微細構造（hyperfine structure）
電子スピンと核スピンの相互作用により準位がさらに分裂する。水素基底状態の 21 cm 線（約 1420 MHz）は代表例である。

### 17.4 核サイズ補正と陽子半径
$s$ 状態（$\ell=0$）では原点付近の確率密度が非ゼロであるため、核が点でなく有限サイズであることがエネルギーへ影響する。この寄与が陽子電荷半径 $r_p$ と精密分光を結び付け、ミューオン水素を含む議論で陽子半径パズルが重要となった。 



## 18. 反水素分光への拡張

水素の理論骨格は反水素にも対応し、$1S$–$2S$ などの遷移の精密測定は物質・反物質の対称性検証へ直結する。近年のALPHA実験などで反水素のスペクトル構造の測定が報告されている。 



## まとめと展望

水素原子は、2体ハミルトニアンを重心運動と相対運動へ分離し、相対運動のシュレーディンガー方程式を球座標で変数分離することで、角度部分（球面調和関数）と動径部分（陪ラゲール多項式）へ還元できる系である。束縛状態で正規化可能である条件が量子化条件となり、主量子数 $n$ によって $E_n\propto -1/n^2$ が導かれ、準位差からリュードベリ公式が得られるのである。 

さらに、相対論補正とQED補正、核サイズ補正などを系統的に加えることで、微細構造、ラムシフト、超微細構造が理解でき、定数決定や標準理論検証、反水素分光へ展開できる。今後は、水素・重水素・ミューオン水素・ミューオニウム・反水素の横断的精密分光と理論の突き合わせが、原子物理と基礎物理の接点として重要性を増すのである。 



## 参考ドキュメント

1. CODATA Recommended Values（基礎物理定数の推奨値・水素準位理論の整理）   
2. Nature ダイジェスト：陽子半径パズルの状況（日本語解説）   
3. 日本語講義資料：水素原子のシュレーディンガー方程式と解法（大学講義ノート）   

## その他参考文献・参考情報

- CODATA推奨値の総説（Rev. Mod. Phys. 論文ページ）   
- CERN News：反水素分光の精密化（プレスリリース形式）   
- CERN Courier：反水素 $1S$–$2S$ 分光の解説   
- Nature Physics：反水素 $1S$–$2S$ の超微細成分観測   
- 日本語資料：素粒子・原子分光（ミューオン関連を含む）   
- 日本語資料：陽子半径に関する国内向け解説（PDF）   
