import LeftHeader from './_component/LeftHeader';

export default async function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        // Wrapper
        <div className="flex-1  ">
            <div className="flex h-full w-full  flex-shrink-0  flex-col tablet:flex-row">
                <div className=" hidden h-full flex-grow flex-row justify-end bg-white tablet:flex ">
                    <div className="h-full w-[340px]">
                        <LeftHeader />
                    </div>
                </div>
                <div className="flex h-20 w-full flex-row bg-white shadow-lg tablet:hidden"></div>

                <div className="flex  flex-grow flex-col  tablet:flex-row tablet:justify-start ">
                    <div className="tablet:w-[652px] laptop:w-[860px]  ">{children}</div>
                </div>
            </div>
        </div>
    );
}
