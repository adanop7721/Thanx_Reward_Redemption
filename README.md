# Thanx Reward Redemption System

A full-stack web application for managing reward points redemption, built with React frontend and Ruby on Rails backend.

## 🚀 Features

- **User Points Management**: View current reward points balance
- **Reward Catalog**: Browse available rewards with detailed information
- **Redemption System**: Redeem rewards using points
- **Redemption History**: Track all past redemptions
- **Professional UI**: Modern, responsive design with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React** (v19.1.0) with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Modern ES6+ features**

### Backend
- **Ruby on Rails** (v7.1.5) API-only mode
- **SQLite3** database
- **RESTful API** architecture
- **Professional routing and controllers**

## 📁 Project Structure

```
Thanx_Reward_Redemption/
├── frontend/           # React + Vite + TypeScript + Tailwind
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── backend/            # Ruby on Rails API
│   ├── app/
│   ├── config/
│   ├── db/
│   ├── Gemfile
│   └── ...
└── README.md
```

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Ruby (v3.0 or higher)
- Rails (v7.1 or higher)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Thanx_Reward_Redemption
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   bundle install
   rails db:create db:migrate db:seed
   rails server -p 3001
   ```

3. **Setup Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the Application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 🔧 Development

### Backend API Endpoints

- `GET /api/users/:id/points` - Get user's current points balance
- `GET /api/rewards` - Get list of available rewards
- `POST /api/redemptions` - Redeem a reward
- `GET /api/users/:id/redemptions` - Get user's redemption history

### Frontend Development

Start the development server:
```bash
cd frontend
npm run dev
```

### Database Schema

The application uses the following main models:
- **User**: Stores user information and points balance
- **Reward**: Available rewards with cost and details
- **Redemption**: History of user redemptions

## 🧪 Testing

Run backend tests:
```bash
cd backend
rails test
```

Run frontend tests:
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Backend
Deploy to your preferred platform (Heroku, AWS, etc.)

### Frontend
Build for production:
```bash
cd frontend
npm run build
```

## 📝 API Documentation

### Authentication
Currently, the API uses a simple user ID system. In production, implement proper authentication.

### Error Handling
All API endpoints return appropriate HTTP status codes and error messages.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes with descriptive messages
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built for Thanx take-home challenge
- Uses modern web development best practices
- Follows RESTful API design principles
