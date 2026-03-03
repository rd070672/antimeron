# FEniCSによる変分形式ベース有限要素解析

FEniCSは、偏微分方程式（PDE）を変分形式（弱形式）として記述し、有限要素法（FEM）によって数値解を得るためのオープンソース基盤である。FEniCSx（新世代）とlegacy FEniCS（旧世代）が併存しており、目的と環境に応じて選択が必要である。

## 参考ドキュメント
- FEniCS Project, Download / Archive
  - https://fenicsproject.org/download/
- The FEniCS Project Version 1.5（Archive of Numerical Software, DOI）
  - https://doi.org/10.11588/ans.2015.100.20553
- FEniCS〖インストール〗（日本語）
  - https://matsuo-san.hatenablog.com/entry/2020/03/01/212602

## 1. FEniCSとは何か

FEniCSは「弱形式を中心に据えた有限要素計算」を、数式に近い記法で表現し、その表現から組立（アセンブリ）や反復解法のための計算処理を実行する枠組みである。利用者の関心は通常、(i) 解析対象のPDE、(ii) 境界条件、(iii) 関数空間（要素・次数）、(iv) 解法（線形/非線形、時間発展、前処理）であり、これらを統一的に扱える点が特徴である。

FEniCSの位置づけを、有限要素法の作業分解として述べると以下である。

- 数学側：PDEを弱形式（変分問題）に落とす
- 離散化側：有限要素空間を選ぶ（要素・次数・メッシュ）
- 代数側：疎行列・疎ベクトルの線形代数問題に変換し、反復法で解く
- 評価側：誤差評価、収束性、可視化、派生量の計算を行う

FEniCSは特に「弱形式の表現」と「その弱形式に基づく計算処理の自動化」に強みがある。

## 2. FEniCSx と legacy FEniCS

FEniCSは大きく2系統に分かれる。

- FEniCSx：DOLFINxを核とする新世代（FEniCSxと総称される）
- legacy FEniCS：2019.1.0 系を中心とする旧世代

利用開始時点での基本的な指針は、原則として新規はFEniCSxを優先し、既存資産（スクリプト、周辺ツール、研究室内の標準環境）を理由にlegacyが必要になる場合がある、という整理になる。

### 2.1 対応状況の比較表

| 観点 | FEniCSx（DOLFINx） | legacy FEniCS（DOLFIN） |
|---|---|---|
| 中核 | DOLFINx | DOLFIN |
| 要素定義 | Basix（FEniCSx） | FIAT（主にlegacy） |
| 形式言語 | UFL（共通概念） | UFL（legacy実装） |
| フォームコンパイラ | FFCx（FEniCSx） | FFC（legacy） |
| 対応幾何 | 三角形・四面体に加え、四角形・六面体なども志向 | 旧来の構成に依存 |
| 複素数 | 対応（設計として明示） | 利用には注意が必要な場合がある |
| 依存関係 | MPI/HDF5（MPI有効）などを強く前提 | 旧来の配布形態が多い |
| 学習資料 | DOLFINx demos / FEniCSx tutorials が充実 | 蓄積は多いが世代差に注意 |

上表は概念整理であり、実際の可否はバージョン・配布形態・使用APIに依存する。

### 2.2 バージョンと配布の話題

公式の配布ページでは、FEniCSxの安定版リリース情報（例：2025年10月のリリース表示）と、legacy FEniCSのアーカイブ（例：2019.1.0の公開）とが併記される。ここで「FEniCSxの版」はメタ的な配布単位を指す場合があり、DOLFINxなど個別コンポーネントの版番号（例：0.10系、mainブランチ等）とは一致しない場合がある。したがって、論文・レポート・再現計算では、FEniCSxの総称版に加えて、DOLFINxの版、PETSc/MPIの版、コンパイラ条件を記録することが望ましい。

## 3. 弱形式（変分形式）

FEniCSを理解するうえで中心となるのは、強形式（微分方程式）から弱形式（変分問題）への変換である。

