import UserInput from './UserInput';

type props = {
    placeholder: string;
    type: string;
    error?: string;
    value?: string;
    onBlur?: any;
    onChange?: any;
    name: string;
};
export default function EmailVerificationInput({ placeholder, type, error, value, name, onBlur, onChange }: props) {
    return (
        <div className=" flex w-full flex-row">
            <UserInput
                type={type}
                placeholder={placeholder}
                error={error}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                name={name}
            />
            <button
                disabled
                className="ml-3 h-12 w-24 rounded-md border border-solid border-gray-300 bg-gray-200 text-center"
            >
                인증
            </button>
        </div>
    );
}
