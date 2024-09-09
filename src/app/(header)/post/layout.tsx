type Props = {
    children: React.ReactNode;
};

export default function PostLayout({ children }: Props) {
    return (
        // Wrapper

        <div className=" mx-auto  flex  max-w-[800px]  flex-row  gap-10 px-2 py-6 mobile:p-6">
            {/* <RouteNav /> */}
            {children}
        </div>
    );
}
