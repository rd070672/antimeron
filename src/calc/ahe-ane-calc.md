# ベリー曲率に基づく異常ホール効果・異常ネルンスト効果の第一原理計算

異常ホール効果（AHE）と異常ネルンスト効果（ANE）は、スピン軌道相互作用と磁性（あるいは時間反転対称性の破れ）を背景に、運動量空間のベリー曲率が作る横輸送として統一的に理解できる現象である。第一原理計算は、この「内因性（intrinsic）」成分を電子構造から直接評価し、材料設計の指針へ接続する方法論である。

## 参考ドキュメント
- N. Nagaosa, J. Sinova, S. Onoda, A. H. MacDonald, N. P. Ong, Anomalous Hall effect, Rev. Mod. Phys. 82, 1539 (2010)
  https://link.aps.org/doi/10.1103/RevModPhys.82.1539
- D. Xiao, Y. Yao, Z. Fang, Q. Niu, Berry-Phase Effect in Anomalous Thermoelectric Transport, Phys. Rev. Lett. 97, 026603 (2006)
  https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.97.026603
- 藤本純治, 異常 Hall 効果：線形応答理論から Berry 曲率を用いて記述する（日本語ノート）
  https://jfujimo.to/memo/gauge-field/1_general/note.pdf

## 1. 物理量の定義：電気伝導テンソルと熱電テンソル
電場 $\mathbf{E}$ と温度勾配 $-\nabla T$ に対する電流密度 $\mathbf{j}$ の線形応答を
$$
\mathbf{j}=\boldsymbol{\sigma}\,\mathbf{E}-\boldsymbol{\alpha}\,\nabla T
$$
で定義する。ここで $\boldsymbol{\sigma}$ は電気伝導テンソル、$\boldsymbol{\alpha}$ は熱電（ペルチェ）テンソルである。

観測で頻出するゼロ電流条件（開回路）では
$$
\mathbf{j}=0 \ \Rightarrow\ \mathbf{E}=\boldsymbol{S}\,\nabla T,\qquad 
\boldsymbol{S}=\boldsymbol{\sigma}^{-1}\boldsymbol{\alpha}
$$
となり、$\boldsymbol{S}$ が熱起電力（ゼーベック係数テンソル）である。異常ネルンスト信号は通常 $S_{xy}$（あるいは $S_{yx}$）として議論される。

AHE は外部磁場ゼロでも $\sigma_{xy}\neq 0$ が生じる現象であり、ANE は外部磁場ゼロでも $S_{xy}\neq 0$（したがって $\alpha_{xy}\neq 0$ が本質）として現れる。

### 1.1 異常ホール角とエネルギー変換
異常ホール角は
$$
\theta_{\rm AHE}\simeq \frac{\sigma_{xy}}{\sigma_{xx}}
$$
で定義されることが多い。材料の出力評価では $\sigma_{xy}$ だけでなく、縦方向の $\sigma_{xx}$ や散乱の影響が同時に効く点に注意が必要である。

## 2. AHE/ANE の機構分類：内因性と外因性
AHE/ANE は大別して
- 内因性：バンド構造のベリー曲率に由来（散乱時間 $\tau$ に一次的に依存しない成分）
- 外因性：不純物散乱に由来（skew scattering、side jump など。$\tau$ や不純物濃度に依存）
に分解して議論される。

第一原理計算が直接扱いやすいのは内因性である。一方、外因性は無秩序（disorder）や散乱過程の取り扱いが必要となり、CPA（coherent potential approximation）を使う KKR 系手法、Kubo–Středa/Kubo–Bastin 形式の無秩序平均、あるいは大規模スーパーセルでの統計平均などへ拡張するのが基本である。

