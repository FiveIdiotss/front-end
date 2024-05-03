import NonStandardModal from '../(afterLogin)/_component/common/NonStandardModal';

type Props = {
    open: boolean;
    text: string;
    onClose: () => void;
    onConfirm: () => void;
};

function CofirmationModal({ open, text, onClose, onConfirm }: Props) {
    return (
        <NonStandardModal
            open={open}
            onClose={onClose}
            className="flex h-fit w-full flex-col items-center gap-2 rounded-md bg-zinc-600 p-4 shadow-md mobile:w-[470px]"
        >
            <div className="flex flex-col items-center gap-2">
                <span className="text-xl font-semibold text-neutral-800">{text}</span>
                <div className="flex flex-row gap-2">
                    <button className="h-9 w-20 rounded-md border border-red-500 text-red-500" onClick={onClose}>
                        취소
                    </button>
                    <button className="h-9 w-20 rounded-md bg-red-500 text-white" onClick={onConfirm}>
                        확인
                    </button>
                </div>
            </div>
        </NonStandardModal>
    );
}
//확인 취소 모달

export default CofirmationModal;
