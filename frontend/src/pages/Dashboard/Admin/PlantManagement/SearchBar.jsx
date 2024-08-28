import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <div className="flex">
      <form className="flex items-center p-2" onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          value={query}
          onChange={handleChange}
          placeholder="Search"
          title="Enter search keyword"
          className="flex-1 p-2 border-2 border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <button
          type="submit"
          title="Search"
          className="p-3 bg-secondary border-2 border-secondary text-white rounded-r-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-secondary"
        >
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
