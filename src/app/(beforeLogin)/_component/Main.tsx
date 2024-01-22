import Link from 'next/link';
import Image from 'next/image';
import mainLogo from '../../../../public/3.png';
import naver from '@/../public/social/naver.png';
export default function Main() {
    return (
        <>
            <div className="  hidden w-7/12 justify-end pl-24 md:block ">
                <p
                    className=" mt-32  text-4xl font-bold  leading-3 text-white lg:text-5xl"
                    style={{ lineHeight: '1.3' }}
                >
                    대학교별 멘토와 멘티를 통해 빠르게 성장 해보세요.
                </p>
            </div>
            <div className="flex flex-grow items-center justify-center">
                <div className=" flex h-fit w-fit flex-col justify-center rounded-3xl  bg-slate-100 px-3 py-6 shadow-lg shadow-black ">
                    <Image src={mainLogo} width={90} height={90} alt="Description of the image" className="m-auto" />
                    <h3 className="w-80 text-center">FiveIdiots와 함께해주셔서 감사합니다</h3>

                    <div className="m-auto mt-10 flex h-20 flex-row gap-4">
                        <button className="h-16 w-16 rounded-lg bg-yellow-400 shadow-xl ">Kakao</button>
                        <button className="h-16 w-16 rounded-lg border border-neutral-300 shadow-xl ">Google</button>
                        <button className="h-16 w-16 rounded-lg  shadow-xl  ">
                            <Image src={naver} width={100} height={100} alt="Description of the image" />
                        </button>
                    </div>

                    <div className=" m-auto  flex w-64 flex-row">
                        <div className=" flex flex-grow flex-col justify-center">
                            <div className="h-0 border border-b-0 border-slate-200"></div>
                        </div>
                        <span className="mx-2">또는</span>
                        <div className="flex flex-grow flex-col justify-center">
                            <div className="h-0 border border-b-0 border-slate-200 "></div>
                        </div>
                    </div>

                    <Link href="/user/signup">
                        <div className=" bg-primary m-auto  mt-4 flex h-9 w-64  items-center justify-center rounded-3xl text-white">
                            회원가입
                        </div>
                    </Link>
                    <div className=" m-auto mt-20 ">
                        <span className=" flex flex-col items-center text-sm text-neutral-400">이미 회원이신가요?</span>
                        <Link href="/user/login">
                            <div className=" mt-1 flex h-9 w-64 items-center justify-center rounded-3xl border border-solid border-neutral-300 ">
                                로그인
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
