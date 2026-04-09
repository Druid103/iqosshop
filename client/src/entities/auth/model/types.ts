import type { z } from 'zod';
import type {
  backendAuthSchema,
  userCreateSchema,
  userLoginSchema,
  userSchema,
  userSchemaForUpdata,
} from '../model/schema';
export type UserType = z.infer<typeof userSchema>;
export type UserSignupForm = z.infer<typeof userCreateSchema>;
export type UserSigninForm = z.infer<typeof userLoginSchema>;
export type UserTypeForFront = z.infer<typeof userSchemaForUpdata>;

export enum AuthStatus {
  fetching = 'fetching',
  guest = 'guest',
  authenticated = 'authenticated',
}

export type BackendAuthType = z.infer<typeof backendAuthSchema>;

export type AuthType =
  | {
      status: AuthStatus.fetching;
      user?: UserType;
    }
  | {
      status: AuthStatus.guest;
      user?: UserType;
    }
  | {
      status: AuthStatus.authenticated;
      user: UserType;
    };

export type AuthSliceType = {
  accessToken: string;
  data: AuthType;
  selectedUser: UserType | null;
};
