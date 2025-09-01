# 💇‍♀️ Salon Desk – Full Stack Salon Management System

**Salon Desk** is a **MERN Stack** full-stack web application designed to manage salon operations efficiently. This project is a follow-up to my DBMS course project and was rebuilt as a complete production-ready web application with a **frontend**, **backend**, **authentication**, **dashboards**, and **deployment**.

---

## ✨ Features

### 👤 Client
* Register/Login with JWT authentication
* Book, view, and cancel appointments
* View upcoming and past appointment history
* Profile management (edit name, email, password, photo)
* Dashboard with expense analytics and appointment stats

### 💼 Admin
* Manage stylists and employees
* Assign services and track performance
* Dashboard for total revenue, appointments, and services
* Date-based filtering for appointments (today, upcoming, completed)

### ⚙️ Core Features
* Secure authentication (JWT, bcrypt)
* REST API with Express & MongoDB
* Role-based access (Admin, Stylist, Client)
* Responsive and modern UI (React + TailwindCSS + Framer Motion)
* Charts and analytics (Recharts)
* Deployment on **Render** (backend) and **Vercel** (frontend)

---

## 🛠️ Tech Stack
* **Frontend:** `React`, `TailwindCSS`, `Framer Motion`, `Axios`, `Recharts`
* **Backend:** `Node.js`, `Express.js`, `MongoDB` (`Mongoose`), `JWT`
* **Database:** `MongoDB Atlas`
* **Deployment:** `Render` (Backend), `Vercel` (Frontend)

---

## 📸 Screenshots

### Client Dashboard
<img width="1469" height="768" alt="SCR-20250831-oijo" src="https://github.com/user-attachments/assets/89896a71-9b24-4eed-8c1a-5b0d83eeea0b" />

### Admin Dashboard
<img width="1463" height="799" alt="SCR-20250831-ohdm" src="https://github.com/user-attachments/assets/cca3f943-c23a-4493-a921-22a440750530" />

[Image of the Admin Dashboard]


---

## 🚀 Getting Started

### Prerequisites
* `Node.js` (>=16)
* `MongoDB Atlas` or local `MongoDB`

### Clone the Repository
```bash
git clone [https://github.com/](https://github.com/)dhruvil05patel/MSOC-Full_Stack.git
cd MSOC-Full_Stack/FinalProject/salon_desk
```
### Backend Setup

```
cd backend
npm install
```
### Create a .env file in the backend directory:
```
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```
### Run the backend:
```
npm run dev
```
### Frontend Setup
```
cd frontend
npm install
npm start
```
## 🌐 Deployment

### Frontend: Deployed on Vercel
### Backend: Deployed on Render

### CORS configured for cross-origin requests between Vercel & Render.

## 📚 Lessons Learned
Hands-on experience with MERN Stack development,
Debugging and fixing deployment issues (Render + Vercel + MongoDB Atlas IP whitelisting),
Handling CORS, authentication, and role-based routing,
Building a real-world production-ready app from scratch

## 📖 API Documentation
### 🔑 Auth

* POST /auth/register → Register new user
* POST /auth/login → Login & get JWT

### 📅 Appointments

* POST /appointments → Create new appointment
* GET /appointments/client/:id → Get upcoming & history for a client
* PUT /appointments/:id/status → Update status (cancel/complete)
* GET /appointments/today → Today’s appointments
* GET /appointments/upcoming → Future appointments

### 💇 Stylists

* GET /stylists → List all stylists
* POST /stylists → Add new stylist (Admin only)
* PUT /stylists/:id → Update stylist details
* DELETE /stylists/:id → Remove stylist

---

### 👨‍💻 Author

**Dhruvil Patel**

* [📌 LinkedIn](www.linkedin.com/in/dhruvil05patel)
* [GitHub](https://github.com/Dhruvil05Patel)
