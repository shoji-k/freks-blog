---
title: 'Ansible Galaxyはじめ'
date: '2020-12-31'
---

\$ ansible-galaxy install zzet.rbenv -p roles

```
---
- hosts: web
  vars:
    rbenv:
      env: system
      version: v1.1.2
      default_ruby: 2.6.3
      rubies:
      - version: 2.6.3
  roles:
    - role: zzet.rbenv
      rbenv_users:
        - "{{ user }}"
```
