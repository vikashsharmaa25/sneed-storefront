import React from "react";

interface Props {
    categories: { id: string; label: string; count: number }[];
    selectedCategories: string[];
    toggleCategory: (id: string) => void;
}

const CategoryFilter: React.FC<Props> = ({ categories, selectedCategories, toggleCategory }) => {
    return (
        <div className="border-b border-gray-200 py-6">
            <h3 className="-my-3 flow-root">
                <div className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">Product Categories</span>
                </div>
            </h3>

            <div className="pt-6 space-y-4">
                {categories.map(category => (
                    <div key={category.id} className="flex items-center">
                        <input
                            id={`category-${category.id}`}
                            type="checkbox"
                            checked={selectedCategories.includes(category.id)}
                            onChange={() => toggleCategory(category.id)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={`category-${category.id}`} className="ml-3 text-sm text-gray-600">
                            {category.label} ({category.count})
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilter;
