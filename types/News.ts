import { NewsItem } from './NewsItem';

export interface NewsResponse {
  page: number;
  perPage: number;
  totalPages: number;
  results: NewsItem[];
}

export interface NewsRequestParams {
  keyword?: string;
  page?: number;
  limit?: number;
}
