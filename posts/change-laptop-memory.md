---
title: 'ノートパソコンのメモリを入れ替える'
date: '2023-04-24'
updated: ''
---

Windows 11 のノートパソコン [Inspiron14 5420](https://www.dell.com/ja-jp/shop/%E3%83%87%E3%83%AB%E3%81%AE%E3%83%8E%E3%83%BC%E3%83%88%E3%83%91%E3%82%BD%E3%82%B3%E3%83%B3/inspiron-14%E3%83%8E%E3%83%BC%E3%83%88%E3%83%91%E3%82%BD%E3%82%B3%E3%83%B3/spd/inspiron-14-5420-laptop) のメモリを入れ替えてみました

メモリ 8GBx2 の 16GB で使っていましたが、動作が重くなってしまうことがあるので

[Amazon.co.jp: Team ノート PC 用メモリ SO-DIMM DDR4 3200MHz PC4-25600 16GBx2 枚組](https://www.amazon.co.jp/gp/product/B08X9ZWND2/ref=ppx_yo_dt_b_asin_title_o01_s00) に入れ替えました

これで 32GB になります

[Inspiron 14 5420 サービスマニュアル \| Dell 日本](https://www.dell.com/support/manuals/ja-jp/inspiron-14-5420-laptop/inspiron-14-5420-service-manual/%E3%83%A1%E3%83%A2%E3%83%AA%E3%83%BC-%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB%E3%81%AE%E5%8F%96%E3%82%8A%E5%A4%96%E3%81%97?guid=guid-e6f32511-e34c-465c-a764-e6a24d3bad58&lang=ja-jp) にメモリの外し方があります

静電気が発生しないように気を付けて、メモリを外して入れ替えます

起動してみてメモリが増えたか確認します

Windows メモリ診断、が Windows にはあるので検索窓からなり探して動かします  
再起動してチェックしてくれますが、なかなか時間がかかります

イベントビューアーを開いて Memory Diagnostics-Results を探して結果を見ます

![memory result](/change-laptop-memory/memory.webp)

これで問題なければ完了です
