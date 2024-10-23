import ModalWrapper from './ModalWrapper';
import React from 'react';
type Props = {
    children: React.ReactNode;
    onClose?: () => void;
    title: string;
    subTitle?: string;
    closeUrl?: string;
    shareUrl?: string;
};

function StandardModal({ children, shareUrl, onClose, title, subTitle, closeUrl }: Props) {
    return (
        <ModalWrapper
            title={title}
            subTitle={subTitle}
            closeUrl={closeUrl}
            className="max-h-[750px]  mobile:max-w-[600px]"
            onClose={onClose}
            shareUrl={shareUrl}
        >
            {children}
        </ModalWrapper>
    );
}

export default StandardModal;
