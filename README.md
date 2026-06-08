# 📚 ScholarX – Research Paper Management System

## 📖 Overview

ScholarX is a full-stack research paper management platform that allows researchers and students to upload, manage, search, preview, and organize research papers through a modern web interface.

The system provides separate access for Users and Administrators, making it suitable for academic institutions, research organizations, and educational projects.

---

# 🚀 Features

## 👤 User Features

* User Login & Registration
* Upload Research Papers
* Search Papers
* Preview Uploaded Files
* Download Research Papers
* Delete Papers
* Dashboard Analytics
* Responsive User Interface

## 🛡️ Admin Features

* Admin Login
* View All Uploaded Papers
* Delete Any Paper
* User Management Dashboard
* View Registered Researchers
* Research Activity Monitoring Interface
* System Statistics

---

# 🏗️ Project Architecture

The backend follows the **MVC (Model-View-Controller)** architecture.

```text
Frontend
   │
   ▼
Axios API Requests
   │
   ▼
Routes
   │
   ▼
Controllers
   │
   ▼
Models
   │
   ▼
MongoDB Database
```

---

# 💻 Tech Stack

## Frontend

* React.js
* Vite
* Axios
* Framer Motion
* Recharts
* React Hot Toast

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt Password Hashing
* Multer File Upload Middleware

---

# 📂 Folder Structure

## Backend

```text
Backend/
│
├── config/
│
├── controllers/
│   ├── authController.js
│   └── researchController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── User.js
│   └── Research.js
│
├── routes/
│
├── uploads/
│
├── .env
├── .gitignore
├── package.json
└── server.js
```

---

## Frontend

```text
Frontend/
│
├── scholarx-frontend/
│
│   ├── src/
│   │
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   │
│   └── index.css
│
├── package.json
└── vite.config.js
```

---

# 🔐 Authentication

The application uses JWT (JSON Web Token) for secure authentication.

### Login Flow

1. User enters credentials.
2. Backend verifies credentials.
3. JWT token is generated.
4. Token is stored on frontend.
5. Protected routes validate token before granting access.

---

# 🔒 Password Security

Passwords are secured using bcrypt.

### Why bcrypt?

* Passwords are hashed before storage.
* Plain text passwords are never stored.
* Improves overall application security.

Example:

```text
Password: 123456
Stored Value: $2a$10$....
```

---

# 📤 File Upload System

The application uses Multer middleware for file uploads.

Supported Features:

* PDF Upload
* Document Upload
* File Preview
* File Download
* File Management

Uploaded papers are stored and managed through the backend API.

---

# 📊 Dashboard Analytics

The dashboard provides:

* Total Uploaded Papers
* Search Statistics
* Research Activity Overview
* Visual Charts using Recharts

---

# 👨‍💼 Admin Dashboard

Administrators can:

* Manage uploaded papers
* Monitor users
* Delete papers
* View researcher information
* Access system statistics

---

# ⚙️ Installation Guide

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend Setup

Navigate to Backend:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start backend:

```bash
npm start
```

---

## Frontend Setup

Navigate to frontend:

```bash
cd Frontend/scholarx-frontend
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm run dev
```

---

# 🌐 Application URLs

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

---

# 📌 API Endpoints

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

## Research Papers

```http
GET    /api/research
POST   /api/research/upload
DELETE /api/research/:id
```

---

# 🎯 Future Enhancements

* Role-Based Access Control
* Real User Activity Tracking
* Cloud Storage Integration
* Research Categorization
* Advanced Search Filters
* AI-Based Research Recommendations
* Research Collaboration Features

---

# 👨‍💻 Developer

Project Name: ScholarX

A research paper management platform developed using the MERN Stack to simplify research paper organization, management, and accessibility.

---

# 📄 License

This project is developed for educational and learning purposes.
