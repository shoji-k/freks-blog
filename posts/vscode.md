---
title: 'Visual Studio Codeの設定'
date: '2019-04-17'
---

[Visual Studio Code \- Code Editing\. Redefined](https://code.visualstudio.com/)  
の Windows10 上で設定まとめです

## Terminal を WSL にする

Ctrl + @ でターミナルが立ち上がりますが、デフォルトだと powershell とかなので、WSL にします  
WSL で Ubuntu 18.04 を入れた状態で、File > Preference > Setting で `terminal.integrated.shell.windows` で検索すると setting.json が開けるのでそこに

```json
"terminal.integrated.shell.windows": "ubuntu1804.exe",
"terminal.integrated.shellArgs.windows": [
    "run",
    "/bin/bash"
]
```

で切り替えられました

## WSL 内の Git を使えるようにする

Git for Windows を入れたりせず、WSL 内の Git を使うには

[Releases · andy\-5/wslgit](https://github.com/andy-5/wslgit/releases)

の wslgit.exe をダウンロード

`C:\_Tools\wslgit.exe` においてみました

VScode の設定を `Ctrl + ,` で開いて、`git.path` で検索、無いので追記します

![git path](/vscode/git_path.png)

VSCode を再起動すると Git が使えるようになりました  
ただ、やたらと重いのでターミナルでコマンド打ってます...(2019-04-05 現在)

## config

```
"editor.renderControlCharacters": true
```

制御文字を表示する

## shortcut

- Ctrl + p -> Go to file
- Ctrl + Shift + p -> Command palatte
- Shift + Alt + F -> Code format

- Alt + Shift + ↑↓ 行コピー
- Ctrl + Shift + k -> 行削除

- Ctrl + .
  [Visual Studio で一番費用対効果の高いショートカット「Ctrl \+ \.」 \- かずきの Blog@hatena](https://blog.okazuki.jp/entry/2019/04/21/223134)

## eslint

eslint をコマンドラインで動くようにしておいて  
拡張を入れます  
[ESLint \- Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Ctrl + shift + p で

- ESlint: Enable すると有効に
- ESlint: Fix all ... すると自動で直します

## prettier

prettier をコマンドラインで動くようにしておいて  
拡張をいれます  
[Prettier \- Code formatter \- Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Ctrl + , で設定開いて prettier を打ち込んで検索して  
Prettier Eslint integration にチェックを入れる

![prettier setting](/vscode/prettier_setting.png)

整形するときは  
Ctrl + Shift + p, Format Document
