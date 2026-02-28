#!/bin/bash
# 贪吃蛇游戏自动化测试脚本 (简化版)
# 运行: bash snake-game.test.sh

GAME_URL="https://ckl919125189.github.io/snake-game/"
PASSED=0
FAILED=0

echo "🧪 开始贪吃蛇游戏测试..."
echo "================================"

# 测试函数
test_case() {
    local name="$1"
    local result="$2"
    if [ "$result" = "PASS" ]; then
        echo "✅ PASS: $name"
        ((PASSED++))
    else
        echo "❌ FAIL: $name"
        ((FAILED++))
    fi
}

# 1. 测试页面加载
echo ""
echo "📋 测试 1: 页面加载"
agent-browser open "$GAME_URL" > /dev/null 2>&1
sleep 1
TITLE=$(agent-browser get title 2>/dev/null | grep -o "贪吃蛇")
if [ -n "$TITLE" ]; then
    test_case "页面加载成功" "PASS"
else
    test_case "页面加载成功" "FAIL"
fi

# 2. 测试游戏标题
echo ""
echo "📋 测试 2: 游戏标题"
SNAPSHOT=$(agent-browser snapshot 2>/dev/null)
if echo "$SNAPSHOT" | grep -q "🐍 贪吃蛇"; then
    test_case "游戏标题显示" "PASS"
else
    test_case "游戏标题显示" "FAIL"
fi

# 3. 测试得分显示
echo ""
echo "📋 测试 3: 得分显示"
if echo "$SNAPSHOT" | grep -q "得分: 0"; then
    test_case "初始得分显示" "PASS"
else
    test_case "初始得分显示" "FAIL"
fi

# 4. 测试最高分显示
echo ""
echo "📋 测试 4: 最高分显示"
if echo "$SNAPSHOT" | grep -q "最高分: 0"; then
    test_case "最高分显示" "PASS"
else
    test_case "最高分显示" "FAIL"
fi

# 5. 测试开始游戏按钮存在
echo ""
echo "📋 测试 5: 开始游戏按钮"
if echo "$SNAPSHOT" | grep -q "button.*开始游戏"; then
    test_case "开始游戏按钮存在" "PASS"
else
    test_case "开始游戏按钮存在" "FAIL"
fi

# 6. 测试暂停按钮存在
echo ""
echo "📋 测试 6: 暂停按钮"
if echo "$SNAPSHOT" | grep -q "button.*暂停"; then
    test_case "暂停按钮存在" "PASS"
else
    test_case "暂停按钮存在" "FAIL"
fi

# 7. 测试重新开始按钮存在
echo ""
echo "📋 测试 7: 重新开始按钮"
if echo "$SNAPSHOT" | grep -q "button.*重新开始"; then
    test_case "重新开始按钮存在" "PASS"
else
    test_case "重新开始按钮存在" "FAIL"
fi

# 8. 测试Canvas渲染
echo ""
echo "📋 测试 8: Canvas渲染"
agent-browser screenshot /tmp/snake-test.png 2>/dev/null
if [ -f /tmp/snake-test.png ]; then
    SIZE=$(stat -c%s /tmp/snake-test.png 2>/dev/null || stat -f%z /tmp/snake-test.png 2>/dev/null)
    if [ "$SIZE" -gt 1000 ]; then
        test_case "Canvas截图生成" "PASS"
    else
        test_case "Canvas截图生成" "FAIL"
    fi
else
    test_case "Canvas截图生成" "FAIL"
fi

# 9. 测试响应式 - 小屏幕
echo ""
echo "📋 测试 9: 响应式 - 手机"
agent-browser set viewport 375 667 2>/dev/null
sleep 0.5
SNAPSHOT=$(agent-browser snapshot 2>/dev/null)
if echo "$SNAPSHOT" | grep -q "贪吃蛇"; then
    test_case "手机端响应式" "PASS"
else
    test_case "手机端响应式" "FAIL"
fi

# 10. 测试响应式 - 大屏幕
echo ""
echo "📋 测试 10: 响应式 - 桌面"
agent-browser set viewport 1920 1080 2>/dev/null
sleep 0.5
SNAPSHOT=$(agent-browser snapshot 2>/dev/null)
if echo "$SNAPSHOT" | grep -q "贪吃蛇"; then
    test_case "桌面端响应式" "PASS"
else
    test_case "桌面端响应式" "FAIL"
fi

# 11. 测试操作说明显示
echo ""
echo "📋 测试 11: 操作说明"
if echo "$SNAPSHOT" | grep -q "方向键"; then
    test_case "操作说明显示" "PASS"
else
    test_case "操作说明显示" "FAIL"
fi

# 12. 测试localStorage访问
echo ""
echo "📋 测试 12: localStorage"
STORAGE=$(agent-browser eval "localStorage.getItem('snakeHighScore')" 2>/dev/null)
if [ -n "$STORAGE" ] || [ "$STORAGE" = "null" ]; then
    test_case "localStorage可访问" "PASS"
else
    test_case "localStorage可访问" "FAIL"
fi

# 清理
agent-browser close 2>/dev/null

# 测试结果汇总
echo ""
echo "================================"
echo "🧪 测试结果汇总"
echo "================================"
echo "✅ 通过: $PASSED"
echo "❌ 失败: $FAILED"
echo "📊 总计: $((PASSED + FAILED))"

if [ $FAILED -eq 0 ]; then
    echo ""
    echo "🎉 所有测试通过！"
    exit 0
else
    echo ""
    echo "⚠️  有 $FAILED 项测试失败"
    exit 1
fi
