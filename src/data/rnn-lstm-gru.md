# ゲート付きRNNとしてのLSTMとGRU

LSTMとGRUは、再帰ニューラルネットワーク（RNN）にゲート機構を導入し、長い系列に対する学習の安定性を改善する代表的な系列モデルである。ここでは、基本式から勾配伝播の観点、LSTM/GRUの更新則、設計上の論点、評価・適用の考え方までを学術的に整理する。

## 参考ドキュメント
1. S. Hochreiter, J. Schmidhuber, Long Short-Term Memory, Neural Computation 9(8), 1735–1780 (1997). https://direct.mit.edu/neco/article/9/8/1735/6109/Long-Short-Term-Memory
2. K. Cho et al., Learning Phrase Representations using RNN Encoder–Decoder for Statistical Machine Translation (EMNLP 2014). https://aclanthology.org/D14-1179/
3. 日立ソリューションズ・クリエイト， 自然言語処理に使われるLSTM（長・短期記憶）とは？（日本語解説）https://www.hitachi-solutions-create.co.jp/column/technology/lstm.html

## 1. 系列モデリングとRNNの基本

系列データは、時間 $t=1,\dots,T$ に沿って観測 $x_t \in \mathbb{R}^{d}$ が与えられ、出力 $y_t$ や系列全体のラベル $y$ を推定する問題として定式化される。自己回帰的な依存（過去が未来に影響する）と、系列長が可変である点が中心的な難しさである。

最も基本的なRNN（単純RNN）は、隠れ状態 $h_t \in \mathbb{R}^{n}$ を介して過去情報を要約する。

$$
h_t = \phi(W_x x_t + W_h h_{t-1} + b_h),
\quad
y_t = g(W_y h_t + b_y)
$$

ここで、$\phi(\cdot)$ は $\tanh$ やReLU等の要素ごとの非線形、$g(\cdot)$ は回帰なら恒等写像、分類ならsoftmax等である。RNNは系列を逐次的に処理でき、観測長が変化しても扱える利点がある一方、長距離依存の学習に難がある。


## 2. 学習が難しい理由：消失勾配と発散勾配

RNNは一般に、誤差逆伝播を時間方向へ展開した BPTT（Backpropagation Through Time）で学習する。損失 $L$ に対する過去時刻 $k$ の隠れ状態への勾配は、ヤコビアンの積で表される。

$$
\frac{\partial L}{\partial h_k}
=
\left(\prod_{t=k+1}^{T} \frac{\partial h_t}{\partial h_{t-1}}\right)
\frac{\partial L}{\partial h_T}
$$

$\frac{\partial h_t}{\partial h_{t-1}}$ のスペクトル半径が $<1$ なら積は指数的に0へ近づき（消失勾配）、$>1$ なら指数的に増大する（発散勾配）。この現象は、長距離依存（遠い過去の情報）を学習したいときに本質的な障害となる。

このため単純RNNでは、系列を長くすると学習が不安定になりやすい。発散勾配は勾配クリッピングで緩和されることが多いが、消失勾配は構造自体の工夫（ゲートやセル状態）によって根本対処されることが多い。


## 3. LSTM：セル状態と3つのゲート

### 3.1 LSTMの設計思想
LSTM（Long Short-Term Memory）は、隠れ状態とは別にセル状態 $c_t$ を導入し、時間方向にほぼ線形な経路で情報を保持しやすくする点に特徴がある。セル状態はゲートにより、保持・更新・出力が制御される。

### 3.2 LSTMの基本式
入力ゲート $i_t$、忘却ゲート $f_t$、出力ゲート $o_t$、候補セル $\tilde{c}_t$ を用いる標準的な表現は次である（$\sigma$ はシグモイド、$\odot$ は要素積）。

$$
i_t = \sigma(W_i x_t + U_i h_{t-1} + b_i)
$$

$$
f_t = \sigma(W_f x_t + U_f h_{t-1} + b_f)
$$

$$
o_t = \sigma(W_o x_t + U_o h_{t-1} + b_o)
$$

$$
\tilde{c}_t = \tanh(W_c x_t + U_c h_{t-1} + b_c)
$$

$$
c_t = f_t \odot c_{t-1} + i_t \odot \tilde{c}_t
$$

$$
h_t = o_t \odot \tanh(c_t)
$$

セル更新式
$$
c_t = f_t \odot c_{t-1} + i_t \odot \tilde{c}_t
$$
が重要であり、$f_t$ が $1$ に近ければ $c_{t-1}$ が保たれ、$0$ に近ければ忘却される。すなわち、忘却ゲートが「どこまで記憶を延命するか」を調整する。

### 3.3 勾配伝播の観点
セル状態が加算型で更新されるため、適切なゲート値のもとで時間方向の勾配が極端に減衰しにくい経路が形成される。これにより長距離依存に対する学習性が向上する。ただし、ゲートが飽和（$\sigma$ が 0/1 付近）し続けると勾配が流れにくくなるため、初期化や正則化が依然として重要である。


