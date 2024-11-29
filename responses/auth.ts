import { User } from '@/models/users';
import { ApiBaseResponse } from './base';

export type AuthSignInResponse = ApiBaseResponse<{
  accessToken: string;
  expires: number;
}>;

export type AuthMeResponse = ApiBaseResponse<User>;

export type AuthRefreshResponse = AuthSignInResponse;
