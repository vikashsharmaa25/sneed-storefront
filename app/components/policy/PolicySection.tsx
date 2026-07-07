import React from 'react';
import { Shield, AlertCircle, FileText, Award } from 'lucide-react';
import { Container } from '../ui/Container';

const PolicySection = ({ icon: Icon, title, date, children, bgColor = "section-red" }: any) => {
    return (
        <div className="mb-8">
            <div className={`${bgColor} text-white p-4 rounded-t-lg flex items-center gap-3`}>
                <div className="bg-white bg-opacity-20 p-2 rounded">
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-bold">{title}</h2>
                    <p className="text-sm opacity-90">{date}</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-b-lg shadow-lg">
                {children}
            </div>
        </div>
    );
};

const PolicyItem = ({ icon: Icon, title, content }: any) => {
    return (
        <div className="mb-6 last:mb-0">
            <div className="flex items-start gap-3">
                <div className="mt-1">
                    <Icon className="w-5 h-5 title-heading" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
                </div>
            </div>
        </div>
    );
};

const PoliciesPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-linear-to-r from-red-800 to-red-900 text-white py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-sm uppercase tracking-wide mb-2 opacity-90">Bread Crumbs</p>
                    <h1 className="text-4xl font-bold mb-4">Our Policies</h1>
                    <p className="text-lg opacity-95">
                        Transparent policies designed to protect your interests and ensure a smooth
                        <br />
                        business relationship.
                    </p>
                </div>
            </div>

            {/* Commitment Section */}
            <Container className="py-8">
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-3">Our Commitment to You</h2>
                    <p className="text-gray-600 leading-relaxed">
                        At Bread Crumbs Business, we believe in transparency and clear communication. Our policies are designed
                        to protect both our customers and our business while ensuring fair and ethical practices. Please review the
                        following policies to understand your rights and responsibilities when doing business with us.
                    </p>
                </div>

                {/* Privacy Policy */}
                <PolicySection
                    icon={Shield}
                    title="Privacy Policy"
                    date="Last updated: December 2025"
                    bgColor="section-red"
                >
                    <PolicyItem
                        icon={AlertCircle}
                        title="Information We Collect"
                        content="We collect various types of information to provide and improve our services. This may include basic contact details, billing information, cookies, usage data, and any other information you choose to provide when you contact us or request information about our products and services."
                    />
                    <PolicyItem
                        icon={AlertCircle}
                        title="How We Use Your Information"
                        content="We use the information we collect to provide, maintain, and improve our services, to process your orders and transactions, to send you updates and support messages, and to respond to your comments and questions."
                    />
                    <PolicyItem
                        icon={AlertCircle}
                        title="Data Security"
                        content="We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the internet or method of electronic storage is completely secure."
                    />
                    <PolicyItem
                        icon={AlertCircle}
                        title="Your Rights"
                        content="You have the right to access, update, or delete your personal information at any time. You may also opt out of receiving promotional communications from us by following the instructions in those messages."
                    />
                </PolicySection>

                {/* Return & Refund Policy */}
                <PolicySection
                    icon={FileText}
                    title="Return & Refund Policy"
                    date="Last updated: December 2025"
                    bgColor="section-red"
                >
                    <PolicyItem
                        icon={AlertCircle}
                        title="30 Day Return Policy"
                        content="We offer a 30-day return policy on most products. Items must be returned in original condition with all packaging, manuals, and accessories included. Certain items may be subject to a restocking fee."
                    />
                    <PolicyItem
                        icon={AlertCircle}
                        title="Refund Process"
                        content="Once we receive your returned item and verify its condition, we will process your refund within 7-10 business days. Refunds will be issued to the original payment method used at the time of purchase."
                    />
                    <PolicyItem
                        icon={AlertCircle}
                        title="Exchanges"
                        content="If you need to exchange an item for a different one, we will process your refund within 7-10 business days. Refunds will be issued to the original payment method used at the time of purchase."
                    />
                    <PolicyItem
                        icon={AlertCircle}
                        title="Non-Returnable Items"
                        content="Consumable items such as perishables, personal items that have been opened, and custom/personalized items cannot be returned unless defective. Software licenses that have already been activated."
                    />
                </PolicySection>

                {/* Warranty Policy */}
                <PolicySection
                    icon={Award}
                    title="Warranty Policy"
                    date="Last updated: December 2025"
                    bgColor="section-red"
                >
                    <PolicyItem
                        icon={AlertCircle}
                        title="Standard Warranty"
                        content="All Bread Crumbs Business products come with a standard 1-year manufacturer warranty covering defects in materials and workmanship. Extended warranty options are available for purchase at the time of sale."
                    />
                    <PolicyItem
                        icon={AlertCircle}
                        title="Warranty Coverage"
                        content="Our warranty covers normal use of equipment. It excludes damage due to user negligence, unauthorized modifications, improper installation, or use of non-approved accessories and attachments."
                    />
                    <PolicyItem
                        icon={AlertCircle}
                        title="Warranty Exclusions"
                        content="The warranty does not cover damage caused by misuse, negligence, unauthorized modifications, improper installation, or use of non-approved accessories. Normal wear and tear and cosmetic damage are also not covered."
                    />
                    <PolicyItem
                        icon={AlertCircle}
                        title="Warranty Claims"
                        content="To make a warranty claim, please contact our customer service team with proof of purchase and a description of the issue. We will assess the claim and provide repair, replacement, or refund options as appropriate."
                    />
                </PolicySection>
            </Container>
        </div>
    );
};

export default PoliciesPage;