import { useLoaderData } from 'react-router';
import { getBrandById } from '~/lib/api/brands.server';
import { getProducts } from '~/lib/api/products.server';
import BrandPage from '~/components/brand/BrandPage';

export async function loader({ params }: { params: { id: string } }) {
    const brandId = params.id;

    const [brand, productsData] = await Promise.all([
        getBrandById(brandId).catch(() => null),
        getProducts({ brandId: parseInt(brandId) }).catch(() => []),
    ]);

    if (!brand) {
        throw new Response(
            JSON.stringify({ message: `Brand "${brandId}" not found` }),
            { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const products: any[] = Array.isArray(productsData) ? productsData : [];

    return { brand, products };
}

export default function BrandRoute() {
    const { brand, products } = useLoaderData<typeof loader>();
    return <BrandPage brand={brand} products={products} />;
}
