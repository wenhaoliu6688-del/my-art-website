# HARRY6 艺术网站设计系统

> 当代艺术家个人网站设计规范与组件库
> 版本: 1.9.5
> 最后更新: 2025-01-15

---

## 核心设计原则

### 1. 极简主义 (Minimalism)
- **克制**: 每个元素都有明确目的，无多余装饰
- **留白**: 大量空白营造展览般的呼吸感
- **专注**: 内容至上，交互不干扰观赏体验

### 2. 展览空间感 (Exhibition-like Presentation)
- 视觉元素如同画廊中的艺术品
- 充足的留白让作品"呼吸"
- 观众注意力始终在作品本身

### 3. 意向性交互 (Intentional Interaction)
- 交互快速、干脆、无延迟
- 动画过渡简洁自然
- 无拖拽、无花哨效果

---

## 颜色系统 (Color System)

### CSS 变量定义

```css
:root {
  --text: #111;              /* 主要文本 - 接近黑色 */
  --muted: rgba(0,0,0,.48);  /* 次要文本 - 48% 不透明度 */
  --muted2: rgba(0,0,0,.30); /* 辅助文本 - 30% 不透明度 */
  --line: rgba(0,0,0,.10);   /* 分割线 - 10% 不透明度 */
}
```

### 使用指南

#### `--text` (#111)
- **用途**: 主要标题、正文、导航文字
- **场景**: 品牌名、导航按钮、作品标题
- **不要用于**: 长段落（使用 --muted）

#### `--muted` (rgba(0,0,0,.48))
- **用途**: 次要信息、说明文字
- **场景**: 年份标签、邮箱地址、提示文本
- **示例**: "Yellow River — 2025" 中的年份

#### `--muted2` (rgba(0,0,0,.30))
- **用途**: 辅助说明、占位符
- **场景**: "COPIED" 提示文本、版本标记
- **特点**: 更加低调，不抢视觉焦点

#### `--line` (rgba(0,0,0,.10))
- **用途**: 分割线、边框
- **场景**: 面板边框、作品分隔线、区域分割
- **规则**: 永远使用 1px，不改变粗细

### 颜色层次示例

```html
<!-- 主要标题 -->
<h1 style="color: var(--text)">Yellow River</h1>

<!-- 年份标签 -->
<span style="color: var(--muted)">2025</span>

<!-- 分割线 -->
<div style="border-top: 1px solid var(--line)"></div>

<!-- 提示文本 -->
<span style="color: var(--muted2)">COPIED</span>
```

---

## 字体系统 (Typography System)

### 字体族

```css
font-family: ui-sans-serif, system-ui, -apple-system,
             "Segoe UI", Roboto, Arial,
             "PingFang SC", "Microsoft YaHei",
             sans-serif;
```

**特点**:
- 优先使用系统原生字体（最快加载速度）
- 自动适配中文（PingFang SC / Microsoft YaHei）
- 无需额外字体文件

### 字体层级

#### 1. 品牌名 (Brand)

```css
font-size: 18px;
font-weight: 600;
letter-spacing: .10em;  /* 宽字间距 */
text-transform: uppercase;
```

#### 2. 导航按钮 (Navigation Buttons)

```css
font-size: 15px;
font-weight: 400;
letter-spacing: .24em;  /* 超宽字间距 */
text-transform: uppercase;
```

#### 3. 面板链接 (Panel Links)

```css
font-size: 16px;
font-weight: 400;
letter-spacing: .02em;  /* 正常字间距 */
```

#### 4. 作品信息 (Artwork Info)

**标题**:
```css
font-size: 13px;
font-weight: 500;
letter-spacing: .06em;
```

**年份**:
```css
font-size: 11px;
font-weight: 400;
letter-spacing: .08em;
color: var(--muted);
```

#### 5. 正文 (Body Text)

```css
font-size: 14px;
line-height: 1.7;
font-weight: 400;
```

#### 6. 邮箱与提示 (Email & Hints)

```css
font-size: 12-13px;
letter-spacing: .06em - .18em;
font-weight: 400 - 500;
```

### 字间距使用指南

| 用途 | letter-spacing | 示例 |
|------|----------------|------|
| 超宽 | .24em | PROJECTS, IMAGES |
| 宽 | .10em - .12em | HARRY6, 标题 |
| 正常 | .02em - .06em | 面板链接、作品信息 |
| 紧凑 | .00em | 正文段落 |

