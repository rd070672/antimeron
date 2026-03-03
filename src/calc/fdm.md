# 有限差分法（FDM）の原理

有限差分法は、連続場の微分方程式を格子点上の差分方程式へ置き換え、代数方程式（あるいは時間発展の更新式）として解く方法である。拡散・弾性・電磁場・相変態など、保存則や勾配駆動の方程式を比較的直接に離散化できる点が強みである。

## 参考ドキュメント
- R. J. LeVeque, Finite Difference Methods for Ordinary and Partial Differential Equations (SIAM, 2007)
  https://tevza.org/home/course/modelling-II_2016/books/Leveque%20-%20Finite%20Difference%20Methods.pdf
- L. N. Trefethen, Finite Difference and Spectral Methods for Ordinary and Partial Differential Equations（講義ノート）
  https://people.maths.ox.ac.uk/trefethen/4all.pdf
- B. Fornberg, Generation of Finite Difference Formulas on Arbitrarily Spaced Grids, Mathematics of Computation (1988)
  https://www.ams.org/mcom/1988-51-184/S0025-5718-1988-0935077-0/


## 1. 連続方程式から格子方程式へ
FDMは概ね次の流れで構成される。
1) 計算領域 $Ω$ を格子に分割し、格子点（またはセル中心）に未知量を定義する  
2) 空間微分（$∂/∂x, ∇, ∇²$ など）を差分（stencil）で近似する  
3) 境界条件（Dirichlet/Neumann/周期など）を離散系に組み込む  
4) 定常問題は線形・非線形の連立方程式として解く／非定常問題は時間積分で更新する  
この「微分 → 代数」への変換がFDMの最小定義である。

## 2. 差分近似の：テイラー展開と打切り誤差
格子点 $x_i=i\Delta x$ 上で、滑らかな関数 $u(x)$ のテイラー展開を用いる。
$$
u(x_i\pm\Delta x)=u_i \pm \Delta x\,u'_i + \frac{\Delta x^2}{2}u''_i \pm \frac{\Delta x^3}{6}u'''_i + O(\Delta x^4)
$$
これから一次・二次微分の代表的差分が得られる。

### 2.1 1次微分
前進差分（1次精度）：
$$
u'_i \approx \frac{u_{i+1}-u_i}{\Delta x} \quad (O(\Delta x))
$$
後退差分（1次精度）：
$$
u'_i \approx \frac{u_i-u_{i-1}}{\Delta x} \quad (O(\Delta x))
$$
中心差分（2次精度）：
$$
u'_i \approx \frac{u_{i+1}-u_{i-1}}{2\Delta x} \quad (O(\Delta x^2))
$$

### 2.2 2次微分
中心差分（2次精度）：
$$
u''_i \approx \frac{u_{i+1}-2u_i+u_{i-1}}{\Delta x^2}\quad (O(\Delta x^2))
$$

### 2.3 多次元ラプラシアン
$$
\nabla^2 u_{i,j} \approx \frac{u_{i+1,j}-2u_{i,j}+u_{i-1,j}}{\Delta x^2}
+\frac{u_{i,j+1}-2u_{i,j}+u_{i,j-1}}{\Delta y^2}
$$
等方格子なら5点（2D）／7点（3D）stencilが基本になる。

### 2.4 高次精度・不等間隔格子
高次精度や不等間隔格子では、差分係数（重み）を一般式で生成する手法がある。Fornberg の再帰式は“不等間隔格子でも任意次数の差分係数を構成できる”ことを与える。

## 3. 境界条件の離散化
境界条件はFDMの精度と安定性に直結する。

### 3.1 Dirichlet境界（値固定）
境界点に $u=u_D$ を直接代入し、未知数を置き換える。

### 3.2 Neumann境界（法線微分固定）
例えば左端で $\partial u/\partial x = g$ を課すなら、片側差分で
$$
\frac{u_1-u_0}{\Delta x}=g
$$
などとする。高次精度を維持するには、境界専用の高次片側ステンシルや ghost cell を用いる。

### 3.3 周期境界（PBC）
端点を同一視して添字を巡回させる。格子欠陥・拡散・波動のモデル化で頻出である。

## 4. 非定常問題の時間積分
空間差分で半離散化（Method of Lines）すると
$$
\frac{d\mathbf{u}}{dt} = \mathbf{F}(\mathbf{u})
$$
という常微分方程式系になる。時間積分は方程式の硬さ（stiffness）で選択が変わる。

### 4.1 明示（陽）法：前進オイラーの例
$$
\mathbf{u}^{n+1}=\mathbf{u}^n+\Delta t\,\mathbf{F}(\mathbf{u}^n)
$$
実装は容易だが、安定条件（CFL条件など）で $\Delta t$ が強く制限されがちである。

