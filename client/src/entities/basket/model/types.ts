import type { z } from 'zod';

import { basketIcos } from '@/entities/icos/lib/slice';

export type BasketT = z.infer<typeof basketIcos>; 