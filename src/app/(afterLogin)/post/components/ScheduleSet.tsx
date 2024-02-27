import React from 'react';

function ScheduleSet() {
    const days = ['월', '화', '수', '목', '금', '토', '일'];

    return (
        <div className="mt-3 ">
            <div className="mt-4 flex flex-row gap-10">
                {days.map((day) => (
                    <div key={day} className="cursor-pointer  rounded-3xl p-2 hover:bg-indigo-100">
                        <span className="mr-2 text-lg">{day}</span>
                        <input type="checkbox" className="h-4 w-4" />
                    </div>
                ))}
            </div>
            <div className="mt-4 flex flex-row gap-3 ">
                <span>시작 시간</span>
                <input type="time" />
            </div>
            <div className="mt-4 flex flex-row gap-3 ">
                <span>종료 시간</span>
                <input type="time" />
            </div>
            <textarea className="mt-4 h-24 w-full rounded-lg p-2 outline-none" placeholder="기타 사항" />
        </div>
    );
}

export default ScheduleSet;
