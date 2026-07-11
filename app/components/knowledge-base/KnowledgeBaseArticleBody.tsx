import React from 'react';
import { Link } from 'react-router';
import { Tag, Info, AlertCircle, Lightbulb, FileText, ArrowLeft } from 'lucide-react';
import type { KnowledgeBaseItem } from '~/lib/api/knowledge-base.server';

interface KnowledgeBaseArticleBodyProps {
    item: KnowledgeBaseItem;
}

function SolutionList({ solution }: { solution: string[] | null | string }) {
    if (!solution) return null;

    if (typeof solution === 'string') {
        return <p className="text-gray-700 text-sm leading-relaxed">{solution}</p>;
    }

    if (Array.isArray(solution) && solution.length > 0) {
        return (
            <ul className="space-y-3">
                {solution.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center mt-0.5">
                            {idx + 1}
                        </span>
                        <span className="text-gray-700 text-sm leading-relaxed">{step}</span>
                    </li>
                ))}
            </ul>
        );
    }

    return null;
}

export function KnowledgeBaseArticleBody({ item }: KnowledgeBaseArticleBodyProps) {
    return (
        <article className="flex-1 min-w-0 space-y-8">
            {/* Summary */}
            {item.summary && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-3">
                        <Info className="w-5 h-5 text-blue-500" />
                        <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">Summary</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{item.summary}</p>
                </div>
            )}

            {/* Problem */}
            {item.problem && (
                <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="w-5 h-5 text-orange-500" />
                        <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">Problem</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{item.problem}</p>
                </div>
            )}

            {/* Solution */}
            {item.solution && (
                <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Lightbulb className="w-5 h-5 text-green-500" />
                        <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">Solution</h2>
                    </div>
                    <SolutionList solution={item.solution} />
                </div>
            )}

            {/* Related Info */}
            {item.related_info && item.related_info.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-5 h-5 text-purple-500" />
                        <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">Related Information</h2>
                    </div>
                    <ul className="space-y-2">
                        {item.related_info.map((info, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                                {info}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-1 flex items-center gap-1">
                        <Tag className="w-3 h-3" /> Tags:
                    </span>
                    {item.tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium hover:bg-red-50 hover:text-red-700 transition-colors cursor-default"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Back to listing */}
            <div className="pt-4">
                <Link
                    to="/knowledge-base"
                    className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold text-sm transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Knowledge Base
                </Link>
            </div>
        </article>
    );
}
