---
title: 'Azure AI Serviceで使えるLLMモデル'
date: '2024-04-03'
updated: ''
---

Azure Open AI Studioで色々試していて、最新のGPT-4を使いたいなと思ったときに  

```txt
使用可能なクォータがありません
別のバージョンやデプロイの種類を選択するか、次で他のデプロイのリソースを解放します
```

とかエラーが出ることがあります  

![Azure deploy model](/azure-support-llm-model/deploy-model.webp)

クォータを超えてるとかもありますが、そもそも使っているリージョンで使えないものを選んでいるかもしれません  
公式ドキュメントをチェックします

[GPT-4 および GPT-4 Turbo プレビュー モデルの可用性](https://learn.microsoft.com/ja-jp/azure/ai-services/openai/concepts/models#gpt-4-and-gpt-4-turbo-preview-model-availability)  

![Azure model region](/azure-support-llm-model/model-region.webp)

今回は、`eastus2` で `gpt-4、 0125-Preview` を使おうとしたからだめでした  

エラーメッセージを分かりやすくしてくれるといいですね  

PR

AzureでAI案件始めました  
この本が分かりやすいです  

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3ASmUog" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/51e-tl7l8OL._SX342_SY445_.jpg" alt="Azure OpenAI ServiceではじめるChatGPT/LLMシステム構築入門" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Azure OpenAI ServiceではじめるChatGPT/LLMシステム構築入門</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
