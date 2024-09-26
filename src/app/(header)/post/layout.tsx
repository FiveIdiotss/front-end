type Props = {
    children: React.ReactNode;
};

export default function PostLayout({ children }: Props) {
    return (
        // Wrapper
        <div className=" mx-auto flex  w-full max-w-[700px]  flex-row  gap-10  px-2 py-6 ">
            {/* <RouteNav /> */}
            {children}
        </div>
    );
}
