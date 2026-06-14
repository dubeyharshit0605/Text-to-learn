const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    order: {
      type: Number,
      default: 0,
    },

    content: {
      type: [mongoose.Schema.Types.Mixed],
      required: true,
      default: [],
    },

    objectives: [
      {
        type: String,
        trim: true,
      },
    ],

    keyTopics: [
      {
        type: String,
        trim: true,
      },
    ],

    resources: [
      {
        title: {
          type: String,
          trim: true,
        },
        url: {
          type: String,
          trim: true,
        },
        type: {
          type: String,
          enum: ["article", "video", "documentation", "book", "other"],
          default: "other",
        },
      },
    ],

    quiz: [
      {
        question: {
          type: String,
          trim: true,
        },
        options: [
          {
            type: String,
            trim: true,
          },
        ],
        answer: {
          type: String,
          trim: true,
        },
      },
    ],

    hinglishExplanation: {
      type: String,
      default: "",
    },

    isEnriched: {
      type: Boolean,
      default: false,
    },

    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },
  },
  { timestamps: true }
);

lessonSchema.index({ module: 1 });
lessonSchema.index({ module: 1, order: 1 });

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;