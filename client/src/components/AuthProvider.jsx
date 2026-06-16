import { Auth0Context, Auth0Provider as Auth0ReactProvider } from "@auth0/auth0-react";

const hasAuth0Config = Boolean(
  import.meta.env.VITE_AUTH0_DOMAIN && import.meta.env.VITE_AUTH0_CLIENT_ID
);

const demoAuth0Value = {
  isAuthenticated: false,
  isLoading: false,
  user: undefined,
  error: undefined,
  loginWithRedirect: async () => {
    alert(
      "Auth0 is not configured. Add VITE_AUTH0_DOMAIN and VITE_AUTH0_CLIENT_ID to enable login."
    );
  },
  logout: async () => {},
  getAccessTokenSilently: async () => null,
  getAccessTokenWithPopup: async () => null,
  getIdTokenClaims: async () => undefined,
  loginWithPopup: async () => {},
  handleRedirectCallback: async () => ({ appState: undefined }),
};

function AuthProvider({ children }) {
  if (!hasAuth0Config) {
    return (
      <Auth0Context.Provider value={demoAuth0Value}>
        {children}
      </Auth0Context.Provider>
    );
  }

  return (
    <Auth0ReactProvider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: "openid profile email",
      }}
    >
      {children}
    </Auth0ReactProvider>
  );
}

export default AuthProvider;
