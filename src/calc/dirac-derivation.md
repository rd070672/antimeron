# ディラック方程式の導出と有効模型

ディラック方程式は、特殊相対論と量子力学を両立させつつ、スピン1/2粒子の自由度を自然に含む最小の波動方程式である。導出の要点は、相対論的エネルギー運動量関係を「時間に一次」の形へ線形化し、その整合条件としてスピノルと行列代数（クリフォード代数）が現れる点にある。

## 参考ドキュメント
- P. A. M. Dirac, The Quantum Theory of the Electron, Proceedings of the Royal Society A 117, 610–624 (1928)
  https://royalsocietypublishing.org/doi/10.1098/rspa.1928.0023
- 電子情報通信学会 知識ベース, 10章 相対論的波動方程式（ディラック方程式の導出を含む, 日本語, PDF）
  https://www.ieice-hbkb.org/files/12/12gun_05hen_10.pdf
- 東京大学OCW, 量子力学第3：相対論的量子力学（Dirac行列・反交換関係など, 日本語PDF）
  https://ocw.u-tokyo.ac.jp/lecture_files/engin_07/2/notes/ja/qm3_chap2_j.pdf


## 0. 記号と前提
ここでは $c$ を光速、$\hbar$ を換算プランク定数とする。4元ベクトルを
- $x^{\mu}=(ct,\mathbf{x})$
- $\partial_{\mu}=\left(\frac{1}{c}\frac{\partial}{\partial t},\nabla\right)$
とし、計量は $g^{\mu\nu}=\mathrm{diag}(1,-1,-1,-1)$ を用いる。

電磁ポテンシャルは
- $A^{\mu}=(\phi/c,\mathbf{A})$
で表す。電荷は $q$ とする。

## 1. 相対論的分散関係と量子化
自由粒子の相対論的関係式は
$$
E^2 = \mathbf{p}^2c^2 + m^2c^4
$$
である。量子化により
$$
E \to i\hbar \frac{\partial}{\partial t},\qquad
\mathbf{p}\to -i\hbar \nabla
$$
と置くと、最も素朴にはクライン＝ゴルドン方程式が得られる。

### 1.1 クライン＝ゴルドン方程式
上式をそのまま作用素として波動関数 $\psi$ に課すと
$$
\left(\frac{1}{c^2}\frac{\partial^2}{\partial t^2}-\nabla^2+\frac{m^2c^2}{\hbar^2}\right)\psi=0
$$
となる。これは相対論的に正しいが、確率密度の解釈が単純ではない（密度が正定とは限らない）という点が単粒子量子力学としての扱いを難しくする。さらに、時間に二階であるため初期条件の与え方もシュレーディンガー型と異なる。

この困難を避ける方針として、時間微分が一次で、かつ相対論的分散関係と両立する方程式を構成する動機が生じる。

## 2. ディラックの要請：時間に一次の相対論的波動方程式
ディラックの中心的着想は、ハミルトニアンを運動量に一次で書くことである。すなわち
$$
E = c\,\boldsymbol{\alpha}\cdot \mathbf{p} + \beta mc^2
$$
を作用素として実現し、
$$
i\hbar \frac{\partial}{\partial t}\psi
=
\left(c\,\boldsymbol{\alpha}\cdot \hat{\mathbf{p}} + \beta mc^2\right)\psi
$$
という時間一次の方程式を狙う。ここで $\boldsymbol{\alpha}=(\alpha_x,\alpha_y,\alpha_z)$ と $\beta$ は、数ではなく行列として選ぶ必要がある。

### 2.1 線形化の整合条件（反交換関係）
上の式を2回作用させてクライン＝ゴルドン型（すなわち $E^2-\mathbf{p}^2c^2-m^2c^4=0$）に一致させるためには、
$$
\left(c\,\boldsymbol{\alpha}\cdot \mathbf{p} + \beta mc^2\right)^2
=
\mathbf{p}^2c^2 + m^2c^4
$$
が成り立つ必要がある。展開すると交差項が消える条件として
$$
\{\alpha_i,\alpha_j\}=2\delta_{ij}I,\qquad
\{\alpha_i,\beta\}=0,\qquad
\beta^2=I
$$
が要請される（$\{A,B\}=AB+BA$、$I$ は単位行列）。ここに、スピンと反粒子の自由度を担う代数構造が現れる。

