import Link from 'next/link';

import React from 'react';
import PostsQuests from '../../posts/quest/_component/PostsQuests';

export default function HomeQuestsBoard() {
    return (
        <section className="flex w-full flex-col">
            <Link className=" mb-3  flex w-full flex-row items-end justify-between " href="/posts/quest">
                <span className="text-xl font-medium text-neutral-700">자유로운 질문</span>
                {/* <ArrowRightIcon className="ml-1 h-7 w-7 text-neutral-700" /> */}
                <span className="text-sm font-extralight text-neutral-600">더보기 +</span>
            </Link>
            <PostsQuests pageType="home" />
            {/* posts 페이지의 컴포넌트 재사용 */}
        </section>
    );
}
