# マルコフ連鎖モンテカルロ（MCMC）法

MCMC（Markov Chain Monte Carlo）は、正規化定数が未知でも扱える確率分布から標本を生成し、推定値だけでなく不確かさまで同時に評価するための計算法である。観測ノイズや系統誤差を含むモデル化と相性が良く、逆問題を確率論として解く中核に位置づく。

## 参考ドキュメント
1. N. Metropolis, A. W. Rosenbluth, M. N. Rosenbluth, A. H. Teller, E. Teller, "Equation of State Calculations by Fast Computing Machines" (1953)  
   https://bayes.wustl.edu/Manual/EquationOfState.pdf
2. W. K. Hastings, "Monte Carlo sampling methods using Markov chains and their applications" (1970)  
   https://www2.stat.duke.edu/~scs/Courses/Stat376/Papers/Basic/Hastings1970.pdf
3. 伊庭幸人, "MCMC チュートリアル"（統計数理研究所 講演スライド）  
   https://www.ism.ac.jp/~shiro/papers/2017.05.slides/Iba.pdf

## 1. 目的と全体像

多くの解析では、観測データ $y$ と未知パラメータ $\theta$ を結ぶ順問題
$y \approx f(\theta)$
が与えられ、逆に $\theta$ を推定したい。しかし、測定ノイズ、モデル近似、未知の較正因子、相関したパラメータなどがあると、最適化で点推定するだけでは情報が欠落する。

MCMCは「確率分布としての答え」を返す。すなわち、事後分布 $p(\theta\mid y)$ を標本列 $\{\theta^{(t)}\}$ で近似し、平均・分散・信用区間・相関構造・多峰性などを推定する。

## 2. ベイズ推定としての定式化（逆問題の確率化）

### 2.1 観測モデルと尤度
観測方程式を
$
y = f(\theta) + \varepsilon
$
とし、ノイズを $\varepsilon \sim \mathcal{N}(0,\Sigma)$ と仮定すると尤度は
$
p(y\mid \theta) \propto \exp\!\left(-\frac{1}{2}(y-f(\theta))^{\mathsf{T}}\Sigma^{-1}(y-f(\theta))\right)
$
である。ここで $\Sigma$ に相関（非対角）を入れると、時系列・スペクトル・画像の「なめらかさ」や装置応答由来の相関ノイズを表せる。

### 2.2 事前分布と事後分布
ベイズの定理により
$
p(\theta\mid y)=\frac{p(y\mid\theta)p(\theta)}{p(y)}
$
である。$p(y)$（証拠、周辺尤度）は多くの場合計算困難だが、MCMCは $p(y)$ を知らずに $p(\theta\mid y)\propto p(y\mid\theta)p(\theta)$ を取り扱える。

事前分布 $p(\theta)$ は「物理的にあり得る範囲」「単位系」「既知の文献値」「較正の不確かさ」「正則化（滑らかさ・疎性）」などを反映する。例えば滑らかさを好む場の推定なら
$
p(\theta)\propto \exp\!\left(-\lambda \|\nabla \theta\|^2\right)
$
のような形で拘束を入れられる。

## 3. マルコフ連鎖の基礎：定常分布としての目標分布

