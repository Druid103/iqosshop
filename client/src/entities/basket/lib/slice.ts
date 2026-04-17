import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { BasketT } from '../model/types';
import {
  fetchBasketThunk,
  fetchAllBasketsThunk,
} from './thunk';

export type BasketState = {
  basket: BasketT[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: BasketState = {
  basket: [],
  loading: 'idle',
  error: null,
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBasketThunk.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchBasketThunk.fulfilled, (state, action: PayloadAction<BasketT[]>) => {
        state.loading = 'succeeded';
        state.basket = action.payload;
      })
      .addCase(fetchBasketThunk.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'Failed to load baskets';
      })

      .addCase(fetchAllBasketsThunk.fulfilled, (state, action) => {
        state.basket = action.payload.icoss;
      })
  },
});

export const { clearError} = basketSlice.actions;
export const basketReducer = basketSlice.reducer;
