---
title: 'LangChain用にFAISSでCSVをベクター化する'
date: '2024-04-28'
updated: ''
---

LangChainでCSVをベクター化してみました  
RAGで使う準備です  

Vector化するのに [Faiss \| 🦜️🔗 LangChain](https://python.langchain.com/docs/integrations/vectorstores/faiss/) を使いました  
FaissはFacebook AI Similarity Searchだそうです

```python
from langchain_community.document_loaders.csv_loader import CSVLoader
from langchain_openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores.faiss import FAISS

FAISS_DB_PATH = "./faiss_db"

loader = CSVLoader(file_path="./sample.csv")
embeddings = OpenAIEmbeddings()
docs = loader.load()

text_splitter = RecursiveCharacterTextSplitter()
documents = text_splitter.split_documents(docs)
vector = FAISS.from_documents(documents, embeddings)

vector.save_local(FAISS_DB_PATH)

retriever = vector.as_retriever()

# 試しに"IoT"で検索してみる
query = "IoT"
context_docs = retriever.get_relevant_documents(query)
print(f"len={len(context_docs)}")

first = context_docs[0]
print(f"metadata={first.metadata}")
print(first.page_content)
```

これでデータが `./faiss_db` ディレクトリに保存されます  

取り出すときは  

```python
vector = FAISS.load_local(
    FAISS_DB_PATH, embeddings, allow_dangerous_deserialization=True
)
```

で取り出せます  

`allow_dangerous_deserialization=True` がないと  

```text
ValueError: The de-serialization relies loading a pickle file. Pickle files can be modified to deliver a malicious payload that results in execution of arbitrary code on your machine.You will need to set `allow_dangerous_deserialization` to `True` to enable deserialization. If you do this, make sure that you trust the source of the data. For example, if you are loading a file that you created, and no that no one else has modified the file, then this is safe to do. Do not set this to `True` if you are loading a file from an untrusted source (e.g., some random site on the internet.).
```

の警告出ます  
警告通りの危険性は理解して使ってください  

## まとめ

RAGを使いこなすにも準備が色々いりますね

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3TazIwf" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81Tfw3iSJUL._SY466_.jpg" alt="Pythonプログラミングパーフェクトマスター" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Pythonプログラミングパーフェクトマスター</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
