import { useEffect, useRef, useState } from 'react';

type props = {
    name: string;
    placeholder?: string;
    type: string;
    value?: string | number;
    readOnly?: boolean;
    error?: string;
    onBlur?: any;
    onChange?: any;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    disabled?: boolean;
};
export default function UserInput({
    name,
    placeholder,
    type,
    value,
    readOnly,
    error,
    onBlur,
    onChange,
    onClick,
    disabled,
}: props) {
    const valid = error ? true : false; // error가 있으면 true
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (name === 'email' || name === 'code' || name === 'name') {
            inputRef.current?.focus();
        }
    }, []);

    return (
        <div className="flex w-full flex-col ">
            <div
                className={`h-12 w-full rounded-md border border-solid border-gray-300 px-3 ${isFocused ? 'border-2 border-stone-900' : 'border border-gray-300'} ${valid && !isFocused ? 'border-2 border-red-500' : ''} ${disabled ? 'bg-gray-200' : ''}`}
                onClick={() => setIsFocused(true)}
            >
                <input
                    ref={inputRef}
                    type={type}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    value={value}
                    readOnly={readOnly}
                    className="h-full w-full focus:outline-none disabled:bg-inherit"
                    onBlur={(e) => {
                        onBlur(e);
                        setIsFocused(false);
                    }}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    disabled={disabled}
                />
            </div>
            <small className="mt-1 pl-1 text-xs text-red-500">{valid ? error : ''}</small>
        </div>
    );
}
