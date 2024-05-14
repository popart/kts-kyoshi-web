import React from "react";

import { OAUTH_CLIENT_ID, OAUTH_REDIRECT_URI } from "./config";

export default function LoginWithGoogle() {
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

    function handleCredentialResponse(response) {
      console.log("Encoded JWT ID token: " + response.credential);
      // You can send this response.credential (JWT ID token) to your backend for verification and further processing
    }
  }, []);

  return <div id="signInDiv"></div>;
}
