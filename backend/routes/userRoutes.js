import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  followandUnfollowUser,
  myProfile,
  updatePassword,
  updateProfile,
  userFollowerandFollowingData,
  userProfile,
  getAllUsers,
  searchPublicUsers,
  updateUserRole,
  deleteUser,
} from "../controllers/userControllers.js";
import uploadFile from "../middlewares/multer.js";

const router = express.Router();

// Public route - search users without auth
router.get("/search/public", searchPublicUsers);

// Protected routes
router.get("/all", isAuth, getAllUsers);
router.get("/me", isAuth, myProfile);
router.get("/:id", isAuth, userProfile);
router.post("/:id", isAuth, updatePassword);
router.put("/role/:id", isAuth, updateUserRole);
router.put("/:id", isAuth, uploadFile, updateProfile);
router.delete("/:id", isAuth, deleteUser);
router.post("/follow/:id", isAuth, followandUnfollowUser);
router.get("/followdata/:id", isAuth, userFollowerandFollowingData);

export default router;
