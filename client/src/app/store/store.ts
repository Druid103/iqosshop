import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { icossReducer } from '../../entities/icos/lib/slice';
import authReducer from '../../entities/auth/lib/slice';
import { basketReducer } from '../../entities/basket/lib/slice';
import type { IcosT } from '../../entities/icos/model/types';

type IcosState = {
  icoss: IcosT[];
  basketIcos: IcosT[];
  filtIcosBD: IcosT[];
  loading: boolean;
  apiIcoss: IcosT[];
  sort: {
    key: 'title';
    order: 'asc' | 'desc';
  };
  selectedIcos: IcosT | null;
};

const safeIcossTransform = {
  in: (state: unknown) => {
    if (!state || typeof state !== 'object') return null;

    try {
      const stateObj = state as Record<string, unknown>;
      const cleanState: Partial<IcosState> = {
        icoss: Array.isArray(stateObj.icoss)
          ? (stateObj.icoss as IcosT[]).map((icos: IcosT) => ({
              ...icos,
              id: icos.id || Math.floor(Math.random() * 1000000),
              name: icos.name ?? 'Unknown Name',
              description: icos.description ?? '',
              price: icos.price ?? 0,
              image: icos.image ?? '/default-image.jpg',
            }))
          : [],
        basketIcos: Array.isArray(stateObj.basketIcos)
          ? (stateObj.basketIcos as IcosT[]).map((basket: IcosT) => ({
              ...basket,
              id: basket.id || Math.floor(Math.random() * 1000000),
              name: basket.name ?? 'Unknown Name',
            }))
          : [],
        loading: false,
        filtIcosBD: [],
      };

      return cleanState;
    } catch {
      return null;
    }
  },
  out: (state: unknown) => {
    if (!state || typeof state !== 'object') return undefined;

    try {
      const stateObj = state as Record<string, unknown>;
      const validatedState: IcosState = {
        icoss: Array.isArray(stateObj.icoss) ? (stateObj.icoss as IcosT[]) : [],
        basketIcos: Array.isArray(stateObj.basketIcos) ? (stateObj.basketIcos as IcosT[]) : [],
        filtIcosBD: Array.isArray(stateObj.filtIcosBD) ? (stateObj.filtIcosBD as IcosT[]) : [],
        loading: false,
        apiIcoss: Array.isArray(stateObj.apiIcoss) ? (stateObj.apiIcoss as IcosT[]) : [],
        sort:
          stateObj.sort && typeof stateObj.sort === 'object'
            ? {
                key: 'title' as const,
                order: (stateObj.sort as Record<string, unknown>).order === 'desc' ? 'desc' : 'asc',
              }
            : { key: 'title' as const, order: 'asc' as const },
        selectedIcos:
          stateObj.selectedIcos && typeof stateObj.selectedIcos === 'object'
            ? (stateObj.selectedIcos as IcosT)
            : null,
      };

      return validatedState;
    } catch {
      return undefined;
    }
  },
};

const icossPersistConfig = {
  key: 'icoss',
  storage,
  whitelist: ['icoss', 'basketIcos', 'selectedIcos', 'sort'],
  version: 1,
  transforms: [safeIcossTransform],
  serialize: false,
};

const basketPersistConfig = {
  key: 'basket',
  storage,
  whitelist: ['basket'],
};

const persistedIcossReducer = persistReducer(icossPersistConfig, icossReducer);
const persistedBasketReducer = persistReducer(basketPersistConfig, basketReducer);

export const store = configureStore({
  reducer: {
    icoss: persistedIcossReducer,
    auth: authReducer,
    basket: persistedBasketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
        ignoredPaths: ['register', 'rehydrate', 'books.sort'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type StoreT = typeof store;
