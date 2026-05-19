# FTE Corporate Static Site

このリポジトリは、STUDIOで作成した仮サイトの雰囲気を再現した、Tailwind CSSベースの1ページ静的サイトです。

## ファイル構成

- `index.html` - 1ページサイトのメインHTML
- `assets/styles.css` - 共通スタイル
- `assets/script.js` - モバイルメニュー、フォーム、スクロールフェード制御
- `assets/FTE_logo_banner.png` - ロゴ画像（実物を配置してください）
- `assets/logo-placeholder.svg` - ロゴ未設置時のフォールバック画像
- `assets/placeholder.svg` - 写真差し替え用のプレースホルダー画像

## デプロイ方法（Cloudflare Pages）

1. GitHubにリポジトリをプッシュします。
2. Cloudflare Pagesで新しいサイトを作成し、先ほどのGitHubリポジトリを接続します。
3. ビルド設定は不要です。
   - Build command: なし
   - Build output directory: `/` または空欄
4. デプロイを開始します。

> このサイトは純粋な静的HTMLなので、ビルドステップなしでそのまま公開できます。

## 画像差し替え方法

1. `assets/placeholder.svg` を任意の写真ファイルに置き換えるか、HTML内の該当 `img` 要素を更新します。
2. 本物のロゴを `assets/FTE_logo_banner.png` として追加してください。
3. 画像差し替えが起きたら、`index.html` 内の `src` パスを必要に応じて修正します。

## フォーム接続方法

現在、`contactForm` はダミー送信として実装されています。Formspreeなどと接続するには、以下のように `form` 要素を書き換えます。

```html
<form id="contactForm" action="https://formspree.io/f/your-form-id" method="POST">
```

追加で、実際の送信処理を有効にしたい場合は、`assets/script.js` の `submit` イベントリスナーを調整して、ダミー処理を削除してください。

## 確認ポイント

- PC表示: レイアウトが崩れていないか
- スマホ表示: ナビゲーション・フォーム・コンテンツが読みやすいか
- Cloudflare Pages: ビルド不要で公開できるか
- 画像差し替え: `assets/placeholder.svg` と `assets/FTE_logo_banner.png` を置き換えるだけで更新できるか

## 今後の拡張

- `about.html` / `business.html` / `contact.html` などのページを追加しやすいように、ヘッダー・フッター・フォーム周りの構造はシンプルに保っています。
- 共通パーツの再利用は `index.html` の構造を参考に追加できます。
