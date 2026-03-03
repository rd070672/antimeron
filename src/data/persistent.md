# パーシステントホモロジーと位相的データ解析

パーシステントホモロジー（Persistent Homology）は、データに潜む「連結成分・ループ・空洞」などの位相的構造を、スケールを連続的に変えながら抽出し、ノイズと構造を分離して定量化する手法である。点群・画像・グラフ・時系列などの多様なデータを同じ枠組みで扱える点が特徴である。

## 参考ドキュメント
1. 平岡 裕章, 位相的データ解析（パーシステントホモロジーに焦点を当てた解説）, J-STAGE  
   https://www.jstage.jst.go.jp/article/jnns/23/2/23_55/_article/-char/ja/
2. H. Edelsbrunner, D. Letscher, A. Zomorodian, Topological Persistence and Simplification (2002)  
   https://pub.ista.ac.at/~edels/Papers/2002-04-TopologicalPersistence.pdf
3. H. Adams et al., Persistence Images: A Stable Vector Representation of Persistent Homology (JMLR, 2017)  
   https://jmlr.csail.mit.edu/papers/volume18/16-337/16-337.pdf

## 1. なぜ「多尺度のトポロジー」なのか

データ解析において重要なのは、座標系や回転・平行移動、局所的なゆらぎに過度に依存しない「構造の要約」を作ることである。トポロジーは長さや角度よりも頑健な性質（つながり方、穴の数）に着目するため、ノイズが混じる観測データにおいても、データ生成過程の幾何構造を捉える手がかりとなる。

ただし、トポロジーで扱う対象（連結・穴）は、どのスケールで見るかに強く依存する。そこで「スケールを連続に変えながら、特徴がどれだけ長く生き残るか」を測るのがパーシステントホモロジーである。

- 小さなスケール：点が孤立しがち（細部とノイズが目立つ）
- 大きなスケール：点がつながり過ぎる（粗すぎて差が消える）
- どのスケールでも長く残る特徴：構造としての信頼度が相対的に高い

## 2. 数学の骨格：単体複体・境界作用素・ホモロジー

### 2.1 点群から「単体複体」を作る
点群 $X=\{x_i\}_{i=1}^{n}\subset \mathbb{R}^{d}$ を、球で太らせていく感覚で近傍関係を定義する。代表例が Vietoris–Rips 複体である。

距離 $d(\cdot,\cdot)$ と閾値 $\varepsilon\ge 0$ に対し、$k$-単体（$k+1$ 個の頂点からなる単体）
$
\sigma=\{x_{i_0},\ldots,x_{i_k}\}
$
が Rips 複体 $R_{\varepsilon}(X)$ に入る条件を
$
\max_{p,q} d(x_{i_p},x_{i_q}) \le \varepsilon
$
で定める（頂点集合がすべて互いに近いなら高次単体も入る）。

この構成により、点群を離散的な位相空間（組合せ構造）へ落とし込める。

### 2.2 鎖群と境界作用素
単体複体 $K$ の $k$-単体全体を基底とするベクトル空間（体 $\mathbb{F}$ 上）
$
C_k(K)=\left\{\sum_{\sigma\in K_k} a_{\sigma}\,\sigma \mid a_{\sigma}\in \mathbb{F}\right\}
$
を $k$-鎖群と呼ぶ。向き付き $k$-単体 $[v_0\cdots v_k]$ に対し境界作用素を
$
\partial_k [v_0\cdots v_k]=\sum_{i=0}^{k} (-1)^i [v_0\cdots \hat{v_i}\cdots v_k]
$
と定義する（$\hat{v_i}$ は除外を意味する）。重要な性質は
$
\partial_{k-1}\circ \partial_k = 0
$
である。境界の境界がゼロという事実が、穴の抽出と直結する。

### 2.3 ホモロジー群とベッチ数
$k$-次ホモロジー群は
$
H_k(K)=\ker(\partial_k) / \operatorname{im}(\partial_{k+1})
$
で定義される。直観的には

- $\ker(\partial_k)$：境界を持たない $k$-サイクル
- $\operatorname{im}(\partial_{k+1})$：高次単体の境界として生じる「つぶせる」サイクル

