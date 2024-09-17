import  { useState } from "react";

import './Filter.css'

const Filter= () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState("Filter"); // Valor padrão do botão

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleFilterClick = (criteria) => {
    setFilterCriteria(criteria);
    setIsMenuOpen(false);
  };

  const getCheckMark = (option, type) => {
    if (type === 'criteria') {
      return filterCriteria === option ? '✔️' : '';
    }
  };

  return (
    <div className="filter-container">
      <button className="filter-button" onClick={toggleMenu}>
        <span className="filterImg"><img width="23" height="23" src="https://img.icons8.com/windows/32/filter.png" alt="filter"/></span>
        <span>{filterCriteria}</span> <span className="arrow">▼</span>
      </button>
      {isMenuOpen && (
        <ul className="filter-menu">
          <li onClick={() => handleFilterClick("Interview Planned")}>
          {getCheckMark('Interview Planned', 'criteria')} Interview Planned
          </li>
          <li onClick={() => handleFilterClick("Interview Not Planned")}>
          {getCheckMark('Interview Not Planned', 'criteria')}Interview Not Planned
          </li>
          <li onClick={() => handleFilterClick("Favorites")}>Favorites</li>
        </ul>
      )}
    </div>
  );
};

export default Filter;
