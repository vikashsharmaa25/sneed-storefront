import React, { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { BookOpen, FileText, TrendingUp, Calendar, Clock, ChevronRight, CheckCircle } from 'lucide-react';
import { Container } from '../ui/Container';

interface SuccessStoriesSectionProps {
    successStories?: any[];
    blogs?: any[];
    seoArticles?: any[];
    loading?: boolean;
}

const SuccessStoriesSection: React.FC<SuccessStoriesSectionProps> = ({
    successStories,
    blogs,
    seoArticles,
    loading = false
}) => {
    const [selectedIndustry, setSelectedIndustry] = useState('all');
    const [selectedTab, setSelectedTab] = useState<'blogs' | 'success-stories' | 'seo-articles'>('blogs');

    const stories = useMemo(() => {
        let data: any[] = [];

        switch (selectedTab) {
            case 'blogs':
                data = blogs || [];
                break;
            case 'success-stories':
                data = successStories || [];
                break;
            case 'seo-articles':
                data = seoArticles || [];
                break;
        }

        // Transform API data to match expected format
        return data.map((item, index) => {
            const id = item.id || index + 1;
            return {
                id,
                type: selectedTab === 'blogs' ? 'blog' : item.type || 'success-story',
                category: item.industry_name || item.category || 'general',
                image: item.file_url || item.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=250&fit=crop',
                date: item.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                readTime: item.read_time || item.readTime || 5,
                title: item.title || 'Untitled Story',
                description: item.excerpt || item.description || 'No description available',
                highlights: item.highlights || [],
                blogUrl: item.blog_url,
                redirectUrl: item.redirect_url,
                content: item.content,
                detailUrl: `/${selectedTab}/${id}`
            };
        });
    }, [selectedTab, successStories, blogs, seoArticles]);

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'case-study': return 'bg-red-800';
            case 'success-story': return 'bg-red-800';
            default: return 'bg-red-800';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'case-study': return 'Case Study';
            case 'success-story': return 'Success Story';
            default: return 'Story';
        }
    };

    const filteredStories = selectedIndustry === 'all'
        ? stories
        : stories.filter(story => story.category === selectedIndustry);

    // Skeleton Loader Component
    const SkeletonCard = () => (
        <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col animate-pulse">
            {/* Image Skeleton */}
            <div className="relative h-48 bg-gray-200">
                <div className="absolute top-3 left-3 bg-gray-300 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">
                    Loading...
                </div>
            </div>

            {/* Content Skeleton */}
            <div className="p-5 flex-1 flex flex-col">
                {/* Meta Skeleton */}
                <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-gray-300 rounded"></div>
                        <div className="w-16 h-3 bg-gray-300 rounded"></div>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-gray-300 rounded"></div>
                        <div className="w-12 h-3 bg-gray-300 rounded"></div>
                    </div>
                </div>

                {/* Title Skeleton */}
                <div className="w-full h-6 bg-gray-300 rounded mb-3"></div>
                <div className="w-3/4 h-6 bg-gray-300 rounded mb-4"></div>

                {/* Description Skeleton */}
                <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-5/6 h-4 bg-gray-300 rounded mb-4"></div>

                {/* Highlights Skeleton */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-gray-300 rounded mt-0.5"></div>
                        <div className="w-3/4 h-3 bg-gray-300 rounded"></div>
                    </div>
                    <div className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-gray-300 rounded mt-0.5"></div>
                        <div className="w-2/3 h-3 bg-gray-300 rounded"></div>
                    </div>
                </div>

                {/* Read More Skeleton */}
                <div className="mt-auto">
                    <div className="w-24 h-4 bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="px-8 py-16">
            <Container>
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-red-50 title-heading px-4 py-2 rounded-full mb-6 border border-red-200">
                        <BookOpen className="w-4 h-4" />
                        <span className="font-semibold text-sm">Customer Success Stories</span>
                    </div>
                </div>

                {/* Content Tabs */}
                <div className="mb-8">
                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => setSelectedTab('blogs')}
                            className={`px-6 py-3 font-medium transition-colors duration-200 border-b-2 ${selectedTab === 'blogs'
                                ? 'border-red-800 title-heading'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Blogs
                        </button>
                        <button
                            onClick={() => setSelectedTab('seo-articles')}
                            className={`px-6 py-3 font-medium transition-colors duration-200 border-b-2 ${selectedTab === 'seo-articles'
                                ? 'border-red-800 title-heading'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Articles
                        </button>
                        <button
                            onClick={() => setSelectedTab('success-stories')}
                            className={`px-6 py-3 font-medium transition-colors duration-200 border-b-2 ${selectedTab === 'success-stories'
                                ? 'border-red-800 title-heading'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Success Stories
                        </button>
                    </div>
                </div>

                {/* Stories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        // Show skeleton cards when loading
                        Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
                    ) : filteredStories.length > 0 ? (
                        // Show actual stories when loaded
                        filteredStories.map((story) => (
                            <div
                                key={story.id}
                                className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transition-all duration-300 flex flex-col"
                            >
                                {/* Image */}
                                <Link to={story.detailUrl} className="relative h-48 overflow-hidden block">
                                    <img
                                        src={story.image}
                                        alt={story.title}
                                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className={`absolute top-3 left-3 ${getTypeColor(story.type)} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                                        {getTypeLabel(story.type)}
                                    </div>
                                </Link>

                                {/* Content */}
                                <div className="p-5 flex-1 flex flex-col">
                                    {/* Meta */}
                                    <div className="flex items-center gap-4 text-gray-500 text-xs mb-3">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            <span>{story.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            <span>{story.readTime} min read</span>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-gray-900 font-bold text-base mb-3 line-clamp-2 hover:text-red-800 transition-colors">
                                        <Link to={story.detailUrl}>
                                            {story.title}
                                        </Link>
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {story.description}
                                    </p>

                                    {/* Highlights */}
                                    <div className="space-y-2 mb-4">
                                        {story.highlights.map((highlight: any, index: any) => (
                                            <div key={index} className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                                <span className="text-gray-700 text-xs">{highlight}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Read More Link */}
                                    <div className="mt-auto">
                                        <Link
                                            to={story.detailUrl}
                                            className="inline-flex items-center gap-1 title-heading hover:text-red-900 font-semibold text-sm transition-colors duration-200"
                                        >
                                            Read Full Story
                                            <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500">No stories available at the moment.</p>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default SuccessStoriesSection;