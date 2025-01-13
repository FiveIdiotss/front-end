'use client';
import FaChevronRight from '@/app/_icons/common/chevronRight';
import { MentoringReqData } from '../../_lib/mentoringReqService';
import MentoringRequestDetailReview from './RequestDetailReview';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MentoringRequestDetailContent from './RequestDetailContent';
import ArrowLeftBackIcon from '@/app/_icons/common/ArrowLeftBackIcon';
const dateFormat = (date: string) => {
    const dateObj = new Date(date);

    return `${dateObj.getFullYear()}.${(dateObj.getMonth() + 1).toString().padStart(2, '0')}.${dateObj.getDate().toString().padStart(2, '0')}`;
};

function MentoringRequestCard({ data }: { data: MentoringReqData }) {
    const router = useRouter();
    const [detailOpen, setDetailOpen] = useState(false);
    const [detailMoveOpen, setDetailMoveOpen] = useState(false);

    const handleDetailOpen = () => {
        setDetailOpen(true);
    };
    const handleDetailClose = () => {
        setDetailOpen(false);
    };
    const handleDetailContentOpen = () => {
        setDetailMoveOpen(true);
    };
    const handleDetailContentClose = () => {
        setDetailMoveOpen(false);
    };
    return (
        <>
            <section className="mb-4 flex  w-full flex-col gap-3 rounded-lg border border-gray-300 bg-white p-4 shadow-sm shadow-gray-100 mobile:gap-4">
                <header className="flex flex-row items-end justify-between">
                    <span className="text-base font-semibold text-neutral-800">{dateFormat(data.applyTime)} 신청</span>
                    <button className="flex flex-row items-center gap-1 " onClick={handleDetailOpen}>
                        <span className="text-sm font-light text-indigo-500">신청 상세보기</span>

                        <FaChevronRight className="h-3 w-3 text-indigo-400" />
                    </button>
                </header>

                <div className=" flex  flex-col border-t  border-gray-100 mobile:flex-row">
                    <div className="flex flex-grow flex-col gap-3 p-2">
                        <div className="flex flex-row items-center gap-1">
                            <span className="pt-[2px] font-semibold">상담신청</span>
                            {/* <span
                                className={`text-lg  ${data.applyState === 'HOLDING' ? 'text-yellow-600' : data.applyState === 'REJECT' ? 'text-red-500' : 'text-green-600'}`}
                            ></span> */}
                            <span
                                className={`text-sm  ${data.applyState === 'HOLDING' ? 'text-yellow-600' : data.applyState === 'REJECT' ? 'text-red-500' : 'text-green-600'}`}
                            >
                                {`${data.applyState === 'HOLDING' ? '(확인중)' : data.applyState === 'REJECT' ? '(거절)' : '(수락)'}`}
                            </span>
                            {data.applyState === 'COMPLETE' && (
                                <>
                                    <ArrowLeftBackIcon className="h-4 w-4 rotate-180" />

                                    <span className="pt-[2px] text-base font-semibold text-blue-600">매칭중</span>
                                </>
                            )}
                        </div>

                        <div className="flex w-full  items-start gap-3 mobile:flex-col">
                            <button
                                type="button"
                                className="flex flex-grow flex-row justify-start text-sm text-neutral-800"
                                onClick={handleDetailContentOpen}
                            >
                                {data.boardTitle}
                            </button>
                            <div className="flex flex-col items-start  gap-1 mobile:w-full mobile:flex-row mobile:gap-3">
                                <span className="flex flex-col text-xs text-neutral-500  mobile:flex-row">
                                    멘토:&nbsp;
                                    <span className="font-medium text-indigo-500">{data.otherMemberName}</span>
                                </span>
                                <span className="flex flex-col text-xs text-neutral-500 mobile:flex-row">
                                    상담날짜:&nbsp;
                                    <span className="font-medium text-indigo-500">
                                        {data.date.replaceAll('-', '.')}
                                    </span>
                                </span>
                                <span className="flex flex-col text-xs text-neutral-500 mobile:flex-row">
                                    예정시간:&nbsp;
                                    <span className="font-medium text-indigo-500">
                                        {data.startTime.replace(':00', '')}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className=" flex h-full  flex-col items-center  justify-center   mobile:w-28">
                        {data.applyState === 'HOLDING' && (
                            <button className="w-full rounded-sm border border-indigo-300 py-2 text-xs text-indigo-400">
                                신청 취소
                            </button>
                        )}
                        {data.applyState === 'COMPLETE' && (
                            <Link
                                href={'/chat'}
                                className="mt-2 w-full rounded-sm border border-indigo-400 py-2 text-center text-xs text-indigo-400 hover:bg-gray-50"
                            >
                                채팅하기
                            </Link>
                        )}
                    </div>
                </div>
            </section>
            {detailOpen && <MentoringRequestDetailReview onClose={handleDetailClose} applyId={data.applyId} />}
            {detailMoveOpen && (
                <MentoringRequestDetailContent onClose={handleDetailContentClose} boardId={`${data.boardId}`} />
            )}
        </>
    );
}

export default MentoringRequestCard;
