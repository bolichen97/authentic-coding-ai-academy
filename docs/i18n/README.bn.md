# Authentic Coding AI Academy

[English](../../README.md) · [简体中文](README.zh-CN.md) · [हिन्दी](README.hi.md) · [Español](README.es.md) · [Français](README.fr.md) · **বাংলা** · [Português](README.pt.md) · [Русский](README.ru.md) · [Deutsch](README.de.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Italiano](README.it.md)

একটি ইন্টারঅ্যাকটিভ কোর্স। একটি model call দিয়ে শুরু করে এমন AI তৈরি করা হয়, যা code খোঁজে, পড়ে, বদলায় এবং test করে।

[![কোর্স ভিডিও preview](../screenshots/course-preview.gif)](https://github.com/bolichen97/authentic-coding-ai-academy/releases/download/v0.2.0/authentic-coding-ai-academy-bn.mp4)

Preview GitHub-এর ভেতর চলে। সম্পূর্ণ বাংলা walkthrough দেখতে ক্লিক করুন।

![কোর্সের দৃশ্য](../screenshots/01-course-overview.png)

## KiroCrew-তে ইনস্টল করুন

KiroCrew সেই local folder থেকে external App ইনস্টল করে যেখানে `app.json` আছে। আগে repository clone করুন, তারপর folder ইনস্টল করুন।

### macOS বা Linux

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

Restart-এর পরে:

1. নতুন Dashboard session খুলুন।
2. Sidebar-এ **Coding AI Academy** খুঁজুন।
3. প্রথম lesson খুলে lab চালান।

App না দেখালে restart-এর পরে Dashboard refresh করুন।

## কোর্স

দশটি lesson-এ message history, code context, tools, agent loop, file edits, tests, context control এবং safety limits যোগ হয়। প্রতিটি lesson-এ সহজ ব্যাখ্যা, quiz, editable code, lab এবং সঙ্গে সঙ্গে feedback আছে।

## সম্পূর্ণ ভিডিও

[বাংলা walkthrough দেখুন](https://github.com/bolichen97/authentic-coding-ai-academy/releases/download/v0.2.0/authentic-coding-ai-academy-bn.mp4)

[সব 12 ভাষা দেখুন](https://github.com/bolichen97/authentic-coding-ai-academy/releases/tag/v0.2.0)

## Local preview

```bash
python3 -m http.server 7413 --bind 127.0.0.1
```

[http://127.0.0.1:7413/preview.html](http://127.0.0.1:7413/preview.html) খুলুন।

## Privacy

এই project-এ শুধু original teaching material এবং সাধারণ ধারণা আছে। Private source, internal link, credential, account data বা background job নেই।
