import { Shield, Award, Lock, Heart } from "lucide-react"

export function Certifications() {
    const certs = [
        {
            icon: Shield,
            title: "ISO 9001:2015",
            subtitle: "Quality Management Certified",
        },
        {
            icon: Award,
            title: "ISO Certified",
            subtitle: "International Standards",
        },
        {
            icon: Lock,
            title: "PCI Compliant",
            subtitle: "Secure & Reliable",
        },
        {
            icon: Heart,
            title: "HIPAA Compliant",
            subtitle: "Data Security Standards",
        },
    ]

    return (
        <div className="py-16 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-center">Certifications & Compliance</h2>
                <p className="text-gray-600 text-center mb-12">
                    Our commitment to quality and excellence is backed by industry leading certifications
                </p>

                <div className="grid md:grid-cols-4 gap-6">
                    {certs.map((cert, index) => {
                        const Icon = cert.icon
                        return (
                            <div key={index} className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                                <div className="flex justify-center mb-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-red-600 text-white">
                                        <Icon size={32} />
                                    </div>
                                </div>
                                <h3 className="font-semibold text-gray-800 mb-2">{cert.title}</h3>
                                <p className="text-sm text-gray-600">{cert.subtitle}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
