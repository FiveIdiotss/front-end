'use client';
import StandardModal from '@/app/_component/common/StandardModal';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { MentoringReqDetail, mentoringReqDetailFetch } from '../../_lib/mentoringReqService';
import { useEffect } from 'react';
import SectionDivider from '@/app/_component/common/SectionDivider';
import Loading from '@/app/_component/Loading';
import ArrowLeftBackIcon from '@/app/_icons/common/ArrowLeftBackIcon';
import Link from 'next/link';
type Props = {
    onClose: () => void;
    applyId: number;
};

function MentoringRequestDetailReview({ onClose, applyId }: Props) {
    const { data: session } = useSession();
    const { data, isLoading, error } = useQuery<MentoringReqDetail>({
        queryKey: ['mentoringRequest', 'detail', applyId],
        queryFn: () => mentoringReqDetailFetch(applyId),
    });
    useEffect(() => {
        console.log(data);
    }, [data]);
    if (isLoading)
        return (
            <StandardModal onClose={onClose} title="상세정보">
                <Loading />
            </StandardModal>
        );
    if (error) return <div>에러가 발생했습니다.</div>;

    return (
        <StandardModal onClose={onClose} title="상세정보">
            <div className="mt-7 flex  w-full flex-grow flex-col gap-10 overflow-y-auto">
                <dl className="flex w-full  flex-col gap-5  p-4">
                    <div className="flex flex-col items-center justify-center gap-4  mobile:flex-row">
                        <div className="flex  w-full flex-row  items-center justify-start gap-1   mobile:flex-grow">
                            <dt className="w-20 flex-shrink-0 font-semibold text-gray-800 mobile:w-24">진행상황:</dt>
                            <div className="flex flex-row items-center gap-1">
                                <span className="pt-[2px] font-light">상담신청</span>
                                {/* <span
                                className={`text-lg  ${data.applyState === 'HOLDING' ? 'text-yellow-600' : data.applyState === 'REJECT' ? 'text-red-500' : 'text-green-600'}`}
                            ></span> */}
                                <span
                                    className={`text-sm  ${data?.applyState === 'HOLDING' ? 'text-yellow-600' : data?.applyState === 'REJECT' ? 'text-red-500' : 'text-green-600'}`}
                                >
                                    {`${data?.applyState === 'HOLDING' ? '(확인중)' : data?.applyState === 'REJECT' ? '(거절)' : '(수락)'}`}
                                </span>
                                {data?.applyState === 'COMPLETE' && (
                                    <>
                                        <ArrowLeftBackIcon className="h-4 w-4 rotate-180" />

                                        <span className="pt-[2px] text-base   text-blue-600">매칭중</span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className=" flex  w-full flex-col items-center  justify-center   mobile:w-28">
                            {data?.applyState === 'HOLDING' && (
                                <button className="w-full rounded-sm border border-indigo-300 py-2 text-xs text-indigo-400">
                                    신청 취소
                                </button>
                            )}
                            {data?.applyState === 'COMPLETE' && (
                                <Link
                                    href={'/chat'}
                                    className=" w-full rounded-sm border border-indigo-400 py-2 text-center text-xs text-indigo-400 hover:bg-gray-50"
                                >
                                    채팅하기
                                </Link>
                            )}
                        </div>
                    </div>
                    <SectionDivider />
                    <div className="flex flex-row ">
                        <dt className="w-20 flex-shrink-0 font-semibold text-gray-800 mobile:w-24">멘토링명:</dt>
                        <dd className="font-light text-gray-700 ">{data?.boardTitle}</dd>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row ">
                            <dt className="w-24 font-semibold text-gray-800">멘토:</dt>
                            <dd className="font-light text-gray-700 ">{data?.memberName}</dd>
                        </div>
                        <div className=" flex flex-row">
                            <span className="ml-2 text-sm font-semibold text-gray-500">└</span>
                            <div className="flex flex-col">
                                <div className=" flex flex-row items-center">
                                    <dt className="w-10  text-center text-sm  font-semibold text-gray-500">대학</dt>
                                    <dd className="text-sm font-light text-gray-400 ">{data?.schoolName}</dd>
                                </div>
                                <div className=" flex flex-row items-center">
                                    <dt className="w-10 text-center text-sm  font-semibold text-gray-500">학과</dt>
                                    <dd className="text-sm font-light text-gray-400 ">{data?.majorName}</dd>
                                </div>
                                {/* <div className=" flex flex-row items-center">
                                <dt className="w-10 text-center text-sm  font-semibold text-gray-700">학번</dt>
                                <dd className="text-sm font-light text-gray-700 ">{data?.}</dd>
                            </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 flex  flex-row">
                        <dt className="w-24 font-semibold text-gray-800">멘티:</dt>
                        <dd className="font-light text-gray-700 ">{session?.user?.memberDTO.name}</dd>
                    </div>

                    <div className="flex flex-row items-center">
                        <dt className="w-24 font-semibold text-gray-800">일정:</dt>
                        <dd className="font-light text-indigo-500  ">
                            {data?.date.replaceAll('-', '.')} <span className=" font-semibold ">·</span>{' '}
                            {data?.startTime.replace(':00', '')}
                        </dd>
                    </div>
                    <div className="flex flex-row ">
                        <dt className="w-24 font-semibold text-gray-800">지원 글:</dt>
                        <dd className="font-light text-gray-700 ">{data?.content}</dd>
                    </div>
                </dl>
            </div>
        </StandardModal>
    );
}

export default MentoringRequestDetailReview;
