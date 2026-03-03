# マグノン・フォノン相互作用の計算

マグノン・フォノン相互作用は、スピン自由度と格子自由度がエネルギーをやり取りする結合であり、分散の反交差（混成）や減衰、熱輸送、磁気弾性応答の起源として現れるものである。計算では、結合の起源を分解し、観測量（分散・線幅・寿命・熱輸送係数）へ落とし込める形でパラメータ化することが要点である。

## 参考ドキュメント
1. Y. Li et al., Advances in coherent coupling between magnons and phonons (Perspective, 2021)
   https://www.osti.gov/servlets/purl/1839901
2. P. W. Ma, S. L. Dudarev, C. H. Woo, Spin-lattice-electron dynamics simulations of magnetic materials (Phys. Rev. B 2012)
   https://link.aps.org/doi/10.1103/PhysRevB.85.184301
3. 理化学研究所 プレスリリース「音波を閉じ込めてスピン波との強結合を室温で実証」（2024）
   https://www.riken.jp/press/2024/20240201_1/index.html

## 1. 物理像と代表的なシグネチャ
### 1.1 混成（ハイブリッド化, magnon polaron）
同じ波数 $q$ でマグノン分散 $\Omega(q)$ とフォノン分散 $\omega(q,\nu)$ が近づくと、結合により反交差が生じ、固有モードはスピン的・格子的成分を混ぜた状態となる。観測的には、
- 分散のギャップ（反交差の開き）
- 有効群速度やモード強度の入れ替わり
- 温度・磁場方向に対する鋭敏な変化
として現れやすい。

### 1.2 散乱・緩和（寿命, 線幅）
マグノンがフォノンへ散乱して減衰する、あるいは逆に格子振動がスピン励起へ散乱して減衰する。熱伝導・スピン流・ダンピングと直接に結び付く。

### 1.3 動的磁気弾性（SAW/共振器・薄膜ヘテロ）
表面弾性波（SAW）や音響共振器でフォノンモードを閉じ込め、スピン波と強結合させる研究も進展している。計算は、連続体の弾性波と磁化ダイナミクスの連成、あるいは境界条件を含む固有値問題として定式化できる。

## 2. 基本の数式：スピン・格子・結合項
扱い方は大別すると、(i) エネルギー汎関数（連続体）を立てる方法と、(ii) ハミルトニアン（格子模型）で立てる方法がある。

### 2.1 連続体の磁気弾性エネルギー（立方晶の例）
単位磁化ベクトル $\mathbf{m}=(m_x,m_y,m_z)$、ひずみテンソル $\varepsilon_{ij}$ に対し、磁気弾性エネルギー密度を
$$
w_{\mathrm{me}}
= B_1(\varepsilon_{xx}m_x^2+\varepsilon_{yy}m_y^2+\varepsilon_{zz}m_z^2)
+2B_2(\varepsilon_{xy}m_x m_y+\varepsilon_{yz}m_y m_z+\varepsilon_{zx}m_z m_x)
$$
と書くことが多い。$B_1,B_2$ が磁気弾性定数であり、ひずみ場が有効磁場を通じて磁化歳差運動を駆動する。

### 2.2 格子模型：交換歪み（exchange striction）の最小形
原子位置 $\mathbf{R}_i$ が変位 $\mathbf{u}_i$ を持つとき、交換相互作用が距離・角度に依存して変化することが結合の主要因となる。
$$
H_{\mathrm{spin}}=-\sum_{ij} J_{ij}(\{\mathbf{R}\})\,\mathbf{S}_i\cdot\mathbf{S}_j
\quad,\quad
J_{ij}(\{\mathbf{R}\}) \simeq J_{ij}^{0}+\sum_{\alpha}\frac{\partial J_{ij}}{\partial u_{\alpha}}u_{\alpha}
$$
ここで $u_{\alpha}$ は特定の原子変位成分、あるいは正規座標（フォノン座標）を表す。一次まで展開すると
$$
H_{\mathrm{sp\text{-}ph}}=-\sum_{ij}\sum_{\alpha} g_{ij,\alpha}\,u_{\alpha}\,\mathbf{S}_i\cdot\mathbf{S}_j
\quad,\quad
g_{ij,\alpha}=\frac{\partial J_{ij}}{\partial u_{\alpha}}
$$
という結合項が得られる。

