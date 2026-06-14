const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    objectives: [
      {
        type: String,
      },
    ],
    keyTopics: [
      {
        type: String,
      },
    ],
    content: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      default: "",
    },
    pdfUrl: {
      type: String,
      default: "",
    },
    hinglishExplanation: {
      type: String,
      default: "",
    },
    quiz: [
      {
        question: String,
        options: [String],
        answer: String,
      },
    ],
  },
  { timestamps: true }
);

const moduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    lessons: [lessonSchema],
  },
  { timestamps: true }
);

const courseSchema = new mongoose.Schema(
  {
    prompt: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    modules: [moduleSchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;