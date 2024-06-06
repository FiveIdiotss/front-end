import StandardModal from '@/app/(afterLogin)/_component/common/StandardModal';
import MentoStepContent from '@/app/(afterLogin)/posts/mentor/_component/MentoStepContent';
import React from 'react';
type Props = {
    boardId: string;
    onClose: () => void;
};
function RequestReceivedDetailContent({ boardId, onClose }: Props) {
    const id = Number(boardId);
    return (
        <StandardModal title={'상세정보'} onClose={onClose}>
            <MentoStepContent id={id} onlyContent />
        </StandardModal>
    );
}

export default RequestReceivedDetailContent;
