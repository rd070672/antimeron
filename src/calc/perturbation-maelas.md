# 二次摂動理論にもとづく磁歪定数の導出

磁歪定数は、磁化方向の変化に伴って現れる自発ひずみの大きさを表す量であり、磁気異方性エネルギー（MAE）の歪み依存性と弾性応答から定量化できる量である。二次摂動理論は、MAEをスピン軌道相互作用（SOC）による占有・非占有状態の混成として記述し、磁歪が「SOC起源の異方性が歪みにどれだけ敏感か」で決まることを明示する枠組みである。

## 参考ドキュメント
1. R. Wu, Origin of large magnetostriction in FeGa alloys, Journal of Applied Physics 91, 7358 (2002)  
   https://wulab.ps.uci.edu/pubs/Magnetostriction_JAP2002.pdf

2. P. Nieves et al., MAELAS: MAgneto-ELAStic properties calculation via computational high-throughput approach, arXiv:2009.01638  
   https://arxiv.org/pdf/2009.01638

3. 吉野 章夫, 磁歪・磁気弾性に関する講義資料（立方晶の磁気弾性エネルギー、λ100/λ111 と B1/B2 の関係式を含む）  
   https://www.mat.suzuka-ct.ac.jp/yoshino/MD_lecture/node142.html


## 1. 目的と全体像

### 1.1 何を「導出」するのか
二次摂動理論で直接扱うのは、磁化方向の違いに起因するエネルギー差（MAE）である。磁歪定数は、応力ゼロ条件のもとで、磁化方向を変えたときの平衡ひずみ（あるいは格子定数）の差として定義される量である。したがって、磁歪の導出は次の二段階で構成される。

- 二次摂動理論で MAE を表式化し、歪みに対する一次変化（傾き）を得る。
- 同じ歪み変数に対する弾性エネルギーの二次曲率（剛性）と組み合わせ、平衡ひずみ差から磁歪定数 λ を得る。

### 1.2 ここで扱う「基本の条件」
議論を明確にするため、以下を基本とする。

- 温度は 0 K の静的エネルギー議論を基本とする（有限温度ではフォノンや磁気励起が寄与し得る）。
- 応力は外部から加えない（自由境界、外部応力ゼロ）ことを基本とする。
- 歪みは微小であり、エネルギーは歪みの二次まで、磁気異方性はSOCに関して二次までを基本とする。


## 2. 記号と自由エネルギーの骨格（$E_0$ を含む）

### 2.1 磁化方向と歪み
- 磁化方向の単位ベクトルを方向余弦で $\boldsymbol{\alpha}=(\alpha_1,\alpha_2,\alpha_3)$ とし、$\alpha_1^2+\alpha_2^2+\alpha_3^2=1$ とする。
- 微小ひずみテンソルを $\varepsilon_{ij}$ とする（対称テンソル）。

### 2.2 全エネルギーの分解
単位体積当たりの全エネルギー密度を、以下の形に分ける。

$$
E_{\mathrm{tot}}(\varepsilon,\boldsymbol{\alpha})
=
E_0
+
E_{\mathrm{el}}(\varepsilon)
+
E_{\mathrm{MCA}}(\varepsilon,\boldsymbol{\alpha}).
$$

ここで、

- $E_0$ は基準エネルギーであり、歪みや磁化方向に依らない定数項である。
- $E_{\mathrm{el}}$ は純粋な格子弾性（SOCと無関係な主な剛性）を表す項である。
- $E_{\mathrm{MCA}}$ は磁気異方性に由来する小さなエネルギーであり、SOC起源である。歪みが入ることで、磁気弾性（magnetoelastic）効果としても現れる量である。

以降の議論では、磁歪は「外部応力ゼロで $E_{\mathrm{tot}}$ を歪みで最小化したときの平衡歪みが、磁化方向により変わる」こととして現れる。



## 3. MAE の定義と歪み依存

