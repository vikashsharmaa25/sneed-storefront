import { useLoaderData, Await, useParams } from 'react-router';
import { Suspense } from 'react';
import BlogDetails from '~/components/content/BlogDetails';
import { getBlogById, getContentRecommendations } from '~/lib/api/content-management';

export async function loader({ params }: { params: { id: any } }) {
    const [blog, recommendations] = await Promise.all([
        getBlogById(params.id),
        getContentRecommendations().catch((error) => {
            console.error("Failed to load recommendations:", error);
            return [];
        })
    ]);
    console.log("recommendations", recommendations)
    return { blog, recommendations };
}

function BlogRoute() {
    const data = useLoaderData<typeof loader>();
    const { id } = useParams();

    // console.log("recommendations", data.recommendations);

    return (
        <Suspense key={id} fallback={
            <div className="py-20 text-center animate-pulse text-gray-500">
                <div className="h-6 bg-gray-250 w-48 mx-auto rounded mb-4"></div>
                <div className="h-4 bg-gray-200 w-96 mx-auto rounded"></div>
            </div>
        }>
            <Await
                resolve={Promise.all([data.blog, data.recommendations])}
                errorElement={
                    <div className="py-20 text-center text-red-600 font-medium">
                        Error loading blog post. Please try again.
                    </div>
                }
            >
                {([resolvedBlog, resolvedRecommendations]) => (
                    <BlogDetails blog={resolvedBlog} recommendations={resolvedRecommendations} />
                )}
            </Await>
        </Suspense>
    );
}

export default BlogRoute;
