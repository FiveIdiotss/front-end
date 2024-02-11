function MenteePostCard({ post }: { post: string }) {
    return <span className="h-40 w-full cursor-pointer shadow-sm hover:shadow-md">{post}</span>;
}

export default MenteePostCard;
