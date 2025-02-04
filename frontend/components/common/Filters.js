'use client';
import { useState, useEffect } from 'react';
import '@/styles/filters.css';

function Filters() {
  const [minprice, setMinprice] = useState(0);
  const [maxprice, setMaxprice] = useState(500);
  const [search, setSearch] = useState('');

  function handleMinPrice(val) {
    setMinprice(val);
  }
  function handleMaxPrice(val) {
    setMaxprice(val);
  }
  function handleSearch(val) {
    setSearch(val);
  }

  return (
    <div className="filters__wrapper">
      <div>
        <input
          className="filter-custom filter-price"
          type="number"
          name="min-price"
          value={minprice}
          step={5}
          min={0}
          onChange={(e) => handleMinPrice(e.target.value)}
        />
      </div>
      <div>
        <input
          className="filter-custom filter-price"
          type="number"
          name="max-price"
          value={maxprice}
          step={5}
          min={1}
          max={500}
          onChange={(e) => handleMaxPrice(e.target.value)}
        />
      </div>
      <div>
        <input
          className="filter-custom"
          type="text"
          name="search-product"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Filters;
