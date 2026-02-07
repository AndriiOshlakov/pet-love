import { NewsRequestParams, NewsResponse } from '@/types/News';
import { nextServer } from './api';
import { Friend } from '@/types/Friend';
import { NoticeRequestParams, Notices } from '@/types/Notice';

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
