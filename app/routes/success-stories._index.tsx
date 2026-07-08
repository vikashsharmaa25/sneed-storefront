import React from 'react';
import { useLoaderData, Link } from 'react-router';
import { Container } from '~/components/ui/Container';
import { getSuccessStories } from '~/lib/api/content-management';
import { Calendar, User, BookOpen, ChevronRight, Tag, Award } from 'lucide-react';

export async function loader() {
    try {
        const successStories = await getSuccessStories();
        return { successStories: successStories || [] };
    } catch (error) {
        console.error("Failed to load success stories:", error);
        return { successStories: [] };
    }
}

export default function SuccessStoriesRoute() {
    const { successStories } = useLoaderData<typeof loader>();

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200 py-4 shadow-sm">
                <Container>
                    <nav className="flex items-center gap-2 text-sm text-gray-600">
                        <Link to="/" className="hover:text-red-800 transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">Success Stories</span>
                    </nav>
                </Container>
            </div>

            {/* Grid Area */}
            <div className="py-12">
                <Container>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
                        Success Stories
                    </h1>
                    {successStories.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {successStories.map((story: any) => {
                                return (
                                    <div
                                        key={story.id}
                                        className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col group"
                                    >
                                        {/* Image */}
                                        <Link to={`/success-stories/${story.id}`} className="relative h-48 overflow-hidden block bg-gray-50 border-b border-gray-100">
                                            <img
                                                src={story.file_url || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=400&fit=crop'}
                                                alt={story.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 p-4"
                                            />
                                            <div className="absolute top-3 left-3 bg-red-800 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                                                Success Story
                                            </div>
                                        </Link>

                                        {/* Content */}
                                        <div className="p-6 flex-1 flex flex-col">
                                            {/* Meta */}
                                            <div className="flex items-center gap-4 text-gray-500 text-xs mb-3">
                                                {story.industry_name && (
                                                    <span className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                                                        <Tag className="w-3 h-3" />
                                                        {story.industry_name}
                                                    </span>
                                                )}
                                                {story.author && (
                                                    <div className="flex items-center gap-1 ml-auto">
                                                        <User className="w-3 h-3" />
                                                        <span>By {story.author}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-gray-900 font-bold text-lg mb-3 line-clamp-2 group-hover:text-red-800 transition-colors">
                                                <Link to={`/success-stories/${story.id}`}>
                                                    {story.title}
                                                </Link>
                                            </h3>

                                            {/* Description */}
                                            <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                                                {story.excerpt || story.content?.replace(/<[^>]*>/g, "").substring(0, 150) || "No description available"}
                                            </p>

                                            {/* Read More */}
                                            <div className="mt-auto pt-4 border-t border-gray-50">
                                                <Link
                                                    to={`/success-stories/${story.id}`}
                                                    className="inline-flex items-center gap-1 text-red-800 hover:text-red-950 font-bold text-sm transition-colors duration-200"
                                                >
                                                    Read Full Story
                                                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                            <Award className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-gray-900 mb-2">No Success Stories Found</h3>
                            <p className="text-gray-500">We couldn't find any success stories at this moment. Please check back later.</p>
                        </div>
                    )}
                </Container>
            </div>
        </div>
    );
}
