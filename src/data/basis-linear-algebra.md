# 機械学習のための線形代数入門

機械学習の中核は、ベクトル・行列として表現されたデータに対する線形変換と最適化である。したがって線形代数は、モデルの表現能力・計算効率・数値安定性を決める基盤である。

## 参考ドキュメント
- MIT OpenCourseWare, 18.06 Linear Algebra (Gilbert Strang)
  https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/

- Stanford CS229, Linear Algebra Review (PDF)
  https://cs229.stanford.edu/notes2022fall/linalg.pdf

- 九州大学 数理・データサイエンス教育研究センター, 線形代数に基づくデータ解析の基礎（PDF）
  https://mdsc.kyushu-u.ac.jp/wp/wp-content/uploads/2023/07/a4b5a02cf7b127e514ed66cfaa165c0d.pdf

## 1. 位置づけ：機械学習で線形代数が現れる場所

機械学習の多くは、入力データ $x\in\mathbb{R}^d$ を行列 $X\in\mathbb{R}^{n\times d}$ としてまとめ、予測や特徴抽出を線形変換として扱うところから始まる。例えば線形回帰では $X\theta$ が出力を生成し、損失関数を最小化するために $X^TX$ や $X^Ty$ が現れる。

深層学習でも同様で、全結合層は $y=W x + b$、注意機構（attention）は行列積と正規化（softmax）を繰り返す構造である。したがって、線形代数は「表現（どんな写像を作るか）」と「計算（それをどう速く安定に解くか）」の両方を支える。


## 2. 記号とデータ表現：スカラー・ベクトル・行列・テンソル

### 2.1 基本オブジェクト

- スカラー：$a\in\mathbb{R}$
- ベクトル：$x\in\mathbb{R}^n$
- 行列：$A\in\mathbb{R}^{m\times n}$
- テンソル：多次元配列（深層学習の実装では一般にテンソルと呼ぶが、数学的テンソルの厳密さとは距離がある）

### 2.2 よく使う操作

- 転置：$A^T$
- 逆行列：$A^{-1}$（存在条件に注意が必要）
- 行列積：$AB$（一般に可換でない）
- トレース：$\mathrm{tr}(A)=\sum_i A_{ii}$
- 行列式：$\det(A)$
- 単位行列：$I$

トレースの循環性 $\mathrm{tr}(AB)=\mathrm{tr}(BA)$ は行列微分でも重要である。


## 3. 内積・ノルム・距離：類似度と損失関数の幾何

### 3.1 内積と直交

内積を $x^Ty$ とすると、直交は $x^Ty=0$ で定義される。正規化は $\|x\|_2=1$ を満たすようにスケールする操作である。直交基底は情報が重ならない座標系を与え、最小二乗やPCAで中心的役割を果たす。

### 3.2 ノルムと距離

代表的ノルムは以下である。

| 名称 | 定義 | 機械学習での出番 |
|---|---|---|
| $\ell_2$ ノルム | $\|x\|_2=\sqrt{\sum_i x_i^2}$ | 最小二乗、正規化、コサイン類似度 |
| $\ell_1$ ノルム | $\|x\|_1=\sum_i{x_i}$ | スパース性（正則化） |
| $\ell_\infty$ ノルム | $\|x\|_\infty=\max_i{x_i}$ | ロバスト化の解析など |
| Frobenius | $\|A\|_F=\sqrt{\sum_{ij}A_{ij}^2}$ | 行列近似、損失（行列回帰） |

距離は $d(x,y)=\|x-y\|$ で与えられることが多い。類似度としてはコサイン類似度
$$
\cos(x,y)=\frac{x^Ty}{\|x\|_2\|y\|_2}
$$
が埋め込み（embedding）の評価で頻出である。


## 4. 線形写像と部分空間：基底・一次独立・階数・零空間

### 4.1 線形写像

$A$ はベクトル空間上の線形写像 $x\mapsto Ax$ と見なせる。列空間 $\mathcal{C}(A)$ は $A$ の出力が到達する空間、零空間 $\mathcal{N}(A)$ は $Ax=0$ を満たす入力の集合である。

### 4.2 階数（rank）

$\mathrm{rank}(A)$ は列（または行）の一次独立な本数である。$\mathrm{rank}(A)\le \min(m,n)$ であり、正方行列でフルランクなら逆行列が存在する。

機械学習では、特徴量が強く相関すると $X$ の階数が実効的に下がり、$X^TX$ の条件が悪くなることがある。これは学習の不安定さや推定誤差の増大として現れるため、後述の正則化と結びつく。

## 5. 連立一次方程式：$Ax=b$ とモデル学習

