import React from 'react';
import { useLoaderData, Link } from 'react-router';
import { Container } from '~/components/ui/Container';
import { getPerformanceGuarantee } from '~/lib/api/content-management';
import { Shield, Award, ChevronRight } from 'lucide-react';
import { formatContentToHtml } from '~/lib/utils';

export async function loader() {
    try {
        const guaranteeItems = await getPerformanceGuarantee();
        const activeItems = (guaranteeItems || []).filter(item => item.status === 'active');
        return { items: activeItems };
    } catch (error) {
        console.error("Failed to load performance guarantee data:", error);
        return { items: [] };
    }
}

export default function PerformanceGuaranteeRoute() {
    const { items } = useLoaderData<typeof loader>();

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Hero Section */}
            <div
                className="relative overflow-hidden"
                style={{
                    minHeight: 260,
                    backgroundColor: '#1a1c20',
                }}
            >
                {/* Background dot pattern */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                        backgroundSize: '40px 40px',
                    }}
                />
                {/* Gradient overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(to bottom right, rgba(153,27,27,0.3), transparent)',
                    }}
                />

                <Container className="relative z-10 py-16">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#dc2626' }}>
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <nav className="flex items-center gap-2 text-sm" style={{ color: '#9ca3af' }}>
                            <Link to="/" className="hover:text-white transition-colors" style={{ color: '#9ca3af' }}>Home</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="font-medium text-white">Performance Guarantee</span>
                        </nav>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 leading-tight tracking-tight">
                        Performance Guarantee
                    </h1>
                    <p className="text-lg max-w-2xl" style={{ color: '#9ca3af' }}>
                        Learn about our commitment to maximum print quality, equipment longevity, and industrial efficiency.
                    </p>
                </Container>
            </div>

            {/* Content Sections */}
            <div className="py-16">
                <Container>
                    {items.length > 0 ? (
                        <div className="max-w-4xl mx-auto space-y-10">
                            {items.map((item) => {
                                const htmlContent = item.content ? formatContentToHtml(item.content) : '';
                                return (
                                    <div
                                        key={item.id}
                                        className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-8 sm:p-12 hover:shadow-lg transition-all duration-300 relative group"
                                    >
                                        {/* Accent side block */}
                                        <div className="absolute top-0 left-0 w-2 h-full bg-red-650 rounded-l-3xl" />

                                        <div className="space-y-6">
                                            {/* Header */}
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2.5">
                                                    <Award className="w-6 h-6 text-red-600" />
                                                    <span className="text-xs font-bold uppercase tracking-wider text-red-650 bg-red-50 px-3 py-1 rounded-full">
                                                        {item.sectionKey || 'Guarantee'}
                                                    </span>
                                                </div>
                                                {item.title && (
                                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                                                        {item.title}
                                                    </h2>
                                                )}
                                                {item.subtitle && (
                                                    <p className="text-gray-500 font-semibold text-sm sm:text-base">
                                                        {item.subtitle}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Divider */}
                                            <div className="h-px bg-gray-100 w-full" />

                                            {/* Content */}
                                            {item.content && (
                                                <article
                                                    className="prose max-w-none text-gray-850 leading-relaxed
                                                               [&_p]:mb-4 [&_p]:text-gray-700 [&_p]:leading-7 [&_p]:text-base sm:[&_p]:text-[17px]
                                                               [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2
                                                               [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2
                                                               [&_li]:text-gray-700 [&_li]:leading-relaxed"
                                                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-xl mx-auto">
                            <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Guarantee Info Coming Soon</h3>
                            <p className="text-gray-500">Performance guarantee terms and information will be published here shortly.</p>
                        </div>
                    )}
                </Container>
            </div>
        </div>
    );
}
