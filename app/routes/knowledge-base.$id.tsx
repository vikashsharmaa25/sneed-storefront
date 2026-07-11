import React from 'react';
import { useLoaderData, Link } from 'react-router';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Container } from '~/components/ui/Container';
import { getKnowledgeBaseById, getKnowledgeBase } from '~/lib/api/knowledge-base.server';
import { KnowledgeBaseDetailHero } from '~/components/knowledge-base/KnowledgeBaseDetailHero';
import { KnowledgeBaseArticleBody } from '~/components/knowledge-base/KnowledgeBaseArticleBody';
import { KnowledgeBaseSidebar } from '~/components/knowledge-base/KnowledgeBaseSidebar';

export async function loader({ params }: { params: { id: string } }) {
    try {
        const [item, allResult] = await Promise.all([
            getKnowledgeBaseById(params.id),
            getKnowledgeBase().catch(() => ({ data: [] as any[] })),
        ]);
        const related = (allResult.data || [])
            .filter((i: any) => i.id !== params.id && i.category === item?.category)
            .slice(0, 3);
        return { item, related };
    } catch (error) {
        console.error('Failed to load knowledge base item:', error);
        return { item: null, related: [] };
    }
}

export default function KnowledgeBaseDetailRoute() {
    const { item, related } = useLoaderData<typeof loader>();

    if (!item) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center py-20">
                    <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Article Not Found</h2>
                    <p className="text-gray-500 mb-6">This knowledge base article could not be found.</p>
                    <Link
                        to="/knowledge-base"
                        className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Knowledge Base
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <KnowledgeBaseDetailHero item={item} />

            <Container className="py-12">
                <div className="flex flex-col lg:flex-row gap-10">
                    <KnowledgeBaseArticleBody item={item} />
                    <KnowledgeBaseSidebar item={item} related={related} />
                </div>
            </Container>
        </div>
    );
}
