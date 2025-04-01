import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define paths that need admin authentication
    const adminPaths = ['/admin', '/api/admin'];

    // Skip authentication for the login page
    if (path === '/admin/login') {
        return NextResponse.next();
    }

    // Check if the path requires admin authentication
    const isAdminPath = adminPaths.some(p => path.startsWith(p));

    if (!isAdminPath) {
        return NextResponse.next();
    }

    const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET,
    });

    // If the admin is not logged in, redirect to the login page
    if (!token) {
        const url = new URL('/admin/login', request.url);
        url.searchParams.set('callbackUrl', encodeURI(request.url));
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/api/admin/:path*'],
};
