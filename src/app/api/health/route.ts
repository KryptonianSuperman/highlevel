import { z } from 'zod';

const HealthResponseSchema = z.object({
  status: z.literal('ok'),
  timestamp: z.string(),
});

export async function GET(): Promise<Response> {
  const payload = HealthResponseSchema.parse({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });

  return Response.json(payload);
}
