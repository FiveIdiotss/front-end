import React from 'react';
import HeartIcon from '../../_icons/common/HeartIcon';
import EngineeringIcon from '../../_icons/Category/EngineeringIcon';
import EducationIcon from '../../_icons/Category/EducationIcon';
import SocialIcon from '../../_icons/Category/SocialIcon';
import HumanitiesIcon from '../../_icons/Category/HumanitiesIcon';
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
            return <Image src={all} alt="engineering" width={38} height={38} />;
        case 'engineering':
            return <Image src={engineering} alt="engineering" width={40} height={40} />;
        case 'natural':
            return <Image src={natural} alt="engineering" width={40} height={40} />;
        case 'humanities':
            return <Image src={humanities} alt="engineering" width={40} height={40} />;
        case 'social':
            return <Image src={social} alt="social" width={40} height={40} />;
        case 'medical':
            return <Image src={medical} alt="medical" width={40} height={40} />;
        case 'arts':
            return <Image src={arts} alt="engineering" width={40} height={40} />;
        case 'education':
            return <Image src={education} alt="education" width={40} height={40} />;
    }
}

export default CateogryIcon;
