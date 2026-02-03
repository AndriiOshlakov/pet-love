import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNews } from '../../lib/api/serverApi';
import NewsClient from './NewsClient.client';
import { NewsRequestParams } from '@/types/News';

type Props = {
  searchParams: Promise<NewsRequestParams>;
};

export default async function NewsPage({ searchParams }: Props) {
  const { page = '1', keyword = '', limit = '6' } = await searchParams;

  const currentPage = Number(page);
  const currentLimit = Number(limit);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['news', currentPage, keyword, currentLimit],
    queryFn: () =>
      fetchNews({
        page: currentPage,
        keyword,
        limit: currentLimit,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewsClient page={currentPage} keyword={keyword} limit={currentLimit} />
    </HydrationBoundary>
  );
}
