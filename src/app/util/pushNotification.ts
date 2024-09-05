import toast from 'react-hot-toast';

type ToastType = 'error' | 'success';
type ThemeType = 'light' | 'dark';

export const pushNotification = ({
    msg,
    type,
    theme,
    isIcon = true,
}: {
    msg: string;
    type: ToastType;
    theme: ThemeType;
    isIcon?: boolean;
}) => {
    let icon;
    switch (type) {
        case 'error':
            icon = '❌';
            break;
        case 'success':
            icon = '✅';
            break;
        default:
            icon = '👋';
            break;
    }
    toast[type](msg, {
        duration: 1000,
        position: 'bottom-center',
        icon: isIcon ? icon : null,

        // Styling
        style: {
            padding: '14px',
            maxWidth: '500px',
            background: `${theme === 'dark' ? '#333' : '#fff'}`,
            color: `${theme === 'dark' ? '#fff' : '#333'}`,
        },
        className: 'w-full border text-md text-sm  ',

        // Custom Icon

        // Change colors of success/error/loading icon

        // Aria
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    });
};
