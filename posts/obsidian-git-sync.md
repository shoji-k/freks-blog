---
title: 'ObsidianをGitHubで同期してPCとAndroidで使う'
date: '2025-12-28'
updated: ''
---

1年位前にObsidianをPCとAndroidでGoogle Drive同期で使っていたのですが、一度壊れてからなおすのが面倒で使わなくなっていました  
使い捨てのメモはGoogle Keep、残したいメモはCosenseを使っています  

Cosenseがネットワークが貧弱なところだとパフォーマンスが悪いのでObsidianで再度試してみます  

## 今回の構成

以前は、Google Driveでファイルを同期していましたが一度壊れたのもあり、堅そうなGitHubへpull/pushの形でいきます  

## 必要な知識

Git  
GitHub  
Linux terminal  
gh

## PC side

PCでObsidianをダウンロード  
以前使っていたValutが残っていたので持ってきて、GitHub管理にします  

レポジトリを作る
git init して、PCとAndroidで環境差がありそうなので .gitignoreに　`.obsidian` を書いておきます  
git add, git commit, git push  
これでレポジトリの用意ができました

Obsidianを開いて、さっき用意したレポジトリのディレクトリを開きます  

これでObsidianでメモしたら、terminalでgit add, git commit, git pushします  
Obsidian pluginで `Git` を入れてもいいですが後回し  

bashrcに  

```bash
alias gitsync='git pull origin --prune && git add . && git commit -m "$(date +"%Y-%m-%d %H:%M:%S")" && git push origin HEAD'
```

を用意、terminalで `gitsync` でpushされるようにしておきました  

## Android side

Androidでもgitを使えるようにします

### Termuxのインストール

terminalアプリにTermuxをいれます  

Google Play StoreのTermuxには制限があり、実験的なバージョンしか利用できないので以下のいずれかの方法でインストールします  

- F-Droidサイトから直接APKをダウンロード(F-Droidアプリのインストールは不要)
- [GitHub Release](https://github.com/termux/termux-app)からダウンロード

Google Play Store経由でないので警告がでますが自己責任で  

### Termuxの初期設定

Termuxを起動し、以下のコマンドを実行  
git, gh をインストールします

```bash
apt update
apt upgrade
apt install git gh
```

### GitHub認証

GitHub CLIで認証を行います

```bash
gh auth login
```

ブラウザでのログインを求められるため、画面の指示に従って認証を完了します

### ストレージアクセスの設定

Termuxから共有ストレージにアクセスできるようにする。

```bash
termux-setup-storage
```

実行後、`storage`ディレクトリが作成されます  
このディレクトリ内のファイルはAndroidの共有ストレージへのエイリアスとなっていました  

### リポジトリのクローン

Documentsフォルダに移動し、Obsidianで使用するリポジトリをクローンします

```bash
cd storage/documents
git clone https://github.com/your-username/your-repository.git
```

### Obsidianの設定

AndroidでもGoogle Play StoreからObsidianをインストールします  

#### Vaultの選択

Obsidianアプリを起動し、先ほどクローンしたディレクトリをVaultとして選択します  

#### Gitプラグインのインストール

1. Obsidianの設定からコミュニティプラグインを有効化
2. 「Git」プラグインを検索してインストール
3. プラグインを有効化

#### Gitプラグインの設定

プラグイン設定で以下の項目を入力する。

- **Username:** GitHubのユーザー名
- **Personal access token:** Termuxで`gh auth token`を実行して取得したトークンを入力
- **Author name for commit:** コミット時の作成者名
- **Author email for commit:** コミット時のメールアドレス

GitHub情報は自分の使っているもの、使えるものをGitHubでSettingsとかで確認  

### 同期の実行

Obsidian画面右下のハンバーガーメニューから「Open Git source control」を選択
ここからadd、commit、pushの操作が可能  
実行することで変更内容がGitHubに反映されます  

## まとめ

ひとまず設定ができました  
git操作が面倒そうなので工夫していきたいです  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3LlGuP9" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/71cavpnJJEL._SY522_.jpg" alt="Obsidianで“育てる”最強ノート術 —— あらゆる情報をつなげて整理しよう" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Obsidianで“育てる”最強ノート術 —— あらゆる情報をつなげて整理しよう</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
