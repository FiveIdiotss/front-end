interface Props {
    searchParams: { [key: string]: string | undefined };
}
export const serverParam = ({ searchParams }: Props) => {
    const { page, size, category, search, schoolFilter, star } = searchParams;

    const pageParam = Number(page) || 1;
    const sizeParam = Number(size) || 24;
    const categoryParam = category || '';
    const searchParam = search || '';
    const schoolFilterParam = Boolean(schoolFilter) || false;
    const starParam = Boolean(star) || false;

    return { pageParam, sizeParam, categoryParam, searchParam, schoolFilterParam, starParam };
};
