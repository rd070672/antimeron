# mumax による LLG マイクロ磁化・磁気弾性シミュレーション

MuMax3 は GPU 上で動作する有限差分マイクロ磁化シミュレータであり、LLG 方程式に基づく磁区・磁壁・スピンダイナミクスを高速に扱える枠組みである。mumax+ はその設計思想を拡張し、Python インターフェースや複雑な秩序（反強磁性など）・磁気弾性連成まで視野に入れた拡張可能な実装である。

## 参考ドキュメント
- MuMax3 公式 Examples（Standard Problem #4 など）
  https://mumax.github.io/examples.html
- mumax+: extensible GPU-accelerated micromagnetics and beyond（arXiv）
  https://arxiv.org/abs/2411.18194
- A magnetoelastic module for mumax3（GitHub）
  https://github.com/Fredericvdv/Magnetoelasticity_MuMax3

## 1. 何をどこまで計算するか

マイクロ磁化法は、磁化を連続場として表し、有限の計算格子上でエネルギー汎関数と運動方程式を解くことで、メソスケール（概ね nm〜µm）の磁区形成や時間発展を再現する枠組みである。対象は主に以下である。

- 磁区構造の準安定状態（渦、ストライプ、ランドスケープ）
- 磁壁移動・ピン止め・スキルミオン運動
- FMR / スピン波などの高周波応答（線形・非線形）
- 外部磁場・スピン流・温度（モデル依存）によるダイナミクス
- 磁歪（磁気弾性）を含む、応力・ひずみによる状態制御（拡張機能）

扱うスケールと近似は次のように整理できる。

| 観点 | マイクロ磁化（MuMax系） | 第一原理（DFT） | 原子スピン（Heisenberg/LLG） |
|---|---|---|---|
| 自由度 | 連続磁化場 $\mathbf{m}(\mathbf{r},t)$ | 電子波動関数 | 原子スピン $\{\mathbf{S}_i\}$ |
| 空間スケール | nm〜µm | Å〜nm | Å〜数10 nm |
| 材料入力 | $M_s, A, K, \alpha, D, B_1,B_2,\dots$ | 自己無撞着に推定 | 交換 $J_{ij}$、異方性など |
| 強み | 大域形状・長距離反磁界、磁区 | 電子状態・起源 | 原子分解能・熱ゆらぎなど |

MuMax3/mumax+ は、材料定数が与えられたときに「磁区・磁壁・スピン波がどう振る舞うか」を空間・時間で追うことに適している。

## 2. 基本方程式：LLG と有効磁場

### 2.1 正規化磁化と有効磁場
磁化 $\mathbf{M}$ を飽和磁化 $M_s$ で規格化して $\mathbf{m}=\mathbf{M}/M_s$（$|\mathbf{m}|=1$）とする。エネルギー汎関数 $E[\mathbf{m}]$ から有効磁場 $\mathbf{H}_\mathrm{eff}$ を

$$
\mathbf{H}_\mathrm{eff}(\mathbf{r})=-\frac{1}{\mu_0 M_s}\frac{\delta E}{\delta \mathbf{m}(\mathbf{r})}
$$

で定義する。

### 2.2 Gilbert 形の LLG 方程式
LLG は典型に次である。

$$
\frac{\partial \mathbf{m}}{\partial t}
= -\gamma\, \mathbf{m}\times \mathbf{H}_\mathrm{eff}
+ \alpha\, \mathbf{m}\times \frac{\partial \mathbf{m}}{\partial t}
$$

ここで $\gamma$ はジャイロ磁気比、$\alpha$ は Gilbert 減衰である。数値実装では $\partial \mathbf{m}/\partial t$ を陽に解いて右辺を評価する形（Landau-Lifshitz 形など）に変形して時間積分する。

### 2.3 エネルギー項
MuMax3/mumax+ は有限差分格子でエネルギー密度 $w$ を離散化し、$E=\int w\,dV$ を評価する。最小セットは次である。

