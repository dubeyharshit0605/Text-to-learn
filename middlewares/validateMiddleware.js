const validateCoursePrompt = (req, res, next) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    res.status(400);
    throw new Error("Prompt is required and must be a string");
  }

  if (prompt.trim().length < 3) {
    res.status(400);
    throw new Error("Prompt must be at least 3 characters long");
  }

  next();
};

module.exports = {
  validateCoursePrompt,
};