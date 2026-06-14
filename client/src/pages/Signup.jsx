import { useAuth0 } from "@auth0/auth0-react";

function Signup() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
      <h1 className="text-3xl font-bold text-slate-950">Sign Up</h1>

      <p className="mt-2 text-slate-600">
        Create an account using Auth0 Universal Login.
      </p>

      <button
        onClick={() =>
          loginWithRedirect({
            authorizationParams: {
              screen_hint: "signup",
            },
          })
        }
        className="mt-6 rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800"
      >
        Create Account
      </button>
    </div>
  );
}

export default Signup;