import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
    BACKEND_URL: z.string().url(),
    JWT_EXPIRY_REFRESH: z.string().default('12h'),
  },
  client: {},
  experimental__runtimeEnv: {},
});
