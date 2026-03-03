# 線形粘弾性モデルの基礎  
粘弾性は、応力とひずみの関係が時間に依存する材料応答である。線形粘弾性ではボルツマン重ね合わせ原理に立脚し、緩和関数・クリープ関数・複素弾性率を用いて実験データとモデルを厳密に接続できるのである。

## 参考ドキュメント
1. 日本機械学会 Mechanical Engineering Dictionary（MED）  
   ボルツマンの重ね合せ原理（日本語）  
   https://www.jsme.or.jp/jsme-medwiki/doku.php?id=07%3A1012281

2. 小野測器  
   制振材料とその性能測定について（WLF 方程式の説明を含む，日本語）  
   https://www.onosokki.co.jp/HP-WK/c_support/newreport/damp/damp_9.htm

3. コロナ社 公開資料  
   応力緩和とクリープ（日本語PDF）  
   https://www.coronasha.co.jp/data/docs1/978-4-339-07246-4_2.pdf?t=1589965555575

## 1. 粘弾性の位置づけ
弾性体は、ひずみ $\varepsilon$ に対して応力 $\sigma$ が瞬時に決まり、履歴依存を持たない。一次元で
$$
\sigma(t)=E\,\varepsilon(t)
$$
である。

粘性体（ニュートン粘性）は、ひずみ速度 $\dot{\varepsilon}$ に応力が比例し、
$$
\sigma(t)=\eta\,\dot{\varepsilon}(t)
$$
である。

粘弾性体は、この両者が混在し、同一の入力（応力履歴あるいはひずみ履歴）に対する応答が時間にわたり変化する。観測される代表現象は、応力緩和（ひずみ一定で応力が減衰する）とクリープ（応力一定でひずみが増加する）である。



## 2. 線形性とボルツマン重ね合わせ原理

線形粘弾性であるとは、(i) 小さな変形域で材料の応答が入力に比例し、(ii) 履歴の寄与が加法的に足し合わさることである。一次元のひずみ制御表現では、緩和弾性率 $E(t)$ を用いて
$$
\sigma(t)=\int_{-\infty}^{t} E(t-\tau)\,\dot{\varepsilon}(\tau)\,d\tau
$$
と書ける。これは畳み込み（ヘリディタリ積分）であり、因果律（$t-\tau<0$ の寄与が無い）を組み込んだ形である。

応力制御表現では、クリープコンプライアンス $J(t)$ を用いて
$$
\varepsilon(t)=\int_{-\infty}^{t} J(t-\tau)\,\dot{\sigma}(\tau)\,d\tau
$$
と書ける。

線形粘弾性では、$E(t)$ と $J(t)$ は互いに独立ではなく、ラプラス変換を介して関係づけられる。ラプラス変換を
$$
\mathcal{L}[f](s)=\hat{f}(s)=\int_{0}^{\infty} f(t)e^{-st}\,dt
$$
とすると、（初期値条件を適切に扱ったうえで）一般に
$$
\hat{E}(s)\,\hat{J}(s)=\frac{1}{s^{2}}
$$
が成立する枠組みが得られる（表現の選び方により $s$ の因子が変わる場合があるため、どの量を定義しているかを式の冒頭で固定する必要がある）。



## 3. 構成要素

## 3.1 ばね（spring）
フック弾性を表し、
$$
\sigma=E\varepsilon
$$
である。エネルギーを可逆的に蓄える。

## 3.2 ダッシュポット（dashpot）
ニュートン粘性を表し、
$$
\sigma=\eta\dot{\varepsilon}
$$
である。エネルギーを散逸する。

これらを直列・並列に結合した機械模型が、粘弾性モデルの最も基本的な表現となる。



## 4. 基本モデル

以下では一次元を基本とし、$\sigma(t)$ と $\varepsilon(t)$ を同一直線方向の応力・ひずみとして扱う。



## 4.1 マクスウェル模型（Maxwell）

ばね $E$ とダッシュポット $\eta$ の直列結合である。直列なのでひずみは加算され、応力は共通である。
$$
\varepsilon=\varepsilon_{s}+\varepsilon_{d},\qquad \sigma=\sigma_{s}=\sigma_{d}
$$
ばね：$\sigma=E\varepsilon_{s}$、ダッシュポット：$\sigma=\eta\dot{\varepsilon}_{d}$ より
$$
\dot{\varepsilon}=\frac{1}{E}\dot{\sigma}+\frac{1}{\eta}\sigma
$$
が得られる。緩和時間
$$
\tau=\frac{\eta}{E}
$$
が支配パラメータである。