## 3. ベリー曲率の基礎：ブロッホ状態から運動量空間の「仮想磁場」へ
周期系のブロッホ状態を
$$
\psi_{n\mathbf{k}}(\mathbf{r})=e^{i\mathbf{k}\cdot\mathbf{r}}u_{n\mathbf{k}}(\mathbf{r})
$$
とし、ベリー接続（ベクトルポテンシャル）を
$$
\mathbf{A}_n(\mathbf{k})=i\langle u_{n\mathbf{k}}|\nabla_{\mathbf{k}}u_{n\mathbf{k}}\rangle
$$
ベリー曲率（仮想磁束密度）を
$$
\boldsymbol{\Omega}_n(\mathbf{k})=\nabla_{\mathbf{k}}\times \mathbf{A}_n(\mathbf{k})
$$
と定義する。$\boldsymbol{\Omega}_n(\mathbf{k})$ はバンド交差点や回避交差（SOC によるギャップ形成）近傍で大きくなりやすく、AHE/ANE の「ホットスポット」を作る。

実装上重要な等価表現として、速度演算子 $\hat{v}_\alpha=\frac{1}{\hbar}\frac{\partial \hat{H}}{\partial k_\alpha}$ を用いると
$$
\Omega_{n}^{z}(\mathbf{k})
=
-2\,{\rm Im}\sum_{m\neq n}
\frac{
\langle u_{n\mathbf{k}}|\hat{v}_x|u_{m\mathbf{k}}\rangle
\langle u_{m\mathbf{k}}|\hat{v}_y|u_{n\mathbf{k}}\rangle
}{
\left(\varepsilon_{m\mathbf{k}}-\varepsilon_{n\mathbf{k}}\right)^2
}
$$
が得られ、数値計算ではこの形式がよく用いられる（縮退点や近接バンドの扱いが要点となる）。

## 4. 内因性 AHE の導出：ベリー曲率積分としての $\sigma_{xy}$
内因性異常ホール伝導度は、占有状態のベリー曲率のブリルアンゾーン積分で与えられる。ゼロ温度でのエネルギー分解表現は
$$
\sigma_{xy}(\varepsilon)=
-\frac{e^2}{\hbar}
\int [d\mathbf{k}]
\ \Theta(\varepsilon-\varepsilon_{\mathbf{k}})\ \Omega_z(\mathbf{k})
$$
である。ここで $[d\mathbf{k}]=\frac{d^3k}{(2\pi)^3}$、$\Theta$ はステップ関数である。有限温度ではフェルミ分布 $f(\varepsilon_{n\mathbf{k}}-\mu,T)$ を用いて占有を滑らかにした形へ拡張される。

この式が示す本質は、AHE が「フェルミ面だけ」ではなく「フェルミ準位以下のバンド全体の幾何学」を積分した量として現れる点である。したがって、わずかなフェルミ準位シフト（ドーピング、化学ポテンシャル、欠陥）や磁化方向の変更（異方性）、SOC の強さが $\sigma_{xy}$ の符号や大きさを大きく変えうる。

## 5. 内因性 ANE の導出：$\alpha_{xy}$ と Mott 関係
ANE は温度勾配で横電流が生じる現象であり、内因性成分は $\alpha_{xy}$ として記述するのが基本である。熱電伝導度 $\alpha_{xy}$ は、エネルギー依存の $\sigma_{xy}(\varepsilon)$ を用いて
$$
\alpha_{xy}
=
-\frac{1}{e}
\int d\varepsilon\ 
\frac{\partial f}{\partial \mu}\ 
\sigma_{xy}(\varepsilon)\ 
\frac{\varepsilon-\mu}{T}
$$
と書ける。低温極限では Mott 関係として
$$
\alpha_{xy}
=
\frac{\pi^2}{3}\frac{k_B^2T}{e}\ \sigma_{xy}'(\varepsilon_F)
$$
が得られる。ここで $\sigma_{xy}'(\varepsilon_F)=\left.\frac{d\sigma_{xy}}{d\varepsilon}\right|_{\varepsilon_F}$ である。

この関係は、ANE が AHE の「エネルギー微分」に敏感であることを意味する。すなわち
- AHE は $\sigma_{xy}(\varepsilon_F)$ の大きさに敏感
- ANE は $\sigma_{xy}(\varepsilon)$ のエネルギー分散（特に $\varepsilon_F$ 近傍の急峻さ）に敏感
であり、同じ材料でも AHE と ANE の最適条件が一致しない場合がある。

