import MentoModal from '@/app/(afterLogin)/posts/_component/MentoModal';
import PostsMentoMain from '@/app/(afterLogin)/posts/_component/PostsMentoMain';

function Page({ params }: { params: { slug: string } }) {
    return (
        <>
            {/* <PostsMentoMain /> */}
            <MentoModal id={params.slug} />
        </>
    );
}

export default Page;
