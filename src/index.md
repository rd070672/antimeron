---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "wiki"
  text: "antimeron"
  tagline: # 国立大学<br>材料工学
  actions:
    - theme: brand
      text: Website
      link: 

    - theme: alt
      text: Github
      link: https://github.com/rd070672/antimeron

features:
  - title: 計算
    details: 第一原理計算・数値シミュレーションを軸に、理論背景から環境構築、数値解法、解析例までを紹介します。材料物性の理解とデータ駆動解析につながる計算科学の基礎をまとめます。

  - title: 実験
    details: 材料合成・熱処理・プロセス制御から、磁気計測・放射光・中性子ビームなどの先端計測までを整理します。再現性を高める手順や装置運用のコツなど、実験で役立つ知見を共有します。

  - title: データサイエンス
    details: 機械学習・統計解析・深層学習、機械学習ポテンシャルなど、データ解析に必要な基本知識や手法を扱います。材料応用の実例と実装、モデル解釈の勘所をまとめます。

---

## 最近追加した項目（2026-1）
- [Neural Entropyによる深層学習モデル評価](data/neural-entropy)
- [Industry 5.0の動向と展望](other/industry5)
- [横浜の歴史を学術的にたどる](other/yokohama)
- [横浜国立大学の歴史](other/ynu)
- [戦後日本の大学紛争と学生運動](other/student-movement)
- [国立大学法人化とその後の制度変化](other/university-corporation)
- [スピントロニクス半導体](exp/semiconductor-spintronics)
- [計算科学のための大規模数値解法](other/lecture-large-scale-computing)

## 最近追加した項目（2025-12）
- [完全磁気多極子基底とMCD/MLD総和則](exp/mcd-mld-dipole-sum-rule)
- [オシロスコープと電流プローブを用いた損失評価法](exp/osciloscope-measurement)
- [BHアナライザによる損失評価法](exp/b-h-analyzer)
- [LCRメータを用いた透磁率測定](exp/lcr-measurement)
- [VNAを用いた透磁率測定](exp/vna-measurement)
- [配位子場論](calc/ligand-field-theory)
- [線形代数とデータサイエンス](data/linear-algebra-data-science)
- [PHOTON ~Transformerの次へ~](data/photon)
- [Transformer](data/transformer)
- [密度汎関数理論と固有値問題の基礎](calc/dft-easy)
- [時間依存密度汎関数法の基礎](calc/tddft-easy)
- [第一原理分子動力学法の基礎](calc/aimd-easy)
- [熱力学計算の基礎](calc/thermodynamics-calc)
- [MCPの基礎と実装](sys/mcp-2)
- [比熱測定の原理と評価式](exp/specific-heat)
- [計算物理の歴史](calc/calc-history)
- [データサイエンスの歴史](data/data-science-history)
- [機械学習の歴史](data/machine-learning-history)
- [フェーズフィールド法の基礎と数値計算](other/lecture-phase-field)
- [材料計算学](other/lecture-computational-materials)
- [マテリアルズ・インフォマティクス](other/lecture-materials-informatics)
- [AI入門](other/lecture-ai)
- [物理学の多様な模型を解説する](other/model)
- [基礎研究と応用研究のあいだ](other/essay-base-apply)
- [材料工学の中で、物性物理を掘り下げる](other/essay-solid-state-physics)
- [理学から工学へ、工学から社会へ](other/essay-science-engineering)

