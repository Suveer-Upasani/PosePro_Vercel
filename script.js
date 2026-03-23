// Fetch the redirect URL from the file and redirect immediately
async function performRedirect() {
    try {
        const response = await fetch('redirect-url.txt');
        const url = await response.text();
        const trimmedUrl = url.trim();

        if (trimmedUrl && trimmedUrl.startsWith('http')) {
            // Update the Launch button link just in case
            const startBtn = document.getElementById('start-btn');
            if (startBtn) {
                startBtn.onclick = () => window.location.href = trimmedUrl;
                startBtn.textContent = "Redirecting...";
            }

            // Perform automatic redirect
            window.location.href = trimmedUrl;
        } else {
            console.error("No valid URL found in redirect-url.txt");
            const statusText = document.getElementById('status-text');
            if (statusText) statusText.textContent = "🔴 Error: No URL set";
        }
    } catch (error) {
        console.error("Error fetching redirect URL:", error);
    }
}

// Start redirect process
performRedirect();

// Keep the button functional for manually triggering if needed
document.getElementById('start-btn')?.addEventListener('click', () => {
    // This will be handled by the update in performRedirect, but as a fallback:
    performRedirect();
});
