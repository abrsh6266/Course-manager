const express = require("express");
const {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  enrolling,
  enrolledCourses,
  takeQuiz,
  getQuizResults,
  fetchInstructors,
} = require("../Controllers/userController");
const isLoggedIn = require("../middlewares/isLogged");

const router = express.Router();

// User registration route
router.post("/register", registerUser);

// User login route
router.post("/login", authUser);

//fetch instructors
router.get("/instructors", fetchInstructors);

// Get user profile
router.get("/profile", isLoggedIn, getUserProfile);


// Update user profile
router.put("/profile", isLoggedIn, updateUserProfile);

// Enroll user in a course
router.post("/enroll", isLoggedIn, enrolling);

// Get all enrolled courses for a user
router.get("/enrolled-courses", isLoggedIn, enrolledCourses);

// Take a quiz
router.post("/quiz", isLoggedIn, takeQuiz);

// Get all quiz results for a user
router.get("/quiz-results", isLoggedIn, getQuizResults);
module.exports = router;