## 最近追加した項目（2025-11）
- [四重極応答と磁気弾性](calc/quadrupole)
- [四重極応答理論](calc/quadrupole-theory)
- [四重極子モーメントと磁歪の統一的記述](calc/quadrupole-maelas)
- [電子論に基づく弾性定数の導出](calc/elastic-constant)
- [電子論に基づく磁気弾性定数の導出](calc/magnetoelastic-constant)
- [粘弾性モデルの基礎](calc/viscoelasticity)
- [磁壁移動の粘弾性モデル](calc/domain-wall-movement)
- [磁気円二色性（MCD）と磁気直線二色性（MLD）](exp/sr-mcd-mld)
- [X線磁気直線二色性（XMLD）](exp/sr-xmld)
- [ノイズの種類・原因・対策](exp/noise)
- [低ノイズ・高感度な電圧測定技術](exp/low-noise)
- [サンプリング理論と計測デジタル化の基本](exp/sampling-digital)
- [伝達関数とシステム同定](exp/transmission)
- [スピンを理解する](calc/spin)
- [スピンをわかりやすく理解する](calc/spin-easy)
- [良いコードとは](sys/good-code)
- [臨界現象とスケーリング則](calc/scaling)
- [金属の低温物性と近藤効果](calc/kondo-effect)
- [フェルミ液体と準粒子](calc/fermi-liquid)
- [化学ポテンシャルと自由エネルギー](calc/chemical-potential)

## 理論・計算 {#計算}
第一原理計算・数値シミュレーションを軸に、理論背景から環境構築、数値解法、解析例までを紹介します。材料物性の理解とデータ駆動解析につながる計算科学の基礎をまとめます。

### 理論
  - [物理定数と単位系](calc/physical-constants)
  - [量子力学とシュレディンガー方程式](calc/dft-basis)
  - [水素原子の量子状態を導く](calc/hydrogen-calc)
  - [水素原子の電子軌道を導く](calc/hydrogen-calc-2)
  - [ヘリウム原子の量子・電子状態を読み解く](calc/helium-calc)
  - [ヘリウム原子をDFTで解析する](calc/helium-dft)
  - [ブラケット記法の体系](calc/bra-ket)
  - [ブロッホの定理](calc/bloch)
  - [バンドアンフォールディング](calc/dft-unfolding)
  - [テトラヘドロン法とブリルアンゾーン](calc/tetrahedron)
  - [ワニエ関数と局在軌道](calc/wannier)
  - [最局在ワニエ関数と電子物性](calc/wannier-2)
  - [低次元物質の電子状態](calc/low-dimentional)
  - [配位子場論](calc/ligand-field-theory)
  - [キタエフ模型と量子状態](calc/kitaev-honeycomb-model)
  - [ベリー位相とトポロジカル応答](calc/berry)
  - [ベリー曲率に基づく異常ホール効果・異常ネルンスト効果](calc/ahe-ane-calc)
  - [応答理論入門](calc/response-theory)
  - [線形応答理論とKubo–Greenwood法](calc/kkr-kubo)
  - [摂動論の基礎と応用](calc/perturbation)
  - [金属の低温物性と近藤効果](calc/kondo-effect) 
  - [フェルミ液体と準粒子](calc/fermi-liquid)
  - [密度汎関数摂動論](calc/dfpt)
  - [グリーン関数とKKR法](calc/kkr)
  - [非平衡グリーン関数（NEGF）と量子輸送](calc/negf)
  - [ダイソン方程式と多体電子状態の記述](calc/dyson-derivation)
  - [ファインマンダイアグラム入門](calc/feynman-diagram)
  - [時間依存密度汎関数理論（TDDFT）](calc/dft-td)
  - [量子電子動力学（QED）法の原理と活用](calc/qed)
  - [虚数時間発展法（ITE）の基礎](calc/dft-imarginary)
  - [フォノン物性の基礎](calc/phonon)
  - [非調和フォノン理論と有限温度物性](calc/self-consistent-phonon)
  - [核量子効果（NQE）と量子統計](calc/nuclear-quantum-effects)
  - [格子ボルツマン法（LBM）入門](calc/lattice-boltzmann-method)
  - [カオス理論と非線形ダイナミクス](calc/chaos)
  - [量子カオス理論](calc/chaos-quantum)
  <!-- - [格子QCDシミュレーション入門](calc/quantum-dichroism) -->
  - [テンソルネットワーク入門](calc/tensor-network)
  - [量子アニーリング](calc/quantum-annealing)
  - [量子コンピュータの物理](calc/quantum-computer)
  - [量子コンピュータ開発動向と展望](calc/quantum-computer-trend)

