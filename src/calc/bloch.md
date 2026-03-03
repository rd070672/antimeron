# ブロッホの定理

ブロッホの定理は、結晶のような周期構造をもつ系の量子状態が「平面波 × 格子周期関数」として表されることを保証する定理である。これにより無限に広がる結晶の問題が、第一ブリルアンゾーン内の波数 $\mathbf{k}$ を用いた有限な表現へ還元され、バンド理論と第一原理計算の基盤を与えるものである。

### 参考ドキュメント
- F. Bloch, Über die Quantenmechanik der Elektronen in Kristallgittern, Zeitschrift für Physik 52, 555–600 (1929), doi:10.1007/BF01339455  
  https://link.springer.com/article/10.1007/BF01339455
- （日本語）井野正三, 固体物理学 I 講義ノート（周期場中の電子と Bloch の定理を含む）広島大学（PDF）  
  https://home.hiroshima-u.ac.jp/ino/lecture/SSP1note7_ino2017.pdf
- （日本語）名古屋大学 OCW, 量子力学 I 講義ノート（ブロッホの定理と周期ポテンシャルの例を含む）（PDF）  
  https://ocw.nagoya-u.jp/files/487/qm1-17v3.pdf

## 1. 位置づけ
結晶中の電子は、原子核の周期配列に由来する周期ポテンシャル（あるいは周期的な有効ポテンシャル）を感じて運動する。固体の電子状態を理解する中心概念は、(i) 並進対称性、(ii) 逆格子とブリルアンゾーン、(iii) バンド分散 $E_{n}(\mathbf{k})$ の三点である。ブロッホの定理は、このうち (i) と (ii) を数学的に直接つなぎ、(iii) を自然に導く枠組みを与える。

ブロッホの定理は電子に限らず、周期構造をもつ線形固有値問題一般に現れる。格子振動（フォノン）では原子変位が、電磁波の周期媒質（フォトニック結晶）では電場・磁場の固有モードが、同種の「ブロッホ形式」を満たすことが知られている。

## 2. 周期ハミルトニアンと並進対称性
結晶格子ベクトルを
$$
\mathbf{R}=n_1\mathbf{a}_1+n_2\mathbf{a}_2+n_3\mathbf{a}_3 \quad (n_i\in\mathbb{Z})
$$
とする。単一粒子のハミルトニアンを
$$
\hat{H} = \frac{\hat{\mathbf{p}}^2}{2m}+V(\mathbf{r})
$$
とし、ポテンシャルが格子並進に対して周期的
$$
V(\mathbf{r}+\mathbf{R})=V(\mathbf{r})
$$
であると仮定する。このとき、格子並進演算子 $\hat{T}_{\mathbf{R}}$ を
$$
(\hat{T}_{\mathbf{R}}\psi)(\mathbf{r})=\psi(\mathbf{r}+\mathbf{R})
$$
で定義すると、
$$
[\hat{H},\hat{T}_{\mathbf{R}}]=0
$$
が成り立つ。すなわち、$\hat{H}$ は全ての格子並進と可換である。

ここで重要なのは、並進対称性が「波動関数そのものが同じ」という意味ではなく、「ハミルトニアン（観測の法則）が同じ」という意味である点である。固有状態は一般に位相因子を伴って変換され得る。

## 3. ブロッホの定理
周期ポテンシャル $V(\mathbf{r}+\mathbf{R})=V(\mathbf{r})$ の下で、シュレーディンガー方程式
$$
\hat{H}\psi_{n\mathbf{k}}(\mathbf{r})=E_n(\mathbf{k})\psi_{n\mathbf{k}}(\mathbf{r})
$$
の解は
$$
\psi_{n\mathbf{k}}(\mathbf{r}) = e^{i\mathbf{k}\cdot\mathbf{r}}u_{n\mathbf{k}}(\mathbf{r})
$$
と書け、$u_{n\mathbf{k}}(\mathbf{r})$ は格子周期性
$$
u_{n\mathbf{k}}(\mathbf{r}+\mathbf{R})=u_{n\mathbf{k}}(\mathbf{r})
$$
を満たす。これがブロッホの定理である。

