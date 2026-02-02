import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/home');
}

// 'use client';

// import { useEffect } from 'react';
// import { useLoader } from '.././providers/LoaderContext';
// import { useRouter } from 'next/navigation';

// export default function Page() {
//   const { setLoading, setProgress } = useLoader();
//   const router = useRouter();

//   useEffect(() => {
//     setLoading(true);
//     setProgress(0);

//     let value = 0;

//     const interval = setInterval(() => {
//       value += 20;
//       setProgress(value);

//       if (value >= 100) {
//         clearInterval(interval);
//         setLoading(false);
//         setTimeout(() => {
//           router.replace('/home'); // ✅ тільки тут
//         }, 1000);
//       }
//     }, 300);

//     return () => clearInterval(interval);
//   }, []);

//   return null;
// }
