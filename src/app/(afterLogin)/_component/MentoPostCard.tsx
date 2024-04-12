'use client';
import Link from 'next/link';
import { MentoContent } from '../posts/_lib/posts';
import SectionDivider from './SectionDivider';
import HeartIcon from './icon/HeartIcon';
type xx = {
    boardId: number;
    boardType: string;
    content: string;
    introduce: string;
    majorName: string;
    memberId: number;
    memberName: string;
    schoolName: string;
    target: string;
    title: string;
    year: number;
};
function MentoPostCard({ post }: { post: MentoContent }) {
    let year = post?.year?.toString().substring(2, 4) || 0; // "18"

    return (
        <div className=" flex h-72 w-full transform cursor-pointer flex-col rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm shadow-neutral-200  transition duration-300 ease-in-out hover:-translate-y-1 hover:border-neutral-200 hover:shadow-md">
            <div className="flex flex-grow flex-col">
                <h3 className="line-clamp-3 font-sans text-base  font-semibold">{post.title}</h3>
                <dl className="mt-2 ">
                    <div className="flex flex-row gap-2">
                        <dt className="text-sm  text-gray-400 ">학교</dt>
                        <dd className="text-sm  text-neutral-500">{post.schoolName}</dd>
                    </div>
                    <div className="flex flex-row gap-2">
                        <dt className="text-sm  text-gray-400">전공</dt>
                        <dd className="text-sm  text-neutral-500">{post.majorName}</dd>
                    </div>
                    <div className="flex flex-row gap-2">
                        <dt className="text-sm  text-gray-400">학번</dt>
                        <dd className="text-sm  text-neutral-500">{year}학번</dd>
                    </div>
                    <div className="flex flex-row gap-2">
                        <dt className="text-sm  text-gray-400">대상</dt>
                        <dd className="text-sm  text-neutral-500">{post.target}</dd>
                    </div>
                    <div className="flex flex-row gap-2">
                        <dt className="flex-shrink-0  text-sm text-gray-400">소개</dt>
                        <dd className="line-clamp-2  text-sm text-neutral-500">{post.introduce}</dd>
                    </div>
                </dl>
            </div>
            <div className="my-3">
                <SectionDivider />
            </div>
            <div className="flex h-7 justify-between ">
                <span className="rounded-lg bg-yellow-100  px-2  text-sm text-neutral-500 underline underline-offset-2 hover:scale-105 hover:text-black">
                    {post.memberName}
                </span>
                <div className="h-8 w-8 rounded-full  p-1 hover:bg-red-100 ">
                    <HeartIcon fill="red" isCheck={false} />
                </div>
            </div>
        </div>
    );
}

export default MentoPostCard;
