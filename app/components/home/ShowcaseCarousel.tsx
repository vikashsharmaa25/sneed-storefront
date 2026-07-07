"use client"

import { useState, useEffect } from "react"
import ProductCard from "./ShowcaseCard"
import { ChevronLeft, ChevronRight } from "lucide-react"

const bgColors = [
  "from-red-600 to-red-700",
  "from-blue-600 to-blue-700",
  "from-gray-700 to-gray-900",
  "from-purple-600 to-purple-700",
  "from-indigo-600 to-indigo-700",
  "from-green-600 to-green-700",
  "from-orange-600 to-orange-700",
  "from-yellow-500 to-yellow-600",
  "from-teal-600 to-teal-700",
  "from-pink-600 to-pink-700",
];

const ProductCarousel = ({ brands: apiBrands }: { brands?: any[] }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const carouselData = apiBrands && apiBrands.length > 0 
    ? apiBrands.map((brand, index) => ({
        id: brand.id,
        title: brand.name,
        description: brand.description || "Premium coding system providing ultra-fine printing and superior durability.",
        rating: brand.rating || (4.5 + Math.random() * 0.5).toFixed(1),
        productCount: brand.productCount || `${Math.floor(Math.random() * 500) + 50}+ Products`,
        bgColor: bgColors[index % bgColors.length],
      }))
    : [];

  useEffect(() => {
    if (carouselData.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % carouselData.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [carouselData.length])

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + carouselData.length) % carouselData.length)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % carouselData.length)
  }

  if (carouselData.length === 0) return null;

  return (
    <>
      <div className="py-52 w-full relative">
        {/* Carousel container */}
        <div className="relative flex items-center justify-center h-80">
          {/* Left arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 z-30 p-2 text-white hover:bg-white/10 rounded-full transition-all"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Cards */}
          <div className="flex items-center justify-center w-full h-full relative px-10">
            {carouselData.map((product, index) => {
              const distance = Math.abs(index - activeIndex)
              const isActive = index === activeIndex
              const isLeft = index < activeIndex && distance <= 2
              const isRight = index > activeIndex && distance <= 2

              return (
                <div
                  key={product.id}
                  className="absolute transition-all duration-500"
                  style={{
                    transform: isActive
                      ? "translateX(0) scale(1)"
                      : isLeft
                        ? `translateX(-350px) scale(0.85)`
                        : isRight
                          ? `translateX(350px) scale(0.85)`
                          : `translateX(0) scale(0.7)`,
                    opacity: isActive || isLeft || isRight ? 1 : 0,
                    zIndex: isActive ? 20 : isLeft || isRight ? 10 : 0,
                  }}
                >
                  <ProductCard {...product} isActive={isActive} />
                </div>
              )
            })}
          </div>

          {/* Right arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 z-30 p-2 text-white hover:bg-white/10 rounded-full transition-all"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </div>
      {/* Pagination dots */}
      <div className="flex justify-center items-center gap-2">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-3 rounded-full transition-all ${index === activeIndex ? "bg-red-600 w-10" : "bg-gray-600 w-3"
              }`}
          />
        ))}
      </div>
    </>
  )
}

export default ProductCarousel
