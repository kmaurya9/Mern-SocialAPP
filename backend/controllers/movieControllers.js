import axios from "axios";
import TryCatch from "../utils/Trycatch.js";
import { Review } from "../models/reviewModel.js";
import { Movie } from "../models/movieModel.js";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Search movies from TMDB
export const searchMovies = TryCatch(async (req, res) => {
  const { query } = req.query;

  if (!query || query.trim() === "") {
    return res.status(400).json({
      message: "Please provide a search query",
    });
  }

  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  
  if (!TMDB_API_KEY) {
    console.error("[TMDB Search] Error: API key not configured");
    return res.status(500).json({
      message: "TMDB API key not configured",
    });
  }

  console.log("[TMDB Search] Query:", query.trim());
  console.log("[TMDB Search] API Key loaded:", !!TMDB_API_KEY);

  try {
    console.log("[TMDB Search] Calling TMDB API for:", query.trim());
    
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query: query.trim(),
        page: 1,
      },
      timeout: 10000, // 10 second timeout
    });

    console.log("[TMDB Search] Success - Found", response.data.results.length, "results for:", query.trim());

    // Save search results to local database
    for (const movie of response.data.results) {
      await Movie.findOneAndUpdate(
        { tmdbId: movie.id.toString() },
        {
          tmdbId: movie.id.toString(),
          title: movie.title,
          poster_path: movie.poster_path,
          overview: movie.overview,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          genre_ids: movie.genre_ids,
        },
        { upsert: true }
      );
    }

    res.json({
      results: response.data.results,
      total_results: response.data.total_results,
    });
  } catch (error) {
    console.error("[TMDB Search] API Error:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.response?.data?.status_message || error.message,
      query: query.trim(),
      url: error.config?.url,
    });
    throw error; // Re-throw for TryCatch to handle
  }
});

// Get movie details from TMDB
export const getMovieDetails = TryCatch(async (req, res) => {
  const { id } = req.params;
  
  const TMDB_API_KEY = process.env.TMDB_API_KEY;

  const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
    params: {
      api_key: TMDB_API_KEY,
      append_to_response: "credits,videos",
    },
  });

  // Save movie to local database
  await Movie.findOneAndUpdate(
    { tmdbId: id },
    {
      tmdbId: id,
      title: response.data.title,
      poster_path: response.data.poster_path,
      overview: response.data.overview,
      release_date: response.data.release_date,
      vote_average: response.data.vote_average,
      genre_ids: response.data.genres?.map(g => g.id),
    },
    { upsert: true }
  );

  res.json(response.data);
});

// Add review for a movie
export const addReview = TryCatch(async (req, res) => {
  const { movieId, movieTitle, rating, review, moviePoster } = req.body;

  if (!movieId || !movieTitle || !rating || !review) {
    return res.status(400).json({
      message: "Please provide all required fields",
    });
  }

  const newReview = await Review.create({
    movieId,
    movieTitle,
    user: req.user._id,
    rating,
    review,
    moviePoster,
  });

  const populatedReview = await Review.findById(newReview._id).populate(
    "user",
    "-password"
  );

  res.status(201).json({
    message: "Review added successfully",
    review: populatedReview,
  });
});

// Get all reviews for a movie
export const getMovieReviews = TryCatch(async (req, res) => {
  const { movieId } = req.params;

  const reviews = await Review.find({ movieId })
    .sort({ createdAt: -1 })
    .populate("user", "-password");

  res.json(reviews);
});

// Get all reviews by a user
export const getUserReviews = TryCatch(async (req, res) => {
  const { userId } = req.params;

  const reviews = await Review.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate("user", "-password");

  res.json(reviews);
});

// Delete review
export const deleteReview = TryCatch(async (req, res) => {
  const { id } = req.params;

  const review = await Review.findById(id);

  if (!review) {
    return res.status(404).json({
      message: "Review not found",
    });
  }

  if (review.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }

  await review.deleteOne();

  res.json({
    message: "Review deleted successfully",
  });
});

// Update review
export const updateReview = TryCatch(async (req, res) => {
  const { id } = req.params;
  const { rating, review } = req.body;

  const existingReview = await Review.findById(id);

  if (!existingReview) {
    return res.status(404).json({
      message: "Review not found",
    });
  }

  if (existingReview.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }

  if (rating) existingReview.rating = rating;
  if (review) existingReview.review = review;

  await existingReview.save();

  const updatedReview = await Review.findById(id).populate("user", "-password");

  res.json({
    message: "Review updated successfully",
    review: updatedReview,
  });
});

// Save movie to watchlist
export const saveMovieToWatchlist = TryCatch(async (req, res) => {
  const { tmdbId } = req.body;

  const movie = await Movie.findOne({ tmdbId });

  if (!movie) {
    return res.status(404).json({
      message: "Movie not found in database",
    });
  }

  if (movie.savedBy.includes(req.user._id)) {
    return res.status(400).json({
      message: "Movie already in watchlist",
    });
  }

  movie.savedBy.push(req.user._id);
  await movie.save();

  res.json({
    message: "Movie added to watchlist",
    movie,
  });
});

// Remove movie from watchlist
export const removeFromWatchlist = TryCatch(async (req, res) => {
  const { tmdbId } = req.body;

  const movie = await Movie.findOne({ tmdbId });

  if (!movie) {
    return res.status(404).json({
      message: "Movie not found",
    });
  }

  movie.savedBy = movie.savedBy.filter(id => id.toString() !== req.user._id.toString());
  await movie.save();

  res.json({
    message: "Movie removed from watchlist",
  });
});

// Get user's watchlist
export const getWatchlist = TryCatch(async (req, res) => {
  const movies = await Movie.find({ savedBy: req.user._id });
  res.json(movies);
});
