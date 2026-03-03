# 半教師あり学習（Semi-supervised Learning, SSL）

半教師あり学習は、少量のラベル付きデータと大量のラベルなしデータを併用して、分類・回帰モデルの汎化性能を高める学習枠組みである。材料科学では、ラベル付与（相同定・状態判定・物性測定）が高コストである一方、未ラベルの測定データや計算データが大量に得られる状況に適合する。

## 参考ドキュメント
- Chapelle, Schölkopf, Zien (eds.), Semi-Supervised Learning, MIT Press, 2006
  https://www.molgen.mpg.de/3659531/MITPress--SemiSupervised-Learning.pdf
- Sohn et al., FixMatch: Simplifying Semi-Supervised Learning with Consistency and Confidence, NeurIPS 2020
  https://papers.nips.cc/paper_files/paper/2020/file/06964dce9addb1c5cb5d6e3d9838f733-Paper.pdf
- 筒井, 鉄鋼分野における深層学習技術の活用の現状, 鉄と鋼 109(6), 2023（日本語）
  https://www.jstage.jst.go.jp/article/tetsutohagane/109/6/109_TETSU-2022-098/_html/-char/ja


## 1. 問題設定（記法）
入力空間を $\mathcal{X}$、出力（クラスまたは連続値）を $\mathcal{Y}$ とする。

- ラベル付きデータ
  $$
  \mathcal{D}_L=\{(x_i,y_i)\}_{i=1}^{n_L},\quad x_i\in\mathcal{X},\ y_i\in\mathcal{Y}
  $$
- ラベルなしデータ
  $$
  \mathcal{D}_U=\{u_j\}_{j=1}^{n_U},\quad u_j\in\mathcal{X}
  $$

学習するモデルを $f_\theta:\mathcal{X}\to\mathcal{Y}$ とすると、代表的な目的関数は
$$
\mathcal{L}(\theta)=\mathcal{L}_{\mathrm{sup}}(\theta;\mathcal{D}_L)+\lambda\,\mathcal{L}_{\mathrm{unsup}}(\theta;\mathcal{D}_U)
$$
で表される。$\lambda$ は未ラベル項の強さを制御する重みである。

補足（評価の型）
- transductive：学習時に見た $\mathcal{D}_U$ の個体を主に当てに行く設定である
- inductive：未知の新規データにも一般化する設定である（材料応用ではこちらが重要である）

## 2. SSLが成立しやすい仮定
SSLは、未ラベルデータが「入力空間の構造」を教えるという立場に立つ。典型的に次の仮定が用いられる。

- smoothness assumption：近い $x$ は近い $y$ を持つべきである  
  例：類似したXAFSスペクトルは近い局所構造指標を持つ、などである
- cluster assumption：決定境界は低密度領域を避けるべきである  
  例：相図上で相境界付近は少数で、相内部は密に観測される場合がある
- manifold assumption：データは低次元多様体上に乗る  
  例：装置条件やバックグラウンドの自由度は限定的で、スペクトルは低次元因子で説明できる場合がある

これらの仮定が崩れる（外れ値混入、ドメインシフト、ラベル定義の曖昧さ）とSSLは悪化しやすい点に注意が必要である。

## 3. 代表的アプローチと数式

### 3.1 自己学習（Self-training）と擬似ラベル（Pseudo-labeling）
ラベルなし点 $u$ に対し、現モデルの予測から擬似ラベル $\hat{y}$ を作る。

- 分類の例（しきい値付き）
  $$
  \hat{y}=\arg\max_c p_\theta(c\mid u),\quad
  \max_c p_\theta(c\mid u)>\tau \ \text{のときのみ採用}
  $$
  $$
  \mathcal{L}_{\mathrm{unsup}}=\mathbb{E}_{u\sim\mathcal{D}_U}\left[\mathbf{1}\{\max p_\theta>\tau\}\cdot \mathrm{CE}\big(\hat{y},p_\theta(\cdot\mid u)\big)\right]
  $$

材料での要点
- 擬似ラベルは誤りが自己増幅するため、(i) 高信頼のみ採用、(ii) 外れ値検出、(iii) 校正（calibration）を併用するのが実用的である
- 相同定・状態判定のようにクラス境界が曖昧なラベルでは、しきい値 $\tau$ を高めに取り、ラベル定義を明確化するのが基本である

### 3.2 一貫性正則化（Consistency regularization）
入力摂動（ノイズや拡張）に対して予測が一貫することを促す。

- 基本形
  $$
  \mathcal{L}_{\mathrm{unsup}}
  =\mathbb{E}_{u\sim\mathcal{D}_U}\left[
    D\!\left(p_\theta(\cdot\mid a_1(u)),\ p_\theta(\cdot\mid a_2(u))\right)
  \right]
  $$
  ここで $a_1,a_2$ はデータ拡張、$D$ はKL距離やMSEなどである。

- Teacher–Student（Mean Teacherの型）
  Teacher重み $\theta'$ を Student重み $\theta$ の指数移動平均で更新する。
  $$
  \theta' \leftarrow \alpha\theta' + (1-\alpha)\theta
  $$
  StudentはTeacher予測に整合するよう学習する。

