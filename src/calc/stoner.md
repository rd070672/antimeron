# 遍歴電子系のStoner 条件

Stoner 条件は、金属電子系が自発的にスピン分極するための「相互作用の強さ」と「フェルミ準位 DOS」の競合を、最小限の数式で表す判定式である。Hubbard 模型の Hartree–Fock（HF）近似から導くと、磁化・帯磁率・比熱・分光などの計測量へ直接つながる形になる。

## 参考ドキュメント
1. 勝本信吾, 磁性 (Magnetism) 講義ノート（Hubbard model の平均場、Stoner criterion などを含む）  
   https://note-collection.issp.u-tokyo.ac.jp/katsumoto/magnetism2022/magnetism_01-14.pdf
2. Eva Pavarini, Magnetism: Models and Mechanisms（Hubbard 模型の HF 近似から Stoner 表式・帯磁率を導出）  
   https://www.cond-mat.de/events/correl13/manuscripts/pavarini.pdf
3. Luigi Paolasini, Lectures on Magnetism, Lecture 6 “Magnetism in metals”（Stoner criterion と帯磁率増強の整理）  
   https://www.esrf.fr/files/live/sites/www/files/events/Paolasini_magnetism%20lecture6.pdf


## 1. 目的と位置づけ

遍歴電子磁性では、電子は結晶中を動き回る一方で、クーロン反発により同一サイトでの二重占有が抑制され、結果としてスピン分極（強磁性）に向かう場合がある。Hubbard 模型は「運動（バンド）＋局所反発」を最短距離で書ける模型であり、HF 近似で扱うと Stoner モデルとほぼ同型の式が現れる。

本稿の狙いは次の二つである。

- Hubbard 模型の HF 近似から Stoner 条件 $U\rho(E_F)>1$ を導く（記号の定義と単位系の注意も含める）。
- 条件式に現れる $\rho(E_F)$ や相互作用パラメータ（Stoner 因子）を、帯磁率・比熱・分光・散乱などの計測量と接続する。


## 2. Hubbard 模型とスピン分極

### 2.1 Hubbard 模型（単一軌道の基本形）

格子点 $i$ とスピン $\sigma=\uparrow,\downarrow$ に対して

$$
H
= \sum_{ij,\sigma} t_{ij}\, c_{i\sigma}^{\dagger}c_{j\sigma}
+ U\sum_i n_{i\uparrow}n_{i\downarrow},
$$

$$
n_{i\sigma}=c_{i\sigma}^{\dagger}c_{i\sigma}.
$$

- 第1項：ホッピング $t_{ij}$ による運動エネルギー（バンドを作る）
- 第2項：同一サイトでの二重占有に対する反発 $U$

ここで「強磁性」は、スピン分極
$$
m \equiv \frac{1}{2}(n_{\uparrow}-n_{\downarrow})
$$
が自発的に $m\neq 0$ となる状態として表す（$n_{\sigma}$ は1サイト当たり平均占有数）。


## 3. HF（平均場）近似：二体相互作用を一体問題へ

### 3.1 HF の密度型デカップリング

HF の基本操作は、相関項を平均値で一次化することである。もっとも基本的な密度型デカップリングは

$$
n_{i\uparrow}n_{i\downarrow}
\approx \langle n_{i\uparrow}\rangle n_{i\downarrow}
+ n_{i\uparrow}\langle n_{i\downarrow}\rangle
-\langle n_{i\uparrow}\rangle\langle n_{i\downarrow}\rangle .
$$

並進対称（サイト独立）を仮定し $\langle n_{i\sigma}\rangle = n_{\sigma}$ と置くと、

$$
H_U^{\mathrm{HF}}
=U\sum_i
\left(
n_{\uparrow} n_{i\downarrow}
+ n_{\downarrow} n_{i\uparrow}
- n_{\uparrow}n_{\downarrow}
\right).
$$

ここで
$$
n_{\uparrow}=\frac{n}{2}+m,\quad
n_{\downarrow}=\frac{n}{2}-m,\quad
n=n_{\uparrow}+n_{\downarrow}
$$
とすると、スピン依存の有効ポテンシャル（バンドのスピン分裂）が現れる。

### 3.2 有効一体ハミルトニアンとバンド分裂

HF では各スピンの単一粒子エネルギーが

$$
\varepsilon_{k\sigma}
= \varepsilon_k + U n_{-\sigma}
= \varepsilon_k + \frac{Un}{2} - \sigma Um,
$$

（$\sigma=+1$ を $\uparrow$、$\sigma=-1$ を $\downarrow$ と表す表記を用いた）となる。
つまりスピン分裂幅は

$$
\Delta \equiv \varepsilon_{k\downarrow}-\varepsilon_{k\uparrow} = 2Um.
$$

