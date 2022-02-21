---
title: "PHPで大量のinputをpostすると$_POSTが空になる"
date: "2019-02-06"
updated: ""
---

PHPで開発しててinputフォームを動的に追加できる画面を作ってて、inputフォームをばしばし増やして実行したら突然$_POSTが空に..  

対策はこれです

[max-input-vars](http://php.net/manual/ja/info.configuration.php#ini.max-input-vars)  
がデフォルトでは1000で、inputの数が1000を超えると受け付けなくなります  

E_WARNINGが出るはずですが、 エラーログも出てなかったような..  

php.iniに書いてあげるのがいいですが、.htaccessで対処しました

```
php_value max_input_vars 10000
```

他、

- [memory_limit](http://php.net/manual/ja/ini.core.php#ini.memory-limit)
- [post_max_size](http://php.net/manual/ja/ini.core.php#ini.post-max-size)

も影響ありそうです  
