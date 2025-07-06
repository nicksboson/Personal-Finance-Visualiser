# 💰 Personal Finance Visualizer - Full Stack Application

---

A modern, responsive full-stack application for tracking personal income and expenses with beautiful visualizations and MongoDB integration. Built with a React frontend and Node.js/Express backend.

---

## 🚀 Features

### ✅ Core Functionality

* **Dual Transaction Management**: Separate tracking for income and expenses
* **Real-time Charts**: Monthly income/expense visualization using Recharts
* **Responsive Design**: Fully mobile/tablet/desktop responsive
* **Form Validation**: Frontend and backend input validation
* **Database Persistence**: MongoDB integration with Mongoose ODM
* **RESTful API**: CRUD operations for income and expenses

### 📊 Transaction Features

* **Amount**: Positive for income, negative for expenses
* **Description**: Up to 100 characters with real-time validation
* **Date**: Uses date picker with future date restrictions
* **CRUD Operations**: Add, view, update, and delete transactions
* **Real-time Updates**: Chart and transaction list update live

### 📈 Visualization & Analytics

* **Monthly Bar Chart**: Shows monthly income and expenses
* **Color-Coded Transactions**: Green = income, Red = expenses
* **Summary Cards**: Displays total income, total expenses, and balance
* **Responsive & Interactive**: Charts optimized for all screen sizes

---

## 🛠️ Tech Stack

### Frontend

* **React.js 19.1.0**
* **Recharts 2.8.0**
* **date-fns 2.30.0**
* **Vite 7.0.0**

### Backend

* **Node.js**
* **Express.js 5.1.0**
* **MongoDB**
* **Mongoose 8.16.1**
* **CORS 2.8.5**

### Development

* **ESLint 9.29.0**
* **Nodemon**

---

## 📦 Installation & Setup

### Prerequisites

* Node.js (v16+)
* MongoDB (local or Atlas)

### 1. Install Dependencies

```bash
cd Project
npm install
cd backend
npm install
```

### 2. Setup Environment Variables

Create a `.env` file in `backend/`:

```env
MONGODB_URI=mongodb://localhost:27017/finance-visualizer
PORT=5000
```

### 3. Start Backend

```bash
cd backend
npm start
```

### 4. Start Frontend

```bash
npm run dev
```

---

## 📆 Database Schema

### Transaction Model

```js
{
  amount: Number,
  description: String,
  date: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Income Model

```js
{
  amount: Number,
  description: String,
  date: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔌 API Endpoints

### Transactions - `/api/transactions`

* `GET /` - All transactions
* `POST /` - Add new
* `PUT /:id` - Update
* `DELETE /:id` - Delete
* `GET /monthly-expenses` - Monthly expenses summary

### Income - `/api/income`

* `GET /` - All income records
* `POST /` - Add new
* `PUT /:id` - Update
* `DELETE /:id` - Delete
* `GET /monthly-incomes` - Monthly income summary

### Server Health

* `GET /api/health` - Check status

---

## 🌟 Usage Guide

### Add Transactions

* Enter amount, description, and date
* Use "+" for income and "-" for expense
* Submit via respective buttons

### Manage Records

* Edit ✏️ and Delete 🗑️ options available
* Data shown in latest-first order

### Dashboard

* View real-time totals and charts
* Responsive display on all screen sizes

---

## 📱 Responsive Design

* **Mobile (<768px)**: Stacked layout
* **Tablet (768-1024px)**: Optimized 2-column layout
* **Desktop (>1024px)**: Full layout with wide chart support

---

## ✅ Form Validation

### Frontend

* Amount: Required, valid number
* Description: Required, max 100 chars
* Date: Required, no future dates

### Backend

* Schema validation via Mongoose
* Error handling and messages

---

## 🧬 Real-Time & Data Handling

### MongoDB

* Mongoose handles validation and schema
* Auto timestamps on entries

### UI Updates

* Optimistic updates in UI
* Error handling and rollback on failure
* Loading states while processing

---

## 🚪 Deployment

### Backend

* Host on Heroku, Render, Railway, etc.
* Use MongoDB Atlas

### Frontend

* Deploy built frontend (`dist/`) to Vercel, Netlify, etc.

### Env Setup

```env
# Backend
MONGODB_URI=your-mongo-uri
PORT=5000

# Frontend
VITE_API_URL=http://localhost:5000
```

---

## 🛥️ Troubleshooting

### Common Issues

* **DB not connecting**: Check URI and Mongo server status
* **API issues**: Check console and network tabs
* **Chart problems**: Validate chart data and props
* **Validation bugs**: Ensure consistent field input

---

## 👥 Contributing

1. Fork repo
2. Create branch
3. Commit your features
4. Push & submit PR

---

## 📜 License

MIT License

---

## 👨‍💼 Author

**Nikhil Garkoti**

* React | Node.js | MongoDB Developer
* Project: Personal Finance Visualizer v1.0

---

**Made with ❤️ by Nikhil Garkoti | Personal Finance Visualizer v1.0**
