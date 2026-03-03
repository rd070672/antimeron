# 四重極子モーメントと磁歪の統一的記述
本稿は、電子の四重極子モーメント（電荷・スピン密度の異方性）と、磁歪（磁化に伴う格子ひずみ）がどのように同一の磁気弾性相互作用で統一的に記述されるかを、式の形で整理するものである。さらに、XMCD/XMLD/XLD などの二色性を用いて、四重極子成分と磁気弾性定数を実験的に切り分ける考え方と測定手順をまとめる。

### 参考ドキュメント

[1] E. Callen and H. Callen, Magnetostriction, Forced Magnetostriction, and Anomalous Thermal Expansion in Ferromagnets, Phys. Rev. 139, A455 (1965).  
[2] 四極子による磁気異方性のメカニズムを解明, KEK IMSS トピックス (2020).  
[3] SPring-8 BL25SU Beamline Outline (helicity switching modes).  


## 1. 四重極子モーメント

### 1.1 電気四重極子（電荷分布の異方性）

連続電荷密度 $\rho(\mathbf{r})$ の二次の異方性は、四重極子テンソル
$$
Q_{ij}
=\int \rho(\mathbf{r})\,(3x_i x_j-r^2\delta_{ij})\,d^3r
$$
で表される（$i,j\in\{x,y,z\}$）。固体中の局在軌道で議論する場合は、演算子として
$$
\hat{Q}_{ij}=3\hat{x}_i\hat{x}_j-\hat{r}^2\delta_{ij},
\qquad
Q_{ij}=\langle \hat{Q}_{ij}\rangle
$$
と書くことが多い。$d$ 軌道占有の偏り（例：$d_{x^2-y^2}$ と $d_{3z^2-r^2}$ の不均衡）や、配位場・歪による軌道混成は $Q_{ij}$ を変化させる。

結晶対称性を用いると、$Q_{ij}$ は既約表現に分解される。立方晶では、例えば
- 二重tetragonal成分（$\Gamma_3$）  
  $Q_{3z^2-r^2}\propto (2Q_{zz}-Q_{xx}-Q_{yy})$  
  $Q_{x^2-y^2}\propto (Q_{xx}-Q_{yy})$
- せん断成分（$\Gamma_5$）  
  $Q_{xy}\propto Q_{xy}$、$Q_{yz}$、$Q_{zx}$

のように整理でき、後述の「歪」と一対一で結び付く。

### 1.2 磁気多極子としての四重極子

磁性では「磁気四重極子（rank-2 の磁気多極子）」という言い方もあり、反転対称性や時間反転対称性の破れと関係して、線形磁気電気効果などの交差応答に関与しうる。共鳴X線回折では、干渉散乱を通して磁気四重極子秩序パラメータに感度を持たせる設計が可能である。



## 2. 磁歪と磁気弾性エネルギー

### 2.1 磁歪の定義

磁歪は、磁化 $\mathbf{M}$（あるいは磁化方向）に依存して結晶がひずむ現象である。ひずみテンソルを $\varepsilon_{ij}$ とすると、磁歪は
- 外部磁場で磁化が回転すると $\varepsilon_{ij}$ が変化する（正磁歪）
- 外部応力で磁化の向きが変わる（逆磁歪、Villari 効果）

として現れる。立方晶の飽和磁歪定数として $\lambda_{100}$、$\lambda_{111}$ を導入し、磁化方向余弦 $\boldsymbol{\alpha}=(\alpha_x,\alpha_y,\alpha_z)$ を用いると、代表的に
$$
\varepsilon_{xx}
=\frac{3}{2}\lambda_{100}\left(\alpha_x^2-\frac{1}{3}\right),
\quad
\varepsilon_{xy}
=\frac{3}{2}\lambda_{111}\alpha_x\alpha_y
$$
などの形で書ける（結晶方位と定義の取り方により係数の表現は流儀があるため、実験の座標系を明示して用いる）。

### 2.2 立方晶の磁気弾性エネルギー

磁化方向とひずみの結合は、最も基本的には自由エネルギーの展開で
$$
F(\boldsymbol{\alpha},\varepsilon)
=F_{\mathrm{mag}}(\boldsymbol{\alpha})+F_{\mathrm{el}}(\varepsilon)+F_{\mathrm{me}}(\boldsymbol{\alpha},\varepsilon)
$$
と分けられる。立方晶の一次の磁気弾性項は
$$
F_{\mathrm{me}}
=b_1(\varepsilon_{xx}\alpha_x^2+\varepsilon_{yy}\alpha_y^2+\varepsilon_{zz}\alpha_z^2)
+2b_2(\varepsilon_{xy}\alpha_x\alpha_y+\varepsilon_{yz}\alpha_y\alpha_z+\varepsilon_{zx}\alpha_z\alpha_x)
$$
で表される。$b_1,b_2$ は磁気弾性定数であり、磁歪定数と弾性定数で結び付く。

