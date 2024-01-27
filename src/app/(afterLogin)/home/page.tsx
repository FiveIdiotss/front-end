import AddBtn from '../_component/homePage/addBtn';

export default function Home() {
    return (
        // wrapper
        <div className="flex h-screen flex-col items-center py-10 pt-10">
            {/* search */}
            <div className="">검색 bar</div>
            {/* category */}
            <span className=" pt-10 font-semibold">카테고리</span>
            <div className="flex gap-5 pt-5">
                <div className="bg-red-500">category 1</div>
                <div className="bg-blue-500">category 2</div>
                <div className="bg-yellow-500">category 3</div>
            </div>
            <span className=" pt-10 font-semibold">멘토 글</span>
            <div className="flex gap-5 pt-5">
                <div className="bg-red-500">category 1</div>
                <div className="bg-blue-500">category 2</div>
                <div className="bg-yellow-500">category 3</div>
            </div>
            <span className=" pt-10 font-semibold">멘티 글</span>
            <div className="flex gap-5 pt-5">
                <div className="bg-red-500">category 1</div>
                <div className="bg-blue-500">category 2</div>
                <div className="bg-yellow-500">category 3</div>
            </div>
        </div>
    );
}

// {/* 편집 & 추가 버튼 */}
// <AddBtn />