この表現では、$\mathbf{k}$ は結晶運動量（準運動量）であり、逆格子ベクトル $\mathbf{G}$ に対して
$$
\psi_{n,\mathbf{k}+\mathbf{G}}(\mathbf{r}) \sim \psi_{n\mathbf{k}}(\mathbf{r})
$$
（物理的に同一の状態を表し得る）という同値性をもつ。したがって、$\mathbf{k}$ は第一ブリルアンゾーンに制限して議論できる。

## 4. 並進演算子による導出
$[\hat{H},\hat{T}_{\mathbf{R}}]=0$ より、$\hat{H}$ の固有状態を $\hat{T}_{\mathbf{R}}$ の同時固有状態として選べる。すなわち
$$
\hat{T}_{\mathbf{R}}\psi(\mathbf{r})=\psi(\mathbf{r}+\mathbf{R})=\lambda(\mathbf{R})\psi(\mathbf{r})
$$
を満たす。$\hat{T}_{\mathbf{R}}$ はユニタリであるから $|\lambda(\mathbf{R})|=1$ が必要であり、
$$
\lambda(\mathbf{R})=e^{i\theta(\mathbf{R})}
$$
と書ける。

さらに、並進群の性質 $\hat{T}_{\mathbf{R}}\hat{T}_{\mathbf{R}'}=\hat{T}_{\mathbf{R}+\mathbf{R}'}$ から
$$
\lambda(\mathbf{R})\lambda(\mathbf{R}')=\lambda(\mathbf{R}+\mathbf{R}')
$$
が成り立つ。この関係を満たす連続的な表現は
$$
\lambda(\mathbf{R})=e^{i\mathbf{k}\cdot\mathbf{R}}
$$
で与えられる。よって
$$
\psi(\mathbf{r}+\mathbf{R})=e^{i\mathbf{k}\cdot\mathbf{R}}\psi(\mathbf{r})
$$
となる。ここで
$$
u_{n\mathbf{k}}(\mathbf{r}) \equiv e^{-i\mathbf{k}\cdot\mathbf{r}}\psi_{n\mathbf{k}}(\mathbf{r})
$$
と定義すれば
$$
u_{n\mathbf{k}}(\mathbf{r}+\mathbf{R})
= e^{-i\mathbf{k}\cdot(\mathbf{r}+\mathbf{R})}\psi_{n\mathbf{k}}(\mathbf{r}+\mathbf{R})
= e^{-i\mathbf{k}\cdot\mathbf{r}} \psi_{n\mathbf{k}}(\mathbf{r})
= u_{n\mathbf{k}}(\mathbf{r})
$$
となり、$u_{n\mathbf{k}}$ の格子周期性とブロッホ形式が示される。

## 5. 逆格子とブリルアンゾーン：$\mathbf{k}$ の同値性
逆格子ベクトル $\mathbf{G}$ は
$$
e^{i\mathbf{G}\cdot\mathbf{R}}=1 \quad (\forall \mathbf{R})
$$
を満たすベクトル全体である。基本逆格子ベクトル $\mathbf{b}_i$ を用いると
$$
\mathbf{G}=m_1\mathbf{b}_1+m_2\mathbf{b}_2+m_3\mathbf{b}_3 \quad (m_i\in\mathbb{Z})
$$
と表される。

ブロッホ状態において $\mathbf{k}\to \mathbf{k}+\mathbf{G}$ を考えると
$$
\psi_{n,\mathbf{k}+\mathbf{G}}(\mathbf{r})
= e^{i(\mathbf{k}+\mathbf{G})\cdot\mathbf{r}}u_{n,\mathbf{k}+\mathbf{G}}(\mathbf{r})
= e^{i\mathbf{k}\cdot\mathbf{r}}\left(e^{i\mathbf{G}\cdot\mathbf{r}}u_{n,\mathbf{k}+\mathbf{G}}(\mathbf{r})\right)
$$
である。括弧内は周期関数として再定義できるため、$\mathbf{k}$ は逆格子だけずれても同値な表現を与える。結果として、$\mathbf{k}$ の代表元を第一ブリルアンゾーンに選ぶことができる。

