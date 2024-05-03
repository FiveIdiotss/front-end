'use client';
import StandardModal from '@/app/(afterLogin)/_component/common/StandardModal';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { MentoringReqDetail, mentoringReqDetailFetch } from '../../_lib/mentoringReqPage';
import { useEffect } from 'react';
import SectionDivider from '@/app/(afterLogin)/_component/SectionDivider';
import Loading from '@/app/_component/Loading';
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
                <dl className="flex flex-col gap-5 rounded-md border border-neutral-300 p-4">
                    <div className="flex flex-row items-center gap-1">
                        <dt className="w-24 flex-shrink-0 font-semibold text-neutral-800">진행상황</dt>
                        <span className=" font-light text-neutral-700">상담신청</span>

                        <span className="text-yellow-500">·</span>
                        <span className="text-sm text-yellow-500">대기중</span>
                        <div className="flex flex-grow flex-row justify-end">
                            <button className="ml-12  h-8 rounded-md border border-indigo-400 px-4 text-xs text-indigo-400">
                                신청 취소
                            </button>
                        </div>
                    </div>
                    <SectionDivider />
                    <div className="flex flex-row ">
                        <dt className="w-24 flex-shrink-0 font-semibold text-neutral-800">멘토링명</dt>
                        <dd className="font-light text-neutral-700 ">{data?.boardTitle}</dd>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row ">
                            <dt className="w-24 font-semibold text-neutral-800">멘토</dt>
                            <dd className="font-light text-neutral-700 ">{data?.memberName}</dd>
                        </div>
                        <div className=" flex flex-row">
                            <span className="ml-2 text-sm font-semibold text-neutral-500">└</span>
                            <div className="flex flex-col">
                                <div className=" flex flex-row items-center">
                                    <dt className="w-10  text-center text-sm  font-semibold text-neutral-500">대학</dt>
                                    <dd className="text-sm font-light text-neutral-400 ">{data?.schoolName}</dd>
                                </div>
                                <div className=" flex flex-row items-center">
                                    <dt className="w-10 text-center text-sm  font-semibold text-neutral-500">학과</dt>
                                    <dd className="text-sm font-light text-neutral-400 ">{data?.majorName}</dd>
                                </div>
                                {/* <div className=" flex flex-row items-center">
                                <dt className="w-10 text-center text-sm  font-semibold text-neutral-700">학번</dt>
                                <dd className="text-sm font-light text-neutral-700 ">{data?.}</dd>
                            </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 flex  flex-row">
                        <dt className="w-24 font-semibold text-neutral-800">멘티</dt>
                        <dd className="font-light text-neutral-700 ">{session?.user?.memberDTO.name}</dd>
                    </div>

                    <div className="flex flex-row items-center">
                        <dt className="w-24 font-semibold text-neutral-800">일정</dt>
                        <dd className="font-light text-indigo-500  ">
                            {data?.date.replaceAll('-', '.')} <span className=" font-semibold ">·</span>{' '}
                            {data?.startTime.replace(':00', '')}
                        </dd>
                    </div>
                    <div className="flex flex-row ">
                        <dt className="w-24 font-semibold text-neutral-800">지원 글</dt>
                        <dd className="font-light text-neutral-700 ">{data?.content}</dd>
                    </div>
                </dl>
            </div>
        </StandardModal>
    );
}

export default MentoringRequestDetailReview;
