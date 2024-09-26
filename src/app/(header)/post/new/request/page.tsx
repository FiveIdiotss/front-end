'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRequestMutation } from '../../_lib/uploadSubBoardService';
import { debounce } from 'lodash';
import SubmitButton from '../../_components/SubmitButton';
import dynamic from 'next/dynamic';
import InfoModal from '../../_components/InfoModal';
import { useRouter } from 'next/navigation';
import { pushNotification } from '@/app/util/pushNotification';
import { useFormik } from 'formik';
import { useSubBoardInitialValue } from '../../_util/useSubBoardInitialValue';
import { CustomToast } from '@/app/util/customToast/CustomToast';

const QuillEditor = dynamic(() => import('../../_components/Editor'), { ssr: false });

interface ErrMsgType {
    [key: string]: string;
    title: string;
    content: string;
    boardCategory: string;
}
const ERR_MSG: ErrMsgType = {
    title: '제목을 입력해주세요.',
    content: '내용을 입력해주세요.',
    boardCategory: '카테고리를 선택해주세요.',
};

function RequestFormPage() {
    const postMutation = useRequestMutation();
    const [completeModalOpen, setCompleteModalOpen] = React.useState(false);
    const router = useRouter();

    const { initialValues } = useSubBoardInitialValue({
        boardType: 'REQUEST',
    });

    const formik = useFormik({
        initialValues,
        validateOnChange: false, // change 이벤트 발생시 validate 실행 여부
        enableReinitialize: true,
        onSubmit: (values) => {
            let errorMessage: string[] = [];

            Object.keys(values).forEach((key) => {
                const value = values[key];
                if (value === '' || (Array.isArray(value) && value.length === 0)) {
                    if (key === 'mainImage') {
                        return;
                    }
                    formik.setFieldError(key, ERR_MSG[key]);
                    errorMessage = [...errorMessage, ERR_MSG[key]];
                }
            });

            if (errorMessage.length > 0) {
                CustomToast({
                    msg: errorMessage[0],
                    position: 'top-center',
                });
                return;
            }

            postMutation.mutate(
                {
                    request: {
                        title: values.title,
                        content: values.content,
                        boardCategory: values.boardCategory,
                        subBoardType: 'REQUEST',
                        platform: 'WEB',
                    },

                    images: values.mainImage,
                },
                {
                    onSuccess: () => {
                        setCompleteModalOpen(true);
                    },
                },
            );
        },
    });

    const handleInfoClose = () => {
        setCompleteModalOpen(false);
        router.push('/posts/request');
    };

    return (
        <form className="flex flex-grow flex-col pb-36" onSubmit={formik.handleSubmit}>
            <div className="flex min-h-12 flex-row items-center justify-center  bg-orange-100 p-3">
                <span className="text-2xl">🙋‍♂️</span>
                <span className="  ml-4 text-sm   text-black mobile:text-base ">필요한 멘토링을 요청해요! </span>
            </div>
            <select
                onChange={(e) => formik.setFieldValue('boardCategory', e.target.value)}
                className="mt-6 w-52 cursor-pointer rounded-md  border border-neutral-400 bg-inherit bg-white p-2  text-sm  text-gray-400  outline-none"
                defaultValue=""
            >
                <option disabled hidden value="">
                    카테고리 선택(필수)
                </option>
                <option value="이공">이공</option>
                <option value="자연">자연</option>
                <option value="인문">인문</option>
                <option value="사회">사회</option>
                <option value="의약">의약</option>
                <option value="예체능">예체능</option>
                <option value="사범">사범</option>
            </select>
            <input
                onChange={(e) => formik.setFieldValue('title', e.target.value)}
                className="mb-3 mt-6 w-full bg-inherit text-2xl outline-none"
                placeholder="제목에 핵심 내용을 요약해보세요."
            />
            <QuillEditor formik={formik} />

            <SubmitButton cancelUrl="/post" type="submit" isLoading={postMutation.isPending} />
            <InfoModal
                open={completeModalOpen}
                onClose={handleInfoClose}
                completeText={'등록이 완료되었습니다.'}
                pageText={'잠시후 멘토찾기 게시판으로 이동합니다.'}
            />
        </form>
    );
}

export default RequestFormPage;
