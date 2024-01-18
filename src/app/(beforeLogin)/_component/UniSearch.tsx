`use client`;
import axios from 'axios';
import { use, useEffect, useRef, useState } from 'react';
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
    const [selectName, setSelectName] = useState<string>('');
    const [searchResult, setSearchResult] = useState<School[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            schoolsData.current = await fetchSchoolsData();
            setSearchResult(schoolsData.current);
        };
        fetchData();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSelectName = event.target.value;
        setSelectName(newSelectName);
    };

    useEffect(() => {
        const result = schoolsData.current.filter((school) => school.name.includes(selectName));

        setSearchResult(result);
    }, [selectName]);

    return (
        <div className="h-full w-full">
            <input
                type="text"
                name="schoolName"
                id="schoolName"
                placeholder="대학교 검색"
                value={selectName}
                onChange={(e) => handleInputChange(e)}
                className="border-gray-300border-gray-300 h-10 w-full rounded-md border border-solid  px-3"
            />
            <div className="border-solidborder-gray-300 mt-5 h-96 w-full overflow-y-auto border-l ">
                {searchResult.map((school) => (
                    <div
                        key={school.schoolId}
                        className="hover:bg-primary flex h-10 w-full cursor-pointer items-center  rounded-md  border-b border-solid border-gray-300 px-3"
                        onClick={() => {
                            selectSchoolHandler(school.name);
                            setSelectName('');
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
