import React from "react";
import { Link } from "react-router";

const ProductCard: React.FC<{ product: any }> = ({ product }) => {
    return (
        <Link to={`/products/${product.id}`} className="group relative border border-gray-200 rounded-xl overflow-hidden block hover:shadow-lg transition-shadow bg-white">
            <div className="aspect-square w-full overflow-hidden bg-gray-50">
                <img
                    src={product.image_url || product.variant_image_url}
                    alt={product.product_title}
                    className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />

                {product.isOnSale && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-[10px] font-bold">
                        SALE
                    </span>
                )}
            </div>

            <div className="mt-2 flex flex-col p-4">
                <div className="h-10 mb-1">
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">
                        {product.product_title}
                    </h3>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <div className="flex flex-col">
                        {product.originalPrice && (
                            <span className="line-through text-xs text-gray-400">
                                Rs. {product.originalPrice.toLocaleString("en-IN")}
                            </span>
                        )}
                        <span className="text-base font-bold text-gray-900">
                            Rs. {(product.selling_price || 0).toLocaleString("en-IN")}
                        </span>
                    </div>
                </div>
                <button className="mt-4 w-full primary-btn py-2 rounded">
                    Buy Now
                </button>
            </div>

        </Link>
    );
};

export default ProductCard;
