# Authentic Coding AI Academy

[English](../../README.md) · [简体中文](README.zh-CN.md) · [हिन्दी](README.hi.md) · **Español** · [Français](README.fr.md) · [বাংলা](README.bn.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Deutsch](README.de.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Italiano](README.it.md)

Un curso interactivo que empieza con una llamada al modelo y termina con una IA que busca, lee, modifica y verifica código.

![Vista del curso](../screenshots/01-course-overview.png)

## Instalar en KiroCrew

KiroCrew instala aplicaciones externas desde una carpeta local que contiene `app.json`. Primero clona el repositorio y luego instala esa carpeta.

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

Después del reinicio:

1. Abre una sesión nueva del Dashboard.
2. Busca **Coding AI Academy** en la barra lateral.
3. Abre la primera lección y pulsa **Run Lab**.

Si no aparece, actualiza el Dashboard después del reinicio.

## El curso

Diez lecciones añaden historial, contexto de código, herramientas, ciclo del agente, edición de archivos, pruebas, control del contexto y límites de seguridad. Cada lección tiene explicación, cuestionario, código editable, laboratorio y respuesta inmediata.

## Video completo

[Ver el recorrido en español](https://github.com/bolichen97/authentic-coding-ai-academy/releases/download/v0.2.0/authentic-coding-ai-academy-es.mp4)

[Ver los 12 idiomas](https://github.com/bolichen97/authentic-coding-ai-academy/releases/tag/v0.2.0)

## Vista local

```bash
python3 -m http.server 7413 --bind 127.0.0.1
```

Abre [http://127.0.0.1:7413/preview.html](http://127.0.0.1:7413/preview.html).

## Privacidad

El proyecto solo contiene material original e ideas generales. No incluye código privado, enlaces internos, credenciales, datos de cuentas ni tareas en segundo plano.