### 磁性
  - [スピンを理解する](calc/spin)
  - [スピンをわかりやすく理解する](calc/spin-easy)
  - [局在電子系の磁性](calc/localized-electron-magnetism)
  - [遍歴電子系の磁性](calc/itinerant-electron-magnetism)
  - [遍歴電子系のストーナー条件](calc/stoner)
  - [RKKY相互作用と磁気秩序](calc/rkky)
  - [キュリー・ワイス則と平均場理論](calc/curie-weiss-law)
  - [RKKY起源スピングラスの数値モデル](calc/rkky-calc)
  - [スピン軌道相互作用と行列要素](calc/spin-orbit-coupling)
  - [四重極応答理論](calc/quadrupole)
  - [四重極子モーメントと磁歪の統一的記述](calc/quadrupole-maelas)
  - [電子論に基づく弾性定数の導出](calc/elastic-constant)
  - [電子論に基づく磁気弾性定数の導出](calc/magnetoelastic-constant)
  - [二次摂動理論にもとづく磁気ダンピングの導出](calc/perturbation-damping)
  - [二次摂動理論にもとづく磁歪定数の導出](calc/perturbation-maelas)
  - [マグノン-フォノン相互作用の計算](calc/magnon-phonon)
  - [磁気ダンピングの発生メカニズム](calc/damping-mechanism)
  - [磁気ダンピングの内因的性質](calc/damping-intrinsic)
  - [磁気ダンピング・磁歪・鉄損の関係性](calc/damping-maelas-loss)

### 第一原理計算
  - [密度汎関数理論（DFT）の基礎](calc/dft)
  - [第一原理計算の基本原理](calc/ab-calc)
  - [第一原理計算を支える数値解法](calc/dft-calc)
  - [第一原理計算ソフトウェアと特徴](calc/dft-software)
  - [VASPによる第一原理計算](calc/vasp-dft)
  - [仮想結晶近似とコヒーレントポテンシャル近似](calc/vca-cpa)
  - [VASPKITによる前処理・後処理](calc/vaspkit)
  - [Phonopy によるフォノン計算](calc/phonopy)
  - [MAELAS による磁気弾性効果の計算](calc/maelas)
  - [Bader電荷解析](calc/bader-charge-analysis)
  - [Wien2k の計算例](calc/wien2k)
  - [AkaiKKRによる不規則系電子状態計算](calc/akaikkr)
  - [SPR-KKRによる磁性計算](calc/sprkkr)
  - [Ju-KKRによる局所電子状態計算](calc/jukkr)
  - [AiiDA-KKRを活用したハイスループット計算](calc/aiida-kkr)
  - [TOMBOによる全電子混合基底法](calc/tombo)
  - [第一原理計算に基づくフェーズフィールド計算](calc/dft-pf)
  - [VASP計算による磁気ダンピング定数](calc/damping-vasp)
  - [KKR計算による磁気ダンピング定数](calc/damping-kkr)

### 第一原理分子動力学計算
- [第一原理分子動力学（AIMD）の原理](calc/aimd)
- [AIMDによるアモルファス設計](calc/aimd-amorphous)
- [アモルファスの距離秩序と物理](calc/amorphous)
- [アモルファスの構造解析と局所物性](calc/amorphous-analysis)
- [アモルファスにおける局所磁気モーメント](calc/amorphous-moment)
- [アモルファス固体の力学](calc/amorphous-solid)

### 熱力学計算
- [CALPHAD法（計算熱力学）による状態図・相平衡予測](calc/calphad)
- [平衡状態図の読み方](calc/phase-diagram)
- [臨界現象とスケーリング則](calc/scaling)
- [ランダウ理論と自由エネルギー](calc/landau)
- [Ginzburg–Landau理論による相転移と空間秩序の記述](calc/landau-gl-theory)
- [Wang–Landau法と電子状態](calc/wang-landau)
- [化学ポテンシャルと自由エネルギー](calc/chemical-potential)
- [ギブス自由エネルギーに基づく合金設計](calc/gibbs-alloy)