この反交換関係を満たす最小次元の表現は $4\times 4$ 行列であり、波動関数 $\psi$ は4成分スピノルとなる（これが「スピン1/2の2自由度」だけでは終わらない理由である）。

## 3. ガンマ行列とローレンツ共変な形
上の形式は時間と空間を分けた書き方である。ローレンツ共変性を明示するためにガンマ行列 $\gamma^{\mu}$ を導入する。

### 3.1 定義
ディラック表現の一例として
$$
\gamma^0=\beta,\qquad
\gamma^i=\beta\alpha_i\quad (i=1,2,3)
$$
と置くと、反交換関係は
$$
\{\gamma^{\mu},\gamma^{\nu}\}=2g^{\mu\nu}I
$$
とまとめられる。これはミンコフスキー空間のクリフォード代数である。

### 3.2 共変形（自由粒子）
ディラック方程式は
$$
\left(i\hbar c\,\gamma^{\mu}\partial_{\mu}-mc^2\right)\psi=0
$$
と書ける。時間一次であり、同時にローレンツ変換に対して共変である。

## 4. 保存電流と正定値密度
ディラック方程式の重要な利点は、保存則が自然に得られ、かつ密度が正定値になる形を与える点である。

### 4.1 随伴スピノル
随伴を
$$
\bar{\psi}=\psi^{\dagger}\gamma^0
$$
で定義する。

### 4.2 連続の式
ディラック方程式とその随伴式から
$$
\partial_{\mu}j^{\mu}=0
$$
が導かれる。ただし
$$
j^{\mu}=c\,\bar{\psi}\gamma^{\mu}\psi
$$
である。特に
$$
\rho=j^0=\psi^{\dagger}\psi \ge 0
$$
が成り立ち、確率密度の解釈が安定する。

## 5. 電磁場との結合：最小結合とゲージ対称性
電磁場中では、運動量を
$$
p_{\mu}\to p_{\mu}-qA_{\mu}
$$
と置き換える（最小結合）。共変微分
$$
D_{\mu}=\partial_{\mu}+\frac{i q}{\hbar}A_{\mu}
$$
を用いると、
$$
\left(i\hbar c\,\gamma^{\mu}D_{\mu}-mc^2\right)\psi=0
$$
が得られる。ここでゲージ変換
$$
A_{\mu}\to A_{\mu}+\partial_{\mu}\chi,\qquad
\psi\to e^{-iq\chi/\hbar}\psi
$$
に対して方程式が同じ形を保つことが、電磁相互作用の構造を強く制限する。

## 6. 平面波解とエネルギーの符号
自由粒子では
$$
\psi \propto u(\mathbf{p})e^{\frac{i}{\hbar}(\mathbf{p}\cdot\mathbf{x}-Et)}
$$
の形を持つ。ここで分散は
$$
E=\pm \sqrt{\mathbf{p}^2c^2+m^2c^4}
$$
となり、負エネルギー解が必然的に現れる。単粒子理論だけで完結させる解釈には限界があり、粒子生成消滅を含む枠組み（場の量子論）への接続が要請される。

一方、固体の2バンド模型では、正負エネルギーに見える2本の分枝は伝導帯と価電子帯として現れ、真空の再解釈ではなく「有効模型」の分散として扱われる。この点が、ディラック方程式が固体中で頻繁に再登場する理由である。

## 7. 非相対論的極限：パウリ方程式と微細構造項
ディラック方程式が固体物性へ深く関与する入口は、非相対論的展開で現れるスピン物理である。速度が十分小さい領域では、上成分（大成分）と下成分（小成分）を分離し、$1/c^2$ で展開することでパウリ型の有効ハミルトニアンが得られる（フォルディ＝ウースハイゼン変換はこの分離を体系化する方法である）。

