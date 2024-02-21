import Link from 'next/link';

type MentoPostCardProps = {
    post: string;
};

function MentoPostCard({ post }: MentoPostCardProps) {
    return (
        <div className="my-2 h-56 w-full  cursor-pointer rounded-md border border-neutral-100 shadow-md hover:border-neutral-200 hover:shadow-lg">
            <span>{post}</span>
        </div>
    );
}

export default MentoPostCard;
