import React from 'react';
import { ThumbsUp, TrendingUp, Star, Award } from 'lucide-react';
import { Container } from '../ui/Container';

interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    badge: {
        icon: React.ReactNode;
        text: string;
    };
    rating: number;
    reviewCount: number;
    description: string;
}

const HandpickedProducts: React.FC = () => {
    const products: Product[] = [
        {
            id: 1,
            name: "SNEED-JET® Infinity Inkjet Coding Printer",
            image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&h=300&fit=crop",
            price: 152500.00,
            badge: {
                icon: <TrendingUp className="w-4 h-4" />,
                text: "Best Seller"
            },
            rating: 4.9,
            reviewCount: 127,
            description: "Most popular choice for medium-sized operations"
        },
        {
            id: 2,
            name: "SNEED-JET® Freedom 21, 2-Inch Case Coder",
            image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop",
            price: 179500.00,
            badge: {
                icon: <Star className="w-4 h-4" />,
                text: "Top Rated"
            },
            rating: 5,
            reviewCount: 89,
            description: "Highest customer satisfaction rating"
        },
        {
            id: 3,
            name: "SNEED-JET® Freedom 22, Dual Head Case Cod",
            image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400&h=300&fit=crop",
            price: 179500.00,
            badge: {
                icon: <Award className="w-4 h-4" />,
                text: "Editor's Choice"
            },
            rating: 4.8,
            reviewCount: 156,
            description: "Recommended by industry experts"
        }
    ];

    const formatPrice = (price: number) => {
        return `Rs. ${price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`w-5 h-5 ${index < Math.floor(rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : index < rating
                        ? 'fill-yellow-400 text-yellow-400 opacity-50'
                        : 'fill-gray-200 text-gray-200'
                    }`}
            />
        ));
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 px-8 py-16">
            <Container>
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 section-red text-white px-6 py-3 rounded-full mb-6 shadow-lg">
                        <ThumbsUp className="w-5 h-5" />
                        <span className="font-semibold">Handpicked for You</span>
                    </div>

                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Based on customer reviews, industry trends, and expert recommendations, these products deliver exceptional value and performance.
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product: any) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-2xl transition-all duration-300 flex flex-col relative"
                        >
                            {/* Badge */}
                            <div className="absolute -top-7 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                                <div className="flex items-center gap-2 section-red text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg">
                                    {product.badge.icon}
                                    <span>{product.badge.text}</span>
                                </div>
                            </div>
                            {/* Product Image */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain"
                                    loading="lazy"
                                    decoding="async"
                                    width={400}
                                    height={256}
                                />

                            </div>

                            {/* Product Info */}
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-gray-800 mb-4 h-14 font-medium line-clamp-2">
                                    {product.name}
                                </h3>

                                <div className="text-gray-900 font-medium mb-6">
                                    {formatPrice(product.price)}
                                </div>

                                <button className="w-full section-red hover:bg-red-800 py-2 rounded-lg transition-colors duration-200 mb-4">
                                    Buy Now
                                </button>

                                {/* Rating Section */}
                                <div className="mt-auto pt-6 border-t border-gray-100">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-1">
                                            {renderStars(product.rating)}
                                        </div>
                                        <span className="text-gray-900 font-bold text-lg">
                                            {product.rating}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-gray-500 text-sm italic">
                                            "{product.description}"
                                        </span>
                                        <div className="text-right ml-4 shrink-0">
                                            <div className="text-gray-900 font-semibold">
                                                {product.reviewCount}
                                            </div>
                                            <div className="text-gray-500 text-xs">
                                                reviews
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default HandpickedProducts;