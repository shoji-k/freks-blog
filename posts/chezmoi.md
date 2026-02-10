---
title: 'dotfiles管理でchezmoiを使う'
date: '2026-02-09'
updated: ''
---

WindowsとMacを両方使うようになったので、dotfiles管理に [chezmoi](https://www.chezmoi.io/) を使い始めました  
chezmoiは /ʃeɪ mwa/ (shay-mwa) シェイムア みたいな発音でフランス語で私の家という意味でした  

## インストール

[Install - chezmoi](https://www.chezmoi.io/install/) を見てインストール  

Windows WSL2 Ubuntuだと

```bash
sh -c "$(curl -fsLS get.chezmoi.io)" -- -b /usr/local/bin/
```

にしました  

## 1から作るとき

```bash
chezmoi init
```

必要なものを追加していきます

```bash
chezmoi add ~/.bashrc # This will copy ~/.bashrc to ~/.local/share/chezmoi/dot_bashrc.
chezmoi add .claude/settings.json
chezmoi add .claude/mcp.json
```

GitHub repositoryへ登録  
`$GITHUB_USERNAME` は自分のもの、dotfilesレポジトリも変えていいです  

```bash
chezmoi cd
git add .
git commit -m "Initial commit"
git remote add origin git@github.com:$GITHUB_USERNAME/dotfiles.git
git branch -M main
git push -u origin main
```

これでGitHub repositoryへ登録できました  

## dotfilesを編集する

### chezmoi内のファイルを編集する方法

```bash
chezmoi edit ~/.bashrc
# or edit(like vim) $FILE chezmoi merge $FILE
chezmoi diff
chezmoi apply # ~/.local/share/chezmoi/.bashrc to ~/.bashrc
```

### 後でchezmoiへ適用する

```bash
vim ~/.bashrc
chezmoi diff
chezmoi merge ~/.bashrc # ~/.bashrc to ~/.local/share/chezmoi/.bashrc
```

## 設定をGitHub repositoryへpush

```bash
chezmoi cd
git status
git add .
git commit -m "Update"
git push
```

## MacとWindowsで設定が違うところ

設定をテンプレートというのにします

```bash
chezmoi add --template ~/.claude/settings.json
```

これをすると `~/.claude/settings.json.tmpl` に拡張子が変わります  
この中なら分岐が書けます

```txt
{{ if eq .chezmoi.os "linux" }}
  {{   if (.chezmoi.kernel.osrelease | lower | contains "microsoft") }}
  # WSL-specific code
  {{   end }}
{{ end }}

{{- if eq .chezmoi.os "darwin" -}}
# Mac-specific code
{{ end -}}
```

環境によって設定が変えられます

## 新しい環境で設定する

```bash
chezmoi init --apply git@github.com:$GITHUB_USERNAME/dotfiles.git
```

## まとめ

これで最低限使えるようになりました  
色々できそうです  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3ASmUog" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/51e-tl7l8OL._SX342_SY445_.jpg" alt="Azure OpenAI ServiceではじめるChatGPT/LLMシステム構築入門" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Azure OpenAI ServiceではじめるChatGPT/LLMシステム構築入門</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
