---
title: 'LangChainで費用を表示する'
date: '2024-04-27'
updated: ''
---

LangChainを使っていてLLMの費用が気になるので表示させてみました

[langchain\_community\.callbacks\.manager\.get\_openai\_callback — 🦜🔗 LangChain 0\.1\.16](https://api.python.langchain.com/en/latest/callbacks/langchain_community.callbacks.manager.get_openai_callback.html) を見つけてこれがよさそうです

langchain_communityモジュールが必要なのでインストールします

```bash
pip install langchain-community
```

以下のコードで費用を表示させてみました

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

実行結果が以下です

```txt
なぜカエルは美しい音色を出せるのか分かりますか？

それは彼らが「クワックスペリメント」をしているからです！
Total Cost (USD): $0.000131
```

これで費用が表示されました  
`model_version` を指定しないと正しい結果にならないので注意です  

## まとめ

従量課金だと費用が気になりますね  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3JQjt2J" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81Tfw3iSJUL._SY466_.jpg" alt="Pythonプログラミングパーフェクトマスター" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Pythonプログラミングパーフェクトマスター</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
