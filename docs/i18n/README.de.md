# Authentic Coding AI Academy

[English](../../README.md) · [简体中文](README.zh-CN.md) · [हिन्दी](README.hi.md) · [Español](README.es.md) · [Français](README.fr.md) · [বাংলা](README.bn.md) · [Português](README.pt.md) · [Русский](README.ru.md) · **Deutsch** · [日本語](README.ja.md) · [한국어](README.ko.md) · [Italiano](README.it.md)

Ein interaktiver Kurs, der mit einem Modellaufruf beginnt und mit einer AI endet, die Code sucht, liest, ändert und prüft.

[![Kursvideo-Vorschau](../screenshots/course-preview.gif)](https://github.com/bolichen97/authentic-coding-ai-academy/releases/download/v0.2.0/authentic-coding-ai-academy-de.mp4)

Die Vorschau läuft direkt in GitHub. Klicke für den vollständigen deutschen Rundgang.

![Kursübersicht](../screenshots/01-course-overview.png)

## In KiroCrew installieren

KiroCrew installiert externe Apps aus einem lokalen Ordner mit `app.json`. Klone zuerst das Repository und installiere dann diesen Ordner.

### macOS oder Linux

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

Nach dem Neustart:

1. Öffne eine neue Dashboard-Sitzung.
2. Suche **Coding AI Academy** in der Seitenleiste.
3. Öffne Lektion eins und starte das Labor.

Wenn die App fehlt, aktualisiere das Dashboard nach dem Neustart.

## Der Kurs

Zehn Lektionen ergänzen Verlauf, Code-Kontext, Werkzeuge, Agent-Schleife, Dateiänderungen, Tests, Kontextkontrolle und Sicherheitsgrenzen. Jede Lektion bietet Erklärung, Quiz, änderbaren Code, Labor und sofortige Rückmeldung.

## Komplettes Video

[Deutschen Rundgang ansehen](https://github.com/bolichen97/authentic-coding-ai-academy/releases/download/v0.2.0/authentic-coding-ai-academy-de.mp4)

[Alle 12 Sprachen ansehen](https://github.com/bolichen97/authentic-coding-ai-academy/releases/tag/v0.2.0)

## Lokale Vorschau

```bash
python3 -m http.server 7413 --bind 127.0.0.1
```

Öffne [http://127.0.0.1:7413/preview.html](http://127.0.0.1:7413/preview.html).

## Datenschutz

Das Projekt enthält nur eigene Lerninhalte und allgemeine Ideen. Es enthält keinen privaten Quellcode, interne Links, Zugangsdaten, Kontodaten oder Hintergrundaufgaben.
