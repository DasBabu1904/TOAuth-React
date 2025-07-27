import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  googleOAuthRequest,
  facebookOAuthRequest,
  githubOAuthRequest,
} from "../services/api";

const SocialCallback = ({ provider }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useAuth();
  const [processing, setProcessing] = useState(false);
  const processedRef = useRef(false);

  useEffect(() => {
    // Prevent multiple executions
    if (processedRef.current || processing) return;

    const handleCallback = async () => {
      processedRef.current = true;
      setProcessing(true);

      const code = searchParams.get("code");
      const error = searchParams.get("error");
      console.log("github=", code);
      if (error) {
        alert("Authentication failed");
        navigate("/login");
        return;
      }

      if (code) {
        try {
          console.log("Processing OAuth code:", code.substring(0, 10) + "...");

          let response;
          if (provider === "google") {
            response = await googleOAuthRequest(code);
          } else if (provider === "facebook") {
            response = await facebookOAuthRequest(code);
          } else if (provider === "github") {
            response = await githubOAuthRequest(code);
          } else {
            response = await apiRequest(`/auth/${provider}/callback`, {
              method: "POST",
              body: JSON.stringify({ code }),
            });
          }

          console.log("OAuth response received");
          const token = response.access_token || response.token;
          const userData = response.user || { email: response.email };

          localStorage.setItem("authToken", token);
          localStorage.setItem("user", JSON.stringify(userData));

          setUser(userData);
          setIsAuthenticated(true);

          navigate("/dashboard");
        } catch (error) {
          console.error("OAuth error:", error);
          alert("Authentication failed: " + error.message);
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    handleCallback();
  }, []); // Empty dependency array to run only once

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <div>Processing authentication...</div>
      {processing && (
        <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
          Please wait, do not refresh the page
        </div>
      )}
    </div>
  );
};

export default SocialCallback;
