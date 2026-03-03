# スピン・角度分解光電子分光（SARPES）の原理

SARPES（Spin- and Angle-Resolved Photoemission Spectroscopy）は、光電子分光で得られるエネルギー・運動量分解情報に、スピン偏極（スピンベクトル）を加えて観測する方法である。スピン軌道相互作用が作るスピン分裂やトポロジカル状態、磁性・界面のスピンテクスチャを、バンド分散として直接可視化できる点が核となる。

## 参考ドキュメント
1. J. H. Dil, Spin and angle-resolved photoemission on non-magnetic low-dimensional systems  
   https://www.physik.uzh.ch/groups/greber/zz_publications_old/SARPES_review_Dil.pdf
2. T. Okuda et al., Efficient spin resolved spectroscopy observation machine at Hiroshima Synchrotron Radiation Center, Rev. Sci. Instrum. 82, 103302 (2011)  
   https://pubs.aip.org/aip/rsi/article/82/10/103302/355808/Efficient-spin-resolved-spectroscopy-observation
3. 広島大学 光物性研究室：スピン角度分解光電子分光装置の開発（日本語）  
   https://srphys.hiroshima-u.ac.jp/intro/group/spin1.html

## 1. 位置づけ：PES、ARPES、SARPES

光電子分光（PES）は、入射光子が物質中の電子を真空へ放出させ、その運動エネルギー（必要に応じて放出角）を測定することで、物質中の束縛エネルギーと電子状態を復元する手法である。

- PES：エネルギー分布 $I(E)$ を得る
- ARPES：$(E,\mathbf{k})$ 依存の強度 $I(E,\mathbf{k})$ を得る
- SARPES：さらにスピン偏極 $\mathbf{P}(E,\mathbf{k})$ を得る

ARPESまでは電子構造の「どこに状態があるか」を直接示すが、SARPESは「その状態がどの向きにスピンを持つか」を同じ座標系で与える。スピン軌道相互作用や磁化が物性を決める材料群で、決定的な情報となり得る。

## 2. 光電子放出の基礎式：束縛エネルギーと運動量

### 2.1 エネルギー保存則

単一光子吸収による光電子放出は、基本的に
$$
E_{k}=h\nu - E_{B}-\phi
$$
で表される。$E_{k}$ は測定される光電子の運動エネルギー、$h\nu$ は光子エネルギー、$E_{B}$ は束縛エネルギー、$\phi$ は仕事関数である。金属のフェルミ準位を基準に装置校正を行うと、$E_B$ 軸は観測実験で定義できる。

### 2.2 放出角から運動量へ

自由電子近似で、光電子の波数は
$$
k=\frac{\sqrt{2mE_{k}}}{\hbar}
$$
である。放出角 $\theta$（表面法線からの角度）、方位角 $\varphi$ を測定すると、表面平行成分は
$$
k_{\parallel}=\frac{\sqrt{2mE_{k}}}{\hbar}\sin\theta
$$
で与えられる。結晶表面に対して運動量の平行成分はよく定義されるため、2次元電子系や表面状態の分散測定に強い。

表面垂直成分 $k_{\perp}$ は真空中運動量のみからは一意に定まらず、最終状態を自由電子的に近似すると
$$
k_{\perp}=\frac{\sqrt{2m}}{\hbar}\sqrt{E_{k}\cos^{2}\theta + V_{0}}
$$
の形がよく用いられる（$V_{0}$ は内在ポテンシャルを表す有効パラメータである）。層状物質や3次元バルクの $k_{\perp}$ 依存を追うとき、$V_{0}$ の扱いが解釈に入る。

## 3. ARPES強度：スペクトル関数と行列要素

ARPESで観測される強度は、簡略化すると
$$
I(\mathbf{k},\omega)\propto |M_{f,i}(\mathbf{k})|^{2}\,A(\mathbf{k},\omega)\,f(\omega)
$$
と書ける。$A(\mathbf{k},\omega)$ は一電子スペクトル関数、$f(\omega)$ はフェルミ分布、$M_{f,i}$ は光の偏光・入射幾何と初期状態・最終状態の重なりに依存する遷移行列要素である。

この式は重要な含意を持つ。
- 観測される分散ピークは $A(\mathbf{k},\omega)$ の準粒子構造と対応する
- しかし強度の濃淡は $|M|^{2}$ によって大きく変わり得る
- 同じバンドでも偏光や測定幾何で見え方が変わる

SARPESではこの構造がさらに拡張され、スピン依存行列要素や最終状態のスピン混合（スピン軌道相互作用）も観測に混ざり得るため、対称性と測定幾何の整理がより重要となる。

