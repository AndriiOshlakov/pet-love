import { NewsRequestParams, NewsResponse } from '@/types/News';
import { nextServer } from './api';
import { Friend } from '@/types/Friend';
import { NoticeRequestParams, Notices } from '@/types/Notice';
import { LocationFromBackend } from '@/types/Location';
import { RegisterType } from '@/types/Register';
import { User } from '@/types/User';

export async function fetchNews({ keyword, page, limit }: NewsRequestParams) {
  const response = await nextServer.get<NewsResponse>('/news', {
    params: { keyword, page, limit },
  });
  return response.data;
}

export async function fetchFriends() {
  const response = await nextServer.get<Friend[]>('/friends');
  return response.data;
}

export async function fetchNotices(params: NoticeRequestParams) {
  const response = await nextServer.get<Notices>('/notices', {
    params,
  });
  return response.data;
}

export async function fetchCategories(): Promise<string[]> {
  const response = await nextServer.get<string[]>('/notices/categories');
  return response.data;
}

export async function fetchSex(): Promise<string[]> {
  const response = await nextServer.get<string[]>('/notices/sex');
  return response.data;
}

export async function fetchSpecies(): Promise<string[]> {
  const response = await nextServer.get<string[]>('/notices/species');
  return response.data;
}

export async function fetchLocations(keyword?: string) {
  const response = await nextServer.get<LocationFromBackend[]>('/cities', { params: { keyword } });
  console.log(response);

  return response.data;
}

export async function register(params: RegisterType) {
  const response = await nextServer.post<User>('/auth/sign-up', params);
  console.log(response.data);

  return response.data;
}

export async function login(params: Pick<RegisterType, 'email' | 'password'>) {
  const response = await nextServer.post('/auth/sign-in', params);
  return response.data;
}

export async function getUser() {
  const response = await nextServer.get<User>('/auth/user');
  return response.data;
}
export async function getFullUser() {
  const response = await nextServer.get<User>('/auth/user/full');
  return response.data;
}

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};
