import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
});

export const userCreateSchema = userSchema.omit({ id: true }).extend({ password: z.string() });

export const userLoginSchema = userCreateSchema.omit({ name: true });
export const backendAuthSchema = z.object({
  accessToken: z.string(),
  user: userSchema,
});
