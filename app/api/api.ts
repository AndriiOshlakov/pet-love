import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';

export type ApiError = AxiosError<{ error: string }>;

export const api = axios.create({
  baseURL: 'https://petlove.b.goit.study/api',
  withCredentials: true,
});
export async function apiWithAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  return axios.create({
    baseURL: 'https://petlove.b.goit.study/api',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
}
