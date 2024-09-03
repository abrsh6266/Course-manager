const Course = require('../Models/Course');
const asyncHandler = require('express-async-handler');

// Create a new course
exports.createCourse = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const courseExists = await Course.findOne({ title });

  if (courseExists) {
    res.status(400);
    throw new Error('Course already exists');
  }

  const course = await Course.create({
    title,
    description,
    instructor: req.user._id,
  });

  res.status(201).json(course);
});

// Get all courses
exports.getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find().populate('instructor', 'username email');

  res.json(courses);
});

// Get single course
exports.getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id).populate('instructor', 'username email');

  if (course) {
    res.json(course);
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

// Update course
exports.updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    course.title = req.body.title || course.title;
    course.description = req.body.description || course.description;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

// Delete course
exports.deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    await course.remove();
    res.json({ message: 'Course removed' });
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});
