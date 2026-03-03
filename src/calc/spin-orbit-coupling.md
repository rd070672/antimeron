# スピン軌道相互作用と行列要素の基礎

スピン軌道相互作用は、電子の軌道運動とスピン自由度を結び付ける相対論的効果であり、磁気異方性、スピンホール効果、トポロジカル物性など多くの現象の根底にある基本ハミルトニアンである。  
その性質は角運動量演算子の行列表現として整理され、行列要素の構造を理解することで、ミクロな軌道混成からマクロな磁気物性までを一貫して説明できるようになる。


## 参考ドキュメント
1. 物理とはずがたり「スピン軌道相互作用とは何か」（日本語）
   https://monologuephysics.com/spin-orbit-interaction/
2. 東京大学 量子テクノロジープラットフォーム通信（日本語）
   https://tqp.isp.u-tokyo.ac.jp/
3. 日本物理学会誌（スピンホール効果などの解説記事が掲載される）
   https://jps.or.jp/books/jpsjournals/

## 1. スピン軌道相互作用の物理的起源

スピン軌道相互作用は、ディラック方程式の非相対論的極限から現れる補正項の一つとして導かれる。核のまわりを速度 $\mathbf{v}$ で運動する電子の立場から見ると、核電荷による電場 $\mathbf{E}$ はローレンツ変換により有効磁場 $\mathbf{B}_{\text{eff}}$ を生じ、電子スピン $\mathbf{S}$ とゼーマン相互作用を行う、という直観が得られる。

静電ポテンシャル $V(r)$ の中心力場を仮定すると、スピン軌道相互作用ハミルトニアンは

$$
H_{\text{SO}}
= \frac{1}{2m_e^2c^2}\frac{1}{r}\frac{dV}{dr}\,\mathbf{L}\cdot\mathbf{S}
\equiv \xi(r)\,\mathbf{L}\cdot\mathbf{S}
$$

と書ける。ここで $\mathbf{L}$ は軌道角運動量、$\mathbf{S}$ はスピン角運動量であり、$\xi(r)$ は半径方向の結合定数である。原子番号が大きいほど $dV/dr$ が大きくなり、スピン軌道相互作用が強くなることが概略として理解できる。

固体中では、この原子内の $H_{\text{SO}}$ に加え、結晶ポテンシャルの空間反転対称性の破れに由来するラシュバ型・ドレッセルハウス型のスピン軌道相互作用が現れ、バンド構造のスピン分裂やスピントルク、スピン流生成の源となる。

## 2. 一電子ハミルトニアンとしての $\mathbf{L}\cdot\mathbf{S}$

中心力場中の一電子ハミルトニアンは

$$
H = H_0 + H_{\text{SO}}
= \frac{\mathbf{p}^2}{2m_e} + V(r) + \xi(r)\,\mathbf{L}\cdot\mathbf{S}
$$

で与えられる。角運動量演算子の交換関係

$$
[L_i, L_j] = i\hbar \epsilon_{ijk} L_k,
\quad
[S_i, S_j] = i\hbar \epsilon_{ijk} S_k
$$

および $\mathbf{L}$ と $\mathbf{S}$ が互いに可換であることから、全角運動量

$$
\mathbf{J} = \mathbf{L} + \mathbf{S}
$$

を導入すると、スピン軌道相互作用は

$$
\mathbf{L}\cdot\mathbf{S}
= \frac{1}{2}\left(\mathbf{J}^2 - \mathbf{L}^2 - \mathbf{S}^2\right)
$$

と書ける。この形は、$\mathbf{J}^2$ の固有値を用いた対角化に非常に都合がよい。

通常、$V(r)$ と $\xi(r)$ の半径方向部分は原子内で急峻に変化するため、原子ごとの有効パラメータ $\lambda$ として

$$
H_{\text{SO}} \simeq \lambda\,\mathbf{L}\cdot\mathbf{S}
$$

と近似し、軌道基底に対する有限次元の行列として扱うことが多い。第一原理計算やタイトバインディング模型では、この $\lambda$ を元素ごと・軌道ごとに与えてハミルトニアン行列を構成する、という形が頻出する。


## 3. 全角運動量 $J$ を用いた対角化と固有値

量子数 $l$（軌道）と $s$（スピン）を固定すると、全角運動量 $j$ は

$$
j = l \pm s
$$

を取り、$\mathbf{J}^2$ の固有値は $\hbar^2 j(j+1)$ である。よってスピン軌道相互作用の固有値は

$$
\langle H_{\text{SO}} \rangle
= \lambda \frac{\hbar^2}{2}\left[j(j+1)-l(l+1)-s(s+1)\right]
$$

