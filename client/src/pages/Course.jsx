function Course() {
  return (
    <div>
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Courses
        </p>

        <h1 className="text-3xl font-bold text-slate-950">My Courses</h1>

        <p className="mt-2 text-slate-600">
          Saved and generated courses will appear here after database
          integration.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600">
        No saved courses yet.
      </div>
    </div>
  );
}

export default Course;