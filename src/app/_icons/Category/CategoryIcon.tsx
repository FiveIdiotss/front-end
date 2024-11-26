import React from 'react';
import HeartIcon from '../../_icons/common/HeartIcon';
import Image from 'next/image';
import engineering from '@/../public/departments/이공계.png';
import natural from '@/../public/departments/자연계.png';
import medical from '@/../public/departments/의약계.png';
import social from '@/../public/departments/사회학.png';
import education from '@/../public/departments/사범계.png';
import arts from '@/../public/departments/예체능.png';
import humanities from '@/../public/departments/인문학.png';
import all from '@/../public/departments/전체.png';

//#9980DC

function CateogryIcon({ category }: { category: string }) {
    switch (category) {
        case 'bookmark':
            return <HeartIcon isCheck={true} className="h-5 w-5 p-[1px] text-red-500" />;
        case 'all':
            return <Image src={all} alt="all" width={38} height={38} loading="eager" />;
        case 'engineering':
            return <Image src={engineering} alt="engineering" width={38} height={38} loading="eager" />;
        case 'natural':
            return <Image src={natural} alt="natural" width={38} height={38} loading="eager" />;
        case 'humanities':
            return <Image src={humanities} alt="humanities" width={40} height={40} loading="eager" />;
        case 'social':
            return <Image src={social} alt="social" width={38} height={38} loading="eager" />;
        case 'medical':
            return <Image src={medical} alt="medical" width={40} height={40} loading="eager" />;
        case 'arts':
            return <Image src={arts} alt="arts" width={40} height={40} loading="eager" />;
        case 'education':
            return <Image src={education} alt="education" width={40} height={40} loading="eager" />;
    }
}

export default CateogryIcon;
