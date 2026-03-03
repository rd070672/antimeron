# 磁気円二色性（MCD）と磁気直線二色性（MLD）

磁気円二色性（MCD）と磁気直線二色性（MLD）は、偏光した光に対する吸収（または反射・透過）の差として現れる磁気起源の二色性である。X線領域のXMCD/XMLDは元素選択性を持ち、スピン・軌道磁気モーメント、反強磁性スピン軸、磁気異方性の情報へ直接接続できる。

## 参考ドキュメント（特に参考にしたもの：日本語を含む3件）
1. B. T. Thole, P. Carra, F. Sette, G. van der Laan, X-ray circular dichroism as a probe of orbital magnetization, Phys. Rev. Lett. 68, 1943 (1992).   
DOI: 10.1103/PhysRevLett.68.1943
2. P. Carra, B. T. Thole, M. Altarelli, X. Wang, X-ray circular dichroism and local magnetic fields, Phys. Rev. Lett. 70, 694 (1993).  
DOI: 10.1103/PhysRevLett.70.694
3. KEK Photon Factory 磁気円二色性（XMCD）測定  
https://pfwww.kek.jp/users_info/station_spec/discipline/xmcd.html


## 1. 定義

### 1.1 一般定義
光子エネルギーを $E=\hbar\omega$、吸収係数を $\mu(E)$ とする。

円偏光（右回り/左回り）に対する吸収を $\mu^{+}(E), \mu^{-}(E)$ と書くと、
$$
\mathrm{MCD}(E)=\mu^{+}(E)-\mu^{-}(E),
\qquad
\overline{\mu}(E)=\frac{\mu^{+}(E)+\mu^{-}(E)}{2}
$$
である。X線吸収で測る場合はXMCDと呼ぶ。

直線偏光で、電場ベクトル $\mathbf{E}$ が基準軸（結晶軸や磁気軸など）に平行/垂直の吸収を $\mu_{\parallel}(E), \mu_{\perp}(E)$ と書くと、
$$
\mathrm{MLD}(E)=\mu_{\parallel}(E)-\mu_{\perp}(E),
\qquad
\overline{\mu}(E)=\frac{\mu_{\parallel}(E)+\mu_{\perp}(E)}{2}
$$
である。X線吸収で測る場合はXMLDと呼ぶ。

### 1.2 磁化反転に対する偶奇
磁化 $\mathbf{M}$ を反転したときの振る舞いは実験設計の核である。

- XMCD：主に $\mathbf{M}\rightarrow-\mathbf{M}$ で符号が反転する成分（奇）として現れる。
- XMLD：主に $\mathbf{M}\rightarrow-\mathbf{M}$ で不変な成分（偶）として現れる。

この性質により、XMLDは全磁化がゼロの反強磁性体でも信号が得られうる。



## 2. 吸収の基礎式と偏光依存

双極子近似（電気双極子遷移）では、相互作用は $-\mathbf{E}\cdot\mathbf{r}$ で与えられ、フェルミの黄金律により
$$
\mu(E)\propto \sum_{f}\left|\langle f|\mathbf{E}\cdot\mathbf{r}|i\rangle\right|^2\,\delta(E_f-E_i-\hbar\omega)
$$
となる。二色性は、(i) 偏光により遷移の選択則が変わること、(ii) 物質側のスピン軌道相互作用・交換分裂・結晶場・局所対称性が終状態の占有と行列要素に異方性を与えること、の組合せで現れる。



## 3. XMCDの物理起源

### 3.1 角運動量選択則とコア準位のスピン軌道分裂
遷移金属の $L_{2,3}$ 端では $2p\rightarrow 3d$ 遷移が支配的であり、コア準位はスピン軌道相互作用により $2p_{3/2}$（$L_3$）と $2p_{1/2}$（$L_2$）へ分裂する。円偏光は光子の角運動量（ヘリシティ）を持ち、$\Delta m=\pm 1$ の選択則を通じて終状態の磁気量子数分布（軌道分極）と結びつく。交換分裂とSOCがあると、左回り/右回りで遷移強度が異なり、XMCDが生じる。