### 7.1 パウリ型有効ハミルトニアン（静的電磁場の例）
電子の有効ハミルトニアンは概略
$$
H =
\frac{(\mathbf{p}-q\mathbf{A})^2}{2m}
+q\phi
-\frac{(\mathbf{p}-q\mathbf{A})^4}{8m^3c^2}
-\frac{q\hbar}{2m}\boldsymbol{\sigma}\cdot\mathbf{B}
+\frac{q\hbar}{4m^2c^2}\boldsymbol{\sigma}\cdot\left(\mathbf{E}\times(\mathbf{p}-q\mathbf{A})\right)
+\frac{q\hbar^2}{8m^2c^2}\nabla\cdot\mathbf{E}
+\cdots
$$
となる。ここで $\boldsymbol{\sigma}$ はパウリ行列である。各項の意味は次の通りである。

- $-(q\hbar/2m)\boldsymbol{\sigma}\cdot\mathbf{B}$ はゼーマン項であり、$g\simeq 2$ が自然に現れる。
- $\boldsymbol{\sigma}\cdot(\mathbf{E}\times\mathbf{p})$ はスピン軌道相互作用であり、重元素・強い内部電場・反転対称性の破れと結び付く。
- $\nabla\cdot\mathbf{E}$ に比例する項はダーウィン項であり、急峻なポテンシャル変化を持つ領域での有効補正として現れる。

### 7.2 固体物理量との接続
上の展開は原子系だけでなく、結晶中の相対論的補正として同型の構造を持つ。特にスピン軌道相互作用は
- 磁気異方性（結晶場とスピンの結合）
- 逆スピンガルバニック効果やラシュバ効果などのスピントロニクス現象
- トポロジカル相（バンド反転とスピン軌道結合）
と密接である。

## 8. 固体中の有効ディラック方程式：2バンド近似と対称性
固体では、電子は格子周期ポテンシャルの中でブロッホ状態として記述される。バンド端や縮退点近傍では、少数のバンドに射影した有効ハミルトニアンが低エネルギー物理を支配する。その際、
- 時反転対称性
- 空間反転対称性
- 結晶対称性（点群）
の制約から、運動量に一次の項が許されると、ディラック型の線形分散が現れる。

### 8.1 最小の2次元ディラック模型
2次元で最小の形は
$$
H(\mathbf{k})=\hbar v\left(\sigma_x k_x+\sigma_y k_y\right)+m v^2\sigma_z
$$
である。$m=0$ なら質量ゼロ（ギャップレス）のディラック円錐となり、$m\neq 0$ はギャップ（質量項）を与える。固体では $m$ はバンド反転や対称性破れの指標として働く。

### 8.2 バンド反転とトポロジカル相
ある2バンド模型で
$$
m(\mathbf{k})=M-Bk^2
$$
のように運動量依存の「質量項」が反転（符号が変化）すると、連続体極限では境界にギャップレス状態が現れうる。これはトポロジカル絶縁体や量子スピンホール系で用いられる標準的な見取り図である。

## 9. ディラック方程式・関連方程式の比較
| 方程式 | 自由度 | 時間微分 | 代表的密度 | 主要な用途 |
|---|---:|---:|---|---|
| シュレーディンガー方程式 | スカラー（またはスピノル） | 1次 | $|\psi|^2$ | 非相対論的電子、バンド理論の出発点 |
| クライン＝ゴルドン方程式 | スカラー | 2次 | 符号問題を含む | スカラー粒子、場の理論の基礎式の一つ |
| ディラック方程式 | 4成分スピノル | 1次 | $\psi^{\dagger}\psi$ | スピン1/2、相対論的電子、完全相対論近似 |
| パウリ方程式 | 2成分スピノル | 1次 | $\phi^{\dagger}\phi$ | スピンと磁場の結合、弱相対論補正 |
| 有効ディラック模型 | 2成分（擬スピン）など | 1次 | バンド占有に依存 | グラフェン、トポロジカル物質、線形分散系 |

