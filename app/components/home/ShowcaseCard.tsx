import type React from "react"
import { Star, ShoppingBag, ArrowRight } from "lucide-react"

const ProductCard: React.FC<any> = ({ title, description, rating, productCount, bgColor, isActive }) => {
  return (
    <div
      className={`
        rounded-2xl p-8 text-white bg-linear-to-br ${bgColor}
        transition-all duration-300 ease-out w-[680px] h-[460px] text-start
        ${isActive ? "scale-110 opacity-100 shadow-2xl z-20" : "scale-90 opacity-40 blur-[2px]"}
      `}
    >
      {/* Rating badge */}
      <div className="flex justify-between items-start mb-4">
        <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
          <Star className="w-7 h-7 text-white" />
        </div>

        <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-1 rounded-lg">
          <Star className="w-6 h-6 text-yellow-300 fill-yellow-300 mr-1" />
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-sm opacity-90 mb-6 leading-relaxed line-clamp-3">{description}</p>

      {/* Tags */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <span className="bg-white/10 p-2 rounded-lg text-sm font-medium">Industrial Grade</span>
        <span className="bg-white/10 p-2 rounded-lg text-sm font-medium">High Durability</span>
        <span className="bg-white/10 p-2 rounded-lg text-sm font-medium">24/7 Support</span>
      </div>

      {/* Footer with product count and button */}
      <div className="flex flex-col justify-start items-start mt-12 gap-8 ">
        <div className="flex items-center bg-white/10 p-2 rounded-lg text-sm font-medium">
          <ShoppingBag className="w-4 h-4 mr-2" />
          {productCount}
        </div>

        <button className="bg-white text-black px-5 py-3 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-gray-100 transition-colors">
          Explore {title.split(" ")[0]}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default ProductCard
