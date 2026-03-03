# ギブス自由エネルギーに基づく合金設計

合金設計における「どの相が、どれだけ、いつ安定か」は、温度T・圧力P・組成に依存するギブス自由エネルギーGの比較として定式化できる。Gを相ごとにモデル化し、平衡条件を満たすように最小化することで、相図・析出・偏析・熱処理窓を定量的に決めることができる。

## 参考ドキュメント
- 計算状態図データベース（CPDDB, NIMS）
  https://cpddb.nims.go.jp/
- 西澤泰二, CALPHAD（計算状態図）の進展（まてりあ, J-STAGE）
  https://www.jstage.jst.go.jp/article/materia1962/31/5/31_5_389/_article/-char/ja/
- 名古屋大学 講義資料：第5章 化学的自由エネルギー評価法（PDF）
  https://www.material.nagoya-u.ac.jp/PFM/docs/Lecture_H19/H19_Chapter_5.pdf

## 1. ギブス自由エネルギー

合金は、複数元素が複数相に分配し、しかも温度や熱履歴で状態が変わる系である。相安定性と組織形成を一貫して扱うには、状態量のうち「T,P一定で平衡を決めるポテンシャル」が必要であり、それがギブス自由エネルギーである。

- 定義
  $$
  G = H - TS
  $$
  ここで$H$はエンタルピー、$S$はエントロピーである。

- 基本微分形（閉じた多成分系）
  $$
  dG = -S\,dT + V\,dP + \sum_i \mu_i\,dN_i
  $$
  $\mu_i$は化学ポテンシャル、$N_i$は成分iの物質量である。

合金設計で重要なのは、組成と温度の関数として相ごとのGを用意し、全体系のGが最小となる相の組合せと相分率を求めることである。相図とは、その最小化問題の解集合（条件を走査した地図）である。

## 2. 化学ポテンシャルと平衡条件：相図

### 2.1 化学ポテンシャルの定義と意味
化学ポテンシャルは、成分iを微小に加えたときのGの増分である。
$$
\mu_i = \left(\frac{\partial G}{\partial N_i}\right)_{T,P,N_{j\neq i}}
$$
多相平衡では、各相での$\mu_i$が一致することが平衡条件になる。

- 2相平衡（相$\alpha,\beta$）の一般条件
  $$
  \mu_i^{\alpha}(T,P,\{x\}) = \mu_i^{\beta}(T,P,\{x\}) \quad (\forall i)
  $$

- より実装に近い表現（全$G$最小化）
  相の物質量を$n^{(\phi)}$、相のモルギブスエネルギーを$g^{(\phi)}(T,P,\mathbf{x}^{(\phi)})$とすると、
  $$
  G_{\mathrm{total}} = \sum_{\phi} n^{(\phi)}\,g^{(\phi)}(T,P,\mathbf{x}^{(\phi)})
  $$
  を、物質収支
  $$
  \sum_{\phi} n^{(\phi)} x_i^{(\phi)} = N_i \quad (\forall i)
  $$
  の下で最小化する問題に帰着する。

### 2.2 活量と非理想性）
溶体相では非理想性が一般であり、
$$
\mu_i = \mu_i^{\circ} + RT\ln a_i,\quad a_i=\gamma_i x_i
$$
と書く。$\gamma_i$は活量係数で、相互作用が強いほど1からずれる。合金設計では、析出・偏析・溶解限などが$\gamma_i$に支配される局面が多い。

## 3. 混合自由エネルギー

相図の直観を得るには、まず混合による自由エネルギー変化$\Delta G_{\mathrm{mix}}$を押さえる。

### 3.1 理想溶体
二元A-B（Aのモル分率をxとする）で、理想混合のエントロピーは
$$
\Delta S_{\mathrm{mix}} = -R\left[x\ln x + (1-x)\ln(1-x)\right]
$$
理想溶体の混合自由エネルギーは
$$
\Delta G_{\mathrm{mix}}^{\mathrm{ideal}} = RT\left[x\ln x + (1-x)\ln(1-x)\right]
$$
である。エンタルピー項がゼロなので、混合は常に自由エネルギー的に有利である。

