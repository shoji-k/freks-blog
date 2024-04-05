---
title: 'ChatGPTのプロンプトエンジニアリング'
date: '2024-04-06'
updated: ''
---

Azure Open AI とか ChatGPTとかのプロンプトエンジニアリングをまとめます  

ChatGPTは行間を読まずにテキストの続きを予測する言語モデルなのを念頭に置きます  
また、うまくいかなかったときはうまくいく方法を探るのがポイントです  

## プロンプトエンジニアリング

### 最新のモデルを使う

値段との相談ですが最新が基本的に性能がいいです  
プロンプトエンジニアリングしなくてもいい答えをくれたりします  
うまくいかないときにプロンプトエンジニアリングをします  

### 温度を使用して出力を変化させる

temperatureを変えると出力が変わります  
0に近いと確信度が高いものが出力されます  
正確なものが欲しい時は0、独創的なものが欲しい時は1に近い値を使います

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

### プロンプトキュー

最初のヒントを書いておくと続きで回答してくれます

```txt
# Write a simple python function that
# 1. Ask me for a number in mile
# 2. It converts miles to kilometers

import
```

とするとimportから始まるコードを書いてくれます  

```txt
<とても長い文章>

この文章の3つのポイントは
```

としたりして文章でも使えます  

### Generated knowledge

プロンプトに知識を渡す方法です  
以下は保険会社の情報をプロンプトに渡す例です  

```txt
保険会社: ACME保険
保険商品（月額料金）:
- 自動車保険, 安価, 500ドル
- 自動車保険, 高価, 1100ドル
- 家財保険, 安価, 600ドル
- 家財保険, 高価, 1200ドル
- 生命保険, 安価, 100ドル

以下の予算と要件を考慮した上で、保険を提案してください:
予算: $1000
要件: 自動車保険, 家財保険
```

だとうまくいかなくて

```txt
保険会社: ACME保険
保険商品（月額料金）:
- 種類: 自動車保険, 安価, 費用: 500ドル
- 種類: 自動車保険, 高価, 費用: 1100ドル
- 種類: 家財保険, 安価, 費用: 600ドル
- 種類: 家財保険, 高価, 費用: 1200ドル
- 種類: 生命保険, 安価, 費用: 100ドル

以下の予算と要件を考慮した上で、保険を提案してください:
予算: $1000 選択を以下の種類に限定: 自動車保険, 家財保険
```

とすると改善されるようです

### Least-to-most

大きな問題を小さな問題に分割する手法です  

大きな問題を解くときに

```txt
この問題の解き方を教えてください
```

や

```txt
5つのステップで解いてください
```

とかまず聞いて、元の質問をすると小さく分割して答えてくれます

### Self-refine, critique the results

LLMは嘘をつくことがあるので、結果をレビューさせると改善してくれます  

```txt
フィボナッチ数列を求めるPythonコードを出力してください
```

のあとに

```txt
そのコードの改善点を教えてください
```

とすると

### Maieutic prompting

LLMに質問をして部分ごとに詳しく説明させます  

```txt
パンデミックを緩和するための危機対策を 5 つの段階でどのように作成すればよいか教えてください
```

で出てきた5つを1つずつ聞いてもっともらしいか確認していきます  

### 複数の命令をしない

単一の命令にするとハルシネーションを起こしやすいみたいです  

## まとめ

ファインチューニングでだめならFine tuningを検討するといいみたいです  
GPTの進化もすごいのでプロンプトエンジニアリングも不要になっていくと思います  

参考:  
[Best practices for prompt engineering with the OpenAI API \| OpenAI Help Center](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api)  
[Generative AI for Beginners | Microsoft](https://microsoft.github.io/generative-ai-for-beginners/#/05-advanced-prompts/translations/ja-jp/README?wt.mc_id=academic-105485-yoterada)

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
