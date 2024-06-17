import { useState, useCallback, ReactNode } from 'react';
import ConfirmationModal from '../_component/ConfirmationModal';

function useConfirmationModal({ onConfirm, message }: { onConfirm: () => void; message: string }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState(message);

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

    const setModalContent = useCallback((message: string) => {
        setModalMessage(message);
    }, []);

    const ConfirmationModalComponent: ReactNode = (
        <ConfirmationModal
            open={modalOpen}
            text={modalMessage}
            onClose={handleCloseModal}
            onConfirm={handleConfirm}
            isLoading={false}
        />
    );

    return {
        handleOpenModal,
        setModalContent,
        ConfirmationModalComponent,
    };
}

export default useConfirmationModal;
