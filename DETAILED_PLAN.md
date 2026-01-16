# 详细修复计划 v4（最终版）

> 时间：2025-01-16
> 用户反馈：手机端改了七八次依旧不工作，Images 页面作品不居中，缩略图太高

---

## 🔴 问题 1：手机端导航失灵（严重）

### 根本原因分析

经过对比首页和 images 页面的代码，发现：

1. **BASE 计算方式不同**
   - 首页：`location.pathname.split("/")[1]`
   - images：`location.pathname.split("/").filter(Boolean)[0]`
   - images 页面的方式更可靠，首页应该统一

2. **tagName 大小写问题**（最可能的根本原因）
   ```javascript
   if(item.tagName === 'A')  // HTML 返回 'A'，但某些情况可能返回小写 'a'
   ```
   应该改为：`if(item.tagName.toUpperCase() === 'A')`

3. **缺少 stopPropagation**
   - 点击子元素时可能被其他事件干扰

### 完整修复代码

**文件：** index.html，第 786-837 行

**完全替换为：**

```javascript
  <script>
    // 确保 DOM 加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
      const menuToggle = document.getElementById('menuToggle');
      const fullscreenMenu = document.getElementById('fullscreenMenu');
      const menuCloseBtn = document.getElementById('menuCloseBtn');

      if(menuToggle && fullscreenMenu){
        // 使用与 images 页面相同的 BASE 计算方式（更可靠）
        const pathParts = location.pathname.split("/").filter(Boolean);
        const BASE = pathParts.length > 0 ? "/" + pathParts[0] + "/" : "/";

        // 动态设置菜单链接
        const menuItems = fullscreenMenu.querySelectorAll('.menuItem, .menuCategoryTitle');
        menuItems.forEach(item => {
          // 只处理 <a> 标签（使用 toUpperCase 避免大小写问题）
          if(item.tagName && item.tagName.toUpperCase() === 'A'){
            const currentHref = item.getAttribute('href');
            if (currentHref && !currentHref.startsWith('/')) {
              const finalHref = BASE + currentHref;
              item.setAttribute('href', finalHref);

              // 添加点击事件处理
              item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = finalHref;
              });
            }
          }
        });

        // 打开菜单
        menuToggle.addEventListener('click', function(e) {
          e.stopPropagation();
          fullscreenMenu.classList.add('is-open');
          document.body.style.overflow = 'hidden';
        });

        // 关闭按钮
        menuCloseBtn.addEventListener('click', function() {
          fullscreenMenu.classList.remove('is-open');
          document.body.style.overflow = '';
        });

        // 点击菜单外部关闭
        fullscreenMenu.addEventListener('click', function(e) {
          if(e.target === fullscreenMenu){
            fullscreenMenu.classList.remove('is-open');
            document.body.style.overflow = '';
          }
        });
      }
    });
  </script>
```

**关键修改：**
1. ✅ 用 `DOMContentLoaded` 包裹
2. ✅ 用 images 页面的 BASE 计算方式
3. ✅ `tagName.toUpperCase()` 避免大小写问题
4. ✅ 添加 `e.stopPropagation()`
5. ✅ 使用 `function()` 而不是箭头函数（兼容性更好）

---

## 🔴 问题 2：Images 页面作品不居中

### 当前 CSS 问题

```css
.container{
  align-items: center;  /* 让两列都居中，但不是真正的"绝对居中" */
  padding: 100px 40px 160px;  /* 左右不对称 */
}
.mainDisplay{
  padding: 0 60px 0 80px;  /* 左边 80px 造成视觉偏移 */
}
```

### 修复方案

**修改 1：主容器（第 108-113 行）**
```css
.container{
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  padding: 100px 60px 160px 60px;  /* 统一左右 padding */
}
```

**修改 2：主展示区（第 116-123 行）**
```css
.mainDisplay{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0;  /* 移除不对称 padding */
}
```

**修改 3：缩略图区域（第 153-167 行）**
```css
.archivePool{
  display: flex;
  flex-direction: column;
  align-items: center;  /* 缩略图自身垂直居中 */
  justify-content: center;
  gap: 6px;
  padding: 0;
  width: 45px;
  flex-shrink: 0;
}
```

---

## 🔴 问题 3：缩略图太高，要条形码样式

### 当前：40px × 25px
### 修改为：35px × 6px

**修改缩略图尺寸（第 169-178 行）：**
```css
.archiveBookmark{
  width: 35px;
  height: 6px;  /* 条形码细条 */
  flex-shrink: 0;
  background: #f0f0f0;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  overflow: hidden;
}
```

**同时更新手机端样式（第 400-403 行）：**
```css
.archiveBookmark{
  width: 8px;
  height: 45px;  /* 手机端保持原竖条样式 */
}
```

---

## 完整修改清单

| 文件 | 行号 | 修改内容 |
|------|------|----------|
| index.html | 786-837 | 全屏菜单脚本完全重写 |
| images/index.html | 108-113 | 主容器 CSS（统一 padding） |
| images/index.html | 116-123 | 主展示区 CSS（移除不对称 padding） |
| images/index.html | 153-167 | 缩略图区域 CSS（自身居中） |
| images/index.html | 169-178 | 缩略图尺寸（35px × 6px） |

---

## 验证方法

修改后测试：
1. **手机端首页**：打开菜单 → 点击 IMAGES → 点击 ABOUT → 点击各项目 → 都能跳转
2. **电脑端 Images**：主图片在屏幕正中央，缩略图在左侧（35px × 6px 细条）
3. **手机端 Images**：缩略图在底部，8px × 45px 竖条样式

---

## 布局效果预览

```
电脑端：
┌────┬──────────────────────┐
│ ━ │                      │
│ ━ │      主图片          │
│ ━ │    （屏幕正中央）     │
│ ━ │                      │
│ ━ │                      │
└────┴──────────────────────┘
35px      绝对居中

手机端：
┌──────────────────────────────┐
│                              │
│      主图片                  │
│                              │
│   ━ ━ ━ ━ ━ ━ ━ ━          │
└──────────────────────────────┘
         底部横条
```
