import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FaMoon } from "react-icons/fa"; // Moon icon
import { LuSun } from "react-icons/lu"; // Sun icon

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff0000",
    },
    secondary: {
      main: "#00ff00",
    },
  },
});

const ThemeToggle = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col items-center text-center">
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? (
            <FaMoon className="text-white h-5 w-5" />
          ) : (
            <LuSun className="h-7 w-7" />
          )}
        </div>
        <div className="text-center">
          <p className="text-xs">Theme</p>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ThemeToggle;
