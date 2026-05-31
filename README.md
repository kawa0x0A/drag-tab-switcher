# Drag Tab Switcher

Stable Diffusion WebUI (AUTOMATIC1111) 拡張機能

画像をドラッグしてタブボタンの上にホバーすると、自動的にそのタブへ切り替えてくれます。

## 対応タブ

| ホバー先 | 動作 |
|---|---|
| **img2img** タブボタン | img2img タブへ自動切り替え |
| **PNG Info** タブボタン | PNG Info タブへ自動切り替え |

## インストール方法

1. ZIPを展開して SD WebUI の `extensions/` フォルダにコピーする
   ```
   stable-diffusion-webui/
   └── extensions/
       └── drag-tab-switcher/
           ├── javascript/
           │   └── drag-tab-switcher.js
           ├── scripts/
           │   └── drag_tab_switcher_script.py
           └── README.md
   ```
2. WebUI を再起動する

## 使い方

1. 画像ファイルをブラウザウィンドウへドラッグする
2. **img2img** または **PNG Info** タブボタンの上にホバーする
3. タブが自動的に切り替わる

## 設定 (JavaScript 内 CONFIG オブジェクト)

`javascript/drag-tab-switcher.js` の先頭にある `CONFIG` を編集することで動作を変更できます。

```js
const CONFIG = {
  hoverDelay: 0,   // ホバーからタブ切り替えまでの遅延 (ms)。誤操作が気になる場合は 300 程度に設定
  debug: false,    // コンソールにデバッグログを出力するか
};
```

## 動作環境

- AUTOMATIC1111 stable-diffusion-webui v1.6 以降
- Chrome / Firefox / Edge (最新版)
