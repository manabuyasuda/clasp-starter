# clasp-starter
[google/clasp](https://github.com/google/clasp)でGoogle Apps Script（GAS）を開発するためのテンプレートです。

## 始め方
パッケージをインストールします。

```
npm ci
```

## ファイル構成

```
.
├── .clasp.json
├── .editorconfig
├── .eslintrc
├── .gitignore
├── README.md
├── dist
│   ├── appsscript.json
│   └── bundle.js
├── package-lock.json
├── package.json
├── src
│   ├── appsscript.json
│   └── main.js
└── webpack.config.js
```

### .clasp.json
[`scriptId`](https://github.com/google/clasp#scriptid-required)を指定してください。

```
{
  "scriptId": "<your_script_id>",
  "rootDir": "dist"
}
```

`scriptId`は、いずれかから取得できます。

- GASのURL（`https://script.google.com/home/projects/XXX/edit`）の`XXX`部分をコピー
- GASの「プロジェクトの設定」から「スクリプトID」をコピー

### src/main.js
`main.js`がエンドポイントになります。

以下のように、必ず`global`オブジェクトとして出力してください。

```
const func = () => {
  console.log('func!')
}

global.func = func
```

### src/appsscript.json
[Manifest](https://developers.google.com/apps-script/manifest)です。

```
{
  "timeZone": "Asia/Tokyo",
  "dependencies": {
  },
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8"
}
```

### dist
GASにプッシュされるファイルです。
`src/appsscript.json`とバンドルされるファイル（`bundle.js`）が出力されます。

## タスク
### `npm run build
GASにプッシュするファイルをビルドします。

```
"build": "rimraf dist && webpack && cpx src/appsscript.json dist",
```

### `npm run lint`
ESLintを実行します。
[JavaScript Standard Style](https://standardjs.com/readme-ja.html)と[Prettier](https://prettier.io/)が反映されます。

```
"lint": "eslint --fix src/**/*.js"
```

### `npm run push`
ファイルをビルド後、GASにプッシュします。

```
"push": "npm run build && clasp push",
```
