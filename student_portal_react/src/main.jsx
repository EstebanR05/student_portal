import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import PortalProvider from "./context/PortalContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <PortalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PortalProvider>
    </AuthProvider>
  </React.StrictMode>
);
