type MentoPostCardProps = {
    post: string;
};

function MentoPostCard({ post }: MentoPostCardProps) {
    return (
        <div className="h-40 w-full cursor-pointer shadow-sm hover:shadow-md ">
            <span>{post}</span>
        </div>
    );
}

export default MentoPostCard;
