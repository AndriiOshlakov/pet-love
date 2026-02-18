import Image from 'next/image';
import css from './FormImage.module.css';

interface Props {
  desktopSrc: string;
  tabletSrc: string;
  mobileSrc: string;
  src: string;
}

export default function FormImage({ desktopSrc, tabletSrc, mobileSrc, src }: Props) {
  return (
    <div className={css.container}>
      <picture>
        <source media="(min-width: 1280px)" srcSet={desktopSrc} width={592} height={654} />
        <source media="(min-width: 768px)" srcSet={tabletSrc} width={704} height={302} />

        <Image
          src={mobileSrc}
          alt={'Animal picture'}
          priority
          className={css.img}
          width={335}
          height={280}
        />
      </picture>

      <div className={css.box}>
        <Image src={src} width={294} height={121} alt="Description pet" />
      </div>
    </div>
  );
}
