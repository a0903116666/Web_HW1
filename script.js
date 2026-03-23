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
valveBtn.addEventListener('click', (event) => {
    // 只有在還沒倒數完的時候可以點擊
    if (timeLeft > 0) {
        powerGenerated += 10; // 每次點擊增加 10 瓦特
        
        // 1. 更新電力數字顯示與電池條 (原本的邏輯)
        powerDisplay.textContent = powerGenerated;
        let percentage = (powerGenerated / powerGoal) * 100;
        if (percentage > 100) percentage = 100;
        batteryBar.style.width = percentage + '%'; 
        
        if (powerGenerated >= powerGoal) {
            valveBtn.textContent = "電力已充飽！";
            valveBtn.style.background = "#FFD700"; // 變成金黃色按鈕
            valveBtn.style.color = "#171a21";
        }

        // 2. ⭐⭐⭐⭐ 新增功能：在點擊處新增閃電特效 ⭐⭐⭐⭐
        
        // A. 動態生成一個 <div> 作為閃電貼圖容器
        const lightning = document.createElement('div');
        lightning.classList.add('lightning-particle'); // 應用 CSS 樣式與動畫
        lightning.textContent = '⚡'; // 填入閃電 (可以依需求換成圖案)

        // B. 精確計算點擊位置 (使用 event.clientX / clientY，相對於視窗的座標)
        // 因為 CSS 加了 translate(-50%, -50%)，所以這裡直接設定 left/top 即可
        lightning.style.left = `${event.clientX}px`;
        lightning.style.top = `${event.clientY}px`;

        // C. 將閃電貼圖加入到網頁身體 (body) 中，讓它顯示
        document.body.appendChild(lightning);

        // D. ❗❗❗核心設定：設定在動畫結束後 (1s = 1000ms)，自動刪除這個閃電元素❗❗❗
        // 這是為了避免網頁產生數千個用不到的閃電，導致網頁變卡 (DOM leak)。
        setTimeout(() => {
            lightning.remove(); 
        }, 1000); // 必須與 CSS 動畫持續時間一致
    }
});