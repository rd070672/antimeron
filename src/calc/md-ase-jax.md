# ASE と JAX-MD による MD 計算

ASE は「原子構造（Atoms）＋計算器（Calculator）＋ワークフロー」を統一する枠組みであり、JAX-MD は「自動微分可能でGPU/TPUに適したMD」を関数合成として実装する枠組みである。両者を使い分けることで、MDの計算規模・拡張性・学習との接続性を整理して設計できる。

## 参考ドキュメント
1. ASE Documentation: Molecular dynamics
   https://wiki.fysik.dtu.dk/ase/ase/md.html
2. JAX-MD Documentation: Simulation routines
   https://jax-md.readthedocs.io/en/main/jax_md.simulate.html
3. 大阪大学 精密工学専攻（千里）STATE Senri Wiki: ASE tutorial（日本語）
   https://www-cp.prec.eng.osaka-u.ac.jp/puki_state/index.php?ASE_tutorial_jp=

## 1. 全体像
- 計算の核（力の計算）
  - 古典ポテンシャル、反応力場、機械学習ポテンシャル、第一原理（外部計算）
- 時間発展（積分器）
  - NVE/NVT/NPT、Langevin、拘束、外場、変形
- サンプリング（統計と希少事象）
  - 温度・圧力制御、自由エネルギー、遷移探索、複数レプリカ
- 解析（物性への還元）
  - RDF、配位数、MSD、拡散係数、応力、相転移指標、局所秩序

ASE は「外部コードや多様なポテンシャルを同じAPIで回す」ことに強い。JAX-MD は「高速ベクトル化・JIT・自動微分により、学習や最適化とMDを直結する」ことに強い。

## 2. ASE による MD
### 2.1 基本コンセプト
- Atoms：原子種、座標、セル、周期境界条件、速度などを保持する
- Calculator：与えられた Atoms に対して、エネルギー・力・（必要なら）応力を返す
- MD integrator：Calculator から力を受け取り、時間積分してトラジェクトリを生成する

力は
\[
\mathbf{F}_i = -\nabla_{\mathbf r_i} U(\{\mathbf r\})
\]
であり、ASE では「U と F を返せるか」が Calculator の最小要件になる。

### 2.2 ASE の MD 機能
- NVE：Velocity Verlet
- NVT：Langevin など（中心質量の扱いなど細部の既定挙動に注意する）
- 出力：Trajectory（.traj）や XYZ、各種フォーマットへの write で整理できる

### 2.3 ASE が得意なこと
- VASP / Quantum ESPRESSO / GPAW など外部計算器（DFTやTB）を Calculator として扱い、同一のスクリプトから構造最適化・MD・NEBまで繋げられる
- 既存の古典力場・学習ポテンシャルを Calculator として差し替え、同じ解析パイプラインで比較できる
- 形状生成（表面・界面・欠陥モデル）と、入出力（多形式）を一箇所に集約できる

### 2.4 ASE が苦手になりやすいこと
- 極大規模・多数レプリカの「完全GPU常駐MD」を、最小のオーバーヘッドで回す用途には向きにくい（外部エンジン呼び出しで補う設計が多い）
- 計算の妥当性は Calculator に依存するため、ポテンシャル適用範囲外の外挿で破綻しうる

## 3. JAX-MD による MD
### 3.1 基本コンセプト
JAX-MD はデータを配列として保持し、状態（positions, velocities など）を「関数で次状態へ写像する」設計をとる。
- エネルギー関数：E(positions; θ)
- 力：\mathbf F = -\nabla_{\mathbf r} E（自動微分で取得）
- 近傍リスト：近接対のみを扱い計算量を抑える（周期境界条件と併用）
- 積分器：NVE/NVT/NPT、Langevin（BAOAB等）、Nosé–Hoover chain などを関数として提供する

微分可能性は、例えば「軌道全体」への勾配を通せることを意味し、ポテンシャルや制御パラメータを軌道ベースの目的関数で最適化できる。

### 3.2 NVT の代表：Langevin の形
Langevin は確率微分方程式として
\[
m\dot{\mathbf v} = \mathbf F(\mathbf r) - \gamma m \mathbf v + \sqrt{2\gamma m k_B T}\,\boldsymbol\eta(t)
\]
で記述され、熱浴との結合を摩擦とノイズで表す。JAX-MD は NVT/NPT を含む複数のサーモ/バロスタットを用意している。

