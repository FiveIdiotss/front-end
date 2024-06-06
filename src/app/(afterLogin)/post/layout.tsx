import RouteNav from './_components/RouteNav';

type Props = {
    children: React.ReactNode;
};

export default function PostLayout({ children }: Props) {
    return (
        // Wrapper

        <div className="mx-auto  flex w-full max-w-[800px] flex-row  gap-10 p-6">
            {/* <RouteNav /> */}
            {children}
        </div>
    );
}
