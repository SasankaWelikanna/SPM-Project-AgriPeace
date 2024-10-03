import React, { useEffect } from "react";
import { FaMoon } from "react-icons/fa"; // Moon icon for dark mode
import { LuSun } from "react-icons/lu"; // Sun icon for light mode

const ThemeToggle = ({ isDarkMode, setIsDarkMode }) => {
  // Toggle theme in the body when the mode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="flex flex-col items-center text-center ml-2">
      <div
        className="flex items-center justify-center cursor-pointer p-2 bg-black/10 dark:bg-gray-700 rounded-full duration-700"
        onClick={() => setIsDarkMode(!isDarkMode)}
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <FaMoon className="text-white h-6 w-6 transition duration-300 ease-in-out" />
        ) : (
          <LuSun className="text-orange-400 h-6 w-6 transition duration-300 ease-in-out" />
        )}
      </div>
    </div>
  );
};

export default ThemeToggle;
