# Web開発でMCPを活かすための基礎

MCP（Model Context Protocol）は、LLMアプリケーションと外部のデータ源・実行機能を、共通の手続きとメッセージ形式で接続するためのオープン標準である。Web開発では、AI機能をアプリに埋め込む際の「外部連携の作法」を整理し、再利用可能な接続点として設計するための骨格になる。

## 参考ドキュメント
1. Anthropic, Introducing the Model Context Protocol（MCPの発表）  
   https://www.anthropic.com/news/model-context-protocol
2. Model Context Protocol 仕様（Transports, Protocol Revision: 2025-06-18）  
   https://modelcontextprotocol.io/specification/2025-06-18/basic/transports
3. Zenn（日本語）, MCP（Model Context Protocol）の動作原理の概要を掴むために（resources/list等の要点整理）  
   https://zenn.dev/medopstech/articles/699eece5bc9841

## 1. MCPとは何か

MCPは、AIアプリケーション（MCPクライアント）が、外部システムを「MCPサーバ」として公開された形で利用するためのプロトコルである。発想としては、個別API統合を都度作るのではなく、AIが使うための共通インタフェースとして「発見（list）」「取得（read/get）」「実行（call）」を揃えるものである。

MCPで中心となる公開単位は次の3つである。

- Tools（ツール）
  サーバが提供する実行可能な機能である。例として、検索、DBクエリ、チケット作成、計算、社内システム操作などが該当する。
- Resources（リソース）
  サーバが保持する、参照可能な情報（文書、レコード、設定、ファイル等）をURIで公開する概念である。RAGで「読ませる対象」になりやすい。
- Prompts（プロンプト）
  サーバ側がテンプレート化した指示文・メッセージ群を公開する概念であり、クライアントが引数を与えて呼び出せる。

MCPは「AIが外部とやり取りする際の共通語彙」を用意し、クライアントとサーバの責務分離（AI推論と外部世界の境界）を明確にする点に意義がある。

## 2. Web開発における位置づけ

WebアプリにAI機能を入れるとき、従来は次のようになりやすい。

- フロントエンド：チャットUI、入力支援、要約UIなど
- バックエンド：LLM呼び出し、各サービスAPI連携、認証情報管理
- 外部：DB、業務SaaS、検索、ファイル、社内ツール

MCPは、外部連携部分を「AI向けに共通化」しやすい。とくに「ツール一覧の宣言（tools/list）」「入力スキーマ（JSON Schema）」「実行（tools/call）」を揃えることで、AIがどの手段を使うべきかを、記述（スキーマ）にもとづいて判断できる余地が生まれる。

### 比較表：直接API統合とMCPの見え方

| 観点 | 直接API統合（個別実装） | MCPを介した統合 |
|---|---|---|
| 接続方式 | サービスごとにSDK/HTTP実装 | MCPクライアントが統一手続きを持つ |
| 機能の発見 | ドキュメント・コードに埋もれやすい | list系メソッドで発見しやすい |
| 入力の型・制約 | 実装者が個別に実装 | inputSchema（JSON Schema）で表現しやすい |
| AIの自律実行との相性 | 関数呼び出し設計がバラつきやすい | tool設計が最初からAI呼び出し前提 |
| 接続の再利用 | プロジェクト間で流用しにくい | MCPサーバとして再利用しやすい |

## 3. アーキテクチャの基本

Webアプリでの基本構成は、AI推論（LLM API）とMCPクライアントをバックエンド側に置き、MCPサーバ群へ接続する形になりやすい。理由は、認証情報やトークン、シークレット、社内ネットワーク接続などをブラウザへ出しにくいからである。

### 基本構成（概念図）

- Browser（フロントエンド）
  - チャットUI
  - 進行状況（ストリーミング表示、ツール実行ログ表示など）
- App Backend（Webサーバ）
  - LLM推論（モデル呼び出し）
  - MCPクライアント（ツール・リソースの発見と呼び出し）
  - 権限制御・監査ログ・レート制御
- MCP Servers（複数でもよい）
  - 社内DBサーバ用MCP
  - 文書リポジトリ用MCP
  - チケット・通知用MCP
  - 検索用MCP

このとき、Webバックエンドは「ユーザー操作の受付」と「AIによる外部アクセスの境界」を兼ねるため、権限と可視化の設計が重要になる。

## 4. プロトコルの骨格：JSON-RPC

MCPはメッセージの符号化にJSON-RPCを用いる。JSON-RPCメッセージはUTF-8である。Web開発者にとって重要なのは、MCPが「HTTP上の独自REST」ではなく、「JSON-RPCのmethod呼び出し」として理解できる点である。

### 基本となる操作

MCPの理解を進める上で、次の6操作は中核になる。

- resources/list：利用可能なリソースの列挙
- resources/read：リソース本文（または指定範囲）の取得
- tools/list：利用可能なツールの列挙
- tools/call：ツールの実行
- prompts/list：利用可能なプロンプトの列挙
- prompts/get：プロンプト内容の取得

