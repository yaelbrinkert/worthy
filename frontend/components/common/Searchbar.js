'use client';
import { useState, useContext, useEffect } from 'react';
import { ProductContext } from '@/context/ProductContext';
import { useDebounce } from '@/hooks/useDebounce';

function Searchbar() {
  const { updateFilters } = useContext(ProductContext);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    updateFilters({ name: debouncedSearch });
  }, [debouncedSearch]);

  return (
    <input
      className="filter-custom"
      type="text"
      name="search-product"
      placeholder="Rechercher..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default Searchbar;
