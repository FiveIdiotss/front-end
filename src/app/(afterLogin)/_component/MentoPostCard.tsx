import Link from 'next/link';

type MentoPostCardProps = {
    post: string;
};

function MentoPostCard({ post }: MentoPostCardProps) {
    return (
        <div className="my-2 h-56 w-full  cursor-pointer rounded-md border border-gray-200 bg-white shadow-md  hover:border-neutral-200">
            <span>{post}</span>
        </div>
    );
}

export default MentoPostCard;
