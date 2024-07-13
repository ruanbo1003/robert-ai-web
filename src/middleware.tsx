
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export default function middleware(request: NextRequest) {

    if(request.nextUrl.pathname == '/login' || request.nextUrl.pathname == '/signup') {
        return NextResponse.next()
    }

    const authToken = request.cookies.get('authToken' as any)
    if(authToken) {
        // console.log("with token:", authToken)
        return NextResponse.next()
    } else {
        // console.log("no token")
        return NextResponse.redirect(new URL("/login", request.url))
    }
}

export const config = {
    matcher: ['/home/:path*', '/dashboard/:path*'],
}