この「自分が分極すると分裂が生まれ、分裂がさらに分極を促す」という自己無撞着の増幅機構が Stoner 型の磁性である。


## 4. Stoner 条件の導出：$U\rho(E_F)>1$

### 4.1 弱分極極限での自己無撞着条件

$T=0$、弱い分極（$m$ が小さい）を考える。スピン分裂 $\Delta=2Um$ により、$\uparrow$ と $\downarrow$ のフェルミ準位が相対的にずれ、その結果として占有数差が生じる。

フェルミ準位近傍で DOS がほぼ一定であると近似すると、

- 片スピン DOS（1サイト当たり、単位エネルギー当たり）を $\rho_{\uparrow}(E_F)=\rho_{\downarrow}(E_F)=\rho(E_F)$ とおく。
- すると、スピン分裂 $\Delta$ による占有数差は一次で

$$
n_{\uparrow}-n_{\downarrow}
\simeq \rho_{\mathrm{tot}}(E_F)\,\frac{\Delta}{2},
$$

ただし $\rho_{\mathrm{tot}}(E_F)=2\rho(E_F)$ を全 DOS（両スピン和）とした。

左辺は定義より $n_{\uparrow}-n_{\downarrow}=2m$、右辺に $\Delta=2Um$ を代入すると

$$
2m \simeq \rho_{\mathrm{tot}}(E_F)\,\frac{2Um}{2}
= U\rho_{\mathrm{tot}}(E_F)\, m.
$$

$m\neq 0$ の非自明解の条件は

$$
U\rho_{\mathrm{tot}}(E_F) > 2
\quad\Longleftrightarrow\quad
U\rho(E_F) > 1.
$$

どちらの形も同じ内容であり、片スピン DOS を使うか全 DOS を使うかの流儀の違いにすぎない。以後、基本形として

$$
U\rho(E_F) > 1
$$

（$\rho(E_F)$ は片スピン DOS）を Stoner 条件と呼ぶ。

### 4.2 帯磁率の Stoner 増強
外場 $B$（または $H$）によるゼーマン分裂を加えると、HF は「外場に加えて $Um$ が内部場として作用する」形になる。線形応答の範囲では

$$
\chi
= \frac{\chi_0}{1-U\rho(E_F)},
$$

ここで $\chi_0$ は相互作用なしの Pauli 常磁性（スピンの）帯磁率である。分母が 0 に近づくほど帯磁率が増強し、$U\rho(E_F)\to 1$ で発散する。したがって

- 自発磁化が出る境界：$U\rho(E_F)=1$
- 自発磁化が出ない側でも、$\chi$ は強く増強される

という予言が得られる。

増強因子（Stoner factor, enhancement）を

$$
S \equiv \frac{\chi}{\chi_0}=\frac{1}{1-U\rho(E_F)}
$$

と置くと、$S$ は「強磁性にどれだけ近いか」を表す尺度になる。


## 5. Stoner パラメータ $I$ と多軌道・実材料への読み替え
実材料では $U$ をそのまま単一数として扱うより、Stoner パラメータ $I$ を導入して

$$
I\,\rho(E_F) > 1
$$

と書くことが多い。$I$ は「交換相互作用に起因するエネルギー低下を、バンド分裂と磁化に対して有効一体的にまとめた量」とみなせる。多軌道（$d$ 軌道群）では、同一サイト内のクーロン反発 $U$ とフント結合 $J_H$ の組合せが実効的な $I$ を与え、軌道分解 DOS の形（van Hove 特異性、擬ギャップ等）も強く効く。

従って、実材料への適用は

- $\rho(E_F)$ がどの軌道・どの原子に由来するか
- 相互作用がどの程度有効に残るか（遮蔽、混成、スピン揺らぎ）

を合わせて考える必要がある。


## 6. 計測量との接続：$S$ と $\rho(E_F)$ をどう得るか
Stoner 条件は「相互作用」と「DOS」の積で決まるため、計測では次の二系統が重要になる。

- $\rho(E_F)$（または準粒子 DOS $\rho^{*}(E_F)$）を見積もる
- $\chi$ の増強から $S$ を見積もる（さらに $I\rho(E_F)$ を逆算）

### 6.1 比熱（電子比熱係数）から $\rho^{*}(E_F)$

低温比熱の電子成分は

$$
C_{\mathrm{el}} = \gamma T,\qquad
\gamma = \frac{\pi^2}{3}k_B^2 \rho^{*}_{\mathrm{tot}}(E_F).
$$

ここで $\rho^{*}_{\mathrm{tot}}(E_F)$ は相互作用で有効質量が増大した「準粒子 DOS」である。DFT が与えるバンド DOS $\rho_{\mathrm{band}}(E_F)$ と比べると、質量増大 $m^{*}/m$ の効果を含めた議論ができる。

