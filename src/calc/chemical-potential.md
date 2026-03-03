# 化学ポテンシャルと自由エネルギー

化学ポテンシャル $\mu$ は、物質量が変化し得る系において自由エネルギーがどの向きに変化するかを支配する状態量である。相平衡・反応平衡・拡散・電気化学・電子系のフェルミ準位までを一つの記号で接続する中心概念である。


## 参考ドキュメント

1. IUPAC Gold Book: chemical potential (C01032), DOI: 10.1351/goldbook.C01032  
   https://goldbook.iupac.org/terms/view/C01032

2. MIT OpenCourseWare, 3.012 Fundamentals of Materials Science (Fall 2005): Chemical potentials and the Gibbs free energy (Lecture note PDF)  
   https://ocw.mit.edu/courses/3-012-fundamentals-of-materials-science-fall-2005/ec4312b41d81e7c9f7c1aca1534f6877_lec10t.pdf

3. 東京大学 理学部 物理学科（講義ノート）熱力学講義ノート（日本語, PDF）  
   https://cat.phys.s.u-tokyo.ac.jp/lecture/TD_22/Thermodynamics_0701.pdf
  


## 1. 記号と前提

- 成分の物質量：$n_i$（または粒子数 $N_i$）
- 温度：$T$
- 圧力：$p$
- 体積：$V$
- エントロピー：$S$
- 内部エネルギー：$U$
- ヘルムホルツ自由エネルギー：$F=U-TS$
- ギブズ自由エネルギー：$G=U-TS+pV$
- ボルツマン定数：$k_{\mathrm B}$
- 気体定数：$R=N_{\mathrm A}k_{\mathrm B}$
- 化学ポテンシャル：$\mu_i$

化学ポテンシャルは成分ごとに定義され、一般に温度・圧力・組成に依存する。多成分系では $\mu_i$ がベクトルとして存在する。



## 2. 熱力学における定義

### 2.1 基本関係式（開いた系の第一法則）

物質出入りを許す可逆変化を含むとき、内部エネルギーの全微分は
$$
dU = T\,dS - p\,dV + \sum_i \mu_i\,dn_i
$$
で書ける。この式は、化学ポテンシャルが「エネルギーの物質量微分係数」として導入されることを示す。

同様に、自由エネルギーの自然変数に沿った微分は
$$
dF = -S\,dT - p\,dV + \sum_i \mu_i\,dn_i,
$$
$$
dG = -S\,dT + V\,dp + \sum_i \mu_i\,dn_i
$$
である。温度と圧力を制御しやすい状況では $G(T,p,\{n_i\})$ を用いると、化学ポテンシャルは
$$
\mu_i = \left(\frac{\partial G}{\partial n_i}\right)_{T,p,n_{j\neq i}}
$$
で与えられる。

### 2.2 純物質での解釈

純物質（単一成分）では
$$
\mu = \frac{G}{n} = G_m
$$
となり、化学ポテンシャルはモルギブズエネルギー（モル自由エネルギー）に一致する。



## 3. 部分モル量としての化学ポテンシャル

多成分系では、ギブズ自由エネルギーの成分 $i$ に関する部分モル量
$$
\bar{G}_i \equiv \left(\frac{\partial G}{\partial n_i}\right)_{T,p,n_{j\neq i}}
$$
が定義される。化学ポテンシャルはこの部分モルギブズエネルギーそのものであり、
$$
\mu_i = \bar{G}_i
$$
である。

「混合物に成分 $i$ を微小に追加したとき、他成分を固定したまま全体の自由エネルギーがどれだけ増えるか」を 1 mol あたりに換算した量が $\mu_i$ である。



## 4. レジャンドル変換と自然変数

化学ポテンシャルは、どの熱力学ポテンシャルを選ぶかで「一定にする変数」が変わるが、同じ物理量である。

| ポテンシャル | 定義 | 自然変数 | 物質量微分 |
|---|---|---|---|
| $U$ |  | $(S,V,\{n_i\})$ | $\mu_i=\left(\partial U/\partial n_i\right)_{S,V}$ |
| $F$ | $U-TS$ | $(T,V,\{n_i\})$ | $\mu_i=\left(\partial F/\partial n_i\right)_{T,V}$ |
| $G$ | $U-TS+pV$ | $(T,p,\{n_i\})$ | $\mu_i=\left(\partial G/\partial n_i\right)_{T,p}$ |