## 4. GRU：2つのゲートによる簡約化

### 4.1 GRUの設計思想
GRU（Gated Recurrent Unit）は、LSTMのゲート機構の考え方を維持しつつ、セル状態 $c_t$ と隠れ状態 $h_t$ を明示的に分離しない（または同一視する）簡約化を行う。主に、更新ゲート $z_t$ とリセットゲート $r_t$ によって状態更新を制御する。

### 4.2 GRUの基本式
標準的なGRUの式は次である。

$$
z_t = \sigma(W_z x_t + U_z h_{t-1} + b_z)
$$

$$
r_t = \sigma(W_r x_t + U_r h_{t-1} + b_r)
$$

$$
\tilde{h}_t = \tanh(W_h x_t + U_h (r_t \odot h_{t-1}) + b_h)
$$

$$
h_t = (1 - z_t)\odot h_{t-1} + z_t \odot \tilde{h}_t
$$

更新ゲート $z_t$ は「どの程度、新しい情報 $\tilde{h}_t$ を採用するか」を制御し、$z_t$ が小さいと $h_{t-1}$ が保持される。リセットゲート $r_t$ は「過去状態をどの程度参照して候補状態を作るか」を制御する。

### 4.3 期待される性質
GRUはLSTMに比べてパラメータ数が少なく、同程度の性能が得られる場面が多いと報告されてきた。一方で、タスクやデータ規模、正則化、系列長により優劣が入れ替わり得るため、固定的な序列として理解するのではなく、構造上の違いがもたらす帰結として把握するのが妥当である。


## 5. LSTMとGRUの比較

### 5.1 更新則・状態の持ち方
| 観点 | 単純RNN | LSTM | GRU |
|---|---|---|---|
| 状態 | $h_t$ のみ | $h_t$ と $c_t$ | $h_t$（実装により統合的） |
| ゲート | なし | $i_t,f_t,o_t$（3ゲート） | $z_t,r_t$（2ゲート） |
| 更新の形 | 乗算非線形の反復 | 加算型セル更新 + ゲート | 残差風の補間更新 |
| 長距離依存 | 困難になりやすい | 改善されやすい | 改善されやすい |

### 5.2 パラメータ数の目安
入力次元 $d$、隠れ次元 $n$ のとき、重みの主要項のオーダーは次である（バイアス等を含め係数は省略する）。

| モデル | 主なパラメータ数（概算） |
|---|---|
| 単純RNN | $n(d+n+1)$ |
| LSTM | $4n(d+n+1)$ |
| GRU | $3n(d+n+1)$ |

同じ $n$ で比較すると、LSTMはGRUよりも重くなりやすい。逆に、同じ計算資源で隠れ次元を調整すれば、表現力と安定性の均衡点が変化する。

### 5.3 学習安定性の含意
- 単純RNNは、長い系列で消失勾配の影響を受けやすい。
- LSTMはセル状態の加算経路により、記憶保持をしやすい設計である。
- GRUは状態更新が補間（$h_{t-1}$ と $\tilde{h}_t$ の混合）になっており、更新量が制御されやすい。


## 6. 学習設定と安定化の要点（勾配・初期化・正則化）

### 6.1 時間方向の展開長
BPTTは計算量・メモリ消費が系列長 $T$ に比例して増大するため、長系列では「ある長さで時間方向を区切って」学習する設定が広く用いられる。ここで区切り長を短くしすぎると、長距離依存を学習する機会が減るため、タスクに応じた調整が必要である。

### 6.2 勾配の制御
発散勾配への対処として、勾配クリッピングが有効である。勾配 $g$ をノルムで制限する例は次である。

$$
g \leftarrow g \cdot \min\left(1,\frac{\tau}{\lVert g\rVert}\right)
$$

ここで $\tau$ はしきい値である。これにより更新が極端に大きくなる事態が緩和され、学習が安定しやすい。

### 6.3 忘却ゲートのバイアス初期化（LSTM）
LSTMでは忘却ゲート $f_t$ が小さく出ると、初期段階で記憶が急速に失われやすい。忘却ゲートのバイアスを正に初期化する慣行があり、探索研究でも有効性が議論されている。

### 6.4 正則化（ドロップアウト等）
RNNは時間方向に再利用される重みがあるため、全結合ネットワークと同じ感覚でドロップアウトを入れると性能が落ちる場合がある。RNN向けの適用法が検討されており、過学習抑制のための設計が重要である。

### 6.5 系列の正規化と欠損
時系列予測では、入力スケールの差が学習の不安定性を増幅することがある。標準化やロバストスケーリング等により、勾配の大きさが極端にならないようにするのが基本である。また、欠損がある場合は、欠損指示変数を追加する、マスクを入れる、補間を行うなど複数の扱いがあり、評価指標と整合する方法を選ぶ必要がある。


## 7. モデル設計の拡張

