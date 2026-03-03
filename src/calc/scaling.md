# 臨界現象とスケーリング則
臨界点近傍では、相関長が発散し、巨視的な物性が少数の指数と関数形で記述される。スケーリング則は、その記述を一貫させ、普遍性とくりこみ群の固定点像へ接続する言語である。

### 参考ドキュメント
1. K. G. Wilson, Renormalization group and critical phenomena I, Phys. Rev. B 4, 3174 (1971).
   https://link.aps.org/doi/10.1103/PhysRevB.4.3174
2. M. E. Fisher and M. N. Barber, Scaling theory for finite-size effects in critical phenomena, Phys. Rev. Lett. 28, 1516 (1972).
   https://link.aps.org/doi/10.1103/PhysRevLett.28.1516
3. 大矢雅則, 有限サイズスケーリングと相転移（日本語講義ノート, 日本大学）
   https://www.phys.cst.nihon-u.ac.jp/~ohya/finite_size_scaling.pdf

## 1. 臨界点と長距離相関

相転移点の近傍では、秩序変数の揺らぎが長距離にわたり相関し、相関長 $\xi$ が発散する。温度の相対ずれを
$$
t=\frac{T-T_{c}}{T_{c}}
$$
とすると、連続相転移（2次相転移）では
$$
\xi(t)\sim \xi_{0}^{\pm}\,|t|^{-\nu}
$$
が成立する。ここで $\nu$ は臨界指数、$\pm$ は $t>0$ と $t<0$ の側を表す。

相関関数 $G(\mathbf{r})=\langle \phi(\mathbf{r})\phi(\mathbf{0})\rangle-\langle \phi\rangle^{2}$ は、臨界点から離れると
$$
G(r)\sim \frac{e^{-r/\xi}}{r^{d-2+\eta}}
$$
の形で減衰することが多い。臨界点 $t=0$ では指数関数的減衰が消え、
$$
G(r)\sim \frac{1}{r^{d-2+\eta}}
$$
のようなべき減衰が現れる。ここで $\eta$ は異常次元に対応する指数である。

磁性体を例にとると、秩序変数は磁化密度 $m$、外場は磁場 $H$（あるいはその無次元化 $h$）であり、臨界点近傍の非解析性が比熱、磁化、感受率などに現れる。



## 2. 臨界指数の定義

熱力学ポテンシャルとして、単位体積あたりの自由エネルギー密度 $f(t,h)$（特異部分を $f_{s}$ とする）を考える。磁性体では
$$
m(t,h)=-\frac{\partial f}{\partial h},\qquad
\chi(t,h)=\frac{\partial m}{\partial h}=-\frac{\partial^{2}f}{\partial h^{2}}
$$
が成り立つ。

連続相転移でよく用いられる臨界指数の定義は次である。

比熱
$$
C(t)\sim A^{\pm}|t|^{-\alpha}
$$

自発磁化（秩序相側）
$$
m(t,0)\sim B\,(-t)^{\beta}\qquad (t<0)
$$

磁化率（無外場）
$$
\chi(t,0)\sim \Gamma^{\pm}|t|^{-\gamma}
$$

臨界等温線（$t=0$）
$$
m(0,h)\sim D\,|h|^{1/\delta}
$$

相関長
$$
\xi(t)\sim \xi_{0}^{\pm}|t|^{-\nu}
$$

臨界点相関（前節）
$$
G(r)\sim r^{-(d-2+\eta)}
$$

ここで $A^{\pm},\Gamma^{\pm},\xi_{0}^{\pm}$ などは非普遍な振幅である。一方で、振幅比（例：$\Gamma^{+}/\Gamma^{-}$）は普遍量となる場合がある。



## 3. スケーリング仮説

### 3.1 特異自由エネルギーの同次性

スケーリング仮説は、特異自由エネルギーが適切な再尺度化で同次関数として振る舞うという主張である。空間次元を $d$ とし、再尺度化因子 $b>1$ を導入すると、
$$
f_{s}(t,h)=b^{-d}\,f_{s}(t\,b^{y_{t}},\,h\,b^{y_{h}})
$$
の形を仮定する。ここで $y_{t},y_{h}$ はそれぞれ温度様・磁場様摂動のスケーリング次元である。

この式から、例えば $b=|t|^{-1/y_{t}}$ を選ぶと
$$
f_{s}(t,h)=|t|^{d/y_{t}}\,\Phi_{\pm}\!\left(\frac{h}{|t|^{y_{h}/y_{t}}}\right)
$$
と書ける。これがスケーリング関数表示であり、臨界指数とスケーリング関係式を導く起点となる。