- 交換相互作用（短距離）
$$
w_\mathrm{ex}=A|\nabla \mathbf{m}|^2
$$

- 結晶磁気異方性（例：一軸）
$$
w_\mathrm{ani} = -K_u(\mathbf{m}\cdot \mathbf{u})^2
$$

- ゼーマン（外部磁場）
$$
w_\mathrm{Z} = -\mu_0 M_s\, \mathbf{H}_\mathrm{ext}\cdot \mathbf{m}
$$

- 反磁界（長距離）
$$
w_\mathrm{d} = -\frac{1}{2}\mu_0 M_s\, \mathbf{H}_\mathrm{d}\cdot \mathbf{m}
$$

- DMI（Dzyaloshinskii–Moriya 相互作用）
  - バルク型（Bloch 型ねじれを好む，立方晶 B20 などの近似）
  $$
  w_\mathrm{DMI}^{\mathrm{bulk}} = D\,\mathbf{m}\cdot(\nabla\times\mathbf{m})
  $$
  - 界面型（Néel 型ねじれを好む，薄膜界面の対称性破れ）
  $$
  w_\mathrm{DMI}^{\mathrm{int}} = D\left[m_z(\nabla\cdot\mathbf{m})-(\mathbf{m}\cdot\nabla)m_z\right]
  $$
  ここで $D$ は DMI 定数である（単位は J/m$^2$ など，定義と次元はモデルに依存する）。実装ではエネルギーから有効場 $\mathbf{H}_\mathrm{DMI}=-(\mu_0 M_s)^{-1}\delta E_\mathrm{DMI}/\delta\mathbf{m}$ を作り $\mathbf{H}_\mathrm{eff}$ に加える。

- STT（Spin-Transfer Torque：電流によるトルク，導電強磁性体）
  - 移流（adiabatic）項と非移流（non-adiabatic）項の代表形（LLG の右辺にトルクとして加える）
  $$
  \left.\frac{\partial \mathbf{m}}{\partial t}\right|_\mathrm{STT}
  =-(\mathbf{u}\cdot\nabla)\mathbf{m}
  +\beta\,\mathbf{m}\times\left[(\mathbf{u}\cdot\nabla)\mathbf{m}\right]
  $$
  ここで $\mathbf{u}$ はスピン流速度（電流密度に比例する有効速度），$\beta$ は非移流係数である。1 次元で $\mathbf{u}=u\hat{x}$ とすれば $-(u\partial_x)\mathbf{m}$ が移流項になる。

- SOT（Spin–Orbit Torque：スピン軌道相互作用起源，重金属/強磁性ヘテロ）
  - ダンピング様（damping-like）と磁場様（field-like）の代表形（LLG の右辺に加える）
  $$
  \left.\frac{\partial \mathbf{m}}{\partial t}\right|_\mathrm{SOT}
  =-\gamma H_\mathrm{FL}\,\mathbf{m}\times\boldsymbol{\sigma}
  -\gamma H_\mathrm{DL}\,\mathbf{m}\times(\mathbf{m}\times\boldsymbol{\sigma})
  $$
  ここで $\boldsymbol{\sigma}$ は注入スピンの偏極方向（しばしば電流方向と法線から決まる），$H_\mathrm{FL},H_\mathrm{DL}$ はそれぞれ磁場様・ダンピング様有効場である。SOT は「有効場」表現に落として $\mathbf{H}_\mathrm{eff}$ 側に足し込む設計も可能である。

