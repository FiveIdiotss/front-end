import MentoModal from '../../../_component/MentoModal';
import PostsMentoMain from '../../../_component/PostsMentoMain';

function Page({ params }: { params: { slug: string } }) {
    const id = parseInt(params.slug, 10);

    return (
        <>
            <PostsMentoMain />
            <MentoModal id={id} closeUrl="/posts/mentor" />
        </>
    );
}

export default Page;
