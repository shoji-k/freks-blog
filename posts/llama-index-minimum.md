---
title: 'LlamaIndexは5行のコードで動かせる'
date: '2024-06-07'
updated: ''
---

[LlamaIndex, Data Framework for LLM Applications](https://www.llamaindex.ai/) を触ってみました

LlamaIndexは、データを簡単に扱えるようにするためのフレームワークです  
おおざっぱにいうと、RAGが簡単に始められます  
初心者はもちろん、上級者も使えるようになっているらしいです  

ドキュメントは  
[LlamaIndex \- LlamaIndex](https://docs.llamaindex.ai/en/latest/)

[Starter Tutorial \(OpenAI\) \- LlamaIndex](https://docs.llamaindex.ai/en/latest/getting_started/starter_example/) のTutorialをやってみます  

UbuntuのPythonが使える環境でやっています  

事前準備でOPENAIのキーをセット

```bash
export OPENAI_API_KEY=XXXXX
```

RAGに使いたいコンテンツを準備、ChatGPTでスティーブジョブズの生い立ちを作ってもらってtxtにしました

```bash
$ tree
.
├── data
│   └── Steve_Jobs_Biography.txt
└── starter.py
```

なディレクトリ構成にしてます

starter.pyを作成

```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

documents = SimpleDirectoryReader("data").load_data()
index = VectorStoreIndex.from_documents(documents)

query_engine = index.as_query_engine()
response = query_engine.query("Who were Steve Jobs' friends?")
print(response)
```

`print(response)` は出力確認なので、RAG実行部分は5行!!

実行

```bash
$ python starter.py 
Steve Jobs' friends were Steve Wozniak, who was his high school friend and co-founder of Apple Computer.
```

渡したtxtから情報を拾ってそうでした

## まとめ

RAGするならLlamaIndexがいいかもしれません  
RAG以外にコンテンツを取り込むものには使えるみたいですF

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3TazIwf" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81Tfw3iSJUL._SY466_.jpg" alt="Pythonプログラミングパーフェクトマスター" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Pythonプログラミングパーフェクトマスター</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
