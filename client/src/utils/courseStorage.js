const STORAGE_KEY = "text-to-learn:courses";

export const getStoredCourses = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveStoredCourse = (course) => {
  if (!course?._id) return [];

  const courses = getStoredCourses();
  const nextCourses = [
    course,
    ...courses.filter((storedCourse) => storedCourse._id !== course._id),
  ].slice(0, 20);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCourses));
  return nextCourses;
};

export const findStoredCourse = (courseId) =>
  getStoredCourses().find((course) => String(course._id) === String(courseId)) ||
  null;

export const mergeCourses = (primary = [], fallback = []) => {
  const byId = new Map();

  [...primary, ...fallback].forEach((course) => {
    if (course?._id && !byId.has(course._id)) {
      byId.set(course._id, course);
    }
  });

  return Array.from(byId.values());
};
