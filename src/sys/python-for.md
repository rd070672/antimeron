# Python の for 文を速くする

Python の for 文が遅く感じる場面の多くは、1 要素ずつ Python インタプリタが処理していることが原因である。速度を上げる本質は、ループ回数そのものを減らし、低レベル実装（NumPy / pandas / JIT など）へ「塊で渡す」ことである。

### 参考ドキュメント
- Python 公式ドキュメント（日本語） timeit — 小さなコード断片の実行時間計測  
  https://docs.python.org/ja/3/library/timeit.html
- Numba Documentation: Performance Tips  
  https://numba.pydata.org/numba-doc/latest/user/performance-tips.html
- Zenn: Numbaで科学技術計算を高速化する（日本語）  
  https://zenn.dev/keita69/articles/8c9cbbff122418

## 1. for 文が遅くなりやすい理由
Python のループは、各反復でバイトコード実行、型判定、属性参照、関数呼び出し、例外処理の準備などのオーバーヘッドを背負う。要素数 N が大きいと、計算そのものよりオーバーヘッドが支配的になる。

簡略化した時間モデルを置く：

$$
T_{\rm py} \approx N\,(t_{\rm loop}+t_{\rm dispatch}+t_{\rm op}) + t_{\rm alloc}
$$

- $t_{\rm loop}$：反復・分岐・インデックス更新
- $t_{\rm dispatch}$：動的型付けに伴うディスパッチ、属性参照、関数呼び出し
- $t_{\rm op}$：演算自体（加算や乗算など）
- $t_{\rm alloc}$：list 伸長、オブジェクト生成、GC の誘発など

一方、NumPy や pandas の「ベクトル化」は、ループ本体を C/Fortran で回すため、

$$
T_{\rm vec} \approx t_{\rm setup} + N\,t_{\rm c\_loop} + t_{\rm temp}
$$

となり、$t_{\rm loop}+t_{\rm dispatch}$ の多くを削れる。高速化が大きいほど、しばしば $t_{\rm temp}$（一時配列）やメモリ帯域が次の支配項になる。

速度向上を見積もるときは Amdahl の式も有用である（遅い部分だけ速くしても、全体の上限がある）：

$$
S = \frac{1}{(1-p) + \frac{p}{s}}
$$

- $p$：改善対象が占める時間割合
- $s$：改善対象の局所的な高速化倍率
- $S$：全体の高速化倍率

## 2. 時間計測の基本

速くする前に、どこが重いかを把握する必要がある。体感ではなく、同じ条件で複数回測るのが基本である。

### 2.1 timeit（短い関数の比較）

```python
import timeit

setup = """
import numpy as np
x = np.random.rand(1_000_000)
"""

stmt1 = "y = [v*v for v in x]"           # Python で回してしまう例（xはndarrayだが反復はPython）
stmt2 = "y = x*x"                        # NumPy の要素演算（Cループ）

print(timeit.timeit(stmt1, setup=setup, number=10))
print(timeit.timeit(stmt2, setup=setup, number=10))
```

- 重要なのは「同じ入力」「同じ回数」「複数回」である。
- JIT（Numba）を使う場合は、初回コンパイルを除いて測る工夫がいる。

### 2.2 全体像の把握

```python
import cProfile
import pstats

def main():
    # ここに対象処理を書く
    pass

cProfile.run("main()", "prof.out")

stats = pstats.Stats("prof.out")
stats.sort_stats("tottime").print_stats(30)
```

- 関数単位で「どこに時間が落ちているか」を可視化できる。
- 行単位で掘りたい場合は line_profiler / scalene などが有効である（後述）。

## 3. 高速化の選択肢：何をどう変えるか

for 文を速くする、という言い方はしばしば誤解を招く。狙いは「for 文を残したまま速くする」よりも、「for 文を減らす／外へ追い出す」ことである。以下は効果が出やすい順に整理する。

## 4. ループを減らす：NumPy に寄せる

