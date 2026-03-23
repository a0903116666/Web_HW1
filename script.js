// script.js

// 步驟一：先抓取 HTML 裡面我們預留好 id 的元素
const countdownElement = document.getElementById('countdown');
const valveBtn = document.getElementById('valve-btn');

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

// 幫按鈕加上一個「事件監聽器」，當使用者點擊 (click) 時觸發動作
valveBtn.addEventListener('click', () => {
    // 只有在還沒倒數完的時候可以點擊
    if (timeLeft > 0) {
        powerGenerated += 10; // 每次點擊增加 10 瓦特
        // 將發電量顯示在按鈕上，給予使用者即時的回饋感
        valveBtn.textContent = `已協助產生 ${powerGenerated} 瓦特電力！`; 
    }
});