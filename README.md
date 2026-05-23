# FTE Static HTML Recreation

STUDIO のライブプレビューをもとに、静的な HTML/CSS/JavaScript で再現したコーポレートサイトです。ビルド工程は不要です。

## ファイル構成

- `index.html` - 再現ページ本体
- `assets/styles.css` - レイアウト、レスポンシブ、フォーム、メニューのスタイル
- `assets/script.js` - モバイルメニュー、問い合わせフォーム送信、スクロール表示制御
- `assets/placeholder.svg` / `assets/logo-placeholder.svg` - 既存の予備アセット

## 確認方法

`index.html` をブラウザで開くと表示できます。外部画像と Google Fonts を参照しているため、ネットワーク接続がある状態で確認してください。

## デプロイ

Cloudflare Pages や GitHub Pages など、静的ファイルを配信できる環境にそのまま配置できます。

- Build command: なし
- Build output directory: `/` または空欄

## フォーム

問い合わせフォームは Formspree のエンドポイント `https://formspree.io/f/xjgzoblb` に送信します。送信先を変更する場合は、`index.html` の `form` 要素の `action` を更新してください。
