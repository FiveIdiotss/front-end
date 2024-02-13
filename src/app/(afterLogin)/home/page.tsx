'use client';
import AddBtn from '../_component/homePage/addBtn';
import { useSession } from 'next-auth/react';
import IDollar from '../_component/icon/iDollar';
import SideBar_R from '../_component/layout/sideBar_R';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import axios from 'axios';
import Axios from '@/app/util/axiosInstance';
import MentoPosts from './_component/MentoPosts';
import MenteePosts from './_component/MenteePosts';
import Link from 'next/link';
import HomeContent from './_component/HomeContent';

export default function Home() {
    // const { data: session, status } = useSession();

    return <HomeContent />;
}
// {/* 편집 & 추가 버튼 */}
// <AddBtn />
