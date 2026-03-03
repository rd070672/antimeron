# HOOMD-blue入門

HOOMD-blueは、粒子系シミュレーションをCPUおよびGPU上で高速に実行するために設計されたPythonパッケージである。分子動力学（MD）と硬粒子モンテカルロ（HPMC）を中核に、統計力学アンサンブル、近接粒子探索、並列化、データ入出力を一体として提供する枠組みである。

## 参考ドキュメント
1. HOOMD-blue Documentation（インストール、機能、GSD、チュートリアル各種）
   https://hoomd-blue.readthedocs.io/

2. J. A. Anderson, J. Glaser, S. C. Glotzer, HOOMD-blue: A Python package for high-performance molecular dynamics and hard particle Monte Carlo simulations, Computational Materials Science (2020)
   https://doi.org/10.1016/j.commatsci.2019.109363

3. （日本語）MateriApps: HOOMD-blue
   https://ma.issp.u-tokyo.ac.jp/app/297


## 1. 位置づけと対象領域

HOOMD-blueは、ナノ〜コロイドスケールの粒子系を念頭に置いた汎用シミュレーションエンジンであり、Pythonから記述できる柔軟性と、C++/GPUバックエンドによる高い演算性能を両立することを狙って設計されている。MD（連続時間の運動方程式に基づく時間発展）とHPMC（重なり禁止や排除体積を核とする平衡サンプリング）という、物理モデリングが異なる二つの計算様式を同一基盤で扱える点が特徴である。

対象分野はソフトマター（高分子、コロイド、粒状体、自己組織化系など）での利用が多いが、粒子モデルとして定式化できる限り、広い範囲の相互作用・外場・拘束条件の設定が可能である。国内でもGPU環境を用いた高分子系の大規模計算などで利用報告がある。


## 2. ソフトウェア構成と設計思想

### 2.1 Pythonフロントエンドと高速バックエンド

HOOMD-blueはPython APIを入口とし、計算の中核はC++（およびGPU向け実装）で担う構造である。ユーザーはPython側で

- 系（粒子、結合、境界条件、初期配置）
- 相互作用（ポテンシャル、外場、拘束）
- 時間発展（積分法、温度圧力制御など）
- 書き出し（トラジェクトリ、物理量）

を組み合わせ、必要ならPython側で解析や制御則を拡張する。

### 2.2 拡張性：Python側での操作とC++/GPUデータへのアクセス

HOOMD-blueは、状態量や力などをPython（NumPy配列互換）として扱える設計を強めており、ユーザーが独自の更新規則や出力規則を追加しやすい。さらに、粒子に作用する力をユーザー定義するための仕組みが用意され、GPU上のバッファへもゼロコピーでアクセス可能な設計が採られている（ただし、導出クラス設計やメモリ整合は理解が必要である）。


## 3. HOOMD-blueが扱うシミュレーション様式

HOOMD-blueの中核は、連続力学としてのMDと、確率過程としてのHPMCである。両者は「何を計算しているか」が根本的に異なるため、まず目的から選ぶ必要がある。

| 観点 | MD（Molecular Dynamics） | HPMC（Hard Particle Monte Carlo） |
|---|---|---|
| 基本量 | 位置・速度（運動方程式） | 配置（確率的更新） |
| 目的 | ダイナミクス、輸送、応力応答、非平衡 | 平衡構造、自己組織化、排除体積効果 |
| 相互作用 | 有限のポテンシャル（連続力）を基本とする | 重なりで無限大のエネルギー（硬相互作用）を基本とする |
| 時間の意味 | 物理時間（時間刻みΔtに依存） | マルコフ連鎖のステップ（物理時間ではない） |
| 受理判定 | なし（数値積分） | メトロポリス法などで受理/棄却 |


## 4. MDの基礎：運動方程式とアンサンブル

### 4.1 ニュートン方程式（NVEの基本）

MDの基本は、粒子$i$の位置$\mathbf{r}_i$に対する運動方程式である。

$$
m_i \frac{d^2 \mathbf{r}_i}{dt^2} = \mathbf{F}_i(\{\mathbf{r}\})
$$

ここで$\mathbf{F}_i$はポテンシャル$U(\{\mathbf{r}\})$から
$$
\mathbf{F}_i = -\nabla_{\mathbf{r}_i} U
$$
として得られる。数値計算では時間刻み$\Delta t$で離散化し、速度ベルレ法などのシンプレクティックな積分が用いられることが多い。

### 4.2 熱浴・粘性・ノイズ：確率微分方程式

