// controllers/userController.js
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../Models/User");
const generateToken = require("../utils/generateToken");
const Enrollment = require("../Models/Enrollment");
const Course = require("../Models/Course");

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
      _id: user._id,
      username: user.username,
      email: user.email,
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
      _id: user._id,
      username: user.username,
      email: user.email,
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

