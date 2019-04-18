---
title: 'Visual Studio Codeの設定'
date: '2019-04-17'
---

[Visual Studio Code \- Code Editing\. Redefined](https://code.visualstudio.com/)  
の Windows10 上で設定まとめです

## Terminal を WSL にする

Ctrl + @ でターミナルが立ち上がりますが、デフォルトだと powershell とかなので、WSL にします  
WSL で Ubuntu 18.04 を入れた状態で、File > Preference > Setting で terminal.external.windowsExec で検索

![wsl terminal path](/vscode/wsl_terminal_path.png)

に、wsl.exe のパスを指定

## WSL 内の Git を使えるようにする

Git for Windows を入れたりせず、WSL 内の Git を使うには

[Releases · andy\-5/wslgit](https://github.com/andy-5/wslgit/releases)

の wslgit.exe をダウンロード

`C:\_Tools\wslgit.exe` においてみました

VScode の設定を `Ctrl + ,` で開いて、`git.path` で検索、無いので追記します

![git path](/vscode/git_path.png)

VSCode を再起動すると Git が使えるようになりました  
ただ、やたらと重いのでターミナルでコマンド打ってます...(2019-04-05 現在)

## shortcut

- Ctrl + p -> Go to file
- Ctrl + Shift + p -> Command palatte
- Shift + Alt + F -> Code format

- Alt + Shift + ↑↓ 行コピー

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