ひずみステップ $\varepsilon(t)=\varepsilon_{0}H(t)$ に対し、応力は指数緩和する：
$$
\sigma(t)=E\varepsilon_{0}\,e^{-t/\tau}
$$
したがって緩和弾性率は
$$
E(t)=E\,e^{-t/\tau}
$$
である。



## 4.2 ケルビン・フォークト模型（Kelvin–Voigt）

ばね $E$ とダッシュポット $\eta$ の並列結合である。並列なのでひずみは共通で、応力が加算される。
$$
\sigma=\sigma_{s}+\sigma_{d}=E\varepsilon+\eta\dot{\varepsilon}
$$
応力ステップ $\sigma(t)=\sigma_{0}H(t)$ に対して
$$
\eta\dot{\varepsilon}+E\varepsilon=\sigma_{0}
$$
より、遅れ時間（retardation time）
$$
\tau_{r}=\frac{\eta}{E}
$$
を用いて
$$
\varepsilon(t)=\frac{\sigma_{0}}{E}\left(1-e^{-t/\tau_{r}}\right)
$$
となる。したがってクリープコンプライアンスは
$$
J(t)=\frac{1}{E}\left(1-e^{-t/\tau_{r}}\right)
$$
である。



## 4.3 標準線形固体（Standard Linear Solid, Zener）

弾性的な瞬時応答と、有限の時間での緩和・遅れを同時に表す最小の三要素模型である。表現は同値なものが複数あるが、ここでは「ばね $E_{\infty}$ と Maxwell 要素（ばね $E_{1}$ とダッシュポット $\eta$ の直列）を並列」に採る。

このとき緩和弾性率は
$$
E(t)=E_{\infty}+E_{1}e^{-t/\tau},\qquad \tau=\frac{\eta}{E_{1}}
$$
の形をとる。$t\to 0^{+}$ での瞬時弾性率は $E(0^{+})=E_{\infty}+E_{1}$、$t\to\infty$ での長時間弾性率は $E(\infty)=E_{\infty}$ である。

構成式は微分形として
$$
\sigma+\frac{\eta}{E_{1}}\dot{\sigma}=(E_{\infty}+E_{1})\varepsilon+\eta\left(1+\frac{E_{\infty}}{E_{1}}\right)\dot{\varepsilon}
$$
と書ける。



## 4.4 Burgers 模型

クリープで現れる「瞬時ひずみ」「遅れ弾性」「定常流動」を同時に表す四要素模型である。代表的には Maxwell 模型と Kelvin–Voigt 模型を直列結合したものとして与えられる。

応力ステップ $\sigma_{0}H(t)$ に対するクリープコンプライアンスは、パラメータ表記に依存するが一般に
$$
J(t)=\frac{1}{E_{1}}+\frac{1}{E_{2}}\left(1-e^{-t/\tau_{2}}\right)+\frac{t}{\eta_{1}},\qquad \tau_{2}=\frac{\eta_{2}}{E_{2}}
$$
のように、有限時間で飽和する項と線形に増加する流動項を含む。


## 4.5 モデルの比較

| モデル | 構成式（一次元） | 応力緩和（$\varepsilon=\varepsilon_{0}H(t)$） | クリープ（$\sigma=\sigma_{0}H(t)$） | 表現できる現象 |
|---|---|---|---|---|
| 弾性 | $\sigma=E\varepsilon$ | $\sigma=E\varepsilon_{0}$ | $\varepsilon=\sigma_{0}/E$ | 即時弾性のみ |
| 粘性 | $\sigma=\eta\dot{\varepsilon}$ | $\sigma=0$（ひずみ保持には無限の操作が必要） | $\varepsilon=(\sigma_{0}/\eta)t$ | 流動のみ |
| Maxwell | $\dot{\varepsilon}=\dot{\sigma}/E+\sigma/\eta$ | $E(t)=E e^{-t/\tau}$ | $J(t)=1/E+t/\eta$ | 緩和・流動 |
| Kelvin–Voigt | $\sigma=E\varepsilon+\eta\dot{\varepsilon}$ | 緩和を適切に出しにくい | $J(t)=(1/E)(1-e^{-t/\tau_{r}})$ | 遅れ弾性（流動なし） |
| SLS(Zener) | 3要素 | $E(t)=E_{\infty}+E_{1}e^{-t/\tau}$ | 飽和するクリープ | 緩和と有限クリープ |
| Burgers | 4要素 | 条件により複指数 | $J(t)=1/E_{1}+1/E_{2}(1-e^{-t/\tau_{2}})+t/\eta_{1}$ | 緩和・遅れ弾性・流動 |



