const mentorPosts = [
    'title 1',
    'title 2',
    'title 3',
    'title 4',
    'title 5',
    'title 6',
    'title 7',
    'title 8',
    'title 9',
    'title 10',
    'title 11',
    'title 12',
    'title 13',
    'title 14',
    'title 15',
    'title 16',
]; //하드코딩 된 멘토 글

export default function MentorsDetail() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <div className="flex h-48 w-40 items-center justify-center border border-solid border-gray-500 p-4 transition duration-300 hover:bg-gray-200">
                        01
                    </div>
                    <div className="flex h-48 w-40 items-center justify-center border border-solid border-gray-500 p-4 transition duration-300 hover:bg-gray-200">
                        02
                    </div>
                    <div className="flex h-48 w-40 items-center justify-center border border-solid border-gray-500 p-4 transition duration-300 hover:bg-gray-200">
                        03
                    </div>
                    <div className="flex h-48 w-40 items-center justify-center border border-solid border-gray-500 p-4 transition duration-300 hover:bg-gray-200">
                        04
                    </div>
                    <div className="flex h-48 w-40 items-center justify-center border border-solid border-gray-500 p-4 transition duration-300 hover:bg-gray-200">
                        05
                    </div>
                    <div className="flex h-48 w-40 items-center justify-center border border-solid border-gray-500 p-4 transition duration-300 hover:bg-gray-200">
                        06
                    </div>
                    <div className="flex h-48 w-40 items-center justify-center border border-solid border-gray-500 p-4 transition duration-300 hover:bg-gray-200">
                        07
                    </div>
                    <div className="flex h-48 w-40 items-center justify-center border border-solid border-gray-500 p-4 transition duration-300 hover:bg-gray-200">
                        08
                    </div>
                </div>
            </div>
        </div>
    );
}
