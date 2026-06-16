const { generateCourseFromPrompt } = require("../services/aiService");
const { sendSuccess } = require("../utils/responseHandler");

const generateCourse = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    const generatedCourse = await generateCourseFromPrompt(prompt.trim());

    sendSuccess(res, 201, "Course generated successfully without database", {
      _id: "temporary-course-id",
      ...generatedCourse,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCourses = async (req, res, next) => {
  try {
    sendSuccess(res, 200, "No database connected. Returning empty course list.", []);
  } catch (error) {
    next(error);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    sendSuccess(res, 200, "No database connected. Returning temporary course.", {
      _id: req.params.id,
      title: "Temporary Course",
      description: "This response is coming without MongoDB.",
      modules: [],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateCourse,
  getAllCourses,
  getCourseById,
};