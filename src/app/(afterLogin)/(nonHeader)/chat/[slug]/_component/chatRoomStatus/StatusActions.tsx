'use client';
import CloseIcon from '@/app/(afterLogin)/_component/icon/CloseIcon';
import TimeExtendIcon from '@/app/(afterLogin)/_component/icon/TimeExtendIcon';
import React, { useState } from 'react';
import ConsultDelayModal from './ConsultDelayModal';
import useConfirmationModal from '@/app/util/ConfirmModalHook';
import { set } from 'lodash';
import { useChatStore } from '@/app/(afterLogin)/_store/chatStore';

function StatusActions() {
    const [modalOpen, setModalOpen] = useState(false);
    const {} = useChatStore();
    const { handleOpenModal, ConfirmationModalComponent } = useConfirmationModal({
        onConfirm: () => {
            console.log('confirm');
        },
        title: '상담 종료',
        subTitle: '상담을 종료하시겠습니까?',
    });

    const delayModalOpen = () => {
        setModalOpen(true);
    };
    const delayModalClose = () => {
        setModalOpen(false);
    };

    return (
        <>
            <div className="flex flex-row   border-b py-8 ">
                <button
                    className=" mx-auto flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-md border border-neutral-300 bg-red-50 "
                    onClick={handleOpenModal}
                >
                    <CloseIcon className="h-6 w-6 text-red-400" />
                    <span className="text-sm text-red-400">상담종료</span>
                </button>
                <button
                    className="mx-auto flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-md border border-neutral-300 bg-blue-50 "
                    onClick={delayModalOpen}
                >
                    <TimeExtendIcon className="h-6 w-6 text-blue-500" />
                    <span className="text-sm text-blue-500">상담연장</span>
                </button>
            </div>
            <ConsultDelayModal onClose={delayModalClose} open={modalOpen} />
            {ConfirmationModalComponent}
        </>
    );
}

export default StatusActions;
