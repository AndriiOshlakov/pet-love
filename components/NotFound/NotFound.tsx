'use client';

import css from './NotFound.module.css';
import Image from 'next/image';
import Button from '@/components/Button/Button';
import { useRouter } from 'next/navigation';
import Container from '../Container/Container';

export default function NotFoundComponent() {
  const router = useRouter();
  return (
    <Container>
      <div className={css.box}>
        <div className={css.notFound}>
          <p className={css.four}>4</p>
          <div className={css.imageBox}>
            <Image
              width={109}
              height={109}
              alt="cat"
              src="/not-found/cat-mob.png"
              className={css.catMob}
            />
            <Image
              width={280}
              height={280}
              alt="cat"
              src="/not-found/cat-tab-desc.png"
              className={css.catTabDesc}
            />
          </div>
          <p className={css.four}>4</p>
        </div>
        <p className={css.text}>Ooops! This page not found :(</p>
        <div className={css.btnBox}>
          <Button text="To home page" onClick={() => router.push('/home')} />
        </div>
      </div>
    </Container>
  );
}
