# Authentic Coding AI Academy

[English](../../README.md) · [简体中文](README.zh-CN.md) · **हिन्दी** · [Español](README.es.md) · [Français](README.fr.md) · [বাংলা](README.bn.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Deutsch](README.de.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Italiano](README.it.md)

यह एक इंटरैक्टिव कोर्स है। यह एक मॉडल कॉल से शुरू होता है और अंत में ऐसा AI बनाता है जो कोड खोजता, पढ़ता, बदलता और जाँचता है।

![कोर्स का दृश्य](../screenshots/01-course-overview.png)

## KiroCrew में इंस्टॉल करें

KiroCrew बाहरी App को उस local folder से इंस्टॉल करता है जिसमें `app.json` हो। पहले repository clone करें, फिर उस folder को इंस्टॉल करें।

### macOS या Linux

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

Restart के बाद:

1. नया Dashboard session खोलें।
2. Sidebar में **Coding AI Academy** खोजें।
3. पहला lesson खोलें और lab चलाएँ।

App न दिखे तो restart के बाद Dashboard refresh करें।

## कोर्स

दस lessons में message history, code context, tools, agent loop, file edits, tests, context control और safety limits जुड़ते हैं। हर lesson में आसान समझ, quiz, editable code, lab और तुरंत feedback है।

## पूरा वीडियो

[हिन्दी walkthrough देखें](https://github.com/bolichen97/authentic-coding-ai-academy/releases/download/v0.2.0/authentic-coding-ai-academy-hi.mp4)

[सभी 12 भाषाएँ देखें](https://github.com/bolichen97/authentic-coding-ai-academy/releases/tag/v0.2.0)

## Local preview

```bash
python3 -m http.server 7413 --bind 127.0.0.1
```

[http://127.0.0.1:7413/preview.html](http://127.0.0.1:7413/preview.html) खोलें।

## Privacy

इस project में केवल original teaching material और general ideas हैं। इसमें private source, internal links, credentials, account data या background jobs नहीं हैं।
