import React from "react";

const Card = ({ plant, handleViewDetails }) => (
  <div
    className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:scale-105 hover:shadow-md dark:bg-gray-900"
    data-aos="flip-up"
    data-aos-duration="1000"
    onClick={() => handleViewDetails(plant)}
  >
    <img
      src={plant.imageUrl}
      alt="Plant"
      className="w-full h-40 object-cover"
      loading="lazy"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
        {plant.name}
        {plant.productName}
      </h3>
    </div>
  </div>
);

export default React.memo(Card);