であり、割り算で「本質的な穴」だけが残る。

次元（ランク）で要約するとベッチ数
$
\beta_k = \dim H_k(K)
$
となり、$\beta_0$ は連結成分数、$\beta_1$ はループ数、$\beta_2$ は空洞（キャビティ）数に対応する。

## 3. パーシステンス：フィルトレーションと出生・死亡

### 3.1 フィルトレーション
スケール $\varepsilon$ を増やしながら複体が単調に増える族
$
K_{\varepsilon_1}\subseteq K_{\varepsilon_2}\subseteq \cdots
$
をフィルトレーションと呼ぶ。各包含写像はホモロジー準同型を誘導するため、
$
H_k(K_{\varepsilon_1}) \to H_k(K_{\varepsilon_2}) \to \cdots
$
という「特徴の追跡」が可能になる。

### 3.2 出生・死亡と図式表現
ある $k$ 次特徴がスケール $\varepsilon=b$ で現れ（birth）、$\varepsilon=d$ で消える（death）とき、点 $(b,d)$ を平面上に置いたものがパーシステンス図（persistence diagram）である。

- 対角線 $d=b$ の近く：寿命 $d-b$ が短い特徴（微小スケールの揺らぎで出やすい）
- 対角線から遠い：寿命が長い特徴（多尺度で安定に残る）

バーコードは同じ情報を区間 $[b,d)$ の集合として可視化したものである。

## 4. 距離・安定性：図を比較できることの意味

### 4.1 ボトルネック距離とワッサースタイン距離
パーシステンス図 $D_1, D_2$ は点集合（多重集合）なので、比較にはマッチング距離を用いる。

ボトルネック距離の代表的定義は
$
d_B(D_1,D_2)=\inf_{\gamma}\, \sup_{x\in D_1} \|x-\gamma(x)\|_{\infty}
$
であり、$\gamma$ は対角線への対応も許す全単射（または部分対応の拡張）として扱う。$p$-ワッサースタイン距離も同様に
$
W_p(D_1,D_2)=\left(\inf_{\gamma} \sum_{x\in D_1} \|x-\gamma(x)\|_{\infty}^p\right)^{1/p}
$
で定義される（$p\ge 1$）。

### 4.2 安定性の考え方
「入力の小さな変化が出力図の小さな変化にしかならない」ことは、データ解析として重要である。実際、関数の上で定義するフィルトレーションなどでは、入力関数の摂動が図の距離に上から抑えられる形の安定性が示される。これが、ノイズを含む観測データに対する理論的な支えとなる。

## 5. フィルトレーションの設計：データの型で使い分ける

### 5.1 代表的な複体
点群に対しては Rips が最も広く使われる一方、計算量が急増しやすい。点群がユークリッド空間にある場合、Alpha complex（ドロネー三角形分割に基づく）を使うと、幾何に沿って複体が抑制されることがある。

画像・3Dボクセル・格子データには cubical complex が自然である。スカラー場 $f$ の場合、低い値から順にセルを追加する lower-star filtration が頻用される。

### 5.2 複体・入力・計算の比較

| 入力 | 構成 | 直観 | 計算と実装の傾向 |
|---|---|---|---|
| 点群 | Vietoris–Rips 複体 | 距離閾値でクリークを作る | 高次単体が増えやすい。maxdim 制限が重要 |
| 点群（ユークリッド） | Čech 複体 | ボール被覆の交差 | 理論は明快だが計算は重くなりやすい |
| 点群（ユークリッド） | Alpha complex | ドロネーに制約された複体 | 幾何に沿い、単体爆発を抑えやすい |
| 画像・格子 | Cubical complex | 画素・ボクセルを立方体胞体として扱う | 画像解析に素直。lower-star と相性が良い |
| 関数値付きデータ | Sublevel/Superlevel | $f(x)\le t$ の集合を追跡 | 関数の設計が本質。位相の意味が明確になりやすい |

## 6. 計算アルゴリズム（概要）：行列還元としてのパーシステンス

