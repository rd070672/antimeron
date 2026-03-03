# LAMMPS による分子動力学（MD）計算

LAMMPS は、原子・分子から粗視化粒子までを対象に、並列計算を前提として設計された分子動力学シミュレータである。ポテンシャルの多様性と拡張性（外部ライブラリ連携やプラグイン機構）により、材料系の幅広い現象を同一の枠組みで扱える点が特徴である。

## 参考ドキュメント
1. LAMMPS Documentation（最新版マニュアル一式）  
   https://docs.lammps.org/
2. Thompson, A. P. et al., LAMMPS - a flexible simulation tool for particle-based materials modeling at the atomic, meso, and continuum scales, Computer Physics Communications 271, 108171 (2022).  
   https://www.sciencedirect.com/science/article/pii/S0010465521002836
3. LAMMPS入門（HPCI 講習資料）  
   https://www.hpci-office.jp/documents/knowhow/ws_160219_yoshizawa.pdf

## 1. LAMMPS の位置づけ
LAMMPS は入力スクリプト駆動で計算を定義し、力場（相互作用）・境界条件・時間積分・統計アンサンブル制御・出力と解析を組み合わせて系の時間発展を計算する枠組みである。対象スケールは、原子スケール（結晶欠陥・界面・拡散）から、粗視化粒子（高分子・コロイド）やメソスケール粒子法まで広い。

MD の基本的な強みは、(i) 原子座標の時系列が直接得られること、(ii) 平衡・非平衡のどちらも扱えること、(iii) 応力・熱流束・拡散など「輸送・応答」を自然に評価できることである。一方で、時間・長さスケールに限界があり、ポテンシャルの妥当性が結果を支配する。

## 2. 計算の骨格：運動方程式とエネルギー
### 2.1 ニュートン方程式
古典 MD は、原子 $i$ の位置 $r_i$ と速度 $v_i$ を、ポテンシャルエネルギー $U({r})$ から得られる力で更新する。
$$
m_i \frac{d^2 \mathbf{r}_i}{dt^2} = \mathbf{F}_i = -\nabla_{\mathbf{r}_i} U(\{\mathbf{r}\})
$$
LAMMPS では $U$ の形は pair_style / bond_style / angle_style / kspace_style などで定義される。

### 2.2 代表的な相互作用
- 金属：EAM/MEAM、（場合により ADP など）
- 共有結合性：Tersoff、Stillinger–Weber
- 反応：ReaxFF（荷電・結合生成消滅を含む）
- イオン性：Buckingham + 長距離クーロン（PPPM 等）
- 機械学習ポテンシャル：SNAP、ACE(PACE)、GAP(QUIP)、Deep Potential(USER-DEEPMD) など

長距離相互作用を含む場合、実空間＋逆空間（Ewald/PPPM）分割を併用し、計算量と精度を制御する。

## 3. 数値解法：時間積分と安定性
### 3.1 速度 Verlet
多くの MD コードで標準的な積分法であり、保存系での長時間安定性に優れる。
$$
\mathbf{r}(t+\Delta t)=\mathbf{r}(t)+\mathbf{v}(t)\Delta t+\frac{\mathbf{F}(t)}{2m}\Delta t^2
$$
$$
\mathbf{v}(t+\Delta t)=\mathbf{v}(t)+\frac{\mathbf{F}(t)+\mathbf{F}(t+\Delta t)}{2m}\Delta t
$$
LAMMPS では run と time integration（fix nve 等）により実行される。

### 3.2 時間刻み Δt の目安
- 金属（units metal）：$\Delta t \sim 0.5–2 fs$ 程度が目安（最速振動に依存）
- 軽元素や強結合・高温・反応系：より小さい Δt が必要になりやすい
- 高温溶融や衝撃、反応力場は特にエネルギードリフト点検が重要である

### 3.3 注意点
- エネルギードリフト：$Δt$ が大きい、近接衝突、隣接リスト更新設定不適切
- 温度・圧力の見かけの安定：熱浴・圧力浴パラメータが強すぎてダイナミクスを歪める
- サイズ効果：欠陥相互作用や輸送係数で顕著（セル長、相関長、平均自由行程）
- 初期緩和不足：応力・体積・構造が未収束のまま物性評価してしまう

## 4. 統計アンサンブルと制御
LAMMPS では「fix」が系の操作単位であり、温度・圧力制御や拘束、変形、非平衡駆動などを記述する。

| 目的 | 代表アンサンブル | 代表的コマンド（概念） | 注意点 |
|---|---|---|---|
| 保存系ダイナミクス | NVE | fix nve | 温度ドリフトの原因点検に有用 |
| 温度一定 | NVT | fix nvt（Nose–Hoover 系） | 緩和時定数の設定で物性が変わり得る |
| 温度・圧力一定 | NPT | fix npt（Nose–Hoover 系） | 体積自由度が入るため過渡が長い |
| 簡易温度制御 | 近似 | Langevin, Berendsen 等 | 揺らぎの再現性に注意 |

## 5. 入力スクリプト
LAMMPS の入力は「初期化 → 相互作用 → 積分と制御 → 出力 → 実行」の順に組むと読みやすい。