### 2.3 $b_1,b_2$ と $\lambda_{100},\lambda_{111}$ の関係

弾性定数 $(c_{11},c_{12},c_{44})$ を用いると、立方晶では広く
$$
b_1=-\frac{3}{2}(c_{11}-c_{12})\lambda_{100},
\qquad
b_2=-3c_{44}\lambda_{111}
$$
が用いられる。したがって、磁歪（$\lambda$）と弾性（$c$）の両方を測れば、$b_1,b_2$ を実験的に決められる。薄膜の場合、基板拘束や多結晶平均（テクスチャ）を入れた実効定数に置き換える必要がある。

### 2.4 単イオン起源と遍歴起源

希土類（4$f$）では、結晶場で分裂した多重項とスピン軌道相互作用が強く、単イオン結晶場起源の磁歪が理論的に体系化されている。一方、遷移金属（3$d$）では遍歴電子のバンドエネルギー、軌道混成、スピン軌道相互作用が磁気異方性と磁気弾性を支配することが多い。いずれも、電子密度の異方性（四重極子成分）が歪と結び付く点で共通である。



## 3. 四重極子と磁歪を結ぶ磁気弾性ハミルトニアン

### 3.1 対称ひずみと四重極子演算子

四重極子は rank-2 のテンソルであるため、結晶の対称ひずみ（同じ既約表現）と線形に結合できる。一般に
$$
H_{\mathrm{me}}
=\sum_{\Gamma} g_{\Gamma}\,\varepsilon_{\Gamma}\,\hat{O}_{\Gamma}
$$
と書ける。ここで $\Gamma$ は対称チャネル（例：立方晶なら $\Gamma_3,\Gamma_5$ など）、$\varepsilon_{\Gamma}$ はそのチャネルに属するひずみ、$\hat{O}_{\Gamma}$ は同じ対称性を持つ四重極子演算子である。

例えば、全角運動量 $\mathbf{J}$ を用いた Stevens 演算子の一部として
$$
\hat{O}_2^0=3J_z^2-J(J+1),
\qquad
\hat{O}_2^2=J_x^2-J_y^2,
\qquad
\hat{O}_{xy}=J_xJ_y+J_yJ_x
$$
などが用いられ、これらは電荷（軌道）およびスピン密度の二次異方性を記述する。

### 3.2 弾性定数の軟化として現れる四重極応答

弾性自由エネルギー
$$
F_{\mathrm{el}}=\frac{1}{2}\sum_{\Gamma} C_{\Gamma}^0\,\varepsilon_{\Gamma}^2
$$
に $H_{\mathrm{me}}$ を加えると、四重極子の応答（四重極子感受率）により実効弾性定数が変化する。平均場を含む代表的な形として
$$
C_{\Gamma}(T)
= C_{\Gamma}^0(T)
-\frac{g_{\Gamma}^2\,\chi_{\Gamma}(T)}{1-g'_{\Gamma}\chi_{\Gamma}(T)}
$$
が用いられる（$g'_{\Gamma}$ は四重極子同士の相互作用を表す有効結合、$\chi_{\Gamma}$ は四重極子感受率）。この式は、超音波測定で観測される特定対称弾性定数の軟化・異常から、四重極子秩序や電子ネマティックの結合定数を引き出す理論枠組みになる。

### 3.3 磁歪を四重極子で見る意味

磁歪は「磁化方向の変化に伴うひずみ」であるが、その微視的起源は、スピン軌道相互作用が軌道占有（電荷分布の異方性）を再配列し、結晶場・歪に敏感な四重極子成分が変化することにある。したがって、四重極子モーメント（あるいはそれに関連する項）を二色性で追跡できれば、磁歪の電子状態起源を元素・軌道別に切り分ける道が開ける。



## 4. 二色性分光で四重極子と磁気弾性を測る

二色性は、偏光状態の違いによって吸収係数 $\mu(E)$ が変化する現象である。X線吸収分光（XAS）に基づく二色性は、元素選択性と軌道選択性を持ち、薄膜・界面・反強磁性にも適用できる。

### 4.1 XMCD（磁気円二色性）

円偏光の左右（$\sigma^+,\sigma^-$）で
$$
\mathrm{XMCD}(E)=\mu^+(E)-\mu^-(E)
$$
を定義する。$L_{2,3}$ 端では、積分強度から軌道磁気モーメント $m_L$、スピン磁気モーメント $m_S$（および磁気双極子項 $m_T$）を結び付ける和則が知られている。薄膜や界面では、$m_L$ の異方性（軌道磁気モーメント異方性）が磁気異方性と結び付く議論が多く、歪や電場による格子定数変化と合わせて「逆磁歪」を元素別に追うことができる。

歪を印加しながら XMCD を測る場合、測りたい物理量は主に次の二つに分かれる。
- $m_L$ の変化
- $m_T$ を含むスピン密度の非球対称性の変化

後者は、四重極子的な非等方性と深く関係するため、角度依存 XMCD と XMLD を組み合わせて推定する手法が提案・実証されている。

### 4.2 XMLD / XLD（磁気直線二色性と直線二色性）

直線偏光の互いに直交する二方向（$E\parallel a$ と $E\parallel b$）で
$$
\mathrm{XLD}(E)=\mu_{E\parallel a}(E)-\mu_{E\parallel b}(E)
$$
を定義する。XLD には結晶配向や価数変化などの構造起源も含まれるため、磁気起源の成分（XMLD）を取り出すには、磁化反転・温度変化・反強磁性のネールベクトル回転などの制御と、測定幾何の対称性解析を併用する。

XMLD は、局所電子状態の異方性（軌道占有の異方性）と磁気秩序に感度を持つため、電気四重極子的な成分の抽出に向く。実際に、XMCD と XMLD を同一試料・多角度で測り、サイト別の情報を分離しつつ四重極子寄与を定量する研究が報告されている。

### 4.3 四重極子に直接つながる観測量

二色性が四重極子と接続する代表的ルートは少なくとも三つある。

1) 角度依存 XLD/XMLD のテンソル解析  
吸収は $\mathbf{E}$ ベクトルと局所軌道（電荷分布）の相対角に依存し、rank-2 のテンソル量として整理できる。したがって、方位角スキャンで XLD の $\cos 2\phi$ 成分などを抽出し、$Q_{ij}$ の成分にフィットさせる。

