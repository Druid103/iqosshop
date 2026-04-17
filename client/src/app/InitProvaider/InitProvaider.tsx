import type React from 'react';
import { use } from 'react';
import { store } from '../store/store';
import { refreshThunk } from '../../entities/auth/lib/thunks';
import { fetchAllBasketsThunk } from '../../entities/basket/lib/thunk';

type InitProviderProps = {
  children: React.JSX.Element;
};

const initAuth = store.dispatch(refreshThunk());
const initFavorites = store.dispatch(fetchAllBasketsThunk());

const initPromise = Promise.allSettled([initAuth, initFavorites]);

export default function InitProvider({ children }: InitProviderProps): React.JSX.Element {
  use(initPromise);
  return children;
}