import React from "react";

interface Props {
    brands: { id: string; label: string; count: number }[];
    selectedBrands: string[];
    toggleBrand: (id: string) => void;
}

const BrandFilter: React.FC<Props> = ({ brands, selectedBrands, toggleBrand }) => {
    return (
        <div className="border-b border-gray-200 py-6">
            <h3 className="-my-3 flow-root">
                <div className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">Brands</span>
                </div>
            </h3>

            <div className="pt-6 space-y-4">
                {brands.map(brand => (
                    <div key={brand.id} className="flex items-center">
                        <input
                            id={`brand-${brand.id}`}
                            type="checkbox"
                            checked={selectedBrands.includes(brand.id)}
                            onChange={() => toggleBrand(brand.id)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={`brand-${brand.id}`} className="ml-3 text-sm text-gray-600">
                            {brand.label} {brand.count > 0 && `(${brand.count})`}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrandFilter;
