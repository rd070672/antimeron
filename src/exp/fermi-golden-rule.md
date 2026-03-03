# フェルミの黄金律

フェルミの黄金律は、弱い摂動によって量子状態が別の状態へ移る速さ（遷移率）を、行列要素と状態密度で与える公式である。固体中の散乱、光吸収、緩和時間、スペクトル線幅など、多くの観測量を同じ骨格で結び付ける道具である。

## 参考ドキュメント
1. 東京大学 量子力学II 講義ノート（フェルミの黄金律を含む）  
   https://cat.phys.s.u-tokyo.ac.jp/lecture/QM2_19/quantum_mechnics_II_0702ver.pdf
2. 石川（CPS-JP公開資料）フェルミの黄金律（日本語PDF）  
   https://www.cps-jp.org/~mosir/pub/2015/2015-01-26/ishikawa/pub-web/fermi-golden-rule.pdf
3. P. A. M. Dirac, The Quantum Theory of the Emission and Absorption of Radiation (1927, PDF)  
   https://wwwhome.lorentz.leidenuniv.nl/~boyarsky/media/Proc.R.Soc.Lond.-1927-Dirac-243-65.pdf

## 1. フェルミの黄金律が担う役割

量子系のハミルトニアンを
$$
H = H_{0} + V(t)
$$
と分け、$H_{0}$ の固有状態 $|n\rangle$ と固有値 $E_{n}$ を基底として、摂動 $V(t)$ による状態遷移を議論する枠組みである。固体物理では $|n\rangle$ がブロッホ状態やフォノン励起、スピン励起などの多体状態になり、遷移率は次の量と結び付く。

- 電気伝導や熱伝導の緩和時間 $\tau$（散乱率 $1/\tau$）
- 光学吸収係数、誘電関数、光電流
- X線吸収（XAS）やコア準位分光における選択則と強度
- 準粒子寿命と線幅（スペクトルの広がり）
- トンネル電流（STM、接合、界面輸送）

黄金律は「時間に依存する摂動の一次の摂動論」であるが、連続スペクトルへの遷移を扱うとき、確率が時間に比例し、一定の遷移率が得られる点が要である。

## 2. 基本式：離散状態から連続状態へ

### 2.1 相互作用表示と遷移振幅

相互作用表示で
$$
|\psi(t)\rangle = \sum_{n} c_{n}(t) e^{-iE_{n}t/\hbar} |n\rangle
$$
とおくと、一次の摂動論で初期状態 $|i\rangle$ から終状態 $|f\rangle$ への振幅は
$$
c_{f}^{(1)}(t)
= -\frac{i}{\hbar}\int_{0}^{t} dt' \, \langle f|V(t')|i\rangle \, e^{i\omega_{fi}t'}
$$
である。ここで $\omega_{fi}=(E_{f}-E_{i})/\hbar$ である。

時間に依存しない摂動 $V(t)=V$ の場合、
$$
c_{f}^{(1)}(t)
= -\frac{i}{\hbar}\langle f|V|i\rangle \int_{0}^{t} dt' \, e^{i\omega_{fi}t'}
= \langle f|V|i\rangle \frac{e^{i\omega_{fi}t}-1}{\hbar\omega_{fi}}
$$
となり、遷移確率は
$$
P_{i\to f}(t)=|c_{f}^{(1)}(t)|^{2}
= \frac{|\langle f|V|i\rangle|^{2}}{\hbar^{2}}
\frac{4\sin^{2}(\omega_{fi}t/2)}{\omega_{fi}^{2}}
$$
である。右辺の $\sin^{2}x/x^{2}$ は $t$ が大きいほど鋭いピークになり、エネルギー保存に対応する。

### 2.2 長時間極限とデルタ関数

終状態が連続で、$f$ をエネルギーで積分できるとき、上のピークの面積は $t$ に比例し、
$$
\lim_{t\to\infty}\frac{\sin^{2}\left[(E_{f}-E_{i})t/(2\hbar)\right]}{\left[(E_{f}-E_{i})/2\right]^{2}}
= 2\pi t \hbar \, \delta(E_{f}-E_{i})
$$
という関係を用いて、遷移率（単位時間あたりの確率）が得られる。

