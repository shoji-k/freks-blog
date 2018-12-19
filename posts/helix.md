---
title: "Helix keyboard"
date: "2018-12-20"
---

[Helix キーボードキット \| 遊舎工房](https://yushakobo.jp/shop/helix-keyboard-kit/)
を買いました

あんまりぴかぴか光るのは好みでないので、Underglow版で、数字キーありの5行モデルを買いました  

キットだけ買えばよさそうに見えますが、軸とキーが必要なので

- ロープロファイルスイッチ 赤軸
- ロープロファイル用無刻印キーキャップ 黒

それぞれ70個ずつ買いました  
(初心者には、これもセットで書いといてほしかったり)  

3極のステレオミニプラグケーブル、microUSBケーブルも付いてるもんだと勘違いしてたのですが、家にあったのでそれを使ってます  

使いだして2日目です

## 買った理由

- ErgoDox EZ を使っていたけれども持ち運びには重すぎて軽いキーボードが欲しかった
- セパレートキーボードはゆずれないポイント
- だれかのツイートで見かけた

## 組み立て

遊舎工房さんのページで紹介されているページを見ながらやりました

- [helix/buildguide\_jp\.md at master · MakotoKurauchi/helix](https://github.com/MakotoKurauchi/helix/blob/master/Doc/buildguide_jp.md)

ただこれだけでは、わかりにくいところがあったので、  
[ジサトラKTU \#51～キーボードは作るもの！KTUのキーボー道 Season 6～ \- YouTube](https://www.youtube.com/watch?v=3MsmDMGuIK0)  
が参考になりました  

工具は  
[キーボード自作、特に Helix キーボードキットの製作に最低必要な工具のメモ](https://gist.github.com/mtei/6957107a676ddfa85bde0ae41f8fa849)  
を見て、はんだごて、こて先、はんだを買いました  
こて台、ピンセットは持ってたのでそれを使い、ハンダ吸い取り線やテスターは失敗したら買いに行こうと思ってました(奇跡的に一発で成功)

はんだづけは  
[理想のはんだ付け \| はんだ付けテクニックを学ぼう！ \| \[HAKKO\]](http://handa-craft.hakko.com/support/good-soldering.html)

盛大に失敗してるブログを見たりしてびびりながらもうまくできました  

## 気をつけたところ

- 基盤の表裏

上面、下面が最初分からなかったです  
はんだづけするのは片面だけでなかったです  

- ダイオードの向き  

アノード、カソードとかを調べて向きを確認しました  
[helix/buildguide\_jp\.md at master · MakotoKurauchi/helix](https://github.com/MakotoKurauchi/helix/blob/master/Doc/buildguide_jp.md)の写真を参考に  

ぼんやりすると、向きが逆になるので集中力がいります  

- はんだづけする場所

これも写真を参考に  
あってるのか何回も確認しました  

- はんだづけの仕方

ダイオードのところは、片方の基盤側にはんだを最初に載せといて、後からダイオードを置いて溶かす、のがきれいにできました  


## はまったところ

- OLEDってなんだっけ、となった

LED液晶ですね

- ダイオードは黒い長いテープみたいなのにたくさん入っている

学校の実験でつかったのをイメージしてたので梱包されてないかと思いました

- qmkの書き込みですぐにdisconnectedになる

RESETボタンを連打するとうまくいくというツイートを見て試すとできました  

- qmkの書き込みは両手とも必要

片手分だけ書き込んで、もう片手が反応しなくてあれ？？となりました

- プレートは本当は透明

シールがついたままはめこもうとしてました..  

- 3極のステレオミニプラグケーブル、microUSBケーブルがついてない

勘違いしてました、家にあったものを使いました

- microUSBを指すのはデフォルトだと左

qmkに設定がありました  
最初右に指して、キーマッピングがめちゃくちゃだ..となりました

- 一番右下のキーだけ動かない

はんだづけを一箇所忘れてました  
はんだづけをやり直して直りました  

## LED

LEDが片手分しか見当たらなかったので、つけませんでした  
(最初からなかったような気も..)  
元からあんまり点灯させそうになかったのでいいかなと  

## qmk

[helix/firmware\_jp\.md at master · MakotoKurauchi/helix](https://github.com/MakotoKurauchi/helix/blob/master/Doc/firmware_jp.md)  
を参考に

キーマッピングはErgodox EZに慣れていたので、寄せました  

自分用ですがメモ  

```
git clone git@github.com:shoji-k/qmk_firmware.git  
cd qmk_firmware
git branch mine
make helix:myhelix
# output: .build/helix_rev2_myhelix.hex
```

キーマッピングは  
$ vim keyboards/helix/rev2/keymaps/myhelix/keymap.c  

[Releases · qmk/qmk\_toolbox](https://github.com/qmk/qmk_toolbox/releases)をダウンロードしてキーボードに書き込みました  

両手とも同じものを書き込みます

## まとめ

大学ぶりのはんだづけがうまくいったのが成功したポイント  
あと、作業前になんども確認しないと間違えそうでした  
かなり細かい作業なので、不器用な人は厳しいそうです  

使い勝手はかなりよいです  
持ち運びやすいし、打ち心地もよいです  

