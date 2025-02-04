'use client';
import { useState, useEffect } from 'react';
import { getSpecificVariants } from '@/lib/api';

export function useFetchVariants(idQuery) {
  const [variant, setVariant] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!idQuery) return;

    getSpecificVariants(idQuery)
      .then((data) => {
        if (data) {
          setVariant(data);
        } else {
          setError('Aucun produit trouvé pour cette catégorie ou ces options.');
        }
      })
      .catch((err) => setError(err.message));
  }, []);
  return { variant, error };
}
