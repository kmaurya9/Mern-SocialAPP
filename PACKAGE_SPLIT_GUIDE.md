# NPM Package Split Guide

## Current Setup
Your main `package.json` has BOTH backend and frontend dependencies combined. When you split, each repo needs its own `package.json`.

---

## 📦 BACKEND REPO - package.json

Create new file: `Mern-Social-Backend/package.json`

```json
{
  "name": "mern-social-backend",
  "version": "1.0.0",
  "description": "MERN Social App Backend API",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^1.7.7",
    "bcrypt": "^5.1.1",
    "cloudinary": "^2.2.0",
    "cookie-parser": "^1.4.6",
    "datauri": "^4.1.0",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.4.1",
    "multer": "^1.4.5-lts.1",
    "socket.io": "^4.7.5",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.1.3"
  }
}
```

**What to copy to backend folder:**
- All backend dependencies (express, mongoose, socket.io, etc.)
- Socket.io (for real-time chat)
- Cloudinary (for image uploads)
- BCrypt & JWT (for authentication)

---

## 🎨 FRONTEND REPO - package.json

Your frontend already has the correct `package.json`! Just keep it as is:

```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.7.2",
    "date-fns": "^3.6.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hot-toast": "^2.4.1",
    "react-icons": "^5.2.1",
    "react-router-dom": "^6.23.1",
    "socket.io-client": "^4.7.5"
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react-swc": "^3.5.0",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.34.1",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "vite": "^5.2.0"
  }
}
```

**What to copy to frontend folder:**
- React, React-DOM, React Router (UI framework)
- Axios (HTTP requests)
- Socket.io-client (for real-time chat)
- Vite (build tool - already there)
- Tailwind CSS (styling - already there)

---

## 🔧 BACKEND .env FILE

Create: `Mern-Social-Backend/.env`

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-social

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here

# Cloudinary (Image Upload)
Cloudinary_Cloud_Name=your_cloudinary_cloud_name
Cloudinary_Api=your_cloudinary_api_key
Cloudinary_Secret=your_cloudinary_secret

# TMDB API (Movie Database)
TMDB_API_KEY=your_tmdb_api_key

# Server Port
PORT=3000

# CORS (if deploying frontend separately)
FRONTEND_URL=http://localhost:5173
```

---

## 🎯 FRONTEND CONFIG (No changes needed!)

Your `vite.config.js` already proxies correctly:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
```

In **development** (local):
- Frontend dev server: http://localhost:5173
- Backend API: http://localhost:3000
- Proxy automatically sends `/api` calls to backend ✅

In **production** (deployed):
- Change backend URL in `frontend/src/main.jsx`:
```javascript
// Add this after axios import
if (import.meta.env.PROD) {
  axios.defaults.baseURL = "https://your-deployed-backend.com";
}
```

---

## 📋 SETUP STEPS FOR EACH REPO

### BACKEND REPO

```bash
# 1. Navigate to backend folder
cd Mern-Social-Backend

# 2. Install dependencies from NEW package.json
npm install

# 3. Create .env file with all your API keys

# 4. Start server
npm start
# Output: "Server is running on http://localhost:3000"
```

### FRONTEND REPO

```bash
# 1. Navigate to frontend folder
cd Mern-Social-Frontend

# 2. Install dependencies (already has package.json)
npm install

# 3. Development server
npm run dev
# Output: "Local: http://localhost:5173"

# 4. Production build
npm run build
# Creates dist/ folder for deployment
```

---

## ✅ SUMMARY TABLE

| Dependency | Backend Repo | Frontend Repo | Why |
|-----------|-----------|-----------|-----------|
| Express | ✅ | ❌ | Backend server framework |
| Mongoose | ✅ | ❌ | MongoDB database connection |
| Socket.io | ✅ | ❌ | Backend WebSocket server |
| Socket.io-client | ❌ | ✅ | Frontend WebSocket client |
| Cloudinary | ✅ | ❌ | Image upload service |
| JWT / BCrypt | ✅ | ❌ | Backend authentication |
| Axios | ✅ | ✅ | Both need it (backend for external APIs, frontend for HTTP) |
| React | ❌ | ✅ | Frontend UI framework |
| Vite | ❌ | ✅ | Frontend build tool |
| Tailwind CSS | ❌ | ✅ | Frontend styling |
| Nodemon | ✅ (dev) | ❌ | Auto-restart backend on changes |

---

## 🚀 HOW THEY COMMUNICATE

1. **Frontend** (http://localhost:5173) makes API calls to `/api/user/login`
2. **Vite proxy** intercepts and forwards to `http://localhost:3000/api/user/login`
3. **Backend** (http://localhost:3000) handles the request
4. **Backend** returns JSON response
5. **Frontend** receives and displays data

**All packages you need are correctly split!** ✨

