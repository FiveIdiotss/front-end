import CloseIcon from '@/app/_icons/common/CloseIcon';
import Image from 'next/image';
import { useState } from 'react';
import apple from '@/../public/apple-touch-icon.png';
import usePWAInstallPrompt from './usePWAInstallPrompt';

function PWAInstallPromptIos() {
    const [modal, setModal] = useState(true);
    const { deferredPrompt, handleInstall } = usePWAInstallPrompt();
    const isIos = /iPad|iPhone|iPod/.test(window.navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

    if (isStandalone) {
        return null;
    }
    if (!deferredPrompt && !isIos) {
        return null;
    }
    if (localStorage.getItem('PWAmodal') !== '1' && modal) {
        return (
            <div className="fixed bottom-0 z-[9999] flex w-full max-w-[1298px] flex-col items-center justify-between gap-6 border-t-2 bg-white p-5  text-sm shadow-md mobile:hidden">
                <div className="flex flex-row justify-between gap-4">
                    <Image
                        src={apple}
                        alt="iOS icon"
                        className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 shadow-md"
                    />
                    <div className="flex flex-col gap-4">
                        <div className="flex items-start justify-between">
                            <span className="text-lg font-bold">환자 ERAS</span>
                            <button
                                onClick={() => {
                                    localStorage.setItem('PWAmodal', '1');
                                    setModal(false);
                                }}
                            >
                                <CloseIcon className="h-5 w-5 cursor-pointer" />
                            </button>
                        </div>
                        <span className="font-medium">홈 화면에 추가하여 앱처럼 사용할 수 있습니다.</span>
                    </div>
                </div>
                {deferredPrompt && !isIos ? (
                    <button className="w-full rounded-lg bg-blue-500 py-3 text-white" onClick={handleInstall}>
                        앱 설치
                    </button>
                ) : (
                    <div className="flex flex-row items-center gap-1">
                        <img src="/ios-share-icon.png" alt="iOS share" className="h-6 w-6" />
                        <span className="text-sm">공유 버튼을 눌러 홈 화면에 추가하세요.</span>
                    </div>
                )}
            </div>
        );
    }
}

export default PWAInstallPromptIos;
