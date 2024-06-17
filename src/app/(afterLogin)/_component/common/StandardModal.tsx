import ModalWrapper from '@/app/(afterLogin)/_component/ModalWrapper';
import BackButton from '@/app/(beforeLogin)/_component/BackButton';
import React from 'react';
type Props = {
    children: React.ReactNode;
    onClose?: () => void;
    title: string;
    subTitle?: string;
    closeUrl?: string;
};

function StandardModal({ children, onClose, title, subTitle, closeUrl }: Props) {
    return (
        <ModalWrapper
            title={title}
            subTitle={subTitle}
            closeUrl={closeUrl}
            className="max-h-[750px]  sm:max-w-[600px]"
            onClose={onClose}
        >
            {children}
        </ModalWrapper>
    );
}

export default StandardModal;
