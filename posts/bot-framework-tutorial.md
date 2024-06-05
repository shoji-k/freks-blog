---
title: 'Bot Framework REST APIでBotと通信してみる'
date: '2024-06-04'
updated: ''
---

Azure AI Bot Serviceを使って最終的にはTeamsで動かすBotを作ろうとしています  

Bot Framework SDKを使うのが公式に推奨されていますが、Bot Framework SDKを動かすサーバーを用意したくはありません  
また、Ruby on RailsからBotへメッセージを送りたくて、RubyのSDKはないので、Bot Framework REST APIを使うことにしました  

[Bot Connector サービスでのボットの作成 \- Bot Service \| Microsoft Learn](https://learn.microsoft.com/ja-jp/azure/bot-service/rest-api/bot-framework-rest-connector-quickstart?view=azure-bot-service-4.0)  
を見るとできそうで、動かしてみます  

## Azure AI Bot Serviceを作成

[Azure portal で Azure Bot リソースを作成する - Bot Service | Microsoft Learn](https://learn.microsoft.com/ja-jp/azure/bot-service/abs-quickstart?view=azure-bot-service-4.0&tabs=userassigned)  
を参考にAzure Botを用意します  

リソースの管理のところで、シングルテナント、マルチテナントを選べますが、いったんシングルテナントにします  
シングルテナントにすると自分の組織だけ使うという意味みたいです(自分の組織のテナントIDと紐づく)  

## REST APIを呼ぶサーバーを準備

Azure Botと通信するサーバーを用意します  

簡易的にRubyのSinatraで作ります  

```bash
bundle init
```

Gemfileに追加します  

```ruby
# frozen_string_literal: true

source "https://rubygems.org"

gem "sinatra"
gem "rackup"
gem "puma"

gem "debug" # debug用
```

コードを用意します  

[Microsoft Teamsで\(Bot frameworkを使わずに\)ボットを作るには](https://zenn.dev/yusukeiwaki/articles/b6ae7bf77a81eb)  
のコードをベースに一部変えてます(大感謝)  

config.ru

```rb
require './app'
run App
```

app.rb

```ruby
require 'net/http'
require 'sinatra/base'

def fetch_access_token
  resp = Net::HTTP.post_form(
    URI("https://login.microsoftonline.com/#{ENV['TENANT_ID']}/oauth2/v2.0/token"),
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

Sinatraを立ち上げます  
CLIENT_IDはMicrosoft App IDとTENANT_IDはアプリ テナント IDで、Azure Botの構成の中にあります  

![bot config](/bot-framework-tutorial/config.webp)

CLIENT_SECRETはパスワードで、Azure Botの構成のMicrosoft App IDのところのパスワードの管理にあります  
最初から1つありますが、値が見えないので新規に作り直します  

![bot secret](/bot-framework-tutorial/secret.webp)  

環境変数に設定してSinatraを立ち上げます  

```bash
CLIENT_ID=a3d1532e-xxxxx CLIENT_SECRET=53H8Q~xxxxx TENANT_ID=2f188d8c-xxxxx bundle exec rackup -p 3000
```

localhost:3000 にアクセスすると It works! と表示されます  

インターネット越しにアクセスできるようにするために、ngrokを使います  

```bash
ngrok http 3000
```

これで`https://8baf-219-122-229-79.ngrok-free.app` といったURLが用意されSinatraにアクセスできるようになります  

これをAzure Botの構成 メッセージング エンドポイントに設定して適用  

これで準備ができました  

## Web チャットでテスト

Azure Bot > Web チャットでテスト  
で動作確認します

Web チャットでテストを開くと、Sinatraのログに以下のようなログが出力されます

```txt
Parameter: {"type"=>"conversationUpdate", "id"=>"7HGlfJ6bId5", "timestamp"=>"2024-06-04T23:43:57.6302602Z", "serviceUrl"=>"https://webchat.botframework.com/", "channelId"=>"webchat", "from"=>{"id"=>"f8d16b2a-433b-40b5-94b8-6b9fc77318a1"}, "conversation"=>{"id"=>"3ChyzXkXScSAe6B7Z25bKG-as"}, "recipient"=>{"id"=>"echobot-dev-xxxxx@GzEeab4YjXQ", "name"=>"echobot-dev-xxxxx"}, "membersAdded"=>[{"id"=>"echobot-dev-xxxxx@GzEeab4YjXQ", "name"=>"echobot-dev-xxxxx"}, {"id"=>"f8d16b2a-433b-40b5-94b8-6b9fc77318a1"}]}
```

WebチャットとSinatraが接続されました  

Webチャットにメッセージを送ると、Sinatraのログに以下のようなログが出力されます  

```txt
Parameter: {"type"=>"message", "id"=>"3ChyzXkXScSAe6B7Z25bKG-as|0000000", "timestamp"=>"2024-06-04T23:44:00.6337105Z", "localTimestamp"=>"2024-06-05T08:44:00.399+09:00", "localTimezone"=>"Asia/Tokyo", "serviceUrl"=>"https://webchat.botframework.com/", "channelId"=>"webchat", "from"=>{"id"=>"f8d16b2a-433b-40b5-94b8-6b9fc77318a1", "name"=>""}, "conversation"=>{"id"=>"3ChyzXkXScSAe6B7Z25bKG-as"}, "recipient"=>{"id"=>"echobot-dev-freks-single-tenant@GzEeab4YjXQ", "name"=>"echobot-dev-freks-single-tenant"}, "textFormat"=>"plain", "locale"=>"ja", "text"=>"aaa", "attachments"=>[], "entities"=>[{"type"=>"ClientCapabilities", "requiresBotState"=>true, "supportsListening"=>true, "supportsTts"=>true}], "channelData"=>{"clientActivityID"=>"nsu5o24cqep"}}
```

Sinatraコードの  

```ruby
puts res.code
puts res.body
```

はデバッグ用でうまくいくと

```txt
200
{
  "id": "3EVDYoZiGWS9qrgSmI5Eko-as|0000001"
}
```

が出力されます  

`reply.to_json` の中身で `from.id` が間違っていると 403 エラーになりました  
なぜ403になるのかが分かるところがなくて試行錯誤しました  

## まとめ

情報がまとまってなくて苦労してます  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3wvSjuC" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/71vy-5PGTWL._SY466_.jpg" alt="Microsoft Copilot for Microsoft 365活用大全" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Microsoft Copilot for Microsoft 365活用大全</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
