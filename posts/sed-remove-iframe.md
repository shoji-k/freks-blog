---
title: 'テキストファイルからiframeタグを一気に削除する'
date: '2020-03-14'
---

テキストファイルから `<iframe>something</iframe>` をすべて消し去りたいのでやってみました  
Linuxコマンドつかってやります  

始める前に元に戻せるようにしておきましょう  
バックアップとってもいいですが、Git管理させました  

正規表現で抽出したいので、https://regex101.com/ とか使って正規表現確かめます  
`<iframe.*<\/iframe>`でよさそう

まずはsedコマンド使って、1ファイル試してみます

```bash
sed -e 's/<iframe.*<\/iframe>//g' ./something.md
```

これで変更後が出力されるので正しいか確認してOKだったら`-i`つけるとファイルを上書きします  

```bash
sed -i -e 's/<iframe.*<\/iframe>//g' ./something.md
```

複数ファイル一気に適用します

```bash
find . -name "*.md" | xargs sed -i -e 's/<iframe.*<\/iframe>//g'
```

これで一気に削ることができました