# Authentic Coding AI Academy

[English](../../README.md) · [简体中文](README.zh-CN.md) · [हिन्दी](README.hi.md) · [Español](README.es.md) · [Français](README.fr.md) · [বাংলা](README.bn.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Deutsch](README.de.md) · **日本語** · [한국어](README.ko.md) · [Italiano](README.it.md)

ひとつのモデル呼び出しから始め、コードを探し、読み、直し、検証できるAIを作る対話型コースです。

[![コース動画プレビュー](../screenshots/course-preview.gif)](https://github.com/bolichen97/authentic-coding-ai-academy/releases/download/v0.2.0/authentic-coding-ai-academy-ja.mp4)

GitHub上でプレビューが再生されます。クリックすると日本語の完全版を開きます。

![コース画面](../screenshots/01-course-overview.png)

## KiroCrewにインストール

KiroCrewは、`app.json`を含むローカルフォルダーから外部Appをインストールします。まずリポジトリをcloneし、そのフォルダーをインストールします。

### macOSまたはLinux

```bash
git clone https://github.com/bolichen97/authentic-coding-ai-academy.git
cd authentic-coding-ai-academy
kirocrew app install "$PWD"
kirocrew restart
```

### Windows PowerShell

```powershell
git clone https://github.com/bolichen97/authentic-coding-ai-academy.git
Set-Location authentic-coding-ai-academy
kirocrew app install (Get-Location).Path
kirocrew restart
```

再起動後：

1. 新しいDashboardセッションを開きます。
2. サイドバーの **Coding AI Academy** を選びます。
3. レッスン1を開き、実験を実行します。

Appが見えない場合は、再起動後にDashboardを更新してください。

## コース内容

10のレッスンで、履歴、コードの文脈、ツール、Agentループ、ファイル修正、テスト、文脈管理、安全の境界を加えます。各レッスンに説明、クイズ、編集できるコード、実験、すぐ届く結果があります。

## 完全版ビデオ

[日本語の全手順を見る](https://github.com/bolichen97/authentic-coding-ai-academy/releases/download/v0.2.0/authentic-coding-ai-academy-ja.mp4)

[12言語すべてを見る](https://github.com/bolichen97/authentic-coding-ai-academy/releases/tag/v0.2.0)

## ローカルプレビュー

```bash
python3 -m http.server 7413 --bind 127.0.0.1
```

[http://127.0.0.1:7413/preview.html](http://127.0.0.1:7413/preview.html) を開きます。

## プライバシー

このプロジェクトには独自の教材と一般的な考え方だけが入っています。非公開コード、内部リンク、認証情報、アカウント情報、バックグラウンド処理は含みません。
