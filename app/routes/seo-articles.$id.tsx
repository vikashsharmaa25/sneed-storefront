import { useLoaderData, Await, useParams } from 'react-router';
import { Suspense } from 'react';
import SeoArticleDetails from '~/components/content/SeoArticleDetails';
import { getSeoArticleById, getContentRecommendations } from '~/lib/api/content-management';

export async function loader({ params }: { params: { id: any } }) {
    const [article, recommendations] = await Promise.all([
        getSeoArticleById(params.id),
        getContentRecommendations().catch((error) => {
            console.error("Failed to load recommendations:", error);
            return [];
        })
    ]);
    return { article, recommendations };
}

function SeoArticleRoute() {
    const data = useLoaderData<typeof loader>();
    const { id } = useParams();

    return (
        <Suspense key={id} fallback={
            <div className="py-20 text-center animate-pulse text-gray-500">
                <div className="h-6 bg-gray-250 w-48 mx-auto rounded mb-4"></div>
                <div className="h-4 bg-gray-200 w-96 mx-auto rounded"></div>
            </div>
        }>
            <Await 
                resolve={Promise.all([data.article, data.recommendations])} 
                errorElement={
                    <div className="py-20 text-center text-red-600 font-medium">
                        Error loading SEO article. Please try again.
                    </div>
                }
            >
                {([resolvedArticle, resolvedRecommendations]) => (
                    <SeoArticleDetails article={resolvedArticle} recommendations={resolvedRecommendations} />
                )}
            </Await>
        </Suspense>
    );
}

export default SeoArticleRoute;
