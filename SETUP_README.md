# MERN Social Media Application

A full-stack social media platform built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring real-time messaging, movie reviews, and social interactions.

## 🎯 Features

### Core Functionality
- **User Authentication**: Register/Login with JWT-based authentication
- **User Roles**: Admin and User roles with role-based access control
- **Profile Management**: Update profile picture, name, and password
- **Social Features**: Follow/Unfollow users, view followers and followings
- **Posts & Reels**: Create, edit, and delete posts (images) and reels (videos)
- **Interactions**: Like, comment on posts and reels
- **Real-time Chat**: One-to-one messaging with Socket.IO
- **Online Status**: See who's online in real-time

### Movie Features (External API Integration)
- **Movie Search**: Search movies from The Movie Database (TMDB) API
- **Movie Details**: View detailed information about movies from external API
- **Movie Reviews**: Add, edit, and delete reviews for movies (stored locally)
- **User Reviews**: View all reviews by a specific user

### Anonymous Access
- Browse home page and view posts without logging in
- Search for movies and users
- View movie details and reviews
- Login required only for interactions (like, comment, follow, review)

## 📋 Requirements Met

### Home Page ✅
- Mapped to "/" route
- Shows generic content for anonymous users with call-to-action
- Shows personalized feed for logged-in users (their posts first)
- Dynamic content based on latest data

### Profile Page ✅
- Mapped to "/profile" for logged-in user
- Mapped to "/profile/:id" for other users
- Edit personal information (name, profile pic, password)
- Hide sensitive info from other users
- Grouped sections: Posts, Reels, Followers, Following
- Links to related content and users

### Search Page ✅
- Search both local users AND remote movies (TMDB API)
- URL parameters for search criteria (/search?query=...&type=...)
- Summarized results with links to details
- Accessible without login

### Details Page ✅
- Mapped to "/details/:id"
- Fetches movie details from TMDB (remote API)
- Shows local reviews from database
- Links to user profiles who wrote reviews
- Accessible without login

### Login/Register ✅
- Separate /login and /register routes
- Role selection during registration (User/Admin)
- Most pages accessible without login
- Forces login only for interactions

## 🛠️ Technology Stack

### Backend
- **Node.js & Express.js**: Server and API
- **MongoDB & Mongoose**: Database
- **Socket.IO**: Real-time communication
- **JWT & bcrypt**: Authentication and security
- **Cloudinary**: Media storage (images/videos)
- **Multer**: File upload handling
- **Axios**: External API calls (TMDB)