### 4.2 陰解法：後退オイラーの例
$$
\mathbf{u}^{n+1}=\mathbf{u}^n+\Delta t\,\mathbf{F}(\mathbf{u}^{n+1})
$$
各ステップで（非）線形方程式を解く必要があるが、拡散支配の問題で時間刻み制約を緩和できる。

### 4.3 Crank–Nicolson（2次精度・半陰）
$$
\mathbf{u}^{n+1}=\mathbf{u}^n+\frac{\Delta t}{2}\left[\mathbf{F}(\mathbf{u}^{n})+\mathbf{F}(\mathbf{u}^{n+1})\right]
$$
拡散方程式などでよく用いられる標準形である。

## 5. 安定性解析
差分法の品質は「整合性・安定性・収束性」の三点で評価される。特に時間発展問題では安定性が支配的である。

### 5.1 拡散方程式の代表：陽解法の安定条件
1D 拡散方程式 $\partial_t u=D\partial_{xx}u$ を中心差分＋前進オイラーで離散化すると
$$
u_i^{n+1}=u_i^n+r\left(u_{i+1}^n-2u_i^n+u_{i-1}^n\right),\quad r=\frac{D\Delta t}{\Delta x^2}
$$
安定性条件の代表は
$$
r \le \frac{1}{2}
$$
であり、拡散係数が大きい・格子が細かいほど $\Delta t$ が厳しくなる。

### 5.2 移流（波の伝播）とCFL条件
移流方程式 $\partial_t u + a\partial_x u=0$ では、情報が速度 $a$ で伝播する。数値スキームがその伝播を追随するために
$$
\mathrm{CFL}=\frac{|a|\Delta t}{\Delta x}\lesssim \text{(スキーム依存の上限)}
$$
が必要になる。風上差分など「情報の流れ」を反映した離散化が安定化に重要である。

### 5.3 von Neumann（フーリエ）安定性解析
線形・定係数・周期境界などの条件下で、誤差モード $e^{ikx}$ の増幅率 $G(k)$ を評価し、$|G(k)|\le 1$ を安定条件として導く。安定性解析の古典的方法の概説として整理されている。:contentReference[oaicite:11]{index=11}

## 6. 収束性：Lax同値定理
差分スキームが元のPDEに整合（打切り誤差が格子幅とともに0へ）で、かつ安定であれば収束する、という関係が体系化されている。これにより「精度（何次）だけでなく安定性が必須」という評価軸が明確になる。

## 7. 定常問題・陰解法で現れる連立一次方程式の解法
離散化により、典型的に
$$
A\mathbf{u}=\mathbf{b}
$$
が得られる。

代表例
- 1D拡散（2階差分）：三重対角行列 → Thomas法で $O(N)$
- 2D/3Dポアソン：疎行列 → Jacobi/Gauss–Seidel/SOR、共役勾配（CG）、多重格子（MG）
- 非線形（例えば相場の自由エネルギーが非線形）：Newton法や擬Newton＋線形ソルバ

どのソルバを選ぶかで計算量が桁違いに変わるため、行列の性質（対称性、正定値性、条件数）を把握して選ぶのが要点である。

## 8. 代表的な方程式への適用
### 8.1 拡散・熱伝導（濃度場・温度場）
- 空間：中心差分ラプラシアン
- 時間：拡散支配なら陰解法やCrank–Nicolsonが有利
- 物理制約：境界フラックス条件（Neumann）が重要になりやすい 

### 8.2 弾性場（準静的変形）
- 変位場に対する平衡式 → 2階微分の連立方程式
- 境界条件（拘束・荷重）で解が大きく変わる
- 疎行列ソルバが支配的になる 

### 8.3 連続体場の波動・移流（輸送・伝播）
- 情報の向きとCFLが設計中心
- 風上化・数値粘性・高解像度スキームの導入で安定化 

## 9. 実装と検証
- 収束確認：$\Delta x$ を半分にして誤差が理論次数で減るか（格子収束）
- 時間刻み：$\Delta t$ を下げて結果が変わらないか（時間収束、CFL逸脱の検出）
- 保存則：離散化が質量・エネルギー・磁束などの保存（あるいは散逸）構造を壊していないか
- 境界実装：境界ステンシルが全体精度を落としていないか（境界が最弱要因になりやすい）
- 自己テスト：既知解（解析解や製造解法）でコード検証を行う

## まとめ
- 有限差分法は、格子点上の差分で微分を近似し、PDEを代数系または時間更新式として解く数値解法である。  
- 精度（打切り誤差）だけでなく、安定性（CFLやvon Neumann解析）と収束性（整合性＋安定性）の関係を押さえることが要点であり、陰解法では疎線形ソルバ選択が計算性能を左右する。

