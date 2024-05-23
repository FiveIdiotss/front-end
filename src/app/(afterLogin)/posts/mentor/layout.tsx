import CategoryBar from '../_component/CategoryBar';

type Props = {
    children: React.ReactNode;
    mentoModal: React.ReactNode;
};

export default function HomeLayout({ children, mentoModal }: Props) {
    return (
        // Wrapper
        //현제 헤더 69px임

        <div className=" mx-auto flex  min-h-[calc(100dvh-69px)] w-full max-w-[1300px] flex-row gap-6 px-4 pb-10 pt-6 ">
            <CategoryBar />
            {children}

            {mentoModal}
        </div>
    );
}
