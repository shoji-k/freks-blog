---
title: 'LangChainでRAGを試す'
date: '2024-04-26'
updated: ''
---

LangChainのチュートリアルをAzure OpenAI Serviceのモデルを使ってやっています
今回は、RAGを試すところです
[LangChain first step](/langchain-first-step) の次にやってます  

[Quickstart \| 🦜️🔗 LangChain](https://python.langchain.com/docs/get_started/quickstart/#retrieval-chain) あたりのほぼ写経になりました  

```python
import os
from langchain_openai import AzureChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_community.document_loaders import WebBaseLoader
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.documents import Document
from langchain.chains import create_retrieval_chain

os.environ["AZURE_OPENAI_API_KEY"] = os.getenv("AZURE_OPENAI_API_KEY", "")
os.environ["AZURE_OPENAI_ENDPOINT"] = os.getenv("AZURE_OPENAI_ENDPOINT", "")
os.environ["AZURE_OPENAI_API_VERSION"] = "2024-02-01"
os.environ["AZURE_OPENAI_CHAT_DEPLOYMENT_NAME"] = "gpt-35-turbo"

llm = AzureChatOpenAI(
    azure_deployment=os.environ["AZURE_OPENAI_CHAT_DEPLOYMENT_NAME"],
    api_version=os.environ["AZURE_OPENAI_API_VERSION"],
)

# web siteをロードします
loader = WebBaseLoader("https://docs.smith.langchain.com/user_guide")
docs = loader.load()

# ロードしたテキストを分割
text_splitter = RecursiveCharacterTextSplitter()
documents = text_splitter.split_documents(docs)

# ベクトル化
embeddings = OpenAIEmbeddings() # ドキュメント埋め込み用のモデル
vector = FAISS.from_documents(documents, embeddings) 

# プロンプトを作成
prompt = ChatPromptTemplate.from_template(
    """Answer the following question based only on the provided context:

<context>
{context}
</context>

Question: {input}"""
)

# llm modelとプロンプトをchainにします
document_chain = create_stuff_documents_chain(llm, prompt)

# vectorデータベースをretrieverにします
retriever = vector.as_retriever()
# retrieverとdocument_chainをchainにします、これでpromptのcontext埋めてくれるようです
retrieval_chain = create_retrieval_chain(retriever, document_chain)

# 実行
response = retrieval_chain.invoke(
    {"input": "how can langsmith help with testing?"}
)
print(response["answer"])
```

実行結果が以下になりました

```text
LangSmith can help with testing by providing the following features:

1. Prototyping: LangSmith supports quick experimentation between prompts, model types, and retrieval strategies, allowing developers to rapidly understand and test how the model is performing.

2. Debugging: LangSmith enables developers to enable tracing, which provides clear visibility and debugging information at each step of the application sequence. This helps identify and root-cause any issues that may arise during testing.

3. Initial Test Set: Developers can create datasets containing inputs and reference outputs to run tests on their LLM applications. These test cases can be uploaded in bulk, created on the fly, or exported from application traces. LangSmith also supports custom evaluations to score test results.

4. Comparison View: LangSmith offers a user-friendly comparison view for test runs, allowing developers to track and diagnose regressions in test scores across multiple revisions of their applications. This helps evaluate the performance of different configurations side-by-side.

5. Playground: LangSmith provides a playground environment for rapid iteration and experimentation. Developers can test different prompts and models, and every playground run is logged in the system, which can be used to create test cases or compare with other runs.

6. Beta Testing: LangSmith facilitates beta testing by allowing developers to collect data on how their LLM applications are performing in real-world scenarios. This phase involves capturing user feedback and annotating runs to understand the strengths and weaknesses of the application.

7. Production Monitoring: LangSmith offers monitoring charts to track key metrics over time in production. It provides a high-level overview of application performance with respect to latency, cost, and feedback scores. Online evaluations and automations allow for real-time processing and scoring of production traces.

8. A/B Testing: LangSmith supports A/B testing by allowing users to mark different versions of their applications with identifiers and view their performance side-by-side within each chart. This helps compare changes in prompts, models, or retrieval strategies.

9. Automations: LangSmith's automations feature enables users to perform actions on traces in near real-time. This can include automatically scoring traces, sending them to annotation queues, or adding them to datasets. Automations are particularly useful for processing traces at production scale.

Overall, LangSmith provides a comprehensive set of tools and functionalities to aid in testing LLM applications at various stages of development, from prototyping to production monitoring.
```

ドキュメントを見ての回答になってそうです

## まとめ

これがRAGっていうやつですね

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3TazIwf" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81Tfw3iSJUL._SY466_.jpg" alt="Pythonプログラミングパーフェクトマスター" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Pythonプログラミングパーフェクトマスター</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
