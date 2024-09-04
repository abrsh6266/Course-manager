const express = require("express");
const {
  getCourses,
  createCourse,
  updateCourseDetails,
  addLesson,
  updateLesson,
  deleteLesson,
  deleteCourse,
  deleteQuiz,
  updateQuiz,
  createQuiz,
  getCoursesByInstructor,
  getStatistics,
} = require("../Controllers/courseController");
const isLoggedIn = require("../middlewares/isLogged");

const router = express.Router();

// Get all courses
router.get("/", getCourses);

// Get courses by instructor ID
router.get("/instructor", isLoggedIn, getCoursesByInstructor);

//statistics
router.get("/statistics", getStatistics);

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

// Create a quiz for a specific lesson
router.post("/:courseId/lessons/:lessonId/quiz", isLoggedIn, createQuiz);

// Update a quiz for a specific lesson
router.put("/:courseId/lessons/:lessonId/quiz", isLoggedIn, updateQuiz);

// Delete a quiz for a specific lesson
router.delete("/:courseId/lessons/:lessonId/quiz", isLoggedIn, deleteQuiz);

module.exports = router;
