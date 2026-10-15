import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import FormularioProvider from "./context/FormularioContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FormularioProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FormularioProvider>
  </React.StrictMode>
);
