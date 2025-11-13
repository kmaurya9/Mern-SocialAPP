import TryCatch from "../utils/Trycatch.js";
import { ViewerProfile } from "../models/ViewerProfile.js";
import { CuratorProfile } from "../models/CuratorProfile.js";
import { AdminProfile } from "../models/AdminProfile.js";

export const createViewerProfile = TryCatch(async (req, res) => {
  const profile = await ViewerProfile.create({
    userId: req.user._id,
    watchlist: [],
    favoriteGenres: [],
    reviewsCount: 0,
    watchedMovies: [],
  });

  res.status(201).json({
    message: "Viewer profile created",
    profile,
  });
});

export const createCuratorProfile = TryCatch(async (req, res) => {
  const profile = await CuratorProfile.create({
    userId: req.user._id,
    curatedLists: [],
    recommendations: [],
    expertise: [],
    followersCount: 0,
    listsCount: 0,
  });

  res.status(201).json({
    message: "Curator profile created",
    profile,
  });
});

export const createAdminProfile = TryCatch(async (req, res) => {
  const profile = await AdminProfile.create({
    userId: req.user._id,
    permissions: ["view_reports", "moderate_content"],
    moderationLevel: "basic",
    lastLogin: new Date(),
    reportsHandled: 0,
    usersManaged: 0,
    suspendedUsers: [],
    activityLog: [],
  });

  res.status(201).json({
    message: "Admin profile created",
    profile,
  });
});

export const getViewerProfile = TryCatch(async (req, res) => {
  const profile = await ViewerProfile.findOne({
    userId: req.params.userId,
  }).populate("userId", "-password");

  if (!profile)
    return res.status(404).json({
      message: "Viewer profile not found",
    });

  res.json(profile);
});

export const getCuratorProfile = TryCatch(async (req, res) => {
  const profile = await CuratorProfile.findOne({
    userId: req.params.userId,
  }).populate("userId", "-password");

  if (!profile)
    return res.status(404).json({
      message: "Curator profile not found",
    });

  res.json(profile);
});

export const getAdminProfile = TryCatch(async (req, res) => {
  const profile = await AdminProfile.findOne({
    userId: req.params.userId,
  }).populate("userId", "-password");

  if (!profile)
    return res.status(404).json({
      message: "Admin profile not found",
    });

  res.json(profile);
});

export const addToWatchlist = TryCatch(async (req, res) => {
  const { movieId, movieTitle } = req.body;

  const profile = await ViewerProfile.findOne({
    userId: req.user._id,
  });

  if (!profile)
    return res.status(404).json({
      message: "Viewer profile not found",
    });

  profile.watchlist.push({
    movieId,
    movieTitle,
  });

  await profile.save();

  res.json({
    message: "Movie added to watchlist",
    profile,
  });
});

export const updateCuratorExpertise = TryCatch(async (req, res) => {
  const { expertise } = req.body;

  const profile = await CuratorProfile.findOne({
    userId: req.user._id,
  });

  if (!profile)
    return res.status(404).json({
      message: "Curator profile not found",
    });

  profile.expertise = expertise;
  await profile.save();

  res.json({
    message: "Expertise updated",
    profile,
  });
});

export const addAdminActivityLog = TryCatch(async (req, res) => {
  const { action, targetId } = req.body;

  const profile = await AdminProfile.findOne({
    userId: req.user._id,
  });

  if (!profile)
    return res.status(404).json({
      message: "Admin profile not found",
    });

  profile.activityLog.push({
    action,
    targetId,
    timestamp: new Date(),
  });

  profile.lastModeration = new Date();
  await profile.save();

  res.json({
    message: "Activity logged",
    profile,
  });
});
