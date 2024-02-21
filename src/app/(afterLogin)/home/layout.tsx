export default function Layout({
    children,
    mentoModal,
    menteeModal,
}: {
    children: React.ReactNode;
    mentoModal?: React.ReactNode;
    menteeModal?: React.ReactNode;
}) {
    return (
        <>
            {children}
            {mentoModal}
        </>
    );
}