### 2.3 フェルミの黄金律

連続終状態に対して、遷移率 $\Gamma_{i\to f}$ は
$$
\Gamma_{i\to f}
= \frac{2\pi}{\hbar}|\langle f|V|i\rangle|^{2}\rho(E_{f})
$$
と書ける。より基本には
$$
\Gamma_{i\to f}
= \frac{2\pi}{\hbar}|\langle f|V|i\rangle|^{2}\delta(E_{f}-E_{i})
$$
であり、$\rho(E)$ は終状態の状態密度である。

固体では「状態密度」と「行列要素」の両方が強度や散乱率を支配するため、同じ材料でもバンド構造や対称性、欠陥や振動モードにより $\Gamma$ が大きく変わる。

## 3. 調和摂動（光・フォノン）とエネルギー選別

電磁波やフォノンなど、単一周波数 $\omega$ をもつ摂動は
$$
V(t)=V_{\omega}e^{-i\omega t}+V_{\omega}^{\dagger}e^{i\omega t}
$$
と表せる。このとき黄金律は
$$
\Gamma_{i\to f}
=\frac{2\pi}{\hbar}\left(
|\langle f|V_{\omega}|i\rangle|^{2}\delta(E_{f}-E_{i}-\hbar\omega)
+
|\langle f|V_{\omega}^{\dagger}|i\rangle|^{2}\delta(E_{f}-E_{i}+\hbar\omega)
\right)
$$
となり、吸収（$+\hbar\omega$）と放出（$-\hbar\omega$）が同一形式で並ぶ。

温度が入ると、フォノン占有数
$$
n_{\mathbf{q}\nu}=\frac{1}{e^{\hbar\omega_{\mathbf{q}\nu}/k_{B}T}-1}
$$
が現れ、吸収には $n_{\mathbf{q}\nu}$、放出には $n_{\mathbf{q}\nu}+1$ が係数として付く。これが散乱率の温度依存の出発点である。

## 4. 行列要素：ブロッホ状態と選択則

### 4.1 ブロッホ状態の表式

結晶中の電子状態は
$$
\psi_{n\mathbf{k}}(\mathbf{r})
=\frac{1}{\sqrt{\Omega}}u_{n\mathbf{k}}(\mathbf{r})e^{i\mathbf{k}\cdot\mathbf{r}}
$$
と書け、相互作用（電場、格子振動、欠陥ポテンシャルなど）により $\mathbf{k}$ が変化する遷移が起こる。格子周期性がある摂動なら結晶運動量保存（逆格子ベクトル $\mathbf{G}$ を許す）が入り、
$$
\mathbf{k}'=\mathbf{k}+\mathbf{q}+\mathbf{G}
$$
の形をとる。

### 4.2 双極子近似と光学遷移

電磁波との相互作用を最も基本的に扱うと、双極子遷移（電気双極子）により
$$
\langle f|V_{\omega}|i\rangle \propto \mathbf{e}\cdot \langle f|\mathbf{r}|i\rangle
\quad \text{または}\quad
\mathbf{e}\cdot \langle f|\mathbf{p}|i\rangle
$$
が現れる。ここで $\mathbf{e}$ は偏光である。結晶対称性・軌道対称性から遷移が強く抑制される場合があり、強度の消失や異方性として観測される。

### 4.3 コア準位遷移（XASの強度）

X線吸収では初期状態がコア準位（局在）であり、終状態は非占有状態である。黄金律の形はそのまま使え、
$$
\mu(\omega)\propto \sum_{f} |\langle f|\mathbf{e}\cdot\mathbf{r}|i\rangle|^{2}
\delta(E_{f}-E_{i}-\hbar\omega)
$$
となる。ここで $\mu(\omega)$ は吸収係数である。吸収端近傍では非占有状態密度と行列要素が絡み、元素選択性と対称性選別が得られる。

## 5. 散乱率と輸送：緩和時間近似の入口

