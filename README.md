# 💰 Personal Finance Visualizer - Full Stack Application
---
A modern, responsive full-stack React application for tracking personal income and expenses with beautiful visualizations, real-time charts, and MongoDB database integration. Built with React frontend and Node.js/Express backend.
---
---
## 🚀 Features

### ✅ Core Functionality
- **Dual Transaction Management**: Separate tracking for income and expenses
- **Real-time Charts**: Monthly income/expense visualization using Recharts
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Form Validation**: Comprehensive frontend and backend validation
- **Database Persistence**: MongoDB integration with Mongoose ODM
- **RESTful API**: Complete CRUD operations for both income and expenses

### 📊 Transaction Features
- **Amount**: Positive values for income, negative for expenses
- **Description**: Up to 100 characters with real-time validation
- **Date**: Date picker with future date validation
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **Real-time Updates**: Charts and lists update automatically

### 📈 Visualization & Analytics
- **Monthly Income/Expense Chart**: Bar chart showing both income and expenses per month
- **Color-coded Transactions**: Green for income, red for expenses
- **Summary Cards**: Total income, total expenses, and net balance
- **Responsive Charts**: Interactive tooltips and mobile-optimized display

## 🛠 Tech Stack

### Frontend
- **React.js 19.1.0** - Modern React with hooks and functional components
- **Recharts 2.8.0** - Beautiful and responsive chart library
- **date-fns 2.30.0** - Date formatting and manipulation
- **Vite 7.0.0** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5.1.0** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 8.16.1** - MongoDB object modeling
- **CORS 2.8.5** - Cross-origin resource sharing

### Development
- **ESLint 9.29.0** - Code linting and formatting
- **Nodemon** - Development server with auto-restart
---
---
## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)

### 1. Clone and Install Dependencies
```bash
cd Project
npm install
cd backend
npm install
```