### 2.3 フォノンとマグノンの量子化（分散と結合定数）
フォノン
$$
H_{\mathrm{ph}}=\sum_{q\nu}\hbar\omega(q,\nu)\left(a_{q\nu}^{\dagger}a_{q\nu}+\frac{1}{2}\right)
$$
マグノン（線形スピン波近似）
$$
H_{\mathrm{mag}}=\sum_{q}\hbar\Omega(q)\,b_{q}^{\dagger}b_{q}
$$
結合を一次の混成として
$$
H_{\mathrm{int}}=\sum_{q\nu}\left(g_{q\nu}\,b_{q}^{\dagger}a_{q\nu}+g_{q\nu}^{*}\,a_{q\nu}^{\dagger}b_q\right)
$$
と近似できる領域では、反交差近傍の固有角振動数は
$$
\omega_{\pm}(q)=\frac{\Omega(q)+\omega(q,\nu)}{2}
\pm\frac{1}{2}\sqrt{\left(\Omega(q)-\omega(q,\nu)\right)^2+4|g_{q\nu}|^2}
$$
となり、ギャップのサイズ $2|g_{q\nu}|$ が一つの指標になる。

## 3. 第一原理計算から結合を得る典型フロー
目標は、(i) スピン模型パラメータ、(ii) フォノン固有ベクトルと固有値、(iii) それらの結合（導関数）を整合的に推定することである。

### 3.1 構造と基底状態の確定
1. 結晶構造の最適化（格子定数・内部座標）
2. 磁気秩序（FM/AFM/非共線）と、必要なら $+U$ やSOCの扱いを確定
3. 収束条件（$k$ 点、カットオフ、スメアリング、磁化初期条件）を固定

### 3.2 フォノン：力定数と正規モード
- DFPT または有限変位法で力定数を求め、$\omega(q,\nu)$ と固有ベクトル $\mathbf{e}(q,\nu)$ を得る。
- 有限変位法では、スーパーセルと変位パターンを用いて力定数を再構成する。

関連リンク
- VASP DFPT（phonon）: https://www.vasp.at/wiki/Phonons_from_density-functional-perturbation_theory
- VASP 音子分散・DOS手順: https://www.vasp.at/wiki/Computing_the_phonon_dispersion_and_DOS

### 3.3 スピン模型：交換相互作用・異方性
- 交換 $J_{ij}$、DMI、異方性などを、磁気力定理やWannier化を通じて推定する。
- 推定したパラメータは、スピン波分散 $\Omega(q)$ を再現できるかで検証する。

代表的ツール例
- TB2J（Heisenberg, DMI等）: https://github.com/mailhexu/TB2J
- Spirit（原子スピンダイナミクス）: https://spirit-code.github.io/

### 3.4 結合定数：$\partial J / \partial u$ をどう作るか
結合定数の要点は、交換や異方性がフォノン座標（あるいはひずみ）でどれだけ変化するかである。代表的に次の2系統がある。

(1) 凍結フォノン差分（frozen phonon）
- フォノン固有ベクトルに沿って原子を微小変位させた構造を作る。
- 変位前後で $J_{ij}$ を計算し、差分から導関数を近似する。
$$
\frac{\partial J_{ij}}{\partial Q_{q\nu}}
\simeq \frac{J_{ij}(+ \Delta Q_{q\nu})-J_{ij}(- \Delta Q_{q\nu})}{2\Delta Q_{q\nu}}
$$
ここで $Q_{q\nu}$ は正規座標である。スーパーセルで $q$ を表現する必要がある点に注意する。

