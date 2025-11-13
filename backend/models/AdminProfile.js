import mongoose from "mongoose";

const adminProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    permissions: [String],
    moderationLevel: {
      type: String,
      enum: ["basic", "advanced", "super"],
      default: "basic",
    },
    lastLogin: Date,
    lastModeration: Date,
    reportsHandled: {
      type: Number,
      default: 0,
    },
    usersManaged: {
      type: Number,
      default: 0,
    },
    suspendedUsers: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        reason: String,
        suspendedAt: Date,
      },
    ],
    activityLog: [
      {
        action: String,
        targetId: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const AdminProfile = mongoose.model("AdminProfile", adminProfileSchema);
