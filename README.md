# 💰 CashFlowX — Personal Finance Manager

A modern, full-stack web application to help you take control of your finances. Track income and expenses, set monthly budgets, and gain insights through interactive charts and analytics — all in one place.

---

## ✨ Features

- 🔐 **Secure Authentication** — JWT-based login & registration with hashed passwords
- 📊 **Dashboard Overview** — Visual summary of income, expenses & balance
- 💸 **Transaction Tracking** — Add, view and filter income/expense transactions by category
- 🎯 **Budget Management** — Set monthly budgets per category and monitor spending
- 📈 **Interactive Charts** — Pie charts & line charts powered by Recharts
- 📱 **Fully Responsive** — Optimized for desktop and mobile devices

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI Framework |
| React Router DOM | Client-side routing |
| Tailwind CSS v4 | Styling |
| Recharts | Data visualization |
| Axios | HTTP requests |
| Lucide React | Icons |
| React Hot Toast | Notifications |
| Vite | Build tool |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js v5 | Web framework |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| bcryptjs | Password hashing |
| dotenv | Environment config |

---

## 📁 Project Structure

```
Personal-Finance-Manager/
├── client/                  # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── contexts/        # Global state (AppProvider)
│   │   ├── pages/           # Login, UserLayout
│   │   ├── sections/        # Dashboard, Transactions, Budgets, etc.
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                  # Node.js backend (Express)
│   ├── config/              # DB connection
│   ├── controllers/         # Auth, Transactions, Budgets
│   ├── middleware/          # Auth middleware
│   ├── models/              # User, Transaction, Budget schemas
│   ├── routes/              # API routes
│   ├── index.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/Mridul17847/Personal-Finance-Manager.git
cd Personal-Finance-Manager
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the server:

```bash
npm run dev
```

### 3. Setup the Frontend

```bash
cd client
npm install
```

Create a `.env` file inside the `client/` folder:

```env
VITE_API_URL=http://localhost:5000
```

Start the dev server:

```bash
npm run dev
```

The app will be running at `http://localhost:5173`

---

## 👤 Author

**Mridul** — [@Mridul17847](https://github.com/Mridul17847)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
