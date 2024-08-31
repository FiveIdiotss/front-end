'use client';
import SectionDivider from './SectionDivider';
import HeartIcon from '../../_icons/common/HeartIcon';
import { useAddBookmarkMutation, useDeleteBookmarkMutation } from '../_lib/BookmarkService';
import { MentorBoardDTOType } from '@/app/Models/mentorType';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import MentoModal from '../(header)/posts/mentor/_component/MentoModal';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import BookMarkIcon from '@/app/_icons/common/BookMarkIcon';
import MobileIcon from '@/app/_icons/common/MobileIcon';

function MentoPostCard({ post, queryKeys }: { post: MentorBoardDTOType; queryKeys: (string | number | boolean)[] }) {
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); //모달창 상태

    let year;
    if (year === 0) {
        year = '학번 없음';
    } else {
        year = post?.year.toString().substring(2, 4); // 학번 뒤 두자리만 가져오기
    }

    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const boardIdParam = searchParams.get('mentor_board_id'); //모달창 열기위한 boardId파라미터

    const addBookmarkMutation = useAddBookmarkMutation(); //북마크 추가
    const deleteBookmarkMutation = useDeleteBookmarkMutation(); //북마크 삭제
    const handleToggleBookmark = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();

        if (post.favorite) {
            deleteBookmarkMutation.mutate({
                boardId: post.boardId,
                keys: queryKeys,
            });
        } else {
            addBookmarkMutation.mutate({
                boardId: post.boardId,
                keys: queryKeys,
            });
        }
    }; //북마크 추가 삭제

    const handleDetailModalOpen = () => {
        const param = new URLSearchParams(searchParams.toString());
        param.set('mentor_board_id', post.boardId.toString());

        router.replace(pathName + '?' + param);
        console.log('handleDetailModalOpen', post.boardId);
    }; //모달창 열기

    const handleDetailModalClose = () => {
        const param = new URLSearchParams(searchParams.toString());
        if (param.has('mentor_board_id')) {
            param.delete('mentor_board_id');
        }
        router.replace(pathName + '?' + param);
    }; //모달창 닫기

    useEffect(() => {
        if (boardIdParam === post.boardId.toString()) {
            setIsDetailModalOpen(true);
        } else {
            setIsDetailModalOpen(false);
        }
    }, [boardIdParam]); //어떤 곳에서든 쿼리를 받아오면 모달을 열어준다.

    return (
        <>
            <div
                className=" my-1 flex h-[330px]   transform cursor-pointer flex-col overflow-hidden rounded-lg border border-gray-100 bg-white bg-opacity-50 shadow-sm  shadow-gray-100 transition duration-300 ease-in-out hover:-translate-y-1  hover:shadow-sm"
                onClick={handleDetailModalOpen}
            >
                <div className="relative flex h-28 w-full  flex-col justify-end ">
                    <h3 className="z-10 line-clamp-2 flex w-full flex-row items-center rounded-t-lg bg-white bg-opacity-90 px-3 py-2  text-sm  font-semibold text-black">
                        {post.platform === 'WEB' ? '' : <MobileIcon className="mr-1 h-4 w-4 text-blue-500" />}
                        <span>
                            <span className="text-gray-700">[{post.boardCategory}]</span>
                            &nbsp;
                            {post.title}
                        </span>
                    </h3>
                    <Image
                        src={post.representImage || ''}
                        alt="post"
                        quality={100}
                        fill={true}
                        sizes="600px"
                        className="z-0 object-cover  "
                    />
                </div>
                <div className="flex flex-grow flex-col px-3 pb-3 pt-1 mobile:px-5  ">
                    <div className="flex flex-grow flex-col text-sm">
                        <dl className="mt-2 ">
                            <div className="flex flex-row gap-2">
                                <dt className="  text-gray-400 ">학교</dt>
                                <dd className="  text-neutral-500">{post.schoolName}</dd>
                            </div>
                            <div className="flex flex-row gap-2">
                                <dt className="  text-gray-400">전공</dt>
                                <dd className="  text-neutral-500">{post.majorName}</dd>
                            </div>
                            <div className="flex flex-row gap-2">
                                <dt className="  text-gray-400">학번</dt>
                                <dd className="  text-neutral-500">{year}학번</dd>
                            </div>
                            <div className="flex flex-row gap-2">
                                <dt className="flex-shrink-0   text-gray-400">대상</dt>
                                <dd className="line-clamp-1   text-neutral-500">{post.target}</dd>
                            </div>
                            <div className="flex flex-row gap-2">
                                <dt className="flex-shrink-0   text-gray-400">소개</dt>
                                <dd className="line-clamp-2   text-neutral-500">{post.introduce}</dd>
                            </div>
                        </dl>
                    </div>
                    <div className="my-2">
                        <SectionDivider color="border-purple-100" />
                    </div>
                    <div className="flex h-8 ">
                        <div className="flex flex-grow items-center gap-2">
                            <div className=" relative h-7 w-7  ">
                                <Image
                                    src={post.memberImageUrl}
                                    alt="profile"
                                    fill={true}
                                    sizes="56px"
                                    quality={100}
                                    className="rounded-full object-cover"
                                />
                            </div>
                            <span className="text-sm  font-semibold text-neutral-500">{post.memberName}</span>
                        </div>
                        <button
                            className="h-8 w-8 rounded-full  bg-gray-100  p-1 hover:bg-purple-100 "
                            onClick={(event) => handleToggleBookmark(event)}
                        >
                            <BookMarkIcon className="text-red-500" isCheck={post.favorite} />
                        </button>
                    </div>
                </div>
            </div>
            {isDetailModalOpen && <MentoModal id={post.boardId} onClose={handleDetailModalClose} />}
        </>
    );
}

export default MentoPostCard;
