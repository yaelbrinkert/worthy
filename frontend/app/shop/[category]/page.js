import ProductList from '@/components/product/ProductList';
import Filter from '@/components/common/Filters';

async function Page({ params }) {
  const query = (await params).category;
  return (
    <>
      <Filter />
      <ProductList params={query} />
    </>
  );
}

export default Page;
