# COMSOL を用いた LLG 計算と連成解析

磁化ダイナミクスを支配する Landau–Lifshitz–Gilbert（LLG）方程式は、電磁場（渦電流）や弾性場（磁気弾性）と強く結びつく。COMSOL Multiphysics は PDE 記述と既存フィジックスを同一モデルで結合できるため、LLG 単体から電磁場–LLG、弾性場–LLG までを同一の枠組みで実装できる。

## 参考ドキュメント
- COMSOL Multiphysics によるマイクロマグネティックスシミュレーション（日本語記事）
  https://www.comsol.jp/blogs/micromagnetic-simulation-with-comsol-multiphysics
- Coupled Structural and Magnetic Models: Linear Magnetostriction in COMSOL（英語：磁歪の連成例）
  https://www.comsol.com/paper/coupled-structural-and-magnetic-models-linear-magnetostriction-in-comsol-6357
- Anomalous eddy current loss in soft magnetic materials ...（英語：Maxwell–LLG 連成の言及を含む論文、AIP）
  https://pubs.aip.org/aip/jap/article/137/12/123906/3340819/Anomalous-eddy-current-loss-in-soft-magnetic


## 1. 何を解くのか

扱いたい計算は次の3種である。

1) LLG 計算（マイクロ磁化シミュレーション）
- 磁化ベクトル場 $\mathbf{m}(\mathbf{r},t)$（$|\mathbf{m}|=1$）の時間発展を解く。
- 有効磁界 $\mathbf{H}_{\mathrm{eff}}$ は交換・異方性・外場・反磁界などから構成される。

2) 電磁場–LLG 連成（渦電流・誘導磁界を含む）
- Maxwell 方程式（典型的には準静的近似を含む）を解き、導体中の電流 $\mathbf{J}$ と誘導磁界を求める。
- LLG が与える $\mathbf{M}=M_s\mathbf{m}$ が磁束密度 $\mathbf{B}$ を変調し、それが誘導電界 $\mathbf{E}$ と渦電流 $\mathbf{J}$ を生む。
- 逆に渦電流が作る磁界（Oersted/誘導磁界）が $\mathbf{H}_{\mathrm{eff}}$ に戻り、磁化運動を変える。

3) 弾性場–LLG 連成（磁気弾性・磁歪）
- 変位場 $\mathbf{u}(\mathbf{r},t)$（あるいはひずみ $\boldsymbol{\varepsilon}$）を固体力学で求める。
- ひずみが磁気弾性エネルギーを介して $\mathbf{H}_{\mathrm{eff}}$ を変える（逆磁歪）。
- 逆に磁化方向が磁歪ひずみ（固有ひずみ）や等価応力を通じて弾性場を駆動する（磁歪駆動）。

以降では、(i) 方程式、(ii) 連成の「情報の流れ」、(iii) COMSOL 実装の設計パターン、の順に具体化する。

## 2. LLG 方程式：磁化ダイナミクスの核

### 2.1 正規化磁化の定義
磁化 $\mathbf{M}$ を飽和磁化 $M_s$ で規格化して
$$
\mathbf{m}=\frac{\mathbf{M}}{M_s},\quad |\mathbf{m}|=1
$$
とする。

### 2.2 LLG の代表形
LLG は
$$
\frac{\partial \mathbf{m}}{\partial t}
= -\gamma\,\mathbf{m}\times \mathbf{H}_{\mathrm{eff}}
+\alpha\,\mathbf{m}\times \frac{\partial \mathbf{m}}{\partial t}
$$
である。ここで $\gamma$ はジャイロ磁気比、$\alpha$ は Gilbert 減衰である。

数値計算では、右辺に $\partial \mathbf{m}/\partial t$ が再登場する形を整理した
$$
\frac{\partial \mathbf{m}}{\partial t}
= -\frac{\gamma}{1+\alpha^2}\left[
\mathbf{m}\times \mathbf{H}_{\mathrm{eff}}
+\alpha\,\mathbf{m}\times\left(\mathbf{m}\times \mathbf{H}_{\mathrm{eff}}\right)
\right]
$$
が扱いやすい場合が多い。

