import mongoose from "mongoose";

const viewerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    watchlist: [
      {
        movieId: String,
        movieTitle: String,
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    favoriteGenres: [String],
    reviewsCount: {
      type: Number,
      default: 0,
    },
    watchedMovies: [
      {
        movieId: String,
        watchedAt: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const ViewerProfile = mongoose.model("ViewerProfile", viewerProfileSchema);
