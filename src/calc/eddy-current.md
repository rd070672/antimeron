# 動く磁壁が誘起する局所渦電流

導電性をもつ強磁性体では、磁壁が移動すると磁化分布が時間変化し、ファラデー誘導により局所的な渦電流が生じる。渦電流はジュール散逸として損失を与えるだけでなく、自己誘起磁場を通じて磁壁運動を抑制し、動的磁化過程（B-H ループ、Barkhausen 雑音、複素透磁率など）を変形させる機構となる。

## 参考ドキュメント
- Colaiori, Durin, Zapperi, Eddy current damping of a moving domain wall: beyond the quasistatic approximation, Phys. Rev. B 76, 224416 (2007)
  https://link.aps.org/doi/10.1103/PhysRevB.76.224416
- Hayashi et al., Time-Domain Observation of the Spinmotive Force in Permalloy Nanowires, Phys. Rev. Lett. 108, 147202 (2012)
  https://link.aps.org/doi/10.1103/PhysRevLett.108.147202
- [日本語] JMAG-International, [W-MA-88] 異常渦電流損失計算の高精度化 (1)
  https://www.jmag-international.com/jp/whitepapers/w-ma-88/

## 1. 磁壁は「移動する磁束変化源」である
磁壁は、磁化が反転する狭い遷移領域（幅 $\Delta$）である。壁が速度 $v$ で移動すると、磁化分布は概ね
$$
\mathbf{M}(\mathbf{r},t)\approx \mathbf{M}(\mathbf{r}-\mathbf{v}t)
$$
のように時間変化し、磁束密度
$$
\mathbf{B}=\mu_0\left(\mathbf{H}+\mathbf{M}\right)
$$
の時間変化 $\partial\mathbf{B}/\partial t$ を生む。導体中ではこの磁束変化が回転電場を生み、渦電流を駆動する。

重要点は、磁壁運動による $\partial\mathbf{M}/\partial t$ が空間的に局在しやすく、試料幾何・境界条件に依存して「局所的に集中した電流ループ」を形成しうる点である。したがって、渦電流は一様磁化回転（全体が同相で変化）から期待される古典渦電流像よりも、空間的に複雑な分布をとりうる。

## 2. 磁気準静近似と構成則
多くの金属磁性体の低〜中周波域では、変位電流を無視した磁気準静近似がよく用いられる。基本式は
$$
\nabla\times\mathbf{E}=-\frac{\partial\mathbf{B}}{\partial t},\quad
\nabla\times\mathbf{H}=\mathbf{J},\quad
\nabla\cdot\mathbf{B}=0
$$
であり、材料の構成則は
$$
\mathbf{J}=\sigma\mathbf{E},\quad
\mathbf{B}=\mu_0(\mathbf{H}+\mathbf{M})
$$
である（$\sigma$ は導電率）。渦電流損失（ジュール熱）の局所密度は
$$
p(\mathbf{r},t)=\mathbf{J}\cdot\mathbf{E}=\frac{|\mathbf{J}|^2}{\sigma}=\sigma|\mathbf{E}|^2
$$
で与えられる。

ここで $\mathbf{M}$ は外生的に与える量ではなく、磁壁の内部自由度として運動方程式をもつ。代表的には LLG 方程式により
$$
\frac{\partial\mathbf{m}}{\partial t}
=-\gamma\,\mathbf{m}\times\mathbf{H}_{\mathrm{eff}}
+\alpha\,\mathbf{m}\times\frac{\partial\mathbf{m}}{\partial t},\quad
\mathbf{m}=\frac{\mathbf{M}}{M_s}
$$
と書ける。したがって、電磁場（Maxwell）と磁化ダイナミクス（LLG）が結合した問題となる。

## 3. 1次元磁壁モデル：$\partial\mathbf{M}/\partial t$ の局在
例えば Bloch壁を1次元で近似すると、壁中心 $q(t)$ に対して
$$
m_z(x,t)=\tanh\!\left(\frac{x-q(t)}{\Delta}\right),\quad
m_x(x,t)=\mathrm{sech}\!\left(\frac{x-q(t)}{\Delta}\right)
$$
などの形をとる（表式は磁気異方性と交換のバランスで定まる）。壁速度 $v=\dot{q}$ とすると
$$
\frac{\partial m_z}{\partial t}
=-\dot{q}\,\frac{\partial m_z}{\partial x}
\sim \frac{v}{\Delta}
$$
のように、時間変化は壁幅 $\Delta$ によって鋭く局在する。したがって局所的なスケーリングとして
$$
\left|\frac{\partial\mathbf{M}}{\partial t}\right|
\sim v\,\frac{\Delta M}{\Delta}
$$
が得られる。

