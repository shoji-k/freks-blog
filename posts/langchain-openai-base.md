---
title: 'LangChainでAzure OpenAI Serviceのモデルを使う'
date: '2024-04-22'
updated: ''
---

LangChainでAzure OpenAI Serviceのモデルを使おうとしてちょっと手こずったのでメモ

LangChainを触ってみようとして  
[Quickstart | 🦜️🔗 LangChain](https://python.langchain.com/docs/get_started/quickstart/)  
から初めてみて、OpenAI版とかはあるのですが、Azure版は書かれてないです  

[AzureChatOpenAI | 🦜️🔗 LangChain](https://python.langchain.com/docs/integrations/chat/azure_chat_openai/)  
を見てまず、Chatのサンプルを動かしてみました  

```python
import os

os.environ["AZURE_OPENAI_API_KEY"] = "..."
os.environ["AZURE_OPENAI_ENDPOINT"] = "https://<your-endpoint>.openai.azure.com/"
os.environ["AZURE_OPENAI_API_VERSION"] = "2023-06-01-preview"
os.environ["AZURE_OPENAI_CHAT_DEPLOYMENT_NAME"] = "chat"
```

AZURE_OPENAI_API_KEYとAZURE_OPENAI_ENDPOINT: Azure OpenAI の Keys and Endpointで確認  

AZURE_OPENAI_API_VERSION: [Azure OpenAI Service の REST API リファレンス - Azure OpenAI | Microsoft Learn](https://learn.microsoft.com/ja-jp/azure/ai-services/openai/reference#chat-completions) にサポートされているバージョン  

AZURE_OPENAI_CHAT_DEPLOYMENT_NAME: LLMのモデルをデプロイするとき自分が指定したデプロイ名  

```python
from langchain_core.messages import HumanMessage
from langchain_openai import AzureChatOpenAI

model = AzureChatOpenAI(
    azure_deployment=os.environ["AZURE_OPENAI_CHAT_DEPLOYMENT_NAME"],
    api_version=os.environ["AZURE_OPENAI_API_VERSION"],
)
```

ドキュメントでは `openai_api_version` でしたが、`api_version` が正しそうです  

```python
message = HumanMessage(content="Tell me a joke")
print(model.invoke([message]).content)
```

これでLLMの返答が確認できます  

## まとめ

チュートリアルやるかで動かないと時間がとられますね  
公式ドキュメントが古いのか確認してPR送ったりしたいところです  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3TazIwf" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81Tfw3iSJUL._SY466_.jpg" alt="Pythonプログラミングパーフェクトマスター" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Pythonプログラミングパーフェクトマスター</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
