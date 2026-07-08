import React from 'react';
import type { NavigationItem } from './types';
import { ChevronDown, Factory, Pill, Package, Coffee, Droplets, Beef, HelpCircle } from 'lucide-react';
import { Container } from '../ui/Container';
import { Link } from 'react-router';


interface NavigationProps {
  items: NavigationItem[];
  categories?: any[];
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Factory': return Factory;
    case 'Pill': return Pill;
    case 'Package': return Package;
    case 'Coffee': return Coffee;
    case 'Droplets': return Droplets;
    case 'Beef': return Beef;
    default: return HelpCircle;
  }
};

export function Navigation({ items, categories = [] }: NavigationProps) {
  const industriesItem = items.find(item => item.label === 'Industries');
  console.log('Industries in Navigation:', industriesItem?.children);
  return (
    <nav className="bg-[#222428] text-white h-[64px] flex items-center">
      <Container className="">
        <ul className="flex flex-wrap items-center justify-between w-full">
          {/* Categories with Dropdown */}
          <li className="relative group flex items-center">
            <button
              className="flex items-center font-bold hover:bg-gray-700 text-[16px] px-4 py-3 tracking-wide"
              onClick={() => { }}
            >
              CATEGORIES
              <ChevronDown className="ml-1 h-4 w-4 inline-block" />
            </button>

            {/* Vertical Separator */}
            <div className="h-8 w-px bg-gray-600 mx-2"></div>

            {/* Categories Mega Menu */}
            <div className="absolute left-0 top-full mt-0 w-[1100px] bg-white text-black shadow-2xl rounded-b-xl z-50 hidden group-hover:flex overflow-hidden border-t border-gray-100">
              {/* Left Side: Categories Sections */}
              <div className="flex-1 p-8 grid grid-cols-2 gap-x-12 gap-y-10">
                {categories.length > 0 ? (
                  [
                    { title: "SNEED-JET® Printers", color: "text-red-600" },
                    { title: "Handheld Solutions", color: "text-red-600" },
                    { title: "Coding Equipment", color: "text-red-600" },
                    { title: "Labeling & Packaging", color: "text-red-600" }
                  ].map((section, idx) => (
                    <div key={idx}>
                      <h3 className={`font-bold ${section.color} mb-4 text-[17px]`}>{section.title}</h3>
                      <div className="space-y-4">
                        {categories.slice(idx * 4, (idx + 1) * 4).map((category: any) => (
                          <Link
                            key={category.id}
                            to={`/categories?category=${category.id}`}
                            className="block group/cat"
                          >
                            <span className="block font-bold text-gray-800 group-hover/cat:text-red-600 transition-colors">
                              {category.name}
                            </span>
                            <span className="text-xs text-gray-400 block mt-0.5 leading-tight">
                              {category.sub_title || "Industrial-grade coding solutions for production lines"}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 py-4 text-center text-gray-500 italic">
                    No categories found
                  </div>
                )}
              </div>

              {/* Right Side: Featured Products */}
              <div className="w-[350px] bg-gray-50 p-6 border-l border-gray-200 flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 mb-6">Featured Products</h3>
                <div className="space-y-6 flex-1">
                  {[
                    {
                      name: "SNEED-JET® Titan Printer",
                      price: "Rs. 107,900.00",
                      badge: "BESTSELLER",
                      badgeColor: "bg-red-600",
                      image: "https://placehold.co/80x80?text=Titan"
                    },
                    {
                      name: "Freedom Handheld",
                      price: "Rs. 89,500.00",
                      badge: "SALE",
                      badgeColor: "bg-black",
                      image: "https://placehold.co/80x80?text=Freedom"
                    },
                    {
                      name: "Infinity Inkjet Printer",
                      price: "Rs. 152,500.00",
                      badge: "NEW",
                      badgeColor: "bg-red-600",
                      image: "https://placehold.co/80x80?text=Infinity"
                    }
                  ].map((product, idx) => (
                    <div key={idx} className="flex gap-4 group/prod cursor-pointer bg-white p-3 rounded-xl border border-transparent hover:border-red-200 hover:shadow-md transition-all">
                      <div className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover p-2" loading="lazy" decoding="async" width={80} height={80} />
                        <span className={`absolute top-0 left-0 ${product.badgeColor} text-white text-[9px] font-bold px-1.5 py-0.5 rounded-br-lg shadow-sm`}>
                          {product.badge}
                        </span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-bold text-gray-800 text-sm group-hover/prod:text-red-600 transition-colors leading-tight">
                          {product.name}
                        </h4>
                        <p className="text-red-600 font-bold text-sm mt-1">{product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-red-600 text-white font-bold py-3.5 rounded-lg mt-8 hover:bg-red-700 transition-colors shadow-lg shadow-red-200">
                  View All Products
                </button>
              </div>
            </div>
          </li>

          {/* Main Navigation Items */}
          <div className="flex flex-1 items-center justify-end">
            {items.map((item) => (
              <li key={item.href} className="relative group text-white ">
                {item.children ? (
                  <span
                    className="px-4 py-3 font-normal text-[16px] capitalize space-x-2 flex justify-between items-center hover:text-red-500 transition-colors cursor-default select-none"
                  >
                    {item.label}
                    <ChevronDown className="ml-1 h-4 w-4 inline-block" />
                  </span>
                ) : (
                  <a
                    href={item.href}
                    className="px-4 py-3 font-normal text-[16px] capitalize space-x-2 flex justify-between items-center hover:text-red-500 transition-colors"
                  >
                    {item.label}
                  </a>
                )}

                {/* Dropdown menu */}
                {item.children && (
                  <div className={`absolute ${item.label === 'Industries' ? 'left-1/2 -translate-x-1/2 w-[700px]' : 'left-0 w-48'} mt-0 bg-white text-black shadow-2xl rounded-xl py-6 z-50 hidden group-hover:block border border-gray-100 transition-all duration-300 ease-in-out`}>
                    {item.label === 'Industries' ? (
                      <div className="px-8 max-h-[480px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                        <div className="grid grid-cols-2 gap-2">
                          {item.children.map((child) => {
                            const Icon = getIcon(child.icon);
                            return (
                              <Link
                                key={child.href}
                                to={child.href}
                                className="flex items-start p-4 rounded-xl hover:bg-red-50 transition-all group/item"
                              >
                                <div className="bg-red-50 p-3 rounded-lg mr-4 group-hover/item:bg-red-100 transition-colors">
                                  <Icon className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                  <h5 className="font-bold text-gray-900 group-hover/item:text-red-600 transition-colors text-[14px] mb-1">
                                    {child.label}
                                  </h5>
                                  <span className="text-gray-500 text-xs leading-tight">
                                    {child.description}
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="py-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100 text-black"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </div>
        </ul>
      </Container>
    </nav>
  );
}
