# 更新日志 (CHANGELOG)

记录网站的每一次修改，方便追溯历史和回滚。

---

## 2025-01-12

### 移除邮箱按钮的白色背景
- **文件**: `index.html` 样式部分
- **修改**: 邮箱按钮改为无边框透明背景，hover 时才显示边框
- **原因**: 保持极简设计，减少视觉干扰

### 品牌文本与导航按钮对齐
- **文件**: `index.html` 样式部分
- **修改**: 为 `.brand` 添加 `margin-left: -12px`
- **原因**: 视觉对齐更统一

### 修复移动端按钮响应
- **文件**: `index.html` JavaScript 部分
- **修改**: 使用 `touchstart` 事件替代 `click`，添加 `{passive: true}`
- **原因**: 移动端响应更快，避免延迟

### 修复按钮交互冲突
- **文件**: `index.html` JavaScript 部分
- **修改**: 移除重复的事件监听脚本
- **原因**: 多个脚本绑定同一事件导致冲突

### iPad 支持（断点调整）
- **文件**: `index.html` 样式部分
- **修改**: media query 断点从 1024px 改为 1366px
- **原因**: iPad Pro 需要更大的断点才能正确显示

### 触摸设备检测优化
- **文件**: `index.html` JavaScript 部分
- **修改**: 使用 `'ontouchstart' in window` 检测，而不是屏幕宽度
- **原因**: 更准确地区分触摸设备和桌面设备

### 修复图片模糊问题
- **文件**: `index.html` p5.js 部分
- **修改**: 始终从 `originalImg` 创建副本并 resize
- **原因**: 避免反复 resize 导致质量损失

### 修复窗口 resize 故障
- **文件**: `index.html` p5.js 部分
- **修改**: 统一 setup 和 windowResized 中的尺寸计算逻辑
- **原因**: 窗口调整大小时图片显示异常

---

## 网站基本信息

- **网站**: HARRY6 艺术家个人网站
- **风格**: 极简、克制、展览空间
- **技术栈**: HTML + CSS + JavaScript + p5.js
- **部署**: GitHub Pages
- **在线地址**: https://wenhaoliu6688-del.github.io/my-art-website/

---

## 目录结构

```
my-art-website-main/
├── index.html          # 首页（p5.js 互动影像 + 导航）
├── style.css           # 样式文件（如有）
├── p5.js               # p5.js 库
├── LWH_8128.JPG        # 首页动画图片
├── about/              # 关于页面
├── projects/           # 作品集页面
│   ├── yellow-river/
│   ├── frontispiece/
│   ├── formless-buddha/
│   └── yellow/
├── images/             # 图片页面
│   └── yellow-river/
├── CHANGELOG.md        # 本文件（更新日志）
├── TODO.md             # 待办事项
├── CLAUDE.md           # 给 AI 的协作规则
└── README.md           # 项目说明
```