---

## 间距系统 (Spacing System)

### 核心变量

```css
:root {
  --leftPad: 56px;    /* 桌面端左侧边距 */
  --panelW: 360px;    /* 面板宽度 */
  --panelPad: 18px;   /* 面板内边距 */
}
```

### 响应式边距

#### 桌面端 (>1024px)
```css
--leftPad: 56px;
```

#### 移动端 (≤1024px)
```css
--leftPad: 22px;
--panelW: 320px;
```

### 间距规范

| 类型 | 值 | 用途 |
|------|-----|------|
| 微小 | 4px | 内联元素内边距 |
| 小 | 8px - 12px | 相关元素间距 |
| 中 | 18px - 26px | 区块间距、面板内边距 |
| 大 | 40px - 80px | 页面区块间距 |
| 特大 | 120px+ | 页面顶部边距 |

### 使用示例

```css
/* 面板内边距 */
.panel {
  padding: var(--panelPad);  /* 18px */
}

/* 导航项间距 */
.navItem {
  margin: 18px 0;
}

/* 作品信息顶部边距 */
.artworkInfo {
  margin-top: 12px;
}

/* 页面容器边距 */
.wrap {
  padding: 120px max(6vw, 56px) 80px;
}
```

---

## 组件库 (Component Library)

### 1. 品牌/Logo (.brand)

**用途**: 左上角返回首页的品牌标识

```css
.brand {
  position: fixed;
  top: 44px;
  left: var(--leftPad);
  margin-left: -12px;
  z-index: 1000;

  text-decoration: none;
  color: var(--text);
  font-weight: 600;
  font-size: 18px;
  letter-spacing: .10em;
  text-transform: uppercase;

  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(255,255,255,0.85);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);

  transition: opacity .15s ease, box-shadow .15s ease;
}

.brand:hover {
  opacity: .78;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}
```

**关键特性**:
- 圆角胶囊形状 (border-radius: 999px)
- 半透明背景确保在任何内容上可读
- 悬停时轻微透明度变化
- 阴影增加层次感

### 2. 导航按钮 (.navBtn)

**用途**: 左侧导航的主按钮

```css
.navBtn {
  display: inline-block;
  cursor: pointer;
  border: none;
  background: rgba(255,255,255,0.85);
  padding: 10px 12px;
  margin-left: -12px;

  font-size: 15px;
  letter-spacing: .24em;
  text-transform: uppercase;
  color: var(--text);

  border-radius: 999px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.navBtn:hover {
  color: var(--text);
  background: rgba(255,255,255,0.95);
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

.navBtn.is-active {
  color: var(--text);
}
```

**关键特性**:
- 与品牌按钮一致的视觉风格
- 超宽字间距 (.24em) 增强可读性
- 负左边距创造视觉平衡

### 3. 菜单切换按钮 (.menuToggle)

**用途**: 全屏菜单的开关（全平台）

```css
.menuToggle {
  position: fixed;
  top: 44px;
  right: 22px;
  width: 44px;
  height: 44px;
  border: none;
  background: rgba(255,255,255,0.85);
  border-radius: 999px;
  cursor: pointer;
  z-index: 1001;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: opacity .15s ease;
}

.menuToggle:hover {
  opacity: .75;
}

.menuToggle svg {
  width: 20px;
  height: 20px;
  stroke: var(--text);
  stroke-width: 1.5;
  fill: none;
}
```

**SVG 图标**:
```html
<svg viewBox="0 0 24 24">
  <path d="M3 12h18M3 6h18M3 18h18"/>
</svg>
```

### 4. 悬浮面板 (.panel)

**用途**: 导航菜单展开的内容面板

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

/* 隐形扩展区域 - 防止鼠标滑出时关闭 */
.panel::before {
  content: "";
  position: absolute;
  left: -18px;
  top: 0;
  width: 18px;
  height: 100%;
  background: transparent;
}
```

**关键特性**:
- 向上 8px 的初始位移，展开时回弹
- 左侧 18px 透明扩展区保持 hover 状态
- 快速过渡 (.14s) 响应迅速

**触摸设备优化**:
```css
body.is-touch-device .panel {
  transition: opacity .10s ease, transform .10s ease;
}
```

### 5. 面板链接 (.panelLink)

```css
.panelLink {
  text-decoration: none;
  color: var(--text);
  font-size: 16px;
  letter-spacing: .02em;
  display: inline-block;
  padding: 6px 4px;
}