### 3.1 MAE の定義（画像に合わせた形）
例えば立方晶で、磁化方向を $[100]$ と $[001]$ に変えたときの MAE を

$$
\mathrm{MAE}(\varepsilon)=E(100;\varepsilon)-E(001;\varepsilon)
$$

と定義する。この定義は符号規約であるため、文献やコードで $E(001)-E(100)$ を採用している場合は符号が反転する。

### 3.2 歪みに関するテイラー展開（微小歪み）
歪み変数を1つ（後で具体化する） $\eta$ とし、各磁化方向の全エネルギーを

$$
E(\boldsymbol{\alpha};\eta)=E_0 + \frac{1}{2}K\,\eta^2 + E_{\mathrm{MCA}}(\boldsymbol{\alpha};\eta)
$$

と書く。ここで $K$ は与えた歪みモードに対する有効剛性（エネルギー曲率）であり、第一近似として磁化方向に依らないとみなせる（MAEは小さいためである）。

$E_{\mathrm{MCA}}$ を $\eta$ で一次まで展開すると、

$$
E_{\mathrm{MCA}}(\boldsymbol{\alpha};\eta)
\approx
E_{\mathrm{MCA}}(\boldsymbol{\alpha};0)
+
\left(\frac{\partial E_{\mathrm{MCA}}}{\partial \eta}\right)_{0}
\eta.
$$

したがって MAE も

$$
\mathrm{MAE}(\eta)=\mathrm{MAE}(0)+
\left(\frac{d\,\mathrm{MAE}}{d\eta}\right)_{0}\eta
$$

と一次近似できる。



## 4. 外部応力ゼロでの最小化と磁歪定数の一般式

### 4.1 平衡歪み
外部応力ゼロでは、各磁化方向について平衡歪み $\eta^{\ast}(\boldsymbol{\alpha})$ は

$$
\frac{\partial E(\boldsymbol{\alpha};\eta)}{\partial \eta}=0
$$

で与えられる。上の展開を用いると

$$
K\,\eta + \left(\frac{\partial E_{\mathrm{MCA}}}{\partial \eta}\right)_{0}=0
\quad\Rightarrow\quad
\eta^{\ast}(\boldsymbol{\alpha})
=
-\frac{1}{K}
\left(\frac{\partial E_{\mathrm{MCA}}}{\partial \eta}\right)_{0}.
$$

### 4.2 「磁化方向を変えたときの平衡歪み差」と MAE 傾きの関係
磁化方向を $[100]$ と $[001]$ の二つで比較すると、

$$
\eta^{\ast}(001)-\eta^{\ast}(100)
=
-\frac{1}{K}
\left[
\left(\frac{\partial E_{\mathrm{MCA}}(001)}{\partial \eta}\right)_{0}
-
\left(\frac{\partial E_{\mathrm{MCA}}(100)}{\partial \eta}\right)_{0}
\right].
$$

一方で MAE は $\mathrm{MAE}=E(100)-E(001)$ であるから、

$$
\left(\frac{d\,\mathrm{MAE}}{d\eta}\right)_{0}
=
\left(\frac{\partial E(100)}{\partial \eta}\right)_{0}
-
\left(\frac{\partial E(001)}{\partial \eta}\right)_{0}
\approx
\left(\frac{\partial E_{\mathrm{MCA}}(100)}{\partial \eta}\right)_{0}
-
\left(\frac{\partial E_{\mathrm{MCA}}(001)}{\partial \eta}\right)_{0}.
$$

これを代入すると、

$$
\eta^{\ast}(001)-\eta^{\ast}(100)
\approx
\frac{1}{K}
\left(\frac{d\,\mathrm{MAE}}{d\eta}\right)_{0}.
$$

ここで $K$ は

$$
K = \left(\frac{d^2 E(001;\eta)}{d\eta^2}\right)_{0}
\approx
\left(\frac{d^2 E(100;\eta)}{d\eta^2}\right)_{0}
$$

