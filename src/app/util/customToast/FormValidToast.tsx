import WarnningCircle from '@/app/_icons/common/WarnningCircle';
import { Toast } from 'react-hot-toast';

const FormValidToast = ({ msg, t }: { msg: string; t: Toast }) => {
    return (
        <div
            className={`  ${t.visible ? 'animate-fadeIn' : 'opacity-0'}  mt-14  flex items-center    justify-center gap-2 rounded-md border border-red-600 bg-white  bg-opacity-90 px-6 py-4 shadow-lg  transition-opacity   duration-700`}
        >
            <WarnningCircle className="h-5 w-5 text-red-600" />
            <span className=" text-sm text-red-600">{msg}</span>
        </div>
    );
};

export default FormValidToast;
