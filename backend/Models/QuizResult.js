const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    feedback: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const QuizResult = mongoose.model("QuizResult", quizResultSchema);

module.exports = QuizResult;