となる。電子では $s=1/2$ であるから、$p$ 軌道（$l=1$）、$d$ 軌道（$l=2$）についてまとめると次のようになる。

| 軌道 | $l$ | $j$ | $\langle \mathbf{L}\cdot\mathbf{S} \rangle / \hbar^2$ | レベルの分裂 |
|---|---|---|---|---|
| $p$ 殻 | 1 | $3/2$ | $+\frac{1}{2}$ | 高スピン軌道レベル |
|       |   | $1/2$ | $-1$           | 低スピン軌道レベル |
| $d$ 殻 | 2 | $5/2$ | $+1$           | 高スピン軌道レベル |
|       |   | $3/2$ | $-\frac{3}{2}$ | 低スピン軌道レベル |

分裂幅は

$$
\Delta E_{l}
= \lambda\hbar^2 \left[
\frac{1}{2}\left(j_+ (j_+ +1)-l(l+1)-s(s+1)\right)
-
\frac{1}{2}\left(j_- (j_- +1)-l(l+1)-s(s+1)\right)
\right]
$$

で与えられ、$l$ が大きいほど分裂も大きくなる。この描像は原子スペクトルの精細構造として理解されている。


## 4. $\lvert l,m_l; s,m_s\rangle$ 基底での行列要素

行列要素を具体的に計算する場合、角運動量演算子の昇降演算子を用いた表現が便利である。

$$
\mathbf{L}\cdot\mathbf{S}
= L_z S_z + \frac{1}{2}\left(L_+ S_- + L_- S_+\right)
$$

ここで

$$
L_{\pm} = L_x \pm i L_y,
\quad
S_{\pm} = S_x \pm i S_y
$$

である。$L_z,S_z$ の固有状態 $\lvert l,m_l; s,m_s\rangle$ に対して

$$
\begin{aligned}
L_z \lvert l,m_l\rangle &= \hbar m_l \lvert l,m_l\rangle,\\
L_{\pm} \lvert l,m_l\rangle &= \hbar \sqrt{l(l+1)-m_l(m_l\pm 1)}\,\lvert l,m_l\pm 1\rangle,
\end{aligned}
$$

スピンについても

$$
\begin{aligned}
S_z \lvert s,m_s\rangle &= \hbar m_s \lvert s,m_s\rangle,\\
S_{\pm} \lvert s,m_s\rangle &= \hbar \sqrt{s(s+1)-m_s(m_s\pm 1)}\,\lvert s,m_s\pm 1\rangle
\end{aligned}
$$

となる。したがって行列要素は

$$
\begin{aligned}
\langle l,m_l',s,m_s'|\mathbf{L}\cdot\mathbf{S}|l,m_l,s,m_s\rangle
&= \hbar^2 m_l m_s \,\delta_{m_l',m_l}\delta_{m_s',m_s} \\
&\quad + \frac{\hbar^2}{2}
\Big[
\sqrt{l(l+1)-m_l(m_l+1)}\sqrt{s(s+1)-m_s(m_s-1)}\\
&\hspace{2em}\times\delta_{m_l',m_l+1}\delta_{m_s',m_s-1}\\
&\quad + \sqrt{l(l+1)-m_l(m_l-1)}\sqrt{s(s+1)-m_s(m_s+1)}\\
&\hspace{2em}\times\delta_{m_l',m_l-1}\delta_{m_s',m_s+1}
\Big]
\end{aligned}
$$

となる。ここから、スピン軌道相互作用は
- $m_l$ と $m_s$ を保存する対角成分（$L_z S_z$）
- $m_l$ と $m_s$ を同時に一段ずつ変える成分（$L_+S_-,L_-S_+$）

のみを結び付けることがわかる。すなわち全磁気量子数 $m_j = m_l + m_s$ を保存する選択則が自然に現れ、ハミルトニアン行列は $m_j$ ごとのブロックに分解される。

さらに、全角運動量基底 $\lvert j,m_j\rangle$ と $\lvert l,m_l; s,m_s\rangle$ はクレブシュ–ゴルダン係数 $C_{l m_l, s m_s}^{j m_j}$ を用いて

$$
\lvert j,m_j\rangle
= \sum_{m_l,m_s} C_{l m_l, s m_s}^{j m_j}
\lvert l,m_l; s,m_s\rangle
$$

で結び付けられ、$\mathbf{L}\cdot\mathbf{S}$ は $\lvert j,m_j\rangle$ 基底では対角となる。この関係を用いると、数値計算では

$$
H_{\text{SO}}^{(l,m_l,s,m_s)}
= U^\dagger
\begin{pmatrix}
E_{j_+}\mathbf{1} & 0\\
0 & E_{j_-}\mathbf{1}
\end{pmatrix}
U
$$

