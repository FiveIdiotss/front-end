'use client';
import ModalWrapper from '../../_component/ModalWrapper';
import BackButton from '@/app/(beforeLogin)/_component/BackButton';

import MentoModalContent from './MentoModalContent';
import ConsultationForm from './ConsultationForm';
import { usePostsStore } from '../../_store/postsStore';
import { useEffect } from 'react';
import { set } from 'react-hook-form';
import Image from 'next/image';
import WarningMessage from '@/app/_component/WarningMessage';
import ConsultationReview from './ConsultationReview';

function MentoModal({ id }: { id: string }) {
    const { pageStep, setPageStep, setInit, setErrorMessage, errorMessage } = usePostsStore();
    useEffect(() => {
        return () => {
            setInit();
        };
    }, [setInit]); //모달 언마운트시 초기화
    const onCloseError = () => {
        setErrorMessage('');
    };
    return (
        <ModalWrapper className="max-h-[750px]  sm:max-w-[600px]  ">
            <section className="flex h-full w-full flex-col rounded-xl  bg-white  p-7 shadow-xl">
                {/* 헤더 */}
                <header className="flex h-10 w-full flex-shrink-0 flex-row items-center  ">
                    {/* <span className="text-xl font-semibold tracking-wide ">멘토링 소개</span> */}

                    <div className="flex flex-row items-center">
                        {pageStep === 0 && <span className="text-lg  font-semibold tracking-wide ">멘토링 소개</span>}
                        {pageStep === 1 && <span className="text-lg font-semibold tracking-wide ">신청하기</span>}
                        {pageStep === 2 && <span className="text-lg font-semibold tracking-wide ">신청서 확인</span>}
                        {pageStep !== 0 && (
                            <span className="ml-2 text-sm font-semibold text-neutral-400">{pageStep}/2</span>
                        )}
                    </div>

                    <div className="flex flex-grow flex-row justify-end">
                        <BackButton />
                    </div>
                </header>

                {pageStep === 0 && <MentoModalContent id={id} />}
                {pageStep === 1 && <ConsultationForm />}
                {pageStep === 2 && <ConsultationReview id={id} />}
                <WarningMessage text={errorMessage} isOpen={errorMessage !== ''} onClose={onCloseError} />
            </section>
        </ModalWrapper>
    );
}

export default MentoModal;
