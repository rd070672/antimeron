# マクスウェル方程式にもとづく電磁界解析

マクスウェル方程式は、電荷・電流・電磁場の関係を一組の保存則として統一し、電磁エネルギーがどこから来てどこへ流れ、どこで散逸するかを同じ枠組みで与える理論である。ポインティングベクトルと（準静近似を含む）場の表現を併用すると、渦電流・表皮効果・誘導加熱・コイルや磁性体の損失を「エネルギーの流れ」として定量的に理解できるようになる。

### 参考ドキュメント
1. MIT OpenCourseWare / 8.07 Electromagnetism II（講義ノート：Maxwell方程式、ポインティングの定理、ポテンシャル）
   https://ocw.mit.edu/courses/8-07-electromagnetism-ii-fall-2012/pages/lecture-notes/
2. [日本語] JMAG-International, [W-MA-88] 異常渦電流損失計算の高精度化 (1)
   https://www.jmag-international.com/jp/whitepapers/w-ma-88/
3. [日本語] 駒澤大学：磁気流体力学（MHD）講義資料（拡散方程式・拡散係数の整理の参考）
   https://opac.komazawa-u.ac.jp/file/17625

## 0. 記号と前提（SI単位系）

電場：$\mathbf{E}$ [V/m]  
磁束密度：$\mathbf{B}$ [T]  
電束密度：$\mathbf{D}$ [C/m$^2$]  
磁場：$\mathbf{H}$ [A/m]  
電流密度：$\mathbf{J}$ [A/m$^2$]  
電荷密度：$\rho$ [C/m$^3$]  
真空の誘電率：$\varepsilon_0$、真空の透磁率：$\mu_0$  
導電率：$\sigma$ [S/m]（抵抗率 $\rho_{\mathrm{e}}=1/\sigma$）

線形・等方（周波数分散が弱い）媒質として
$$
\mathbf{D}=\varepsilon \mathbf{E},\quad \mathbf{B}=\mu \mathbf{H},\quad \mathbf{J}=\sigma \mathbf{E}
$$
を基本の構成則として用いる（必要に応じてテンソル化・複素化する）。

時間調和場は $\mathrm{Re}[\mathbf{E}(\mathbf{r})e^{j\omega t}]$ のように表し、複素振幅 $\mathbf{E}(\mathbf{r})$ を用いて議論する。



## 1. マクスウェル方程式の導出

### 1.1 実験法則からの積分形
電磁気学の実験事実（ガウスの法則・ファラデーの電磁誘導・アンペールの法則）を、空間領域に対する積分形としてまとめると次になる。

ガウスの法則（電気）：
$$
\oint_{\partial V}\mathbf{D}\cdot d\mathbf{S}=Q_{\mathrm{free}}=\int_V \rho\, dV
$$

ガウスの法則（磁気：磁荷がない）：
$$
\oint_{\partial V}\mathbf{B}\cdot d\mathbf{S}=0
$$

ファラデーの法則（電磁誘導）：
$$
\oint_{\partial S}\mathbf{E}\cdot d\mathbf{l}=-\frac{d}{dt}\int_S \mathbf{B}\cdot d\mathbf{S}
$$

アンペールの法則（磁場と電流）：
$$
\oint_{\partial S}\mathbf{H}\cdot d\mathbf{l}=I_{\mathrm{free}}=\int_S \mathbf{J}\cdot d\mathbf{S}
$$
ここに重要な補正が必要になる（次節）。

### 1.2 連続の式と変位電流：補正が必然である理由
電荷保存（連続の式）は
$$
\frac{\partial \rho}{\partial t}+\nabla\cdot\mathbf{J}=0
$$
である。ところが、アンペールの法則を微分形 $\nabla\times\mathbf{H}=\mathbf{J}$ と書いて両辺の発散を取ると
$$
\nabla\cdot(\nabla\times\mathbf{H})=0=\nabla\cdot\mathbf{J}
$$
となり、一般には $\partial\rho/\partial t=0$ を強制してしまう。充電中のコンデンサのように $\rho$ が時間変化する状況と矛盾するため、アンペールの法則は「電流」以外の項を含み得る形に拡張されねばならない。

