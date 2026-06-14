import { NavLink } from "react-router-dom";

function Sidebar() {
  const navLinkClass = ({ isActive }) =>
    `block rounded-xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-slate-900 text-white"
        : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
    }`;

  return (
    <aside className="hidden min-h-screen w-64 border-r border-slate-200 bg-white p-4 md:block">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-slate-950">Text-to-Learn</h1>
        <p className="mt-1 text-sm text-slate-500">AI Course Generator</p>
      </div>

      <nav className="space-y-2">
        <NavLink to="/" end className={navLinkClass}>
          Home
        </NavLink>

        <NavLink to="/courses" className={navLinkClass}>
          My Courses
        </NavLink>

        <NavLink
          to="/courses/demo-course/module/0/lesson/0"
          className={navLinkClass}
        >
          Sample Lesson
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;