import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App.jsx";
import "./index.css";
console.log("AUTH0 CLIENT ID:", import.meta.env.VITE_AUTH0_CLIENT_ID);
console.log("AUTH0 DOMAIN:", import.meta.env.VITE_AUTH0_DOMAIN);
console.log("AUTH0 AUDIENCE:", import.meta.env.VITE_AUTH0_AUDIENCE);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
        
          scope: "openid profile email",
        }}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);