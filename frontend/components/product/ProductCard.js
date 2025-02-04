'use client';
import { useFetchVariants } from '@/hooks/useFetchVariants';
import NotFound from '@/components/ui/Notfound';

export function ProductCard({ datas }) {
  const { variant, error } = useFetchVariants(datas._id);
  //   if (!variant || variant.length === 0) return <NotFound />;
  if (error) return <NotFound error={error} />;

  const prices = variant.map((variant) => variant.price);
  const minPrice = Math.min(...prices) / 100;
  const maxPrice = Math.max(...prices) / 100;

  //
  const reductedPrices = variant.map((variantr) => variantr.reducted_price);
  const minReductedPrice = Math.min(...reductedPrices) / 100;
  const maxReductedPrice = Math.min(...reductedPrices) / 100;

  return (
    <div className="col" key={datas._id}>
      <a href={`/product/${datas._id}`} className="card h-100">
        <img
          className="card-img-top"
          src={`http://localhost:9876/images/products_images/${datas.image[0]}`}
          alt={datas.name}
        />
        <div className="card-body">
          <h5 className="card-title">{datas.name}</h5>
          <div className="card-prices">
            <span className="card-price">
              {minPrice !== Infinity ? `${minPrice}€` : '-'}
            </span>
            <span className="card-reducted-price">
              {minReductedPrice !== Infinity ? `${minReductedPrice}€` : ''}
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}
