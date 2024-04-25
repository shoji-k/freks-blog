---
title: 'LangChain first step'
date: '2024-04-24'
updated: ''
---

LangChainのチュートリアルをAzure OpenAI Serviceのモデルを使ってやってみました  
[LangChainでAzure OpenAI Serviceのモデルを使う](/langchain-openai-base) の続きです  

チュートリアルは [Quickstart \| 🦜️🔗 LangChain](https://python.langchain.com/docs/get_started/quickstart/)  

```python
import os
from langchain_openai import AzureChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

os.environ["AZURE_OPENAI_API_KEY"] = os.getenv("AZURE_OPENAI_API_KEY", "")
os.environ["AZURE_OPENAI_ENDPOINT"] = os.getenv("AZURE_OPENAI_ENDPOINT", "")
os.environ["AZURE_OPENAI_API_VERSION"] = "2024-02-01"
os.environ["AZURE_OPENAI_CHAT_DEPLOYMENT_NAME"] = "gpt-35-turbo" # 自分で決めたAzure OpenAI Serviceのモデルのデプロイ名

# model用意
llm = AzureChatOpenAI(
    azure_deployment=os.environ["AZURE_OPENAI_CHAT_DEPLOYMENT_NAME"],
    api_version=os.environ["AZURE_OPENAI_API_VERSION"],
)

# プロンプト作成
prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a science guy. Response in japanese.",
        ),
        ("user", "{input}"),
    ]
)

# 出力パーサー
output_parser = StrOutputParser()

chain = prompt | llm | output_parser
message = chain.invoke({"input": "Tell me a joke"})

print(message)
# output:
# なぜカンガルーはジムに行かないのですか？　
# なぜなら、ジムにはボクササイズがあるからです！
```

使うモデル用意、プロンプト用意、出力パーサー用意、でinput渡すと返答が返ってきます  

## まとめ

LangChainを使うベースができました  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3JQjt2J" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81Tfw3iSJUL._SY466_.jpg" alt="Pythonプログラミングパーフェクトマスター" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Pythonプログラミングパーフェクトマスター</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
