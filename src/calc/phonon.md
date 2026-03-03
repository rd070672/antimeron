# フォノン物性の基礎

フォノンは固体中の格子振動を量子化した素励起であり、比熱・熱膨張・熱伝導・誘電応答・超伝導など多様な物性を統一的に記述する中心概念である。フォノン物性は調和近似を基盤としつつ、準調和近似・非調和効果・電子格子相互作用・長距離クーロン相互作用を取り込むことで、有限温度・圧力下の現実材料へ接続されるのである。

### 参考ドキュメント
1. 只野央将, 非調和フォノン理論が拓く有限温度物性の第一原理計算, 日本物理学会誌 78(9) (2023).
   https://www.jps.or.jp/books/gakkaishi/2023/09/05/78-542_researches4.pdf
2. S. Baroni, S. de Gironcoli, A. Dal Corso, P. Giannozzi, Phonons and related crystal properties from density-functional perturbation theory, Rev. Mod. Phys. 73, 515 (2001).
   https://link.aps.org/doi/10.1103/RevModPhys.73.515
3. A. Togo, First-principles Phonon Calculations with Phonopy and Phono3py, J. Phys. Soc. Jpn. 92, 012001 (2023).
   https://journals.jps.jp/doi/10.7566/JPSJ.92.012001

## 1. フォノンとは何か

結晶中の原子は平衡位置のまわりで振動しており、原子数が多い系では「互いに結合した多数自由度の振動」として表される。結晶の並進対称性のもとでは、振動は波数 $\mathbf{q}$ をもつ正規モードへ分解でき、各モードは分枝（ブランチ）指数 $\nu$ によって区別される。フォノンはこの正規モードを量子化した準粒子であり、エネルギー $\hbar\omega_{\mathbf{q}\nu}$、運動量 $\hbar\mathbf{q}$（結晶運動量）、偏極ベクトル $\mathbf{e}_{\kappa}(\mathbf{q}\nu)$ をもつのである。

- 音響（acoustic）分枝：$\mathbf{q}\to 0$ で $\omega_{\mathbf{q}\nu}\to 0$。結晶全体の並進に対応する。
- 光学（optical）分枝：$\mathbf{q}\to 0$ で有限の $\omega_{\mathbf{q}\nu}$ をもつ。基底胞内の相対運動に対応する。


## 2. 調和近似による格子振動の基本方程式

### 2.1 ボルン＝オッペンハイマー近似とポテンシャル展開
多くの第一原理フォノン理論は、電子の基底状態エネルギー（断熱ポテンシャル）$E(\{\mathbf{u}\})$ を原子変位 $\{\mathbf{u}\}$ の関数として扱い、そのまわりで展開する枠組みに依拠する。原子 $\kappa$（基底胞内の原子種・位置ラベル）、格子点 $l$ の変位を $\mathbf{u}_{l\kappa}$ とすると、

$$
E(\{\mathbf{u}\}) = E_0
+ \frac{1}{2}\sum_{l\kappa\alpha}\sum_{l'\kappa'\beta}
\Phi_{\kappa\alpha,\kappa'\beta}(l-l')\,u_{l\kappa\alpha}\,u_{l'\kappa'\beta}
+ \frac{1}{3!}\sum \Phi^{(3)} u u u
+ \cdots
$$

ここで $\alpha,\beta\in\{x,y,z\}$ は直交成分であり、$\Phi$ は 2 次の力定数（interatomic force constants; IFCs）、$\Phi^{(3)}$ は 3 次 IFC を表す。

調和近似は 2 次項までで打ち切る近似であり、正規モードは独立な量子調和振動子へ還元されるのである。

### 2.2 運動方程式と動力学行列（ダイナミカルマトリクス）
原子質量を $M_{\kappa}$ とすると、調和近似での運動方程式は

$$
M_{\kappa}\,\ddot{u}_{l\kappa\alpha}
= -\sum_{l'\kappa'\beta}\Phi_{\kappa\alpha,\kappa'\beta}(l-l')\,u_{l'\kappa'\beta}
$$

ブロッホ型の波動解
$$
u_{l\kappa\alpha}(t)
= \frac{1}{\sqrt{M_{\kappa}}}\,e_{\kappa\alpha}(\mathbf{q}\nu)\,
\exp\left[i(\mathbf{q}\cdot\mathbf{R}_l-\omega_{\mathbf{q}\nu} t)\right]
$$
を代入すると、固有値問題

