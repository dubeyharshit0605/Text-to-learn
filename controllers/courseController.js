const { generateCourseFromPrompt } = require("../services/aiService");
const { sendSuccess } = require("../utils/responseHandler");

const demoCourses = new Map();

const createCourseId = () =>
  `course-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const generateCourse = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required to generate a course.",
      });
    }

    const generatedCourseData = await generateCourseFromPrompt(prompt.trim());
    const courseId = createCourseId();

    const generatedCourse = {
      _id: courseId,
      id: courseId,
      prompt: prompt.trim(),
      ...generatedCourseData,
    };

    demoCourses.set(courseId, generatedCourse);

    sendSuccess(
      res,
      201,
      "Course generated successfully without database",
      generatedCourse
    );
  } catch (error) {
    next(error);
  }
};

const getAllCourses = async (req, res, next) => {
  try {
    sendSuccess(
      res,
      200,
      "Demo courses fetched successfully without database",
      Array.from(demoCourses.values())
    );
  } catch (error) {
    next(error);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const course = demoCourses.get(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message:
          "Course not found in demo memory. Please generate the course again.",
      });
    }

    sendSuccess(res, 200, "Demo course fetched successfully", course);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateCourse,
  getAllCourses,
  getCourses: getAllCourses,
  getCourseById,
};
