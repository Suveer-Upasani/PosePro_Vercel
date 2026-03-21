let ngrokUrl = "";

const startBtn = document.getElementById('start-btn');
const urlInput = document.getElementById('url-input');
const statusDot = document.getElementById('status-dot');
const statusText = document.getElementById('status-text');
const msg = document.getElementById('msg');

// Load saved URL on startup
window.addEventListener('load', async () => {
    let saved = localStorage.getItem('posepro_ngrok_url');
    
    if (!saved) {
        try {
            const res = await fetch('config.json');
            const data = await res.json();
            saved = data.url;
        } catch (e) {
            console.warn("Config not found.");
        }
    }

    if (saved) {
        ngrokUrl = saved;
        urlInput.value = saved;
        updateStatus(true);
    }
});

function saveUrl() {
    const newUrl = urlInput.value.trim();
    if (newUrl.startsWith('http')) {
        localStorage.setItem('posepro_ngrok_url', newUrl);
        ngrokUrl = newUrl;
        updateStatus(true);
        msg.textContent = "✓ URL Saved Successfully";
        setTimeout(() => msg.textContent = "", 2000);
    } else {
        alert("Please enter a valid URL starting with http");
    }
}

function updateStatus(isOnline) {
    if (isOnline) {
        statusDot.className = 'status-dot online';
        statusText.textContent = '🟢 Live';
    } else {
        statusDot.className = 'status-dot offline';
        statusText.textContent = '🔴 Offline';
    }
}

startBtn.addEventListener('click', () => {
    if (ngrokUrl) {
        startBtn.textContent = "Connecting...";
        window.location.href = ngrokUrl;
    } else {
        alert("Please update the ngrok URL below first.");
    }
});
