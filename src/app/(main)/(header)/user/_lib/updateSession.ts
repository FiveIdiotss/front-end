'use server';
import { update } from '@/auth';
import { auth } from '@/auth';
export const updateSessionImage = async (imageUrl?: string) => {
    const session = await auth();
    if (!session || !imageUrl) return;
    const response = await update({
        user: {
            memberDTO: {
                ...session?.user?.memberDTO,
                memberImageUrl: imageUrl,
            },
        },
    });
    return response;
};
