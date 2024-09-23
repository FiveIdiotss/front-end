import React, { useState } from 'react';

const MentoringSchedule = () => {
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [timeInterval, setTimeInterval] = useState(30);

    const toggleDay = (day: any) => {
        setSelectedDays((prevDays: any) =>
            prevDays.includes(day) ? prevDays.filter((d: any) => d !== day) : [...prevDays, day],
        );
    };

    return (
        <div className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow-md">
            {/* 상단 안내 문구 */}
            <div className="mb-4 rounded-md bg-blue-50 p-4 text-blue-700">
                가능한 요일과 시간을 선택해주세요. 선택한 요일에 일괄 적용됩니다.
            </div>

            {/* 요일 선택 섹션 */}
            <div className="mb-6 grid grid-cols-7 gap-4">
                {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => (
                    <label key={index} className="flex flex-col items-center">
                        <input
                            type="checkbox"
                            className="form-checkbox text-blue-600"
                            onChange={() => toggleDay(day)}
                            checked={selectedDays.includes(day)}
                        />
                        <span className="mt-1 text-sm">{day}</span>
                    </label>
                ))}
            </div>

            {/* 시간 간격 선택 */}
            <div className="mb-6">
                <span className="mb-2 block text-gray-700">시간 간격을 선택하세요:</span>
                <label className="mr-4">
                    <input
                        type="radio"
                        name="time-interval"
                        value={30}
                        className="form-radio text-blue-600"
                        checked={timeInterval === 30}
                        onChange={() => setTimeInterval(30)}
                    />
                    <span className="ml-2">30분</span>
                </label>
                <label>
                    <input
                        type="radio"
                        name="time-interval"
                        value={60}
                        className="form-radio text-blue-600"
                        checked={timeInterval === 60}
                        onChange={() => setTimeInterval(60)}
                    />
                    <span className="ml-2">1시간</span>
                </label>
            </div>

            {/* 시간 추가 버튼 */}
            <div className="mb-6 text-right">
                <button className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600">시간 추가 +</button>
            </div>

            {/* 자동 분할 안내 문구 */}
            <div className="rounded-md bg-yellow-50 p-4 text-yellow-700">
                선택한 시간 범위에서 자동으로 분할됩니다. 예: 10:00 ~ 12:00 구간에서 30분 간격으로 선택 시, 10:00,
                10:30, 11:00, 11:30으로 설정됩니다.
            </div>
        </div>
    );
};

export default MentoringSchedule;
