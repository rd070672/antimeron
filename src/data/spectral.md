# スペクトル解析入門

## 参考ドキュメント

- **NI (National Instruments)**: *Understanding FFTs and Windowing*（FFT・窓関数・リーク・エイリアシングの実務解説）
  - https://download.ni.com/evaluation/pxi/Understanding%20FFTs%20and%20Windowing.pdf
- **SciPy**: `scipy.signal.welch`（PSD推定：Welch法、`scaling='density'` の単位など）
  - https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.welch.html
- **Rigaku Journal**: PDF（Pair Distribution Function）解析の基礎（全散乱→G(r) の式と解釈）
  - https://rigaku-journal.com/wp-content/uploads/2021/09/V41N1JA.pdf
- **VASP Wiki**: MDの速度自己相関から振動スペクトル（vDOS相当）を得る例
  - https://www.vasp.at/wiki/index.php/Phonon_w_example


## 概要（材料研究で「スペクトル解析」が効く場面）

スペクトル解析は、時間/空間データを周波数（または波数）成分に分解し、周期性・緩和時間・ノイズ特性・支配モードを定量化するための手法です。

材料科学では例えば：

- 磁気ノイズ（MBN, 1/fノイズなど）：周波数帯ごとの揺らぎ強度、緩和時間の推定
- MD揺らぎ：速度自己相関 → 振動スペクトル（vDOS相当）、拡散・緩和評価
- XAFS/EXAFS：χ(k) を R空間へ（局所構造の可視化・フィッティング）
- 全散乱/PDF：S(Q) を r空間へ（短・中距離秩序の評価）
- LLG/フェーズフィールド：モード分解、共鳴・固有振動の抽出

---

## 1. まず押さえる：サンプリングとナイキスト（aliasing）

実験やシミュレーションの「時系列」x[n] はサンプリング周波数 fs [Hz] で取得されます。

- ナイキスト周波数：  
  \[
  f_\mathrm{N} = \frac{f_s}{2}
  \]
- 重要：
  信号に \(f_\mathrm{N}\) を超える成分があると、低周波に折り返して見える（エイリアシング）  
  → 計測では アンチエイリアス（ローパス）を前提に考えます。

---

## 2. フーリエ変換（FT）/ 離散フーリエ変換（DFT）/ FFT

### 2.1 連続フーリエ変換（概念）
\[
X(f) = \int_{-\infty}^{\infty} x(t)\, e^{-2\pi i f t}\, dt
\]

### 2.2 離散フーリエ変換（DFT）
長さ N の離散信号 \(x_n\) に対して
\[
X_k = \sum_{n=0}^{N-1} x_n\, e^{-2\pi i kn/N}
\quad (k=0,\dots,N-1)
\]

### 2.3 FFT
FFTはDFTを高速に計算するアルゴリズム。

#### 周波数分解能（目安）
測定時間 \(T=N/f_s\) とすると、周波数刻みは概ね
\[
\Delta f \approx \frac{1}{T}=\frac{f_s}{N}
\]
※「ゼロ埋め（zero padding）」は表示の周波数刻みを細かく見せることはできますが、物理的な分解能自体（Δf）を改善するものではありません。


## 3. スペクトルとPSD（パワースペクトル密度）

### 3.1 何が欲しいのか？
- 「この信号の強度（分散・エネルギー）は、どの周波数帯に分布しているか？」
- 実験データの雑音解析や、揺らぎのモデル化（例：白色ノイズ、1/fノイズ）で重要

### 3.2 PSDの単位
信号 x が [V] のような単位を持つとき、PSDは通常
- PSD（density）： [V²/Hz]  
- Power spectrum（spectrum）： [V²]（周波数で積分して全パワーになるイメージ）

SciPy等のツールでは `scaling='density'` / `'spectrum'` を明示する必要があります。

### 3.3 Welch法
有限長データの単純なFFT（periodogram）はばらつきが大きくなりがちです。  
Welch法は「区間に分割 → 窓を掛けてFFT → 平均化」でPSD推定の分散を下げます。

- 実務の初期値の目安：`window='hann'`, `noverlap ≈ nperseg/2`

---

## 4. 有限長データの落とし穴：スペクトルリークと窓関数

FFTは有限区間のデータを「周期信号の1周期」とみなすため、区間端で不連続があると、存在しない高周波成分が混入します。

- これがスペクトルリーク（spectral leakage）
- さらに、リーク由来の成分はナイキストを超えると折り返して見え、解釈を誤ります

### 4.1 窓関数の役割
窓関数は区間端の不連続を弱め、リークを抑制します（ただし分解能とトレードオフ）。

代表的な選び方（目安）：