### 7.1 双方向RNN
系列全体を一括で処理できる設定では、順方向と逆方向の両方を走らせて結合する双方向化が用いられる。系列ラベリング（各時刻のタグ付け）で有効になることが多いが、未来情報を参照できない逐次推論では使えない。

### 7.2 多層化（スタック）
RNN層（LSTM/GRU）を多層にすると抽象度の異なる時間特徴を表現できる一方、最適化が難しくなる。残差結合や正規化の導入が有効になる場合がある。

### 7.3 射影付きLSTM（例：LSTMP）
大規模音声認識では、LSTMの出力に射影層を挿入して計算量と表現力を両立する設計が提案されている。ゲート内部の次元と外部に出す次元を分ける発想であり、計算資源制約下での設計として理解できる。


## 8. 適用領域と評価観点

### 8.1 言語・系列変換
GRUが提案された文脈の一つは、エンコーダ・デコーダ型の系列変換であり、固定長ベクトルを介して系列を別系列へ写像する枠組みである。ここでは「どの情報を保持し、どの情報を捨てるか」が性能に直結するため、ゲートによる選択性が意味を持つ。

### 8.2 音声認識
LSTMは音声のように連続値で長い文脈を持つ信号に対して有効性が報告されてきた。大規模な音響モデリングでのLSTM系アーキテクチャや分散学習といった観点も研究されている。

### 8.3 一般の時系列（需要・センサ・金融等）
需要予測や異常検知などでは、周期性・トレンド・外生変数（天候等）が混在し、短期と中長期の依存が共存する。LSTM/GRUはそのような複合依存を学習し得るが、入力設計（ラグ、窓長、外生の入れ方）に強く依存するため、評価設計（リークの回避、時系列分割）と一体で考える必要がある。


## 9. 選定の観点（LSTM/GRU/単純RNN）

固定的な優劣ではなく、次の観点で選ぶのが合理的である。

- 系列が長く、遠い過去の情報が必要である場合、単純RNNよりLSTM/GRUが有利になりやすい。
- 計算資源が限られ、推論遅延やメモリ制約が強い場合、GRUが有利になることがある（ただし実装依存である）。
- 非常に長い系列や、並列化が強く効く設定では、注意機構を核とするモデル（Transformer系）が選ばれる場面が増えている。ただし、時系列が短〜中程度でデータ量が大きくない場合や、逐次更新が自然な場面では、LSTM/GRUが依然として有力な選択肢である。

## まとめと展望

LSTMとGRUは、消失勾配問題を構造的に緩和するゲート機構を備え、長距離依存を含む系列学習を安定化する代表的手法である。LSTMはセル状態と3ゲートにより記憶保持の自由度が高く、GRUは簡約化により計算とパラメータの負担が軽くなりやすい。

今後は、注意機構を含む系列モデルが主流であり続ける一方、計算資源制約下の逐次推論や信号処理的な系列解析では、LSTM/GRU系の設計と最適化が引き続き重要である。加えて、状態空間モデルとの接続、軽量ゲート変種、量子化・蒸留による展開などにより、系列モデルの選択肢は多様化していくと見込まれる。


## 参考文献
- R. Pascanu, T. Mikolov, Y. Bengio, On the difficulty of training recurrent neural networks (ICML 2013). https://proceedings.mlr.press/v28/pascanu13.pdf
- J. Chung et al., Empirical Evaluation of Gated Recurrent Neural Networks on Sequence Modeling (2014). https://arxiv.org/abs/1412.3555
- R. Jozefowicz, W. Zaremba, I. Sutskever, An Empirical Exploration of Recurrent Network Architectures (JMLR 2015). https://proceedings.mlr.press/v37/jozefowicz15.html
- W. Zaremba, I. Sutskever, O. Vinyals, Recurrent Neural Network Regularization (2014). https://arxiv.org/abs/1409.2329
- Google Research Blog, The neural networks behind Google Voice transcription (2015). https://research.google/blog/the-neural-networks-behind-google-voice-transcription/
- Google Voice blog, Neon prescription... or rather, New transcription for Google Voice and Project Fi (2015). https://blog.google/products/google-voice/neon-prescription-or-rather-new/
- Keras documentation, GRU layer. https://keras.io/api/layers/recurrent_layers/gru/
- PyTorch documentation, torch.nn.LSTM. https://docs.pytorch.org/docs/stable/generated/torch.nn.LSTM.html
- Apple Developer Documentation, Using Long Short-Term Memory Layers (LSTM). https://developer.apple.com/documentation/accelerate/using-long-short-term-memory-layers-lstm
- H. Sak et al., Long Short-Term Memory Recurrent Neural Network Architectures for Large Scale Acoustic Modeling (2014). https://arxiv.org/abs/1402.1128
- 神戸大学（修士論文）藤田倫弘，高効率な深層学習を目指すRNNの構造設計と性能評価（2021, PDF）https://da.lib.kobe-u.ac.jp/da/kernel/D1008175/D1008175.pdf
