import React from "react";
import { Link } from "react-router-dom";

const PreviousCalculations = ({ previousCalculations, currentUser }) => {
  return (
    <div className="mt-16">
      {!currentUser ? (
        <div className="text-center">
          <p className="text-xl text-gray-700 font-bold mb-3">
            To save your calculations, please log in.
          </p>
          <Link to="/login">
            <button className="bg-secondary rounded-md text-white p-3 hover:scale-110 duration-300">
              Login
            </button>
          </Link>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center">
            Your Previous Calculations
          </h2>
          {previousCalculations.length === 0 ? (
            <p className="mt-4 text-gray-600 dark:text-white text-center">
              No previous calculations found.
            </p>
          ) : (
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200 dark:bg-slate-500 font-bold text-center">
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
                        className="px-4 py-2 text-gray-700 font-semibold dark:text-white"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-600 dark:text-white divide-y divide-gray-200">
                  {previousCalculations.map((calculation, index) => (
                    <tr key={index} className="text-center">
                      <td className="px-4 py-2">{calculation.crop}</td>
                      <td className="px-4 py-2">{calculation.area}</td>
                      <td className="px-4 py-2 text-secondary text-xl">
                        Rs. {calculation.estimatedCost.toFixed(2)}
                      </td>
                      <td className="px-4 py-2">{calculation.fertilizerNeeds}</td>
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
        </>
      )}
    </div>
  );
};

export default PreviousCalculations;
