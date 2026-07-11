import React from 'react';
import { Link } from 'react-router';
import { ChevronRight, Tag, Clock, User, Code2, Layers } from 'lucide-react';
import type { KnowledgeBaseItem } from '~/lib/api/knowledge-base.server';

interface KnowledgeBaseCardProps {
    item: KnowledgeBaseItem;
}

function formatDate(dateString: string) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function KnowledgeBaseCard({ item }: KnowledgeBaseCardProps) {
    return (
        <Link
            to={`/knowledge-base/${item.id}`}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group"
        >
            {/* Top accent stripe */}
            <div className="h-1.5 bg-linear-to-r from-red-600 to-red-400 w-full" />

            <div className="p-6 flex flex-col flex-1">
                {/* Category + Language badges */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                    {item.category && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold bg-red-50 text-red-700 px-2.5 py-1 rounded-full border border-red-100">
                            <Layers className="w-3 h-3" />
                            {item.category}
                        </span>
                    )}
                    {item.language && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-100">
                            <Code2 className="w-3 h-3" />
                            {item.language}
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-gray-900 font-bold text-lg mb-2 line-clamp-2 group-hover:text-red-600 transition-colors leading-snug">
                    {item.title || 'Untitled'}
                </h3>

                {/* Summary */}
                <p className="text-gray-500 text-sm mb-4 line-clamp-3 flex-1">
                    {item.summary || item.problem || 'No summary available.'}
                </p>

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.tags.slice(0, 3).map((tag, i) => (
                            <span
                                key={i}
                                className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded"
                            >
                                <Tag className="w-2.5 h-2.5" />
                                {tag}
                            </span>
                        ))}
                        {item.tags.length > 3 && (
                            <span className="text-xs text-gray-400">+{item.tags.length - 3} more</span>
                        )}
                    </div>
                )}

                {/* Footer: author, date, read link */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                        {item.author && (
                            <span className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {item.author}
                            </span>
                        )}
                        {item.last_updated && (
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatDate(item.last_updated)}
                            </span>
                        )}
                    </div>
                    <span className="text-red-600 font-bold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                </div>
            </div>
        </Link>
    );
}