そこで $\mathbf{D}$ を用い、アンペール–マクスウェルの法則として
$$
\nabla\times\mathbf{H}=\mathbf{J}+\frac{\partial \mathbf{D}}{\partial t}
$$
を採用する。この $\partial\mathbf{D}/\partial t$ が変位電流であり、電荷保存と整合するように理論が閉じる。



## 2. 微分形（局所形）と波動方程式への展開

### 2.1 微分形マクスウェル方程式
積分形からストークスの定理・発散定理を用いて、局所形として次が得られる。

$$
\nabla\cdot\mathbf{D}=\rho,\quad
\nabla\cdot\mathbf{B}=0
$$
$$
\nabla\times\mathbf{E}=-\frac{\partial\mathbf{B}}{\partial t},\quad
\nabla\times\mathbf{H}=\mathbf{J}+\frac{\partial \mathbf{D}}{\partial t}
$$

### 2.2 「波」も「拡散」も同じ式から出る
真空中（$\rho=0,\ \mathbf{J}=0,\ \mathbf{D}=\varepsilon_0\mathbf{E},\ \mathbf{B}=\mu_0\mathbf{H}$）で、$\mathbf{E}$ の回転の回転を取ると
$$
\nabla\times(\nabla\times\mathbf{E})
=-\mu_0\varepsilon_0\frac{\partial^2\mathbf{E}}{\partial t^2}
$$
ベクトル恒等式 $\nabla\times(\nabla\times\mathbf{E})=\nabla(\nabla\cdot\mathbf{E})-\nabla^2\mathbf{E}$ と $\nabla\cdot\mathbf{E}=0$ から
$$
\nabla^2\mathbf{E}-\mu_0\varepsilon_0\frac{\partial^2\mathbf{E}}{\partial t^2}=0
$$
が得られ、電磁波の波速 $c=1/\sqrt{\mu_0\varepsilon_0}$ を与える。

一方、導体で低周波条件が成立すると（後述）、式は波ではなく「拡散」に見える形へ変化する。したがって、波動と渦電流（拡散）は別理論ではなく、同一のマクスウェル方程式の支配項が変わった極限として統一される。



## 3. ベクトルポテンシャルとスカラーポテンシャル

### 3.1 ポテンシャルの導入
$\nabla\cdot\mathbf{B}=0$ より、$\mathbf{B}$ はあるベクトルポテンシャル $\mathbf{A}$ を用いて
$$
\mathbf{B}=\nabla\times\mathbf{A}
$$
と表せる。これをファラデーの法則に代入すると
$$
\nabla\times\left(\mathbf{E}+\frac{\partial\mathbf{A}}{\partial t}\right)=0
$$
となり、回転がゼロであるベクトルはスカラーポテンシャル $\phi$ の勾配で書けるので
$$
\mathbf{E}=-\nabla\phi-\frac{\partial\mathbf{A}}{\partial t}
$$
が得られる。電磁場を $\phi,\mathbf{A}$ から生成できることがここで確立する。

### 3.2 ゲージ自由度（同じ場を与える複数の表現）
任意のスカラー関数 $\chi(\mathbf{r},t)$ に対して
$$
\mathbf{A}'=\mathbf{A}+\nabla\chi,\quad
\phi'=\phi-\frac{\partial\chi}{\partial t}
$$
と変換しても、$\mathbf{B}=\nabla\times\mathbf{A}$ と $\mathbf{E}=-\nabla\phi-\partial\mathbf{A}/\partial t$ は不変である。これがゲージ自由度である。

代表的な条件は次の2つである。

ローレンツゲージ（相対論的に自然）：
$$
\nabla\cdot\mathbf{A}+\mu\varepsilon\frac{\partial\phi}{\partial t}=0
$$

