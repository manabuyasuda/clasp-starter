# clasp-starter
[google/clasp](https://github.com/google/clasp)でGoogle Apps Script（GAS）を開発するためのテンプレートです。

## 始め方
### clasp CLIをインストール
※インストール済みの場合はスキップしてください

CLIをグローバルにインストールします。

```
npm install -g @google/clasp
```

[Apps Scriptの設定画面](https://script.google.com/home/usersettings)に移動します。
「Google Apps Script API」を選択、チェックボックスをオンにしてください。

ユーザー認証します。
以下を実行後、アカウントの選択、「許可」を実行してください。

```
clasp login
```

ブラウザに`Logged in! You may close this page.` と表示され、ターミナルに`Authorization successful.`と表示されたら完了です。
`/Users/ユーザー名/.clasprc.json.`が生成されているはずです。

### スプレッドシートとGASの準備
GASと連携するスプレッドシートを作成します。
「ツール」から「スクリプトエディタ」を開きます。

スクリプトエディタから`scriptId`を、どちらかの方法でコピーしておきます。

- GASのURL（`https://script.google.com/home/projects/XXX/edit`）の`XXX`部分をコピー
- GASの「プロジェクトの設定」から「スクリプトID」をコピー

### リポジトリの作成
「clasp-starter」を使うリポジトリをクローン、リポジトリのルートに移動してください。

以下のコマンドを実行します。

```
git clone --depth=1 git@github.com:manabuyasuda/clasp-starter.git && cd clasp-starter && rm -rf .git && mv * .[^\.]* ../ && cd ../ && rm -r clasp-starter
```

以下の処理を実行しています。

1. 「clasp-starter」をシャロークローン
2. 「clasp-starter」に移動して、`.git`を削除
3. 「clasp-starter」内にあるファイル一式を1階層上に移動
4. リポジトリのルートに戻って、「clasp-starter」を削除

`clasp.json`を開いて、`scriptId`にペーストします。

```
{
  "scriptId": "<your_script_id>",
  "rootDir": "dist"
}
```

### パッケージのインストール
パッケージをインストールします。

```
npm ci
```

### GASにプッシュ
以下のスクリプトでGASにプッシュされます。

```
npm run push
```

プッシュ前に、ESLintとJSのビルドが実行されます。
個別に確認したい場合は、以下のスクリプトを実行してください。

- ESLint： `npm run lint`
- JSのビルド： `npm run build`


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

### src/main.js
`main.js`がエンドポイントになります。

以下のように、必ず`global`オブジェクトとして出力してください（実行できなくなります）。

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
`src/appsscript.json`と、`src/main.js`からバンドルされるファイル（`bundle.js`）が出力されます。
