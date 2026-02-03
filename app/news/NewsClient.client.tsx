'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNews } from '../../lib/api/serverApi';
import { NewsRequestParams } from '@/types/News';
import Container from '@/components/Container/Container';
import NewsList from '@/components/NewsList/NewsList';

export default function NewsClient({ page, keyword, limit }: NewsRequestParams) {
  const { data: newsList, isLoading } = useQuery({
    queryKey: ['news', page, keyword, limit],
    queryFn: () => fetchNews({ page, keyword, limit }),
  });
  console.log(newsList);

  if (isLoading) return <p>Loading...</p>;

  return <Container>{newsList && newsList.length !== 0 && <NewsList list={newsList} />}</Container>;
}