これらは「列挙（list）」と「具体操作（read/get/call）」に整理され、Web API設計の観点で理解しやすい。

### ツール定義とinputSchema（型情報）

ツールはname、description、入力スキーマ（inputSchema）などのメタデータを持ち、入力の必須・任意、型、制約が表現される。これにより、クライアント側で検証しやすく、モデルにも「どう呼ぶか」を伝えやすい。

## 5. Transports：Web向けにはStreamable HTTPが中心になる

MCPは「トランスポート（運搬）」として、少なくとも次を定義する。

- stdio：標準入出力による通信（ローカル連携に向く）
- Streamable HTTP：HTTP POSTでのクライアント→サーバ通信と、必要に応じたSSE（Server-Sent Events）等によるサーバ→クライアント方向のストリーミング

Web開発では、ブラウザとサーバ、あるいはインターネット越しのサービス接続を意識するため、Streamable HTTPが主要となる。

### 比較表：stdioとStreamable HTTP

| 観点 | stdio | Streamable HTTP |
|---|---|---|
| 主用途 | ローカルプロセス連携、開発時の検証 | Web統合、複数クライアント、ネットワーク越し |
| 接続形態 | プロセス間I/O | HTTP（POST）＋任意のストリーミング |
| 同時接続 | 1プロセス中心になりやすい | 複数クライアントを扱いやすい |
| セッション | 実装に依存 | セッション性・再接続の設計に向く |

## 6. Webアプリに組み込む設計

### 6.1 クライアント側（Webバックエンド）で担うこと
- ユーザー入力の受理と整形（会話状態、添付、参照IDの整理）
- モデル呼び出し（推論）と、モデルからのツール要求の解釈
- MCPサーバへの接続管理（セッション、再接続、タイムアウト）
- 権限の反映（ユーザーごとの可視範囲、操作可能範囲）
- 実行結果の整形とUIへ返す（ストリーミング、段階表示）

MCPは「ツールを呼べば終わり」ではなく、ツールの実行結果を会話へ再投入し、追加の推論につなげる設計が多い。そのため、Webバックエンドは会話ループの制御点になりやすい。

### 6.2 サーバ側（MCPサーバ）で担うこと
- Tools/Resources/Promptsの提供（list/read/get/callの実装）
- 外部サービスの実アクセス（DB、社内API、ストレージ等）
- 監査・記録（どのツールが、何を、いつ実行したか）
- 失敗時のエラー表現（モデルが解釈可能な失敗）

MCPサーバは、外部世界へのゲートとして機能しやすい。したがって、最小権限・操作の粒度・副作用（書き込みの有無）を設計で表現することが重要である。

## 7. Web機能へ落とし込む

### 7.1 Tools：副作用を伴う操作の扱い
Toolsは外部に作用し得るため、次の観点で分けると理解しやすい。

- 読み取り系ツール：検索、問い合わせ、状態取得
- 書き込み系ツール：チケット作成、更新、通知送信、ワークフロー起動
- 変換系ツール：整形、要約、分類、抽出（ただしモデル側でやるか、外部でやるかの設計が要る）

モデルが自動実行し得るという性質上、書き込み系ツールは「ユーザーの同意」「二段階の指示確認」「対象の限定」などの制御が組み込まれやすい。

### 7.2 Resources：RAGと相性が良い
ResourcesはURIで識別され、必要なときにreadで取得される。Webアプリでは次が有用である。

- ユーザーのドキュメント（規約、マニュアル、議事録）
- システム状態（設定、バージョン、権限テーブル）
- 問い合わせ対象データ（商品情報、研究データ、仕様書）

Resourcesは「モデルへ全部投げる」のではなく、listで候補を見せ、必要に応じてreadする構造が自然である。これにより、送信トークン量の制御にもつながる。

### 7.3 Prompts：UI機能の部品化として理解する
Promptsは、Webの機能として「定型タスクの入口」を作りやすい。

- 「問い合わせ文の作成」「説明文の整形」などのテンプレート
- 「社内規程に沿った回答」などの手順化
- 「この画面の項目を埋めるための質問」などの誘導

Promptsをサーバ側に寄せると、複数クライアント（Web、IDE、社内Botなど）から同じ振る舞いを再利用しやすい。

## 8. 認証・認可：OAuth 2.1を中心に理解する

MCPは機密情報や操作権限に直結するため、認証・認可の設計が不可欠である。公式ドキュメントではOAuth 2.1に基づく認可の考え方や、PKCE、HTTPS、リダイレクトURI検証などの要件が整理されている。

Web開発では次の整理が役立つ。

- 認証（Authentication）
  誰がアクセスしているかを確かめる仕組みである（IDの確認）。
- 認可（Authorization）
  何にアクセスしてよいか、何を実行してよいかを制御する仕組みである（権限の適用）。

MCPでは、tools/listの段階で「見せてよい能力だけを列挙する」設計も有力である。列挙結果自体が情報になるためである。

## 9. 安全性の論点：AIによる外部操作を前提にした境界設計

