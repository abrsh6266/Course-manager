const Course = require("../Models/Course");
const asyncHandler = require("express-async-handler");
const User = require("../Models/User");
const Enrollment = require("../Models/Enrollment");

//get all courses
exports.getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({});
  res.status(200).json(courses);
});
// Create a new course
exports.createCourse = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied." });
  }

  const { title, description, instructor } = req.body;

  const course = new Course({
    title,
    description,
    instructor,
  });

  await course.save();
  res.status(201).json(course);
});

// Update course title and description
exports.updateCourseDetails = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied." });
  }

  const { title, description } = req.body;

  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }

  course.title = title || course.title;
  course.description = description || course.description;

  await course.save();
  res.status(200).json(course);
});

// Add a lesson to a course
exports.addLesson = asyncHandler(async (req, res) => {
  if (req.user.role !== "instructor") {
    return res.status(403).json({ message: "Access denied." });
  }

  const { title, content } = req.body;

  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }

  if (course.instructor.toString() !== req.user.id) {
    return res
      .status(403)
      .json({ message: "You can only add lessons to your own courses." });
  }

  course.lessons.push({ title, content });
  await course.save();
  const lesson = course.lessons.find((lessons) => lessons.title === title);
  console.log(lesson);
  res.status(200).json(lesson);
});

// Update a lesson in a course
exports.updateLesson = asyncHandler(async (req, res) => {
  if (req.user.role !== "instructor") {
    return res.status(403).json({ message: "Access denied." });
  }

  const { courseId, lessonId } = req.params;
  const { title, content } = req.body;

  const course = await Course.findById(courseId);

  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }

  // Check if the instructor is the assigned instructor for the course
  if (course.instructor.toString() !== req.user.id) {
    return res
      .status(403)
      .json({ message: "You can only update lessons in your own courses." });
  }

  const lesson = course.lessons.id(lessonId);

  if (!lesson) {
    return res.status(404).json({ message: "Lesson not found." });
  }

  lesson.title = title || lesson.title;
  lesson.content = content || lesson.content;

  await course.save();
  res.status(200).json(course);
});

// Delete a lesson from a course
exports.deleteLesson = asyncHandler(async (req, res) => {
  const { courseId, lessonId } = req.params;

  const course = await Course.findById(courseId);

  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }

  // Check if the user is an instructor and the assigned instructor for the course
  if (
    req.user.role === "instructor" &&
    course.instructor.toString() !== req.user.id
  ) {
    return res
      .status(403)
      .json({ message: "You can only delete lessons in your own courses." });
  }

  const lesson = course.lessons.id(lessonId);

  if (!lesson) {
    return res.status(404).json({ message: "Lesson not found." });
  }

  lesson.remove();

  await course.save();
  res.status(200).json({ message: "Lesson deleted successfully." });
});

// Delete a course
exports.deleteCourse = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied." });
  }

  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }

  await course.remove();
  res.status(200).json({ message: "Course deleted successfully." });
});

// Create a quiz for a specific lesson
exports.createQuiz = asyncHandler(async (req, res) => {
  if (req.user.role !== "instructor") {
    return res.status(403).json({ message: "Access denied." });
  }
  const { courseId, lessonId } = req.params;
  const { questions } = req.body;

  const course = await Course.findById(courseId);

  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }

  if (course.instructor.toString() !== req.user.id) {
    return res
      .status(403)
      .json({ message: "You can only create quizzes in your own courses." });
  }

  const lesson = course.lessons.id(lessonId);

  if (!lesson) {
    return res.status(404).json({ message: "Lesson not found." });
  }

  lesson.quiz = { questions };

  await course.save();
  res.status(200).json(lesson);
});

// Update a quiz for a specific lesson
exports.updateQuiz = asyncHandler(async (req, res) => {
  if (req.user.role !== "instructor") {
    return res.status(403).json({ message: "Access denied." });
  }
  const { courseId, lessonId } = req.params;
  const { questions } = req.body;

  const course = await Course.findById(courseId);

  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }

  if (course.instructor.toString() !== req.user.id) {
    return res
      .status(403)
      .json({ message: "You can only update quizzes in your own courses." });
  }

  const lesson = course.lessons.id(lessonId);

  if (!lesson) {
    return res.status(404).json({ message: "Lesson not found." });
  }

  lesson.quiz.questions = questions;

  await course.save();
  res.status(200).json(lesson);
});

// Delete a quiz for a specific lesson
exports.deleteQuiz = asyncHandler(async (req, res) => {
  if (req.user.role !== "instructor") {
    return res.status(403).json({ message: "Access denied." });
  }
  const { courseId, lessonId } = req.params;

  const course = await Course.findById(courseId);

  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }

  if (course.instructor.toString() !== req.user.id) {
    return res
      .status(403)
      .json({ message: "You can only delete quizzes in your own courses." });
  }

  const lesson = course.lessons.id(lessonId);

  if (!lesson) {
    return res.status(404).json({ message: "Lesson not found." });
  }

  lesson.quiz = undefined;

  await course.save();
  res.status(200).json(lesson);
});

// Get courses by instructor ID
exports.getCoursesByInstructor = asyncHandler(async (req, res) => {
  if (req.user.role !== "instructor") {
    return res.status(403).json({ message: "Access denied." });
  }
  const courses = await Course.find({ instructor: req.user._id });
  res.status(200).json(courses);
});

// Get statistics for the admin dashboard
exports.getStatistics = asyncHandler(async (req, res) => {
  // Count total users
  const totalUsers = await User.countDocuments();

  // Count total courses
  const totalCourses = await Course.countDocuments();

  // Count total enrollments
  const totalEnrollments = await Enrollment.countDocuments();

  // Fetch recent activities (e.g., recent enrollments)
  const recentActivity = await Enrollment.find()
    .sort({ enrolledAt: -1 })
    .limit(10)
    .populate("userId", "username")
    .populate("courseId", "title")
    .exec();

  const formattedActivity = recentActivity.map((activity) => ({
    description: `${activity.userId.username} enrolled in ${activity.courseId.title}`,
    timestamp: activity.enrolledAt,
  }));

  res.status(200).json({
    totalUsers,
    totalCourses,
    totalEnrollments,
    recentActivity: formattedActivity,
  });
});