### 3.3 JAX-MD が得意なこと
- GPU/TPU 対応のベクトル化・JIT による高速化、複数条件（温度・応力・組成）をまとめて回す設計と相性がよい
- 自動微分により「ポテンシャル学習」「逆問題」「メタ最適化」をMDと一体で扱える
- 学習ポテンシャル（ニューラルネット、GNN、展開型）を同じ計算グラフに組み込みやすい

### 3.4 JAX-MD が注意を要する点
- 研究用ライブラリとしての性格が強く、欲しい相互作用・境界条件・特殊機能（反応、電荷、複雑な拘束）が揃っているとは限らない
- 乱数・確率積分・再現性・統計収束の扱いは、JAXのPRNG設計と整合させて設計する必要がある
- 高精度物性（障壁、界面エネルギー、輸送係数）では、参照計算・検証設計が支配的である

## 4. 使い分けガイド
|目的|推奨の主役|理由|
|---|---|---|
|外部DFT/古典MD/MLポテンシャルを統一的に回したい|ASE|Calculator 抽象化で差し替えが容易である|
|モデル生成→計算→解析を一つのワークフローにまとめたい|ASE|構造生成・入出力・後処理の道具立てが豊富である|
|GPU常駐で高速に回し、学習・最適化と直結したい|JAX-MD|JIT・ベクトル化・自動微分が核である|
|ポテンシャルや制御パラメータを軌道目的で最適化したい|JAX-MD|軌道を含む微分可能計算として扱える|
|大型系の生産計算を堅牢に回したい|ASE＋外部エンジン / あるいはJAX-MD|ASEは外部エンジン統合、JAX-MDはGPU設計が得意である（目的に合わせる）|

## 5. 連携パターン
### 5.1 ASE を入出力・構造生成に用い、JAX-MD を時間発展に用いる
- ASE：欠陥・表面スラブ・組成モデルの生成、初期構造の読み書き、トラジェクトリ整理
- JAX-MD：positions を配列として受け取り、積分器で長時間シミュレーション
- 解析は ASE/MDAnalysis/OVITO などに受け渡し、目的に応じた指標を計算する

### 5.2 ASE を統合オーケストレーターにして、JAX系ポテンシャルを Calculator 化する
- JAX で定義した energy_fn を用意し、ASE Calculator の get_forces/get_potential_energy に接続する
- ASE の MD（VelocityVerlet/Langevin など）をそのまま利用しつつ、力だけ JAX で計算する

### 5.3 データ生成 → 学習（JAX）→ 生産計算（ASE or JAX-MD）
- ASE で参照データ（構造、E/F/σ）を揃える（外部計算器との連携が強い）
- JAX で MLIP を学習し、検証セットで外挿を評価する
- 生産計算は、要件に応じて ASE（可搬性と統合）または JAX-MD（高速・微分可能）に流す

## 6. テンプレート
### 6.1 ASE：外部計算器を差し替えて同じMDを回す
```
atoms = read("init.structure")

atoms.calc = Calculator(...) # DFT/古典/ML のいずれでも可（EとFを返す）
initialize_velocities(atoms, T)

dyn = Dynamics(atoms, dt, ensemble="NVT", thermostat="Langevin")
dyn.attach(write_trajectory("traj.traj"), interval=K)
dyn.run(steps)
```

### 6.2 JAX-MD：エネルギー関数と積分器を関数として合成する
```
energy_fn = make_energy_fn(parameters, boundary, neighbor_list)
init_fn, step_fn = simulate.nvt_langevin(energy_fn, dt, T, gamma)

state = init_fn(key, positions, box)
for t in range(steps):
state = step_fn(state)
record(state.position, state.velocity, state.energy)
```

## 7. 検証チェックリスト
- Δt 依存性：エネルギードリフトや温度揺らぎの変化を点検する
- サイズ依存性：欠陥相互作用・相転移・輸送係数はセルサイズで変わりうる
- アンサンブル妥当性：温度・圧力制御の時定数が物理時間スケールを潰していないか
- 参照との整合：格子定数、弾性、欠陥形成、RDF、拡散係数など目的量に直結する指標で検証する
- 外挿検知：MLIP を用いる場合は、未知領域（高ひずみ・高温・遷移状態）を明示して管理する

## まとめ
ASE は多様な計算器とワークフローを統一し、同じMD手順でポテンシャルや手法を交換できる枠組みである。JAX-MD は自動微分とGPU/TPU最適化を核に、学習・最適化とMDを連結する枠組みである。目的現象に対する検証項目を先に固定し、ASE を統合層、JAX-MD を高速・微分可能エンジン層として使い分ける設計が有効である。