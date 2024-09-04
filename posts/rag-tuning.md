---
title: 'RAGを使う時の調整すること'
date: '2024-05-07'
updated: ''
---

[LangChainでRAGを試す](/langchain-retriever) でRAGを動かしてみました  
うまくいかないときなどRAGで試せることをまとめます  

RAGの流れは  
データロード -> テキスト分割 -> Vector database化 -> プロンプトでLLMに問い合わせ -> 結果を返す

## データロード

読み込みたい文章によってデータローダーを変えます  
これはCSVやHTMLなど文章によって最適なものが選べると思います  

LangChainにはたくさんデータローダーが用意されています  
[Document loaders \| 🦜️🔗 LangChain](https://python.langchain.com/docs/modules/data_connection/document_loaders/)

## テキスト分割

分割する方法がいくつかあります  
再帰的に文字で分割したり、HTMLで分割したりです  
分割するチャンク数など、分割する大きさも指定できます  

LangChainの例です  
[Text Splitters \| 🦜️🔗 LangChain](https://python.langchain.com/docs/modules/data_connection/document_transformers/)

テキスト分割のイメージは  
[ChunkViz](https://chunkviz.up.railway.app/) を見るとわかりやすいです

## Vector database化

OpenAIEmbeddingsなどembedding modelを選びます  
Chroma, FAISS, lancedb などどのVectorDBにするかも影響します  

modelでの差の記事  
[RAG における埋め込みモデルの比較｜alexweberk](https://note.com/alexweberk/n/ncccfdab3f4bb)

## プロンプトでLLMに問い合わせ

使うプロンプトでも結果に影響が出そうです

## まとめ

RAGを使う時に試すことが多いです

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3TazIwf" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81Tfw3iSJUL._SY466_.jpg" alt="Pythonプログラミングパーフェクトマスター" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Pythonプログラミングパーフェクトマスター</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
