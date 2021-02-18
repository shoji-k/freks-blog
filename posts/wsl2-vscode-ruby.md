---
title: 'WSL2 + VSCodeでRubyの開発環境を用意する'
date: '2021-02-19'
---

Windows 10 の WSL2 を使って Visual Studio Code で Ruby の開発ができるようにしてみました

以下、済んでいる状態からはじめました

- WSL2 インストール
- WSL2 内に、Ruby インストール
- VS Code インストール、WSL2 で開発できるように [Remote \- WSL \- Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) を入れてる

VS Code を、CTRL + P 、Remove-WSL で VS Code から WSL2 につないだ状態で立ち上げています

適当な Rails リポジトリでいいですが、[shoji\-k/rails\-sandbox](https://github.com/shoji-k/rails-sandbox)を git pull して確認しました  
`bundle install` はしておきます(このリポジトリだと src ディレクトリ内)  
使う拡張を入れます

[Ruby \- Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=rebornix.Ruby)

これを入れると、Lint、Formatter、Code highlight されたり一通り揃います  
設定は、↑ のドキュメントを参考にします

VS Code の setting.json に設定を書くのですが、  
拡張のネジアイコン > Extension Settings

![vscode ruby extension setting](/wsl2-vscode-ruby/vscode-ruby-extension-setting.png)

Ruby:Format などの、Edit in setting.json をクリックするのがたどり着きやすいです

![vscode ruby extension edit-setting.json](/wsl2-vscode-ruby/vscode-ruby-extension-edit-setting-json.png)

ここではまったのが、↑ のタブのところで WSL のタブを選ばないと、設定が効かないです  
設定は、Rubocop を入れていたので

```js
{
  "ruby.useBundler": true,
  "ruby.useLanguageServer": true,
  "ruby.lint": {
    "rubocop": {
      "useBundler": true
    }
  },
  "ruby.format": "rubocop"
}
```

こうしてみました

これでシンタックスハイライトされるし、Alt + Shift + F でフォーマットもされるようになりました