- 強拡張＋擬似ラベル（FixMatchの型）
  弱拡張で擬似ラベル、強拡張で整合を取るという設計である。
  $$
  q=p_\theta(\cdot\mid a_{\mathrm{weak}}(u)),\quad \hat{y}=\arg\max q,\quad \max(q)>\tau
  $$
  $$
  \mathcal{L}_{\mathrm{unsup}}=\mathrm{CE}\big(\hat{y},p_\theta(\cdot\mid a_{\mathrm{strong}}(u))\big)
  $$

材料での拡張設計（物理妥当性が最重要である）
- XRD：ピーク強度スケーリング、背景加算、統計ノイズ、わずかな $2\theta$ オフセット、部分マスクなどが候補である
- XAFS/XPS：エネルギー軸の微小シフト、ノイズ、ベースライン変動、部分窓マスクなどが候補である
- 顕微鏡画像：回転・反転・コントラスト変動・ノイズなどが候補である（ただし方位情報が意味を持つ場合は回転不変が破綻する）

### 3.3 グラフベースSSL（ラベル伝播・ラプラシアン正則化）
データ点をノード、類似度をエッジ重み $w_{ij}$ とする近傍グラフを構成し、滑らかなラベル関数 $f$ を求める。

- 典型目的
  $$
  \min_{f}\ \sum_{i\in L}\|f_i-y_i\|^2 + \mu\sum_{i,j}w_{ij}\|f_i-f_j\|^2
  $$
  グラフラプラシアン $L=D-W$ を用いると
  $$
  \sum_{i,j}w_{ij}\|f_i-f_j\|^2=2f^\top L f
  $$
  となる。

材料での対応
- スペクトル間の類似度、組成記述子の距離、構造指紋（fingerprint）の距離などで $w_{ij}$ を定義できる
- 近傍グラフは「どの距離を信じるか」を暗に固定するため、距離設計が性能を支配しやすい

### 3.4 生成モデル系SSL（概念レベル）
VAEなどで $p(x)$ や $p(x,y)$ の構造を学び、少数ラベルで条件付き予測を補強する考え方である。現在の実務では、(i) 一貫性正則化、(ii) 擬似ラベル、(iii) 自己教師あり事前学習＋少数微調整、の方が扱いやすいことが多い。

## 4. 典型ユースケース
材料分野では「大量にあるが未ラベル」なデータが多い。SSLの適用候補は次の通りである。

| データ | ラベル例 | 未ラベルが多い理由 | SSLの狙い |
|---|---|---|---|
| XRD（粉末・薄膜・その場） | 相、格子系、結晶系、結晶子サイズ区間 | 相同定は人手と知識を要する | 相同定・異常検知・自動分類の省力化 |
| XAFS/XPS/XMCD | 酸化数、配位、局所環境クラス | 高品質ラベルは解析が高コスト | 状態推定、クラスタリング支援 |
| 顕微鏡画像（SEM/TEM/Kerr等） | 組織クラス、欠陥有無、ドメイン状態 | アノテーションが重い | 欠陥検出、状態分類、物性代理 |
| DFT/MD計算 | 相安定、生成エネルギー、磁気状態 | 計算条件統一や後処理が負担 | 未整備データを活かして性能向上 |
| 合成ログ | 成功/失敗、収率カテゴリ | 成果の定義が揺れやすい | 早期のスクリーニング精度向上 |

## 5. 実務で効きやすい設計指針
1) ラベルの定義を先に固めるべきである  
相・状態・成功判定の基準が揺れると、未ラベルの利用が逆効果になりやすい。

2) 物理妥当なデータ拡張を作るべきである  
スペクトルの拡張は「装置由来の揺らぎ」と「物性由来の差」を混同しない範囲で設計すべきである。

3) データ分割は材料リーク対策を優先すべきである  
同一物質の条件違い、近縁組成・近縁構造が学習・評価にまたがると見かけ性能が上がりやすい。組成ブロック分割、系ブロック分割、条件ブロック分割を検討すべきである。

4) 外れ値（open-set）を想定すべきである  
ラベルなしデータに未知相・未知状態が混入しやすい。擬似ラベルの採用条件、外れ値検出、オープンセットSSLの発想を導入すべきである。

5) 学習曲線を「ラベル予算」で描くべきである  
$ n_L $ を増やしたときの性能曲線を比較し、SSLの実利（ラベル削減量）を示すのが材料応用では説得力が高い。

## 6. まとめ
- 半教師あり学習は、少量ラベルと大量未ラベルを併用して性能を上げる枠組みであり、材料科学の高コストラベリング問題に適合する方法である。代表格は擬似ラベル（自己学習）と一貫性正則化であり、グラフベースSSLも距離設計次第で強力である。
- 材料応用での鍵は、モデル選択よりも、ラベル定義、物理妥当な拡張、リークのない分割、外れ値混入への備えにある。これらを先に設計した上でSSLを導入するのが実務的である。
