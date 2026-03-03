# 有限要素法（FEM）の原理

有限要素法は、連続体の境界値問題を弱形式（変分形式）へ変換し、基底関数で近似して疎な連立方程式として解く数値解法である。複雑形状、異方性、材料定数の空間不均一、界面条件を同一の枠組みで扱える方法である。

## 参考ドキュメント
- Brenner, S. C. and Scott, L. R., The Mathematical Theory of Finite Element Methods (Springer)
  https://webs.um.es/eliseo/um/uploads/Main/Brenner_Scott_The_Mathematical_Theory_Of_Finite_Element%20Methods_2008.pdf
- COMSOL Documentation, Introduction to the Weak Form / Finite Element Method 解説
  https://doc.comsol.com/6.2/docserver/
  https://www.comsol.com/multiphysics/finite-element-method
- （日本語）東京大学 OCW, 非線形有限要素法特論（弱形式と要素離散化の導入, PDF）
  https://ocw.u-tokyo.ac.jp/lecture_files/fs_01/1/notes/ja/01.PDF
- （日本語）桂田 祐史, 応用数値解析特論：有限要素法の理論的背景（PDF）
  https://m-katsurada.sakura.ne.jp/ana2022/ANA13_0116_handout.pdf


## 1. FEMが解く問題の典型
対象は、領域 $Ω$ と境界 $∂Ω$ 上で定義される偏微分方程式（PDE）である。

代表例（スカラー場）
- ポアソン方程式：$-\nabla\cdot(k\nabla u)=f$
- 拡散（熱伝導・物質拡散）：$\partial_t u-\nabla\cdot(D\nabla u)=s$
- 相場モデル（例）：Allen–Cahn、Cahn–Hilliard（高階微分を含む場合は混合形式が有効）

代表例（ベクトル場）
- 線形弾性：$-\nabla\cdot\sigma(u)=b$、$\sigma=C:\varepsilon(u)$
- 電磁場（静電・電流・準静的）：$\nabla\cdot(\varepsilon\nabla V)=-\rho$、$\nabla\times(\nu\nabla\times A)=J$ など

## 2. 強形式から弱形式へ：重み付き残差と部分積分
FEMの中核は「微分方程式を積分方程式（弱形式）へ変換する」点にある。

### 2.1 例：ポアソン方程式
強形式（強い意味での微分を要求）  
$-\nabla\cdot(k\nabla u)=f$ in $Ω$、境界条件を適宜与える。

残差 $R(u)= -\nabla\cdot(k\nabla u)-f$ を試験関数 $v$ で重み付けして
$$
\int_\Omega R(u)\,v\,d\Omega=0
$$
を課し、部分積分（ガウスの発散定理）で微分階数を下げる：
$$
\int_\Omega k\nabla u\cdot\nabla v\,d\Omega
= \int_\Omega f v\,d\Omega + \int_{\partial\Omega} (k\nabla u\cdot n)\,v\,d\Gamma
$$
ここで境界積分項は「自然境界条件（Neumann型）」として現れる。

### 2.2 抽象形
適切な関数空間 $V$（例：$H^1$）に対して
- 求める：$u\in V$
- 任意の：$v\in V_0$
について
$$
a(u,v)=\ell(v)
$$
を満たす、という形で書ける。これがRitz–Galerkinの基本形である。

## 3. 近似空間と基底関数：要素分割と形状関数
領域 Ω を要素（線分・三角形・四面体・四角形・六面体など）に分割し、一次（P1/Q1）や二次（P2/Q2）などの形状関数で場を近似する。

### 3.1 離散化（Galerkin近似）
有限次元空間 $V_h\subset V$ を選び、
$$
u_h(x)=\sum_{j=1}^{N} U_j\,\phi_j(x)
$$
と表す。試験関数も同じ空間から選ぶ（Galerkin法）：
$$
v_h(x)=\phi_i(x)
$$
を代入して
$$
\sum_{j=1}^{N} U_j\,a(\phi_j,\phi_i)=\ell(\phi_i)\quad (i=1,\dots,N)
$$
が得られ、行列形式
$$
K\,U = F
$$
となる。

### 3.2 代表的行列（スカラー拡散・ポアソン）
剛性行列：
$$
K_{ij}=\int_\Omega k\,\nabla\phi_j\cdot\nabla\phi_i\,d\Omega
$$
荷重ベクトル：
$$
F_i=\int_\Omega f\,\phi_i\,d\Omega + \int_{\partial\Omega} \bar{q}\,\phi_i\,d\Gamma
$$

### 3.3 要素の種類と連続性
| 形状 | 要素（例） | 近似次数 | 連続性 | 主な用途の目安 |
|---|---|---|---|---|
| 三角形/四面体 | P1, P2 | 1,2 | C0 | 複雑形状に強い |
| 四角形/六面体 | Q1, Q2 | 1,2 | C0 | 構造格子に近い形状で効率的 |
| 混合要素 | Taylor–Hood等 | 変数で次数を変える | 条件に依存 | ほぼ非圧縮、鞍点問題など |

## 4. 要素方程式とアセンブリ
FEMは「要素ごとの積分を計算し、足し合わせて全体行列を作る」方式である。

### 4.1 要素剛性の計算
要素 $e$ 上で
$$
K^{(e)}_{ab}=\int_{\Omega_e} k\,\nabla N_b\cdot\nabla N_a\,d\Omega
$$
を計算し、節点対応（connectivity）に従って大域行列 $K$ に加算する。

