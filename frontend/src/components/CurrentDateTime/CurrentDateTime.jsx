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

  const formatDate = () => {
    return dateTime.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = () => {
    return dateTime.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const isDayTime = () => {
    const hour = dateTime.getHours();
    return hour >= 6 && hour < 18; // Consider daytime from 6 AM to 6 PM
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-center mt-5 dark:bg-gray-800 dark:text-white">
      <h2 className="text-xl font-bold">{getGreeting()}</h2>
      <div className="flex justify-center items-center my-2">
        {isDayTime() ? (
          <FaSun className="text-yellow-500 text-4xl" />
        ) : (
          <FaMoon className="text-blue-500 text-4xl" />
        )}
      </div>
      <div className="text-lg">{formatDate()}</div>
      <div className="text-lg">{formatTime()}</div>
    </div>
  );
};

export default CurrentDateTime;
