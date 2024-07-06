import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { hasCookie } from 'cookies-next';

const protectedRoutes = ['/companies', '/company-onboarding', '/profile'];

export default function middleware(req: NextRequest) {
    if(req.nextUrl.pathname == '/login' || req.nextUrl.pathname == '/signup') {
        return NextResponse.next()
    } else {
        // check auth
        const isAuthenticated = false;
        if(isAuthenticated) {
            return NextResponse.next()
        } else {
            // return NextResponse.next()
            return NextResponse.redirect(new URL("/login", req.url))
        }
    }
    
}

// match /home and /home/** (/home/a, home/a/b)
export const config = {
    matcher: ["/home", "/home/:path*"],
};

