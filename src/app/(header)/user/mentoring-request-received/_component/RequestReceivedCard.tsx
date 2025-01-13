'use client';
import FaChevronRight from '@/app/_icons/common/chevronRight';
import { MentoringReqData } from '../../_lib/mentoringReqReceive';
import RequestReceivedDetailReview from './RequestReceivedDetailReview';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import RequestReceivedDetailContent from './RequestReceivedDetailContent';
import { toast } from 'react-toastify';
import { pushNotification } from '@/app/util/pushNotification';
import ConfirmationModal from '@/app/_component/ConfirmationModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Axios from '@/app/util/axiosInstance';
const dateFormat = (date: string) => {
    const dateObj = new Date(date);

    return `${dateObj.getFullYear()}.${(dateObj.getMonth() + 1).toString().padStart(2, '0')}.${dateObj.getDate().toString().padStart(2, '0')}`;
};
function RequestReceivedCard({ data }: { data: MentoringReqData }) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [detailOpen, setDetailOpen] = useState(false);
    const [detailMoveOpen, setDetailMoveOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [action, setAction] = useState<'accept' | 'reject' | null>(null);

    const mutationAccept = useMutation({
        mutationFn: (applyId: number) => Axios.post(`/api/apply/${applyId}`),
        onSuccess: () => {
            setIsConfirmModalOpen(false);
            setAction(null);
            queryClient.invalidateQueries({
                queryKey: ['mentoringRequests'],
            });

            pushNotification({
                msg: '수락 완료',
                type: 'success',
                theme: 'dark',
            });
        },
        onError: () => {
            setIsConfirmModalOpen(false);
            setAction(null);

            pushNotification({
                msg: '에러',
                type: 'error',
                theme: 'dark',
            });
        },
    }); //수락 요청
    const mutationReject = useMutation({
        mutationFn: (applyId: number) => Axios.post(`/api/reject/${applyId}`),

        onSuccess: () => {
            setIsConfirmModalOpen(false);
            queryClient.invalidateQueries({
                queryKey: ['mentoringRequests'],
            });

            setAction(null);
            pushNotification({
                msg: '거절 완료',
                type: 'success',
                theme: 'dark',
            });
        },
        onError: () => {
            setIsConfirmModalOpen(false);
            setAction(null);
            pushNotification({
                msg: '에러',
                type: 'error',
                theme: 'dark',
            });
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
            <section className="mb-4 flex  w-full flex-col gap-3 rounded-lg border border-gray-300 bg-white p-4 shadow-sm shadow-gray-100 mobile:gap-4">
                <header className="flex flex-row items-end justify-between">
                    <span className="text-base font-semibold text-neutral-800">{dateFormat(data.applyTime)} 신청</span>
                    <button className="flex flex-row items-center gap-1 " onClick={handleDetailOpen}>
                        <span className="text-sm font-light text-indigo-500">신청 상세보기</span>

                        <FaChevronRight className="h-3 w-3 text-indigo-500" />
                    </button>
                </header>

                <div className=" flex  flex-col border-t  border-gray-100 mobile:flex-row">
                    <div className="flex flex-grow flex-col gap-3 p-2">
                        <div className="flex flex-row items-center gap-1">
                            <span className="font-semibold">상담신청</span>
                            <span
                                className={`text-lg  ${data.applyState === 'HOLDING' ? 'text-yellow-600' : data.applyState === 'REJECT' ? 'text-red-500' : 'text-green-600'}`}
                            >
                                ·
                            </span>
                            <span
                                className={`text-sm  ${data.applyState === 'HOLDING' ? 'text-yellow-600' : data.applyState === 'REJECT' ? 'text-red-500' : 'text-green-600'}`}
                            >
                                {`${data.applyState === 'HOLDING' ? '확인중' : data.applyState === 'REJECT' ? '거절' : '수락'}`}
                            </span>
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
                                <span className="flex flex-col text-xs text-neutral-500 mobile:flex-row">
                                    멘토:&nbsp;
                                    <span className="font-medium text-indigo-500">{data.otherMemberName}</span>
                                </span>
                                <span className="flex flex-col text-xs text-neutral-500 mobile:flex-row">
                                    상담날짜:&nbsp;
                                    <span className="font-medium text-indigo-500">
                                        {data.date.replaceAll('-', '.')}
                                    </span>
                                </span>
                                <span className="flex flex-col text-xs text-neutral-500 mobile:flex-col">
                                    예정시간:&nbsp;
                                    <span className="font-medium text-indigo-500">
                                        {data.startTime.replace(':00', '')}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 flex h-full w-full flex-col  items-center justify-center  gap-2 mobile:w-28 ">
                        {data.applyState === 'HOLDING' && (
                            <>
                                <button
                                    className="w-full rounded-sm border border-indigo-500 py-2 text-xs  text-indigo-500 hover:bg-gray-50"
                                    onClick={() => openConfirmModal('accept')}
                                >
                                    수락하기
                                </button>
                                <button
                                    className="w-full rounded-sm border  border-red-300 py-2 text-xs text-red-300 hover:bg-gray-50"
                                    onClick={() => openConfirmModal('reject')}
                                >
                                    거절하기
                                </button>
                            </>
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
                {data.applyState === 'REJECT' && (
                    <div className="flex border-t border-gray-100 p-2">
                        <span className="text-xs text-gray-500 ">
                            거절사유: <span>{data.applyContent}</span>
                        </span>
                    </div>
                )}
            </section>
            {isConfirmModalOpen && (
                <ConfirmationModal
                    onClose={closeConfirmModal}
                    title={action === 'accept' ? '수락하시겠습니까?' : '거절하시겠습니까?'}
                    onConfirm={handleconfirm}
                    isLoading={mutationAccept.isPending || mutationReject.isPending}
                />
            )}
            {detailOpen && <RequestReceivedDetailReview onClose={handleDetailClose} applyId={data.applyId} />}
            {detailMoveOpen && (
                <RequestReceivedDetailContent onClose={handleDetailContentClose} boardId={`${data.boardId}`} />
            )}
        </>
    );
}

export default RequestReceivedCard;
