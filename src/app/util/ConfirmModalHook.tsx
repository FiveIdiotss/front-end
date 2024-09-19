import { useState, useCallback, ReactNode } from 'react';
import ConfirmationModal from '../_component/ConfirmationModal';

function useConfirmationModal({
    onConfirm,
    confirmButtonLabel,
    title,
    subTitle,
    description,
    isPending,
}: {
    onConfirm: () => void;
    confirmButtonLabel?: string;
    title: string;
    subTitle?: string;
    description?: string;
    isPending?: boolean;
}) {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = useCallback(() => {
        setModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setModalOpen(false);
    }, []);

    const handleConfirm = useCallback(() => {
        onConfirm();
        handleCloseModal();
    }, [onConfirm, handleCloseModal]);

    const ConfirmationModalComponent: ReactNode = modalOpen && (
        <ConfirmationModal
            confirmButtonLabel={confirmButtonLabel}
            title={title}
            subTitle={subTitle}
            description={description}
            onClose={handleCloseModal}
            onConfirm={handleConfirm}
            isLoading={isPending}
        />
    );

    return {
        handleOpenModal,
        ConfirmationModalComponent,
    };
}

export default useConfirmationModal;
