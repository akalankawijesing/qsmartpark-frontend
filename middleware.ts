import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname
  const { pathname } = request.nextUrl;

  // Skip middleware for public paths and API routes to avoid loops
  if (pathname.startsWith('/_next') || 
      pathname.startsWith('/api') || 
      pathname === '/login' ||
      pathname === '/favicon.ico') {
    return NextResponse.next();
  }

  // Check if user is accessing protected routes
  if (pathname.startsWith('/system') || pathname.startsWith('/dashboard')) {
    // Check for JWT token cookie
    const tokenCookie = request.cookies.get('token');
    
    if (!tokenCookie) {
      // No token, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};