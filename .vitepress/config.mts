import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({

  base: '/antimeron/',
  srcDir: 'src',
  title: "antimeron.wiki",
  description: "antimeronの研究取り組みからの知見や経験をwikiとして共有します",
    
  lastUpdated: {text: 'Last updated', formatOptions: {dateStyle: 'short', timeStyle: 'medium'}},

  cleanUrls: true,
  markdown: {
    math: true,
  },

  head: [
    
    ['script', {}, `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-M4Z2H3LQ');`
    ],

    ["link", { rel: "icon", href: "https://rd070672.github.io/antimeron/images/favicon.png" }],
    ['link', { 
      rel: 'stylesheet', 
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css'
    }],

    ["meta", { property: "og:image", content: "https://rd070672.github.io/antimeron/images/top.jpg" }],
    ["meta", { property: "og:site_name", content: "antimeron" }],
    ["meta", { property: "twitter:card", content: "summary" }],
    ["meta", { property: "twitter:site", content: "@antimeron"}],
    ["meta", { property: "twitter:title", content: "antimeron"}],
    ["meta", { property: "twitter:description", content: "antimeronの研究取り組みからの知見や経験をwikiとして共有します"}],
    ["meta", { property: "twitter:image", content: "https://rd070672.github.io/antimeron/images/top.jpg" }]
  ],

  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    // search: {
    //   provider: 'local'
    // },
    search: { provider: 'local' },

    returnToTopLabel: 'Return to top',

    // editLink: {
    //   pattern: 'https://github.com/rd070672/antimeron/edit/main/src/:path',
    //   text: 'Edit this page on GitHub'
    // },

    nav: [
      { text: 'ホーム', link: '/' },
      { text: '計算', link: '/#計算' },
      { text: '実験', link: '/#実験' },
      { text: 'データサイエンス', link: '/#データサイエンス'},
      { text: '情報基盤', link: '/#情報基盤'},
      { text: '周期表', link: '/#周期表'},
      { text: 'その他', items: [
        { text: 'About', link: '/about' },
        { text: 'Changelog', link: '/changelog' },
        { text: 'Website', link: '/#' },
        { text: 'Github', link: 'https://github.com/rd070672/antimeron' },
      ]},
    ],

    sidebar: [
      { text: '計算', collapsed: false, items: [
        { text: '第一原理計算', collapsed: false, items: [
          { text: '物理定数と単位系', link: '/calc/physical-constants' },
          { text: '量子力学とシュレディンガー方程式', link: '/calc/dft-basis' },
          { text: '水素原子の量子状態を導く', link: '/calc/hydrogen-calc' },
          { text: '水素原子の電子軌道を導く', link: '/calc/hydrogen-calc-2' },
          { text: 'ヘリウム原子の量子・電子状態を読み解く', link: '/calc/helium-calc' },
          { text: 'ヘリウム原子をDFTで解析する', link: '/calc/helium-dft' },
          { text: 'ブラケット記法の体系', link: '/calc/bra-ket' },
          { text: 'ブロッホの定理', link: '/calc/bloch' },
          { text: 'バンドアンフォールディング', link: '/calc/dft-unfolding' },
          { text: 'テトラヘドロン法とブリルアンゾーン', link: '/calc/tetrahedron' },
          { text: 'ワニエ関数と局在軌道', link: '/calc/wannier' },
          { text: '最局在ワニエ関数と電子物性', link: '/calc/wannier-2' },
          { text: '低次元物質の電子状態', link: '/calc/low-dimentional' },
          { text: 'キタエフ模型と量子状態', link: '/calc/kitaev-honeycomb-model' },
          { text: 'ベリー位相とトポロジカル応答', link: '/calc/berry' },
          { text: 'ベリー曲率に基づく異常ホール効果・異常ネルンスト効果', link: '/calc/ahe-ane-calc' },
          { text: '応答理論入門', link: '/calc/response-theory' },
          { text: '線形応答理論とKubo–Greenwood法', link: '/calc/kkr-kubo' },
          { text: '摂動論の基礎と応用', link: '/calc/perturbation' },
          { text: '密度汎関数摂動論', link: '/calc/dfpt' },
          { text: '二次摂動理論にもとづく磁気ダンピングの導出', link: '/calc/perturbation-damping' },
          { text: '二次摂動理論にもとづく磁歪定数の導出', link: '/calc/perturbation-maelas' },
          { text: 'グリーン関数とKKR法', link: '/calc/kkr' },
          { text: '非平衡グリーン関数（NEGF）と量子輸送', link: '/calc/negf' },
          { text: 'ダイソン方程式と多体電子状態の記述', link: '/calc/dyson-derivation' },
          { text: 'ファインマンダイアグラム入門', link: '/calc/feynman-diagram' },
          { text: '時間依存密度汎関数理論（TDDFT）', link: '/calc/dft-td' },
          { text: '量子電子動力学（QED）法の原理と活用', link: '/calc/qed' },
          { text: '虚数時間発展法（ITE）の基礎', link: '/calc/dft-imarginary' },
          { text: 'フォノン物性の基礎', link: '/calc/phonon' },
          { text: '非調和フォノン理論と有限温度物性', link: '/calc/self-consistent-phonon' },
          { text: '核量子効果（NQE）と量子統計', link: '/calc/nuclear-quantum-effects' },
          { text: '格子ボルツマン法（LBM）入門', link: '/calc/lattice-boltzmann-method' },
          { text: 'カオス理論と非線形ダイナミクス', link: '/calc/chaos' },
          { text: '量子カオス理論', link: '/calc/chaos-quantum' },
          // { text: '格子QCDシミュレーション入門', link: '/calc/quantum-dichroism' },
          { text: 'テンソルネットワーク入門', link: '/calc/tensor-network' },
          { text: '量子アニーリング', link: '/calc/quantum-annealing' },
          { text: '量子コンピュータの物理', link: '/calc/quantum-computer' },
          { text: '量子コンピュータ開発動向と展望', link: '/calc/quantum-computer-trend' },
          { text: '局在電子系の磁性', link: '/calc/localized-electron-magnetism' },
          { text: '遍歴電子系の磁性', link: '/calc/itinerant-electron-magnetism' },
          { text: '遍歴電子系のストーナー条件', link: '/calc/stoner' },
          { text: 'RKKY相互作用と磁気秩序', link: '/calc/rkky' },
          { text: 'キュリー・ワイス則と平均場理論', link: '/calc/curie-weiss-law' },
          { text: 'RKKY起源スピングラスの数値モデル', link: '/calc/rkky-calc' },
          { text: 'スピン軌道相互作用と行列要素', link: '/calc/spin-orbit-coupling' },
          { text: 'マグノン-フォノン相互作用の計算', link: '/calc/magnon-phonon' },
          { text: '磁気ダンピングの発生メカニズム', link: '/calc/damping-mechanism' },
          { text: '磁気ダンピングの内因的性質', link: '/calc/damping-intrinsic' },
        
          { text: '密度汎関数理論（DFT）の基礎', link: '/calc/dft' },
          { text: '第一原理計算の基本原理', link: '/calc/ab-calc' },
          { text: '第一原理計算を支える数値解法', link: '/calc/dft-calc' },
          { text: '第一原理計算ソフトウェアと特徴', link: '/calc/dft-software' },
          { text: 'VASPによる第一原理計算', link: '/calc/vasp-dft' },
          { text: '仮想結晶近似とコヒーレントポテンシャル近似', link: '/calc/vca-cpa' },
          { text: 'VASPKITによる前処理・後処理', link: '/calc/vaspkit' },
          { text: 'Phonopy によるフォノン計算', link: '/calc/phonopy' },
          { text: 'MAELAS による磁気弾性効果の計算', link: '/calc/maelas' },
          { text: 'Bader電荷解析', link: '/calc/bader-charge-analysis' },
          { text: 'Wien2k の計算例', link: '/calc/wien2k' },
          { text: 'AkaiKKRによる不規則系電子状態計算', link: '/calc/akaikkr' },
          { text: 'SPR-KKRによる磁性計算', link: '/calc/sprkkr' },
          { text: 'Ju-KKRによる局所電子状態計算', link: '/calc/jukkr' },
          { text: 'AiiDA-KKRを活用したハイスループット計算', link: '/calc/aiida-kkr' },
          { text: 'TOMBOによる全電子混合基底法', link: '/calc/tombo' },
          { text: '第一原理計算に基づくフェーズフィールド計算', link: '/calc/dft-pf' },
          { text: 'VASP計算による磁気ダンピング定数', link: '/calc/damping-vasp' },
          { text: 'KKR計算による磁気ダンピング定数', link: '/calc/damping-kkr' },
        ]},

        { text: '第一原理分子動力学計算', collapsed: true, items: [
          { text: '第一原理分子動力学（AIMD）の原理', link: '/calc/aimd' },
          { text: 'AIMDによるアモルファス設計', link: '/calc/aimd-amorphous' },
          { text: 'アモルファスの距離秩序と物理', link: '/calc/amorphous' },
          { text: 'アモルファスの構造解析と局所物性', link: '/calc/amorphous-analysis' },
          { text: 'アモルファスにおける局所磁気モーメント', link: '/calc/amorphous-moment' },
          { text: 'アモルファス固体の力学', link: '/calc/amorphous-solid' },
        ]},


        { text: '熱力学計算', collapsed: true, items: [
          { text: 'CALPHAD法（計算熱力学）による状態図・相平衡予測', link: '/calc/calphad' },
          { text: '平衡状態図の読み方', link: '/calc/phase-diagram' },
          { text: 'ランダウ理論と自由エネルギー', link: '/calc/landau' },
          { text: 'Ginzburg–Landau理論による相転移と空間秩序の記述', link: '/calc/landau-gl-theory' },
          { text: 'Wang–Landau法と電子状態', link: '/calc/wang-landau' },
          { text: 'ギブス自由エネルギーに基づく合金設計', link: '/calc/gibbs-alloy' },
        ]},

        { text: '分子動力学計算', collapsed: true, items: [
          { text: '分子動力学計算（MD）の原理', link: '/calc/md' },
          { text: 'MD の数値解法', link: '/calc/md-calc' },
          { text: 'MD 計算における原子間ポテンシャル選定', link: '/calc/md-potential' },
          { text: 'MD 計算と機械学習', link: '/calc/md-machine-learning' },
          { text: 'LAMMPS による MD 計算', link: '/calc/md-lammps' },
          { text: 'ASE・JAX による MD 計算', link: '/calc/md-ase-jax' },
          { text: 'AHOOMD-blue入門', link: '/calc/homjax' },
        ]},

        { text: 'モンテカルロ計算', collapsed: true, items: [
          { text: 'モンテカルロ法の基礎', link: '/calc/mc' },
          { text: 'モンテカルロ法の数値解法', link: '/calc/mc-calc' },
          { text: '密度行列繰り込み群法', link: '/calc/density-matrix' },
          { text: 'クラスター展開モデル', link: '/calc/mc-cluster' },
          { text: '原子論的スピンモデル', link: '/calc/atomic-spin-model' },
          { text: 'マルコフ連鎖モンテカルロ（MCMC）法', link: '/calc/mcmc' },
          { text: 'リバースモンテカルロ (RMC) 法', link: '/calc/mc-reverse' },
          { text: 'キネティックモンテカルロ（KMC）法', link: '/calc/mc-kinetic' },
          { text: '量子モンテカルロ（QMC）法', link: '/calc/mc-quantum' },
          { text: 'グランドカノニカルモンテカルロ（GCMC）法', link: '/calc/mc-grand-canonical' },
          { text: 'レプリカ交換モンテカルロ（REMC）法', link: '/calc/mc-replica' },
          { text: 'REMC 法によるスピングラス解析', link: '/calc/spin-glass-remc' },
          { text: 'スピングラスの物理と応用', link: '/calc/spin-glass-phys' },
          { text: '計算科学で読み解くスピングラス', link: '/calc/spin-glass-calc' },
          { text: 'アモルファス磁性におけるスピングラス', link: '/calc/spin-glass-amorphous' },
          { text: '量子スピングラス', link: '/calc/spin-glass-quantum' },
        ]},

        { text: 'フェーズフィールド計算', collapsed: true, items: [
          { text: 'フェーズフィールド計算の原理', link: '/calc/pf' },
          { text: 'フェーズフィールド法の数値解法', link: '/calc/pf-calc' },
          { text: 'Allen–Cahn 法で記述する金属組織シミュレーション', link: '/calc/pf-allen-cahn' },
          { text: 'デンドライト成長のPFシミュレーション', link: '/calc/dendrite' },
          { text: 'Cahn–\0Hilliard 方程式で記述する金属組織シミュレーション', link: '/calc/pf-cahn-hilliard' },
          { text: 'フェーズフィールドクリスタル（PFC）法の基礎と応用', link: '/calc/phase-field-crystal' },
        ]},

        { text: 'マルチフィジックス計算', collapsed: true, items: [
          { text: '有限差分法の原理と数値解法', link: '/calc/fdm' },
          { text: '有限要素法の原理', link: '/calc/fem' },
          { text: '有限要素法の数値解法', link: '/calc/fem-calc' },
          { text: '離散化とスケーラブル解法', link: '/calc/scalable' },
          { text: 'ガウス・ザイデル法', link: '/calc/fem-gauss-seidel' },
          { text: 'ヤコビ法と並列計算', link: '/calc/fem-jacobi' },
          { text: '常微分方程式 (ODE)と偏微分方程式 (PDE) の基礎', link: '/calc/ode-pde' },
          { text: 'ボロノイ分割法', link: '/calc/volonoi' },
          { text: 'LLG方程式に基づくマイクロ磁化シミュレーション', link: '/calc/llg' },
          { text: '反磁界（長距離相互作用）の数値解法', link: '/calc/demag-calc' },
          { text: 'マクスウェル方程式に基づく電磁界解析', link: '/calc/maxwell' },
          { text: 'マクスウェル方程式の導出と物質応答', link: '/calc/maxwell-derivation' },
          { text: '動く磁壁が誘起する局所渦電流', link: '/calc/eddy-current' },
          { text: '磁壁運動を起点とする電磁誘導と散逸の理論', link: '/calc/eddy-current-damping' },
          { text: '弾塑性構成モデルの基本方程式', link: '/calc/elasto-plasticity' },
          { text: '磁気弾性効果の定式化', link: '/calc/magneto-elasticity' },
          { text: '立方晶 (cubic I) 磁性体の弾性・磁気弾性定数', link: '/calc/maelas-cubic' },
          { text: '六方晶 (Hexagonal I) 磁性体の弾性・磁気弾性定数', link: '/calc/maelas-hexagonal' },
          { text: '正方晶 (Tetragonal I) 磁性体の弾性・磁気弾性定数', link: '/calc/maelas-tetragonal' },
          { text: 'FEniCSによる変分形式ベース有限要素解析', link: '/calc/fenics' },
          { text: 'mumax による LLG マイクロ磁化・磁気弾性シミュレーション', link: '/calc/mumax3-llg' },
          { text: 'COMSOL を用いた LLG 計算と連成解析', link: '/calc/comsol-llg' },
          // { text: '有限要素法によるマイクロマグ計算の自作コード', link: '/calc/fem-llg' },
          // { text: '3次元線形弾性のHex8有限要素ソルバ', link: '/calc/fem-solver' },
          // { text: '磁気弾性連成（磁歪）をFEM弾性ソルバへ', link: '/calc/fem-maelas' },
        ] },
      ] },

      { text: '実験', collapsed: true, items: [
        { text: '材料合成', collapsed: true, items: [
          { text: '物理蒸着法（PVD）による薄膜形成の基礎', link: '/exp/pvd' },
          { text: '化学気相成長法（CVD）による薄膜形成の基礎', link: '/exp/cvd' },
        ]},

        { text: '熱処理・試料加工', collapsed: true, items: [
          { text: '急速熱処理装置ミラー5050', link: '/exp/rapid-annealing' },
          { text: 'フォトリソグラフィの化学', link: '/exp/photo-lithography' },
          { text: 'マスクレス露光装置の物理', link: '/exp/maskless-lithography' },
          { text: '鏡面研磨のノウハウ', link: '/exp/millor-polishing' },
        ]},

        { text: '磁気計測', collapsed: true, items: [
          { text: '軟磁性体の物理', link: '/exp/softmag-phys' },
          { text: '軟磁性体の高周波特性評価', link: '/exp/softmag-rf' },
          { text: '高周波計測技術', link: '/exp/softmag-rf-phys' },
          { text: '信号アナライザーの測定原理', link: '/exp/softmag-rf-measurement' },
          { text: '低ノイズ・高感度な電圧測定技術', link: '/exp/low-noise' },
          { text: 'プリアンプの物理と基礎', link: '/exp/pre-amp' },
          { text: '振動試料型磁力計（VSM）による磁化測定の基礎', link: '/exp/vsm' },
          { text: '磁気特性測定システム（MPMS）とSQUID磁力計の基礎', link: '/exp/mpms' },
          { text: '磁気光学カー効果顕微鏡（MOKE）による磁区構造・磁化ダイナミクス観察入門', link: '/exp/moke' },
          { text: 'パワーエレクトロニクス用受動素子', link: '/exp/power-electronics-mag' },
          { text: 'パワーエレクトロニクス用半導体デバイス', link: '/exp/power-electronics-semicon' },
        ]},

        { text: '構造・化学状態解析', collapsed: true, items: [
          { text: 'X線回折装置 (XRD)の基礎', link: '/exp/xrd' },
          { text: 'リードベルド解析', link: '/exp/xrd-rietveld' },
          { text: 'X線光電子分光法 (XPS)', link: '/exp/xps' },
          { text: '電子後方散乱回折 (EBSD)', link: '/exp/ebsd' },
          { text: '透過型電子顕微鏡（TEM）', link: '/exp/tem' },
          { text: '5D-STEMの基礎', link: '/exp/5d-stem' },
          { text: '電子線ホログラフィーの基礎', link: '/exp/electron-holography' },
        ]},

        { text: '汎用機器・治具設計', collapsed: true, items: [
          { text: '電磁界シールドの基礎', link: '/exp/mag-shield' },
          { text: '3Dプリンターと造形技術', link: '/exp/3d-printer' },
        ]},

        { text: '放射光計測', collapsed: true, items: [
          { text: '基礎', collapsed: true, items: [
            { text: 'シンクロトロン放射の基礎', link: '/exp/sr' },
            { text: 'ビームラインの光学設計', link: '/exp/sr-optics' },
            { text: '放射光による構造解析', link: '/exp/sr-structure' },
            { text: '放射光によるダイナミクス解析', link: '/exp/sr-dynamics' },
            { text: 'アモルファスの構造・物性解析', link: '/exp/sr-amorphous' },
            { text: 'フェルミの黄金律', link: '/exp/fermi-golden-rule' },
            { text: 'クレプシュ・ゴルダン係数と選択則', link: '/exp/clebsch-gordan' },
          ]},
          { text: '各手法の原理', collapsed: true, items: [
            { text: 'X線吸収微細構造（XAFS）', link: '/exp/sr-xafs' },
            { text: 'X線異常散乱（AXS）', link: '/exp/sr-axs' },
            { text: 'X線発光分光（XES）', link: '/exp/sr-xes' },
            { text: '光電子ホログラフィー（PEH）', link: '/exp/sr-peh' },
            { text: '小角X線散乱（SAXS）', link: '/exp/sr-saxs' },
            { text: '硬X線光電子分光（HAXPES）', link: '/exp/sr-haxpes' },
            { text: '共鳴軟Ｘ線非弾性散乱分光（RIXS）', link: '/exp/sr-rixs' },
            { text: 'コヒーレント回折イメージング（CDI）', link: '/exp/sr-cdi' },
            { text: 'X線磁気円二色性（XMCD）', link: '/exp/sr-xmcd' },
            { text: 'スピン・角度分解光電子分光（SARPES）', link: '/exp/sr-sarpes' },
            { text: 'X線自由電子レーザー（XFEL）', link: '/exp/sr-xfel' },
            { text: '表面洗浄のためのイオンミリング', link: '/exp/ion-milling-bl25su' },
          ]},
        ]},

        { text: '中性子散乱', collapsed: true, items: [
          { text: '中性子ビームの基本', link: '/exp/neutron' },
          { text: '中性子回折・小角中性子散乱の基礎と応用', link: '/exp/neutron-diff-scat' },
          { text: '中性子散乱による磁気秩序解析', link: '/exp/neutron-mag' },
        ]},
      ]},

      { text: 'データサイエンス', collapsed: true, items: [
        { text: '機械学習のための数理・統計・情報', collapsed: true, items: [
          { text: '線形代数入門', link: '/data/basis-linear-algebra' },
          { text: '微積分入門', link: '/data/basis-calculus' },
          { text: 'ベクトル解析入門', link: '/data/basis-vector-analysis' },
          { text: '複素解析入門', link: '/data/basis-complex-analysis' },
          { text: '多変量解析入門', link: '/data/basis-multivariate-analysis' },
          { text: '確率・統計入門', link: '/data/basis-propability' },
          { text: '最適化入門', link: '/data/basis-optimization' },
          { text: '情報理論入門', link: '/data/basis-information-theory' },
        ]},

        { text: '特徴量エンジニアリング', collapsed: true, items: [
          { text: '時系列解析', link: '/data/temporal' },
          { text: 'スペクトル解析', link: '/data/spectral' },
          { text: '直積・アダマール積', link: '/data/product' },
          { text: 'パーシステントホモロジーと位相的データ解析', link: '/data/persistent' },
        ]},

        { text: '材料データベース', collapsed: true, items: [
          { text: 'Materials Project（材料データベース）', link: '/data/db-materials-project' },
          { text: 'Open Quantum Materials Database (OQMD)', link: '/data/db-oqmd' },
        ]},

        { text: 'マテリアルズ・インフォマティクス', collapsed: true, items: [
          { text: 'AI for Science（AI4S）', link: '/data/info-ai4science' },
          { text: 'マテリアルズ・インフォマティクスの動向と将来展望', link: '/data/info' },
          { text: '材料インフォマティクス', link: '/data/info-materials' },
          { text: '計測インフォマティクス', link: '/data/info-measure' },
          { text: 'プロセスインフォマティクス', link: '/data/info-process' },
          { text: '物理インフォマティクスとPINNs', link: '/data/info-physics' },
        ]},

        { text: '教師あり学習（予測・分類）', collapsed: true, items: [
          { text: '決定木アンサンブル学習', link: '/data/decision-tree' },
          { text: '勾配ブースティング決定木', link: '/data/boosting' },
          { text: 'サポートベクターマシン', link: '/data/svm' },
          { text: 'k近傍法', link: '/data/k-nn' },
          { text: '半教師あり学習', link: '/data/semi-learning' },
        ]},

        { text: '次元削減手法・可視化', collapsed: true, items: [
          { text: '線形次元削減（PCAなど）', link: '/data/dr-linear' },
          { text: '非線形次元削減（U-MAPなど）', link: '/data/dr-nonlinear' },
          { text: '確率モデル・ベイズ推論による次元削減', link: '/data/dr-probabilistic-bayse' },
          { text: '深層学習ベースの次元削減 (VAEなど)', link: '/data/dr-deep-learning' },
        ]},

        { text: '深層学習フレームワーク', collapsed: true, items: [
          { text: 'パーセプトロン', link: '/data/perceptron' },
          { text: 'ニューラルネットワーク（NN）', link: '/data/nn' },
          { text: '畳み込みニューラルネットワーク（CNN）', link: '/data/cnn' },
          { text: '時間畳み込みネットワーク（TCN）', link: '/data/tcn' },
          { text: 'リカレントニューラルネットワーク（RNN）', link: '/data/rnn' },
          { text: 'ゲート付きRNNとしてのLSTMとGRU', link: '/data/rnn-lstm-gru' },
          { text: 'グラフニューラルネットワーク（GNN）', link: '/data/gnn' },
        ]},

        { text: '説明可能 AI (XAI)', collapsed: true, items: [
          { text: '特徴量重要度・寄与分解 (SHAP, LIMEなど)', link: '/data/importance' },
          { text: 'アテンション機構と解釈性', link: '/data/attention' },
          { text: 'Grad-CAMと局所的説明', link: '/data/gradcam' },
          { text: 'シンボリック回帰', link: '/data/symbolic' },
        ]},

        { text: '生成 AI', collapsed: true, items: [
          { text: 'GANとDiffusionモデル', link: '/data/gan-diffusion' },
          { text: '変分オートエンコーダー(VAE)', link: '/data/vae' },
          { text: 'Transformer', link: '/data/transformer' },
          { text: '材料科学分野におけるLLM', link: '/data/llm-mat' },
          { text: 'ファインマンLLM', link: '/data/llm-feynman' },
        ]},

        { text: '最適化手法', collapsed: true, items: [
          { text: '実験計画法(DOE)', link: '/data/doe' },
          { text: 'ベイズ最適化(BO)', link: '/data/bo' },
          { text: 'アクティブラーニングと能動学習', link: '/data/active-learning' },
          { text: '遺伝的アルゴリズム(GA)', link: '/data/genetic-algorithm' },
        ]},

        { text: '機械学習ポテンシャル', collapsed: true, items: [
          { text: '機械学習ポテンシャルの基礎', link: '/data/ml-potential' },
          { text: '機械学習ポテンシャルのファインチューニング', link: '/data/fine-tuning' },
          { text: '汎用機械学習ポテンシャル', link: '/data/ml-potential-all' },
        ]},

        { text: 'その他', collapsed: true, items: [
          { text: '自由エネルギー原理と情報理論', link: '/data/free-energy-principle' },
          { text: 'サロゲートモデル', link: '/data/surrogate' },
          { text: 'リザバーコンピューティング', link: '/data/reservoir' },
          { text: '物理リザバー', link: '/data/reservoir-physical' },
          { text: '逆設計モデル', link: '/data/inverse-design' },
          { text: '入れ子学習', link: '/data/nested-learning' },
        ]},

      ]},

      { text: '情報基盤', collapsed: true, items: [
        { text: 'データ解析環境', collapsed: true, items: [
          { text: '研究・開発のためのデータ解析環境設計', link: '/sys/data-analysis' },
          { text: 'Web開発でMCPを活かすための基礎', link: '/sys/mcp' },
          { text: 'エッジコンピューティング', link: '/sys/edge-computing' },
        ]},

        { text: 'プログラミング(Python)', collapsed: true, items: [
          { text: 'For文の高速化', link: '/sys/python-for' },
        ]},

        { text: 'スーパーコンピュータの利用', collapsed: true, items: [
          { text: '東北大金研Masamune-II', link: '/sys/masamune' },
        ]},

        { text: 'サーバー・HPC管理', collapsed: true, items: [
          { text: 'Linux基礎体系', link: '/sys/linux' },
          { text: '数値計算のためのCPU・GPU・TPU入門', link: '/sys/cpu-gpu-tpu' },
          { text: 'NASによるデータ管理設計', link: '/sys/nas' },
          { text: '所有ワクステ (SHIMA/TANI/MORI/MBN)', link: '/sys/workstations' },
          { text: '購入後の初期設定', link: '/sys/setup' },
        ]},

        { text: 'ホームページの管理', collapsed: true, items: [
          { text: '研究室サイトをGitHub Pagesで立ち上げる', link: '/sys/website' },
          { text: 'VitePressを用いた研究室Wikiの整備', link: '/sys/website-wiki' },
          { text: 'GA4とGTMによるアクセス解析の基礎', link: '/sys/access-analysis' },
        ]},

      ]},
      // { text: 'ラボ運営', collapsed: true, items: [
      //   { text: '研究備品', collapsed: true, items: [
      //     { text: 'ポスター用大型プリンターの使用法', link: '/lab/poster-printer' },
      //     { text: 'Wi-fiルーターの設置・設定', link: '/lab/rooter' },
      //   ]},
      // ]},

      { text: '周期表', collapsed: true, items: [
        { text: 'Periodic table', link: '/elem/table' },
        { text: '1-H', link: '/elem/1-h' },
        { text: '2-He', link: '/elem/2-he' },
        { text: '5-B', link: '/elem/5-b' },
        { text: '6-C', link: '/elem/6-c' },
        { text: '7-N', link: '/elem/7-n' },
        { text: '8-O', link: '/elem/8-o' },
        { text: '13-Al', link: '/elem/13-al' },
        { text: '14-Si', link: '/elem/14-si' },
        { text: '18-Ar', link: '/elem/18-ar' },
        { text: '22-Ti', link: '/elem/22-ti' },
        { text: '25-Mn', link: '/elem/25-mn' },
        { text: '26-Fe', link: '/elem/26-fe' },
        { text: '27-Co', link: '/elem/27-co' },
        { text: '28-Ni', link: '/elem/28-ni' },
        { text: '29-Cu', link: '/elem/29-cu' },
        { text: '30-Zn', link: '/elem/30-zn' },
        { text: '31-Ga', link: '/elem/31-ga' },
        { text: '32-Ge', link: '/elem/32-ge' },
        { text: '41-Nb', link: '/elem/41-nb' },
        { text: '42-Mo', link: '/elem/42-mo' },
        { text: '46-Pd', link: '/elem/46-pd' },
        { text: '47-Ag', link: '/elem/47-ag' },
        { text: '51-Sb', link: '/elem/51-sb' },
        { text: '52-Te', link: '/elem/52-te' },
        { text: '64-Gd', link: '/elem/64-gd' },
        { text: '68-Er', link: '/elem/68-er' },
        { text: '78-Pt', link: '/elem/78-pt' },
        { text: '79-Au', link: '/elem/79-au' },
      ]},

      { text: 'その他', collapsed: true, items: [
        { text: '初歩', collapsed: true, items: [
          { text: '線形代数の初歩', link: '/other/enter-algebra' },
          { text: '微積分の初歩', link: '/other/enter-calculus' },
          { text: 'ベクトル解析の初歩', link: '/other/enter-vector' },
          { text: '物理数学の初歩', link: '/other/enter-physics-math' },
          { text: '電磁気学の初歩', link: '/other/enter-electrodynamics' },
          { text: '量子力学の初歩', link: '/other/enter-quantum' },
          { text: '統計物理学の初歩', link: '/other/enter-statistical-physics' },
          { text: '固体物理学の初歩', link: '/other/enter-solid-state-physics' },
          { text: '電子回路の初歩', link: '/other/enter-electronic-circuit' },
          { text: '放射光科学の初歩', link: '/other/enter-synchrotron' },
          { text: 'プログラミングの初歩', link: '/other/enter-programming' },
          { text: 'HPCの初歩', link: '/other/enter-hpc' },          
          { text: '数値解法の初歩', link: '/other/enter-numerical-method' },
          { text: 'データサイエンスの初歩', link: '/other/enter-data-science' },
        ]},
        
        { text: '教科書', collapsed: true, items: [
          { text: 'Kittel - 固体物理学入門', link: '/other/kittel-solid-state' },
          { text: 'Bishop - パターン認識と機械学習', link: '/other/bishop-prml' },
          { text: 'Bishop - 深層学習', link: '/other/bishop-deep-learning' },
        ]},

        { text: '未解決問題', collapsed: true, items: [
          { text: 'ミレニアム懸賞問題', link: '/other/problems-math' },
          { text: '数学-2025', link: '/other/problems-math-2025' },
          { text: '物理学-2025', link: '/other/problems-physics-2025' },
          { text: '化学-2025', link: '/other/problems-chemistry-2025' },
          { text: '材料科学-2025', link: '/other/problems-materials-2025' },
        ]},
        { text: 'ノーベル賞', collapsed: true, items: [
          { text: '物理学賞2025-巨視的量子トンネル', link: '/other/nobel2025-phys' },
          { text: '化学賞2025-金属有機構造体（MOF）', link: '/other/nobel2025-chem' },
          { text: '物理学賞2024-人工ニューラルネットワーク', link: '/other/nobel2024-phys' },
          { text: '化学賞2024-タンパク質設計と構造予測', link: '/other/nobel2024-chem' },
        ]},
      ]},

      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
      { text: 'Changelog', link: '/changelog' },
      // { text: 'Website', link: 'https://antimeron.com' },
      // { text: 'Github', link: 'https://github.com/rd070672/antimeron' },
    ],

    socialLinks: [
      { icon: 'x', link: '/' },
      { icon: 'github', link: '/' }
    ],

    footer: {
      copyright: '© 2026 - antimeron',
    },
  },

  // https://vitepress.dev/guide/extending-default-theme#overriding-internal-components
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPHome\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPHome.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPNavBarHamburger\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPNavBarHamburger.vue', import.meta.url)
          )
        }

      ]
    },
    ssr: {
      noExternal: ['katex']
    }
  }
})
