type Props = {
    className?: string;
    position?: string;
    color?: string;
}; //x,y축인지, 마진주기위해
export default function SectionDivider({ className, position, color }: Props) {
    if (position === 'y')
        return (
            <div className={` flex h-full w-0 flex-col ${className}`}>
                <div className={`w-0 flex-grow border border-r-0  ${color ? color : 'border-slate-200'} `}></div>
            </div>
        );
    return (
        <div className={` flex w-full flex-row ${className}`}>
            <div className=" flex flex-grow flex-col justify-center">
                <div className={`${color ? color : 'border-slate-200'} h-0  border-b`}></div>
            </div>
        </div>
    );
}
