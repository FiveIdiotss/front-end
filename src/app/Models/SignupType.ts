export type SignupFormValue = {
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
