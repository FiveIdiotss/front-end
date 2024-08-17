'use client';
import FaChevronRight from '@/app/_icons/icon/chevronRight';
import { MentoringReq, MentoringReqData } from '../../_lib/mentoringReq';
import MentoringRequestDetailReview from './RequestDetailReview';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MentoringRequestDetailContent from './RequestDetailContent';
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
            <section className="mb-4 flex  w-full flex-col gap-6 rounded-lg border border-neutral-300 bg-white p-4 shadow-sm shadow-neutral-100">
                <header className="flex flex-row items-end justify-between">
                    <span className="text-base font-semibold text-neutral-800">{dateFormat(data.applyTime)} 신청</span>
                    <button className="flex flex-row items-center " onClick={handleDetailOpen}>
                        <span className="text-sm font-light text-indigo-500">신청 상세보기</span>

                        <FaChevronRight className="h-4 w-4 text-indigo-500" />
                    </button>
                </header>

                <div className=" flex   flex-row rounded-lg border border-neutral-300">
                    <div className="flex flex-grow flex-col gap-3 px-3  py-2">
                        <div className="flex flex-row items-center gap-1">
                            <span className="font-semibold">상담신청</span>
                            <span
                                className={`text-lg  ${data.applyState === 'HOLDING' ? 'text-yellow-600' : 'text-green-600'}`}
                            >
                                ·
                            </span>
                            <span
                                className={`text-sm  ${data.applyState === 'HOLDING' ? 'text-yellow-600' : 'text-green-600'}`}
                            >
                                {`${data.applyState === 'HOLDING' ? '확인중' : '수락'}`}
                            </span>
                        </div>
                        <div className="flex w-full flex-col items-start gap-2">
                            <span className="text-sm text-neutral-800">{data.boardTitle}</span>
                            <div className="flex w-full flex-row items-end justify-between">
                                <div className="flex flex-row gap-4">
                                    <span className="text-xs text-neutral-500">
                                        멘토:&nbsp;
                                        <span className="font-semibold text-indigo-500">{data.otherMemberName}</span>
                                    </span>
                                    <span className="text-xs text-neutral-500">
                                        상담날짜:&nbsp;
                                        <span className="font-semibold text-indigo-500">
                                            {data.date.replaceAll('-', '.')}
                                        </span>
                                    </span>
                                    <span className="text-xs text-neutral-500">
                                        예정시간:&nbsp;
                                        <span className="font-semibold text-indigo-500">
                                            {data.startTime.replace(':00', '')}
                                        </span>
                                    </span>
                                </div>

                                <span
                                    className="text-sm underline underline-offset-2  hover:cursor-pointer hover:font-semibold"
                                    onClick={handleDetailContentOpen}
                                >
                                    상세이동
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex h-full w-32 flex-col  items-center justify-center border-l border-neutral-300 px-4">
                        <button className="w-full rounded-md border border-indigo-400 py-1 text-xs text-indigo-400">
                            신청 취소
                        </button>
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