と評価できる（一次近似）。



## 5. 立方晶でよく使う歪み変数と $λ_{001}$（$=λ_{100}$）の式

### 5.1 体積保存の正方歪みパラメータ $\varepsilon_z$ の定義
画像にある式に合わせて、立方晶の「正方変形」に対して、一次の体積変化がゼロになるように格子定数を

- $a = a_0\left(1-\frac{\varepsilon_z}{3}\right)$
- $c = a_0\left(1+\frac{2\varepsilon_z}{3}\right)$

と置く（微小量の一次で体積保存である）。このとき、ひずみテンソルの対角成分は

$$
\varepsilon_{xx}=\varepsilon_{yy}=-\frac{\varepsilon_z}{3},\qquad
\varepsilon_{zz}=\frac{2\varepsilon_z}{3}
$$

である。

### 5.2 $λ_{001}$ の定義と係数 2/3 の出現
$[001]$ 方向の飽和磁歪（単結晶の長さ変化）を $\lambda_{001}$ とし、磁化が $[001]$ に揃ったときの $z$ 方向の縦ひずみを磁歪として読む基本の取り方を採用すると、

$$
\lambda_{001} \equiv \varepsilon_{zz}^{\ast}(001)-\varepsilon_{zz}^{\ast}(100).
$$

上の関係 $\varepsilon_{zz}=\frac{2}{3}\varepsilon_z$ を用いれば、

$$
\lambda_{001}
=
\frac{2}{3}
\left[
\varepsilon_z^{\ast}(001)-\varepsilon_z^{\ast}(100)
\right].
$$

前節の一般式と合わせると、

$$
\lambda_{001}
=
\frac{2}{3}
\,
\frac{
\left(\frac{d\,\mathrm{MAE}}{d\varepsilon_z}\right)_{0}
}{
\left(\frac{d^2 E(001;\varepsilon_z)}{d\varepsilon_z^2}\right)_{0}
}.
$$

これは、画像にある

$$
\lambda_{001}
=
\frac{2}{3}\,
\frac{d(\mathrm{MAE})/d\varepsilon_z}{d^2 E(001)/d\varepsilon_z^2}
$$

と同じ構造である。したがって、この定義とこの $\mathrm{MAE}=E(100)-E(001)$ を採用する限り、$\lambda_{001}$ の符号は $d(\mathrm{MAE})/d\varepsilon_z$ の符号に従うことになる。

### 5.3 磁気弾性定数との対応
立方晶の一次磁気弾性定数を $B_1$ とし、正方歪みに対する有効剛性が $C_{11}-C_{12}$（より厳密には歪みモードの定義に依存）であることを使うと、よく知られた関係

$$
B_1 \sim (C_{11}-C_{12})\,\lambda_{001}
$$

の形が得られる。符号は $E_{\mathrm{MCA}}$ の定義（磁気弾性エネルギーを $+B_1\alpha_i^2\varepsilon_{ii}$ と置くか、$-B_1\alpha_i^2\varepsilon_{ii}$ と置くか）に依存するため、採用した $\mathrm{MAE}$ の定義と一体で整理すべきである。

表1：同じ物理を表す量の対応（立方晶・正方歪みモード）
| 物理量 | 定義の例 | 次元 |
|---|---|---|
| MAE | $E(100)-E(001)$ | J/m^3（体積規格化の場合） |
| $d\mathrm{MAE}/d\varepsilon_z$ | MAE の歪み傾き | J/m^3（Pa と同じ） |
| $d^2E/d\varepsilon_z^2$ | 全エネルギーの曲率（剛性） | J/m^3（Pa と同じ） |
| $\lambda_{001}$ | 平衡縦ひずみ差 | 無次元 |



## 6. 二次摂動理論による MAE の導出（SOC 起源の明示）

