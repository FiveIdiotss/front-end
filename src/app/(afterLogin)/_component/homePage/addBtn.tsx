'use client';

import { useRouter } from 'next/navigation';
import IPlus from '../icon/iPlus';
import IEdit from '../icon/iEdit';

export default function AddBtn() {
    const route = useRouter();
    const AddBtnHandler = () => {
        route.push('/home/addtitle');
    };
    const EditBtnHandler = () => {
        route.push('/home/edittitle');
    };
    return (
        <div className=" mb-7 mt-5 flex h-[10px] w-full items-center justify-end">
            <div
                onClick={AddBtnHandler}
                className=" hover:text-color_accent_text hover:border-color_accent_text mr-3 flex h-[30px] items-center rounded-lg border border-gray-400 p-[1px] text-gray-400 hover:bg-white "
            >
                <span className=" mr-1 pl-2">추가하기</span>
                <div className=" mr-1 w-6">
                    <IPlus />
                </div>
            </div>
            <div
                onClick={EditBtnHandler}
                className=" hover:text-color_accent_text hover:border-color_accent_text flex h-[30px] items-center rounded-lg border border-gray-400 p-[2px] text-gray-400 hover:bg-white"
            >
                <span className=" mr-2 pl-2">편집</span>
                <div className=" mr-2 w-5">
                    <IEdit />
                </div>
            </div>
        </div>
    );
}
