---
title: 'Bot Framework REST APIでBotと通信してみる(マルチテナント)'
date: '2024-06-05'
updated: ''
---

[Bot Framework REST APIでBotと通信してみる](/bot-framework-tutorial) でシングルテナントでAzure Botを動かしました  
マルチテナントで動かしてみます

## Azure AI Bot Serviceを作成

元の記事と同じくAzure Botを作ります

[Azure portal で Azure Bot リソースを作成する - Bot Service | Microsoft Learn](https://learn.microsoft.com/ja-jp/azure/bot-service/abs-quickstart?view=azure-bot-service-4.0&tabs=userassigned)  
を参考にAzure Botを用意  

リソースの管理のところで、シングルテナント、マルチテナントを選べますが、いったんマルチテナントにします  

## REST APIを呼ぶサーバーを準備

元の記事と同じですが、Sinatraのコードをマルチテナントで動かすように変更します  

app.rb

```ruby
require 'net/http'
require 'sinatra/base'

def fetch_access_token
  resp = Net::HTTP.post_form(
    URI("https://login.microsoftonline.com/botframework.com/oauth2/v2.0/token"),
    {
      'grant_type' => 'client_credentials',
      'client_id' => ENV['CLIENT_ID'],
      'client_secret' => ENV['CLIENT_SECRET'],
      'scope' => 'https://api.botframework.com/.default',
    }
  )
  JSON.parse(resp.body)['access_token']
end

class App < Sinatra::Base
  get '/' do
    'It works!'
  end

  post '/webhook' do
    json_body = JSON.parse(request.body.read)
    puts "Parameter: #{json_body}"

    if json_body['type'] == 'message'
      Thread.new(json_body) do |params|
        service_url = params['serviceUrl']
        conversation_id = params['conversation']['id']
        access_token = fetch_access_token

        reply = {
          "type": "message",
          "from": {
            "id": "echobot-dev-xxxxx", # BotのID、Azure Bot > ボットプロファイル
            "name": "test bot"
          },
          "text": "Reply for #{params['text']}",
        }
        res = Net::HTTP.post(
          URI("#{service_url}v3/conversations/#{conversation_id}/activities"),
          reply.to_json,
          {
            'Content-Type' => 'application/json',
            'Authorization' => "Bearer #{access_token}"
          }
        )
        puts res.code
        puts res.body
      end
    end

    status 200
    content_type :json
    { status: 200 }.to_json
  end
end
```

`fetch_access_token` のエンドポイントがマルチテナント用になってます  

[Bot Connector API を使用した承認要求 \- Bot Service \| Microsoft Learn](https://learn.microsoft.com/ja-jp/azure/bot-service/rest-api/bot-framework-rest- connector-authentication?view=azure-bot-service-4.0&tabs=multitenant#bot-to-connector)  
に情報があります

Sinatraを立ち上げます  

今回はマルチテナントなので、TENANT_IDは不要  

CLIENT_IDは(Microsoft App ID)とCLIENT_SECRET(パスワードの値)を環境変数に設定してSinatraを立ち上げます  

```bash
CLIENT_ID=a3d1532e-xxxxx CLIENT_SECRET=53H8Q~xxxxx bundle exec rackup -p 3000
```

あとは元記事と同じです

## まとめ

やりたいことへの道のりが長いです

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3wvSjuC" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/71vy-5PGTWL._SY466_.jpg" alt="Microsoft Copilot for Microsoft 365活用大全" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Microsoft Copilot for Microsoft 365活用大全</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
