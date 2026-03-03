# 分子動力学（MD）法の原理

分子動力学（Molecular Dynamics; MD）法は、原子（粒子）に働く力を与えて運動方程式を数値積分し、構造とダイナミクスを有限温度で追跡する計算手法である。時間発展の軌道から、熱平衡の統計量と輸送係数を同一の枠組みで評価できる。

## 参考ドキュメント
1. L. Verlet, Computer “experiments” on classical fluids. I. Thermodynamical properties of Lennard-Jones molecules
   https://compphys.quantumtinkerer.tudelft.nl/downloads/Verlet.pdf
2. S. Nosé, A unified formulation of the constant temperature molecular dynamics methods, J. Chem. Phys. 81, 511 (1984)
   https://pubs.aip.org/aip/jcp/article/81/1/511/607222/A-unified-formulation-of-the-constant-temperature
3. 吉井範行, 分子動力学法 I, 応用物理 75(6), 718 (2006)
   https://www.jstage.jst.go.jp/article/oubutsu/75/6/75_718/_article/-char/ja


## 1. ニュートン方程式とハミルトニアン
粒子 $i$（質量 $m_i$、位置 $r_i$、運動量 $p_i$）に対して

$$
m_i \ddot{\mathbf r}_i = \mathbf F_i
$$

であり、力はポテンシャルエネルギー $U$ から

$$
\mathbf F_i = -\nabla_{\mathbf r_i} U(\mathbf r_1,\dots,\mathbf r_N)
$$

で与える。等価に、ハミルトニアン

$$
H(\mathbf r,\mathbf p)=\sum_{i=1}^{N}\frac{\mathbf p_i^2}{2m_i}+U(\mathbf r)
$$

を用いて

$$
\dot{\mathbf r}_i=\frac{\partial H}{\partial \mathbf p_i},\quad
\dot{\mathbf p}_i=-\frac{\partial H}{\partial \mathbf r_i}
$$

を積分する問題である。

## 2. 力を与えるモデル：相互作用ポテンシャル
MDの中身は、(i) $U$ のモデル化 と (ii) 時間積分 に分解できる。

代表例
- 単純モデル：Lennard–Jones（凝集・弾性の教科書例）
- 金属：EAM/MEAM（埋め込み関数により多体性を表現）
- 共有結合：Tersoff, Stillinger–Weber など（角度依存）
- 電荷系：クーロン＋短距離（長距離項の扱いが本質）
- 近年：機械学習ポテンシャル（第一原理の学習により大規模化を狙う）

## 3. 数値積分：Verlet系アルゴリズムと性質
MDは微分方程式の数値解であるため、長時間安定性が重要である。典型的には、時間可逆性と（近似的）エネルギー保存に優れるVerlet系が標準である。

### 3.1 Verlet法
位置のみで更新する基本形は

$$
\mathbf r(t+\Delta t)=2\mathbf r(t)-\mathbf r(t-\Delta t)+\mathbf a(t)\Delta t^2
$$

（aは加速度）である。

### 3.2 velocity Verlet法
速度を明示する実務形として

$$
\mathbf r_{n+1}=\mathbf r_n+\mathbf v_n\Delta t+\frac{1}{2}\mathbf a_n\Delta t^2
$$

$$
\mathbf v_{n+1}=\mathbf v_n+\frac{1}{2}(\mathbf a_n+\mathbf a_{n+1})\Delta t
$$

がよく用いられる。安定性は$Δt$に強く依存し、最速振動（軽元素・強結合）で上限が決まる。

## 4. 統計力学との接続：アンサンブル
MDは単一軌道の時間平均から統計平均を得る（エルゴード仮定）という立場を取る。設定する保存量によりアンサンブルを選ぶ。

| アンサンブル | 制御量 | 典型用途 |
|---|---|---|
| NVE | N, V, E | エネルギードリフト確認、純粋なダイナミクス |
| NVT | N, V, T | 温度一定の平衡構造、拡散、欠陥移動 |
| NPT | N, P, T | 密度・熱膨張、相転移、応力緩和 |

