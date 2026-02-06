import { NewsRequestParams, NewsResponse } from '@/types/News';
import { nextServer } from './api';
import { Friend } from '@/types/Friend';

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
