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

## まとめ

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3JQjt2J" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81Tfw3iSJUL._SY466_.jpg" alt="Pythonプログラミングパーフェクトマスター" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Pythonプログラミングパーフェクトマスター</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
