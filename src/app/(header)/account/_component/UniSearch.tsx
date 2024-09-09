`use client`;
import { useEffect, useRef, useState } from 'react';
import { SchoolDatas } from './userForm/SignupStep1';
import { FormikProps } from 'formik';
import { SchoolType, SignupFormType, MajorType } from '@/app/Models/SignupType';
import { useMajorsQuery, useSchoolsQuery } from '../_lib/signupService';
import Loading from '@/app/_component/Loading';
import ErrorDataUI from '@/app/_component/ErrorDataUI';

interface Props {
    formik: FormikProps<SignupFormType>;
}

function UniSearch({ formik }: Props) {
    const [searchSchoolKeyword, setSearchSchoolKeyword] = useState<string>('');
    const [searchResult, setSearchResult] = useState<SchoolType[]>([]);
    const [selectedSchool, setSelectedSchool] = useState<SchoolType>({
        schoolId: 0,
        name: '',
    });

    const schoolsQuery = useSchoolsQuery();
    const majorsQuery = useMajorsQuery({
        schoolName: selectedSchool.name,
        enabled: selectedSchool.name !== '',
    });
    const { data: schoolsData, isPending: isSchoolsPending, error: schoolsError } = schoolsQuery;
    const { data: majorsData, isPending: isMajorsPending, error: majorsError } = majorsQuery;

    const handleSchoolFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSelectName = event.target.value;
        setSearchSchoolKeyword(newSelectName);
    }; //학교검색

    const handleMajorsOpen = async (school: SchoolType) => {
        setSelectedSchool(school);
    }; //학교 선택시 학과목록 불러오기

    const submitData = (major: MajorType) => {
        formik.setValues({
            ...formik.values,
            schoolName: selectedSchool.name,
            schoolId: selectedSchool.schoolId,
            majorName: major.name,
            majorId: major.majorId,
        });
        setSearchSchoolKeyword('');
        setSelectedSchool({
            schoolId: 0,
            name: '',
        });
    }; //학교, 학과 선택시 formik에 값 전달

    useEffect(() => {
        if (schoolsData) {
            setSearchResult(schoolsData);
        }
    }, [schoolsData]); //처음 학교 목록을 불러와 searchResult에 저장

    useEffect(() => {
        if (!schoolsData) {
            return;
        }
        const result = schoolsData.filter(
            (school) =>
                school.name
                    .replace(/\s/g, '')
                    .toLowerCase()
                    .includes(searchSchoolKeyword.replace(/\s/g, '').toLowerCase()), //공백제거, 대소문자 구분제거
        );
        setSearchResult(result);
    }, [searchSchoolKeyword]); //학교검색(검색결과를 searchResult에 저장)

    if (majorsError || schoolsError) {
        return <ErrorDataUI text="데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요." />;
    }

    if (isSchoolsPending || (selectedSchool.name !== '' && isMajorsPending)) {
        return (
            <Loading
                description={`
            ${isSchoolsPending ? '학교목록을 불러오는 중입니다.' : '학과목록을 불러오는 중입니다.'}
        `}
                className="min-h-72"
            />
        );
    }

    return (
        <>
            <div className={` h-full   w-full flex-col    ${selectedSchool.name !== '' ? 'hidden' : 'flex'}`}>
                <div className="sticky top-0  w-full bg-white p-2 px-4 py-3 shadow-sm-bottom">
                    <input
                        type="search"
                        name="schoolName"
                        id="schoolName"
                        placeholder="대학교 검색"
                        value={searchSchoolKeyword}
                        onChange={(e) => handleSchoolFilterChange(e)}
                        className=" h-10 w-full rounded-md border border-solid border-gray-300 bg-white   px-3"
                    />
                </div>
                <div className="  flex w-full flex-grow  flex-col gap-2  border-solid  border-gray-300    p-2 px-4  pb-4 ">
                    {searchResult?.map((school) => (
                        <div
                            key={school.schoolId}
                            className="flex h-10 w-full cursor-pointer items-center border-b   border-solid  border-gray-300 px-3 text-sm hover:bg-gray-100"
                            onClick={() => {
                                handleMajorsOpen(school);
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
                    {majorsData?.map((major) => (
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
