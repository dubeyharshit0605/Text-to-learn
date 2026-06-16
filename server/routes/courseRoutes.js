const express = require("express");

const {
  generateCourse,
  getAllCourses,
  getCourseById,
} = require("../controllers/courseController");

const { protect } = require("../middlewares/authMiddleware");
const { validateCoursePrompt } = require("../middlewares/validateMiddleware");

const router = express.Router();

router.post("/generate", protect, validateCoursePrompt, generateCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);

module.exports = router;