この局在した $\partial\mathbf{M}/\partial t$ が $\partial\mathbf{B}/\partial t$ を通じて誘導を生み、結果として渦電流分布が磁壁周辺で強くなる。

## 4. 渦電流生成のスケーリング
ファラデーの法則
$$
\nabla\times\mathbf{E}=-\frac{\partial\mathbf{B}}{\partial t}
$$
から、代表長さ $\ell$ を用いた量的見積もりとして
$$
E \sim \ell\,\left|\frac{\partial B}{\partial t}\right|
$$
が得られる。ここで $\ell$ は磁壁幅ではなく、電流ループが回り込む幾何スケール（板厚、線幅、スリット間隔、積層ピッチなど）で決まる量である。

オーム則により
$$
J\sim \sigma E \sim \sigma\,\ell\,\left|\frac{\partial B}{\partial t}\right|
$$
損失密度は
$$
p\sim \frac{J^2}{\sigma}\sim \sigma\,\ell^2\,\left|\frac{\partial B}{\partial t}\right|^2
$$
となり、導電率が大きいほど局所渦電流とジュール散逸が増えることがわかる。磁性体では $\mu$ が大きくなりやすく、後述の磁気拡散時定数や表皮深さにも強く影響するため、単純に「良導体ほど損失増」と言い切れない局面もあるが、局所誘導の感度は概ね増大しやすい。

## 5. 渦電流が磁壁運動を抑制する
渦電流は自己磁場 $\mathbf{H}_{\mathrm{ec}}$ を作り、レンツの法則に従って磁束変化（＝磁壁運動）を妨げる。磁壁に働く反作用は、単純化すると速度に比例する粘性抵抗として
$$
F_{\mathrm{ec}}\approx -\eta\,v
$$
と書けることがある。

しかし磁場と電流の応答には磁気拡散の時間遅れがあり、壁の速度の履歴に依存する形が本質的になることがある。一般に
$$
F_{\mathrm{ec}}(t)=-\int_0^{\infty}K(s)\,v(t-s)\,ds
$$
のような畳み込みで表され、$K(s)$ は試料形状と境界条件で決まるカーネルである。

速度が十分にゆっくり変化する場合、畳み込みを時間微分の展開として
$$
F_{\mathrm{ec}}(t)\approx -\eta\,v(t)-m_{\mathrm{eff}}\,\frac{dv}{dt}+\cdots
$$
と整理でき、履歴効果は有効慣性項に見かけ上吸収される。このとき幾何によって $m_{\mathrm{eff}}<0$ となる整理が与えられうることが知られており、Barkhausen 雑音やジャンプ統計の解釈に影響する（負の有効質量という言い方は近似表現であり、物理的には渦電流の遅れ応答を等価的に表しているに過ぎない）。

この反作用は磁壁の運動にのみ働くのではなく、磁区構造全体としての動的応答（透磁率スペクトル、磁化過程の緩和）を変えるため、周波数依存の損失成分と密接に結びつく。

## 6. 古典渦電流損失と異常（過剰）損失
交流磁化の損失はしばしば
$$
P_{\mathrm{tot}}=P_{\mathrm{hys}}+P_{\mathrm{cl}}+P_{\mathrm{ex}}
$$
のように分けて議論される。ここで

- $P_{\mathrm{hys}}$ はヒステリシス損失（不可逆過程、ピン止め）
- $P_{\mathrm{cl}}$ は古典渦電流損失（連続体近似・空間平均的誘導）
- $P_{\mathrm{ex}}$ は異常（過剰）損失（局所磁壁運動の統計性・局在誘導などを含む）

である。磁壁移動に伴う局所渦電流は、$P_{\mathrm{ex}}$ の代表的な物理像の一つとして整理される。

