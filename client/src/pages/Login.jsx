import { useAuth0 } from "@auth0/auth0-react";

function Login() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
      <h1 className="text-3xl font-bold text-slate-950">Login</h1>

      <p className="mt-2 text-slate-600">
        Login securely using Auth0 Universal Login.
      </p>

      {isAuthenticated ? (
        <p className="mt-4 font-medium text-green-700">
          You are already logged in.
        </p>
      ) : (
        <button
          onClick={() => loginWithRedirect()}
          className="mt-6 rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800"
        >
          Continue with Auth0
        </button>
      )}
    </div>
  );
}

export default Login;