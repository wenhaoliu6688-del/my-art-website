# HARRY6 网站设计决策记录

> ⚠️ 给 Claude 的重要提示：
>
> 新对话开始时，请说："先看设计记录"
> 这个文件保存了 Harry 的所有要求，不要改动任何东西！

---

## 🚨 待修复 Bug（优先执行）

### 1. 手机端 Projects 链接无效
- **问题**：点击 Projects 面板中的项目链接没反应
- **文件**：index.html
- **原因**：`preventDefault` 阻止了导航
- **修复**：移除阻止，让点击正常跳转

### 2. IMAGES/ABOUT 侧边栏 hover 面板
- **问题**：鼠标放上去会弹出项目面板
- **文件**：6 个页面
- **修复**：代码中删除 `|| key === 'images'`，只保留 `key === 'projects'`

### 3. 全屏菜单 IMAGES/ABOUT 多余链接
- **问题**：IMAGES 和 ABOUT 标题下有重复的子链接
- **文件**：所有页面
- **修复**：
  - 把 `<h2 class="menuCategoryTitle">IMAGES</h2>` 改成 `<a class="menuCategoryTitle" href="images/">IMAGES</a>`
  - 删除下面的 `<a class="menuItem" href="images/">Images</a>`
  - ABOUT 同理

### 4. 邮箱显示后不消失
- **问题**：滚到底部后邮箱显示，向上滚动后仍显示
- **文件**：所有页面
- **修复**：添加 `else { emailWrap.classList.remove('visible'); }`

---

## Yellow River (2025) 页面

### 展签设计
- **内容**：`Yellow River.01` / `Yellow River.02` / `Yellow River.03`
- **位置**：图片下方
- **对齐**：展签右边缘与图片右边缘对齐
- **图片对齐**：图片必须居中，不能靠右

---

## Images 页面

### 右侧信息区（三行显示）
- **第一行**：编号（图片修改时间，如 `18:09:33`）
- **第二行**：年份（如 `2025`）
- **第三行**：媒材（如 `Digital Art`）

### 编号规则
- **格式**：图片修改时间（HH:MM:SS）
- **数据来源**：images/assets/001-009.jpg
- **实际编号**：
  - 001: 18:09:33
  - 002: 18:09:35
  - 003: 18:09:37
  - 004: 18:09:40
  - 005: 18:09:46
  - 006: 18:09:52
  - 007: 18:09:56
  - 008: 18:09:59
  - 009: 18:10:00
- **年份**：全部 2025
- **媒材**：全部 Digital Art

### 缩略书签
- **尺寸**：20px × 36px（窄窄的书签感）
- **位置**：页面底部，居中对齐

### iPad 右侧信息区
- **图片宽度**：75%（给右侧留空间）
- **信息位置**：靠右，距右边缘 20px
- **字号**：10px

---

## Formless Buddha (2023) 页面

### 排版
- **方案**：画册翻页式（画廊感）
- **布局**：一次显示一张，单列垂直
- **图片尺寸**：max-width 90%，max-height 80vh
- **间距**：图片之间 200px 留白
- **适配**：所有设备完整显示，不超出窗口（object-fit: contain）

---

## Frontispiece (2024) 页面

### 排版
- **方案**：自由散落式（韵律节奏）
- **布局**：单列居中，宽度错落
- **9张图宽度序列**：55% → 35% → 65% → 40% → 70% → 45% → 30% → 60% → 50%
- **高度限制**：max-height 70vh，确保完整显示
- **间距**：150px
- **适配**：所有设备完整显示，不超出窗口

---

## Yellow (2021) 页面

### 状态
- **需要修复**全屏菜单：
  - 标题 "WORKS" 改为 "PROJECTS"
  - 路径错误 `formispiece` 改为 `frontispiece`
  - 删除 IMAGES/ABOUT 重复链接（改为标题本身可点击）

---

## 全站规则

### 项目页面统一规范
- **标题顶部距离**：padding-top 160px（桌面端）
- **标题顶部距离**：padding-top 100px（移动端）
- **参考标准**：Yellow River 页面

### 导航 - 侧边栏
- **PROJECTS**：有 hover 面板，显示项目列表
- **IMAGES**：点击直接跳转，无面板
- **ABOUT**：点击直接跳转，无面板
- **代码**：`if((!isTouchDevice || isIPad) && key === 'projects')`（只对 projects 绑定 hover）

### 导航 - 全屏菜单
- **PROJECTS**：显示 4 个项目链接（Yellow River, Frontispiece, Formless Buddha, Yellow）
- **IMAGES**：标题本身就是链接，点击跳转（无子链接）
- **ABOUT**：标题本身就是链接，点击跳转（无子链接）
- **HTML 示例**：
  ```html
  <!-- 错误 -->
  <h2 class="menuCategoryTitle">IMAGES</h2>
  <a class="menuItem" href="images/">Images</a>

  <!-- 正确 -->
  <a class="menuCategoryTitle" href="images/">IMAGES</a>
  ```

### 邮箱
- 默认隐藏
- 滚到底部显示
- 离开底部隐藏

### 图片适配安全规则
- 所有重新设计的页面都要确保：
  - `max-height: 70vh 或 80vh`（不超出窗口高度）
  - `object-fit: contain`（完整显示，不裁切）
  - 响应式，手机/平板/电脑都能看

---

## 主页（index.html）

### 状态
- **无需修改**，保持现状

---

## 移动端测试

### 当前问题
- **之前是 404 状态**，无法测试
- **修复后必须在手机上测试**所有页面

### 测试清单
- [ ] 主页
- [ ] Projects 四个项目链接
- [ ] Images 页面
- [ ] About 页面
- [ ] 全屏菜单打开/关闭
- [ ] 各页面图片显示正常

---

## 修改文件清单

| 文件 | 修改内容 |
|------|----------|
| index.html | 手机端 Projects 链接修复 |
| images/index.html | 数据源、信息三行、缩略20×36、iPad布局、hover逻辑、全屏菜单 |
| about/index.html | hover逻辑、全屏菜单、邮箱 |
| projects/yellow-river/index.html | 图片居中、展签格式、hover逻辑、全屏菜单、邮箱 |
| projects/frontispiece/index.html | 自由散落排版、hover逻辑、全屏菜单、邮箱 |
| projects/formless-buddha/index.html | 画册翻页排版、hover逻辑、全屏菜单、邮箱 |
| projects/yellow/index.html | hover逻辑、全屏菜单、邮箱 |

---

*最后更新：2025-01-16*
