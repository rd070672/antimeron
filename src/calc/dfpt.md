# 密度汎関数摂動論（DFPT）入門

DFPT（Density-Functional Perturbation Theory）は、密度汎関数理論（DFT）の枠組みを「微小摂動に対する線形応答」へ拡張し、フォノンや誘電応答などを直接計算する方法である。スーパーセル変位法に比べて、原始胞のまま波数依存の格子動力学や各種応答関数を扱える点が特徴である。

## 参考ドキュメント
- S. Baroni, S. de Gironcoli, A. Dal Corso, P. Giannozzi, Phonons and related crystal properties from density-functional perturbation theory, Rev. Mod. Phys. 73, 515 (2001)  
  https://journals.aps.org/rmp/abstract/10.1103/RevModPhys.73.515
- ABINIT Documentation: DFPT topics / tutorials  
  https://docs.abinit.org/topics/DFPT/
- VASP Wiki: Linear response（IBRION=7,8 など）  
  https://vasp.at/wiki/Category:Linear_response
- 格子物性の第一原理計算（講義資料：DFPTの概説を含む）  
  https://mp-coms.issp.u-tokyo.ac.jp/wp/wp-content/uploads/2022/09/lec7_mpcoms2022.pdf


## 1. 全エネルギーの微分としての物性
DFTは、電子密度 $n(\mathbf{r})$ の汎関数として全エネルギー $E[n]$ を与え、基底状態の電子構造を決める枠組みである。多くの結晶物性（格子振動、誘電率、圧電定数、弾性定数など）は、全エネルギーの1階・2階微分として表せる。

例：
- 力（原子 $\kappa$ の方向 $\alpha$）  
  $$
  F_{\kappa\alpha}=-\frac{\partial E_{\mathrm{tot}}}{\partial u_{\kappa\alpha}}
  $$