### 6.1 摂動の設定
SOC を含まない（あるいはスカラー相対論までの）一電子ハミルトニアンを $H^{(0)}$ とし、SOC を摂動

$$
H_{\mathrm{SO}} = \xi(r)\,\mathbf{L}\cdot\mathbf{S}
$$

として扱う。$H^{(0)}$ の固有状態・固有値を $|n\mathbf{k}\rangle$ と $\epsilon_{n\mathbf{k}}^{(0)}$ と書く。

### 6.2 二次摂動エネルギー
SOC の一次エネルギー補正は、軌道角運動量が実質的に消えている場合（遷移金属の多くの状況）には小さくなり得る。MAE を与える主要項は、SOC の二次摂動で表されることが多い。

占有（occ）状態 $|o\rangle$ と非占有（unocc）状態 $|u\rangle$ を用いて、二次補正は

$$
E^{(2)}(\boldsymbol{\alpha})
=
\sum_{o\in\mathrm{occ}}
\sum_{u\in\mathrm{unocc}}
\frac{
\left|\langle u|H_{\mathrm{SO}}(\boldsymbol{\alpha})|o\rangle\right|^2
}{
\epsilon_o^{(0)}-\epsilon_u^{(0)}
}.
$$

分母は負になるため、しばしば

$$
E^{(2)}(\boldsymbol{\alpha})
=
-\sum_{o}
\sum_{u}
\frac{
\left|\langle u|H_{\mathrm{SO}}(\boldsymbol{\alpha})|o\rangle\right|^2
}{
\epsilon_u^{(0)}-\epsilon_o^{(0)}
}
$$

と表記される。

### 6.3 MAE の二次摂動表式
2つの磁化方向 $\boldsymbol{\alpha}_1,\boldsymbol{\alpha}_2$ に対して

$$
\mathrm{MAE}
=
E(\boldsymbol{\alpha}_1)-E(\boldsymbol{\alpha}_2)
\approx
E^{(2)}(\boldsymbol{\alpha}_1)-E^{(2)}(\boldsymbol{\alpha}_2).
$$

例えば画像の定義に合わせれば（$\boldsymbol{\alpha}_1=[100],\boldsymbol{\alpha}_2=[001]$）、

$$
\mathrm{MAE}
\approx
-\sum_{o}\sum_{u}
\left[
\frac{
\left|\langle u|H_{\mathrm{SO}}(100)|o\rangle\right|^2
-
\left|\langle u|H_{\mathrm{SO}}(001)|o\rangle\right|^2
}{
\epsilon_u^{(0)}-\epsilon_o^{(0)}
}
\right].
$$

この式は、MAE が「SOC 行列要素の方向依存」と「占有・非占有のエネルギー差」の競合で決まることを示す基本式である。



## 7. 磁歪定数は「二次摂動 MAE の歪み感度」で決まる

### 7.1 $d\mathrm{MAE}/d\eta$ の構造
磁歪式に現れるのは $\left(d\mathrm{MAE}/d\eta\right)_0$ である。二次摂動式を $\eta$ で微分すると、概念的には

$$
\frac{d}{d\eta}
\left(
\frac{|M(\eta)|^2}{\Delta\epsilon(\eta)}
\right)
=
\frac{2\,\mathrm{Re}\left[M^\ast(\eta)\,\frac{dM}{d\eta}\right]}{\Delta\epsilon(\eta)}
-
\frac{|M(\eta)|^2}{\Delta\epsilon(\eta)^2}
\frac{d\Delta\epsilon}{d\eta}
$$

という二種類の寄与から成る。ここで $M(\eta)=\langle u|H_{\mathrm{SO}}|o\rangle$、$\Delta\epsilon=\epsilon_u^{(0)}-\epsilon_o^{(0)}$ である。

したがって、磁歪が大きくなりやすい条件は、

