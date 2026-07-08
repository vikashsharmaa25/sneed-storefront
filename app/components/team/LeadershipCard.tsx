import type React from "react"
import { Heart, Linkedin } from "lucide-react"

export const LeadershipCard = ({ name, role, image, bio }: any) => {
    return (
        <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="relative aspect-3/4 bg-gray-900 overflow-hidden">
                <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-semibold mb-1">{name}</h3>
                    <p className="text-red-400 text-sm font-medium">{role}</p>
                </div>
            </div>

            {/* Bio section */}
            <div className="p-4 bg-white">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">{bio}</p>
                <div className="flex gap-2">
                    <button className="flex items-center gap-1 text-red-500 text-sm font-medium hover:text-red-600">
                        <Heart size={16} /> Email
                    </button>
                    <button className="flex items-center gap-1 text-gray-400 hover:text-gray-600">
                        <Linkedin size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}
