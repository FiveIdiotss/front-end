//* 채팅방은 헤더가 필요없기때문에 헤더가 없는 레이아웃을 만들었습니다.

type Props = {
    children: React.ReactNode;
};

export default function NonHeaderLayout({ children }: Props) {
    return (
        // Wrapper

        <div className=" w-dvh flex    h-dvh  overflow-y-auto   bg-gray-50">
            {/* Home */}

            {children}
        </div>
    );
}
