import React from 'react';
import { Link } from 'react-router';
import { BookOpen, ChevronRight, Search } from 'lucide-react';
import { Container } from '~/components/ui/Container';

interface KnowledgeBaseHeroProps {
    search: string;
    onSearchChange: (value: string) => void;
}

export function KnowledgeBaseHero({ search, onSearchChange }: KnowledgeBaseHeroProps) {
    return (
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
                        <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <nav className="flex items-center gap-2 text-sm" style={{ color: '#9ca3af' }}>
                        <Link to="/" className="hover:text-white transition-colors" style={{ color: '#9ca3af' }}>Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="font-medium text-white">Knowledge Base</span>
                    </nav>
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 leading-tight tracking-tight">
                    Knowledge Base
                </h1>
                <p className="text-lg max-w-2xl mb-8" style={{ color: '#9ca3af' }}>
                    Explore our library of technical guides, solutions, and coding best practices for industrial applications.
                </p>

                <div className="max-w-2xl relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by keywords, tags, category, or title..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-gray-900 border border-white/20 focus:border-red-500 rounded-xl py-3.5 pl-12 pr-4 outline-none transition-all duration-200 placeholder-gray-400 focus:placeholder-gray-500 shadow-lg text-sm md:text-base focus:ring-2 focus:ring-red-500/20"
                    />
                </div>
            </Container>
        </div>
    );
}
