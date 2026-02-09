import { NewsRequestParams, NewsResponse } from '@/types/News';
import { nextServer } from './api';
import { Friend } from '@/types/Friend';
import { NoticeRequestParams, Notices } from '@/types/Notice';
import { LocationFromBackend } from '@/types/Location';

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
