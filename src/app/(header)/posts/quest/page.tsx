import { Metadata } from 'next';
import PostsQuests from './_component/PostsQuests';
export const metadata: Metadata = {
    title: '자유 질문',
};
export default function RequestsPage() {
    return <PostsQuests />;
}
