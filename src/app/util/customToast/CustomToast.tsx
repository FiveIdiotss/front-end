import toast from 'react-hot-toast';
import FormValidToast from './FormValidToast';

export const CustomToast = ({
    msg,
    position = 'bottom-center',
}: {
    msg: string;
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}) => {
    toast.remove();
    toast.custom((t) => <FormValidToast msg={msg} t={t} />, {
        duration: 2000,
        position: position,
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    });
};
