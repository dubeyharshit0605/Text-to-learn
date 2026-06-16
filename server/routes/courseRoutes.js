const express = require("express");
const courseController = require("../controllers/courseController");

const router = express.Router();

const pickHandler = (...names) => {
  for (const name of names) {
    if (typeof courseController[name] === "function") {
      return courseController[name];
    }
  }

  return null;
};

const missingHandler = (name) => {
  return (req, res) => {
    res.status(500).json({
      success: false,
      message: `Missing controller handler: ${name}`,
      availableHandlers: Object.keys(courseController),
    });
  };
};

const generateCourse =
  pickHandler("generateCourse", "createGeneratedCourse", "generateCourseController") ||
  missingHandler("generateCourse");

const getCourses =
  pickHandler("getCourses", "getAllCourses", "listCourses", "getSavedCourses") ||
  missingHandler("getCourses");

const getCourseById =
  pickHandler("getCourseById", "getCourse", "getCourseDetail", "getCourseDetails") ||
  missingHandler("getCourseById");

const saveCourse =
  pickHandler("saveCourse", "createCourse", "addCourse");

// Public demo routes
router.post("/generate", generateCourse);
router.get("/", getCourses);
router.get("/:id", getCourseById);

if (saveCourse) {
  router.post("/", saveCourse);
}

module.exports = router;
