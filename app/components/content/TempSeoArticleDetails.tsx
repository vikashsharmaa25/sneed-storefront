import React from "react";
import { Link } from "react-router";
import { ArrowLeft, Calendar, FileText } from "lucide-react";
import { Container } from "../ui/Container";
import { formatContentToHtml } from "~/lib/utils";

interface TempSeoArticleDetailsProps {
    article: {
        id: number;
        product_name: string;
        normalized_name: string;
        page_type: string;
        title: string;
        content: string;
        created_at: string;
    };
}

export default function TempSeoArticleDetails({ article }: TempSeoArticleDetailsProps) {
    if (!article) {
        return (
            <div className="py-20 text-center text-gray-500">
                Product article not found.
            </div>
        );
    }

    const htmlContent = formatContentToHtml(article.content);

    return (
        <div className="bg-gray-50 min-h-screen pb-16">
            {/* Header/Breadcrumbs */}
            <header className="bg-white border-b border-gray-200 py-4 shadow-sm">
                <Container>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <nav className="flex items-center gap-2 text-sm text-gray-600">
                            <Link to="/" className="hover:text-red-800 transition-colors">Home</Link>
                            <span>/</span>
                            <Link to="/temp-seo-articles" className="hover:text-red-800 transition-colors">Product Articles</Link>
                            <span>/</span>
                            <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-[400px]">
                                {article.title}
                            </span>
                        </nav>
                        <Link
                            to="/temp-seo-articles"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-red-800 hover:text-red-950 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Product Articles
                        </Link>
                    </div>
                </Container>
            </header>

            <main className="py-10">
                <Container>
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6 sm:p-10">
                            {/* Badges & Meta */}
                            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
                                {article.page_type && (
                                    <span className="bg-blue-50 text-blue-800 font-bold px-3 py-1 rounded-full border border-blue-100 uppercase tracking-wider flex items-center gap-1">
                                        <FileText className="w-3.5 h-3.5" />
                                        {article.page_type}
                                    </span>
                                )}
                                {article.product_name && (
                                    <span className="flex items-center gap-1 bg-gray-150 text-gray-700 px-3 py-1 rounded-full border border-gray-200 font-semibold">
                                        Product: {article.product_name}
                                    </span>
                                )}
                                {article.normalized_name && (
                                    <span className="flex items-center gap-1 bg-gray-150 text-gray-700 px-3 py-1 rounded-full border border-gray-200 font-semibold">
                                        Name: {article.normalized_name}
                                    </span>
                                )}
                                {article.created_at && (
                                    <span className="flex items-center gap-1 text-gray-400 ml-auto sm:ml-0">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {new Date(article.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-8">
                                {article.title}
                            </h1>

                            {/* Content Body */}
                            <article
                                className="prose max-w-none text-gray-800 leading-relaxed
                                           [&_p]:mb-5 [&_p]:text-gray-755 [&_p]:leading-7 [&_p]:text-base sm:[&_p]:text-[17px]
                                           [&_h1]:text-3xl [&_h1]:font-extrabold [&_h1]:text-gray-900 [&_h1]:mt-8 [&_h1]:mb-4
                                           [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:border-b [&_h2]:pb-2 [&_h2]:border-gray-100
                                           [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-3
                                           [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2
                                           [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2
                                           [&_li]:text-gray-700 [&_li]:leading-relaxed [&_li]:list-disc [&_li]:ml-4
                                           [&_blockquote]:border-l-4 [&_blockquote]:border-blue-800 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-6 [&_blockquote]:text-gray-600 [&_blockquote]:bg-gray-50 [&_blockquote]:py-2 [&_blockquote]:pr-2
                                           [&_a]:text-blue-800 [&_a]:underline hover:[&_a]:text-blue-950"
                                dangerouslySetInnerHTML={{ __html: htmlContent }}
                            />
                        </div>
                    </div>
                </Container>
            </main>
        </div>
    );
}
