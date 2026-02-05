---
title: 'Windows Game barでオンライン会議を録画してNotebookLMで音声要約を作る'
date: '2026-02-05'
updated: ''
---

オンライン会議を録画して、音声要約を作りたかったので試してみました  

Google Meets、Microsoft Teamsとか会議のホストだったら録画、録音、トランスクリプトが取れるものもあるようです  
ホストじゃなくても音声要約をできる方法で試してみました

## 使うツール

- Windows Game bar
- NotebookLM

## Windows Game bar

Windows11に搭載されてる機能です、デフォルトならWindows + Gで立ち上がると思います

1時間くらいの録画で5.4GBくらいになっていました  
音声が欲しいので画質悪くてもいいのですが、Windows設定 > ゲーム > キャプチャ を見ると  
フレームレート 30fpsで一番下、ビデオ品質標準で一番下でこれ以上、軽くできませんでした  

## ffmpeg

NotebookLMに動画をアップロードしてトランスクリプトにしてもらおう、としたのですがファイルサイズが大きすぎてできませんでした  
200MB以内に抑える必要がありました  

動画を分割する方法もありますが、今回は音声だけ抜き出してみます  

```bash
ffmpeg -i meeting.mp4 -vn -acodec libmp3lame meeting.mp3
```

`-vn` 出力ファイルにビデオトラックを含めない  
`-acodec libmp3lame` MP3形式へのエンコーダー指定

これでmp4から音声ファイルmp3にできます  
52MBになりました、これでNoteBookLMにアップロードできます

## NotebookLM

ソースに音声ファイルをアップロードして、内容要約してもらうと音声要約できました

## まとめ

改善、自動化の余地ありますね

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3ASmUog" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/51e-tl7l8OL._SX342_SY445_.jpg" alt="Azure OpenAI ServiceではじめるChatGPT/LLMシステム構築入門" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Azure OpenAI ServiceではじめるChatGPT/LLMシステム構築入門</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
