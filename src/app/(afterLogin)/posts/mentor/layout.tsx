type Props = {
    children: React.ReactNode;
    mentoModal: React.ReactNode;
};

export default function HomeLayout({ children, mentoModal }: Props) {
    return (
        // Wrapper

        <div className="mx-auto flex w-full max-w-screen-lg  flex-col ">
            {children}
            {mentoModal}
        </div>
    );
}
