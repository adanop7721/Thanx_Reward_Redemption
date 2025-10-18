# Thanx Reward Redemption System

A full-stack web application for managing reward points redemption, built with React frontend and Ruby on Rails backend.

## 🚀 Features

- **User Points Management**: View current reward points balance
- **Reward Catalog**: Browse available rewards with detailed information
- **Redemption System**: Redeem rewards using points
- **Redemption History**: Track all past redemptions
- **Professional UI**: Modern, responsive design with Tailwind CSS

## 🛠️ Tech Stack

**Frontend:** React 19.1.0 + TypeScript, Vite, Tailwind CSS  
**Backend:** Ruby on Rails 7.1.5 API, SQLite3 Database



## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Ruby** (v3.0 or higher) - [Download here](https://www.ruby-lang.org/)
- **Bundler** gem: `gem install bundler`

### 📥 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/adanop7721/Thanx_Reward_Redemption.git
cd Thanx_Reward_Redemption
```

2. **Setup Backend (Rails API):**
```bash
cd backend

# Install dependencies
bundle install

# Setup database
rails db:create
rails db:migrate
rails db:seed

# Verify setup
rails db:version
```

3. **Setup Frontend (React):**
```bash
cd ../frontend

# Install dependencies
npm install

# Create environment file
echo "VITE_API_BASE_URL=http://localhost:3001" > .env
```

### 🏃‍♂️ Running the Application

**Method 1: Using two terminals (Recommended)**

**Terminal 1 - Backend:**
```bash
cd backend
rails server -p 3001
```
✅ Backend API will be available at `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ Frontend app will be available at `http://localhost:5173`

**Method 2: Background processes**
```bash
# Start backend in background
cd backend && rails server -p 3001 &

# Start frontend
cd frontend && npm run dev
```
## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `POST` | `/api/users/signup` | Register new user | `{user: {email, password, password_confirmation}}` |
| `POST` | `/api/auth/login` | User login | `{email, password}` |
| `POST` | `/api/auth/logout` | User logout | - |
| `GET` | `/api/users/me` | Get current user | - |

### Rewards & Redemptions

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `GET` | `/api/rewards` | List all rewards | - |
| `POST` | `/api/redemptions` | Redeem a reward | `{reward_id}` |
| `GET` | `/api/redemptions` | Get redemption history | - |


## 🏗 Project Structure

```
Thanx_Reward_Redemption/
├── backend/                 # Rails API
│   ├── app/
│   │   ├── controllers/     # API controllers
│   │   ├── models/          # User, Reward, Redemption models
│   │   └── serializers/     # JSON response formatting
│   ├── db/                  # Database migrations & seeds
│   └── config/              # Rails configuration
│
├── frontend/                # React App
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── ui/
│   │   │   │   ├── feedback/    # Alert, ErrorMessage, etc.
│   │   │   │   ├── forms/       # Form components
│   │   │   │   ├── layout/      # Layout components
│   │   │   │   ├── loading/     # Loading states
│   │   │   │   └── specialized/ # Domain components
│   │   ├── pages/           # Main pages (Login, Dashboard, etc.)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # Business logic
│   │   ├── contexts/        # React contexts (Auth)
│   │   ├── lib/             # API client
│   │   └── utils/           # Helper functions
│   └── public/              # Static assets
│
└── README.md               # This file
```

## 🎯 Key Features Explained

### 💡 Points System
- New users start with **1000 points**
- Points are deducted when redeeming rewards
- Real-time balance updates across the app

### 🔒 Security Features
- Password hashing with bcrypt
- Secure token-based authentication
- Protected API endpoints
- Input validation on both frontend and backend

### 📱 Responsive Design
- Mobile-first approach
- Works seamlessly on desktop, tablet, and mobile
- Touch-friendly interfaces

## 🚀 Future Improvements

- **Enhanced Security** - JWT tokens, password reset, 2FA, OAuth integration
- **Performance Optimization** - Pagination, infinite scrolling, API caching
- **Advanced Features** - Push notifications, reward categories, user profiles
- **Production Ready** - PostgreSQL database, Docker deployment, monitoring
- **Mobile Experience** - Progressive Web App, offline support, dark mode
- **Quality Assurance** - Comprehensive testing, CI/CD pipeline, code coverage
