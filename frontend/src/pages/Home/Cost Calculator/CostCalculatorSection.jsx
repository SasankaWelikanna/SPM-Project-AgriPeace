import React from "react";
import { Link } from "react-router-dom";

const CostCalculatorSection = () => {
  return (
    <div className="md:w-[80%] mx-auto my-28">
      <div className="mb-16">
        <h1 className="text-5xl font-bold text-center dark:text-white">
          Start Your Farming Journey
        </h1>
        <div className="flex mt-4">
          <p className="font-medium px-5">
            Estimate costs and plan resources for your plantation. Get
            personalized advice on water and fertilizer management based on your
            location’s unique conditions.
          </p>

          <Link to="/costCalculator">
            <div className="bg-secondary rounded-md text-white font-bold hover:scale-125 duration-300 hover:shadow-md p-3 text-center">
              Calculate Now
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CostCalculatorSection;
