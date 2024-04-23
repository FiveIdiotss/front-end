import LeftHeader from './_component/LeftHeader';

export default async function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        // Wrapper
        <div className="flex-1  ">
            <div className="tablet:flex-row flex h-full  w-full  flex-shrink-0 flex-col">
                <div className=" tablet:flex hidden h-full flex-grow flex-row justify-end bg-white ">
                    <div className="h-full w-[340px]">
                        <LeftHeader />
                    </div>
                </div>
                <div className="tablet:hidden flex h-20 w-full flex-row bg-white shadow-lg"></div>

                <div className="tablet:flex-row  tablet:justify-start flex  flex-grow flex-col ">
                    <div className="tablet:w-[652px] laptop:w-[860px]  ">{children}</div>
                </div>
            </div>
        </div>
    );
}
