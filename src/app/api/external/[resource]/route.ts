import { z } from 'zod';
import { env } from '@/core/env/env';

const ParamsSchema = z.object({
  resource: z.string().min(1),
});

const ExternalResponseSchema = z.object({
  data: z.unknown().optional(),
  id: z.union([z.number(), z.string()]).optional(),
  title: z.string().optional(),
});

export async function GET(
  _request: Request,
  context: { params: Promise<{ resource: string }> },
): Promise<Response> {
  const params = ParamsSchema.parse(await context.params);
  const response = await fetch(
    `${env.EXTERNAL_API_BASE_URL}/${params.resource}`,
    {
      cache: 'no-store',
    },
  );

  const json: unknown = await response.json();
  const validated = ExternalResponseSchema.parse(json);

  return Response.json(validated);
}
