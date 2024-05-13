'use client';
import Link from 'next/link';
import { MentoContent } from '../posts/_lib/posts';
import SectionDivider from './SectionDivider';
import HeartIcon from './icon/HeartIcon';
import { useAddBookmarkMutation, useDeleteBookmarkMutation } from '../_lib/BookmarkService';
import { pushNotification } from '@/app/util/pushNotification';
import Axios from '@/app/util/axiosInstance';

const deleteTest = async (boardId: number) => {
    try {
        const response = await Axios.delete(`api/board/${boardId}`);
        pushNotification;
        return response.data;
    } catch (error) {
        console.log(error);
        pushNotification('게시글 삭제에 실패했습니다.', 'error', 'dark');
    }
    console.log('deleteTest', boardId);
};

function MentoPostCard({ post, bookmarkIds }: { post: MentoContent; bookmarkIds?: number[] }) {
    let year = post?.year?.toString().substring(2, 4) || 0; // "18"

    const addBookmarkMutation = useAddBookmarkMutation();
    const deleteBookmarkMutation = useDeleteBookmarkMutation();

    const handleToggleBookmark = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();

        if (bookmarkIds && bookmarkIds.includes(post.boardId)) {
            deleteTest(post.boardId);

            // deleteBookmarkMutation.mutate(post.boardId);
        } else {
            addBookmarkMutation.mutate(post.boardId);
        }
    };

    return (
        <div className=" flex h-72 w-full  transform cursor-pointer flex-col rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-sm  shadow-neutral-300 transition duration-300 ease-in-out hover:-translate-y-1  hover:shadow-md">
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
                        <dt className="flex-shrink-0  text-sm text-gray-400">대상</dt>
                        <dd className="line-clamp-1  text-sm text-neutral-500">{post.target}</dd>
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
                <button
                    className="h-8 w-8 rounded-full  p-1 hover:bg-red-100 "
                    onClick={(event) => handleToggleBookmark(event)}
                >
                    <HeartIcon
                        fill="red"
                        className="text-red-500"
                        isCheck={(bookmarkIds && bookmarkIds.includes(post.boardId)) || false}
                    />
                </button>
            </div>
        </div>
    );
}

export default MentoPostCard;