## 5. 周波数領域と複素弾性率

粘弾性の動的応答は、正弦波入力に対する位相遅れとして観測される。ひずみ制御を
$$
\varepsilon(t)=\varepsilon_{0}\sin(\omega t)
$$
とすると、応力は一般に
$$
\sigma(t)=\sigma_{0}\sin(\omega t+\delta)
$$
と書ける。ここで $\delta$ は位相差である。

複素弾性率を
$$
E^{*}(\omega)=\frac{\sigma_{0}}{\varepsilon_{0}}(\cos\delta+i\sin\delta)=E'(\omega)+iE''(\omega)
$$
と定義すると、
$$
E'(\omega)=\frac{\sigma_{0}}{\varepsilon_{0}}\cos\delta,\qquad
E''(\omega)=\frac{\sigma_{0}}{\varepsilon_{0}}\sin\delta
$$
である。$E'$ は貯蔵弾性率、$E''$ は損失弾性率である。損失正接（損失係数）は
$$
\tan\delta=\frac{E''}{E'}
$$
である。


## 6. 基本モデルの複素弾性率

粘弾性の周波数応答を議論する目的は、(i) 応力とひずみの位相差がどの要素（弾性・粘性・緩和）から生じるかを明確にし、(ii) 実験で得られる $E'(\omega),E''(\omega)$ の形から、緩和時間や弾性率レベル（$E_0,E_\infty$）を定量化する点にある。以下では、既出の式を保持しつつ、物理解釈・極限挙動の読み取り・同定の見取りを補足し、同じ説明の繰り返しを避ける。


### 6.0 複素弾性率のエネルギー解釈

正弦ひずみ $\varepsilon(t)=\varepsilon_0\cos\omega t$ に対して、応力を
$$
\sigma(t)=\sigma_0\cos(\omega t+\delta)
$$
と書くと、$E^*(\omega)=E'+iE''$ により
$$
\sigma(t)=E'\varepsilon_0\cos\omega t - E''\varepsilon_0\sin\omega t
$$
と表現できる。ここで重要なのは、1周期あたりの散逸エネルギー密度（単位体積当たり）が
$$
W_{\mathrm{diss}}=\oint \sigma\,d\varepsilon=\pi E''(\omega)\,\varepsilon_0^2
$$
となる点である（楕円ヒステリシスの面積）。この式により、$E''$ が損失に比例することが「定義」ではなく力学仕事の計算として確定する。

一方、最大ひずみ時に蓄えられる弾性エネルギー密度は
$$
W_{\mathrm{store}}=\frac{1}{2}E'(\omega)\,\varepsilon_0^2
$$
であり、両者の比から
$$
\frac{W_{\mathrm{diss}}}{2\pi W_{\mathrm{store}}}=\frac{E''}{E'}=\tan\delta
$$
が得られる。$\tan\delta$ は「1ラジアン（位相）あたりの相対損失」に相当し、粘弾性の減衰比較に直接使える。



## 6.1 Maxwell の複素弾性率

Maxwell は直列結合であるため、応力一定保持（ステップひずみ）に対して応力が緩和する材料像と整合する（単一緩和時間の応力緩和）。ステップひずみ $\varepsilon(t)=\varepsilon_0 H(t)$ を与えると、Maxwell の基本方程式
$$
\dot{\varepsilon}=\frac{\dot{\sigma}}{E}+\frac{\sigma}{\eta}
$$
から、$t>0$ で $\dot{\varepsilon}=0$ として
$$
\dot{\sigma}=-\frac{E}{\eta}\sigma=-\frac{1}{\tau}\sigma,\qquad \tau=\frac{\eta}{E}
$$
となり、
$$
\sigma(t)=\sigma(0^+)\,e^{-t/\tau}
$$
が直ちに得られる。したがって Maxwell の $\tau$ は、周波数領域の単なるパラメータではなく、時間領域で応力が $1/e$ に減衰する時間として直接の物理意味を持つ。

周波数領域では既出の
$$
E^{*}(\omega)=E\frac{i\omega\tau}{1+i\omega\tau}
$$
により
$$
E'(\omega)=E\frac{(\omega\tau)^{2}}{1+(\omega\tau)^{2}},\qquad
E''(\omega)=E\frac{\omega\tau}{1+(\omega\tau)^{2}}
$$
である。ここで形の読み取りとして重要なのは次である。

- $E''(\omega)$ は $\omega\tau=1$ で極大をとり、損失ピーク位置が $\tau$ を与える。
- $E'(\omega)$ の立ち上がりは $(\omega\tau)^2$ で始まり、低周波で貯蔵弾性が急速に落ちるため、流動成分が支配的な系（ゼロに近い静的弾性）を表しやすい。
- 複素コンプライアンス $J^*(\omega)=1/E^*(\omega)$ をとると
  $$
  J^*(\omega)=\frac{1}{E}+\frac{1}{i\omega\eta}
  $$
  となり、直列結合の「コンプライアンス加算」が周波数領域でそのまま現れる。Maxwell は $E^*$ より $J^*$ が素直になる場合が多く、データの取り扱いで有利なことがある。



## 6.2 Kelvin–Voigt の複素弾性率

Kelvin–Voigt は並列結合であるため、応力一定保持（ステップ応力）に対してひずみが遅れて増えるクリープ挙動と整合する（単一遅れ時間のクリープ）。ステップ応力 $\sigma(t)=\sigma_0 H(t)$ を
$$
\sigma=E\varepsilon+\eta\dot{\varepsilon}
$$
へ代入すると、$t>0$ で
$$
\eta\dot{\varepsilon}+E\varepsilon=\sigma_0
$$
となり、
$$
\varepsilon(t)=\frac{\sigma_0}{E}\left(1-e^{-t/\lambda}\right),\qquad \lambda=\frac{\eta}{E}
$$
を得る。したがって Kelvin–Voigt の時間定数 $\lambda$ は「クリープが $1-e^{-t/\lambda}$ で立ち上がる遅れ時間」を与える。

周波数領域の式は既出の
$$
E^*(\omega)=E+i\omega\eta
$$
であり、
$$
E'(\omega)=E,\qquad E''(\omega)=\omega\eta
$$
となる。このモデルの読み取りで重要なのは、$E'$ が一定なので「弾性の基盤が常に残る」点ではなく、より具体的には次の事実である。

- 応力緩和（一定ひずみ保持）では、Kelvin–Voigt は瞬時に $\sigma=E\varepsilon_0$ へ落ち着き、その後の緩和を持たない。したがって、応力緩和試験で明確な緩和を示す材料に Kelvin–Voigt を当てると系統的に合わない。
- 一方、クリープ試験では指数立ち上がりが自然に出るため、クリープ主導の同定では Kelvin–Voigt が基礎要素として働く。
- 並列結合の「弾性率加算」は $E^*$ の加算として表れ、複数の Kelvin–Voigt 要素を直列に並べると（一般化 Kelvin–Voigt）コンプライアンス側の表現に自然につながる。



## 6.3 SLS（Zener）の複素弾性率

SLS は、低周波・高周波の弾性レベルを同時に表す。低周波極限で有限の弾性 $E_\infty$ を持ちつつ、高周波極限でより大きい弾性 $E_0$ に漸近するという、実材料で頻繁に観察される性質を最小限の自由度で表す。時間領域の緩和弾性率が
$$
E(t)=E_{\infty}+\left(E_{0}-E_{\infty}\right)e^{-t/\tau}
$$
となる点が核であり、ここから周波数領域の標準形
$$
E^*(\omega)=E_{\infty}+\frac{(E_0-E_{\infty})\,i\omega\tau}{1+i\omega\tau}
$$
が得られる。

実部・虚部は
$$
E'(\omega)=E_{\infty}+(E_0-E_{\infty})\frac{(\omega\tau)^2}{1+(\omega\tau)^2},
\qquad
E''(\omega)=(E_0-E_{\infty})\frac{\omega\tau}{1+(\omega\tau)^2}
$$
である。ここでの読み取りは次の3点に集約できる。

- $E'$ の下限と上限がそれぞれ $E_\infty$ と $E_0$ で固定され、実験データの両端から弾性レベルが直接決まる。
- 損失ピークの高さは $(E_0-E_\infty)/2$ に比例し、緩和がどれだけ強いか（弾性率差）を可視化する。
- ピーク周波数が $\omega\tau=1$ であり、ピーク位置から $\tau$ を決められる。したがって SLS は「両端の弾性レベル＋ピーク位置」の3点でパラメータが強く拘束される。

また、損失正接
$$
\tan\delta=\frac{E''}{E'}=
\frac{(E_0-E_{\infty})\frac{\omega\tau}{1+(\omega\tau)^2}}
{E_{\infty}+(E_0-E_{\infty})\frac{(\omega\tau)^2}{1+(\omega\tau)^2}}
$$
は単純冪則にならないが、逆に言えば、$\tan\delta$ の低周波・高周波挙動とピークの3情報を同時にフィットできるという利点になる。



## 6.4 一般化 Maxwell（Prony級数）の複素弾性率と内部変数化

緩和過程が複数ある場合、緩和弾性率を
$$
E(t)=E_{\infty}+\sum_{k=1}^{N}E_k e^{-t/\tau_k}
$$
で近似する（Prony級数）。この形は Maxwell 要素を並列化した Wiechert 模型と等価であり、周波数領域では
$$
E^*(\omega)=E_{\infty}+\sum_{k=1}^{N}\frac{E_k(i\omega\tau_k)}{1+i\omega\tau_k}
$$
となる。

この表現が重要なのは、時間領域の畳み込み
$$
\sigma(t)=\int_{-\infty}^{t} E(t-s)\,\dot{\varepsilon}(s)\,ds
$$
を、各要素応力 $\sigma_k$ を内部変数として
$$
\dot{\sigma}_k+\frac{1}{\tau_k}\sigma_k=E_k\dot{\varepsilon},\qquad
\sigma=E_\infty\varepsilon+\sum_k \sigma_k
$$
の常微分方程式へ置き換えられる点にある。これにより、数値計算（FEM等）では各タイムステップで逐次更新でき、長い履歴積分を保持しなくてよい。

周波数領域の観点では、$E''(\omega)$ が複数のDebye型ピークの重ね合わせになり、ピークの広がりや肩構造が緩和時間分布の情報になる。したがって、単一ピークでない実データに対してSLSを当てると、ピーク位置の周りで系統的な残差が出やすく、一般化 Maxwell の採用が自然になる。



## 6.5 一般化 Kelvin–Voigt（クリープ表現）との対応

クリープ側の記述ではコンプライアンス $J(t)$ を
$$
J(t)=J_{0}+\sum_{k=1}^{N}J_{k}\left(1-e^{-t/\lambda_{k}}\right)
$$
で表す。ここで $\lambda_k$ は遅れ時間であり、Kelvin–Voigt 要素を直列化した Burgers 型の拡張へ自然につながる。

$E(t)$ と $J(t)$ は単純な逆数ではなく、線形系としての畳み込み逆の関係
$$
\int_0^t E(t-s)\,J(s)\,ds = t
$$
を満たす。したがって、緩和データから $E(t)$ を同定し、クリープデータから $J(t)$ を同定した場合、両者がこの関係を整合するかどうかが、モデルの妥当性確認として使える。



## 6.6 連続スペクトルと同定が逆問題になる理由

離散和を連続化すると
$$
E(t)=E_{\infty}+\int_{0}^{\infty} H(\tau)\,e^{-t/\tau}\,d(\ln\tau)
$$
と表せる。周波数領域では
$$
E^*(\omega)=E_{\infty}+\int_{0}^{\infty}\frac{H(\tau)\,i\omega\tau}{1+i\omega\tau}\,d(\ln\tau)
$$
であり、$H(\tau)$ は緩和時間の分布を表す。

しかし測定は有限の周波数窓または有限の時間窓で行われ、さらにノイズを含むため、$H(\tau)$ の復元は一般に不適切（ill-posed）になる。そこで、$H(\tau)\ge 0$（散逸が負にならない）、滑らかさ、単調性などの拘束や正則化を導入し、物理的に意味のある範囲での分布推定として扱う必要がある。



## 6.7 モデル選択と同定の手順（式の形から読む）

周波数領域の $E'(\omega),E''(\omega)$ の形から、次を順に読むと同定が整理される。

1. 低周波極限の $E'(\omega)$ がゼロに近いか、有限値に収束するかで、Maxwell型（流動成分が強い）かSLS/一般化Maxwell型（弾性が残る）かを切り分ける。
2. $E''(\omega)$ が単峰に近いか、広い肩・多峰を持つかで、単一 $\tau$（SLS/Maxwell）か、複数 $\tau_k$（一般化Maxwell）かを判断する。
3. 両端（低周波・高周波）の $E'$ 水準から $E_\infty$ と $E_0$（または $E_\infty$ と $\sum E_k$）のスケールを決め、最後にピーク位置・幅から $\tau$（または $\tau_k$ と $E_k$）を詰める。

この順序を守ると、いきなり全パラメータを最小二乗で同時推定するよりも、物理的に不自然な解（負のスペクトルや過剰な振動）を避けやすい。





## 7. 温度依存と時間温度換算則

多くの高分子や制振材料では、温度変化が緩和時間のスケールを大きく変える。時間温度換算則では、ある基準温度 $T_{0}$ に対して、温度 $T$ の曲線を時間（または周波数）軸方向に水平移動して重ね合わせる。

時間域では
$$
t'=\frac{t}{a_{T}},\qquad a_{T}>0
$$
周波数域では
$$
\omega'=\omega a_{T}
$$
の形でシフトする。$a_{T}$ はシフトファクターである。

## 7.1 WLF 式
ガラス転移温度近傍の非晶高分子などで広く用いられる経験式である：
$$
\log_{10} a_{T}=-\frac{C_{1}(T-T_{0})}{C_{2}+(T-T_{0})}
$$
$C_{1},C_{2}$ は材料定数である。

## 7.2 Arrhenius 型
活性化過程で支配される領域（より低温側など）では
$$
a_{T}=\exp\left[\frac{E_{a}}{R}\left(\frac{1}{T}-\frac{1}{T_{0}}\right)\right]
$$
が用いられることがある。

## 7.3 成立条件と限界
時間温度換算則がよく成立するのは、緩和機構が温度変化で一様に加速・減速し、スペクトル形状自体が保たれる場合（熱レオロジー的に単純である場合）である。結晶化、相分離、化学反応、含水率変化などで機構が変わる場合には、単一の $a_{T}$ で全域を表すことが破綻し得る。



## 8. 3次元連続体への拡張

一次元の議論は、テンソル形式へ自然に拡張できる。等方線形粘弾性では、体積変形（バルク）とせん断変形（デビエータ）を分離して考えるのが便利である。ひずみテンソル $\boldsymbol{\varepsilon}$ の体積成分 $\varepsilon_{m}=\mathrm{tr}(\boldsymbol{\varepsilon})/3$ と偏差成分 $\boldsymbol{\varepsilon}_{dev}$ を用いると、線形弾性では
$$
\boldsymbol{\sigma}=3K\,\varepsilon_{m}\mathbf{I}+2G\,\boldsymbol{\varepsilon}_{dev}
$$
である。

線形粘弾性では $K,G$ を時間依存関数へ拡張し、
$$
\boldsymbol{\sigma}(t)=3\int_{-\infty}^{t}K(t-\tau)\,\dot{\varepsilon}_{m}(\tau)\,d\tau\ \mathbf{I}
+2\int_{-\infty}^{t}G(t-\tau)\,\dot{\boldsymbol{\varepsilon}}_{dev}(\tau)\,d\tau
$$
のように書ける。実装上は $K(t),G(t)$ を Prony 級数で近似することが多い。



## 9. パラメータ同定の考え方

## 9.1 時間域
応力緩和試験から $E(t)$、クリープ試験から $J(t)$ を得て、指数和（Prony）で近似する。測定窓が有限であるため、短時間側・長時間側の外挿はモデル選択に強く依存する。特に $t\to 0^{+}$ の瞬時弾性率（装置剛性と慣性の影響を受けやすい）と、$t\to\infty$ の長時間弾性率（温度ドリフト・構造緩和・老化の影響を受けやすい）を別扱いにして拘束する設計がよく行われる。

## 9.2 周波数域（DMA など）
$E'(\omega),E''(\omega),\tan\delta$ を測定し、複素弾性率のモデル
$$
E^{*}(\omega)=E_{\infty}+\sum_{k}\frac{E_{k}(i\omega\tau_{k})}{1+i\omega\tau_{k}}
$$
へフィットする。温度系列を測る場合は、時間温度換算則でマスター曲線を構成してから同定する流れが多い。

## 9.3 物理拘束
線形粘弾性の熱力学整合性は、緩和関数の単調性や完全単調性（周波数応答の受動性）に関係する。数値フィットでは $E_{k}\ge 0$、$\tau_{k}>0$ のような制約を課し、非物理的な負の損失を防ぐ。



## 10. 取り扱い上の注意

- 線形域の確認  
  線形粘弾性が前提であるため、ひずみ振幅や応力振幅を変えて $E',E''$ が一定となる範囲を確認する必要がある。

- 温度制御  
  温度が $a_{T}$ を通じて緩和時間へ指数的に効く領域では、わずかな温度差が大きな見かけ差を生む。測定温度の安定化と、試料内部の温度均一性が支配的になる。

- 幾何と境界条件  
  せん断・引張・曲げなど、変形様式が異なると得られる量（$G^{*}$ と $E^{*}$）が異なる。等方性が成り立たない材料（配向材、積層材）では、モデルのテンソル拡張が必要である。

- 検出系のコンプライアンス  
  装置側のたわみや保持機構の緩みは、低周波側で材料の柔らかさとして混入しやすい。既知剛性のダミー試料や装置補正の手順を併用することが望ましい。



## 11. 近年の発展に触れる

## 11.1 分数階粘弾性
指数緩和（Prony）ではなく、べき法則的な緩和や広い時間スケールの分布を少数パラメータで表す目的で、分数階微分を用いる模型（分数階 Maxwell、分数階 Burgers など）が用いられることがある。分数階は、緩和スペクトルが広帯域にわたる材料の経験則を、連続分布の極限として捉える数学的枠組みでもある。

## 11.2 同定法の高度化
動的試験データからモデルを直接同定する手法（非パラメトリック同定、周波数帯域の最適設計など）が研究されている。モデルの自由度を増やすほど、測定窓外の挙動が不安定になり得るため、情報量とモデル複雑度の釣り合いが主題になる。


## まとめと展望

線形粘弾性は、ばねとダッシュポットに始まる最小模型から、緩和関数・複素弾性率・スペクトル表現へと一貫した理論体系を持つのである。今後は、温度や周波数の広帯域データと数値同定・物理拘束を統合し、材料の微視的緩和機構とモデルパラメータを往復させることで、単なる当てはめを越えて設計指針へ接続する方向が強まると考えられる。


## 参考文献・参考資料
- ANSYS Mechanical Material Reference  
  Viscoelasticity（Prony 系列と時間温度換算の扱い）  
  https://ansyshelp.ansys.com/public/Views/Secured/corp/v251/en/ans_mat/evis.html

- （日本語）化学研究評価機構 高分子試験・評価サービス  
  温度時間換算則  
  https://www.cerij.or.jp/service/05_polymer/rheology_temperature-time.html

- （日本語PDF）京都大学 高分子流変学（線型粘弾性・重畳原理を含む講義資料）  
  https://www.molsci.polym.kyoto-u.ac.jp/archives/PolymRheol.pdf

- Applied Mathematics, Brown University  
  Essentials of Linear Viscoelasticity（SLS/Zener の整理を含む）  
  https://appliedmath.brown.edu/sites/default/files/fractional/12%20EssentialsofLinearViscoelasticity.pdf

- Applied Mathematics, Brown University  
  Fractional Viscoelastic Models（分数階粘弾性のチュートリアル）  
  https://appliedmath.brown.edu/sites/default/files/fractional/13%20FractionalViscoelasticModels.pdf

- Amadori, S. et al., 2023  
  Identification of the extended standard linear solid material model from dynamical test measurements  
  https://www.sciencedirect.com/science/article/pii/S2352492823008504

- Wang, C. et al., 2025  
  Frequency range optimization for linear viscoelastic model parameter identification（Burgers 等の同定に関する議論）  
  https://www.sciencedirect.com/science/article/pii/S0020740324008580

- Maxwell, J. C., 1867  
  IV. On the dynamical theory of gases（原典PDF）  
  https://royalsocietypublishing.org/doi/pdf/10.1098/rstl.1867.0004

- Christensen, R. M., 1982  
  Theory of Viscoelasticity: An Introduction（書誌情報）  
  https://www.sciencedirect.com/book/9780121742522/theory-of-viscoelasticity

- Ferry, J. D., 1970（2nd ed.）  
  Viscoelastic Properties of Polymers（PDF所在例）  
  https://www.eng.uc.edu/~beaucag/Classes/Properties/Books/Viscoelastic%20Properties%20of%20Polymers%20Ferry.pdf
