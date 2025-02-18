'use client';
import { useState, useEffect } from 'react';
import { allItemsPagination } from '@/lib/api'; // Fonction pour fetch les produits

export const useFetchItems = (filters) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(
          ([_, value]) => value != null && value !== '' && value !== 0
        )
      );
      const params = new URLSearchParams(cleanFilters).toString();
      // const params = new URLSearchParams({ category: filters.category });
      const response = await allItemsPagination(params);
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  return { data, isLoading, error, refetch: fetchData };
};
