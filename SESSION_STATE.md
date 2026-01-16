# HARRY6 工作状态记录

> **给新对话 Claude 或任何 AI 工具：必须先读取这个文件！这能保证工作连续性。**

---

## 最新状态（2025-01-17 晚 - 最终完成）

**最新Git提交：** `92e6aa3` (Mobile raise 90px more)

**所有主要功能已完成：**
- ✅ Images 页面布局（手机/iPad/电脑端都OK）
- ✅ 手机端导航修复（v7 双事件方案）
- ✅ 所有 Projects 页面正常
- ✅ 数字编号系统已建立

---

## 网站结构（重要！）

```
my-art-website-main/
├── index.html                    # 首页（p5.js 动画）
├── images/
│   └── index.html                # Images 页面
│   └── assets/
│       ├── *.jpg                 # 大图
│       └── thumbs/
│           └── *.jpg             # 缩印图
├── projects/
│   ├── yellow-river/
│   │   └── index.html            # Yellow River 项目
│   ├── frontispiece/
│   │   └── index.html            # Frontispiece 项目
│   ├── formless-buddha/
│   │   └── index.html            # Formless Buddha 项目
│   └── yellow/
│       └── index.html            # Yellow 项目
├── about/
│   └── index.html                # About 页面
└── SESSION_STATE.md              # 本文件
```

---

## 一、如何添加新图片到 Images 页面

**用户只需准备图片，然后找 Claude Code 帮忙。**

### 步骤：

1. **准备图片文件**
   - 大图放到：`images/assets/` 文件夹
   - 小图放到：`images/assets/thumbs/` 文件夹
   - 文件名按顺序：`010.jpg`, `011.jpg`, `012.jpg`...
   - 建议图片宽度：1920px 或更大
   - 建议缩印图尺寸：12px × 45px

2. **找 Claude Code**
   - 说："我要在 Images 页面加一张新图片"
   - Claude 会自动帮你写代码

### 代码格式（供 Claude 参考）：

在 `images/index.html` 的 `images` 数组中添加一行：

```javascript
{
  code: '新编号',     // 见下方编号规则
  year: '2025',       // 年份
  medium: 'Digital Art', // 媒介
  src: './assets/010.jpg',           // 大图路径
  thumb: './assets/thumbs/010.jpg'   // 小图路径
}
```

### 数字编号规则（永久）：

格式：`A·B·C·D`（用间隔号 · 分隔）

规则：
1. 四个数字必须都不相同
2. 要有数学美感（斐波那契、质数等）
3. 整体要有递进的节奏感

**现有9组编号（继续按此规律）：**
```
001: 1·2·3·5   (斐波那契)
002: 2·3·5·8   (斐波那契)
003: 1·4·6·9   (递增)
004: 2·5·7·11  (质数混合)
005: 3·4·8·12  (倍数)
006: 1·6·9·14  (跨度)
007: 2·7·11·16 (递进)
008: 3·8·13·18 (递进)
009: 4·9·14·21 (收尾)
```

**下一个可以是：** `1·5·12·22`, `2·9·15·25` 等...

---

## 二、如何添加新 Project 页面

### 步骤：

1. **创建文件夹**
   - 在 `projects/` 下创建新文件夹，如 `projects/new-project/`

2. **准备图片**
   - 把项目图片放到文件夹内
   - 建议图片文件名简单：`1.jpg`, `2.jpg`...

3. **复制现有项目页面作为模板**
   - 推荐：复制 `projects/yellow-river/index.html`
   - 或复制 `projects/frontispiece/index.html`

4. **修改内容**
   - 修改标题（`<title>`）
   - 修改图片数量和路径
   - 修改项目标题、年份等文字信息

### Claude 可以直接帮你完成整个流程。

---

## 三、最终确定的 CSS 样式（重要！）

### Images 页面 - 手机端 (max-width: 1024px)

```css
.container {
  padding: 0 20px 140px;  /* 顶部0，底部140 */
}

.mainDisplay {
  padding: 0 40px;
  flex-direction: column;
  justify-content: center;
  margin-top: -115px;  /* 上移，达到居中效果 */
}

.imageWrapper {
  margin-top: 0;
}
.imageWrapper img {
  max-height: 85vh;  /* 图片够大 */
}

.imageInfo {
  position: static;
  text-align: center;
  margin-bottom: 20px;  /* 与图片的间隔 */
  order: -1;  /* 文字在图片上方 */
}
```

