import type { NewsItem } from '@/types/NewsItem';
import css from './NewsItem.module.css';
import Image from 'next/image';

interface Props {
  item: NewsItem;
}

export default function NewsItemComponent({ item }: Props) {
  return (
    <div className={css.box}>
      <Image width={335} height={190} src={item.imgUrl} alt="News Image" className={css.img} />
      <h3 className={css.title}>{item.title}</h3>
      <p className={css.text}>{item.text.slice(0, 130)}</p>
      <div className={css.wrapper}>
        <p className={css.date}>
          {new Date(item.date).toLocaleDateString('sv-SE').replace(/-/g, '/')}
        </p>
        <a className={css.link} href={item.url} target="blank">
          Read more
        </a>
      </div>
    </div>
  );
}
