import Link from 'next/link';
import React from 'react';
import ArrowRightIcon from '../../_component/icon/ArrowRightIcon';
import Image from 'next/image';
import { faker } from '@faker-js/faker';
import LikeIcon from '../../_component/icon/LikeIcon';
import PostsRequests from '../../posts/request/_component/PostsRequests';

export default function HomeRequestsBoard() {
    return (
        <section className="flex w-full flex-col">
            <Link className="mb-3 flex w-full flex-row items-end justify-between  " href="/posts/requests">
                <span className="text-xl font-medium text-neutral-700">멘토링 주제 요청</span>
                {/* <ArrowRightIcon className="ml-1 h-7 w-7 text-neutral-700" /> */}
                <span className="text-sm font-extralight text-neutral-600">더보기 +</span>
            </Link>
            <PostsRequests pageType="home" />
            {/* posts 페이지의 컴포넌트 재사용 */}
        </section>
    );
}
