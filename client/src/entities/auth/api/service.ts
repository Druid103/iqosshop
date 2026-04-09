import { AxiosError, type AxiosInstance } from 'axios';
import { ZodError } from 'zod';

import type { BackendAuthType, UserType } from '../model/types';
import {
  backendAuthSchema,
  userCreateSchema,
  userLoginSchema,
  userSchema,

} from '../model/schema';
import axiosInstance from '../../../shared/api/axiosInstance';

class AuthService {
  constructor(private readonly client: AxiosInstance) {}

  async signup(formData: FormData): Promise<BackendAuthType> {
    try {
      const data = userCreateSchema.parse(Object.fromEntries(formData));
      console.log(data, '333');

      const fullName = `${data.firstName} ${data.lastName} ${data.middleName}`.trim();
      console.log(fullName, '111');

      const payload = {
        name: fullName,
        role: 'patient',
        email: data.email,
        password: data.password,
      };
      const res = await this.client.post('/auth/signup', payload, {
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

  async updataUser(formData: FormData): Promise<UserType> {
    try {
      const idEntry = formData.get('id');
      if (!idEntry || typeof idEntry !== 'string') {
        throw new Error('ID is required and must be a string');
      }
      const id = idEntry;
      const res = await this.client.put(`/auth/${id}`, formData);
      if (res.status !== 200)
        throw new Error('Неверный статус при обновлении пользователя (ожидалось 200)');
      const authResponse = userSchema.parse(res.data);
      return authResponse;
    } catch (err) {
      if (err instanceof ZodError) {
        console.log('Validation error in auth service', err.issues);
      }
      throw err;
    }
  }
}

export default new AuthService(axiosInstance);
