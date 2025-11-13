import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const MovieContext = createContext();

export const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search movies from TMDB
  async function searchMovies(query) {
    setLoading(true);
    try {
      if (!query || query.trim() === "") {
        // Clear results immediately when query is empty
        setMovies([]);
        setLoading(false);
        return [];
      }

      console.log("[Movie Search] Searching for:", query);
      
      const { data } = await axios.get(`/api/movies/search?query=${encodeURIComponent(query.trim())}`);
      
      console.log("[Movie Search] Found", data.results.length, "results");
      setMovies(data.results);
      setLoading(false);
      return data.results;
    } catch (error) {
      console.error("[Movie Search] Error:", error);
      
      let errorMessage = "Error searching movies";
      
      if (error.response?.status === 400) {
        errorMessage = error.response?.data?.message || "Invalid search query";
      } else if (error.response?.status === 500) {
        errorMessage = error.response?.data?.message || "Server error - TMDB API may be unavailable";
      } else if (error.code === "ECONNABORTED") {
        errorMessage = "Request timeout - Backend server may be slow or unresponsive";
      } else if (error.message === "Network Error" || !error.response) {
        errorMessage = "Network error - Unable to connect to backend server";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
      setLoading(false);
      return [];
    }
  }

  // Get movie details from TMDB
  async function getMovieDetails(id) {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/movies/details/${id}`);
      setSelectedMovie(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.error(error);
      toast.error("Error fetching movie details");
      setLoading(false);
      return null;
    }
  }

  // Get reviews for a movie
  async function getMovieReviews(movieId) {
    try {
      const { data } = await axios.get(`/api/movies/reviews/${movieId}`);
      setReviews(data);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  // Add review
  async function addMovieReview(reviewData) {
    try {
      const { data } = await axios.post("/api/movies/review", reviewData);
      toast.success(data.message);
      await getMovieReviews(reviewData.movieId);
      return data.review;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding review");
      return null;
    }
  }

  // Delete review
  async function deleteMovieReview(reviewId, movieId) {
    try {
      const { data } = await axios.delete(`/api/movies/review/${reviewId}`);
      toast.success(data.message);
      await getMovieReviews(movieId);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting review");
    }
  }

  // Update review
  async function updateMovieReview(reviewId, reviewData, movieId) {
    try {
      const { data } = await axios.put(
        `/api/movies/review/${reviewId}`,
        reviewData
      );
      toast.success(data.message);
      await getMovieReviews(movieId);
      return data.review;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating review");
      return null;
    }
  }

  // Get user reviews
  async function getUserReviews(userId) {
    try {
      const { data } = await axios.get(`/api/movies/user-reviews/${userId}`);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  return (
    <MovieContext.Provider
      value={{
        movies,
        selectedMovie,
        reviews,
        loading,
        searchMovies,
        getMovieDetails,
        getMovieReviews,
        addMovieReview,
        deleteMovieReview,
        updateMovieReview,
        getUserReviews,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const MovieData = () => useContext(MovieContext);
