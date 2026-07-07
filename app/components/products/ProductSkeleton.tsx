import React from 'react';
import { Container } from '~/components/ui/Container';

export function ProductSkeleton() {
  return (
    <div className="bg-gray-50 min-h-screen animate-pulse">
      {/* Header Breadcrumbs Skeleton */}
      <header className="border-b px-4 py-3 bg-white">
        <Container>
          <div className="flex items-center gap-2 text-sm">
            <div className="h-4 w-12 bg-gray-200 rounded"></div>
            <span className="text-gray-300">/</span>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <span className="text-gray-300">/</span>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
        </Container>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          
          {/* Image Gallery Skeleton */}
          <div className="space-y-4">
            <div className="bg-gray-200 rounded-lg aspect-4/3 w-full"></div>
            
            {/* Gallery Thumbnails */}
            <div className="flex gap-2">
              <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
              <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
              <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6">
            <div>
              {/* Product Title (Dual Line) */}
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
              
              {/* Price */}
              <div className="h-10 bg-gray-200 rounded w-1/3 mb-4"></div>
              
              {/* Brand */}
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>

            {/* Variant Selector Skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
            </div>

            {/* Quantity Selector Skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded"></div>
                <div className="w-16 h-10 bg-gray-200 rounded text-center"></div>
                <div className="w-10 h-10 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Add to Cart Button Skeleton */}
            <div className="h-12 bg-gray-200 rounded-lg w-full mt-4"></div>
          </div>
        </div>

        {/* Product Details Tabs Skeleton */}
        <div className="rounded-lg p-6 bg-white border border-gray-100 shadow-sm">
          <div className="border-b flex gap-6 pb-3 mb-6">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-28"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-28"></div>
          </div>
          
          {/* Tab Content Placeholder */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
