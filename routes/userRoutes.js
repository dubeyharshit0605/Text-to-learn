const express = require("express");

const { getCurrentUser } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/me", protect, getCurrentUser);

module.exports = router;