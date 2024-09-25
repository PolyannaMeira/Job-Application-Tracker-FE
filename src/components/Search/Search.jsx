// src/components/Search/Search.jsx
import { useState } from "react";
import Api from "../../Api";
import "./Search.css";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  let debounceTimer;

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(async () => {
      if (query) {
        const results = await Api.searchJobs(query);
        setFilteredData(results);
      } else {
        setFilteredData([]); // Reset if the query is empty
      }
    }, 300); // Adjust the debounce time as needed
  };

  const handleResultClick = (item) => {
    console.log("Clicked on job with id:", item.id);
    navigate(`/myjob/${item.id}`);
  };

  return (
    <div className="search-container">
      <input
        className="search-bar"
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <div className="search-results">
        {filteredData.map((item, index) => (
          <div
            key={index}
            className="search-item"
            onClick={() => handleResultClick(item)}
          >
            {item.companyName} - {item.jobRole}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
