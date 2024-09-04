// controllers/userController.js
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../Models/User");
const generateToken = require("../utils/generateToken");
const Enrollment = require("../Models/Enrollment");
const Course = require("../Models/Course");

// fetch users
exports.fetchUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// fetch instructors
exports.fetchInstructors = asyncHandler(async (req, res) => {
  const instructors = await User.find({
    role: "instructor",
  });
  res.json(instructors);
});
// fetch instructors
exports.fetchInstructors = asyncHandler(async (req, res) => {
  const instructors = await User.find({
    role: "instructor",
  });
  res.json(instructors);
});
// Register a new user
exports.registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Auth user
exports.authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// Get user profile
exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Update user profile
exports.updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
//enrolling user for a course
exports.enrolling = asyncHandler(async (req, res) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Access denied." });
  }
  const enrolled = Enrollment.find({
    userId: req.user._id,
    courseId: params.body.courseId,
  });
  if (enrolled) {
    throw new Error("User already registered for this course");
  }
  const userEnroll = Enrollment.create({
    userId: req.user._id,
    courseId: params.body.courseId,
  });
  res.json({
    message: "user Success Enrolled.",
  });
});
//getting all courses that a user enrolled
exports.enrolledCourses = asyncHandler(async (req, res) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Access denied." });
  }
  const courses = Enrollment.find({
    userId: req.user._id,
  }).populate("course", "title description");
});

// Taking a quiz
exports.takeQuiz = asyncHandler(async (req, res) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Access denied." });
  }
  const { courseId, lessonId, answers } = req.body;

  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }

  const lesson = course.lessons.id(lessonId);
  if (!lesson) {
    return res.status(404).json({ message: "Lesson not found." });
  }

  let score = 0;

  // Calculate the score
  lesson.quiz.questions.forEach((question, index) => {
    if (
      question.options.some(
        (option) => option.isCorrect && option.optionText === answers[index]
      )
    ) {
      score += 1;
    }
  });

  // Generate feedback
  const feedback =
    score === lesson.quiz.questions.length
      ? "Excellent! You got all answers correct."
      : `You scored ${score} out of ${lesson.quiz.questions.length}. Keep practicing!`;

  // Save the quiz result
  const quizResult = await QuizResult.create({
    userId: req.user._id,
    courseId: courseId,
    lessonId: lessonId,
    score: score,
    feedback: feedback,
  });

  res.json({
    message: "Quiz completed.",
    quizResult,
  });
});

// Getting quiz results for a user
exports.getQuizResults = asyncHandler(async (req, res) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Access denied." });
  }
  const quizResults = await QuizResult.find({ userId: req.user._id })
    .populate("courseId", "title")
    .populate("lessonId", "title");

  res.json(quizResults);
});

//give role
exports.giveRole = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied." });
  }
  const { role } = req.body;
  const { id } = req.params;

  // Find the user and update
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  if (role) user.role = role;
  await user.save();

  res.status(200).json({
    status: "success",
    message: "user role updated successfully",
    id: user._id,
    role: user.role,
    username: user.username,
    email: user.email,
  });
});
