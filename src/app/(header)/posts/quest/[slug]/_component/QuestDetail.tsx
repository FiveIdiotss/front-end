'use client';
import React, { useEffect } from 'react';
import Loading from '@/app/_component/Loading';
import Image from 'next/image';
import Reply from '../../../_component/postDetail/Reply';
import PostsDetailNav from '../../../_component/postDetail/PostsDetailNav';
import Like from '../../../_component/postDetail/Like';
import { MemberDto } from '@/auth';
import { useSubBoardDetailQuery } from '../../../_lib/qeustOrRequestService';
import ErrorDataUI from '@/app/_component/ErrorDataUI';
import MobileIcon from '@/app/_icons/common/MobileIcon';
import Link from 'next/link';
function formatDate(dateString: string, dateType: string) {
    const date = new Date(dateString);

    // 시간과 분만 표시
    if (dateType === 'time')
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

    //년, 월, 일을 표시
    if (dateType === 'date')
        return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
}

function QuestDetail({ boardId, memberDTO }: { boardId: number; memberDTO?: MemberDto }) {
    const subBoardDetailQuery = useSubBoardDetailQuery({
        subBoardId: boardId,
    });
    const { data: questDetailData, error, isPending } = subBoardDetailQuery;

    useEffect(() => {
        console.log('자유질문 상세 데이터', questDetailData);
    }, [questDetailData]);

    if (isPending) return <Loading className=" h-full" />;
    if (error) return <ErrorDataUI text="오류가 발생했습니다." />;

    const writerId = questDetailData?.subBoardDTO.memberId; //작성자 아이디
    const sessionId = memberDTO?.id; //로그인한  맴버아이디

    return (
        <div className="flex w-full flex-row gap-6 pt-10  ">
            <PostsDetailNav />
            <div className="flex flex-grow flex-col   border-t-2 border-gray-400">
                <div className="flex w-full flex-row  items-center    gap-3 bg-white   p-5 text-base mobile:text-lg ">
                    {questDetailData.subBoardDTO.platform === 'APP' && <MobileIcon className="h-5 w-5 text-gray-400" />}
                    <span className=" text-gray-400">[{questDetailData?.subBoardDTO.boardCategory}]</span>
                    <span className=" text-neutral-700">{`${questDetailData?.subBoardDTO.title}`}</span>
                </div>
                <div className="flex w-full flex-col items-center justify-between gap-2 border-y border-neutral-200 px-2 py-3 text-sm font-normal text-neutral-600 mobile:flex-row ">
                    <div className="flex w-full  flex-row items-center  gap-2  ">
                        <div className="relative h-7 w-7">
                            <Image
                                src={questDetailData?.subBoardDTO.imageUrl}
                                fill={true}
                                sizes="56px"
                                alt="프로필 이미지"
                                className="shrink-0 rounded-full object-cover "
                            />
                        </div>
                        <span className="font-medium">{questDetailData?.subBoardDTO.memberName}&nbsp;</span>
                        <span className="text-xs text-neutral-500">{questDetailData.subBoardDTO.schoolName}</span>·
                        <span className="text-xs text-neutral-500">{questDetailData.subBoardDTO.majorName}</span>
                    </div>

                    <div className="ml-auto flex  flex-row items-center gap-2 text-neutral-500 mobile:ml-0">
                        <span className="  text-center  ">
                            {formatDate(questDetailData.subBoardDTO.writeTime, 'date')}
                        </span>
                        <span className="text-xs font-extralight">|</span>
                        <span className="  text-center  ">
                            {formatDate(questDetailData.subBoardDTO.writeTime, 'time')}
                        </span>
                    </div>
                </div>

                {/* 수정, 삭제 버튼 */}
                {writerId === sessionId && (
                    <div className="mt-2 flex w-full flex-row justify-end gap-3 px-5">
                        <Link
                            href={`/post/edit/quest/${boardId}`}
                            className="text-sm  text-neutral-600 underline underline-offset-1"
                        >
                            수정
                        </Link>
                        <button className="text-sm text-red-400 underline underline-offset-1">삭제</button>
                    </div>
                )}

                {/* 본문 */}
                {questDetailData?.subBoardDTO.platform === 'WEB' ? (
                    <div
                        className="html-content min-h-72 w-full border-b p-3 text-sm mobile:p-5 "
                        dangerouslySetInnerHTML={{ __html: questDetailData?.subBoardDTO.content }}
                    />
                ) : (
                    <div className="html-content flex min-h-72  w-full flex-col border-b p-3 text-sm mobile:p-5 ">
                        <p className="mb-10">{questDetailData.subBoardDTO.content}</p>
                        {questDetailData.subBoardImageUrls.map((imageUrl, index) => (
                            <div key={index} className="relative h-72 w-full">
                                <Image
                                    src={imageUrl.subBoardImageUrl}
                                    alt="게시글 이미지"
                                    fill={true}
                                    sizes="100%"
                                    className="rounded-lg"
                                />
                            </div>
                        ))}
                    </div>
                )}

                <Like
                    boardId={boardId}
                    likeCount={questDetailData.subBoardDTO.likeCount}
                    like={questDetailData.subBoardDTO.like}
                    boardType="QUEST"
                    isLogin={Boolean(memberDTO)}
                />

                {/* 댓글컴포넌트 */}
                <Reply
                    replyCount={questDetailData.subBoardDTO.replyCount}
                    subBoardId={questDetailData.subBoardDTO.subBoardId}
                    writerId={writerId}
                    sessionId={sessionId}
                    boardType="QUEST"
                />
            </div>
        </div>
    );
}

export default QuestDetail;
