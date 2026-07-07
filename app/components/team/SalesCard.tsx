import type React from "react"
import { Mail, Phone, MapPin } from "lucide-react"

interface SalesCardProps {
    name: string
    role: string
    image: string
    location?: string
    email?: string
    phone?: string
}

export const SalesCard: React.FC<SalesCardProps> = ({
    name,
    role,
    image,
    location = "Location",
    email = "email@company.com",
    phone = "1-800-000-0000",
}) => {
    return (
        <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white">
            {/* Image container */}
            <div className="aspect-square bg-gray-100 overflow-hidden">
                <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-contain" />
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
                <p className="text-gray-600 text-sm font-medium mb-1">{role}</p>
                <p className="text-gray-500 text-xs mb-4 flex items-center gap-1">
                    <MapPin size={14} /> {location}
                </p>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                        <Mail size={16} className="text-red-500 shrink-0" />
                        <span className="text-gray-600 truncate">{email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Phone size={16} className="text-gray-400 shrink-0" />
                        <span className="text-gray-600">{phone}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
