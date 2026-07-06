# 声形 Koe-Katachi

声のかたち(声調の輪郭)でピンインを覚える学習用Webアプリ。

- 声調トレーナー: 発音を聞いて4つの声調のかたちから正解を選ぶ
- 単語カード: ライトナー式の間隔反復(SRS)で語彙を復習
- 発音練習: お手本を聞いて自分の声を録音・聞き比べ

PC(左サイドバー表示)・スマホ(上部タブ表示)どちらのレイアウトにも対応しています。
進捗はブラウザの localStorage に保存されます(サーバー不要)。

## ローカルで動かす

```bash
npm install
npm run dev
```

`http://localhost:5173` が開きます。

## GitHubで管理する

まだリポジトリを作っていない場合、このフォルダで:

```bash
git init
git add .
git commit -m "Initial commit"
```

GitHub上に新しいリポジトリ(例: `koe-katachi`)を作成したら:

```bash
git branch -M main
git remote add origin https://github.com/<あなたのユーザー名>/koe-katachi.git
git push -u origin main
```

## GitHub Pagesで公開する

`vite.config.js` の `base` は、リポジトリ名に合わせてください。
リポジトリ名を `koe-katachi` にする場合はそのままでOKです。
別の名前にする場合は `base: "/別の名前/"` に書き換えてください。
(`<ユーザー名>.github.io` という名前のリポジトリで公開する場合は `base: "/"` にしてください。)

このプロジェクトには GitHub Actions によるデプロイ設定
(`.github/workflows/deploy.yml`)が含まれています。

1. GitHubのリポジトリ画面で **Settings → Pages** を開く
2. "Build and deployment" の **Source** を **GitHub Actions** に設定
3. `main` ブランチに push すると自動でビルド・公開される

数分後、`https://<あなたのユーザー名>.github.io/koe-katachi/` でアクセスできます。

### 手動でデプロイする場合(Actionsを使わない方法)

```bash
npm run deploy
```

(`gh-pages` パッケージが `dist` フォルダを `gh-pages` ブランチにpushします。
その場合はリポジトリ設定の Pages の Source を "Deploy from a branch" → `gh-pages` にしてください。)

## フォルダ構成

```
koe-katachi/
├─ src/
│  ├─ components/
│  │  ├─ ToneGlyph.jsx          声調の輪郭アイコン
│  │  ├─ ToneTrainer.jsx        声調クイズ
│  │  ├─ Flashcards.jsx         単語カード(SRS)
│  │  └─ PronunciationPractice.jsx  発音練習
│  ├─ data.js                   単語データ・共通ヘルパー
│  ├─ App.jsx                   全体レイアウト(PC/スマホ切替)
│  ├─ App.css                   スタイル(レスポンシブ対応)
│  └─ main.jsx
├─ index.html
├─ vite.config.js
└─ package.json
```

## 単語を増やす・編集する

`src/data.js` の `WORDS` 配列に `{ h: 漢字, p: ピンイン, t: 声調(1-4), m: 日本語の意味 }`
の形で追加するだけで、3つの機能すべてに反映されます。
