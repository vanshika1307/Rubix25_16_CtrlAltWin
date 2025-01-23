import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./contexts/authContext.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <ToastContainer position="bottom-right" />
      <App />
    </AuthContextProvider>
  </StrictMode>
);
