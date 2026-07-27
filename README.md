# 🚀 HackVerse — Hackathon Management Platform

[![Live App](https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel)](https://hack-verse-gamma.vercel.app/)
[![Backend API](https://img.shields.io/badge/API-Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)](https://hackverse-7tnb.onrender.com/)

**HackVerse** is an end-to-end, enterprise-grade Hackathon Management Platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Designed for seamless hackathon organization, team formation, project submissions, judging evaluations, and automated leaderboards.

---

## 🌐 Live Deployment Links

- **Frontend App (Vercel)**: [https://hack-verse-gamma.vercel.app/](https://hack-verse-gamma.vercel.app/)
- **Backend API (Render)**: [https://hackverse-7tnb.onrender.com/](https://hackverse-7tnb.onrender.com/)
- **API Documentation**: [https://hackverse-7tnb.onrender.com/api-docs](https://hackverse-7tnb.onrender.com/api-docs)

---

## ✨ Key Features

- 🔐 **Role-Based Auth**: Secure JWT authentication supporting `ADMIN`, `ORGANIZER`, `JUDGE`, and `PARTICIPANT`.
- 🏆 **Hackathon Management**: Full lifecycle tracking, auto-slug generation, registration controls, and custom rules.
- 👥 **Team Formation**: Create teams, invite members via `teamCode` / `inviteCode`, and manage team rosters.
- 📝 **Project Submissions**: Multipart form submission with deck uploads and edit lock during evaluation.
- ⚖️ **7-Criteria Evaluation Engine**: Structured judge scoring with automated score computation.
- 📊 **Real-time Leaderboard**: Instant rank calculation based on judge scores with tie-breaker logic.
- 📜 **Automated PDF Certificates**: Instant issuance of verified certificates for participants and winners.
- 🛡️ **Production Hardened**: Rate limiting, GZIP compression, CORS policy, Security headers (Helmet), and query sanitization.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, React Router v7, TailwindCSS, Lucide Icons, Framer Motion
- **Backend**: Node.js, Express 5, MongoDB, Mongoose
- **Deployment**: Vercel (Frontend), Render (Backend), MongoDB Atlas (Database)

---

## 💻 Local Development Setup

### 1. Clone & Install
```bash
git clone https://github.com/trishyanigam/HackVerse.git
cd HackVerse
```

### 2. Run Backend
```bash
cd backend
npm install
npm run dev
```

### 3. Run Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 📄 License

This project is licensed under the **ISC License**.
