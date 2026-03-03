# ヘリウム原子をDFTで解析する

ヘリウム原子は2電子系であり、電子間反発 $1/r_{12}$ により厳密な変数分離解を持たないため、密度汎関数理論（DFT）の近似の性質を検証する最小の多電子モデルになるのである。ここでは、He をKohn–Sham DFTで定式化し、1s軌道像（KS軌道）、全エネルギー、電離エネルギー、励起状態（TDDFT等）へどう接続するかを、数式の意味を補いながら整理するのである。

### 参考ドキュメント
1. W. Kohn and L. J. Sham, Self-Consistent Equations Including Exchange and Correlation Effects, Phys. Rev. 140, A1133 (1965). https://doi.org/10.1103/PhysRev.140.A1133
2. P. Hohenberg and W. Kohn, Inhomogeneous Electron Gas, Phys. Rev. 136, B864 (1964). https://doi.org/10.1103/PhysRev.136.B864
3. 常田貴夫（理研）資料「密度汎関数法の基礎（Kohn–Sham方程式など）」PDF（日本語） https://www2.riken.jp/qcl/members/tsuneda/web/dft05-sec1.pdf


## 0. 記号と前提（単位・座標・スピン）

$$
\mathbf{r}
$$
空間座標（核位置を原点）である。

$$
n(\mathbf{r})
$$
電子密度である。He は電子数 $N=2$ であり、
$$
\int n(\mathbf{r})\,d^3r = 2
$$
を満たす。

$$
Z
$$
核電荷である。He では $Z=2$ である。

原子単位系（atomic units）を用いる。ここで
$$
\hbar = m_e = e = 4\pi\varepsilon_0 = 1
$$
であり、エネルギー単位は Hartree、長さ単位はボーア半径 $a_0$ である。



## 1. He の多体シュレーディンガー方程式と DFT への移行の動機

Born–Oppenheimer 近似（核固定）のもとで、He の非相対論的ハミルトニアンは

$$
\hat{H}
=
-\frac{1}{2}\nabla_1^2
-\frac{1}{2}\nabla_2^2
-\frac{Z}{r_1}
-\frac{Z}{r_2}
+\frac{1}{r_{12}}
\qquad (Z=2)
$$
である。

- $\nabla_i^2$ は電子 $i$ のラプラシアンであり運動エネルギーを表す。
- $r_i=|\mathbf{r}_i|$ は電子 $i$ と核の距離である。
- $r_{12}=|\mathbf{r}_1-\mathbf{r}_2|$ は電子間距離であり、$\frac{1}{r_{12}}$ が電子相関の原因である。

DFT は、この多体波動関数 $\Psi(\mathbf{r}_1,\mathbf{r}_2,s_1,s_2)$ を直接求める代わりに、基底状態物理量を電子密度 $n(\mathbf{r})$ の汎関数として扱う枠組みである。



## 2. Hohenberg–Kohn（HK）定理：外部ポテンシャルと密度の一意性

外部ポテンシャルを

$$
v_{\mathrm{ext}}(\mathbf{r}) = -\frac{Z}{r}
$$
とする（He 原子の核−電子クーロン引力である）。

HK 定理の要点は、基底状態密度 $n(\mathbf{r})$ が（定数を除いて）外部ポテンシャル $v_{\mathrm{ext}}(\mathbf{r})$ を一意に定め、したがってハミルトニアンと基底状態の全ての物理量を定めることである。

このとき、基底状態全エネルギーは

$$
E[n] = F[n] + \int v_{\mathrm{ext}}(\mathbf{r})\,n(\mathbf{r})\,d^3r
$$
と書ける。

- $E[n]$ は密度の汎関数である。
- $F[n]$ は普遍汎関数であり、系に依らない（運動エネルギーと電子間相互作用を含む）成分である。



## 3. Kohn–Sham（KS）方程式：相互作用系を1電子方程式へ写像する

KS は、相互作用電子系の密度を、ある非相互作用系の密度として再現する写像を導入する。非相互作用系の一電子方程式は

$$
\left[
-\frac{1}{2}\nabla^2 + v_{\mathrm{eff}}(\mathbf{r})
\right]\phi_i(\mathbf{r})
=
\varepsilon_i\,\phi_i(\mathbf{r})
$$
である。

- $\phi_i(\mathbf{r})$ はKS軌道（空間軌道）である。
- $\varepsilon_i$ はKS固有値（軌道エネルギー）である。
- $v_{\mathrm{eff}}$ は有効ポテンシャルである。

有効ポテンシャルは

$$
v_{\mathrm{eff}}(\mathbf{r})
=
v_{\mathrm{ext}}(\mathbf{r})
+
v_{\mathrm{H}}(\mathbf{r})
+
v_{\mathrm{xc}}(\mathbf{r})
$$
と分解される。

### 3.1 Hartree（静電）項

