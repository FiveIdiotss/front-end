import { MetadataRoute } from 'next';
import { getMentorPosts } from './(header)/posts/_lib/mentorService';
import { getSubBoardsPosts } from './(header)/posts/_lib/qeustOrRequestService';

export const dynamic = 'force-dynamic';

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
    try {
        const mentorPostsData = await getMentorPosts({
            pageParam: 1,
            size: 10000,
        });
        const requestPostsData = await getSubBoardsPosts({
            pageParam: 1,
            size: 10000,
            subBoardType: 'REQUEST',
        });
        const questPostsData = await getSubBoardsPosts({
            pageParam: 1,
            size: 10000,
            subBoardType: 'QUEST',
        });

        const mentorPosts: MetadataRoute.Sitemap = mentorPostsData.data.map((board) => ({
            url: `${process.env.HOST_URL}/posts/mentor/${board.boardId}`,
            changeFrequency: 'daily',
            lastModified: new Date(board.writeTime).toISOString().split('T')[0],
            priority: 0.8,
        }));

        const requestPosts: MetadataRoute.Sitemap = requestPostsData.data.map((board) => ({
            url: `${process.env.HOST_URL}/posts/request/${board.subBoardId}`,
            changeFrequency: 'daily',
            lastModified: new Date(board.writeTime).toISOString().split('T')[0],
            priority: 0.7,
        }));
        const questPosts: MetadataRoute.Sitemap = questPostsData.data.map((board) => ({
            url: `${process.env.HOST_URL}/posts/quest/${board.subBoardId}`,
            changeFrequency: 'daily',
            lastModified: new Date(board.writeTime).toISOString().split('T')[0],
            priority: 0.7,
        }));

        return [
            {
                url: 'https://menteetor.site',
                changeFrequency: 'daily', // 변경 빈도
                lastModified: new Date().toISOString().split('T')[0], // 마지막으로 수정된 날짜
                priority: 1, // 우선순위
            },
            {
                url: 'https://menteetor.site/posts/mentor',
                changeFrequency: 'daily',
                lastModified: new Date().toISOString().split('T')[0],
                priority: 0.9,
            },
            {
                url: 'https://menteetor.site/posts/request',
                changeFrequency: 'daily',
                lastModified: new Date().toISOString().split('T')[0],
                priority: 0.9,
            },
            {
                url: 'https://menteetor.site/posts/quest',
                changeFrequency: 'daily',
                lastModified: new Date().toISOString().split('T')[0],
                priority: 0.9,
            },
            ...mentorPosts,
            ...requestPosts,
            ...questPosts,
        ];
    } catch (error) {
        console.error('Error fetching sitemap data:', error);
        return [];
    }
}
