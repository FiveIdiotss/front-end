import { useEffect, useRef, useState } from 'react';

type props = {
    name?: string;
    value?: string | number;

    error?: string;
    onBlur?: any;
    onChange?: any;
    children: React.ReactNode;
};

function UserSelect({ name, value, error, onBlur, onChange, children }: props) {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const valid = error ? true : false; // error가 있으면 true
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        };

        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return (
        <div className="flex w-full flex-col ">
            <div
                className={`h-12 w-full rounded-md border border-solid border-gray-300 px-3 ${isFocused ? 'border-2 border-stone-900' : 'border border-gray-300'} ${valid && !isFocused ? 'border-2 border-red-500' : ''}`}
            >
                <select
                    name={name}
                    id={name}
                    className="h-full w-full focus:outline-none"
                    onBlur={(e) => {
                        onBlur(e);
                        setIsFocused(false);
                    }}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    value={value}
                >
                    {children}
                </select>
            </div>
            <small className="mt-1 pl-1 text-xs text-red-500">{valid ? error : ''}</small>
        </div>
    );
}

export default UserSelect;