クーロンゲージ（静電場と相性がよい）：
$$
\nabla\cdot\mathbf{A}=0
$$

ローレンツゲージを採用すると、（線形媒質で）$\phi$ と $\mathbf{A}$ は波動方程式（あるいは導体では減衰を含む形）を満たし、遅延ポテンシャルの議論へ自然に接続する。準静近似（EQS/MQS）では、どの項を残すかに応じて $\phi$ と $\mathbf{A}$ の役割分担が変わる。



## 4. ポインティングの定理：電磁エネルギー保存の式

### 4.1 導出（局所エネルギー収支）
マクスウェル方程式からエネルギー保存を得る標準的手順は、$\mathbf{E}$ をアンペール–マクスウェルの式に内積し、$\mathbf{H}$ をファラデーの式に内積して差を取ることである。

$$
\mathbf{E}\cdot(\nabla\times\mathbf{H})
=\mathbf{E}\cdot\mathbf{J}+\mathbf{E}\cdot\frac{\partial\mathbf{D}}{\partial t}
$$
$$
\mathbf{H}\cdot(\nabla\times\mathbf{E})
=-\mathbf{H}\cdot\frac{\partial\mathbf{B}}{\partial t}
$$
ベクトル恒等式 $\nabla\cdot(\mathbf{E}\times\mathbf{H})
=\mathbf{H}\cdot(\nabla\times\mathbf{E})-\mathbf{E}\cdot(\nabla\times\mathbf{H})$ を用いると
$$
\nabla\cdot(\mathbf{E}\times\mathbf{H})
=-\mathbf{E}\cdot\mathbf{J}
-\mathbf{E}\cdot\frac{\partial\mathbf{D}}{\partial t}
-\mathbf{H}\cdot\frac{\partial\mathbf{B}}{\partial t}
$$
となる。線形・非分散（$\varepsilon,\mu$ が定数）を仮定すると
$$
\mathbf{E}\cdot\frac{\partial\mathbf{D}}{\partial t}
=\frac{\partial}{\partial t}\left(\frac{1}{2}\mathbf{E}\cdot\mathbf{D}\right),\quad
\mathbf{H}\cdot\frac{\partial\mathbf{B}}{\partial t}
=\frac{\partial}{\partial t}\left(\frac{1}{2}\mathbf{H}\cdot\mathbf{B}\right)
$$
が成り立つので、最終的に
$$
\frac{\partial u}{\partial t}+\nabla\cdot\mathbf{S}=-\mathbf{J}\cdot\mathbf{E}
$$
$$
u=\frac{1}{2}\left(\mathbf{E}\cdot\mathbf{D}+\mathbf{H}\cdot\mathbf{B}\right),\quad
\mathbf{S}=\mathbf{E}\times\mathbf{H}
$$
を得る。これがポインティングの定理である。

右辺 $-\mathbf{J}\cdot\mathbf{E}$ は「電磁場が電荷へする仕事率密度」であり、導体ならジュール熱（散逸）として現れる。左辺は「場に蓄えられるエネルギー密度の時間変化」と「エネルギー流束の発散」であるから、エネルギーが空間内をどのように移動し、どこで散逸へ変換されるかが局所的に可視化される。

### 4.2 時間調和場における平均パワー
時間調和場では、時間平均ポインティングベクトルが複素振幅を用いて
$$
\langle\mathbf{S}\rangle=\frac{1}{2}\mathrm{Re}\left(\mathbf{E}\times\mathbf{H}^*\right)
$$
で与えられる。電磁エネルギー投入（有効電力）と、リアクティブな往復（無効電力）を分けて議論する際にこの表現が基礎になる。



## 5. 低周波・高周波：EQS/MQS/フルウェーブ

マクスウェル方程式は常に正しいが、対象スケールと周波数によって「どの項が支配的か」が変わる。これを整理すると、電磁現象を誤解なく見通しやすくなる。

