'use client';


import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from "next/headers"
// import { hasCookie } from 'cookies-next';

const protectedRoutes = ['/companies', '/company-onboarding', '/profile'];

export default function middleware(req: NextRequest) {
    if(req.nextUrl.pathname == '/login' || req.nextUrl.pathname == '/signup') {
        return NextResponse.next()
    } else {
        // console.log("middleware:", req.headers)

        const authToken = cookies().get("authToken" as any)
        console.log('middleware token:', authToken)

        return NextResponse.next()

        // check auth

        // if(authToken) {
        //     return NextResponse.next()
        // } else {
        //     return NextResponse.redirect(new URL("/login", req.url))
        // }
    }
}

// match /home and /home/** (/home/a, home/a/b)
export const config = {
    matcher: ["/home", "/home/:path*"],
};