|窓|特徴|向いている場面|
|---|---|---|
|矩形（窓なし）|分解能は良いがリークが大きい|信号が区間内で「整数周期」になると確信できるとき|
|Hann（Hanning）|万能型。実務のデフォルトにしやすい|多くの場合のPSD、一般計測のFFT|
|Hamming|近傍のリークを抑えたい|近接ピークの判別を少し良くしたい|
|Blackman等|リーク抑制が強い（分解能は悪化しやすい）|強いピークの近くに弱いピークがある|
|Flattop|振幅精度を重視（主ローブが広い）|「ピークの高さ（RMS等）」を測りたい|


## 5. 時間周波数解析：STFT / スペクトログラム / ウェーブレット

### 5.1 STFT（短時間フーリエ変換）
信号を短い窓で区切ってFFTし、時間変化する周波数成分を見ます。

- スペクトログラムは「STFTの絶対値二乗」を可視化したもの：
  \[
  \mathrm{Spectrogram}(t,f)=|X_\mathrm{STFT}(t,f)|^2
  \]

### 5.2 ウェーブレット（多重解像度）
低周波は長い時間窓、高周波は短い時間窓、のように解析解像度を自動的に変えられます。

- EXAFSでは k–R を同時に可視化でき、重なった寄与の分離に有効な場合があります。


## 6. 自己相関とスペクトル（“揺らぎ”解析の芯）

定常過程では、自己相関関数 \(R(\tau)\) とPSD \(S(f)\) はフーリエ対になります（Wiener–Khinchin の関係）：
\[
S(f) = \mathcal{F}\{R(\tau)\}
\]

### MDでの代表例
- 速度自己相関（VACF）のフーリエ変換 → 振動スペクトル（vDOS相当）
- 拡散係数や粘性など、Green–Kubo型の評価へ発展（別ページ推奨）


## 7. 材料データで頻出の「フーリエ解析」3選（混同注意）

### 7.1 EXAFS（XAFS）
- 典型フロー：正規化 → 背景除去 → χ(k) → χ(k)のフーリエ変換で R空間へ
- 注意：|χ(R)| のピーク位置は「そのまま原子間距離」ではなく、位相シフト等でずれます（“見かけの距離”）。

### 7.2 全散乱/PDF（Pair Distribution Function）
全散乱の構造因子 S(Q) から、実空間のG(r) を得ます（代表式）：
\[
G(r)=\frac{2}{\pi} \int_{0}^{Q_\mathrm{max}} Q\,[S(Q)-1]\sin(Qr)\, dQ
\]
- \(Q_\mathrm{max}\) が大きいほど r空間分解能が上がる（目安：\(\Delta r \sim \pi/Q_\mathrm{max}\)）

### 7.3 MD（フォノン/振動）
- VACFのFTで「振動のパワースペクトル（vDOS相当）」を得る流れが定番
- 実際には有限サイズ・有限時間・温度効果・ポテンシャル依存性に注意


## 8.　分析手順

1. fs（サンプリング周波数）と計測時間Tを確認（ナイキスト・Δf）
2. 前処理：オフセット除去（detrend）、外れ値/欠損、必要ならフィルタ（※過剰にやらない）
3. 目的で手法を選ぶ  
   - 「定常」→ WelchでPSD  
   - 「非定常」→ spectrogram/STFT  
   - 「局所的イベント」→ wavelet も検討
4. 窓関数とセグメント長を決める（リーク vs 分解能）
5. ピーク/帯域/傾き（1/fなど）を評価し、物理モデルに戻す
6. 再現性：パラメータ（窓、nperseg、overlap、scaling、前処理）を必ず記録


## 9. Python（SciPy）による一例

```python
import numpy as np
from scipy import signal

# x: 時系列（1D numpy array）, fs: サンプリング周波数[Hz]
f, Pxx = signal.welch(
    x, fs=fs,
    window="hann",
    nperseg=2048,
    noverlap=1024,
    scaling="density"   # PSD（単位: x^2/Hz）
)

# 非定常：スペクトログラム（時間×周波数）
f2, t2, Sxx = signal.spectrogram(
    x, fs=fs,
    window="hann",
    nperseg=2048,
    noverlap=1024,
    scaling="density",
    mode="psd"
)
```

## 10. よくある誤解

- 「FFTしたピーク＝そのまま物理モード」とは限らない
  → 前処理、窓、分解能、リーク、位相補正（EXAFS）、Qmax（PDF）などで見え方が変わる

- 「相関がある＝因果」ではない（スペクトルでも同じ）
  → 追加実験・モデル比較で詰める

- 「ゼロ埋めで分解能が上がる」は誤解
  → 表示が滑らかになるだけで、独立な情報は増えない