補足：実験の $\gamma$ は電子相関・電子格子相互作用なども含んだ結果であり、Stoner の「裸の DOS」との一対一対応ではない。そのため、分光や量子振動と併用して整合を取るのが有効である。

### 6.2 一様帯磁率から $S$（Stoner 増強）を推定

相互作用が弱い金属のスピン帯磁率は Pauli 型で

$$
\chi_0 \propto \mu_B^2 \rho_{\mathrm{tot}}(E_F)
$$

（単位系により $\mu_0$ が付く）である。したがって同一試料で

- 比熱から $\rho^{*}(E_F)$ を得る（$\gamma$）
- 帯磁率から $\chi$ を得る

と、比

$$
S \simeq \frac{\chi}{\chi_0}
$$

で増強因子の大きさが見積もれる。

ただし、測定される帯磁率にはスピン以外の寄与が混ざる。概念的には

$$
\chi_{\mathrm{meas}}
= \chi_{\mathrm{spin}} + \chi_{\mathrm{orb}} + \chi_{\mathrm{core}} + \chi_{\mathrm{imp}}
$$

のように分解されるため、少なくとも以下を意識する必要がある。

- $\chi_{\mathrm{core}}$：内殻電子の反磁性（ほぼ温度独立）
- $\chi_{\mathrm{orb}}$：バンドの軌道応答（Landau 反磁性、Van Vleck 常磁性など）
- $\chi_{\mathrm{imp}}$：微量不純物・欠陥による Curie 的成分（$1/T$）

温度依存の形と磁場依存を丁寧に見て、スピンの一様成分を抽出する。

### 6.3 角度分解光電子（ARPES）・硬X線光電子（HAXPES）

分光は $\rho(E)$（エネルギー依存 DOS）とフェルミ面形状、バンド分散 $E(k)$ を直接与える。

- ARPES：表面近傍の分散・フェルミ面、準粒子幅（散乱率）も得られる
- HAXPES：相対的にバルク感度が高い

Stoner 条件に効くのは $E_F$ 近傍の状態密度であり、平坦バンド・van Hove 特異性・強い混成などが見えると、$\rho(E_F)$ が大きくなりうる。

### 6.4 中性子散乱・スピン励起（パラマグノン）

Stoner/HF は静的な平均場であるが、実材料ではスピン励起が重要になる。中性子散乱は動的構造因子 $S(q,\omega)$ を通じて動的帯磁率 $\chi''(q,\omega)$ を与える。

- $q\approx 0$ 近傍の強いスピン揺らぎ：一様帯磁率の増強と整合
- 強磁性に近い金属でのパラマグノン：平均場臨界からのずれの手掛かり

### 6.5 NMR / $\mu$SR：低エネルギーのスピン揺らぎ

NMR の緩和率 $1/T_1$ は局所磁場揺らぎに敏感であり、近似的に

$$
\frac{1}{T_1T} \propto \sum_q |A(q)|^2 \frac{\chi''(q,\omega_0)}{\omega_0}
$$

で評価される（$\omega_0$ は核ラーモア周波数）。一様帯磁率だけでは見えにくい $q$ 依存の揺らぎを補うことができる。$\mu$SR も同様に低エネルギーの揺らぎと内部磁場を捉える。

### 6.6 XMCD：元素選択的なスピン・軌道磁気モーメント

遍歴磁性が関与する合金・多元素系では、どの元素の $d$ 状態が分極しているかが重要になる。XMCD は吸収端選択により元素別の磁気モーメントにアクセスでき、HF/Stoner の「バンド分裂がどの成分で起きているか」を検証する材料になる。

---

## 7. 主要式と計測対応の一覧

| 目標量 | 理論式（HF/Stoner） | 対応する計測量 | コメント |
|---|---|---|---|
| Stoner 条件 | $I\rho(E_F)>1$ | $\rho(E_F)$ と $S$ を組み合わせて推定 | $\rho(E_F)$ の定義（片スピン/全）に注意 |
| 増強因子 | $S=\chi/\chi_0=1/(1-I\rho(E_F))$ | 一様帯磁率 $\chi$ と $\chi_0$ | $\chi_0$ は DOS 由来（比熱・分光などで補う） |
| Pauli 帯磁率 | $\chi_0 \propto \mu_B^2\rho_{\mathrm{tot}}(E_F)$ | 低温帯磁率（温度依存が弱い成分） | 軌道・内殻・不純物の寄与を差し引く |
| 電子比熱 | $\gamma=\frac{\pi^2}{3}k_B^2\rho^{*}_{\mathrm{tot}}(E_F)$ | 低温比熱の $\gamma$ | 相互作用で増大した準粒子 DOS を含む |
| スピン分裂 | $\Delta=2Im$（モデルにより係数差あり） | スピン分解分光、磁気円二色性 | 励起の寿命効果も絡む |
| 動的応答 | $\chi(q,\omega)$ の増大 | 中性子散乱、NMR、$\mu$SR | HF からのずれ（スピン揺らぎ）を捉える |

