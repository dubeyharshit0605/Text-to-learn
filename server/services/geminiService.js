const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const DEFAULT_TEXT_MODEL = process.env.GEMINI_TEXT_MODEL || "gemini-2.5-flash";
const DEFAULT_TTS_MODEL =
  process.env.GEMINI_TTS_MODEL || "gemini-2.5-flash-preview-tts";

const TEXT_MODEL_FALLBACKS = [
  DEFAULT_TEXT_MODEL,
  "gemini-2.0-flash",
];

const TTS_MODEL_FALLBACKS = [
  DEFAULT_TTS_MODEL,
];

const SUPPORTED_VOICES = [
  "Kore",
  "Puck",
  "Charon",
  "Fenrir",
  "Aoede",
  "Leda",
  "Orus",
  "Zephyr",
];

const sanitizeText = (text = "") => {
  return String(text).replace(/\s+/g, " ").trim();
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isRetryableGeminiError = (error) => {
  const message = error?.message || "";
  const status = error?.status || error?.code;

  return (
    status === 503 ||
    status === "UNAVAILABLE" ||
    message.includes("503") ||
    message.includes("UNAVAILABLE") ||
    message.includes("high demand")
  );
};

const generateContentWithRetry = async ({
  models,
  contents,
  config,
  maxRetries = 2,
}) => {
  let lastError;

  for (const model of models) {
    for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
      try {
        return await ai.models.generateContent({
          model,
          contents,
          ...(config ? { config } : {}),
        });
      } catch (error) {
        lastError = error;

        if (!isRetryableGeminiError(error)) {
          throw error;
        }

        const delay = 1000 * (attempt + 1);

        console.warn(
          `Gemini model ${model} busy. Retry ${attempt + 1}/${
            maxRetries + 1
          } after ${delay}ms`
        );

        await sleep(delay);
      }
    }
  }

  throw lastError;
};

const createWavBuffer = (
  pcmBuffer,
  sampleRate = 24000,
  channels = 1,
  bitDepth = 16
) => {
  const byteRate = (sampleRate * channels * bitDepth) / 8;
  const blockAlign = (channels * bitDepth) / 8;
  const dataSize = pcmBuffer.length;

  const header = Buffer.alloc(44);

  header.write("RIFF", 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write("WAVE", 8);

  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitDepth, 34);

  header.write("data", 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmBuffer]);
};

const translateToHinglish = async (lessonText) => {
  const cleanText = sanitizeText(lessonText);

  if (!cleanText) {
    throw new Error("Lesson text is required for Hinglish translation");
  }

  const prompt = `
Convert the following English lesson content into student-friendly Hinglish.

Rules:
- Use simple Hinglish: Hindi words written in English script.
- Keep technical terms in English.
- Explain like a friendly teacher.
- Do not add unrelated content.
- Keep it concise but clear.
- Return only the Hinglish explanation text.

Lesson text:
${cleanText}
`;

  const response = await generateContentWithRetry({
    models: TEXT_MODEL_FALLBACKS,
    contents: prompt,
  });

  const translatedText = response.text?.trim();

  if (!translatedText) {
    throw new Error("Gemini did not return Hinglish text");
  }

  return translatedText;
};

const generateHinglishAudio = async ({
  text,
  voiceName = "Kore",
  tone = "friendly teacher",
}) => {
  const cleanText = sanitizeText(text);

  if (!cleanText) {
    throw new Error("Text is required for audio generation");
  }

  const safeVoiceName = SUPPORTED_VOICES.includes(voiceName)
    ? voiceName
    : "Kore";

  const ttsPrompt = `Speak in a ${tone} tone, clear and beginner-friendly. Read this Hinglish lesson explanation:\n\n${cleanText}`;

  const response = await generateContentWithRetry({
    models: TTS_MODEL_FALLBACKS,
    contents: ttsPrompt,
    config: {
      responseModalities: ["AUDIO"],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName: safeVoiceName,
          },
        },
      },
    },
  });

  const base64Audio =
    response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

  if (!base64Audio) {
    throw new Error("Gemini did not return audio data");
  }

  const pcmBuffer = Buffer.from(base64Audio, "base64");
  return createWavBuffer(pcmBuffer);
};

const generateHinglishExplanationWithAudio = async ({
  lessonText,
  voiceName,
  tone,
}) => {
  const hinglishText = await translateToHinglish(lessonText);

  const audioBuffer = await generateHinglishAudio({
    text: hinglishText,
    voiceName,
    tone,
  });

  return {
    hinglishText,
    audioBuffer,
  };
};

module.exports = {
  translateToHinglish,
  generateHinglishAudio,
  generateHinglishExplanationWithAudio,
};
