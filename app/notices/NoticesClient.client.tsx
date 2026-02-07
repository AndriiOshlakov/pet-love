// 'use client';

// import Container from '@/components/Container/Container';
// import css from './NoticesClient.module.css';
// import Title from '@/components/Title/Title';
// import { useQuery } from '@tanstack/react-query';
// import { useState } from 'react';
// import { fetchNotices } from '@/lib/api/serverApi';
// import { NoticeRequestParams } from '@/types/Notice';
// import NoticesList from '@/components/NoticesList/NoticesList';
// import Pagination from '@/components/Pagination/Pagination';

// export default function Notices({
//   page,
//   keyword,
//   limit,
//   category,
//   species,
//   locationId,
//   byDate,
//   byPopularity,
//   byPrice,
//   sex,
// }: NoticeRequestParams) {
//   // const [currentPage, setCarrentPage] = useState(1);
//   // const [currentKeyword, setCarrentKeyword] = useState('');

//   const [filters, setFilters] = useState({
//     category: undefined,
//     keyword: '',
//     species: undefined,
//     page: 1,
//     limit: 6,
//     locationId: '',
//     byDate: false,
//     byPopularity: false,
//     byPrice: false,
//     sex: undefined,
//   });

//   const { data, isError } = useQuery({
//     queryKey: [
//       'notices',
//       filters,
//       // currentPage,
//       // currentKeyword,
//       // limit,
//       // category,
//       // species,
//       // locationId,
//       // byDate,
//       // byPopularity,
//       // byPrice,
//       // sex,
//     ],
//     // queryFn: () => fetchNotices({ page: currentPage, keyword: currentKeyword, limit }),
//     queryFn: () => fetchNotices(filters),
//     refetchOnMount: false,
//   });
//   if (data) {
//     console.log(data);
//   }

//   return (
//     <Container>
//       <section className={css.wrapper}>
//         <Title title="Find your favorite pet" />
//         {data && data.results.length !== 0 && <NoticesList list={data.results} />}
//         {data && data.results.length !== 0 && (
//           <Pagination
//             onPageChange={() => setFilters((filters) => ({ ...filters, page }))}
//             page={page}
//             pageCount={data.totalPages}
//           />
//         )}
//       </section>
//     </Container>
//   );
// }
