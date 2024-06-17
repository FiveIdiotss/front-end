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
