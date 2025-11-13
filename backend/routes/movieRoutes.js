import express from "express";
import {
  searchMovies,
  getMovieDetails,
  addReview,
  getMovieReviews,
  getUserReviews,
  deleteReview,
  updateReview,
  saveMovieToWatchlist,
  removeFromWatchlist,
  getWatchlist,
} from "../controllers/movieControllers.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

// Public routes (no auth required)
router.get("/search", searchMovies);
router.get("/details/:id", getMovieDetails);
router.get("/reviews/:movieId", getMovieReviews);
router.get("/user-reviews/:userId", getUserReviews);

// Protected routes (auth required)
router.post("/review", isAuth, addReview);
router.delete("/review/:id", isAuth, deleteReview);
router.put("/review/:id", isAuth, updateReview);
router.post("/watchlist/add", isAuth, saveMovieToWatchlist);
router.post("/watchlist/remove", isAuth, removeFromWatchlist);
router.get("/watchlist/my", isAuth, getWatchlist);

export default router;
