'use client';
import React, { useEffect } from 'react';
import Loading from '@/app/_component/Loading';
import SchoolIcon from '@/app/_icons/common/SchoolIcon';
import SectionDivider from '@/app/_component/common/SectionDivider';
import { usePostsStore } from '@/app/_store/postsStore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMentorDetailQuery } from '../../_lib/mentorService';
import ErrorDataUI from '@/app/_component/ErrorDataUI';
import Image from 'next/image';

interface Props {
    id: number;
    onlyContent?: boolean;
}

function MentoStepContent({ id, onlyContent }: Props) {
    const router = useRouter();

    // onlyContent가 true면 신청하기 버튼이 아닌 리스트로 이동하는 버튼으로 변경
    const mentorDetailQuery = useMentorDetailQuery({ mentorId: id });
    const { data, isPending, error } = mentorDetailQuery;
    const { data: session } = useSession();

    const { setPageStep, setSchedule, setErrorMessage } = usePostsStore();

    let year;
    if (year === 0) {
        year = '학번 없음';
    } else {
        year = data?.boardDTO?.year.toString().substring(2, 4); // 학번 뒤 두자리만 가져오기
    }

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

    if (isPending) return <Loading className="h-full" description="데이터를 불러오는 중이에요!" />;
    if (error) return <ErrorDataUI text="에러가 발생했습니다. " />;
    return (
        <>
            <div className="mt-7 flex  w-full flex-grow flex-col overflow-y-auto">
                <div className="flex   w-full flex-col ">
                    <h3 className="mb-8">{data?.boardDTO.title}</h3>

                    <div className=" flex w-full  flex-row items-center gap-3">
                        {/* 이미지필요 */}
                        <div className="i relative flex h-20 w-20 rounded-full border-2  text-neutral-500 ">
                            <Image
                                src={data?.boardDTO.memberImageUrl}
                                alt="멘토 이미지"
                                fill={true}
                                sizes="130"
                                className="rounded-full object-cover"
                            />
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
                    {/* <dl>
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
                        </div>
                    </dl> */}
                    <SectionDivider className="my-4" />
                    <div className="flex  w-full flex-col">
                        {/* <span className=" mb-2 font-semibold">멘토링 설명</span> */}
                        {data?.boardDTO.platform === 'WEB' ? (
                            <div
                                className="html-content min-h-72 w-full border-b  p-2 text-sm "
                                dangerouslySetInnerHTML={{ __html: data.boardDTO.content }}
                            />
                        ) : (
                            <div className="html-content flex min-h-72  w-full flex-col border-b p-5 text-sm ">
                                <p className="mb-10">{data.boardDTO.content}</p>
                                {data.boardImageUrls.map((imageUrl, index) => (
                                    <div key={index} className="relative h-72 w-full">
                                        <Image
                                            src={imageUrl.boardImageUrl}
                                            alt="게시글 이미지"
                                            fill={true}
                                            sizes="100%"
                                            className="rounded-lg"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* onlyContent일때와 아닐때 버튼을 다르게 함 */}
            <div className="flex h-fit w-full  justify-end">
                {onlyContent && (
                    <Link
                        href={`/posts/mentor?mentor_board_id=${id}`}
                        prefetch={false}
                        className="mt-7 flex h-10  cursor-pointer items-center  px-5 font-semibold text-neutral-600 underline underline-offset-2 hover:text-primary "
                    >
                        멘토 리스트 이동
                    </Link>
                )}

                {/* 자신의 멘토링일때 수정하기,아니면 신청하기 */}
                {!onlyContent &&
                    (data?.boardDTO.memberName !== session?.user?.memberDTO.name ? (
                        <button
                            className="mt-7 h-10   rounded-md border border-solid border-gray-300 bg-primary px-5 text-white  hover:scale-105  "
                            onClick={nextHandler}
                        >
                            신청하기
                        </button>
                    ) : (
                        <button
                            className="mt-7 h-10   rounded-md border border-solid border-gray-300 bg-primary px-5 text-white  hover:scale-105"
                            onClick={() => router.push('/posts/mentor')}
                        >
                            수정하기
                        </button>
                    ))}
            </div>
        </>
    );
}

export default MentoStepContent;