## 6. バンド形成の物理：ブラッグ反射とギャップ
自由電子（$V=0$）では
$$
E(\mathbf{k})=\frac{\hbar^2|\mathbf{k}|^2}{2m}
$$
である。周期ポテンシャルが入ると、電子波は格子によって散乱され、$\mathbf{k}$ と $\mathbf{k}+\mathbf{G}$ が結合する。特にブリルアンゾーン境界近傍では
$$
E(\mathbf{k}) \approx E(\mathbf{k}+\mathbf{G})
$$
となり縮退が生じやすい。そこにポテンシャルのフーリエ成分 $V_{\mathbf{G}}$ が効くと縮退が解け、エネルギーギャップが開く。これは「ブラッグ条件を満たす波数で強い散乱が起こり、定在波的な状態に分かれる」ことの量子力学的表現である。

この描像は、ほぼ自由電子模型やクローニッヒ・ペニー模型で明示的に確認でき、バンドとギャップが結晶対称性から自然に導かれることを示す。

## 7. 有限サイズと Born–von Karman 境界条件
有限の計算セル（長さ $L_i=N_i a_i$）で周期境界条件を課すと
$$
\psi(\mathbf{r}+L_i\hat{\mathbf{e}}_i)=\psi(\mathbf{r})
$$
が要請される。ブロッホ条件 $\psi(\mathbf{r}+\mathbf{R})=e^{i\mathbf{k}\cdot\mathbf{R}}\psi(\mathbf{r})$ と整合させると
$$
e^{i\mathbf{k}\cdot L_i\hat{\mathbf{e}}_i}=1
\quad\Rightarrow\quad
\mathbf{k}\cdot L_i\hat{\mathbf{e}}_i=2\pi m_i
$$
であり、許される $\mathbf{k}$ が離散化される。無限結晶の極限 $N_i\to\infty$ では $\mathbf{k}$ は連続になり、$\mathbf{k}$ 空間積分が現れる。

## 8. フォノンと周期媒質（光）への拡張
### 8.1 フォノン
格子振動では、原子変位ベクトルの集合を固有ベクトルとして、力定数行列（あるいは動力学行列）を対角化する。並進対称性により、フォノン固有モードも
$$
\mathbf{u}_{s}(\mathbf{R}_\ell) \propto e^{i\mathbf{q}\cdot\mathbf{R}_\ell}\,\mathbf{e}_{s}(\mathbf{q})
$$
の形（$\mathbf{q}$ はフォノン波数、$\mathbf{e}_s$ は分極ベクトル）を持つ。ここでも波数は第一ブリルアンゾーン内で代表できる。

### 8.2 フォトニック結晶などの周期媒質
誘電率が周期的な媒質 $\varepsilon(\mathbf{r}+\mathbf{R})=\varepsilon(\mathbf{r})$ に対するマクスウェル方程式の固有モードも、同型の議論によりブロッホ形式を満たす。電磁場（例えば $\mathbf{E}(\mathbf{r})$）は
$$
\mathbf{E}_{n\mathbf{k}}(\mathbf{r})=e^{i\mathbf{k}\cdot\mathbf{r}}\,\mathbf{U}_{n\mathbf{k}}(\mathbf{r}),\qquad
\mathbf{U}_{n\mathbf{k}}(\mathbf{r}+\mathbf{R})=\mathbf{U}_{n\mathbf{k}}(\mathbf{r})
$$
と表され、フォトニックバンド構造という概念が成立する。固体電子の「ポテンシャルの周期性」が、光学では「媒質定数の周期性」に置き換わるだけで、対称性に基づく還元の論理は同じである。

## 9. 外場がある場合：電場と磁場
### 9.1 一様電場とブロッホ振動
完全に周期的な結晶に一様電場を加えると、$\mathbf{k}$ が時間とともに変化するという加速定理
$$
\hbar\frac{d\mathbf{k}}{dt}=-e\mathbf{E}
$$
が導かれる。散乱が無視できる理想化では、$\mathbf{k}$ がブリルアンゾーンを往復し、点電荷が周期的な運動（ブロッホ振動）を示すという描像が得られる。現実固体では散乱や多体効果が加わるが、ブロッホ形式とブリルアンゾーンの幾何は外場応答の基礎構造として残る。

