import StandardModal from '@/app/_component/common/StandardModal';
import MentoStepContent from '../../../posts/mentor/_component/MentoStepContent';
import React from 'react';
type Props = {
    boardId: string;
    onClose: () => void;
};
function MentoringRequestDetailContent({ boardId, onClose }: Props) {
    const id = Number(boardId);
    return (
        <StandardModal title={'상세정보'} onClose={onClose}>
            <MentoStepContent id={id} onlyContent />
        </StandardModal>
    );
}

export default MentoringRequestDetailContent;
