export const getRevalidate = async (tag: string) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST || 'https://menteetor.site'}/api/revalidate?tag=${tag}`,
    );
    return response;
};
