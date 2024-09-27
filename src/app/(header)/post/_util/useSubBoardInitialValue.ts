import { useEffect, useState } from 'react';
import { useSubBoardDetailQuery } from '../../posts/_lib/qeustOrRequestService';

export type SubBoardFormType = {
    [key: string]: string | number | string[] | File[] | '';
    boardCategory: string | '';
    title: string | '';
    content: string | '';
    mainImage: File[];
};
interface SubBoardInitialValueProps {
    boardType: 'QUEST' | 'REQUEST';
    editId?: number; // 수정시에만 필요한 값, 존재 하지 않다면 수정 페이지가 아닌것임
}
export const useSubBoardInitialValue = ({ boardType, editId }: SubBoardInitialValueProps) => {
    const [initialValues, setInitialValues] = useState<SubBoardFormType>({
        boardCategory: '',
        title: '',
        content: '',
        mainImage: [],
    });
    const subBoardDetailQuery = useSubBoardDetailQuery({
        subBoardId: editId || 0,
        enabled: Boolean(editId),
    });
    const { data: subBoardDetail, error, isPending } = subBoardDetailQuery;

    useEffect(() => {
        if (subBoardDetail) {
            setInitialValues({
                boardCategory: subBoardDetail.subBoardDTO.boardCategory,
                title: subBoardDetail.subBoardDTO.title,
                content: subBoardDetail.subBoardDTO.content,
                mainImage: initialValues.mainImage,
            });
            console.log('subBoardDetail', subBoardDetail);
        }
    }, [subBoardDetail]);

    return { initialValues, isPending: editId && isPending, error };
};
