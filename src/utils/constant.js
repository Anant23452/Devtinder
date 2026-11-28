// Dynamically choose backend URL based on where the frontend is running:
// - Locally (localhost or 127.0.0.1) -> connect directly to local Express server on port 7777
// - In production (AWS / custom domain) -> use "/api" so Nginx forwards requests to the backend
const isLocalhost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

export const BASE_URL = isLocalhost
  ? `http://${window.location.hostname}:7777`
  : "/api";