### 分子動力学計算
- [分子動力学計算（MD）の原理](calc/md)
- [MD の数値解法](calc/md-calc)
- [MD 計算における原子間ポテンシャル選定](calc/md-potential)
- [MD 計算と機械学習](calc/md-machine-learning)
- [LAMMPS による MD 計算](calc/md-lammps)
- [ASE・JAX による MD 計算](calc/md-ase-jax)
- [HOOMD-blue入門](calc/hoomd-blue)

### モンテカルロ計算
- [モンテカルロ法の基礎](calc/mc)
- [モンテカルロ法の数値解法](calc/mc-calc)
- [密度行列繰り込み群法](calc/density-matrix)
- [クラスター展開モデル](calc/mc-cluster)
- [原子論的スピンモデル](calc/atomic-spin-model)
- [マルコフ連鎖モンテカルロ（MCMC）法](calc/mcmc)
- [リバースモンテカルロ (RMC) 法](calc/mc-reverse)
- [キネティックモンテカルロ（KMC）法](calc/mc-kinetic)
- [量子モンテカルロ（QMC）法](calc/mc-quantum)
- [グランドカノニカルモンテカルロ（GCMC）法](calc/mc-grand-canonical)
- [レプリカ交換モンテカルロ（REMC）法](calc/mc-replica)
- [REMC 法によるスピングラス解析](calc/spin-glass-remc)
- [スピングラスの物理と応用](calc/spin-glass-phys)
- [計算科学で読み解くスピングラス](calc/spin-glass-calc)
- [アモルファス磁性におけるスピングラス](calc/spin-glass-amorphous)
- [量子スピングラス](calc/spin-glass-quantum)

### フェーズフィールド計算
- [フェーズフィールド計算の原理](calc/pf)
- [フェーズフィールド法の数値解法](calc/pf-calc)
- [Allen–Cahn 法で記述する金属組織シミュレーション](calc/pf-allen-cahn)
- [デンドライト成長のPFシミュレーション](calc/dendrite)
- [Cahn–Hilliard 方程式で記述する金属組織シミュレーション](calc/pf-cahn-hilliard)
- [フェーズフィールドクリスタル（PFC）法の基礎と応用](calc/phase-field-crystal)

### マルチフィジックス計算
- [有限差分法の原理と数値解法](calc/fdm)
- [有限要素法の原理](calc/fem)
- [有限要素法の数値解法](calc/fem-calc)
- [離散化とスケーラブル解法](calc/scalable)
- [ガウス・ザイデル法](calc/fem-gauss-seidel)
- [ヤコビ法と並列計算](calc/fem-jacobi)
- [常微分方程式 (ODE)と偏微分方程式 (PDE) の基礎](calc/ode-pde)
- [ボロノイ分割法](calc/volonoi)
- [LLG方程式に基づくマイクロ磁化シミュレーション](calc/llg)
- [反磁界（長距離相互作用）の数値解法](calc/demag-calc)
- [マクスウェル方程式に基づく電磁界解析](calc/maxwell)
- [マクスウェル方程式の導出と物質応答](calc/maxwell-derivation)
- [動く磁壁が誘起する局所渦電流](calc/eddy-current)
- [磁壁運動を起点とする電磁誘導と散逸の理論](calc/eddy-current-damping)
- [弾塑性構成モデルの基本方程式](calc/elasto-plasticity)
- [磁気弾性効果の定式化](calc/magneto-elasticity)
  - [立方晶 (cubic I) 磁性体の弾性・磁気弾性定数](calc/maelas-cubic)
  - [六方晶 (Hexagonal I) 磁性体の弾性・磁気弾性定数](calc/maelas-hexagonal)
  - [正方晶 (Tetragonal I) 磁性体の弾性・磁気弾性定数](calc/maelas-tetragonal)
- [FEniCSによる変分形式ベース有限要素解析](calc/fenics)
- [mumax による LLG マイクロ磁化・磁気弾性シミュレーション](calc/mumax3-llg)
- [COMSOL を用いた LLG 計算と連成解析](calc/comsol-llg)
<!-- - [有限要素法によるマイクロマグ計算の自作コード](calc/fem-llg)
- [3次元線形弾性のHex8有限要素ソルバ](calc/fem-solver)
- [磁気弾性連成（磁歪）のFEM弾性ソルバへ](calc/fem-maelas) -->

