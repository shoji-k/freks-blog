---
title: 'EC-CUBE 4 でお問い合わせプラグインを作ってみた'
date: '2019-10-21'
---

EC-CUBE 4.0.3 でオリジナルの項目を用意した見積もりお問い合わせプラグインを作ってみます  
EC-CUBE 4.0.3 インストール済みの環境から始めます

プラグインの雛形を作ってくれるコマンドがあるので叩きます

```
$ bin/console eccube:plugin:generate

EC-CUBE Plugin Generator Interactive Wizard
===========================================

 name [EC-CUBE Sample Plugin]:
 > Contact Form

 code [Sample]:
 > ContactForm

 ver [1.0.0]:
 >
```

こんなディレクトリとファイルが作成されます

```
app/Plugin/ContactForm
├── Controller
│   └── Admin
│       └── ConfigController.php
├── Entity
│   └── Config.php
├── Event.php
├── Form
│   ├── Extension
│   └── Type
│       └── Admin
│           └── ConfigType.php
├── Nav.php
├── Repository
│   └── ConfigRepository.php
├── Resource
│   ├── doctrine
│   ├── locale
│   │   ├── messages.ja.yaml
│   │   └── validators.ja.yaml
│   └── template
│       └── admin
│           └── config.twig
├── TwigBlock.php
└── composer.json
```

(トップに PluginManager.php があっていいはずなのですが、ない..)  
参考リンク: http://doc4.ec-cube.net/plugin_spec

色々作成されますが、リファレンスとして眺めたあとは、最小構成にしました  
composer.json だけあればいいらしいです

```
└── composer.json
```

プラグインを有効化します

```
bin/console eccube:plugin:install --code=EstimateForm
bin/console eccube:plugin:enable --code=EstimateForm
```

Controller を用意して、画面を表示させます

\$ vim app/Plugin/EstimateForm/Controller/EstimateFormController.php

```php
<?php

namespace Plugin\EstimateForm\Controller;

use Eccube\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class EstimateFormController extends AbstractController
{
    public function __construct() {
    }

    /**
     * @Route("/estimateform", name="estimateform")
     **/
    public function index(Request $request)
    {
        return new Response('hey');
    }
}
```

これでブラウザで `/estimateform` にアクセスすると `hey` と表示されます  
`hey` の表示じゃなくて、twig を表示するようにしてみます

コントローラーで Template を表示するように

```php
<?php
namespace Plugin\EstimateForm\Controller;

use Eccube\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class EstimateFormController extends AbstractController
{
    public function __construct() {
    }

    /**
     * @Route("/estimateform", name="estimateform")
     * @Template("@EstimateForm/default/estimate_form.twig")
     **/
    public function index(Request $request)
    {
        return [];
    }
}
```

\$ vim app/Plugin/EstimateForm/Resource/template/default/EstimateFormController.php

```twig
{% extends 'default_frame.twig' %}

{% set body_class = 'estimate_form' %}

{% block stylesheet %}
{% endblock %}

{% block javascript %}
{% endblock %}

{% block main %}
Hey, yo!
{% endblock %}
```

これでブラウザで `/estimateform` にアクセスすると `Hey, yo!` が表示されますが、他の画面のようなヘッダーやフッターが表示されません  
ページ設定のデータを登録する必要があります  
管理画面から足してもいいのですが、プラグインの有効/無効時にページ設定を追加/削除してあげると便利です

PluginManager.php を用意して、実装します

