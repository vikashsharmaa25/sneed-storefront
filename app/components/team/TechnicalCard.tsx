import type React from "react"
import { Mail, Share2, MessageCircle } from "lucide-react"

interface TechnicalCardProps {
    name: string
    role: string
    image: string
    bio?: string
}

export const TechnicalCard: React.FC<TechnicalCardProps> = ({ name, role, image, bio }) => {
    return (
        <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white">
            {/* Image container */}
            <div className="aspect-square bg-gray-100 overflow-hidden">
                <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-base font-semibold text-gray-900">{name}</h3>
                <p className="text-red-500 text-xs font-medium mb-3">{role}</p>

                {bio && <p className="text-gray-600 text-xs mb-4 leading-relaxed">{bio}</p>}

                {/* Action buttons */}
                <div className="flex items-center gap-3">
                    <button className="text-gray-600 hover:text-gray-900 transition-colors">
                        <Mail size={18} />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 transition-colors">
                        <MessageCircle size={18} />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 transition-colors">
                        <Share2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}
