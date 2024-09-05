import React from 'react';
import PostsMentor from './_component/PostsMentor';
import { auth } from '@/auth';

async function PostsMentoPage() {
    const session = await auth();
    return <PostsMentor session={session} />;
}

export default PostsMentoPage;
