# VitePressを用いた研究室Wikiの整備

VitePressはMarkdownを中心にWiki型サイトを構築できる静的サイト生成器であり、研究室内の知識・手順・記録を整然と蓄積しやすい。GitHub PagesとGitHub Actionsを組み合わせることで、リポジトリへMarkdownを追加するだけで公開サイトへ反映できる構成にできる。

### 参考ドキュメント
1. VitePress（日本語）：VitePress サイトをデプロイする
https://vitepress.dev/ja/guide/deploy

2. VitePress（日本語）：はじめに（Getting Started）
https://vitepress.dev/ja/guide/getting-started

3. Qiita（日本語）：VitePressをGitHub PagesにActionsで公開する話（base設定を含む）
https://qiita.com/Enokisan/items/6abd1d1d620c2bc4206b

## 1. ねらいと全体像

研究室Wikiの要件は、内容の追加・更新が軽く、ページの検索性が高く、リンクで知識がつながることである。ページ集合を $P$、リンク集合を $E$ とすると、Wikiは概念的に

$$
G=(P, E)
$$

で表せるグラフ構造であり、VitePressは $P$ をMarkdownとして管理し、ビルド時にHTMLへ写像する仕組みである。

公開までの流れも最小化して捉えるとよい。原稿作成から公開までの時間 $T$ は概念的に

$$
T = T_{edit} + T_{build} + T_{deploy}
$$

であり、GitHub Actionsにより $T_{build}+T_{deploy}$ を自動化するのが目的である。


## 2. GitHub Pages側で先に決めること

### 2.1 サイトの種類（URLの形）
- ユーザー／組織サイトである
  - `https://<account>.github.io/`
  - リポジトリ名は `<account>.github.io` が基本である
- プロジェクトサイトである
  - `https://<account>.github.io/<repo>/`
  - 研究室Wikiを「lab-wiki」などのリポジトリ名で運用する場合に自然である

### 2.2 公開方式（GitHub PagesのSource）
- GitHub Actionsで公開する方式が、VitePressとの相性がよい
  - リポジトリの更新（push）をトリガとして、ビルド成果物をPagesへ配信できるためである
- ブランチから公開する方式も可能であるが、生成物の配置やJekyll挙動の扱いが増えるため、最初はActionsが明快である


## 3. VitePressの構成（Wikiとして成立する単位）

### 3.1 ディレクトリ構造（例）
- `docs/`：Wiki本文（Markdown）を置く場所である
- `docs/.vitepress/`：VitePress設定を置く場所である
- `docs/index.md`：トップページである
- `docs/<topic>/...`：分野別ページ群である（例：calc, measure, admin など）

この「docs配下にMarkdownを足していく」形にしておくと、投稿はファイル追加の操作へ還元できる。

### 3.2 初期化
VitePressには対話式の初期化があり、最少の雛形を作れる。ウィザード起動は `npx vitepress init` の形が基本である。

### 3.3 ページ単位設定
各Markdownの先頭にfrontmatter（YAML）を置き、ページタイトルや表示をページ単位で指定できる。これにより、トップページと手順書ページで見せ方を変える、といった調整が可能である。


## 4. 「投稿しやすさ」を最大化する設計

### 4.1 投稿の単位を「1 Markdown = 1 ページ」に固定する
- 新しい手順やメモは、1つのMarkdownファイルとして追加する方針が扱いやすい
- ファイル名はURLになるため、短く一貫した命名にするのがよい（例：`ssh.md`, `vasp-install.md`）

### 4.2 投稿経路を2本にする
- ブラウザだけで更新する経路である
  - GitHubのWeb UIで `docs/.../*.md` を編集し、そのままcommitする運用である
- ローカルでまとめて更新する経路である
  - 複数ファイルを同時に整える場合に向く経路である

この2本を前提にすると、学生も教員も同じ場所（GitHub）だけ見ればよい状態になる。

### 4.3 ナビゲーションの設計
VitePressの既定テーマでは、上部ナビ（nav）とサイドバー（sidebar）が核である。研究室Wikiでは次の分割が理解されやすい。

- Guide：使い始め（アカウント、VPN、ストレージ、計算機ログイン）
- Compute：計算（ソフト導入、ジョブ投入、結果解析）
- Measure：測定（装置予約、手順、データ形式）
- Writing：執筆（図表、引用、雛形）
- Admin：運営（連絡、手続き、物品）

サイドバーは `themeConfig.sidebar` で明示的に管理でき、ディレクトリ単位で出し分ける形にもできる。