- 熱項（有限温度ゆらぎ：確率的 LLG）
  - 有効場に熱ゆらぎ磁場 $\mathbf{H}_\mathrm{th}$ を加える（Gaussian white noise の代表モデル）
  $$
  \mathbf{H}_\mathrm{eff}\ \leftarrow\ \mathbf{H}_\mathrm{eff}+\mathbf{H}_\mathrm{th}(\mathbf{r},t)
  $$
  $$
  \langle H_{\mathrm{th},i}(\mathbf{r},t)\rangle = 0,\quad
  \langle H_{\mathrm{th},i}(\mathbf{r},t)\,H_{\mathrm{th},j}(\mathbf{r}',t')\rangle
  =\frac{2\alpha k_B T}{\gamma\mu_0 M_s V_\mathrm{cell}}\,
  \delta_{ij}\,\delta(\mathbf{r}-\mathbf{r}')\,\delta(t-t')
  $$
  ここで $T$ は温度，$V_\mathrm{cell}$ はセル体積，$k_B$ はボルツマン定数である。離散時間 $\Delta t$ では $\delta(t-t')$ を $\sim 1/\Delta t$ に読み替えた分散で乱数を生成する。

- 磁気弾性項（磁歪・応力による有効異方性）
  - 立方晶の代表形（ひずみ $\varepsilon_{ij}$ と磁化 $\mathbf{m}$ の結合）
  $$
  w_\mathrm{me}
  = B_1(\varepsilon_{xx}m_x^2+\varepsilon_{yy}m_y^2+\varepsilon_{zz}m_z^2)
  +2B_2(\varepsilon_{xy}m_xm_y+\varepsilon_{yz}m_ym_z+\varepsilon_{zx}m_zm_x)
  $$
  - 応力 $\sigma_{ij}$ を用いる等価表現（磁歪定数 $\lambda_{100},\lambda_{111}$ を用いる代表形）
  $$
  w_\mathrm{me}
  =-\frac{3}{2}\lambda_{100}\left(\sigma_{xx}m_x^2+\sigma_{yy}m_y^2+\sigma_{zz}m_z^2-\frac{1}{3}\mathrm{tr}(\boldsymbol{\sigma})\right)
  -3\lambda_{111}\left(\sigma_{xy}m_xm_y+\sigma_{yz}m_ym_z+\sigma_{zx}m_zm_x\right)
  $$
  磁気弾性は $\mathbf{H}_\mathrm{me}=-(\mu_0 M_s)^{-1}\partial w_\mathrm{me}/\partial\mathbf{m}$ を通じて $\mathbf{H}_\mathrm{eff}$ に加える。ひずみ場を外部から与える（準静的）場合と，弾性方程式と同時に解く（動的連成）場合で実装が分かれる。

## 3. MuMax3：特徴と計算の骨格

### 3.1 何が強いか
MuMax3 は以下の性格を持つ。

- 有限差分（structured grid）で高速
- 反磁界計算を FFT ベースで高速化
- GPU を前提に設計されており、大規模格子でも強い
- nm〜µm の磁区問題（特に薄膜・細線・パターン）の探索に向く

### 3.2 計算フロー
MuMax3 の入力は mx3 スクリプトであり、典型フローは次である。

1. 計算格子とセルサイズを設定する（SetGridsize, SetCellsize）
2. 材料定数を設定する（Msat, Aex, Ku1, alpha, …）
3. 初期磁化を設定する（uniform, vortex, random など）
4. 緩和（relax / minimize）で準安定状態を得る
5. 外場・電流・ひずみなどの条件を与えて時間発展（run）
6. 出力（autosave, tableautosave, save）

### 3.3 格子設計：交換長とセルサイズ
有限差分ではセルサイズが物理を決める。交換長

$$
\ell_\mathrm{ex}=\sqrt{\frac{2A}{\mu_0 M_s^2}}
$$

より十分小さいセル（目安として $\Delta x \lesssim \ell_\mathrm{ex}/2$）を選ぶと、磁壁幅やスピン構造を歪めにくい。薄膜では厚み方向セルを 1〜数層にして 2D 近似することも多いが、厚み方向のモード（厚み方向非一様性）を見たい場合は増やす必要がある。

### 3.4 反磁界と周期境界
反磁界は長距離相互作用であり、計算コストと境界条件が支配的である。MuMax3 は PBC を設定して「実効的に周期的に繰り返された試料」を模擬できるが、PBC の設定値は反磁界の見え方（何周期見せるか）にも影響するため、目的に応じて吟味が必要である。

### 3.5 標準問題による検証：muMAG Standard Problem
コードの妥当性確認として、muMAG Standard Problem（特に Standard Problem #4 のダイナミクス）は定番である。MuMax3 の公式例にも標準問題が含まれるため、環境構築後の最初の確認に適する。

## 4. mumax+：MuMax3 から何が変わるか

### 4.1 ねらい
mumax+ は、従来の MuMax3 では扱いづらい「複雑な磁気秩序」「界面を跨ぐ多場連成」「拡張性」を強く意識した設計である。特徴として次が挙げられる。

- Python ベースのユーザーインターフェース（入出力・解析と近い）
- 有限差分による磁化（および関連ベクトル場）の時間発展ソルバ
- 反強磁性体や非共線秩序を含む拡張、磁気弾性連成など

### 4.2 MuMax3 と mumax+ の違い
単純な強磁性薄膜の磁区問題では MuMax3 が最短距離で強い。一方で、次のような要件があると mumax+ 側の思想が生きる。

- 反強磁性・多サブ格子など、磁化以外の秩序パラメータを明示的に扱いたい
- ひずみ駆動のレーストラックなど、磁気弾性（あるいは弾性波）を動的に連成したい
- Python パイプラインで条件探索・最適化・可視化を密に回したい

## 5. 磁気弾性（磁歪）を入れる：静的ひずみ vs 動的連成

磁歪を取り込む流儀は大きく 2 つである。

- 静的ひずみの取り込み：弾性問題は外部で解き、得た $\varepsilon_{ij}(\mathbf{r})$（または応力）を MuMax 系に与えて磁気異方性（有効場）として作用させる
- 動的連成：LLG と弾性体の運動方程式を同時に解き、磁化と変位が相互にフィードバックする

目的が「応力印加で磁区がどう変わるか」の準静的探索であれば前者が軽い。弾性波・SAW・共鳴、あるいは磁化変化が弾性波を励起する問題では後者が必要になる。

## 6. 磁気弾性の基本式：エネルギーと連成項

### 6.1 ひずみと弾性エネルギー
変位場 $\mathbf{u}(\mathbf{r},t)$ から微小ひずみテンソルを

$$
\varepsilon_{ij}=\frac{1}{2}\left(\frac{\partial u_i}{\partial x_j}+\frac{\partial u_j}{\partial x_i}\right)
$$

とする。線形弾性では応力は

$$
\sigma_{ij}=C_{ijkl}\varepsilon_{kl}
$$

で与えられ、弾性エネルギー密度は

$$
w_\mathrm{el}=\frac{1}{2}\sigma_{ij}\varepsilon_{ij}
$$

である。

### 6.2 立方晶（代表形）の磁気弾性エネルギー
材料定数 $B_1,B_2$ を用いる表現として、磁気弾性エネルギー密度の一例は

$$
w_\mathrm{me}
= B_1(\varepsilon_{xx}m_x^2+\varepsilon_{yy}m_y^2+\varepsilon_{zz}m_z^2)
+2B_2(\varepsilon_{xy}m_xm_y+\varepsilon_{yz}m_ym_z+\varepsilon_{zx}m_zm_x)
$$

である。これにより磁化に対して磁気弾性有効場 $\mathbf{H}_\mathrm{me}$ が生じる。

### 6.3 逆作用：磁化が弾性を駆動する（体積力）
磁気弾性項は弾性側から見ると、磁化に依存する応力源（あるいは体積力）として働く。模式的には、弾性体の運動方程式

$$
\rho \frac{\partial^2 u_i}{\partial t^2} = \frac{\partial \sigma_{ij}}{\partial x_j} + f^\mathrm{me}_i + f^\mathrm{ext}_i
$$

において、$f^\mathrm{me}$ が磁気弾性由来の駆動となる。自由表面ではトラクションフリー $\sigma_{ij}n_j=0$、周期境界では周期条件などを課す。

## 7. MuMax3 での磁気弾性：拡張モジュールという選択肢

MuMax3 本体は LLG を中核に置くが、磁気弾性については拡張実装（モジュール）により、LLG と弾性体方程式を同時に解く枠組みが提案・公開されている。具体には以下が知られている。

- magnetoelastic module：弾性・運動（変位）と LLG の同時解法を行い、磁気弾性場・磁気弾性体積力・弾性/運動エネルギー密度などを出力可能
- 弾性境界条件として自由境界や周期境界を選べる設計が報告されている

mumax+ はこの系統をさらに一般化して、より多様な磁性秩序・連成を扱える方向を目指していると整理できる。

## 8. 数値解法：LLG と弾性の時間スケール

### 8.1 LLG の時間積分
LLG は剛性を持ちやすく、$\alpha$ や有効場の大きさ、格子分解能に応じて時間刻みが制限される。一般に

- 緩和計算（静的構造）では大きめの減衰で収束させる
- ダイナミクスでは物理的な $\alpha$ を入れ、安定性と精度を両立する

といった使い分けが行われる。

### 8.2 弾性波の CFL 条件
弾性体の波動は音速 $c$ と格子幅 $\Delta x$ によって CFL 条件が効き、

$$
\Delta t \lesssim \frac{\Delta x}{c}
$$

が目安となる。磁化ダイナミクスと弾性波の両方を同時に積分する場合、時間刻みは厳しくなりやすい。準静的ひずみで足りるか、動的連成が必須かを最初に切り分けることが計算設計の要点である。

## 9. 解析・可視化でよく使う量

- 磁化分布 $\mathbf{m}(\mathbf{r})$、平均磁化 $\langle \mathbf{m}\rangle$
- エネルギー項の分解：$E_\mathrm{ex},E_\mathrm{ani},E_\mathrm{d},E_\mathrm{Z},E_\mathrm{me},\dots$
- 磁壁位置・速度、スキルミオン数（定義に依存）
- スピン波の分散：空間・時間フーリエ（窓関数などを含む設計）
- 弾性側：変位 $\mathbf{u}$、ひずみ $\varepsilon_{ij}$、応力 $\sigma_{ij}$、弾性エネルギー、駆動源 $f^\mathrm{me}$

磁気弾性では、磁化の「変化」が弾性波の放射源になりうるため、定常応答だけでなく過渡応答（立ち上がり、反射、干渉）を観察対象に含めると整理が進む。

## 10. 注意点

- セルサイズが大きすぎて磁壁幅やスピン波が数セルで潰れている
- 反磁界境界（自由境界 vs 周期境界）が意図と違い、磁区見かけが変わっている
- 緩和とダイナミクスの減衰設定を混同して、時間応答が物理と合わない
- 単位系（特に $K$、$B_1,B_2$、応力・ひずみ）が混線している
- 動的磁気弾性で時間刻みが弾性波側に支配され、見かけの減衰や位相が崩れる

検証として、muMAG 標準問題や既知の解析解（単一スピンの歳差運動、薄膜の一様モード FMR など）で再現できる範囲を確かめてから、複雑系に進むのが安全である。

## まとめ
- MuMax3 は GPU 有限差分により、反磁界を含む大規模マイクロ磁化ダイナミクスを高速に扱える枠組みである。
- mumax+ は Python インターフェースと拡張性を軸に、反強磁性や磁気弾性連成など、より複雑な秩序・多場連成を扱う方向へ発展している。
- 磁気弾性は、静的ひずみの取り込みと動的連成で要求計算量と得られる物理が大きく異なるため、目的に応じて設計を分けることが重要である。

