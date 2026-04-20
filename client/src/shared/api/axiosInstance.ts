import type { AxiosError } from 'axios';
import axios from 'axios';

import type { StoreT } from '../../app/store/store';
import type { AuthSliceType } from '../../entities/auth/model/types';

let store: StoreT | undefined;

export function injectStore(_store: StoreT): void {
  store = _store;
}

const axiosInstance = axios.create({
  
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = store?.getState().auth.accessToken;
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError & { config: { sent?: boolean } }) => {
    const prevReq = error.config;
    
    // Обрабатываем и 401, и 403
    if ((error.response?.status === 401 || error.response?.status === 403) && !prevReq.sent) {
      prevReq.sent = true;
      
      try {
        // Пытаемся обновить токен
        const res = await axios.get('/api/tokens/refresh', {
          withCredentials: true // Важно для отправки refresh token из cookies
        });
        
        const { accessToken } = res.data as AuthSliceType;

        if (!accessToken) {
          // Если не удалось получить токен - разлогиниваем пользователя
          store?.dispatch({ type: 'auth/logout' });
          return Promise.reject(error);
        }
        
        // Обновляем токен в store
        store?.dispatch({ type: 'auth/setAccessToken', payload: accessToken });
        
        // Повторяем оригинальный запрос с новым токеном
        prevReq.headers.Authorization = `Bearer ${accessToken}`;
        return await axiosInstance(prevReq);
      } catch (refreshError) {
        // Если рефреш не удался - разлогиниваем
        store?.dispatch({ type: 'auth/logout' });
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
