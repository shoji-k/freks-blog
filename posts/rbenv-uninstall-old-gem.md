---
title: 'rbenv > 古いバージョンのrubyで入れたgemを消す'
date: '2023-01-30'
updated: ''
---

### 前置き

Shopify cli v2 が ruby 製で、v3 が node 製になったようで  
https://shopify.dev/apps/tools/cli/migrate

v2 を残したまま 新しい Shopify cli v3 を入れたのですが、前に入れた ruby gem の shopify コマンドが先に動いてしまいました

### 本編

rbenv で ruby を入れている場合の、古い ruby で入れた shopify gem を消してみました

今は

```
$ ruby -v
ruby 3.1.2p20 (2022-04-12 revision 4491bb740a) [x86_64-linux]
$ rbenv versions
  2.6.5
  2.6.6
  2.7.0
  2.7.1
  2.7.4
* 3.1.2 (set by /home/user/.rbenv/version)
```

で、

```
$ shopify
rbenv: shopify: command not found

The `shopify' command exists in these Ruby versions:
  2.7.0
  2.7.4
```

と ruby 2.7.0 と ruby 2.7.4 で入れた shopify の gem が入っています

ruby バージョンを切り替えて削除します  
gem 名は `shopify-cli` を指定して消していきます

```
$ rbenv global 2.7.0
$ gem uninstall shopify-cli
$ rbenv global 2.7.4
$ gem uninstall shopify-cli
Select gem to uninstall:
 1. shopify-cli-2.20.0
 2. shopify-cli-2.20.1
 3. shopify-cli-2.22.0
 4. shopify-cli-2.23.0
 5. All versions
> 5
Successfully uninstalled shopify-cli-2.20.0
Successfully uninstalled shopify-cli-2.20.1
Successfully uninstalled shopify-cli-2.22.0
Remove executables:
        shopify

in addition to the gem? [Yn]  Y
Removing shopify
Successfully uninstalled shopify-cli-2.23.0
```

ruby 2.7.4 は複数バージョン入ってたみたいで全部消しました

これだと rbenv に shopify-cli の登録が残ったままなのでリセットします

```bash
$ rbenv rehash
```

これで node でいれた shopify-cil が認識されるようになりました