溶媒効果を粗視化して扱う場合、ランジュバン方程式が用いられる。

$$
m_i \frac{d \mathbf{v}_i}{dt}
= \mathbf{F}_i - \gamma_i \mathbf{v}_i + \sqrt{2\gamma_i k_\mathrm{B}T}\,\boldsymbol{\eta}_i(t)
$$

ここで$\gamma_i$は摩擦係数、$\boldsymbol{\eta}_i(t)$は平均0・デルタ相関をもつ白色雑音である。さらに慣性項を無視できる拡散極限では、過減衰ランジュバン（ブラウン動力学）として

$$
\gamma_i \frac{d \mathbf{r}_i}{dt} = \mathbf{F}_i + \sqrt{2\gamma_i k_\mathrm{B}T}\,\boldsymbol{\eta}_i(t)
$$

が得られる。HOOMD-blueはブラウン動力学のための手法（Brownian）を提供し、過減衰ランジュバン方程式に従って時間発展させる。

### 4.3 代表的アンサンブル

HOOMD-blueは、温度・圧力制御を含む複数のアンサンブル（NVE, NVT, NPTなど）や、ランジュバン、ブラウンなどの手法を備えるとされる。目的に応じて「ダイナミクスをどこまで物理的に解釈するか」を明確にした上で選ぶことが重要である。


## 5. HPMCの基礎：硬相互作用とメトロポリス法

HPMCは、粒子形状が重なるとエネルギーが無限大になる硬相互作用を基本とする。形式的には

$$
U(\{\mathbf{r}\})=
\begin{cases}
0 & \text{重なりなし} \\
+\infty & \text{重なりあり}
\end{cases}
$$

であり、配置更新はメトロポリス法により

$$
P_\mathrm{acc} = \min\left(1, e^{-\beta \Delta U}\right),\quad \beta = \frac{1}{k_\mathrm{B}T}
$$

として受理される。硬相互作用のみの場合、$\Delta U$は重なりの有無により$0$か$+\infty$となるため、受理判定は「重なりが生じない提案のみ受理」に簡約される。HOOMD-blueのHPMCは、拡張形状粒子を扱い、重なり禁止の下で平衡配置をサンプルするための積分器（インテグレータ）を中心に構成される。


## 6. 相互作用モデル：ポテンシャルとトポロジー

HOOMD-blueは一般的な粒子モデルの表現として、少なくとも以下の要素を扱う。

- 粒子属性：質量、直径、電荷、タイプなど
- トポロジー：結合（bond）、角度（angle）、二面角（dihedral）など
- ペア相互作用：カットオフを持つ短距離相互作用を中心に、近接探索（neighbor list）と組み合わせて評価

出力形式（GSD）は、粒子・結合・角度・拘束などのデータ場をフレームごとに格納でき、粒子数やタイプなどが時間とともに変化する系も表現可能である。これは粗視化反応や粒子の生成消滅を含むモデル化とも整合しうる。


## 7. 近接粒子探索（Neighbor list）

短距離相互作用を多数粒子で計算する際、全対全の探索は$O(N^2)$となり現実的でない。そこでカットオフ距離$r_\mathrm{cut}$内の近傍のみを探索する近接リストが用いられる。

HOOMD-blueは、近接リスト構築のために複数の加速法を提供する。

| 方式 | 概要 | 向く状況（概念） |
|---|---|---|
| Cell list | 空間をセル分割し、近傍セルのみ探索 | 粒子密度が一様に近い場合 |
| Stenciled cell list | セル探索の範囲を事前計算したステンシルで最適化 | カットオフ半径のタイプ依存やサイズ差が大きい場合 |
| Tree（LBVH） | 境界体積階層（BVH）により探索 | 不均一密度や広いスケール差がある場合 |

近接探索の選択は、計算速度だけでなくメモリ使用量にも影響する。例えば、探索加速構造（セルや木）が追加メモリを要し、カットオフや粒子タイプ構成に依存して支配的になることがある。


## 8. 並列化：GPUとMPI

### 8.1 GPU最適化の考え方

HOOMD-blueはGPU計算を前提に設計されてきた経緯があり、粒子間相互作用や近接探索など、並列化可能な主要計算をGPUに適合させている。多GPU環境では、空間領域を分割するドメイン分割とMPI通信により、分割領域境界の粒子情報（ゴースト粒子など）を交換して計算を進める。

### 8.2 ビルドと配布形態の多様性

配布形態としては、conda-forgeによるバイナリ配布があり、環境に応じてCPU版・GPU版が選択される仕組みが説明されている。一方で、HPC環境でネイティブのMPIやCUDAを用いたい場合は、ソースからビルドする必要がある旨が明記されている。コンテナ（Docker/Singularity）による配布も案内されている。

