type Props = {
    children: React.ReactNode;
    mentoModal: React.ReactNode;
};

export default function HomeLayout({ children, mentoModal }: Props) {
    return (
        // Wrapper

        <div className="mx-auto  flex max-w-screen-lg flex-col ">
            {children}
            {mentoModal}
        </div>
    );
}
