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

### Running Performance Tests

#### Installing k6
First, install k6 on your system:

**macOS (using Homebrew):**
```bash
brew install k6
```

**Download k6:**
Download and install from https://k6.io/docs/get-started/installation/

#### Running tests
```bash
cd testing/k6
k6 run load-tests.js        # Run load tests
k6 run stress-tests.js      # Run stress tests
k6 run spike-tests.js       # Run spike tests
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