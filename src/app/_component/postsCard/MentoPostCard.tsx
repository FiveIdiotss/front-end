'use client';
import SectionDivider from '../common/SectionDivider';
import HeartIcon from '@/app/_icons/common/HeartIcon';
import { MentorBoardDTOType } from '@/app/Models/mentorType';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import MentoModal from '../../(header)/posts/mentor/_component/MentoModal';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import BookMarkIcon from '@/app/_icons/common/BookMarkIcon';
import MobileIcon from '@/app/_icons/common/MobileIcon';
import { useAddBookmarkMutation, useDeleteBookmarkMutation } from '../../_lib/BookmarkService';
import { useRouteLogin } from '@/app/_hooks/useRouteLogin';

function MentoPostCard({
    isLogin = false,
    post,
    queryKeys,
}: {
    isLogin?: boolean;
    post: MentorBoardDTOType;
    queryKeys: (string | number | boolean)[];
}) {
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); //모달창 상태
    const [isCardHover, setIsCardHover] = useState(false); //카드 호버 상태

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
    const { navigateToLogin } = useRouteLogin({
        isLoginRequired: true,
    }); //로그인 체크

    const addBookmarkMutation = useAddBookmarkMutation(); //북마크 추가
    const deleteBookmarkMutation = useDeleteBookmarkMutation(); //북마크 삭제
    const handleToggleBookmark = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
        if (!isLogin) {
            navigateToLogin();
            return;
        }

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
        router.replace(pathName + '?' + param, { scroll: false });
    }; //모달창 열기

    const handleDetailModalClose = () => {
        const param = new URLSearchParams(searchParams.toString());
        if (param.has('mentor_board_id')) {
            param.delete('mentor_board_id');
        }
        router.replace(pathName + '?' + param, { scroll: false });
    }; //모달창 닫기

    const handleHoverCard = (isHover: boolean) => {
        if (post.representImage !== '') {
            setIsCardHover(isHover);
        }
    }; //카드 호버

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
                className=" my-1 flex h-[300px]   transform cursor-pointer flex-col overflow-hidden rounded-md border border-gray-100 bg-white bg-opacity-50 shadow-sm  shadow-gray-100 transition duration-300 ease-in-out hover:-translate-y-1  hover:shadow-sm"
                onClick={handleDetailModalOpen}
            >
                <div
                    className="relative flex h-36 w-full  flex-col  "
                    onMouseEnter={() => handleHoverCard(true)}
                    onMouseLeave={() => handleHoverCard(false)}
                >
                    <div
                        className={`z-10 ${isCardHover ? 'hidden' : ''}  flex h-full w-full flex-col gap-1    px-3 py-2 text-sm  font-medium  ${post.representImage !== '' ? 'bg-black bg-opacity-50 text-white' : ''}`}
                    >
                        <span className={`flex flex-row items-center gap-1 text-white`}>
                            {post.platform === 'WEB' ? '' : <MobileIcon className="mr-1 h-4 w-4 text-blue-500" />}
                            <span className="line-clamp-2">
                                [{post.boardCategory}] {post.title}
                            </span>
                        </span>
                        <span className="line-clamp-2 text-sm font-light text-white">{post.introduce}</span>
                    </div>
                    {post.representImage !== '' && (
                        <Image
                            src={post.representImage || '/'}
                            loading="eager"
                            alt="MentoringRepresentImage"
                            quality={100}
                            fill={true}
                            sizes="600px"
                            className="z-0 object-cover  "
                        />
                    )}
                    {post.representImage === '' && (
                        <div
                            className="absolute left-0 top-0 z-0 flex h-36 w-full items-end justify-center opacity-50"
                            style={{
                                background: 'linear-gradient(to right, #3498db, #9b59b6)',
                            }}
                        >
                            <span className="text- p-1 font-mono text-white">Menteeto</span>
                            <span></span>
                        </div>
                    )}
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
                            {/* <div className="flex flex-row gap-2">
                                <dt className="flex-shrink-0   text-gray-400">소개</dt>
                                <dd className="line-clamp-2   text-neutral-500">{post.introduce}</dd>
                            </div> */}
                        </dl>
                    </div>
                    <div className="my-2">
                        <SectionDivider color="border-purple-100" />
                    </div>
                    <div className="flex h-6 items-center ">
                        <div className="flex flex-grow items-center gap-2">
                            <div className=" relative h-5 w-5  ">
                                <Image
                                    src={post.memberImageUrl}
                                    alt="profile"
                                    fill={true}
                                    sizes="56px"
                                    quality={100}
                                    priority
                                    className="rounded-full object-cover"
                                />
                            </div>
                            <span className="text-xs text-gray-400">by</span>
                            <span className="text-xs  font-semibold ">{post.memberName}</span>
                        </div>
                        <button
                            type="button"
                            id="bookmark"
                            aria-label="북마크 추가"
                            className="h-7 w-7 rounded-full  bg-gray-100  p-1 hover:bg-purple-100 "
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
