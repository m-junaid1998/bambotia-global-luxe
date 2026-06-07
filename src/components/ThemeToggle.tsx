import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isLight ? "dark" : "light"} theme`}
      title={`Switch to ${isLight ? "dark" : "light"} theme`}
      className="relative inline-flex h-7 w-14 items-center rounded-full border border-border bg-muted/60 backdrop-blur-sm transition-colors hover:border-accent"
    >
      <span
        className="absolute top-0.5 left-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-background shadow-md transition-transform duration-300 ease-out"
        style={{ transform: isLight ? "translateX(28px)" : "translateX(0)" }}
      >
        {isLight ? (
          <Sun className="h-3.5 w-3.5 text-accent" />
        ) : (
          <Moon className="h-3.5 w-3.5 text-accent" />
        )}
      </span>
      <Sun className={`absolute left-1.5 h-3 w-3 transition-opacity ${isLight ? "opacity-0" : "opacity-40 text-foreground"}`} />
      <Moon className={`absolute right-1.5 h-3 w-3 transition-opacity ${isLight ? "opacity-40 text-foreground" : "opacity-0"}`} />
    </button>
  );
};

export default ThemeToggle;