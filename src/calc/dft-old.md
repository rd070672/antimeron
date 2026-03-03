# 第一原理計算の基本原理

第一原理計算は、物質を構成する電子と原子核の量子力学に立脚し、経験的パラメータに依存しない形でエネルギーとそこから導かれる物性を計算する方法群である。現代の材料研究では、密度汎関数理論（DFT）を核として、構造安定性、電子状態、磁性、格子振動、反応・拡散などを統一的に扱う枠組みとして用いられる。

## 参考ドキュメント
- W. Kohn and L. J. Sham, Self-Consistent Equations Including Exchange and Correlation Effects, Phys. Rev. 140, A1133 (1965)
  https://link.aps.org/doi/10.1103/PhysRev.140.A1133
- The Nobel Prize in Chemistry 1998 Press release（密度汎関数理論に関する公式説明）
  https://www.nobelprize.org/prizes/chemistry/1998/press-release/
- 佐藤和則, 第一原理計算法 II（応用物理, J-STAGE, 日本語）
  https://www.jstage.jst.go.jp/article/oubutsu/75/11/75_1371/_pdf
- 尾崎泰助, 第一原理電子状態計算の基礎と応用（講義資料, 日本語）
  https://t-ozaki.issp.u-tokyo.ac.jp/mpcoms2021_lectures/Ozaki-Lec1.pdf
- P. E. Blöchl, Projector augmented-wave method, Phys. Rev. B 50, 17953 (1994)
  https://link.aps.org/doi/10.1103/PhysRevB.50.17953
  
## 1. 多体シュレーディンガー方程式
非相対論的な多電子・多原子核系は、全ハミルトニアン
$$
\hat{H}=\hat{T}_e+\hat{T}_n+\hat{V}_{ee}+\hat{V}_{en}+\hat{V}_{nn}
$$
に対する固有値問題
$$
\hat{H}\Psi(\mathbf{r},\mathbf{R})=E\Psi(\mathbf{r},\mathbf{R})
$$
で与えられる。ここで $\mathbf{r}$ は電子座標、$\mathbf{R}$ は核座標である。

課題は、電子数 $N$ に対して波動関数 $\Psi$ が $3N$ 次元（スピンを含めればさらに増大）となり、直接解くことが実質不可能なことである。第一原理計算は、この困難を物理的に妥当な近似と数値解法で分解していく枠組みである。

## 2. Born–Oppenheimer 近似
材料の多くの問題では、電子の運動は核より十分速い。そこで核座標 $\mathbf{R}$ をパラメータとして電子状態を先に解き、核はその上で動くとみなす。

1) 電子問題（核固定）
$$
\hat{H}_e(\mathbf{R})\psi_i(\mathbf{r};\mathbf{R})=\varepsilon_i(\mathbf{R})\psi_i(\mathbf{r};\mathbf{R})
$$
2) 得られた電子基底状態エネルギーをポテンシャルエネルギー面として核の運動へ反映

この分離が Born–Oppenheimer 近似である。固体材料の構造最適化、弾性、欠陥形成、相安定性などの多くは、この近似の上で定式化される。

## 3. 密度汎関数理論（DFT）の基本
### 3.1 Hohenberg–Kohn（HK）定理
HK 定理の核心は、基底状態の性質が電子密度 $n(\mathbf{r})$ により一意に定まるという点である。すなわち、基底状態エネルギーは
$$
E[n]=F[n]+\int v(\mathbf{r})n(\mathbf{r})\,d\mathbf{r}
$$
の汎関数として書け、正しい密度がエネルギー最小化で得られる。

ここで $F[n]$ は普遍汎関数（運動エネルギーと電子間相互作用を含む）であるが、厳密形は未知である。

