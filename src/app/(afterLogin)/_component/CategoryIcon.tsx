import React from 'react';
import HeartIcon from '../../_icons/common/HeartIcon';
import EngineeringIcon from '../../_icons/Category/EngineeringIcon';
import EducationIcon from '../../_icons/Category/EducationIcon';
import SocialIcon from '../../_icons/Category/SocialIcon';
import HumanitiesIcon from '../../_icons/Category/HumanitiesIcon';

function CateogryIcon({ className, category }: { className: string; category: string }) {
    switch (category) {
        case 'bookmark':
            return <HeartIcon isCheck={true} className="h-5 w-5 p-[1px] text-red-500" />;
        case 'all':
            return (
                <svg
                    className={`${className} p-[2px]`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="4"
                >
                    <g id="Layer_39" data-name="Layer 39">
                        <path d="M60,2H4A2,2,0,0,0,2,4V60a2,2,0,0,0,2,2H60a2,2,0,0,0,2-2V4A2,2,0,0,0,60,2ZM58,30H34V6H58ZM30,6V30H6V6ZM6,34H30V58H6ZM34,58V34H58V58Z"></path>
                    </g>
                </svg>
            );
        case 'engineering':
            return <EngineeringIcon className={className} />;
        case 'natural':
            return (
                <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    className={className}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M53.75 38.59C53.5372 38.534 53.3486 38.4098 53.2132 38.2364C53.0777 38.063 53.0028 37.85 53 37.63V32C53.7956 32 54.5587 31.6839 55.1213 31.1213C55.6839 30.5587 56 29.7956 56 29C56 28.2043 55.6839 27.4413 55.1213 26.8787C54.5587 26.3161 53.7956 26 53 26V12C53 10.6739 52.4732 9.40214 51.5355 8.46446C50.5979 7.52677 49.3261 6.99999 48 6.99999H40V5.99999C40 5.73477 39.8946 5.48042 39.7071 5.29288C39.5196 5.10535 39.2652 4.99999 39 4.99999H33.87C33.6463 4.14399 33.1451 3.38633 32.4448 2.84557C31.7445 2.30481 30.8848 2.01147 30 2.01147C29.1152 2.01147 28.2555 2.30481 27.5552 2.84557C26.8549 3.38633 26.3537 4.14399 26.13 4.99999H21C20.7348 4.99999 20.4804 5.10535 20.2929 5.29288C20.1054 5.48042 20 5.73477 20 5.99999V6.99999H12C10.6739 6.99999 9.40215 7.52677 8.46447 8.46446C7.52678 9.40214 7 10.6739 7 12V57C7 58.3261 7.52678 59.5978 8.46447 60.5355C9.40215 61.4732 10.6739 62 12 62H50C51.5376 61.9999 53.0612 61.708 54.49 61.14C56.7074 60.2401 58.6063 58.6996 59.944 56.7153C61.2817 54.7311 61.9975 52.3931 62 50C62.004 47.4711 61.2082 45.0057 59.7264 42.9563C58.2447 40.907 56.1528 39.3787 53.75 38.59V38.59ZM53.12 40.5C54.9612 41.0985 56.5874 42.2218 57.799 43.7318C59.0106 45.2418 59.7547 47.0729 59.94 49H40.05C40.2403 47.0704 40.9885 45.2381 42.2032 43.7268C43.4179 42.2155 45.0465 41.0908 46.89 40.49C47.499 40.2977 48.0313 39.9173 48.4105 39.4034C48.7896 38.8895 48.996 38.2686 49 37.63V32H51V37.63C51.0053 38.2709 51.2133 38.8936 51.5941 39.4092C51.9749 39.9247 52.509 40.3065 53.12 40.5ZM53 28C53.2652 28 53.5196 28.1053 53.7071 28.2929C53.8946 28.4804 54 28.7348 54 29C54 29.2652 53.8946 29.5196 53.7071 29.7071C53.5196 29.8946 53.2652 30 53 30H47C46.7348 30 46.4804 29.8946 46.2929 29.7071C46.1054 29.5196 46 29.2652 46 29C46 28.7348 46.1054 28.4804 46.2929 28.2929C46.4804 28.1053 46.7348 28 47 28H53ZM40 8.99999H48C48.7949 9.00236 49.5566 9.3192 50.1187 9.88129C50.6808 10.4434 50.9976 11.2051 51 12V26H49V12C49 11.7348 48.8946 11.4804 48.7071 11.2929C48.5196 11.1053 48.2652 11 48 11H40V8.99999ZM22 6.99999H27C27.2652 6.99999 27.5196 6.89463 27.7071 6.7071C27.8946 6.51956 28 6.26521 28 5.99999C28 5.46956 28.2107 4.96085 28.5858 4.58578C28.9609 4.2107 29.4696 3.99999 30 3.99999C30.5304 3.99999 31.0391 4.2107 31.4142 4.58578C31.7893 4.96085 32 5.46956 32 5.99999C32 6.26521 32.1054 6.51956 32.2929 6.7071C32.4804 6.89463 32.7348 6.99999 33 6.99999H38V13H22V6.99999ZM21 15H39C39.2652 15 39.5196 14.8946 39.7071 14.7071C39.8946 14.5196 40 14.2652 40 14V13H47V26C46.2044 26 45.4413 26.3161 44.8787 26.8787C44.3161 27.4413 44 28.2043 44 29C44 29.7956 44.3161 30.5587 44.8787 31.1213C45.4413 31.6839 46.2044 32 47 32V37.63C46.9962 37.8468 46.9234 38.0568 46.7921 38.2294C46.6608 38.4021 46.4779 38.5284 46.27 38.59C43.8654 39.3752 41.7707 40.9007 40.2854 42.9482C38.8 44.9957 38.0001 47.4604 38 49.99V50.02C38 50.33 38.01 50.65 38.04 50.97C38.1825 52.7468 38.7298 54.4674 39.64 56H21V50C20.9984 49.47 20.7872 48.9623 20.4125 48.5875C20.0377 48.2128 19.5299 48.0016 19 48H13V13H20V14C20 14.2652 20.1054 14.5196 20.2929 14.7071C20.4804 14.8946 20.7348 15 21 15ZM19 50V54.59L14.41 50H19ZM12 60C11.2051 59.9976 10.4434 59.6808 9.8813 59.1187C9.31921 58.5566 9.00237 57.7949 9 57V12C9.00237 11.2051 9.31921 10.4434 9.8813 9.88129C10.4434 9.3192 11.2051 9.00236 12 8.99999H20V11H12C11.7348 11 11.4804 11.1053 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12V49C11.002 49.2651 11.1058 49.5193 11.29 49.71L19.29 57.71C19.4807 57.8942 19.7349 57.998 20 58H41.12C41.8071 58.7606 42.5865 59.4325 43.44 60H12ZM56.94 57.21C55.9711 58.147 54.8215 58.8767 53.5612 59.3547C52.301 59.8327 50.9566 60.0488 49.61 59.99C47.2087 59.8733 44.9278 58.9039 43.1772 57.256C41.4267 55.6082 40.3214 53.3899 40.06 51H59.95C59.7217 53.3634 58.6538 55.5666 56.94 57.21V57.21Z"></path>
                    <path d="M20 31C20 31.7956 20.3161 32.5587 20.8787 33.1213C21.4413 33.6839 22.2044 34 23 34C23.6978 33.9976 24.3725 33.7498 24.906 33.3L27.047 34.535C26.9696 34.9669 26.988 35.4105 27.1006 35.8345C27.2133 36.2585 27.4177 36.6527 27.6993 36.9892C27.9808 37.3257 28.3328 37.5963 28.7303 37.782C29.1278 37.9677 29.5612 38.0639 30 38.0639C30.4388 38.0639 30.8722 37.9677 31.2697 37.782C31.6672 37.5963 32.0192 37.3257 32.3007 36.9892C32.5823 36.6527 32.7867 36.2585 32.8993 35.8345C33.012 35.4105 33.0304 34.9669 32.953 34.535L35.094 33.3C35.6275 33.7498 36.3022 33.9976 37 34C37.7068 34.0013 38.3913 33.7525 38.9322 33.2975C39.4732 32.8425 39.8356 32.2108 39.9554 31.5142C40.0752 30.8176 39.9445 30.101 39.5866 29.4915C39.2287 28.882 38.6667 28.4188 38 28.184V25.816C38.4141 25.6718 38.7915 25.4383 39.1053 25.132C39.4192 24.8258 39.6619 24.4543 39.8162 24.0438C39.9705 23.6333 40.0326 23.1939 39.9983 22.7568C39.9639 22.3196 39.8338 21.8954 39.6172 21.5141C39.4006 21.1328 39.1028 20.8037 38.7449 20.5503C38.3871 20.2969 37.9778 20.1253 37.5463 20.0476C37.1147 19.9699 36.6713 19.9881 36.2475 20.1009C35.8237 20.2136 35.4299 20.4181 35.094 20.7L32.953 19.465C33.0304 19.0331 33.012 18.5895 32.8993 18.1655C32.7867 17.7414 32.5823 17.3473 32.3007 17.0108C32.0192 16.6743 31.6672 16.4037 31.2697 16.218C30.8722 16.0323 30.4388 15.936 30 15.936C29.5612 15.936 29.1278 16.0323 28.7303 16.218C28.3328 16.4037 27.9808 16.6743 27.6993 17.0108C27.4177 17.3473 27.2133 17.7414 27.1006 18.1655C26.988 18.5895 26.9696 19.0331 27.047 19.465L24.906 20.7C24.3725 20.2502 23.6978 20.0024 23 20C22.2932 19.9986 21.6087 20.2475 21.0678 20.7025C20.5268 21.1575 20.1644 21.7892 20.0446 22.4858C19.9248 23.1824 20.0555 23.8989 20.4134 24.5085C20.7713 25.118 21.3333 25.5812 22 25.816V28.184C21.4171 28.3901 20.9121 28.7712 20.5541 29.2753C20.1961 29.7794 20.0026 30.3817 20 31V31ZM23 32C22.8022 32 22.6089 31.9413 22.4444 31.8315C22.28 31.7216 22.1518 31.5654 22.0761 31.3827C22.0004 31.1999 21.9806 30.9989 22.0192 30.8049C22.0578 30.6109 22.153 30.4327 22.2929 30.2929C22.4327 30.153 22.6109 30.0578 22.8049 30.0192C22.9989 29.9806 23.2 30.0004 23.3827 30.0761C23.5654 30.1518 23.7216 30.28 23.8315 30.4444C23.9414 30.6089 24 30.8022 24 31C24 31.2652 23.8946 31.5196 23.7071 31.7071C23.5196 31.8946 23.2652 32 23 32ZM26 23C25.9997 22.8035 25.98 22.6076 25.941 22.415L28.005 21.224C28.5495 21.7232 29.2613 22.0001 30 22.0001C30.7387 22.0001 31.4505 21.7232 31.995 21.224L34.059 22.415C33.9163 23.1208 34.0344 23.8543 34.3913 24.4797C34.7482 25.1051 35.3198 25.5798 36 25.816V28.184C35.32 28.4201 34.7486 28.8947 34.3917 29.5199C34.0348 30.145 33.9166 30.8784 34.059 31.584L32 32.776C31.4555 32.2768 30.7437 31.9998 30.005 31.9998C29.2663 31.9998 28.5545 32.2768 28.01 32.776L25.946 31.585C26.0884 30.8786 25.9696 30.1445 25.6117 29.519C25.2538 28.8936 24.6812 28.4192 24 28.184V25.816C24.5829 25.6099 25.0879 25.2288 25.4459 24.7247C25.8039 24.2206 25.9974 23.6182 26 23V23ZM30 36C29.8022 36 29.6089 35.9413 29.4444 35.8315C29.28 35.7216 29.1518 35.5654 29.0761 35.3827C29.0004 35.1999 28.9806 34.9989 29.0192 34.8049C29.0578 34.6109 29.153 34.4327 29.2929 34.2929C29.4327 34.153 29.6109 34.0578 29.8049 34.0192C29.9989 33.9806 30.2 34.0004 30.3827 34.0761C30.5654 34.1518 30.7216 34.28 30.8315 34.4444C30.9414 34.6089 31 34.8022 31 35C31 35.2652 30.8946 35.5196 30.7071 35.7071C30.5196 35.8946 30.2652 36 30 36ZM37 32C36.8022 32 36.6089 31.9413 36.4444 31.8315C36.28 31.7216 36.1518 31.5654 36.0761 31.3827C36.0004 31.1999 35.9806 30.9989 36.0192 30.8049C36.0578 30.6109 36.153 30.4327 36.2929 30.2929C36.4327 30.153 36.6109 30.0578 36.8049 30.0192C36.9989 29.9806 37.2 30.0004 37.3827 30.0761C37.5654 30.1518 37.7216 30.28 37.8315 30.4444C37.9414 30.6089 38 30.8022 38 31C38 31.2652 37.8946 31.5196 37.7071 31.7071C37.5196 31.8946 37.2652 32 37 32ZM37 22C37.1978 22 37.3911 22.0586 37.5556 22.1685C37.72 22.2784 37.8482 22.4346 37.9239 22.6173C37.9996 22.8 38.0194 23.0011 37.9808 23.1951C37.9422 23.3891 37.847 23.5672 37.7071 23.7071C37.5673 23.8469 37.3891 23.9422 37.1951 23.9808C37.0011 24.0194 36.8 23.9996 36.6173 23.9239C36.4346 23.8482 36.2784 23.72 36.1685 23.5556C36.0586 23.3911 36 23.1978 36 23C36 22.7348 36.1054 22.4804 36.2929 22.2929C36.4804 22.1053 36.7348 22 37 22ZM30 18C30.1978 18 30.3911 18.0586 30.5556 18.1685C30.72 18.2784 30.8482 18.4346 30.9239 18.6173C30.9996 18.8 31.0194 19.0011 30.9808 19.1951C30.9422 19.3891 30.847 19.5672 30.7071 19.7071C30.5673 19.8469 30.3891 19.9422 30.1951 19.9808C30.0011 20.0194 29.8 19.9996 29.6173 19.9239C29.4346 19.8482 29.2784 19.72 29.1685 19.5556C29.0586 19.3911 29 19.1978 29 19C29 18.7348 29.1054 18.4804 29.2929 18.2929C29.4804 18.1053 29.7348 18 30 18ZM23 22C23.1978 22 23.3911 22.0586 23.5556 22.1685C23.72 22.2784 23.8482 22.4346 23.9239 22.6173C23.9996 22.8 24.0194 23.0011 23.9808 23.1951C23.9422 23.3891 23.847 23.5672 23.7071 23.7071C23.5673 23.8469 23.3891 23.9422 23.1951 23.9808C23.0011 24.0194 22.8 23.9996 22.6173 23.9239C22.4346 23.8482 22.2784 23.72 22.1685 23.5556C22.0586 23.3911 22 23.1978 22 23C22 22.7348 22.1054 22.4804 22.2929 22.2929C22.4804 22.1053 22.7348 22 23 22Z"></path>
                    <path d="M18 42H20C20.2652 42 20.5196 41.8946 20.7071 41.7071C20.8946 41.5196 21 41.2652 21 41C21 40.7348 20.8946 40.4804 20.7071 40.2929C20.5196 40.1054 20.2652 40 20 40H18C17.7348 40 17.4804 40.1054 17.2929 40.2929C17.1054 40.4804 17 40.7348 17 41C17 41.2652 17.1054 41.5196 17.2929 41.7071C17.4804 41.8946 17.7348 42 18 42Z"></path>
                    <path d="M38 40H24C23.7348 40 23.4804 40.1054 23.2929 40.2929C23.1054 40.4804 23 40.7348 23 41C23 41.2652 23.1054 41.5196 23.2929 41.7071C23.4804 41.8946 23.7348 42 24 42H38C38.2652 42 38.5196 41.8946 38.7071 41.7071C38.8946 41.5196 39 41.2652 39 41C39 40.7348 38.8946 40.4804 38.7071 40.2929C38.5196 40.1054 38.2652 40 38 40Z"></path>
                    <path d="M20 44H18C17.7348 44 17.4804 44.1054 17.2929 44.2929C17.1054 44.4804 17 44.7348 17 45C17 45.2652 17.1054 45.5196 17.2929 45.7071C17.4804 45.8946 17.7348 46 18 46H20C20.2652 46 20.5196 45.8946 20.7071 45.7071C20.8946 45.5196 21 45.2652 21 45C21 44.7348 20.8946 44.4804 20.7071 44.2929C20.5196 44.1054 20.2652 44 20 44Z"></path>
                    <path d="M36 44H24C23.7348 44 23.4804 44.1054 23.2929 44.2929C23.1054 44.4804 23 44.7348 23 45C23 45.2652 23.1054 45.5196 23.2929 45.7071C23.4804 45.8946 23.7348 46 24 46H36C36.2652 46 36.5196 45.8946 36.7071 45.7071C36.8946 45.5196 37 45.2652 37 45C37 44.7348 36.8946 44.4804 36.7071 44.2929C36.5196 44.1054 36.2652 44 36 44Z"></path>
                    <path d="M35 48H24C23.7348 48 23.4804 48.1054 23.2929 48.2929C23.1054 48.4804 23 48.7348 23 49C23 49.2652 23.1054 49.5196 23.2929 49.7071C23.4804 49.8946 23.7348 50 24 50H35C35.2652 50 35.5196 49.8946 35.7071 49.7071C35.8946 49.5196 36 49.2652 36 49C36 48.7348 35.8946 48.4804 35.7071 48.2929C35.5196 48.1054 35.2652 48 35 48Z"></path>
                    <path d="M35 52H24C23.7348 52 23.4804 52.1054 23.2929 52.2929C23.1054 52.4804 23 52.7348 23 53C23 53.2652 23.1054 53.5196 23.2929 53.7071C23.4804 53.8946 23.7348 54 24 54H35C35.2652 54 35.5196 53.8946 35.7071 53.7071C35.8946 53.5196 36 53.2652 36 53C36 52.7348 35.8946 52.4804 35.7071 52.2929C35.5196 52.1054 35.2652 52 35 52Z"></path>
                </svg>
            );
        case 'humanities':
            return <HumanitiesIcon className={className} />;
        case 'social':
            return <SocialIcon className={className} />;
        case 'medical':
            return (
                <svg
                    className={className}
                    version="1.1"
                    id="Layer_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 99.313 99.313"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="4"
                >
                    <g>
                        <path
                            d="M26.713,62.956h16.722v16.735c0,0.828,0.671,1.5,1.5,1.5h9.093c0.828,0,1.5-0.672,1.5-1.5V62.956H72.25
        c0.828,0,1.5-0.672,1.5-1.5v-9.087c0-0.828-0.672-1.5-1.5-1.5H55.528V34.14c0-0.829-0.672-1.5-1.5-1.5h-9.093
        c-0.829,0-1.5,0.671-1.5,1.5v16.729H26.713c-0.829,0-1.5,0.672-1.5,1.5v9.087C25.213,62.284,25.884,62.956,26.713,62.956z
        M28.213,53.869h16.722c0.829,0,1.5-0.672,1.5-1.5V35.64h6.093v16.729c0,0.828,0.672,1.5,1.5,1.5H70.75v6.087H54.028
        c-0.828,0-1.5,0.672-1.5-1.5v16.735h-6.093V61.456c0-0.828-0.671-1.5-1.5-1.5H28.213V53.869z"
                        ></path>
                        <path
                            d="M88.708,22.484h-14.11c-0.571-7.393-5.601-13.195-11.704-13.195H36.068c-6.103,0-11.133,5.802-11.703,13.195H10.255
        c-0.829,0-1.5,0.671-1.5,1.5v64.192c0,0.828,0.671,1.5,1.5,1.5h78.453c0.828,0,1.5-0.672,1.5-1.5V23.984
        C90.208,23.156,89.536,22.484,88.708,22.484z M36.068,12.289h26.826c4.472,0,8.165,4.461,8.691,10.195H27.378
        C27.903,16.749,31.597,12.289,36.068,12.289z M87.208,86.676H11.755V25.484h75.453V86.676z"
                        ></path>
                    </g>
                </svg>
            );
        case 'arts':
            return (
                <svg
                    className={className}
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                >
                    <path d="M62.951,19.854a1,1,0,0,0-.807-.68L45.39,16.739,37.9,1.558a1.041,1.041,0,0,0-1.794,0L28.61,16.739,11.856,19.174A1,1,0,0,0,11.3,20.88l8.039,7.836,1.4-1.432-6.589-6.422,15.269-2.219a1,1,0,0,0,.753-.547L37,4.259,43.829,18.1a1,1,0,0,0,.753.547l15.269,2.219L48.8,31.632a1,1,0,0,0-.288.885l2.609,15.208L47.465,45.8l-.93,1.77,5.45,2.866a1,1,0,0,0,1.452-1.054L50.575,32.7,62.7,20.88A1,1,0,0,0,62.951,19.854Z"></path>
                    <path d="M38.749,48.949l3,1a1,1,0,0,0,1.306-.807l1-6.977a4,4,0,0,0-6.312-3.8l-3.43,2.5L35,34.624l8.549-4.75A1,1,0,0,0,44.065,29V25a1,1,0,0,0-1.486-.874l-9.79,5.439A4.929,4.929,0,0,0,33.065,28a5,5,0,1,0-6.179,4.844L15.579,39.126a1,1,0,0,0-.514.874v4a1,1,0,0,0,1.515.857l8.311-4.986-.782,8.6L16.465,54.2a1,1,0,0,0-.4.8v4a1,1,0,0,0,1.594.8L38.672,44.273l-.593,3.562A1,1,0,0,0,38.749,48.949ZM25.065,28a3,3,0,1,1,3,3A3,3,0,0,1,25.065,28Zm-7,29.018V55.5l7.6-5.7a1,1,0,0,0,.4-.71l1-11a1,1,0,0,0-1.511-.947l-8.485,5.091V40.588l25-13.888v1.712l-8.486,4.714a1,1,0,0,0-.508.764l-1,9a1,1,0,0,0,1.582.919l5.263-3.828a2,2,0,0,1,3.156,1.9l-.827,5.79-1.053-.35.859-5.157a1,1,0,0,0-1.58-.969Z"></path>
                    <rect
                        x="8.565"
                        y="59.5"
                        width="5"
                        height="2"
                        transform="matrix(0.8, -0.6, 0.6, 0.8, -34.095, 18.748)"
                    ></rect>
                    <rect
                        x="0.796"
                        y="53.34"
                        width="13.22"
                        height="2"
                        transform="translate(-28.899 13.235) rotate(-33.69)"
                    ></rect>
                    <rect
                        x="1.17"
                        y="46.06"
                        width="8.473"
                        height="2"
                        transform="matrix(0.826, -0.563, 0.563, 0.826, -25.574, 11.225)"
                    ></rect>
                </svg>
            );
        case 'education':
            return <EducationIcon className={className} />;
    }
}

export default CateogryIcon;