.panelLink:hover {
  opacity: .75;
}

.panelLink .year {
  color: var(--muted);
  margin-left: .35em;
  letter-spacing: .06em;
}
```

### 6. 邮箱复制 (.emailCopy + .toast)

```css
.emailWrap {
  position: fixed;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  z-index: 1000;
  font-size: 13px;
  letter-spacing: .06em;
  color: var(--muted);
  text-align: center;
}

.emailCopy {
  cursor: pointer;
  padding: 6px 10px;
  border: 1px solid transparent;
  border-radius: 999px;
  transition: border-color .15s ease, color .15s ease;
}

.emailCopy:hover {
  border-color: var(--line);
  color: var(--text);
}

.toast {
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translate(10px, -50%);
  font-size: 12px;
  color: var(--muted2);
  letter-spacing: .18em;
  text-transform: uppercase;
  opacity: 0;
  transition: opacity .18s ease;
  pointer-events: none;
}

.toast.show {
  opacity: 1;
}
```

**交互逻辑**:
1. 点击邮箱地址复制到剪贴板
2. 右侧显示 "COPIED" 提示
3. 900ms 后自动消失

### 7. 作品展示组件

#### 图片容器 (.imageContainer)

```css
.imageContainer {
  position: relative;
  max-width: 70vw;
  max-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.imageContainer img {
  max-width: 100%;
  max-height: 50vh;
  display: block;
  opacity: 0;
  transition: opacity 0.18s ease-out;
}

.imageContainer img.active {
  opacity: 1;
}
```

#### 作品信息 (.artworkInfo)

```css
.artworkInfo {
  text-align: center;
  margin-top: 12px;
  pointer-events: none;
}

.artworkInfo .title {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: .06em;
  color: var(--text);
  margin-bottom: 4px;
}

.artworkInfo .year {
  font-size: 11px;
  letter-spacing: .08em;
  color: var(--muted);
  font-weight: 400;
}
```

#### 分隔线 (.divider)

```css
.divider {
  width: 60px;
  height: 1px;
  background: var(--line);
  margin-top: 12px;
}
```

### 8. 底部导航 (.bottomNav)

**用途**: 图片浏览的前后导航

```css
.bottomNav {
  position: fixed;
  bottom: 48px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 24px;
  z-index: 100;
}

.navArrow {
  width: 38px;
  height: 38px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  flex-shrink: 0;
  transition: opacity .2s ease;
}

.navArrow svg {
  width: 20px;
  height: 20px;
  stroke: var(--text);
  stroke-width: 1.2;
  fill: none;
  opacity: 0.25;
  transition: opacity .2s ease;
}

.navArrow:hover svg {
  opacity: 0.6;
}
```

**圆点导航**:
```css
.dots {
  display: flex;
  gap: 8px;
  align-items: center;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--line);
  cursor: pointer;
  transition: all .2s ease;
}

.dot.active {
  background: var(--text);
}

.dot:hover {
  transform: scale(1.2);
}
```

**SVG 箭头**:

左箭头:
```html
<svg viewBox="0 0 24 24">
  <path d="M15 18l-6-6 6-6"/>
</svg>
```

右箭头:
```html
<svg viewBox="0 0 24 24">
  <path d="M9 18l6-6-6-6"/>