連立一次方程式 $Ax=b$ を解くことは、回帰・ガウス過程の計算・最適化の内部計算で繰り返し現れる。例えば最小二乗は $A=X, b=y$ に相当し、解は正規方程式
$$
X^TX\theta = X^Ty
$$
として表される。

ただし、実装では $X^TX$ を明示的に作るよりも、QR分解やSVD、あるいは反復法で解く方が数値的に好まれる場面が多い。ここには「丸め誤差が増えやすい」「条件数が二乗される」など数値線形代数の事情がある。


## 6. 射影と最小二乗：回帰・正則化

### 6.1 幾何としての最小二乗

最小二乗は
$$
\min_\theta \|X\theta-y\|_2^2
$$
であり、$y$ を $X$ の列空間 $\mathcal{C}(X)$ へ直交射影したときの残差を最小化する問題である。直交射影の思想はPCAにも直結する。

### 6.2 リッジ回帰（$\ell_2$ 正則化）

リッジ回帰は
$$
\min_\theta \|X\theta-y\|_2^2 + \lambda\|\theta\|_2^2
$$
であり、正規方程式は
$$
(X^TX+\lambda I)\theta = X^Ty
$$
となる。$X^TX+\lambda I$ は（$\lambda>0$ で）正定値になりやすく、解が一意で安定化する。


## 7. 固有値分解：二次形式・共分散・反復法

### 7.1 固有値・固有ベクトル

正方行列 $A$ の固有値・固有ベクトルは
$$
A v = \lambda v
$$
で定義される。共分散行列 $\Sigma$ の固有値は分散の大きさ、固有ベクトルは主方向を表し、PCAの理解に直結する。

### 7.2 対称行列と半正定値

対称行列 $A=A^T$ は実固有値を持ち、直交行列で対角化できる。半正定値（$x^TAx\ge 0$）は、カーネル法のグラム行列、共分散行列、リッジ回帰の $(X^TX+\lambda I)$ などで重要である。


## 8. 特異値分解（SVD）：最重要の行列分解

### 8.1 定義

任意の $A\in\mathbb{R}^{m\times n}$ は
$$
A = U\Sigma V^T
$$
と分解できる。ここで $U\in\mathbb{R}^{m\times m}$ と $V\in\mathbb{R}^{n\times n}$ は直交行列、$\Sigma$ は非負の特異値を対角に並べた行列である。

SVDはPCA、低ランク近似、正則化、数値安定な最小二乗の中核を成す。NumPyの `numpy.linalg.svd` は内部でLAPACKルーチンを用いることが文書化されている。

### 8.2 低ランク近似（圧縮）

特異値を大きい順に $\sigma_1\ge\sigma_2\ge\cdots$ とすると、上位 $k$ 個だけ残して
$$
A \approx U_k \Sigma_k V_k^T
$$
とすれば、情報を保ちながら次元を落とす近似になる。これはPCAの「分散を最大に保つ射影」と同値の見方を与える。


## 9. PCA：SVDとしての次元削減

データ行列 $X\in\mathbb{R}^{n\times d}$ を各特徴量で中心化してからSVDを行い、上位主成分方向に射影するのがPCAである。scikit-learnのPCAは「中心化した入力にSVDを適用して低次元へ射影する」ことを明記している。

### 9.1 PCAの基本数式

中心化した行列を $\tilde{X}$ とし、共分散を
$$
S=\frac{1}{n}\tilde{X}^T\tilde{X}
$$
とすると、$S$ の固有ベクトルが主成分方向であり、固有値が寄与（分散）を表す。SVD $\tilde{X}=U\Sigma V^T$ を使うと
$$
S=\frac{1}{n}V\Sigma^2V^T
$$
となり、SVDと固有値分解が直結する。

### 9.2 どの解法を使うか

| 方法 | 何を分解するか | 長所 | 注意 |
|---|---|---|---|
| 固有値分解 | $S=\tilde{X}^T\tilde{X}$ | 共分散の理解が直観的 | $d$ が大きいと重い |
| SVD | $\tilde{X}$ そのもの | 数値的に扱いやすい | 実装はライブラリ依存 |
| ランダム化SVD | 近似でSVD | 大規模で高速 | 近似誤差を管理する |

ランダム化SVDは、乱択で「大部分の情報を含む部分空間」を見つけてから圧縮し、縮約した行列に決定的手続きを適用する枠組みとして整理されている。


## 10. 行列微分（行列微積分）：勾配降下と逆伝播の計算規則

機械学習では、損失関数 $L(\theta)$ の勾配 $\nabla_\theta L$ を計算して更新する。行列・ベクトルで書かれた式を微分するには、トレースを用いた書き換え（trace trick）や、行列微分の公式が有効である。CS229の線形代数ノートは、トレースの性質や行列微分の要点をまとめている。

