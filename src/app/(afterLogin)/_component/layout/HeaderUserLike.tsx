import React from 'react';
import HeartIcon from '../icon/HeartIcon';

function HeaderUserLike() {
    const [isHovered, setIsHovered] = React.useState(false);
    return (
        <div
            className="flex h-full flex-shrink-0 items-center justify-center  p-1"
            onMouseLeave={() => setIsHovered(false)}
            onMouseEnter={() => setIsHovered(true)}
        >
            <div className="relative">
                <div className="relative h-8  w-8 shrink-0 transition hover:-translate-y-[2px]">
                    <HeartIcon
                        className="cursor-pointer p-1 text-neutral-800 text-opacity-80  hover:text-primary"
                        fill="currentColor"
                        isCheck={false}
                    />
                    <div className="absolute -right-[1px] top-0 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 bg-opacity-95 text-xs font-light text-white ">{`1`}</div>
                </div>
                <div
                    className={`absolute  -right-2 top-12 flex w-fit  flex-col  hover:cursor-default ${isHovered ? ' transition-all duration-300 ease-in' : ''} ${
                        isHovered ? ' max-h-[1000px]   opacity-100' : 'max-h-0 w-0  overflow-hidden opacity-0'
                    }  `}
                >
                    <div className="mt-[6px] flex h-72 w-52 flex-col border bg-white shadow-sm   shadow-neutral-300">
                        <div className="flex w-full flex-col items-center ">
                            <span className="text-sm font-semibold text-neutral-500">좋아요한 게시물이 없습니다.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderUserLike;
