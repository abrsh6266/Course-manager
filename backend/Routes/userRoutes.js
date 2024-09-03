// routes/userRoutes.js
const express = require("express");
const {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  enrolling,
  enrolledCourses,
} = require("../Controllers/userController");
const isLoggedIn = require("../middlewares/isLogged");

const router = express.Router();

// User registration route
router.post("/register", registerUser);

// User login route
router.post("/login", authUser);

// Get user profile
router.get("/profile", isLoggedIn, getUserProfile);

// Update user profile
router.put("/profile", isLoggedIn, updateUserProfile);

// Enroll user in a course
router.post("/enroll", isLoggedIn, enrolling);

// Get all enrolled courses for a user
router.get("/enrolled-courses", isLoggedIn, enrolledCourses);

module.exports = router;