固体・薄膜・溶液・気体など多くの問題では $(T,p)$ を与える取り扱いが多く、$G$ の定義が最も頻繁に現れる。



## 5. ギブズ＝デュエム関係式

系が巨視的に一様で広がり量（$U,S,V,\{n_i\}$）が一次同次性をもつとき、次が成り立つ：
$$
\sum_i n_i\,d\mu_i = -S\,dT + V\,dp.
$$
温度と圧力を固定すると
$$
\sum_i n_i\,d\mu_i = 0
$$
であり、多成分系では化学ポテンシャルは独立に全部は動けない（相互に拘束される）ことが分かる。



## 6. 平衡条件としての化学ポテンシャル

### 6.1 相平衡

相 $\alpha$ と $\beta$ が共存するとき、各成分 $i$ について
$$
\mu_i^{(\alpha)}(T,p,\{x\}) = \mu_i^{(\beta)}(T,p,\{x\})
$$
が必要である。純物質の二相共存では $\mu^{(\alpha)}=\mu^{(\beta)}$ が成り立ち、これがクラペイロン式の出発点になる。

### 6.2 反応平衡

反応
$$
\sum_i \nu_i A_i = 0
$$
に対して、反応ギブズエネルギーは
$$
\Delta_r G = \sum_i \nu_i \mu_i
$$
であり、平衡では
$$
\Delta_r G = 0 \quad\Rightarrow\quad \sum_i \nu_i \mu_i = 0
$$
である。

標準化学ポテンシャル $\mu_i^\circ$ と活量 $a_i$ を用いると
$$
\mu_i = \mu_i^\circ(T,p) + RT\ln a_i
$$
となり、反応では
$$
\Delta_r G = \Delta_r G^\circ + RT\ln Q,
\qquad
Q=\prod_i a_i^{\nu_i}.
$$
平衡定数 $K$ は $Q=K$ を満たし、
$$
\Delta_r G^\circ = -RT\ln K
$$
で定義される。



## 7. 活量・フガシティと化学ポテンシャル

### 7.1 活量による一般式

実在系の非理想性を含む標準的な書き方は
$$
\mu_i = \mu_i^\circ + RT\ln a_i
$$
である。活量は状態方程式や相互作用を吸収する量であり、選んだ標準状態に依存する。

### 7.2 理想気体

理想気体では、成分 $i$ の化学ポテンシャルは
$$
\mu_i(T,p_i)=\mu_i^\circ(T) + RT\ln\left(\frac{p_i}{p^\circ}\right)
$$
で表せる（$p^\circ$ は標準圧）。混合気体では $p_i = y_i p$（$y_i$ はモル分率）である。

### 7.3 フガシティによる実在気体

実在気体では圧力 $p$ をそのまま用いると理想式が崩れるため、フガシティ $f_i$ を導入して
$$
\mu_i = \mu_i^\circ + RT\ln\left(\frac{f_i}{p^\circ}\right)
$$
と書く。理想気体極限で $f_i \to p_i$ となる。

### 7.4 理想溶液・実在溶液

溶液中では（同一相内で）一般に
$$
\mu_i = \mu_i^\ast(T,p) + RT\ln a_i
$$
と書き、理想溶液では $a_i=x_i$（モル分率）である。実在溶液では
$$
a_i=\gamma_i x_i
$$
として活量係数 $\gamma_i$ が非理想性を表す。



## 8. 統計力学における化学ポテンシャル

### 8.1 グランドカノニカルアンサンブル

粒子数が熱浴・粒子浴と交換できるとき、制御変数は $(T,V,\mu)$ となる。グランド分配関数 $\Xi$ に対し、
$$
\Omega(T,V,\mu) = -k_{\mathrm B}T\ln \Xi
$$
で定義される $\Omega$ はグランドポテンシャル（大きさは自由エネルギー）である。