### 2. Environment Setup
Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/finance-visualizer
PORT=5000
```

### 3. Start the Backend Server
```bash
cd backend
npm start
```
The backend will run on: http://localhost:5000

### 4. Start the Frontend Development Server
```bash
# In a new terminal, from the Project directory
npm run dev
```
The frontend will run on: http://localhost:5173

## 🗄️ Database Schema

### Transaction Model
```javascript
{
  amount: Number,        // Required, positive for income, negative for expense
  description: String,   // Required, max 100 characters, trimmed
  date: Date,           // Required, transaction date
  createdAt: Date,      // Auto-generated timestamp
  updatedAt: Date       // Auto-generated timestamp
}
```

### Income Model
```javascript
{
  amount: Number,        // Required, positive value
  description: String,   // Required, max 100 characters, trimmed
  date: Date,           // Required, income date
  createdAt: Date,      // Auto-generated timestamp
  updatedAt: Date       // Auto-generated timestamp
}
```

## 🔌 API Endpoints

### Transactions API (`/api/transactions`)
- `GET /` - Get all transactions (sorted by date desc)
- `POST /` - Create a new transaction
- `PUT /:id` - Update a transaction
- `DELETE /:id` - Delete a transaction
- `GET /monthly-expenses` - Get monthly expense summary for charts

### Income API (`/api/income`)
- `GET /` - Get all income records (sorted by date desc)
- `POST /` - Create a new income record
- `PUT /:id` - Update an income record
- `DELETE /:id` - Delete an income record
- `GET /monthly-incomes` - Get monthly income summary for charts

### Health Check
- `GET /api/health` - Server health status

## 🎯 Usage Guide

### Adding Transactions
1. **Income**: Enter positive amount, description, and date
2. **Expense**: Enter negative amount, description, and date
3. **Validation**: All fields are validated in real-time
4. **Submit**: Click "Add Income" or "Add Expense"

### Managing Records
- **Edit**: Click the edit button (✏️) on any record
- **Delete**: Click the delete button (🗑️) with confirmation
- **View**: All records are displayed in chronological order

### Analytics Dashboard
- **Summary Cards**: View total income, expenses, and net balance
- **Monthly Chart**: Interactive bar chart showing monthly trends
- **Real-time Updates**: All data updates automatically

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile (< 768px)**: Stacked layout with collapsible chart
- **Tablet (768px - 1024px)**: Side-by-side layout with improved spacing
- **Desktop (> 1024px)**: Full layout with optimal chart size

## ✅ Form Validation

### Frontend Validation
- **Amount**: Required, valid number, cannot be zero
- **Description**: Required, max 100 characters, real-time counter
- **Date**: Required, cannot be future date

### Backend Validation
- **Mongoose Schema**: Automatic validation on save/update
- **Error Handling**: Comprehensive error responses
- **Data Sanitization**: Automatic trimming and type conversion

## 🧠 Data Management

### MongoDB Integration
- **Automatic Connection**: Mongoose handles database connection
- **Schema Validation**: Built-in validation rules
- **Timestamps**: Automatic createdAt and updatedAt fields
- **Error Handling**: Graceful error handling and user feedback

### Real-time Updates
- **Optimistic Updates**: UI updates immediately
- **Error Recovery**: Rollback on API failures
- **Loading States**: Visual feedback during operations

## 🧪 Development

### Available Scripts
```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Backend
cd backend
npm start           # Start backend server (with nodemon)
```

### Project Structure
```
Project/
├── src/                    # Frontend React application
│   ├── components/         # React components
│   │   ├── ExpenseChart.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── SummaryCard.jsx
│   │   ├── TransactionForm.jsx
│   │   ├── TransactionItem.jsx
│   │   └── TransactionList.jsx
│   ├── App.jsx            # Main application component
│   ├── App.css            # Application styles
│   ├── api.js             # API service functions
│   ├── index.css          # Base styles
│   └── main.jsx           # Application entry point
├── backend/               # Node.js/Express backend
│   ├── models/            # Mongoose models
│   │   ├── Transaction.js
│   │   └── Income.js
│   ├── routes/            # API routes
│   │   ├── transactions.js
│   │   └── income.js
│   ├── server.js          # Express server setup
│   └── nodemon.json       # Nodemon configuration
├── public/                # Static assets
├── package.json           # Frontend dependencies
└── README.md
```

## 🎨 Design Features

### Modern UI/UX
- **Glassmorphism Design**: Translucent cards with backdrop blur
- **Gradient Background**: Beautiful purple gradient theme
- **Smooth Animations**: Hover effects and transitions
- **Color Coding**: Green for income, red for expenses

### Interactive Elements
- **Hover Effects**: Cards lift on hover
- **Button Animations**: Smooth transitions and feedback
- **Form Validation**: Real-time error display
- **Responsive Charts**: Interactive tooltips and scaling
- **Flash Messages**: Success/error notifications

## 🔒 Security & Performance

### Security Features
- **CORS Configuration**: Proper cross-origin handling
- **Input Validation**: Both frontend and backend validation
- **Error Handling**: Secure error responses
- **Data Sanitization**: Automatic input cleaning

### Performance Optimizations
- **Efficient Queries**: Optimized MongoDB aggregations
- **Lazy Loading**: Components load as needed
- **Caching**: Browser caching for static assets
- **Responsive Images**: Optimized for different screen sizes

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB (local or MongoDB Atlas)
2. Configure environment variables
3. Deploy to platforms like:
   - Heroku
   - Railway
   - Render
   - DigitalOcean

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3

### Environment Variables
```env
# Backend (.env)
MONGODB_URI=mongodb://localhost:27017/finance-visualizer
PORT=5000

# Frontend (.env)
VITE_API_URL=http://localhost:5000
```

## 🐛 Troubleshooting

### Common Issues

**1. Database Connection**
- Ensure MongoDB is running
- Check connection string in .env
- Verify network connectivity

**2. API Errors**
- Check backend server status
- Verify CORS configuration
- Check API endpoint URLs

**3. Chart Not Loading**
- Ensure Recharts is properly installed
- Check browser console for errors
- Verify data format from API

**4. Form Validation Problems**
- Clear browser cache
- Check console for JavaScript errors
- Verify all required fields are filled

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly (frontend and backend)
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Nikhil Garkoti**
- Personal Finance Visualizer v1.0 (Full Stack)
- Built with ❤️ using React, Node.js, Express, MongoDB, and Recharts

---

**Made with ❤️ by Nikhil Garkoti | Personal Finance Visualizer v1.0**
#   P e r s o n a l - F i n a n c e - V i s u a l i s e r 
 
 
