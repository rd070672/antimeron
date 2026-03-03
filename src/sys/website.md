# 研究室サイトをGitHub Pagesで立ち上げる

GitHub Pagesは、GitHub上のリポジトリから静的サイト（HTML/CSS/JS）を公開できる仕組みである。研究室サイトでは、テンプレートを基点にレイアウトを整え、研究内容・メンバー・業績を更新しやすい形に設計するのが要点である。

## 参考ドキュメント
1. GitHub Docs（英語）：GitHub Pages Quickstart
https://docs.github.com/en/pages/quickstart

2. GitHub Docs（日本語）：Jekyll を使用して GitHub Pages サイトにテーマを追加する
https://docs.github.com/ja/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll

3. The Programming Historian 日本語訳（国内公開）：JekyllとGitHub Pagesを使った静的ウェブサイトの構築
https://dhportal.ac.jp/?p=1716

## 1. 全体像

### 1.1 サイト種別（URLの形）
- ユーザー／組織サイト：`https://<account>.github.io/`（研究室の公式入口に向く）
- プロジェクトサイト：`https://<account>.github.io/<repo>/`（個別プロジェクトに向く）

ユーザー／組織サイトは、リポジトリ名を `<account>.github.io` とするのが基本である。

### 1.2 公開方式（GitHub PagesのSource）
- ブランチから公開（Deploy from a branch）
  - リポジトリ内の静的ファイルをそのまま配信しやすい
  - 既定ではJekyllビルドが動くため、必要に応じて無効化する
- GitHub Actionsで公開
  - 任意の静的サイト生成（Jekyll以外も含む）でビルドして配信できる


## 2. 立ち上げ手順

1. GitHubでリポジトリを用意する（ユーザー／組織サイトなら `<account>.github.io`）
2. `index.html` を置く（テンプレ採用の場合はテンプレ一式を配置する）
3. リポジトリ Settings → Pages で公開元（ブランチ or Actions）を選ぶ
4. 公開URLを開いて表示を確認する

補足：ブランチ公開で「Jekyll以外の構成」や「そのまま配信したい静的ファイル構成」を採る場合、`.nojekyll` を公開元ルートに置くことでJekyll処理を回避できる。


## 3. 研究室サイト向けテンプレの拾い方

### 3.1 方向性で選ぶ
- 研究者・研究室のプロフィール＋業績を素早く整える
  - Jekyll系の学術向けテーマ（例：al-folio等）は、プロジェクト・ニュース・出版物の見せ方が整っている
- 研究室らしい独自デザインを優先する
  - HTMLテンプレ（静的テンプレ集など）を選び、CSSを自分の色・余白・タイポグラフィに寄せる

### 3.2 テンプレ採用時の作法
- ゴールを「完成」より「更新容易性」に置く
- 研究室で増減する情報（メンバー、業績、ニュース）を、編集箇所が少ない形に寄せる
  - 例：1ページに直書きではなく、データファイル（YAML/JSON/BibTeX等）から生成する設計にする


## 4. HTML/CSSのカスタマイズ要点

### 4.1 情報設計：ページ集合と導線
研究室サイトはページの集合とリンクで構成される。最小モデルとして、

$$
G = (P, E)
$$

- $P$：ページ集合（研究内容、メンバー、業績、連絡先など）
- $E$：リンク集合（ナビゲーション、カード、関連リンクなど）

である。トップページは $P$ 全体の目次として振る舞うように設計するのが合理的である。

### 4.2 CSSでまず触ると効く項目
- レイアウト幅：読みやすさのため本文幅を制御する（例：`max-width`）
- 余白：見出し・段落・カードの間隔を統一する
- フォント：日本語と英語の混在に耐えるフォント選定を行う
- 色：研究室カラーを「アクセント1色＋グレー階調」に寄せると破綻しにくい
- レスポンシブ：スマートフォンで崩れないグリッドと画像サイズを優先する

### 4.3 HTMLで崩れにくい骨格
- 見出し階層（h1→h2→h3）を論理に合わせる
- 画像には `alt` を付与する
- 研究内容は「要約→代表図→箇条書きの要点→関連論文」の順にすると理解が速い

---

## 5. 業績（Publication）更新

### 5.1 更新対象の分離
- 研究室の固定情報：概要、アクセス、設備、連絡先
- 変動する情報：メンバー、業績、ニュース、受賞、講演

変動する情報は「1箇所の編集で全ページに反映される」構成に寄せるのが有利である。

### 5.2 業績の代表的な管理方法
- BibTeXを正として保持し、サイト表示へ変換する
- DOI、arXiv、出版社URL、所属、著者順を揃える
- 研究室内で表記規則（英語表記・略誌名・年の位置など）を統一する

Jekyllテーマの中には、出版物やプロジェクトの「コレクション」を備え、フォルダへ項目を追加するだけで一覧が更新される設計のものがある。


## 6. GitHub Pages設定

### 6.1 ブランチ公開 vs Actions公開の見分け
- ブランチ公開：静的HTML/CSSをそのまま出す・単純に運用する場合に合う
- Actions公開：Jekyll以外の生成器、追加機能、変換処理を併用する場合に合う

### 6.2 独自ドメインとHTTPS
- 独自ドメインはGitHub Pagesで設定できる
- 独自ドメインでもHTTPS配信とHTTPS強制が可能である
- DNSはCNAMEやA/AAAAなど適切なレコード設定が必要である


## 7. 方式比較

| 方式 | 更新のしやすさ | デザイン自由度 | 導入の軽さ | 向く用途 |
|---|---:|---:|---:|---|
| 素のHTML/CSS（.nojekyll併用可） | 中（手編集中心） | 高 | 高 | 小規模・独自デザイン |
| Jekyllテーマ（例：学術向けテーマ） | 高（構造化しやすい） | 中（枠の制約あり） | 中 | 業績・メンバー・ニュースを整然と出す |
| Actionsで任意SSG（MkDocs等） | 高（生成の自由度） | 中〜高 | 中 | ドキュメント重視・体系化 |


## 8. 構成案
- Home：研究室の2〜5行要約＋研究トピック＋最新ニュース数件
- Research：研究テーマをカード化し、各テーマに詳細ページを持たせる
- Members：教員・学生・卒業生（年度別を用意すると蓄積に強い）
- Publications：年別一覧＋代表論文の強調（DOIリンクを付ける）
- Contact/Access：所在地、地図、連絡先、共同研究窓口


## まとめと展望
GitHub Pagesは、研究室サイトを静的ファイルとして公開し、テンプレ導入とHTML/CSS調整で短期間に体裁を整えられる仕組みである。今後は、業績やメンバー情報を構造化して更新の負担を下げ、Actions公開も選択肢に入れて生成・整形の自由度を段階的に高める構成が有望である。


## 参考文献
- GitHub Docs：Configuring a publishing source for your GitHub Pages site
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- GitHub Docs：Creating a GitHub Pages site（.nojekyll 言及あり）
https://docs.github.com/articles/creating-project-pages-manually
- GitHub Blog：Bypassing Jekyll on GitHub Pages
https://github.blog/news-insights/bypassing-jekyll-on-github-pages/
- GitHub Docs：Configuring a custom domain for your GitHub Pages site（日本語/英語）
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
https://docs.github.com/ja/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages
- GitHub Docs：Securing your GitHub Pages site with HTTPS
https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https
- al-folio（Jekyll学術向けテーマ）
https://github.com/alshedivat/al-folio
