import { isAxiosError, type AxiosInstance, type AxiosError } from 'axios';
import type { BasketT } from '../model/types';
import basketSchema from '../model/schema';
import z, { ZodError } from 'zod';
import axiosInstance from '../../../shared/api/axiosInstance';

type BasketResponse = {
  isBasket: boolean;
};

class BasketIcosService {
  constructor(private readonly client: AxiosInstance) {}

  async getBasketIcoss(): Promise<BasketT[]> {
    try {
      const res = await this.client.get<unknown>('/baskets');
      const basketArraySchema = z.array(basketSchema);
      return basketArraySchema.parse(res.data);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        console.error('Validation error:', error.issues);
        throw new Error('Invalid server response format');
      }
      if (isAxiosError(error)) {
        console.error('Request failed:', error.response?.status, error.response?.data);
        throw new Error(BasketIcosService.getErrorMessage(error) ?? 'Failed to fetch favorites');
      }
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }

  toggleBasket = async (icosId: number): Promise<{ isBasket: boolean; baskets?: BasketT[] }> => {
    try {
      const response = await this.client.post<{
        isBasket: boolean;
        baskets?: BasketT[];
      }>(`/baskets/${icosId.toString()}/toggle`, {});

      return response.data;
    } catch (error: unknown) {
      throw BasketIcosService.handleError(error, 'Не удалось изменить избранное');
    }
  };

  async getAllBaskets(): Promise<{ icoss: BasketT[] }> {
    try {
      const [basketsResponse] = await Promise.all([
        this.client.get<BasketT[]>('/baskets'),
        this.client.get<{ icoss: BasketT[] }>,
      ]);

      return {
        icoss: Array.isArray(basketsResponse.data) ? basketsResponse.data : [],
      };
    } catch (error: unknown) {
      console.error('Get all favorites error:', error);
      return { icoss: [] };
    }
  }

  async checkIsBasket(icosId: number): Promise<boolean> {
    try {
      const res = await this.client.get<BasketResponse>(
        `/baskets/check?icosId=${icosId.toString()}`,
      );
      return res.data.isBasket;
    } catch (error: unknown) {
      throw BasketIcosService.handleError(error, 'Failed to check Basket status');
    }
  }

  async clearAllBaskets(): Promise<{
    message: string;

    deletedCount: number;
  }> {
    try {
      const response = await this.client.delete<{ message: string; deletedCount: number }>(
        '/basket/clear-all',
      );
      return response.data;
    } catch (error: unknown) {
      throw BasketIcosService.handleError(error, 'Ошибка при очистке избранных книг');
    }
  }

  private static handleError(error: unknown, defaultMessage: string): Error {
    if (error instanceof ZodError) {
      console.error('Validation error:', error.issues);
      return new Error('Invalid server response format');
    }
    if (isAxiosError(error)) {
      console.error('Request failed:', error.response?.status, error.response?.data);
      return new Error(BasketIcosService.getErrorMessage(error) ?? defaultMessage);
    }
    console.error('Unexpected error:', error);
    return new Error('An unexpected error occurred');
  }

  private static getErrorMessage(error: AxiosError): string | undefined {
    if (typeof error.response?.data === 'object' && error.response.data !== null) {
      return (error.response.data as { message?: string }).message;
    }
    return undefined;
  }
}

const basketService = new BasketIcosService(axiosInstance);

export default basketService;