### 9.2 一様磁場と磁気並進群
一様磁場 $\mathbf{B}$ があると、最小結合 $\hat{\mathbf{p}}\to\hat{\mathbf{p}}+e\mathbf{A}(\mathbf{r})$ により、ゲージの取り方によって並進対称性が見かけ上壊れる場合がある。そこで「磁気並進（磁気並進群）」を用いて、物理的に意味のある並進対称性を回復させる。特に単位胞当たりの磁束が有理数比になる条件下では、磁気ブリルアンゾーンや磁気ブロッホ条件が定義でき、ホフスタッター模型やランダウ準位の格子版といった現象論が体系化される。

この領域は通常のブロッホ定理の直接拡張というより、「並進対称性の表現がゲージ場を含む形に拡張される」と捉えるのが自然である。

## 10. ブロッホ基底とワニエ基底の関係
ブロッホ状態は逆空間で自然であり、バンド分散やフェルミ面の議論に適する。一方、局所的な結合像や有効模型（タイトバインディング型ハミルトニアン）には実空間で局在した基底が便利である。ワニエ関数は、ブロッホ状態を逆フーリエ変換して得る局在基底であり、
$$
|w_{n\mathbf{R}}\rangle=\frac{1}{N_k}\sum_{\mathbf{k}}e^{-i\mathbf{k}\cdot\mathbf{R}}|\psi_{n\mathbf{k}}\rangle
$$
が基本形である（複数バンドではユニタリ混合が加わる）。

ブロッホの定理は「周期系の固有状態の一般形」を与え、ワニエ関数は「その自由度（位相・バンド混合）を利用して局在表現を構成する」枠組みである。両者は対立ではなく、同一のヒルベルト空間上の表現の選択である。

## 11. 第一原理計算におけるブロッホの定理の意味
平面波基底を用いる密度汎関数理論（DFT）では、ブロッホ形式により
$$
\psi_{n\mathbf{k}}(\mathbf{r})=e^{i\mathbf{k}\cdot\mathbf{r}}u_{n\mathbf{k}}(\mathbf{r})
$$
を前提として、$u_{n\mathbf{k}}(\mathbf{r})$ を単位胞内のフーリエ級数で展開する。すると、無限結晶の波動関数が「単位胞内の自由度」と「$\mathbf{k}$ のラベル」に分離され、計算は $\mathbf{k}$ 点ごとの独立問題として定式化される。

全エネルギーや電子密度はブリルアンゾーン積分で与えられ、数値計算では離散 $\mathbf{k}$ 点で近似される。結晶対称性が高い場合は、既約ブリルアンゾーンのみを積分すれば良いという還元も可能である。これらはすべて、ブロッホの定理が与える $\mathbf{k}$ 表現と並進対称性に立脚している。

## 12. ブロッホの定理がそのまま適用できない状況
周期性が厳密に成り立たない場合、ブロッホ形式は一般には成り立たない。代表例は以下である。

- 無秩序（置換乱れ、欠陥、アモルファス）により $V(\mathbf{r}+\mathbf{R})=V(\mathbf{r})$ が破れる場合
- 準結晶のように並進周期が存在しない場合
- 表面・界面・ナノ構造のように、ある方向に周期境界を課せない場合

ただし、近似としての超胞（スーパーセル）を用いれば「大きな周期」を導入してブロッホ形式を回復させられる。超胞では本来のバンドが「折り畳まれた形」で現れるため、逆空間の解釈（バンド折り畳み、アンフォールディング、スペクトル関数化）が必要になる。

