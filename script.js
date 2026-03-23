// script.js

// 步驟一：先抓取 HTML 裡面我們預留好 id 的元素
const countdownElement = document.getElementById('countdown');
const valveBtn = document.getElementById('valve-btn');
const powerDisplay = document.getElementById('power-display'); // 顯示數字
const batteryBar = document.getElementById('battery-bar'); // 電池條 (控制寬度)

// --- 功能一：30 秒自動重試倒數計時器 ---
let timeLeft = 30; // 設定初始倒數秒數

// 使用 setInterval 設定一個計時器，每 1000 毫秒（1秒）執行一次裡面的邏輯
const countdownTimer = setInterval(() => {
    timeLeft--; // 每次執行把時間減 1
    countdownElement.textContent = timeLeft; // 將最新的秒數更新到網頁畫面上

    // 判斷：如果倒數到 0 了該怎麼辦？
    if (timeLeft <= 0) {
        clearInterval(countdownTimer); // 停止計時器，避免出現負數
        countdownElement.textContent = "0"; // 確保畫面顯示 0
        
        // 改變按鈕文字，提示使用者即將重整
        valveBtn.textContent = "正在重新連線伺服器..."; 
        
        // 為了逼真，我們用 setTimeout 設定在 1 秒後真的重新整理網頁
        setTimeout(() => {
            window.location.reload(); 
        }, 1000);
    }
}, 1000);


// --- 功能二：防焦慮舒壓小互動（點擊發電） ---
let powerGenerated = 0; // 設定初始電力為 0
const powerGoal = 1000; // 設定電力總目標 (可以依需求修改)

// 監聽按鈕點擊事件
valveBtn.addEventListener('click', () => {
    // 只有在還沒倒數完的時候可以點擊
    if (timeLeft > 0) {
        powerGenerated += 10; // 每次點擊增加 10 瓦特
        
        // 1. 更新電力數字顯示 (例如：100 W / 1000 W)
        powerDisplay.textContent = powerGenerated;
        
        // 2. 計算目前電力佔目標的百分比 (例如：100 / 1000 * 100 = 10%)
        let percentage = (powerGenerated / powerGoal) * 100;
        
        // 3. 確保百分比不會超過 100%
        if (percentage > 100) percentage = 100;
        
        // 核心動態回饋：將計算好的百分比應用到 CSS 的 width 屬性上
        // 因為 CSS 加了 transition，所以電力條會平滑地往右移
        batteryBar.style.width = percentage + '%'; 
        
        // 4. (選做) 如果電力滿了，可以給按鈕一個不同的狀態
        if (powerGenerated >= powerGoal) {
            valveBtn.textContent = "電力已充飽！";
            valveBtn.style.background = "#FFD700"; // 變成金黃色按鈕
            valveBtn.style.color = "#171a21";
        }
    }
});