- 歪みで $\Delta\epsilon$ が強く変化する（準位が歪みで大きく動く）こと、
- $M$ が歪みで変化する（軌道混成の性質が歪みで変わる）こと、
- さらに $\Delta\epsilon$ が小さい遷移がフェルミ準位近傍に存在すること、

にまとめられる。これは、磁歪が「電⼦状態の歪み応答」と深く結び付くという経験的事実を、二次摂動のレベルで説明するものである。

### 7.2 寄与分解
実装や解析では、MAE の二次摂動和を、軌道部分空間ごとに分類して

$$
\mathrm{MAE}=
\mathrm{MAE}_{t_{2g}\to t_{2g}}
+
\mathrm{MAE}_{e_g\to e_g}
+
\mathrm{MAE}_{t_{2g}\to e_g}
+
\mathrm{MAE}_{e_g\to t_{2g}}
$$

のように分解することがある。これは、$d$ 軌道が結晶場で $t_{2g}$ と $e_g$ に分裂する立方晶近傍の状況で有効な整理であり、どの遷移（占有・非占有の組）が MAE とその歪み感度を支配しているかを可視化するための整理である。



## 8. 角運動量演算子の選択則（d軌道の例）

二次摂動の核は $\langle u|\mathbf{L}\cdot\mathbf{S}|o\rangle$ であるため、どの軌道対が強く結合するかは $\mathbf{L}$ の行列要素で決まる。実軌道基底 $(d_{xy},d_{yz},d_{zx},d_{x^2-y^2},d_{3z^2-r^2})$ で、$\hbar=1$ としたときの $l=2$ の $L_x,L_y,L_z$ は、次のような非零成分を持つ（全ての非零要素を書く代わりに、結合関係を列挙する）。

- $L_z$ は $d_{xy}\leftrightarrow d_{x^2-y^2}$ と $d_{yz}\leftrightarrow d_{zx}$ を結合する。
- $L_x$ は $d_{xy}\leftrightarrow d_{zx}$、$d_{yz}\leftrightarrow d_{x^2-y^2}$、$d_{yz}\leftrightarrow d_{3z^2-r^2}$ を結合する。
- $L_y$ は $d_{xy}\leftrightarrow d_{yz}$、$d_{zx}\leftrightarrow d_{x^2-y^2}$、$d_{zx}\leftrightarrow d_{3z^2-r^2}$ を結合する。

この「どの軌道が結合するか」は、歪みによりどの軌道の相対エネルギーや混成が変化するかと組み合わさって、$d\mathrm{MAE}/d\eta$、ひいては磁歪定数の符号と大きさを決める。



## 9. 計算式の整理：MAE→λ の流れ（画像の手順を数式で整備）

画像に沿って、手順を数式として整理する。

### 9.1 MAE の計算
磁化方向を変えた SOC 計算（自己無撞着 SOC でも、力の定理でもよいが、前提を統一する）から

$$
\mathrm{MAE}(\varepsilon_z)=E(100;\varepsilon_z)-E(001;\varepsilon_z)
$$

を得る。

### 9.2 MAE の歪み傾き
小歪み領域で線形近似し、

$$
\left(\frac{d\,\mathrm{MAE}}{d\varepsilon_z}\right)_0
\approx
\frac{\mathrm{MAE}(+\delta)-\mathrm{MAE}(-\delta)}{2\delta}
$$

のように傾きを見積もる（$\delta$ は微小）。

### 9.3 弾性曲率
同じ歪みモードで、例えば磁化を $[001]$ に固定した全エネルギー

$$
E(001;\varepsilon_z)
$$

を二次近似し、

$$
\left(\frac{d^2 E(001;\varepsilon_z)}{d\varepsilon_z^2}\right)_0
\approx
\frac{E(001;+\delta)-2E(001;0)+E(001;-\delta)}{\delta^2}
$$

として曲率を得る。

### 9.4 磁歪定数
以上を組み合わせて

