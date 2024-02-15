import MentoModal from '../../../_component/MentoModal';

function Page({ params }: { params: { slug: string } }) {
    return <MentoModal id={params.slug} />;
}

export default Page;
