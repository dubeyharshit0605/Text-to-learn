import { Link } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } =
    useAuth0();

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold text-slate-900">
          Text-to-Learn
        </Link>

        <div className="flex items-center gap-4 text-sm font-medium">
          <Link to="/" className="text-slate-700 hover:text-slate-950">
            Home
          </Link>

          {!isLoading && isAuthenticated && (
            <span className="hidden text-slate-600 md:inline">
              {user?.name || user?.email}
            </span>
          )}

          {!isLoading && !isAuthenticated && (
            <button
              onClick={() => loginWithRedirect()}
              className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
            >
              Login
            </button>
          )}

          {!isLoading && isAuthenticated && (
            <button
              onClick={() =>
                logout({
                  logoutParams: {
                    returnTo: window.location.origin,
                  },
                })
              }
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;