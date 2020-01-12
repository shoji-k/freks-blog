---
title: 'Vim 8.1 をビルドして使ってみる'
date: '2019-11-27'
---

Vimの最新版を使いたくなったので、Vimをビルドして使ってみます

- [Vim from GitHub : vim online](https://www.vim.org/git.php)
- [vim\-jp » Linuxでのビルド方法](https://vim-jp.org/docs/build_linux.html)

を参考に

事前準備します  

```
$ sudo apt install git gettext libtinfo-dev libacl1-dev libgpm-dev
$ sudo apt install build-essential
```

GitHubにrepositoryがあるので、cloneしてきます

```
$ git clone git@github.com/vim/vim  
```

master branchでbuildせずに、最新リリースバージョンにしました  
このときは  

```
$ git switch -c v8.1.2351
```

デフォルトの設定（./configureしない）で、srcディレクトリにいってビルドしてみます

```
$ make
$ sudo make install
```

初buildでないときは、`make distclean` がいるようです

確認します

```
$ vim --version
VIM - Vi IMproved 8.1 (2018 May 18, compiled Nov 27 2019 21:10:53)
適用済パッチ: 1-2351
Compiled by user@user-pc
Huge 版 without GUI.  機能の一覧 有効(+)/無効(-)
+acl               -farsi             -mouse_sysmouse    -tag_any_white
+arabic            +file_in_path      +mouse_urxvt       -tcl
+autocmd           +find_in_path      +mouse_xterm       +termguicolors
+autochdir         +float             +multi_byte        +terminal
-autoservername    +folding           +multi_lang        +terminfo
-balloon_eval      -footer            -mzscheme          +termresponse
+balloon_eval_term +fork()            +netbeans_intg     +textobjects
-browse            +gettext           +num64             +textprop
++builtin_terms    -hangul_input      +packages          +timers
+byte_offset       +iconv             +path_extra        +title
+channel           +insert_expand     -perl              -toolbar
+cindent           +job               +persistent_undo   +user_commands
-clientserver      +jumplist          +postscript        +vartabs
-clipboard         +keymap            +printer           +vertsplit
+cmdline_compl     +lambda            +profile           +virtualedit
+cmdline_hist      +langmap           -python            +visual
+cmdline_info      +libcall           -python3           +visualextra
+comments          +linebreak         +quickfix          +viminfo
+conceal           +lispindent        +reltime           +vreplace
+cryptv            +listcmds          +rightleft         +wildignore
+cscope            +localmap          -ruby              +wildmenu
+cursorbind        -lua               +scrollbind        +windows
+cursorshape       +menu              +signs             +writebackup
+dialog_con        +mksession         +smartindent       -X11
+diff              +modify_fname      -sound             -xfontset
+digraphs          +mouse             +spell             -xim
-dnd               -mouseshape        +startuptime       -xpm
-ebcdic            +mouse_dec         +statusline        -xsmp
+emacs_tags        +mouse_gpm         -sun_workshop      -xterm_clipboard
+eval              -mouse_jsbterm     +syntax            -xterm_save
+ex_extra          +mouse_netterm     +tag_binary        
+extra_search      +mouse_sgr         -tag_old_static    
      システム vimrc: "$VIM/vimrc"
      ユーザー vimrc: "$HOME/.vimrc"
   第2ユーザー vimrc: "~/.vim/vimrc"
       ユーザー exrc: "$HOME/.exrc"
  デフォルトファイル: "$VIMRUNTIME/defaults.vim"
       省略時の $VIM: "/usr/local/share/vim"
コンパイル: gcc -c -I. -Iproto -DHAVE_CONFIG_H     -O2 -fno-strength-reduce -Wall -U_FORTIFY_SOURCE -D_FORTIFY_SOURCE=1       
リンク: gcc   -L/usr/local/lib -Wl,--as-needed -o vim        -lm -ltinfo -lnsl  -lacl -lattr -lgpm -ldl    
```

Vim8.1 入りました！

## configure

```
./configure -h
```

で設定のヘルプを確認します

`clipboard` を設定するには

[Ubuntu 18\.04\.3 LTS でOSとVimのクリップボードを共有する方法 \- Qiita](https://qiita.com/gorilla0513/items/4034b8a0be5ff5808bb7)  
が参考になりました


<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=freks-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B00HWLJI3U&linkId=50a986489dbbd53877243f7a16537d8c"></iframe>