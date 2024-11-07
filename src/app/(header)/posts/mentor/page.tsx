import React from 'react';
import PostsMentor from './_component/PostsMentor';
import { auth } from '@/auth';

export const metadata = {
    title: '멘토링',
};

async function PostsMentoPage() {
    const session = await auth();
    return <PostsMentor session={session} />;
}

export default PostsMentoPage;