### 3.1 例：ポアソン方程式

領域 $\Omega \subset \mathbb{R}^{d}$ において、次の境界値問題を考える。

- 強形式：
  $$
  -\nabla \cdot (k \nabla u) = f \quad \text{in } \Omega
  $$
- 境界条件（例）：
  $$
  u = u_D \quad \text{on } \Gamma_D,\qquad
  (k\nabla u)\cdot n = g \quad \text{on } \Gamma_N
  $$

試験関数 $v$ を用いて両辺に掛け、部分積分（ガウスの発散定理）を適用すると弱形式は

$$
\int_{\Omega} k \nabla u \cdot \nabla v \, dx
=
\int_{\Omega} f v \, dx + \int_{\Gamma_N} g v \, ds
\quad \forall v \in V_0
$$

となる。ここで $V$ は有限要素近似の関数空間（例：$H^1(\Omega)$ を離散化した空間）であり、$V_0$ は $\Gamma_D$ 上でゼロとなる試験関数空間である。

FEniCSでは、この弱形式の左辺を双線形形式 $a(u,v)$、右辺を線形形式 $L(v)$ として扱う。

$$
a(u,v) = L(v)
$$

### 3.2 離散化と線形代数

有限要素空間 $V_h \subset V$ を選び、基底 $\{\phi_i\}$ によって

$$
u_h(x) = \sum_{i=1}^{N} U_i \phi_i(x)
$$

と展開すると、弱形式は線形方程式

$$
A U = b
$$

に帰着する。ここで

$$
A_{ij} = a(\phi_j, \phi_i),\qquad
b_i = L(\phi_i)
$$

であり、$A$ は疎行列となる。FEniCSはこの「弱形式 → 組立 → 疎線形代数」の接続を中心に構成されている。

## 4. FEniCSxのソフトウェア構成

FEniCSxは複数コンポーネントから構成される。概念上の役割を整理すると次の通りである。

| コンポーネント | 役割（要点） | 補足 |
|---|---|---|
| UFL | 弱形式を「数式に近い形」で表現するための言語（DSL） | 自動微分、テンソル演算、複雑な多場問題の表現に寄与 |
| FFCx | UFLで書かれた形式から、要素積分などの計算カーネルを生成する | 生成とJIT実行の設計を含む |
| Basix | 有限要素（要素族・次数・補間など）の定義・評価 | 要素の拡張に関わる |
| DOLFINx | メッシュ・関数空間・境界条件・組立・PETSc連携など、計算環境の中核 | C++/Pythonの両面を持つ |

上記は「何をどこが担当するか」の整理である。利用者は通常、弱形式と境界条件の設計に注力し、DOLFINx側のソルバー選択や前処理の指定を調整することになる。

## 5. 計算の流れ

ここでは、言葉の意味が混ざりやすい点を分解して述べる。

1. 問題設定
   - PDE（強形式）と境界条件を定める
2. 変分化
   - 弱形式 $a(u,v)=L(v)$（または残差形式 $F(u;v)=0$）を定める
3. 離散化
   - メッシュと有限要素空間 $V_h$ を選ぶ（要素・次数）
4. 組立
   - 疎行列 $A$、疎ベクトル $b$（または非線形残差）を生成する
5. 解法
   - 線形：$A U=b$ をKrylov法や直接法で解く
   - 非線形：Newton法などで $F(U)=0$ を反復する
6. 派生量と出力
   - 応力、流束、エネルギー汎関数などを計算し、可視化・保存する

FEniCSの学習上の要点は、2〜5の対応関係（弱形式・関数空間・境界条件・ソルバー）を正しく結び付けることである。

## 6. 非線形問題と自動微分の位置づけ

非線形PDEの一例として

$$
-\nabla \cdot \left( (1+u^2)\nabla u \right) = f
$$

を考えると、弱形式は概略

$$
F(u;v) = \int_{\Omega} (1+u^2)\nabla u \cdot \nabla v\,dx - \int_{\Omega} f v\,dx = 0
$$

