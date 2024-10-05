import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const PlantSlider = () => {
  const [plantsData, setPlantsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axiosSecure.get("/Plant");
        const sortedPlants = response.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setPlantsData(sortedPlants);
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };

    fetchPlants();
  }, [axiosSecure]);

  if (plantsData.length === 0) {
    return <p className="text-center">Loading plants...</p>;
  }

  const currentPlant = plantsData[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % plantsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + plantsData.length) % plantsData.length
    );
  };

  return (
    <div className="relative w-[1000px] max-w-md px-4  h-min ">
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <img
          src={currentPlant.imageUrl}
          alt={currentPlant.name}
          className="w-full h-60 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <h2 className="text-xl font-bold">{currentPlant.name}</h2>
          <p className="text-center">{currentPlant.description}</p>
        </div>

        {/* Navigation Buttons with Icons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 text-white bg-transparent rounded-full hover:bg-secondary transition duration-300"
        >
          <HiChevronLeft className="text-3xl" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-white bg-transparent rounded-full hover:bg-secondary transition duration-300"
        >
          <HiChevronRight className="text-3xl" />
        </button>
      </div>
      <div>
        <h3 className="font-bold p-2 dark:text-white text-center">
          {currentPlant.name}
        </h3>
      </div>
    </div>
  );
};

export default PlantSlider;
