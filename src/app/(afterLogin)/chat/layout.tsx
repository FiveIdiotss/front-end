type Props = {
    children: React.ReactNode;
};

export default function chatLayout({ children }: Props) {
    return (
        // Wrapper

        <div className="mx-auto flex h-[calc(100%-72px)]  max-w-screen-lg flex-col ">{children}</div>
    );
}
