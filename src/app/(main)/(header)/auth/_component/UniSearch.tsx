`use client`;
import axios from 'axios';
import { use, useEffect, useRef, useState } from 'react';
// import { fetchSchoolsData, fetchMajorsData } from '../_lib/signupService';
import { SchoolDatas } from './userForm/SignupStep1';
import { FormikProps } from 'formik';
import { SignupFormValue } from '@/app/Models/SignupType';
import { fetchMajorsData, School, Major, fetchSchoolsData } from '../_lib/signupService';

interface Props {
    formik: FormikProps<SignupFormValue>;
}

function UniSearch({ formik }: Props) {
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
        formik.setValues({
            ...formik.values,
            schoolName: selectedSchool.name,
            schoolId: selectedSchool.schoolId,
            majorName: major.name,
            majorId: major.majorId,
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
            <div className={` h-full   w-full flex-col    ${selectedSchool.name !== '' ? 'hidden' : 'flex'}`}>
                <div className="sticky top-0  w-full bg-white p-2 px-4 py-3 shadow-sm-bottom">
                    <input
                        type="search"
                        name="schoolName"
                        id="schoolName"
                        placeholder="대학교 검색"
                        value={searchSchool}
                        onChange={(e) => handleInputChange(e)}
                        className=" h-10 w-full rounded-md border border-solid border-gray-300 bg-white   px-3"
                    />
                </div>
                <div className="  flex w-full flex-grow  flex-col gap-2  border-solid  border-gray-300    p-2 px-4  pb-4 ">
                    {searchResult.map((school) => (
                        <div
                            key={school.schoolId}
                            className="flex h-10 w-full cursor-pointer items-center border-b   border-solid  border-gray-300 px-3 text-sm hover:bg-gray-100"
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

            <div className={`h-full w-full ${selectedSchool.name !== '' ? 'block' : 'hidden '}`}>
                <div className="sticky top-0  w-full bg-white p-2 px-4 py-2 shadow-sm-bottom">
                    <input
                        type="text"
                        name="school"
                        id="school"
                        readOnly
                        value={selectedSchool?.name}
                        onClick={() =>
                            setSelectedSchool({
                                schoolId: 0,
                                name: '',
                            })
                        }
                        className="focus: h-10 w-full cursor-pointer rounded-md border  border-solid border-gray-300 px-3 hover:bg-red-100"
                    />
                </div>
                <div className="  flex w-full flex-grow   flex-col gap-2  border-solid  border-gray-300    p-2 px-4  pb-4 ">
                    {majorsData.map((major) => (
                        <div
                            key={major.majorId}
                            className="flex h-10 w-full cursor-pointer items-center border-b border-solid   border-gray-300  px-3 text-sm text-gray-600 hover:bg-gray-100"
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
