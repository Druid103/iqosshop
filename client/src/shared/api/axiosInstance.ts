import type { AxiosError } from 'axios';
import axios from 'axios';

import type { StoreT } from '../../app/store/store';
import type { AuthSliceType } from '../../entities/auth/model/types';

let store: StoreT | undefined;

export function injectStore(_store: StoreT): void {
  store = _store;
}

const axiosInstance = axios.create({
  baseURL: '/api',
});

axiosInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${store?.getState().auth.accessToken ?? ''}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError & { config: { sent: boolean } }) => {
    const prevReq = error.config;
    if (error.response?.status === 403 && !prevReq.sent) {
      const res = await axios.get('/api/tokens/refresh');
      const { accessToken } = res.data as AuthSliceType;

      if (!accessToken) {
        return Promise.reject(error);
      }
      prevReq.sent = true;
      store?.dispatch({ type: 'auth/setAccessToken', payload: accessToken });
      prevReq.headers.Authorization = `Bearer ${store?.getState().auth.accessToken ?? ''}`;
      return axiosInstance(prevReq);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