### 3.1 マルコフ性と定常分布
状態 $\theta$ の遷移確率を $K(\theta'\mid\theta)$ とし、マルコフ連鎖
$
\theta^{(t+1)}\sim K(\cdot\mid \theta^{(t)})
$
を作る。目標は、十分長く回したときの分布（定常分布）が目標分布 $\pi(\theta)=p(\theta\mid y)$ になることである。

### 3.2 詳細釣り合い（微視的可逆性）
しばしば
$
\pi(\theta)\,K(\theta'\mid\theta)=\pi(\theta')\,K(\theta\mid\theta')
$
（詳細釣り合い）を満たすように設計すると、$\pi$ が定常分布となることが示せる。メトロポリス・ヘイスティングス法はこの考えに基づく代表例である。

## 4. 基本アルゴリズム

### 4.1 メトロポリス・ヘイスティングス（MH）法
提案分布 $q(\theta'\mid\theta)$ で候補 $\theta'$ を生成し、受理確率
$
\alpha(\theta,\theta')=\min\!\left(1,\frac{\pi(\theta')\,q(\theta\mid\theta')}{\pi(\theta)\,q(\theta'\mid\theta)}\right)
$
で更新する。$\pi$ は未正規化でもよい。

対称提案 $q(\theta'\mid\theta)=q(\theta\mid\theta')$（例：ランダムウォーク正規）なら
$
\alpha=\min\!\left(1,\frac{\pi(\theta')}{\pi(\theta)}\right)
$
に簡約される。

[MH の手順（擬似コード）]

```
与える：初期値 θ(0)
for t = 0,1,2,...
θ' ~ q(· | θ(t))
受理確率 α = min(1, π(θ') q(θ(t)|θ') / (π(θ(t)) q(θ'|θ(t))) )
u ~ Uniform(0,1)
if u < α: θ(t+1) = θ'
else: θ(t+1) = θ(t)
```

MHは実装が簡潔だが、高次元・強相関の問題ではランダムウォーク化しやすい。そこで以下の派生が重要になる。

### 4.2 ギブスサンプリング（条件付き分布の直抽出）
$\theta=(\theta_1,\dots,\theta_d)$ とし、全条件付き分布 $p(\theta_i\mid \theta_{-i},y)$ が直接サンプルできるとき
$
\theta_i^{(t+1)}\sim p(\theta_i\mid\theta_{-i}^{(t)},y)
$
を順に回す。線形ガウスモデルや共役事前分布の組では強力である。直接サンプルできないパラメータだけMHで更新する「混合型」も広く使われる。

### 4.3 ハミルトニアンモンテカルロ（HMC）とNUTS
連続パラメータの高次元問題では、勾配 $\nabla_{\theta}\log \pi(\theta)$ を用いるHMCが有効である。運動量 $r$ を導入し、ハミルトニアン
$
H(\theta,r)=U(\theta)+K(r),\quad U(\theta)=-\log \pi(\theta),\quad K(r)=\frac{1}{2}r^{\mathsf{T}}M^{-1}r
$
で力学系を作る。リープフロッグ法で時間発展を近似し、最後にMH受理で厳密性を回復する。

HMCでは刻み幅 $\epsilon$ とステップ数 $L$ の設定が効く。NUTS（No-U-Turn Sampler）は軌道が「折り返す」前に自動停止する木構造探索で $L$ を自動化し、さらに適応で $\epsilon$ を調整することで調整負担を減らす。

## 5. 収束・混合の評価（標本列を信頼できる形にするために）

### 5.1 自己相関と有効標本サイズ（ESS）
連鎖標本は独立ではない。自己相関 $\rho_k$ を用いて、分散の増大を表す積分自己相関時間
$
\tau_{\mathrm{int}} = 1 + 2\sum_{k=1}^{\infty}\rho_k
$
を定義すると、標本数 $N$ に対し
$
N_{\mathrm{eff}} \approx \frac{N}{\tau_{\mathrm{int}}}
$
が有効標本サイズの基本的な見積もりとなる。$N_{\mathrm{eff}}$ が小さいと、平均や分位点の推定誤差が大きくなる。

### 5.2 多本鎖と $\widehat{R}$（Gelman–Rubin系指標）
複数の独立初期値から $m$ 本の連鎖を走らせる。各連鎖の長さを $n$ とし、連鎖内分散 $W$、連鎖間分散 $B$ を用いると、代表的な形として
$
\widehat{R}=\sqrt{\frac{\widehat{V}}{W}}
$
で $\widehat{R}\to 1$ を混合の目安とする（近年はランク正規化や分割の改良版が広く用いられる）。多峰性や重い裾では、$\widehat{R}$ と ESS を併用し、連鎖の可視化（ランクプロット等）と合わせて判断するのが自然である。

## 6. 測定データ解析への接続：モデル・装置応答・不確かさを同時に扱う

### 6.1 装置関数を含む前向きモデル
観測が装置応答 $g$ で畳み込まれるなら
$
y \approx (g * s)(x;\theta) + \varepsilon
$
のように書ける。ここで $s$ は真の信号モデル（スペクトル線形結合、散乱強度、応答関数のパラメータ化など）である。$g$ 自体の不確かさ（分解能、ゼロ点ずれ、バックグラウンド）を $\theta$ に含めると、推定の不確かさへ自然に伝播する。

### 6.2 階層モデル（試料間ばらつき・繰り返し測定）
複数試料・複数温度・複数ロットのデータがあるとき、各測定を独立にフィットすると推定が不安定になることがある。そこで
$
\theta_j \sim \mathcal{N}(\mu,\Lambda),\quad y_j \sim p(y_j\mid \theta_j)
$
のような階層化で「共通の母集団パラメータ」と「個体差」を分離し、ばらつきも推定できる。磁化曲線・輸送・散乱・分光など、条件依存性が強い場面で有効である。

### 6.3 複数候補モデルの比較
モデル $M$ 自体が候補として複数あるとき、周辺尤度 $p(y\mid M)$ に基づく比較（ベイズ因子）や情報量基準（近似）で比較する流儀がある。MCMCで得た事後標本は、予測分布
$
p(\tilde{y}\mid y)=\int p(\tilde{y}\mid\theta)p(\theta\mid y)\,d\theta
$
を通じて外挿・補間の信頼区間にも直結する。

## 7. MCMC手法の選択：基本特性の比較

| 手法 | 更新の仕組み | 得意な状況 | 注意すべき点 |
|---|---|---|---|
| MH（ランダムウォーク） | 提案→受理/棄却 | 低〜中次元、実装の簡潔さ | 高次元で移動が遅くなりやすい |
| ギブス | 条件付き分布から直抽出 | 共役構造、分割がうまくできる系 | 条件付き分布が解析的に必要 |
| HMC | 勾配を使い慣性で移動 | 連続・高次元・強相関 | 勾配計算と数値積分が必要 |
| NUTS | HMCの自動化（経路長など） | 多くの連続パラメータ問題 | 離散変数との混在は工夫が要る |
| アフィン不変アンサンブル | 複数ウォーカーで更新 | スケールが歪んだ事後分布 | ウォーカー数の確保が必要 |

## 8. 物性研究でよく現れる構造と、MCMC設計の考え方

### 8.1 強相関パラメータと再パラメータ化
例えば「振幅」と「幅」が相関するようなモデルでは、$(A,\sigma)$ より $(\log A,\log \sigma)$ のような変数変換で幾何が整い、混合が改善することがある。事後分布の幾何（細長い谷、曲がった尾）を整えることは、計算量を減らす最短経路である。

### 8.2 拘束条件の扱い
物理的拘束（正値、総量保存、組成の和が1など）は、次のような写像で自然に満たせる。

- 正値：$\phi\in \mathbb{R}$ として $\theta=\exp(\phi)$
- 組成：$\phi\in\mathbb{R}^K$ として $\theta_k=\exp(\phi_k)/\sum_j\exp(\phi_j)$（softmax）

こうした拘束は事前分布の設計にも関わる。

### 8.3 多峰性と拡張手法
相が競合する、複数の局所解が同程度に良い、という状況では事後分布が多峰的になりやすい。このとき単一温度のMCMCは峰の間を行き来しにくい。並列テンパリング（温度付き複数連鎖の交換）などが有効になることがある。

## 9. まとめ

MCMCは、未正規化の事後分布から標本列を生成し、推定値と不確かさを同時に得るための基本手段である。MH、ギブス、HMC/NUTSなどを問題の構造（連続/離散、高次元、強相関、多峰性）に合わせて選び、ESSや改良$\widehat{R}$などで標本列の品質を評価することが、信頼できる推定へ直結する。

## 関連研究
- M. D. Hoffman, A. Gelman, "The No-U-Turn Sampler: Adaptively Setting Path Lengths in Hamiltonian Monte Carlo" (2014)  
  https://jmlr.org/papers/volume15/hoffman14a/hoffman14a.pdf
- A. Vehtari, A. Gelman, D. Simpson, B. Carpenter, P.-C. Bürkner, "Rank-normalization, folding, and localization: An improved $\widehat{R}$ for assessing convergence of MCMC" (Bayesian Analysis, 2021)  
  https://projecteuclid.org/journals/bayesian-analysis/advance-publication/Rank-Normalization-Folding-and-Localization--An-Improved-R%CB%86-for/10.1214/20-BA1221.pdf
- Stan（rstan）: R-hat と収束・効率診断の説明  
  https://mc-stan.org/rstan/reference/Rhat.html
- PyMC documentation: NUTS サンプラの説明  
  https://www.pymc.io/projects/docs/en/v5.9.1/api/generated/pymc.NUTS.html
- D. Foreman-Mackey et al., "emcee: The MCMC Hammer" (2012)  
  https://arxiv.org/abs/1202.3665
- 福島孝治, 「モンテカルロ法の基礎と応用」講義ノート（京都大学）  
  https://repository.kulib.kyoto-u.ac.jp/bitstream/2433/235551/1/bussei_el_072214.pdf