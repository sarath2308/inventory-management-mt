# Inventory Management System

A comprehensive full-stack Inventory Management System built with the **MERN** stack (MongoDB, Express, React, Node.js) using **TypeScript**. This application provides complete inventory tracking, customer management, sales operations, and reporting capabilities with support for multiple data export formats.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Inventory Management** - Add, update, and track inventory items with real-time stock levels
- **Customer Management** - Manage customer information and maintain customer ledgers
- **Sales Tracking** - Record and track sales transactions with detailed reporting
- **Dashboard** - Real-time analytics and key metrics visualization
- **Data Export** - Export reports as PDF, Excel, or Print-ready formats
- **Authentication** - Secure user authentication with JWT tokens
- **Role-based Access** - User authentication and authorization system
- **Search & Filter** - Advanced search and filtering capabilities across modules

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB
- **ORM**: Mongoose
- **Dependency Injection**: InversifyJS
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt

### Frontend
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **UI Components**: Custom components & UI library
- **Styling**: CSS Modules
- **Routing**: React Router

### DevOps
- **Containerization**: Docker & Docker Compose
- **Package Manager**: npm

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **Docker** and **Docker Compose** (for containerized setup)
- **MongoDB** (v5 or higher) - or use MongoDB Atlas
- **Git**

## 🚀 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd inventory-management-mt
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

## ⚙️ Environment Setup

### Backend Environment Variables
Create a `.env` file in the `backend` directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/inventory-management
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=7d
BCRYPT_ROUNDS=10
```

### Frontend Environment Variables
Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🎯 Running the Application

### Option 1: Using Docker Compose (Recommended)
```bash
docker-compose up --build
```
This will start both the backend (port 5000) and frontend (port 3000) services along with MongoDB.

### Option 2: Running Locally

**Backend:**
```bash
cd backend
npm install
npm run dev
```
Backend runs on `http://localhost:5000`

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:3000`

**Ensure MongoDB is running:**
```bash
# If using local MongoDB
mongod
```

## 📁 Project Structure

```
inventory-management-mt/
├── backend/
│   ├── src/
│   │   ├── server.ts                 # Application entry point
│   │   ├── config/                   # Configuration files
│   │   │   ├── db.connect.ts        # MongoDB connection
│   │   │   └── ssm.ts               # Parameter management
│   │   ├── controllers/              # Request handlers
│   │   ├── services/                 # Business logic
│   │   ├── repositories/             # Data access layer
│   │   ├── models/                   # Mongoose schemas
│   │   ├── routes/                   # API routes
│   │   ├── middleware/               # Express middleware
│   │   ├── interfaces/               # TypeScript interfaces
│   │   ├── schemas/                  # Validation schemas
│   │   ├── utils/                    # Utility functions
│   │   └── di/                       # Dependency injection
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── main.tsx                  # Application entry point
│   │   ├── App.tsx                   # Root component
│   │   ├── pages/                    # Page components
│   │   ├── components/               # Reusable components
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── api/                      # API service calls
│   │   ├── redux/                    # Redux store configuration
│   │   ├── types/                    # TypeScript types
│   │   ├── routes/                   # Route definitions
│   │   └── utils/                    # Utility functions
│   ├── index.html
│   ├── vite.config.ts
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Customers
- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create new customer
- `GET /api/customers/:id` - Get customer details
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer
- `GET /api/customers/:id/ledger` - Get customer ledger

### Items
- `GET /api/items` - Get all inventory items
- `POST /api/items` - Create new item
- `GET /api/items/:id` - Get item details
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

### Sales
- `GET /api/sales` - Get all sales transactions
- `POST /api/sales` - Create new sale
- `GET /api/sales/:id` - Get sale details
- `PUT /api/sales/:id` - Update sale
- `DELETE /api/sales/:id` - Delete sale

### Dashboard
- `GET /api/dashboard` - Get dashboard metrics and analytics

## 📝 Scripts

### Backend
```bash
npm run dev      # Start development server with auto-reload
npm run build    # Build TypeScript to JavaScript
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Error handling middleware
- Environment-based configuration

## 📚 Learning & Support

For issues and questions:
1. Check existing GitHub issues
2. Review the project documentation
3. Consult the MERN stack documentation

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Happy Coding! 🎉**
