---
title: 'Ansible Galaxyはじめ'
date: '2019-12-21'
updated: ""
---

[Ansible Galaxy](https://galaxy.ansible.com/home) はAnsible版GitHubみたいなものでよさそうなansible playbookの1セット “role” を探して使えるものです

例えば、  

rbenvでRubyをインストールしたかったら  
[Ansible Galaxy - zzet/rbenv)](https://galaxy.ansible.com/zzet/rbenv)

Node.jsを入れたかったら
[Ansible Galaxy](https://galaxy.ansible.com/geerlingguy/nodejs)  

とか使うと、自分で1からansible playbookを書かずに、楽にインストールができたりします

ansible-galaxyは、ansibleをインストールしたときに入ってるので使えます

[Ansible Galaxy - zzet/rbenv](https://galaxy.ansible.com/zzet/rbenv) を使ってみます

```bash
$ ansible-galaxy install zzet.rbenv -p roles
```

でダウンロードしてきます  
`-p` をつけるとダウンロードするディレクトリが指定できて、指定ないとansible-galaxyのデフォルトのディレクトリにダウンロードされます  

あとは選んだroleのドキュメントを呼んでパラメータ指定したり、実行できるようにファイルを用意してあげて実行するとインストールできます

例としては

main.yml

```yml
---                                                                                                                                                 
- hosts: web
  vars:
    rbenv: #ruby    
      env: system    
      version: v1.1.2    
      default_ruby: 2.6.3    
      rubies:    
      - version: 2.6.3
  roles:    
    - role: zzet.rbenv    
      rbenv_users:    
        - "{{ user }}"    
      tags: ruby
```

hostファイル

```ini
[web]
xxx.xxx.xxx.xxx # ip addressを書く
```

実行コマンド  

```bash
$ ansible-playbook -i staging site.yml
```

といった感じです

