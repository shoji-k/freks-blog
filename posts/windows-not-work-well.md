---
title: "Windowsの調子が悪いときにすること"
date: "2025-01-20"
updated: ""
---

Windowsの調子が悪いときにすることをまとめてみます

## タスクマネージャーで状態を確認

画面下のメニューバーの空いているところを右クリック > タスク マネージャー

CPU、メモリ、ディスク、GPUをチェックします  
足りなくなっているものがあればその原因のアプリを止めたりします

不必要なスタートアップアプリやサービスがあったら止めます

## ディスク容量の空きを用意する

Windowsが動いているドライブの空き容量がなくなっているとおかしくなりがちです  
容量をチェックして少なければなんとか空けます

[Windows でドライブの空き領域を増やす \- Microsoft サポート](https://support.microsoft.com/ja-jp/windows/windows-%E3%81%A7%E3%83%89%E3%83%A9%E3%82%A4%E3%83%96%E3%81%AE%E7%A9%BA%E3%81%8D%E9%A0%98%E5%9F%9F%E3%82%92%E5%A2%97%E3%82%84%E3%81%99-85529ccb-c365-490d-b548-831022bc9b32)  
をみて対策をしたり  
[DiskInfo](https://forest.watch.impress.co.jp/library/software/diskinfo/)  
といったアプリをつかって容量の大きなファイルを見るといいです

## ディスクの状態をチェック  

ディスクの健康状態をみれるS.M.A.R.T.情報を見たいです

[CrystalDiskInfo](https://crystalmark.info/ja/software/crystaldiskinfo/) のアプリを使うと便利です  
状態が悪いと交換を検討します  

## Windows Update

Windows Updateで不具合のあるものがあたってしまったかもしれません  
調べて情報がないか見てみます  

特になければいったん最新まであげてしまうのも手で、自分はやってしまいます  

## ドライバーアップデート

PCメーカーが出しているドライバーの更新をあてます  
いま、Dellを使っているので、DellのSupport Assistというアプリがインストールされているので起動して、ドライバーを新しくします  

## ディスクの修復

chkdsk のコマンドを実行してディスクのチェックと修復をします  
[Windowsでディスクを修復する](/windows-chkdsk) を参考にしてください

## Windowsの修復

[Windowsの修復をしてみる](/windows-not-work-well) を参考にしてください

## Windows再インストール

ここまでやってだめで、ハードウェアが大丈夫そうならWindowsを再インストールするのも手です  

## 買い替え

最終的には新しいPCに買い替えます  
性能があがったものに買い替えると快適です

## まとめ

普段使うものが調子悪いと困りますね  
あとはシステムログをチェックしたりしてもいいかもしれませんが、あまり役立ったことはないです  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/4jmDXjO" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81QnV2OzIKL._SY385_.jpg" alt="Windowsコマンド環境のすべて" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Windowsコマンド環境のすべて</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
