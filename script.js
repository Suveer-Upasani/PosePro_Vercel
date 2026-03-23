let ngrokUrl = "";

const startBtn = document.getElementById('start-btn');
const urlInput = document.getElementById('url-input');
const passwordInput = document.getElementById('password-input');
const statusDot = document.getElementById('status-dot');
const statusText = document.getElementById('status-text');
const msg = document.getElementById('msg');

// Load saved URL from Global Database (Vercel KV) on startup
window.addEventListener('load', async () => {
    try {
        const res = await fetch('/api/get-url');
        const data = await res.json();
        
        if (data && data.url) {
            ngrokUrl = data.url;
            urlInput.value = data.url;
            updateStatus(true);
        } else {
            // Fallback to config.json if KV is empty
            const configRes = await fetch('config.json');
            const configData = await configRes.json();
            ngrokUrl = configData.url;
            urlInput.value = configData.url;
            updateStatus(true);
        }
    } catch (e) {
        console.error("Error fetching URL:", e);
        updateStatus(false);
    }
});

async function saveUrl() {
    const newUrl = urlInput.value.trim();
    const password = passwordInput.value.trim();

    if (!newUrl.startsWith('http')) {
        alert("Please enter a valid URL starting with http");
        return;
    }

    if (!password) {
        alert("Please enter the password to save changes.");
        return;
    }

    try {
        msg.textContent = "Saving...";
        const response = await fetch('/api/update-url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: newUrl, password: password })
        });

        const result = await response.json();

        if (response.ok) {
            ngrokUrl = newUrl;
            updateStatus(true);
            msg.textContent = "✓ URL Saved Permanently (Global)";
            passwordInput.value = ""; // Clear password
            setTimeout(() => msg.textContent = "", 3000);
        } else {
            msg.textContent = "❌ " + (result.error || "Failed to save");
            msg.style.color = "red";
            setTimeout(() => {
                msg.textContent = "";
                msg.style.color = "";
            }, 3000);
        }
    } catch (e) {
        console.error("Save error:", e);
        alert("An error occurred while saving.");
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
