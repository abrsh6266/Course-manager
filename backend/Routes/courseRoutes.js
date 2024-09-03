// routes/courseRoutes.js
const express = require("express");
const {
  getCourses,
  createCourse,
  updateCourseDetails,
  addLesson,
  updateLesson,
  deleteLesson,
  deleteCourse,
} = require("../Controllers/courseController");
const isLoggedIn = require("../middlewares/isLogged");

const router = express.Router();

// Get all courses
router.get("/", getCourses);

// Create a new course
router.post("/", isLoggedIn, createCourse);

// Update course details
router.put("/:id", isLoggedIn, updateCourseDetails);

// Add a lesson to a course
router.put("/:id/lessons", isLoggedIn, addLesson);

// Update a lesson in a course
router.put("/:courseId/lessons/:lessonId", isLoggedIn, updateLesson);

// Delete a lesson from a course
router.delete("/:courseId/lessons/:lessonId", isLoggedIn, deleteLesson);

// Delete a course
router.delete("/:id", isLoggedIn, deleteCourse);

module.exports = router;