### 3.2 正則溶体（相互作用パラメータ$Ω$）
エンタルピー的相互作用を最小限で入れると
$$
\Delta G_{\mathrm{mix}} = RT\left[x\ln x + (1-x)\ln(1-x)\right] + \Omega x(1-x)
$$
となる。$\Omega>0$なら異種原子の混合が不利になり、ある温度以下で相分離（混和ギャップ）が生じ得る。

- スピノーダル条件（自発的分解の領域）
  $$
  \frac{\partial^2 \Delta G_{\mathrm{mix}}}{\partial x^2} < 0
  $$
  正則溶体では
  $$
  \frac{\partial^2 \Delta G_{\mathrm{mix}}}{\partial x^2}
  = \frac{RT}{x(1-x)} - 2\Omega
  $$
  であり、例えば$x=0.5$では臨界温度
  $$
  T_c = \frac{\Omega}{2R}
  $$
  が得られる。

### 3.3 共通接線（2相共存組成）
二元系のモルギブスエネルギーを$g(x)$とすると、$\alpha,\beta$の共存組成$x^{\alpha},x^{\beta}$は共通接線条件で与えられる。
$$
g'(x^{\alpha}) = g'(x^{\beta})
= \frac{g(x^{\beta})-g(x^{\alpha})}{x^{\beta}-x^{\alpha}}
$$
三元以上では共通接平面に一般化される。CALPHADが内部で行っているのは、実質的にこの幾何学条件を多相・多成分で満たす最小化である。

## 4. ギブス自由エネルギーの内訳

合金のGは、単一の「化学項」だけでは精度が足りない場合が多い。代表的には
$$
G = G_{\mathrm{ref}} + \Delta G_{\mathrm{conf}} + \Delta G_{\mathrm{ex}} + G_{\mathrm{mag}} + G_{\mathrm{ph}} + G_{\mathrm{el}} + \cdots
$$
- $G_{\mathrm{ref}}$：純物質（端成分）基準
- $\Delta G_{\mathrm{conf}}$：配置（混合）エントロピー起源（理想混合など）
- $\Delta G_{\mathrm{ex}}$：過剰ギブスエネルギー（非理想相互作用）
- $G_{\mathrm{mag}}$：磁気寄与（Fe系などで相境界を動かし得る）
- $G_{\mathrm{ph}}$：格子振動（フォノン）寄与（高温で効く）
- $G_{\mathrm{el}}$：電子励起寄与（必要な場合）

設計上は、どの寄与が相境界や析出温度を動かし、どの寄与が二次的かを見極め、モデルの複雑度と入手可能なデータを釣り合わせることが肝要である。

## 5. CALPHAD：$G(T,x)$を相ごとにモデル化し、相図へ落とす枠組み

### 5.1 コアアイデア
CALPHAD（CALculation of PHAse Diagrams）は、各相のギブスエネルギーを温度・組成の関数として表式化し、利用可能な実験値と計算値に整合するようにパラメータを最適化し、二元・三元を基盤に多元系へ外挿して相平衡を計算する方法である。出力は相図だけでなく、活量、化学ポテンシャル、比熱など、Gから導ける量全般である。

### 5.2 過剰ギブスエネルギー（Redlich-Kister型）
二元溶体相の過剰項は、例えば
$$
G^{\mathrm{ex}} = x_A x_B \sum_{n=0}^{N} L^{(n)}(T)\,(x_A-x_B)^n
$$
のように展開することが多い。$L^{(n)}(T)$を温度多項式で表し、実験相境界、熱量、活量、第一原理生成エネルギーなどを同時に満たすように決める。

### 5.3 規則相・化合物相
B2、L1_2、σ相など、サイト占有が重要な相は、単純溶体モデルでは表せない。そこで亜格子（sublattice）を導入し、サイト分率$y$でGを記述する枠組み（CEFなど）が用いられる。概念的には
$$
G^{(\phi)} = \sum_{\text{endmembers}} \left(\prod_{\text{sublattices}} y\right) G^{\circ}_{\text{endmember}}
+ RT\sum_{\text{sublattices}}\sum_{i} y_i \ln y_i
+ G^{\mathrm{int}}
$$
のように、端成分（endmember）の線形結合＋配置エントロピー＋相互作用で組む。

