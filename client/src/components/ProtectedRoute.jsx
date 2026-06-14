import { useAuth0 } from "@auth0/auth0-react";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
        Checking authentication...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
        <h1 className="text-2xl font-bold text-slate-950">Login Required</h1>

        <p className="mt-2 text-slate-600">
          Please login to access this page.
        </p>

        <button
          onClick={() => loginWithRedirect()}
          className="mt-4 rounded-lg bg-slate-900 px-5 py-2 font-semibold text-white hover:bg-slate-800"
        >
          Login
        </button>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;