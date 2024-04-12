'use client';
import ModalWrapper from '../../_component/ModalWrapper';
import BackButton from '@/app/(beforeLogin)/_component/BackButton';

import MentoModalContent from './MentoModalContent';

function MentoModal({ id }: { id: string }) {
    return (
        <ModalWrapper className="max-h-[750px]  sm:max-w-[600px]  ">
            <div className="flex h-full w-full flex-col rounded-xl bg-white  p-7  shadow-xl">
                {/* 헤더 */}
                <header className="flex h-10 w-full flex-row items-center ">
                    {/* <span className="text-xl font-semibold tracking-wide ">멘토링 소개</span> */}
                    <div className="flex flex-grow flex-row justify-end">
                        <BackButton />
                    </div>
                </header>
                <MentoModalContent id={id} />
            </div>
        </ModalWrapper>
    );
}

export default MentoModal;
