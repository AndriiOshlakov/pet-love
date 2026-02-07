import { Notice } from '@/types/Notice';
import css from './NoticesList.module.css';
import NoticesItem from '../NoticesItem/NoticesItem';

interface Props {
  list: Notice[];
}

export default function NoticesList({ list }: Props) {
  return (
    <ul className={css.noticesList}>
      {list.map((item) => (
        <li key={item._id}>
          <NoticesItem item={item} />
        </li>
      ))}
    </ul>
  );
}
