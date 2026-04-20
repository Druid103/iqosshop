import { isAxiosError, type AxiosInstance } from 'axios';
import type { AddIcosT, IcosT } from '../model/types';
import icosSchema from '../model/schema';
import { ZodError } from 'zod';
import axiosInstance from '../../../shared/api/axiosInstance';

class IcosService {
  constructor(private readonly client: AxiosInstance) {}

  async getIcoss(): Promise<IcosT[]> {
    try {
      const res = await this.client.get('/icoss');
      if (res.status !== 200) throw new Error('Неверный статус (ожидался 200)');
      return icosSchema.array().parse(res.data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Ошибка валидации. Список проблем:', error.issues);
      } else if (isAxiosError(error)) {
        console.log(
          'Ошибка при запросе. Статус:',
          error.response?.status,
          'Данные:',
          error.response?.data,
        );
      } else {
        console.error(error);
      }
      throw error;
    }
  }

  async createIcos(formData: AddIcosT): Promise<IcosT> {
    try {
      const res = await this.client.post('/icoss', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.status !== 201) throw new Error('Неверный статус при add (ожидался 201)');
      return icosSchema.parse(res.data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Ошибка валидации. Список проблем:', error.issues);
      } else if (isAxiosError(error)) {
        console.log(
          'Ошибка при запросе. Статус:',
          error.response?.status,
          'Данные:',
          error.response?.data,
        );
      } else {
        console.error(error);
      }
      throw error;
    }
  }

  async deleteIcosById(icosId: IcosT['id']): Promise<void> {
    try {
      const res = await this.client.delete(`/icoss/${String(icosId)}`);
      if (res.status !== 200) throw new Error('Неверный статус при удалении (ожидался 200)');
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Ошибка валидации. Список проблем:', error.issues);
      } else if (isAxiosError(error)) {
        console.log(
          'Ошибка при запросе. Статус:',
          error.response?.status,
          'Данные:',
          error.response?.data,
        );
      } else {
        console.error(error);
      }
      throw error;
    }
  }

  async updateIcosById(id: number, data: AddIcosT): Promise<IcosT> {
    try {
      const res = await this.client.put(`/icoss/${id.toString()}`, data);
      return icosSchema.parse(res.data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Ошибка валидации. Список проблем:', error.issues);
      } else if (isAxiosError(error)) {
        console.log(
          'Ошибка при запросе. Статус:',
          error.response?.status,
          'Данные:',
          error.response?.data,
        );
      } else {
        console.error(error);
      }
      throw error;
    }
  }

  async searchIcosByTitle(input: string): Promise<IcosT[]> {
    try {
      const res = await this.client.get(`/icoss/search`, {
        params: {
          input,
        },
      });
      console.log(res.data);

      return icosSchema.array().parse(res.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async basketIcos(): Promise<IcosT[]> {
    try {
      const res = await this.client.get(`/basket`);
      return icosSchema.array().parse(res.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const icosService = new IcosService(axiosInstance);

export default icosService;
