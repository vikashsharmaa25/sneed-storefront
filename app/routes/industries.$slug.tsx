import { useLoaderData } from 'react-router';
import { getIndustryBySlug } from '~/lib/api/industries.server';
import IndustryPage from '~/components/industry/IndustryPage';

export async function loader({ params }: { params: { slug: string } }) {
    const industry = await getIndustryBySlug(params.slug).catch(() => null);

    if (!industry) {
        throw new Response(
            JSON.stringify({ message: `Industry "${params.slug}" not found` }),
            { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
    }

    return { industry };
}

export default function IndustryRoute() {
    const { industry } = useLoaderData<typeof loader>();
    return <IndustryPage industry={industry} />;
}