行列微分の公式集としては The Matrix Cookbook が広く参照され、逆行列の微分などを系統的に与えている。

## 11. 疎行列・反復解法・ランダム化：大規模学習の計算

深層学習や大規模線形モデルでは、計算量の支配項が行列積になる場合が多い。疎行列ではゼロ要素を省いて計算し、反復法（共役勾配法など）で $Ax=b$ を解く設計が重要になる。

Dense（密）線形代数の性能はBLAS/LAPACKに大きく依存する。BLASはLevel 1（ベクトル操作）・Level 2（行列ベクトル）・Level 3（行列行列）に整理され、LAPACKなど高水準計算の土台として使われている。


## 12. 計算ライブラリ（BLAS/LAPACK）
### 12.1 BLASとLAPACKの役割

- BLAS：ベクトル・行列の基本演算（Level 1/2/3）を規格化したもの
- LAPACK：連立一次方程式、最小二乗、固有値問題、SVDなどの高水準ルーチン群

この分業により、同じアルゴリズムでもBLAS実装（CPU最適化版など）次第で速度が大きく変わる。LAPACK Users’ Guide には、導入・インストール・使用上の情報が体系化されている。

### 12.2 NumPyなどの高水準APIとの関係

例えば `numpy.linalg.svd` は内部でLAPACKルーチンを使うことが明記されており、数式上のSVDが実装では数値線形代数ルーチンにより実現されていることが読み取れる。


## 13. NumPyでPCA（SVD）を自作する

以下は、中心化→SVD→上位 $k$ 次元へ射影→復元（近似）までを行う最小コードである。

```python
import numpy as np

def pca_svd(X, k):
    """
    X: (n_samples, n_features)
    k: number of components
    returns:
      Z: low-dim representation (n_samples, k)
      X_hat: reconstruction (n_samples, n_features)
      components: principal axes (k, n_features)
      explained_variance: (k,)
    """
    # 1) center
    mu = X.mean(axis=0, keepdims=True)
    Xc = X - mu

    # 2) SVD: Xc = U Σ V^T
    # full_matrices=False makes U:(n,kmax), Σ:(kmax,), Vt:(kmax,d) where kmax=min(n,d)
    U, S, Vt = np.linalg.svd(Xc, full_matrices=False)

    # 3) take top-k
    Uk = U[:, :k]
    Sk = S[:k]
    Vtk = Vt[:k, :]

    # 4) low-dim coordinates (scores)
    Z = Uk * Sk  # equivalent to Uk @ diag(Sk)

    # 5) reconstruction
    X_hat = (Z @ Vtk) + mu

    # 6) explained variance (sample covariance convention)
    n = X.shape[0]
    explained_variance = (Sk**2) / (n - 1)

    components = Vtk  # rows are principal axes
    return Z, X_hat, components, explained_variance
```

この実装は「PCAは中心化したデータにSVDを適用して低次元へ射影する」という説明と整合する。

## まとめと展望
線形代数は、機械学習におけるデータ表現（ベクトル・行列）、学習（最小二乗・正則化）、表現学習（PCA・低ランク近似）、および勾配計算（行列微分）を一貫した数学で結びつける基盤である。特にSVDは、次元削減・安定な推定・近似計算を統一的に理解するための中心概念である。

今後は、(1) ランダム化・近似行列分解による大規模計算の整理、(2) 疎行列・反復法と確率的最適化の接続、(3) BLAS/LAPACKやGPU線形代数上での計算モデル理解、の三点が「学習アルゴリズムの理解」と「計算特性」の距離を縮める方向として重要になる。

## 参考文献
- scikit-learn documentation, PCA
  https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.PCA.html
- NumPy documentation, numpy.linalg.svd
  https://numpy.org/doc/stable/reference/generated/numpy.linalg.svd.html
- netlib, BLAS
  https://www.netlib.org/blas/
- netlib, LAPACK
  https://www.netlib.org/lapack/
- LAPACK Users’ Guide (HTML)
  https://www.netlib.org/lapack/lug/
- Petersen & Pedersen, The Matrix Cookbook (PDF)
  https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf
- Halko, Martinsson, Tropp, Finding structure with randomness (SIREV, PDF)
  https://users.cms.caltech.edu/~jtropp/papers/HMT11-Finding-Structure-SIREV.pdf
- 理化学研究所 中田真秀, 線形代数演算ライブラリBLASとLAPACKの基礎と実践（PDF, 2013）
  https://cmsi.issp.u-tokyo.ac.jp/ja/events/0523-nakata-rev1.pdf