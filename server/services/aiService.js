const normalizeTopic = (prompt = "") => {
  const topic = prompt.trim().replace(/\s+/g, " ");

  if (!topic) {
    return "Selected Topic";
  }

  return topic
    .split(" ")
    .map((word) =>
      word.length > 2
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word.toLowerCase()
    )
    .join(" ");
};

const isTechnicalTopic = (topic) => {
  const technicalKeywords = [
    "api",
    "algorithm",
    "ai",
    "css",
    "coding",
    "data",
    "database",
    "express",
    "html",
    "javascript",
    "machine learning",
    "mongodb",
    "node",
    "programming",
    "python",
    "react",
    "software",
    "web",
  ];

  const lowerTopic = topic.toLowerCase();

  return technicalKeywords.some((keyword) => lowerTopic.includes(keyword));
};

const createTags = (topic) => {
  const topicTags = topic
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 2)
    .slice(0, 3);

  return Array.from(new Set([...topicTags, "beginner", "self-learning"]));
};

const createResources = (topic, lessonTitle) => {
  const searchQuery = encodeURIComponent(`${topic} ${lessonTitle}`);

  return [
    {
      title: `${lessonTitle} overview`,
      type: "article",
      url: `https://www.google.com/search?q=${searchQuery}+guide`,
    },
    {
      title: `${topic} video lesson`,
      type: "video",
      url: `https://www.youtube.com/results?search_query=${searchQuery}+tutorial`,
    },
    {
      title: `${topic} practice material`,
      type: "practice",
      url: `https://www.google.com/search?q=${searchQuery}+practice+exercises`,
    },
  ];
};

const createCodeBlock = (topic, lessonTitle) => ({
  type: "code",
  language: topic.toLowerCase().includes("python") ? "python" : "javascript",
  text: topic.toLowerCase().includes("python")
    ? `# Mini practice: ${lessonTitle}\ntopic = ${JSON.stringify(topic)}\nsteps = [\n    "define the core idea",\n    "study one example",\n    "try one small exercise",\n]\nfor step in steps:\n    print(f"{topic}: {step}")`
    : `// Mini practice: ${lessonTitle}\nconst topic = ${JSON.stringify(topic)};\nconst learningSteps = [\n  "define the core idea",\n  "study one example",\n  "try one small exercise",\n];\n\nlearningSteps.forEach((step) => {\n  console.log(\`\${topic}: \${step}\`);\n});`,
});

const createMcqs = (topic, lessonTitle, focus) => [
  {
    type: "mcq",
    question: `What should you understand first in "${lessonTitle}"?`,
    options: [
      `The core idea of ${topic}`,
      "Only advanced terminology",
      "Only memorized definitions",
      "Unrelated examples",
    ],
    answer: 0,
    explanation: `Start with the core idea before moving into examples and applications of ${topic}.`,
  },
  {
    type: "mcq",
    question: `Which activity best supports learning this lesson?`,
    options: [
      `Connect ${focus} to a real situation`,
      "Skip examples and move on",
      "Avoid taking notes",
      "Memorize without checking meaning",
    ],
    answer: 0,
    explanation:
      "A real situation turns abstract content into something you can remember and apply.",
  },
  {
    type: "mcq",
    question: `Why are key terms important while studying ${topic}?`,
    options: [
      "They help you understand later lessons",
      "They replace practice",
      "They are only useful for tests",
      "They make examples unnecessary",
    ],
    answer: 0,
    explanation:
      "Shared vocabulary makes each later module easier to follow and discuss.",
  },
  {
    type: "mcq",
    question: "What is the best next step after reading the explanation?",
    options: [
      "Try a small example or reflection task",
      "Close the lesson immediately",
      "Ignore confusing parts",
      "Jump to unrelated material",
    ],
    answer: 0,
    explanation:
      "Practice or reflection checks whether the concept is usable, not just familiar.",
  },
];

const createLessonContent = ({
  topic,
  moduleTitle,
  lessonTitle,
  focus,
  includeCode,
}) => {
  const content = [
    {
      type: "heading",
      text: lessonTitle,
    },
    {
      type: "paragraph",
      text: `This lesson explores ${focus} in the context of ${topic}. You will move from a simple explanation to practical examples so the concept feels usable.`,
    },
    {
      type: "paragraph",
      text: `As you study, connect this lesson back to ${moduleTitle}. Write down one definition, one example, and one question you still have.`,
    },
  ];

  if (includeCode) {
    content.push(createCodeBlock(topic, lessonTitle));
  }

  content.push({
    type: "video",
    query: `${topic} ${lessonTitle} beginner tutorial`,
  });

  return [...content, ...createMcqs(topic, lessonTitle, focus)];
};

