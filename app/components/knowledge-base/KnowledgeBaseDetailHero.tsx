import React from 'react';
import { Link } from 'react-router';
import { ChevronRight, Code2, Layers, User, Clock, Globe } from 'lucide-react';
import { Container } from '~/components/ui/Container';
import type { KnowledgeBaseItem } from '~/lib/api/knowledge-base.server';

interface KnowledgeBaseDetailHeroProps {
    item: KnowledgeBaseItem;
}

function formatDate(dateString: string) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function KnowledgeBaseDetailHero({ item }: KnowledgeBaseDetailHeroProps) {
    return (
        <div
            className="relative overflow-hidden"
            style={{ backgroundColor: '#1a1c20' }}
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

            <Container className="relative z-10 py-12">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link to="/knowledge-base" className="hover:text-white transition-colors">Knowledge Base</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-white font-medium line-clamp-1">{item.title}</span>
                </nav>

                {/* Category + Language badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {item.category && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-red-600/20 text-red-300 border border-red-600/30 px-3 py-1 rounded-full">
                            <Layers className="w-3 h-3" />
                            {item.category}
                        </span>
                    )}
                    {item.language && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-blue-600/20 text-blue-300 border border-blue-600/30 px-3 py-1 rounded-full">
                            <Code2 className="w-3 h-3" />
                            {item.language}
                        </span>
                    )}
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight max-w-3xl">
                    {item.title}
                </h1>

                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-5 text-sm text-gray-400">
                    {item.author && (
                        <span className="flex items-center gap-1.5">
                            <User className="w-4 h-4" />
                            {item.author}
                        </span>
                    )}
                    {item.last_updated && (
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {formatDate(item.last_updated)}
                        </span>
                    )}
                    {item.region && item.region.length > 0 && (
                        <span className="flex items-center gap-1.5">
                            <Globe className="w-4 h-4" />
                            {item.region.join(', ')}
                        </span>
                    )}
                </div>
            </Container>
        </div>
    );
}