### 3.2 幾何（投影）依存
多くの配置ではXMCDは光の進行方向 $\mathbf{k}$ に射影された磁化成分に強く依存する。入射角を変える測定は、面内/面直の磁化成分の分離に有効である。

### 3.3 K端XMCD
K端は主に $1s\rightarrow 4p$ 遷移であり、L端のように $3d$ を直接読むわけではない。K端XMCDは4p状態のスピン・軌道分極や混成を介して現れるため、定量磁気モーメント抽出の手法と不確かさの性格がL端と異なる。高圧セルなど軟X線が困難な条件で硬X線XMCDが選ばれる場合がある。



## 4. XMLDの物理起源

### 4.1 交換分裂と終状態多重項・結晶場
XMLDは直線偏光の向きにより、異方的な終状態密度・結晶場分裂・多重項構造への重み付けが変わることで現れる。遷移金属L端では、交換分裂と局所対称性が作る $3d$ の異方性が信号の根にある。

### 4.2 反強磁性体での感度
反強磁性体は全磁化がゼロでも、局所スピンの秩序（ネールベクトル $\mathbf{L}$）が存在する。XMLDは主として $\mathbf{E}$ と $\mathbf{L}$ の相対角に依存し、ネールベクトル方向の決定に利用できる。ヘマタイトFe$_2$O$_3$における強い線二色性と、モーリン転移でのスピン軸回転に伴う変化はこの性質を端的に示す。

### 4.3 角度依存と解析の要点
XMLDは単純な $\mathbf{E}\parallel\mathbf{M}$ と $\mathbf{E}\perp\mathbf{M}$ の差だけで決まらず、結晶軸との関係、局所対称性、終状態の多重項によってスペクトル形状も符号も変わりうる。角度依存XMLDの系統的解析は、磁気異方性との関連も含めて議論されている。



## 5. XMCD総和則

XMCDから軌道磁気モーメント $m_L$ と（実効的な）スピン磁気モーメント $m_S$ を得る枠組みとして、TholeらおよびCarraらの総和則（sum rules）が用いられる。ここでは遷移金属 $L_{2,3}$ 端（$2p\rightarrow 3d$）を念頭に置く。

### 5.1 積分量の定義
背景・段差補正後のスペクトルを用い、以下を定義する。

- 全吸収（和）の積分
$$
r=\int_{L_2+L_3}\left(\mu^{+}(E)+\mu^{-}(E)\right)\,dE
$$

- 二色性（差）の $L_3$ 端積分
$$
p=\int_{L_3}\left(\mu^{+}(E)-\mu^{-}(E)\right)\,dE
$$

- 二色性（差）の $L_{2,3}$ 合計積分
$$
q=\int_{L_2+L_3}\left(\mu^{+}(E)-\mu^{-}(E)\right)\,dE
$$

$d$殻のホール数を $n_h$ とする。

### 5.2 軌道モーメント
（上の $p,q,r$ の定義に整合する形で）
$$
m_L=-\frac{4}{3}\frac{q}{r}\,n_h\,\mu_B
$$
で与えられる。符号は、円偏光の定義（+$/$−）と磁化方向の取り方に依存するため、実験の規約と合わせて記述する。

### 5.3 スピンモーメントと磁気双極子項
スピンに関する総和則は磁気双極子項 $m_T$（スピン密度の非等方性に対応）を含む。
$$
m_S+7m_T=-\frac{6p-4q}{r}\,n_h\,\mu_B
$$
薄膜・界面・低対称場では $m_T$ が無視できないことがあり、入射角依存測定などで寄与の評価が議論される。

### 5.4 $n_h$ の取り扱い
総和則は $n_h$ を必要とする。$n_h$ は第一原理計算、既知の価数・電子配置、あるいは系統比較の中で与えられる。$n_h$ の不確かさはモーメントの絶対値へ線形に効くため、論文記載では根拠の明示が不可欠である。



