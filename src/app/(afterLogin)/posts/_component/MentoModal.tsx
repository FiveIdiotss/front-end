'use client';

import MentoStepContent from './MentoStepContent';
import MentoStepConsultationForm from './MentoStepConsultationForm';
import { usePostsStore } from '../../_store/postsStore';
import { useEffect } from 'react';
import WarningMessage from '@/app/_component/WarningMessage';
import MentoStepConsultationReview from './MentoStepConsultationReview';
import StandardModal from '../../_component/common/StandardModal';
import { useRouter } from 'next/navigation';

function MentoModal({ id, onClose }: { id: number; onClose: () => void }) {
    const { pageStep, setInit, setErrorMessage, errorMessage } = usePostsStore();
    useEffect(() => {
        return () => {
            setInit();
        };
    }, [setInit]); //모달 언마운트시 초기화
    const onCloseError = () => {
        setErrorMessage('');
    };

    const title = pageStep === 0 ? '멘토링 소개' : pageStep === 1 ? '신청하기' : '신청서 확인';
    const subTitle = pageStep !== 0 ? `${pageStep}/2` : '';
    return (
        <StandardModal title={title} subTitle={subTitle} onClose={onClose}>
            {pageStep === 0 && <MentoStepContent id={id} />}
            {pageStep === 1 && <MentoStepConsultationForm />}
            {pageStep === 2 && <MentoStepConsultationReview id={id} />}
            <WarningMessage text={errorMessage} isOpen={errorMessage !== ''} onClose={onCloseError} />
        </StandardModal>
    );
}

export default MentoModal;
