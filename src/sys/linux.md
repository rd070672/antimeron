# Linux基礎体系

Linuxは「カーネル」を中心に、多数のソフトウェアが組み合わさって成立するUnix系OS環境である。基本概念（ファイル、プロセス、権限、シェル、サービス管理）を一度構造化して理解すると、ディストリビューション差分があっても応用が利くようになる。

### 参考文献
1. LinuC（LPI-Japan）連載：ファイルのアクセス権を理解する  
   https://linuc.org/study/column/4154/
2. GNU Coreutils Manual  
   https://www.gnu.org/software/coreutils/manual/coreutils.html
3. systemd manual（journalctl）  
   https://www.freedesktop.org/software/systemd/man/journalctl.html

## 0. はじめに

本書は、Linuxを「毎日触る前提」で必要になる基礎を、概念→観測（コマンド出力）→操作の順に整理する文書である。GUI操作は補助扱いとし、コマンドラインを中心に説明する。

Linuxは用途により姿が変わるため、以下の層に分けて捉えると混乱が減る。

- カーネル：プロセス、メモリ、ファイルシステム、ネットワーク、デバイス制御を担当する中核である
- ユーザーランド：シェル、基本コマンド群、ライブラリ、サービス群である
- ディストリビューション：上記を整えて配布し、更新・運用の仕組み（パッケージ管理や既定設定）を提供する集合である
- 標準・規約：POSIX、FHSなどの互換性・配置の規約である


## 1. Linuxとは何か

### 1.1 Linux = カーネル、OS環境 = カーネル + ユーザーランド

厳密にはLinuxはカーネルを指す語であり、一般に「Linux OS」と呼ぶものは、GNUなどのユーザーランド、サービス群、設定体系、パッケージ管理を含む環境全体である。したがって、同じLinuxカーネルでもディストリビューションにより操作体系や既定値が変わる。

代表的なディストリビューションの系統を表に示す。

| 系統 | 代表例 | パッケージ形式/ツール | 特徴 |
|---|---|---|---|
| Debian系 | Debian, Ubuntu | .deb / apt(apt-get) | 安定志向、情報量が多い |
| RHEL系 | RHEL, CentOS Stream, Rocky, Alma, Fedora | .rpm / dnf(yum) | 企業利用が多い、systemd前提 |
| SUSE系 | SLES, openSUSE | .rpm / zypper | 企業向けが強い、資料が整備されやすい |

注意として「コマンドが同じでも挙動が完全一致する」とは限らない。POSIXで定義される範囲と、GNU拡張や各実装の差分が存在するためである。

### 1.2 POSIXと互換性：移植性の軸

POSIX（IEEE 1003.1）は、OSインタフェースとシェル・ユーティリティの共通仕様を定義し、ソースレベルでの移植性を狙う規格である。LinuxはPOSIX/SUS（Single UNIX Specification）互換を志向するが、完全一致ではなく、GNU拡張やLinux固有APIを含むのが通常である。


## 2. ドキュメント参照の基礎

### 2.1 manページの読み方（セクション概念）

Linuxでは一次資料としてmanページが重要である。コマンド名が同じでも、セクションが異なると意味が異なる。

- セクション1：ユーザーコマンド（例：chmod(1)）
- セクション2：システムコール（例：umask(2)）
- セクション5：設定ファイルの形式（例：systemd.unit(5) など）

表示例（概念）：
```
man 1 chmod
man 2 umask
man 5 systemd.unit
```


### 2.2 オプション体系：--help と man の役割分担

--helpは「概略」、manは「完全な仕様」と見るのがよい。特に引数の意味、戻り値、終了ステータス、環境変数の影響はmanが一次資料である。


## 3. ファイルシステムの基本：階層・パス・特別な場所

### 3.1 階層型名前空間：すべては / の下にある

Linuxでは、ファイルとディレクトリは単一の階層ツリーに属し、ルートは / である。別ディスクやネットワークストレージも「マウント」により、この木構造のどこかに接続される。

- 絶対パス：/ から始まる（例：/home/user/data）
- 相対パス：現在位置からの参照（例：./data, ../data）

### 3.2 FHS（Filesystem Hierarchy Standard）：配置の規約

多くのLinuxで、ディレクトリの役割はFHS規約の影響を受ける。主な場所を表に示す。