## 6. 測定配置

### 6.1 XMCDでの差分取得
XMCDは奇成分であるため、差分は次の操作のいずれかで得る。

- 円偏光ヘリシティ反転（左回り/右回りの切替）
- 外部磁場で磁化反転（$+\mathbf{M}$ と $-\mathbf{M}$）
- 両方を組み合わせた反転

ヘリシティ反転を高速化するとドリフトや非磁性寄与の影響が抑えられる。SPring-8 BL25SUではキッカーによる周期的ヘリシティ切替（0.1、1、10 Hz）が公開情報として示されている。

### 6.2 XMLDでの差分取得
XMLDは偶成分が主であり、磁化反転のみでは消えない信号として残る。定義どおりの差分を得るには、少なくとも次のいずれかが必要である。

- 直線偏光の偏光方向を切替（水平/垂直、または任意角）
- 試料方位を回転して $\mathbf{E}$ と基準軸（結晶軸、スピン軸、ネールベクトル）の相対角を変える
- ネールベクトルや容易軸方向を磁場・歪み・交換バイアスなどで制御して比較する

NanoTerasu BL13Uでは、180–3000 eV領域でXAS/XMCD/XMLDを掲げ、偏光制御・顕微計測の整備が公開情報として示されている。



## 7. 検出モードと系統誤差

### 7.1 TEY
TEY（全電子収量）は表面近傍に高感度であり、試料電流を計測してXASを得る。情報深さは条件依存だが、軟X線では数nmから数十nm程度で議論されることが多い。

### 7.2 TFY
TFY（全蛍光収量）はよりバルク寄りの情報を与える一方、自己吸収・飽和によりスペクトル形状が歪むことがある。総和則で定量する場合は、歪みの方向（ピークの抑制、相対強度の変化）を理解した上で検出法を選ぶ必要がある。

### 7.3 PFYとIPFY
部分蛍光収量（PFY）は発光線を選別して測る。さらに逆部分蛍光収量（IPFY; inverse partial fluorescence yield）は自己吸収・飽和の影響を受けにくいバルク感度指標として提案され、TFYやTEYの歪み問題に対する解として議論されている。


## 8. スペクトル処理

### 8.1 エネルギー軸整列
$\mu^{+}(E)$ と $\mu^{-}(E)$（または $\mu_{\parallel}(E)$ と $\mu_{\perp}(E)$）のエネルギーずれは、差分スペクトルに擬似信号を作る。吸収端や微細構造に基づく整列、同時計測リファレンスによる較正が有効である。

### 8.2 正規化
前縁（pre-edge）と後縁（post-edge）を用いて基線と段差を整え、積分に用いるスペクトルを定義する。総和則では $r$ の定義が結果を支配するため、正規化の方法を明記することが重要である。

### 8.3 差分の対称化
XMCDでは、ヘリシティ反転と磁化反転の両方を併用できる場合、
- 奇成分（XMCD）を強調し、偶成分（幾何学的非対称やXLD混入）を抑える
という目的で対称化・反対称化処理が行われる。

### 8.4 XMLDとXLDの分離
XMLDには磁気起源だけでなく、配向・結晶場に由来する線二色性（XLD）が重畳しうる。温度依存（相転移）、磁場履歴、方位角依存を組み合わせ、どの成分が磁気起源かを整理する。



## 9. 定量評価の考え方

### 9.1 XMCDのモーメント抽出
総和則で $m_L$ と $m_S+7m_T$ が得られる。$m_T$ を無視するか推定するかは試料の対称性と目的に依存する。独立測定（VSM、SQUID、AHEなど）との整合性で妥当性を点検することが多い。

### 9.2 XMLDから得る量
XMLDは一般にモーメントの符号や大きさを単独で定量する道具ではなく、スピン軸（ネールベクトル）方向、磁気異方性の変化、局所対称性と交換分裂の影響の読み取りに強みがある。XMLDを磁気異方性の指標として用いる提案と実証は文献として確立している。



