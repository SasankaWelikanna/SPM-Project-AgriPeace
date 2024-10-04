import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const CurrentDateTime = () => {
  const [dateTime, setDateTime] = useState(new Date());

  const updateDateTime = () => {
    setDateTime(new Date());
  };

  useEffect(() => {
    const interval = setInterval(updateDateTime, 1000); // Update every second
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const getGreeting = () => {
    const hour = dateTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const isDayTime = () => {
    const hour = dateTime.getHours();
    return hour >= 0 && hour < 18; // Consider daytime from 6 AM to 6 PM
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-center mt-5 dark:bg-gray-800 dark:text-white flex flex-col justify-center items-center">
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold mt-2">
        {getGreeting()}
      </h2>
      <div className="flex justify-center items-center mt-4">
        {isDayTime() ? (
          <FaSun className="text-yellow-500  sm:text-7xl md:text-7xl" />
        ) : (
          <FaMoon className="text-[#F6F1D5]  sm:text-7xl md:text-7xl" />
        )}
      </div>
    </div>
  );
};

export default CurrentDateTime;
