import { useFormattedTime } from '@/app/(nonHeader)/_hooks/useFormattedConsultTimes';
import NonStandardModal from '@/app/_component/common/NonStandardModal';
import { useChatInfoStore } from '@/app/_store/chatInfoStore';
import React, { useEffect } from 'react';

interface Props {
    onClose: () => void;
    roomId: number;
}

function ChatRoomNoticeModal({ onClose, roomId }: Props) {
    const { formattedStartTime, formattedStartDate, formattedEndDate, formattedEndTime } = useFormattedTime();

    const handleHideModal = () => {
        // '더 이상 보지 않기' 버튼 클릭 시 로컬 스토리지에 저장
        const hiddenRooms = JSON.parse(localStorage.getItem('hideNoticeModalRooms') || '[]');

        // 현재 방을 숨긴 목록에 추가
        const updatedHiddenRooms = [...hiddenRooms, roomId];

        // 로컬 스토리지에 업데이트된 목록 저장
        localStorage.setItem('hideNoticeModalRooms', JSON.stringify(updatedHiddenRooms));

        onClose();
    };

    return (
        <NonStandardModal
            onClose={onClose}
            className="m-5 h-full max-h-[500px] w-full max-w-[300px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
            modalBackground="bg-black bg-opacity-40"
            titleClassName="text-neutral-800"
            backButtonTheme="black"
            isHeader={false}
        >
            <div className="flex h-full w-full flex-col p-5">
                {/* 제목 영역 */}
                <div className="mb-4 w-full border-b pb-1">
                    <span className="font-sans text-lg font-bold">Menteeto</span>
                    <span className="ml-1 text-sm font-medium text-gray-500">안내</span>
                </div>

                {/* 중요 안내 메시지 */}
                <div className="mb-4 w-full text-center text-sm font-semibold text-red-400">
                    현재는 약속된 상담 시간이 아닙니다.
                </div>

                {/* 메시지 영역 */}
                <div className="flex flex-col space-y-5 text-gray-700">
                    {/* 동적으로 적용된 상담 시간 */}
                    <div className="flex flex-col rounded-md bg-gray-50 p-2 text-center text-sm font-medium shadow-sm">
                        <span className="block font-semibold text-gray-800">상담 약속 시간</span>
                        <span className="text-gray-700">
                            {formattedStartDate} {formattedStartTime}
                        </span>
                        <span className="text-gray-700">-</span>
                        <span className="text-gray-700">
                            {formattedEndDate} {formattedEndTime}
                        </span>
                    </div>

                    {/* 나머지 안내 메시지 */}
                    <span className="text-sm">
                        이 시간 외에도 채팅방은 <strong>항상 열려</strong> 있습니다. 다만, 약속된 시간에 맞춰 상담을
                        진행하는 것이 좋습니다.
                    </span>
                    <span className="text-sm">
                        자유롭게 메시지를 남기실 수 있지만, <strong>멘토와의 약속 시간을 참고</strong>해주세요.
                    </span>
                    <span className="text-sm">
                        만약 <strong>서로 합의가 된 경우</strong>라면 언제든지 자유롭게 대화를 나누셔도 괜찮습니다.
                    </span>
                </div>
            </div>

            {/* 버튼 영역 */}
            <div className="flex flex-row border-t text-sm">
                <button
                    onClick={handleHideModal}
                    type="button"
                    className="flex-1 py-2 text-gray-600 hover:bg-gray-100 focus:outline-none"
                >
                    더 이상 보지 않기
                </button>
                <div className="h-full border-r" />
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-2 text-gray-600 hover:bg-gray-100 focus:outline-none"
                >
                    닫기
                </button>
            </div>
        </NonStandardModal>
    );
}

export default ChatRoomNoticeModal;
