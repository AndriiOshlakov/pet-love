'use client';

import Container from '@/components/Container/Container';
import css from './NoticesClient.module.css';
import Title from '@/components/Title/Title';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchNotices } from '@/lib/api/serverApi';
import { NoticeRequestParams } from '@/types/Notice';
import NoticesList from '@/components/NoticesList/NoticesList';
import Pagination from '@/components/Pagination/Pagination';
import Filters from '@/components/Filters/Filters';

export default function Notices() {
  const [filters, setFilters] = useState<NoticeRequestParams>({ page: 1, limit: 6 });

  const { data, isError } = useQuery({
    queryKey: ['notices', filters],
    queryFn: () => fetchNotices(filters),
  });
  if (data) {
    console.log(data);
  }

  return (
    <Container>
      <section className={css.wrapper}>
        <Title title="Find your favorite pet" />
        <Filters
          filters={filters}
          onChangeFilters={(newFilters) => setFilters((prev) => ({ ...prev, ...newFilters }))}
        />
        {data && data.results.length !== 0 && <NoticesList list={data.results} />}
        {data && data.results.length !== 0 && (
          <Pagination
            onPageChange={(page) => setFilters((filters) => ({ ...filters, page }))}
            page={filters.page}
            pageCount={data.totalPages}
          />
        )}
      </section>
    </Container>
  );
}
