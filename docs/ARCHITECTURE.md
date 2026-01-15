# HARRY6 艺术网站架构文档

> 当代艺术家个人网站技术架构
> 版本: 1.9.5
> 最后更新: 2025-01-15
> 作者: Claude Code

---

## 目录

1. [文件结构总览](#1-文件结构总览)
2. [导航系统架构](#2-导航系统架构)
3. [响应式设计策略](#3-响应式设计策略)
4. [JavaScript 模块组织](#4-javascript-模块组织)
5. [p5.js 集成](#5-p5js-集成)
6. [核心设计模式](#6-核心设计模式)
7. [技术栈](#7-技术栈)
8. [性能优化策略](#8-性能优化策略)

---

## 1. 文件结构总览

### 1.1 项目根目录结构

```
my-art-website-main/
├── index.html              # 首页（p5.js 互动封面 + 导航系统）
├── sketch.js              # 首页 p5.js 动画脚本（独立文件版本）
├── style.css              # 共享样式表（部分使用）
├── p5.js                  # p5.js 库文件（本地备份）
├── p5.sound.min.js        # p5.sound 音频库（本地备份）
├── README.md              # 项目说明文档
├── CLAUDE.md              # AI 协作规则（最高优先级）
├── CHANGELOG.md           # 更新日志
├── TODO.md                # 待办事项
│
├── about/                 # 关于页面
│   └── index.html         # 艺术家简介、CV、联系方式
│
├── projects/              # 作品集页面
│   ├── yellow/            # Yellow (2021) 项目
│   │   ├── index.html     # 项目画廊页面
│   │   └── assets/        # 项目图片资源
│   │       ├── 1.jpg
│   │       ├── 3.jpg
│   │       └── ...
│   │
│   ├── yellow-river/      # Yellow River (2025) 项目
│   ├── frontispiece/      # Frontispiece (2024) 项目
│   ├── formless-buddha/   # Formless Buddha (2023) 项目
│   │
│   └── digital-strata/    # Digital Strata p5.js 项目
│       ├── index.html     # p5.js 项目页面
│       ├── sketch.js      # p5.js 故障艺术动画
│       ├── style.css      # 项目专用样式
│       ├── p5.js          # p5.js 库
│       ├── p5.sound.min.js
│       └── LWH_8128.JPG   # 项目素材图片
│
├── images/                # 图片分类页面（预留）
│   └── yellow-river/
│       └── index.html     # 图片画廊
│
├── assets/                # 全局共享资源
│   └── style.css          # 备用样式文件
│
├── p5/                    # p5.js 库备份目录
│   ├── p5.js
│   └── p5.sound.min.js
│
└── docs/                  # 技术文档目录
    ├── ARCHITECTURE.md    # 本文档（架构文档）
    ├── DESIGN_SYSTEM.md   # 设计系统规范
    ├── CONTENT_MANAGEMENT.md  # 内容管理指南
    └── USER_GUIDE.md      # 用户使用指南
```

### 1.2 各目录功能说明

#### **根目录 (`/`)**
- **`index.html`**: 网站首页，包含 p5.js 互动封面动画、导航系统、全屏菜单
- **`sketch.js`**: 首页使用的独立 p5.js 动画脚本（粒子系统动画）
- **`style.css`**: 全局共享样式表（当前版本主要使用内联样式）
- **`README.md`**: 项目说明文档，包含本地运行指南
- **`CLAUDE.md`**: AI 协作规则文档，定义代码修改的最高优先级规则

#### **`about/` - 关于页面**
- **`index.html`**: 艺术家个人简介页面
- 采用 Grid 布局：左侧照片占位 + 右侧文字内容
- 包含 CV（简历）和邮箱联系方式
- 具有全屏菜单导航系统

#### **`projects/` - 作品集目录**
每个子目录代表一个艺术项目，包含：

- **`index.html`**: 项目展示页面
  - 图片画廊功能（前后导航、圆点导航、触摸滑动）
  - 作品信息展示（标题、年份）
  - 完整的导航系统（左侧导航 + 全屏菜单）

- **`assets/`**: 项目图片文件夹
  - 存放该项目的所有作品图片
  - 建议使用数字命名（1.jpg, 2.jpg）或描述性命名

**现有项目**:
1. `yellow/` - Yellow (2021) 项目
2. `yellow-river/` - Yellow River (2025) 项目
3. `frontispiece/` - Frontispiece (2024) 项目
4. `formless-buddha/` - Formless Buddha (2023) 项目
5. `digital-strata/` - Digital Strata p5.js 互动项目

#### **`images/` - 图片分类目录**
- 用于按主题分类展示图片（区别于 projects 按项目展示）
- 结构与 projects 类似

#### **`docs/` - 技术文档目录**
- **`ARCHITECTURE.md`**: 本文档，详细说明技术架构
- **`DESIGN_SYSTEM.md`**: 设计系统规范（颜色、字体、组件）
- **`CONTENT_MANAGEMENT.md`**: 内容管理指南（如何添加项目、图片）
- **`USER_GUIDE.md`**: 用户使用指南

---

## 2. 导航系统架构

### 2.1 导航系统概述

HARRY6 网站采用**三层导航架构**：

1. **左侧悬浮导航** (Desktop-only, v1.9.5 之前)
2. **全屏菜单** (全平台统一, v1.9.5 起)
3. **悬浮面板** (Hover Panel, 用于展开子菜单)

**设计原则**:
- 极简主义：导航不抢占视觉焦点
- 意向性交互：快速、干脆、无延迟
- 展览空间感：保持充足留白

### 2.2 导航系统组件

#### **2.2.1 品牌 Logo (.brand)**

**位置**: 左上角固定定位

```css
.brand {
  position: fixed;
  top: 44px;           /* 桌面端 */
  left: var(--leftPad);  /* 56px (桌面) / 22px (移动) */
  z-index: 1000;
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(255,255,255,0.85);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

**功能**:
- 点击返回首页 (`href="/"`)
- 半透明背景确保在 p5.js 动画上可读
- 圆角胶囊形状 (border-radius: 999px)

#### **2.2.2 左侧导航按钮 (.nav)**

**位置**: 左侧垂直居中

```html
<nav class="nav" aria-label="Primary">
  <div class="navItem" data-menu="projects">
    <button class="navBtn" type="button">PROJECTS</button>
  </div>
  <div class="navItem" data-menu="images">
    <button class="navBtn" type="button">IMAGES</button>
  </div>
  <div class="navItem" data-menu="about">
    <button class="navBtn" type="button">ABOUT</button>
  </div>
</nav>
```

**CSS 定位**:
```css
.nav {
  position: fixed;
  left: var(--leftPad);
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
}
```

**响应式行为**:
- **桌面端 (>1024px)**: 隐藏，使用全屏菜单替代
- **iPad (768-1024px)**: 隐藏，使用全屏菜单替代
- **手机 (<768px)**: 隐藏，使用全屏菜单替代

#### **2.2.3 菜单切换按钮 (.menuToggle)**

**位置**: 右上角固定定位

```html
<button class="menuToggle" id="menuToggle" aria-label="Menu">
  <svg viewBox="0 0 24 24">
    <path d="M3 12h18M3 6h18M3 18h18"/>
  </svg>
</button>
```

**功能**: 打开/关闭全屏菜单

**CSS**:
```css
.menuToggle {
  position: fixed;
  top: 44px;          /* 桌面端 22px (移动端) */
  right: 22px;
  width: 44px;
  height: 44px;
  background: rgba(255,255,255,0.85);
  border-radius: 999px;
}
```

#### **2.2.4 悬浮面板 (.panel)**

**位置**: 动态计算，位于导航按钮右侧

**功能**:
- PROJECTS / IMAGES 按钮悬停时展开
- 显示项目列表链接
- 点击外部或 ESC 键关闭

**CSS**:
```css
.panel {
  position: fixed;
  width: var(--panelW);  /* 360px */
  max-width: calc(100vw - 24px);
  background: #fff;
  border: 1px solid var(--line);
  padding: var(--panelPad);  /* 18px */
  z-index: 1001;

  opacity: 0;
  pointer-events: none;
  transform: translateY(-8px);
  transition: opacity .14s ease, transform .14s ease;
}

.panel.is-open {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}
```

**关键特性**:
- 向上 8px 初始位移，展开时回弹
- 左侧 18px 透明扩展区 (::before 伪元素) 保持 hover 状态
- 快速过渡 (.14s) 响应迅速

#### **2.2.5 全屏菜单 (.fullscreenMenu)**

**位置**: 覆盖整个视口

```html
<div class="fullscreenMenu" id="fullscreenMenu">
  <button class="menuCloseBtn" id="menuCloseBtn">&times;</button>

  <h2 class="menuCategoryTitle">PROJECTS</h2>
  <a class="menuItem" href="projects/yellow-river/">Yellow River <span class="year">(2025)</span></a>
  <!-- 更多项目链接... -->

  <h2 class="menuCategoryTitle">IMAGES</h2>
  <!-- 图片链接... -->

  <h2 class="menuCategoryTitle">ABOUT</h2>
  <a class="menuItem" href="about/">About</a>
</div>
```

**CSS**:
```css
.fullscreenMenu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  z-index: 2000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  overflow-y: auto;
  padding: 80px 32px 32px;
}

.fullscreenMenu.is-open {
  opacity: 1;
  pointer-events: auto;
}
```

**交互逻辑**:
1. 点击 menuToggle 按钮 → 添加 `is-open` 类
2. 打开时禁用背景滚动 (`document.body.style.overflow = 'hidden'`)
3. 点击关闭按钮、菜单外部、或链接后关闭
4. 恢复背景滚动

### 2.3 导航系统 JavaScript 架构

#### **2.3.1 设备检测**

```javascript
// 触摸设备检测
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// iPad 特殊检测（屏幕宽度 768-1024px）
const isIPad = window.innerWidth >= 768 && window.innerWidth <= 1024;

// 添加触摸设备标识
if (isTouchDevice) {
  document.body.classList.add('is-touch-device');
}
```

**用途**:
- 区分桌面端和移动端交互模式
- iPad 使用 click 事件（更可靠），手机使用 touchstart
- 控制提示文本显示（"移动鼠标" vs "按住左右滑动"）

#### **2.3.2 路径处理 (BASE URL)**

```javascript
// 自动检测 GitHub Pages 仓库名
const REPO = location.pathname.split("/")[1];
const BASE = REPO ? `/${REPO}/` : "/";

// 设置品牌链接
document.getElementById("homeLink").setAttribute("href", BASE);
```

**功能**:
- 支持本地开发 (`BASE = "/"`)
- 支持 GitHub Pages 部署 (`BASE = "/repo-name/"`)
- 动态生成所有导航链接

#### **2.3.3 导航数据结构**

```javascript
// 项目列表
const PROJECTS = [
  { title: "Yellow River", year: "2025", href: BASE + "projects/yellow-river/" },
  { title: "Frontispiece", year: "2024", href: BASE + "projects/frontispiece/" },
  { title: "Formless Buddha", year: "2023", href: BASE + "projects/formless-buddha/" },
  { title: "Yellow", year: "2021", href: BASE + "projects/yellow/" }
];

// 图片分类列表
const IMAGES = [
  { title: "Yellow River", year: "2025", href: BASE + "images/yellow-river/" }
];

// About 页面链接
const ABOUT_HREF = BASE + "about/";
```

#### **2.3.4 面板控制逻辑**

**核心函数**:

```javascript
// 打开面板
function openPanelFor(key, btn) {
  clearTimeout(closeTimer);
  activeKey = key;
  setActiveButton(key);

  // 渲染对应列表
  if(key === "projects") renderList(PROJECTS);
  if(key === "images") renderList(IMAGES);

  panel.classList.add("is-open");
  panel.setAttribute("aria-hidden","false");
  requestAnimationFrame(() => positionPanelNearButton(btn));
}

// 关闭面板
function closePanel() {
  activeKey = null;
  btns.forEach(b => b.classList.remove("is-active"));
  panel.classList.remove("is-open");
  panel.setAttribute("aria-hidden","true");
}

// 延迟关闭（防止鼠标滑出时立即关闭）
function scheduleClose() {
  clearTimeout(closeTimer);
  closeTimer = setTimeout(closePanel, 220);
}

// 定位面板到按钮附近
function positionPanelNearButton(btn) {
  const r = btn.getBoundingClientRect();
  const gap = 14;
  let left = Math.round(r.right + gap);
  let top = Math.round(r.top + r.height/2);

  panel.style.top = `${top}px`;
  panel.style.transform = "translateY(-50%)";

  // 防止超出屏幕右侧
  const panelWidth = Math.min(panel.offsetWidth || 360, window.innerWidth - 24);
  if(left + panelWidth + 12 > window.innerWidth){
    left = Math.round(r.left - gap - panelWidth);
  }
  left = Math.max(12, left);
  panel.style.left = `${left}px`;
}
```

**事件绑定**:

```javascript
// 桌面端和 iPad：hover 效果
if((!isTouchDevice || isIPad) && (key === "projects" || key === "images")){
  item.addEventListener("mouseenter", () => openPanelFor(key, btn));
  item.addEventListener("mouseleave", scheduleClose);
}

// iPad 和桌面端：使用 click（更可靠）
if(isIPad || !isTouchDevice){
  btn.addEventListener("click", (e) => {
    if(key === "about"){
      window.location.href = ABOUT_HREF;
      e.preventDefault();
      return;
    }
    if(panel.classList.contains("is-open") && activeKey === key){
      closePanel();
    }else{
      openPanelFor(key, btn);
    }
    e.preventDefault();
  });
}else{
  // 手机端：使用 touchstart
  btn.addEventListener("touchstart", (e) => {
    if(key === "about"){
      window.location.href = ABOUT_HREF;
      return;
    }
    if(panel.classList.contains("is-open") && activeKey === key){
      closePanel();
    }else{
      openPanelFor(key, btn);
    }
  }, {passive: true});
}

// 面板 hover 保持打开
if(!isTouchDevice || isIPad){
  panel.addEventListener("mouseenter", () => clearTimeout(closeTimer));
  panel.addEventListener("mouseleave", scheduleClose);
}
```

#### **2.3.5 全屏菜单控制**

```javascript
const menuToggle = document.getElementById('menuToggle');
const fullscreenMenu = document.getElementById('fullscreenMenu');
const menuCloseBtn = document.getElementById('menuCloseBtn');

// 打开菜单
menuToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  fullscreenMenu.classList.add('is-open');
  document.body.style.overflow = 'hidden';  // 禁止背景滚动
});

// 关闭按钮
menuCloseBtn.addEventListener('click', () => {
  fullscreenMenu.classList.remove('is-open');
  document.body.style.overflow = '';
});

// 点击菜单外部关闭
fullscreenMenu.addEventListener('click', (e) => {
  if(e.target === fullscreenMenu){
    fullscreenMenu.classList.remove('is-open');
    document.body.style.overflow = '';
  }
});
```

---

## 3. 响应式设计策略

### 3.1 断点系统

| 断点 | 设备类型 | 屏幕宽度 | 关键调整 |
|------|----------|----------|----------|
| **Desktop** | 桌面电脑 | > 1024px | 全屏菜单，左侧隐藏，--leftPad: 56px |
| **iPad** | 平板设备 | 768px - 1024px | 全屏菜单，图片高度 25vh，底部导航 100px |
| **Mobile** | 手机 | < 768px | 全屏菜单，图片高度 50vh，底部导航 70px |

### 3.2 CSS 变量响应式

```css
:root {
  --text: #111;
  --muted: rgba(0,0,0,.48);
  --line: rgba(0,0,0,.10);
  --leftPad: 56px;      /* 桌面端 */
  --panelW: 360px;
  --panelPad: 18px;
}

/* 移动端和 iPad */
@media (max-width: 1024px) {
  :root {
    --leftPad: 22px;    /* 移动端 */
    --panelW: 320px;
  }
}
```

### 3.3 品牌按钮响应式

```css
.brand {
  top: 44px;            /* 桌面端 */
  left: var(--leftPad);
}

@media (max-width: 1024px) {
  .brand {
    top: 22px;          /* 移动端 */
  }
}
```

### 3.4 作品展示响应式

#### **桌面端 (>1024px)**
```css
.imageContainer {
  max-width: 70vw;
  max-height: 50vh;
}

.bottomNav {
  bottom: 48px;
}
```

#### **iPad (768-1024px)**
```css
@media (min-width: 768px) and (max-width: 1024px) {
  .gallery {
    padding-top: 8vh;
    padding-bottom: 220px;
  }

  .imageContainer {
    max-height: 25vh;   /* 降低高度避免遮挡 */
  }

  .bottomNav {
    bottom: 100px;      /* 抬高避免 Tab 栏遮挡 */
  }
}
```

#### **手机端 (<768px)**
```css
@media (max-width: 767px) {
  .gallery {
    align-items: center;
    padding-top: 0;
  }

  .imageContainer {
    max-width: 85vw;
    max-height: 50vh;
  }

  .bottomNav {
    bottom: 70px;       /* 为移动浏览器 Tab 栏留空间 */
    gap: 16px;
  }

  .navArrow svg {
    width: 16px;
    height: 16px;
  }

  .dot {
    width: 5px;
    height: 5px;
  }
}
```

### 3.5 About 页面响应式

#### **桌面端 (>860px)**
```css
.wrap {
  display: grid;
  grid-template-columns: 1fr 1.2fr;  /* 两列布局 */
  gap: 40px;
  padding: 120px max(6vw, 56px) 80px;
}
```

#### **移动端 (≤860px)**
```css
@media (max-width: 860px) {
  :root {
    --leftPad: 22px;
  }

  .brand {
    top: 22px;
  }

  .wrap {
    grid-template-columns: 1fr;  /* 单列布局 */
    padding: 96px 22px 70px;
  }
}
```

### 3.6 触摸设备优化

#### **提示文本切换**
```html
<div class="hint desktop-hint">移动鼠标 · 互动</div>
<div class="hint touch-hint">按住左右滑动 · 互动</div>
```

```css
/* 默认：触摸设备提示 */
.touch-hint {
  display: block;
}

/* 非触摸设备：隐藏触摸提示，显示电脑端提示 */
body:not(.is-touch-device) .touch-hint {
  display: none;
}
body:not(.is-touch-device) .desktop-hint {
  display: block;
}

/* 触摸设备：显示滑动提示，隐藏电脑端提示 */
body.is-touch-device .desktop-hint {
  display: none;
}
```

#### **面板动画优化**
```css
/* 触摸设备：优化面板动画，减少闪烁 */
body.is-touch-device .panel {
  transition: opacity .10s ease, transform .10s ease;
}
```

---

## 4. JavaScript 模块组织

### 4.1 模块化策略

HARRY6 网站采用**内联模块化**策略：

- 每个 HTML 文件包含内联 `<script>` 标签
- 按功能划分为独立的代码块
- 通过注释分隔不同模块

**优点**:
- 无需构建工具，直接部署
- 每个页面独立，易于维护
- 适合静态网站托管（GitHub Pages）

**缺点**:
- 代码复用需要手动复制
- 无法使用 ES6 模块导入导出

### 4.2 JavaScript 模块划分

#### **4.2.1 导航和面板逻辑模块**

**位置**: `index.html` 第 405-589 行

**职责**:
- 设备检测（触摸设备、iPad）
- 路径处理（BASE URL 计算）
- 导航数据定义（PROJECTS、IMAGES）
- 面板开关控制
- 面板定位逻辑
- 事件绑定（hover、click、touchstart）
- 外部点击关闭
- ESC 键关闭

**关键变量**:
```javascript
let activeKey = null;      // 当前打开的面板 key
let closeTimer = null;     // 延迟关闭定时器
```

#### **4.2.2 邮箱复制模块**

**位置**: `index.html` 第 567-589 行

**职责**:
- 点击邮箱地址复制到剪贴板
- 显示 "COPIED" 提示
- 900ms 后自动隐藏提示

**关键函数**:
```javascript
async function copyEmail(){
  const text = emailEl.textContent.trim();
  try{
    await navigator.clipboard.writeText(text);
  }catch(err){
    // 降级方案：使用 execCommand
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>toast.classList.remove("show"), 900);
}
```

#### **4.2.3 p5.js 动画模块**

**位置**: `index.html` 第 592-721 行

**职责**:
- 等待页面完全加载
- 创建 p5.js 实例
- Digital Strata 故障艺术动画
- 图片加载和 resize
- 触摸交互支持

**关键代码**:
```javascript
window.addEventListener('load', function() {
  new p5(function(p) {
    let img;
    let originalImg;
    let smoothPresence = 0.0;

    p.preload = function() {
      originalImg = p.loadImage("LWH_8128.JPG");
    };

    p.setup = function() {
      // 计算尺寸，保持 2:3 比例
      let availableHeight = p.windowHeight - 150;
      let availableWidth = p.windowWidth - 100;
      let h = Math.floor(availableHeight * 0.85);
      let w = Math.floor(h * 2 / 3);

      if (w > availableWidth) {
        w = Math.floor(availableWidth * 0.9);
        h = Math.floor(w * 3 / 2);
      }

      w = Math.min(w, 500);
      h = Math.min(h, 750);

      let cnv = p.createCanvas(w, h);
      cnv.parent("stage");
      p.pixelDensity(1);
      p.frameRate(60);

      if (originalImg) {
        img = originalImg.get();
        img.resize(p.width, p.height);
      }
    };

    p.draw = function() {
      // 检测设备类型 - 支持触摸
      let pointerX = p.mouseX;
      if (p.touches.length > 0) {
        pointerX = p.touches[0].x;
      }

      let distFromCenter = p.abs(p.width / 2 - pointerX);
      let distFactor = p.map(distFromCenter, 0, p.width / 2, 1.0, 0.0);
      smoothPresence = p.lerp(smoothPresence, distFactor, 0.03);

      let glitchIntensity = 1.0 - smoothPresence;

      // 底图控制（冻结效果）
      if (smoothPresence > 0.05 && img) {
        p.tint(255, smoothPresence * 255);
        p.image(img, 0, 0);
        p.noTint();
      }

      // 横向拉伸故障效果
      let count = Math.floor(p.map(glitchIntensity, 0, 1, 0, 40));

      for (let i = 0; i < count; i++) {
        let y = Math.floor(p.random(p.height));
        let h = Math.floor(p.random(2, 15));
        let x = Math.floor(p.width / 2 + p.random(-50, 50));
        let w = Math.floor(p.random(1, 3));

        p.copy(img, x, y, w, h, 0, y, p.width, h);
      }

      // 局部修复
      if (smoothPresence > 0.2) {
        let restoreCount = Math.floor(p.map(smoothPresence, 0, 1, 0, 200));
        for (let i = 0; i < restoreCount; i++) {
          let x = Math.floor(p.random(p.width));
          let y = Math.floor(p.random(p.height));
          let w = Math.floor(p.random(20, 100));
          let h = Math.floor(p.random(2, 5));
          p.copy(img, x, y, w, h, x, y, w, h);
        }
      }
    };

    p.windowResized = function() {
      // 重新计算尺寸并 resize
      // ...
    };

    p.touchStarted = function() {
      if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
        return false;
      }
      return true;
    };
  });
});
```

#### **4.2.4 全屏菜单控制模块**

**位置**: `index.html` 第 740-782 行

**职责**:
- 动态设置 BASE 路径
- 动态设置菜单链接
- 打开/关闭菜单
- 禁用/恢复背景滚动

**关键代码**:
```javascript
const menuToggle = document.getElementById('menuToggle');
const fullscreenMenu = document.getElementById('fullscreenMenu');
const menuCloseBtn = document.getElementById('menuCloseBtn');

if(menuToggle && fullscreenMenu){
  // 动态设置 BASE 路径
  const REPO = location.pathname.split("/")[1];
  const BASE = REPO ? `/${REPO}/` : "/";

  // 动态设置菜单链接
  const menuItems = fullscreenMenu.querySelectorAll('.menuItem');
  menuItems.forEach(item => {
    const currentHref = item.getAttribute('href');
    if (currentHref && !currentHref.startsWith('/')) {
      item.setAttribute('href', BASE + currentHref);
    }
  });

  // 打开菜单
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    fullscreenMenu.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });

  // 关闭按钮
  menuCloseBtn.addEventListener('click', () => {
    fullscreenMenu.classList.remove('is-open');
    document.body.style.overflow = '';
  });

  // 点击菜单外部关闭
  fullscreenMenu.addEventListener('click', (e) => {
    if(e.target === fullscreenMenu){
      fullscreenMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });
}
```

#### **4.2.5 图片画廊模块**

**位置**: `projects/yellow/index.html` 第 393-530 行

**职责**:
- 图片列表定义
- 图片预加载
- 圆点导航生成
- 前后导航
- 触摸滑动支持
- 键盘导航

**关键函数**:
```javascript
// 图片列表
const images = [
  'assets/1.JPG',
  'assets/3.JPG',
  'assets/8.JPG',
  'assets/9.JPG',
  'assets/16.JPG'
];

let currentIndex = 0;

// 预加载所有图片到缓存
function preloadImages() {
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// 跳转到指定图片
function goToImage(index) {
  currentIndex = index;
  showImage(currentIndex);
  updateDots();
}

// 显示当前图片
function showImage(index) {
  imgElement.src = images[index];
  imgElement.classList.remove('active');
  requestAnimationFrame(() => {
    imgElement.classList.add('active');
  });
}

// 前一张
function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
  updateDots();
}

// 下一张
function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
  updateDots();
}

// 触摸滑动支持
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, {passive: true});

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, {passive: true});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if(Math.abs(diff) > swipeThreshold) {
    if(diff > 0) {
      showNext();
    } else {
      showPrev();
    }
  }
}

