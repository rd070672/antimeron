# 線形応答理論とKubo–Greenwood法

Kubo–Greenwood法は、線形応答理論の一般式を単一粒子状態（バンド・波動関数）へ落とし込み、電気伝導度や光学伝導度を数値計算しやすい形にした実装系の代表である。

## 参考ドキュメント
- R. Kubo, Statistical-Mechanical Theory of Irreversible Processes. I, Journal of the Physical Society of Japan 12, 570 (1957)
  https://journals.jps.jp/doi/pdf/10.1143/JPSJ.12.570
- L. Calderín, V. V. Karasiev, S. B. Trickey, Kubo-Greenwood Electrical Conductivity Formulation and Implementation..., Computer Physics Communications 221, 118 (2017)（arXiv版）
  https://arxiv.org/abs/1707.08437
- 日本物理学会：線形応答理論の成立（久保公式の歴史的背景を含む）
  https://www.jps.or.jp/books/50thkinen/50th_10/001.html

## 1. 線形応答の基本構文
線形応答理論は、外場による微小な摂動に対して、系の応答を平衡状態の揺らぎ（相関関数）で表す理論である。　　
時間依存外場 $F(t)$ による摂動を
$$
H(t)=H_0 - F(t)\,A
$$
と書く（$A$ は外場に結合する演算子である）。観測量 $B$ の応答は一次までで
$$
\delta\langle B(t)\rangle=\int_{-\infty}^{t}\chi_{BA}(t-t')\,F(t')\,dt'
$$
と表され、$\chi_{BA}$ は応答関数（感受率）である。

### 1.1 久保公式（Kubo formula）
平衡平均 $\langle\cdots\rangle_{\mathrm{eq}}$ を用いると、応答関数は
$$
\chi_{BA}(t)=\frac{i}{\hbar}\,\theta(t)\,\langle [B(t),A(0)]\rangle_{\mathrm{eq}}
$$
となる。ここで $\theta(t)$ は因果性（未来の外場を参照しない）を表すステップ関数である。

この式が重要なのは、非平衡で観測される輸送係数が、平衡の相関関数として計算できる点にある。

## 2. 電気伝導度のKubo形式
電場 $\mathbf{E}(t)$ に対する電流密度 $\mathbf{j}(t)$ の線形応答として
$$
j_\alpha(\omega)=\sum_\beta \sigma_{\alpha\beta}(\omega)\,E_\beta(\omega)
$$
で伝導度テンソル $\sigma_{\alpha\beta}(\omega)$ を定義する。

Kubo形式では、電子系の電流演算子（全電流） $J_\alpha$ を用いて、概念的に
- 伝導度は電流–電流相関（current-current correlation）で決まる
という構造になる。

実装では、同値な表現が複数あり、直流極限（$\omega\to 0$）における数値安定性のために、直流項（intraband）と光学遷移項（interband）を分けて扱う流儀が多い。

## 3. Kubo–Greenwood法
Kubo–Greenwood法は、相互作用を平均場（Kohn–Shamなど）で取り込んだ単一粒子状態 $|n\mathbf{k}\rangle$ を用い、伝導度を遷移の総和として書く方法である。代表的な一例として、実部の光学伝導度に対し
$$
\mathrm{Re}\,\sigma_{\alpha\beta}(\omega)=
\frac{2\pi e^2}{\Omega}\sum_{\mathbf{k}}\sum_{n,m}
\left(f_{n\mathbf{k}}-f_{m\mathbf{k}}\right)
\langle n\mathbf{k}|v_\alpha|m\mathbf{k}\rangle
\langle m\mathbf{k}|v_\beta|n\mathbf{k}\rangle
\,\delta\!\left(\varepsilon_{m\mathbf{k}}-\varepsilon_{n\mathbf{k}}-\hbar\omega\right)
$$
の形が用いられる（$v_\alpha$ は速度演算子、$\Omega$ は体積、$f$ は占有数である）。

ポイントは以下である。
- 物理は相関関数で決まるが、数値的にはバンド間遷移の総和として評価できる
- デルタ関数があるため、数値計算では必ずスペクトルの広がり（ブロードニング）が必要である
- 金属では $\omega\to 0$ の扱いが本質であり、intraband（Drude的）寄与の取り扱いが支配的になりやすい

