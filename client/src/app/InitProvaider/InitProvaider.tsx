import type React from 'react';
import { use } from 'react';
import { store } from '../store';
import { refreshThunk } from '../../entities/auth/redux/thunks';
import { fetchAllFavoritesThunk } from '../../entities/favorites/redux/thunks';

type InitProviderProps = {
  children: React.JSX.Element;
};

const initAuth = store.dispatch(refreshThunk());
const initFavorites = store.dispatch(fetchAllFavoritesThunk());

const initPromise = Promise.allSettled([initAuth, initFavorites]);

export default function InitProvider({ children }: InitProviderProps): React.JSX.Element {
  use(initPromise);
  return children;
}