熱力学的には
$$
\Omega = U - TS - \mu N
$$
（多成分なら $\Omega = U-TS-\sum_i \mu_i N_i$）であり、全微分は
$$
d\Omega = -S\,dT - p\,dV - N\,d\mu
$$
となる。

### 8.2 フガシティと統計力学

統計力学では
$$
z \equiv e^{\beta \mu},\qquad \beta=\frac{1}{k_{\mathrm B}T}
$$
をフガシティ（または活量に対応する量）として用い、粒子数の平均が $\mu$ で制御される。



## 9. 量子統計とフェルミ準位としての化学ポテンシャル

### 9.1 フェルミ分布と $\mu$

フェルミ粒子の平均占有数は
$$
f(\varepsilon)=\frac{1}{e^{(\varepsilon-\mu)/k_{\mathrm B}T}+1}
$$
で与えられる。ここで $\mu$ は電子の化学ポテンシャルである。

### 9.2 $T=0$ での同一視

$T\to 0$ ではフェルミ分布は階段関数に近づき、占有状態と非占有状態を分けるエネルギーがフェルミ準位（フェルミエネルギー）である。この極限で
$$
\mu(T=0)=E_F
$$
が成り立つという理解が固体電子論で広く用いられる。

### 9.3 半導体・金属での位置づけ

- 金属：$\mu$ はバンド内にあり、温度変化で弱く動く
- 真性半導体：温度により $\mu$ はギャップ内を動く（キャリア統計で決まる）
- ドープ半導体：ドナー・アクセプタ準位と電荷中性条件で $\mu$ が決まる

この $\mu$ は「電子を 1 個加えるときの自由エネルギー変化」という意味を持つが、電荷を持つため電気的なポテンシャルを含めた量（電気化学ポテンシャル）で議論する方が安定な場合がある。



## 10. 電気化学ポテンシャル

荷電種 $i$（価数 $z_i$）では、電位 $\phi$ の寄与を含む電気化学ポテンシャル
$$
\tilde{\mu}_i = \mu_i + z_i F \phi
$$
（$F$ はファラデー定数）を用いることが多い。イオンの移動・電池の起電力・界面での平衡は、$\mu$ だけでなく $\tilde{\mu}$ の空間一定性として書かれる。



## 11. 拡散・輸送現象と化学ポテンシャル

拡散は濃度勾配で語られることが多いが、より基本には化学ポテンシャル勾配が駆動力である。線形不可逆熱力学では、成分流束 $\mathbf{J}_i$ を
$$
\mathbf{J}_i = - \sum_j L_{ij}\,\nabla\left(\frac{\mu_j}{T}\right)
$$
の形で表す（$L_{ij}$ は現象論係数）。希薄極限や等温条件、近似を重ねるとフィックの法則 $\mathbf{J}=-D\nabla c$ が得られるが、非理想溶液や濃厚合金では $\mu(c)$ の非線形性が本質になる。



## 12. 材料科学・第一原理計算での化学ポテンシャル

### 12.1 元素リザーバとしての $\mu$

固体欠陥・表面・界面を、外部リザーバと物質交換できる開いた系として扱うと、元素の化学ポテンシャルが境界条件になる。点欠陥の形成エネルギーは基本形として
$$
E_f(D^q)=E_{\mathrm{tot}}(D^q)-E_{\mathrm{tot}}(\mathrm{bulk})-\sum_i n_i \mu_i + q(E_F + E_{\mathrm{VBM}}) + \Delta V
$$
のように書かれる（$n_i$ は原子の出入り、$q$ は電荷状態、$E_F$ は電子の化学ポテンシャルに対応、$\Delta V$ は有限サイズ補正等）。

### 12.2 相安定性による拘束

化学ポテンシャルは任意には選べず、競合相の生成を避ける条件（例：$\mu_{\mathrm A}+\mu_{\mathrm B} \le \mu_{\mathrm{AB}}^{\mathrm{bulk}}$ のような不等式）や、元素の基準状態（$\mu_i \le \mu_i^{\mathrm{element}}$）で領域が定まる。この枠組みが欠陥相図・成長条件依存性の議論につながる。



## 13. 誤解しやすい点

### 13.1 化学ポテンシャルは「濃度」ではない

