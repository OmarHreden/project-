// src/ThemeContext.js
import React, { createContext, useState, useEffect } from "react";

// ننشئ الـ Context
export const ThemeContext = createContext();

// Provider يحيط بالتطبيق ويمنح باقي الصفحات إمكانية الوصول للثيم
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // عند تحميل الصفحة: نحاول قراءة الثيم المحفوظ
  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  // تغيير الثيم
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("app-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