### 3.1 デルタ関数の近似と散乱時間の解釈
数値計算では
$$
\delta(x)\rightarrow \delta_\eta(x)
$$
として、ガウス型やローレンツ型の広がり $\eta$ を導入する。ローレンツ型は緩和時間 $\tau$ と結び付けられやすく、
$$
\eta \sim \frac{\hbar}{\tau}
$$
のように見なして、有限温度・欠陥・乱雑性による寿命効果を半経験的に取り込むことが多い。

### 3.2 直流伝導度
Kubo–Greenwoodの式は周波数依存の伝導度に自然である一方、$\omega\to 0$ で有限の $\sigma_{\mathrm{DC}}$ を得るには
- 有限ブロードニング
- 十分な $k$ 点密度
- 十分な非占有バンド数
が必要になる。系が理想結晶で散乱が無い極限では、理想的にはDCで発散（無限大）し得るため、有限値を得るには散乱（寿命）のモデル化が不可避である。

## 4. 第一原理データから輸送へ
1. 構造最適化または有限温度の原子配置（必要なら複数スナップショット）を用意する  
2. 電子状態（固有値 $\varepsilon_{n\mathbf{k}}$ と固有状態 $|n\mathbf{k}\rangle$）を十分収束させる  
3. 速度（または運動量）行列要素を評価する  
4. Kubo–Greenwoodの総和を、適切な $\delta_\eta$ とともに計算する  
5. 必要に応じてスナップショット平均や、方向平均（多結晶近似）を行う  

有限温度・乱雑性を扱う定番は次の2系列である。
- 原子配置を実空間で揺らし（MDなど）、各スナップショットでKGを計算して平均する
- 不規則合金などでは、配置平均を理論側（CPAなど）で行い、Kubo–Greenwoodをグリーン関数形式で評価する

## 5. 線形応答の強み
線形応答理論とKGの利点は、対象を限定しない点にある。導電だけでなく、同じ枠組みで
- 磁化率、誘電率、光学応答
- 熱電効果（Onsager係数）
- スピン輸送（スピン電流相関）
へ拡張できる。

例えば、電気伝導度と誘電関数の間には
$$
\varepsilon(\omega)=1+\frac{i}{\varepsilon_0\omega}\sigma(\omega)
$$
の関係があり、光学測定と計算結果の接続が明快である。

## 6. 注意点
### 6.1 独立粒子近似とバーテックス補正
KGは実装上、独立粒子（平均場）表式として使われることが多い。強い散乱や相関がある場合には、自己エネルギーやバーテックス補正が重要になり得るため、解釈には注意が必要である。

### 6.2 収束のボトルネック
- $k$ 点密度：金属ではフェルミ面付近が支配的であり、粗い $k$ 点は致命的である
- 非占有バンド数：光学周波数領域では多数の非占有状態が必要である
- ブロードニング $\eta$：小さすぎると数値ノイズ、大きすぎると物理が潰れる

## 7. 関連手法との位置づけ
| 手法 | 目的 | 典型入力 | 長所 | 注意点 |
|---|---|---|---|---|
| 線形応答（久保公式） | 輸送・応答を一般式で扱う | 平衡相関関数 | 量子・多体系の一般枠組みである | 実計算には近似や表現変換が必要である |
| Kubo–Greenwood | 伝導度・光学伝導度の数値評価 | バンドと速度行列要素 | 実装が比較的直接的である | DC極限の扱いと散乱モデルが本質である |
| ボルツマン輸送（RTA等） | 熱電・移動度の半古典評価 | バンドと群速度、散乱時間 | 収束が速く設計探索に向く | 散乱時間モデルの妥当性が支配する |

## まとめ
- 線形応答理論は、外場に対する一次応答を平衡相関関数で表す枠組みであり、輸送係数をミクロに定義できる理論である。
- Kubo–Greenwood法は、Kubo形式を単一粒子状態の遷移総和へ落とし込み、伝導度や光学応答を第一原理データから評価する代表的手法である。
- 実務では、DC極限、ブロードニング、$k$ 点と非占有バンドの収束、乱雑性・温度の取り込み方が結果の信頼性を決める要点である。

