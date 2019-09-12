---
title: 'Ansibleはじめ'
date: '2019-08-26'
---

Ansible の始め方メモ

インストールは公式ドキュメントを見て入れます

[Installation Guide — Ansible Documentation](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)

Ubuntu 18.04 で試したのでこうでした

```
$ sudo apt update
$ sudo apt install software-properties-common
$ sudo apt-add-repository --yes --update ppa:ansible/ansible
$ sudo apt install ansible
```

バージョンは

```
$ ansible --version
ansible 2.8.4
  config file = /etc/ansible/ansible.cfg
  configured module search path = [u'/home/user/.ansible/plugins/modules', u'/usr/share/ansible/plugins/modules']
  ansible python module location = /usr/lib/python2.7/dist-packages/ansible
  executable location = /usr/bin/ansible
  python version = 2.7.12 (default, Nov 12 2018, 14:36:49) [GCC 5.4.0 20160609]
```

## 試す

ssh でつながるサーバーを用意しておきます  
ここでは localhost に ssh server を立ち上げてテスト

inventory ファイルを作る

\$ vim inventory

```
[target]
localhost
```

helloworld の role を作ってみます

$ mkdir -p helloworld/tasks
$ vim helloworld/tasks/main.yml

```
---
- name: Hello World!
  debug:
    msg: "Hello World!"
```

ansible コマンドで ssh でつながるか確認

```
$ ansible all -i inventory -m ping
localhost | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python"
    },
    "changed": false,
    "ping": "pong"
}
```

ansible (対象のホストやグループ) -i (インベントリファイル) -m (Ansible module)  
となってます

## playbook を試す

playbook.yml を用意

\$ vim playbook.yml

```
---
- hosts: all
  roles:
    - helloworld
```

実行してみます

```
$ ansible-playbook -i inventory playbook.yml
PLAY [all] ************************************************************************************************************************************************************************************************************************************

TASK [Gathering Facts] ************************************************************************************************************************************************************************************************************************

TASK [helloworld : Hello World!] **************************************************************************************************************************************************************************************************************
ok: [localhost] => {
    "msg": "Hello World!"
}

PLAY RECAP ************************************************************************************************************************************************************************************************************************************
localhost                     : ok=2    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
```

ansible コマンドのホスト名の指定が playbook.yml の中でやってます

## Directory layout

ディレクトリ構成は  
https://docs.ansible.com/ansible/latest/user_guide/playbooks_best_practices.html#id11
を参照
