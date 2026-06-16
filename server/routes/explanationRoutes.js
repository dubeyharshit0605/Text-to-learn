const express = require("express");

const {
  getHinglishText,
  getHinglishAudio,
} = require("../controllers/explanationController");

const router = express.Router();

router.post("/hinglish-text", getHinglishText);
router.post("/hinglish-audio", getHinglishAudio);

module.exports = router;
