import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid: React.FC<{ products: any }> = ({ products }) => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;
