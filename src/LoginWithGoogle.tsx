import React from "react";

import { API_BASE_URL, OAUTH_CLIENT_ID, OAUTH_REDIRECT_URI } from "./config";

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

    async function handleCredentialResponse(response) {
      console.log("Encoded JWT ID token: " + response.credential);
      // You can send this response.credential (JWT ID token) to your backend for verification and further processing
      try {
        const res = await fetch(`${API_BASE_URL}/verify-token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: response.credential }),
        })
        console.log(res)
        const data = res.json()
        if (res.ok) {
          console.log('Login Success:', data);
          // shouldn't need to store anything if using cookies

          // Handle success - maybe update state or redirect user
          /*
          localStorage.setItem('accessToken', data.access_token);
          const token = localStorage.getItem('accessToken');
          console.log(token);
          */

        } else {
          throw new Error(data.message);
        }
        console.log('Success:', data);
      } catch (error) {
        console.error('Error:', error);
        // Handle error - show message to user or retry
      }
    }
  }, []);

  return <div id="signInDiv"></div>;
}
