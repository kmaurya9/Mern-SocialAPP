import { User } from "../models/userModel.js";
import TryCatch from "../utils/Trycatch.js";
import generateToken from "../utils/generateToken.js";
import getDataUrl from "../utils/urlGenrator.js";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";

export const registerUser = TryCatch(async (req, res) => {
  const { name, email, password, gender, role } = req.body;

  const file = req.file;

  if (!name || !email || !password || !gender) {
    return res.status(400).json({
      message: "Please give all values",
    });
  }

  // Check if email already exists
  let user = await User.findOne({ email });

  if (user)
    return res.status(400).json({
      message: "Email already registered. Please use a different email.",
    });

  // Check if name (username) already exists
  let userWithName = await User.findOne({ name });

  if (userWithName)
    return res.status(400).json({
      message: "Username already taken. Please choose a different name.",
    });

  const hashPassword = await bcrypt.hash(password, 10);

  const profilePic = {};

  // Only upload if file is provided
  if (file) {
    const fileUrl = getDataUrl(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content);
    profilePic.id = myCloud.public_id;
    profilePic.url = myCloud.secure_url;
  } else {
    // Use default profile picture
    profilePic.id = "default";
    profilePic.url = "https://via.placeholder.com/200";
  }

  user = await User.create({
    name,
    email,
    password: hashPassword,
    gender,
    role: role || "viewer",
    profilePic,
  });

  const token = generateToken(user._id, res);

  res.status(201).json({
    message: "User Registered",
    user,
    token,
  });
});

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(400).json({
      message: "Invalid Credentials",
    });

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword)
    return res.status(400).json({
      message: "Invalid Credentials",
    });

  const token = generateToken(user._id, res);

  res.json({
    message: "User Logged in",
    user,
    token,
  });
});

export const logoutUser = TryCatch((req, res) => {
  res.cookie("token", "", { maxAge: 0 });

  res.json({
    message: "Logged out successfully",
  });
});
