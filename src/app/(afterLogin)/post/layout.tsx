type Props = {
    children: React.ReactNode;
};

export default function PostLayout({ children }: Props) {
    return (
        // Wrapper

        <div className="mx-auto  flex max-w-screen-md flex-col ">{children}</div>
    );
}
