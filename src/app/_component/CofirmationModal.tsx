import NonStandardModal from '../(afterLogin)/_component/common/NonStandardModal';
import Loading from './Loading';

type Props = {
    open: boolean;
    text: string;
    isLoading?: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

function CofirmationModal({ open, text, onClose, onConfirm, isLoading }: Props) {
    return (
        <NonStandardModal
            open={open}
            onClose={onClose}
            className="flex h-fit w-full flex-col items-center gap-2 rounded-md bg-white px-6 py-4 shadow-md mobile:w-[400px]"
            title="알림"
            titleClassName="text-neutral-800"
            modalBackground="bg-black bg-opacity-50"
            backButtonTheme="black"
        >
            <div className="mt-2 flex w-full flex-col  items-start gap-5 py-2">
                <span className="  font-semibold text-neutral-800">{text}</span>
                <div className="flex w-full flex-row justify-end gap-2">
                    <button
                        className="h-9 w-20 rounded-sm border border-neutral-400 text-neutral-400 hover:border-red-700 hover:text-red-700"
                        onClick={onClose}
                    >
                        취소
                    </button>
                    {!isLoading && (
                        <button className="h-9 w-20 rounded-sm bg-primary text-white  " onClick={onConfirm}>
                            확인
                        </button>
                    )}
                    {isLoading && (
                        <button className="h-9 w-20 rounded-sm bg-primary text-white  " onClick={onConfirm}>
                            <Loading />
                        </button>
                    )}
                </div>
            </div>
        </NonStandardModal>
    );
}
//확인 취소 모달

export default CofirmationModal;
