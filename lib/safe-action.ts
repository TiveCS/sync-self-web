import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_ACCESS_TOKEN_REFRESH_TIME,
} from '@/constants/auth';
import { createSafeActionClient } from 'next-safe-action';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const publicActionClient = createSafeActionClient({
  handleServerError: (error) => {
    return error.message;
  },
});

export const authedActionClient = createSafeActionClient({
  handleServerError: (error) => {
    return error.message;
  },
}).use(async ({ next }) => {
  const cookieStore = await cookies();
  const cookieAccessToken = cookieStore.get(COOKIE_ACCESS_TOKEN);
  const cookieAccessTokenRefreshTime = cookieStore.get(
    COOKIE_ACCESS_TOKEN_REFRESH_TIME
  );

  if (!cookieAccessToken || !cookieAccessTokenRefreshTime) {
    return redirect('/login');
  }

  return next({ ctx: { accessToken: cookieAccessToken.value } });
});
