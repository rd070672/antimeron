# ベイズ最適化（BO）

ベイズ最適化（BO: Bayesian Optimization）とは、評価に時間やコストがかかるブラックボックス関数（実験・計算）を、少ない試行回数で最適化する逐次探索手法である。材料開発では、組成・プロセス条件・合成条件・熱処理条件の最適化や自律実験（closed-loop）に特に有効である。


## 参考ドキュメント
- Peter I. Frazier, A Tutorial on Bayesian Optimization, arXiv:1807.02811 (2018)
  https://arxiv.org/pdf/1807.02811
- Bobak Shahriari et al., Taking the Human Out of the Loop: A Review of Bayesian Optimization, Proc. IEEE (2016)（著者公開PDF）
  https://www.cs.ox.ac.uk/people/nando.defreitas/publications/BayesOptLoop.pdf
- 中山亮, 材料研究者がベイズ最適化を物質合成に活用するには, J. Jpn. Assoc. Crystal Growth (2024)（PDF）
  https://www.jstage.jst.go.jp/article/jjacg/51/4/51_51-4-02/_pdf/-char/en


## 1. 何を「最適化」するのか
目的関数（最大化/最小化）
- 物性：硬さ、磁化、保磁力、電気伝導率、Seebeck係数、触媒活性、寿命など
- 構造指標：相分率、結晶配向度、欠陥密度、粒径、ピーク比、結晶性など
- 工程指標：歩留まり、膜質、再現性、スループット、コストなど

設計変数（入力）
- 組成（混合比）、温度、時間、圧力、雰囲気、冷却速度、成膜条件、焼結条件、添加剤量など


## 2. BOの基本アイデア（サロゲート + 獲得関数）
BOは次の2つで構成される。

1) サロゲートモデル（代理モデル）
未知の目的関数 $f(\mathbf{x})$ を、観測データ $(\mathbf{x}_n, y_n)$ から近似し、不確かさも同時に推定する。

2) 獲得関数（acquisition function）
「次にどこを測るべきか」を、予測平均と不確かさを用いて1点（または複数点）提案する。

逐次探索の骨格
- 観測：$y_n = f(\mathbf{x}_n) + \varepsilon_n$
- 学習：サロゲートから $p(f|\mathcal{D})$ を更新
- 提案：$\mathbf{x}_{n+1} = \arg\max_{\mathbf{x}} a(\mathbf{x}; p(f|\mathcal{D}))$
- 実験/計算：$y_{n+1}$ を取得しデータに追加


## 3. ガウス過程（GP）回帰によるサロゲート
代表的サロゲートはガウス過程（Gaussian Process, GP）である。

