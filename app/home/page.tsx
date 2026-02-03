import { getServerSession } from 'next-auth';
import { HomeClient } from './HomeClient';

export default async function HomePage() {
    const session = await getServerSession();

    return (
        <HomeClient
            userName={session?.user?.name}
            userImage={session?.user?.image}
            isGuest={!session?.user}
        />
    );
}
