import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Container } from '../ui/Container';

export default function GlobalOffices() {
    const offices = [
        {
            id: 1,
            name: "Headquarters - United States",
            address: "4296 SE Olympic Court Bondurant, IA 50035, USA",
            phone: "+1-515-633-4991",
            email: "latam@presenceglobalexports.com",
            hours: "Mon-Fri: 8:30 AM - 5:30 PM EST",
            isPrimary: true,
            color: "red"
        },
        {
            id: 2,
            name: "European Office - Germany",
            address: "Edisonstraße 3, 85716 Unterschleißheim, Germany",
            phone: "+49 89 122 4457",
            email: "europe@presenceglobalexports.com",
            hours: "Mon-Fri: 9:00 AM - 6:00 PM CET",
            isPrimary: false,
            color: "slate"
        },
        {
            id: 3,
            name: "Asia Pacific Office - Singapore",
            address: "22 Sin Ming Lane, #06-76, Singapore 573969",
            phone: "+65-6536-1438",
            email: "apac@presenceglobalexports.com",
            hours: "Mon-Fri: 9:00 AM - 6:00 PM SGT",
            isPrimary: false,
            color: "slate"
        },
        {
            id: 4,
            name: "Latin America Office - Brazil",
            address: "Av. Paulista 1191, 6th Floor, SP 01310-200 Brazil",
            phone: "+55 11 2495 7000",
            email: "latam@presenceglobalexports.com",
            hours: "Mon-Fri: 9:00 AM - 6:00 PM BRT",
            isPrimary: false,
            color: "slate"
        },
        {
            id: 5,
            name: "Middle East Office - UAE",
            address: "Dubai Internet City, Building 14, Dubai, UAE",
            phone: "+971 4 214 6800",
            email: "mena@presenceglobalexports.com",
            hours: "Sun-Thu: 9:00 AM - 6:00 PM GST",
            isPrimary: false,
            color: "slate"
        }
    ];

    return (
        <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
            {/* Header Section */}
            <div className="bg-slate-900 text-white py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <MapPin className="w-5 h-5 text-red-500" />
                        <span className="text-red-500 font-semibold">Global Presence</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Locations Worldwide</h1>
                    <p className="text-slate-300 max-w-2xl mx-auto">
                        With offices strategically located around the globe, we're always close by to provide you with exceptional service and support.
                    </p>
                </div>
            </div>

            {/* Map Section */}
            <div className="max-w-6xl mx-auto px-4 -mt-8 mb-12">
                <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl p-8 md:p-16 relative overflow-hidden">
                    {/* Decorative dots representing office locations */}
                    <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-red-500 rounded-full shadow-lg animate-pulse"></div>
                    <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-red-400 rounded-full"></div>
                    <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-red-400 rounded-full"></div>
                    <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
                    <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-red-400 rounded-full"></div>
                    <div className="absolute top-2/3 left-1/2 w-2 h-2 bg-red-400 rounded-full"></div>

                    {/* Legend */}
                    <div className="absolute bottom-6 right-6 bg-white rounded-lg shadow-md px-4 py-3 flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-red-500" />
                            <span className="text-slate-600">Headquarters</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-slate-600" />
                            <span className="text-slate-600">Regional Office</span>
                        </div>
                    </div>

                    <div className="h-64"></div>
                </div>
            </div>

            {/* Contact Section */}
            <Container className="pb-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-3">Contact Our Offices</h2>
                    <p className="text-slate-600">
                        Get in touch with the office nearest to you for personalized support and service.
                    </p>
                </div>

                {/* Office Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {offices.map((office) => (
                        <div
                            key={office.id}
                            className={`bg-white rounded-xl shadow-lg overflow-hidden transition-transform ${office.isPrimary ? 'border-2 border-red-500' : 'border border-slate-200'
                                }`}
                        >
                            {/* Card Header */}
                            <div className={`p-6 ${office.isPrimary ? 'bg-red-500' : 'bg-slate-700'}`}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-white font-semibold text-sm">{office.name}</h3>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 space-y-4">
                                <div className="flex gap-3">
                                    <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                    <p className="text-sm text-slate-600">{office.address}</p>
                                </div>

                                <div className="flex gap-3">
                                    <Phone className="w-5 h-5 text-slate-400 shrink-0" />
                                    <p className="text-sm text-slate-600">{office.phone}</p>
                                </div>

                                <div className="flex gap-3">
                                    <Mail className="w-5 h-5 text-slate-400 shrink-0" />
                                    <p className="text-sm text-slate-600 break-all">{office.email}</p>
                                </div>

                                <div className="flex gap-3">
                                    <Clock className="w-5 h-5 text-slate-400 shrink-0" />
                                    <p className="text-sm text-slate-600">{office.hours}</p>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="px-6 pb-6">
                                <button
                                    className={`w-full py-3 rounded-lg font-medium text-sm transition-colors ${office.isPrimary
                                        ? 'bg-red-500 hover:bg-red-600 text-white'
                                        : 'bg-slate-700 hover:bg-slate-800 text-white'
                                        }`}
                                >
                                    Get Directions →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}