## 4. スピン分解の記述：スピン密度行列と偏極ベクトル

SARPESで得たい量は、ある $(E,\mathbf{k})$ におけるスピン偏極ベクトル
$$
\mathbf{P}(E,\mathbf{k})=(P_{x},P_{y},P_{z})
$$
である。量子力学的には、スピン自由度を含む密度行列 $\rho(E,\mathbf{k})$ を導入すると
$$
I(E,\mathbf{k})=\mathrm{Tr}\,\rho(E,\mathbf{k}),
\qquad
\mathbf{P}(E,\mathbf{k})=\frac{\mathrm{Tr}\left[\rho(E,\mathbf{k})\,\boldsymbol{\sigma}\right]}{\mathrm{Tr}\,\rho(E,\mathbf{k})}
$$
と表せる（$\boldsymbol{\sigma}$ はパウリ行列）。

ここで重要なのは、SARPESが「スピン固有状態だけ」を見ているとは限らない点である。スピン軌道相互作用が強い系では、初期状態自体がスピン混合状態になり、さらに最終状態でもスピンと軌道が混ざる。したがって、測定で得られる $\mathbf{P}$ は、初期状態のスピンテクスチャの情報を含みつつも、光学遷移と最終状態効果を通じた観測量である。

## 5. スピン検出の原理：非対称性から偏極を取り出す

### 5.1 スピン偏極と非対称性

スピン検出器（スピン偏極計、spin polarimeter）は、スピンに依存した散乱確率の差を「左右（または上下）強度差」として読み出す装置である。ある検出チャンネルで得られる強度を $I_{L}, I_{R}$ とすると、測定される非対称性は
$$
A=\frac{I_{L}-I_{R}}{I_{L}+I_{R}}
$$
で定義される。スピン偏極 $P$ と非対称性は
$$
A=S_{\mathrm{eff}}\,P
$$
で結ばれ、$S_{\mathrm{eff}}$ は有効Sherman関数（真に100%偏極した電子線に対してどれだけ非対称性が出るかを表す係数）である。したがって
$$
P=\frac{A}{S_{\mathrm{eff}}}
$$
となる。

この $P$ から、スピン分解強度（上向き・下向き）を
$$
I_{\uparrow}=\frac{1+P}{2}I_{t},
\qquad
I_{\downarrow}=\frac{1-P}{2}I_{t}
$$
（$I_{t}=I_{L}+I_{R}$）のように復元できる。磁性体で明確な量子化軸がある場合はこの表現が直観的であるが、一般のスピンテクスチャでは、測りたい軸ごとに同様の操作を行い、$\mathbf{P}$ を再構成する。

### 5.2 どの軸を測っているか

スピン検出器は、「ある方向（検出器固有の感度軸）」に射影された偏極成分 $P_{\hat{n}}$ を測る。3成分 $(P_x,P_y,P_z)$ を得るには、互いに独立な少なくとも2軸（理想的には3軸）の測定が必要であり、実機では
- 2つのスピン検出器を直交配置して同時に2成分を測る
- 検出器または試料方位を回して別軸成分を得る
などの設計が用いられる。

## 6. 代表的スピン検出方式：Mottと（S）VLEED

SARPESの性能は、測定系全体の透過（どれだけ電子を運べるか）に加え、スピン検出器の効率で大きく制約される。スピン偏極計の性能指標として、一般に
$$
\mathrm{FOM}=\left(\frac{I}{I_{0}}\right)S_{\mathrm{eff}}^{2}
$$
（$I_{0}$ は入射電子数、$I$ は検出された散乱電子数）が用いられる。$S_{\mathrm{eff}}$ が大きく、かつ透過比 $I/I_{0}$ が大きいほど、同じ統計精度を短い測定時間で得られる。

### 6.1 Mott型（スピン軌道散乱）

Mott検出器は、高原子番号ターゲット（Auなど）での高エネルギー電子散乱におけるスピン軌道相互作用により、散乱角依存の左右非対称性が生じることを利用する。比較的汎用で堅牢だが、一般に $S_{\mathrm{eff}}$ と透過比の両面で効率が高くはなく、SARPESの測定速度の律速になりやすい。

### 6.2 （S）VLEED型（交換散乱）

VLEED（Very Low Energy Electron Diffraction）やSPLEEDは、数eV〜数十eV程度の低エネルギー電子を磁性ターゲット表面で散乱させたとき、交換相互作用によりスピンに依存した反射率差が生じることを利用する。交換散乱は大きなスピン依存性を与え得るため、Mott型より高効率なスピン検出が可能となり、現代の高分解能SARPESで重要な役割を担っている。