### 5.1 観測量 $S_{xy}$ への変換
実験で得られる異常ネルンスト信号が $S_{xy}$（単位 V/K）として与えられる場合、
$$
\boldsymbol{S}=\boldsymbol{\sigma}^{-1}\boldsymbol{\alpha}
$$
により、$\sigma_{xx},\sigma_{xy},\alpha_{xx},\alpha_{xy}$ の組から計算できる。特に $xy$ 成分は
$$
S_{xy}=
\frac{\alpha_{xy}\sigma_{xx}-\alpha_{xx}\sigma_{xy}}{\sigma_{xx}^2+\sigma_{xy}^2}
$$
である（$\sigma$ を $2\times 2$ とみなせる配置のとき）。第一原理で得やすいのは内因性の $\sigma_{xy},\alpha_{xy}$ である一方、$S_{xy}$ は $\sigma_{xx},\alpha_{xx}$ を介して散乱にも強く依存するため、比較の設計が重要となる。

## 6. 第一原理計算の基本構成：電子構造から $\sigma_{xy},\alpha_{xy}$ へ
### 6.1 DFT 計算（SOC を含む磁性計算）
内因性 AHE/ANE のための最小構成は以下である。
1. スピン分極 DFT により基底状態（磁化）を得る
2. スピン軌道相互作用を含め、必要なら非共線（ノンコリニア）磁性で自己無撞着計算を行う
3. 得られたブロッホ状態（固有値・固有ベクトル）からベリー曲率を評価する

磁化方向に依存する材料では、異なる磁化方向で SOC 計算を行い、テンソル成分（例：$\sigma_{xy}$）の異方性を調べるのが基本である。

### 6.2 k 点収束と「高密度積分」の問題
ベリー曲率はバンド交差近傍で鋭いピークを持つため、単純な $k$ メッシュでは収束が遅い。直接積分で「数百万点規模」の $k$ 点が必要になる状況を、効率よく突破するために最大局在ワニエ関数（MLWF）を用いた補間が広く用いられる。

### 6.3 ワニエ補間に基づく評価
手順は以下の通りである。
- DFT バンドから 最大局在ワニエ関数（MLWF） を構成し、実空間タイトバインディング表現 $H^{\rm W}(\mathbf{R})$ を得る
- 任意の $\mathbf{k}$ での $H^{\rm W}(\mathbf{k})$ を高速に生成し、速度行列要素を求める
- 高密度 $\mathbf{k}$ 上のベリー曲率と $\sigma_{xy}(\varepsilon)$ を数値積分する
- $\sigma_{xy}(\varepsilon)$ から $\alpha_{xy}$ を上式で評価する（有限温度も同様）

この枠組みは、AHE の第一原理評価を現実的な計算量にした代表的手法として位置づけられる。

### 6.4 無秩序・散乱を含む拡張
外因性寄与や $\sigma_{xx}$ の定量比較には散乱が不可避である。基本の方向性は次の通りである。
- ボルツマン輸送（一定緩和時間近似など）で $\sigma_{xx},\alpha_{xx}$ を推定し、内因性 $\sigma_{xy},\alpha_{xy}$ と組み合わせる
- KKR-CPA などで無秩序平均を取り、Kubo 形式で $\sigma_{xy}$ を含む輸送を評価する
- スーパーセルにランダム置換・欠陥を入れ、統計平均で輸送を推定する（計算量は大きい）

内因性と外因性の分離は、実験の温度・残留抵抗・不純物濃度との対応も含めて総合的に議論されるべき対象である。

## 7. ベリー曲率を大きくするバンド構造
AHE/ANE の電子構造的な要点は、ベリー曲率の大きさとフェルミ準位近傍での分布である。一般に次の状況で増強しやすい。
- SOC により生じる回避交差が $\varepsilon_F$ 近傍にある
- Weyl 点やノーダル線由来の強いベリー曲率が存在する（磁性トポロジカル半金属など）
- バンド構造が $\varepsilon_F$ 近傍で急峻に変化し、$\sigma_{xy}'(\varepsilon_F)$ が大きい（ANE の増強条件）

ANE は $\sigma_{xy}$ の微分に効くため、AHE の最大化とは異なる化学ポテンシャル条件が現れうる。したがって、ドーピングや合金化、歪、界面電場などのパラメータで $\mu$ を動かすことが設計変数となる。