輸送現象では、準粒子の運動量が散乱で乱される速さが重要である。電子の散乱率 $1/\tau_{n\mathbf{k}}$ を黄金律で書くと、一般形は
$$
\frac{1}{\tau_{n\mathbf{k}}}
=\sum_{n'\mathbf{k}'} W_{n\mathbf{k}\to n'\mathbf{k}'}(1-\cos\theta)
$$
の形になり、$W$ が遷移率である。$(1-\cos\theta)$ は運動量緩和に効く角度因子である（散乱方向が変わらなければ電流は減らない）。

### 5.1 不純物・欠陥による弾性散乱（Born近似）

欠陥ポテンシャル $U(\mathbf{r})$ による弾性散乱は
$$
W_{\mathbf{k}\to \mathbf{k}'}
=\frac{2\pi}{\hbar} n_{\mathrm{i}} |\langle \mathbf{k}'|U|\mathbf{k}\rangle|^{2}
\delta(\varepsilon_{\mathbf{k}'}-\varepsilon_{\mathbf{k}})
$$
の形をとる。$n_{\mathrm{i}}$ は欠陥密度である。金属ではフェルミ準位近傍の状態密度 $N(E_{F})$ が効き、
$$
\frac{1}{\tau}\propto n_{\mathrm{i}} |U|^{2} N(E_{F})
$$
という見通しが得られる（詳細は散乱角の重み付けやバンドの異方性で変形する）。

### 5.2 電子–フォノン散乱

電子–フォノン結合行列要素 $g_{nn'\nu}(\mathbf{k},\mathbf{q})$ を用いると、
$$
W_{n\mathbf{k}\to n'\mathbf{k}+\mathbf{q}}
=\frac{2\pi}{\hbar}\sum_{\nu}
|g_{nn'\nu}(\mathbf{k},\mathbf{q})|^{2}
\left[
(n_{\mathbf{q}\nu}+1-f_{n'\mathbf{k}+\mathbf{q}})\delta(\varepsilon_{n'\mathbf{k}+\mathbf{q}}-\varepsilon_{n\mathbf{k}}-\hbar\omega_{\mathbf{q}\nu})
+
n_{\mathbf{q}\nu}(1-f_{n'\mathbf{k}+\mathbf{q}})\delta(\varepsilon_{n'\mathbf{k}+\mathbf{q}}-\varepsilon_{n\mathbf{k}}+\hbar\omega_{\mathbf{q}\nu})
\right]
$$
のように書ける（簡潔化のため占有数の形は代表的に示した）。この式は「温度で散乱が増える」ことを定量化し、抵抗率の温度依存、キャリア移動度、熱化時間などに直結する。

## 6. スペクトル関数

### 6.1 遷移率から寿命へ

ある準位が連続状態へ崩壊する場合、遷移率 $\Gamma$ から平均寿命 $\tau$ を
$$
\tau = \Gamma^{-1}
$$
とみなせる。観測では、寿命はスペクトル線幅（エネルギーの広がり）と対応し、
$$
\Delta E \sim \hbar\Gamma
$$
という関係が現れる（厳密には線形状や定義による）。

### 6.2 デルタ関数の幅：有限寿命・有限分解能の扱い

実データや数値計算ではデルタ関数を幅をもつ関数で近似することが多い。基本としてローレンツ型
$$
\delta(x)\to \frac{1}{\pi}\frac{\eta}{x^{2}+\eta^{2}}
$$
あるいはガウス型が用いられる。$\eta$ は寿命広がりや装置分解能、温度によるゆらぎをまとめた有効幅として扱われることが多い。

### 6.3 グリーン関数・自己エネルギーの虚部

多体論では、準粒子の減衰は自己エネルギー $\Sigma(\omega)$ の虚部で表され、
$$
\Gamma(\omega)=\frac{2}{\hbar}\, \mathrm{Im}\,\Sigma(\omega)
$$
の形で寿命が得られる。弱結合極限では $\mathrm{Im}\,\Sigma$ の計算が黄金律の形に還元されるため、黄金律は「線幅を与える最小ユニット」として理解できる。

## 7. 黄金律と線形応答（Kubo）との関係

外場に対する応答を一般に扱うとき、線形応答理論（Kubo公式）が使われる。電気伝導の周波数依存を例にとると、
$$
\sigma(\omega)
=\frac{1}{\hbar\omega\Omega}\int_{0}^{\infty} dt \, e^{i\omega t}\langle [\hat{J}(t),\hat{J}(0)] \rangle
$$
のような相関関数で与えられる。ここから「電流演算子による状態間遷移」として書き直すと、遷移率の和として表され、デルタ関数を含む形は黄金律の構造と一致する。

この対応は、次の理解を与える。

- 物理量の応答は、状態間遷移の集合として表せる
- 強度は行列要素の二乗で重み付けされる
- エネルギー選別はデルタ関数（あるいは有限幅）で与えられる

## 8. 黄金律の形式

黄金律の形式
$$
\Gamma \sim \frac{2\pi}{\hbar}\times (\text{結合の強さ}) \times (\text{利用可能な終状態の多さ})
$$
は、材料設計やデータ解釈において「どちらが支配的か」を切り分ける助けになる。バンド構造の変化は $\rho(E)$ を変え、対称性や局在度の変化は行列要素を変える。欠陥や界面は両方を変えうる。

### 8.1 摂動と現れるデルタ関数

| 現象 | 摂動 $V(t)$ の性格 | 終状態 | デルタ関数の中身 | 主に効く要素 |
|---|---|---|---|---|
| 不純物散乱 | 時間一定（静的） | 電子連続状態 | $\delta(\varepsilon_{\mathbf{k}'}-\varepsilon_{\mathbf{k}})$ | 欠陥ポテンシャル、$N(E_{F})$ |
| 電子–フォノン散乱 | 調和（$\omega_{\mathbf{q}\nu}$） | 電子連続状態 | $\delta(\varepsilon' -\varepsilon \pm \hbar\omega_{\mathbf{q}\nu})$ | $g_{nn'\nu}$、フォノン占有数 |
| 光吸収 | 調和（$\omega$） | 電子連続状態 | $\delta(E_{f}-E_{i}-\hbar\omega)$ | 双極子行列要素、非占有状態密度 |
| X線吸収 | 調和（$\omega$） | 非占有状態 | $\delta(E_{f}-E_{i}-\hbar\omega)$ | 内殻→価電子遷移行列要素 |
| トンネル | 静的結合 | 2電極の連続状態 | $\delta(E_{L}-E_{R})$（偏差はバイアス） | 結合行列要素、電極DOS |

## 9. 黄金律が自然に崩れる場面

黄金律は一次摂動論であるため、結合が強い、終状態が連続でない、時間が短い、相関が長い、などの場合に単純化が破れやすい。固体で重要なのは次である。

- 結合が強いとき：高次の多重散乱や再和（resummation）が必要になる
- 終状態が離散に近いとき：デルタ関数でなく、コヒーレンス時間や緩和を含む扱いが必要になる
- 超短パルス励起：有限時間の $\mathrm{sinc}^{2}$ 構造がそのまま観測量に現れることがある
- 強相関系：単一粒子状態の描像が成立しにくく、準粒子重みや多体励起が支配する

それでも黄金律は、どの理論に進むにせよ、弱結合極限の整合性を確認する「基準形」として価値がある。

## まとめ

フェルミの黄金律は、遷移率を行列要素の二乗と状態密度で与える公式であり、散乱率、緩和時間、光学吸収、X線吸収、スペクトル線幅などを同じ形式で理解する基盤である。固体・材料の議論では、状態密度（利用可能な終状態）と行列要素（結合の対称性・局在度・相互作用）が分離して見えることが多く、観測量の変化を「どちらが変わったのか」に落とし込む見通しを与えるのである。

## 関連研究
- Fermi's golden rule（概説）  
  https://en.wikipedia.org/wiki/Fermi%27s_golden_rule
- 講義ノート 半導体（光学遷移で黄金律が現れる例）  
  https://www.comm.tcu.ac.jp/quantum-device/semicon4/notes/note4.pdf
- J. M. Zhang et al., Fermi's golden rule: its derivation and breakdown by an ideal model (arXiv, 2016)  
  https://arxiv.org/pdf/1604.06916
- Kubo–Greenwood系の整理（導出と実装を概観するレビュー論文）  
  https://www.sciencedirect.com/science/article/abs/pii/S0010465517302539
