"use client"

import type React from "react"
import { useState } from "react"
import { Container } from "../ui/Container"

export function ContactSection() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        industry: "",
        message: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // console.log("Form submitted:", formData)
        // Reset form
        setFormData({
            fullName: "",
            email: "",
            phone: "",
            company: "",
            industry: "",
            message: "",
        })
    }

    return (
        <div className="py-12 px-4 bg-gray-50">
            <Container className="grid md:grid-cols-2 gap-16">
                {/* Get in Touch */}
                <div>
                    <h3 className="text-2xl font-bold mb-8">Get In Touch</h3>

                    <div className="flex flex-col space-y-8">
                        {/* Phone */}
                        <div className="flex gap-4">
                            <div className="shrink-0">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white text-xl font-bold">
                                    ☎
                                </div>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Phone</p>
                                <p className="text-red-600 font-semibold">1-833-926-3464</p>
                                <p className="text-sm text-gray-600">Toll-Free USA & Canada</p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex gap-4">
                            <div className="shrink-0">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white text-xl font-bold">
                                    ✉
                                </div>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Email</p>
                                <p className="text-red-600 font-semibold">info@sneedcodingsolutions.com</p>
                                <p className="text-sm text-gray-600">We'll respond within 24 hours</p>
                            </div>
                        </div>

                        {/* Headquarters */}
                        <div className="flex gap-4">
                            <div className="shrink-0">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white text-xl font-bold">
                                    📍
                                </div>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Headquarters</p>
                                <p className="text-sm text-gray-600">
                                    1234 Industrial Parkway
                                    <br />
                                    Suite 500
                                    <br />
                                    Chicago, IL 60601
                                    <br />
                                    United States
                                </p>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="flex gap-4">
                            <div className="shrink-0">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white text-xl font-bold">
                                    🕐
                                </div>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Business Hours</p>
                                <p className="text-sm text-gray-600">
                                    Monday - Friday: 8:00 AM - 6:00 PM CST
                                    <br />
                                    Saturday: 9:00 AM - 2:00 PM CST
                                    <br />
                                    Sunday: Closed
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Send us a Message Form */}
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">
                                    Full Name <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">
                                    Email Address <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="john@company.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="+1 (555) 123-4567"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Company Name</label>
                                <input
                                    type="text"
                                    placeholder="Your Company"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Industry</label>
                            <input
                                type="text"
                                placeholder=""
                                value={formData.industry}
                                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                                Message <span className="text-red-600">*</span>
                            </label>
                            <textarea
                                placeholder="Tell us about your coding requirements..."
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={5}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-full flex items-center justify-center gap-2 transition-colors"
                        >
                            ✈ Send Message
                        </button>
                    </form>
                </div>
            </Container>
        </div>
    )
}
