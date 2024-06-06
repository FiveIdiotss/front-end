import NonStandardModal from '../(afterLogin)/_component/common/NonStandardModal';
import WarnningCircle from '../(afterLogin)/_component/icon/WarnningCircle';
import Loading from './Loading';

type Props = {
    open: boolean;
    text: string;
    isLoading?: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

function ConfirmationModal({ open, text, onClose, onConfirm, isLoading }: Props) {
    return (
        <NonStandardModal
            open={open}
            onClose={onClose}
            className="flex h-52 w-4/6 flex-col items-center gap-2 rounded-md bg-white   mobile:w-[380px]"
            title="알림"
            titleClassName="text-neutral-800"
            modalBackground="bg-black bg-opacity-30"
            backButtonTheme="black"
            isHeader={false}
        >
            <div className="mt-2 flex h-full w-full flex-col  items-start gap-5 ">
                <div className="flex w-full flex-grow flex-col items-center justify-center gap-5 ">
                    <WarnningCircle className="h-8 w-8 text-yellow-500" />
                    <span className="  font-extrabold text-neutral-900">{text}</span>
                </div>
                <div className="flex h-12 w-full flex-row border-t border-neutral-300 ">
                    <button
                        className="flex flex-1 items-center justify-center  rounded-bl-md font-bold text-neutral-500 hover:bg-red-50 hover:text-red-600"
                        onClick={onClose}
                    >
                        <span>취소</span>
                    </button>
                    <button
                        className="flex flex-1 items-center justify-center rounded-br-md font-bold text-blue-500 hover:bg-blue-50 "
                        onClick={onConfirm}
                    >
                        <span>확인</span>
                    </button>
                </div>
            </div>
        </NonStandardModal>
    );
}
//확인 취소 모달

export default ConfirmationModal;