$$
v_{\mathrm{H}}(\mathbf{r})
=
\int \frac{n(\mathbf{r}')}{|\mathbf{r}-\mathbf{r}'|}\,d^3r'
$$
である。

- これは電子密度が作る古典的静電ポテンシャルである。
- He の「2電子の平均反発」を表すが、交換・相関は含まない。

### 3.2 交換相関（XC）項

交換相関エネルギー汎関数 $E_{\mathrm{xc}}[n]$ を導入し、

$$
v_{\mathrm{xc}}(\mathbf{r})=\frac{\delta E_{\mathrm{xc}}[n]}{\delta n(\mathbf{r})}
$$
で定義する。

- $\delta/\delta n$ は汎関数微分である。
- $E_{\mathrm{xc}}$ は、非相互作用運動エネルギーへの置換で生じる差分、および電子間相互作用のうち Hartree では表せない交換・相関を全て吸収する。



## 4. He（閉殻一重項）に特化したKSの形：1つの空間軌道に2電子が入る

He の基底状態はスピン一重項（全スピン $S=0$）であり、KSでは閉殻配置として

- 空間軌道：$\phi_{1s}(\mathbf{r})$ を1本
- スピン：$\alpha,\beta$ を占有

という形になる。

このとき密度は

$$
n(\mathbf{r}) = 2\,|\phi_{1s}(\mathbf{r})|^2
$$
である。

- 係数2は、同じ空間軌道にスピン上・下の2電子が占有することを表す。

KS方程式は

$$
\left[
-\frac{1}{2}\nabla^2
-\frac{Z}{r}
+
\int \frac{n(\mathbf{r}')}{|\mathbf{r}-\mathbf{r}'|}\,d^3r'
+
v_{\mathrm{xc}}(\mathbf{r})
\right]\phi_{1s}(\mathbf{r})
=
\varepsilon_{1s}\,\phi_{1s}(\mathbf{r})
$$
となる（$Z=2$）。

この式は「He の電子軌道（1s）」を DFT の内部（KS写像）で定義する中心式である。



## 5. 全エネルギーの評価式：He の基底状態エネルギーをどう出すか

KS-DFT の全エネルギーは、KS軌道から得られる密度を用いて

$$
E[n]
=
T_s[n]
+
\int v_{\mathrm{ext}}(\mathbf{r})n(\mathbf{r})\,d^3r
+
E_{\mathrm{H}}[n]
+
E_{\mathrm{xc}}[n]
$$
と書ける。

- $T_s[n]$ はKS軌道から計算される「非相互作用系の運動エネルギー」である。
- $E_{\mathrm{H}}[n]=\frac{1}{2}\iint \frac{n(\mathbf{r})n(\mathbf{r}')}{|\mathbf{r}-\mathbf{r}'|}\,d^3r\,d^3r'$ はHartreeエネルギーである。
- $E_{\mathrm{xc}}[n]$ が交換相関の寄与である。

He では $n(\mathbf{r})$ が球対称に収束するため、全体の解釈は比較的明快である一方、$E_{\mathrm{xc}}$ 近似の影響は直接的に現れるのである。



## 6. 交換相関汎関数の選択：He における意味合い

He は「結合距離」などを持たない孤立原子であり、汎関数の性格（交換の扱い、自己相互作用誤差、漸近形）を見やすい対象である。

### 6.1 LDA / GGA

$$
E_{\mathrm{xc}}^{\mathrm{LDA}}[n]
=
\int n(\mathbf{r})\,\varepsilon_{\mathrm{xc}}(n(\mathbf{r}))\,d^3r
$$
である。

- $\varepsilon_{\mathrm{xc}}(n)$ は一様電子気体の交換相関エネルギー密度である。
- GGA はさらに $\nabla n$ など密度勾配への依存を追加する。

LDA/GGA は多くの系で全エネルギーや構造に有用であるが、有限系（原子・分子）では $v_{\mathrm{xc}}$ の遠方漸近 $(-1/r)$ が不十分になりやすく、電離エネルギーや励起の議論では差が現れやすいのである。

### 6.2 ハイブリッド・正確交換（EXX）

交換項にHartree–Fock型の正確交換を混ぜる、あるいはKS枠内で正確交換を扱う（EXX）ことで、自己相互作用誤差の一部が減り、軌道エネルギー・ポテンシャル形状の改善が見込まれる。

ただし He のような小系では、そもそも「厳密KSポテンシャル」が（密度からの反転で）定義可能であり、近似がどこでずれるかを比較する対象にもなるのである。



## 7. 電離エネルギーの扱い：ΔSCF と「IP定理（HOMO=-I）」の関係

He の第一電離エネルギー $I$ は

$$
I = E(\mathrm{He}^+) - E(\mathrm{He})
$$
で定義される（原子単位系なら Hartree で得られ、eV へは $1\ \mathrm{Ha}\approx 27.2114\ \mathrm{eV}$ で換算する）。

- これは ΔSCF（デルタSCF）と呼ばれる評価であり、DFTでも比較的頑健に実行できることが多い。
- $\mathrm{He}^+$ は1電子系であり、交換相関の意味合いが He より単純になるため、誤差の源を切り分ける材料にもなる。

一方、厳密なKS-DFTでは、有限系の基底状態に対して

$$
\varepsilon_{\mathrm{HOMO}} = -I
$$
が成立する（IP定理である）。ここで $\varepsilon_{\mathrm{HOMO}}$ は最高占有KS軌道の固有値である。

しかし、近似汎関数（LDA/GGA等）では $v_{\mathrm{xc}}$ の漸近形や自己相互作用誤差のために、この等式が破れることが多い。したがって He の解析では、少なくとも

- ΔSCF による $I$
- $\varepsilon_{1s}$（He のHOMO）から見た $-\,\varepsilon_{1s}$

の両方を比較すると、汎関数近似の性格が可視化されるのである。



## 8. He の「軌道（1s, 2s, 2p …）」をDFTでどう扱うか

He の基底状態で占有されるKS軌道は事実上 1s のみである。2s や 2p は非占有（仮想）軌道としてKS方程式の固有解に現れるが、次の点を明確にする必要がある。

- KSの非占有準位差 $\varepsilon_{2p}-\varepsilon_{1s}$ は、一般に「実在の励起エネルギー」ではない。
- 励起を扱うには、時間依存DFT（TDDFT）や、励起状態向けの枠組み（ensemble DFTなど）を用いるのが筋である。

このことは He のような単純系でも本質的であり、DFTの「基底状態理論としての役割」と「励起への拡張」の境界を理解する題材となるのである。



## 9. 励起状態：He を TDDFT（あるいはKS反転）で扱う位置づけ

時間依存DFTは、密度の時間発展を扱い、線形応答の枠組みで励起エネルギーを与える。He は、厳密解（多体計算）や高精度分光と比較できるため、TDDFT の近似（交換相関カーネルの近似）がどのように効くかを検討する基礎系になるのである。

また、He では「厳密密度」からKS方程式を反転して厳密 $v_{\mathrm{xc}}$ を得る研究もあり、DFTの形式的性質（IP定理、ポテンシャルのステップ構造等）の理解に使われるのである。



## 10. 周期境界条件コードでの孤立He原子：計算設定の要点（概念）

多くのDFTコードは3次元周期境界条件を仮定するため、孤立原子を扱うには「大きな真空を含む超胞」を用いて、周期像の相互作用を小さくする必要がある。

- 中性 He（He^0）は全電荷が0であり、セルを十分大きくすると周期像相互作用は急速に小さくなる。
- 荷電系（He^+ など）は周期系に補償背景が入り、有限サイズ補正（例：Makov–Payne補正）や、より適切な孤立系境界条件（例：ESM、クーロンカットオフ等）が論点となる。

したがって「He の電離エネルギー」を周期コードで求める場合、He と He^+ の両方でセルサイズ・境界条件の影響を揃えて比較する設計が必要になるのである。



## 11. まとめと展望

He 原子のDFT解析は、HK定理とKS方程式に基づき、2電子系の基底状態密度を1電子方程式の自己無撞着解として構成し、KS軌道（1s）と全エネルギーを得る手順として整理できるのである。さらに、ΔSCF による電離エネルギーと、厳密理論で成り立つ $\varepsilon_{\mathrm{HOMO}}=-I$ の関係を併せて見ることで、自己相互作用誤差やポテンシャル漸近形といった汎関数近似の性質が明確になる。

展望として、He は励起や時間発展を含むTDDFT・ensemble DFT・厳密KS反転の検証対象としても重要であり、基底状態DFTの限界と拡張の要点を短い数式で追える希少な系である。したがって He で得た理解は、多電子原子・分子、さらには固体の電子状態計算の解釈へ、理論の骨格として接続されるのである。



### その他参考にしたsources
- 尾崎泰助（東大物性研）講義資料「第一原理電子状態計算の基礎と応用（DFT-KS、LDA/GGA、Janakの定理等）」PDF（日本語） https://t-ozaki.issp.u-tokyo.ac.jp/mpcoms2021_lectures/Ozaki-Lec4.pdf
- J. Li et al., Comparing many-body approaches against the helium benchmark: exact DFT and exact XC potentialなど（SciPost Phys. 6, 040, 2019）PDF https://scipost.org/SciPostPhys.6.4.040/pdf
- D. Dar et al., Exact time-dependent density-functional theory for helium by KS inversion, Phys. Rev. A 104, 032821 (2021). https://doi.org/10.1103/PhysRevA.104.032821
- Quantum ESPRESSO documentation（孤立系・荷電系の扱いに関する入力説明：tot_charge 等） https://www.quantum-espresso.org/Doc/INPUT_CP.html
- O. Andreussi and N. Marzari, Electrostatics in periodic boundary conditions（孤立系近似と補正の議論）Phys. Rev. B 90, 245101 (2014). https://doi.org/10.1103/PhysRevB.90.245101
- A. K. Roy, Density-functional calculations on excited states of helium（KS方程式の数値解法を含む）Phys. Rev. A 65, 052508 (2002). https://doi.org/10.1103/PhysRevA.65.052508
