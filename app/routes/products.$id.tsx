import { useLoaderData, Await, useParams } from 'react-router';
import { Suspense } from 'react';
import Products from '~/components/products/Products'
import { getProductById } from '~/lib/api/products.server';
import { ProductSkeleton } from '~/components/products/ProductSkeleton';

export function loader({ params }: { params: { id: any } }) {
    const product = getProductById(params.id);
    return { product };
}

function productsId() {
    const data = useLoaderData<typeof loader>();
    const { id } = useParams();
    console.log("product by id", data);
    return (
        <Suspense key={id} fallback={<ProductSkeleton />}>
            <Await resolve={data.product} errorElement={<div className="p-8 text-center text-red-600">Error loading product details.</div>}>
                {(resolvedProduct) => <Products product={resolvedProduct} />}
            </Await>
        </Suspense>
    )
}

export default productsId

