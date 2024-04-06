import Link from 'next/link';
import { MentoContent } from '../posts/_lib/posts';

function MentoPostCard({ post }: { post: MentoContent }) {
    return (
        <div className="my-2 h-64 w-full transform cursor-pointer rounded-md border border-gray-200 bg-white p-4 shadow-sm transition duration-300 ease-in-out hover:-translate-y-1 hover:border-neutral-200 hover:shadow-lg">
            <span>{post.boardId}</span>
        </div>
    );
}

export default MentoPostCard;
