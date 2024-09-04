const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
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
      ref: "User",
      required: true,
    },
    lessons: [
      {
        title: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        quiz: {
          questions: [
            {
              questionText: {
                type: String,
                required: true,
              },
              options: [
                {
                  optionText: {
                    type: String,
                    required: true,
                  },
                  isCorrect: {
                    type: Boolean,
                    default: false,
                  },
                },
              ],
            },
          ],
        },
      },
    ],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