// 键盘导航
document.addEventListener('keydown', (e) => {
  if(e.key === 'ArrowLeft') showPrev();
  if(e.key === 'ArrowRight') showNext();
});
```

### 4.3 事件处理模式

#### **4.3.1 防抖和节流**

```javascript
// 延迟关闭面板（防抖）
let closeTimer = null;

function scheduleClose() {
  clearTimeout(closeTimer);
  closeTimer = setTimeout(closePanel, 220);
}

// 鼠标进入面板时取消关闭
panel.addEventListener('mouseenter', () => clearTimeout(closeTimer));
```

#### **4.3.2 被动事件监听器**

```javascript
// 触摸事件使用 passive: true 提升性能
btn.addEventListener("touchstart", (e) => {
  // ...
}, {passive: true});

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, {passive: true});
```

#### **4.3.3 事件委托**

```javascript
// 使用事件委托减少监听器数量
dotsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('dot')) {
    const index = Array.from(dotsContainer.children).indexOf(e.target);
    goToImage(index);
  }
});
```

---

## 5. p5.js 集成

### 5.1 p5.js 概述

**p5.js** 是一个用于创意编程的 JavaScript 库，专为艺术家和设计师设计。

**HARRY6 网站使用 p5.js 的场景**:
1. **首页封面动画**: Digital Strata 故障艺术（鼠标交互）
2. **Digital Strata 项目**: 独立的 p5.js 互动艺术作品

### 5.2 p5.js 加载方式

#### **CDN 加载（推荐）**

```html
<script src="https://cdn.jsdelivr.net/npm/p5@1.11.11/lib/p5.js"></script>
```

**优点**:
- 自动缓存，多网站共享
- 版本管理方便
- 减少项目体积

#### **本地备份**

```html
<script src="p5.js"></script>
```

**用途**: CDN 不可用时的降级方案

### 5.3 p5.js 实例模式

HARRY6 网站使用**实例模式**（Instance Mode）创建 p5.js：

```javascript
new p5(function(p) {
  // p5.js 代码
  p.setup = function() {
    p.createCanvas(400, 400);
  };

  p.draw = function() {
    p.background(220);
  };
});
```

**优点**:
- 避免全局命名空间污染
- 可以创建多个独立的 p5 实例
- 更好的代码组织

### 5.4 Digital Strata 故障艺术动画

#### **5.4.1 动画原理**

Digital Strata 是一个**基于鼠标位置的图像故障效果**：

- **鼠标在中心**: 图像清晰、稳定
- **鼠标远离中心**: 图像出现横向拉伸故障
- **鼠标逐渐移向中心**: 图像逐渐修复

#### **5.4.2 核心算法**

```javascript
// 计算鼠标距离中心的距离
let distFromCenter = p.abs(p.width / 2 - pointerX);
let distFactor = p.map(distFromCenter, 0, p.width / 2, 1.0, 0.0);

