'use client';
import { useFetchItems } from '@/hooks/useFetchItems';
import Skeleton from '@/components/ui/Skeleton';
import NotFound from '@/components/ui/Notfound';
import { ProductCard } from '@/components/product/ProductCard';
import '@/styles/card.css';

function ProductList(query) {
  const category = query.params;
  const { products, loading, error } = useFetchItems(category);

  if (loading)
    return (
      <ul className="product-list__wrapper">
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