(2) ひずみ差分（磁気弾性定数の抽出）
- 微小ひずみ $\varepsilon$ を与えた格子で、特定方向に磁化を固定した全エネルギー差を計算する。
- エネルギーの $\varepsilon$ 依存から $B_1,B_2$ をフィットする。
例として $B_1$ は、磁化方向を変えたときの二次形式の係数として得られる。

## 4. 代表的な計算アプローチの整理
| アプローチ | 主な出力 | 強み | 主な注意点 |
|---|---|---|---|
| 有効ハミルトニアン（スピン波 + フォノン） | 反交差ギャップ、混成率 | 観測量への写像が明快 | $g_{q\nu}$ をどこから得るかが核心 |
| 凍結フォノン差分 + 交換推定 | $\partial J/\partial Q$、結合行列 | 第一原理の情報を直接使える | スーパーセル・変位幅・磁気秩序依存が支配的 |
| スピン格子ダイナミクス（SLD） | 有限温度でのエネルギー移送、寿命、非平衡 | 非線形・非平衡を扱える | パラメータ化（ポテンシャルとスピン項）の整合が難しい |
| 連続体連成（弾性波 + LLG） | SAW駆動応答、共振、伝搬 | 薄膜・デバイス形状に強い | 境界条件、減衰、材料定数の同定が要点 |

SLDの代表例
- SPILADY（Spin-Lattice Dynamics）: https://scipub.euro-fusion.org/wp-content/uploads/eurofusion/WP14ERPR15_14790_submitted.pdf

## 5. 散乱率・寿命の評価（線幅へつなぐ）
混成よりも散乱が支配的な系では、結合行列要素からフォノン放出・吸収過程の遷移率を評価する。フォノン枝 $\nu$ について、フェルミの黄金律の形で
$$
\frac{1}{\tau_{q}}
\propto \sum_{q'\nu} |M(q\to q',\nu)|^2
\left[
(n_{q-q',\nu}+1)\,\delta(\Omega_q-\Omega_{q'}-\omega_{q-q',\nu})
+n_{q-q',\nu}\,\delta(\Omega_q-\Omega_{q'}+\omega_{q-q',\nu})
\right]
$$
と書ける。$n_{q\nu}$ はボース分布である。実際には、$\delta$ を数値的に幅を持つ関数で近似し、ブリルアンゾーン積分を収束させる。

## 6. 典型的な検証と注意点
### 6.1 検証の順番
1. フォノン分散が既知の実験（中性子、IXS、Raman等）と整合するかを確認する。
2. 交換パラメータから得るスピン波分散が、既知のマグノン分散と整合するかを確認する。
3. 結合を入れたときに、反交差位置・ギャップ・温度/磁場方位依存が再現されるかを確認する。

### 6.2 注意点
- 磁気秩序（FM/AFM）を変えるとフォノンが変わる系では、基底状態の取り方が結果を支配する。
- $J_{ij}$ の到達距離（何近接まで取るか）とスーパーセルサイズが混成ギャップに効く。
- SOC由来の単一イオン異方性やDMIが強い系では、exchange striction だけでは不十分である。
- 凍結フォノン差分の変位幅 $\Delta Q$ は、線形領域に小さくしつつ数値ノイズに埋もれない大きさが必要である。
- 連続体モデルでは、弾性定数、磁歪、減衰定数など材料定数の同定が結果の信頼性を左右する。

## まとめ
- マグノン・フォノン相互作用の計算は、混成（反交差）と散乱（寿命）の二系列に整理すると見通しが良い。
- 第一原理に基づく場合、フォノン（力定数）とスピン模型（交換・異方性）をそれぞれ独立に収束させた上で、$\partial J/\partial Q$ や磁気弾性定数として結合を推定する流れが基本である。
- 強結合・デバイス形状を扱う場合は、連続体の弾性波と磁化ダイナミクスの連成固有値問題へ落とすことで、境界条件や共振効果まで含めて議論できる。
