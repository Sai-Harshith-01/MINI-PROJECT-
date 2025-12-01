🚀 TechOrbit – Student Article Discovery & Hackathon Management Platform

TechOrbit is a full-stack web platform built for students, colleges, and administrators to discover hackathons, publish and explore technical articles, track registrations, and stay updated with tech news through curated RSS feeds.
It includes a modern UI, a secure REST API, AI chatbot assistance, role-based dashboards, and a clean architecture designed for scalability.

🎯 Main Objective

The primary objective of TechOrbit is to provide a unified digital ecosystem where:

✔ Students

Discover ongoing and upcoming hackathons

Register with ease

Read and publish technical articles

Receive personalized notifications

Interact with an AI assistant for platform navigation

✔ Colleges

Create and manage hackathons

Track student registrations

Promote institutional events

Engage with student developers

✔ Admins

Approve colleges

Monitor platform statistics

Publish official articles

Oversee all user activity

TechOrbit aims to bridge the gap between colleges and students, simplify hackathon workflows, and promote a culture of continuous learning and participation.

🌐 Tech Stack Overview
Frontend (React + Vite)

React 18

Vite

Tailwind CSS

Axios

React Router DOM

Orbiton AI Chatbot

JWT Authentication

Backend (Flask API)

Flask (REST Framework)

Flask-SQLAlchemy (ORM)

JWT Authentication

Feedparser (RSS Worker)

CORS Enabled

Werkzeug Security

📁 Monorepo Structure
TechOrbit/
├── backend/     # Flask REST API
└── frontend/    # React + Vite Web Application

🏗️ Backend Overview (Flask API)
📦 Folder Structure
backend/
├── app/
│   ├── routes/          # API Endpoints
│   ├── services/        # Core business logic
│   ├── schemas/         # Database models (SQLAlchemy)
│   ├── utils/           # JWT, password hashing, uploads
│   ├── workers/         # Background RSS feed processor
│   ├── database.py      # Database configuration
│   └── main.py          # App initialization & blueprints
│
├── uploads/             # Stored user-uploaded files
├── .env.example
├── requirements.txt
├── create_admin.py
├── reset_admin.py
└── README.md

⚙️ Backend Setup
1️⃣ Create Virtual Environment
cd backend
python -m venv venv


Activate:

Windows

venv\Scripts\activate


macOS/Linux

source venv/bin/activate

2️⃣ Install Dependencies
pip install -r requirements.txt

3️⃣ Configure Environment (.env)
cp .env.example .env


Key fields:

SECRET_KEY

FLASK_ENV

DATABASE_URL

FRONTEND_URL

UPLOAD_FOLDER

4️⃣ Initialize Database & Admin Account
mkdir uploads
python create_admin.py

5️⃣ Start Backend
flask run


Backend runs at:
👉 http://localhost:5000

📡 Backend API Reference
🔐 Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register a college
POST	/api/auth/login	Login and receive JWT
🏆 Hackathon Management
Method	Endpoint	Description
GET	/api/hackathons	List hackathons
POST	/api/hackathons	Create (College-only)
PUT	/api/hackathons/:id	Update
DELETE	/api/hackathons/:id	Delete
🎓 Student Features

Register for hackathons

Browse student-written articles

Receive notifications

API:

POST /api/student/hackathons/:id/register
GET /api/student/articles

🛑 Admin Features

Approve colleges

Publish articles

View platform-wide statistics

Admin API:

GET /api/admin/colleges
PUT /api/admin/colleges/:id/approve
GET /api/admin/stats
POST /api/admin/articles

🧩 Database Models

College – Approved institutions

User – Authentication identity

Hackathon – Events created by colleges

Registration – Student participation

Notification – Alerts for users

Article – Tech content published by students/admins

RSSFeed – Auto-fetched external tech news

🔒 Backend Security Measures

Password hashing (Werkzeug)

JWT-based authentication

Role-based access control (Admin / College / Student)

CORS protection

File upload sanitization

🎨 Frontend Overview (React + Vite)
📁 Folder Structure
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Screens and dashboards
│   ├── services/          # Axios APIs
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── public/
├── package.json
├── vite.config.js
└── tailwind.config.js

🚀 Frontend Setup
1️⃣ Install Dependencies
cd frontend
npm install

2️⃣ Start Development Server
npm run dev


Frontend runs at:
👉 http://localhost:5173

🔧 Frontend Configuration

Modify API base URL in src/services/api.js:

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

🎭 User Roles & Routes
👨‍🎓 Student

/ – Discover hackathons

/student/articles – Explore tech articles

🏫 College

/college/dashboard

/college/create-hackathon

🛑 Admin

/admin/dashboard

/admin/approve-colleges

/admin/post-article

🤖 Orbiton AI Chatbot

Located at:

src/components/Chatbot.jsx


Capabilities:

Page navigation assistance

FAQs

Event guidance

Platform instructions

🛠️ Frontend Scripts
npm run dev       # Start development
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Lint and fix code

🐛 Troubleshooting Guide
Backend Issues
Issue	Solution
Database corruption	Delete techorbit.db and run create_admin.py
CORS blocked	Ensure FRONTEND_URL is correct in .env
Frontend Issues
Issue	Solution
API not responding	Check VITE_API_URL
Build errors	Delete node_modules → run npm install
🚀 Deployment Guide
Frontend (Vercel / Netlify)
npm run build


Environment variable:

VITE_API_URL=https://your-backend-url/api

Backend (Render / Railway / VPS)

Set environment variables:

FLASK_ENV=production
DATABASE_URL=postgresql://...


Start server:

gunicorn app.main:app

📄 License

MIT License © 2025 TechOrbit

👤 Author

Sai Harshith
