import React from "react";

const ProductCardSkeleton: React.FC = () => {
    return (
        <div className="group relative border border-gray-200 rounded-xl overflow-hidden block bg-white animate-pulse">
            <div className="aspect-square w-full bg-gray-100" />
            <div className="flex flex-col p-4">
                <div className="h-10 mb-1 space-y-2">
                    <div className="h-3 w-full bg-gray-100 rounded" />
                    <div className="h-3 w-2/3 bg-gray-100 rounded" />
                </div>
                <div className="mt-2">
                    <div className="h-5 w-1/2 bg-gray-100 rounded" />
                </div>
                <div className="mt-4 h-9 w-full bg-gray-100 rounded" />
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
