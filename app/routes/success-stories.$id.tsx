import { useLoaderData, Await, useParams } from 'react-router';
import { Suspense } from 'react';
import SuccessStoryDetails from '~/components/content/SuccessStoryDetails';
import { getSuccessStoryById, getContentRecommendations } from '~/lib/api/content-management';

export async function loader({ params }: { params: { id: any } }) {
    const [story, recommendations] = await Promise.all([
        getSuccessStoryById(params.id),
        getContentRecommendations().catch((error) => {
            console.error("Failed to load recommendations:", error);
            return [];
        })
    ]);
    return { story, recommendations };
}

function SuccessStoryRoute() {
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
                resolve={Promise.all([data.story, data.recommendations])} 
                errorElement={
                    <div className="py-20 text-center text-red-600 font-medium">
                        Error loading success story. Please try again.
                    </div>
                }
            >
                {([resolvedStory, resolvedRecommendations]) => (
                    <SuccessStoryDetails story={resolvedStory} recommendations={resolvedRecommendations} />
                )}
            </Await>
        </Suspense>
    );
}

export default SuccessStoryRoute;
