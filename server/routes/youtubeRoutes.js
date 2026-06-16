const express = require("express");

const { getYouTubeVideos } = require("../controllers/youtubeController");

const router = express.Router();

router.get("/", getYouTubeVideos);

module.exports = router;