import type React from "react"
import { Star, ShoppingBag, ArrowRight } from "lucide-react"
import { Link } from "react-router"

const ProductCard: React.FC<any> = ({ id, title, description, rating, productCount, bgColor, isActive }) => {
  return (
    <div
      className={`
        w-full h-full rounded-2xl p-6 md:p-8 text-white bg-linear-to-br ${bgColor}
        flex flex-col text-start shadow-xl transition-shadow duration-300
        ${isActive ? "shadow-2xl/40" : "shadow-md"}
      `}
    >
      {/* Rating badge */}
      <div className="flex justify-between items-start mb-3 md:mb-4">
        <div className="w-10 h-10 md:w-14 md:h-14 bg-white/20 rounded-lg flex items-center justify-center">
          <Star className="w-5 h-5 md:w-7 md:h-7 text-white" />
        </div>

        <div className="flex items-center bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-lg">
          <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-300 fill-yellow-300 mr-1" />
          <span className="text-xs md:text-sm font-medium">{rating}</span>
        </div>
      </div>

      <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3">{title}</h3>
      <p className="text-xs md:text-sm opacity-90 mb-4 md:mb-6 leading-relaxed line-clamp-2 md:line-clamp-3">{description}</p>

      {/* Tags */}
      <div className="flex gap-1.5 md:gap-2 mb-4 md:mb-6 flex-wrap">
        <span className="bg-white/10 px-2 py-1 rounded-md text-[10px] md:text-sm font-medium">Industrial Grade</span>
        <span className="bg-white/10 px-2 py-1 rounded-md text-[10px] md:text-sm font-medium">High Durability</span>
        <span className="bg-white/10 px-2 py-1 rounded-md text-[10px] md:text-sm font-medium">24/7 Support</span>
      </div>

      {/* Footer with product count and button */}
      <div className="flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start mt-auto w-full gap-4 md:gap-6 pt-3 border-t border-white/10">
        <div className="flex items-center bg-white/10 px-2.5 py-1.5 md:p-2 rounded-lg text-xs md:text-sm font-medium">
          <ShoppingBag className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2" />
          {productCount}
        </div>

        <Link
          to={`/brands/${id}`}
          onClick={(e) => {
            if (!isActive) {
              e.preventDefault();
            }
          }}
          className={`
            bg-white text-black px-4 py-2 md:px-5 md:py-3 rounded-lg text-xs md:text-sm font-semibold 
            flex items-center gap-1.5 md:gap-2 transition-all duration-300
            ${isActive ? "hover:bg-gray-100 hover:scale-[1.02]" : "cursor-default opacity-80"}
          `}
        >
          Explore {title.split(" ")[0]}
          <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </Link>
      </div>
    </div>
  )
}

export default ProductCard