## 10. 比較表

| 項目 | XMCD | XMLD |
|---|---|---|
| 偏光 | 円偏光（左回り/右回り） | 直線偏光（方向を切替） |
| 磁化反転での振る舞い | 主に奇 | 主に偶 |
| 主な感度 | $\mathbf{k}$ 方向の磁化射影、軌道・スピン情報 | スピン軸・ネールベクトル方向、磁気異方性、結晶場・多重項 |
| 反強磁性体 | 条件により弱い/消えることがある | 信号が得られうる |
| 定量枠組み | L端で総和則が中心 | 角度依存・モデル計算・異方性との対応付けが中心 |
| 検出法の影響 | TEY/TFYで系統差が出る | XLD混入、方位・偏光制御が支配的 |


## 11. 施設・国内情報

- KEK Photon Factory：XMCD測定の解説ページが公開されている。
- SPring-8 BL25SU：ヘリシティ切替モードやナノビームXMCD装置の情報が公開されている。
- NanoTerasu BL13U：XAS/XMCD/XMLD、180–3000 eV、偏光制御・顕微能力などの情報が公開されている。
- KEK IMSSのニュース等：XMCDとXMLDの使い分けが日本語で説明された記事が公開されている。

## 12. まとめと展望
XMCDは円偏光とコア準位SOC・選択則が結びついて生じる二色性であり、特に遷移金属L端では総和則を通じて軌道・スピン磁気モーメントへ接続できる手法である。XMLDは直線偏光に対する吸収異方性として現れ、反強磁性体のネールベクトル方向や磁気異方性、局所対称性と交換分裂の影響を読み取る手段として重要である。

今後は、(i) 偏光スイッチングの高速化と顕微化により磁区・界面・欠陥近傍の局所磁性を二色性で直接追う研究、(ii) TFY歪み問題に対するIPFY等の指標の普及による定量性の改善、(iii) 多極子基底によるXMCD/XMLDの統一的再定式化に基づく解析の一貫性向上、が進み、磁性の理解だけでなく材料設計の指標としての二色性利用が拡大していくと考えられる。




## その他参考文献
- J. Stöhr, X-ray magnetic circular dichroism spectroscopy of transition metal thin films, J. Electron Spectrosc. Relat. Phenom. 75, 253 (1995). DOI: 10.1016/0368-2048(95)02537-5
- G. van der Laan, Magnetic Linear X-Ray Dichroism as a Probe of the Magnetocrystalline Anisotropy, Phys. Rev. Lett. 82, 640 (1999). DOI: 10.1103/PhysRevLett.82.640
- E. Arenholz, G. van der Laan, R. V. Chopdekar, Angle-Dependent X-Ray Magnetic Linear Dichroism, Phys. Rev. Lett. 98, 197201 (2007). DOI: 10.1103/PhysRevLett.98.197201
- P. Kuiper et al., X-ray magnetic dichroism of antiferromagnet Fe2O3: The orientation of magnetic moments observed by Fe 2p X-ray absorption spectroscopy, Phys. Rev. Lett. 70, 1549 (1993). DOI: 10.1103/PhysRevLett.70.1549
- A. J. Achkar et al., Bulk sensitive x-ray absorption spectroscopy free of self-absorption effects, Phys. Rev. B 83, 081106(R) (2011). DOI: 10.1103/PhysRevB.83.081106
- SPring-8 BL25SU（日本語ページ） https://new.spring8.or.jp/index.php/component/content/article/13-2021-02-09-03-35-14/138-bl25su
- SPring-8 BL25SU OUTLINE（英語ページ） https://www.spring8.or.jp/wkg/BL25SU/instrument/lang-en/INS-0000000337
- QST NanoTerasu BL13U（公式ページ） https://www.qst.go.jp/site/nt-center/bl13u.html
- KEK IMSS ニュース（XMCDとXMLDの使い分けに言及） https://www2.kek.jp/imss/news/2020/topics/0616MnGa/
