import { createAsyncThunk } from '@reduxjs/toolkit';
import basketService from '../api/service';

export const fetchBasketThunk = createAsyncThunk('baskets/fetchBasketThunk', () =>
  basketService.getBasketIcoss(),
);


export const checkBasketThunk = createAsyncThunk(
  'baskets/checkBasket',
  async (icosId: number) => await basketService.checkIsBasket(icosId),
);


export const fetchAllBasketsThunk = createAsyncThunk('baskets/fetchAllBaskets', async () => {
  const allBaskets = await basketService.getAllBaskets();
  return allBaskets;
});

export const clearAllBasketsThunk = createAsyncThunk('baskets/clearAllBaskets', async () => {
  const [regularResult] = await Promise.allSettled([
    basketService.clearAllBaskets(),
  ]);

  return {
    books: [],
    apiBooks: [],
    deletedRegular: regularResult.status === 'fulfilled' ? regularResult.value.deletedCount : 0,
  };
});