周波数依存の典型像として、$P_{\mathrm{cl}}$ が $f^2$ に比例しやすい一方で、$P_{\mathrm{ex}}$ は磁壁密度、磁壁速度の統計、微視的局在スケールの影響を受け、非整数べきに近い依存を示すことがある。現象としては「中周波域で $f^2$ からのずれが現れる」「MBN のパルス形状や統計が変形する」などとして観測される。

注意として、磁歪・内部摩擦・粘弾性、あるいは複素透磁率の周波数分散などが、$P_{\mathrm{ex}}$ と見かけ上似た周波数依存を与える場合がある。したがって局所渦電流起源を主張するには、電気抵抗・試料厚み・絶縁・スリットなど渦電流経路を制御した系統比較が有効である。

## 7. 電流ループの設計問題
局所渦電流は磁壁幅 $\Delta$ だけで決まらず、電流が閉じる経路に支配される。したがって、次の要因が決定的に効く。

- 板厚・線幅・試料形状：電流ループの代表長さ $L$ を変える
- 積層や絶縁膜：ループの閉路を遮断し、等価抵抗を増やす
- スリット・溝加工：渦電流の大域経路を分断する
- 磁区細分化（レーザ処理等）：磁化変化の分担と局所 $\partial\mathbf{M}/\partial t$ ピークを変える

磁気拡散の代表時定数は概念的に
$$
\tau_{\mathrm{ec}}\sim \mu\,\sigma\,L^2
$$
であり、$L$ が大きいほど（厚いほど、幅が広いほど）渦電流応答の遅れが強くなり履歴が出やすい。周波数領域では表皮深さ
$$
\delta=\sqrt{\frac{2}{\omega\,\mu\,\sigma}}
$$
が重要であり、$\delta$ が板厚より小さくなると電流と損失が表層に偏る。磁壁運動が表層で偏在する場合は、局所渦電流との重なりがさらに強くなりうる。

磁区細分化は磁壁本数を増やすが、全体の磁束変化を多数の壁で分担すると各壁の必要速度が下がり、局所的な $|\partial\mathbf{M}/\partial t|$ のピークが下がる方向に働くことがある。一方で、壁本数増加はピン止めイベント数を増やし、$P_{\mathrm{hys}}$ や MBN 統計を変える可能性があるため、単純な単調関係にはならない。

## 8. 観測シグナル
局所渦電流の影響は、複数の観測量に表れる。

### 8.1 動的 B-H ループと周波数依存
- 低周波域：$P_{\mathrm{hys}}$ 優勢になりやすい
- 高周波域：$P_{\mathrm{cl}}$ 優勢（$f^2$ 的増大）になりやすい
- 中間域：$P_{\mathrm{ex}}$ の寄与が現れ $f^2$ からのずれが見えやすい

厚みや絶縁で渦電流経路を変えたとき、ループのふくらみや損失の周波数依存が系統的に変化すれば、局所渦電流による反作用が疑われる。

### 8.2 磁気バルクハウゼンノイズ（MBN）
渦電流ダンピングは磁壁速度パルスを平滑化し、パルス幅・立ち上がり時間・統計分布を変える。拡散遅れが強いと、壁速度の履歴依存が MBN の非マルコフ性として観測される可能性がある。

### 8.3 空間分解観測との同期
Kerr 観察などで壁位置 $q(t)$ を追跡し、電気信号（端子電圧）や磁化信号と同期させると、壁運動と誘導応答の因果関係が見えやすい。特に磁壁がジャンプする瞬間の信号波形は局所誘導の検出に向く。

## 9. スピンモーティブフォース（SMF）
磁壁運動に伴う電圧は、古典的なファラデー誘導に加えて、磁化テクスチャの時空間変化に由来する有効電場（ベリー位相起源）として記述されることがある。代表式は
$$
\mathbf{E}_{\mathrm{em}}
=-\frac{\hbar}{2e}\,
\mathbf{m}\cdot\left(\frac{\partial\mathbf{m}}{\partial t}\times\nabla\mathbf{m}\right)
$$
である（係数や符号は規約に依存する）。

SMF はナノワイヤ等で壁運動に同期した端子電圧として観測されるが、同じ実験で古典誘導（渦電流）も同時に起こりうる。切り分けには、以下が手掛かりになりうる。

