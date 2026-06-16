const { searchYouTubeVideos } = require("../services/youtubeService");
const { sendSuccess } = require("../utils/responseHandler");

const getYouTubeVideos = async (req, res, next) => {
  try {
    const { query, maxResults } = req.query;

    if (!query || query.trim().length < 2) {
      res.status(400);
      throw new Error("Query must be at least 2 characters long");
    }

    const videos = await searchYouTubeVideos(query, maxResults);

    sendSuccess(res, 200, "YouTube videos fetched successfully", videos);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getYouTubeVideos,
};