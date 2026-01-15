# HARRY6 网站内容管理指南

这是一份专门为 HARRY6 艺术网站编写的内容管理指南，适合完全不懂编程的艺术家使用。

---

## 📋 目录

1. [添加新项目](#1-添加新项目)
2. [图片管理](#2-图片管理)
3. [修改项目信息](#3-修改项目信息)
4. [文件命名规范](#4-文件命名规范)
5. [更新导航菜单](#5-更新导航菜单)
6. [测试和发布](#6-测试和发布)

---

## 1. 添加新项目

### 1.1 创建项目文件夹

1. 打开 `projects` 文件夹
2. 创建一个新文件夹，用项目名称命名（用小写字母和连字符）
   - 例如：`my-new-project` 或 `yellow-river`

**路径示例：**
```
C:\Users\31925\Desktop\我的艺术网站\my-art-website-main\my-art-website-main\projects\my-new-project\
```

### 1.2 准备项目图片

1. 在项目文件夹内创建 `assets` 文件夹
2. 将项目的所有图片放入 `assets` 文件夹
3. 图片命名建议：
   - 使用数字序号：`1.jpg`, `2.jpg`, `3.jpg`
   - 或描述性名称：`installation-view-1.jpg`

**文件夹结构：**
```
projects/
  my-new-project/
    assets/
      1.jpg
      2.jpg
      3.jpg
    index.html  ← 复制模板
```

### 1.3 复制项目页面模板

最简单的方法是**复制一个现有项目**，然后修改：

1. 找到现有的项目文件夹（例如 `projects/yellow/`）
2. 复制整个文件夹到你的新项目名称
3. 重命名文件夹
4. 修改 `index.html` 文件（见下一节）

---

## 2. 图片管理

### 2.1 图片格式要求

- **格式**：JPG（推荐）或 PNG
- **大小**：单张图片建议不超过 2MB
- **尺寸**：建议 1920px 宽度或更大
- **命名**：使用小写字母、数字和连字符

### 2.2 图片优化（重要）

如果图片太大，网站加载会很慢。你可以：

**方法 1：在线压缩**
- 访问 https://tinypng.com/
- 上传图片，下载压缩后的版本

**方法 2：使用电脑自带工具**
- Windows：用"画图"工具另存为 JPG
- Mac：用预览工具导出

### 2.3 添加图片到项目

在项目的 `index.html` 文件中找到这行：

```javascript
const images = [
  'assets/1.JPG',
  'assets/3.JPG',
  'assets/8.JPG',
  'assets/9.JPG',
  'assets/16.JPG'
];
```

**添加新图片的步骤：**

1. 将图片放入 `assets/` 文件夹
2. 在 `images = [...]` 列表中添加一行
3. 用引号包裹文件名，用逗号分隔

**示例：**
```javascript
const images = [
  'assets/1.JPG',
  'assets/2.JPG',
  'assets/3.JPG',
  'assets/new-photo.jpg'  ← 新增的图片
];
```

### 2.4 图片顺序

列表中的顺序就是网站上的显示顺序：
- 第一行 = 第一张图片
- 最后一行 = 最后一张图片

---

## 3. 修改项目信息

### 3.1 修改项目标题和年份

打开项目的 `index.html` 文件，找到以下位置：

**位置 1：HTML 页面标题（第 6 行附近）**
```html
<title>Yellow (2021) — HARRY6</title>
```
改成你的项目信息：
```html
<title>我的新项目 (2025) — HARRY6</title>
```

**位置 2：图片 alt 属性（第 366 行附近）**
```html
<img id="currentImage" src="" alt="Yellow (2021)">
```
改成：
```html
<img id="currentImage" src="" alt="我的新项目 (2025)">
```

**位置 3：页面显示的标题和年份（第 370-371 行）**
```html
<div class="title">Yellow</div>
<div class="year">2021</div>
```
改成：
```html
<div class="title">我的新项目</div>
<div class="year">2025</div>
```

### 3.2 修改 About 页面

打开 `about/index.html` 文件，找到：

```html
<p><strong>中文简介：</strong>（你之后把中文简介粘贴在这里）</p>
<p><strong>English Bio:</strong> (Paste your English bio here later.)</p>
```

**修改简历（CV）部分：**

```html
<div class="cv">
  <h2>CV (Selected)</h2>
  <ul>
    <li>2025 - 个展名称，画廊名称，城市</li>
    <li>2024 - 群展名称，美术馆，北京</li>
  </ul>
</div>
```

**每一行的格式：**
```html
<li>年份 - 展览名称，机构名称，城市</li>
```

### 3.3 修改邮箱地址

网站有 3 处需要修改邮箱：

**位置 1：首页 `index.html`（第 397 行）**
```html
<span id="emailCopy" class="emailCopy">your-email@example.com</span>
```

**位置 2：About 页面 `about/index.html`（第 257 行）**
```html
<div class="email">your-email@example.com</div>
```

**位置 3：About 页面第 245 行**
```html
<p>联系方式：your-email@example.com</p>
```

---

## 4. 文件命名规范

### 4.1 项目文件夹命名

- **全部小写字母**
- **用连字符（-）分隔单词**
- **不要用空格或特殊字符**

✅ 好的命名：
- `yellow-river`
- `formless-buddha`
- `digital-strata`

❌ 不好的命名：
- `Yellow River`（有空格）
- `项目_2021`（有中文和下划线）
- `My Project!`（有特殊字符）

### 4.2 图片文件命名

**推荐的命名方式：**

**方式 1：数字序号**
```
1.jpg
2.jpg
3.jpg
```

**方式 2：描述性名称**
```
installation-view-1.jpg
detail-shot.jpg
artist-portrait.jpg
```

**避免的命名：**
- ❌ `IMG_1234.JPG`（无意义）
- ❌ `最终版.jpg`（有中文）
- ❌ `Photo (1).jpg`（有括号和空格）

---

## 5. 更新导航菜单

当你添加新项目后，需要在以下 4 个地方更新导航菜单：

### 5.1 首页导航（index.html）

打开 `index.html`，找到这段代码（第 420-425 行）：

```javascript
const PROJECTS = [
  { title: "Yellow River", year: "2025", href: BASE + "projects/yellow-river/" },
  { title: "Frontispiece", year: "2024", href: BASE + "projects/frontispiece/" },
  { title: "Formless Buddha", year: "2023", href: BASE + "projects/formless-buddha/" },
  { title: "Yellow", year: "2021", href: BASE + "projects/yellow/" }
];
```

**添加新项目：**
```javascript
const PROJECTS = [
  { title: "My New Project", year: "2025", href: BASE + "projects/my-new-project/" },  ← 新增
  { title: "Yellow River", year: "2025", href: BASE + "projects/yellow-river/" },
  { title: "Frontispiece", year: "2024", href: BASE + "projects/frontispiece/" },
  { title: "Formless Buddha", year: "2023", href: BASE + "projects/formless-buddha/" },
  { title: "Yellow", year: "2021", href: BASE + "projects/yellow/" }
];
```

**重要提示：**
- `title`: 项目名称（英文）
- `year`: 项目年份（4位数字）
- `href`: 项目文件夹路径（必须与实际文件夹名一致）
- 每行末尾要有逗号（最后一行除外）

### 5.2 首页全屏菜单（index.html）

在同一文件的第 727-731 行，找到全屏菜单部分：

```html
<h2 class="menuCategoryTitle">PROJECTS</h2>
<a class="menuItem" href="projects/yellow-river/">Yellow River <span class="year">(2025)</span></a>
<a class="menuItem" href="projects/frontispiece/">Frontispiece <span class="year">(2024)</span></a>
<a class="menuItem" href="projects/formless-buddha/">Formless Buddha <span class="year">(2023)</span></a>
<a class="menuItem" href="projects/yellow/">Yellow <span class="year">(2021)</span></a>
```

**添加新项目：**
```html
<h2 class="menuCategoryTitle">PROJECTS</h2>
<a class="menuItem" href="projects/my-new-project/">My New Project <span class="year">(2025)</span></a>  ← 新增
<a class="menuItem" href="projects/yellow-river/">Yellow River <span class="year">(2025)</span></a>
<a class="menuItem" href="projects/frontispiece/">Frontispiece <span class="year">(2024)</span></a>
<a class="menuItem" href="projects/formless-buddha/">Formless Buddha <span class="year">(2023)</span></a>
<a class="menuItem" href="projects/yellow/">Yellow <span class="year">(2021)</span></a>
```

### 5.3 其他项目页面的导航

每个项目的 `index.html` 文件都有相同的导航代码（通常在第 539-544 行）。

**需要在每个项目页面重复 5.1 和 5.2 的步骤。**

**或者使用这个方法：**
- 复制首页更新后的导航代码
- 粘贴到所有项目页面的相同位置

### 5.4 About 页面导航

打开 `about/index.html`，找到第 265-269 行：

```html
<h2 class="menuCategoryTitle">WORKS</h2>
<a class="menuItem" href="../projects/yellow-river/">Yellow River <span class="year">(2025)</span></a>
<a class="menuItem" href="../projects/frontispiece/">Frontispiece <span class="year">(2024)</span></a>
<a class="menuItem" href="../projects/formless-buddha/">Formless Buddha <span class="year">(2023)</span></a>
<a class="menuItem" href="../projects/yellow/">Yellow <span class="year">(2021)</span></a>
```

**添加新项目：**
```html
<h2 class="menuCategoryTitle">WORKS</h2>
<a class="menuItem" href="../projects/my-new-project/">My New Project <span class="year">(2025)</span></a>  ← 新增
<a class="menuItem" href="../projects/yellow-river/">Yellow River <span class="year">(2025)</span></a>
<a class="menuItem" href="../projects/frontispiece/">Frontispiece <span class="year">(2024)</span></a>
<a class="menuItem" href="../projects/formless-buddha/">Formless Buddha <span class="year">(2023)</span></a>
<a class="menuItem" href="../projects/yellow/">Yellow <span class="year">(2021)</span></a>
```

---

## 6. 测试和发布

### 6.1 本地测试

**方法 1：直接打开文件**
1. 找到 `index.html` 文件
2. 双击打开
3. 在浏览器中测试所有链接

**方法 2：使用 VS Code（推荐）**
1. 安装 VS Code
2. 安装 "Live Server" 插件
3. 右键 `index.html` → "Open with Live Server"

**测试清单：**
- [ ] 首页正常显示
- [ ] 所有项目链接可以点击
- [ ] 图片正常加载
- [ ] 移动端菜单正常工作
- [ ] 邮箱复制功能正常
- [ ] About 页面内容正确

### 6.2 发布到 GitHub Pages

**第一步：提交更改**
```bash
# 打开 Git Bash 或终端
cd "C:\Users\31925\Desktop\我的艺术网站\my-art-website-main\my-art-website-main"

# 查看修改了哪些文件
git status

# 添加所有修改的文件
git add .

# 提交更改（用中文写清楚改了什么）
git commit -m "添加新项目：My New Project"

# 推送到 GitHub
git push
```

**第二步：等待部署**
- GitHub Pages 会在 1-5 分钟内自动更新
- 访问你的网站查看更改

**第三步：清除缓存**
如果看不到更新：
- 手机端：关闭浏览器重新打开
- 电脑端：按 `Ctrl + F5` 强制刷新

### 6.3 常见问题

**问题 1：图片不显示**
- 检查图片文件名是否正确（区分大小写）
- 检查图片是否在 `assets/` 文件夹内
- 检查文件路径是否正确

**问题 2：链接打不开**
- 检查项目文件夹名称是否与导航代码中的一致
- 检查文件夹名称是否全部小写
- 检查是否创建了 `index.html` 文件

**问题 3：手机端显示错乱**
- 检查是否修改了 CSS 代码（建议不要修改）
- 检查是否漏掉了某个 `</div>` 标签

---

## 📝 快速参考：代码模板

### 添加单个项目到导航

```javascript
// 在 PROJECTS 数组中添加：
{ title: "项目名称（英文）", year: "年份", href: BASE + "projects/文件夹名称/" },
```

```html
<!-- 在全屏菜单中添加： -->
<a class="menuItem" href="projects/文件夹名称/">项目名称 <span class="year">(年份)</span></a>
```

### 添加单张图片

```javascript
const images = [
  'assets/your-image.jpg'
];
```

### 完整的项目页面结构

```
projects/
  my-project/
    assets/
      1.jpg
      2.jpg
      3.jpg
    index.html
```

---

## ⚠️ 重要提示

### 不要修改的部分

为了不破坏网站设计，请**不要修改**以下内容：

1. **CSS 样式代码**（`<style>` 标签内的内容）
2. **导航逻辑代码**（面板、菜单的 JavaScript）
3. **响应式设计代码**（媒体查询 `@media`）
4. **p5.js 动画代码**

### 只修改这些部分

1. **项目信息**：标题、年份、描述
2. **图片列表**：添加、删除、重新排序
3. **导航菜单**：添加新项目链接
4. **About 页面内容**：简介、简历

### 修改前的备份

**重要：每次修改前，先备份原文件！**

**方法：**
1. 右键文件 → 复制
2. 粘贴，会自动命名为 "文件名 - 副本"
3. 如果修改出错，可以用副本恢复

---

## 🆘 获取帮助

如果遇到问题：

1. **查看错误信息**：浏览器按 F12 打开开发者工具，看是否有红色错误
2. **恢复备份**：用备份的文件覆盖损坏的文件
3. **记录步骤**：写下你做了什么修改，方便找问题

---

## 📊 文件结构总览

```
my-art-website-main/
├── index.html              ← 首页（需要更新导航）
├── about/
│   └── index.html          ← About 页面（需要更新导航）
├── projects/
│   ├── yellow/             ← 示例项目 1
│   │   ├── assets/
│   │   │   ├── 1.jpg
│   │   │   └── 2.jpg
│   │   └── index.html
│   ├── yellow-river/       ← 示例项目 2
│   │   ├── assets/
│   │   └── index.html
│   └── my-new-project/     ← 你的新项目
│       ├── assets/
│       │   ├── 1.jpg
│       │   └── 2.jpg
│       └── index.html      ← 复制模板并修改
└── docs/
    └── CONTENT_MANAGEMENT.md  ← 本文件
```

---

**最后更新：2025年1月**

**适用于：HARRY6 艺术网站 v1.9.5**
