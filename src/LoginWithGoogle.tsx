import React from "react";
import { useNavigate } from 'react-router-dom';

import { API_BASE_URL, OAUTH_CLIENT_ID, OAUTH_REDIRECT_URI } from "./config";
import { useAuth } from './AuthProvider';

export default function LoginWithGoogle() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

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
      try {
        const res = await fetch(`${API_BASE_URL}/verify-token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: response.credential }),
          credentials: 'include',
        })

        const data = res.json()
        if (res.ok) {
          console.log('Login Success:', data);
          setIsAuthenticated(true);
          navigate('/', { replace: true });
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        // TODO: Handle error - show message to user or retry
      }
    }
  }, []);

  return <div id="signInDiv"></div>;
}
