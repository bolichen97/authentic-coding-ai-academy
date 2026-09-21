# Authentic Coding AI Academy

[English](../../README.md) · [简体中文](README.zh-CN.md) · [हिन्दी](README.hi.md) · [Español](README.es.md) · [Français](README.fr.md) · [বাংলা](README.bn.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Deutsch](README.de.md) · [日本語](README.ja.md) · **한국어** · [Italiano](README.it.md)

한 번의 모델 호출에서 시작해 코드를 찾고, 읽고, 고치고, 검증하는 AI를 만드는 대화형 과정입니다.

[![과정 영상 미리보기](../screenshots/course-preview.gif)](https://github.com/bolichen97/authentic-coding-ai-academy/releases/download/v0.2.0/authentic-coding-ai-academy-ko.mp4)

GitHub 안에서 미리보기가 재생됩니다. 클릭하면 전체 한국어 영상을 볼 수 있습니다.

![과정 화면](../screenshots/01-course-overview.png)

## KiroCrew에 설치하기

KiroCrew는 `app.json`이 있는 local folder에서 외부 App을 설치합니다. 먼저 repository를 clone한 다음 그 folder를 설치하세요.

### macOS 또는 Linux

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

재시작한 뒤:

1. 새 Dashboard session을 엽니다.
2. Sidebar에서 **Coding AI Academy**를 찾습니다.
3. 첫 수업을 열고 실험을 실행합니다.

App이 보이지 않으면 재시작 뒤 Dashboard를 새로 고치세요.

## 과정 내용

10개 수업에서 메시지 기록, 코드 문맥, 도구, Agent 순환, 파일 수정, 테스트, 문맥 관리, 안전 경계를 더합니다. 각 수업에는 설명, 퀴즈, 수정 가능한 코드, 실험, 즉시 피드백이 있습니다.

## 전체 영상

[한국어 전체 과정을 보기](https://github.com/bolichen97/authentic-coding-ai-academy/releases/download/v0.2.0/authentic-coding-ai-academy-ko.mp4)

[12개 언어 모두 보기](https://github.com/bolichen97/authentic-coding-ai-academy/releases/tag/v0.2.0)

## Local preview

```bash
python3 -m http.server 7413 --bind 127.0.0.1
```

[http://127.0.0.1:7413/preview.html](http://127.0.0.1:7413/preview.html)을 엽니다.

## Privacy

이 project에는 직접 만든 학습 자료와 일반 개념만 있습니다. 비공개 source, 내부 link, credential, account data, background job은 없습니다.
