`use client`;
import axios from 'axios';
import { use, useEffect, useRef } from 'react';
import { fetchSchoolsData } from '../_lib/signup';
import { School } from '../_lib/signup';
interface UniSearchProps {
    selectSchoolHandler: (name: string) => void;
}
export type SchoolsData = {
    schoolId: number;
    name: string;
};
function UniSearch({ selectSchoolHandler }: UniSearchProps) {
    const schoolsData = useRef<School[]>([]);
    const selectName = useRef<string>('');
    useEffect(() => {
        const fetchData = async () => {
            schoolsData.current = await fetchSchoolsData();
        };
        fetchData();
    }, []);

    return (
        <div className="h-full w-full">
            <input
                type="text"
                name="schoolName"
                id="schoolName"
                placeholder="대학교 검색"
                value={selectName.current}
                onChange={(event) => {
                    selectName.current = event.target.value;
                }}
                className="h-10 w-full rounded-md border border-solid border-gray-300 px-3"
            />
            <div className="h-96 w-4/5 overflow-y-auto">
                {schoolsData.current.map((school) => (
                    <div
                        key={school.schoolId}
                        className="flex h-10 w-full cursor-pointer items-center rounded-md border border-solid border-gray-300 px-3 hover:bg-gray-200"
                        onClick={() => {
                            selectSchoolHandler(school.name);
                            selectName.current = school.name;
                        }}
                    >
                        {school.name}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UniSearch;
