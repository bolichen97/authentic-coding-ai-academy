# Authentic Coding AI Academy

[English](../../README.md) · **简体中文** · [हिन्दी](README.hi.md) · [Español](README.es.md) · [Français](README.fr.md) · [বাংলা](README.bn.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Deutsch](README.de.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Italiano](README.it.md)

一套循序渐进的互动课程，带你从一次模型调用开始，做出会搜索、读写、测试和验证代码的 Coding AI。

[![直接预览课程视频](../screenshots/course-preview.gif)](https://github.com/bolichen97/authentic-coding-ai-academy/releases/download/v0.2.0/authentic-coding-ai-academy-zh-CN.mp4)

预览会在 GitHub 页面内自动播放。点击可观看完整中文流程。

![课程首页](../screenshots/01-course-overview.png)

## 安装到 KiroCrew

KiroCrew 从包含 `app.json` 的本地目录安装外部 App。请先克隆仓库，再安装该目录。

### macOS 或 Linux

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

KiroCrew 重启后：

1. 打开一个新的 Dashboard 会话。
2. 在侧栏找到 **Coding AI Academy**。
3. 打开第一课，点击 **运行实验**。

如果 App 没出现，请在重启后刷新 Dashboard。

## 十课内容

课程从一次模型调用开始，逐步加入消息历史、代码上下文、工具调用、Agent 循环、文件修改、测试闭环、上下文控制和安全边界。最后一课把这些能力组合成完整 Coding AI。

每课包含讲解、新词、小测、可修改代码、实验、即时反馈和短视频。学习进度保存在浏览器本地。

## 完整配音视频

[观看简体中文完整流程](https://github.com/bolichen97/authentic-coding-ai-academy/releases/download/v0.2.0/authentic-coding-ai-academy-zh-CN.mp4)

[查看全部 12 种语言视频](https://github.com/bolichen97/authentic-coding-ai-academy/releases/tag/v0.2.0)

## 本地预览

```bash
python3 -m http.server 7413 --bind 127.0.0.1
```

打开 [http://127.0.0.1:7413/preview.html](http://127.0.0.1:7413/preview.html)。

## 隐私

项目只含原创教学内容和通用概念。不含私有源码、内部链接、凭据、账户数据或后台任务。
