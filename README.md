# FTE Static HTML Recreation

STUDIO のライブプレビューをもとに、静的な HTML/CSS/JavaScript で再現したコーポレートサイトです。ビルド工程は不要です。

## ファイル構成

- `index.html` - 再現ページ本体
- `assets/styles.css` - レイアウト、レスポンシブ、フォーム、メニューのスタイル
- `assets/script.js` - モバイルメニュー、ダミーフォーム送信、スクロール表示制御
- `assets/placeholder.svg` / `assets/logo-placeholder.svg` - 既存の予備アセット

## 確認方法

`index.html` をブラウザで開くと表示できます。外部画像と Google Fonts を参照しているため、ネットワーク接続がある状態で確認してください。

## デプロイ

Cloudflare Pages や GitHub Pages など、静的ファイルを配信できる環境にそのまま配置できます。

- Build command: なし
- Build output directory: `/` または空欄

## フォーム

問い合わせフォームはダミー送信です。実送信に接続する場合は、`index.html` の `form` 要素に送信先を設定し、`assets/script.js` の `submit` イベント処理を調整してください。
