# HARRY6 艺术家个人网站

极简风格的艺术家个人网站，用于展示作品。

---

## 🌐 在线地址

https://wenhaoliu6688-del.github.io/my-art-website/

---

## 📂 项目结构

```
├── index.html       # 首页（p5.js 互动封面 + 导航）
├── about/           # 关于页面
├── projects/        # 作品集页面
├── images/          # 图片页面
├── CHANGELOG.md     # 更新日志（记录每次修改）
├── TODO.md          # 待办事项（记录问题和计划）
└── CLAUDE.md        # AI 协作规则（给 Claude Code 看）
```

---

## 🚀 本地运行

1. 在项目目录打开终端
2. 运行本地服务器（任选一种）：

```bash
# Python
python -m http.server 8000

# Node.js (需要先安装 npx)
npx serve

# 然后打开浏览器访问
# http://localhost:8000
```

---

## 📝 如何继续完善网站

### 第一步：查看进度
```bash
# 查看待办事项
cat TODO.md

# 查看更新日志
cat CHANGELOG.md
```

### 第二步：开始工作
1. 打开 Claude Code：`claude`
2. 告诉 Claude 你想做什么
3. Claude 会根据 CLAUDE.md 的规则帮你修改

### 第三步：保存进度
```bash
# 查看改动
git status

# 提交改动
git add .
git commit -m "描述你做了什么"

# 推送到 GitHub
git push
```

---

## ⚠️ 重要规则

- 每次只改一个问题
- 修改前先说明改哪里、为什么改
- 必须使用 git 记录每次改动
- 详见 `CLAUDE.md`
