# 🐍 贪吃蛇游戏 (Snake Game)

一个使用 HTML5 Canvas开发的网页版贪吃蛇游戏，带有炫酷的霓虹视觉效果。

![Game Preview](https://img.shields.io/badge/HTML5-Canvas-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## 🎮 游戏规则

- **目标**: 控制蛇吃到食物，获得尽可能高的分数
- **失败条件**: 
  - 蛇头撞到墙壁
  - 蛇头撞到自己的身体
- **得分**: 每吃到一个食物 +10 分
- **最高分**: 自动保存到浏览器本地存储 (localStorage)

## ⌨️ 操作说明

### 键盘控制

| 按键 | 功能 |
|------|------|
| `↑` / `W` | 向上移动 |
| `↓` / `S` | 向下移动 |
| `←` / `A` | 向左移动 |
| `→` / `D` | 向右移动 |
| `空格` | 暂停/继续 |

### 按钮控制

- **开始游戏**: 点击开始游戏
- **暂停**: 暂停游戏
- **重新开始**: 重新开始游戏

### 手机端

点击 Canvas 区域显示方向按钮进行控制。

## 🚀 项目启动

### 方法一: 直接打开 HTML 文件

```bash
# 进入项目目录
cd snake-game

# 用浏览器打开
# 直接双击 index.html 或:
open index.html        # macOS
xdg-open index.html   # Linux
```

### 方法二: 使用本地服务器

```bash
# Python 3
python -m http.server 8000

# Node.js (需要 http-server)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

然后访问: http://localhost:8000

### 方法三: GitHub Pages (在线访问)

直接访问: https://ckl919125189.github.io/snake-game/

## 🧪 测试

### 运行测试脚本

```bash
cd snake-game
bash snake-game.test.sh
```

### 测试项目

| # | 测试项 | 说明 |
|---|--------|------|
| 1 | 页面加载 | 验证游戏页面正常加载 |
| 2 | 游戏标题 | 验证标题显示正确 |
| 3 | 得分显示 | 验证初始得分为 0 |
| 4 | 最高分显示 | 验证最高分显示 |
| 5 | 开始游戏按钮 | 验证按钮存在 |
| 6 | 暂停按钮 | 验证按钮存在 |
| 7 | 重新开始按钮 | 验证按钮存在 |
| 8 | Canvas渲染 | 验证游戏区域正常渲染 |
| 9 | 手机端响应式 | 验证小屏幕适配 |
| 10 | 桌面端响应式 | 验证大屏幕适配 |
| 11 | 操作说明 | 验证说明文字显示 |
| 12 | localStorage | 验证本地存储可访问 |

### 测试输出示例

```
🧪 开始贪吃蛇游戏测试...
================================
📋 测试 1: 页面加载
✅ PASS: 页面加载成功
...
🎉 所有测试通过！
✅ 通过: 12
❌ 失败: 0
📊 总计: 12
```

## 🛠️ 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式和动画
- **JavaScript** - 游戏逻辑
- **Canvas API** - 游戏渲染

## 📁 项目结构

```
snake-game/
├── index.html          # 游戏主文件
├── snake-game.test.sh # 测试脚本
├── snake-game.test.js # Node.js 测试用例
└── README.md          # 项目说明
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License
