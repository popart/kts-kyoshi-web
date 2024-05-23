import React from "react";
import { useNavigate } from "react-router-dom";

import { OAUTH_CLIENT_ID } from "../../config";
import { AuthContext } from "../../providers/AuthProvider";
import { login } from "../../services/loginService";

export default function LoginWithGoogle() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = React.useContext(AuthContext);

  React.useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initGoogleSignIn; // Initialize only after it is loaded
      document.body.appendChild(script);
    };

    const initGoogleSignIn = () => {
      if (window.google) {
        google.accounts.id.initialize({
          client_id: OAUTH_CLIENT_ID,
          callback: handleCredentialResponse,
        });

        google.accounts.id.renderButton(document.getElementById("signInDiv"), {
          theme: "outline",
          size: "large",
        });
      } else {
        console.error("Google library was not initialized.");
      }
    };

    if (!window.google) {
      loadGoogleScript();
    } else {
      initGoogleSignIn();
    }

    async function handleCredentialResponse(response) {
      const token = response.credential;
      const loginSuccess = await login(token);

      if (loginSuccess) {
        setIsAuthenticated(true);
        navigate("/", { replace: true });
      }
    }
  }, []);

  return <div id="signInDiv"></div>;
}
