'use server';

import { authApi } from '@/lib/api';
import { authedActionClient, publicActionClient } from '@/lib/safe-action';
import {
  AuthMeResponse,
  AuthRefreshResponse,
  AuthSignInResponse,
} from '@/responses/auth';
import { isErrorResponse } from '@/responses/base';
import { signInSchema, signUpSchema } from '@/schemas/auth';
import {
  clearAuthCookies,
  getAuthCookies,
  setAuthCookies,
} from '@/usecases/auth';
import { redirect } from 'next/navigation';

export const actionSignIn = publicActionClient
  .schema(signInSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const res = await authApi
      .post<AuthSignInResponse>(`signin`, {
        json: { email, password },
      })
      .json();

    if (isErrorResponse(res)) throw new Error(res.error);

    const { accessToken, expires: accessExpiry } = res;

    await setAuthCookies({ accessExpiry, accessToken });

    redirect('/expenses');
  });

export const actionSignUp = publicActionClient
  .schema(signUpSchema)
  .action(async ({ parsedInput: { name, email, password } }) => {
    const res = await authApi
      .post('signup', {
        json: { name, email, password },
      })
      .text();

    if (isErrorResponse(res)) throw new Error(res.error);
  });

export const actionSignOut = authedActionClient.action(async () => {
  await clearAuthCookies();

  return redirect('/login');
});

export const actionAuthRefresh = publicActionClient.action(async () => {
  const { accessToken } = await getAuthCookies();

  if (!accessToken) return;

  const res = await authApi
    .post<AuthRefreshResponse>('refresh', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .json();

  if (isErrorResponse(res)) throw new Error(res.error);

  await setAuthCookies({
    accessToken: res.accessToken,
    accessExpiry: res.expires,
  });
});

export const actionGetMe = authedActionClient.action(async ({ ctx }) => {
  const res = await authApi.get<AuthMeResponse>('me', {
    headers: {
      Authorization: `Bearer ${ctx.accessToken}`,
    },
  });

  const result = await res.json();

  if (isErrorResponse(result)) throw new Error(result.error);

  return result;
});
