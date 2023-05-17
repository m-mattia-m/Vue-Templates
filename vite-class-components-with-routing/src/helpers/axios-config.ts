import { AxiosRequestConfig } from 'axios';
import { Configuration } from '../api';
import { useAuthStore } from '../store/auth';

export const generateAxiosConfig = (): Configuration => {
  if (!import.meta.env.VITE_API_URL) {
    throw new Error('Axios Config could not be generated!');
  }

  const authStore = useAuthStore();

  const apiKey = authStore.getBearerToken || '';
  const basePath = import.meta.env.VITE_API_URL;

  return new Configuration({
    apiKey,
    basePath,
  });
};
