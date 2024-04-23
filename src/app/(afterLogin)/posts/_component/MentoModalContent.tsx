import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { MentoDetail, fetchMentoDetail } from '../_lib/posts';
import Loading from '@/app/_component/Loading';
import SchoolIcon from '../../_component/icon/SchoolIcon';
import HeartIcon from '../../_component/icon/HeartIcon';
import SectionDivider from '../../_component/SectionDivider';
import UserIcon from '../../_component/icon/UserIcon';
import { usePostsStore } from '../../_store/postsStore';
import { useSession } from 'next-auth/react';

const text = `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`;

function MentoModalContent({ id }: { id: string }) {
    const { data, isLoading, isError } = useQuery<MentoDetail>({
        queryKey: ['mento', 'detail', id],
        queryFn: () => fetchMentoDetail(id),
    });
    const { data: session } = useSession();
    const { setPageStep, setSchedule, setErrorMessage } = usePostsStore();

    let year = data?.boardDTO.year.toString().substring(2, 4); // 학번 뒤 두자리만 가져오기

    useEffect(() => {
        console.log(`멘토 상세데이터`, data);
        if (!data) return;
        setSchedule(
            data?.availableDays,
            data?.consultTime,
            data?.times,
            data?.boardDTO.memberName,
            data?.boardDTO.title,
        );
    }, [data]);

    const nextHandler = () => {
        if (data?.boardDTO.memberName === session?.user?.memberDTO.name)
            return setErrorMessage('자신의 멘토링은 신청할수 없습니다');
        setPageStep(1);
    };

    if (isLoading) return <Loading />;
    if (isError) return <div className="text-red-500">서버에러</div>;
    return (
        <>
            <div className="mt-7 flex  w-full flex-grow flex-col overflow-y-auto">
                <div className="flex   w-full flex-col ">
                    <h3 className="mb-11">{data?.boardDTO.title}</h3>
                    <div className=" flex w-full  flex-row items-center gap-3">
                        {/* 이미지필요 */}
                        <div className="flex h-20 w-20 items-center justify-center rounded-full border-2  text-neutral-500 ">
                            image
                        </div>
                        <div className="flex  flex-col gap-1">
                            <span className="text-lg text-neutral-700  ">{data?.boardDTO.memberName}</span>
                            <span className=" flex h-5 w-5 items-center justify-center rounded-md bg-blue-300 text-xs text-white ">
                                남
                            </span>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-row gap-2 ">
                        <div className="mt-[2px] h-5 w-5">
                            <SchoolIcon />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span>{data?.boardDTO.schoolName}</span>
                            <span className="text-sm text-neutral-500">
                                {year}학번ㅣ{data?.boardDTO.majorName}
                            </span>
                        </div>
                    </div>
                    <dl>
                        <div className=" mx-auto  mt-10 flex h-20 w-4/5 flex-row rounded-md border bg-gray-100 py-3">
                            <div className="flex flex-1 flex-col items-center justify-center">
                                <dt className=" text-sm font-light text-neutral-700">관심</dt>
                                <dd className="flex  flex-row items-center gap-1 ">
                                    <div className="mt-[1px] h-4 w-4">
                                        <HeartIcon fill="red" isCheck={true} />
                                    </div>
                                    <span className="text-neutral-700">20회</span>
                                </dd>
                            </div>
                            <SectionDivider position="y" />

                            <div className="flex flex-1 flex-col  items-center justify-center">
                                <dt className="text-sm font-light text-neutral-700">상담</dt>
                                <dd className="flex  flex-row items-center gap-1 ">
                                    <div className="mt-[1px] h-4 w-4">
                                        <UserIcon fill="green" />
                                    </div>
                                    <span className="text-neutral-700">70회</span>
                                </dd>
                            </div>
                            {/* <SectionDivider className="mx-2" position="y" />
                                <div className="flex flex-1 flex-col  items-center justify-center">
                                    <dt className="text-sm font-light text-neutral-700">채팅답변</dt>
                                    <dd className="flex  flex-row items-center gap-1 ">
                                        <div className="mt-[1px] h-4 w-4 ">
                                            <CheckIcon fill="green" />
                                        </div>
                                        <span>20회</span>
                                    </dd>
                                </div> */}
                            {/* 나중에 추가할수도 */}
                        </div>
                    </dl>
                    <SectionDivider className="my-4" />
                    <div className="flex  w-full flex-col">
                        <span className=" mb-2 font-semibold">멘토링 설명</span>
                        <div
                            className="html-content space-y-2"
                            dangerouslySetInnerHTML={{ __html: data?.boardDTO.content as string }}
                        />
                    </div>
                </div>
            </div>

            <div className="flex h-fit w-full  justify-end">
                <button
                    className="mt-7 h-10   rounded-md border border-solid border-gray-300 bg-primary px-5 text-white  hover:scale-105  "
                    onClick={nextHandler}
                >
                    신청하기
                </button>
            </div>
        </>
    );
}

export default MentoModalContent;
