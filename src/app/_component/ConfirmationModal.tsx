import NonStandardModal from '../(afterLogin)/_component/common/NonStandardModal';
import WarnningCircle from '../(afterLogin)/_component/icon/WarnningCircle';
import Loading from './Loading';

type Props = {
    open: boolean;
    confirmButtonLabel?: string;
    title: string;
    subTitle?: string;
    description?: string;

    isLoading?: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

function ConfirmationModal({
    open,
    confirmButtonLabel,
    title,
    subTitle,
    description,
    onClose,
    onConfirm,
    isLoading,
}: Props) {
    return (
        <NonStandardModal
            open={open}
            onClose={onClose}
            className="rounded-lg border border-neutral-300 bg-white p-7 "
            modalBackground="bg-black bg-opacity-20"
            titleClassName="text-neutral-800"
            backButtonTheme="black"
            isHeader={false}
        >
            <div className="flex h-full w-full flex-col items-center justify-center">
                <div className=" text-lg font-semibold">{title}</div>
                <div className="text-md mt-2 text-center">{subTitle}</div>
                <div>{description}</div>
                <div className="mt-10 flex w-full flex-col justify-center gap-2  ">
                    {isLoading ? (
                        <button className="h-10  min-w-48 rounded-md bg-primary text-white" onClick={onConfirm}>
                            <Loading />
                        </button>
                    ) : (
                        <button className="h-10  min-w-48 rounded-md bg-primary text-white" onClick={onConfirm}>
                            {confirmButtonLabel || '확인'}
                        </button>
                    )}

                    <button className=" h-10  min-w-48 rounded-md bg-gray-300 text-white" onClick={onClose}>
                        취소
                    </button>
                </div>
            </div>
        </NonStandardModal>
    );
}
//확인 취소 모달

export default ConfirmationModal;
