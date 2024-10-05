import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PlantCategoryChart = () => {
  const [plantCategoryData, setPlantCategoryData] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchPlantData = async () => {
      try {
        const response = await axiosSecure.get("/Plant");
        const plants = response.data;

        // Group plants by category and count the quantity in each category
        const categoryMap = plants.reduce((acc, plant) => {
          const category = plant.category;
          if (!acc[category]) {
            acc[category] = 1;
          } else {
            acc[category]++;
          }
          return acc;
        }, {});

        // Format the data for the chart
        const formattedData = Object.keys(categoryMap).map((category) => ({
          category,
          quantity: categoryMap[category],
        }));

        setPlantCategoryData(formattedData);
      } catch (error) {
        console.error("Error fetching plant data:", error);
      }
    };

    fetchPlantData();
  }, [axiosSecure]);

  return (
    <div className="relative w-full p-4 mt-8 shadow-md h-min md:p-0">
      <h3 className="font-bold text-center dark:text-white text-lg md:text-xl">
        Plants by Category
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={plantCategoryData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" tick={{ fontSize: 10 }} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="quantity" fill="#50C878" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlantCategoryChart;