### 5.4 データベース（TDB）
CALPHADの成果物は、相ごとのG関数を集約したTDBファイルとして流通する。国内では、CALPHAD由来のTDBを集録したデータベースが公開されており、既存の熱力学計算ソフトと組み合わせて相図・熱力学量を算出できる。

## 6. 計算科学との統合

CALPHADは現象論モデルである一方、近年は計算側の情報を$G$に組み込みやすくなっている。合金設計の見取り図として、次の統合が頻出である。

### 6.1 第一原理計算（DFT）による 0 K エネルギーと温度効果
- 生成エンタルピー（0 K近傍）
  $$
  \Delta H_f = E_{\mathrm{alloy}} - \sum_i x_i E_i^{\mathrm{ref}}
  $$
- フォノン自由エネルギー（準調和近似など）
  $$
  F_{\mathrm{ph}}(T) = k_B T \sum_{q\nu} \ln\left[2\sinh\left(\frac{\hbar\omega_{q\nu}}{2k_B T}\right)\right]
  $$
を用いて温度依存$G$を補強するアプローチがある。多元化合物や大きな単位胞相では計算コストが課題になるが、CALPHADモデルのアンカーポイントとして価値が高い。

### 6.2 クラスター展開・モンテカルロ：統計熱力学
規則—不規則転移や短距離秩序が強い場合、配置自由エネルギーをより物理的に扱うために
- クラスター展開でエネルギーを有効ハミルトニアン化
- モンテカルロで有限温度の秩序度・比熱・相境界を推定
し、結果をCALPHADのパラメータ化へ還元する経路が有効である。

### 6.3 拡散・析出・粒界偏析
Gが整えば、駆動力は化学ポテンシャル差として得られる。例えば組成場$c(\mathbf{r})$の自由エネルギー汎関数
$$
\mathcal{F}[c] = \int \left(f(c,T) + \kappa |\nabla c|^2\right)\,dV
$$
から、拡散を駆動する化学ポテンシャルは
$$
\mu = \frac{\delta \mathcal{F}}{\delta c}
$$
で与えられる。ここで$f(c,T)$にCALPHAD由来の自由エネルギー密度を用いると、相図整合な相分離・析出の相場を再現しやすい。さらにモビリティ（拡散係数）まで含めれば、時効硬化や偏析の時間発展を予測できる。

## 7. 合金設計での比較表

| 設計課題 | 問いの形 | Gに基づく計算出力 | 得られる設計判断 |
|---|---|---|---|
| 単相固溶体を維持したい | どのT,xで相分解しないか | 相境界、スピノーダル、相分率 | 組成窓、熱処理窓、危険領域 |
| 析出強化相を狙う | どの相が析出しやすいか | 平衡相分率、駆動力、溶解限 | 時効温度、ターゲット組成 |
| 脆性相を避ける | σ相などを出さない条件 | 多相平衡計算、相安定域 | 禁止組成、温度制約 |
| 溶製・凝固の割れや偏析を抑える | 凝固経路はどうなるか | 液相線・固相線、Scheil計算 | 合金元素の上限、凝固条件 |
| 粒界偏析を制御する | どの元素がどれだけ偏析するか | 化学ポテンシャル、活量、相互作用 | 添加元素の選別、熱処理設計 |
| 高エントロピー合金の相安定性 | 単相か多相か | 多元相平衡、相分率、活量 | 単相化の方針、相制御 |

## 8. 手法の比較表

| 手法 | 強い点 | 弱い点 | 位置づけ |
|---|---|---|---|
| CALPHAD + TDB | 多元系の相平衡を高速に走査できる。G由来の量を一括で出せる | データ範囲外の外挿、未知相、準安定の扱いに注意が要る | 合金設計の地図生成エンジン |
| 第一原理（DFT） | 0 Kの相対安定性、端成分・化合物の基礎量を与える | 高温・乱れ・大単位胞で重い | モデルの基準点、未知相探索 |
| フォノン（準調和等） | 温度依存Gの補強、相境界の温度シフト | 非調和・液体近傍で難化 | 高温域の精度改善 |
| クラスター展開 + MC | 規則相、短距離秩序、臨界現象に強い | モデル構築にデータが要る | 秩序化・相転移の精密化 |
| 相場（フェーズフィールド等） | 組織の空間発展を扱える | Gと移動度の精度が支配的 | 組織設計への接続 |

