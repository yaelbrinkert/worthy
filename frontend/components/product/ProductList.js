'use client';

import { useContext, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Pour récupérer la catégorie depuis l'URL
import { ProductContext } from '@/context/ProductContext';
import Skeleton from '@/components/ui/Skeleton';
import NotFound from '@/components/ui/Notfound';
import { ProductCard } from '@/components/product/ProductCard';
import '@/styles/card.css';

function ProductList() {
  const { filters, updateFilters, products, isLoading, error } =
    useContext(ProductContext);
  const { category } = useParams(); // Récupère la catégorie depuis l'URL

  const idCategory = returnIdCategory(category);

  // Met à jour les filtres à chaque changement de catégorie
  useEffect(() => {
    if (idCategory !== filters.category) {
      updateFilters({ category: idCategory });
    }
  }, [idCategory]);

  if (isLoading)
    return (
      <ul className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-1">
        <Skeleton />
      </ul>
    );

  if (error) return <NotFound error={error} />;

  if (!products || products.length === 0)
    return (
      <div>
        Aucun produit disponible. Changez de section ou revenez plus tard.
      </div>
    );

  return (
    <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-1">
      {products.map((item) => (
        <ProductCard datas={item} key={item._id} />
      ))}
    </div>
  );
}

export default ProductList;

function returnIdCategory(queryName) {
  const categories = {
    cosmetics: '676986b36feef9d5d65f5e53',
    jewelry: '6769a1a86feef9d5d65f5e89',
    candles: '6769a4c96feef9d5d65f5e90',
    clothing: '6769acc86feef9d5d65f5e9f',
  };
  return categories[queryName] || null;
}