// 平滑过渡（lerp）
smoothPresence = p.lerp(smoothPresence, distFactor, 0.03);

// 故障强度（与 smoothPresence 成反比）
let glitchIntensity = 1.0 - smoothPresence;
```

**参数说明**:
- `distFromCenter`: 鼠标距离中心的像素距离
- `distFactor`: 归一化距离（0.0 - 1.0）
  - 1.0 = 鼠标在中心
  - 0.0 = 鼠标在边缘
- `smoothPresence`: 平滑过渡值，避免突变
- `glitchIntensity`: 故障强度
  - 0.0 = 无故障
  - 1.0 = 最大故障

#### **5.4.3 故障效果实现**

**横向拉伸故障**:
```javascript
let count = Math.floor(p.map(glitchIntensity, 0, 1, 0, 40));

for (let i = 0; i < count; i++) {
  let y = Math.floor(p.random(p.height));      // 随机 Y 坐标
  let h = Math.floor(p.random(2, 15));         // 随机高度
  let x = Math.floor(p.width / 2 + p.random(-50, 50));  // 中心附近随机 X
  let w = Math.floor(p.random(1, 3));          // 随机宽度（1-3px）

  // 复制 1-3px 宽的区域，拉伸到整个宽度
  p.copy(img, x, y, w, h, 0, y, p.width, h);
}
```

**局部修复**:
```javascript
if (smoothPresence > 0.2) {
  let restoreCount = Math.floor(p.map(smoothPresence, 0, 1, 0, 200));
  for (let i = 0; i < restoreCount; i++) {
    let x = Math.floor(p.random(p.width));
    let y = Math.floor(p.random(p.height));
    let w = Math.floor(p.random(20, 100));
    let h = Math.floor(p.random(2, 5));
    p.copy(img, x, y, w, h, x, y, w, h);
  }
}
```

#### **5.4.4 触摸支持**

```javascript
p.draw = function() {
  // 检测设备类型 - 支持触摸
  let pointerX = p.mouseX;
  if (p.touches.length > 0) {
    pointerX = p.touches[0].x;
  }

  // 使用 pointerX 计算故障效果
  // ...
};
```

#### **5.4.5 响应式画布**

```javascript
p.setup = function() {
  // 根据屏幕大小计算尺寸，保持 2:3 比例
  let availableHeight = p.windowHeight - 150;
  let availableWidth = p.windowWidth - 100;

  let h = Math.floor(availableHeight * 0.85);
  let w = Math.floor(h * 2 / 3);

  if (w > availableWidth) {
    w = Math.floor(availableWidth * 0.9);
    h = Math.floor(w * 3 / 2);
  }

  w = Math.min(w, 500);
  h = Math.min(h, 750);

  let cnv = p.createCanvas(w, h);
  cnv.parent("stage");
  p.pixelDensity(1);
  p.frameRate(60);

  if (originalImg) {
    img = originalImg.get();
    img.resize(p.width, p.height);
  }
};

