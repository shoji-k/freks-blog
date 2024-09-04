---
title: 'ChromaDBの中身を見る'
date: '2024-05-21'
updated: ''
---

生成AIでベクトルデータベースを使うようになったので中身を見てみました

[Retrieval Augmentation \| AutoGen](https://microsoft.github.io/autogen/docs/topics/retrieval_augmentation/)  
のコードでChromaDBを使っているので、この例を使います

保存先のディレクトリとcollection_nameが分かればChromaDBの中身を雑に確認するには  

```python
import chromadb

client = chromadb.PersistentClient(path="./tmp/db")

collection = client.get_collection(name="autogen-docs")
print(collection.count())
print(collection.peek())
```

これで中身が見れます

空だと

```bash
0
{'ids': [], 'embeddings': [], 'metadatas': [], 'documents': [], 'uris': None, 'data': None}
```

といったアウトプットになるはずです

## まとめ

生成AIでVector databaseを使う時代になってきますね  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3TazIwf" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81Tfw3iSJUL._SY466_.jpg" alt="Pythonプログラミングパーフェクトマスター" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Pythonプログラミングパーフェクトマスター</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