$$
\lambda_{001}
=
\frac{2}{3}
\,
\frac{
\left(d\,\mathrm{MAE}/d\varepsilon_z\right)_0
}{
\left(d^2 E(001)/d\varepsilon_z^2\right)_0
}
$$

を得る。これが「MAE の歪み依存」から磁歪定数を得る最短の式である。

表2：$\lambda_{001}$ の式に出てくる量の意味
| 記号 | 意味 | どの計算で得るか |
|---|---|---|
| $\mathrm{MAE}(\varepsilon_z)$ | 磁化方向差のエネルギー差 | SOC を含む全エネルギー差 |
| $d\mathrm{MAE}/d\varepsilon_z$ | MAE の歪み感度 | MAE vs 歪みの傾き |
| $d^2E/d\varepsilon_z^2$ | 歪みモードの剛性 | 全エネルギー vs 歪みの曲率 |
| $2/3$ | 歪みパラメータと縦ひずみの換算 | 体積保存の歪み定義から出る |



## 10. まとめと展望

二次摂動理論によれば、磁気異方性エネルギーは SOC 行列要素の二乗と占有・非占有準位差の逆数の和として表され、磁歪定数はその MAE が歪みに対してどれだけ変化するか（$d\mathrm{MAE}/d\eta$）を弾性曲率（$d^2E/d\eta^2$）で割った量として導出される。立方晶の正方歪みモードでは、体積保存歪みパラメータと縦ひずみの換算から係数 $2/3$ が現れ、$\lambda_{001}$ が画像の形 $\lambda_{001}=(2/3)(d\mathrm{MAE}/d\varepsilon_z)/(d^2E/d\varepsilon_z^2)$ に整理される。

展望としては、(i) 二次摂動の寄与分解（軌道・スピン・状態密度近傍の遷移）を歪み依存と結び付けることで、磁歪の符号反転や組成依存の起源を、電子状態の移動と選択則の観点からさらに明確化できる点が重要である。(ii) 温度・無秩序（化学無秩序、磁気無秩序）・有限ひずみでの非線形性を取り込むには、二次摂動の枠組みを出発点にしつつ、自由エネルギー（フォノン・マグノン）や高次磁気弾性項へ拡張することが有効である。


## 参考文献
- T. Miura, Rigorous calculations of magnetocrystalline anisotropy energy in solids, Journal of the Physical Society of Japan 82, 021008 (2013)  
  https://journals.jps.jp/doi/10.7566/JPSJ.82.021008

- A. Kosugi et al., Magnetocrystalline anisotropy energy and spin–orbit coupling in first-principles calculations（解説・整理）  
  https://www.jstage.jst.go.jp/article/jpsj/89/5/89_052001/_pdf

- D. Sander, The correlation between mechanical stress and magnetic anisotropy in ultrathin films, Reports on Progress in Physics 62, 809 (1999)  
  https://iopscience.iop.org/article/10.1088/0034-4885/62/5/203

- R. Wu, First-principles determination of magnetostriction in bulk transition metals and thin films, Surface Science 600, 3306 (2006)（総説的整理）  
  https://www.sciencedirect.com/science/article/pii/S0039602805015506

- 吉野 章夫, 講義資料（磁歪・磁気弾性の基本）  
  https://www.mat.suzuka-ct.ac.jp/yoshino/MD_lecture/node142.html

## 関連する公開解説・プレスリリース等（例）
- 東北大学・東京大学・JST（2023）, 磁場で動く低温用形状記憶合金を開発（巨大磁歪に関する記述を含む）  
  https://www.jst.go.jp/pr/announce/20230613/pdf/20230613.pdf

- 東北大学・JST（2025）, 窒化鉄Fe4Nが室温で「超磁歪材料」に（Fe4Nの磁歪に関する発表）  
  https://www.tohoku.ac.jp/japanese/2025/05/press20250513-01-Fe4N.html
