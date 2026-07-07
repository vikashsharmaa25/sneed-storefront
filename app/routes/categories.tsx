import CategoriesPage from '../components/category/CategoriesPage';
import { getProducts } from '../lib/api/products.server';
import type { Route } from './+types/categories';
import { useLoaderData, useSearchParams } from 'react-router';

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const categoryId = url.searchParams.get('categoryId');
  const minPrice = url.searchParams.get('minPrice');
  const maxPrice = url.searchParams.get('maxPrice');
  const productName = url.searchParams.get('productName');

  try {
    const products = await getProducts({
      categoryId: categoryId ? parseInt(categoryId) : undefined,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      productName: productName || undefined
    });
    return { products };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [] };
  }
}

export default function CategoriesPageRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const handleFilterChange = (filters: any) => {
    const newParams = new URLSearchParams();
    
    // Add category filters
    const categoryFilters = filters.filter((f: any) => f.category);
    if (categoryFilters.length > 0) {
      newParams.set('categoryId', categoryFilters[0].id);
    }
    
    // Add price filters
    const priceFilters = filters.filter((f: any) => f.id.includes('k') || f.id.includes('m'));
    if (priceFilters.length > 0) {
      const priceFilter = priceFilters[0];
      switch (priceFilter.id) {
        case '100k-300k':
          newParams.set('minPrice', '100000');
          newParams.set('maxPrice', '300000');
          break;
        case '300k-500k':
          newParams.set('minPrice', '300000');
          newParams.set('maxPrice', '500000');
          break;
        case '500k-1m':
          newParams.set('minPrice', '500000');
          newParams.set('maxPrice', '1000000');
          break;
        case '1m-plus':
          newParams.set('minPrice', '1000000');
          break;
      }
    }
    
    setSearchParams(newParams);
  };

  return (
    <CategoriesPage 
      products={loaderData.products} 
      onFilterChange={handleFilterChange}
    />
  );
}
