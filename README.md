# 🌱 SPM Project

A comprehensive agriculture management system with features for farmers and administrators.

## 🚀 Getting Started

### Backend Setup
```bash
cd backend
npm install
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 👤 Authentication Details

### User Access
| Role | Email | Password |
|------|-------|----------|
| 👨‍🌾 User | user@gmail.com | user12345 |
| 👨‍💼 Admin | admin@gmail.com | admin12345 |

## 🧪 Testing

### Running UI Tests
```bash
cd testing
npm install
npm run test:cypress
```

### Running Unit Tests
```bash
cd testing
npm install
npm run test:api            # Run all API controller tests
npm run test:api -- --watch # Run in watch mode
```
```

## 📝 Project Structure

- `frontend/` - React application with Tailwind CSS
- `backend/` - Node.js API server
- `testing/` - Cypress and Jest test suites

## 📊 Features

- Cost calculation for farming operations
- Plant and disease management
- Fertilizer recommendations
- Location-based crop suggestions
- Weather information integration
- Responsive dashboard interface