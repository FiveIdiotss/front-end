'use client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { getQuestDetail } from '../../../_lib/qeustsRequest';
import Loading from '@/app/_component/Loading';
import Image from 'next/image';
import Reply from '../../../_component/postDetail/Reply';
import PostsDetailNav from '../../../_component/postDetail/PostsDetailNav';
import Like from '../../../_component/postDetail/Like';
import { MemberDto } from '@/auth';
function formatDate(dateString: string, dateType: string) {
    const date = new Date(dateString);
    const now = new Date();

    // 시간과 분만 표시
    if (dateType === 'time')
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

    //년, 월, 일을 표시
    if (dateType === 'date')
        return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
}

function RequestDetail({ boardId, memberDTO }: { boardId: number; memberDTO: MemberDto }) {
    const router = useRouter();

    const { data, error, isPending, isError } = useQuery({
        queryKey: ['posts', 'requests', 'detail', String(boardId)],
        queryFn: () => getQuestDetail(boardId),
    });

    useEffect(() => {
        console.log('data', data);
    }, [data]);

    if (isPending || !data) return <Loading />;

    const writerId = data?.subBoardDTO.memberId; //작성자 아이디
    const sessionId = memberDTO.id; //로그인한  맴버아이디

    return (
        <div className="flex w-full flex-row gap-6 pt-10  ">
            <PostsDetailNav />
            <div className="flex flex-grow flex-col   border-t-2 border-neutral-400">
                <div className="flex w-full flex-row items-center    gap-3 bg-white  p-5 text-lg ">
                    <span className=" text-gray-400">[{data?.subBoardDTO.boardCategory}]</span>
                    <span className=" text-neutral-700">{`${data?.subBoardDTO.title}`}</span>
                </div>
                <div className="flex w-full flex-row items-center justify-between border-y border-neutral-200 px-5 py-3 text-sm font-normal text-neutral-600 ">
                    <div className="flex w-full flex-row items-center  gap-2  ">
                        <Image
                            src={data?.subBoardDTO.imageUrl}
                            width={30}
                            height={30}
                            alt="프로필 이미지"
                            className="rounded-full"
                        />
                        <span className="">{data?.subBoardDTO.memberName}&nbsp;</span>
                        <span className="text-xs text-neutral-500">{data.subBoardDTO.schoolName}</span>·
                        <span className="text-xs text-neutral-500">{data.subBoardDTO.majorName}</span>
                    </div>

                    <div className="flex w-40 flex-row items-center gap-2 text-neutral-500">
                        <span className="  text-center  ">{formatDate(data.subBoardDTO.writeTime, 'date')}</span>
                        <span className="text-xs font-extralight">|</span>
                        <span className="  text-center  ">{formatDate(data.subBoardDTO.writeTime, 'time')}</span>
                    </div>
                </div>
                {writerId === sessionId && (
                    <div className="mt-2 flex w-full flex-row justify-end gap-3 px-5">
                        <button className="text-sm  text-neutral-600 underline underline-offset-1">수정</button>
                        <button className="text-sm text-red-400 underline underline-offset-1">삭제</button>{' '}
                    </div>
                )}
                <div
                    className="html-content min-h-72 w-full border-b p-5 text-sm "
                    dangerouslySetInnerHTML={{ __html: data?.subBoardDTO.content }}
                />
                <Like
                    boardId={boardId}
                    likeCount={data.subBoardDTO.likeCount}
                    like={data.subBoardDTO.like}
                    boardType="requests"
                />

                {/* 댓글컴포넌트 */}
                <Reply
                    replyCount={data.subBoardDTO.replyCount}
                    subBoardId={data.subBoardDTO.subBoardId}
                    writerId={writerId}
                    sessionId={sessionId}
                    boardType="requests"
                />
            </div>
        </div>
    );
}

export default RequestDetail;
