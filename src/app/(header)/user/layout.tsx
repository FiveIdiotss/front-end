import { auth } from '@/auth';
import ProfileLeftHeader from './_component/ProfileLeftHeader';
import ProfileTopHeader from './_component/ProfileTopHeader';
import { Metadata } from 'next';

export default async function UserLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    return (
        // Wrapper
        <div className="flex  w-full  flex-shrink-0  flex-col tablet:flex-row">
            <div className=" hidden  flex-grow flex-row justify-end bg-white tablet:flex ">
                <div className=" w-[340px]">
                    <ProfileLeftHeader memberDTO={session?.user?.memberDTO} />
                </div>
            </div>
            <div className="flex w-full flex-row bg-white shadow-sm tablet:hidden">
                <ProfileTopHeader memberDTO={session?.user?.memberDTO} />
            </div>

            <div className="flex  flex-grow flex-col  tablet:flex-row  ">
                <div className=" h-full tablet:w-[652px] laptop:w-[860px]  ">{children}</div>
            </div>
        </div>
    );
}
