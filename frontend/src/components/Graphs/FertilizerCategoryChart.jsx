import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // Import your Axios hook
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"; // Import recharts components

const FertilizerCategoryChart = () => {
  const [fertilizerCategoryData, setFertilizerCategoryData] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchFertilizerData = async () => {
      try {
        const response = await axiosSecure.get("/Fertilizer"); // Adjust the endpoint if necessary
        const fertilizers = response.data;

        // Group fertilizers by category and count the quantity in each category
        const categoryMap = fertilizers.reduce((acc, fertilizer) => {
          const category = fertilizer.category; // Assuming the category is stored in `fertilizer.category`
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

        setFertilizerCategoryData(formattedData);
      } catch (error) {
        console.error("Error fetching fertilizer data:", error);
      }
    };

    fetchFertilizerData();
  }, [axiosSecure]);

  return (
    <div className="relative w-full px-4 mt-8 shadow-md h-min">
      <h3 className="font-bold text-center dark:text-white">
        Fertilizers by Category
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={fertilizerCategoryData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="category"
            tick={{ fontSize: 10 }} // Reducing font size of category labels
          />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="quantity" fill="#50C878" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FertilizerCategoryChart;