ここで有効ディラック模型の「スピン」は実スピンに限らず、サブ格子自由度や軌道自由度（擬スピン）も含む点が重要である。

## 10. 展開項と現象の対応
| ディラック起源の項 | 形（概略） | 何を表すか | 物質中での帰結の例 |
|---|---|---|---|
| ゼーマン項 | $-\boldsymbol{\sigma}\cdot\mathbf{B}$ | スピン磁気モーメント | g因子、磁気共鳴、スピン分裂 |
| スピン軌道項 | $\boldsymbol{\sigma}\cdot(\mathbf{E}\times\mathbf{p})$ | 運動と内部電場の結合 | 磁気異方性、スピンホール、DMIの起源の一部 |
| ダーウィン項 | $\nabla\cdot\mathbf{E}$ | ザイッターベヴェーグングに由来する補正 | 原子核近傍・重元素での準相対論補正 |
| 質量補正 | $-p^4$ | 相対論的運動エネルギー補正 | 微細構造、フェルミ面近傍補正の一部 |

## 11. 第一原理計算・電子状態計算との関係
固体の電子状態計算では、相対論効果は目的に応じて段階的に取り込まれる。

- スカラー相対論（質量補正・ダーウィン項相当）を入れると、重元素の結合長や準位が大きく改善する。
- スピン軌道相互作用（SOC）を入れると、バンド分裂、磁気異方性、トポロジカル性が決定的に変わる場合がある。
- 完全相対論（ディラック型）を基礎にした定式化では、4成分スピノルを用いるディラック・コーン・シャム方程式として扱われ、重元素化学や精密にSOCを扱う場面へ接続する。

このように、ディラック方程式は「直接解く対象」であると同時に、「どの補正がどこから来るか」を与える設計図としても機能する。

## まとめ
ディラック方程式の導出は、相対論的分散関係を時間一次の形へ線形化し、その整合条件として反交換代数を課すことに尽きる。その結果として4成分スピノル、正定値密度、電磁場との最小結合、そして非相対論的極限におけるスピン軌道相互作用やゼーマン項が自然に現れる。固体では、少数バンドに射影した有効理論としてディラック型ハミルトニアンが頻出し、線形分散、ギャップ（質量項）、対称性、トポロジーが統一的に議論できる枠組みとなる。

## 関連研究
- 東北大学, 相対論的量子力学 講義ノート（日本語, Web）
  https://web.tohoku.ac.jp/masaki-yamada/RQM.html
- 大阪大学 素粒子論研究室, 相対論的量子力学（日本語, PDF）
  https://www-het.phys.sci.osaka-u.ac.jp/~yamaguch/j/pdf/rqmnote.pdf
- Foldy, L. L. and Wouthuysen, S. A., On the Dirac Theory of Spin 1/2 Particles and Its Non-Relativistic Limit (原論文, PDF)
  https://people.ohio.edu/elster/phys735/extras/Foldy_Wouthuysen_orig.pdf
- J. Cayssol, Introduction to Dirac materials and topological insulators, Comptes Rendus Physique 14, 760–778 (2013)
  https://comptes-rendus.academie-sciences.fr/physique/articles/10.1016/j.crhy.2013.09.012/
- B. A. Bernevig, T. L. Hughes, S.-C. Zhang, Quantum Spin Hall Effect and Topological Phase Transition in HgTe Quantum Wells (2006, arXiv PDF)
  https://arxiv.org/pdf/cond-mat/0611399
- J. Phys. Soc. Jpn., Recent Progress in the Study of Topological Semimetals (2018)
  https://journals.jps.jp/doi/10.7566/JPSJ.87.041001?mobileUi=0
- 東北大学プレスリリース, 物質中の電子がディラック電子として振る舞う例など（日本語）
  https://www.tohoku.ac.jp/japanese/2023/03/press20230322-01-dirac.html