### 2.3 有効磁界
有効磁界は自由エネルギー密度 $w(\mathbf{m},\nabla\mathbf{m},\boldsymbol{\varepsilon},\dots)$ から
$$
\mathbf{H}_{\mathrm{eff}}
= -\frac{1}{\mu_0 M_s}\frac{\delta E}{\delta \mathbf{m}}
\;+\;\mathbf{H}_{\mathrm{ext}}
\;+\;\mathbf{H}_{\mathrm{rf}}
\;+\;\cdots
,\quad
E=\int_\Omega w\,dV
$$
として与えるのが基本である。COMSOL 実装では「エネルギーから微分」を明示的に行うより、各寄与の $\mathbf{H}$ を個別に定義して加算する設計がわかりやすい。

典型的な寄与は以下である。

(1) 交換相互作用（exchange）
$$
w_{\mathrm{ex}} = A|\nabla \mathbf{m}|^2
\quad\Rightarrow\quad
\mathbf{H}_{\mathrm{ex}}
= \frac{2A}{\mu_0 M_s}\nabla^2 \mathbf{m}
$$

(2) 一軸異方性（uniaxial）
$$
w_{\mathrm{ani}} = K_u\left(1-(\mathbf{m}\cdot\mathbf{e}_u)^2\right)
\quad\Rightarrow\quad
\mathbf{H}_{\mathrm{ani}}
= \frac{2K_u}{\mu_0 M_s}(\mathbf{m}\cdot\mathbf{e}_u)\,\mathbf{e}_u
$$

(3) Zeeman（外場）
$$
w_{\mathrm{Z}}=-\mu_0 M_s\,\mathbf{m}\cdot\mathbf{H}_{\mathrm{ext}}
\quad\Rightarrow\quad
\mathbf{H}_{\mathrm{Z}}=\mathbf{H}_{\mathrm{ext}}
$$

(4) 反磁界（静磁界、demagnetizing field）
磁化から生じる磁束密度は
$$
\mathbf{B}=\mu_0(\mathbf{H}+\mathbf{M})=\mu_0(\mathbf{H}+M_s\mathbf{m})
$$
であり、準静的（$\partial\mathbf{D}/\partial t$ を無視する）な磁気のガウス則
$$
\nabla\cdot \mathbf{B}=0
$$
により反磁界は全領域（試料外の空間も含む）で決まる。実装では、磁気スカラポテンシャル $\phi$ を用いて
$$
\mathbf{H}_d=-\nabla \phi,\quad
\nabla\cdot(\mathbf{H}_d+\mathbf{M})=0
$$
を外部空間を含んで解くのが標準的である（遠方境界条件を工夫する）。

(5) 磁気弾性（magnetoelastic）と誘導磁界（eddy/Oersted）
これらは後述の連成で $\mathbf{H}_{\mathrm{eff}}$ に追加される主要項である。

## 3. 電磁場–LLG 連成：Maxwell 方程式と渦電流

### 3.1 準静的電磁場の基本式（導体中の誘導）
多くの磁性材料・素子スケールでは、電磁波としての伝搬（変位電流）より渦電流が支配的になる領域がある。このとき典型の構成は次である。

(1) Faraday の法則
$$
\nabla\times \mathbf{E}=-\frac{\partial \mathbf{B}}{\partial t}
$$

(2) Ampère の法則（準静的）
$$
\nabla\times \mathbf{H}=\mathbf{J}
$$

(3) 物質関係と磁化
$$
\mathbf{B}=\mu_0(\mathbf{H}+\mathbf{M})
$$

(4) 導体の構成則（オーム則）
$$
\mathbf{J}=\sigma \mathbf{E}
\quad(\sigma:\ \text{電気伝導率})
$$

このとき $\mathbf{M}(t)$ が変わると $\mathbf{B}(t)$ が変わり、誘導電界 $\mathbf{E}$ を介して渦電流 $\mathbf{J}$ が流れ、その電流が作る磁界が磁化へフィードバックする。

### 3.2 連成の流れ
時間ステップ $t^n\to t^{n+1}$ を考えると、最も直感的な流れは次である。

- LLG：$\mathbf{m}^{n}\ \Rightarrow\ \mathbf{m}^{n+1}$
- Maxwell：$\mathbf{M}^{n+1}=M_s\mathbf{m}^{n+1}$ を使って $\mathbf{B},\mathbf{H},\mathbf{E},\mathbf{J}$ を解く
- フィードバック：得られた誘導磁界 $\mathbf{H}_{\mathrm{ind}}$ を $\mathbf{H}_{\mathrm{eff}}$ に足して次ステップへ

