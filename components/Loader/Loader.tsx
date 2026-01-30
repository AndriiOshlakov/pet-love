'use client';

import { useEffect, useState } from 'react';
import css from './Loader.module.css';
import { useLoader } from '../../providers/LoaderContext';

export default function Loader() {
  const { loading, progress } = useLoader();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setVisible(true);
    }
  }, [loading]);

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
