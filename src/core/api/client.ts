import 'server-only';
import { z } from 'zod';

export async function getJson<TSchema extends z.ZodType>(
  input: RequestInfo | URL,
  schema: TSchema,
  init?: RequestInit,
): Promise<z.infer<TSchema>> {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const json: unknown = await response.json();
  return schema.parse(json);
}