この「逐次（staggered）連成」は安定性の制約が出る場合がある一方、設定と計算コストの見通しが良い。
非線形性が強い、あるいは厳密な相互作用が必要な場合は、LLG と Maxwell を同一スタディで同時に解く（monolithic）設計が候補になる。

### 3.3 損失評価（渦電流損）
電磁場側の損失は Joule 発熱として
$$
p_J = \mathbf{J}\cdot\mathbf{E}=\frac{|\mathbf{J}|^2}{\sigma},\quad
P_J=\int_\Omega p_J\,dV
$$
で見積もる。時間平均（交流定常）や 1 周期積分により、磁化ダイナミクスと損失の相関を定量化できる。

## 4. 弾性場–LLG 連成：磁気弾性と磁歪

### 4.1 固体力学（弾性体）の基本式
変位 $\mathbf{u}$、ひずみ $\boldsymbol{\varepsilon}$、応力 $\boldsymbol{\sigma}$ を用いる。

- ひずみ（小変形）
$$
\boldsymbol{\varepsilon}
=\frac{1}{2}\left(\nabla \mathbf{u}+(\nabla \mathbf{u})^\top\right)
$$

- 運動方程式（動弾性）
$$
\rho\frac{\partial^2 \mathbf{u}}{\partial t^2}
=\nabla\cdot\boldsymbol{\sigma}+\mathbf{f}
$$

- 構成則（線形弾性の例）
$$
\boldsymbol{\sigma}=\mathbb{C}:\left(\boldsymbol{\varepsilon}-\boldsymbol{\varepsilon}^\lambda\right)
$$
ここで $\boldsymbol{\varepsilon}^\lambda$ は磁歪に由来する固有ひずみ（eigenstrain）として導入できる。

### 4.2 磁気弾性エネルギー：ひずみが磁化に与える効果
磁気弾性は、ひずみ（あるいは応力）が磁気自由エネルギーに寄与することで「磁化が回りやすい方向」を変える。

立方晶の代表的な磁気弾性エネルギー密度は
$$
w_{\mathrm{me}}
= B_1\left(\varepsilon_{xx}m_x^2+\varepsilon_{yy}m_y^2+\varepsilon_{zz}m_z^2\right)
+2B_2\left(\varepsilon_{xy}m_xm_y+\varepsilon_{yz}m_ym_z+\varepsilon_{zx}m_zm_x\right)
$$
で表される（$B_1,B_2$ は磁気弾性定数）。

このとき磁気弾性が作る有効磁界は
$$
\mathbf{H}_{\mathrm{me}}
= -\frac{1}{\mu_0 M_s}\frac{\partial w_{\mathrm{me}}}{\partial \mathbf{m}}
$$
であり、$\mathbf{H}_{\mathrm{eff}} \leftarrow \mathbf{H}_{\mathrm{eff}}+\mathbf{H}_{\mathrm{me}}$ として LLG に入る。
これが逆磁歪（Villari 効果）に相当する。

### 4.3 磁歪による弾性場の駆動：磁化が構造を動かす効果
一方、磁化方向が固有ひずみ $\boldsymbol{\varepsilon}^\lambda(\mathbf{m})$ を与えるモデルを置くと、弾性体は磁化の変化により力学的に駆動される。

等方的な簡略モデルの一例は
$$
\varepsilon_{ij}^\lambda
=\frac{3}{2}\lambda_s\left(m_i m_j-\frac{1}{3}\delta_{ij}\right)
$$
である（$\lambda_s$ は飽和磁歪定数）。
結晶学的な磁歪（$\lambda_{100},\lambda_{111}$）を扱う場合は、結晶座標系への変換と方位依存を明示する。

磁歪を「固有ひずみ」として入れる設計と、磁気弾性エネルギー $w_{\mathrm{me}}$ を用いて「エネルギーから応力を導く」設計は、目的に応じて使い分ける。
後者では
$$
\boldsymbol{\sigma}_{\mathrm{me}}=\frac{\partial w_{\mathrm{me}}}{\partial \boldsymbol{\varepsilon}}
$$
を追加応力として固体力学へ入れるのが自然である。

## 5. 設計パターン

ここでは、LLG を COMSOL の「一般 PDE」として実装し、必要に応じて AC/DC（電磁場）や構造力学（弾性場）と連成する基本方針を示す。