## 9. 注意点

- データベースの適用範囲を超える
  合金設計では多元外挿が魅力であるが、二元・三元の根拠が薄い部分では相境界が大きく動き得る。対象系に近い評価体系（論文・TDBの由来）を確認すべきである。
- 準安定相と平衡相の混同
  実材料の時効や急冷では準安定相が支配する場合がある。平衡計算と準安定拘束計算を分けて議論すべきである。
- 磁気寄与・体積寄与の軽視
  Fe基などでは磁気寄与が相境界を動かし得る。高温ではフォノン寄与の無視が誤差要因になる。
- 不確かさの見積り不足
  相図計算は点推定になりやすい。入力データやパラメータの感度解析、複数データベースの比較が有効である。

## まとめ

ギブス自由エネルギーは、多成分・多相の平衡条件を一つの最小化問題として統一し、相図、活量、化学ポテンシャル、駆動力といった合金設計に直結する量を与える。CALPHADは相ごとのG関数をデータと整合する形で構築し、多元系の設計空間を現実的な計算コストで探索する基盤である。近年は第一原理・フォノン・統計熱力学の結果をGモデルへ接続する流れが強く、相安定性の地図と組織形成の時間発展を同じ自由エネルギー基盤で連結する設計が中心的になりつつある。

## 関連研究
- Thermo-Calc, CALPHAD Methodology
  https://thermocalc.com/about-us/methodology/the-calphad-methodology/
- Thermo-Calc（日本語解説ページ）, 理論（CALPHADとGibbsエネルギー）
  https://www.engineering-eye.com/THERMOCALC/details/theory.html
- 大沼郁雄, 計算状態図（CALPHAD）の進展と軽金属への応用（軽金属, J-STAGE）
  https://www.jstage.jst.go.jp/article/jilm/69/7/69_690703/_article/-char/ja/
- 林直宏ほか, Al-Mg-Zn 3元系状態図の熱力学的解析（日本金属学会誌, J-STAGE）
  https://www.jstage.jst.go.jp/article/jinstmet/84/5/84_JBW201905/_article/-char/ja/
- 高橋宏太ほか, Fe-Mo-B三元系状態図の熱力学的解析（鉄と鋼, J-STAGE）
  https://www.jstage.jst.go.jp/article/tetsutohagane/106/6/106_TETSU-2019-097/_article/-char/ja
- 及川勝成・上島伸文, Fe–Ni, Fe–C, Ni–C, Fe–Ni–C系の熱力学的解析（鉄と鋼, 2025, PDF）
  https://www.jstage.jst.go.jp/article/tetsutohagane/advpub/0/advpub_TETSU-2025-072/_pdf
- Ikehata et al., Grain Boundary Segregation Behavior and CALPHAD-based thermodynamic calculation (Materials Transactions, 2024)
  https://www.jstage.jst.go.jp/article/matertrans/65/5/65_MT-M2023199/_article/-char/en
- Sundman, A Review of Calphad Modeling of Ordered Phases (J. Phase Equilibria Diffusion, 2018)
  https://link.springer.com/article/10.1007/s11669-018-0671-y
- Thermo-Calc, TCHEA6 High Entropy Alloys Database Technical Information (PDF)
  https://www.engineering-eye.com/THERMOCALC/details/db/pdf/thermo-calc/2022b/TCHEA6_technical_info.pdf
- Thermodynamic Modeling by the CALPHAD Method and its Applications to Innovative Materials (PDF)
  https://calphad.com/wp-content/uploads/2025/07/Thermodynamic_Modeling_by_CALPHAD_Method.pdf
- Construction and Tuning of CALPHAD Models Using Machine Learning (arXiv, 2025)
  https://arxiv.org/abs/2508.01028