温度は自由度 $f$ に対し、運動エネルギー $K$ を用いて

$$
T=\frac{2K}{f k_\mathrm{B}},\quad K=\sum_i \frac{1}{2}m_i v_i^2
$$

で定義する（拘束条件がある場合は $f$ が減る）。

## 5. 温度・圧力制御：サーモスタットとバロスタット
実験条件（TやP）に合わせるため、運動方程式を拡張してNVTやNPTを実現する。

サーモスタットの代表
- Andersen：確率的に速度を再サンプルし、カノニカル分布を得る
- Nosé–Hoover：拡張変数を導入し、決定論的にカノニカル分布を生成
- Langevin：摩擦＋ランダム力により温度を制御し、数値的に頑健になりやすい

バロスタットの代表
- Andersen：体積自由度を導入して圧力一定を実現
- Parrinello–Rahman：セル形状まで自由度として持ち、異方応力に対応する

選択指針
- 物性評価（輸送係数など）では、サーモスタットの影響を最小にする設計が必要である
- 構造緩和や密度合わせでは、頑健性を優先してNPT→NVT→NVEの段階運用が有効である

## 6. 周期境界条件と長距離相互作用
固体・バルク液体では周期境界条件（PBC）が標準である。短距離相互作用はカットオフと近接セルの最小像で扱えるが、クーロン相互作用は長距離で収束が悪い。

典型解法
- Ewald和：実空間の短距離項＋逆空間（フーリエ）の長距離項に分割して高速収束させる
- PME（Particle Mesh Ewald）：逆空間和を格子化してFFTで高速化し、概ね $O(N\log N)$ を狙う

## 7. 物理量：構造・拡散・輸送係数
MDの出力はトラジェクトリであり、そこから観測量を再構成する。

### 7.1 構造：RDFと配位数
部分RDF $g_{\alpha\beta}(r)$ から配位数を

$$
N_{\alpha\beta}(r_c)=4\pi \rho_\beta \int_0^{r_c} r^2 g_{\alpha\beta}(r)\,dr
$$

で定義できる（$r_c$は第1極小など）。

### 7.2 拡散：MSD（Einstein関係）
平均二乗変位MSD(t)を

$$
\mathrm{MSD}(t)=\langle |\mathbf r(t)-\mathbf r(0)|^2\rangle
$$

とすると

$$
D=\lim_{t\to\infty} \frac{\mathrm{MSD}(t)}{6t}
$$

で拡散係数を得る。

### 7.3 輸送係数：Green–Kubo型（例）
例えば粘性係数$η$は応力テンソルの自己相関から

$$
\eta = \frac{V}{k_\mathrm{B}T}\int_0^\infty \langle P_{\alpha\beta}(0)P_{\alpha\beta}(t)\rangle\,dt
$$

のように評価する（成分平均などを併用する）。

## 8. ワークフロー
- 初期構造作成（結晶、欠陥、ランダム、界面など）とエネルギー最小化
- 平衡化（T/Pの収束、密度・応力の安定化）
- 本計算（統計取得）と独立初期条件での複数本実行
- 収束確認（$Δt$依存、セルサイズ依存、カットオフ依存、サーモスタット依存）

拘束（SHAKE等）を用いる場合は自由度と温度定義の整合を常に意識する必要がある。

## 9. 限界と拡張
MDの限界は時空間スケールにある。希少事象（核生成、遅い拡散、化学反応）には、拡張サンプリングや遷移経路法が必要になる。第一原理MD（AIMD）は力の信頼性が高い一方で高価であり、機械学習ポテンシャルや粗視化とのハイブリッドが実務解として用いられることが増えている。

## まとめ
MD法は、ポテンシャルから力を定義し、安定な積分器で運動方程式を積分してトラジェクトリを生成し、統計力学に基づいて物理量へ写像する方法である。実用上は、アンサンブル設計、サーモスタット／バロスタットの選択、PBCと長距離相互作用、収束検証（Δt・サイズ・相互作用）の4点を押さえることが、信頼できる材料物性評価の近道である。

