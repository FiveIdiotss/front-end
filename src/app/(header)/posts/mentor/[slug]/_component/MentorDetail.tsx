'use client';
import { useRouter } from 'next/navigation';
import React, { use, useEffect } from 'react';

function MentorDetail({ id }: { id: number }) {
    const router = useRouter();

    useEffect(() => {
        if (id) {
            router.push(`/posts/mentor?mentor_board_id=${id}`);
        }
    }, []);

    return null;
}

export default MentorDetail;
