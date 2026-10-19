# 🚀 Robust MERN Stack CRUD Application (with Auth Roadmap)

A complete full-stack **CRUD (Create, Read, Update, Delete)** application built using the modern **MERN stack**. This repository contains a production-ready **Express 5** backend architecture integrated with **Mongoose 9** for seamless MongoDB data management, along with a responsive **React** frontend.

---

## 🛠️ Tech Stack & Dependencies

### Backend (`server/`)
- **Runtime Environment:** Node.js (CommonJS)
- **Framework:** Express.js (v5.3.0) — *Utilizing the latest asynchronous routing capabilities*
- **Database ORM:** Mongoose (v9.11.2) — *For strict and scalable data modeling*
- **Cross-Origin Resource Sharing:** CORS (v2.8.6) — *Secured cross-origin API requests*
- **Environment Management:** Dotenv (v18.0.8) — *Keeps secrets and API keys safe*
- **Development Tool:** Nodemon (v3.1.14) — *Automated server restarts during development*

### Frontend (`client/`)
- **Framework:** React.js (via Vite)
- **HTTP Client:** Axios — *For seamless REST API consumption*

---

## 🔒 Security & Authentication Roadmap (Coming Soon 🛠️)
The application is currently transitioning into a secure ecosystem. The upcoming release will implement:
- **User Authentication:** JSON Web Tokens (JWT) for secure, stateless session handling.
- **Password Hashing:** `bcrypt` integration to ensure absolute privacy and security of user credentials.
- **Protected Routes:** Middleware implementation to restrict CRUD endpoints to authenticated users only.

---

## ⚙️ Features Implemented

- **Modern Express 5 Setup:** Built with the latest stable dependencies and asynchronous error handling.
- **RESTful API Architecture:** Clean separation of concerns with structured Controllers, Models, and Routes.
- **CORS Configured:** Secure and seamless connection between the Vite frontend and Node backend.
- **Environment Isolation:** Zero-hardcoded credentials using structural `.env` integration.

---

## 📦 Project Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com
cd crud-mern
```

### 2. Configure Backend Environment
Create a `.env` file inside the `server/` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

### 3. Run the Development Servers

#### Start Backend:
```bash
cd server
npm install
npm run dev
```
*The backend server will spin up on port `5000` (or your configured port) with automatic reloading via nodemon.*

#### Start Frontend:
```bash
cd ../client
npm install
npm run dev
```

---

## 📂 Project Structure Overview
```text
├── client/                 # React frontend code (Vite configuration)
└── server/                 # Node.js Express backend
    ├── controller/         # Request handling logic (e.g., book.controller.js)
    ├── model/              # MongoDB Mongoose schemas (e.g., book.model.js)
    ├── routes/             # REST API endpoint definitions (e.g., book.routes.js)
    ├── database.js         # MongoDB connection config
    ├── index.js            # App entry point
    └── package.json        # Backend configuration & scripts
```