となる。Newton法では、更新 $\delta u$ に対して

$$
J(u)\,\delta u = -F(u)
$$

を解く。ここで $J$ はGateaux微分（ヤコビアン）として

$$
J(u)[\delta u, v] = \frac{d}{d\epsilon}F(u+\epsilon \delta u; v)\bigg|_{\epsilon=0}
$$

で与えられる。FEniCSの重要点は、弱形式を記述した時点で、この微分（ヤコビアン）を自動的に構成できる設計があることである。これにより、複雑な多場連成でも、ヤコビアンの手計算・手実装の負担が大きく軽減される。

## 7. 時間依存問題（拡散方程式の例）

拡散方程式

$$
\frac{\partial u}{\partial t} - \nabla \cdot (D\nabla u) = s
$$

を後退オイラーで離散化すると

$$
\frac{u^{n+1}-u^n}{\Delta t}v + D\nabla u^{n+1}\cdot \nabla v = s^{n+1}v
$$

を積分して

$$
\int_{\Omega}\frac{u^{n+1}}{\Delta t}v\,dx + \int_{\Omega}D\nabla u^{n+1}\cdot \nabla v\,dx
=
\int_{\Omega}\frac{u^{n}}{\Delta t}v\,dx + \int_{\Omega} s^{n+1}v\,dx
$$

の形になる。時間発展では、各ステップで「線形（または非線形）問題を解く」形に落ちるため、ソルバー設定・前処理設定が計算時間に直結しやすい。

## 8. 並列計算と依存関係（FEniCSx側）

FEniCSx（DOLFINx）は並列実行を強く意識した構成であり、依存としてMPIとMPI有効HDF5などが明示される。ソースから導入する場合、C++コアの導入が必要であり、C++20対応コンパイラ、MPI、HDF5（MPIサポート有効）などが要求される。

また、HPC環境ではSpackなどの環境構築手段が推奨される扱いになっていることが多い。クラスタ環境では、MPI実装（Open MPI / MPICHなど）とPETScのビルド条件を揃えることが重要である。

## 9. 導入方法の選択（OS別の整理）

導入法は複数あるが、ここでは「配布の推奨傾向」を中心に整理する。

### 9.1 DOLFINx側（例）

- macOS：condaが推奨されやすい
- Linux：apt（Ubuntu/Debian）、docker、conda、あるいはSpack
- Windows：docker、あるいはWSL2を介したLinux利用、condaはベータ扱いのことがある
- HPC：Spack、またはソースから（システムのMPIを利用）

この整理は、DOLFINxの配布・依存条件がOSごとに異なることを反映している。

### 9.2 例：condaの雰囲気（FEniCSx）

以下は概念例であり、実際のチャンネル名やパッケージ名は公式の記述に合わせるべきである。

```
conda create -n fenicsx-env
conda activate fenicsx-env
conda install -c conda-forge fenics-dolfinx mpich
```


WindowsではPETSc等の事情が異なることがあり、可否と機能差を理解したうえで導入する必要がある。

### 9.3 国内情報に基づく導入メモ（legacyを含む）

国内の技術メモでは、WSL（Ubuntu）での導入、PPAの利用、condaの利用などが紹介されている。これらは環境の再現性・更新性の点で差があるため、研究室内の標準化では「OS、配布形態、版番号」を固定して共有する方が望ましい。

## 10. 利用上の注意

ここでは、理解の障害になりやすい混同を避ける観点で述べる。

1. FEniCS（総称）とDOLFINx（中核）の区別が曖昧になることがある
   - 学習資料では「FEniCSx」「DOLFINx」「dolfinx-tutorial」など名称が混在するため、対象のAPI世代を確認することが重要である
2. 版の整合（FEniCSxの総称版、DOLFINxの版、依存ライブラリの版）
   - 例：外部ライブラリ（MPI/HDF5/PETSc）の条件差がエラー形態に直結しうる
