const {
  translateToHinglish,
  generateHinglishExplanationWithAudio,
} = require("../services/geminiService");
const { sendSuccess } = require("../utils/responseHelper");

const getHinglishText = async (req, res, next) => {
  try {
    const { lessonText } = req.body;

    if (!lessonText || lessonText.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: "lessonText is required and must be meaningful",
      });
    }

    const hinglishText = await translateToHinglish(lessonText);

    return sendSuccess(res, {
      message: "Hinglish explanation generated successfully",
      data: {
        hinglishText,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getHinglishAudio = async (req, res, next) => {
  try {
    const { lessonText, voiceName = "Kore", tone = "friendly teacher" } = req.body;

    if (!lessonText || lessonText.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: "lessonText is required and must be meaningful",
      });
    }

    const { hinglishText, audioBuffer } =
      await generateHinglishExplanationWithAudio({
        lessonText,
        voiceName,
        tone,
      });

    res.setHeader("Content-Type", "audio/wav");
    res.setHeader("X-Hinglish-Text", encodeURIComponent(hinglishText));

    return res.send(audioBuffer);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHinglishText,
  getHinglishAudio,
};