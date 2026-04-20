import { AxiosError, type AxiosInstance } from 'axios';
import { ZodError } from 'zod';

import type { BackendAuthType } from '../model/types';
import { backendAuthSchema, userCreateSchema, userLoginSchema } from '../model/schema';
import axiosInstance from '../../../shared/api/axiosInstance';

class AuthService {
  constructor(private readonly client: AxiosInstance) {}

  async signup(formData: FormData): Promise<BackendAuthType> {
    try {
      const data = userCreateSchema.parse(Object.fromEntries(formData));
      const res = await this.client.post('/auth/signup', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status !== 200) throw new Error('Неверный статус реги (ожидалось 200)');
      const authResponse = backendAuthSchema.parse(res.data);
      return authResponse;
    } catch (err) {
      if (err instanceof ZodError) {
        console.log('Validation error in auth service', err.issues);
      }
      throw err;
    }
  }

  async signin(formData: FormData): Promise<BackendAuthType> {
    try {
      const data = userLoginSchema.parse(Object.fromEntries(formData));
      const res = await this.client.post('/auth/signin', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status !== 200) throw new Error('Неверный статус при логине (ожидалось 200)');
      const authResponse = backendAuthSchema.parse(res.data);
      return authResponse;
    } catch (err) {
      if (err instanceof ZodError) {
        console.log('Validation error in auth service', err.issues);
      }
      throw err;
    }
  }

  async refresh(): Promise<BackendAuthType> {
    try {
      const response = await this.client.get('/tokens/refresh');
      if (response.status !== 200) throw new Error('Неверный статус рефреша (ожидалось 200)');
      const backendAuth = backendAuthSchema.parse(response.data);
      return backendAuth;
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Zod error:', error.issues);
      } else if (error instanceof AxiosError) {
        console.log('Axios error:', error.response?.data);
      }
      throw error;
    }
  }

  logout(): Promise<void> {
    return this.client('/auth/logout');
  }
}

// qweQWE1!

export default new AuthService(axiosInstance);
