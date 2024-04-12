import HomeMain from '../../_component/HomeMain';
import MentoModal from '@/app/(afterLogin)/posts/_component/MentoModal';

function Page({ params }: { params: { slug: string } }) {
    return (
        <>
            <HomeMain />
            <MentoModal id={params.slug} />
        </>
    );
}

export default Page;