### 5.1 導体で重要な無次元比：変位電流 vs 導電電流
時間調和で $\partial\mathbf{D}/\partial t\sim \omega\varepsilon \mathbf{E}$、$\mathbf{J}\sim \sigma\mathbf{E}$ なので、
$$
\frac{|\partial\mathbf{D}/\partial t|}{|\mathbf{J}|}\sim \frac{\omega\varepsilon}{\sigma}
$$
が重要な指標になる。$\omega\varepsilon\ll\sigma$ なら変位電流は小さく、導体の内部ではアンペール則はほぼ $\nabla\times\mathbf{H}\approx \mathbf{J}$ で閉じる（磁気準静近似に近い）。逆に高周波・低損失誘電体では $\omega\varepsilon$ が効いて波動性が強まる。

### 5.2 3つの近似領域
EQS（電気準静近似）：電場は概ねポテンシャル場（$\nabla\times\mathbf{E}\approx0$）として扱える。容量性・誘電体の界面問題や、導体中の電位分布が主役である。  
MQS（磁気準静近似）：誘導は重要で $\nabla\times\mathbf{E}=-\partial\mathbf{B}/\partial t$ を保持しつつ、変位電流を無視して $\nabla\times\mathbf{H}\approx\mathbf{J}$ とする近似である。渦電流・誘導加熱・低周波のコア—コイル系の解析がここに入る。  
フルウェーブ：変位電流を含めた全方程式を解き、波動・放射・共振も扱う。対象寸法が波長に比べて無視できない、あるいはGHz帯のように波の位相が問題になる領域がここに入る。

### 5.3 比較表
| 観点 | EEQS（電気準静近似） | MQS（磁気準静近似） | フルウェーブ |
|---|---|---|---|
| 主要な場 | $\phi$ による $\mathbf{E}$ | $\mathbf{A}$ による $\mathbf{B}$ と誘導 $\mathbf{E}$ | $\mathbf{E},\mathbf{H}$ の波動 |
| 代表方程式の形 | ラプラス/ポアソン（電位） | 拡散（渦電流）＋誘導 | 波動（伝搬・反射・共振） |
| 支配項の目安 | $\nabla\times\mathbf{E}\approx0$ | $\partial\mathbf{D}/\partial t\ll\mathbf{J}$ を導体で満たす | 変位電流が重要、位相が重要 |
| 典型的対象 | 静電・容量・低周波電位 | 低周波渦電流、コア・コイル、誘導加熱 | 高周波導波路、アンテナ、マイクロ波共振器 |
| エネルギーの把握 | 電界エネルギー中心 | 磁界エネルギーとジュール散逸 | エネルギー流（放射・吸収）を含む |



## 6. 渦電流と磁気拡散：低周波導体の支配式

### 6.1 渦電流の出発点（MQS）
導体内部で変位電流を無視できるとき
$$
\nabla\times\mathbf{H}=\mathbf{J},\quad
\nabla\times\mathbf{E}=-\frac{\partial\mathbf{B}}{\partial t},\quad
\mathbf{J}=\sigma\mathbf{E},\quad
\mathbf{B}=\mu\mathbf{H}
$$
が主要関係になる。

### 6.2 磁気拡散方程式
上式から $\mathbf{E}=\mathbf{J}/\sigma$、$\mathbf{H}=\mathbf{B}/\mu$ を用い、回転を組み合わせると、（$\mu,\sigma$ 一様と仮定して）概念的に
$$
\frac{\partial\mathbf{B}}{\partial t}
=\frac{1}{\mu\sigma}\nabla^2\mathbf{B}
$$
の形が得られる。これは波動ではなく拡散型の方程式であり、磁束変化が導体内部へ「染み込む速度」が有限であることを意味する。拡散係数は $1/(\mu\sigma)$ であり、透磁率が大きい・導電率が大きいほど拡散は遅くなる。

この遅れが、渦電流による反作用（レンツ則）を単なる速度比例抵抗ではなく、履歴効果として現し得るという物理像へつながる。

