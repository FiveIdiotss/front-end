interface timeType {
    key: string;
    startTime: number;
    endTime: number;
}

export type MentorFormType = {
    [key: string]: string | number | string[] | timeType[] | File[] | '';
    availableDays: string[];
    consultTime: number;
    times: timeType[];

    title: string | '';
    introduce: string | '';
    boardCategory: string | '';
    target: string | '';
    content: string | '';
    mainImage: File[];
};

export const useMentorInitialValue = () => {
    let initialValues: MentorFormType = {
        availableDays: [],
        consultTime: 30,
        times: [],

        title: '',
        introduce: '',
        boardCategory: '',
        target: '',
        content: '',
        mainImage: [],
    };

    return { initialValues };
};
