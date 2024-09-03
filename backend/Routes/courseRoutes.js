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
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all courses
router.get("/", getCourses);

// Create a new course
router.post("/", protect, createCourse);

// Update course details
router.put("/:id", protect, updateCourseDetails);

// Add a lesson to a course
router.put("/:id/lessons", protect, addLesson);

// Update a lesson in a course
router.put("/:courseId/lessons/:lessonId", protect, updateLesson);

// Delete a lesson from a course
router.delete("/:courseId/lessons/:lessonId", protect, deleteLesson);

// Delete a course
router.delete("/:id", protect, deleteCourse);

module.exports = router;
