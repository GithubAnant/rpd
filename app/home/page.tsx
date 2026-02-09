
import { HomeFeed } from './home-feed';

interface PageProps {
    searchParams: Promise<{ search?: string }>;
}

export default async function HomePage({ searchParams }: PageProps) {
    const params = await searchParams;
    const searchQuery = params.search;

    return (
        <HomeFeed
            userName={undefined}
            userImage={undefined}
            isGuest={true}
            searchQuery={searchQuery}
        />
    );
}