## 8. AHE/ANE 計算手法の比較表
| 観点 | AHE（$\sigma_{xy}$） | ANE（$\alpha_{xy}$, $S_{xy}$） | 第一原理で得やすい量 |
|---|---|---|---|
| 中心式 | $\sigma_{xy}=-(e^2/\hbar)\int [d\mathbf{k}]\sum_n f\,\Omega_{n,z}$ | $\alpha_{xy}=-(1/e)\int d\varepsilon (\partial f/\partial\mu)\sigma_{xy}(\varepsilon)(\varepsilon-\mu)/T$ | $\sigma_{xy}$ と $\alpha_{xy}$ の内因性 |
| 温度依存 | 占有の滑らか化で変化、散乱で実効値が変わる | 低温で Mott 関係が成立しやすい | $\sigma_{xy}(\varepsilon)$ の形状 |
| 収束支配要因 | $\mathbf{k}$ 積分（ホットスポット） | $\sigma_{xy}$ のエネルギー分散 | ワニエ補間の精度 |
| 外因性 | skew/side jump が重要になりうる | 同様に重要、さらにドラッグ寄与が議論される | 内因性以外は拡張が必要 |
| 実験量 | $\rho_{xy}$ や $\sigma_{xy}$ | $S_{xy}$（V/K）や $\alpha_{xy}$ | $S_{xy}$ は $\sigma_{xx},\alpha_{xx}$ を介する |

## まとめと展望
AHE と ANE の内因性成分は、スピン軌道相互作用と磁化が作るベリー曲率をブリルアンゾーンで積分することで統一的に導かれる量である。第一原理計算では SOC を含む電子構造から $\sigma_{xy}$ を得て、エネルギー分散を通じて $\alpha_{xy}$（低温では Mott 関係）へ接続するのが基本であり、ワニエ補間が高密度積分を可能にする中核技術である。観測量 $S_{xy}$ まで踏み込むには縦輸送や散乱の影響も不可避であるため、内因性評価と散乱モデル・無秩序理論の組合せが材料理解の骨格となる。

磁性トポロジカル材料（Weyl 半金属、カゴメ系など）では、ベリー曲率が大きくなり AHE/ANE が大きいという観点から研究が活発である。反強磁性体でも対称性の破れ方により AHE/ANE が許され、室温で顕著な異常ネルンストが議論されている系もある。これらは第一原理＋ワニエ補間での解析と相性がよく、$\sigma_{xy}(\varepsilon)$ の形状が材料指標として用いられる。

## 参考資料
- X. Wang, J. R. Yates, I. Souza, D. Vanderbilt, Ab initio calculation of the anomalous Hall conductivity by Wannier interpolation, Phys. Rev. B 74, 195118 (2006)
  https://link.aps.org/doi/10.1103/PhysRevB.74.195118
- wannier90（MLWF とワニエ補間の標準実装）
  https://wannier.org/
- wannier90 チュートリアル：bcc Fe のベリー曲率と異常ホール伝導度
  https://wannier90.readthedocs.io/en/latest/tutorials/tutorial_18/
- WannierTools：ベリー曲率・異常ホール伝導度などの機能一覧
  https://www.wanniertools.com/features.html
- X. Li et al., Anomalous Nernst and Righi-Leduc Effects in Mn3Sn, Phys. Rev. Lett. 119, 056601 (2017)
  https://link.aps.org/doi/10.1103/PhysRevLett.119.056601
- Q. Wang et al., Large intrinsic anomalous Hall effect in Co3Sn2S2, Nat. Commun. 9, 3681 (2018)
  https://www.nature.com/articles/s41467-018-06088-2
- 東北大学プレスリリース（異常ネルンスト効果に関する国内情報の例）
  https://www.tohoku.ac.jp/japanese/2022/07/press20220708-02-nens.html
- 金沢大学プレスリリース（異常ネルンスト効果に関する国内情報の例）
  https://www.kanazawa-u.ac.jp/notice/news/2020/43440/
- NIMS MDR（異常ネルンスト熱電変換に関する国内情報の例）
  https://mdr.nims.go.jp/downloads/nk322m22h?locale=en