### 4.2 参照要素と写像
一般形状の要素積分は、参照座標 $\xi$ の要素へ写像して計算する。
- 物理座標 $x(\xi)$
- ヤコビアン $J=\partial x/\partial\xi$
により
$$
\int_{\Omega_e} g(x)\,d\Omega = \int_{\hat{\Omega}} g(x(\xi))\,|J(\xi)|\,d\hat{\Omega}
$$
となる。

## 5. 数値積分（ガウス求積）
剛性や荷重の積分は一般に解析的に閉じないため、要素内でガウス求積を用いる。
- 一次要素で定数係数のポアソンなら少数点で正確に評価できる
- 係数が空間変化する、非線形項がある、異方性がある場合は求積点数が必要になる

求積が不足すると、行列が過度に硬くなる、あるいはエネルギーが正しく評価されないなどの誤差源になる。

## 6. 境界条件の取り扱い
### 6.1 Dirichlet境界（値固定）
$u=\bar{u}$ のような境界は、離散未知数に直接制約を課す必要がある（必須境界条件）。
典型手法
- 行列の行・列操作（強制代入）
- ペナルティ法（大きな係数で拘束）
- ラグランジュ未定乗数（混合形式、鞍点問題）

### 6.2 Neumann境界（フラックス固定）
$(k\nabla u\cdot n)=\bar{q}$ のような条件は、弱形式に境界積分として自然に入る（自然境界条件）。

### 6.3 周期境界（PBC）
対向境界の自由度を同一視し、拘束条件として結合する。界面や格子周期を持つ問題で頻出である。

## 7. 時間発展問題：質量行列と半離散化
例えば拡散方程式をFEM空間で離散化すると
$$
M\,\dot{U}+K\,U=F
$$
が得られる。ここで
- 質量行列：$M_{ij}=\int_\Omega \phi_j\phi_i\,d\Omega$
- 剛性行列：$K_{ij}=\int_\Omega D\nabla\phi_j\cdot\nabla\phi_i\,d\Omega$
である。

時間積分の代表
- 陽解法：明快だが安定条件で $\Delta t$ が制限されやすい
- 陰解法（後退Euler、Crank–Nicolsonなど）：硬い拡散系でも安定に進めやすい
- 構造動力学：Newmark法、一般化α法など（質量・減衰・剛性の組）

質量行列を対角近似（mass lumping）する設計もあり、陽解法の効率化に使われる。

## 8. 線形・非線形ソルバ：疎行列
FEMの離散系は大規模疎行列になりやすい。

### 8.1 線形問題
- 直接法：LU/Cholesky（規模が大きいとメモリが支配）
- 反復法：CG（対称正定値）、GMRES（一般）など
- 前処理：ILU、IC、多重格子（MG）、領域分割（DD）など

### 8.2 非線形問題
材料非線形、幾何非線形、相場の非線形項などでは
$$
R(U)=0
$$
をNewton法などで解く。
$$
J(U^{(m)})\,\delta U = -R(U^{(m)}),\quad U^{(m+1)}=U^{(m)}+\delta U
$$
ここでヤコビアン $J=\partial R/\partial U$ は、解析導出か自動微分・数値近似で与える。

## 9. 誤差評価とメッシュ適応
FEMの精度は、要素サイズ $h$ と次数 $p$ に依存する。
- 典型的な楕円型問題で、十分滑らかな解に対して $H^1$ ノルム誤差が $O(h^p)$ 程度で減少する（空間次数に依存）
- 特異点（角、き裂端、界面、強い不均一）では局所的に誤差が支配的となる

誤差推定
- 事前（a priori）：理論解の滑らかさを仮定して収束次数を評価する
- 事後（a posteriori）：残差や勾配跳躍などから局所誤差を推定し、メッシュを自動細分化する

h-adapt（要素細分化）とp-adapt（次数変更）を組み合わせるhp-adaptもある。

## 10. 代表方程式ごとの弱形式
| 分野の代表方程式 | 弱形式で現れやすい構造 | FEMでの注意点 |
|---|---|---|
| 拡散・熱 | $M\dot{U}+KU=F$ | 拡散支配の硬さ、時間離散の選択 |
| 線形弾性 | $K=\int B^T C B\,d\Omega$ | ほぼ非圧縮でロッキング、要素選択 |
| ポアソン/静電 | $\int \varepsilon\nabla V\cdot\nabla v$ | 異方性・界面条件、PBC |
| Maxwell（渦あり） | curl-curl形式 | 辺要素（Nédélec）などの適合空間が重要 |
| 相場（Cahn–Hilliard等） | 高階微分→混合形式 | 変数分割、安定化、時間刻み |

## 11. 注意点
- メッシュ品質：アスペクト比や歪みで条件数が悪化し、反復法が停滞する
- ロッキング：ほぼ非圧縮、薄板・シェル、曲げ支配で不自然に硬くなる
- 不適切な関数空間：鞍点問題で不安定（LBB条件を満たさない）
- 求積不足：非線形・異方性・高次で誤差や不安定化を誘発する
- 境界条件の実装誤り：Dirichlet拘束の入れ方で解が変わる

## まとめ
- 有限要素法は、弱形式化と基底関数近似により、PDEを疎な連立方程式（またはDAE/ODE系）として解く方法である。  
- 形状関数・写像・求積・境界条件・疎行列ソルバ・誤差推定（適応化）の組が数値解の信頼性と計算効率を決める要点である。

