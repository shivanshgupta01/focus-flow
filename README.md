# ⚡ FocusFlow

> **Deep work. Minimal distractions. Maximum productivity.**

A sleek, feature-rich Pomodoro timer web app where you track your tasks, visualize your focus trends, and build daily productivity streaks — all saved instantly to your device.

![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=flat-square&logo=react)
![Styled with Tailwind](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=flat-square&logo=tailwind-css)
![State by Zustand](https://img.shields.io/badge/State-Zustand-orange?style=flat-square)
![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square&logo=vercel)
![100% Private](https://img.shields.io/badge/Data-100%25%20Local-green?style=flat-square)

---

## ✨ Features

- 🍅 **Customizable Timer** — Set your own Focus and Break durations.
- 📝 **Task Tracking** — Define what you're working on before hitting start.
- 🔔 **Audio & Notifications** — Built-in browser chimes and desktop popups when time is up.
- 🔥 **Streak Tracking** — Live streak counter that grows as you complete daily sessions.
- 📊 **Productivity Analytics** — Recharts-powered dashboard tracking total sessions and focus time.
- 📥 **CSV Export** — Download your full focus history and task logs with one click.
- 🌙 **Dark/Light Mode** — Beautifully styled themes that respect your eyes.
- ⚡ **Smooth Animations** — Framer Motion provides a premium, buttery-smooth feel.
- 💾 **No Login Required** — Everything is saved instantly to your browser's Local Storage.

---

## 🌐 Live Demo

🔗 **[focus-flow-rho-snowy.vercel.app](https://focus-flow-rho-snowy.vercel.app/)**

---

## 🚀 How It Works

```text
User opens app
       ↓
Toggles Dark/Light mode if desired
       ↓
Sets custom Focus & Break durations
       ↓
Enters their current task
       ↓
Starts the timer (Focus Mode)
       ↓
Timer hits 00:00 → Chime plays & Notification appears
       ↓
App auto-switches to Break Mode
       ↓
Analytics dashboard updates live (Streaks & Total Time)
       ↓
Data saved to Local Storage instantly 🔥
```

---

## 🎨 Design

- **Style:** Clean, minimal, modern card-based UI
- **Typography:** System Sans-Serif for maximum readability and speed
- **Animations:** Smooth scale-ups on timer mount, seamless layout transitions
- **Mobile First:** Fully responsive and beautiful on all screen sizes

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React 19 | Frontend framework |
| Vite | Lightning-fast build tool |
| Tailwind CSS v4 | Utility-first styling |
| Zustand | Global state & LocalStorage persistence |
| Recharts | Data visualization & analytics dashboard |
| Framer Motion | Smooth UI animations |
| Vercel | Deployment & hosting |

---

## 📁 Project Structure

```text
focus-flow/
├── src/
│   ├── components/
│   │   ├── Analytics.jsx    ← Recharts dashboard & CSV export
│   │   ├── Settings.jsx     ← Custom duration inputs
│   │   └── Timer.jsx        ← Main Pomodoro logic & UI
│   ├── store/
│   │   └── useTimerStore.js ← Zustand state & persistence
│   ├── App.jsx              ← Main layout & Theme toggle
│   ├── index.css            ← Tailwind v4 configuration
│   └── main.jsx             ← React entry point
├── index.html
├── vite.config.js
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- npm v9+

### Installation

```bash
# Clone the repository
git clone https://github.com/shivanshgupta01/focus-flow.git

# Navigate into the project
cd focus-flow

# Install dependencies
npm install
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) ✅

---

## 🚀 Deployment on Vercel

### Step 1 — Push to GitHub
```bash
git add .
git commit -m "initial commit"
git branch -M main
git push -u origin main
```

### Step 2 — Deploy on Vercel
1. Go to **vercel.com** and import your repository
2. Vercel auto-detects Vite and React.
3. Click **Deploy** ✅

### Step 3 — Future Updates
Every time you make changes just run:
```bash
git add .
git commit -m "your update message"
git push origin main
```
Vercel auto-deploys in 30 seconds ✅

---

## 🔐 Privacy & Data Notes

- **100% Local:** FocusFlow uses zero external databases. 
- All session history, streaks, and settings are saved securely in your browser's `localStorage`.
- No tracking, no accounts, no server data collection.

---

## 🗺️ Roadmap

- [ ] Add custom sound selections (Nature, Lo-Fi, Bells)
- [ ] Task tagging / categorization
- [ ] Spotify / YouTube Lo-Fi player integration
- [ ] Cloud sync option via Supabase (for multi-device tracking)
- [ ] PWA support — installable on phone/desktop

---

## 🏗️ Part of 30 Days Mini Projects

This app is **Day 03** of my **30 Days Mini Projects** challenge — building one web app every day.

| Day | Project | Status |
|---|---|---|
| 01 | Daily Habit Tracker | ✅ Live |
| 02 | Skill Progress Tracker | ✅ Live |
| 03 | Focus Timer (FocusFlow) | ✅ Live |
| 04 | Accountability Board | ✅ Live |

---

## 👨‍💻 Author

**Shivansh Gupta**
- Instagram: [@flowkraftai](https://www.instagram.com/flowkraftai)
- GitHub: [@shivanshgupta01](https://github.com/shivanshgupta01)

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

<p align="center">Built with ❤️ by Shivansh Gupta</p>
<p align="center">⭐ Star this repo if you found it useful!</p>
