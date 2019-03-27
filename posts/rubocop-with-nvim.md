---
title: "Rubocopとnvim連携"
date: "2019-03-27"
---

RailsプロジェクトにRubocopを入れたので、コマンドラインでRubocopを使うだけじゃなく、nvimでも使えるようにしました

まずRubocopを動くようにします

開発自体は、Docker内でやっててGemはDocker内に閉じ込めてました  
nvimから呼び出せるよう、システムにインストール

```
gem install rubocop
```

動作確認のため実行

```
rubocop
```

でチェックが走るのを確認しました

nvim のパッケージ管理には [Shougo/dein\.vim: Dark powered Vim/Neovim plugin manager](https://github.com/Shougo/dein.vim) を使っていてさらに
[w0rp/ale: Asynchronous linting/fixing for Vim and Language Server Protocol \(LSP\) integration](https://github.com/w0rp/ale) を使ってたので、これに設定を追加します

```
[[plugins]]
repo = 'w0rp/ale'
hook_add = '''
let g:ale_linters = {
\   'javascript': ['eslint'],
\}
let g:ale_fixers = {
\   'javascript': ['prettier', 'eslint'],
\   'css': ['prettier'],
\   'ruby': ['rubocop'],
\}
'''
```

rubocopの行を足しました  
これでRails案件をnvimで開くと、チェックが走るし、```:ALEFix```するとオートコレクトしてくれました