という形で行列表現を構成できる。ここで $U$ はクレブシュ–ゴルダン係数から作られるユニタリ行列である。


## 5. 実球面調和関数（$d$軌道）でのスピン軌道行列

固体の電子状態議論では、複素球面調和関数 $Y_l^m$ よりも、実線形結合から得られる実球面調和関数（$d_{xy},d_{yz},d_{zx},d_{x^2-y^2},d_{3z^2-r^2}$ など）を基底とすることが多い。この場合、軌道角運動量演算子 $\mathbf{L}$ は $5\times 5$ の行列として与えられる。

基底を

$$
\left(
\lvert d_{xy}\rangle,
\lvert d_{yz}\rangle,
\lvert d_{zx}\rangle,
\lvert d_{x^2-y^2}\rangle,
\lvert d_{3z^2-r^2}\rangle
\right)
$$

と選ぶと、$L_z$ の行列表現は一例として

$$
L_z
= \hbar
\begin{pmatrix}
0 & 0 & 0 & 2i & 0\\
0 & 0 & i & 0 & 0\\
0 & -i & 0 & 0 & 0\\
-2i & 0 & 0 & 0 & 0\\
0 & 0 & 0 & 0 & 0
\end{pmatrix}
$$

のような形をとる（規約や基底の取り方により符号や並び順は変化する）。ここから、例えば $t_{2g}$ 軌道間の行列要素が純虚数になり、スピンと結合した際に磁気異方性エネルギーやスピン混成に寄与する様子が見て取れる。

スピン自由度を含めると、基底は

$$
\lvert \phi_\mu,\sigma\rangle
=
\lvert d_\mu\rangle\otimes\lvert\sigma\rangle,
\quad
\mu = xy,yz,zx,x^2-y^2,3z^2-r^2,
\quad
\sigma=\uparrow,\downarrow
$$

と書けるので、$H_{\text{SO}}=\lambda \mathbf{L}\cdot\mathbf{S}$ は $10\times 10$ の行列となる。$\mathbf{L}$ の行列表現とパウリ行列

$$
\mathbf{S} = \frac{\hbar}{2}\boldsymbol{\sigma}
$$

をテンソル積で組み合わせることで、スピン軌道行列要素

