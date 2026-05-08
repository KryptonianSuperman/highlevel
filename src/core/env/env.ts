import { z } from 'zod';

const serverEnvSchema = z.object({
  EXTERNAL_API_BASE_URL: z.url(),
});

const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.url(),
  NEXT_PUBLIC_API_MOCKING: z.enum(['enabled', 'disabled']).default('disabled'),
});

export const env = {
  ...serverEnvSchema.parse({
    EXTERNAL_API_BASE_URL: process.env.EXTERNAL_API_BASE_URL,
  }),
  ...clientEnvSchema.parse({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_MOCKING: process.env.NEXT_PUBLIC_API_MOCKING,
  }),
};
