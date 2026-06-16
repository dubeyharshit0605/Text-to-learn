import { NavLink } from "react-router-dom";

function Sidebar() {
  const navLinkClass = ({ isActive }) =>
    `block rounded-lg px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-teal-700 text-white"
        : "text-slate-700 hover:bg-teal-50 hover:text-teal-900"
    }`;

  return (
    <aside className="hidden min-h-screen w-64 border-r border-slate-200 bg-white p-4 md:block">
      <div className="mb-8 rounded-lg bg-slate-950 p-4">
        <h1 className="text-xl font-bold text-white">Text-to-Learn</h1>
        <p className="mt-1 text-sm text-teal-100">AI Course Generator</p>
      </div>

      <nav className="space-y-2">
        <NavLink to="/" end className={navLinkClass}>
          Home
        </NavLink>

        <NavLink to="/courses" className={navLinkClass}>
          My Courses
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