### 3.2 Kohn–Sham（KS）方程式
KS は、相互作用する電子系を「同じ密度を与える非相互作用電子系」へ写像し、扱いやすい形にする。KS 方程式は
$$
\left[
-\frac{1}{2}\nabla^2+v_{\mathrm{ext}}(\mathbf{r})
+v_{\mathrm{H}}[n](\mathbf{r})
+v_{\mathrm{xc}}[n](\mathbf{r})
\right]\phi_i(\mathbf{r})
=\varepsilon_i\phi_i(\mathbf{r})
$$
である。ここで
$$
n(\mathbf{r})=\sum_{i}^{\mathrm{occ}}|\phi_i(\mathbf{r})|^2,\qquad
v_{\mathrm{H}}(\mathbf{r})=\int \frac{n(\mathbf{r'})}{|\mathbf{r}-\mathbf{r'}|}\,d\mathbf{r'}
$$
であり、未知なのは交換相関ポテンシャル $v_xc$ である。

実際の計算は自己無撞着（SCF）反復で行う。
1. 初期密度 $n^{(0)}$ を仮定
2. KS 方程式を解き $\phi_i$ を得る
3. 新密度 $n^{(1)}$ を構成
4. 収束条件（エネルギー差、密度差、力など）を満たすまで反復

## 4. 交換相関汎関数
$v_xc$ は近似を導入する必要があり、目的物性・材料種に応じた選択が重要になる。

代表例
- LDA：局所密度に基づく。結合長や体積を系統的に過小評価しがちな傾向がある
- GGA（PBE など）：密度勾配も用いる。材料探索と構造安定性で標準的に用いられる
- DFT+U：局在 $d$, $f$ 電子に対する相関補正
- ハイブリッド（HSE など）：バンドギャップや絶縁体の電子構造の改善
- GW：準粒子エネルギー（より“正しい”バンドギャップ）へ
- TDDFT：励起状態・光応答（ただし適用範囲に注意が必要）

汎関数選択は、原理的には「どの自由度を平均場に押し込め、どの自由度を明示的に扱うか」というモデリング選択に対応する。

## 5. 周期境界条件と k 点
結晶では周期境界条件（PBC）を課すことが多く、波動関数は Bloch 形
$$
\psi_{n\mathbf{k}}(\mathbf{r})=e^{i\mathbf{k}\cdot\mathbf{r}}u_{n\mathbf{k}}(\mathbf{r})
$$
で表される。これにより、ブリルアンゾーン内の $k$ 点サンプリングで物性が決まる。

実務上の要点
- 金属は $k$ 点収束が厳しく、スメアリング手法を併用することが多い
- バンド構造は高対称線上の $\mathbf{k}$ 経路で可視化されるが、エネルギーや力の収束はメッシュ積分で評価する

## 6. 基底と擬ポテンシャル
### 6.1 平面波基底とカットオフ
平面波基底は周期系に自然で、系統的に収束可能である。一方で必要な基底数はカットオフエネルギー $E_{cut}$ に依存し、精度と計算コストのトレードオフとなる。

### 6.2 擬ポテンシャルと PAW
コア電子まで全てを厳密に扱うと計算が困難になるため、価電子を主対象とし、コア効果を有効ポテンシャルに押し込める。

- ノーム保存擬ポテンシャル（NCPP）
- 超ソフト擬ポテンシャル（USPP）
- PAW（Projector Augmented-Wave）法：原子近傍の全電子波動関数の情報を補う形で精度と効率を両立する

PAW は、バルクに加えて磁性、化学反応、応答関数など幅広い用途で標準的に採用されている。

## 7. 何が計算できるか
第一原理計算の多くは、基底状態全エネルギー $E$ とその微分量を中心に構成される。

| 計算対象 | 中心量 | 典型的に得られるもの |
|---|---|---|
| 構造安定性 | $E$, 応力 | 格子定数、相対安定性、形成エネルギー |
| 構造最適化 | 力 $\mathbf{F}=-\partial E/\partial\mathbf{R}$ | 安定構造、欠陥緩和、界面構造 |
| 弾性 | 応力–歪み、弾性定数 | 弾性率、機械的安定性 |
| 電子状態 | $\varepsilon_{n\mathbf{k}}$, DOS | 金属/半導体判定、状態密度、フェルミ面情報 |
| 磁性 | スピン密度、交換分裂 | 磁気モーメント、磁気異方性（SOC を含む場合） |
| 格子振動 | 力定数、線形応答 | フォノン分散、自由エネルギー、熱容量 |
| 反応・拡散 | エネルギー障壁 | NEB による遷移状態、拡散バリア |
| 有限温度 | DFT-MD | 熱揺らぎ下の構造、溶融、相転移の兆候 |

有限温度の原子運動を扱う場合には、Car–Parrinello 型の ab initio MD などが基礎概念として重要になる。

## 8. 誤差と検証
第一原理計算は“自動で正解が出る装置”ではなく、誤差構造を理解して使うべきものである。代表的な注意点を挙げる。

- 交換相関汎関数の系統誤差（体積、凝集エネルギー、ギャップなど）
- 有限サイズ誤差（スーパーセル、欠陥間相互作用）
- $k$ 点・カットオフの未収束
- スピン状態の取り違え（初期磁化、反強磁性配置）
- SOC、非共線磁性、強相関などの取り扱い不足
- 0 K 近似と有限温度（振動エントロピー、磁気エントロピー）との差

実務では、目的量に対して「収束試験」と「外部参照（実験・高精度理論）」の両方で妥当性を担保する設計が必要である。

## 9. 計算結果の解釈
第一原理計算は数値を返すが、材料研究では次のような“解釈の軸”が重要である。

- 競合相・欠陥・界面を含めた相対エネルギーの見積もり
- 電子状態（DOS, バンド）と結合性・磁性の関係の言語化
- 応力・弾性・フォノンを通じた構造安定性の議論
- 観測量への写像（例：フォノンから比熱、バリアから拡散係数の傾向）
- 実験条件との差分の明示（温度、非平衡、微細組織、乱れ）

## まとめ
第一原理計算は、多体量子問題を Born–Oppenheimer 近似と DFT（HK 定理と KS 方程式）で扱える形にし、交換相関汎関数・基底・擬ポテンシャル（PAW）・周期系の $k$ 点積分などの設計により現実的な材料物性予測を可能にする枠組みである。得られる数値を材料研究の意思決定に活かすには、収束・誤差・適用限界を構造的に理解し、必要に応じて beyond-DFT や有限温度効果、欠陥・界面などの現実要素へ拡張する姿勢が要点である。

## 関連研究
1. J. M. D. Coey, Amorphous magnetic order, Journal of Applied Physics 49, 1646 (1978).
   https://pubs.aip.org/aip/jap/article/49/3/1646/505321/Amorphous-magnetic-order
2. R. Alben, J. J. Becker, M. C. Chi, Random anisotropy in amorphous ferromagnets, Journal of Applied Physics 49, 1653 (1978).
   https://pubs.aip.org/aip/jap/article/49/3/1653/505311/Random-anisotropy-in-amorphous-ferromagnets
3. E. M. Chudnovsky, W. M. Saslow, R. A. Serota, Ordering in ferromagnets with random anisotropy, Physical Review B 33, 251 (1986).
   https://link.aps.org/doi/10.1103/PhysRevB.33.251
4. 梯 祥郎, アモルファス遷移金属磁性の新しい描像, まてりあ 30, 131 (1991).
   https://www.jstage.jst.go.jp/article/materia1962/30/2/30_2_131/_pdf/-char/en