| パス | 役割（要約） |
|---|---|
| /bin, /usr/bin | 基本コマンド群（近年は統合される場合がある） |
| /sbin, /usr/sbin | 管理者向けコマンド群 |
| /etc | ホスト固有の設定ファイル |
| /var | 変化するデータ（ログ、キャッシュ等） |
| /home | 一般ユーザーのホーム |
| /root | rootのホーム |
| /tmp | 一時ファイル（再起動で消える場合がある） |
| /proc, /sys | カーネル情報の仮想ファイルシステム |

規約は「絶対」ではないが、配置を知ると探索が速くなる。

### 3.3 ファイルの種類：普通のファイル以外が重要である

ls -l の先頭1文字はファイル種別を表す。

| 記号 | 種類 |
|---|---|
| - | 通常ファイル |
| d | ディレクトリ |
| l | シンボリックリンク |
| c | キャラクタデバイス |
| b | ブロックデバイス |
| p | 名前付きパイプ（FIFO） |
| s | ソケット |

特に /dev 配下にはデバイスファイルが配置され、デバイス入出力が「ファイルとして」扱える設計である。


## 4. 多人数利用を前提とした制御

### 4.1 主体（ユーザー）と集合（グループ）

Linuxでは、アクセス制御の主体はユーザーであり、ユーザーは1つ以上のグループに所属する。ユーザーID（UID）とグループID（GID）で内部的に管理される。

- 所有者（user）
- 所属グループ（group）
- その他（others）

### 4.2 sudo と root：特権の付与方法

rootは全権限を持つ管理者ユーザーである。直接rootとして常用するのではなく、通常は一般ユーザーでログインし、必要に応じてsudoで特権を付与する設計が一般的である。


## 5. パーミッションの理解

### 5.1 rwx の意味（ファイルとディレクトリで異なる）

アクセス権は「読み取り（r）」「書き込み（w）」「実行（x）」で表されるが、ディレクトリではxが「入る（探索する）」の意味になる点が重要である。

| 対象 | r | w | x |
|---|---|---|---|
| ファイル | 内容を読む | 内容を変更する | 実行する |
| ディレクトリ | 一覧を読む | エントリを追加/削除 | 中に入る・探索する |

例として、ディレクトリでxが無いと cd できず、ファイル名を知っていても参照できない場合がある。

### 5.2 数値（8進）表現：ビットとしての理解

各主体（user/group/others）について、権限をビットで表し8進数にする。

- r = 4
- w = 2
- x = 1

したがって、ある主体の権限値は次で与えられる。
$${d} = 4r + 2w + 1x$$
ここで $r,w,x \in \{0,1\}$ である。

例：
- rwx = 7
- rw- = 6
- r-x = 5
- r-- = 4

chmod 755 は「所有者7、グループ5、その他5」を意味する。

### 5.3 umask：新規作成時の既定権限を決めるマスク

ファイル作成時に、要求モードからumaskに立っているビットが落とされる設計である。概念的にはビット演算として次で表せる。
$$m_{\mathrm{effective}} = m_{\mathrm{requested}} \land \lnot u$$
ここで $u$ はumaskである。

umaskはプロセスに紐づくため、シェルやサービスにより既定値が変わる点に注意する必要がある。

### 5.4 特殊ビット：setuid/setgid/sticky

通常のrwx以外に、以下の特殊ビットが存在する。

| ビット | 意味（要約） | 代表例 |
|---|---|---|
| setuid | 実行時に所有者権限で動く | /usr/bin/passwd など |
| setgid | 実行時にグループ権限で動く、またはディレクトリ内のGID継承 | 共有ディレクトリ |
| sticky | ディレクトリで「自分のファイルだけ削除可」 | /tmp |


## 6. シェルの基本

### 6.1 シェルは「コマンド解釈器」である

POSIXはシェル言語と共通ユーティリティ群を規定し、Bashなどはそれを拡張した実装である。シェルは、文字列をコマンドとして解釈し、プロセス生成と入出力接続を行う。

### 6.2 展開とクォート：文字列がそのまま渡らないことがある

シェルは「展開」を行う。代表例は以下である。

- ワイルドカード（グロブ）：* ? []
- 変数展開：$HOME, ${PATH}
- コマンド置換：$(command)