### 5.1 依存変数の取り方：$\mathbf{m}$ を3成分で持つ
未知量（Dependent Variables）を
$$
m_x(\mathbf{r},t),\ m_y(\mathbf{r},t),\ m_z(\mathbf{r},t)
$$
として持つ。必要なら磁化の大きさ制約を
$$
g(\mathbf{m})=m_x^2+m_y^2+m_z^2-1=0
$$
で課す。

制約の入れ方は複数ある。
- 初期条件と時間積分で規格化を維持できる形式を選ぶ（数値誤差は残る）
- 弱い制約（Weak Constraint）やラグランジュ未定乗数で $|\mathbf{m}|=1$ を拘束する
- 各時間ステップで $\mathbf{m}\leftarrow \mathbf{m}/|\mathbf{m}|$ と再正規化する（方程式との整合に注意）

### 5.2 LLG と弱形式（FEM）
COMSOL は PDE を弱形式で解く設計と相性が良い。LLG を
$$
\frac{\partial \mathbf{m}}{\partial t} - \mathbf{F}(\mathbf{m},\nabla\mathbf{m},\mathbf{H}_{\mathrm{eff}})=\mathbf{0}
$$
と書き、テスト関数 $\mathbf{v}$ を掛けて領域積分する：
$$
\int_\Omega \mathbf{v}\cdot\left(\frac{\partial \mathbf{m}}{\partial t}-\mathbf{F}\right)\,dV=0
$$
交換項を含む場合は $\nabla^2\mathbf{m}$ が現れ、部分積分により一次微分へ落とし込むことで FEM 実装が安定化する。
境界条件（交換の自然境界条件など）も弱形式で整理しやすい。

### 5.3 反磁界（長距離相互作用）の扱い
反磁界は局所 PDE だけでは閉じないため、次のどれかを採る。

- 外部空間を含む磁気静解析（または準静解析）を併設し、$\phi$ または $\mathbf{A}$ から $\mathbf{H}_d$ を得て LLG に渡す
- 無限要素（Infinite Elements）等で遠方境界を近似する
- 既存の磁場インターフェース（磁気準静）で磁化をソースとして与える

LLG 単独モデルの検証として、反磁界を切った状態で交換＋異方性＋外場のみの既知解（歳差運動、Kittel 式など）と一致するかを先に確認すると良い。

### 5.4 電磁場–LLG 連成
電磁場は AC/DC の Magnetic Fields（mf）等で
- $\mathbf{A}$–$V$ 形式（ベクトルポテンシャル $\mathbf{A}$ とスカラポテンシャル $V$）
- あるいは $\mathbf{H}$ 形式
を選ぶことになる。

連成の最小構成は次である。
- LLG 側：$\mathbf{M}=M_s\mathbf{m}$ を計算して公開（変数として定義）
- 電磁場側：$\mathbf{B}=\mu_0(\mathbf{H}+\mathbf{M})$ を反映するように磁化をソースとして与える
- フィードバック：電磁場から得た $\mathbf{H}_{\mathrm{ind}}$（誘導磁界、Oersted 磁界）を LLG の $\mathbf{H}_{\mathrm{eff}}$ に加える
- ポスト：$\mathbf{J}$、$p_J=|\mathbf{J}|^2/\sigma$、磁束密度 $\mathbf{B}$ の位相遅れ等を評価

周波数領域（Frequency Domain）で「線形化 LLG（小振幅）」を使い、電磁場と同時に解く設計もあり得る。非線形なドメイン壁運動や大振幅スイッチングでは Time Dependent が中心になる。

### 5.5 弾性場–LLG 連成
弾性場との連成は、次の2本立てで組むのが分かりやすい。

- ひずみ → 磁化（逆磁歪）
  - Solid Mechanics から $\boldsymbol{\varepsilon}$ を出し、$w_{\mathrm{me}}(\boldsymbol{\varepsilon},\mathbf{m})$ を計算
  - $\mathbf{H}_{\mathrm{me}}=-(1/\mu_0M_s)\,\partial w_{\mathrm{me}}/\partial\mathbf{m}$ を LLG に入力

- 磁化 → 応力/ひずみ（磁歪駆動）
  - $\boldsymbol{\varepsilon}^\lambda(\mathbf{m})$ を固有ひずみとして Solid Mechanics に入力する、または
  - $\boldsymbol{\sigma}_{\mathrm{me}}=\partial w_{\mathrm{me}}/\partial\boldsymbol{\varepsilon}$ を追加応力として入れる