## 13. 重要式の整理
| 概念 | 数式 | 意味 |
|---|---|---|
| 周期性 | $V(\mathbf{r}+\mathbf{R})=V(\mathbf{r})$ | 結晶並進に対する不変性 |
| ブロッホ形式 | $\psi_{n\mathbf{k}}=e^{i\mathbf{k}\cdot\mathbf{r}}u_{n\mathbf{k}}$ | 平面波因子と周期関数の積 |
| 周期部分 | $u_{n\mathbf{k}}(\mathbf{r}+\mathbf{R})=u_{n\mathbf{k}}(\mathbf{r})$ | 単位胞内自由度に還元 |
| ブロッホ条件 | $\psi(\mathbf{r}+\mathbf{R})=e^{i\mathbf{k}\cdot\mathbf{R}}\psi(\mathbf{r})$ | 並進で位相を獲得 |
| 逆格子 | $e^{i\mathbf{G}\cdot\mathbf{R}}=1$ | $\mathbf{k}$ の同値性の生成元 |
| 群速度 | $\mathbf{v}_n(\mathbf{k})=\frac{1}{\hbar}\nabla_{\mathbf{k}}E_n(\mathbf{k})$ | 波束運動の速度 |
| 有効質量 | $(m^*)^{-1}_{ij}=\frac{1}{\hbar^2}\frac{\partial^2 E_n}{\partial k_i\partial k_j}$ | 曲率による応答の尺度 |

## 14. 比較：ブロッホ表現と局在表現
| 表現 | 基底 | 長所 | 主な用途 |
|---|---|---|---|
| ブロッホ表現 | $｜\psi_{n\mathbf{k}}\rangle$ | 対称性と逆空間が自然である | バンド分散、フェルミ面、応答関数 |
| ワニエ表現 | $｜w_{n\mathbf{R}}\rangle$ | 実空間で局在し解釈しやすい | 有効模型、局所結合像、補間 |
| 原子軌道LCAO | 原子軌道の線形結合 | 化学結合の直観が得やすい | タイトバインディング初期模型 |

## まとめと展望
ブロッホの定理は、周期対称性をもつ量子系の固有状態がブロッホ形式で表されることを示し、無限結晶の問題をブリルアンゾーン内の有限自由度に還元する中核原理である。電子、フォノン、電磁波など、周期媒質に現れる線形固有値問題の広い範囲で同型の構造が現れ、バンドとギャップという普遍的概念が対称性から導かれることを明確にする。

今後の展望として、強磁場下の磁気並進群、準周期系や無秩序系のスペクトル理論、トポロジカルバンド理論と幾何学（ベリー位相）など、ブロッホの定理を出発点にした拡張が量子物質研究を駆動している。周期性という「対称性の情報」をいかに表現へ落とすかが、計算物質科学と実験物性の接続をさらに深める鍵である。


## その他参考にした資料
- Chapter 3 Electrons in a periodic potential（Bloch の定理の教科書的導入を含む）（PDF, Universität Stuttgart）  
  https://www.itp3.uni-stuttgart.de/downloads/pdf/Chapter3.pdf
- Bloch’s Theorem and Band Structure in One Dimension（講義ノート）（PDF, UC Berkeley）  
  https://bohr.physics.berkeley.edu/classes/221/9697/blochban.pdf
- MIT OpenCourseWare: Quantum ESPRESSO handout（k点と周期境界条件の背景を含む）（PDF）  
  https://ocw.mit.edu/courses/3-320-atomistic-computer-modeling-of-materials-sma-5107-spring-2005/b5179173234e73513a10bd4dde535da0_pwscf_handout.pdf
- Quantum ESPRESSO 関連資料（平面波基底と Bloch の定理の関係に言及）  
  https://www.materialssquare.com/docs/en/appendix
- （プレスリリース例）東北大学ほか：歪フォトニック結晶による電磁波制御（周期媒質と波動の関係の文脈）（PDF）  
  https://www.tohoku.ac.jp/japanese/newimg/pressimg/tohokuuniv_press0929_04web_photonic.pdf
- （プレスリリース例）KDDI総合研究所：フォトニック結晶レーザーと周期構造の説明（ニュースリリース）  
  https://www.kddi-research.jp/newsrelease/2025/112602.html
- Magnetic translation group と一般化ブロッホ条件に関する例（Hofstadter 模型・磁気ブリルアンゾーンの入門）（PDF, Universität Stuttgart）  
  https://www.itp3.uni-stuttgart.de/teaching/archive/ss21/tpm21/exercises/tpm_ss21_problemset_03.pdf
- APPENDIX: Magnetic translation group and generalized Bloch theorem（Phys. Rev. B 87, 235429 (2013)）  
  https://link.aps.org/doi/10.1103/PhysRevB.87.235429
