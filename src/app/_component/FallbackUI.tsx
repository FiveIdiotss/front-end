import { AxiosError } from 'axios';
import PropTypes from 'prop-types';
import RefreshIcon from '../(afterLogin)/_component/icon/RefreshIcon';
import Image from 'next/image';
import fixImage from '@/../public/fixImage.svg';

type Props = {
    error: Error;
    resetErrorBoundary: () => void;
};

const FallbackUI = ({ error, resetErrorBoundary }: Props) => {
    if (error instanceof AxiosError) {
        if (error.response) {
            const statusCode = error.response.status;
            if (error.response.data.ErrorMessage) {
                console.log('Error Response:', error.response.data.ErrorMessage);
            } else {
                console.log('Error Response:', error.response);
            }

            if (statusCode >= 500) {
                // 서버 오류 (500번대)
                console.error('서버 오류입니다:', statusCode);
            } else if (statusCode >= 400) {
                // 클라이언트 오류 (400번대)
                console.error('클라이언트 오류입니다:', statusCode);
            } else {
                // 기타 오류
                console.error('기타 오류:', statusCode);
            }
        } else if (error.request) {
            // 요청이 이루어졌지만 응답을 받지 못한 경우 (네트워크 오류 포함)
            console.log('Error Request:', error.request);
            if (error.code === 'ERR_NETWORK') {
                console.error('네트워크 오류입니다. 서버에 요청을 전송할 수 없습니다.');
            } else {
                console.error('응답을 받지 못했습니다:', error.request);
            }
        } else {
            // 요청 설정 중에 문제가 발생한 경우
            console.error('요청 설정 중 오류가 발생했습니다:', error.message);
        }
    } else {
        console.error('자바스크립트 Error:', error);
    }

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-white">
            <div className="flex flex-grow flex-col items-center justify-center gap-2 rounded-lg">
                <Image src={fixImage} alt="error" className="h-20 w-20" />
                <span className="my-3 text-xl font-semibold text-gray-500">일시적인 오류 입니다</span>
                <span className="text-sm text-gray-500">새로 고침을 눌러 페이지를 다시 불러올 수 있습니다.</span>
                <span className="text-sm text-gray-500">문제가 지속되면 개발자에게 문의부탁드립니다.</span>

                <button
                    onClick={resetErrorBoundary}
                    className="0 my-2 flex w-44 flex-row items-center justify-center gap-2 rounded-md bg-blue-500 py-3 font-normal text-white"
                >
                    새로고침
                    <RefreshIcon className="h-4 w-4 text-white" />
                </button>
            </div>
            <span className="mb-2 text-sm text-gray-500">담당자: 010-7728-6267</span>
        </div>
    );
};

FallbackUI.propTypes = {
    error: PropTypes.object.isRequired,
    resetErrorBoundary: PropTypes.func.isRequired,
};

export default FallbackUI;
