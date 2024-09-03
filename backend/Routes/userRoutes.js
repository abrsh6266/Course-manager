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
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// User registration route
router.post("/register", registerUser);

// User login route
router.post("/login", authUser);

// Get user profile (protected)
router.get("/profile", protect, getUserProfile);

// Update user profile (protected)
router.put("/profile", protect, updateUserProfile);

// Enroll user in a course (protected)
router.post("/enroll", protect, enrolling);

// Get all enrolled courses for a user (protected)
router.get("/enrolled-courses", protect, enrolledCourses);

module.exports = router;
