import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./components/globalContext";
import { ThemeProvider } from "./components/ThemeContext";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <GlobalProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </GlobalProvider>
  </ThemeProvider>
);
