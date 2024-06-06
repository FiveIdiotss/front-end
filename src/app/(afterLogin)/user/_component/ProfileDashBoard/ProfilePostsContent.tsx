import StandardModal from '@/app/(afterLogin)/_component/common/StandardModal';
import MentoStepContent from '@/app/(afterLogin)/posts/mentor/_component/MentoStepContent';
import React from 'react';

function ProfilePostsContent({ boardId, onClose }: { boardId: number; onClose: () => void }) {
    return (
        <StandardModal title={'상세정보'} onClose={onClose}>
            <MentoStepContent id={boardId} />
        </StandardModal>
    );
}

export default ProfilePostsContent;
