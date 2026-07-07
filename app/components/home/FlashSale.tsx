import React, { useState, useEffect } from 'react';
import { Tag, Clock, ChevronRight } from 'lucide-react';
import { Container } from '../ui/Container';

interface FlashSaleProduct {
    id: number;
    product_title: string;
    selling_price: number;
    salePrice: number;
    image_url: string;
    variant_image_url?: string;
    brand_name: string;
}

interface FlashSaleData {
    id: number;
    discount_type: string;
    discount_value: number;
    is_active: boolean;
    name: string;
    description: string;
    products: FlashSaleProduct[];
}

interface Product {
    id: number;
    name: string;
    image: string;
    originalPrice: number;
    salePrice: number;
    discount: number;
    badge: string;
    stock: string;
}

const FlashSale = ({ flashSales }: { flashSales?: FlashSaleData[] }) => {
    // Transform API data to component format
    const products: Product[] = flashSales?.flatMap(sale =>
        (sale.products || []).map(product => {
            const calculatedSalePrice = sale.discount_type === 'percentage'
                ? product.selling_price * (1 - sale.discount_value / 100)
                : product.selling_price - sale.discount_value;

            return {
                id: product.id,
                name: product.product_title,
                image: product.image_url || product.variant_image_url || '',
                originalPrice: product.selling_price,
                salePrice: product.salePrice || calculatedSalePrice,
                discount: sale.discount_value,
                badge: "Limited Stock",
                stock: "SALE"
            };
        })
    ) || [];

    const formatPrice = (price: number) => {
        return `Rs. ${price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-rose-50 to-rose-100 px-8 py-16">
            <Container>
                {/* Flash Sale Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 section-red text-white px-6 py-3 rounded-full mb-4">
                        <Tag className="w-5 h-5" />
                        <span className="font-semibold">Flash Sale Event</span>
                        <span className="text-yellow-300">⚡</span>
                    </div>

                    <p className="text-gray-700 mb-6">
                        Don't miss out on incredible savings! Premium coding equipment at unbeatable prices.
                    </p>

                    {/* Countdown Timer */}
                    {/* <div className="flex items-center justify-center gap-3 mb-2">
                        <Clock className="w-5 h-5 title-heading" />
                        <span className="text-gray-700 font-medium">Sale ends in:</span>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                        <div className="flex flex-col items-center">
                            <div className="bg-gray-800 text-white w-14 h-14 rounded-lg flex items-center justify-center text-2xl font-bold">
                                {timeLeft.days}
                            </div>
                            <span className="text-xs text-gray-600 mt-1">Days</span>
                        </div>
                        <span className="text-2xl text-gray-700">:</span>
                        <div className="flex flex-col items-center">
                            <div className="bg-gray-800 text-white w-14 h-14 rounded-lg flex items-center justify-center text-2xl font-bold">
                                {timeLeft.hours}
                            </div>
                            <span className="text-xs text-gray-600 mt-1">Hours</span>
                        </div>
                        <span className="text-2xl text-gray-700">:</span>
                        <div className="flex flex-col items-center">
                            <div className="bg-gray-800 text-white w-14 h-14 rounded-lg flex items-center justify-center text-2xl font-bold">
                                {timeLeft.minutes}
                            </div>
                            <span className="text-xs text-gray-600 mt-1">Min</span>
                        </div>
                        <span className="text-2xl text-gray-700">:</span>
                        <div className="flex flex-col items-center">
                            <div className="bg-gray-800 text-white w-14 h-14 rounded-lg flex items-center justify-center text-2xl font-bold">
                                {timeLeft.seconds}
                            </div>
                            <span className="text-xs text-gray-600 mt-1">Sec</span>
                        </div>
                    </div> */}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl overflow-hidden transition-shadow duration-300">
                            {/* Product Image */}
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain"
                                />

                                {/* Badges */}
                                <div className="absolute top-3 left-3 bg-gray-800 text-white text-xs px-3 py-1 rounded-full">
                                    {product.badge}
                                </div>
                                <div className="absolute top-3 right-3 section-red text-white text-xs px-3 py-1 rounded-full">
                                    {product.stock}
                                </div>
                                <div className="absolute bottom-3 right-3 section-red text-white text-sm px-3 py-2 rounded-full">
                                    -{product.discount}%
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-5">
                                <h3 className="text-gray-800 font-semibold mb-3 h-12 line-clamp-2">
                                    {product.name}
                                </h3>

                                <div className="mb-4 flex justify-between items-center">
                                    <div className="text-gray-400 text-sm line-through mb-1">
                                        {formatPrice(product.originalPrice)}
                                    </div>
                                    <div className="title-heading text-sm">
                                        {formatPrice(product.salePrice)}
                                    </div>
                                </div>

                                <button className="w-full section-red hover:bg-red-800 py-2 rounded-lg transition-colors duration-200">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center">
                    <button className="inline-flex items-center gap-2 section-red hover:bg-red-800 text-white px-8 py-2 rounded-lg shadow-lg transition-colors duration-200">
                        <Tag className="w-5 h-5" />
                        <span>View All Sale Items</span>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </Container>
        </div>
    );
};

export default FlashSale;