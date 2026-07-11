import React from 'react';
import { Link } from 'react-router';
import { BookOpen, User, Clock, Code2, Layers, Globe } from 'lucide-react';
import type { KnowledgeBaseItem } from '~/lib/api/knowledge-base.server';

interface KnowledgeBaseSidebarProps {
    item: KnowledgeBaseItem;
    related: KnowledgeBaseItem[];
}

function formatDate(dateString: string) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function KnowledgeBaseSidebar({ item, related }: KnowledgeBaseSidebarProps) {
    return (
        <aside className="w-full lg:w-[300px] space-y-6 shrink-0">
            {/* Article Details Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Article Details</h3>
                <dl className="space-y-3 text-sm">
                    {item.author && (
                        <div>
                            <dt className="text-xs text-gray-400 font-semibold uppercase mb-0.5">Author</dt>
                            <dd className="text-gray-700 font-medium flex items-center gap-1.5">
                                <User className="w-3.5 h-3.5 text-gray-400" />
                                {item.author}
                            </dd>
                        </div>
                    )}
                    {item.category && (
                        <div>
                            <dt className="text-xs text-gray-400 font-semibold uppercase mb-0.5">Category</dt>
                            <dd className="text-gray-700 font-medium flex items-center gap-1.5">
                                <Layers className="w-3.5 h-3.5 text-gray-400" />
                                {item.category}
                            </dd>
                        </div>
                    )}
                    {item.language && (
                        <div>
                            <dt className="text-xs text-gray-400 font-semibold uppercase mb-0.5">Language</dt>
                            <dd className="text-gray-700 font-medium flex items-center gap-1.5">
                                <Code2 className="w-3.5 h-3.5 text-gray-400" />
                                {item.language}
                            </dd>
                        </div>
                    )}
                    {item.region && item.region.length > 0 && (
                        <div>
                            <dt className="text-xs text-gray-400 font-semibold uppercase mb-0.5">Region</dt>
                            <dd className="text-gray-700 font-medium flex items-center gap-1.5">
                                <Globe className="w-3.5 h-3.5 text-gray-400" />
                                {item.region.join(', ')}
                            </dd>
                        </div>
                    )}
                    {item.last_updated && (
                        <div>
                            <dt className="text-xs text-gray-400 font-semibold uppercase mb-0.5">Last Updated</dt>
                            <dd className="text-gray-700 font-medium flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-gray-400" />
                                {formatDate(item.last_updated)}
                            </dd>
                        </div>
                    )}
                </dl>
            </div>

            {/* Related Articles */}
            {related.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Related Articles</h3>
                    <div className="space-y-3">
                        {related.map((rel) => (
                            <Link
                                key={rel.id}
                                to={`/knowledge-base/${rel.id}`}
                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                                    <BookOpen className="w-4 h-4 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                                        {rel.title}
                                    </p>
                                    {rel.last_updated && (
                                        <p className="text-xs text-gray-400 mt-1">{formatDate(rel.last_updated)}</p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Help CTA */}
            <div className="bg-linear-to-br from-red-600 to-red-700 rounded-2xl p-6 text-white shadow-lg shadow-red-200">
                <BookOpen className="w-8 h-8 mb-3 opacity-80" />
                <h3 className="font-bold text-lg mb-2">Need More Help?</h3>
                <p className="text-red-100 text-sm mb-4 leading-relaxed">
                    Can't find what you're looking for? Our experts are ready to assist you.
                </p>
                <Link
                    to="/contact-us"
                    className="inline-block w-full bg-white text-red-700 text-center font-bold py-2.5 rounded-xl hover:bg-red-50 transition-colors text-sm"
                >
                    Contact Us
                </Link>
            </div>
        </aside>
    );
}