有限フィルトレーションでは、境界行列を並べ、列基本変形（体上の掃き出し）で「どの単体がどの次元特徴の死亡を引き起こすか」を求める。これが標準的な計算像である。計算量は複体サイズに大きく依存するため、

- 次元上限 maxdim を適切に切る
- スパース距離行列の利用や近似
- cohomology を用いた高速化
- cubical で格子構造を活用

などの工夫が実用上重要になる。

点群の Rips に対して高速なアルゴリズムとして Ripser 系が広く使われ、Python では ripser.py が利用される。より多機能なデータ構造とアルゴリズム群として GUDHI が参照される。日本発の実装として HomCloud があり、可視化や前処理も含めた解析環境が整備されている。

## 7. 学習に使うための表現：図からベクトル・関数へ

パーシステンス図は点集合であり、そのままでは多くの学習器に入力しづらい。そこで、固定長表現やカーネルへ変換する。

### 7.1 固定長表現（ベクトル化）
代表例を挙げる。

- Persistence image（PI）
  - 図の点 $(b,d)$ を $(b, p)$（$p=d-b$）へ写し、重み付きガウス等を重ね、格子積分で画像化する
  - 出力は $\mathbb{R}^{m\times m}$ など固定次元
- Persistence landscape
  - 各点から作るテント関数の上包絡として関数列 $\{\lambda_k(t)\}$ を作り、離散化してベクトル化する
- Betti curve
  - スケール $\varepsilon$ に対し $\beta_k(\varepsilon)$ をプロットし、関数として扱う
- Persistence entropy
  - 寿命 $l_i=d_i-b_i$ の分布をエントロピーで要約する

### 7.2 カーネル・距離学習
- Sliced Wasserstein などで図の距離を定義し、距離ベースの学習（k-NN、クラスタリング）へ接続できる
- 図変換カーネル（スケール空間カーネル等）により SVM やガウス過程へ入れられる

### 7.3 表現選択の比較

| 表現 | 出力 | 長所 | 感度が出やすい点 |
|---|---|---|---|
| 図そのもの + 距離 | 点集合 | 幾何を保持しやすい | 距離計算が重くなりやすい |
| Persistence image | 行列/ベクトル | 多くの学習器に直結 | 格子解像度と重み関数の設計 |
| Landscape | 関数列/ベクトル | 関数解析と相性が良い | 離散化の取り方 |
| Betti curve | 関数 | 直観的で軽い | 情報が粗くなることがある |
| Entropy 系 | スカラー | 解釈が簡潔 | 詳細構造が落ちやすい |

## 8. 処理の流れ（基本形）

1. データ表現の選択
   - 点群、距離行列、画像（格子）、関数値付き点群、グラフなど
2. フィルトレーションの選択
   - Rips / Alpha / Cubical / lower-star など
3. パーシステンス図の計算
   - 次元（$H_0,H_1,H_2$）とスケール範囲を決める
4. 比較・要約
   - 図の距離、PI/landscape、Betti curve など
5. 学習・推定
   - 回帰、分類、クラスタリング、変化点検出、異常検知など
6. 解釈
   - どのスケールで何次元の特徴が効いたか、再現性はどうかを読む

## 9. 注意点（解析の品質に直結しやすいもの）

- 距離の定義
  - ユークリッド距離だけでなく、コサイン距離、DTW 距離、相関距離など、対象に自然な距離を選ぶと位相の意味が明確になる
- スケール範囲と正規化
  - 座標スケールが変わると出生・死亡が比例して変わるため、スケールの基準を揃える（標準化、単位系の統一など）
- 次元上限 maxdim
  - 高次特徴は計算が急に重くなる。目的に応じて $H_0,H_1$ に絞る判断も有効である
- サンプル密度と外れ値
  - 点群の疎密が極端だと、微小スケール特徴が大量に出る場合がある。外れ値処理やサブサンプリングの方針を明示する
- 図の対角線近傍
  - 短寿命点が多いとき、重み関数で抑える、閾値で除去するなどの設計が必要になる

## 10. Python による最小例：点群から図を計算する

以下は、2つの円からなる点群とノイズ点群を作り、$H_0$ と $H_1$ のパーシステンス図を計算して可視化する例である。ripser.py と persim（可視化）を用いる。

