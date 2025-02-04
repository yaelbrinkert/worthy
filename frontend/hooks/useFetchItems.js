'use client';
import { useState, useEffect } from 'react';
import { allItemsPagination } from '@/lib/api';

export function useFetchItems(category) {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [parametersUrl, setParametersUrl] = useState([]);
  // const [categoryQuery, setCategoryQuery] = useState(null);

  useEffect(() => {
    if (!category) return;

    setLoading(true);
    const categoryId = returnCategoryId(category);
    if (!categoryId) {
      setError('Catégorie invalide');
      setLoading(false);
      return;
    }
    // setCategoryQuery(categoryId);

    const urlParams = new URLSearchParams({
      page: page,
      limit: 12,
      category: categoryId,
    }).toString();
    // setParametersUrl(urlParams);

    allItemsPagination(urlParams)
      .then((data) => {
        if (data) {
          setProducts(data);
        } else {
          setError('Aucun produit trouvé pour cette catégorie ou ces options.');
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}

function returnCategoryId(name) {
  const categories = {
    cosmetics: '676986b36feef9d5d65f5e53',
    jewelry: '6769a1a86feef9d5d65f5e89',
    candles: '6769a4c96feef9d5d65f5e90',
    clothing: '6769acc86feef9d5d65f5e9f',
  };
  return categories[name] || null;
}
