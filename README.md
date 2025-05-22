# EduTurns 🎓

EduTurns is a full-stack web application designed to provide students with a platform for education, collaboration, and progress tracking. The platform empowers students to explore learning resources, track their academic journey, and engage with the educational community.

🔗 [Live Demo](https://eduturns.vercel.app)

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- React Router
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB (via Mongoose)
- JWT for Authentication

**Other Tools:**
- Vercel (Frontend Deployment)
- Render / Railway / Cyclic (suggested for Backend Deployment)

---

## ✨ Features

### ✅ General Features
- 🔐 Secure Authentication (Login/Signup with JWT)
- 🏠 Home, About, and Contact Pages
- 📄 Dynamic routing for user roles and dashboards

### 👩‍🎓 Student Portal
- 📚 Access personalized course content
- 📈 Track learning progress
- 💬 Post and view community discussions

### 🧑‍🏫 Teacher/Admin Portal
- ➕ Add/edit courses and materials
- 📊 Monitor student performance
- 🛠 Manage users and permissions

### 🌐 Public Features
- Informational pages (Home, Contact)
- Support via contact form
- Footer with social links

---

## 📁 Project Structure

EduTurns/
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ └── App.js
│ └── tailwind.config.js
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js
└── README.md
