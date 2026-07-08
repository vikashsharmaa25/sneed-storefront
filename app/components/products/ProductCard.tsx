import React from 'react';
import type { ProductCardProps } from './types';

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  image,
  onClick,
  badge,
  subtitle,
}) => {
  return (
    <div
      className="group relative bg-white rounded-2xl border border-gray-100/60 overflow-hidden hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-square bg-gray-50 overflow-hidden relative">
        {badge && (
          <span className="absolute top-3 left-3 bg-red-600/90 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md shadow-sm z-10 backdrop-blur-sm">
            {badge}
          </span>
        )}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          decoding="async"
          width={400}
          height={400}
        />
      </div>
      <div className="p-5">
        {subtitle && (
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
            {subtitle}
          </span>
        )}
        <h4 className="text-sm font-semibold text-slate-800 mb-2 line-clamp-2 h-10 group-hover:text-red-600 transition-colors duration-200">
          {title}
        </h4>
        <p className="text-base font-bold text-red-600 mb-4">{price}</p>
        <button
          className="w-full primary-btn py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-900 hover:text-white transition-all duration-300 flex items-center justify-center gap-1.5 active:scale-[0.98]"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          <span>View Details</span>
          <svg
            className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};
