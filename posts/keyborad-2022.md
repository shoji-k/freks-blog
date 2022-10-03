---
title: '自作キーボードを再設定した'
date: '2022-10-03'
updated: ''
---

肩こり再発し使ってなかった自作キーボードを再度使い始めました  
組み立ててはんだ付けする自作キーボードです  
(ボードから自作するタイプでなく)

自宅用 -> [Erogdox EZ](/ergodox_ez)  
外出先用 -> [Helix](/helix)

キーマップを忘れてるのとキーマップ改善したいなと思ったので設定し直しました

### qmk

以前は、GitHub でリポジトリを clone して改造してました  
[GitHub - my ergodox_ez keymap](https://github.com/shoji-k/qmk_firmware_prev/tree/mine/keyboards/ergodox_ez/keymaps/myergodox)  
[GitHub - my helix keymap](https://github.com/shoji-k/qmk_firmware_prev/tree/mine/keyboards/helix/rev2/keymaps/myhelix)

今回はやり直すので [QMK Firmware](https://docs.qmk.fm/) の最新ドキュメントのチュートリアルにしたがいました

WSL Ubuntu 22.04 on Windows11 で手順どおり

```bash
$ python3 -m pip install --user qmk
$ qmk setup
```

setupコマンドに何も渡さないと `~/qmk_firmware` に用意されました  
PATH 通します  

```bash
echo 'PATH="$HOME/.local/bin:$PATH"' >> $HOME/.bashrc && source $HOME/.bashrc
```

build できるか試してみます  
keyboard 名は

```bash
qmk list-keyboards | grep helix
```

で調べられるので、自分のは

```bash
qmk compile -kb helix/rev2 -km default
```

自分のキーマップを作ります

```
qmk new-keymap -kb helix/rev2
```

`shojik_helix` っていう名前にしました

あとは、コードを変えてマッピングします

### keymap

日本語配列になれてるので英字配列とはキーのマッピングコードが違います  
以前、調べて作ったコードを持ってきました

[以前作ったマクロコード](https://github.com/shoji-k/qmk-firmware/blob/16051d34420d74cd68b97843da2d44004a52e804/keyboards/helix/rev2/keymaps/shojik_helix/keymap.c#L52)

あとは、マッピングを考えます

Erogdox EZ と Helix で同じような配列を考えました  
未割り当てキーがたくさんありますが、今後割り当てて行こうと思ってます

[キーマップ](https://docs.google.com/spreadsheets/d/1SQ5Eoz0wOlDmhriQ5X9rC6dr2NnP_Kcb5YfU2oK5tTU/edit?usp=sharing)

これをコードに書いて、build

```bash
qmk compile -kb helix/rev2 -km shojik_helix
```

エラーが出ずに成功すればキーボードのチップに入れます  
buildしたファイルは `qmk_firmware/.build` にできます  

### install

自作キーボードを PC に USB でつなぎます

[QMK Toolbox](https://github.com/qmk/qmk_toolbox/releases)  
をインストール

立ち上げて build した hex ファイルを開いて Auto Flash にチェック  
自作キーボード側のリセットスイッチを押すとインストールされました

Helix の場合は、左右両方のチップにインストールする必要があります  
(今回も忘れてた..)
