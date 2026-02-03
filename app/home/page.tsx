import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { HomeClient } from './HomeClient';

export default async function HomePage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return (
        <HomeClient
            userName={session?.user?.name}
            userImage={session?.user?.image}
            isGuest={!session?.user}
        />
    );
}