データサイエンス領域では、配列（ベクトル・行列）演算に落とせるかが最初の分岐である。

### 4.1 Python ループ 

例：ReLU + 二乗和（多い処理パターン）

```python
import numpy as np

x = np.random.randn(1_000_000)

# 遅い：Python ループ
s = 0.0
for v in x:
    if v > 0:
        s += v*v

# 速い：NumPy でまとめて（ブールマスク + ufunc）
pos = x > 0
s2 = np.sum(x[pos] * x[pos])
```

さらに一時配列を減らすために、`out=` を使う方法もある（メモリ圧が効く場面で有効）：

```python
tmp = np.empty_like(x)
np.maximum(x, 0.0, out=tmp)        # tmp = max(x, 0)
np.square(tmp, out=tmp)            # tmp = tmp**2
s3 = tmp.sum()
```

### 4.2 条件分岐は np.where

```python
y = np.where(x > 0, x, 0.0)  # if を配列演算へ
```

### 4.3 注意：numpy.vectorize は速くならない

`np.vectorize` は見た目を配列っぽくする道具であり、内部は本質的にループである。速度目的で使う設計ではない。

```python
import numpy as np

def f(v):
    return v*v if v > 0 else 0.0

vf = np.vectorize(f)

x = np.random.randn(1_000_000)
y = vf(x)  # 速度で得をする保証はない（むしろ遅いことが多い）
```

## 5. pandas の for 文を消す：列演算・結合・map へ

pandas は列単位の演算を速くする構造であり、行ループは不利になりやすい。特に `iterrows()` や `apply(axis=1)` を多用すると、Series を何度も生成する形になりやすい。

### 5.1 行ループ → 列演算（基本）

```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    "a": np.random.randn(1_000_000),
    "b": np.random.randn(1_000_000),
})

# 遅い：行ごと（apply axis=1）
df["c1"] = df.apply(lambda r: r["a"]**2 + r["b"]**2, axis=1)

# 速い：列演算
df["c2"] = df["a"]*df["a"] + df["b"]*df["b"]
```

### 5.2 ルックアップは辞書 + map（結合も候補）

```python
mapping = {"A": 1.0, "B": 2.0, "C": 3.0}
df["score"] = df["category"].map(mapping)  # ループより速いことが多い
```

別表（別 DataFrame）から値を持ってくる場合は、for で探索するより `merge` が基本である。

### 5.3 それでも行処理が必要なとき：妥協案

完全なベクトル化が難しい場合でも、`iterrows()` より `itertuples()` が速い場合が多い。

```python
for row in df.itertuples(index=False):
    # row.a, row.b として参照できる
    pass
```

## 6. ループを残して速くする：Numba（JIT）で C にする

NumPy に落とせない独自ロジック（複雑な条件分岐、状態を持つ更新、DP、逐次更新など）は Numba が効きやすい。Python 構文の一部を機械語へ JIT コンパイルし、「ループだけ」高速化できる。

### 6.1 例：条件つき二乗和（Numba）

```python
import numpy as np
from numba import njit

@njit(cache=True)
def relu_square_sum(x):
    s = 0.0
    for i in range(x.size):
        v = x[i]
        if v > 0:
            s += v*v
    return s

x = np.random.randn(1_000_000)

# 初回はコンパイルが走るので、2回呼んで「2回目以降」を測るのが基本
relu_square_sum(x)
ans = relu_square_sum(x)
print(ans)
```

### 6.2 並列化（prange）の例

計算が独立で、かつ十分大きい配列なら並列化が効く場合がある。

```python
import numpy as np
from numba import njit, prange

@njit(parallel=True, cache=True)
def relu_square_sum_parallel(x):
    s = 0.0
    for i in prange(x.size):
        v = x[i]
        if v > 0:
            s += v*v
    return s
```

ただし reduction の安定性（丸め誤差）や環境依存のスレッド数制御に注意が要る。

### 6.3 Numba が向かない例

