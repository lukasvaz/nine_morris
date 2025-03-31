import { useEffect, useState } from "react";
import { ThemeType } from "../types/types";


const Theme: { LIGHT: ThemeType; DARK: ThemeType } = {
  LIGHT: "light",
  DARK: "dark",
};

const useTheme = ()  => {
  const getTheme:()=> ThemeType= () => {
    const savedTheme = localStorage.getItem("data-theme");
    return savedTheme ? savedTheme as ThemeType : Theme.DARK;
  };
  
  
  const handleThemeChange = (theme:ThemeType) => {
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
