const express = require("express");

const {
  generateCourse,
  getAllCourses,
  getCourseById,
} = require("../controllers/courseController");

const { validateCoursePrompt } = require("../middlewares/validateMiddleware");

const router = express.Router();

router.post("/generate", validateCoursePrompt, generateCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);

module.exports = router;