- Python オブジェクト（dict, list of str など）の重い操作
- pandas の DataFrame を直接回す
- 例外や動的な型変更が多い処理

その場合は、入力を NumPy 配列へ寄せる、あるいは Cython / Rust / C++ などに寄せる選択になる。

## 7. Cython で型を固定してループを速くする

Numba と同様に「Python のループをコンパイル側に寄せる」方法である。Cython は静的型を与えることで C レベルのループにできる。配列処理では typed memoryview が軸になる。

概念例（ビルド手順はプロジェクト構成に依存するため、ここではコードの骨格のみ示す）：

```cython
# cython: boundscheck=False, wraparound=False
import cython
cimport cython

@cython.boundscheck(False)
@cython.wraparound(False)
def relu_square_sum(double[:] x):
    cdef Py_ssize_t i, n = x.shape[0]
    cdef double s = 0.0
    cdef double v
    for i in range(n):
        v = x[i]
        if v > 0:
            s += v*v
    return s
```

- Cython は導入コストがあるが、長期運用するコア処理には強い。
- NumPy の内部配列を直接触る設計が可能である。

## 8. 並列化：スレッドかプロセスか（GIL を理解する）

CPython では GIL のため、Python バイトコードを同時に実行できるスレッドは基本 1 つである。CPU 計算でスレッド並列を狙うなら、(1) NumPy のように内部で GIL を解放する処理を使う、(2) multiprocessing / ProcessPoolExecutor を使う、のどちらかが基本である。

### 8.1 I/O 処理は ThreadPoolExecutor が有効

```python
from concurrent.futures import ThreadPoolExecutor
import requests

urls = ["https://example.com"] * 100

def fetch(u):
    return requests.get(u, timeout=5).status_code

with ThreadPoolExecutor(max_workers=20) as ex:
    codes = list(ex.map(fetch, urls))
print(sum(codes))
```

### 8.2 CPU 計算は ProcessPoolExecutor が候補

```python
from concurrent.futures import ProcessPoolExecutor
import numpy as np

def work(chunk):
    # chunk は pickling で渡るので、量が大きいほど転送コストが出る
    return float(np.sum(chunk*chunk))

x = np.random.rand(10_000_000)
chunks = np.array_split(x, 8)

with ProcessPoolExecutor(max_workers=8) as ex:
    out = list(ex.map(work, chunks))
print(sum(out))
```

ここで重要なのは、プロセス間転送と分割・結合のコストである。NumPy の大配列を大量にコピーしてしまう設計では逆効果になりうるため、共有メモリ（shared_memory）やオンディスクの分割など別設計が必要になる場合がある。

## 9. 代替ランタイム・GPU：適用条件が合えば大きい

### 9.1 PyPy

純 Python のループが多く、NumPy に強く依存しないコードでは効く場合がある。一方で、科学計算系の C 拡張との相性・速度はケースに依存するため、対象コードでの計測が不可欠である。

### 9.2 GPU（CuPy / JAX）

行列演算・畳み込み・大規模要素演算など、GPU に載せ替えやすい計算は高速化幅が大きい。データ転送（CPU↔GPU）が支配的になる場合も多いので、演算をまとめる設計が重要である。

## 10. 注意点

### 10.1 一時配列が増えてメモリが詰まる
ベクトル化は速いが、式をそのまま書くと中間配列が増えることがある。

```python
# 中間配列が複数できる可能性
y = (a*b + c*d) / (e + f)
```

必要なら `out=`、`where=`、あるいは numexpr / pandas.eval を検討する。

### 10.2 dtype によるオーバーフローと精度劣化
整数 dtype のまま二乗すると簡単にオーバーフローする。`astype(np.float64)` のように設計で型を決めておくのが安全である。

### 10.3 pandas → NumPy 変換のコピーコスト
`DataFrame.to_numpy()` は dtype の共通化の都合でコピーが発生する場合がある。列の dtype を整理してから変換する方がよい。