3. 非線形問題におけるヤコビアン
   - 自動微分で楽になる一方、境界条件の扱い、拘束条件、混合要素の選択により数値的不安定性が出ることがある
4. 収束しない場合の原因の切り分け
   - 数学モデル（境界条件・係数の不連続）と離散化（要素次数・メッシュ品質）とソルバー（前処理）のいずれに原因があるかを分解して判断する必要がある
5. 出力・可視化の形式差
   - 構造化データ形式（XDMF/HDF5等）と可視化ツール（ParaView等）の相性があり、結果の読み出し段階で制約が現れることがある

## 11. 学習資源と情報源の読み方

### 11.1 公式ドキュメントの基本導線

- FEniCS Project公式サイト（overview、documentation、download）
- DOLFINxドキュメント（installation、demos、release notes）
- GitHub（DOLFINxなどのREADME、ライセンス、変更履歴）

公式ドキュメントは版によって構成が変わることがあるため、閲覧時点でのURLと版（main / v0.x）を記録しておくとよい。

### 11.2 研究論文・書籍

FEniCSの考え方（弱形式DSL、フォームコンパイラ、自動微分、設計思想）を体系的に把握するには、FEniCS BookやUFL論文が有用である。これらは「なぜ弱形式中心なのか」「どのように表現と言語設計が数値計算を支えるのか」を理解する軸を与える。

### 11.3 国内情報

国内では、導入手順のメモや、OS別の工夫がブログ・大学のノウハウページとして点在する。これらは環境差分の実例として有用である一方、更新停止している場合も多いので、版と前提OSを読み取って利用する必要がある。

## 12. 比較：他のFEM環境との関係

FEniCSは「弱形式記述を中心とする高水準表現」を特徴とする。以下は概念比較である。

| ソフトウェア | 主な強み（概念） | 使い分けの観点 |
|---|---|---|
| FEniCS/FEniCSx | 弱形式DSL、フォームの自動処理、Python/C++両面 | 多場PDE、試作速度、数学表現の忠実性 |
| deal.II | 大規模計算・高度なFE機能・C++中心の設計 | 低レベル制御、最適化、巨大計算 |
| FreeFEM | スクリプト指向、教育・試作に強い | 手早いモデル化、2D/3Dの迅速試行 |
| Firedrake | UFL系統を用いた別実装、HPC志向 | PETSc/並列志向、UFL表現の再利用 |

どれが優れているというより、「弱形式中心の表現でPDEを扱いたいか」「C++中心で細部を掌握したいか」「配布・環境がどれだけ安定か」により選択が分かれる。

## 13. 参考文献
- FEniCS Project, Documentation
  - https://fenicsproject.org/documentation/
- DOLFINx documentation（installation / demos / release notes）
  - https://docs.fenicsproject.org/dolfinx/main/python/
- DOLFINx GitHub（README、ライセンス、導入）
  - https://github.com/FEniCS/dolfinx
- UFL論文（ACM TOMS, DOI）
  - https://dl.acm.org/doi/10.1145/2566630
- FEniCS Book（Springer）
  - https://link.springer.com/book/10.1007/978-3-642-23099-8
- DOLFINx tutorial（第三者チュートリアル例）
  - https://jsdokken.com/dolfinx-tutorial/fem.html
- Meiji University ノウハウページ（日本語）
  - https://nalab.mind.meiji.ac.jp/~mk/knowhow-2017/node22.html
- 国立情報学研究所 CiNii Books（FEniCS Bookの書誌、日本語）
  - https://ci.nii.ac.jp/ncid/BB08773951

## まとめ
FEniCSは、弱形式を中核に据えて有限要素計算を組み立てるための枠組みであり、表現（UFL）と計算処理（コンパイル・組立・ソルバー連携）を分離して高い拡張性を得ている。新規導入ではFEniCSx（DOLFINx系）を優先し、版管理（FEniCSx総称版、DOLFINx版、MPI/HDF5/PETSc条件）と弱形式・境界条件・ソルバーの対応関係を軸に学習と運用を進めることが要点である。