---

## 9. GSDと周辺ツール

### 9.1 GSD（General Simulation Data）

HOOMD-blueの標準トラジェクトリ形式としてGSDが用いられる。GSDはフレームへのランダムアクセスが可能なバイナリ形式であり、粒子・トポロジー・拘束などを格納でき、フレームごとに粒子数やタイプ等が変化する系も表現できる。

### 9.2 解析・可視化エコシステム

GSDはHOOMD-blue外でも読み出し可能であり、Pythonエコシステムの解析ツールと接続しやすい。例えば、HOOMD-blueのチュートリアルではfreud（構造解析）やfresnel（レンダリング）を用いた解析が紹介されている。さらに、MDAnalysisはGSDトラジェクトリのリーダーを提供している。


## 10. 導入の考え方

ここでは方針のみ整理する。

| 方針 | 特徴 | 適する状況（概念） |
|---|---|---|
| conda-forgeバイナリ | 導入が容易で環境が揃いやすい | 手元PC・単一GPUでの利用、素早い評価 |
| ソースからビルド | MPI/CUDAなど環境固有最適化を反映できる | 研究用クラスタ・多GPU・環境依存が強い場合 |
| コンテナ | 実行環境の固定がしやすい | 環境差を避けたい場合、教育用途 |


## 11. 妥当性の考え方

MDでは、積分誤差や熱浴の扱いにより、保存則や平衡分布が理想からずれることがある。例えばNVEであればエネルギー保存の程度、NVT/NPTであれば温度・圧力の揺らぎが期待分布と整合するかが判断材料となる。ランジュバンやブラウンでは、拡散係数や速度自己相関、平均二乗変位などがモデル仮定と整合するかを確認するのが自然である。

HPMCでは、受理率と提案更新の大きさが探索効率を左右する。硬相互作用のみなら「重なりが起こらない提案のみ受理」という構造になるため、形状・密度・提案の設計が統計的効率へ直結する。


## 12. 国内外での利用例

国外ではHOOMD-blueの設計・拡張性・GPU並列化に関する論文があり、ソフトマター系を中心に多くの研究で利用されてきた。国内でもGPU計算資源を用いた高分子系計算でHOOMD-blueの利用が言及されており、粗視化MDの多数条件計算や、GPUを活かした計算時間短縮の文脈で紹介されている。


## まとめと展望

HOOMD-blueは、GPUを強く意識した粒子シミュレーション基盤として、MDとHPMCを中心に、近接探索・並列化・拡張性・GSDによる入出力を統合して提供するソフトウェアである。Python APIにより周辺解析（freud、可視化、MDAnalysis等）と結合しやすく、研究対象を粒子モデルへ落とし込める場合に高い有用性を持つ。

今後の展望としては、(i) 長時間・大規模計算のための多GPU性能の継続的改善、(ii) 外部解析ツール群との接続性の強化、(iii) ユーザー定義力や更新則の表現力向上による新しいモデル化の促進、が重要になると考えられる。特に、GSDを核とするデータ互換性の確立と、Python側での拡張により、シミュレーションと解析を同一言語圏で循環させる研究開発が一層進むことが期待される。


### 参考
- glotzerlab/hoomd-blue（GitHub）
  https://github.com/glotzerlab/hoomd-blue
- HOOMD-blue: A Python package for high-performance molecular dynamics and hard particle Monte Carlo simulations（arXiv）
  https://arxiv.org/abs/1308.5587
- Strong scaling of general-purpose molecular dynamics simulations on GPUs（arXiv）
  https://arxiv.org/abs/1412.3387
- HOOMD-blue features（拡張・相互運用性）
  https://hoomd-blue.readthedocs.io/en/stable/features.html
- gsd（GSD形式のPython API）
  https://github.com/glotzerlab/gsd
- HOOMD-blue tutorial: Analyzing trajectories（freud / fresnel）
  https://hoomd-blue.readthedocs.io/en/latest/tutorial/00-Introducing-HOOMD-blue/07-Analyzing-Trajectories.html
- （日本語）大阪大学CMC: 環状混合系の高分子物性のシミュレーション（HOOMD-blue利用例の記載）
  https://www.hpc.cmc.osaka-u.ac.jp/research/20210427/
- （日本語）Qiita: 分子動力学計算ライブラリHoomd-Blueの記事（概要紹介）
  https://qiita.com/kojiko430430/items/bd1dad25c9a4a0c85304