### 6.3 表皮深さと拡散時定数
時間調和で $\propto e^{j\omega t}$ とすると、導体内部の場は深さ方向に減衰し、代表長さとして表皮深さ
$$
\delta=\sqrt{\frac{2}{\omega\mu\sigma}}
$$
が現れる。周波数が高いほど、$\mu$ や $\sigma$ が大きいほど $\delta$ は小さくなり、電流・損失が表層へ集中する。

また、代表寸法 $L$ に対する拡散の時間スケールは次元的に
$$
\tau_{\mathrm{diff}}\sim \mu\sigma L^2
$$
と見積もられ、板厚や幅など「電流が回り込む幾何スケール」を小さくすること（積層・スリット等）が渦電流応答と損失を弱める方向に働く理由を与える。

### 6.4 ジュール散逸としての渦電流損失
局所の損失密度は
$$
p(\mathbf{r},t)=\mathbf{J}\cdot\mathbf{E}=\frac{|\mathbf{J}|^2}{\sigma}=\sigma|\mathbf{E}|^2
$$
であり、全損失は体積積分
$$
P(t)=\int_V \mathbf{J}\cdot\mathbf{E}\,dV
$$
で与えられる。ポインティングの定理の右辺がまさに $\mathbf{J}\cdot\mathbf{E}$ であるから、渦電流損失はエネルギー保存則の中で自然に位置づく。



## 7. 高周波導体：波動的な見方と表皮効果のエネルギー像

高周波では導体でも波動表現が有効で、導体中の伝搬定数が複素化して減衰を持つ。良導体近似では
$$
\gamma \approx \frac{1+j}{\delta}
$$
となり、電磁波は導体内部へ進むにつれて指数減衰する。

このとき、ポインティングベクトルは「外部から導体表面へ流入するエネルギー流束」を与え、流入したエネルギーが導体内部の $\mathbf{J}\cdot\mathbf{E}$ によって熱へ変換される。すなわち、表皮効果は「電流が表面に集まる」現象であると同時に、「エネルギーが表面近傍で散逸する」現象でもある。



## 8. ベクトルポテンシャルによる渦電流問題の定式化（$A$–$\phi$ 形式の発想）

渦電流解析では、未知量として $\mathbf{A}$ と $\phi$ を選ぶと境界条件を組み立てやすい。基本関係は  
$$
\mathbf{B}=\nabla\times\mathbf{A},\quad
\mathbf{E}=-\nabla\phi-\frac{\partial\mathbf{A}}{\partial t},\quad
\mathbf{J}=\sigma\mathbf{E}
$$
であり、これらをアンペール–マクスウェル（あるいはMQS近似）へ戻して $\mathbf{A},\phi$ の方程式を得る。

時間調和の場合、$\partial/\partial t\to j\omega$ と置けるため
$$
\mathbf{E}= -\nabla\phi - j\omega \mathbf{A}
$$
となり、導体内電流
$$
\mathbf{J}=-\sigma\nabla\phi - j\omega\sigma\mathbf{A}
$$
が得られる。電流の閉路（境界で法線電流をゼロにする等）と、ゲージ条件の選び方が解の一意性と数値安定性に関わる。ここでも、ポインティングの定理により $\mathbf{J}\cdot\mathbf{E}$ を空間分布として評価でき、どの領域が損失源かを場の言葉で同定できる。



## 9. 電磁エネルギー変換の代表例（ポインティングの定理で統一する）

### 9.1 コイル・インダクタ・変圧器
理想インダクタでは、外部電源がした仕事は磁界エネルギー $u_B=\frac{1}{2}\mathbf{H}\cdot\mathbf{B}$ として蓄えられ、半周期後に戻る（無効電力の往復）という像が成立する。実際のコア・導体では $\mathbf{J}\cdot\mathbf{E}$ が非ゼロとなり、銅損（巻線のジュール損）や渦電流損が現れる。

