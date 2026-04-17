// types.ts
import type { z } from 'zod';
import basketSchema from './schema'; // импортируем схему

export type BasketT = z.infer<typeof basketSchema>;