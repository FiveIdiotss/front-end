export type SignupFormType = {
    email: string;
    name: string;
    password: string;
    year: number | undefined;
    gender: string;
    schoolName: string;
    schoolId?: number;
    majorName?: string;
    majorId: number;
    passwordConfirm?: string;
    validEmail?: boolean;
};

export type SchoolType = {
    schoolId: number;
    name: string;
};

export type MajorType = {
    majorId: number;
    name: string;
};
