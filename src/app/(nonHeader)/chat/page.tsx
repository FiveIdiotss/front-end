import { auth } from '@/auth';
import ChatList from './_component/ChatList';

async function page() {
    const session = await auth();

    return <ChatList session={session} />;
}

export default page;