---

## 8. $I$ の逆算：$\gamma$ と $\chi$ から $I\rho(E_F)$ を得る見取り図

手順を式でまとめる。

1. 比熱から $\rho^{*}_{\mathrm{tot}}(E_F)$（準粒子 DOS）を見積もる  
   $$
   \rho^{*}_{\mathrm{tot}}(E_F)=\frac{3}{\pi^2}\frac{\gamma}{k_B^2}.
   $$

2. そこから Pauli 帯磁率の見積もり（単位系に応じて係数が付く）  
   $$
   \chi_0 \propto \mu_B^2\rho^{*}_{\mathrm{tot}}(E_F).
   $$

3. 実測の一様帯磁率（低温で温度依存が弱い成分）を $\chi$ として、増強因子  
   $$
   S=\frac{\chi}{\chi_0}.
   $$

4. Stoner 形式 $S=1/(1-I\rho(E_F))$ より  
   $$
   I\rho(E_F)=1-\frac{1}{S}.
   $$

ここで重要なのは、比熱が与えるのはしばしば $\rho^{*}(E_F)$ であり、Stoner の式に入る「裸の」$\rho(E_F)$ と一致しない場合がある点である。実際には ARPES や量子振動が示す有効質量、DFT の $\rho_{\mathrm{band}}(E_F)$ などを合わせ、どのレベルの $\rho(E_F)$ を用いるかを揃えるのが筋が良い。

---

## 9. 注意すべき点

### 9.1 局在モーメント型の混入

観測される Curie–Weiss 的な $1/(T-\theta)$ 成分は、局在モーメントやクラスター、欠陥が原因になりうる。Stoner 的な Pauli 応答（温度依存が弱い）と混ざると、$S$ の推定が不安定になる。磁場依存・温度範囲を変えた系統測定で分離する。

### 9.2 軌道寄与と反磁性の補正

金属の実測帯磁率には Landau 反磁性や Van Vleck 常磁性、内殻反磁性が含まれる。とくに重元素を含む系、強い SOC を持つ系では $\chi_{\mathrm{orb}}$ が無視できない場合がある。XMCD や角度依存帯磁率、g 因子推定などが補助線になる。

### 9.3 スピン揺らぎによる平均場からのずれ

Stoner/HF は静的平均場であり、臨界近傍や弱遍歴強磁性体ではスピン揺らぎが強く、臨界指数や温度依存が平均場からずれることが知られている。中性子散乱や NMR により揺らぎスペクトルを併せて議論すると、$I\rho(E_F)$ の解釈が一段安定する。

### 9.4 DOS のエネルギー依存（van Hove 特異性など）

$\rho(E)$ が $E_F$ 近傍で急峻に変化する場合、$\rho(E_F)$ を「一定」とみなした導出が定量的に崩れる。温度上昇で化学ポテンシャル近傍の平均化が効くため、$\chi(T)$ の弱い温度依存として現れることがある。分光で $\rho(E)$ の形を確認する意義はここにある。


## 10. まとめ

Hubbard 模型の HF（平均場）近似は、スピン分裂 $\Delta=2Um$ を通じた自己増幅機構を与え、弱分極極限で $U\rho(E_F)>1$（片スピン DOS）という Stoner 条件を導く。さらに $\chi=\chi_0/(1-U\rho(E_F))$ により、強磁性に到達しない側でも一様帯磁率が増強されることが分かる。比熱・帯磁率・分光・散乱を組み合わせて $\rho(E_F)$ と増強因子 $S$ を整合させることで、理論式を現実の計測量として検証できる枠組みが得られる。


## 関連研究

- D. P. Arovas, The Hubbard Model (review note; HF と Stoner criterion の位置づけを含む)  
  https://arxiv.org/pdf/2103.12097

- A. I. Lichtenstein, Magnetism: From Stoner to Hubbard（Stoner から Hubbard・多体へ）  
  https://www.cond-mat.de/events/correl13/manuscripts/lichtenstein.pdf

- T. Moriya and A. Kawabata, Effect of Spin Fluctuations on Itinerant Electron Ferromagnetism（スピン揺らぎ理論の展開）  
  https://journals.jps.jp/doi/10.1143/JPSJ.34.639
  https://journals.jps.jp/doi/10.1143/JPSJ.35.669

- 京都大学 OCW（または講義資料）に見られる SCR（自己無撞着繰り込み）理論の解説  
  https://ocw.kyoto-u.ac.jp/wp-content/uploads/2021/04/2010_takahashi_03.pdf

- Arrott プロット（$H/M$ vs $M^2$）の一般的整理（平均場臨界と磁化等温線解析）  
  https://link.aps.org/doi/10.1103/PhysRevB.93.224429