クォートは、展開の抑制や空白の扱いを制御する。単引用符 '...' は基本的に展開を抑制し、二重引用符 "..." は変数展開など一部は許可する、という理解から始めるのがよい。

### 6.3 リダイレクション：ファイルディスクリプタの付け替え

標準入出力はファイルディスクリプタで表される。

| FD番号 | 役割 |
|---:|---|
| 0 | stdin |
| 1 | stdout |
| 2 | stderr |

リダイレクションは、実行前にFDを別のファイル等へ向け直す機構である。概念例：

```
command > out.txt # stdoutをファイルへ
command 2> err.txt # stderrをファイルへ
command > out.txt 2>&1 # stderrをstdoutへ合流
```

### 6.4 パイプによる連結：標準出力を次へ渡す

記号 | は、前段のstdoutを後段のstdinへ接続する機構である。多段に連結すると、テキスト処理を分割統治できる。

概念例：
```
A | B | C
```
## 7. プロセスとジョブ制御：実行の単位を理解する

### 7.1 プロセス・PID・親子関係

実行中のプログラムはプロセスであり、PIDを持つ。プロセスは親子関係を形成し、シェルは子プロセスとしてコマンドを起動する。

確認の基本概念：
- 現在のプロセス一覧：ps
- 継続的監視：top, htop
- 特定名検索：pgrep

### 7.2 シグナル：停止・終了・制御の仕組み

プロセスはシグナルで制御される。代表例は以下である。

| シグナル | 意味（要約） |
|---|---|
| SIGTERM | 通常の終了要求 |
| SIGKILL | 強制終了（捕捉不可） |
| SIGINT | 割り込み（Ctrl+C） |
| SIGSTOP/SIGCONT | 停止/再開 |

強制終了は最後の手段として扱うのがよい。まずSIGTERMで終了処理の機会を与える設計が一般的である。

### 7.3 優先度：nice と CPUスケジューリング

プロセスの実行優先度は、nice値などで調整できる。これは「CPU時間の取り合い」を緩和するための制御であり、リアルタイム用途では別のスケジューリング方針がある。


## 8. サービス管理：systemd とユニット

### 8.1 systemdの位置づけ

多くの近代Linuxでは、init/サービス管理としてsystemdが採用されている。systemdは「ユニット」と呼ばれる単位でサービスやマウントなどを管理する。

ユニット種別の例：
- service：常駐プロセス
- timer：時刻起動
- mount：マウント管理
- socket：ソケット起動

### 8.2 systemctl：状態確認と操作

systemctlはsystemdマネージャを制御するツールである。概念例：
```
systemctl status <unit>
systemctl start <unit>
systemctl stop <unit>
systemctl enable <unit>
systemctl disable <unit>
```

enable/disableは「自動起動の設定」であり、start/stopは「現在の起動状態」である、という区別が重要である。

### 8.3 journalctl：ログの一次資料

systemd環境ではjournaldがログを収集し、journalctlで参照する。古いsyslog系と併用される場合もあるが、まずjournalctlで状況確認する流れが増えている。

概念例：
```
journalctl -u <unit>
journalctl -f
journalctl --since "2025-12-01"
```

## 9. ネットワークの基本

### 9.1 名前解決：DNSと /etc/hosts

名前解決はDNSが基本であるが、/etc/hosts で静的に上書きできる。研究室内や検証環境では /etc/hosts が原因で名前が意図せず固定される場合があるため、解決経路を把握しておくとよい。

### 9.2 状態確認コマンド（概念）

- ip：インタフェース、アドレス、ルーティング
- ss：ソケット状態（netstatの後継として使われることが多い）
- curl/wget：HTTP疎通と取得
- ssh：リモートログインと鍵認証


## 10. パッケージ管理の基本

### 10.1 パッケージ管理がOS利用の中心である理由

Linuxではソフトウェア導入は原則としてパッケージ管理を通す。依存関係解決、署名、更新が一体化し、再現性と保守性が上がるためである。

### 10.2 Debian系：apt の考え方

aptはリポジトリからパッケージを取得し、依存性を解決しつつ導入する。

概念例：
```
apt update
apt install <package>
apt upgrade
apt remove <package>
```

リポジトリ追加は強力である一方、信頼性と整合性に影響するため、追加の理由と出所を明確にするのがよい。

### 10.3 RHEL/Fedora系：dnf（yum）体系