ここで重要なのは、エネルギーが「線の中を流れる」のではなく、一般には空間中を $\mathbf{S}=\mathbf{E}\times\mathbf{H}$ として流れ、損失領域へ吸い込まれていくことである。例えば変圧器では、ポインティング流はコアやギャップ周辺を経由して負荷へエネルギーを運ぶという見方ができ、電磁エネルギー変換を直観的に理解する助けになる。

### 9.2 誘導加熱
誘導加熱は、時間変化する磁束が渦電流を生み、$\mathbf{J}\cdot\mathbf{E}$ により熱へ変換される現象である。周波数を上げると表皮深さ $\delta$ が小さくなり、浅い領域に強い発熱が集中する。逆に低周波では深部へ浸透しやすい。目的の加熱深さに応じて $\delta$ を設計量として扱える点が、マクスウェル方程式由来の強い見通しである。

### 9.3 回転機・アクチュエータ：機械への変換
電荷に働くローレンツ力密度は
$$
\mathbf{f}=\rho\mathbf{E}+\mathbf{J}\times\mathbf{B}
$$
であり、機械的仕事は $\int \mathbf{f}\cdot\mathbf{v}\,dV$ として表れる。電磁場のエネルギー方程式と力学の仕事を整合させると、電磁エネルギーが力学エネルギーへ転換される過程も一つの保存則の中で整理できる。



## 10. 渦電流と磁性体損失（古典損失と異常損失の関係づけ）

交流磁化の損失はしばしば
$$
P_{\mathrm{tot}}=P_{\mathrm{hys}}+P_{\mathrm{cl}}+P_{\mathrm{ex}}
$$
のように分けて議論される。ここで $P_{\mathrm{cl}}$ は空間平均的な古典渦電流損失、$P_{\mathrm{ex}}$ は磁壁運動の局在性や統計性と結びつく過剰（異常）損失として整理されることが多い。

重要なのは、渦電流は単に「熱になる」だけでなく、自己誘起磁場によって磁化過程（磁壁運動や磁区構造の時間発展）へ反作用を与える点である。磁壁近傍の局在した $\partial\mathbf{M}/\partial t$ が局所渦電流を誘起し、これが磁壁運動の速度・履歴に応じた抵抗として働くという描像は、動的B-H特性やBarkhausen雑音の波形変形などの理解にも接続する。



## 11. まとめと展望

マクスウェル方程式は、電荷保存を満たすために変位電流を含む形へ必然的に閉じ、そこからポインティングの定理として電磁エネルギー保存（流束と散逸）が導かれる。したがって、渦電流・表皮効果・誘導加熱・コイルや磁性体の損失は、すべて $\mathbf{S}=\mathbf{E}\times\mathbf{H}$ によるエネルギー流と $\mathbf{J}\cdot\mathbf{E}$ による散逸として統一的に把握できる。

今後の展望として、(i) 低周波の磁気拡散と高周波の波動性が混在する領域（薄膜・微細配線・高周波コア等）での統一モデル化、(ii) 磁化ダイナミクス（LLG）とマクスウェル方程式の自己無撞着結合による渦電流反作用の精密評価、(iii) 実空間観測（Kerr、MBN、電気信号）とエネルギー収支（ポインティング、損失分解）を同一試料で照合する実証、が電磁エネルギー変換の理解と設計指針の高度化に直結する課題である。


### 参考文献

- Colaiori, Durin, Zapperi, Eddy current damping of a moving domain wall: beyond the quasistatic approximation, Phys. Rev. B 76, 224416 (2007)
  https://link.aps.org/doi/10.1103/PhysRevB.76.224416

- Hayashi et al., Time-Domain Observation of the Spinmotive Force in Permalloy Nanowires, Phys. Rev. Lett. 108, 147202 (2012)
  https://link.aps.org/doi/10.1103/PhysRevLett.108.147202

- IEEE Xplore（Maxwell方程式の準静近似・スケーリングを含むレビュー・会議論文への入口）
  https://ieeexplore.ieee.org/

- AGU Publications（準静近似や場の定式化に関する論文への入口）
  https://agupubs.onlinelibrary.wiley.com/
