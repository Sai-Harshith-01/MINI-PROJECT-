# 🚀 **TechOrbit – Student Article Discovery & Hackathon Management Platform**

TechOrbit is a full-stack web platform built for **students, colleges, and administrators** to discover hackathons, publish and explore technical articles, track registrations, and stay updated with the latest technologies through curated tech news feeds.
It includes a **modern UI**, a **secure REST API**, **AI chatbot assistance**, **role-based dashboards**, and a **scalable architecture** designed for real-world usage.

---

# 🎯 **Main Objective**

The primary objective of **TechOrbit** is to create a unified digital ecosystem where:

### ✔ Students

* Discover ongoing and upcoming hackathons
* Register with ease
* Read and publish technical articles
* Stay updated with **latest technologies**
* View curated **tech news** from sources like TechCrunch
* Interact with an AI assistant for help & navigation

### ✔ Colleges

* Create and manage hackathons
* Track student participation
* Promote institutional achievements
* Engage with student developers

### ✔ Admins

* Approve and verify colleges
* Publish official articles
* View platform-wide analytics
* Monitor and manage content

TechOrbit aims to **bridge the information gap for students**, simplify hackathon workflows, and promote a culture of **continuous learning & innovation**.

---

# 🤖 **AI & Smart Features**

### **1️⃣ Orbiton AI Chatbot**

A built-in conversational assistant that helps users:

* Navigate pages
* Understand features
* Discover hackathons
* Get answers to FAQs
* Learn how to use the platform

### **2️⃣ Tech News Aggregation (RSS System)**

TechOrbit includes a **smart RSS news engine** that automatically:

* Fetches technology-related news from sites like **TechCrunch**
* Filters and shows only **relevant tech updates**
* Keeps students informed about **latest tools, innovations, and trends**
* Ensures the platform is always updated without manual input

This provides students with a **continuous learning environment**.

---

# 🌐 **Tech Stack Overview**

## **Frontend (React + Vite)**

* React 18
* Vite
* Tailwind CSS
* Axios
* React Router DOM
* Orbiton AI Chatbot
* JWT Authentication

## **Backend (Flask API)**

* Flask (REST Framework)
* Flask-SQLAlchemy (ORM)
* JWT Authentication
* Feedparser (RSS Worker)
* Werkzeug Security
* CORS Enabled

---

# 📁 **Monorepo Structure**

```
TechOrbit/
├── backend/
└── frontend/
```

---

# 🏗️ **Complete Folder Structure**

## 📦 **Backend Folder Structure**

```
backend/
├── app/
│   ├── routes/
│   │   ├── admin_routes.py
│   │   ├── auth_routes.py
│   │   ├── hackathon_routes.py
│   │   ├── student_hackathon_routes.py
│   │   ├── student_article_routes.py
│   │   ├── admin_stats_routes.py
│   │   ├── college_stats_routes.py
│   │   └── rss_routes.py
│   │
│   ├── services/
│   │   ├── auth_service.py
│   │   ├── admin_service.py
│   │   ├── hackathon_service.py
│   │   ├── article_service.py
│   │   ├── registration_service.py
│   │   ├── notification_service.py
│   │   └── stats_service.py
│   │
│   ├── schemas/
│   │   ├── user_schema.py
│   │   ├── college_schema.py
│   │   ├── hackathon_schema.py
│   │   ├── article_schema.py
│   │   ├── registration_schema.py
│   │   ├── notification_schema.py
│   │   ├── comment_schema.py
│   │   └── rss_schema.py
│   │
│   ├── utils/
│   │   ├── jwt_handler.py
│   │   ├── password_hash.py
│   │   ├── file_upload.py
│   │   └── role_checker.py
│   │
│   ├── workers/
│   │   └── rss_worker.py
│   │
│   ├── database.py
│   └── main.py
│
├── uploads/
├── requirements.txt
├── create_admin.py
├── reset_admin.py
├── .env.example
└── README.md
```

---