- 幾何依存：渦電流は電流ループの閉路と抵抗に強く依存する
- 抵抗依存：$\sigma$ の変化や積層絶縁に対する感度が大きい
- 信号対称性：壁の伝搬方向反転や磁化反転に対する符号の変化則
- 周波数・時間スケール：$\tau_{\mathrm{ec}}$ の有無（遅れ・履歴の出現）

## 10. 数値モデル化
目的に応じてモデルを段階化すると、解釈が安定する。

### 10.1 段階A：磁壁運動を与えて電磁場だけ解く
磁壁位置 $q(t)$ あるいは $\mathbf{M}(\mathbf{r},t)$ を外部から与え、Maxwell（準静）を解いて $\mathbf{E},\mathbf{J}$ を得る。損失は
$$
P(t)=\int_V \frac{|\mathbf{J}(\mathbf{r},t)|^2}{\sigma}\,dV
$$
で評価する。境界条件（外部回路に流れない、絶縁境界、電位ゲージなど）の置き方が結果を左右する。

### 10.2 段階B：反作用を有効項として磁壁方程式に入れる
磁壁座標 $q(t)$ の有効方程式に粘性・履歴を入れ
$$
M_q \ddot{q} + \Gamma \dot{q} + \frac{\partial U}{\partial q} = F_{\mathrm{drive}} + F_{\mathrm{ec}}[v]
$$
のように扱う。$F_{\mathrm{ec}}$ を畳み込みで与えることで、幾何に起因する遅れを再現する。

### 10.3 段階C：Maxwell–LLG の結合（自己無撞着）
LLG で $\mathbf{M}$ を更新し、$\partial\mathbf{B}/\partial t$ をソースとして電磁場を解き、得られた $\mathbf{H}_{\mathrm{ec}}$ を有効磁場に戻す。
$$
\mathbf{H}_{\mathrm{eff}}=\mathbf{H}_{\mathrm{ext}}+\mathbf{H}_{\mathrm{ex}}+\mathbf{H}_{\mathrm{ani}}+\mathbf{H}_{\mathrm{demag}}+\mathbf{H}_{\mathrm{ec}}
$$
この結合は計算コストが高くなりやすく、時間刻みは LLG の高速スケールと $\tau_{\mathrm{ec}}$ の双方を解像する必要がある。計算上は、準静近似の妥当性と、電磁場ソルバ（FEM等）の安定性が鍵である。

## 11. 典型パラメータの対応表
| 量 | 記号 | 代表スケール | 増えるとどうなるか |
|---|---|---|---|
| 導電率 | $\sigma$ | 金属で大 | 渦電流・ジュール散逸・反作用が増えやすい |
| 代表幾何長 | $L$ | 厚み・幅・ループ長 | $\tau_{\mathrm{ec}}\sim \mu\sigma L^2$ が増え、遅れが強まる |
| 表皮深さ | $\delta$ | $\sqrt{2/(\omega\mu\sigma)}$ | 小さいほど表層集中し、局所重なりが変わる |
| 磁壁幅 | $\Delta$ | nm–100 nm | 小さいほど局所 $|\partial\mathbf{M}/\partial t|$ が増えやすい |
| 磁壁速度 | $v$ | m/s 程度 | 大きいほど誘導が強くなる |
| 透磁率 | $\mu$ | 大 | 拡散・表皮に影響し、損失の形を変える |
| 磁区構造 | 統計量 | 材料依存 | 磁壁密度・ピン止め統計が $P_{\mathrm{ex}}$ と MBN を規定する |

## まとめ
磁壁移動は局在した $\partial\mathbf{M}/\partial t$ を通じて回転電場を生み、導体中に局所渦電流を誘起する。渦電流はジュール散逸を与えるだけでなく、自己誘起磁場による反作用として磁壁運動を粘性的に抑制し、さらに磁気拡散の遅れがあると速度履歴依存（有効慣性項）として現れる。損失分離の枠組みでは異常（過剰）損失の主要候補機構であるが、磁歪や透磁率分散など別機構との切り分けのためには、幾何・絶縁・抵抗率を制御した系統比較と、MBN・空間分解観測を組み合わせた検証が要点である。