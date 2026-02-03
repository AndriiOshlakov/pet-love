import { NewsRequestParams, NewsResponse } from '@/types/News';
import { nextServer } from './api';

export async function fetchNews({ keyword, page, limit }: NewsRequestParams) {
  const response = await nextServer.get<NewsResponse>('/news', {
    params: { keyword, page, limit },
  });
  return response.data.results;
}
