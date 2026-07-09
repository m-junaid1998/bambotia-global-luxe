import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import heroModel from "@/assets/hero-model.webp";

// Preload the LCP hero image as early as possible
const heroPreload = document.createElement("link");
heroPreload.rel = "preload";
heroPreload.as = "image";
heroPreload.href = heroModel;
heroPreload.fetchPriority = "high";
document.head.appendChild(heroPreload);

createRoot(document.getElementById("root")!).render(<App />);
