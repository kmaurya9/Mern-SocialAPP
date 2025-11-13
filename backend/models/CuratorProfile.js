import mongoose from "mongoose";

const curatorProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    curatedLists: [
      {
        listId: mongoose.Schema.Types.ObjectId,
        listName: String,
        description: String,
        movies: [String],
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    recommendations: [
      {
        movieId: String,
        reason: String,
        createdAt: Date,
      },
    ],
    expertise: [String],
    followersCount: {
      type: Number,
      default: 0,
    },
    listsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const CuratorProfile = mongoose.model("CuratorProfile", curatorProfileSchema);
