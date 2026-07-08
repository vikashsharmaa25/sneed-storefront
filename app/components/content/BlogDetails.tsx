import React from "react";
import { Link } from "react-router";
import { ArrowLeft, Calendar, Clock, Bookmark, Tag, Cpu, ExternalLink } from "lucide-react";
import { Container } from "../ui/Container";
import { formatContentToHtml } from "~/lib/utils";
import ContentRecommendations from "./ContentRecommendations";

interface BlogDetailsProps {
    blog: {
        id: number;
        product_id?: number;
        product_name?: string;
        industry_id?: number;
        industry_name?: string;
        file_url?: string;
        blog_url?: string;
        redirect_url?: string;
        title: string;
        content: string;
        excerpt?: string;
    };
    recommendations?: any[];
}

export default function BlogDetails({ blog, recommendations = [] }: BlogDetailsProps) {
    if (!blog) {
        return (
            <div className="py-20 text-center text-gray-500">
                Blog post not found.
            </div>
        );
    }

    // Estimate reading time based on content length
    const wordsPerMinute = 200;
    const cleanContent = blog.content ? blog.content.replace(/<[^>]*>/g, "") : "";
    const wordCount = cleanContent.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

    return (
        <div className="bg-gray-50 min-h-screen pb-16">
            {/* Breadcrumbs / Header */}
            <header className="bg-white border-b border-gray-200 py-4 shadow-sm">
                <Container>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <nav className="flex items-center gap-2 text-sm text-gray-600">
                            <Link to="/" className="hover:text-red-800 transition-colors">Home</Link>
                            <span>/</span>
                            <span className="text-gray-400">Blogs</span>
                            <span>/</span>
                            <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-[400px]">
                                {blog.title}
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
                        {/* Main Content Area */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6 sm:p-10">
                                {/* Category/Badge & Meta */}
                                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
                                    <span className="bg-red-50 text-red-800 font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                                        Blog
                                    </span>
                                    {blog.industry_name && (
                                        <span className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                                            <Tag className="w-3 h-3" />
                                            {blog.industry_name}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1 ml-auto sm:ml-0">
                                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                                        {readTime} min read
                                    </span>
                                </div>

                                {/* Title */}
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
                                    {blog.title}
                                </h1>

                                {/* Featured Image */}
                                {blog.file_url && (
                                    <div className="rounded-xl overflow-hidden mb-8 aspect-video bg-gray-100 border border-gray-150">
                                        <img
                                            src={blog.file_url}
                                            alt={blog.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                {/* Excerpt */}
                                {blog.excerpt && (
                                    <div className="border-l-4 border-red-800 bg-red-50/50 p-4 rounded-r-lg mb-8">
                                        <p className="text-gray-700 text-sm sm:text-base italic leading-relaxed">
                                            {blog.excerpt}
                                        </p>
                                    </div>
                                )}

                                {/* Body Content */}
                                <article
                                    className="prose max-w-none text-gray-800 leading-relaxed
                                               [&_p]:mb-5 [&_p]:text-gray-755 [&_p]:leading-7 [&_p]:text-base sm:[&_p]:text-[17px]
                                               [&_h1]:text-3xl [&_h1]:font-extrabold [&_h1]:text-gray-900 [&_h1]:mt-8 [&_h1]:mb-4
                                               [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:border-b [&_h2]:pb-2 [&_h2]:border-gray-100
                                               [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-3
                                               [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2
                                               [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2
                                               [&_li]:text-gray-700 [&_li]:leading-relaxed
                                               [&_blockquote]:border-l-4 [&_blockquote]:border-red-800 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-6 [&_blockquote]:text-gray-600 [&_blockquote]:bg-gray-50 [&_blockquote]:py-2 [&_blockquote]:pr-2
                                               [&_a]:text-red-800 [&_a]:underline hover:[&_a]:text-red-955"
                                    dangerouslySetInnerHTML={{ __html: formatContentToHtml(blog.content) }}
                                />
                            </div>
                        </div>

                        {/* Sidebar Column */}
                        <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
                            {/* Product Callout Card */}
                            {blog.product_id && blog.product_name && (
                                <div className="bg-linear-to-br from-red-900 to-red-950 text-white rounded-2xl p-6 shadow-md border border-red-800 relative overflow-hidden">
                                    {/* Abstract background elements */}
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-800 rounded-full blur-2xl opacity-40"></div>
                                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-red-700 rounded-full blur-xl opacity-20"></div>

                                    <div className="relative z-10 space-y-4">
                                        <div className="inline-flex items-center gap-1.5 bg-red-800 text-red-100 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                            <Cpu className="w-3.5 h-3.5" />
                                            Featured Product
                                        </div>
                                        <h3 className="text-lg font-bold leading-tight">
                                            {blog.product_name}
                                        </h3>
                                        <p className="text-red-200 text-sm leading-relaxed">
                                            Learn more about how this coding solution can benefit your production facility.
                                        </p>
                                        <div className="pt-2">
                                            <Link
                                                to={`/products/${blog.product_id}`}
                                                className="w-full inline-flex items-center justify-center gap-2 bg-white text-red-900 font-bold px-4 py-2.5 rounded-xl hover:bg-red-50 active:scale-[0.98] transition-all text-sm shadow-sm"
                                            >
                                                View Product details
                                                <ExternalLink className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Post Info Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
                                <h3 className="text-gray-900 font-bold text-base border-b border-gray-100 pb-2">
                                    About This Post
                                </h3>
                                <div className="space-y-3 text-sm text-gray-600">
                                    {blog.industry_name && (
                                        <div className="flex justify-between items-center py-1 border-b border-gray-55 pb-1">
                                            <span className="text-gray-400">Industry</span>
                                            <span className="font-medium text-gray-800 capitalize">
                                                {blog.industry_name}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center py-1 border-b border-gray-55 pb-1">
                                        <span className="text-gray-400">Read Time</span>
                                        <span className="font-medium text-gray-800">
                                            ~{readTime} minutes
                                        </span>
                                    </div>
                                    {blog.redirect_url && (
                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-400">Original Link</span>
                                            <a
                                                href={blog.redirect_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-medium text-red-800 hover:underline inline-flex items-center gap-0.5"
                                            >
                                                Visit <ExternalLink className="w-3 h-3" />
                                            </a>
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