### 6.3 多チャンネル化とイメージング化

従来のスピン検出は「1点（1エネルギー・1角度）」ずつ測る形式になりやすいが、近年は
- 多チャンネル交換散乱スピン偏極計
- イメージング光学と組み合わせた多点同時測定（iMottなど）
が提案・実装され、測定効率の桁違いの向上が進んでいる。

## 7. 測定系：角度分解とスピン分解をどう両立するか

### 7.1 構成

SARPES装置は概念的に
1. 光源（放射光、レーザーなど）
2. 超高真空試料槽、試料温度・磁場・回転機構
3. 電子エネルギー分析器（半球型が典型）
4. スピン検出器（Mott、VLEED、SPLEEDなど）
から構成される。

ARPESでは分析器が同時にエネルギーと角度（すなわち $k_{\parallel}$）を取得する。SARPESでは、その分析器の出口で選別された電子をスピン検出器へ導き、散乱非対称性を測る。ここで、エネルギー分解能や角度分解能を高めるほど電子数は減り、スピン検出の統計精度が厳しくなるため、解析目的に応じた分解能の設定が重要となる。

### 7.2 スピン分解の統計と測定時間

非対称性 $A$ の統計誤差は、ポアソン統計の近似で概ね
$$
\Delta A \sim \sqrt{\frac{1-A^{2}}{N}}
$$
（$N=I_{L}+I_{R}$ に対応する総カウント）となる。偏極 $P=A/S_{\mathrm{eff}}$ なので
$$
\Delta P \sim \frac{\Delta A}{S_{\mathrm{eff}}}
$$
であり、$S_{\mathrm{eff}}$ の大きさが直接的に統計精度を改善する。VLEED系が高効率とされる理由がここにある。

## 8. 対称性が与えるスピンテクスチャの制約

### 8.1 時間反転対称性

非磁性で時間反転対称性が成り立つ場合、一般に
$$
E(\mathbf{k},\uparrow)=E(-\mathbf{k},\downarrow)
$$
が成立する。スピン偏極は、理想化すれば
$$
\mathbf{P}(\mathbf{k})=-\mathbf{P}(-\mathbf{k})
$$
のように奇関数的な関係を持つ。トポロジカル表面状態やRashba分裂状態で観測されるヘリカルスピンは、この制約と結晶対称性の組合せで理解できる。

### 8.2 反転対称性とスピン分裂

反転対称性が存在し、かつ時間反転対称性もある場合、クラマース縮退により各 $\mathbf{k}$ でスピン縮退が保たれ、純粋なスピン分裂は現れにくい。反転対称性が破れている（表面・界面、非中心対称結晶）と、スピン軌道相互作用によりスピン分裂が起こり、SARPESでスピンテクスチャとして直接観測される。

### 8.3 磁性秩序とスピン

磁性体では時間反転対称性が破れ、交換分裂や磁気異方性がバンドとスピンに反映される。SARPESは、交換分裂の運動量依存、磁気表面状態、界面でのスピン混成などを、分散とスピン偏極として同時に示す。

## 9. 測定幾何と偏光：なぜ同じバンドが見えたり見えなかったりするか

行列要素 $M_{f,i}$ は、偏光（直線偏光・円偏光）、入射面、検出面、試料方位に強く依存する。鏡映対称面を含む幾何では、初期状態の偶奇性と偏光が選択則を与え、特定軌道の寄与が強調・抑制される。

SARPESでは、スピン軌道相互作用により軌道成分とスピン成分が結びつくため、偏光を変えるだけで観測されるスピン偏極の見かけが変わる場合がある。したがって、スピンテクスチャの議論では
- 結晶対称性で許されるスピン方向
- 測定幾何で観測しやすい成分
- 偏光により強調される軌道成分
を同時に整理する必要がある。

## 10. 何が得られるか

SARPESの典型的な出力は次の形で表現される。

- $E$–$k$ マップ：$I(E,k)$ を画像として示し、バンド分散の全体像を示す
- スピン偏極マップ：$P_{x}(E,k)$、$P_{y}(E,k)$、$P_{z}(E,k)$ を色で示す
- EDC/MDCのスピン分解：特定 $k$ での $I_{\uparrow}(E)$ と $I_{\downarrow}(E)$、または特定 $E$ での運動量分布
- スピンベクトル場：フェルミ面上の $\mathbf{P}(\mathbf{k})$ を矢印で示す

