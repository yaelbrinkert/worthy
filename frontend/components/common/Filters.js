'use client';
import { useState, useEffect, useContext } from 'react';
import { ProductContext } from '@/context/ProductContext';
import { useDebounce } from '@/hooks/useDebounce';
import Searchbar from './Searchbar';
import '@/styles/filters.css';

function Filters() {
  const { updateFilters } = useContext(ProductContext);
  const [maxprice, setMaxprice] = useState(50000);
  const debouncedPrice = useDebounce(maxprice, 300);

  useEffect(() => {
    updateFilters({ maxPrice: debouncedPrice });
  }, [debouncedPrice]);

  return (
    <div className="filters__wrapper">
      <div>
        <input
          className="filter-custom filter-price"
          type="range"
          name="max-price"
          value={maxprice}
          step={100}
          min={0}
          max={50000}
          onChange={(e) => setMaxprice(e.target.value)}
        />
        <span>{maxprice / 100}€</span>
      </div>
      <div>
        <Searchbar />
      </div>
    </div>
  );
}

export default Filters;
