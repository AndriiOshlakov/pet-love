'use client';

import css from './NewsClient.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchNews } from '../../lib/api/serverApi';
import { NewsRequestParams } from '@/types/News';
import Container from '@/components/Container/Container';
import NewsList from '@/components/NewsList/NewsList';
import Title from '@/components/Title/Title';
import SearchNewsForm from '@/components/SearchNewsComponent/SearchNewsComponent';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Pagination from '@/components/Pagination/Pagination';

export default function NewsClient({ page, keyword, limit }: NewsRequestParams) {
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [currentPage, setCarrentPage] = useState(1);

  const { data: newsList, isLoading } = useQuery({
    queryKey: ['news', currentPage, currentKeyword, limit],
    queryFn: () => fetchNews({ page: currentPage, keyword: currentKeyword, limit }),
    refetchOnMount: false,
  });

  console.log(newsList);

  useEffect(() => {
    if (newsList && newsList.results.length === 0) {
      toast('Nothing was found for your query. Try changing the topic.', {
        style: { color: 'red', fontSize: '32px', fontWeight: '700' },
      });
    }
  }, [newsList]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Container>
      <section className={css.section}>
        <div className={css.box}>
          <Title title="News" />
          <SearchNewsForm
            onPage={() => {
              setCarrentPage(1);
            }}
            onSearch={setCurrentKeyword}
          />
        </div>
        {newsList && newsList.results.length !== 0 && <NewsList list={newsList.results} />}
        {newsList && newsList.results.length !== 0 && (
          <Pagination
            onPageChange={setCarrentPage}
            page={currentPage}
            pageCount={newsList.totalPages}
          />
        )}
        {newsList?.results.length === 0 && <Toaster />}
      </section>
    </Container>
  );
}
