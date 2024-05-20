---
title: 'Autogen公式サイトのNotebookを読む'
date: '2024-05-19'
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

状態を管理して次の話し相手を決める例  
初回 - 論文取得 - 論文の概要を書く - 終了 という流れで話している

## Group Chat with Coder and Visualization Critic

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_groupchat_vis>

User、Coder、Criticで重さと馬力の関係をグラフ化する例

## Generate Dalle Images With Conversable Agents

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_image_generation_capability>

画像を出力する例  
プロンプト投げる役と画像を生成する役で話す

## Engaging with Multimodal Models: GPT-4V in AutoGen

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_lmm_gpt-4v>

Multimodal Modelsを使って渡した画像を認識して回答する例  
Commander、Coder、Criticsを内包したFigureCreatorを用意してシアトルの気温のCSVをグラフ化する例  

## Runtime Logging with AutoGen

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_logging>

ログを取る例  
SQLiteにたまるのでそれを取り出す、費用を見る  

## Solving Multiple Tasks in a Sequence of Async Chats

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_multi_task_async_chats>

複数のタスクを非同期に処理した後に一つにまとめる例  

## Solving Multiple Tasks in a Sequence of Chats

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_multi_task_chats>

複数のタスクを1つずつつないで実行する例  

## Nested Chats for Tool Use in Conversational Chess

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_nested_chats_chess>

[Nested Chats \| AutoGen](https://microsoft.github.io/autogen/docs/tutorial/conversation-patterns/#nested-chats) の例

## Solving Complex Tasks with A Sequence of Nested Chats

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_nested_sequential_chats>

連続したタスクをNested Chatsで解決する例  

## Solving Complex Tasks with Nested Chats

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_nestedchat>

複雑なタスクをNested Chatsで解決する例  

## OptiGuide with Nested Chats in AutoGen

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_nestedchat_optiguide>

[microsoft/OptiGuide: Large Language Models for Supply Chain Optimization](https://github.com/microsoft/OptiGuide) とNested Chatsを使う例  

## Chat with OpenAI Assistant using function call in AutoGen: OSS Insights for Advanced GitHub Data Analysis

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_oai_assistant_function_call>

Function callsを使ってGitHub Insightsを取得する例  
GPTAssistantAgent というOpenAI Assistant APIを使うAgentを使っている  

OpenAI Assistant APIを利用して会話能力を提供する実験的なエージェントクラス
ConversableAgentとは異なり、状態管理にOpenAI Assistantを使用する  
会話の状態やコンテキストをOpenAI Assistant APIを通じて管理し、より高度な会話機能を提供することができる、らしい

Assistants APIはCode Interpreter, Retrieval, Function callingができる  

## Auto Generated Agent Chat: Group Chat with GPTAssistantAgent

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_oai_assistant_groupchat>

GPTAssistantAgentを使ったGroup Chatの例  
GPTAssistantAgentというOpenAI Assistant APIを使うAgentを使っている  

## Auto Generated Agent Chat: GPTAssistant with Code Interpreter

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_oai_code_interpreter>

GPTAssistantAgentとCode Interpreterを使う例  

## Using RetrieveChat Powered by PGVector for Retrieve Augmented Code Generation and Question Answering

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_pgvector_RetrieveChat>

PostgreSQLのPGVectorを使ったRAGを実装する例  

## Using RetrieveChat with Qdrant for Retrieve Augmented Code Generation and Question Answering

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_qdrant_RetrieveChat>

Vector database serviceの[qdrant](https://www.bing.com/search?q=qdrant&qs=UT&pq=qdrant&sc=10-6&cvid=22F25FDA398E400E94B2CECE44F1C895&FORM=QBRE&sp=1&lq=0)を使ったRAGを実装する例

## SocietyOfMindAgent

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_society_of_mind>  

GroupChatを1つのAgentとしてSocietyOfMindAgentにまとめ、SocietyOfMindAgentが外と会話する例  

## Chatting with a teachable agent

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_teachability>

AgentにTeachabilityを付加できる  
Teachabilityは長期記憶を持てチャットが終了しても記憶を保持できる

## Auto Generated Agent Chat: Teaching

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_teaching>

タスクを次々と実行していく例  
clear_history=Falseを使うことで会話履歴を保持していく  

## Preprocessing Chat History with TransformMessages

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_transform_messages>

TransformMessages を使って ConversableAgent に長いセンシティブなデータを保持させる例

## Translating Video audio using Whisper and GPT-3.5-turbo

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_video_transcript_translate_with_whisper>

動画のセリフを取り出して翻訳する例  

## Web Scraping using Apify Tools

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_webscraping_with_apify>

[Apify: Full\-stack web scraping and data extraction platform](https://apify.com/) を使ってウェブスクレイピングをする例  

## Websockets: Streaming input and output using websockets

<https://microsoft.github.io/autogen/docs/notebooks/agentchat_websockets>

ストリーミング入出力をする例  

## Solving Multiple Tasks in a Sequence of Chats with Different Conversable Agent Pairs

<https://microsoft.github.io/autogen/docs/notebooks/agentchats_sequential_chats>

複数のエージェントを使ってそれぞれのタスクを解決する例

## From Dad Jokes To Sad Jokes: Function Calling with GPTAssistantAgent

<https://microsoft.github.io/autogen/docs/notebooks/gpt_assistant_agent_function_call>

GPTAssistantAgentにtoolsとFunction callを使う例  
<https://icanhazdadjoke.com/> のAPIを使ってジョークを取得して、悲しいジョークに変換して、ファイルに保存  

## まとめ

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3JQjt2J" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81Tfw3iSJUL._SY466_.jpg" alt="Pythonプログラミングパーフェクトマスター" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Pythonプログラミングパーフェクトマスター</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
