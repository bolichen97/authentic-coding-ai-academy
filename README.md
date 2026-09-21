# Authentic Coding AI Academy

一套可点击、可练习、会即时反馈的 Coding AI 课程。

## 课程预览

![课程首页](docs/screenshots/01-course-overview.png)

![第一课完成](docs/screenshots/02-first-lesson-complete.png)

![完整 Coding AI 流程](docs/screenshots/03-complete-agent-flow.png)

## 完整教学视频

视频会带普通用户走过十课完整流程：从一次模型调用，走到查找代码、修改代码、运行测试和展示验证证据。

配音覆盖 KiroCrew 的 12 种用户语言：

- [English](https://github.com/bolichen97/authentic-coding-ai-academy/releases/download/v0.2.0/authentic-coding-ai-academy-en.mp4)
- [简体中文](https://github.com/bolichen97/authentic-coding-ai-academy/releases/download/v0.2.0/authentic-coding-ai-academy-zh-CN.mp4)
- [हिन्दी](https://github.com/bolichen97/authentic-coding-ai-academy/releases/download/v0.2.0/authentic-coding-ai-academy-hi.mp4)
- [Español](https://github.com/bolichen97/authentic-coding-ai-academy/releases/download/v0.2.0/authentic-coding-ai-academy-es.mp4)
- [Français](https://github.com/bolichen97/authentic-coding-ai-academy/releases/download/v0.2.0/authentic-coding-ai-academy-fr.mp4)
- [বাংলা](https://github.com/bolichen97/authentic-coding-ai-academy/releases/download/v0.2.0/authentic-coding-ai-academy-bn.mp4)
- [Português](https://github.com/bolichen97/authentic-coding-ai-academy/releases/download/v0.2.0/authentic-coding-ai-academy-pt.mp4)
- [Русский](https://github.com/bolichen97/authentic-coding-ai-academy/releases/download/v0.2.0/authentic-coding-ai-academy-ru.mp4)
- [Deutsch](https://github.com/bolichen97/authentic-coding-ai-academy/releases/download/v0.2.0/authentic-coding-ai-academy-de.mp4)
- [日本語](https://github.com/bolichen97/authentic-coding-ai-academy/releases/download/v0.2.0/authentic-coding-ai-academy-ja.mp4)
- [한국어](https://github.com/bolichen97/authentic-coding-ai-academy/releases/download/v0.2.0/authentic-coding-ai-academy-ko.mp4)
- [Italiano](https://github.com/bolichen97/authentic-coding-ai-academy/releases/download/v0.2.0/authentic-coding-ai-academy-it.mp4)

`en-XA` 是开发测试用假语言，不是用户语言，因此不生成配音。

课程从一次模型调用开始。学习者会逐步加入消息、上下文、工具、循环、文件修改、测试和安全边界。最后一课会把全部能力组合成完整的 Authentic Coding AI。

## 课程内容

1. 一次模型调用
2. 消息与角色
3. 代码上下文
4. 工具调用
5. Agent 循环
6. 文件工具
7. 测试闭环
8. 上下文管理
9. 安全边界
10. Authentic Coding AI

每课包含：

- 简短讲解
- 三个新词
- 一道小测
- 可修改代码
- 运行结果
- 学习反馈
- 小节视频

课程进度保存在浏览器本地。

## 隐私边界

本项目只包含原创教学内容和通用技术概念。

本项目不包含任何专有源码、非公开架构、内部链接、私有提交信息或复制片段。

本项目不需要网络权限、密钥、账户数据或后台任务。

## 本地预览

```bash
python3 -m http.server 7413 --bind 127.0.0.1
```

然后打开：

```text
http://127.0.0.1:7413/preview.html
```

预览页会从固定版本的公开 CDN 加载 React。正式 KiroCrew App 使用主程序提供的 React。

## 安装到 KiroCrew

```bash
kirocrew app install /absolute/path/to/authentic-coding-ai-academy
kirocrew app enable authentic-coding-ai-academy
```

安装后刷新页面，从侧边栏打开 `Coding AI Academy`。

## 生成完整教学视频

配音使用 macOS 本机语音。文字不会发送给语音服务。

```bash
cd video
node build-local-narration.mjs
python3 record.py
npm run check
npm run render
npm run voiceovers
```

最终视频位于：

```text
video/renders/authentic-coding-ai-academy.mp4
video/renders/authentic-coding-ai-academy-<language>.mp4
```

生成文件默认不会提交到 Git。

## 验证

```bash
node --check ui/academy.mjs
node --check ui/course-data.mjs
node --check video/build-local-narration.mjs
node --check video/build-all-voiceovers.mjs
python3 -m py_compile video/record.py
cd video && npm run check
```

## 项目结构

```text
app.json
preview.html
ui/
  academy.mjs
  course-data.mjs
  icon.svg
video/
  script.json
  script.<language>.json
  brand.json
  build-local-narration.mjs
  build-all-voiceovers.mjs
  build-english-video.mjs
  capture-screenshots.py
  record.py
  package.json
```