- 力定数（原子変位に対する2階微分）  
  $$
  \Phi_{\kappa\alpha,\kappa'\beta}(\mathbf{R})=
  \frac{\partial^2 E_{\mathrm{tot}}}{\partial u_{\kappa\alpha}(\mathbf{0})\,\partial u_{\kappa'\beta}(\mathbf{R})}
  $$
- 誘電率（電場に対する2階微分、あるいは分極応答）  
  $$
  \varepsilon_{\infty,ij}=\delta_{ij}+4\pi\chi_{ij},\qquad
  \chi_{ij}=\frac{\partial P_i}{\partial \mathcal{E}_j}
  $$

DFPTは、これらの微分を「差分近似」ではなく「解析的な線形応答方程式の解」として得る方法である。

## 2. 摂動パラメータによる展開：線形応答の定義
原子変位、均一電場、歪などの摂動を、パラメータ $\lambda$ で表す。電子密度やコーン・シャム（KS）軌道、自己無撞着ポテンシャルを $\lambda$ で展開する。

- 密度  
  $$
  n(\mathbf{r};\lambda)=n^{(0)}(\mathbf{r})+\lambda n^{(1)}(\mathbf{r})+O(\lambda^2)
  $$
- KSハミルトニアン  
  $$
  \hat{H}_{\mathrm{KS}}(\lambda)=\hat{H}^{(0)}+\lambda \hat{H}^{(1)}+O(\lambda^2)
  $$
- KS軌道  
  $$
  \psi_{n\mathbf{k}}(\mathbf{r};\lambda)=\psi^{(0)}_{n\mathbf{k}}(\mathbf{r})+\lambda \psi^{(1)}_{n\mathbf{k}}(\mathbf{r})+O(\lambda^2)
  $$

目的は、$n^{(1)}$ や $\psi^{(1)}$ を求め、全エネルギーの2階微分（応答関数）を組み立てることである。

## 3. Sternheimer方程式：基底状態まわりの線形化
DFPTの計算は、KS方程式を1次まで線形化した「Sternheimer方程式」を解く操作に帰着する。概念的には

$$
(\hat{H}^{(0)}-\varepsilon^{(0)}_{n\mathbf{k}})\,|\psi^{(1)}_{n\mathbf{k}}\rangle
=
-(\hat{H}^{(1)}-\varepsilon^{(1)}_{n\mathbf{k}})\,|\psi^{(0)}_{n\mathbf{k}}\rangle
$$

であり、右辺に摂動（原子変位、電場、歪）が入る。ここで重要なのは、$\hat{H}^{(1)}$ が単なる外場の変化ではなく、密度変化 $n^{(1)}$ を通じた自己無撞着応答（Hartree項・交換相関項）を含むため、$n^{(1)}$ と $\psi^{(1)}$ を自己無撞着に求める必要がある点である。

計算的には以下の反復が現れる。
1. 初期の $n^{(1)}$ を仮定する
2. $n^{(1)}$ から $\hat{H}^{(1)}$ を構成する
3. Sternheimer方程式を解いて $\psi^{(1)}$ を得る
4. $\psi^{(1)}$ から新しい $n^{(1)}$ を再構成する
5. 収束するまで繰り返す

## 4. フォノンとは何か
### 4.1 力定数と動力学行列
結晶の格子振動（調和近似）では、力定数から動力学行列を作り、固有値問題を解いてフォノン周波数を得る。

- 動力学行列（波数 $\mathbf{q}$）  
  $$
  D_{\kappa\alpha,\kappa'\beta}(\mathbf{q})
  =
  \frac{1}{\sqrt{M_\kappa M_{\kappa'}}}
  \sum_{\mathbf{R}}
  \Phi_{\kappa\alpha,\kappa'\beta}(\mathbf{R})
  e^{i\mathbf{q}\cdot\mathbf{R}}
  $$
- 固有値問題  
  $$
  \sum_{\kappa'\beta}D_{\kappa\alpha,\kappa'\beta}(\mathbf{q})\,e_{\kappa'\beta}^{(\nu)}(\mathbf{q})
  =
  \omega_{\nu}^2(\mathbf{q})\,e_{\kappa\alpha}^{(\nu)}(\mathbf{q})
  $$

DFPTでは、与えた $\mathbf{q}$ に対する原子変位摂動を導入し、力や密度の1次応答から $\Phi$ および $D(\mathbf{q})$ を得る。

### 4.2 音響和則（ASR）
並進不変性により、力定数は
$$
\sum_{\kappa'\mathbf{R}}\Phi_{\kappa\alpha,\kappa'\beta}(\mathbf{R})=0
$$
を満たすべきである。数値誤差で破れるため、ASRの適用（後処理での補正）がしばしば行われる。

### 4.3 極性結晶の LO-TO 分裂
極性結晶では $\mathbf{q}\to 0$ で長距離クーロン相互作用が効き、LO-TO分裂が生じる。Born有効電荷 $Z^*$ と高周波誘電率 $\varepsilon_\infty$ を用いて、$\mathbf{q}\to 0$ の非解析項を加える形で取り扱う。

典型表式（概念）：
$$
D^{\mathrm{NA}}_{\kappa\alpha,\kappa'\beta}(\mathbf{q})
\propto
\frac{(\mathbf{q}\cdot Z^*_\kappa)_\alpha(\mathbf{q}\cdot Z^*_{\kappa'})_\beta}{\mathbf{q}\cdot \varepsilon_\infty \cdot \mathbf{q}}
$$

## 5. 誘電応答・Born有効電荷・圧電・弾性
DFPTは「原子変位」だけでなく、電場や歪を摂動として扱えるため、以下の量を一貫した枠組みで得られる。

- 高周波誘電率（電子寄与） $\varepsilon_\infty$
- Born有効電荷  
  $$
  Z^{*}_{\kappa,\alpha i}
  =
  \Omega \frac{\partial P_i}{\partial u_{\kappa\alpha}}
  =
  \frac{\partial F_{\kappa\alpha}}{\partial \mathcal{E}_i}
  $$
- 圧電定数（概念的に分極の歪応答、あるいは応力の電場応答）
- 内部歪（internal strain）や弾性定数の成分（歪摂動・内部座標緩和を含む）

これらはフォノン計算と同様に「2階微分」に関係し、Sternheimer型方程式の解を組み合わせて構成される。

## 6. 電子・フォノン相互作用（e-ph）
DFPTは、原子変位により誘起される自己無撞着ポテンシャルの1次変化 $\Delta_{\mathbf{q}\nu}V_{\mathrm{SCF}}$ を与える。これを用いると、電子フォノン結合の行列要素は概念的に

$$
g_{mn\nu}(\mathbf{k},\mathbf{q})
=
\left\langle
\psi_{m,\mathbf{k}+\mathbf{q}}
\left|
\Delta_{\mathbf{q}\nu}V_{\mathrm{SCF}}
\right|
\psi_{n,\mathbf{k}}
\right\rangle
$$

として定義される。これらから Eliashberg 関数 $\alpha^2F(\omega)$ や結合定数 $\lambda$ を構成し、超伝導転移温度の推定などへ接続される。

- 例：結合定数（概念）  
  $$
  \lambda = 2\int_0^\infty \frac{\alpha^2F(\omega)}{\omega}\,d\omega
  $$

高精度な $\alpha^2F(\omega)$ には、$\mathbf{k}$・$\mathbf{q}$ の高密度サンプリングが必要であり、ワニエ補間（MLWF）と組み合わせる設計がしばしば採用される。

## 7. 変位法との比較
| 観点 | 変位法（有限差分） | DFPT |
|---|---|---|
| 単位胞 | 多くの場合スーパーセルが必要 | 原始胞のまま扱える場合が多い |
| 波数 $\mathbf{q}$ | スーパーセルサイズで制約される | 任意の $\mathbf{q}$ を直接扱える |
| 実装 | 比較的単純 | 実装が複雑で開発・保守コストが高い |
| 電子フォノン結合 | 後処理や追加計算が必要になりやすい | 枠組みとして自然に組み込まれている |
| 非調和（3次以上） | 3次力定数など差分で拡張しやすい | 3次以降は拡張が必要（可能だが難度が上がる） |

目的がフォノン分散・誘電応答・Born電荷・圧電などの線形応答にある場合、DFPTが中心的選択肢となる。有限温度の強い非調和や欠陥・乱れが主題でスーパーセルが不可避なら、変位法が筋が良い場合も多い。

## 8. 収束と信頼性
DFPTは「解析的」と言っても、数値計算である以上、収束性が品質を支配する。典型的な注意点は以下である。

- 基底状態SCFの品質  
  - 波数点（$k$-mesh）
  - カットオフ（平面波、補助基底など）
  - 混合、収束閾値（全エネルギー・密度）
- 金属・半金属  
  - フェルミ面近傍の収束が難しく、スメアリングや十分な $k$ 点が必要になりやすい
- 極性結晶  
  - $\varepsilon_\infty$ と $Z^*$ の計算、LO-TO分裂補正の有無
- 擬ポテンシャル／PAWデータセットの妥当性  
  - Born電荷や誘電率、フォノンは擬ポテンシャル品質の影響を受けやすい
- 対称性処理  
  - 既約表現を用いて摂動数を減らせる一方、誤った対称性で結果が破綻することがある

## 9. ソフトウェアの比較
DFPTは多くの第一原理コードに実装されているが、出力の組み立て方（動力学行列、実空間IFC、ASR、LO-TO分裂、後処理）が設計として重要である。

- Quantum ESPRESSO  
  - ph.x により特定 $\mathbf{q}$ のフォノンを計算し、q2r.x と matdyn.x 等を用いて実空間IFCや分散へ接続する流れが定番である。
- ABINIT  
  - 応答計算のデータを DDB（Derivative Data Base）として蓄え、後処理で分散・誘電・Born電荷などを組み上げる設計が特徴である。
- VASP  
  - 線形応答（DFPT）関連の機能が整理されており、内部歪テンソルなどもDFPTで扱える枠組みが用意されている。

また、DFPTを大規模に回して整理したデータセット（フォノン分散・誘電・熱力学量）も整備されており、探索研究や統計解析へ接続しやすい。

## まとめ
- DFPTは、DFTを微小摂動に対する線形応答へ拡張し、フォノン・誘電率・Born有効電荷・圧電・弾性などを全エネルギーの微分として一貫して計算する方法である。  
- Sternheimer方程式に基づき、密度とポテンシャルの1次応答を自己無撞着に求める点が中核である。  
- 収束設計（SCF品質、$k$ 点、金属の取り扱い、極性補正、擬ポテンシャル品質）が結果の信頼性を決めるため、目的量ごとに検証計画を持つことが重要である。

