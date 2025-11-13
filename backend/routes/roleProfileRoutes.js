import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  createViewerProfile,
  createCuratorProfile,
  createAdminProfile,
  getViewerProfile,
  getCuratorProfile,
  getAdminProfile,
  addToWatchlist,
  updateCuratorExpertise,
  addAdminActivityLog,
} from "../controllers/roleProfileControllers.js";

const router = express.Router();

// Viewer routes
router.post("/viewer", isAuth, createViewerProfile);
router.get("/viewer/:userId", isAuth, getViewerProfile);
router.post("/viewer/watchlist", isAuth, addToWatchlist);

// Curator routes
router.post("/curator", isAuth, createCuratorProfile);
router.get("/curator/:userId", isAuth, getCuratorProfile);
router.put("/curator/expertise", isAuth, updateCuratorExpertise);

// Admin routes
router.post("/admin", isAuth, createAdminProfile);
router.get("/admin/:userId", isAuth, getAdminProfile);
router.post("/admin/activity", isAuth, addAdminActivityLog);

export default router;