const createLesson = ({
  topic,
  moduleTitle,
  lessonTitle,
  focus,
  keyTopics,
  moduleIndex,
  lessonIndex,
  includeCode,
}) => ({
  _id: `lesson-${moduleIndex + 1}-${lessonIndex + 1}`,
  title: lessonTitle,
  description: `A guided lesson on ${focus} for learners studying ${topic}.`,
  objectives: [
    `Explain ${lessonTitle.toLowerCase()} in your own words`,
    `Identify how this concept supports learning ${topic}`,
    "Apply the idea through a small example or reflection task",
  ],
  keyTopics,
  content: createLessonContent({
    topic,
    moduleTitle,
    lessonTitle,
    focus,
    includeCode,
  }),
  resources: createResources(topic, lessonTitle),
  hinglishExplanation: `${lessonTitle} ko simple Hinglish mein samjho: pehle basic meaning pakdo, phir example dekho, aur end mein ek chhota practice task try karo.`,
});

const createModuleBlueprints = (topic) => [
  {
    title: `Module 1: Foundations of ${topic}`,
    description: `Build the vocabulary, purpose, and mental model needed to start learning ${topic}.`,
    lessons: [
      {
        title: `What is ${topic}?`,
        focus: "meaning, purpose, and everyday examples",
        keyTopics: ["definition", "purpose", "examples"],
      },
      {
        title: `Core Ideas in ${topic}`,
        focus: "the most important concepts and how they connect",
        keyTopics: ["core concepts", "relationships", "mental model"],
      },
      {
        title: `Common Terms Used in ${topic}`,
        focus: "essential vocabulary and beginner-friendly explanations",
        keyTopics: ["vocabulary", "terminology", "quick review"],
      },
    ],
  },
  {
    title: `Module 2: Applying ${topic}`,
    description: `Turn the fundamentals into useful examples, workflows, and decision-making skills.`,
    lessons: [
      {
        title: `How ${topic} Works in Practice`,
        focus: "real-world workflow and step-by-step usage",
        keyTopics: ["workflow", "examples", "practice"],
      },
      {
        title: `Examples and Use Cases for ${topic}`,
        focus: "where the topic appears and why people use it",
        keyTopics: ["use cases", "benefits", "constraints"],
      },
      {
        title: `Mistakes to Avoid in ${topic}`,
        focus: "common beginner errors and how to correct them",
        keyTopics: ["pitfalls", "debugging", "improvement"],
      },
    ],
  },
  {
    title: `Module 3: Practice and Next Steps`,
    description: `Review, practice, and plan a path for deeper learning after the course.`,
    lessons: [
      {
        title: `${topic} Practice Plan`,
        focus: "a repeatable plan for building confidence",
        keyTopics: ["practice", "routine", "feedback"],
      },
      {
        title: `Mini Project for ${topic}`,
        focus: "a small project or applied task that combines prior lessons",
        keyTopics: ["project", "application", "portfolio"],
      },
      {
        title: `Where to Go Next with ${topic}`,
        focus: "advanced topics, resources, and continued learning",
        keyTopics: ["next steps", "resources", "roadmap"],
      },
    ],
  },
];

const generateCourseFromPrompt = async (prompt) => {
  const topic = normalizeTopic(prompt);
  const includeCode = isTechnicalTopic(topic);

  const modules = createModuleBlueprints(topic).map((module, moduleIndex) => ({
    _id: `module-${moduleIndex + 1}`,
    title: module.title,
    description: module.description,
    lessons: module.lessons.map((lesson, lessonIndex) =>
      createLesson({
        topic,
        moduleTitle: module.title,
        lessonTitle: lesson.title,
        focus: lesson.focus,
        keyTopics: lesson.keyTopics,
        moduleIndex,
        lessonIndex,
        includeCode,
      })
    ),
  }));

  return {
    prompt,
    title: `${topic}: Complete Learning Path`,
    description: `A structured beginner-friendly course that turns ${topic} into modules, lessons, quizzes, video searches, and practical next steps.`,
    language: "English",
    tags: createTags(topic),
    resources: createResources(topic, `${topic} complete course`),
    modules,
  };
};

module.exports = {
  generateCourseFromPrompt,
};
