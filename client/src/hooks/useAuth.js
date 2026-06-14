import { useAuth0 } from "@auth0/auth0-react";
import { setAuthToken } from "../utils/api";

function useAuthToken() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const attachToken = async () => {
    if (!isAuthenticated) {
      setAuthToken(null);
      return null;
    }

    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: "openid profile email",
      },
    });

    setAuthToken(token);
    return token;
  };

  return { attachToken };
}

export default useAuthToken;