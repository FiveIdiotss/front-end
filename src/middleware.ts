import { NextResponse } from 'next/server';
import { auth } from './auth';

export async function middleware() {
    //     const session = await auth();
    //     if (!session) {
    //         return NextResponse.redirect('http://localhost:3000/user/login');
    //     }

    const session = await auth();
    if (session) {
        return NextResponse.redirect('http://localhost:3000/home');
    }
}
export const config = {
    matcher: ['/'],
};

// export function middleware() {}
