import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import api from "../utils/api";
import {
  findStoredCourse,
  getStoredCourses,
  mergeCourses,
  saveStoredCourse,
} from "../utils/courseStorage";

function CourseList({ courses }) {
  if (!courses.length) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-slate-600">
        No saved courses yet. Generate your first course from the home page.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {courses.map((course) => {
        const moduleCount = course.modules?.length || 0;
        const lessonCount =
          course.modules?.reduce(
            (total, module) => total + (module.lessons?.length || 0),
            0
          ) || 0;

        return (
          <Link
            key={course._id}
            to={`/courses/${course._id}`}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md"
          >
            <div className="mb-4 flex flex-wrap gap-2">
              {(course.tags || []).slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="text-xl font-bold text-slate-950">{course.title}</h2>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
              {course.description}
            </p>

            <div className="mt-5 flex gap-3 text-sm font-semibold text-slate-700">
              <span>{moduleCount} modules</span>
              <span>{lessonCount} lessons</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function CourseOverview({ course }) {
  const lessonCount = useMemo(
    () =>
      course.modules?.reduce(
        (total, module) => total + (module.lessons?.length || 0),
        0
      ) || 0,
    [course]
  );

  return (
    <div>
      <Link to="/courses" className="mb-4 inline-flex text-sm font-semibold text-teal-700">
        Back to courses
      </Link>

      <div className="mb-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-wrap gap-2">
          {(course.tags || []).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl font-bold text-slate-950">{course.title}</h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">
          {course.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold text-slate-700">
          <span className="rounded-lg bg-slate-100 px-3 py-2">
            {course.modules?.length || 0} modules
          </span>
          <span className="rounded-lg bg-slate-100 px-3 py-2">
            {lessonCount} lessons
          </span>
          <span className="rounded-lg bg-slate-100 px-3 py-2">
            {course.language || "English"}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {(course.modules || []).map((module, moduleIndex) => (
          <section
            key={module._id || module.title}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
                Module {moduleIndex + 1}
              </p>
              <h2 className="mt-1 text-2xl font-bold text-slate-950">
                {module.title}
              </h2>
              <p className="mt-2 leading-6 text-slate-600">
                {module.description}
              </p>
            </div>

            <div className="divide-y divide-slate-100 overflow-hidden rounded-lg border border-slate-200">
              {(module.lessons || []).map((lesson, lessonIndex) => (
                <Link
                  key={lesson._id || lesson.title}
                  to={`/courses/${course._id}/module/${moduleIndex}/lesson/${lessonIndex}`}
                  className="flex items-center justify-between gap-4 bg-white px-4 py-3 transition hover:bg-teal-50"
                >
                  <div>
                    <p className="font-semibold text-slate-950">
                      {lessonIndex + 1}. {lesson.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {lesson.objectives?.[0] || "Structured lesson content"}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-teal-700">
                    Open
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function Course() {
  const { courseId } = useParams();
  const [courses, setCourses] = useState(getStoredCourses);
  const [selectedCourse, setSelectedCourse] = useState(() =>
    courseId ? findStoredCourse(courseId) : null
  );
  const [isLoading, setIsLoading] = useState(Boolean(courseId));
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setIsLoading(true);
        setError("");

        if (courseId) {
          const cachedCourse = findStoredCourse(courseId);

          if (cachedCourse) {
            setSelectedCourse(cachedCourse);
          }

          const response = await api.get(`/courses/${courseId}`);
          const course = response.data?.data;

          if (course) {
            saveStoredCourse(course);
            setSelectedCourse(course);
          }
        } else {
          const response = await api.get("/courses");
          setCourses(mergeCourses(response.data?.data || [], getStoredCourses()));
        }
      } catch (err) {
        const cachedCourse = courseId ? findStoredCourse(courseId) : null;

        if (cachedCourse) {
          setSelectedCourse(cachedCourse);
          setError("");
        } else {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Unable to load courses."
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, [courseId]);

  if (isLoading && !selectedCourse) {
    return <LoadingSpinner message="Loading course..." />;
  }

  if (courseId) {
    if (error) {
      return <ErrorMessage message={error} />;
    }

    if (!selectedCourse) {
      return <ErrorMessage message="Course not found." />;
    }

    return <CourseOverview course={selectedCourse} />;
  }

  return (
    <div>
      <div className="mb-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-teal-700">
          Courses
        </p>

        <h1 className="text-3xl font-bold text-slate-950">My Courses</h1>

        <p className="mt-2 text-slate-600">
          Saved generated courses from this browser and backend appear here.
        </p>
      </div>

      {error && <div className="mb-4"><ErrorMessage message={error} /></div>}

      <CourseList courses={courses} />
    </div>
  );
}

export default Course;
