import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
    <ThemeProvider>
        <BrowserRouter>
            <div className="bg-[#f6f5f3]">
                <App />
            </div>
        </BrowserRouter>
    </ThemeProvider>
);
