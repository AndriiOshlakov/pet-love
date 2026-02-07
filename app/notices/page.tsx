// import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
// import { fetchNotices } from '../../lib/api/serverApi';
// import { NoticeRequestParams } from '@/types/Notice';
// import Notices from './NoticesClient.client';

// type Props = {
//   searchParams: Promise<NoticeRequestParams>;
// };

// export default async function NoticesPage({ searchParams }: Props) {
//   const {
//     page = '1',
//     keyword = '',
//     limit = '6',
//     category = undefined,
//     species = undefined,
//     locationId,
//     byDate,
//     byPopularity,
//     byPrice,
//     sex,
//   } = await searchParams;

//   const currentPage = Number(page);
//   const currentLimit = Number(limit);

//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery({
//     queryKey: [
//       'notices',
//       currentPage,
//       keyword,
//       currentLimit,
//       category,
//       species,
//       locationId,
//       byDate,
//       byPopularity,
//       byPrice,
//       sex,
//     ],
//     queryFn: () =>
//       fetchNotices({
//         page: currentPage,
//         keyword,
//         limit: currentLimit,
//       }),
//   });

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <Notices />
//     </HydrationBoundary>
//   );
// }
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