## 実験 {#実験}
材料合成・熱処理・プロセス制御から、磁気計測・放射光・中性子ビームなどの先端計測までを整理します。再現性を高める手順や装置運用のコツなど、実験で役立つ知見を共有します。

### 材料合成
- [物理蒸着法（PVD）による薄膜形成の基礎](exp/pvd)
- [化学気相成長法（CVD）による薄膜形成の基礎](exp/cvd)

### 熱処理・試料加工
- [赤外線ランプ炉](exp/rapid-annealing)
- [フォトリソグラフィの化学](exp/photo-lithography)
- [マスクレス露光装置の物理](exp/maskless-lithography)
- [鏡面研磨のノウハウ](exp/millor-polishing)

### 磁気物性
- [軟磁性体の物理](exp/softmag-phys)
- [軟磁性体の高周波特性評価](exp/softmag-rf)
- [振動試料型磁力計（VSM）による磁化測定の基礎](exp/vsm)
- [磁気特性測定システム（MPMS）とSQUID磁力計の基礎](exp/mpms)
- [磁気光学カー効果顕微鏡（MOKE）による磁区構造・磁化ダイナミクス観察入門](exp/moke)
- [オシロスコープと電流プローブを用いた損失評価法](exp/osciloscope-measurement)
- [BHアナライザによる損失評価法](exp/b-h-analyzer)
- [LCRメータを用いた透磁率測定](exp/lcr-measurement)
- [VNAを用いた透磁率測定](exp/vna-measurement)
- [パワーエレクトロニクス用受動素子](exp/power-electronics-mag)
- [パワーエレクトロニクス用半導体デバイス](exp/power-electronics-semicon)

### 計測工学
- [高周波計測技術](exp/softmag-rf-phys)
- [信号アナライザーの測定原理](exp/softmag-rf-measurement)
- [ノイズの種類・原因・対策](exp/noise)
- [低ノイズ・高感度な電圧測定技術](exp/low-noise)
- [サンプリング理論と計測デジタル化の基本](exp/sampling-digital)
- [伝達関数とシステム同定](exp/transmission)
- [プリアンプの物理と基礎](exp/pre-amp)

### 構造・化学状態解析
- [X線回折装置 (XRD)の基礎](exp/xrd)
- [リードベルド解析](exp/xrd-rietveld)
- [X線光電子分光法 (XPS)](exp/xps)
- [電子後方散乱回折 (EBSD)](exp/ebsd)
- [透過型電子顕微鏡（TEM）](exp/tem)
- [5D-STEMの基礎](exp/5d-stem)
- [電子線ホログラフィーの基礎](exp/electron-holography)

### 汎用機器・治具設計
- [電磁界シールドの基礎](exp/mag-shield)
- [3Dプリンターと造形技術](exp/3d-printer)

### 放射光計測
#### 基礎
- [シンクロトロン放射の基礎](exp/sr)
- [ビームラインの光学設計](exp/sr-optics)
- [フェルミの黄金律](exp/fermi-golden-rule)
- [放射光による構造解析](exp/sr-structure)
- [放射光によるダイナミクス解析](exp/sr-dynamics)
- [アモルファスの構造・物性解析](exp/sr-amorphous)
- [クレプシュ・ゴルダン係数と選択則](exp/clebsch-gordan)
- [磁気円二色性（MCD）と磁気直線二色性（MLD）](exp/sr-mcd-mld)
- [完全磁気多極子基底とMCD/MLD総和則](exp/mcd-mld-dipole-sum-rule)

