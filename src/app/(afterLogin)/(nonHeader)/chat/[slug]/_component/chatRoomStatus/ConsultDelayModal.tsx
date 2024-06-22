import NonStandardModal from '@/app/(afterLogin)/_component/common/NonStandardModal';
import WarnningCircle from '@/app/(afterLogin)/_component/icon/WarnningCircle';
import React from 'react';

type Props = {
    onClose: () => void;
    open: boolean;
};

function ConsultDelayModal({ onClose, open }: Props) {
    return (
        <NonStandardModal
            className="rounded-lg border border-neutral-300 bg-white p-7 "
            modalBackground="bg-black bg-opacity-20"
            onClose={onClose}
            open={open}
            isHeader={false}
        >
            <div className="flex h-full w-full flex-col ">
                <div className="flex h-full w-full flex-col items-center justify-center">
                    <div className=" text-lg font-semibold">상담 연장</div>
                    <div className="text-md mt-2 text-center">상담 시간을 연장하시겠습니까?</div>
                    {/* <span className="mt-1 text-sm text-yellow-500"> 상담 연장은 30분단위로만 가능합니다. </span> */}
                    <div className="mt-10 flex w-full flex-col justify-center gap-2  ">
                        <button className="h-10  min-w-48 rounded-md bg-primary text-white" onClick={onClose}>
                            연장하기
                        </button>
                        <button className=" h-10  min-w-48 rounded-md bg-gray-300 text-white" onClick={onClose}>
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </NonStandardModal>
    );
}

export default ConsultDelayModal;