</svg>
```

### 9. 全屏菜单 (.fullscreenMenu)

**用途**: 移动端和全平台的统一菜单

```css
.fullscreenMenu {
  display: none;
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

.menuCloseBtn {
  position: absolute;
  top: 32px;
  right: 32px;
  width: 44px;
  height: 44px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 32px;
  color: #000;
  line-height: 1;
  padding: 0;
}

.menuCloseBtn:hover {
  opacity: 0.6;
}

.menuCategoryTitle {
  font-size: 48px;
  font-weight: 300;
  letter-spacing: 0.02em;
  color: #000;
  padding: 32px 0 16px 0;
  margin: 0;
  border-bottom: 1px solid rgba(0,0,0,0.1);
}

.menuItem {
  display: block;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: rgba(0,0,0,0.7);
  padding: 16px 0 16px 24px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.menuItem:hover {
  color: #000;
  padding-left: 32px;
}

.menuItem .year {
  color: rgba(0,0,0,0.4);
  font-size: 14px;
  margin-left: 0.5em;
}
```

---

## 动画系统 (Animation System)

### 过渡时长

| 时长 | 用途 | 示例 |
|------|------|------|
| .10s | 触摸设备面板 | 移动端菜单展开 |
| .14s | 面板展开/收起 | 悬浮面板动画 |
| .15s | 微交互 | 按钮 hover 状态 |
| .18s | 图片切换 | 作品图片淡入淡出 |
| .20s | 导航交互 | 箭头按钮 hover |
| .30s | 全屏菜单 | 整体淡入淡出 |

### 缓动函数 (Easing)

**标准缓动**:
```css
transition: opacity .15s ease;           /* 标准 */
transition: opacity .18s ease-out;      /* 淡出优化 */
transition: transform .14s ease;        /* 位移 */
```

**多属性过渡**:
```css
transition:
  opacity .15s ease,
  box-shadow .15s ease,
  transform .14s ease;
```

### 常见动画模式

#### 1. 透明度淡入淡出
```css
.element {
  opacity: 0;
  transition: opacity .18s ease;
}

.element.active {
  opacity: 1;
}
```

#### 2. 垂直位移动画
```css
.panel {
  transform: translateY(-8px);
  transition: transform .14s ease;
}

.panel.is-open {
  transform: translateY(0);
}
```

#### 3. 悬停缩放
```css
.dot {
  transition: transform .2s ease;
}

.dot:hover {
  transform: scale(1.2);
}
```

#### 4. 边框颜色过渡
```css
.emailCopy {
  border-color: transparent;
  transition: border-color .15s ease, color .15s ease;
}

.emailCopy:hover {
  border-color: var(--line);
  color: var(--text);
}
```

---

## 响应式设计 (Responsive Design)

### 断点系统

| 断点 | 设备类型 | 关键调整 |
|------|----------|----------|
| >1024px | 桌面端 | 全屏菜单，左侧隐藏 |
| 768-1024px | iPad/平板 | 全屏菜单，图片高度降低 |
| <768px | 手机 | 全屏菜单，底部导航抬高 |

### 桌面端 (>1024px)

```css
:root {
  --leftPad: 56px;
  --panelW: 360px;
}

.brand {
  top: 44px;
}

.menuToggle {
  display: block;
}

.nav {
  display: none;
}
```

### 移动端 (≤1024px)

```css
:root {
  --leftPad: 22px;
  --panelW: 320px;
}

.brand {
  top: 22px;
}

.menuToggle {
  top: 22px;
  display: block;
}

.nav {
  display: none;
}

.bottomNav {
  bottom: 70px;  /* 为移动浏览器 Tab 栏留空间 */
}
```

### iPad 专用优化 (768-1024px)

```css
@media (min-width: 768px) and (max-width: 1024px) {
  .gallery {
    padding-top: 8vh;
    padding-bottom: 220px;
  }

  .imageContainer {
    max-height: 25vh;
  }

  .bottomNav {
    bottom: 100px;
  }
}
```

---

## 布局模式 (Layout Patterns)

### 1. 固定定位元素

**左侧导航**:
```css
.nav {
  position: fixed;
  left: var(--leftPad);
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
}
```

**底部邮箱**:
```css
.emailWrap {
  position: fixed;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  z-index: 1000;
}
```

### 2. Flexbox 居中

**画布/作品居中**:
```css
#stage, .gallery {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
```

### 3. Grid 布局（About 页面）

```css
.wrap {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 40px;
  padding: 120px max(6vw, 56px) 80px;
  align-items: start;
}

@media (max-width: 860px) {
  .wrap {
    grid-template-columns: 1fr;
    padding: 96px 22px 70px;
  }
}
```

---

## 交互模式 (Interaction Patterns)

### 1. Hover 展开（桌面端）

```css
@media (hover: hover) {
  .menu:hover .menu-panel {
    display: flex;
  }
}
```

### 2. 点击切换（全平台）

```javascript
btn.addEventListener('click', (e) => {
  if (panel.classList.contains('is-open') && activeKey === key) {
    closePanel();
  } else {
    openPanelFor(key, btn);
  }
  e.preventDefault();
});
```

### 3. 触摸滑动（移动端）

```javascript
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
  const threshold = 50;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > threshold) {
    if (diff > 0) showNext();
    else showPrev();
  }
}
```

### 4. 键盘导航

```javascript
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePanel();
  if (e.key === 'ArrowLeft') showPrev();
  if (e.key === 'ArrowRight') showNext();
});
```

### 5. 延迟关闭机制

```javascript
let closeTimer = null;

