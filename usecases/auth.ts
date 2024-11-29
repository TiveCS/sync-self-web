'use server';

import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_ACCESS_TOKEN_REFRESH_TIME,
} from '@/constants/auth';
import { env } from '@/env';
import ms from 'ms';
import { cookies } from 'next/headers';

export async function setAuthCookies(args: {
  accessToken: string;
  accessExpiry: number;
}) {
  const { accessToken, accessExpiry } = args;
  const accessExpiryMs = accessExpiry * 1000;
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: accessExpiryMs,
  });

  const refreshTokenTime = Date.now() + ms(env.JWT_EXPIRY_REFRESH);

  cookieStore.set(
    COOKIE_ACCESS_TOKEN_REFRESH_TIME,
    refreshTokenTime.toString(),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: accessExpiryMs,
    }
  );
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_ACCESS_TOKEN);
  cookieStore.delete(COOKIE_ACCESS_TOKEN_REFRESH_TIME);
}

export async function getAuthCookies() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get(COOKIE_ACCESS_TOKEN);
  const accessTokenRefreshTime = cookieStore.get(
    COOKIE_ACCESS_TOKEN_REFRESH_TIME
  );

  return {
    accessToken: accessToken?.value,
    accessTokenRefreshTime: accessTokenRefreshTime?.value,
  };
}
