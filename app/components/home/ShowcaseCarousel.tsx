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

const useWindowWidth = () => {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

const ProductCarousel = ({ brands: apiBrands }: { brands?: any[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const width = useWindowWidth();
  const isMobile = width < 768;

  const originalData = apiBrands && apiBrands.length > 0
    ? apiBrands.map((brand, index) => ({
      id: brand.id,
      title: brand.name,
      description: brand.description || "Premium coding system providing ultra-fine printing and superior durability.",
      rating: brand.rating || (4.5 + Math.random() * 0.5).toFixed(1),
      productCount: brand.product_count != null ? `${brand.product_count} Products` : `0 Products`,
      bgColor: bgColors[index % bgColors.length],
    }))
    : [];

  // If length < 5, duplicate elements to keep the circular stack animation smooth
  let carouselData = [...originalData];
  if (originalData.length > 0 && originalData.length < 5) {
    while (carouselData.length < 5) {
      const currentLength = carouselData.length;
      carouselData = [
        ...carouselData,
        ...originalData.map((item, idx) => ({
          ...item,
          id: `${item.id}-dup-${currentLength + idx}`,
        })),
      ];
    }
  }

  const N = carouselData.length;

  useEffect(() => {
    if (N === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % N);
    }, 5000);
    return () => clearInterval(interval);
  }, [N]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + N) % N);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % N);
  };

  const getCircularDistanceAndOffset = (index: number, active: number) => {
    let offset = index - active;
    if (offset > N / 2) offset -= N;
    else if (offset <= -N / 2) offset += N;
    return offset;
  };

  const getCardStyles = (offset: number) => {
    const side1 = isMobile ? 140 : 260;
    const side2 = isMobile ? 240 : 500;

    switch (offset) {
      case 0:
        return {
          transform: "translateX(0px) scale(1)",
          opacity: 1,
          zIndex: 50,
          filter: "blur(0px)",
          pointerEvents: "auto" as const,
        };

      case -1:
        return {
          transform: `translateX(-${side1}px) scale(0.84)`,
          opacity: 0.7,
          zIndex: 40,
          filter: "blur(1px)",
          pointerEvents: "auto" as const,
        };

      case 1:
        return {
          transform: `translateX(${side1}px) scale(0.84)`,
          opacity: 0.7,
          zIndex: 40,
          filter: "blur(1px)",
          pointerEvents: "auto" as const,
        };

      case -2:
        return {
          transform: `translateX(-${side2}px) scale(0.68)`,
          opacity: 0.45,
          zIndex: 30,
          filter: "blur(3px)",
          pointerEvents: "none" as const,
        };

      case 2:
        return {
          transform: `translateX(${side2}px) scale(0.68)`,
          opacity: 0.45,
          zIndex: 30,
          filter: "blur(3px)",
          pointerEvents: "none" as const,
        };

      default:
        return {
          transform: `translateX(${offset * side2}px) scale(.5)`,
          opacity: 0,
          zIndex: 0,
          filter: "blur(5px)",
          pointerEvents: "none" as const,
        };
    }
  };

  if (N === 0) return null;

  return (
    <>
      <div className="py-12 w-full relative overflow-hidden">
        {/* Carousel container */}
        <div className="relative flex items-center justify-center h-[400px] md:h-[500px]">
          {/* Left arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-2 md:left-4 z-40 p-2 md:p-3 bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white rounded-full transition-all shadow-lg hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          {/* Cards */}
          <div className="flex items-center justify-center w-full h-full relative px-4 md:px-10">
            {carouselData.map((product, index) => {
              const offset = getCircularDistanceAndOffset(index, activeIndex);

              // Don't render far-out cards to optimize DOM size, but keep offset 3 for entry transitions
              if (Math.abs(offset) > 3) return null;

              const styles = getCardStyles(offset);
              const isActive = index === activeIndex;

              return (
                <div
                  key={product.id}
                  className="absolute transition-all duration-500 ease-out w-[90vw] md:w-[680px] h-[360px] md:h-[460px]"
                  style={styles}
                  onClick={() => {
                    if (!isActive) {
                      setActiveIndex(index);
                    }
                  }}
                >
                  <ProductCard {...product} isActive={isActive} />
                </div>
              );
            })}
          </div>

          {/* Right arrow */}
          <button
            onClick={handleNext}
            className="absolute right-2 md:right-4 z-40 p-2 md:p-3 bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white rounded-full transition-all shadow-lg hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {originalData.map((_, index) => {
          const isDotActive = activeIndex % originalData.length === index;
          return (
            <button
              key={index}
              onClick={() => {
                const currentOffset = activeIndex % originalData.length;
                const diff = index - currentOffset;
                let targetIndex = activeIndex + diff;
                if (targetIndex < 0) targetIndex += N;
                targetIndex = targetIndex % N;
                setActiveIndex(targetIndex);
              }}
              className={`h-3 rounded-full transition-all duration-300 ${isDotActive ? "bg-red-600 w-10" : "bg-gray-600 w-3 hover:bg-gray-400"
                }`}
            />
          );
        })}
      </div>
    </>
  );
};

export default ProductCarousel;

