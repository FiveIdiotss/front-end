'use client';
import TimeExtendIcon from '@/app/_icons/common/TimeExtendIcon';
import React from 'react';
import useConfirmationModal from '@/app/util/ConfirmModalHook';
import { useMutation } from '@tanstack/react-query';
import Axios from '@/app/util/axiosInstance';
import { pushNotification } from '@/app/util/pushNotification';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/app/Models/AxiosResponse';
import { useChatInfoStore } from '@/app/_store/chatInfoStore';

function StatusActions() {
    const { chatRoomId, isLoginMentor } = useChatInfoStore();

    const mutation = useMutation({
        mutationFn: () => Axios.post(`/api/chat/extend/request/${chatRoomId}`),
        onError: (error: AxiosError<ErrorResponse>) => {
            pushNotification({
                msg: error.response?.data.message || '서버에러',
                type: 'error',
                theme: 'light',
            });
            console.error(error.response?.data);
        },
    });

    const { handleOpenModal, ConfirmationModalComponent } = useConfirmationModal({
        onConfirm: () => {
            mutation.mutate();
        },
        title: '상담 연장',
        subTitle: '상담을 연장하시겠습니까?',
        description: '',
        isPending: mutation.isPending,
    });

    if (isLoginMentor) {
        return null;
    }

    return (
        <>
            <div className="flex flex-row    bg-white  py-4 ">
                <button
                    className="mx-auto flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-md border border-gray-200 bg-blue-50 "
                    onClick={handleOpenModal}
                >
                    <TimeExtendIcon className="h-6 w-6 text-blue-500" />
                    <span className="text-sm text-blue-500">상담연장</span>
                </button>
            </div>
            {ConfirmationModalComponent}
        </>
    );
}

export default StatusActions;
