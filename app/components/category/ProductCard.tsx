import { useNavigate } from 'react-router';

interface Props {
    product: {
        id: string | number;
        name?: string;
        product_title?: string;
        originalPrice?: number;
        salePrice?: number;
        regularPrice?: number;
        selling_price?: number;
        image?: string;
        image_url?: string;
        variant_image_url?: string;
        onSale?: boolean;
        sale?: any;
    };
}

export default function ProductCard({ product }: Props) {
    const navigate = useNavigate();

    // Handle both API response format and static format
    const productName = product.product_title || product.name || 'Unknown Product';
    const productImage = product.image_url || product.variant_image_url || product.image || '';
    const sellingPrice = product.selling_price || product.salePrice || product.originalPrice || product.regularPrice;
    const originalPrice = product.originalPrice || (product.selling_price && product.selling_price * 1.2); // Estimate original if not provided
    const isOnSale = product.sale !== null || product.onSale;

    const handleBuyNow = () => {
        navigate(`/products/${product.id}`);
    };

    return (
        <div className="bg-white border rounded-lg overflow-hidden hover:shadow-lg relative">

            {isOnSale && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold z-10">
                    SALE
                </div>
            )}

            <div className="aspect-square bg-gray-100">

                <img
                    src={productImage}
                    alt={productName}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={400}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                    }}
                />

            </div>

            <div className="p-4">

                <h3 className="font-semibold text-lg mb-2">
                    {productName}
                </h3>

                {isOnSale && originalPrice && sellingPrice && (
                    <div className="flex gap-2 mb-3">

                        <span className="line-through text-gray-400">
                            Rs. {originalPrice.toLocaleString()}
                        </span>

                        <span className="text-green-600 font-bold">
                            Rs. {sellingPrice.toLocaleString()}
                        </span>

                    </div>
                )}

                {!isOnSale && sellingPrice && (
                    <div className="mb-3">
                        <span className="font-bold text-xl">
                            Rs. {sellingPrice.toLocaleString()}
                        </span>
                    </div>
                )}

                <button
                    onClick={handleBuyNow}
                    className="w-full bg-red-800 text-white py-2 rounded hover:bg-red-900 transition-colors"
                >
                    Buy Now
                </button>

            </div>
        </div>
    );
}