function scheduleClose() {
  clearTimeout(closeTimer);
  closeTimer = setTimeout(closePanel, 220);
}

// 鼠标进入面板时取消关闭
panel.addEventListener('mouseenter', () => clearTimeout(closeTimer));
panel.addEventListener('mouseleave', scheduleClose);
```

---

## 可访问性 (Accessibility)

### ARIA 属性

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

<!-- 导航箭头 -->
<button class="navArrow prev" aria-label="上一张">
```

### 焦点管理

- 所有交互元素可通过 Tab 键访问
- 模态框打开时禁用背景滚动
- ESC 键关闭所有浮层

### 触摸目标尺寸

- 最小触摸目标: 44×44px（菜单按钮、关闭按钮）
- 推荐触摸目标: 48×48px 以上

---

## 性能优化 (Performance)

### 1. 图片优化

**预加载**:
```javascript
function preloadImages() {
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}
```

**懒加载**:
```css
img {
  opacity: 0;
  transition: opacity 0.18s ease-out;
}

img.active {
  opacity: 1;
}
```

### 2. CSS 优化

- 使用 CSS 变量减少重复
- 避免复杂选择器
- 使用 transform 和 opacity 实现动画（GPU 加速）
- 避免 layout thrashing（读写分离）

### 3. JavaScript 优化

- 事件委托减少监听器数量
- 使用 requestAnimationFrame 优化动画
- 防抖和节流用户输入

---

## 文件结构 (File Structure)

```
my-art-website-main/
├── index.html              # 首页（带 p5.js 动画）
├── about/
│   └── index.html          # 关于页面
├── projects/
│   ├── yellow/
│   │   ├── index.html      # 作品页面
│   │   └── assets/         # 作品图片
│   ├── yellow-river/
│   ├── frontispiece/
│   └── formless-buddha/
├── images/
│   └── yellow-river/
│       └── index.html      # 图片画廊
├── assets/
│   └── style.css           # 共享样式（可选）
└── docs/
    └── DESIGN_SYSTEM.md    # 本文档
```

---

## 常见用例 (Common Use Cases)

### 创建新的作品页面

1. 复制 `projects/yellow/index.html`
2. 修改作品标题、年份
3. 更新 `images` 数组中的图片路径
4. 更新导航面板中的链接

### 添加新的导航项

1. 在所有页面的 HTML 中添加 `.navItem`
2. 在 JavaScript 中添加对应的数据数组
3. 更新全屏菜单的链接

### 调整颜色主题

只需修改 CSS 变量:
```css
:root {
  --text: #111;              /* 改为其他颜色 */
  --muted: rgba(0,0,0,.48);
  --line: rgba(0,0,0,.10);
}
```

---

## 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.9.5 | 2025-01-15 | 统一全平台全屏菜单，优化 iPad 体验 |
| 1.9.0 | 2025-01-14 | 修复移动端菜单交互，优化底部导航位置 |
| 1.8.0 | 2025-01-13 | 添加触摸设备检测和自适应提示 |

---

## 维护者备注

### 设计一致性检查清单

- [ ] 颜色使用 CSS 变量，不硬编码
- [ ] 字间距符合设计系统规范
- [ ] 动画时长遵循标准值
- [ ] 响应式断点正确应用
- [ ] 可访问性属性完整
- [ ] 触摸目标尺寸符合标准

### 修改原则

1. **最小改动**: 一次只改一个问题
2. **视觉稳定**: 不破坏现有布局
3. **增量迭代**: 小步快跑，频繁测试
4. **可逆性**: 保留回滚选项

---

**文档作者**: Claude Code
**项目**: HARRY6 艺术家个人网站
**许可**: 仅供项目内部使用