### 4.4 検索を最初から有効化する
Wikiはページ数が増えるほど検索が重要である。VitePressは既定テーマでローカル検索（ブラウザ内インデックス）を提供しており、`provider: 'local'` により有効化できる。


## 5. GitHub Pagesへのデプロイ（GitHub Actions方式）

### 5.1 リポジトリ設定（Pages）
- Settings → Pages → Build and deployment → Source を GitHub Actions にする
- 以後は `main` へのpush（またはmerge）ごとに自動デプロイされる形にできる

### 5.2 VitePressの `base` 設定（重要）
GitHub Pagesがプロジェクトサイト（`.../repo/`）になる場合、VitePress側の `base` を `'/repo/'` に合わせる必要がある。ユーザー／組織サイトや独自ドメインでは `base` が不要な場合がある。


## 6. 研究室Wikiとしてのページ設計

### 6.1 トップページ（docs/index.md）の役割
トップページは「研究室のWebサイト」ではなく「Wikiの入口」であると割り切るとよい。推奨する要素は次である。

- はじめに（Wikiの目的、更新方針、連絡先）
- よく参照するページ（コンピュータ利用、データ置き場、装置、テンプレ）
- 最近更新した項目（リンク集でもよい）

### 6.2 研究業績の扱い（Wikiと研究室サイトの分離）
研究室の外向けサイト（研究内容、メンバー、業績）と、内部Wiki（手順、ログ、教育資料）を同一サイトに置くことも可能である。一方で、情報の公開範囲が異なる場合があるため、次の2案を比較し、研究室の方針に合わせて選ぶとよい。

| 案 | 公開範囲 | 構成 | 利点 | 注意点 |
|---|---|---|---|---|
| A：外向け＋内部Wikiを同一リポジトリで運用 | 原則公開 | 1つのVitePress | 管理が一箇所で済む | 非公開情報を置けない |
| B：外向けサイトと内部Wikiを分ける | 分離可能 | リポジトリ2つ | 公開範囲を制御しやすい | 入口URLが増える |


## 7. テンプレとカスタマイズ

### 7.1 変更効果が大きい項目
- サイトタイトルとロゴである（`siteTitle`, `logo`）
- ナビとサイドバーである（`nav`, `sidebar`）
- 検索である（`search.provider`）
- 編集導線である（Edit linkなどの設定は、更新の動機づけとして強い）

### 7.2 画像・PDFの置き方
- 画像は `docs/public/` に置き、Markdownからは `/...` の絶対パスで参照するのが明快である
- PDFは「配布用」と「参照用」で置き場を分け、リンク名に日付を含めると後から追跡しやすい（例：`2025-xx-handout.pdf`）


## 8. 留意点

- プロジェクトサイトの場合、`base='/repo/'` の設定が合わないとCSSやリンクが崩れることがある
- サイドバーの階層は深くしすぎない方が探索しやすい（VitePressの階層制限も意識するのがよい）
- 検索は文字列を広く拾うため、ページタイトルと見出し粒度を整えると精度が上がる
- Markdown内の表記ルール（見出し、用語、日付形式）を短いガイドとして1ページ置くと、複数人編集でも統一しやすい


## まとめと展望
GitHub PagesとVitePressを組み合わせると、研究室WikiをMarkdown中心で蓄積し、GitHubへの更新を契機に自動で公開サイトへ反映できる構成にできる。今後は、カテゴリ設計（サイドバーの分割）と検索の整備を軸に、手順・教育資料・研究ログが相互に参照される知識グラフを育てる方向が有望である。


### 参考文献
- VitePress（英語）：Getting Started
https://vitepress.dev/guide/getting-started
- VitePress：Site Config（baseの説明）
https://vitepress.dev/reference/site-config
- VitePress（日本語）：サイドバー設定
https://vitepress.dev/ja/reference/default-theme-sidebar
- VitePress（日本語）：ナビゲーション設定（ロゴ、タイトル等）
https://vitepress.dev/ja/reference/default-theme-nav
- VitePress：Default Theme Search（local search）
https://vitepress.dev/reference/default-theme-search
- GitHub Docs：Quickstart for GitHub Pages（username.github.io 形式）
https://docs.github.com/en/pages/quickstart
- GitHub Docs：Using custom workflows with GitHub Pages（configure-pages / deploy-pages）
https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- actions/deploy-pages（GitHub Action）
https://github.com/actions/deploy-pages
