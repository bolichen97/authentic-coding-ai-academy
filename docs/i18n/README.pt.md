# Authentic Coding AI Academy

[English](../../README.md) · [简体中文](README.zh-CN.md) · [हिन्दी](README.hi.md) · [Español](README.es.md) · [Français](README.fr.md) · [বাংলা](README.bn.md) · **Português** · [Русский](README.ru.md) · [Deutsch](README.de.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Italiano](README.it.md)

Um curso interativo que começa com uma chamada ao modelo e termina com uma IA que busca, lê, altera e verifica código.

![Visão do curso](../screenshots/01-course-overview.png)

## Instalar no KiroCrew

O KiroCrew instala Apps externos a partir de uma pasta local que contém `app.json`. Primeiro clone o repositório e depois instale essa pasta.

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

Depois do reinício:

1. Abra uma nova sessão do Dashboard.
2. Encontre **Coding AI Academy** na barra lateral.
3. Abra a primeira aula e execute o laboratório.

Se o App não aparecer, atualize o Dashboard após o reinício.

## O curso

Dez aulas adicionam histórico, contexto de código, ferramentas, ciclo do agente, edição de arquivos, testes, controle de contexto e limites de segurança. Cada aula tem explicação, quiz, código editável, laboratório e retorno imediato.

## Vídeo completo

[Ver o percurso em português](https://github.com/bolichen97/authentic-coding-ai-academy/releases/download/v0.2.0/authentic-coding-ai-academy-pt.mp4)

[Ver os 12 idiomas](https://github.com/bolichen97/authentic-coding-ai-academy/releases/tag/v0.2.0)

## Prévia local

```bash
python3 -m http.server 7413 --bind 127.0.0.1
```

Abra [http://127.0.0.1:7413/preview.html](http://127.0.0.1:7413/preview.html).

## Privacidade

O projeto contém apenas material original e ideias gerais. Não inclui código privado, links internos, credenciais, dados de conta ou tarefas em segundo plano.