### 5.1 スケルトン例（原子系）
```
units metal
atom_style atomic
boundary p p p

read_data data.Fe

pair_style eam/alloy
pair_coeff * * Fe.eam.alloy Fe

neighbor 2.0 bin
neigh_modify delay 10 check yes

timestep 0.001

velocity all create 300.0 12345 mom yes rot yes dist gaussian
fix int all nvt temp 300.0 300.0 0.1

thermo 100
thermo_style custom step temp pe etotal press vol

run 20000
unfix int
```

### 5.2 解析出力の基本
- thermo_style：温度、圧力、エネルギー、体積などのモニタ
- dump：座標・速度・応力などの時系列保存（後処理は OVITO 等が一般的）
- compute：MSD、RDF、局所構造、熱流束などの算出
- fix ave/time, fix ave/correlate：平均・相関関数（Green–Kubo 等）評価に利用

## 6. 物性評価の典型パターン
### 6.1 構造：RDF と配位
- RDF g(r) と配位数 N_c は、結晶・液体・アモルファスの識別や、短距離秩序の比較に有効である。
$$
N_c(r_c) = 4\pi \rho \int_0^{r_c} r^2 g(r)\,dr
$$

### 6.2 拡散：MSD と拡散係数
$$
D = \lim_{t\to\infty}\frac{1}{6t}\langle |\mathbf{r}(t)-\mathbf{r}(0)|^2\rangle
$$
温度依存から活性化エネルギー（Arrhenius）的傾向も検討できる。

### 6.3 応力–ひずみ、弾性、塑性
- 変形（box 変形や変位制御）と応力テンソル（virial）から、弾性率・降伏・転位活動などを評価する。
- 変形速度依存性が強いため、現実スケールとの対応は議論設計が必要である。

### 6.4 熱伝導率：Green–Kubo と NEMD
平衡 MD による Green–Kubo は、熱流束自己相関の時間積分で熱伝導率を評価する。
$$
\kappa = \frac{1}{3k_B T^2 V} \int_0^\infty \langle \mathbf{J}(0)\cdot\mathbf{J}(t)\rangle\,dt
$$
LAMMPS には熱流束計算や相関評価のためのコマンド群が用意されている。

## 7. 機械学習ポテンシャルとの連携
### 7.1 LAMMPS 側の統合インターフェース
- ML-IAP：機械学習原子間ポテンシャルの統一インターフェース（PyTorch などの Python モデル連携も選択肢に含まれる）
- PACE：ACE（Atomic Cluster Expansion）に基づく高次多体展開の効率実装
- ML-QUIP：QUIP を介して GAP 等のポテンシャルを利用

「pair_style」という名前でも多体相互作用を内部で扱う設計が一般的であり、入力上は既存の MD と同様の流れで使えるようにしてある。

### 7.2 Deep Potential（DeePMD-kit）との接続
- USER-DEEPMD により Deep Potential を LAMMPS から利用できる
- 近年は、再コンパイル不要で機能を追加できるプラグイン方式も普及している（環境変数による自動探索など）

## 8. GPU/並列化と計算設計
### 8.1 主要な並列化の考え方
- 空間分割（domain decomposition）に基づく MPI 並列が基本である
- ノード内並列は OpenMP やアクセラレータ（KOKKOS 等）で拡張する

### 8.2 KOKKOS とビルド
LAMMPS は CMake ビルドが主流であり、KOKKOS 等のアクセラレーションはビルド設定で有効化する。GPU は「速いが万能ではない」ため、系サイズ・相互作用（長距離、反応、ML 推論）・通信比率で速度が逆転することがある。

### 8.3 スケーリングを阻害しやすい要因
- 近接リスト更新頻度と cut-off 設定
- Kspace（PPPM）の設定やメッシュ分解
- I/O（dump の頻度、出力項目の過多）
- 解析（相関関数など）のオンザフライ計算コスト

## 9. 応用シナリオ例
### 9.1 欠陥・界面
- 空孔・格子間・置換、表面・粒界・界面の安定性
- 拡散（点欠陥・溶質）とトラップ

### 9.2 変形と破壊
- ひずみ負荷による転位活動、双晶、せん断バンド
- 亀裂先端の局所構造変化（ただし速度スケールの解釈が重要）

### 9.3 溶融急冷によるアモルファス生成
一般に「高温で十分に溶融 → 保持で記憶消去 → 急冷 → 低温で緩和」の順で設計する。温度・圧力制御（NVT/NPT）と冷却率が、密度・短距離秩序・ボイド形成に直結する。

簡易プロトコル例（考え方のみ）：
- NPT で密度を合わせる（高温液相）
- NVT で急冷（T を段階的に下げる、または time-dependent）
- 低温で NPT/NVT により構造緩和
- RDF、配位数、ボロノイ解析、S(q) 等で構造を評価

## 10. まとめ
LAMMPS は、入力スクリプトで「相互作用・積分・制御・解析」を合成することで、結晶・欠陥・界面・液体・アモルファス・粗視化系まで一貫して扱える MD プラットフォームである。計算の信頼性はポテンシャル選定と数値安定性（Δt、熱浴/圧力浴、サイズ効果、統計収束）に強く依存するため、検証計画と物性評価の流れをセットで設計することが要点である。