### 10.4 Numba は「初回が遅い」
初回はコンパイルが走る。短い 1 回だけの処理では得をしないことがある。繰り返し呼ぶ関数に適用するのが自然である。

### 10.5 並列化は割り算でなく足し算
分割・転送・同期が増える。小さな仕事を大量に投げる設計は遅くなることが多い。まとめて投げる方がよい。

## 11. 手順としての進め方（迷いを減らすための順番）

1. timeit で候補案を比較し、差が出る形を見つける  
2. cProfile / 行プロファイラで、時間上位の箇所を特定する  
3. NumPy / pandas の表現へ寄せられるか検討する  
4. 無理なら Numba（次点で Cython）でループだけコンパイルする  
5. なお残るなら、プロセス並列や GPU を含む設計変更を考える  
6. 結果が一致していること（数値誤差を含む）をテストで確認する  

## 12. 手法の比較表

| 手法 | 速くなる理由 | 適するデータ | 実装コスト | 注意点 |
|---|---|---|---|---|
| list 内包表記 | ループが最適化されやすい | Python list | 低 | 劇的にはならない |
| NumPy ufunc / ブロードキャスト | ループを C で実行 | ndarray | 中 | 一時配列・メモリ帯域 |
| pandas 列演算 / merge / map | 列指向の内部処理に乗る | DataFrame | 中 | 行方向の apply は遅くなりやすい |
| Numba（njit） | ループを機械語化 | NumPy 配列中心 | 中〜高 | 初回コンパイル、制約あり |
| Cython | 型固定で C ループ | 長期運用のコア処理 | 高 | ビルド管理が必要 |
| ProcessPoolExecutor | GIL 回避で CPU 並列 | 大きな独立タスク | 中 | 転送・分割コスト |
| ThreadPoolExecutor | 待ち時間の重なり | I/O | 中 | CPU 計算は伸びにくい |
| GPU（CuPy / JAX） | 並列演算器 | 大規模行列・要素演算 | 中〜高 | 転送コスト、環境依存 |

## まとめ
Python の for 文を速くする最短経路は、ループを減らし、配列・列演算や JIT によって「低レベルで回るループ」へ移すことである。timeit とプロファイラで重い箇所を特定し、まず NumPy / pandas へ寄せ、それでも難しい部分だけ Numba / Cython でコンパイルする構成が、速度と保守性の両立に有利である。

## 関連研究
- NumPy: Array programming with NumPy（Nature, 2020）  
  https://www.nature.com/articles/s41586-020-2649-2
- pandas: Data Structures for Statistical Computing in Python（Wes McKinney, 2010）  
  https://conference.scipy.org/proceedings/scipy2010/mckinney.html
- NumPy 公式ドキュメント：Broadcasting  
  https://numpy.org/doc/stable/user/basics.broadcasting.html
- NumPy 公式ドキュメント：numpy.vectorize（便利関数であり性能目的ではない）  
  https://numpy.org/doc/stable/reference/generated/numpy.vectorize.html
- pandas 公式ドキュメント：Enhancing performance（Cython/Numba/pandas.eval など）  
  https://pandas.pydata.org/docs/user_guide/enhancingperf.html
- Python 公式ドキュメント（日本語）cProfile — Python プログラムのプロファイリング  
  https://docs.python.org/ja/3/library/profile.html
- Python 公式ドキュメント（日本語）threading（GIL の説明を含む）  
  https://docs.python.org/ja/3.13/library/threading.html
- NumPy 公式ドキュメント：Thread Safety（多くの操作が GIL を解放する旨）  
  https://numpy.org/doc/stable/reference/thread_safety.html
- PEP 659: Specializing Adaptive Interpreter（CPython 高速化の設計）  
  https://peps.python.org/pep-0659/
- publickey（日本語）Python 3.13 の JIT 実験的実装の紹介  
  https://www.publickey1.jp/blog/24/pythonjitpython_3130.html
