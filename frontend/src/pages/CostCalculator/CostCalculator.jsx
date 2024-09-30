import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Scroll from "../../hooks/useScroll";
import useUser from "../../hooks/useUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import { Link } from "react-router-dom";

const CostCalculator = () => {
  const [crop, setCrop] = useState("");
  const [area, setArea] = useState(0);
  const [waterResources, setWaterResources] = useState("");
  const [soilType, setSoilType] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previousCalculations, setPreviousCalculations] = useState([]);
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term
  const [selectedCategory, setSelectedCategory] = useState(""); // New state for selected category
  const [categories, setCategories] = useState([]); // New state for categories
  const { currentUser } = useUser();
  const axiosSecure = useAxiosSecure();
  const axiosFetch = useAxiosFetch();

  useEffect(() => {
    const fetchPreviousCalculations = async () => {
      try {
        const response = await axiosSecure.get(
          "/api/costCalculator/userCalculations",
          {
            params: { userId: currentUser._id },
          }
        );
        const sortedCalculations = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPreviousCalculations(sortedCalculations);
      } catch (error) {
        console.error("Error fetching previous calculations:", error);
      }
    };

    const fetchPlants = async () => {
      try {
        const response = await axiosFetch.get("/Plant/");
        if (Array.isArray(response.data)) {
          const sortedPlants = response.data.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          setPlants(sortedPlants);

          // Extract unique categories
          const uniqueCategories = [
            ...new Set(sortedPlants.map((plant) => plant.category))
          ];
          setCategories(uniqueCategories);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } catch (err) {
        console.error("Error fetching plants:", err);
      }
    };

    if (currentUser) {
      fetchPreviousCalculations();
    }

    fetchPlants();
  }, [currentUser, axiosSecure, axiosFetch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axiosSecure.post("/api/costCalculator/calculate", {
        crop,
        area,
        waterResources,
        soilType,
        userId: currentUser._id,
      });
      const newResult = response.data;
      setResult(newResult);
      setPreviousCalculations((prevCalculations) => [
        newResult,
        ...prevCalculations,
      ]);
    } catch (error) {
      setError("Error calculating cost. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter plants based on the search term and selected category
  const filteredPlants = plants.filter((plant) => {
    const matchesSearchTerm = plant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? plant.category === selectedCategory : true;
    return matchesSearchTerm && matchesCategory;
  });

  return (
    <>
      <div className="mt-20 mx-auto max-w-4xl p-6 bg-white dark:bg-slate-900 dark:border-2 dark:mt-25 shadow-lg rounded-lg">
        <Scroll />
        <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
          Cost Calculator
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="flex items-center space-x-4">
              <label className="text-lg font-semibold text-gray-700 flex-shrink-0">
                Crop:
              </label>
              <input
                type="text"
                placeholder="Search crop"
                className="p-2 bg-gray-100 border border-gray-300 rounded-md flex-grow"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <label className="text-sm text-gray-700">
                Sort by Category:
              </label>
              <select
                className="p-2 bg-gray-100 border border-gray-300 rounded-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <Swiper
              slidesPerView={4}
              spaceBetween={30}
              centeredSlides={false}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper mt-4"
              style={{
                "--swiper-navigation-size": "50px",
                "--swiper-navigation-color": "#333",
                "--swiper-navigation-sides-offset": "0px",
                "--swiper-pagination-bottom": "-5px",
              }}
            >
              {filteredPlants.map((plant) => (
                <SwiperSlide key={plant._id}>
                  <label
                    className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer hover:scale-105 transform transition-all duration-200 ${
                      crop === plant.name ? "bg-secondary" : "border-gray-300"
                    }`}
                    style={{ zIndex: crop === plant.name ? 10 : "auto" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.zIndex = 10)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.zIndex = "auto")
                    }
                  >
                    <img
                      src={plant.imageUrl}
                      alt={plant.name}
                      className="w-full h-36 rounded-md mb-2"
                      style={{ objectFit: "cover" }}
                    />
                    <input
                      type="radio"
                      value={plant.name}
                      checked={crop === plant.name}
                      onChange={(e) => setCrop(e.target.value)}
                      className="hidden"
                    />
                    <span className="text-center font-semibold text-gray-700">
                      {plant.name}
                    </span>
                  </label>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Area (in acres):
            </label>
            <input
              type="number"
              className="mt-2 p-2 bg-gray-100 border border-gray-300 rounded-md w-full"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Water Resources:
            </label>
            <div className="flex flex-wrap gap-4 mt-2">
              {["Abundant", "Moderate", "Scarce", "Limited"].map(
                (waterOption) => (
                  <label key={waterOption} className="flex items-center">
                    <input
                      type="radio"
                      value={waterOption}
                      checked={waterResources === waterOption}
                      onChange={(e) => setWaterResources(e.target.value)}
                      className="mr-2"
                    />
                    {waterOption}
                  </label>
                )
              )}
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Soil Type:
            </label>
            <div className="flex flex-wrap gap-4 mt-2">
              {["Fertile", "Moderately Fertile", "Poor", "Sandy", "Rich"].map(
                (soilOption) => (
                  <label key={soilOption} className="flex items-center">
                    <input
                      type="radio"
                      value={soilOption}
                      checked={soilType === soilOption}
                      onChange={(e) => setSoilType(e.target.value)}
                      className="mr-2"
                    />
                    {soilOption}
                  </label>
                )
              )}
            </div>
          </div>

          <button
            className="bg-secondary text-white py-2 px-4 rounded-md shadow-md hover:scale-125 transition"
            type="submit"
            disabled={loading}
          >
            {loading ? "Calculating..." : "Calculate"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {result && (
          <div className="mt-8 p-4 border border-gray-300 rounded-md">
            <h2 className="text-2xl font-semibold text-gray-800">
              Estimated Cost
            </h2>
            <p className="mt-2">
              Crop: <span className="font-medium">{result.crop}</span>
            </p>
            <p>
              Area: <span className="font-medium">{result.area} acres</span>
            </p>
            <p className="font-bold text-lg mt-2">
              Estimated Cost:{" "}
              <span className="text-secondary text-3xl">
                Rs. {result.estimatedCost.toFixed(2)}
              </span>
            </p>
            <p>
              Fertilizer Needs:{" "}
              <span className="font-medium">{result.fertilizerNeeds}</span>
            </p>
            <p>
              Water Needs:{" "}
              <span className="font-medium">{result.waterNeeds}</span>
            </p>
          </div>
        )}
      </div>

      {currentUser ? (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-800">
            Your Previous Calculations
          </h2>
          {previousCalculations.length === 0 ? (
            <p className="mt-4 text-gray-600">No previous calculations found.</p>
          ) : (
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200 font-bold text-center">
                  <tr>
                    {[
                      "Crop",
                      "Area (acres)",
                      "Estimated Cost (Rs.)",
                      "Fertilizer Needs",
                      "Water Needs",
                      "Date",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-4 py-2 text-gray-700 font-semibold"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {previousCalculations.map((calculation, index) => (
                    <tr key={index} className="text-center">
                      <td className="px-4 py-2">{calculation.crop}</td>
                      <td className="px-4 py-2">{calculation.area}</td>
                      <td className="px-4 py-2 text-secondary text-xl">
                        Rs. {calculation.estimatedCost.toFixed(2)}
                      </td>
                      <td className="px-4 py-2">
                        {calculation.fertilizerNeeds}
                      </td>
                      <td className="px-4 py-2">{calculation.waterNeeds}</td>
                      <td className="px-4 py-2">
                        {new Date(calculation.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <p className="text-xl text-gray-700 font-bold mb-3">
            To save your calculations, please log in.
          </p>
          <Link to="/login">
            <button className="bg-secondary rounded-md text-white p-3 hover:scale-110 duration-300">Login</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default CostCalculator;
