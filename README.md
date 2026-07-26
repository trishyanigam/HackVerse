# HackVerse — Enterprise Hackathon Management Platform

[![CI/CD Pipeline](https://github.com/trishyanigam/HackVerse/actions/workflows/node.yml/badge.svg)](https://github.com/trishyanigam/HackVerse/actions)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![Swagger API Docs](https://img.shields.io/badge/Swagger-OpenAPI%203.0-green.svg)](http://localhost:5000/api-docs)

HackVerse is an end-to-end, enterprise-grade Hackathon Management Platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Designed for scalability, security, and developer productivity, HackVerse streamlines hackathon creation, participant registration, team formation, project submissions, judge evaluations, automated ranking leaderboards, PDF certificate generation, and real-time analytics.

---

## 🚀 Key Features

- 🔐 **Authentication & Role-Based Authorization**: JWT access/refresh token rotation, HTTP-only cookie support, password reset workflows, and multi-role guards (`ADMIN`, `ORGANIZER`, `JUDGE`, `PARTICIPANT`).
- 🏆 **Hackathon Lifecycle Management**: Full CRUD support with auto-slug generation, image uploads, registration open/close controls, status transitions, and timeline tracking.
- 👥 **Team Formation & Invitations**: Auto-leader binding, unique `teamCode` and `inviteCode` generation, max members enforcement, leadership transfer, and invite link management.
- 📝 **Project Submissions**: Multipart form submission with screenshots and PDF deck uploads, deadline enforcement, and edit locks during review.
- ⚖️ **7-Criteria Judge Evaluation Engine**: Structured 0-10 scoring across Innovation, Technical Complexity, UI/UX, Functionality, Scalability, Documentation, and Presentation.
- 📊 **Automated Leaderboard & Tie-Breaker Algorithm**: Instant rank generation based on average judge scores with submission timestamp tie-breaking.
- 📜 **PDFKit Certificate Generation**: Automated issuance of verified PDF certificates for Winners, Runners-Up, Participants, and Judges.
- 📈 **Analytics & Report Exporter**: Real-time platform metrics, interactive charts, and `json2csv` exporter.
- ⏰ **Automated Background Schedulers**: Node-cron background jobs for deadline reminders, judge notifications, and cleanup tasks.
- 🛡️ **Production Hardening**: Rate limiting, GZIP compression, HTTP Parameter Pollution protection, MongoDB injection sanitization, Helmet security headers, and Swagger OpenAPI 3.0 documentation.

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|------------|
| **Backend Runtime** | Node.js (v20+ LTS), Express.js (v5) |
| **Database** | MongoDB, Mongoose ORM |
| **Authentication** | JSON Web Tokens (JWT), bcrypt |
| **Documentation** | Swagger UI Express, Swagger JSDoc (OpenAPI 3.0) |
| **Security** | Helmet, Express Rate Limit, HPP, Mongo Sanitize |
| **File Processing** | Multer, PDFKit |
| **Scheduling & Exports** | Node-Cron, json2csv, Nodemailer |
| **Testing** | Jest, Supertest |
| **Containerization & CI** | Docker, Docker Compose, GitHub Actions |

---

## 🏗️ Architecture & Folder Structure

```
HackathonManagement/
├── .github/
│   └── workflows/
│       └── node.yml               ← CI/CD pipeline workflow
├── backend/
│   ├── config/
│   │   ├── database.js            ← MongoDB connection setup
│   │   ├── multer.js              ← Disk storage configuration
│   │   └── swagger.js             ← Swagger OpenAPI specification
│   ├── constants/                 ← Global enums & role definitions
│   ├── controllers/               ← Thin HTTP request handlers
│   ├── middleware/                ← Security, auth, validation, upload middleware
│   ├── models/                    ← Mongoose schema models
│   ├── routes/                    ← Express router declarations
│   ├── services/                  ← Core business & domain logic services
│   ├── tests/                     ← Jest & Supertest integration test suite
│   ├── uploads/                   ← Local static file storage
│   ├── utils/                     ← Helper utilities (JWT, logger, password)
│   ├── validators/                ← express-validator schemas
│   ├── app.js                     ← Express app bootstrap & middleware setup
│   ├── Dockerfile                 ← Backend Docker container definition
│   ├── package.json               ← Node dependencies & scripts
│   └── server.js                  ← HTTP server listener & cron bootstrapper
├── docs/
│   └── architecture.md            ← In-depth architectural workflow specs
├── frontend/                      ← Vite React frontend application
├── docker-compose.yml             ← Multi-container orchestration (Mongo, Backend, Frontend)
├── .env.production.example        ← Production environment variables template
└── README.md                      ← Project documentation
```

---

## ⚡ Quick Start & Installation

### Prerequisites
- Node.js >= 20.x
- MongoDB (Local instance or MongoDB Atlas URI)
- Git & Docker (optional)

### 1. Clone Repository
```bash
git clone https://github.com/trishyanigam/HackVerse.git
cd HackathonManagement
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
```
*Configure `MONGO_URI` and `JWT_ACCESS_SECRET` in `.env`.*

### 3. Run Local Development Server
```bash
npm run dev
```
The backend API will be available at: `http://localhost:5000/api/v1`  
Interactive Swagger API documentation: `http://localhost:5000/api-docs`

---

## 🧪 Testing

Run unit and integration test suites using Jest and Supertest:
```bash
cd backend
npm test
```

---

## 🐳 Docker Deployment

To spin up the entire production stack (MongoDB, Express Backend, React Frontend) via Docker Compose:

```bash
docker-compose up --build -d
```

- **Frontend Application**: `http://localhost:5173`
- **Backend API Server**: `http://localhost:5000`
- **Swagger Documentation**: `http://localhost:5000/api-docs`

---

## 📖 API Documentation Summary

| Endpoint Group | Base Path | Key Capabilities |
|----------------|-----------|------------------|
| **Auth** | `/api/v1/auth` | Register, Login, Refresh Token, Reset Password, Get Profile |
| **Hackathons** | `/api/v1/hackathons` | CRUD, Search, Filter, Open/Close Registration, My Hackathons |
| **Registrations** | `/api/v1/registrations` | Register, Cancel, Organizer Approval/Rejection |
| **Teams** | `/api/v1/teams` | Create, Join via Code, Invite Members, Transfer Leader, Leave, Disband |
| **Submissions** | `/api/v1/submissions` | Create Project, Upload PDF/Images, Edit, Delete, View |
| **Reviews** | `/api/v1/reviews` | Assigned Submissions, 7-Criteria Scoring, Update Review |
| **Leaderboard** | `/api/v1/leaderboard` | Generate Ranks, Publish Results, Export CSV |
| **Notifications** | `/api/v1/notifications` | User Notifications, Unread Counter, Mark Read, Delete |
| **Certificates** | `/api/v1/certificates` | Batch Generate PDF Certificates, Download, List |
| **Reports** | `/api/v1/reports` | Dashboard Metrics, Analytics Breakdown, CSV Export |

---

## 🔮 Future Enhancements

- 🌐 Cloud Storage Integration (Cloudinary / AWS S3 SDK wrappers).
- 💬 Real-Time Live Chat & Mentorship Channels via Socket.io.
- 📱 Mobile App SDK Integration for Event Check-Ins.

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).
