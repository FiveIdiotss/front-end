import HotIcon from '@/app/_icons/common/HotIcon';
import Image from 'next/image';
import React from 'react';
import { SubBoardDTOType } from '@/app/Models/subBoardType';
import { useRouter } from 'next/navigation';

interface Props {
    data?: SubBoardDTOType[];
    type: 'QUEST' | 'REQUEST';
    isPending: boolean;
}
function HotSubBoards({ data, type, isPending }: Props) {
    const router = useRouter();
    const handleRouteSubBoard = ({ id }: { id: number }) => {
        if (type === 'QUEST') {
            router.push(`/posts/quest/${id}`);
        } else {
            router.push(`/posts/request/${id}`);
        }
    };
    return (
        <div className=" flex  w-full flex-col gap-2  ">
            <div className="flex items-center gap-1 px-3">
                <span className="flex flex-grow">
                    <span className="flex-grow"></span>
                    <span className="text-xs  text-orange-800">
                        {type === 'QUEST' ? '<질문 게시판>' : '<멘토링 요청 게시판>'}
                    </span>
                </span>
            </div>

            <div className="flex flex-col ">
                {data?.length === 0 && (
                    <div className="flex flex-col gap-2 px-4 py-2">
                        <span className="text-sm font-extralight text-neutral-700">게시글이 없습니다.</span>
                    </div>
                )}
                {isPending &&
                    [...Array(5)].map((_, index) => (
                        <div key={index} className="h-12 px-2 py-1">
                            <div className="h-full w-full rounded-md bg-gradient-1"></div>
                        </div>
                    ))}
                {data?.map((post, index) => (
                    <div
                        className="flex cursor-pointer flex-col gap-2 px-4 py-2 hover:bg-primary hover:bg-opacity-15"
                        key={index}
                        onClick={() => handleRouteSubBoard({ id: post.subBoardId })}
                    >
                        <span className=" rounded-md   text-sm font-light text-neutral-700">
                            {`[${post.boardCategory}] `}
                            {post.title}
                        </span>
                        <div className=" flex flex-row justify-between">
                            <div className="flex shrink-0 flex-row gap-1">
                                <div className="relative h-4 w-4 ">
                                    <Image
                                        src={post.imageUrl}
                                        alt="user"
                                        sizes="20px"
                                        fill
                                        className="shrink-0 rounded-full"
                                    />
                                </div>
                                <span className="text-xs font-semibold text-neutral-800 tablet:hidden">
                                    {post.memberName}
                                </span>
                            </div>
                            <span className="text-xs font-light text-green-600">
                                {post.schoolName}ㅣ{post.majorName}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HotSubBoards;
