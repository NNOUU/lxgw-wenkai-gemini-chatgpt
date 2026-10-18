# 霞鹜文楷 for Gemini & ChatGPT (Chrome Extension)

![Manifest V3](https://img.shields.io/badge/Chrome_Extension-Manifest_V3-blue)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

一款轻量的 Chrome 浏览器扩展（Manifest V3），将 **Google Gemini (`gemini.google.com`)** 与 **OpenAI ChatGPT (`chatgpt.com` / `chat.openai.com`)** 网页端的文本字体修改为开源中文字体 **「霞鹜文楷 (LXGW WenKai)」**，且严格限制仅对这两个网页端生效。

## 核心特性

- **严格站点隔离**：仅在 `https://gemini.google.com/*`、`https://chatgpt.com/*` 与 `https://chat.openai.com/*` 注入样式，不申请 `<all_urls>` 全局权限，绝不干扰其他任何网站。
- **保护网页图标与数学公式**：精准排除 Google Gemini 的 `Google Symbols` / `Material Symbols` 连字与私用区（PUA）图标字体，以及 `KaTeX` / `MathJax` 数学公式容器，防止网页按钮图标出现乱码或公式排版错位。
- **抗 React 水合（Hydration）重置**：内置 `MutationObserver` 守护机制，解决 ChatGPT (Next.js / React SSR) 首屏水合与路由切换时清空根节点属性导致样式失效的问题。
- **单字重屏幕阅读版加粗与斜体增强**：针对《霞鹜文楷屏幕阅读版》仅含单一 `Regular (400)` 字重的特点，自动将 `strong`、`b`、表头 `th` 与标题 `h1`–`h6` 提升至 `700` 字重，并提供 **「标准增强 / 强力加粗 / 原生合成」** 三档矢量描边加粗切换与斜体合成支持。
- **内置本地字体检测器**：点击插件图标即可在弹窗中实时检测浏览器是否已成功识别系统本地安装的霞鹜文楷字体。

## 前置准备：安装本地「霞鹜文楷」字体

由于 Gemini 与 ChatGPT 网页端均启用了严格的 `Content-Security-Policy (CSP)` 策略拦截外部 CDN 字体，请先在电脑本地安装霞鹜文楷字体文件：

1. 前往 [霞鹜文楷屏幕阅读版 Releases (`lxgw/LxgwWenKai-Screen`)](https://github.com/lxgw/LxgwWenKai-Screen/releases) 下载最新字体：
   - **正文字体（推荐）**：`LXGWWenKaiGBScreen.ttf`（陆标规范字形，内置 Roboto 英文打底）或 `LXGWWenKaiScreen.ttf`
   - **代码块等宽字体（推荐搭配）**：`LXGWWenKaiMonoGBScreen.ttf`（内置 Inconsolata 等宽打底）或 `LXGWWenKaiMonoScreen.ttf`
   - *注：本插件同样兼容 [霞鹜文楷原版 (`lxgw/LxgwWenKai`)](https://github.com/lxgw/LxgwWenkai) 全系列字体。*
2. **Windows 用户注意**：请**右键点击 `.ttf` 字体文件 → 选择「为所有用户安装 (Install for all users)」**。
3. 安装完成后，在 Chrome 地址栏输入 `chrome://restart` 并回车，重启浏览器以刷新系统字体缓存。

## 安装插件

1. 下载本仓库源码（点击 `Code` -> `Download ZIP` 并解压到本地固定文件夹，或使用 `git clone` 克隆仓库）。
2. 打开 Chrome 浏览器，在地址栏输入 `chrome://extensions/` 并回车。
3. 开启页面右上角的 **「开发者模式 (Developer mode)」**。
4. 点击页面左上角的 **「加载已解压的扩展程序 (Load unpacked)」**，选择本项目文件夹（即包含 `manifest.json` 的目录）。
5. 打开 [Google Gemini](https://gemini.google.com/) 或 [ChatGPT](https://chatgpt.com/)，点击浏览器工具栏上的插件图标，即可实时开关字体或切换粗体加粗强度。

## 目录结构

```text
lxgw-wenkai-gemini-chatgpt/
├── icons/                  # 插件各尺寸图标 (16x16, 32x32, 48x48, 128x128)
├── manifest.json           # Chrome Extension Manifest V3 配置文件
├── styles.css              # 核心字体栈、粗体/斜体增强与图标隔离样式表
├── content.js              # 域名校验、属性同步与 MutationObserver 守护脚本
├── popup.html              # 插件弹窗界面（支持深浅色模式自适应）
├── popup.js                # 本地字体检测器与配置实时同步逻辑
├── LICENSE                 # MIT 开源许可证
└── README.md               # 项目说明文档
```

## 致谢与开源许可

- 本扩展源码采用 [MIT License](./LICENSE) 开源。
- 字体致谢：[落霞孤鹜 (LXGW)](https://github.com/lxgw) 开发的开源中文字体 [霞鹜文楷 (LXGW WenKai)](https://github.com/lxgw/LxgwWenkai) 与 [霞鹜文楷屏幕阅读版 (LXGW WenKai Screen)](https://github.com/lxgw/LxgwWenKai-Screen)（字体本身遵循 SIL Open Font License 1.1）。
