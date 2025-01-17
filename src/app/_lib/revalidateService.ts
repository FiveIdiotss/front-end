export const getRevalidate = async (tag: string) => {
    const response = await fetch(`/api/revalidates?tag=${tag}`);
    return response;
};