MCPはAIが外部世界へ接続するため、従来のWebアプリとは異なるリスクが前景化する。ここでは、脅威を「AIにより道具が使われること」から整理する。

- 権限の過大付与
  モデルが呼べるツールが広すぎると、誤操作が許容される範囲も広がる。
- 入力の注入（プロンプト注入等）と越権
  ユーザー入力や外部文書により、モデルが不適切なツール呼び出しへ誘導され得る。
- 秘密情報の流出
  ツールの戻り値に機密が含まれる場合、会話ログや解析基盤へ二次流出し得る。
- 副作用操作の扱い
  書き込み系ツールは「一度の誤りが不可逆」になりやすい。

このため、ツール設計時には次が重要である。

- 操作粒度を小さくし、目的が明確な単機能に分ける
- 書き込み系は同意や確認を設計に組み込む
- inputSchemaで制約を明確にし、サーバ側でも検証する
- 監査可能な形でログを残す（誰の権限で実行したかが追える形）

## 10. Web視点での測り方

LLM連携は「遅さ」がUXに直結するため、遅延を分解して考えると設計しやすい。エンドツーエンド遅延 $L$ を次で表す。

$$
L = L_{ui} + L_{net} + L_{llm} + L_{mcp} + L_{tool}
$$

- $L_{ui}$：UI描画や入力処理
- $L_{net}$：ネットワーク往復
- $L_{llm}$：モデル推論（トークン生成を含む）
- $L_{mcp}$：MCPクライアント処理（列挙・検証・再試行等）
- $L_{tool}$：実際の外部処理（DB、検索、社内API）

Streamable HTTPのストリーミング（SSE等）を用いると、全処理完了前から部分結果を表示できるため、体感の待ち時間を短くできる。

また、トークン消費を概念的に次で表すと、Resourcesの読み込み量設計が重要であることが分かりやすい。

$$
C \propto n_{in} + n_{out}
$$

ここで $n_{in}$ は入力トークン量、$n_{out}$ は出力トークン量である。Resourcesを必要以上に読ませる設計は、コストと遅延の両方に影響し得る。

## 11. 開発環境とエコシステム

MCPは仕様と実装が並走しやすく、利用時には「仕様の改訂日（revision）」を意識するのがよい。公式仕様やSDKは、TypeScriptとPythonを含む複数言語で整備が進んでいる。

- 公式仕様・スキーマ（改訂の確認がしやすい）
- TypeScript SDK（Web/Nodeとの親和性が高い）
- Python SDK（データ処理や既存資産と統合しやすい）
- フレームワーク統合（例：Spring AI）
- 開発者ツール統合（例：VS CodeがMCPサーバ利用をドキュメント化）

Web開発では、バックエンドをNode/Java等で実装し、MCPクライアントをそこへ載せる設計が自然である一方、社内の既存機能をMCPサーバとして分離することで再利用性が上がりやすい。

## 12. まとめと展望

MCPは、LLMアプリケーションが外部のデータと機能へ接続する方法を、Tools/Resources/PromptsとJSON-RPC、そしてトランスポート（stdio/Streamable HTTP）として整理する標準である。Web開発においては、AI機能の外部連携を「再利用可能な接続点」として設計し、権限・監査・遅延・コストの議論を構造化する助けになる。

今後は、仕様改訂に伴う認可モデルやストリーミング方式の洗練、IDEやエージェント基盤との統合がさらに進むと見込まれる。Webアプリ側では、AIによる操作の境界（最小権限、同意、監査）を中心に据えつつ、Streamable HTTPを前提にしたUX設計と、Resourcesの読み込み量制御を統合していくことが重要になるであろう。


## 参考文献
- Model Context Protocol 公式サイト（概観）  
  https://modelcontextprotocol.io/
- Model Context Protocol, Transports（Streamable HTTPの説明、SSE言及を含む）  
  https://modelcontextprotocol.io/legacy/concepts/transports
- VS Code Docs, Use MCP servers in VS Code（クライアント/サーバ、ツール発見と呼び出し）  
  https://code.visualstudio.com/docs/copilot/customization/mcp-servers
- Red Hat（日本語）, モデル・コンテキスト・プロトコル（MCP）：セキュリティリスクと制御を理解する  
  https://www.redhat.com/ja/blog/model-context-protocol-mcp-understanding-security-risks-and-controls
- IBM（日本語）, モデル・コンテキスト・プロトコル（MCP）とは何か  
  https://www.ibm.com/jp-ja/think/topics/model-context-protocol
- Google Cloud（日本語）, Model Context Protocolについて  
  https://cloud.google.com/discover/what-is-model-context-protocol?hl=ja
- GitHub, modelcontextprotocol/modelcontextprotocol（仕様・スキーマ・公式ドキュメントのリポジトリ）  
  https://github.com/modelcontextprotocol/modelcontextprotocol
- Spring AI Reference, MCP overview  
  https://docs.spring.io/spring-ai/reference/api/mcp/mcp-overview.html
- OpenAI Agents SDK（MCP節）  
  https://openai.github.io/openai-agents-python/mcp/
