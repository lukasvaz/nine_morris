import React,{ createContext } from "react";
import useTheme from "../hooks/useTheme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext({ theme: "", toggleTheme: () => {} });

const ThemeProvider:React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