希薄極限では $\mu=\mu^\circ+RT\ln c$ の形が現れ、濃度が直感と結びつくが、一般には相互作用・相分離・電荷・格子ひずみなど多くの寄与を含む自由エネルギーの微分である。

### 13.2 参照状態（標準状態）に依存する

$\mu_i=\mu_i^\circ+RT\ln a_i$ は普遍的だが、$\mu_i^\circ$ と $a_i$ の定義は標準状態の選択に依存する。異なる分野（溶液化学、金属熱力学、電気化学）で記号が似ていても、中身の基準が違うことがある。

### 13.3 荷電系では電気化学ポテンシャルが自然である

電子やイオンは電位差で仕事をするため、$\mu$ だけでは空間的に一定にならない状況が普通に現れる。移動の平衡条件は $\tilde{\mu}$ を用いると整理される。



## まとめと展望

化学ポテンシャル $\mu$ は、$dU=T\,dS-p\,dV+\sum_i \mu_i dn_i$ に現れる物質量の共役変数であり、ギブズ自由エネルギーの偏微分として定義される自由エネルギーの局所的な勾配である。この一つの定義から、相平衡 $\mu_i^{(\alpha)}=\mu_i^{(\beta)}$、反応平衡 $\sum_i \nu_i\mu_i=0$、活量・フガシティによる非理想性の取り込み、グランドカノニカルの $\Omega=-k_{\mathrm B}T\ln\Xi$、そして固体電子論におけるフェルミ準位（電子の $\mu$）までが連続的に導かれる。

今後の材料科学では、欠陥・界面・非平衡成長を「化学ポテンシャルで境界条件化する」考え方が一層重要になる。実験では熱力学データベース（CALPHAD 等）と分光・顕微計測を結びつけて $\mu$ の制約を高精度化し、理論では第一原理計算と統計力学を接続して有限温度・非理想混合・電荷補正を含む $\mu$ の扱いを洗練させる方向が有効である。化学ポテンシャルを「同じ記号で分野横断的に使える量」として保持しつつ、標準状態と参照系の選択を明示することが、議論の再現性と可搬性を高める鍵である。


## その他参考にしたsources
- IUPAC Gold Book: activity (relative activity), a (A00115), DOI: 10.1351/goldbook.A00115  
  https://goldbook.iupac.org/terms/view/A00115/pdf
- Arovas, Thermodynamics and Statistical Mechanics (LibreTexts): Grand Canonical Ensemble  
  https://phys.libretexts.org/Bookshelves/Thermodynamics_and_Statistical_Mechanics/Book%3A_Thermodynamics_and_Statistical_Mechanics_%28Arovas%29/04%3A_Statistical_Ensembles/4.05%3A_Grand_Canonical_Ensemble_%28GCE%29
- 京都大学 OCW: 『統計物理学』講義ノート（日本語, PDF）  
  https://ocw.kyoto-u.ac.jp/wp-content/uploads/2010/04/2010_toukeibutsurigaku_2.pdf

- 熊本大学 学術リポジトリ: 固体物性学 講義ノート（日本語, PDF）  
  https://kumadai.repo.nii.ac.jp/record/21528/files/%E5%9B%BA%E4%BD%93%E7%89%A9%E6%80%A7%E5%AD%A6%E8%AC%9B%E7%BE%A9%E3%83%8E%E3%83%BC%E3%83%88%E7%AC%AC3%E7%89%88.pdf

- 筑波大学（講義資料）熱力学Ⅱ（金子）化学ポテンシャルの説明（日本語, PDF）  
  https://www.kz.tsukuba.ac.jp/~abe/ohp-thermal_dynamics/thermodynamics2_2014_6.pdf

- 横浜市立大学（講義資料）溶液の化学（基礎編）化学ポテンシャル（日本語, PDF, 2025）  
  https://honda.sci.yokohama-cu.ac.jp/%E6%BA%B6%E6%B6%B2%E5%8C%96%E5%AD%A6_2025_2%E7%AB%A0.pdf

- 広島大学（講義資料）固体物理学 I（フェルミ準位の導入, 日本語, PDF）  
  https://home.hiroshima-u.ac.jp/ino/lecture/SSP1note4_ino2017.pdf
