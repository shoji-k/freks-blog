---
title: 'Symfony 3.4 の Service Container 周りを調べた'
date: '2019-09-19'
---

EC サイトを作る案件があるので、EC-CUBE4 使うか..と思うのですがドキュメントもあまりなくて分からないので、
Symfony 3.4 を学習しています

特にわからない Service Container 周りをまずまとめます

[Service Container \(Symfony 3\.4 Docs\)](https://symfony.com/doc/3.4/service_container.html) を読めばいいのですが、長いのと関連のリンク先も読まないと理解できなかったで、大変でした

Service ってのは

```
// src/AppBundle/Service/MessageGenerator.php
namespace AppBundle\Service;

class MessageGenerator
{
    public function getHappyMessage()
    {
        $messages = [
            'You did it! You updated the system! Amazing!',
            'That was one of the coolest updates I\'ve seen all day!',
            'Great work! Keep going!',
        ];

        $index = array_rand($messages);

        return $messages[$index];
    }
}
// 引用: https://symfony.com/doc/3.4/service_container.html
```

というもので処理の塊をまとめておくもので、DI ってやつです  
呼び出すときは

```
// src/AppBundle/Controller/ProductController.php
namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;

class ProductController extends Controller
{
    /**
     * @Route("/products")
     */
    public function listAction()
    {
        $logger = $this->container->get('logger');
        $logger->info('Look! I just used a service');

        // ...
    }
}
// 引用: https://symfony.com/doc/3.4/service_container.html
```

とここでは logger サービスを呼び出して使ってます  
この書き方は、Symfony 3.4 のデフォルトでは使わない書き方で

```
use AppBundle\Service\MessageGenerator;

public function newAction(MessageGenerator $messageGenerator)
{
    // thanks to the type-hint, the container will instantiate a
    // new MessageGenerator and pass it to you!
    // ...

    $message = $messageGenerator->getHappyMessage();
    $this->addFlash('success', $message);
    // ...
}
// 引用: https://symfony.com/doc/3.4/service_container.html
```

こういう感じに、function の引数の Type-hint で型を見て自動でクラスを特定して呼べるようになってます

デフォルトの設定というのが

```
# app/config/services.yml
services:
    # default configuration for services in *this* file
    _defaults:
        autowire: true
        autoconfigure: true
        public: false

    # makes classes in src/AppBundle available to be used as services
    AppBundle\:
        resource: '../../src/AppBundle/*'
        # you can exclude directories or files
        # but if a service is unused, it's removed anyway
        exclude: '../../src/AppBundle/{Entity,Repository}'

    # these were imported above, but we want to add some extra config
    AppBundle\Controller\:
        resource: '../../src/AppBundle/Controller'
        # apply some configuration to these services
        public: true
        tags: ['controller.service_arguments']
# 引用: https://symfony.com/doc/3.4/service_container.html
```

こういうので、`_defaults` は全体に効くものになってて  
`autowire: true` と `autoconfigure: true` で ファンクションの引数の Type-hint でクラスが呼べて  
`public: false` で `$logger = $this->container->get('logger');` というのができなくなります

```
AppBundle\:
        resource: '../../src/AppBundle/*'
        # you can exclude directories or files
        # but if a service is unused, it's removed anyway
        exclude: '../../src/AppBundle/{Entity,Repository}'
```

ここで一括ロードしていて、exclude のものを除くクラスを全部 Service として呼び出せるようになります

```
AppBundle\Controller\:
    resource: '../../src/AppBundle/Controller'
    # apply some configuration to these services
    public: true
    tags: ['controller.service_arguments']
```

ここで Controller も Service として呼び出せるようにしていますが、Symfony のコントローラの動きはなんら変わらず利用できます  
`tags: ['controller.service_arguments']` をつけておくと、`function __construct()` 以外のファンクションでも、Type-hint で Service が呼び出せるようです

### \_defaults: bind

`_defaults` の中に `bind` がありますが

```
# app/config/services.yml
services:
    _defaults:
        bind:
            $projectDir: '%kernel.project_dir%'
```

これは全体で使える変数になります  
Controller から呼び出すときに \$projectDir` をコンストラクタの引数に指定するだけで呼べます  
全体で使う Service を指定したりすると、便利そうです

## サービスパラメータ

固定のパラメータも services.yml に登録でき

```
# app/config/services.yml
parameters:
    admin_email: manager@example.com

services:
    AppBundle\Updates\SiteUpdateManager:
        arguments:
            $adminEmail: '%admin_email%'
```

`parameters:` のところに変数を登録でき、`%admin_email%` みたいに `%` で囲んで利用できます  
こうすると

```
class SiteUpdateManager
{
    // ...

    private $adminEmail;

    public function __construct($adminEmail)
    {
        $this->adminEmail = $adminEmail;
    }
}
// 引用: https://symfony.com/doc/3.4/service_container.html
```

といった Service の初期化時にパラメータがとれます

### Service を Interface で呼ぶ

[Defining Services Dependencies Automatically \(Autowiring\) \(Symfony 3\.4 Docs\)](https://symfony.com/doc/3.4/service_container/autowiring.html#working-with-interfaces) に書いてあるのですが

こういうコードで

```
class TwitterClient
{
    public function __construct(TransformerInterface $transformer)
    {
    }
}
```

`TransformerInterface` という Interface を指定すると Symfony 3.4 だと Interface を継承したものが 1 つしかなければそれが呼び出されるようです  
Symfony 4.0 からはできないようで（分かりにくいですよね..）

```
# app/config/services.yml
services:
    AppBundle\Util\Rot13Transformer: ~
    AppBundle\Util\UppercaseTransformer: ~

    AppBundle\Util\TransformerInterface: '@AppBundle\Util\Rot13Transformer'
```

と TransformerInterface がどのクラスを使うか指定してあげます  
`@` がキー(AppBundle\Util\Rot13Transformer) を指定するのに必要です

### Setter Injection

services.yml に call ってなに？というのは  
[Service Method Calls and Setter Injection \(Symfony 3\.4 Docs\)](https://symfony.com/doc/3.4/service_container/calls.html) に書いてあって

```
# app/config/services.yml
services:
    AppBundle\Service\MessageGenerator:
        # ...
        calls:
            - method: setLogger
              arguments:
                  - '@logger'
```

こうすると

```
namespace AppBundle\Service;
use Psr\Log\LoggerInterface;

class MessageGenerator
{
    private $logger;
    public function setLogger(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }
}
```

と、setter function が用意できてそこで Service が取れるものです

## Service Tags

[How to Work with Service Tags \(Symfony 3\.4 Docs\)](https://symfony.com/doc/3.4/service_container/tags.html)

```
# app/config/services.yml
services:
    AppBundle\Twig\AppExtension:
        public: false
        tags: ['twig.extension']
```

の tags はなにかというと、Symfony にサードパーティーのものを知らせるもののようです


