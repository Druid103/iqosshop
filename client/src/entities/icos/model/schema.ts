import { z } from 'zod';

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
});

const icosSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string().optional(),
  userId: z.number().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  User: userSchema.optional(),
});

export const addIcosSchema = z.object({
  name: z.string().min(1, 'Название обязательно'),
  description: z.string().min(1, 'Краткое описание обязательно'),
  price: z.string().regex(/^\d+$/, 'Цена должна быть числом'),
  image: z.string().min(1, 'Ссылка на изображение обязательна'),
});

export default icosSchema