import React,{ createContext } from "react";
import useTheme from "../hooks/useTheme";

const ThemeContext = createContext({ theme: "", toggleTheme: () => {} });

const ThemeProvider = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
