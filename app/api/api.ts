import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error: string }>;

export const api = axios.create({
  baseURL: 'https://petlove.b.goit.study/api',
  withCredentials: true,
});