事前分布
$$
f(\mathbf{x}) \sim \mathcal{GP}\left(m(\mathbf{x}), k(\mathbf{x},\mathbf{x}')\right)
$$

観測ノイズ（ガウス）
$$
y = f(\mathbf{x}) + \varepsilon,\quad \varepsilon \sim \mathcal{N}(0,\sigma_n^2)
$$

学習データを $X=[\mathbf{x}_1,\dots,\mathbf{x}_N]$、$ \mathbf{y}=[y_1,\dots,y_N]^T$ とすると、
予測平均と分散は
$$
\mu(\mathbf{x}) = k(\mathbf{x},X)\left(K+\sigma_n^2 I\right)^{-1}\mathbf{y}
$$
$$
\sigma^2(\mathbf{x}) = k(\mathbf{x},\mathbf{x}) - k(\mathbf{x},X)\left(K+\sigma_n^2 I\right)^{-1}k(X,\mathbf{x})
$$
ここで $K_{ij}=k(\mathbf{x}_i,\mathbf{x}_j)$ である。

よく使うカーネル例（連続変数）
- RBF（ガウス）, Matérn（粗さを調整しやすい）
材料では「なめらかな応答」か「急峻な相変化がある」かで選択が効く。


## 4. 獲得関数：探索（exploration）と活用（exploitation）
獲得関数は、未探索の領域（不確かさ大）を探索することと、良さそうな領域（平均が良い）を活用することをバランスする。

代表的獲得関数（最大化の例）

| 名称 | 形（概念） | 特徴 |
|---|---|---|
| PI（Probability of Improvement） | $P(f(\mathbf{x}) \ge f_{\mathrm{best}}+\xi)$ | 改善確率を重視、保守的になりうる |
| EI（Expected Improvement） | $E[\max(0, f(\mathbf{x})-f_{\mathrm{best}}-\xi)]$ | 実務で定番、探索と活用のバランスが良い |
| UCB（Upper Confidence Bound） | $ \mu(\mathbf{x})+\kappa\sigma(\mathbf{x}) $ | 直感的、$\kappa$ が探索強度 |

（最小化では符号を反転するか、$f_{\mathrm{best}}$ の定義を入れ替える。）

EIの閉形式（$f(\mathbf{x}) \sim \mathcal{N}(\mu,\sigma^2)$ を仮定）
$$
\mathrm{EI}(\mathbf{x}) = (\mu - f_{\mathrm{best}}-\xi)\Phi(z) + \sigma \phi(z),
\quad z=\frac{\mu - f_{\mathrm{best}}-\xi}{\sigma}
$$
$\Phi,\phi$ は標準正規分布のCDF/PDFである。


## 5. 「BOが強い」条件
- 1点の評価が重い（合成・測定・DFT/MD/真空成膜・放射光など）
- 試行回数が限られる（例：数十回程度）
- 変数次元が中程度（目安として20次元未満が扱いやすいことが多い）
- ノイズを含む（試料ばらつき、測定ばらつき）でも、確率モデルとして扱える


## 6. 発展形
### 6.1 バッチBO（並列実験）
1サイクルで複数条件を提案する（ロボット合成、並列炉、並列DFTなど）。
- 例：qEI、Thompson sampling など

### 6.2 制約付きBO（Constrained BO）
目的は最大化したいが、次の制約を満たす必要がある状況で用いる。
- 安全制約：温度上限、反応暴走回避
- 品質制約：相純度、割れ、密着性
- 装置制約：実現可能領域のみ

考え方の例
- 目的 $f(\mathbf{x})$ と制約 $g(\mathbf{x})$ を別サロゲートで学習し、
  期待改善×実行可能確率 のように組み合わせて提案する。

### 6.3 多目的BO（Multi-objective）
例：高性能と低コスト、強度と延性、活性と耐久性などの同時最適化。
- パレート最適（Pareto front）を更新しながら探索する
- 代表例：EHVI（Expected Hypervolume Improvement）

### 6.4 マルチフィデリティBO（Multi-fidelity）
安い近似（粗い計算・短時間測定）と高精度評価（精密測定・高精度DFT）を組み合わせる。
- 低コストで探索し、見込み領域だけ高精度評価する運用に向く

### 6.5 混合変数（連続 + カテゴリ）
材料では「元素種（カテゴリ）+ 量（連続）」が混在しやすい。
- GP以外のサロゲート（TPEなど）や、カテゴリ対応カーネルを利用することがある


## 7. DOE・ALとの関係（位置づけ）
- DOE：実験の初期割付（スクリーニング、直交表、応答曲面）で有効である
- BO：逐次的に「次の1点」を賢く決める最適化である
- AL（アクティブラーニング）：不確かさに基づいてデータ取得を制御する枠組みであり、BOはその最適化版と見なせる（獲得関数で制御する）

実務では
初期DOE（少数点で全体を押さえる）→ BOで詰める
の順が安定である。


## 8. 材料系応用例
- 成膜条件の自律探索：XRDピーク比などを目的に、基板温度をBOで逐次提案し最適条件へ収束させる
- 材料データを秘匿した共同最適化：企業・機関が物性データを共有せずにBOを回す（秘匿計算と組み合わせ）
- 自律実験・自動化ライン：候補数が多いプロセスパラメータ探索を少数試行で絞り込む


## 9. 実装・ツール選定
海外で利用例が多い実装
- BoTorch / Ax（PyTorch系、研究開発向け）
- scikit-optimize（軽量、教育向け）
- GPyTorch（GPを強化したい場合）

注意点
- 目的関数のスケーリング（単位・桁）を揃えると安定する
- ノイズの扱い（反復点の導入）が推奨である
- 物理的に不可能な領域は、制約として明示するのが原則である


## まとめ
ベイズ最適化は、サロゲートモデルで目的関数の予測と不確かさを推定し、獲得関数で次の実験点を提案することで、少ない試行回数で最適条件へ到達する方法である。材料研究では、DOEで全体像を押さえた上でBOにより局所探索・最適化を進める運用が実装容易で効果が高いのである。