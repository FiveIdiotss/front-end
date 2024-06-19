import { useState, useCallback, ReactNode } from 'react';
import ConfirmationModal from '../_component/ConfirmationModal';

function useConfirmationModal({
    onConfirm,
    confirmButtonLabel,
    title,
    subTitle,
    description,
}: {
    onConfirm: () => void;
    confirmButtonLabel?: string;
    title: string;
    subTitle?: string;
    description?: string;
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

    const ConfirmationModalComponent: ReactNode = (
        <ConfirmationModal
            open={modalOpen}
            confirmButtonLabel={confirmButtonLabel}
            title={title}
            subTitle={subTitle}
            description={description}
            onClose={handleCloseModal}
            onConfirm={handleConfirm}
            isLoading={false}
        />
    );

    return {
        handleOpenModal,
        ConfirmationModalComponent,
    };
}

export default useConfirmationModal;