p.windowResized = function() {
  // 重新计算尺寸
  // ...

  p.resizeCanvas(w, h);

  // 从原始图片创建副本并 resize，避免质量损失
  if (originalImg) {
    img = originalImg.get();
    img.resize(p.width, p.height);
  }
};
```

### 5.5 独立的 p5.js 项目 (Digital Strata)

**位置**: `projects/digital-strata/`

**文件结构**:
```
digital-strata/
├── index.html         # 项目页面
├── sketch.js          # p5.js 故障艺术动画
├── style.css          # 项目样式
├── p5.js              # p5.js 库
├── p5.sound.min.js    # 音频库
└── LWH_8128.JPG       # 项目素材图片
```

**特点**:
- 独立的 p5.js 页面
- 可以直接在浏览器中打开
- 使用本地 p5.js 文件（不依赖 CDN）

---

## 6. 核心设计模式

### 6.1 渐进增强 (Progressive Enhancement)

**策略**: 从基础功能开始，逐步添加增强功能

```
基础 HTML → CSS 样式 → JavaScript 交互 → p5.js 动画
```

**实现**:
- 网站在禁用 JavaScript 时仍可浏览（基础链接）
- p5.js 加载失败时不影响导航
- 图片加载失败时显示占位符

### 6.2 移动优先 (Mobile First)

**策略**: 先设计移动端，再增强桌面端

```css
/* 默认样式（移动端） */
.element {
  padding: 22px;
}

