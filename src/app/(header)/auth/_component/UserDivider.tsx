export default function UserDivider() {
    return (
        <div className=" m-auto my-2 flex w-full flex-row">
            <div className=" flex flex-grow flex-col justify-center">
                <div className="h-0 border border-b-0 border-slate-200"></div>
            </div>
            <span className="mx-2 text-sm ">또는</span>
            <div className="flex flex-grow flex-col justify-center">
                <div className="h-0 border border-b-0 border-slate-200 "></div>
            </div>
        </div>
    );
}