```php
<?php
namespace Plugin\EstimateForm;

use Eccube\Plugin\AbstractPluginManager;
use Eccube\Entity\Layout;
use Eccube\Entity\Page;
use Eccube\Entity\PageLayout;
use Eccube\Repository\PageRepository;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class PluginManager.
 */
class PluginManager extends AbstractPluginManager
{
    // page setting
    const FORM_PAGE_NAME        = "見積もりお問い合わせページ";
    const FORM_PAGE_URL         = "estimateform";
    const FORM_PAGE_FILE_NAME   = "@EstimateForm/default/order_map";
    const VERSION = '1.0.0';

    private $pluginName = 'EstimateForm';

    /**
     * Install the plugin.
     *
     * @param array $meta
     * @param ContainerInterface $container
     */
    public function install(array $meta, ContainerInterface $container)
    {
    }

    /**
     * Update the plugin.
     *
     * @param array $meta
     * @param ContainerInterface $container
     */
    public function update(array $meta, ContainerInterface $container)
    {
        $entityManager = $container->get('doctrine')->getManager();
        $this->migration($entityManager->getConnection(), $meta['code']);
    }

    /**
     * Enable the plugin.
     *
     * @param array $meta
     * @param ContainerInterface $container
     */
    public function enable(array $meta, ContainerInterface $container)
    {
        $this->createPage($container);
    }

    /**
     * Disable the plugin.
     *
     * @param array $meta
     * @param ContainerInterface $container
     */
    public function disable(array $meta, ContainerInterface $container)
    {
        $this->deletePage($container);
    }

    /**
     * Uninstall the plugin.
     *
     * @param array $meta
     * @param ContainerInterface $container
     */
    public function uninstall(array $meta, ContainerInterface $container)
    {
    }

    /**
     * ページ情報を挿入する dtb_page, dtb_page_layout
     * @param ContainerInterface $container
     */
    private function createPage(ContainerInterface $container) {
        // check if the page exists
        if ($this->urlExists($container, self::FORM_PAGE_URL)) {
            // skip
            return false;
        }

        $em = $container->get('doctrine.orm.entity_manager');
        $em->beginTransaction();

        try {
            $page = new Page();
            $page->setEditType(Page::EDIT_TYPE_DEFAULT)
                 ->setName(self::FORM_PAGE_NAME)
                 ->setUrl(self::FORM_PAGE_URL)
                 ->setFileName(self::FORM_PAGE_FILE_NAME);
            $em->persist($page);
            $em->flush($page);

            $layout = $em->find(Layout::class, Layout::DEFAULT_LAYOUT_UNDERLAYER_PAGE);
            $pageLayout = new PageLayout();
            $pageLayout->setPage($page)
                ->setPageId($page->getId())
                ->setLayout($layout)
                ->setLayoutId($layout->getId())
                ->setSortNo(0);
            $em->persist($pageLayout);
            $em->flush($pageLayout);

            $em->getConnection()->commit();
        } catch (Exception $e) {
            $em->getConnection()->rollBack();
            throw $e;
        }
    }

    /**
     * ページ情報を削除 dtb_page, dtb_page_layout
     * @param ContainerInterface $container
     */
    private function deletePage(ContainerInterface $container) {
        // check if the page does not exist
        if (!$this->urlExists($container, self::FORM_PAGE_URL)) {
            // skip
            return false;
        }

        $em = $container->get('doctrine.orm.entity_manager');
        $em->beginTransaction();

        try {
            $page = $em->getRepository(Page::class)->findOneBy(['url' => self::FORM_PAGE_URL]);
            foreach ($page->getPageLayouts() as $pageLayout) {
                $em->remove($pageLayout);
                $em->flush($pageLayout);
            }
            $em->remove($page);
            $em->flush($page);

        } catch (Exception $e) {
            $em->getConnection()->rollBack();
            throw $e;
        }
    }

    /**
     * URLの登録がされているか
     * @param string url
     * @return boolean
     */
    private function urlExists(ContainerInterface $container, string $url) {
        $pageRepository = $container->get(PageRepository::class);
        $found = $pageRepository->findOneBy(["url" => self::FORM_PAGE_URL]);
        return !is_null($found);
    }
}
```

これでブラウザで `/estimateform` にアクセスすると先程より見た目がよくなった `Hey, yo!` が表示されます

```
bin/console eccube:generate:proxies
bin/console doctrine:schema:update --dump-sql --force
```

次は入力フォームを表示させてみます  
モデルを用意します

\$ vim app/Plugin/EstimateForm/Entity/EstimateForm.php