/* 桌面端增强 */
@media (min-width: 1025px) {
  .element {
    padding: 56px;
  }
}
```

### 6.3 响应式图片

**策略**: 根据设备加载不同尺寸的图片

```javascript
// 预加载图片
function preloadImages() {
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}
```

**未来改进**:
- 使用 `<picture>` 元素
- 使用 `srcset` 属性
- 懒加载（Intersection Observer）

### 6.4 无障碍访问 (Accessibility)

#### **6.4.1 ARIA 属性**

```html
<!-- 导航区域 -->
<nav class="nav" aria-label="Primary">
  <div class="navItem" data-menu="projects">
    <button class="navBtn" type="button">PROJECTS</button>
  </div>
</nav>

<!-- 面板对话框 -->
<div id="panel" class="panel" role="dialog" aria-hidden="true">
  <ul id="panelList" class="panelList"></ul>
</div>

<!-- 菜单按钮 -->
<button class="menuToggle" aria-label="Menu">
  <svg viewBox="0 0 24 24">
    <path d="M3 12h18M3 6h18M3 18h18"/>
  </svg>
</button>
```

#### **6.4.2 键盘导航**

```javascript
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && panel.classList.contains('is-open')) closePanel();
  if(e.key === 'ArrowLeft') showPrev();
  if(e.key === 'ArrowRight') showNext();
});
```

#### **6.4.3 焦点管理**

- 所有交互元素可通过 Tab 键访问
- 模态框打开时禁用背景滚动
- 焦点 trapped in modal（未来改进）

### 6.5 性能优化模式

#### **6.5.1 图片预加载**

```javascript
function preloadImages() {
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}
```

**优点**:
- 减少用户等待时间
- 避免图片切换时的闪烁

#### **6.5.2 CSS 动画优化**

```css
/* 使用 transform 和 opacity（GPU 加速） */
transform: translateY(-8px);
opacity: 0;
transition: opacity .14s ease, transform .14s ease;

