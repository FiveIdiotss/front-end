'use client';
import FaChevronRight from '@/app/(afterLogin)/_component/icon/chevronRight';
import { MentoringReqData } from '../../_lib/mentoringReqReceive';
import RequestReceivedDetailReview from './RequestReceivedDetailReview';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import RequestReceivedDetailContent from './RequestReceivedDetailContent';
import { toast } from 'react-toastify';
import { pushNotification } from '@/app/util/pushNotification';
import ConfirmationModal from '@/app/_component/ConfirmationModal';
import { useMutation } from '@tanstack/react-query';
import Axios from '@/app/util/axiosInstance';
const dateFormat = (date: string) => {
    const dateObj = new Date(date);

    return `${dateObj.getFullYear()}.${(dateObj.getMonth() + 1).toString().padStart(2, '0')}.${dateObj.getDate().toString().padStart(2, '0')}`;
};
function RequestReceivedCard({ data }: { data: MentoringReqData }) {
    const router = useRouter();
    const [detailOpen, setDetailOpen] = useState(false);
    const [detailMoveOpen, setDetailMoveOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [action, setAction] = useState<'accept' | 'reject' | null>(null);

    const mutationAccept = useMutation({
        mutationFn: (applyId: number) => Axios.post(`/api/apply/${applyId}`),
        onSuccess: () => {
            setIsConfirmModalOpen(false);
            setAction(null);
            pushNotification('수락 완료', 'success', 'dark');
        },
        onError: () => {
            setIsConfirmModalOpen(false);
            setAction(null);

            pushNotification('에러', 'error', 'dark');
        },
    }); //수락 요청
    const mutationReject = useMutation({
        mutationFn: (applyId: number) => Axios.post(`/api/reject/${applyId}`),

        onSuccess: () => {
            setIsConfirmModalOpen(false);
            setAction(null);
            pushNotification('거절 완료', 'success', 'dark');
        },
        onError: () => {
            setIsConfirmModalOpen(false);
            setAction(null);
            pushNotification('에러', 'error', 'dark');
        },
    }); //거절 요청

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

    const openConfirmModal = (type: 'reject' | 'accept') => {
        setAction(type);
        setIsConfirmModalOpen(true);
    }; //확인 모달열기 , 수락 거절

    const closeConfirmModal = () => {
        setIsConfirmModalOpen(false);
        setAction(null);
    }; //확인 모달 닫기, 수락 거절

    const handleconfirm = () => {
        if (action === 'accept') {
            mutationAccept.mutate(data.applyId);
        } else if (action === 'reject') {
            mutationReject.mutate(data.applyId);
        }
        closeConfirmModal();
    }; //수락 거절 확인

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
                    <div className="flex h-full w-32 flex-col items-center  justify-center gap-2 border-l border-neutral-300 px-4">
                        {data.applyState === 'HOLDING' && (
                            <>
                                <button
                                    className="w-full rounded-md border border-indigo-400 py-1 text-xs text-indigo-400 hover:border-indigo-700  hover:text-indigo-700"
                                    onClick={() => openConfirmModal('accept')}
                                >
                                    수락하기
                                </button>
                                <button
                                    className="w-full rounded-md border border-neutral-400 py-1 text-xs text-neutral-600 hover:border-red-700  hover:text-red-700"
                                    onClick={() => openConfirmModal('reject')}
                                >
                                    거절하기
                                </button>
                            </>
                        )}
                        {data.applyState === 'COMPLETE' && (
                            <Link
                                href={'/chat'}
                                className="w-full rounded-md border border-indigo-400 py-1 text-center text-xs text-indigo-400 hover:border-indigo-700  hover:text-indigo-700"
                            >
                                채팅하기
                            </Link>
                        )}
                    </div>
                </div>
            </section>
            <ConfirmationModal
                open={isConfirmModalOpen}
                onClose={closeConfirmModal}
                text={action === 'accept' ? '수락하시겠습니까?' : '거절하시겠습니까?'}
                onConfirm={handleconfirm}
                isLoading={mutationAccept.isPending || mutationReject.isPending}
            />
            {detailOpen && <RequestReceivedDetailReview onClose={handleDetailClose} applyId={data.applyId} />}
            {detailMoveOpen && (
                <RequestReceivedDetailContent onClose={handleDetailContentClose} boardId={`${data.boardId}`} />
            )}
        </>
    );
}

export default RequestReceivedCard;
