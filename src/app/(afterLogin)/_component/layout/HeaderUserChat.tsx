'use client';
import React from 'react';
import ChatIcon from '../icon/ChatIcon';

function HeaderUserChat() {
    const [isHovered, setIsHovered] = React.useState(false);
    const openChatInPopup = (url: string) => {
        const width = 900;
        const height = window.screen.height * 0.7;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;

        window.open(url, 'Chat', `height=${height}, width=${width}, top=${top}, left=${left} ,resizable=yes`);
    };
    return (
        <div
            className="flex h-full flex-shrink-0 items-center justify-center  p-1"
            onMouseLeave={() => setIsHovered(false)}
            onMouseEnter={() => setIsHovered(true)}
        >
            <div className="relative">
                <div className="relative h-8  w-8 shrink-0 ">
                    <a onClick={() => openChatInPopup('/chat')}>
                        <ChatIcon className="cursor-pointer p-1 text-neutral-800 text-opacity-80  hover:text-primary" />
                        {/* <div className="absolute -right-[1px] top-0 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 bg-opacity-95 text-xs font-light text-white ">{`1`}</div> */}
                    </a>
                </div>

                {/* <div
                    className={`absolute  -right-2 top-12 flex w-fit  flex-col  hover:cursor-default ${isHovered ? ' transition-all duration-300 ease-in' : ''} ${
                        isHovered ? ' max-h-[1000px]   opacity-100' : 'max-h-0 w-0  overflow-hidden opacity-0'
                    }  `}
                >
                    <div className="mt-[6px] flex h-72 w-52 flex-col border bg-white shadow-sm   shadow-neutral-300">
                        <div className="flex w-full flex-col items-center ">
                            <span className="text-sm font-semibold text-neutral-500">채팅</span>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default HeaderUserChat;