#### 各手法の原理
- [X線吸収微細構造（XAFS）](exp/sr-xafs)
- [X線発光分光（XES）](exp/sr-xes)
- [X線異常散乱（AXS）](exp/sr-axs)
- [光電子ホログラフィー（PEH）](exp/sr-peh)
- [小角X線散乱（SAXS）](exp/sr-saxs)
- [硬X線光電子分光（HAXPES）](exp/sr-haxpes)
- [共鳴軟Ｘ線非弾性散乱分光（RIXS）](exp/sr-rixs)
- [コヒーレント回折イメージング（CDI）](exp/sr-cdi)
- [X線磁気円二色性（XMCD）](exp/sr-xmcd)
- [X線磁気直線二色性（XMLD）](exp/sr-xmld)
- [光電子顕微鏡（PEEM）](exp/sr-peem)
- [スピン・角度分解光電子分光（SARPES）](exp/sr-sarpes)
- [X線自由電子レーザー（XFEL）](exp/sr-xfel)

#### 試料準備
- [表面洗浄のためのイオンミリング](exp/ion-milling-bl25su)

### 中性子散乱
- [中性子ビームの基本](exp/neutron)
- [中性子回折・小角中性子散乱の基礎と応用](exp/neutron-diff-scat)
- [中性子散乱による磁気秩序解析](exp/neutron-mag)


## データサイエンス {#データサイエンス}
機械学習・統計解析・深層学習、機械学習ポテンシャルなど、データ解析に必要な基本知識や手法を扱います。材料応用の実例と実装、モデル解釈の勘所をまとめます。

### 機械学習のための数理・統計・情報
- [線形代数入門](data/basis-linear-algebra)
- [線形代数とデータサイエンス](data/linear-algebra-data-science)
- [微積分入門](data/basis-calculus)
- [ベクトル解析入門](data/basis-vector-analysis)
- [複素解析入門](data/basis-complex-analysis)
- [多変量解析入門](data/basis-multivariate-analysis)
- [確率・統計入門](data/basis-propability)
- [最適化入門](data/basis-optimization)
- [情報理論入門](data/basis-information-theory)

### 特徴量エンジニアリング
- [時系列解析](data/temporal)
- [スペクトル解析](data/spectral)
- [直積・アダマール積](data/product)
- [パーシステントホモロジーと位相的データ解析](data/persistent)

### 材料データベース
- [Materials Project（材料データベース）](data/db-materials-project)
- [Open Quantum Materials Database (OQMD)](data/db-oqmd)

### マテリアルズ・インフォマティクス
- [AI for Science（AI4S）](data/info-ai4science)
- [マテリアルズ・インフォマティクスの動向と将来展望](data/info)
- [材料インフォマティクス](data/info-materials)
- [計測インフォマティクス](data/info-measure)
- [プロセスインフォマティクス](data/info-process)
- [物理インフォマティクスとPINNs](data/info-physics)

### 教師あり学習（予測・分類）
- [決定木アンサンブル学習](data/decision-tree)
- [勾配ブースティング決定木](data/boosting)
- [サポートベクターマシン](data/svm)
- [k近傍法](data/k-nn)
- [半教師あり学習](data/semi-learning)

### 次元削減手法・可視化
- [線形次元削減（PCAなど）](data/dr-linear)
- [非線形次元削減（U-MAPなど）](data/dr-nonlinear)
- [確率モデル・ベイズ推論による次元削減](data/dr-probabilistic-bayse)
- [深層学習ベースの次元削減 (VAEなど)](data/dr-deep-learning)

### 深層学習フレームワーク
- [パーセプトロン](data/perceptron)
- [ニューラルネットワーク（NN）](data/nn)
- [畳み込みニューラルネットワーク（CNN）](data/cnn)
- [時間畳み込みネットワーク（TCN）](data/tcn)
- [リカレントニューラルネットワーク（RNN）](data/rnn)
- [ゲート付きRNNとしてのLSTMとGRU](data/rnn-lstm-gru)
- [グラフニューラルネットワーク（GNN）](data/gnn)

### 説明可能 AI (XAI)
- [特徴量重要度・寄与分解 (SHAP, LIMEなど)](data/importance)
- [アテンション機構と解釈性](data/attention)
- [Grad-CAMと局所的説明](data/gradcam)
- [シンボリック回帰](data/symbolic)

