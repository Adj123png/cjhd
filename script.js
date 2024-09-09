document.addEventListener('DOMContentLoaded', () => {
    const drawButton = document.getElementById('drawButton');
    const result = document.getElementById('result');
    const prizeList = document.getElementById('prizeList');
    const spinner = document.getElementById('spinner');
    const winSound = document.getElementById('winSound');

    // 初始化奖品列表
    const prizes = [
        { name: 'iPhone 15', quantity: 2 },
        { name: 'iPad Mini', quantity: 3 },
        { name: 'AirPods Pro', quantity: 5 },
        { name: '50元代金券', quantity: 10 }
    ];

    // 更新奖品列表
    function updatePrizeList() {
        prizeList.innerHTML = '';
        prizes.forEach(prize => {
            const li = document.createElement('li');
            li.textContent = `${prize.name} - 剩余 ${prize.quantity}`;
            prizeList.appendChild(li);
        });
    }

    // 播放中奖提示音
    function playWinSound(prizeName) {
        winSound.play().catch(error => {
            console.error('播放音效失败:', error);
        });
        const msg = new SpeechSynthesisUtterance(`恭喜你获得 ${prizeName}`);
        window.speechSynthesis.speak(msg);
    }

    // 抽奖逻辑
    function drawPrize() {
        spinner.style.display = 'block'; // 显示转盘
        drawButton.disabled = true; // 禁用按钮避免重复点击

        setTimeout(() => {
            spinner.style.display = 'none'; // 隐藏转盘
            drawButton.disabled = false; // 启用按钮

            // 按概率调整中奖结果
            const availablePrizes = prizes.filter(prize => prize.quantity > 0);
            if (availablePrizes.length === 0) {
                result.textContent = '所有奖品已抽完！';
                return;
            }

            // 提高代金券的中奖概率
            let selectedPrize;
            if (Math.random() < 0.7) { // 70% 概率为代金券
                selectedPrize = prizes.find(prize => prize.name === '50元代金券');
            } else {
                const randomIndex = Math.floor(Math.random() * availablePrizes.length);
                selectedPrize = availablePrizes[randomIndex];
            }

            // 更新奖品数量
            selectedPrize.quantity -= 1;
            result.textContent = `恭喜你抽中了：${selectedPrize.name}！`;
            playWinSound(selectedPrize.name); // 播放提示音
            updatePrizeList(); // 更新奖品列表
        }, 2000); // 模拟抽奖等待时间
    }

    drawButton.addEventListener('click', drawPrize);
    updatePrizeList(); // 初始化奖品列表
});
