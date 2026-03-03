# WIEN2k の計算例

WIEN2k は全電子 FP-(L)APW+lo 法を用した第一原理固体計算コードで、電子構造・バンド構造・状態密度・応力最適化・スピン軌道相互作用 (SOC) などが可能である。ここでは「バルク結晶（例：TiC または MnO／FeSe）を例に，SCF 計算からDOS／バンド構造取得」までの流れを紹介する。

## 参考リンク  
- WIEN2k ユーザーガイド： 
  http://www.wien2k.at/reg_user/textbooks/usersguide.pdf
- “DFT (WIEN2k) and Wannier orbitals” チュートリアル： 
  https://triqs.github.io/dft_tools/latest/tutorials/sr2mgoso6_soc.html


## 準備と構造定義  
- 対象構造（例：TiC NaCl 構造）を準備。
- `case.struct` ファイルを作成（または CIF → struct 変換）  
- 初期格子定数・原子位置を記入，空間群・対称性を設定  
- `init_lapw` スクリプトを実行して初期化（近傍距離・原子球半径 RMT 等をチェック） 

## 自己無撞着計算 (SCF)  
- メインスクリプト：`run_lapw`（通常モード）や `runsp_lapw`（スピン分極）を実行  
- 例：`run_lapw -ec 0.0001 -cc 0.0001` のようにエネルギー収束（EC）・チャージ収束（CC）を指定。 
- 出力ファイル `case.scf` や `case.dayfile` をチェック：エネルギー変化、チャージ距離 (`:DIS`) を確認。
- 収束後、必要に応じて格子最適化・内部座標最適化を実施  

## DOS／バンド構造計算  
- SCF収束後、DOS 計算用に `x lapw1`, `x lapw2 -qtl`, `x tetra` 等のスクリプトを実行。
- バンド構造取得には k-点パスを定義し、`x spaghetti` 等を用いる。
- 例：FeSe のチュートリアルでは `x lapw1 –band`, `x lapw2 –qtl –band`, `x spaghetti` を順につないでいる。
- 得られた `.agr` / `.ps` ファイルを Gnuplot／Grace 等で可視化  

## 応用設定：スピン軌道 (SOC)、ハイブリッド汎関数  
- SOCを含める場合は `init_so` を実行して、`run_lapw -so` または `runsp_lapw -so` で計算。
- ハイブリッド汎関数 (例：mBJ, HYBR) を用いたバンドギャップ改善の例もあり。

## 注意事項・運用上のポイント  
- RMT（原子球半径）と RKMAX（基底拡大率）の設定が精度に大きく影響。
- k-点密度・エネルギーカットオフ（ENCUT 相当）を適切に設定／収束確認することが重要。  
- SOC／高精度モードでは計算コストが急増するため、リソース（メモリ・並列数）を考慮。  
- 出力ログを `grep :ENE` や `grep :DIS` などで監視し、計算状態を把握。
