const buildLessonContent = (prompt) => {
  return [
    {
      type: "heading",
      text: `What is ${prompt}?`,
    },
    {
      type: "paragraph",
      text: `${prompt} is a topic that helps learners understand important concepts step by step. In this lesson, we will start from the basics and build a strong foundation.`,
    },
    {
      type: "paragraph",
      text: `You should focus on three things: what ${prompt} means, why it is useful, and how it is applied in real-world situations.`,
    },
    {
      type: "code",
      language: "text",
      code: `Learning flow:
1. Understand the basic idea
2. Study real examples
3. Practice small problems
4. Build a mini project`,
    },
    {
      type: "mcq",
      question: `What is the main goal of learning ${prompt}?`,
      options: [
        "To understand the topic clearly",
        "To skip the basics",
        "To avoid practice",
        "None of the above",
      ],
      answer: "To understand the topic clearly",
    },
  ];
};

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
            content: buildLessonContent(prompt),
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
