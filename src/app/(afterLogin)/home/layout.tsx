export default function Layout({ children, mentoModal }: { children: React.ReactNode; mentoModal: React.ReactNode }) {
    return (
        <>
            {children}
            {mentoModal}
        </>
    );
}
