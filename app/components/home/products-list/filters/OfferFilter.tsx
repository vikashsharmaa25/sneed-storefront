import React from "react";

interface Props {
    showOnSale: boolean;
    showInStock: boolean;
    setShowOnSale: (value: boolean) => void;
    setShowInStock: (value: boolean) => void;
}

const OfferFilter: React.FC<Props> = ({
    showOnSale,
    showInStock,
    setShowOnSale,
    setShowInStock
}) => {
    return (
        <div className="border-b border-gray-200 py-6">
            <h3 className="-my-3 flow-root">
                <div className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">Special Offers</span>
                </div>
            </h3>

            <div className="pt-6 space-y-4">
                <div className="flex items-center">
                    <input
                        id="on-sale"
                        type="checkbox"
                        checked={showOnSale}
                        onChange={() => setShowOnSale(!showOnSale)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="on-sale" className="ml-3 text-sm text-gray-600">
                        On Sale
                    </label>
                </div>

                <div className="flex items-center">
                    <input
                        id="in-stock"
                        type="checkbox"
                        checked={showInStock}
                        onChange={() => setShowInStock(!showInStock)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="in-stock" className="ml-3 text-sm text-gray-600">
                        In Stock
                    </label>
                </div>
            </div>
        </div>
    );
};

export default OfferFilter;
