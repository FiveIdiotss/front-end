import { create } from 'zustand';

const useValidation = create((set) => ({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    setName: (name: string) => set(() => ({ name })),
    setEmail: (email: string) => set(() => ({ email })),
    setPassword: (password: string) => set(() => ({ password })),
    setConfirmPassword: (confirmPassword: string) => set(() => ({ confirmPassword })),
    validateName: (name: string) => {
        if (name.length < 3) {
            return 'Name must be at least 3 characters long';
        }
        return '';
    },
    validateEmail: (email: string) => {
        if (email.includes('@')) {
            return 'Email must include @';
        }
        return '';
    },
    validatePassword: (password: string) => {
        if (password.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        return '';
    },
    validateConfirmPassword: (password: string, confirmPassword: string) => {
        if (confirmPassword !== password) {
            return 'Passwords must match';
        }
        return '';
    },
}));

const useSignupMove = create((set) => ({}));

export { useValidation, useSignupMove };
