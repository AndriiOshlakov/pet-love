import { NewsItem } from '@/types/NewsItem';
import css from './NewsList.module.css';
import NewsItemComponent from '../NewsItem/NewsItem';

interface Props {
  list: NewsItem[];
}

export default function NewsList({ list }: Props) {
  return (
    <ul className={css.newsList}>
      {list.map((item) => (
        <li key={item._id}>
          <NewsItemComponent item={item} />
        </li>
      ))}
    </ul>
  );
}
