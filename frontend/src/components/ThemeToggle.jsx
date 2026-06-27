import { useTheme } from "./ThemeContext";

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={`theme-toggle cursor-pointer ${className}`}
    >
      <span className={`theme-toggle-icon ${theme === "dark" ? "show-sun" : "show-moon"}`}>
        <i className="fa-solid fa-sun sun-icon" />
        <i className="fa-solid fa-moon moon-icon" />
      </span>
    </button>
  );
};

export default ThemeToggle;
