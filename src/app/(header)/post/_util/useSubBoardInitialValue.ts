export type SubBoardFormType = {
    [key: string]: string | number | string[] | File[] | '';
    boardCategory: string | '';
    title: string | '';
    content: string | '';
    mainImage: File[];
};
interface SubBoardInitialValueProps {
    boardType: 'QUEST' | 'REQUEST';
}
export const useSubBoardInitialValue = ({ boardType }: SubBoardInitialValueProps) => {
    const initialValues: SubBoardFormType = {
        boardCategory: '',
        title: '',
        content: '',
        mainImage: [],
    };

    return { initialValues };
};
