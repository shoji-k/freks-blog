---
title: "Neovim"
date: "2019-12-31"
---

[Neovim](https://neovim.io/)とVim8とどちらを使うか迷いましたが、[暗黒美無王](https://github.com/Shougo)のプラグインの設定が楽そうなのでNeovimを使っています  

## Install

[Installing Neovim](https://github.com/neovim/neovim/wiki/Installing-Neovim)  
[Installing Neovim · neovim/neovim Wiki](https://github.com/neovim/neovim/wiki/Installing-Neovim#ubuntu)  

## Neovim環境の確認

$ nvim

でNeovimを開いて

```
:CheckHealth
```

出てくるWarningを片付けていくとよいです

### clipboardを使えるようにする

need to install xclip or xsel だそうなので

```
$ sudo apt install xsel
```

### PythonのWarning対策

[Nvim documentation: provider-python](https://neovim.io/doc/user/provider.html#provider-python)

```
$ sudo apt-get install python-dev python-pip python3-dev python3-pip
$ pip install pynvim
$ pip3 install pynvim
```

### rubyのWarning対策

```
$ gem install neovim
```

### NodeのWarning対策

```
$ npm install -g neovim
```

## dein.vim

Pluginマネージャーは  

[GitHub \- Shougo/dein\.vim: Dark powered Vim/Neovim plugin manager](https://github.com/Shougo/dein.vim)

を使います  

設定  

```
$ nvim ~/.config/nvim/init.vim  
```

```
let s:dein_dir = s:cache_home . '/dein'
let s:dein_repo_dir = s:dein_dir . '/repos/dein.vim'
let s:toml_dir = s:config_dir . '/dein'

if !isdirectory(s:dein_repo_dir)
  execute '!git clone git@github.com:Shougo/dein.vim.git' s:dein_repo_dir
  if !isdirectory(s:toml_dir)
    execute '!mkdir -p' s:toml_dir
    execute '!touch ' . s:toml_dir . '/plugins.toml'
    execute '!touch ' . s:toml_dir . '/lazy.toml'
    execute '!touch ' . s:toml_dir . '/neovim.toml'
  endif
endif
execute 'set runtimepath^=' . s:dein_repo_dir

if dein#load_state(s:dein_dir)
  call dein#begin(s:dein_dir)

  call dein#load_toml(s:toml_dir . '/plugins.toml', {'lazy': 0})
  call dein#load_toml(s:toml_dir . '/lazy.toml', {'lazy': 1})
  if has('nvim')
    call dein#load_toml(s:toml_dir . '/neovim.toml', {'lazy': 1})
  endif

  call dein#end()
  call dein#save_state()
endif
```

#### プラグインインストール

```
:call dein#install()
```

#### プラグインアップデート

```
:call dein#update()
```

#### プラグイン用tomlの書き方

```
on_i = 1 -> insert modeになったら読み込む
on_cmd => ['xxx'] -> xxxを実行したら読み込む
on_source = ['xxx.nvim'] -> xxx.nvimが読み込まれたら読み込む
```

## denite

[Shougo/denite\.nvim: Dark powered asynchronous unite all interfaces for Neovim/Vim8](https://github.com/Shougo/denite.nvim)

```
:UpdateRemotePlugins
```

でdeniteが返ってくればOK

$ nvim ~/.config/dein/neovim.toml

```
[[plugins]]
repo = 'Shougo/denite.nvim'
if = 'has("nvim")'
hook_add = '''
nnoremap [unite] <Nop>
nmap , [denite]
nmap <silent> [denite]<C-t> :<C-u>Denite filetype<CR>
nmap <silent> [denite]<C-p> :<C-u>Denite file_rec<CR>
nmap <silent> [denite]<C-j> :<C-u>Denite line<CR>
nmap <silent> [denite]<C-g> :<C-u>Denite grep<CR>
nmap <silent> [denite]<C-]> :<C-u>DeniteCursorWord grep<CR>
nmap <silent> [denite]<C-u> :<C-u>Denite file_mru<CR>
nmap <silent> [denite]<C-y> :<C-u>Denite neoyank<CR>
nmap <silent> [denite]<C-r> :<C-u>Denite -resume<CR>
nmap <silent> [denite]; :<C-u>Denite -resume -immediately -select=+1<CR>
nmap <silent> [denite]- :<C-u>Denite -resume -immediately -select=-1<CR>
nmap <silent> [denite]<C-d> :<C-u>call denite#start([{'name': 'file_rec', 'args': ['~/.config/dein']}])<CR>
'''
```

