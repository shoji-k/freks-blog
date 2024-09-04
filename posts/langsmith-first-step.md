---
title: 'LangSmithを使ってみる'
date: '2024-05-01'
updated: ''
---


[LangChainでRAGを試す](/langchain-retriever/) でRAGをつかってみましたが、途中何やってるか見たかったので [LangSmith](https://smith.langchain.com/) を使ってみました  
LangChain + LangSmith の組み合わせでやります  

[Getting started with LangSmith \| 🦜️🛠️ LangSmith](https://docs.smith.langchain.com/) は、`LangChain`を使わないときのものです  
[LangSmith Walkthrough \| 🦜️🔗 LangChain](https://python.langchain.com/docs/langsmith/walkthrough/) が参考になります  

## LangSmithを動かしてみる

[LangSmith](https://smith.langchain.com/) のサイトでアカウントを作ってAPI keyを取得します  

必要な環境変数へセットします  

```bash
export LANGCHAIN_TRACING_V2="true"
export LANGCHAIN_API_KEY = "<さっき取得したAPI key>"
export LANGCHAIN_PROJECT = "<プロジェクト名>"
```

これがLangSmithに必要です
`LANGCHAIN_PROJECT` は省略すると、`default` になります  

LangChainを動かす場合は、これだけでいいです  

試しに  

```python
import os
from langchain_openai import AzureChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_community.callbacks import get_openai_callback

os.environ["AZURE_OPENAI_API_KEY"] = os.getenv("AZURE_OPENAI_API_KEY", "")
os.environ["AZURE_OPENAI_ENDPOINT"] = os.getenv("AZURE_OPENAI_ENDPOINT", "")
os.environ["AZURE_OPENAI_API_VERSION"] = "2024-02-01"
os.environ["AZURE_OPENAI_CHAT_DEPLOYMENT_NAME"] = "gpt-35-turbo"
os.environ["AZURE_OPENAI_CHAT_MODEL_VERSION"] = "0613"

llm = AzureChatOpenAI(
    azure_deployment=os.environ["AZURE_OPENAI_CHAT_DEPLOYMENT_NAME"],
    api_version=os.environ["AZURE_OPENAI_API_VERSION"],
    model_version=os.environ["AZURE_OPENAI_CHAT_MODEL_VERSION"],
)

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a science guy. Response in japanese.",
        ),
        ("user", "{input}"),
    ]
)
output_parser = StrOutputParser()

chain = prompt | llm | output_parser

with get_openai_callback() as cb:
    message = chain.invoke({"input": "Tell me a joke"})
    print(message)
    print(f"Total Cost (USD): ${format(cb.total_cost, '.6f')}")
```

を動かすと、[LangSmith](https://smith.langchain.com/) のサイトで  

![LangSmith debug log](/langsmith-first-step/langsmith.webp)  

をいった感じで何やっているかが確認できます  

LangSmithにログを送りたくなくなったら  

```bash
export LANGCHAIN_TRACING_V2="false"
```

しておくといいです  
RAGを実行させると途中で裏でやってたことが見れるので便利です  

他にもデータセットを保存したり、LLMの結果を検証したりする機能があるようです  

## まとめ

さくっと便利なものが使えていいですね  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3TazIwf" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81Tfw3iSJUL._SY466_.jpg" alt="Pythonプログラミングパーフェクトマスター" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Pythonプログラミングパーフェクトマスター</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
