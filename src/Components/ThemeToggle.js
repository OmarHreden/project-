// src/components/ThemeToggle.js
import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? "تفعيل الوضع الداكن 🌙" : "تفعيل الوضع الفاتح ☀️"}
    </button>
  );
};

export default ThemeToggle;
