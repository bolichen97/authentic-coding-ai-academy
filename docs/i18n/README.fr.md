# Authentic Coding AI Academy

[English](../../README.md) · [简体中文](README.zh-CN.md) · [हिन्दी](README.hi.md) · [Español](README.es.md) · **Français** · [বাংলা](README.bn.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Deutsch](README.de.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Italiano](README.it.md)

Un cours interactif qui part d'un appel au modèle et aboutit à une IA capable de chercher, lire, modifier et vérifier du code.

[![Aperçu vidéo du cours](../screenshots/course-preview.gif)](https://github.com/bolichen97/authentic-coding-ai-academy/releases/download/v0.2.0/authentic-coding-ai-academy-fr.mp4)

L'aperçu se lance dans GitHub. Cliquez pour voir le parcours complet en français.

![Aperçu du cours](../screenshots/01-course-overview.png)

## Installer dans KiroCrew

KiroCrew installe une application externe depuis un dossier local contenant `app.json`. Clonez d'abord le dépôt, puis installez ce dossier.

### macOS ou Linux

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

Après le redémarrage :

1. Ouvrez une nouvelle session du Dashboard.
2. Trouvez **Coding AI Academy** dans la barre latérale.
3. Ouvrez la première leçon et lancez le labo.

Si l'application n'apparaît pas, actualisez le Dashboard après le redémarrage.

## Le cours

Dix leçons ajoutent l'historique, le contexte du code, les outils, la boucle de l'agent, les modifications de fichiers, les tests, le contrôle du contexte et les limites de sécurité. Chaque leçon contient une explication, un quiz, du code modifiable, un labo et un retour immédiat.

## Vidéo complète

[Voir le parcours en français](https://github.com/bolichen97/authentic-coding-ai-academy/releases/download/v0.2.0/authentic-coding-ai-academy-fr.mp4)

[Voir les 12 langues](https://github.com/bolichen97/authentic-coding-ai-academy/releases/tag/v0.2.0)

## Aperçu local

```bash
python3 -m http.server 7413 --bind 127.0.0.1
```

Ouvrez [http://127.0.0.1:7413/preview.html](http://127.0.0.1:7413/preview.html).

## Confidentialité

Le projet contient uniquement du contenu pédagogique original et des idées générales. Il ne contient aucun code privé, lien interne, identifiant, donnée de compte ou tâche en arrière-plan.
