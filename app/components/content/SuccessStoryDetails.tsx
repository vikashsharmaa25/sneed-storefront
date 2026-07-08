import React from "react";
import { Link } from "react-router";
import { ArrowLeft, Calendar, User, Quote, Cpu, Tag, ExternalLink, Award } from "lucide-react";
import { Container } from "../ui/Container";
import { formatContentToHtml } from "~/lib/utils";
import ContentRecommendations from "./ContentRecommendations";

interface SuccessStoryDetailsProps {
    story: {
        id: number;
        industry_id?: number;
        industry_name?: string;
        product_id?: number;
        product_name?: string;
        category_id?: number;
        category_name?: string;
        file_url?: string;
        title: string;
        excerpt?: string;
        author?: string;
        client_testimonial?: string;
        content: string;
        status?: string;
    };
    recommendations?: any[];
}

export default function SuccessStoryDetails({ story, recommendations = [] }: SuccessStoryDetailsProps) {
    if (!story) {
        return (
            <div className="py-20 text-center text-gray-500">
                Success story not found.
            </div>
        );
    }

    const htmlContent = formatContentToHtml(story.content);

    // Format testimonial if it exists
    const testimonialParts = story.client_testimonial ? story.client_testimonial.split('\n\n— ') : [];
    const quoteText = testimonialParts[0] ? testimonialParts[0].replace(/^“|”$/g, '') : '';
    const quoteAuthor = testimonialParts[1] ? `— ${testimonialParts[1]}` : '';

    return (
        <div className="bg-gray-50 min-h-screen pb-16">
            {/* Header/Breadcrumbs */}
            <header className="bg-white border-b border-gray-200 py-4 shadow-sm">
                <Container>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <nav className="flex items-center gap-2 text-sm text-gray-600">
                            <Link to="/" className="hover:text-red-800 transition-colors">Home</Link>
                            <span>/</span>
                            <span className="text-gray-400">Success Stories</span>
                            <span>/</span>
                            <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-[400px]">
                                {story.title}
                            </span>
                        </nav>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-red-800 hover:text-red-950 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </Link>
                    </div>
                </Container>
            </header>

            <main className="py-10">
                <Container>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content (2 Columns) */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6 sm:p-10">
                                {/* Badge & Meta */}
                                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
                                    <span className="bg-green-50 text-green-800 font-semibold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                                        <Award className="w-3.5 h-3.5" />
                                        Success Story
                                    </span>
                                    {story.industry_name && (
                                        <span className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full capitalize">
                                            <Tag className="w-3 h-3" />
                                            {story.industry_name}
                                        </span>
                                    )}
                                    {story.author && (
                                        <span className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                                            <User className="w-3.5 h-3.5 text-gray-400" />
                                            {story.author}
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
                                    {story.title}
                                </h1>

                                {/* Featured Image */}
                                {story.file_url && (
                                    <div className="rounded-xl overflow-hidden mb-8 aspect-video bg-gray-100 border border-gray-150">
                                        <img
                                            src={story.file_url}
                                            alt={story.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                {/* Excerpt */}
                                {story.excerpt && (
                                    <div className="border-l-4 border-green-700 bg-green-50/40 p-5 rounded-r-lg mb-8">
                                        <h3 className="text-sm font-bold uppercase text-green-900 mb-1 tracking-wider">Executive Summary</h3>
                                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                            {story.excerpt}
                                        </p>
                                    </div>
                                )}

                                {/* Testimonial (if available) */}
                                {story.client_testimonial && (
                                    <div className="bg-red-50/30 border-l-4 border-red-800 p-6 rounded-r-xl my-8 relative overflow-hidden">
                                        <Quote className="absolute right-4 bottom-2 w-24 h-24 text-red-800/5 z-0 pointer-events-none" />
                                        <div className="relative z-10">
                                            <p className="text-gray-800 text-base sm:text-lg italic font-medium leading-relaxed mb-3">
                                                “{quoteText}”
                                            </p>
                                            {quoteAuthor && (
                                                <p className="text-red-900 font-bold text-sm text-right">
                                                    {quoteAuthor}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Content Body */}
                                <div
                                    className="prose max-w-none text-gray-800"
                                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                                />
                            </div>
                        </div>

                        {/* Sidebar Column */}
                        <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
                            {/* Featured Product Card */}
                            {story.product_id && story.product_name && (
                                <div className="bg-linear-to-br from-red-900 to-red-950 text-white rounded-2xl p-6 shadow-md border border-red-800 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-800 rounded-full blur-2xl opacity-40"></div>
                                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-red-700 rounded-full blur-xl opacity-20"></div>

                                    <div className="relative z-10 space-y-4">
                                        <div className="inline-flex items-center gap-1.5 bg-red-800 text-red-100 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                            <Cpu className="w-3.5 h-3.5" />
                                            Equipment Used
                                        </div>
                                        <h3 className="text-lg font-bold leading-tight">
                                            {story.product_name}
                                        </h3>
                                        <p className="text-red-200 text-sm leading-relaxed">
                                            Discover technical specifications and features for this printer.
                                        </p>
                                        <div className="pt-2">
                                            <Link
                                                to={`/products/${story.product_id}`}
                                                className="w-full inline-flex items-center justify-center gap-2 bg-white text-red-900 font-bold px-4 py-2.5 rounded-xl hover:bg-red-50 active:scale-[0.98] transition-all text-sm shadow-sm"
                                            >
                                                Explore Coder
                                                <ExternalLink className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Story Quick Info */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
                                <h3 className="text-gray-900 font-bold text-base border-b border-gray-100 pb-2">
                                    Project Profile
                                </h3>
                                <div className="space-y-3 text-sm text-gray-600">
                                    {story.industry_name && (
                                        <div className="flex justify-between items-center py-1 border-b border-gray-50">
                                            <span className="text-gray-400">Target Industry</span>
                                            <span className="font-medium text-gray-800 capitalize">
                                                {story.industry_name}
                                            </span>
                                        </div>
                                    )}
                                    {story.category_name && (
                                        <div className="flex justify-between items-center py-1 border-b border-gray-50">
                                            <span className="text-gray-400">Application</span>
                                            <span className="font-medium text-gray-800">
                                                {story.category_name}
                                            </span>
                                        </div>
                                    )}
                                    {story.status && (
                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-400">Status</span>
                                            <span className="inline-flex items-center bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded font-semibold capitalize">
                                                {story.status}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </main>
            <ContentRecommendations recommendations={recommendations} />
        </div>
    );
}
