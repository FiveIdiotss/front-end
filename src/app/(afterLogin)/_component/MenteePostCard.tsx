import Link from 'next/link';

function MenteePostCard({ post }: { post: string }) {
    return (
        <div className="my-1 h-56 w-full  cursor-pointer rounded-md border border-neutral-100 shadow-md hover:border-neutral-200 hover:shadow-lg">
            <span>{post}</span>
        </div>
    );
}

export default MenteePostCard;
