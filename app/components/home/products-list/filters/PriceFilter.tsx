import React from "react";

interface Props {
    priceRanges: { id: string; label: string; count: number }[];
    selectedPriceRange: string | null;
    togglePriceRange: (id: string) => void;
}

const PriceFilter: React.FC<Props> = ({
    priceRanges,
    selectedPriceRange,
    togglePriceRange
}) => {
    return (
        <div className="border-b border-gray-200 py-6">
            <h3 className="-my-3 flow-root">
                <div className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">Price Range</span>
                </div>
            </h3>

            <div className="pt-6 space-y-4">
                {priceRanges.map(range => (
                    <div key={range.id} className="flex items-center">
                        <input
                            id={`price-${range.id}`}
                            type="radio"
                            checked={selectedPriceRange === range.id}
                            onChange={() => togglePriceRange(range.id)}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={`price-${range.id}`} className="ml-3 text-sm text-gray-600">
                            {range.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PriceFilter;
