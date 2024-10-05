import React, { useEffect, useState } from "react";

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
    return hour >= 6 && hour < 18;
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md text-center mt-5 dark:bg-gray-800 dark:text-white w-fit flex flex-col items-center justify-center">
      <div className="text-3xl font-bold">{formatDate()}</div>
      <div className="text-lg">{formatTime()}</div>
    </div>
  );
};

export default CurrentDateTime;
