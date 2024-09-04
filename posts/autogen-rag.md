---
title: 'AutogenでRAGを動かしてみた'
date: '2024-05-10'
updated: ''
---

AutogenでRAGをAzure OpenAIを使って動かしてみました  
本来はagent複数を会話させるのが特徴のAutogenですが、今回はRAGだけにしてみました

参考サイト: [Retrieval\-Augmented Generation \(RAG\) Applications with AutoGen \| AutoGen](https://microsoft.github.io/autogen/blog/2023/10/18/RetrieveChat/)

環境変数に `AZURE_OPENAI_API_KEY` と `AZURE_OPENAI_ENDPOINT` を設定しておきます  

必要なPythonモジュールをインストールします  

```bash
pip install "pyautogen[retrievechat]"
```

結構時間がかかりました  
コードを動かします  

```bash
import os
import autogen
from autogen.agentchat.contrib.retrieve_assistant_agent import (
    RetrieveAssistantAgent,
)
from autogen.agentchat.contrib.retrieve_user_proxy_agent import (
    RetrieveUserProxyAgent,
)

llm_config = {
    "config_list": [
        {
            "model": "gpt-4",
            "api_type": "azure",
            "api_key": os.environ["AZURE_OPENAI_API_KEY"],
            "base_url": os.environ["AZURE_OPENAI_ENDPOINT"],
            "api_version": "2024-02-15-preview",
        }
    ]
}

assistant = RetrieveAssistantAgent(
    name="assistant",
    system_message="You are a helpful assistant.",
    llm_config=llm_config,
)

ragproxyagent = RetrieveUserProxyAgent(
    name="ragproxyagent",
    retrieve_config={
        "task": "qa",
        "docs_path": "https://raw.githubusercontent.com/microsoft/autogen/main/README.md",
    },
)

assistant.reset()
result = ragproxyagent.initiate_chat(
    assistant,
    message=ragproxyagent.message_generator,
    problem="What is autogen?",
)

print(result.cost)
```

結果が

```bash
/home/vscode/.cache/pypoetry/virtualenvs/app-W52G_EZ--py3.12/lib/python3.12/site-packages/huggingface_hub/file_download.py:1132: FutureWarning: `resume_download` is deprecated and will be removed in version 1.0.0. Downloads always resume when possible. If you want to force a new download, use `force_download=True`.
  warnings.warn(
/home/vscode/.cache/pypoetry/virtualenvs/app-W52G_EZ--py3.12/lib/python3.12/site-packages/huggingface_hub/file_download.py:1132: FutureWarning: `resume_download` is deprecated and will be removed in version 1.0.0. Downloads always resume when possible. If you want to force a new download, use `force_download=True`.
  warnings.warn(
Trying to create collection.
2024-05-10 06:05:03,936 - autogen.agentchat.contrib.retrieve_user_proxy_agent - INFO - Found 1 chunks.
2024-05-10 06:05:03,939 - autogen.agentchat.contrib.vectordb.chromadb - INFO - No content embedding is provided. Will use the VectorDB's embedding function to generate the content embedding.
Number of requested results 20 is greater than number of elements in index 1, updating n_results = 1
VectorDB returns doc_ids:  [['f52edf71']]
Adding content of doc f52edf71 to context.
ragproxyagent (to assistant):

You're a retrieve augmented chatbot. You answer user's questions based on your own knowledge and the
context provided by the user.
If you can't answer the question with or without the current context, you should reply exactly `UPDATE CONTEXT`.
You must give as short an answer as possible.

User's question is: What is autogen?

Context is: <ここにREADME.mdのテキストがすべて貼られる>

--------------------------------------------------------------------------------
assistant (to ragproxyagent):

AutoGen is a framework for developing LLM applications using multi-agent conversations.

--------------------------------------------------------------------------------
Provide feedback to assistant. Press enter to skip and use auto-reply, or type 'exit' to end the conversation: exit
{'usage_including_cached_inference': {'total_cost': 0.15131999999999998, 'gpt-4': {'cost': 0.15131999999999998, 'prompt_tokens': 5014, 'completion_tokens': 15, 'total_tokens': 5029}}, 'usage_excluding_cached_inference': {'total_cost': 0.15131999999999998, 'gpt-4': {'cost': 0.15131999999999998, 'prompt_tokens': 5014, 'completion_tokens': 15, 'total_tokens': 5029}}}

```

実際は `Context is: <ここにREADME.mdのテキストがすべて張られる>` にREADME.mdのテキストがすべて貼られるので長いです  

最後に `print(result.cost)` しおいたのでコストが表示されます  
README.mdをまるごとプロンプトに埋め込むので、トークン数が5029で、費用が$0.15131999999999998もかかってしまってますね

## まとめ

RAGが楽に書ける気もします  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3TazIwf" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81Tfw3iSJUL._SY466_.jpg" alt="Pythonプログラミングパーフェクトマスター" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Pythonプログラミングパーフェクトマスター</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
