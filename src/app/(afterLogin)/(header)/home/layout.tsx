import BookIcon from '../../_component/icon/BookIcon';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="w-dvh  z-[2] flex flex-col items-center justify-center bg-gray-600  py-7  ">
                <div className=" flex flex-row items-center justify-center gap-7 ">
                    <BookIcon className="h-12 w-12 text-white" />
                    <div className=" flex  flex-col items-start justify-center gap-1">
                        <span className="text-2xl font-bold text-white">지식을 나누는 새로운 세상</span>
                        <span className="text-lg font-semibold text-white">멘토링으로 성장하는 여정에 참여하세요!</span>
                    </div>
                </div>
            </div>
            {children}
        </>
    );
}