## 🎨 **Frontend Folder Structure**

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── HackathonCard.jsx
│   │   ├── ArticleCard.jsx
│   │   ├── NewsCard.jsx
│   │   ├── Chatbot.jsx
│   │   ├── Navbar.jsx
│   │   ├── NotificationBell.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages/
│   │   ├── StudentDashboard.jsx
│   │   ├── CollegeDashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── CreateHackathon.jsx
│   │   ├── ApproveColleges.jsx
│   │   ├── PostArticle.jsx
│   │   ├── Hackathons.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── adminService.js
│   │   ├── hackathonService.js
│   │   ├── articleService.js
│   │   ├── newsService.js
│   │   └── notificationService.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

# ⚙️ **Backend Setup**

### **1️⃣ Create Virtual Environment**

```
cd backend
python -m venv venv
```

Activate:

**Windows**

```
venv\Scripts\activate
```

**macOS/Linux**

```
source venv/bin/activate
```

---

### **2️⃣ Install Dependencies**

```
pip install -r requirements.txt
```

---

### **3️⃣ Configure Environment**

```
cp .env.example .env
```

Update:

* SECRET_KEY
* DATABASE_URL
* FRONTEND_URL
* UPLOAD_FOLDER

---

### **4️⃣ Initialize Database**

```
mkdir uploads
python create_admin.py
```

---

### **5️⃣ Run Backend**

```
flask run
```

👉 Backend URL: [http://localhost:5000](http://localhost:5000)

---

# 📡 **Backend API Reference**

## 🔐 Authentication

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | /api/auth/register | Register a college  |
| POST   | /api/auth/login    | Login & receive JWT |

---

## 🏆 Hackathon Management

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | /api/hackathons     |
| POST   | /api/hackathons     |
| PUT    | /api/hackathons/:id |
| DELETE | /api/hackathons/:id |

---

## 🎓 Student APIs

```
POST /api/student/hackathons/:id/register
GET /api/student/articles
```

---

## 🛑 Admin APIs

```
GET /api/admin/colleges
PUT /api/admin/colleges/:id/approve
GET /api/admin/stats
POST /api/admin/articles
```

---

# 🔒 **Security Features**

* JWT Authentication
* Password hashing
* Role-based access (Admin / College / Student)
* CORS protection
* Secure file uploads

---

# 🚀 **Frontend Setup**

### **1️⃣ Install Dependencies**

```
cd frontend
npm install
```

### **2️⃣ Start Development Server**

```
npm run dev
```

👉 Frontend URL: [http://localhost:5173](http://localhost:5173)

---

# 🔧 **Frontend Configuration**

Edit:

```
src/services/api.js
```

```
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
```

---

# 🎭 **User Roles & Routes**

### 👨‍🎓 Student

* `/` — Discover hackathons
* `/student/articles` — Explore articles

### 🏫 College

* `/college/dashboard`
* `/college/create-hackathon`

### 🛑 Admin

* `/admin/dashboard`
* `/admin/approve-colleges`
* `/admin/post-article`

---

# 🤖 **Orbiton AI Chatbot**

Location:

```
src/components/Chatbot.jsx
```

Capabilities:

* Help & navigation
* Explaining features
* Hackathon discovery assistance
* General FAQs

---

# 🛠️ **Frontend Scripts**

```
npm run dev
npm run build
npm run preview
npm run lint
```

---

# 🐛 **Troubleshooting**

## Backend

| Issue           | Fix                             |
| --------------- | ------------------------------- |
| Database errors | Delete DB & run create_admin.py |
| CORS issues     | Update FRONTEND_URL in `.env`   |

## Frontend

| Issue              | Fix                             |
| ------------------ | ------------------------------- |
| API not responding | Check VITE_API_URL              |
| Build failure      | Delete node_modules → reinstall |

---

# 🚀 **Deployment Guide**

## **Frontend Deployment (Vercel / Netlify)**

```
npm run build
```

Environment:

```
VITE_API_URL=https://your-backend-url/api
```

---

## **Backend Deployment (Render / Railway / VPS)**

Env Vars:

```
FLASK_ENV=production
DATABASE_URL=postgresql://...
```

Run:

```
gunicorn app.main:app
```

---

# 📄 **License**

MIT License © 2025 TechOrbit

---

# 👤 **Author**

**Sai Harshith**

---