2) XMCD 和則に現れる磁気双極子項 $m_T$  
$m_T$ はスピン密度の非球対称性に由来し、電気四重極子（あるいは同等の rank-2 成分）と結び付く量として現れる。角度依存 XMCD と XMLD を組み合わせると、$m_L$ と $m_T$ の寄与分離が可能になり、軌道起源と四重極子起源を相対比較できる。

3) 共鳴散乱（共鳴X線回折）による多極子秩序の検出  
吸収（XAS）ではなく散乱（回折）を用いると、秩序パラメータの対称性選択と干渉項の利用により、磁気四重極子秩序や磁気電気多極子に感度を持たせられる。二色性（偏光解析）と組み合わせることで、四重極子秩序のドメイン選択や符号の同定が議論できる。



## 5. 磁歪を二色性で定量する設計

### 5.1 ひずみ印加

薄膜・界面で「可逆・連続・既知の対称性」を満たすひずみを与える代表的方法は次である。
- 圧電基板（PMN-PT、BaTiO$_3$ など）への電場印加による面内ひずみ制御
- 曲げ治具による一軸ひずみ
- 熱膨張差による温度可変ひずみ（温度そのものの効果と切り分けが必要）

磁気弾性定数を狙って求めるなら、$\Gamma_3$（tetragonal）と $\Gamma_5$（shear）を分けて印加できる構造が望ましい。

### 5.2 測定ジオメトリ

二色性の信号は、偏光・入射角・磁化（またはネールベクトル）・結晶方位で符号と大きさが変わる。したがって、以下を明示する。
- 実験室座標 $(x,y,z)$ と結晶座標 $(a,b,c)$ の対応
- 入射方向 $\hat{\mathbf{k}}$ と偏光 $\mathbf{E}$ の向き
- 外部磁場 $\mathbf{H}$ または反強磁性の整列条件
- ひずみテンソル $\varepsilon_{ij}$ の主軸

薄膜では、法線入射と斜入射で感度が変わるため、同一試料で両方を取ると分離が容易になる。

### 5.3 信号の分離

- XMCD  
  偏光反転（左右円偏光）と磁場反転を組み合わせ、非磁性成分やドリフトを除く。
- XMLD  
  直交直線偏光の切替に加え、磁化反転、温度での秩序消失、あるいは方位角回転で構造XLDと分離する。



## 6. 測定から解析までの手順

1. 試料方位の同定  
   XRD や RHEED、LEED などで面内方位を決め、二色性で必要な方位角の基準を作る。

2. ひずみの較正  
   ひずみゲージ、XRD の格子定数、あるいは基板の既知特性で $\varepsilon_{ij}$ を数値化する。

3. XAS の正規化  
   pre-edge と post-edge を用いた規格化を行い、検出モード（TEY、TFY、PFY）による歪み（自己吸収など）を意識する。

4. XMCD/XMLD の取得  
   偏光反転・磁場反転・方位角スキャンを行い、再現性を確認する。

