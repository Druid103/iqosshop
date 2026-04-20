// InitProvider.tsx
import React, { useEffect, useState } from 'react'; // Измените импорт
import { store } from '../store/store';
import { refreshThunk } from '../../entities/auth/lib/thunks';
import { fetchAllBasketsThunk } from '../../entities/basket/lib/thunk';

type InitProviderProps = {
  children: React.ReactNode; // Используйте React.ReactNode вместо React.JSX.Element
};

export default function InitProvider({ children }: InitProviderProps): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initPromises = Promise.allSettled([
      store.dispatch(refreshThunk()),
      store.dispatch(fetchAllBasketsThunk()),
    ]);
    
    initPromises.finally(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Или ваш компонент загрузки
  }

  return <>{children}</>;
}