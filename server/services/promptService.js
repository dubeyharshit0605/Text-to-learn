const generateCoursePrompt = (topic) => {
  return `
You are an expert curriculum designer.

Your task is to generate a complete online course outline for the topic:
"${topic}"

Return raw JSON only.
Do not include markdown.
Do not include explanations outside JSON.
Do not wrap response in triple backticks.

The course must move from beginner-friendly foundations to practical and slightly advanced concepts.

Return JSON in this exact structure:

{
  "title": "string",
  "description": "string",
  "tags": ["string", "string", "string"],
  "modules": [
    {
      "title": "string",
      "description": "string",
      "lessons": [
        "string",
        "string",
        "string"
      ]
    }
  ]
}

Rules:
- Create 3 to 6 modules.
- Each module must contain 3 to 5 lesson titles.
- Keep lesson titles clear and practical.
- Tags should be lowercase.
- Do not include lesson content here.
- Do not include MongoDB IDs.
- Return valid JSON only.
`;
};

const generateLessonPrompt = ({ courseTitle, moduleTitle, lessonTitle }) => {
  return `
You are an expert teacher and instructional content designer.

Create a detailed lesson for this course:

Course Title: "${courseTitle}"
Module Title: "${moduleTitle}"
Lesson Title: "${lessonTitle}"

Return raw JSON only.
Do not include markdown.
Do not include explanations outside JSON.
Do not wrap response in triple backticks.

Return JSON in this exact structure:

{
  "title": "string",
  "objectives": [
    "string",
    "string",
    "string"
  ],
  "content": [
    {
      "type": "heading",
      "text": "string"
    },
    {
      "type": "paragraph",
      "text": "string"
    },
    {
      "type": "code",
      "language": "string",
      "text": "string"
    },
    {
      "type": "video",
      "query": "string"
    },
    {
      "type": "mcq",
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "answer": 0,
      "explanation": "string"
    }
  ]
}

Content rules:
- Include 3 to 5 learning objectives.
- Use simple and beginner-friendly language.
- Use multiple heading and paragraph blocks.
- Include a code block only if it is relevant to the lesson.
- If code is not relevant, do not include a code block.
- For video block, do not give direct YouTube links.
- For video block, provide a useful video search query in the "url" field.
- Add 4 to 5 MCQ blocks at the end.
- Each MCQ must have exactly 4 options.
- The answer must be the index number of the correct option.
- Each MCQ must include a short explanation for the correct answer.
- Keep content structured for a web lesson renderer.
- Return valid JSON only.
`;
};

module.exports = {
  generateCoursePrompt,
  generateLessonPrompt,
};