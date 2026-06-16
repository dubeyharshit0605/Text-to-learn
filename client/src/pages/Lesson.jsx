import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LessonRenderer from "../components/LessonRenderer";
import HinglishAudioExplanation from "../components/HinglishAudioExplanation";

const sampleLesson = {
  title: "Introduction to Artificial Intelligence",
  description:
    "Learn the basic idea of AI and how intelligent systems are built.",
  content: [
    {
      type: "heading",
      text: "What is Artificial Intelligence?",
    },
    {
      type: "paragraph",
      text: "Artificial Intelligence is a field of computer science focused on building systems that can perform tasks usually requiring human intelligence.",
    },
    {
      type: "paragraph",
      text: "These tasks can include learning, reasoning, problem solving, understanding language, and recognizing images.",
    },
    {
      type: "video",
      query: "Artificial Intelligence basics for beginners",
    },
  ],
};

const Lesson = () => {
  const { lessonId } = useParams();

  const [lesson, setLesson] = useState(sampleLesson);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchLesson = async () => {
      if (!lessonId) {
        setLesson(sampleLesson);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_BASE_URL}/lessons/${lessonId}`);
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to load lesson");
        }

        setLesson(result.data);
      } catch (err) {
        setError(err.message || "Could not load lesson. Showing sample lesson.");
        setLesson(sampleLesson);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId, API_BASE_URL]);

  const lessonText = useMemo(() => {
    if (!lesson?.content || !Array.isArray(lesson.content)) {
      return "";
    }

    return lesson.content
      .map((block) => {
        if (block.type === "heading") return block.text;
        if (block.type === "paragraph") return block.text;
        if (block.type === "code") return block.code;
        if (block.type === "mcq") {
          return `${block.question} ${block.options?.join(" ") || ""}`;
        }
        return "";
      })
      .filter(Boolean)
      .join("\n\n");
  }, [lesson]);

  if (loading) {
    return (
      <main className="lesson-page">
        <p>Loading lesson...</p>
      </main>
    );
  }

  return (
    <main className="lesson-page">
      <div className="lesson-header">
        <Link to="/">← Back to Home</Link>

        <h1>{lesson?.title || "Lesson"}</h1>

        {lesson?.description && <p>{lesson.description}</p>}
      </div>

      {error && <p style={{ color: "orange" }}>{error}</p>}

      <section className="lesson-content">
        <LessonRenderer content={lesson?.content || []} />
      </section>

      <section className="lesson-audio-section">
        <HinglishAudioExplanation lessonText={lessonText} />
      </section>
    </main>
  );
};

export default Lesson;
