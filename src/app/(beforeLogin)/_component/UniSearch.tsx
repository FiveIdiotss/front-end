`use client`;
import axios from 'axios';
import { use, useEffect, useRef, useState } from 'react';
import { fetchSchoolsData, fetchMajorsData } from '../_lib/signup';
import { School, Major } from '../_lib/signup';
import { SchoolDatas } from './SignupModal';
interface UniSearchProps {
    selectSchoolHandler: (data: SchoolDatas) => void;
}

function UniSearch({ selectSchoolHandler }: UniSearchProps) {
    const schoolsData = useRef<School[]>([]);
    const [searchSchool, setSearchSchool] = useState<string>('');
    const [searchResult, setSearchResult] = useState<School[]>([]);
    const [selectedSchool, setSelectedSchool] = useState<School>({
        schoolId: 0,
        name: '',
    });
    const [majorsData, setMajorsData] = useState<Major[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSelectName = event.target.value;
        setSearchSchool(newSelectName);
    };

    const nextSearchHandler = async (school: School) => {
        const majorsData = await fetchMajorsData(school.name);
        setMajorsData(majorsData);
        setSelectedSchool(school);
    };
    const submitData = (major: Major) => {
        selectSchoolHandler({
            schoolId: selectedSchool!.schoolId,
            schoolName: selectedSchool!.name,
            majorId: major.majorId,
            majorName: major.name,
        });
        setSearchSchool('');
        setSelectedSchool({
            schoolId: 0,
            name: '',
        });
    };
    useEffect(() => {
        const fetchSchoolData = async () => {
            schoolsData.current = await fetchSchoolsData();
            setSearchResult(schoolsData.current);
        };
        fetchSchoolData();
    }, []);
    useEffect(() => {
        const result = schoolsData.current.filter(
            (school) =>
                school.name.replace(/\s/g, '').toLowerCase().includes(searchSchool.replace(/\s/g, '').toLowerCase()), //공백제거, 대소문자 구분제거
        );
        setSearchResult(result);
    }, [searchSchool]);

    return (
        <>
            <div className={`h-full w-full ${selectedSchool.name !== '' ? 'hidden' : 'block'}`}>
                <input
                    type="text"
                    name="schoolName"
                    id="schoolName"
                    placeholder="대학교 검색"
                    value={searchSchool}
                    onChange={(e) => handleInputChange(e)}
                    className="border-gray-300border-gray-300 h-10 w-full rounded-md border border-solid  px-3"
                />
                <div className="border-solidborder-gray-300 mt-5 h-96 w-full overflow-y-auto border-l ">
                    {searchResult.map((school) => (
                        <div
                            key={school.schoolId}
                            className="hover:bg-primary flex h-10 w-full cursor-pointer items-center  rounded-md  border-b border-solid border-gray-300 px-3"
                            onClick={() => {
                                nextSearchHandler(school);
                                // selectSchoolHandler(school.name);
                            }}
                        >
                            {school.name}
                        </div>
                    ))}
                </div>
            </div>

            <div className={`h-full w-full ${selectedSchool.name !== '' ? 'block' : 'hidden'}`}>
                <input
                    type="text"
                    name="school"
                    id="school"
                    value={selectedSchool?.name}
                    onClick={() =>
                        setSelectedSchool({
                            schoolId: 0,
                            name: '',
                        })
                    }
                    className="focus: h-10 w-full cursor-pointer rounded-md border  border-solid border-gray-300 px-3 hover:bg-red-100"
                />
                <div className="border-solidborder-gray-300 mt-5 h-96 w-full overflow-y-auto border-l ">
                    {majorsData.map((major) => (
                        <div
                            key={major.majorId}
                            className="hover:bg-primary flex h-10 w-full cursor-pointer items-center  rounded-md  border-b border-solid border-gray-300 px-3"
                            onClick={() => submitData(major)}
                        >
                            {major.name}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default UniSearch;