### 生成 AI 
- [GANとDiffusionモデル](data/gan-diffusion)
- [変分オートエンコーダー(VAE)](data/vae)
- [Transformer](data/transformer)
- [PHOTON](data/photon)
- [材料科学分野におけるLLM](data/llm-mat)
- [ファインマンLLM](data/llm-feynman)

### 最適化手法
- [実験計画法(DOE)](data/doe)
- [ベイズ最適化(BO)](data/bo)
- [アクティブラーニングと能動学習](data/active-learning)
- [遺伝的アルゴリズム(GA)](data/genetic-algorithm)

### 機械学習ポテンシャル
- [機械学習ポテンシャルの基礎](data/ml-potential)
- [機械学習ポテンシャルのファインチューニング](data/fine-tuning)
- [汎用機械学習ポテンシャル](data/ml-potential-all)

### モデリング
- [自由エネルギー原理と情報理論](data/free-energy-principle)
- [サロゲートモデル](data/surrogate)
- [リザバーコンピューティング](data/reservoir)
- [物理リザバー](data/reservoir-physical)
- [逆設計モデル](data/inverse-design)
- [入れ子学習](data/nested-learning)


## 情報基盤
研究室の計算・解析環境を支える情報システムでは、プログラミング技術、スパコン利用、ライセンス・ホームページ管理など、研究活動を円滑に進めるための基盤技術を扱います。効率的で再現性の高い研究を実現するための運用ノウハウを体系的にまとめています。

### データ解析環境
- [研究・開発のためのデータ解析環境設計](sys/data-analysis)
- [Web開発でMCPを活かすための基礎](sys/mcp)
- [エッジコンピューティング](sys/edge-computing)

### プログラミング(Python)
- [良いコードとは](sys/good-code)
- [For文の高速化](sys/python-for)

### スーパーコンピュータの利用
- [東北大金研Masamune-II](sys/masamune)

### サーバー・HPC管理
- [Linux基礎体系](sys/linux)
- [数値計算のためのCPU・GPU・TPU入門](sys/cpu-gpu-tpu)
- [NASによるデータ管理設計](sys/nas)
- [所有ワクステ (SHIMA/TANI/MORI/MBN)](sys/workstations)
- [購入後の初期設定](sys/setup)

### ホームページの管理
- [研究室サイトをGitHub Pagesで立ち上げる](sys/website)
- [VitePressを用いた研究室Wikiの整備](sys/website-wiki)
- [GA4とGTMによるアクセス解析の基礎](sys/access-analysis)

## 周期表
|Period|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|
|---:|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|1|[H](elem/1-h)|||||||||||||||||[He](elem/2-he)|
|2|[Li](elem/3-li)|Be|||||||||||[B](elem/5-b)|[C](elem/6-c)|[N](elem/7-n)|[O](elem/8-o)|F|Ne|
|3|Na|Mg|||||||||||[Al](elem/13-al)|[Si](elem/14-si)|[P](elem/15-p)|S|Cl|[Ar](elem/18-ar)|
|4|K|Ca|Sc|[Ti](elem/22-ti)|V|[Cr](elem/24-cr)|[Mn](elem/25-mn)|[Fe](elem/26-fe)|[Co](elem/27-co)|[Ni](elem/28-ni)|[Cu](elem/29-cu)|[Zn](elem/30-zn)|[Ga](elem/31-ga)|[Ge](elem/32-ge)|[As](elem/33-as)|[Se](elem/34-se)|Br|Kr|
|5|Rb|Sr|Y|[Zr](elem/40-zr)|[Nb](elem/41-nb)|[Mo](elem/42-mo)|Tc|Ru|Rh|[Pd](elem/46-pd)|[Ag](elem/47-ag)|Cd|In|Sn|[Sb](elem/51-sb)|[Te](elem/52-te)|I|Xe|
|6|Cs|Ba|La*|Hf|[Ta](elem/73-ta)|W|Re|Os|[Ir](elem/77-ir)|[Pt](elem/78-pt)|[Au](elem/79-au)|Hg|Tl|[Pb](elem/82-pb)|Bi|Po|At|Rn|
|7|Fr|Ra|Ac*|Rf|Db|Sg|Bh|Hs|Mt|Ds|Rg|Cn|Nh|Fl|Mc|Lv|Ts|Og|

