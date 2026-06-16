import { useAuth0 } from "@auth0/auth0-react";

function Topbar() {
  const { loginWithRedirect, logout, isAuthenticated, isLoading, user } =
    useAuth0();

  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-teal-700">Dashboard</p>
          <h2 className="text-lg font-bold text-slate-950">
            Build structured courses from prompts
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {!isLoading && isAuthenticated && (
            <div className="hidden text-right md:block">
              <p className="text-sm font-semibold text-slate-900">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
          )}

          {!isLoading && !isAuthenticated && (
            <button
              onClick={() => loginWithRedirect()}
              className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
            >
              Login
            </button>
          )}

          {!isLoading && isAuthenticated && (
            <button
              onClick={() => logout()}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
