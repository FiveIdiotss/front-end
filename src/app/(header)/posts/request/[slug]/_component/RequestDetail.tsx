'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useSubBoardDetailQuery } from '../../../_lib/qeustOrRequestService';
import Loading from '@/app/_component/Loading';
import Image from 'next/image';
import Reply from '../../../_component/postDetail/Reply';
import PostsDetailNav from '../../../_component/postDetail/PostsDetailNav';
import Like from '../../../_component/postDetail/Like';
import { MemberDto } from '@/auth';
import ErrorDataUI from '@/app/_component/ErrorDataUI';
import MobileIcon from '@/app/_icons/common/MobileIcon';
function formatDate(dateString: string, dateType: string) {
    const date = new Date(dateString);

    // 시간과 분만 표시
    if (dateType === 'time')
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

    //년, 월, 일을 표시
    if (dateType === 'date')
        return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
}

function RequestDetail({ boardId, memberDTO }: { boardId: number; memberDTO?: MemberDto }) {
    const subBoardDetailQuery = useSubBoardDetailQuery({
        subBoardId: boardId,
    });
    const { data: requestDetailData, error, isPending } = subBoardDetailQuery;

    useEffect(() => {
        console.log('멘토찾기(요청) 상세 데이터', requestDetailData);
    }, [requestDetailData]);

    if (isPending) return <Loading className="h-full" />;
    if (error) return <ErrorDataUI text="오류가 발생했습니다." />;

    const writerId = requestDetailData.subBoardDTO.memberId; //작성자 아이디
    const sessionId = memberDTO?.id; //로그인한  맴버아이디

    return (
        <div className="flex w-full flex-row gap-6 pt-10  ">
            <PostsDetailNav />
            <div className="flex flex-grow flex-col   border-t-2 border-neutral-400">
                <div className="flex w-full flex-row items-center    gap-3 bg-white  p-5 text-base mobile:text-lg ">
                    {requestDetailData.subBoardDTO.platform === 'APP' && (
                        <MobileIcon className="h-5 w-5 text-primary" />
                    )}
                    <span className=" text-gray-400">[{requestDetailData.subBoardDTO.boardCategory}]</span>
                    <span className=" text-neutral-700">{`${requestDetailData.subBoardDTO.title}`}</span>
                </div>
                <div className="flex w-full flex-col items-center justify-between gap-2 border-y border-neutral-200 px-2 py-3 text-sm font-normal text-neutral-600 mobile:flex-row ">
                    <div className="flex w-full  flex-row items-center  gap-2  ">
                        <div className="relative h-7 w-7">
                            <Image
                                src={requestDetailData.subBoardDTO.imageUrl}
                                alt="프로필 이미지"
                                fill={true}
                                sizes="56px"
                                className="rounded-full"
                            />
                        </div>
                        <span className="font-medium">{requestDetailData.subBoardDTO.memberName}&nbsp;</span>
                        <span className="text-xs text-neutral-500">{requestDetailData.subBoardDTO.schoolName}</span>·
                        <span className="text-xs text-neutral-500">{requestDetailData.subBoardDTO.majorName}</span>
                    </div>

                    <div className="ml-auto flex  flex-row items-center gap-2 text-neutral-500 mobile:ml-0">
                        <span className="  text-center  ">
                            {formatDate(requestDetailData.subBoardDTO.writeTime, 'date')}
                        </span>
                        <span className="text-xs font-extralight">|</span>
                        <span className="  text-center  ">
                            {formatDate(requestDetailData.subBoardDTO.writeTime, 'time')}
                        </span>
                    </div>
                </div>
                {writerId === sessionId && (
                    <div className="mt-2 flex w-full flex-row justify-end gap-3 px-5">
                        <button className="text-sm  text-neutral-600 underline underline-offset-1">수정</button>
                        <button className="text-sm text-red-400 underline underline-offset-1">삭제</button>{' '}
                    </div>
                )}
                {/* 본문 */}
                {requestDetailData?.subBoardDTO.platform === 'WEB' ? (
                    <div
                        className="html-content min-h-72 w-full border-b p-5 text-sm "
                        dangerouslySetInnerHTML={{ __html: requestDetailData.subBoardDTO.content }}
                    />
                ) : (
                    <div className="html-content flex min-h-72  w-full flex-col border-b p-5 text-sm ">
                        <p className="mb-10">{requestDetailData.subBoardDTO.content}</p>
                        {requestDetailData.subBoardImageUrls.map((imageUrl, index) => (
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
                    likeCount={requestDetailData.subBoardDTO.likeCount}
                    like={requestDetailData.subBoardDTO.like}
                    boardType="REQUEST"
                    isLogin={Boolean(memberDTO)}
                />

                {/* 댓글컴포넌트 */}
                <Reply
                    replyCount={requestDetailData.subBoardDTO.replyCount}
                    subBoardId={requestDetailData.subBoardDTO.subBoardId}
                    writerId={writerId}
                    sessionId={sessionId}
                    boardType="REQUEST"
                />
            </div>
        </div>
    );
}

export default RequestDetail;
