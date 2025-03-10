import { useEffect, useState } from "react";

export const Theme = {
  LIGHT: "light",
  DARK: "dark",
};

const useTheme = () => {
  const getTheme = () => {
    const savedTheme = localStorage.getItem("data-theme");
    return savedTheme ? savedTheme : Theme.DARK;
  };
  const handleThemeChange = (theme) => {
    localStorage.setItem("data-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  const [theme, setTheme] = useState(getTheme());
  useEffect(() => {
    handleThemeChange(theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    setTheme(newTheme);
  };

  return { theme, toggleTheme };
};

export default useTheme;
