const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  lessons: [
    {
      title: String,
      content: String,
    },
  ],
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