### Images 页面 - iPad端 (768px - 1400px，包含横屏)

```css
@media (min-width: 768px) and (max-width: 1400px) {
  .mainDisplay {
    flex-direction: column !important;
    justify-content: center !important;
    padding: 0 40px !important;
  }

  .imageWrapper img {
    max-height: 50vh !important;  /* 图片适中 */
  }

  .imageInfo {
    position: static !important;
    text-align: center !important;
    margin-bottom: 30px !important;
    order: -1 !important;
  }

  .archiveBookmark {
    width: 20px !important;
    height: 45px !important;
  }

  .navArrow {
    width: 30px !important;
    height: 30px !important;
  }
}
```

### Images 页面 - 电脑端

```css
.mainDisplay {
  padding: 0 70px;
}

.imageInfo {
  position: absolute;
  right: 60px;
  top: 50%;
  transform: translateY(-50%);
  text-align: right;
}

.archiveBookmark {
  width: 12px;
  height: 45px;
}
```

---

## 四、手机端导航修复方案（v7 - 已验证有效）

**问题：** 手机端导航按钮点击不响应

**解决方案：** touchstart + click 双事件 + 视觉反馈

```javascript
// 同时绑定 touchstart 和 click
link.addEventListener('touchstart', navigate, {passive: false});
link.addEventListener('click', navigate);

// 导航函数，带视觉反馈
function navigate(e) {
  if(e) e.preventDefault();
  link.style.opacity = '0.5';  // 视觉反馈
  setTimeout(function() {
    window.location.href = link.href;
  }, 50);
}
```

**已修复的页面（共7个）：**
1. index.html
2. images/index.html
3. about/index.html
4. projects/formless-buddha/index.html
5. projects/frontispiece/index.html
6. projects/yellow-river/index.html
7. projects/yellow/index.html

**警告：不要轻易改动手机端导航代码！**

---

## 五、Git 提交历史

```
92e6aa3 Fix: Mobile raise 90px more (3x)
2d5613a Fix: Mobile 5px padding, iPad 50vh image
f878db4 Fix: Mobile 15px padding, iPad smaller elements
bb8d91c Fix: Proper centering, iPad landscape support, no overlap
428b69b Fix: Mobile raise 30px more with negative margin
```

---

## 六、重要提醒给 Claude/AI 工具

### 必须遵守的规则：

1. **不要改动任何已有功能**，除非用户明确要求
2. **每次修改前**先说明要改哪个文件、哪几行、为什么
3. **修改后**必须提供网站链接让用户测试
4. **一次只处理一个问题**
5. **始终用中文交流**
6. 用户是编程小白，不懂英语
7. **任何新改动前，先和用户讨论方案，确认后再动手**
8. **逐步确认细节**，不要一次性决定所有事情
9. **手机端导航已修复（v7）**，不要轻易改动
10. **数字编号规则**必须永久记住
11. **用户只会用 Claude Code**，不会自己写代码
12. **CSS 不支持负值 padding**，要用负 margin 代替
13. **iPad 横屏宽度 > 1024px**，媒体查询要覆盖到 1400px

### 部署流程：

```
修改代码 → git commit → git push → 等待1-2分钟 → GitHub Pages 自动部署
```

**测试链接：** https://wenhaoliu6688-del.github.io/my-art-website/

---

## 七、图片文件统计

| 目录 | 总大小 | 说明 |
|------|--------|------|
| assets/（首页） | ~5.3 MB | p5.js 用图 |
| formless-buddha | ~2.9 MB | 4 张 |
| frontispiece | ~6.3 MB | 9 张 |
| yellow-river | ~2.1 MB | 3 张 |
| images/assets | ~6.8 MB | 9 张主图 |
| **yellow 项目** | **~14.8 MB** | 7 张 |
| **全部图片** | **~38 MB** | |

---

*最后更新：2025-01-17 晚 - 网站建设已完成*
*感谢 Claude Opus 4.5 的协助*