ここで、単に $P$ が大きいか小さいかだけでなく、対称性が要求する関係（たとえば $\mathbf{k}$ と $-\mathbf{k}$ の対応）を満たしているかが、結果の信頼性を支える重要な基準になる。

## 11. SARPESが有効な材料系

| 材料・系 | 観測したい量 | SARPESが与える決定情報 |
|---|---|---|
| トポロジカル絶縁体・トポロジカル半金属 | 表面状態のスピン運動量ロッキング、フェルミ面スピン渦 | 表面状態が本当にヘリカルか、バルクと混ざっていないか |
| Rashba系（表面・界面、非中心対称） | Rashba分裂の符号と大きさ、スピンヘリシティ | 分裂バンドの左右でスピンが反転するか、面内・面外成分の存在 |
| 2次元層状物質（TMDなど） | 谷スピン、層・軌道と結びついた偏極 | 運動量空間でのスピン偏極の配置、対称性との整合 |
| 強磁性・反強磁性・薄膜界面 | 交換分裂、スピン依存ハイブリダイゼーション | 運動量依存のスピン分極、界面でのスピン混成の可視化 |

## 12. 類似手法

| 手法 | 主に得る情報 | スピン情報 | 特徴 |
|---|---|---|---|
| ARPES | $E(\mathbf{k})$、準粒子分散、自己エネルギーの痕跡 | 直接は得ない | バンド分散の総覧に強い |
| SARPES | $E(\mathbf{k})$ と $\mathbf{P}(E,\mathbf{k})$ | 直接得る | スピンテクスチャを運動量空間で与える |
| XMCD/XAS | 元素選択の磁気モーメント、状態密度の投影 | 元素・軌道の磁気情報 | 埋もれ界面にも強く、スピン・軌道の分離議論が可能 |
| 中性子散乱 | スピン励起、磁気相関、マグノン | スピンダイナミクス | バルクの集団励起に強い |

SARPESは「運動量分解された一電子状態のスピン」を直接与える点で独自であり、他手法の強み（元素選択性、バルク集団励起）と補完関係に立つ。

## まとめ

SARPESは、光電子分光のエネルギー保存則と角度分解により得られる $(E,\mathbf{k})$ 情報に、スピン偏極計の散乱非対称性から得られる $\mathbf{P}(E,\mathbf{k})$ を重ねて観測する方法である。スピン検出器の方式（Mott、VLEED/（S）VLEED、イメージング・多チャンネル）と、対称性・偏光・測定幾何を整合させることで、スピン軌道相互作用や磁性・界面が生み出すスピンテクスチャを、バンド分散として定量的に議論できるのである。

## 関連研究
- T. Okuda et al., A new spin-polarized photoemission spectrometer with very high efficiency and energy resolution, Rev. Sci. Instrum. 79, 123117 (2008)  
  https://pubs.aip.org/aip/rsi/article/79/12/123117/353735/A-new-spin-polarized-photoemission-spectrometer
- F. Ji et al., Multichannel Exchange-Scattering Spin Polarimetry, Phys. Rev. Lett. 116, 177601 (2016)  
  https://link.aps.org/doi/10.1103/PhysRevLett.116.177601
- V. N. Strocov et al., Concept of multichannel spin-resolving electron analyzer iMott (2014)  
  https://arxiv.org/pdf/1412.8763
- K. Yaji et al., Visualization of spin-polarized electronic states by imaging spin-resolved photoemission (2024)  
  https://www.tandfonline.com/doi/full/10.1080/27660400.2024.2328206
- H. Iwasawa et al., Efficiency improvement of spin-resolved ARPES (2024)  
  https://www.nature.com/articles/s41598-024-66704-8
- T. Kinoshita, Progress of Surface and Interface Science Using Synchrotron Radiation in Japan (2023, J-STAGE)  
  https://www.jstage.jst.go.jp/article/ejssnt/21/2/21_2023-037/_pdf
- 科研費データベース：VLEEDスピン検出器による高効率スピン分解PES（研究概要）  
  https://kaken.nii.ac.jp/grant/KAKENHI-PROJECT-23244066
- NIMS SAMURAI：スピン角度分解光電子分光・光電子顕微鏡の開発（PDF）  
  https://samurai.nims.go.jp/posters/f019a526-00d7-4818-b4aa-73726edb5c04
- SPring-8 BL25SU（装置・ビームライン情報）  
  https://www.spring8.or.jp/wkg/BL25SU/instrument/lang/INS-0000000490/switchLanguage?set_language=en