5. スペクトル分解  
   元素・サイトが混在する場合、エネルギー窓や多角度データを使って成分分離（必要なら第一原理・多重項計算と整合）を行う。

6. 四重極子成分の抽出  
   XLD のテンソルフィット、角度依存 XMCD からの $m_T$ 推定、あるいは XMLD 強度の対称性解析を用いて $Q_{ij}$ に対応付ける。

7. 磁気弾性定数への接続  
   $\lambda$ と $c_{ij}$ から $b_1,b_2$ を求める経路、または二色性で得た軌道異方性のひずみ微分から $b$ を推定する経路を選び、モデル仮定を明記する。



## 7. 国内大型施設の二色性計測環境

### 7.1 軟X線 XMCD の高速切替

軟X線領域では偏光子による高速切替が難しいため、アンジュレータとキッカー磁石などを組み合わせた偏光反転が重要になる。SPring-8 の軟X線ビームラインでは、円偏光ヘリシティを周期的に切り替える運用が整備されてきた。

### 7.2 NanoTerasu の広エネルギー域・偏光制御

NanoTerasu の BL13U は 180–3000 eV の広い領域で XAS を行い、偏光制御・顕微と組み合わせた環境を提供することが示されている。二色性（MCD/MLD）を顕微分光で扱う際には、偏光の高速切替が統計精度とドリフト抑制に効くため、こうした設計思想は磁気弾性の定量にも相性が良い。



## 8. 注意事項

- 構造起源 XLD と磁気起源 XMLD の混入を必ず疑う  
  ひずみ印加は結晶場を変えるため、磁気が消えた温度でも XLD が残ることがある。

- TEY の表面感度と帯電  
  絶縁性基板や酸化膜では帯電が吸収スペクトルを歪めるため、導電層や PFY/TFY の併用が有効である。

- TFY の自己吸収  
  強吸収端では TFY が非線形になり、二色性の大きさが変形する。PFY あるいは薄膜厚の最適化で回避する。

- ひずみの不均一  
  圧電素子や曲げ治具では、試料位置でのひずみ勾配が生じうる。顕微 XAS と組み合わせて空間平均の偏りを把握する。

- 磁区の履歴  
  磁化回転が不可逆だと、二色性の差分が磁歪由来なのかドメイン再配列なのか判別が難しい。磁場履歴を固定して測る。



## 9. まとめと展望

四重極子モーメントは、電荷・スピン密度の rank-2 異方性として定義でき、結晶の対称ひずみと同じ対称性で線形結合するため、磁歪と弾性異常を一つの磁気弾性理論で結び付けられる。二色性分光は、その四重極子成分を元素・軌道別に追跡できるため、磁歪を「格子の変形」としてではなく「電子状態の再配列」として分解して理解する経路を提供する。

今後は、(i) 偏光高速切替と顕微二色性の整備、(ii) 和則・多極子基底に基づく四重極子成分の定量、(iii) そのひずみ微分を磁気弾性定数へ接続する実験設計、が同時に進むことで、磁歪材料の逆設計や界面磁気弾性の局所定量が現実的になると考えられる。


## その他参考文献

[4] J. Okabayashi et al., Strain-induced reversible manipulation of orbital magnetic moments in Ni/Cu multilayers on ferroelectric BaTiO3, npj Quantum Materials 4, 12 (2019).  
[5] Inverted shear-strain magnetoelastic coupling at the Fe/BaTiO3 interface from polarised x-ray imaging, Nature Communications (2025).  
[6] G. van der Laan, Influence of crystal field on anisotropic x-ray magnetic linear dichroism, Phys. Rev. B 77, 064407 (2008).  
[7] Y. Yamasaki, Sum rules for X-ray circular and linear dichroism based on complete magnetic multipole basis, (2025).  
[8] E. W. Rosenberg et al., Divergence of the quadrupole-strain susceptibility of the electronic nematic system YbRu2Ge2, PNAS (2019).  
[9] R. Misawa et al., Magnetic quadrupole order probed by interference scattering in resonant x-ray diffraction, Phys. Rev. B 103, 174409 (2021).  
[10] A. Fert et al., Electrical control of magnetism by electric field and current-induced torques, Rev. Mod. Phys. 96, 015005 (2024).  
[11] NanoTerasu BL13U (QST web page, 2025) および BL13U 紹介資料 (2025).  
[12] Construction and development of a time-resolved x-ray magnetic circular dichroism spectroscopy system at SPring-8, Rev. Sci. Instrum. 79, 063903 (2008).  
[13] Perpendicular orbital and quadrupole anisotropies at Fe/..., Appl. Phys. Lett. 115, 252402 (2019).  
[14] Y. Miura, Understanding magnetocrystalline anisotropy based on orbital moment anisotropy and Bruno relation, J. Phys.: Condens. Matter 34, 473001 (2022).
