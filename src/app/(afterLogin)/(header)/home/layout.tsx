import BookIcon from '../../../_icons/common/BookIcon';
import HeaderSearch from '../../_component/layout/HeaderSearch';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="w-dvh z-[2] flex flex-col items-center justify-center gap-5 bg-opacity-70 bg-gradient-to-r from-white via-secondary to-white py-7 ">
                <div className=" flex flex-row items-center justify-center gap-7 ">
                    <BookIcon className="h-12 w-12 text-green-600 " />
                    <div className=" flex  flex-col items-start justify-center gap-1">
                        <span className="text-2xl font-bold text-black">
                            <span className="text-green-600">지식</span>을 나누는 새로운 세상
                        </span>
                        <span className="text-lg font-medium text-black">멘토링으로 성장하는 여정에 참여하세요!</span>
                    </div>
                </div>
                <div className="w-full">
                    <HeaderSearch />
                </div>
            </div>
            {children}
        </>
    );
}
