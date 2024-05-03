import MentoModal from '../../../_component/MentoModal';
import PostsMentoMain from '../../../_component/PostsMentoMain';

function Page({ params }: { params: { slug: string } }) {
    return (
        <>
            <PostsMentoMain />
            <MentoModal id={params.slug} closeUrl="/posts/mentor" />
        </>
    );
}

export default Page;