磁化ダイナミクスと弾性波（SAW/BAW）を同時に扱う場合は、弾性側の時間刻みと磁化側の前進刻みが食い違いやすい。単純な逐次連成から始め、必要に応じて同時解法へ移行する。

## 6. 数値計算設定：収束と安定化

### 6.1 スケールと無次元化
LLG は歳差運動（高速）と減衰緩和（比較的遅い）が混在し、剛性（stiffness）を持つ。数値安定化の観点から次を整理する。
- 時間スケール：$t_0=(\gamma\mu_0 H_0)^{-1}$ を基準化する
- 長さスケール：交換長 $l_{\mathrm{ex}}=\sqrt{2A/(\mu_0 M_s^2)}$ を目安にメッシュを切る
- 反磁界を入れると外部空間のメッシュや境界条件が支配する

### 6.2 メッシュの目安
- 交換項を入れる場合：$l_{\mathrm{ex}}$ より十分小さい要素が必要になりやすい
- ドメイン壁幅（Bloch/Néel）を解像するには壁幅 $\Delta$ の数分割が必要になる
- 電磁場連成：表皮深さ $\delta=\sqrt{2/(\mu\sigma\omega)}$ を解像する必要がある
- 弾性場連成：波長 $\lambda=v/f$（$v$ は音速）を解像する必要がある

### 6.3 ソルバ戦略
- 逐次（Segregated）：
  - LLG → 電磁場 →（→ 弾性場）を順に解く
  - 初期導入が容易だが、強いフィードバックで安定性が悪化することがある

- 同時（Fully Coupled / Monolithic）：
  - すべての未知量を同時に Newton 反復で解く
  - 安定性は上がり得るが、ヤコビアンが大きくなり計算は重くなる

最初の到達目標は、(i) LLG 単体で既知の検証を通し、(ii) 電磁場・弾性場を単体で検証し、(iii) 片方向連成 → 双方向連成へ、の順に拡張することである。

## 7. 検証

LLG 単体
- 一様磁化＋外場：歳差周波数が理論式に近いか
- 一軸異方性：易磁化軸への緩和が起こるか
- 交換＋境界：境界近傍の人工的な発散がないか
- 反磁界：薄膜・棒など形状異方性の定性的傾向が再現されるか

電磁場–LLG
- 導体単体：既知の渦電流分布（簡単形状）と整合するか
- 表皮深さ：周波数依存の電流集中が妥当か
- 損失：$P_J$ のスケーリング（$\propto \omega^2$ 等、条件依存）を確認する

弾性場–LLG
- 弾性単体：固有振動数、波の伝搬速度が材料定数と整合するか
- 静的磁歪：磁化向きで変位・ひずみの符号が変わるか
- 磁気弾性：応力印加で有効異方性が変調されるか（Villari 的な挙動）

## 8. 注意点

- $|\mathbf{m}|=1$ が崩れる
  - まずはダンピングを入れた単純ケースで確認し、制約（弱拘束や再正規化）の導入を段階的に行う

- 反磁界が不安定／境界依存になる
  - 外部空間の取り方（サイズ、無限要素）、境界条件、メッシュを見直す
  - 反磁界を切ったモデルで LLG の核が正しいことを先に保証する

- 電磁場連成で計算が硬くなる
  - 準静近似が妥当かを見直す（周波数帯、サイズ、材料）
  - 導体領域の表皮深さに合わせてメッシュを設計する

- 弾性場連成で時間刻みが合わない
  - 逐次連成で刻みを揃える（共通の時間ステップを採る）か、同時解法を検討する
  - 弾性側を周波数領域に落とす（小振幅）など、問題設定を分離して段階導入する

## まとめ
- LLG は有効磁界 $\mathbf{H}_{\mathrm{eff}}$ を介して、電磁場（渦電流・誘導磁界）や弾性場（磁気弾性・磁歪）と自然に連成する。
- COMSOL では LLG を PDE として実装し、AC/DC の磁場インターフェースや Solid Mechanics と変数受け渡しで結ぶことで、LLG 単体から電磁場–LLG、弾性場–LLG へ段階拡張できる。
- 連成は「まず単体検証 → 片方向連成 → 双方向連成」の順で組むと破綻しにくく、メッシュは交換長・表皮深さ・弾性波長の3つを同時に意識するのが要点である。