### 3.2 Widom型の状態方程式

磁化のスケーリング形は
$$
m(t,h)=|t|^{\beta}\,M_{\pm}\!\left(\frac{h}{|t|^{\beta\delta}}\right)
$$
のように表せる。この表示は、$t\to 0$ の極限で臨界等温線 $m\sim h^{1/\delta}$ を自然に含む。

### 3.3 スケーリング関係式

同次性から、臨界指数間に次の関係式が導かれる。

Rushbrooke
$$
\alpha+2\beta+\gamma=2
$$

Widom
$$
\gamma=\beta(\delta-1)
$$

Fisher
$$
\gamma=(2-\eta)\nu
$$

Josephson（ハイパースケーリング）
$$
2-\alpha=d\nu
$$

ただし、ハイパースケーリングは上部臨界次元 $d_{c}$ を超えると破れることがある。Ising型の $\phi^{4}$ 理論では $d_{c}=4$ であり、$d\ge 4$ では平均場指数が支配的になり、危険な無関係変数によりスケーリングの形が修正され得る。



## 4. 普遍性とくりこみ群

### 4.1 ブロック化と固定点

くりこみ群（RG）では、短距離自由度を粗視化して有効理論を作り、パラメータの流れを追う。粗視化と再尺度化の合成変換 $R_{b}$ により、結合定数の集合 $\{g_{i}\}$ が
$$
\{g_{i}\}\ \to\ \{g_{i}'\}=R_{b}(\{g_{i}\})
$$
と写る。固定点 $\{g_{i}^{*}\}$ は $R_{b}(\{g_{i}^{*}\})=\{g_{i}^{*}\}$ を満たし、臨界現象は固定点近傍の線形化で支配される。

線形化すると
$$
g_{i}'-g_{i}^{*}=\sum_{j}M_{ij}(g_{j}-g_{j}^{*})
$$
となり、固有値 $\lambda_{k}=b^{y_{k}}$ を用いて
$$
g_{k}'-g_{k}^{*}=b^{y_{k}}(g_{k}-g_{k}^{*})
$$
と書ける。$y_{k}>0$ は関係摂動、$y_{k}<0$ は無関係摂動、$y_{k}=0$ は周辺摂動である。臨界指数は主要な関係摂動の指数 $y_{t},y_{h}$ と、場の異常次元（$\eta$）から定まる。

### 4.2 $\epsilon$ 展開と上部臨界次元

Ising普遍性の連続場理論として $\phi^{4}$ 理論を考えると、$d=4-\epsilon$ の近傍で摂動展開が可能となり、$\epsilon$ 展開により臨界指数が系統的に計算される。この枠組みは Wilson–Fisher により確立され、普遍性の理論的基盤を与えた。



## 5. 有限サイズスケーリング

有限系（線形サイズ $L$）では $\xi$ が $L$ を超えて発散できないため、臨界近傍の特異性は丸められる。有限サイズスケーリング（FSS）は、その丸められ方が普遍的であることを用いて、数値計算や微小試料の実験から臨界指数を推定する方法である。

特異自由エネルギーの有限サイズ版は
$$
f_{s}(t,h;L)=L^{-d}\,\mathcal{F}\!\left(tL^{1/\nu},\,hL^{y_{h}}\right)
$$
と表される。ここから、無外場の磁化や感受率は
$$
m(t,0;L)=L^{-\beta/\nu}\,\mathcal{M}\!\left(tL^{1/\nu}\right),
$$
$$
\chi(t,0;L)=L^{\gamma/\nu}\,\mathcal{X}\!\left(tL^{1/\nu}\right)
$$
の形をとる。

臨界点の推定には Binder 比（Binder cumulant）
$$
U_{4}=1-\frac{\langle m^{4}\rangle}{3\langle m^{2}\rangle^{2}}
$$
が広く用いられる。$U_{4}$ は $L$ に対する依存が小さく、異なる $L$ の曲線が $T_{c}$ 近傍で交差する性質をもつ。交差点のサイズ依存を補正するため、補正指数 $\omega$ を含めた
$$
U_{4}(t;L)=\mathcal{U}(tL^{1/\nu})+L^{-\omega}\mathcal{U}_{1}(tL^{1/\nu})+\cdots
$$
のような補正付きフィットが用いられる。

有限サイズスケーリングを用いる作業では、統計誤差の自己相関、臨界減速による独立サンプル数の実効低下、補正項の無視による系統誤差が主要な不確かさの原因となる。データ崩壊（同じスケーリング変数で曲線が重なること）を確認する場合も、目視の印象に依存せず、フィット残差やブートストラップにより再現性を点検することが重要である。



## 6. 動的臨界現象と動的スケーリング

静的スケーリングに加え、時間スケールも臨界点で発散する。緩和時間 $\tau$ は
$$
\tau\sim \xi^{z}\sim |t|^{-\nu z}
$$
と振る舞い、$z$ を動的臨界指数と呼ぶ。$\tau$ の発散は臨界減速の原因であり、数値計算では自己相関時間の増大として現れる。

動的普遍性は、秩序変数の保存則や流体力学的モードとの結合により分類される。Hohenberg–Halperin の分類（Model A, B, C, …）では、同じ静的普遍性でも動的指数 $z$ が異なり得る。

動的スケーリング形として、例えば時間依存相関関数は
$$
C(r,t)=r^{-(d-2+\eta)}\,\mathcal{C}\!\left(\frac{r}{\xi},\,\frac{t}{\tau}\right)
$$
のように書ける。



## 7. 非平衡横断と Kibble–Zurek スケーリング

制御パラメータを有限速度で臨界点を横断すると、臨界減速により系は断熱追随できず、欠陥やドメインが形成される。Kibble–Zurek 機構では、横断速度（クエンチ率）により凍結スケールが定まる。

線形クエンチ
$$
t(t_{\mathrm{lab}})=\frac{t_{\mathrm{lab}}}{\tau_{Q}}
$$
を仮定すると、凍結相関長 $\hat{\xi}$ と凍結時間 $\hat{\tau}$ は
$$
\hat{\xi}\sim \tau_{Q}^{\nu/(1+\nu z)},\qquad
\hat{\tau}\sim \tau_{Q}^{\nu z/(1+\nu z)}
$$
となり、欠陥密度 $n$ は概ね $n\sim \hat{\xi}^{-d}$ の冪則で与えられる。これは臨界指数と動的指数が非平衡生成物のスケーリングを決める例である。



## 8. 低次元とトポロジカル転移

二次元系では、対称性と次元の制約により長距離秩序が成立しない場合がある（Mermin–Wagner 定理）。一方で XY 模型では Kosterlitz–Thouless（BKT）転移が起こり、相関長は冪でなく本質的特異性
$$
\xi \sim \exp\!\left(\frac{b}{\sqrt{|t|}}\right)
$$
のように発散する。この場合、通常の臨界指数の枠組みはそのまま適用できず、スケーリング変数や有限サイズ効果の扱いも BKT 向けに組み替える必要がある。



## 9. 量子臨界現象とスケーリング

零温度の量子相転移では、時間方向が追加次元として働き、空間次元 $d$ と動的指数 $z$ により有効次元 $d+z$ が現れる。有限温度では量子臨界領域が形成され、自由エネルギー密度の特異部分が
$$
f_{s}(g,T)\sim T^{(d+z)/z}\,\mathcal{F}\!\left(\frac{g-g_{c}}{T^{1/(\nu z)}}\right)
$$
のようにスケールする。ここで $g$ は量子制御パラメータである。

近年は、量子臨界近傍の輸送や動的応答の普遍性、数値計算と場の理論の高精度比較が活発である。国内でも、機械学習を用いて実データからくりこみ変換を逆に推定する試みなど、臨界現象の解析手法そのものを拡張する研究発信が行われている。



## 10. 指数値の例と整理

以下に、代表的な普遍性クラスの臨界指数の例を示す。値は理論・数値・実験の積み上げで高精度化されており、特に 3D Ising は共形ブートストラップと高精度モンテカルロで整合が進んでいる。

| 普遍性クラス | 次元 | $\alpha$ | $\beta$ | $\gamma$ | $\nu$ | $\eta$ | 備考 |
|---|---:|---:|---:|---:|---:|---:|---|
| Ising | 2 | 0（対数） | 1/8 | 7/4 | 1 | 1/4 | 厳密解・CFT |
| Ising | 3 | 0.110 付近 | 0.326 付近 | 1.237 付近 | 0.630 付近 | 0.036 付近 | 高精度数値・ブートストラップ |
| 平均場（Landau） | $d\ge d_{c}$ | 0 | 1/2 | 1 | 1/2 | 0 | $d_{c}=4$（$\phi^{4}$） |
| XY（BKT） | 2 | なし | なし | なし | 本質的特異性 | 1/4（臨界線上） | BKT 特有 |

指数の数表を用いる場合、材料やモデルがどの普遍性に属するかを、対称性、秩序変数の次元、保存則、相互作用の有効距離（長距離相互作用の有無）で吟味する必要がある。また、有限系・不純物・異方性・結合の競合があると交差現象が起こり、有限温度窓では見かけの指数がずれることがある。



## 11. 実験・数値解析での扱い

### 11.1 背景成分と特異成分の分離

比熱や感受率などには解析的背景が重なり、観測量 $O(T)$ は
$$
O(T)=O_{\mathrm{reg}}(T)+O_{s}(T)
$$
と分解されることが多い。スケーリングは $O_{s}$ を記述するため、背景の扱い（多項式近似、既知の非特異項の差し引き）が指数推定に直結する。

### 11.2 補正項と交差現象

有限サイズ、無関係演算子、弱い異方性などにより、観測量は
$$
O(t;L)=L^{x/\nu}\Bigl[\mathcal{O}(tL^{1/\nu})+L^{-\omega}\mathcal{O}_{1}(tL^{1/\nu})+\cdots\Bigr]
$$
のように補正を受ける。補正項を無視すると、フィット範囲の選び方で指数が漂う。補正指数 $\omega$ を含めた同時フィット、あるいはサイズを増やし補正が小さい領域に寄せる方針が必要である。

### 11.3 誤差評価

モンテカルロでは系列データの自己相関により、単純な標準誤差評価が破綻する。ブロッキング法や自己相関時間推定により独立サンプル数を見積もり、ブートストラップでフィットの揺らぎを評価することが望ましい。実験では試料非一様性や温度安定性が系統誤差源となり、測定条件の再現性が指数推定の信頼性を左右する。



## 12. まとめと展望

臨界現象は、相関長の発散により、物性がスケーリング変数と臨界指数で記述される現象である。スケーリング則は指数間の拘束を与え、くりこみ群の固定点像により普遍性が説明される。

今後は、静的・動的スケーリングの高精度検証に加え、量子臨界、非平衡横断、長距離相互作用、乱れやフラストレーションを含む系での普遍性の整理が進むと考えられる。さらに、共形ブートストラップ、テンソルネットワーク、機械学習による粗視化推定などが合流し、臨界点近傍の有効理論同定と実験データ解析の接続がより体系化されていく見通しである。


## その他参考
- K. G. Wilson and M. E. Fisher, Critical exponents in 3.99 dimensions, Phys. Rev. Lett. 28, 240 (1972).
  https://link.aps.org/doi/10.1103/PhysRevLett.28.240
- K. G. Wilson and J. Kogut, The renormalization group and the $\epsilon$ expansion, Rev. Mod. Phys. 46, 773 (1974).
  https://link.aps.org/doi/10.1103/RevModPhys.46.773
- P. C. Hohenberg and B. I. Halperin, Theory of dynamic critical phenomena, Rev. Mod. Phys. 49, 435 (1977).
  https://courses.physics.ucsd.edu/2019/Fall/physics239/GOODIES/HH77.pdf
- J. M. Kosterlitz and D. J. Thouless, Ordering, metastability and phase transitions in two-dimensional systems, J. Phys. C 6, 1181 (1973).
  https://courses.physics.ucsd.edu/2012/Winter/physics239a/lectures/KTpaper.pdf
- K. Hukushima, Scaling theory and methods for numerical simulation of phase transitions, J. Phys. Soc. Jpn. 76, 114004 (2007).
  https://www.jstage.jst.go.jp/article/jpsj/76/11/76_11_114004/_pdf
- M. Hasenbusch, Finite size scaling study of lattice models in the three-dimensional Ising universality class, Phys. Rev. B 82, 174433 (2010).（arXiv 版）
  https://arxiv.org/abs/1004.4486
- A. del Campo and W. H. Zurek, Universality of Phase Transition Dynamics: Topological Defects from Symmetry Breaking, Int. J. Mod. Phys. A 29, 1430018 (2014).（arXiv 版）
  https://arxiv.org/abs/1310.1600
- A. Pelissetto and E. Vicari, Critical phenomena and renormalization-group theory, Phys. Rep. 368, 549 (2002).（arXiv 版）
  https://arxiv.org/abs/cond-mat/0012164
- A. A. Belavin and collaborators, Survey: The Ising model and its integrability, Symmetry Integrability and Geometry: Methods and Applications 21, 083 (2025).
  https://www.emis.de/journals/SIGMA/2025/083/
- 東京都立大学, 逆くりこみ群により相転移と臨界現象を解明する機械学習を開発（プレスリリース, 2021）
  https://www.tmu.ac.jp/news/topics/30500.html
