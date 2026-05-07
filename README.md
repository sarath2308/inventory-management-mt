# 📦 Inventory Management System

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61dafb?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5+-13aa52?logo=mongodb)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ed?logo=docker)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

**A production-ready, full-stack Inventory Management System** with real-time analytics, comprehensive reporting, and enterprise-grade architecture.

[Features](#features) • [Architecture](#architecture) • [Quick Start](#quick-start) • [API Docs](#api-endpoints)

</div>

---

## 🎯 Overview

An enterprise-grade inventory management platform built with **MERN stack** and **TypeScript**, featuring clean architecture, dependency injection, comprehensive validation, and real-time dashboards. Designed for scalability and maintainability with professional development practices.

**Key Highlights:**
- 🏗️ **Clean Architecture** - Clear separation of concerns with controllers, services, and repositories
- 🔐 **Type-Safe** - Full TypeScript implementation across frontend and backend
- 💉 **Dependency Injection** - InversifyJS for loose coupling and testability
- 📊 **Real-Time Dashboard** - Live analytics and key metrics
- 📱 **Responsive UI** - Modern React components with Vite
- 🐳 **Containerized** - Docker & Docker Compose ready
- ✅ **Validated** - Input validation and error handling throughout

## 📋 Table of Contents
- [Features & Screenshots](#features--screenshots)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Development Guide](#development-guide)
- [Security Features](#security-features)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features & Screenshots

### 📊 Dashboard & Analytics
Real-time dashboard with comprehensive metrics, charts, and KPIs for business intelligence.

![Dashboard](assets/dashboard.png)

### 🏠 Landing Page
User-friendly interface with intuitive navigation and quick access to all modules.

![Landing Page](assets/home.png)

### 👥 Customer Management
Complete customer lifecycle management with detailed profiles and transaction history.

![Customers](assets/customerLedger.png)

### 📦 Inventory Management
Track inventory items, stock levels, categories, and pricing with real-time updates.

![Products](assets/productsList.png)

### 💰 Sales Tracking
Comprehensive sales management with order tracking, invoicing, and ledger maintenance.

![Sales Ledger](assets/salesLedger.png)

---

## Core Features

✅ **Inventory Management**
- Add, update, and delete inventory items
- Real-time stock level tracking
- Category-based organization
- Batch operations support

✅ **Customer Management**
- Comprehensive customer database
- Customer ledger with transaction history
- Contact information management
- Customer segmentation capabilities

✅ **Sales Operations**
- Create and manage sales transactions
- Order processing and tracking
- Invoice generation
- Sales ledger and reporting

✅ **Analytics & Dashboard**
- Real-time KPI metrics
- Interactive charts and graphs
- Revenue trends analysis
- Inventory turnover metrics

✅ **Data & Export**
- PDF report generation
- Excel export functionality
- Print-ready formats
- Custom date range filtering

✅ **Authentication & Authorization**
- JWT-based authentication
- Secure password hashing
- Role-based access control
- Session management

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  React + TypeScript + Redux + Vite                  │   │
│  │  • Responsive UI Components                         │   │
│  │  • State Management (Redux Toolkit)                 │   │
│  │  • HTTP Client (Axios)                              │   │
│  │  • Form Validation & Error Handling                 │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    API GATEWAY LAYER                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Express.js Middleware Stack                        │   │
│  │  • CORS Protection                                  │   │
│  │  • Request Validation                               │   │
│  │  • Authentication Middleware                        │   │
│  │  • Error Handling                                   │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   SERVICE LAYER                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Business Logic & Orchestration                     │   │
│  │  • AuthService           • CustomerService          │   │
│  │  • ItemsService          • SalesService             │   │
│  │  • Data Transformation   • Validation Logic         │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              REPOSITORY LAYER (Data Access)                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Abstraction over MongoDB                           │   │
│  │  • Generic Repository Pattern                       │   │
│  │  • Query Building                                   │   │
│  │  • Data Persistence                                 │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                 PERSISTENCE LAYER                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  MongoDB Atlas / Local Instance                    │   │
│  │  • Mongoose ORM                                     │   │
│  │  • Schema Validation                                │   │
│  │  • Indexing & Performance                           │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Design Patterns Implemented:**
- 🔷 **Repository Pattern** - Clean data access abstraction
- 🔷 **Dependency Injection** - Loose coupling via InversifyJS
- 🔷 **Service Layer Pattern** - Separation of business logic
- 🔷 **Middleware Chain** - Modular request processing
- 🔷 **Custom Error Handling** - Centralized error management
- 🔷 **Mapper Pattern** - DTO transformation
- 🔷 **Validation Pattern** - Request schema validation

## 🛠️ Tech Stack

### 🔙 Backend Architecture

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Runtime** | Node.js v18+ | JavaScript runtime |
| **Language** | TypeScript 5.0+ | Type-safe development |
| **Framework** | Express.js | HTTP server & routing |
| **Database** | MongoDB 5+ | NoSQL data persistence |
| **ORM** | Mongoose | Schema validation & modeling |
| **DI Container** | InversifyJS | Dependency injection & IoC |
| **Authentication** | JWT + bcrypt | Secure auth & password hashing |
| **Validation** | Joi/Custom Schemas | Input validation |
| **Error Handling** | Custom middleware | Centralized error management |

### 💻 Frontend Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Framework** | React 18+ | UI library |
| **Language** | TypeScript | Type safety |
| **Build Tool** | Vite | Fast module bundler |
| **State Mgmt** | Redux Toolkit | Global state management |
| **HTTP Client** | Axios | API communication |
| **UI Framework** | Custom Components | Reusable UI elements |
| **Styling** | CSS Modules | Scoped styling |
| **Routing** | React Router v6+ | Client-side routing |
| **Date Handling** | date-fns | Utility library |

### 🐳 DevOps & Infrastructure

| Tool | Version | Usage |
|------|---------|-------|
| **Docker** | Latest | Containerization |
| **Docker Compose** | 3.8+ | Multi-container orchestration |
| **npm** | 8+ | Package management |
| **Git** | Latest | Version control |

## 📦 Prerequisites

Ensure you have the following installed before proceeding:

| Software | Version | Download |
|----------|---------|----------|
| **Node.js** | 18+ | [nodejs.org](https://nodejs.org/) |
| **npm** | 8+ | Comes with Node.js |
| **MongoDB** | 5+ | [mongodb.com](https://www.mongodb.com/) or use [Atlas Cloud](https://www.mongodb.com/cloud/atlas) |
| **Docker** | Latest | [docker.com](https://www.docker.com/) |
| **Docker Compose** | 1.29+ | Comes with Docker Desktop |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |

**Verify Installation:**
```bash
node --version
npm --version
docker --version
docker-compose --version
```

## 🚀 Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/inventory-management-mt.git
cd inventory-management-mt
```

### Step 2: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

### Step 3: Verify Installation
```bash
# Check backend setup
cd backend
npm list

# Check frontend setup
cd ../frontend
npm list
```

## ⚙️ Environment Setup

### Backend Environment Variables

Create a `.env` file in the `backend` directory with the following configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/inventory-management
# For MongoDB Atlas, use:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/inventory-management

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRY=7d

# Password Security
BCRYPT_ROUNDS=10

# Logging (optional)
LOG_LEVEL=debug
```

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# App Name
VITE_APP_NAME=Inventory Management System

# Environment
VITE_NODE_ENV=development
```

### MongoDB Setup

**Option A: Local MongoDB**
```bash
# macOS with Homebrew
brew services start mongodb-community

# Windows
# Open Services and start "MongoDB"

# Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas Cloud** ☁️
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string and add to `MONGODB_URI`
4. Whitelist your IP address

## 🎯 Running the Application

### 🐳 Option 1: Docker Compose (Recommended) 🚀

Easiest way to get started with a complete environment.

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- MongoDB: localhost:27017

### 💻 Option 2: Local Development Setup

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```
Backend will be available at: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Frontend will be available at: `http://localhost:3000`

**Terminal 3 - MongoDB (if using local):**
```bash
# macOS/Linux
mongod

# Windows (if installed as service)
# Just ensure MongoDB service is running
```

### 📦 Option 3: Production Build

**Backend:**
```bash
cd backend
npm run build
npm run start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

### ✅ Health Check

Once running, verify the setup:

```bash
# Backend health check
curl http://localhost:5000/api/health

# Frontend health check
curl http://localhost:3000

# Database connection
# Check backend logs for "Connected to MongoDB"
```

## 📁 Project Structure

```
inventory-management-mt/
│
├── 📄 docker-compose.yml          # Multi-container orchestration
├── 📄 README.md                   # This file
│
├── 📁 backend/                    # Node.js + Express Backend
│   ├── 📁 src/
│   │   ├── 📄 server.ts           # Application entry point
│   │   │
│   │   ├── 📁 config/             # Configuration layer
│   │   │   ├── 📄 db.connect.ts  # MongoDB connection setup
│   │   │   └── 📄 ssm.ts         # Parameter management
│   │   │
│   │   ├── 📁 controllers/        # Request handlers (5 controllers)
│   │   │   ├── 📄 auth.controller.ts
│   │   │   ├── 📄 customer.controller.ts
│   │   │   ├── 📄 items.controller.ts
│   │   │   └── 📄 sale.controller.ts
│   │   │
│   │   ├── 📁 services/           # Business logic layer
│   │   │   ├── 📄 auth.service.ts
│   │   │   ├── 📄 customer.service.ts
│   │   │   ├── 📄 items.service.ts
│   │   │   └── 📄 sales.service.ts
│   │   │
│   │   ├── 📁 repo/               # Data access layer (Generic Repository)
│   │   │   ├── 📄 base.ts        # Generic repository pattern
│   │   │   ├── 📄 customers.repo.ts
│   │   │   ├── 📄 items.repo.ts
│   │   │   ├── 📄 sales.repo.ts
│   │   │   └── 📄 user.repo.ts
│   │   │
│   │   ├── 📁 model/              # Mongoose schemas
│   │   │   ├── 📄 customers.model.ts
│   │   │   ├── 📄 item.model.ts
│   │   │   ├── 📄 sales.model.ts
│   │   │   └── 📄 user.model.ts
│   │   │
│   │   ├── 📁 routes/             # API route definitions
│   │   │   ├── 📄 auth.routes.ts
│   │   │   ├── 📄 customer.routes.ts
│   │   │   ├── 📄 entry.routes.ts
│   │   │   ├── 📄 item.routes.ts
│   │   │   └── 📄 sales.routes.ts
│   │   │
│   │   ├── 📁 middleware/         # Express middleware
│   │   │   ├── 📄 authentication.middleware.ts
│   │   │   ├── 📄 error.handler.ts
│   │   │   └── 📄 validation.middleware.ts
│   │   │
│   │   ├── 📁 interface/          # TypeScript interfaces & contracts
│   │   │   ├── 📁 auth/
│   │   │   ├── 📁 customer/
│   │   │   ├── 📁 items/
│   │   │   ├── 📁 sales/
│   │   │   └── 📁 user/
│   │   │
│   │   ├── 📁 schema/             # Validation schemas (Joi)
│   │   │   ├── 📁 auth/
│   │   │   ├── 📁 customers/
│   │   │   ├── 📁 items/
│   │   │   ├── 📁 sales/
│   │   │   └── 📁 user/
│   │   │
│   │   ├── 📁 mapper/             # DTO transformers
│   │   │   ├── 📄 customer.mapper.ts
│   │   │   ├── 📄 item.mapper.ts
│   │   │   └── 📄 sales.mapper.ts
│   │   │
│   │   ├── 📁 di/                 # Dependency injection
│   │   │   └── 📄 di.container.ts
│   │   │
│   │   ├── 📁 error/              # Custom error handling
│   │   │   └── 📄 app.error.ts
│   │   │
│   │   ├── 📁 utils/              # Utility functions
│   │   │   ├── 📄 password.service.ts
│   │   │   ├── 📄 token.service.ts
│   │   │   └── 📄 wrap.controller.ts
│   │   │
│   │   ├── 📁 constants/          # Application constants
│   │   │   ├── 📄 http.status.ts
│   │   │   └── 📄 messages.ts
│   │   │
│   │   └── 📁 types/              # TypeScript type definitions
│   │       ├── 📄 express.d.ts
│   │       ├── 📄 item.array.type.ts
│   │       ├── 📄 payment.type.ts
│   │       └── 📁 inversify/
│   │
│   ├── 📄 Dockerfile              # Backend container image
│   ├── 📄 package.json
│   ├── 📄 tsconfig.json
│   └── 📄 .env.example
│
├── 📁 frontend/                   # React + TypeScript Frontend
│   ├── 📁 src/
│   │   ├── 📄 main.tsx            # Application entry point
│   │   ├── 📄 App.tsx             # Root component
│   │   ├── 📄 index.css           # Global styles
│   │   │
│   │   ├── 📁 pages/              # Page components
│   │   │   ├── 📄 login.page.tsx
│   │   │   ├── 📄 landing.page.tsx
│   │   │   ├── 📄 dashboard.page.tsx
│   │   │   ├── 📄 customers.page.tsx
│   │   │   ├── 📄 customer.ledger.page.tsx
│   │   │   ├── 📄 items.page.tsx
│   │   │   ├── 📄 sales.page.tsx
│   │   │   └── 📄 sale.create.page.tsx
│   │   │
│   │   ├── 📁 components/         # Reusable components
│   │   │   ├── 📄 app.layout.tsx
│   │   │   ├── 📄 login.component.tsx
│   │   │   ├── 📄 modal.component.tsx
│   │   │   ├── 📄 table.component.tsx
│   │   │   ├── 📄 confirmation.modal.component.tsx
│   │   │   └── 📁 ui/             # UI library components
│   │   │
│   │   ├── 📁 api/                # API service layer
│   │   │   ├── 📄 api.ts          # Axios instance & config
│   │   │   ├── 📄 auth.api.ts
│   │   │   ├── 📄 customer.api.ts
│   │   │   ├── 📄 items.api.ts
│   │   │   └── 📄 sale.api.ts
│   │   │
│   │   ├── 📁 hooks/              # Custom React hooks
│   │   │   ├── 📁 auth/
│   │   │   ├── 📁 customers/
│   │   │   ├── 📁 items/
│   │   │   └── 📁 sales/
│   │   │
│   │   ├── 📁 redux/              # Redux store & slices
│   │   │   └── 📄 store.ts
│   │   │
│   │   ├── 📁 routes/             # Route definitions
│   │   │   └── 📄 app.routes.tsx
│   │   │
│   │   ├── 📁 types/              # TypeScript types & interfaces
│   │   │
│   │   ├── 📁 utils/              # Utility functions
│   │   │   └── 📄 lib/utils.ts
│   │   │
│   │   ├── 📁 helper/             # Helper functions
│   │   │   └── 📄 debounce.tsx
│   │   │
│   │   └── 📁 assets/             # Images & static files
│   │
│   ├── 📄 index.html
│   ├── 📄 vite.config.ts          # Vite configuration
│   ├── 📄 tsconfig.json
│   ├── 📄 components.json
│   ├── 📄 package.json
│   ├── 📄 .env.example
│   └── 📄 README.md
│
└── 📁 assets/                     # Project assets & images
    ├── 📄 dashboard.png
    ├── 📄 home.png
    ├── 📄 customerLedger.png
    ├── 📄 productsList.png
    └── 📄 salesLedger.png
```

### Architecture Highlights

**Layered Architecture:**
- **Presentation Layer** - React components & pages
- **API Layer** - Express routes & controllers
- **Service Layer** - Business logic & orchestration
- **Repository Layer** - Data access & persistence
- **Data Layer** - MongoDB models & schemas

**Key Design Patterns:**
- ✅ **Generic Repository Pattern** - Reusable data access code
- ✅ **Dependency Injection** - Loose coupling via InversifyJS
- ✅ **Service Locator** - Centralized DI container
- ✅ **Data Mapper** - DTO transformation
- ✅ **Custom Error Handling** - Centralized error processing
- ✅ **Validation Middleware** - Request validation chain

## 🔌 API Endpoints

**Base URL:** `http://localhost:5000/api`

### 🔐 Authentication Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| `POST` | `/auth/register` | Register a new user | ❌ No |
| `POST` | `/auth/login` | User login | ❌ No |
| `POST` | `/auth/logout` | User logout | ✅ Yes |
| `GET` | `/auth/profile` | Get current user profile | ✅ Yes |

### 👥 Customer Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| `GET` | `/customers` | Get all customers (paginated) | ✅ Yes |
| `POST` | `/customers` | Create new customer | ✅ Yes |
| `GET` | `/customers/:id` | Get customer details | ✅ Yes |
| `PUT` | `/customers/:id` | Update customer | ✅ Yes |
| `DELETE` | `/customers/:id` | Delete customer | ✅ Yes |
| `GET` | `/customers/:id/ledger` | Get customer transaction ledger | ✅ Yes |
| `GET` | `/customers/search` | Search customers | ✅ Yes |

### 📦 Inventory Items Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| `GET` | `/items` | Get all inventory items | ✅ Yes |
| `POST` | `/items` | Create new item | ✅ Yes |
| `GET` | `/items/:id` | Get item details | ✅ Yes |
| `PUT` | `/items/:id` | Update item | ✅ Yes |
| `DELETE` | `/items/:id` | Delete item | ✅ Yes |
| `GET` | `/items/category/:category` | Get items by category | ✅ Yes |
| `PATCH` | `/items/:id/stock` | Update item stock level | ✅ Yes |

### 💰 Sales Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| `GET` | `/sales` | Get all sales transactions | ✅ Yes |
| `POST` | `/sales` | Create new sale | ✅ Yes |
| `GET` | `/sales/:id` | Get sale details | ✅ Yes |
| `PUT` | `/sales/:id` | Update sale | ✅ Yes |
| `DELETE` | `/sales/:id` | Delete sale | ✅ Yes |
| `GET` | `/sales/customer/:id` | Get sales by customer | ✅ Yes |
| `GET` | `/sales/ledger` | Get sales ledger | ✅ Yes |

### 📊 Dashboard Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| `GET` | `/dashboard` | Get dashboard metrics | ✅ Yes |
| `GET` | `/dashboard/analytics` | Get analytics data | ✅ Yes |
| `GET` | `/dashboard/reports` | Get report data | ✅ Yes |

### 📤 Export Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| `GET` | `/export/customers/pdf` | Export customers as PDF | ✅ Yes |
| `GET` | `/export/sales/excel` | Export sales as Excel | ✅ Yes |
| `GET` | `/export/items/csv` | Export items as CSV | ✅ Yes |

### Sample Request

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Get customers with JWT token
curl -X GET http://localhost:5000/api/customers \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Create new customer
curl -X POST http://localhost:5000/api/customers \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","phone":"1234567890"}'
```

## 📝 Development Guide

### Available Scripts

#### Backend Scripts

```bash
npm run dev          # Start development server with auto-reload (nodemon)
npm run build        # Compile TypeScript to JavaScript
npm run start        # Start production server
npm run lint         # Run ESLint and check code quality
npm run format       # Format code with Prettier (if configured)
npm run test         # Run test suite (if configured)
```

#### Frontend Scripts

```bash
npm run dev          # Start Vite dev server (hot reload)
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint and check code quality
npm run type-check   # Run TypeScript type checking
```

### Development Workflow

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Start Development Servers**
   ```bash
   # Terminal 1
   cd backend && npm run dev
   
   # Terminal 2
   cd frontend && npm run dev
   ```

3. **Make Your Changes**
   - Follow TypeScript strict mode
   - Keep components small and focused
   - Use services for business logic
   - Follow repository pattern for data access

4. **Test Your Changes**
   ```bash
   npm run lint
   npm run type-check  # Frontend
   ```

5. **Commit & Push**
   ```bash
   git add .
   git commit -m "feat: Add your feature description"
   git push origin feature/your-feature-name
   ```

### Coding Standards

✅ **TypeScript**
- Strict mode enabled
- Explicit return types
- No implicit `any` types
- Use interfaces over types (prefer consistency)

✅ **React Components**
- Functional components only
- Custom hooks for logic reuse
- Props interfaces clearly defined
- Memoization for performance-critical components

✅ **Backend Services**
- Single responsibility principle
- Dependency injection via constructor
- Consistent error handling
- Input validation on all endpoints

✅ **Database**
- Use repositories for all data access
- Index frequently queried fields
- Implement soft deletes where appropriate
- Use transactions for multi-document operations

### Debugging Tips

**Backend Debugging:**
```bash
# Enable detailed logging
LOG_LEVEL=debug npm run dev

# VS Code Debugger
# Add breakpoint and run with debugger
node --inspect-brk dist/server.js
```

**Frontend Debugging:**
```bash
# React DevTools Chrome Extension
# Redux DevTools Chrome Extension
# Check browser console for errors
```

**Database Debugging:**
```bash
# Connect to MongoDB directly
mongo mongodb://localhost:27017/inventory-management

# Check indexes
db.customers.getIndexes()

# Analyze query performance
db.customers.find({email: "user@example.com"}).explain("executionStats")
```

## 🔒 Security Features

### Authentication & Authorization
- ✅ **JWT Tokens** - Stateless authentication with expiration
- ✅ **Password Hashing** - bcrypt with configurable rounds (10 by default)
- ✅ **Token Refresh** - Implement token rotation for sensitive operations
- ✅ **Session Management** - Secure session handling and logout

### Data Protection
- ✅ **Input Validation** - All requests validated against schemas
- ✅ **Sanitization** - Protection against XSS and injection attacks
- ✅ **SQL Injection Prevention** - Mongoose parameterized queries
- ✅ **CORS Configuration** - Restricted cross-origin requests

### Infrastructure Security
- ✅ **Environment Variables** - Sensitive data in .env files (not versioned)
- ✅ **HTTPS Ready** - Support for SSL/TLS in production
- ✅ **Docker Security** - Non-root user in containers
- ✅ **Rate Limiting** - Available middleware for DDoS protection

### Security Best Practices

**Frontend:**
```typescript
// Use HTTPOnly cookies for tokens
// Sanitize user input
// Validate before submission
// Implement CSP headers
```

**Backend:**
```typescript
// Never log sensitive data
// Validate JWT signature
// Implement request timeout
// Use CORS whitelist
// Regular dependency updates
```

### Production Deployment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT_SECRET (at least 32 characters)
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure database backups
- [ ] Set up monitoring & logging
- [ ] Enable rate limiting
- [ ] Use environment-specific configs
- [ ] Update dependencies regularly
- [ ] Enable security headers (helmet.js)
- [ ] Implement request logging

## � Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000        # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process or use different port
kill -9 <PID>
# Change PORT in .env file
```

#### MongoDB Connection Error
```bash
# Verify MongoDB is running
sudo systemctl status mongod    # Linux
brew services list              # macOS

# Check connection string
MONGODB_URI=mongodb://localhost:27017/inventory-management

# For Atlas: Ensure IP is whitelisted and credentials are correct
```

#### Node Modules Issues
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Compilation Errors
```bash
# Check tsconfig.json is correct
# Ensure all types are properly defined
npm run type-check

# If using strict mode, fix all type errors
```

#### Docker Issues
```bash
# Remove orphaned containers
docker-compose down -v

# Rebuild from scratch
docker-compose build --no-cache
docker-compose up

# View logs
docker-compose logs -f service-name
```

### Performance Optimization

**Backend:**
- Add database indexes on frequently queried fields
- Implement caching for read-heavy operations
- Use pagination for large datasets
- Monitor with MongoDB profiler

**Frontend:**
- Code splitting with React.lazy()
- Image optimization
- Memoization for expensive computations
- Bundle analysis with vite-plugin-visualizer

### Getting Help

1. Check existing [GitHub Issues](https://github.com/yourusername/inventory-management-mt/issues)
2. Review error logs carefully
3. Consult [Express.js docs](https://expressjs.com/)
4. Consult [MongoDB docs](https://docs.mongodb.com/)
5. Consult [React docs](https://react.dev/)

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Contribution Process

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/inventory-management-mt.git
   cd inventory-management-mt
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or for bug fixes
   git checkout -b fix/your-bug-name
   ```

3. **Make Your Changes**
   - Follow the coding standards
   - Write meaningful commit messages
   - Keep commits atomic and focused
   - Add comments for complex logic

4. **Ensure Code Quality**
   ```bash
   npm run lint
   npm run type-check    # Frontend
   npm run build
   ```

5. **Test Your Changes**
   - Manually test the feature
   - Check error scenarios
   - Verify database operations
   - Test on different browsers

6. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: Add customer search functionality"
   ```

7. **Push and Create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

### Commit Message Format

Follow conventional commits:
```
feat:     Add new feature
fix:      Fix a bug
docs:     Update documentation
style:    Code style changes (formatting, semicolons, etc.)
refactor: Code refactoring
test:     Add or update tests
chore:    Build, dependencies, or tooling
```

### Pull Request Guidelines

- Describe what your PR does
- Link related issues
- Include before/after screenshots for UI changes
- Ensure all tests pass
- Respond to review feedback promptly
- Keep PRs focused and manageable

### Code Review Criteria

- ✅ Code follows project standards
- ✅ TypeScript strict mode compliant
- ✅ No console.log in production code
- ✅ Error handling implemented
- ✅ Database queries optimized
- ✅ Security best practices followed
- ✅ Documentation updated if needed

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 📚 Resources & References

### Documentation
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Mongoose Schema](https://mongoosejs.com/docs/schema.html)
- [React Documentation](https://react.dev/)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [Vite Guide](https://vitejs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Useful Tools
- [Postman](https://www.postman.com/) - API testing
- [MongoDB Compass](https://www.mongodb.com/products/compass) - Database GUI
- [VS Code](https://code.visualstudio.com/) - Recommended IDE
- [Docker Desktop](https://www.docker.com/products/docker-desktop) - Container management

### Learning Resources
- [MERN Stack Tutorial](https://www.mongodb.com/languages/javascript)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Clean Code in JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)
- [Design Patterns in JavaScript](https://refactoring.guru/design-patterns/javascript)

---

## 🎉 Getting Started Now!

Ready to build? Follow these quick steps:

```bash
# 1. Clone & Navigate
git clone https://github.com/yourusername/inventory-management-mt.git
cd inventory-management-mt

# 2. Start with Docker (Recommended)
docker-compose up --build

# 3. Open in Browser
# Frontend: http://localhost:3000
# API: http://localhost:5000/api

# Or start locally (see Installation section)
```

---

<div align="center">

### ⭐ Show Your Support

If you find this project helpful, please consider giving it a star! It helps others discover the project.

[![GitHub Stars](https://img.shields.io/github/stars/yourusername/inventory-management-mt?style=social)](https://github.com/yourusername/inventory-management-mt)

---

**Built with ❤️ using MERN Stack + TypeScript**

Made for the **BroCamp Machine Task** Program

</div>
