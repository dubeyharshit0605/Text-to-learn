import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ErrorMessage from "../components/ErrorMessage";
import HinglishAudioExplanation from "../components/HinglishAudioExplanation";
import LessonPDFExporter from "../components/LessonPDFExporter";
import LessonRenderer from "../components/LessonRenderer";
import LoadingSpinner from "../components/LoadingSpinner";
import api from "../utils/api";
import { findStoredCourse, saveStoredCourse } from "../utils/courseStorage";

const getLessonFromCourse = (course, moduleIndex, lessonIndex) => {
  const module = course?.modules?.[Number(moduleIndex)];
  const lesson = module?.lessons?.[Number(lessonIndex)];

  if (!module || !lesson) {
    return { module: null, lesson: null };
  }

  return { module, lesson };
};

const getLessonText = (lesson) => {
  if (!lesson?.content || !Array.isArray(lesson.content)) {
    return "";
  }

  return [
    lesson.title,
    ...(lesson.objectives || []),
    ...lesson.content.map((block) => {
      if (block.type === "heading" || block.type === "paragraph") {
        return block.text;
      }

      if (block.type === "code") {
        return block.text || block.code;
      }

      if (block.type === "mcq") {
        return `${block.question} ${(block.options || []).join(" ")}`;
      }

      return "";
    }),
  ]
    .filter(Boolean)
    .join("\n\n");
};

function Lesson() {
  const { courseId, moduleIndex, lessonIndex } = useParams();
  const [course, setCourse] = useState(() => findStoredCourse(courseId));
  const [isLoading, setIsLoading] = useState(!course);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setIsLoading(true);
        setError("");

        const cachedCourse = findStoredCourse(courseId);

        if (cachedCourse) {
          setCourse(cachedCourse);
        }

        const response = await api.get(`/courses/${courseId}`);
        const fetchedCourse = response.data?.data;

        if (fetchedCourse) {
          saveStoredCourse(fetchedCourse);
          setCourse(fetchedCourse);
        }
      } catch (err) {
        if (!findStoredCourse(courseId)) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Unable to load this lesson."
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadCourse();
  }, [courseId]);

  const { module, lesson } = useMemo(
    () => getLessonFromCourse(course, moduleIndex, lessonIndex),
    [course, moduleIndex, lessonIndex]
  );

  const lessonText = useMemo(() => getLessonText(lesson), [lesson]);

  if (isLoading && !lesson) {
    return <LoadingSpinner message="Loading lesson..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!course || !module || !lesson) {
    return <ErrorMessage message="Lesson not found in this course." />;
  }

  const lessonForExport = {
    ...lesson,
    description: lesson.description || module.description,
  };

  return (
    <main className="mx-auto max-w-4xl">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Link
          to={`/courses/${course._id}`}
          className="text-sm font-semibold text-teal-700 hover:text-teal-900"
        >
          Back to syllabus
        </Link>

        <LessonPDFExporter lesson={lessonForExport} />
      </div>

      <section className="mb-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-teal-700">
          {module.title}
        </p>

        <h1 className="text-3xl font-bold text-slate-950">{lesson.title}</h1>

        {lesson.description && (
          <p className="mt-3 leading-7 text-slate-600">{lesson.description}</p>
        )}

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-teal-50 p-4">
            <h2 className="font-bold text-slate-950">Objectives</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
              {(lesson.objectives || []).map((objective) => (
                <li key={objective}>- {objective}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-amber-50 p-4">
            <h2 className="font-bold text-slate-950">Key Topics</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {(lesson.keyTopics || []).map((topic) => (
                <span
                  key={topic}
                  className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-amber-800"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <LessonRenderer content={lesson.content || []} />
      </section>

      {!!lesson.resources?.length && (
        <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">Suggested Resources</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {lesson.resources.map((resource) => (
              <a
                key={`${resource.title}-${resource.url}`}
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-slate-200 p-4 transition hover:border-teal-200 hover:bg-teal-50"
              >
                <p className="font-semibold text-slate-950">{resource.title}</p>
                <p className="mt-1 text-sm capitalize text-slate-500">
                  {resource.type || "resource"}
                </p>
              </a>
            ))}
          </div>
        </section>
      )}

      <HinglishAudioExplanation
        key={lesson._id || lesson.title}
        lessonText={lessonText}
        initialText={lesson.hinglishExplanation}
      />
    </main>
  );
}

export default Lesson;