```php
<?php
namespace Plugin\EstimateForm\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Form
 *
 * @ORM\Table(name="plg_estimateform_dtb_form")
 * @ORM\InheritanceType("SINGLE_TABLE")
 * @ORM\DiscriminatorColumn(name="discriminator_type", type="string", length=255)
 * @ORM\HasLifecycleCallbacks()
 * @ORM\Entity(repositoryClass="Plugin\EstimateForm\Repository\FormRepository")
 */
class Form extends \Eccube\Entity\AbstractEntity
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", options={"unsigned":true})
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    public $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255, nullable=false)
     */
    public $name;

    /**
     * @var string
     *
     * @ORM\Column(name="kana", type="string", length=255, nullable=false)
     */
    public $kana;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=255, nullable=false)
     */
    public $email;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="request_date", type="datetimetz")
     */
    public $requestDate;

    /**
     * @var string|null
     *
     * @ORM\Column(name="requirement", type="string", length=4000, nullable=true)
     */
    public $requirement;
}
```

データベースに反映します

```
bin/console eccube:generate:proxies
bin/console doctrine:schema:update --dump-sql --force
```

これで、`plg_estimateform_dtb_form` のテーブルができました  
表示するフォームの情報を用意します

\$ vim app/Plugin/EstimateForm/Entity/EstimateForm.php

```php
<?php
namespace Plugin\EstimateForm\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints as Assert;

class FormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', TextType::class, [
                'constraints' => [
                    new Assert\NotBlank([
                        'message' => '入力してください'
                    ]),
                ],
                'label' => 'お名前'
            ])
            ->add('kana', TextType::class, [
                'constraints' => [
                    new Assert\NotBlank([
                        'message' => '入力してください'
                    ]),
                ],
                'label' => 'お名前(カナ)'
            ])
            ->add('email', EmailType::class, [
                'constraints' => [
                    new Assert\NotBlank([
                        'message' => '入力してください'
                    ]),
                    new Assert\Email([
                        'message' => '正しく入力してください'
                    ]),
                ],
                'label' => 'メールアドレス'
            ])
            ->add('requestDate', DateType::class, [
                'widget' => 'single_text',
                'label' => '希望時期'
            ])
            ->add('requirement', TextType::class, [
                'label' => 'ご要望'
            ])
            ->add('send', SubmitType::class, [
                'label' => '送信'
            ]);
    }
}
```

コントローラーにさっき作った FormType で`$this->createForm`してあげて View 側に渡します  
また、完了画面も用意してあげます(本当は twig 用意して、ページ設定にデータ追加してあげる)

\$ vim app/Plugin/EstimateForm/Controller/EstimateFormController.php

```php
<?php

namespace Plugin\EstimateForm\Controller;

use Eccube\Controller\AbstractController;
use Plugin\EstimateForm\Entity\Form;
use Plugin\EstimateForm\Form\Type\FormType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class EstimateFormController extends AbstractController
{
    public function __construct() {
    }

    /**
     * @Route("/estimateform", name="estimateform")
     * @Template("@EstimateForm/default/estimate_form.twig")
     **/
    public function index(Request $request)
    {
        $estimateForm = new Form();
        $estimateForm->requestDate = new \DateTime('+5 days');

        $form = $this->createForm(FormType::class, $estimateForm);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $estimateForm = $form->getData();

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($estimateForm);
            $entityManager->flush();

            return $this->redirectToRoute('estimateform_complete');
        }

        return [
            'form' => $form->createView()
        ];
    }

    /**
     * @Route("/estimateform-complete", name="estimateform_complete")
     **/
    public function complete(Request $request)
    {
        return new Response('complete');
    }
}
```

あとは、Template を修正して

\$ vim app/Plugin/EstimateForm/Resource/template/default/estimate_form.twig

```
{% extends 'default_frame.twig' %}

{% set body_class = 'estimate_form' %}

{% block stylesheet %}
{% endblock %}

{% block javascript %}
{% endblock %}

{% block main %}
  {{ form(form) }}
{% endblock %}
```

`{{ form(form) }}`でフォームが表示されます  
フォームを入力して保存できるようになります！

![sample_ec_site](/eccube4-plugin/sample_ec_site.png)

こんな流れでプラグインができました


