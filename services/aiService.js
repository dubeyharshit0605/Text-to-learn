const generateCourseFromPrompt = async (prompt) => {
  return {
    prompt,
    title: `${prompt} - Complete Course`,
    description: `A beginner-friendly structured course on ${prompt}.`,
    modules: [
      {
        title: `Module 1: Introduction to ${prompt}`,
        description: `Learn the basics of ${prompt}.`,
        lessons: [
          {
            title: `What is ${prompt}?`,
            objectives: [
              `Understand the meaning of ${prompt}`,
              `Know why ${prompt} is important`,
            ],
            keyTopics: ["Introduction", "Use cases", "Basic concepts"],
            content: `This lesson introduces ${prompt} in a simple and structured way.`,
            videoUrl: "",
            pdfUrl: "",
            hinglishExplanation: `${prompt} ko simple Hinglish mein samjhaya gaya hai.`,
            quiz: [
              {
                question: `What is the purpose of learning ${prompt}?`,
                options: [
                  "To understand the topic",
                  "To skip basics",
                  "To avoid practice",
                  "None of the above",
                ],
                answer: "To understand the topic",
              },
            ],
          },
        ],
      },
    ],
  };
};

module.exports = {
  generateCourseFromPrompt,
};