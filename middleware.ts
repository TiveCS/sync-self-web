import { NextRequest, NextResponse } from 'next/server';
import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_ACCESS_TOKEN_REFRESH_TIME,
} from './constants/auth';
import { actionAuthRefresh } from './actions/auth';

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

export async function middleware(req: NextRequest) {
  const isPublicRoutes =
    req.nextUrl.pathname === '/' ||
    req.nextUrl.pathname === '/login' ||
    req.nextUrl.pathname === '/register';
  const isProtectedRoutes = '/expenses';

  const accessTokenCookie = req.cookies.get(COOKIE_ACCESS_TOKEN);
  const accessTokenRefreshTimeCookie = req.cookies.get(
    COOKIE_ACCESS_TOKEN_REFRESH_TIME
  );

  const isTokenShouldRefresh =
    !!accessTokenRefreshTimeCookie &&
    Date.now() >= Number(accessTokenRefreshTimeCookie.value);

  const isShouldToPublic = isProtectedRoutes && !accessTokenCookie;
  const isShouldToProtected = isPublicRoutes && !!accessTokenCookie;

  if (isTokenShouldRefresh) {
    await actionAuthRefresh();
  }

  return NextResponse.next();
}
