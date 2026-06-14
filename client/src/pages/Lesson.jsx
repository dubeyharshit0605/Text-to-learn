import LessonRenderer from "../components/LessonRenderer";

const sampleLessonContent = [
  {
    type: "heading",
    text: "Introduction to AI",
  },
  {
    type: "paragraph",
    text: "Artificial intelligence is a field of computer science focused on building systems that can perform tasks usually requiring human intelligence.",
  },
  {
    type: "code",
    language: "python",
    text: "print('Hello, AI!')",
  },
  {
    type: "video",
    url: "AI Explained",
  },
  {
    type: "mcq",
    question: "What is AI?",
    options: [
      "A type of robot",
      "A field of computer science",
      "A programming language",
    ],
    answer: 1,
  },
];

function Lesson() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Lesson Viewer
        </p>

        <h1 className="text-3xl font-bold text-slate-950">
          Structured Lesson Rendering
        </h1>

        <p className="mt-2 text-slate-600">
          This page renders lesson content dynamically from JSON blocks.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <LessonRenderer content={sampleLessonContent} />
      </div>
    </div>
  );
}

export default Lesson;