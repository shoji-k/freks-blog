---
title: 'LLMへ渡すメッセージのtoken数を調べる'
date: '2024-04-14'
updated: ''
---
Azure Open AIとかLLMを試すときにコストが気になるのでトークン数を調べてみました

```python
import tiktoken

model = "gpt-35-turbo"
enc = tiktoken.encoding_for_model(model)
tokens = enc.encode("Hello World!")
print(len(tokens))
```

`gpt-35-turbo` で `Hello World!` は `3` トークンでした

[openai\-cookbook/examples/How\_to\_count\_tokens\_with\_tiktoken\.ipynb at main · openai/openai\-cookbook](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_count_tokens_with_tiktoken.ipynb)  に詳しく載っています

PR

AI開発するのに、この本が分かりやすいです  

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/4cHc0QI" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/51e-tl7l8OL._SX342_SY445_.jpg" alt="Azure OpenAI ServiceではじめるChatGPT/LLMシステム構築入門" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Azure OpenAI ServiceではじめるChatGPT/LLMシステム構築入門</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
