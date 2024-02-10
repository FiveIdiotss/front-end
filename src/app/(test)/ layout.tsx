export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex w-full flex-row">
            <div>x</div>
            {children}
        </div>
    );
}