```python
import numpy as np
from ripser import ripser
from persim import plot_diagrams

def make_two_circles(n=200, r1=1.0, r2=0.6, noise=0.02, seed=0):
    rng = np.random.default_rng(seed)
    t1 = rng.uniform(0, 2*np.pi, n//2)
    t2 = rng.uniform(0, 2*np.pi, n//2)
    c1 = np.c_[r1*np.cos(t1), r1*np.sin(t1)]
    c2 = np.c_[r2*np.cos(t2) + 2.0, r2*np.sin(t2)]
    X = np.vstack([c1, c2])
    X += rng.normal(scale=noise, size=X.shape)
    return X

X = make_two_circles(n=300, noise=0.03, seed=42)

res = ripser(X, maxdim=1)
diagrams = res["dgms"]

plot_diagrams(diagrams, show=True)
```

読み方の一例は次の通りである。

- $H_0$（連結成分）：小さなスケールで多数の成分が生まれ、スケール増加で統合していく。最終的に1成分が残る（死亡が無限大として扱われることが多い）
- $H_1$（ループ）：円構造があると、寿命が比較的長い点が現れやすい。ノイズだけなら短寿命点が対角線近傍に集まりやすい

## 11. ソフトウェアと学習資源（国内外）

- HomCloud
  - 日本語ドキュメントとチュートリアルが整備されているパーシステントホモロジー解析環境である
- GUDHI
  - Rips、Alpha、Cubical、persistent cohomology など、データ構造と計算機能が広い
- ripser / ripser.py
  - Rips 系の高速計算に強く、Python から扱いやすい
- 入門資料（日本語）
  - 平岡による解説記事や講義資料は、数学的定式化とデータ解析のつながりを学ぶ導線になる

## 12. 発展話題（展望として）

- 図の統計
  - 図上の点過程としての扱い、要約統計量の設計、関数表現（landscape）による中心化・分散評価など
- 大規模データ
  - 近似（ランドマーク、スパース Rips）、並列化、cohomology ベースの高速化
- データ型の拡張
  - グラフ上のフィルトレーション（頂点重み・辺重み）
  - 時系列の埋め込みや recurrence plot による位相特徴抽出
- 説明可能性
  - どの点集合やどの領域が長寿命特徴を支えているか（代表サイクル、cochain）を追跡し、入力空間へ戻す

## まとめ

パーシステントホモロジーは、データの位相的構造をスケールの変化として追跡し、バーコードやパーシステンス図として要約する方法である。距離・安定性・ベクトル化を通じて、比較・学習・不確かさの議論へ接続でき、点群・画像・グラフ・時系列まで広く適用できる枠組みである。

## 関連研究
- I. Obayashi, Persistent Homology Analysis for Materials Research and Development: A Review, JPSJ (2022)  
  https://journals.jps.jp/doi/abs/10.7566/JPSJ.91.091013
- HomCloud 公式（日本語ドキュメントあり）  
  https://homcloud.dev/
- 平岡 裕章, パーシステントホモロジーの基礎と材料工学への適用例（解説 PDF）  
  https://www.jim.or.jp/journal/m/pdf3/58/01/17.pdf
- GUDHI: persistent cohomology user manual  
  https://gudhi.inria.fr/python/latest/persistent_cohomology_user.html
- ripser.py documentation  
  https://ripser.scikit-tda.org/
- A. Zomorodian, G. Carlsson, Computing Persistent Homology (2005)  
  https://geometry.stanford.edu/lgl_2024/papers/zc-cph-05/zc-cph-05.pdf
- D. Cohen-Steiner, H. Edelsbrunner, J. Harer, Stability of Persistence Diagrams (2007)  
  https://math.uchicago.edu/~shmuel/AAT-readings/Data%20Analysis%20/Stability.pdf
- 位相的データ解析入門（企業技術記事の例）  
  https://www.chino-js.com/ja/tech/tda/
- （講義資料例）Introduction to Persistent Homology for Graph Analysis（PDF）  
  https://www2.math.kyushu-u.ac.jp/~skaji/slides/PH_graph2022.pdf
