# Authentic Coding AI Academy

[English](../../README.md) · [简体中文](README.zh-CN.md) · [हिन्दी](README.hi.md) · [Español](README.es.md) · [Français](README.fr.md) · [বাংলা](README.bn.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Deutsch](README.de.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · **Italiano**

Un corso interattivo che parte da una chiamata al modello e arriva a una IA capace di cercare, leggere, modificare e verificare il codice.

![Panoramica del corso](../screenshots/01-course-overview.png)

## Installare in KiroCrew

KiroCrew installa le App esterne da una cartella locale che contiene `app.json`. Prima clona il repository, poi installa quella cartella.

### macOS o Linux

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

Dopo il riavvio:

1. Apri una nuova sessione del Dashboard.
2. Trova **Coding AI Academy** nella barra laterale.
3. Apri la prima lezione ed esegui il laboratorio.

Se l'App non appare, aggiorna il Dashboard dopo il riavvio.

## Il corso

Dieci lezioni aggiungono cronologia, contesto del codice, strumenti, ciclo dell'agente, modifiche ai file, test, controllo del contesto e limiti di sicurezza. Ogni lezione offre spiegazione, quiz, codice modificabile, laboratorio e risposta immediata.

## Video completo

[Guarda il percorso in italiano](https://github.com/bolichen97/authentic-coding-ai-academy/releases/download/v0.2.0/authentic-coding-ai-academy-it.mp4)

[Guarda tutte le 12 lingue](https://github.com/bolichen97/authentic-coding-ai-academy/releases/tag/v0.2.0)

## Anteprima locale

```bash
python3 -m http.server 7413 --bind 127.0.0.1
```

Apri [http://127.0.0.1:7413/preview.html](http://127.0.0.1:7413/preview.html).

## Privacy

Il progetto contiene solo materiale didattico originale e idee generali. Non contiene codice privato, link interni, credenziali, dati di account o attività in background.