ランタノイド/アクチノイド
|||Series|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|
|---|---|---:|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|||Lanthanides|La|[Ce](elem/58-ce)|Pr|[Nd](elem/60-nd)|Pm|[Sm](elem/62-sm)|Eu|[Gd](elem/64-gd)|[Tb](elem/65-tb)|[Dy](elem/66-dy)|Ho|[Er](elem/68-er)|Tm|Yb|Lu|
|||Actinides|Ac|Th|Pa|U|Np|Pu|Am|Cm|Bk|Cf|Es|Fm|Md|No|Lr|

## その他
### 初歩
- [線形代数の初歩](other/enter-algebra)
- [微積分の初歩](other/enter-calculus)
- [ベクトル解析の初歩](other/enter-vector)
- [物理数学の初歩](other/enter-physics-math)
- [電磁気学の初歩](other/enter-electrodynamics)
- [量子力学の初歩](other/enter-quantum)
- [統計物理学の初歩](other/enter-statistical-physics)
- [固体物理学の初歩](other/enter-solid-state-physics)
- [電子回路の初歩](other/enter-electronic-circuit)
- [放射光科学の初歩](other/enter-synchrotron)
- [プログラミングの初歩](other/enter-programming)
- [HPCの初歩](other/enter-hpc)
- [数値解法の初歩](other/enter-numerical-method)
- [データサイエンスの初歩](other/enter-data-science)

### 教科書
- [Kittel - 固体物理学入門](other/kittel-solid-state)
- [Bishop - パターン認識と機械学習](other/bishop-prml)
- [Bishop - 深層学習](other/bishop-deep-learning)

### 未解決問題
- [ミレニアム懸賞問題](other/problems-math)
- [数学-2025](other/problems-math-2025)
- [物理学-2025](other/problems-physics-2025)
- [化学-2025](other/problems-chemistry-2025)
- [材料科学-2025](other/problems-materials-2025)
### ノーベル賞
- [物理学賞2025-巨視的量子トンネル](other/nobel2025-phys)
- [化学賞2025-金属有機構造体（MOF）](other/nobel2025-chem)
- [物理学賞2024-人工ニューラルネットワーク](other/nobel2024-phys)
- [化学賞2024-タンパク質設計と構造予測](other/nobel2024-chem)


<!-- ## ラボ運営 {#ラボ運営}
研究室運営に必要な体制づくり、安全管理、研究活動の進め方、設備立ち上げの要点をまとめています。日常運用から学生支援、装置管理まで、研究が円滑に進むための基本を整理しています。

#### 研究設備
- [ポスター用プリンター](lab/poster-printer)
- [ルーター](lab/rooter) -->

<!-- 
### 研究室運営
- 研究室の運営方針・指針
- 年間スケジュール
- ミーティング運用
- 研究計画書の作成
- 学会カレンダー
- 奨学金
- 留学支援
- 博士進学のすゝめ

### 研究活動
- そもそも研究活動とは？
- 学部・修士・博士における研究活動
- 文献調査の方法
- 論文紹介
- 輪講
- 研究会・学会への参加
- スライド資料の作成
- ポスター資料の作成
- プレゼンテーションの注意点
- 論文執筆

### 共用機器・安全管理・保守点検
- 研究データ・ドキュメント管理
- 予約システム（共用機器）の利用
- 高電圧機器の取り扱い
- 真空装置
- ガスボンベ（Ar, N2, O2など）
- 化学薬品・廃液管理
- 停電対策チェックリスト
- ラボ清掃
- 備品・消耗品の管理

### 立ち上げ期メモ
- 備品・機器類の引っ越し
- 電源容量の確認
- 最大積載荷重の確認
- サーバールームの構築
- クリーンベンチ・実験机
- Wi-Fiのセットアップ
- 机・椅子の新調
- 家電類の整備 -->
