---
title: 'ChatGPTのプロンプトエンジニアリング'
date: '2024-04-06'
updated: ''
---

Azure Open AI とか ChatGPTとかのプロンプトエンジニアリングをまとめます  
ChatGPTは行間を読まずにテキストの続きを予測する言語モデルなのを念頭に置きます  

## プロンプトエンジニアリング

### 最新のモデルを使う

値段との相談ですが最新が基本的に性能がいいです  
プロンプトエンジニアリングしなくてもいい答えをくれたりします  
うまくいかないときにプロンプトエンジニアリングをします  

### 指示は """ で囲う

```txt
次の文章を英訳してください

"""
本日は晴天なり
"""
```

しなくても動くものが多いとは思いますが、指示を明確にするために囲っておくといいです  
もしくは `###` でもいいです  

### より明確に指示します

```txt
次の文章を短くまとめてください
```

でなくて

```txt
次の文章を100文字にまとめてください
```

とか具体的なのがいいです

### 出力フォーマットを明確にする

```txt
次の文章から抽出してname, topic, dateを取り出してjsonで出力してください

文章: これは●●が作成した文章で文学について書かれています。2024年4月3日に公開されました。
フォーマット:
{
  "name": <name>,
  "topic": <topic>,
  "date": <date>,
}
```

### Zero Shot プロンプティング

なにも工夫をしないプロンプトです  
まずはこれから始めてだめならプロンプトエンジニアリングをいれてくのでいいです  

### Few shot プロンプティング

いくつか回答例を伝えるとその形式で答えてくれます  

```txt
色を回答してください
Q. りんご
A. 赤
Q. メロン
A. 緑
Q. ばなな
A.
```

### Zero shot chain of thought

段階を追って考えさせると精度があがったりします

```txt
野球1チームの人数とサッカー1チームの人数とラグビー1チームの人数を足すと何人になりますか？
ステップバイステップで考えてください
```

### しないでください、よりしてください

●●しないでください、より〇〇してくださいのいい方に変えたほうがいいです  
または、●●は不要です、がいいようです  

### プログラムを書かせるときは最初のヒントを書いておく

```txt
# Write a simple python function that
# 1. Ask me for a number in mile
# 2. It converts miles to kilometers

import
```

とするとPythonで書いてくれるらしいです  

### 複数の命令をしない

単一の命令にするとハルシネーションを起こしやすいみたいです  

## まとめ

ファインチューニングでだめならFine tuningを検討するといいみたいです  
GPTの進化もすごいのでプロンプトエンジニアリングも不要になっていくと思います  

参考:  
[Best practices for prompt engineering with the OpenAI API \| OpenAI Help Center](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api)

<hr />

PR

AIで変わる世界を知りたい方はこちらの本がいいです  

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3RYfWmk" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/713FFh-R+PL._SY466_.jpg" alt="生成AIで世界はこう変わる" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">生成AIで世界はこう変わる</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
