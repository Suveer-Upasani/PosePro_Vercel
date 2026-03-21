# PosePro | AI Launcher

A premium, high-performance redirector built for Vercel. This app serves as a centralized "Launchpad" for your local AI backend (running via ngrok).

## 🚀 Features
- **Modern AI Aesthetic:** Glassmorphism UI with smooth animations.
- **Dynamic URL Management:** Update your live ngrok link directly from the browser without redeploying.
- **Persistence:** Saved URLs are stored in `localStorage`, so your link stays active even after refreshes.
- **Instant Redirect:** One-click launch to your live AI session.

## 🛠️ Local Development

1. **Clone the project** to your local machine.
2. **Run a local server** to avoid CORS issues:
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   ```
3. Open your browser to `http://localhost:8000`.
4. Enter your current ngrok link in the **"Update Live ngrok URL"** box and click **Save**.
5. Click **Launch Live Session**.

## ☁️ Deployment to Vercel

### Option 1: Drag & Drop (Recommended)
1. Go to [vercel.com/import/project](https://vercel.com/import/project).
2. Drag and drop this folder onto the page.
3. Your site will be live in seconds!

### Option 2: Vercel CLI
1. Install the CLI: `npm install -g vercel`
2. Run `vercel` in this folder.
3. Follow the prompts to deploy.

## 🔄 Updating Your Link
Since ngrok links are temporary, you can update your live site at any time:
1. Open your live Vercel URL (e.g., `https://pose-pro.vercel.app`).
2. Paste your new `https://xxxx.ngrok-free.app` link into the settings box.
3. Click **Save**.
4. The "Launch" button will now point to your new session instantly.

## 📁 Project Structure
- `index.html`: The main landing page.
- `style.css`: Premium AI SaaS styling.
- `script.js`: Redirection and URL management logic.
- `config.json`: Default configuration file.