/* 避免使用 left/top（触发重排） */
```

#### **6.5.3 防抖和节流**

```javascript
// 防抖：延迟执行
function scheduleClose() {
  clearTimeout(closeTimer);
  closeTimer = setTimeout(closePanel, 220);
}

// 节流：限制执行频率（未来改进）
function throttle(func, limit) {
  let inThrottle;
  return function() {
    if (!inThrottle) {
      func.apply(this, arguments);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

---

## 7. 技术栈

### 7.1 前端技术

| 技术 | 版本 | 用途 |
|------|------|------|
| **HTML5** | - | 页面结构、语义化标签 |
| **CSS3** | - | 样式、动画、响应式设计 |
| **JavaScript (ES6+)** | - | 交互逻辑、事件处理 |
| **p5.js** | 1.11.11 | 创意编程、动画生成 |

### 7.2 部署技术

| 技术 | 用途 |
|------|------|
| **GitHub Pages** | 静态网站托管 |
| **Git** | 版本控制 |
| **GitHub** | 代码仓库、CI/CD |

### 7.3 开发工具

| 工具 | 用途 |
|------|------|
| **VS Code** | 代码编辑器 |
| **Live Server** | 本地开发服务器 |
| **Claude Code** | AI 辅助开发 |
| **Browser DevTools** | 调试、测试 |

### 7.4 浏览器支持

| 浏览器 | 最低版本 | 备注 |
|--------|----------|------|
| **Chrome** | 90+ | 完全支持 |
| **Firefox** | 88+ | 完全支持 |
| **Safari** | 14+ | 完全支持 |
| **Edge** | 90+ | 完全支持 |
| **Mobile Safari** | iOS 14+ | 完全支持 |
| **Chrome Mobile** | Android 10+ | 完全支持 |

---

## 8. 性能优化策略

### 8.1 加载性能

#### **8.1.1 资源压缩**

- **图片压缩**: 使用 TinyPNG 或类似工具
- **HTML/CSS/JS**: Gzip 压缩（GitHub Pages 自动处理）

#### **8.1.2 资源加载优先级**

```html
<!-- 关键 CSS 内联，避免 FOUC -->
<style>
  /* 首屏关键样式 */
</style>

<!-- p5.js 延迟加载 -->
<script src="https://cdn.jsdelivr.net/npm/p5@1.11.11/lib/p5.js" defer></script>
```

#### **8.1.3 图片懒加载（未来改进）**

```javascript
// 使用 Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});
```

### 8.2 运行时性能

#### **8.2.1 减少 Reflow 和 Repaint**

```javascript
// 错误：触发多次 reflow
element.style.height = '100px';
element.style.width = '100px';
element.style.background = 'red';

// 正确：一次性修改
element.style.cssText = 'height: 100px; width: 100px; background: red;';
```

#### **8.2.2 使用 requestAnimationFrame**

```javascript
// 优化动画性能
requestAnimationFrame(() => {
  imgElement.classList.add('active');
});
```

#### **8.2.3 事件委托**

```javascript
// 减少事件监听器数量
container.addEventListener('click', (e) => {
  if (e.target.matches('.dot')) {
    // 处理点击
  }
});
```

### 8.3 内存优化

#### **8.3.1 避免内存泄漏**

```javascript
// 正确：移除事件监听器
function addListener() {
  const handler = () => console.log('click');
  element.addEventListener('click', handler);
  // 保存引用，后续移除
  element._handler = handler;
}

function removeListener() {
  element.removeEventListener('click', element._handler);
  delete element._handler;
}
```

#### **8.3.2 图片缓存管理**

```javascript
// 限制图片缓存大小
const MAX_CACHE_SIZE = 20;
let imageCache = [];

function addToCache(img) {
  if (imageCache.length >= MAX_CACHE_SIZE) {
    const oldImg = imageCache.shift();
    oldImg.src = '';  // 释放内存
  }
  imageCache.push(img);
}
```

---

## 9. 未来改进方向

### 9.1 功能增强

- [ ] 添加搜索功能
- [ ] 添加作品标签/分类
- [ ] 添加多语言支持（中英文切换）
- [ ] 添加暗色模式
- [ ] 添加作品分享功能

### 9.2 性能优化

- [ ] 实现图片懒加载
- [ ] 使用 Service Worker 缓存
- [ ] 优化 p5.js 动画性能
- [ ] 减少第三方依赖

### 9.3 可访问性

- [ ] 添加焦点 trapped in modal
- [ ] 添加跳转到主内容链接
- [ ] 改进颜色对比度
- [ ] 添加屏幕阅读器支持

### 9.4 开发体验

- [ ] 使用构建工具（Vite/Webpack）
- [ ] 添加 TypeScript 支持
- [ ] 添加单元测试
- [ ] 添加 E2E 测试

---

## 10. 常见问题

### 10.1 为什么使用内联 JavaScript？

**原因**:
- 静态网站托管（GitHub Pages）无需构建工具
- 每个页面独立，易于维护
- 减少 HTTP 请求（内联 JS 和 CSS）

**缺点**:
- 代码复用需要手动复制
- 无法使用 ES6 模块导入导出

### 10.2 为什么不使用框架（React/Vue）？

**原因**:
- 网站内容相对静态，无需复杂状态管理
- 框架会增加学习成本和维护复杂度
- 原生 JavaScript 性能更好
- 符合"极简主义"设计理念

### 10.3 如何添加新的 p5.js 项目？

**步骤**:
1. 复制 `projects/digital-strata/` 文件夹
2. 重命名为新项目名称
3. 修改 `sketch.js` 中的动画逻辑
4. 更新导航菜单

### 10.4 如何修改颜色主题？

**方法**: 修改 CSS 变量

```css
:root {
  --text: #111;              /* 主要文本 */
  --muted: rgba(0,0,0,.48);  /* 次要文本 */
  --muted2: rgba(0,0,0,.30); /* 辅助文本 */
  --line: rgba(0,0,0,.10);   /* 分割线 */
}
```

### 10.5 如何调试 p5.js 动画？

**方法**:
1. 打开浏览器开发者工具（F12）
2. 查看 Console 标签页的日志
3. 在 `sketch.js` 中添加 `console.log()`
4. 使用 `p.frameRate(30)` 降低帧率，便于观察

---

## 附录

### A. 词汇表

| 术语 | 英文 | 解释 |
|------|------|------|
| 断点 | Breakpoint | 响应式设计的屏幕宽度阈值 |
| 故障艺术 | Glitch Art | 利用数字错误和故障效果创作的艺术 |
| 渐进增强 | Progressive Enhancement | 从基础功能开始，逐步添加增强功能的开发策略 |
| 移动优先 | Mobile First | 先设计移动端，再增强桌面端的设计策略 |
| 内联 | Inline | CSS/JS 直接写在 HTML 文件中 |
| CDN | Content Delivery Network | 内容分发网络，用于加速资源加载 |
| ARIA | Accessible Rich Internet Applications | 无障碍访问的标准 |
| lerp | Linear Interpolation | 线性插值，用于平滑过渡 |
| Reflow | 回流 | 浏览器重新计算页面布局的过程 |
| Repaint | 重绘 | 浏览器重新绘制页面的过程 |
| Event Delegation | 事件委托 | 利用事件冒泡，在父元素上监听子元素事件 |

### B. 参考资源

#### **p5.js 官方文档**
- https://p5js.org/reference/

#### **MDN Web Docs**
- https://developer.mozilla.org/

#### **CSS-Tricks**
- https://css-tricks.com/

#### **Web Accessibility Initiative (WAI)**
- https://www.w3.org/WAI/

### C. 更新日志

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0.0 | 2025-01-15 | 初始版本，完整架构文档 |

---

**文档作者**: Claude Code
**项目**: HARRY6 艺术家个人网站
**版本**: 1.9.5
**许可**: 仅供项目内部使用
