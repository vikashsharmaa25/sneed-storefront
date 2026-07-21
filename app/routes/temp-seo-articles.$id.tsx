import { useLoaderData, Await, useParams } from 'react-router';
import { Suspense } from 'react';
import TempSeoArticleDetails from '~/components/content/TempSeoArticleDetails';
import { getTempSeoArticleById } from '~/lib/api/content-management';

export async function loader({ params }: { params: { id: any } }) {
    try {
        const article = await getTempSeoArticleById(params.id);
        console.log(`[TempSeoArticle Details Loader id=${params.id}]:`, article);
        return { article };
    } catch (error) {
        console.error("Failed to load product article:", error);
        return { article: null };
    }
}

function TempSeoArticleRoute() {
    const { article } = useLoaderData<typeof loader>();
    const { id } = useParams();
    console.log(`[TempSeoArticle Details Route id=${id}]:`, article);

    return (
        <Suspense key={id} fallback={
            <div className="py-20 text-center animate-pulse text-gray-500">
                <div className="h-6 bg-gray-200 w-48 mx-auto rounded mb-4"></div>
                <div className="h-4 bg-gray-200 w-96 mx-auto rounded"></div>
            </div>
        }>
            <Await
                resolve={article}
                errorElement={
                    <div className="py-20 text-center text-red-600 font-medium">
                        Error loading Product article. Please try again.
                    </div>
                }
            >
                {(resolvedArticle) => (
                    <TempSeoArticleDetails article={resolvedArticle} />
                )}
            </Await>
        </Suspense>
    );
}

export default TempSeoArticleRoute;
