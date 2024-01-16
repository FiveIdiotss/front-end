'use client'
import BackButton from './BackButton'

export default function SignupModal() {
    const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    return (
        // 모달배경
        <div className="bg-modal absolute bottom-0 left-0 right-0 top-0 flex h-full w-screen items-center justify-center">
            <div className=" relative flex h-[450px] min-w-[600px]  flex-col items-center rounded-lg bg-white p-3">
                <div className="h-fit w-full ">
                    {/* 모달헤더 */}
                    <BackButton />
                </div>
                <h3>회원가입</h3>
                <form onSubmit={onsubmit}></form>
            </div>
        </div>
    )
}
