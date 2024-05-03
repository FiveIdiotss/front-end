import StandardModal from '@/app/(afterLogin)/_component/common/StandardModal';
import MentoStepContent from '@/app/(afterLogin)/posts/_component/MentoStepContent';
import React from 'react';
type Props = {
    boardId: string;
    onClose: () => void;
};
function MentoringRequestDetailContent({ boardId, onClose }: Props) {
    return (
        <StandardModal title={'상세정보'} onClose={onClose}>
            <MentoStepContent id={boardId} onlyContent />
        </StandardModal>
    );
}

export default MentoringRequestDetailContent;
