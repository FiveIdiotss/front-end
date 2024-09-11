import { useFormattedTime } from '@/app/(nonHeader)/_hooks/useFormattedConsultTimes';
import { useChatContentStore } from '@/app/_store/chatContentStore';
import useConfirmationModal from '@/app/util/ConfirmModalHook';
import Axios from '@/app/util/axiosInstance';
import { pushNotification } from '@/app/util/pushNotification';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { ServerValueType } from '../ChatItem';
import { useChatInfoStore } from '@/app/_store/chatInfoStore';

function MessageExtendConfirm({
    chatId,
    messageType,
}: {
    chatId: number;
    messageType: { type: string; value: ServerValueType };
}) {
    const { setCompleteExtendMessagesId, completeExtendMessagesId } = useChatContentStore();
    const { receiverName, isLoginMentor, chatRoomId, setAddConsultTime } = useChatInfoStore();

    const { formattedExtendedTime, formattedEndTime } = useFormattedTime(); // 상담 연장 시간 계산
    const extendedTime = formattedExtendedTime(30); // 상담 연장 시간

    const acceptMutation = useMutation({
        mutationFn: async () => await Axios.post(`/api/chat/extend/${chatId}?status=ACCEPT`),
        onError: () => {
            pushNotification({
                msg: '서버 에러',
                type: 'error',
                theme: 'light',
            });
        },
        onSuccess: () => {
            setCompleteExtendMessagesId(chatId); // 상담 연장 요청 수락시 상담 연장 완료 메시지로 변경(옵티미스틱)
            setAddConsultTime(30); // 상담 연장 시간 추가
        },
    });
    const rejectMutation = useMutation({
        mutationFn: async () => await Axios.post(`/api/chat/extend/${chatId}?status=DECLINE`),
        onError: () => {
            pushNotification({
                msg: '서버 에러',
                type: 'error',
                theme: 'light',
            });
        },
        onSuccess: () => {
            setCompleteExtendMessagesId(chatId); // 상담 연장 요청 거절시 상담 연장 완료 메시지로 변경(옵티미스틱)
        },
    });

    const { handleOpenModal: handleOpenAcceptModal, ConfirmationModalComponent: AcceptConfirmModal } =
        useConfirmationModal({
            title: '✔',
            subTitle: '상담 연장을 수락하시겠습니까?',
            isPending: acceptMutation.isPending,

            onConfirm: () => {
                acceptMutation.mutate();
            },
        });
    const { handleOpenModal: handleOpenRejectModal, ConfirmationModalComponent: RejectCofirmModal } =
        useConfirmationModal({
            title: '✘',
            subTitle: '상담 연장을 거절 하시겠습니까?',
            isPending: rejectMutation.isPending,

            onConfirm: () => {
                rejectMutation.mutate();
            },
        });
    const isCompleteMessage =
        messageType.value === 'consultExtendComplete' || completeExtendMessagesId.includes(chatId);

    if (!isLoginMentor) {
        return (
            <div className="flex w-full flex-col items-center gap-3 pb-2 ">
                <span className="text-neutral-700">
                    <span className="font-semibold text-red-600">[대기중] </span>멘토에게 상담 연장을 요청하였습니다.
                </span>
                <span className="font-semibold text-blue-600">{`${formattedEndTime} → ${extendedTime}`}</span>
            </div>
        );
    }
    return (
        <>
            <div className="flex  w-full flex-col items-center justify-center gap-3    ">
                <span className="  text-neutral-700">
                    <span className="  font-semibold text-red-500">{receiverName}</span> 님이 상담 연장을
                    요청하였습니다.
                </span>
                <div className="flex flex-col items-center">
                    <span className="font-semibold text-blue-600">종료시간:</span>
                    <span className="font-semibold text-blue-600">{`${formattedEndTime} → ${extendedTime}`}</span>
                </div>

                {!isCompleteMessage && (
                    <>
                        <span className="mt-5 text-xs text-red-400">*선택 해주세요</span>
                        <div className=" flex w-full flex-col justify-center gap-2   ">
                            <button
                                className="h-10  w-full rounded-md bg-green-600 text-white hover:bg-green-500"
                                onClick={handleOpenAcceptModal}
                            >
                                요청 수락
                            </button>
                            <button
                                onClick={handleOpenRejectModal}
                                className=" h-10 w-full  rounded-md bg-red-400 text-white hover:bg-red-300"
                            >
                                거절
                            </button>
                        </div>
                    </>
                )}
                {isCompleteMessage && (
                    <div className="flex w-full flex-col items-center gap-2">
                        <span className="font-semibold text-gray-500">처리된 건 입니다.</span>
                    </div>
                )}
            </div>
            {AcceptConfirmModal}
            {RejectCofirmModal}
        </>
    );
}

export default MessageExtendConfirm;
