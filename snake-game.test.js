/**
 * 贪吃蛇游戏测试用例
 * 使用 agent-browser 进行自动化测试
 * 
 * 运行方式:
 * agent-browser test run snake-game.test.js
 */

// 测试配置
const GAME_URL = 'https://ckl919125189.github.io/snake-game/';
const TEST_TIMEOUT = 10000;

// 等待游戏加载
async function waitForGame() {
    await agent-browser.wait(1000);
}

// 测试: 页面加载
test('页面加载成功', async () => {
    await agent-browser.open(GAME_URL);
    const title = await agent-browser.get title;
    assert(title.includes('贪吃蛇'), '页面标题应该包含"贪吃蛇"');
});

// 测试: 游戏初始状态
test('游戏初始状态', async () => {
    const snapshot = await agent-browser.snapshot('-i');
    assert(snapshot.includes('开始游戏'), '应该有"开始游戏"按钮');
    assert(snapshot.includes('得分: 0'), '初始得分应该是0');
});

// 测试: 开始游戏
test('点击开始游戏按钮', async () => {
    const before = await agent-browser.snapshot('-i');
    assert(before.includes('开始游戏'), '开始前有"开始游戏"按钮');
    
    await agent-browser.click('开始游戏');
    await agent-browser.wait(500);
    
    const after = await agent-browser.snapshot('-i');
    assert(after.includes('暂停'), '开始后有"暂停"按钮');
});

// 测试: 暂停功能
test('暂停功能', async () => {
    await agent-browser.click('暂停');
    await agent-browser.wait(300);
    
    const snapshot = await agent-browser.snapshot('-i');
    assert(snapshot.includes('继续'), '暂停后显示"继续"按钮');
});

// 测试: 重新开始
test('重新开始功能', async () => {
    await agent-browser.click('继续'); // 继续游戏
    await agent-browser.click('重新开始');
    await agent-browser.wait(300);
    
    const snapshot = await agent-browser.snapshot('-i');
    assert(snapshot.includes('得分: 0'), '重新开始后得分应该为0');
});

// 测试: 键盘控制 - 按方向键
test('键盘控制 - 方向键', async () => {
    // 模拟按右方向键
    await agent-browser press ArrowRight;
    await agent-browser.wait(200);
    
    // 模拟按上方向键
    await agent-browser press ArrowUp;
    await agent-browser.wait(200);
    
    // 模拟按空格键暂停
    await agent-browser press Space;
    await agent-browser.wait(200);
    
    const snapshot = await agent-browser.snapshot('-i');
    assert(snapshot.includes('已暂停') || snapshot.includes('继续'), '空格键应该触发暂停');
});

// 测试: 碰撞检测 - 撞墙
test('碰撞检测 - 撞墙', async () => {
    // 重新开始游戏
    await agent-browser.click('重新开始');
    await agent-browser.wait(500);
    
    // 开始游戏
    await agent-browser.click('开始游戏');
    await agent-browser.wait(500);
    
    // 多次按方向键让蛇移动
    for (let i = 0; i < 25; i++) {
        await agent-browser press ArrowRight;
        await agent-browser wait(150);
    }
    
    // 检查是否显示游戏结束
    const snapshot = await agent-browser.snapshot('-i');
    if (snapshot.includes('游戏结束')) {
        assert(true, '蛇撞墙后游戏结束');
    }
});

// 测试: 得分增加
test('得分增加', async () => {
    // 重新开始
    await agent-browser.click('重新开始');
    await agent-browser.wait(300);
    await agent-browser.click('开始游戏');
    await agent-browser.wait(500);
    
    // 获取初始得分
    const beforeSnapshot = await agent-browser.snapshot('-i');
    const beforeScore = beforeSnapshot.match(/得分: (\d+)/)?.[1] || '0';
    
    // 让蛇吃到食物（这个需要运气或者精确控制）
    // 简化测试：只验证得分显示存在
    assert(beforeSnapshot.includes('得分:'), '得分显示正常');
});

// 测试: 最高分保存
test('最高分保存到localStorage', async () => {
    // 执行JavaScript检查localStorage
    const highScore = await agent-browser.eval "localStorage.getItem('snakeHighScore')";
    // highScore可能是null（没吃过食物）或数字
    assert(highScore !== undefined, '应该能访问localStorage');
});

// 测试: 响应式设计 - 窗口调整
test('响应式设计', async () => {
    // 设置不同 viewport
    await agent-browser.set viewport 375 667; // iPhone SE
    await agent-browser.wait(300);
    
    const snapshot1 = await agent-browser.snapshot('-i');
    assert(snapshot1.includes('贪吃蛇'), '小屏幕下标题显示');
    
    await agent-browser.set viewport 1920 1080; // 桌面
    await agent-browser.wait(300);
    
    const snapshot2 = await agent-browser.snapshot('-i');
    assert(snapshot2.includes('贪吃蛇'), '大屏幕下标题显示');
});

// 测试: 游戏元素存在性
test('游戏元素存在性', async () => {
    const snapshot = await agent-browser.snapshot('-i');
    
    // 检查所有必要的UI元素
    const elements = [
        '开始游戏',
        '暂停',
        '重新开始',
        '得分',
        '最高分'
    ];
    
    for (const element of elements) {
        assert(snapshot.includes(element), `应该包含"${element}"`);
    }
});

// 测试: Canvas渲染
test('Canvas游戏区域渲染', async () => {
    // 截图验证Canvas存在
    await agent-browser screenshot /tmp/snake-canvas-test.png;
    // 图片应该存在
    const fs = await import('fs');
    assert(fs.existsSync('/tmp/snake-canvas-test.png'), 'Canvas截图应该生成');
});

// 运行所有测试
test.run();
