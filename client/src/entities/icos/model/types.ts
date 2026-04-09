import type { z } from 'zod';
import type icosSchema from './schema';
import type { addIcosSchema } from './schema';

export type IcosT = z.infer<typeof icosSchema> & {
  isFromApi?: boolean;
  apiId?: string;
};
export type AddIcosT = z.infer<typeof addIcosSchema>;

export type IcosActionT =
  | {
      type: 'add';
      payload: IcosT;
    }
  | {
      type: 'remove';
      payload: IcosT['id'];
    }
  | {
      type: 'getallicos';
      payload: IcosT[];
    }
  | {
      type: 'sort';
      payload: 'title';
    }
  | {
      type: 'selectedIcos';
      payload: IcosT;
    };