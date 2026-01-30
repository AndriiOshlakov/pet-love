import Container from '@/components/Container/Container';
import css from './Home.module.css';
import Image from 'next/image';

export default function Home() {
  return (
    <Container>
      <section className={css.home}>
        <div className={css.box}>
          <h1 className={css.title}>
            Take good <span>care</span> of your small pets
          </h1>
          <p className={css.text}>
            Choosing a pet for your home is a choice that is meant to enrich your life with
            immeasurable joy and tenderness.
          </p>
        </div>
        <div>
          <Image
            width={335}
            height={402}
            src="/home/home-mob.png"
            alt="Girl with dog"
            className={css.imgMob}
          />
          <Image
            width={704}
            height={496}
            src="/home/home-tab.png"
            alt="Girl with dog"
            className={css.imgTab}
          />
          <Image
            width={1216}
            height={384}
            src="/home/home-desc.png"
            alt="Girl with dog"
            className={css.imgDesc}
          />
        </div>
      </section>
    </Container>
  );
}
