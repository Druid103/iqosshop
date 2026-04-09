import { z } from 'zod';

const basketSchema = z.object({
  id: z.number(),
  userId: z.number().optional(),
  bookId: z.number().optional(),
});

export default basketSchema;