$$
\sum_{\kappa'\beta}D_{\kappa\alpha,\kappa'\beta}(\mathbf{q})\,
e_{\kappa'\beta}(\mathbf{q}\nu)
= \omega_{\mathbf{q}\nu}^2\,e_{\kappa\alpha}(\mathbf{q}\nu)
$$

を得る。ここで動力学行列 $D(\mathbf{q})$ は

$$
D_{\kappa\alpha,\kappa'\beta}(\mathbf{q})
=
\frac{1}{\sqrt{M_{\kappa}M_{\kappa'}}}
\sum_{l'} \Phi_{\kappa\alpha,\kappa'\beta}(l-l')\,
e^{i\mathbf{q}\cdot(\mathbf{R}_{l'}-\mathbf{R}_{l})}
$$

である。固有値 $\omega_{\mathbf{q}\nu}^2$ が正であれば、そのモードは調和近似において動的に安定である。負の固有値（虚数振動数）は不安定（soft mode）を意味し、相転移や構造緩和の駆動力になり得るのである。

### 2.3 並進不変性と acoustic sum rule
結晶全体の一様並進はエネルギーを変えないため、

$$
\sum_{l'\kappa'} \Phi_{\kappa\alpha,\kappa'\beta}(l-l') = 0
$$

が成立する（acoustic sum rule）。数値計算では、この条件を満たすように IFC を補正することがしばしば行われる。

### 2.4 群速度・状態密度
フォノンの群速度は

$$
\mathbf{v}_{\mathbf{q}\nu} = \nabla_{\mathbf{q}}\omega_{\mathbf{q}\nu}
$$

であり、熱輸送や散乱の議論に直接現れる。フォノン状態密度（phonon DOS）$g(\omega)$ は

$$
g(\omega) = \frac{1}{N_{\mathbf{q}}}\sum_{\mathbf{q}\nu}\delta(\omega-\omega_{\mathbf{q}\nu})
$$

で定義され、比熱や自由エネルギーの積分表示に用いられる。


## 3. フォノンが支配する熱力学量

調和近似のもとで、各モード $(\mathbf{q}\nu)$ は量子調和振動子であり、分配関数から自由エネルギーが求まる。体積一定のフォノン自由エネルギーは

$$
F_{\mathrm{ph}}(T)
= \sum_{\mathbf{q}\nu}
\left[
\frac{1}{2}\hbar\omega_{\mathbf{q}\nu}
+ k_{\mathrm{B}}T\ln\left(1-e^{-\hbar\omega_{\mathbf{q}\nu}/k_{\mathrm{B}}T}\right)
\right]
$$

内部エネルギーは

$$
U_{\mathrm{ph}}(T)
=
\sum_{\mathbf{q}\nu}
\left[
\frac{1}{2}\hbar\omega_{\mathbf{q}\nu}
+ \hbar\omega_{\mathbf{q}\nu}\,n_{\mathrm{B}}(\omega_{\mathbf{q}\nu},T)
\right]
$$

であり、ボース分布
$$
n_{\mathrm{B}}(\omega,T)=\frac{1}{e^{\hbar\omega/k_{\mathrm{B}}T}-1}
$$
を用いた。

比熱（体積一定）は

$$
C_V(T)=\left(\frac{\partial U_{\mathrm{ph}}}{\partial T}\right)_V
=
k_{\mathrm{B}}\sum_{\mathbf{q}\nu}
\left(\frac{\hbar\omega_{\mathbf{q}\nu}}{k_{\mathrm{B}}T}\right)^2
\frac{e^{\hbar\omega_{\mathbf{q}\nu}/k_{\mathrm{B}}T}}
{\left(e^{\hbar\omega_{\mathbf{q}\nu}/k_{\mathrm{B}}T}-1\right)^2}
$$

低温極限ではデバイ模型により $C_V\propto T^3$ が導かれ、高温極限ではデュロン＝プティ則 $C_V\to 3Nk_{\mathrm{B}}$ に近づくのである。


## 4. 準調和近似と熱膨張・圧力依存

調和近似は「平衡位置まわりの 2 次展開」を固定体積で扱うため、温度による格子定数変化（熱膨張）をそのままは再現しない。準調和近似（QHA）では、フォノン振動数が体積 $V$ に依存することを取り入れ、

$$
F(V,T)=E_0(V)+F_{\mathrm{ph}}(V,T)
$$

を最小化して平衡体積 $V(T)$ を求める。熱膨張係数は

$$
\alpha(T)=\frac{1}{V}\left(\frac{\partial V}{\partial T}\right)_P
$$

で定義され、グリューナイゼン定数

$$
\gamma_{\mathbf{q}\nu}=-\frac{\partial \ln \omega_{\mathbf{q}\nu}}{\partial \ln V}
$$

を用いると、等方近似のもとで

$$
\alpha(T) \approx \frac{1}{B_T V}\sum_{\mathbf{q}\nu}\gamma_{\mathbf{q}\nu} C_{V,\mathbf{q}\nu}(T)
$$

の形で表される（$B_T$ は等温体積弾性率）。負の熱膨張は、あるモードの $\gamma_{\mathbf{q}\nu}<0$ が強く寄与する場合に起こり得るのである。


## 5. 非調和性

### 5.1 非調和項とフォノン自己エネルギー
3 次・4 次の IFC はフォノン間相互作用を与え、フォノンは有限寿命をもつ。フォノン自己エネルギー $\Sigma_{\mathbf{q}\nu}(\omega,T)$ により、実部は周波数の温度依存シフト、虚部は線幅（減衰）を与える：

$$
\omega_{\mathbf{q}\nu}(T) \simeq \omega_{\mathbf{q}\nu}^{(0)} + \Delta\omega_{\mathbf{q}\nu}(T),
\qquad
\Gamma_{\mathbf{q}\nu}(T) = -\mathrm{Im}\,\Sigma_{\mathbf{q}\nu}(\omega,T)
$$

寿命 $\tau_{\mathbf{q}\nu}$ はしばしば

$$
\tau_{\mathbf{q}\nu} \approx \frac{1}{2\Gamma_{\mathbf{q}\nu}}
$$

で結び付けられる。

### 5.2 三フォノン散乱とエネルギー・運動量保存
三フォノン過程では
- 崩壊：$\mathbf{q}\nu \to \mathbf{q}_1\nu_1 + \mathbf{q}_2\nu_2$
- 合体：$\mathbf{q}\nu + \mathbf{q}_1\nu_1 \to \mathbf{q}_2\nu_2$

が起こり、結晶運動量保存は
$$
\mathbf{q} \pm \mathbf{q}_1 = \mathbf{q}_2 + \mathbf{G}
$$
（$\mathbf{G}$ は逆格子ベクトル）で与えられる。$\mathbf{G}\neq 0$ を含む過程は Umklapp 散乱であり、熱抵抗を生む主要因となり得るのである。

### 5.3 強非調和・量子核効果
軽元素系や高温・高圧相では、調和近似や準調和近似が破綻し、自己無撞着フォノン理論（SCP）などの非摂動的手法が必要となる場合がある。ゼロ点振動や量子ゆらぎが構造安定性に本質的役割を果たす系も存在するのである。


## 6. 格子熱伝導率とフォノン輸送

### 6.1 基本式：比熱・群速度・寿命
格子熱伝導率 $\boldsymbol{\kappa}_{\mathrm{L}}$ は、フォノンが運ぶエネルギー流束の線形応答として定義される。緩和時間近似（RTA）では

$$
\kappa_{\mathrm{L},ij}
=
\frac{1}{V}\sum_{\mathbf{q}\nu}
C_{\mathbf{q}\nu}(T)\,v_{\mathbf{q}\nu,i}\,v_{\mathbf{q}\nu,j}\,\tau_{\mathbf{q}\nu}(T)
$$

が基本式である。ここで $C_{\mathbf{q}\nu}(T)$ はモード比熱、$v_{\mathbf{q}\nu,i}$ は群速度成分、$\tau_{\mathbf{q}\nu}$ は寿命である。

等方近似では、しばしば

$$
\kappa_{\mathrm{L}} \approx \frac{1}{3}\sum_{\mathbf{q}\nu} C_{\mathbf{q}\nu} v_{\mathbf{q}\nu}^2 \tau_{\mathbf{q}\nu}
$$

と書かれる。平均自由行程は $\ell_{\mathbf{q}\nu}=v_{\mathbf{q}\nu}\tau_{\mathbf{q}\nu}$ である。

### 6.2 散乱機構
寿命には内因性・外因性の散乱が寄与し得る。

- 内因性：フォノン非調和性（主に三フォノン、場合により四フォノン）
- 外因性：同位体散乱、点欠陥散乱、転位、粒界・界面散乱、ナノ構造散乱

単純化した表現として

$$
\tau^{-1} = \tau^{-1}_{\mathrm{anh}} + \tau^{-1}_{\mathrm{iso}} + \tau^{-1}_{\mathrm{def}} + \tau^{-1}_{\mathrm{bdry}} + \cdots
$$

の形で議論されることが多い。

### 6.3 結晶と非晶質の差
非晶質では波数 $\mathbf{q}$ による良い量子数が失われ、フォノン準粒子像が弱くなる領域が生じる。この場合、振動モードの拡散的輸送（diffusons）や局在（locons）など、別の記述（例：Allen–Feldman 型の枠組み）が必要になる場合があるのである。


## 7. 電子格子相互作用

### 7.1 電子フォノン結合と Eliashberg 関数
電子フォノン結合は、電子状態 $|n\mathbf{k}\rangle$ とフォノン $(\mathbf{q}\nu)$ の相互作用行列要素 $g$ により表される。等方的な超伝導理論では、Eliashberg スペクトル関数 $\alpha^2F(\omega)$ が導入され、

$$
\lambda = 2\int_0^{\infty}\frac{\alpha^2F(\omega)}{\omega}\,d\omega
$$

が電子フォノン結合定数となる。

### 7.2 超伝導転移温度（フォノン媒介）
フォノン媒介超伝導の近似式として、Allen–Dynes（McMillan の改良）形式が用いられることが多い：

$$
T_c = \frac{\omega_{\log}}{1.2}
\exp\left[
-\frac{1.04(1+\lambda)}{\lambda-\mu^{\ast}(1+0.62\lambda)}
\right]
$$

ここで $\omega_{\log}$ は対数平均フォノン周波数、$\mu^{\ast}$ はクーロン擬ポテンシャルである。軽元素（水素）を含む高圧水素リッチ化合物は高い $\omega$ と大きい結合により高 $T_c$ を示し得るが、同時に格子安定性や量子核効果が強く関与するのである。

### 7.3 Kohn 異常と電荷密度波
フェルミ面のネスティング等により、特定の $\mathbf{q}$ でフォノンが軟化する Kohn 異常が現れることがある。これは電子フォノン相互作用が強いことの指標となり、電荷密度波（CDW）や構造相転移と関係し得るのである。


## 8. 極性結晶：LO–TO 分裂と非解析項

イオン性・極性結晶では、長距離クーロン相互作用により $\mathbf{q}\to 0$ 近傍で LO（縦光学）と TO（横光学）が分裂する。これを取り込むために、動力学行列に非解析項 $D^{\mathrm{NA}}$ を加える：

$$
D(\mathbf{q}\to 0) = D^{\mathrm{SR}}(\mathbf{q}) + D^{\mathrm{NA}}(\mathbf{q})
$$

非解析項は Born 有効電荷テンソル $Z^{\ast}_{\kappa,\alpha\beta}$ と高周波誘電率テンソル $\varepsilon_{\infty}$ を用いて表される（方向依存を含む）。この効果は赤外活性モード、誘電応答、強誘電相転移の議論に重要である。


## 9. 第一原理フォノン計算：力定数の求め方と手法比較

フォノン分散 $\omega_{\mathbf{q}\nu}$ の計算は、要約すれば「2 次 IFC を得て動力学行列を対角化する」問題である。第一原理的には IFC は電子状態の応答を通じて決まり、主に 2 系統の方法が広く用いられる。

### 9.1 有限変位法（スーパーセル法）
原子を微小変位 $\Delta u$ させて生じる力 $\mathbf{F}$ を第一原理計算で求め、線形関係から IFC を回収する：

$$
F_{\kappa\alpha} = -\sum_{\kappa'\beta}\Phi_{\kappa\alpha,\kappa'\beta}\,u_{\kappa'\beta}
$$

多数の変位パターンを用いると、行列として

$$
\mathbf{F} = -\mathbf{U}\mathbf{P}
$$

の形へ整理でき、$\mathbf{P}$（IFC）の最小二乗推定が可能となる。結晶対称性を用いて必要な変位数を減らすことが計算効率に直結する。

### 9.2 密度汎関数摂動論（DFPT）
DFPT は電子密度の一次応答を直接解き、フォノンの二次微分（力定数）を波数空間で求める線形応答理論である。スーパーセルを不要とし、$\mathbf{q}$ 点ごとにフォノンを計算できる利点がある。一方で金属の収束（スメアリング等）や実装依存の差異が結果へ影響し得るため、数値条件の吟味が重要となるのである。

### 9.3 手法比較

| 観点 | 有限変位法（スーパーセル） | DFPT（線形応答） |
|---|---|---|
| 基本量 | 変位→力から IFC を回収 | 電子密度の一次応答から IFC を直接 |
| モデル | 実空間 IFC → $D(\mathbf{q})$ | $\mathbf{q}$ 点で直接フォノン |
| 計算規模 | スーパーセルが大きいほど重い | $\mathbf{q}$ 点数に比例して増える |
| 非調和 IFC（3 次など） | 変位パターンを拡張して求めやすい | 高次応答は実装が限られることが多い |
| 材料適性 | 一般に幅広い（絶縁体・金属） | 金属・極性系も扱えるが収束に注意 |
| 代表的なソフト | phonopy, phono3py など | Quantum ESPRESSO, ABINIT など |


## 10. 実験で観測されるフォノンと理論量の対応

### 10.1 分散と線幅
- 非弾性中性子散乱（INS）：$\omega(\mathbf{q})$、動的構造因子 $S(\mathbf{q},\omega)$ を通じてフォノン分散・寿命を観測する。
- 非弾性 X 線散乱（IXS）：薄膜・微小試料でもフォノン分散を観測し得る。
- ラマン・赤外分光：$\Gamma$ 点近傍の光学モード、選択則に従う活性モードを観測する。

### 10.2 熱物性
- 比熱：$C_V(T)$（あるいは $C_P$）からフォノン DOS やデバイ温度の情報を得る。
- 熱伝導：$\kappa(T)$ の温度依存から散乱機構（境界・欠陥・Umklapp など）を推定する。
- 熱膨張：$\alpha(T)$ と弾性率からグリューナイゼン的関係を検証する。

理論側では、分散、DOS、モードグリューナイゼン定数、寿命、電子フォノン結合などを通じて実験量へ接続されるのである。


## 11. フォノンデータ共有とデータベース

第一原理計算の普及により、フォノン分散や DOS を公開・共有する試みが増えている。代表例として、フォノン分散を材料データベース上で可視化・配布する仕組み、計算条件とともにデータセットを公開するリポジトリ、フォノン可視化ツール群が整備されつつある。これにより、計算結果の比較検証、材料探索、教育用途の利用が進むのである。

- フォノン分散のオンライン可視化：分散曲線・モードの可視化と共有
- データセット公開：入力構造、計算条件、出力（分散・DOS・熱力学量）を一体で提供


## 12. 用語整理

- 力定数（IFC）：エネルギーの変位に関する 2 次微分。調和フォノンを決める基本量である。
- 動力学行列：質量で規格化した IFC のフーリエ変換。固有値が $\omega^2$ を与える。
- フォノン DOS：$\omega$ に対するモード数分布。比熱・自由エネルギーの積分に現れる。
- 準調和近似：$\omega(V)$ を介して熱膨張を取り込む近似である。
- 非調和性：3 次以上の IFC に由来する相互作用。寿命・熱伝導・温度依存シフトを与える。


## まとめと展望

フォノン物性は、調和近似に基づく動力学行列の固有値問題を起点として、熱力学（$F,U,S,C_V$）、準調和近似による熱膨張、非調和性による寿命と熱伝導、電子格子相互作用による超伝導や抵抗へと体系的に拡張されるのである。近年は非調和の強い系や量子核効果が支配的な系へ対象が広がり、自己無撞着フォノン理論、四フォノン散乱、第一原理分子動力学、機械学習ポテンシャルの活用などにより、有限温度・非平衡・複雑構造を含む現実材料の定量予測が前進している。

今後は、実験（INS/IXS/分光/熱測定）と計算（非調和・電子格子相互作用・データベース）を緊密に結び付け、材料設計へ直結する「輸送の分解（モード別寄与）」「不確かさの定量化」「データ共有の標準化」が重要になる展望である。


### 関連文献・資料

- phonopy 公式ドキュメント（有限変位法・設定・定式化）
  https://phonopy.github.io/phonopy/formulation.html
  https://phonopy.github.io/phonopy/vasp.html

- W. Li et al., ShengBTE: A solver of the Boltzmann transport equation for phonons, Comput. Phys. Commun. 185, 1747 (2014).
  https://www.sciencedirect.com/science/article/abs/pii/S0010465514000484

- NEDO プレスリリース：熱伝導率計算ソフトウェア開発（2020）
  https://www.nedo.go.jp/news/press/AA5_101278.html

- SPring-8 プレスリリース：薄膜中の熱輸送とフォノン散乱（2018）
  https://www.spring8.or.jp/ja/news_publications/press_release/2018/180611/

- NIMS プレスリリース：高圧ランタン水素と量子固体（2020）
  https://www.nims.go.jp/press/2020/02/202002060.html

- 広島大学 講義ノート（固体物理：フォノン入門を含む）
  https://home.hiroshima-u.ac.jp/ino/lecture/SSP1note3_ino2017.pdf

- 京都大学リポジトリ：フォノン物性入門（2000）
  https://repository.kulib.kyoto-u.ac.jp/bitstream/2433/96914/1/KJ00004711285.pdf

- Materials Project（フォノン分散の方法論）
  https://docs.materialsproject.org/methodology/materials-methodology/phonon-dispersion

- NIMS MDR phonon calculation database（データセット例）
  https://mdr.nims.go.jp/collections/8g84ms862
