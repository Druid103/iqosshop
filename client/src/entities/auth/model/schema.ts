import { z } from 'zod';

const roles = ['patient', 'doctor'] as const;

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(roles),
  userPhoto: z.string(),
  doctor_specialization_id: z.number().nullable(),
});

export const userSchemaFront = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string(),
  doctor_specialization_id: z.number().nullable(),
  email: z.string().email(),
  role: z.enum(roles),
  userPhoto: z.string(),
  password: z.string(),
});

export const userSchemaForUpdata = z.object({
  name: z.string(),
  email: z.string().email(),
  userPhoto: z.string().optional(),
  password: z.string(),
});

export const userCreateSchema = userSchemaFront
  .omit({ id: true, role: true, userPhoto: true, doctor_specialization_id: true })
  // .extend({ password: z.string() });

export const userLoginSchema = userCreateSchema.omit({
  firstName: true,
  lastName: true,
  middleName: true,
});

export const userUpdateSchema = z.object({
  accessToken: z.string(),
  user: userSchema,
});

export const backendAuthSchema = z.object({
  accessToken: z.string(),
  user: userSchema,
});