$$
\langle \phi_{\mu'},\sigma'|H_{\text{SO}}|\phi_\mu,\sigma\rangle
$$

が明示的に求まる。これらの行列要素は、磁気異方性エネルギーやスピンテクスチャ、磁気トルクの起源を解析するうえで直接的な入力となる。


## 6. 結晶場：$t_{2g}$–$e_g$ 分裂と有効スピン

遷移金属化合物では、結晶場分裂とスピン軌道相互作用の相対関係が重要である。八面体場を例にすると、
- 結晶場：$d$ 軌道を $t_{2g}$ と $e_g$ に分裂（エネルギー差 $\Delta_{\text{CF}}$）
- スピン軌道相互作用：多重項の中で有効全角運動量準位を形成

という構図となる。

$\lambda \ll \Delta_{\text{CF}}$ では、まず結晶場で $t_{2g},e_g$ を分け、その後 $t_{2g}$ 内の擬似角運動量 $\tilde{L}=1$ に対して

$$
H_{\text{SO}}^{(t_{2g})} \simeq -\lambda \tilde{\mathbf{L}}\cdot\mathbf{S}
$$

として扱える。これにより、重元素酸化物などで知られる $J_{\text{eff}}=1/2$ 型の有効スピン描像が得られる。


## 7. バンド構造におけるスピン軌道相互作用

固体中では、原子内の $\lambda \mathbf{L}\cdot\mathbf{S}$ に加えて、運動量依存のスピン軌道相互作用が現れる。代表的なものをまとめると次のようになる。

| 種類 | ハミルトニアンの形 | 対称性起源 | 主な物理現象 |
|---|---|---|---|
| 原子内 $L\cdot S$ | $\lambda \mathbf{L}\cdot\mathbf{S}$ | 原子内電場 | ファインストラクチャー、磁気異方性、バンド反転 |
| ラシュバ型 | $H_R=\alpha(\hat{\mathbf{z}}\times\mathbf{k})\cdot\boldsymbol{\sigma}$ | 構造反転対称性の破れ | 表面・界面のスピン分裂、スピン流生成 |
| ドレッセルハウス型 | $H_D \propto k_x(k_y^2-k_z^2)\sigma_x + \dots$ | 結晶の反転対称性の破れ | 半導体のスピン緩和、スピン干渉 |
| 有効 $k\cdot p$ SOC | $H_{\text{SO}}^{\text{eff}} \propto (\mathbf{k}\times\nabla V)\cdot\boldsymbol{\sigma}$ | バンド混成と対称性 | トポロジカル絶縁体、スピンホール効果 |

ここで $\boldsymbol{\sigma}$ はパウリ行列、$\mathbf{k}$ は結晶運動量である。ラシュバ型とドレッセルハウス型の強さと符号の制御は、ヘテロ構造や界面におけるスピン操作の設計指針として活発に研究されている。


## 8. スピン軌道行列要素

スピン軌道相互作用の行列要素は、さまざまな観測量に直接反映される。

1. 磁気異方性エネルギー  
   結晶軸に沿った量子化軸の違いにより、$H_{\text{SO}}$ の期待値が変化し磁化容易軸が定まる。摂動論的には、スピン軌道相互作用が占有・非占有準位を混成させる効果を通じて

   $$
   K \sim \sum_{o,u}\frac{|\langle u|H_{\text{SO}}|o\rangle|^2}{\varepsilon_u-\varepsilon_o}
   $$

   として評価されることが多い（$o,u$ は占有・非占有状態）。

2. g因子と有効角運動量  
   スピンと軌道の結合により、磁化応答は単純なスピンのみではなく、$J$ に対するランデ g 因子

   $$
   g_J = 1 + \frac{j(j+1)+s(s+1)-l(l+1)}{2j(j+1)}
   $$

   を通じて整理できる。重元素系ではこの g 因子の異方性が磁化測定や共鳴応答に強く現れうる。

3. スピンホール効果・異常ホール効果  
   バンドのスピン軌道混成とベリー曲率がホール応答に寄与し、その大きさは $H_{\text{SO}}$ の行列要素とバンド構造の詳細に敏感である。

4. 散乱率と緩和時間  
   スピン軌道相互作用はスピンフリップ散乱を許容し、スピン緩和時間や輸送のスピン依存性を生む。微視的には、散乱ポテンシャル中の $H_{\text{SO}}$ 行列要素が遷移確率に現れる。

## 9. 第一原理計算・モデル計算における行列要素の構成
電子状態計算コードでは、スピン軌道相互作用は概ね次のように行列要素へ落とし込まれている。

1. 原子ごとに、局所球対称な有効ポテンシャル $V(r)$ から $\xi(r)$ を評価し、軌道ごとの有効係数 $\lambda_l$ を導入する。  
2. 原子軌道基底（球面調和関数、または実球面調和関数）で $\mathbf{L}$ の行列表現を求める。  
3. スピン自由度を含めた基底 $\lvert \phi_\mu,\sigma\rangle$ 上で、$\mathbf{L}\cdot\mathbf{S}$ をテンソル積行列として構成する。  
4. 必要に応じて、結晶場基底（$t_{2g},e_g$ など）、バンド基底、Wannier 基底へユニタリ変換し、効果的なスピン軌道行列要素を得る。  

この構成により、スピン軌道相互作用を含んだ磁気異方性エネルギー、スピンテクスチャ、トポロジカル不変量などの評価が可能となる。


## まとめ
スピン軌道相互作用は、相対論的補正として現れる $\xi(r)\,\mathbf{L}\cdot\mathbf{S}$ により、軌道角運動量とスピン角運動量を結び付ける基本相互作用である。全角運動量 $\mathbf{J}=\mathbf{L}+\mathbf{S}$ を導入すると $\mathbf{L}\cdot\mathbf{S}$ は $J^2$ を通じて簡潔に対角化され、原子準位の $j$ 分裂として理解できる。  

一方で、$\lvert l,m_l; s,m_s\rangle$ 基底や実球面調和関数基底では、$\mathbf{L}\cdot\mathbf{S}$ は有限次元の行列として具体化され、その行列要素がスピンフリップ過程、磁気異方性、バンドのスピン分裂の源となる。角運動量代数とクレブシュ–ゴルダン係数の関係を踏まえて行列要素の構造を整理することで、原子スケールの軌道混成から固体のバンド物性までを統一的に理解できるのである。

## 関連研究
- R. Winkler, Spin–Orbit Coupling Effects in Two-Dimensional Electron and Hole Systems, Springer.
- D. Bercioux and P. Lucignano, Rep. Prog. Phys. 78, 106001 (2015).
- Tohoku University Press Release: Controlled sign change in the spin-orbit interaction (2018).
- Wikipedia: Spin–orbit interaction（数式と歴史的背景の概観）
  https://en.wikipedia.org/wiki/Spin%E2%80%93orbit_interaction
- Wikipedia: Rashba effect（ラシュバ型相互作用の概説）
  https://en.wikipedia.org/wiki/Rashba_effect
