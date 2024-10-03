import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Sector,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#50C878",
  "#FF6347",
];

const FertilizerCategoryPieChart = () => {
  const [fertilizerCategoryData, setFertilizerCategoryData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1); // State to track the active (hovered) pie section
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

        // Format the data for the pie chart
        const formattedData = Object.keys(categoryMap).map((category) => ({
          name: category,
          value: categoryMap[category],
        }));

        setFertilizerCategoryData(formattedData);
      } catch (error) {
        console.error("Error fetching fertilizer data:", error);
      }
    };

    fetchFertilizerData();
  }, [axiosSecure]);

  // Handle mouse events to enlarge the active slice and display the quantity
  const onPieEnter = (_, index) => setActiveIndex(index);
  const onPieLeave = () => setActiveIndex(-1);

  return (
    <div className="flex flex-col md:flex-row ml-12 relative w-full px-4  h-min">
      <div className="w-full md:w-2/3 ">
        <h3 className="font-bold text-center text-lg md:text-xl dark:text-white mb-4">
          Fertilizers by Category
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={fertilizerCategoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={130}
              innerRadius={90} // Add inner radius for a donut effect (optional)
              fill="#8884d8"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              activeIndex={activeIndex}
              activeShape={(props) => (
                <g>
                  <text
                    x={props.cx}
                    y={props.cy}
                    dy={8}
                    textAnchor="middle"
                    fill="#1a7"
                    className="text-lg font-bold dark:text-white"
                  >
                    {props.payload.name}
                  </text>
                  <Sector
                    cx={props.cx}
                    cy={props.cy}
                    innerRadius={props.innerRadius}
                    outerRadius={props.outerRadius + 10} // Enlarge the hovered section
                    startAngle={props.startAngle}
                    endAngle={props.endAngle}
                    fill={props.fill}
                  />
                  <text
                    x={props.cx}
                    y={props.cy}
                    dy={25}
                    textAnchor="middle"
                    fill="#999"
                    className="text-sm font-semibold dark:text-white"
                  >
                    {props.payload.value} products
                  </text>
                </g>
              )}
            >
              {fertilizerCategoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#333",
                borderColor: "#333",
              }}
              labelStyle={{ color: "#fff" }} // Tooltip label in white for dark mode
              itemStyle={{ color: "#fff" }} // Tooltip content in white for dark mode
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Add category list on the side */}
      <div className="w-full md:w-1/3 flex flex-col justify-center items-start px-4 mt-4 md:mt-0 dark:text-white">
        <h4 className="font-bold mb-2 dark:text-white">Categories:</h4>
        <ul className="list-none dark:text-white">
          {fertilizerCategoryData.map((entry, index) => (
            <li key={`category-${index}`} className="flex items-center mb-1">
              <span
                className="inline-block w-4 h-4 mr-2"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>
              <span>{entry.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FertilizerCategoryPieChart;
