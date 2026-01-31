'use client';

import { useEffect, useState } from 'react';
import css from './Loader.module.css';
import { useLoader } from '../../providers/LoaderContext';
import { usePathname } from 'next/navigation';

export default function Loader() {
  const { loading, progress } = useLoader();
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') {
      setVisible(false);
      return;
    }

    if (loading) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [loading, pathname]);

  if (!visible) return null;

  return (
    <section className={css.section}>
      <div className={css.loader}>
        {loading ? (
          <p className={css.progress}>{progress}%</p>
        ) : (
          <p className={css.text}>
            pet
            <svg width={82} height={82} className={css.heart}>
              <use href="/symbol-defs.svg#heart" />
            </svg>
            love
          </p>
        )}
      </div>
    </section>
  );
}

// 'use client';

// import { useEffect, useState } from 'react';
// import css from './Loader.module.css';
// import { useLoader } from '../../providers/LoaderContext';
// import { usePathname } from 'next/navigation';

// export default function Loader() {
//   const { loading, progress } = useLoader();
//   const [visible, setVisible] = useState(false);
//   const pathname = usePathname();
//   useEffect(() => {
//     if (pathname === '/') return;
//     if (!loading) {
//       const timer = setTimeout(() => {
//         setVisible(false);
//       }, 1000);

//       return () => clearTimeout(timer);
//     } else {
//       setVisible(true);
//     }
//   }, [loading, pathname]);

//   if (!visible) return null;

//   return (
//     <section className={css.section}>
//       <div className={css.loader}>
//         {loading ? (
//           <p className={css.progress}>{progress}%</p>
//         ) : (
//           <p className={css.text}>
//             pet
//             <svg width={82} height={82} className={css.heart}>
//               <use href="/symbol-defs.svg#heart" />
//             </svg>
//             love
//           </p>
//         )}
//       </div>
//     </section>
//   );
// }