### Frontend
- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **TailwindCSS**: Styling
- **React Router v6**: Routing
- **Socket.IO Client**: Real-time features
- **Axios**: HTTP client
- **React Hot Toast**: Notifications
- **React Icons**: Icon library
- **date-fns**: Date formatting

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account
- TMDB API key

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Mern-Social
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Environment Variables**
   
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   Cloudinary_Cloud_Name=your_cloudinary_cloud_name
   Cloudinary_Api=your_cloudinary_api_key
   Cloudinary_Secret=your_cloudinary_api_secret
   TMDB_API_KEY=your_tmdb_api_key
   ```

   **Getting API Keys:**
   - **MongoDB**: Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - **Cloudinary**: Sign up at [Cloudinary](https://cloudinary.com/)
   - **TMDB**: Sign up at [TMDB](https://www.themoviedb.org/) and get API key from [Settings > API](https://www.themoviedb.org/settings/api)

4. **Run the application**

   **Development Mode:**
   ```bash
   # Terminal 1 - Backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

   **Production Mode:**
   ```bash
   # Build frontend
   npm run build

   # Start server
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:5173 (development)
   - Backend API: http://localhost:3000
   - Production: http://localhost:3000 (serves built frontend)

## 📁 Project Structure

```
Mern-Social/
├── backend/
│   ├── controllers/       # Request handlers
│   │   ├── authControllers.js
│   │   ├── userControllers.js
│   │   ├── postControllers.js
│   │   ├── messageControllers.js
│   │   └── movieControllers.js (NEW)
│   ├── models/           # Database schemas
│   │   ├── userModel.js  (Updated with roles)
│   │   ├── postModel.js
│   │   ├── ChatModel.js
│   │   ├── Messages.js
│   │   └── reviewModel.js (NEW)
│   ├── routes/           # API routes
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── postRoutes.js
│   │   ├── messageRoutes.js
│   │   └── movieRoutes.js (NEW)
│   ├── middlewares/      # Custom middleware
│   │   ├── isAuth.js
│   │   └── multer.js
│   ├── socket/           # Socket.IO configuration
│   ├── utils/            # Utility functions
│   └── index.js          # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── context/      # Context providers
│   │   │   └── MovieContext.jsx (NEW)
│   │   ├── pages/        # Page components
│   │   │   ├── Home.jsx (Updated)
│   │   │   ├── Search.jsx (Updated)
│   │   │   ├── Account.jsx
│   │   │   ├── Register.jsx (Updated)
│   │   │   └── MovieDetails.jsx (NEW)
│   │   ├── App.jsx (Updated routes)
│   │   └── main.jsx
│   └── package.json
├── .env.example
└── package.json
```

## 🔑 Key Updates

### Backend
1. ✅ Added `reviewModel.js` for movie reviews
2. ✅ Added `movieControllers.js` with TMDB integration
3. ✅ Added `movieRoutes.js` for movie-related endpoints
4. ✅ Updated `userModel.js` to include role field
5. ✅ Updated `authControllers.js` to handle role during registration
6. ✅ Updated `index.js` to include movie routes

### Frontend
1. ✅ Created `MovieContext.jsx` for movie state management
2. ✅ Created `MovieDetails.jsx` page for movie details and reviews
3. ✅ Updated `Search.jsx` to search both users and movies
4. ✅ Updated `Home.jsx` for anonymous and logged-in user content
5. ✅ Updated `Register.jsx` to include role selection
6. ✅ Updated `App.jsx` for proper routing and anonymous access
7. ✅ Updated `NavigationBar.jsx` to use /profile route
8. ✅ Updated `main.jsx` to include MovieContext

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/logout` - Logout user

### Users
- `GET /api/user/me` - Get current user profile
- `GET /api/user/:id` - Get user by ID
- `GET /api/user/all` - Search users
- `POST /api/user/follow/:id` - Follow/Unfollow user
- `PUT /api/user/:id` - Update profile
- `GET /api/user/followdata/:id` - Get followers/following

### Posts
- `GET /api/post/all` - Get all posts and reels
- `POST /api/post/new` - Create post/reel
- `DELETE /api/post/:id` - Delete post
- `POST /api/post/like/:id` - Like/Unlike post
- `POST /api/post/comment/:id` - Add comment

### Movies (NEW)
- `GET /api/movies/search` - Search movies from TMDB
- `GET /api/movies/details/:id` - Get movie details from TMDB
- `GET /api/movies/reviews/:movieId` - Get reviews for a movie
- `POST /api/movies/review` - Add review (auth required)
- `PUT /api/movies/review/:id` - Update review (auth required)
- `DELETE /api/movies/review/:id` - Delete review (auth required)

### Messages
- `GET /api/messages/chats` - Get all chats
- `POST /api/messages` - Send message
- `GET /api/messages/:id` - Get messages

## 🚀 Deployment

The application is configured for Vercel deployment:

```bash
vercel deploy
```

Make sure to set all environment variables in Vercel dashboard.

## 👥 User Roles

- **User**: Can create posts, follow others, chat, review movies
- **Admin**: Same as user (can be extended with admin-specific features)

## 📝 Notes

- The application uses cookie-based authentication
- Real-time features require Socket.IO connection
- Movie data is fetched from TMDB API (external)
- Reviews are stored in local MongoDB database
- Media files are stored in Cloudinary

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📄 License

ISC