RHEL 8系では、dnf技術を基盤とするyumが提供され、yumはdnfのエイリアスとして扱われる。Fedoraではdnfが中心である。

概念例：
```
dnf install <package>
dnf upgrade
dnf remove <package>
dnf search <keyword>
```


## 11. 研究計算・開発環境で重要になるOS機能

### 11.1 ストレージとマウント

外部ストレージ、ネットワークストレージ、コンテナ、仮想環境では「どこにマウントされているか」「誰が読めるか」が支配的である。df（容量）とmount（接続）を結び付けて理解するとよい。

### 11.2 ログと再現性

異常時の一次資料はログである。systemd環境ではjournalctlが入口になりやすい。加えてアプリケーション固有ログが /var/log や /var/lib 配下に置かれるため、FHSの感覚が探索に効く。

### 11.3 コンテナと権限

コンテナはプロセス隔離の一形態であり、ホストのカーネルを共有する。ユーザー名前空間やマウント名前空間などの理解が進むと、ファイル権限の問題が整理されやすい。


## 12. セキュリティの基本観点

Linuxの安全性は「設計」よりも「設定と更新」の影響が大きい。基本方針として以下が重要である。

- 不要なサービスを起動しない
- sudoの付与範囲を絞る
- 鍵認証を優先し、認証情報を分離する
- パッケージ更新を継続する


## 13. 主要概念の対応表

| 概念 | 観測手段の例 | 重要点 |
|---|---|---|
| ファイル階層 | ls, find | / の下に統一される |
| 権限 | ls -l, chmod, umask | ディレクトリのxの意味が重要である |
| プロセス | ps, top, kill | シグナルの違いを理解する |
| サービス | systemctl | enableとstartは別概念である |
| ログ | journalctl | ユニット単位で追える |
| パッケージ | apt/dnf | 依存・更新が中核である |


## まとめと展望

Linuxの基本は「すべてをファイルとして扱う設計」「プロセスと権限で制御する設計」「標準（POSIX）と規約（FHS）で互換性を担保する設計」に集約される。これらを層構造で理解すると、ディストリビューション差分やツール更新があっても、観測すべき対象（権限、ログ、ユニット、依存関係）が見失われにくくなる。

今後は、systemdとコンテナを前提とした環境がさらに一般化し、ログと権限、名前空間とファイル階層の理解がより重要になる展望である。一次資料（man、公式ドキュメント、規格）を軸に知識を更新する姿勢が、長期的に最も強い学習戦略である。


### 参考文献
- Filesystem Hierarchy Standard (FHS) 3.0（Linux Foundation Refspecs）  
  https://refspecs.linuxfoundation.org/FHS_3.0/index.html
- systemd manual（systemctl / unit / service）  
  https://www.freedesktop.org/software/systemd/man/systemctl.html  
  https://www.freedesktop.org/software/systemd/man/systemd.unit.html  
  https://www.freedesktop.org/software/systemd/man/systemd.service.html
- Bash Reference Manual  
  https://www.gnu.org/software/bash/manual/bash.html
- POSIX.1-2024（IEEE 1003.1-2024）概要  
  https://standards.ieee.org/ieee/1003.1/7700/
- The Open Group Base Specifications Issue 8（POSIXオンライン）  
  https://pubs.opengroup.org/onlinepubs/9799919799/
- man7.org（Linux man-pages project）  
  https://man7.org/linux/man-pages/
- Debian 管理者ハンドブック（日本語）  
  https://debian-handbook.info/browse/ja-JP/stable/
- Fedora Docs：DNF  
  https://docs.fedoraproject.org/en-US/quick-docs/dnf/  
  https://dnf.readthedocs.io/en/latest/command_ref.html
- Red Hat Documentation（日本語）：YUM/DNF  
  https://docs.redhat.com/ja/documentation/red_hat_enterprise_linux/8/html/8.0_release_notes/package_management_with_yum_dnf
- SUSE Documentation（日本語）：journalctl  
  https://documentation.suse.com/ja-jp/sles/15-SP7/html/SLES-all/cha-journalctl.html
- Ubuntu Japanese Team：Ubuntuの日本語環境  
  https://www.ubuntulinux.jp/japanese
- Linux Kernel Archives：What is Linux?  
  https://www.kernel.org/linux.html