'use client';
import { createContext, useState, useEffect } from 'react';
import { useFetchItems } from '@/hooks/useFetchItems';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [promotion, setPromotion] = useState(null);

  const [filters, setFilters] = useState({
    page: page,
    limit: limit,
    promotion: promotion,
    name: '',
    maxPrice: 50000, // Exemple de range de prix
    size: null, // Par exemple pour les ml des parfums
    category: null,
  });

  const { data: products, isLoading, error, refetch } = useFetchItems(filters);

  // Fonction pour modifier les filtres
  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  useEffect(() => {
    refetch(); // Refetch les produits dès que les filtres changent
  }, [filters]);

  return (
    <ProductContext.Provider
      value={{ products, filters, updateFilters, isLoading }}
    >
      {children}
    </ProductContext.Provider>
  );
};
