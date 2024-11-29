import { env } from '@/env';
import ky from 'ky';

const baseApi = ky.create({
  prefixUrl: env.BACKEND_URL + '/api',
});

export const authApi = baseApi.extend((options) => ({
  prefixUrl: options.prefixUrl + '/auth',
}));

export const apiV1 = baseApi.extend((options) => ({
  prefixUrl: options.prefixUrl + '/v1',
}));
