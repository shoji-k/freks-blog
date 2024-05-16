---
title: 'Autogen公式サイトのNotebookを読む'
date: '2024-05-15'
updated: ''
---

Autogenはagentを呼ばれるものを複数用意してLLM同士で会話させたりして、回答精度をあげたり複雑なタスクをこなしたりできるのが便利なところです  

実用例を見ないとつかみにくいので [Notebooks \| AutoGen](https://microsoft.github.io/autogen/docs/notebooks) を読みつつ一言紹介してみます  

## Using RetrieveChat for Retrieve Augmented Code Generation and Question Answering

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_RetrieveChat>

`RetrieveAssistantAgent` と `RetrieveChat` を使って、RAGで情報を取り込んで、コード生成する例と質問応答の例

## AgentOptimizer: An Agentic Way to Train Your LLM Agent

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_agentoptimizer>

論文ベースの実装例  
`AgentOptimizer` を使って過去の会話履歴、function callを改善していく、みたいなこと

いまいち理解できてないです  

## Task Solving with Code Generation, Execution and Debugging

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_auto_feedback_from_code_execution>

Pythonコードを作って実行させていく例  
実行してエラーになったらコードが直されていく  

## Assistants with Azure Cognitive Search and Azure Identity

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_azr_ai_search>

Azure Cognitive Searchをfunction_callに登録して使う例

## Agent Chat with custom model loading

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_custom_model>

custom modelを使う例  
[Open\-Orca/Mistral\-7B\-OpenOrca · Hugging Face](https://huggingface.co/Open-Orca/Mistral-7B-OpenOrca) を使う例がある  

## Task Solving with Provided Tools as Functions (Asynchronous Function Calls)

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_function_call_async>

Function callを使う例  

## Writing a software application using function calls

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_function_call_code_writing>

FastApiのコードを改善する例  
Function callでファイルを参照、変更する方法を渡しておいて既存のコードを改善する  

## Currency Calculator: Task Solving with Provided Tools as Functions

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_function_call_currency_calculator>

通貨を換金するFunctionをFunction callに登録しておいてUSDをEURに変換する例  

## Group Chat

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_groupchat>

[Multi\-agent Conversation Framework \| AutoGen](https://microsoft.github.io/autogen/docs/Use-Cases/agent_chat/) の例  

Coder, Product_manager, Userを用意、最新のgpt-4論文をみつけて、ソフトウェア開発への応用の可能性を答える  
Coderは論文を取得するコードを用意する  

## Group Chat with Retrieval Augmented Generation

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_groupchat_RAG>

Group ChatのRAGあり版  
Boss、Boss_Assistant(RAG担当)、Senior_Python_Engineer(コードを書く)、Product_Manager(プランを考える)、Code_Reviewer(コードレビュー)の例あり  
話して次の話し相手の選択は `round_robin` で行われている  

## Group Chat with Customized Speaker Selection Method

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_groupchat_customized>

Group Chatで次の話し相手をカスタマイズで思い通りにする例

## FSM - User can input speaker transition constraints

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_groupchat_finite_state_machine>

Group Chatで次の話し相手の条件を付ける方法  
図でも出せて分かるようになってる  

## Perform Research with Multi-Agent Group Chat

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_groupchat_research>

Admin(Plannerの話し相手)、Engineer、Scientist、Planner、Executor(コード実行)、Critic(チェックする)を用意した例  
LLMアプリケーションの論文を見つけて表にさせてる  

## StateFlow: Build Workflows through State-Oriented Actions

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_groupchat_stateflow>

## まとめ

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3JQjt2J" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81Tfw3iSJUL._SY466_.jpg" alt="Pythonプログラミングパーフェクトマスター" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Pythonプログラミングパーフェクトマスター</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
